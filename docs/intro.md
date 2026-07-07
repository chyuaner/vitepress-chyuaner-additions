---
outline: deep
---

目前做過的處理與動畫效果
===

## 客製化項目
這些客製化可分為三大類都屬於**通用性質**：

### A. 路由頁面切換動畫 (View Transitions API)

*   **邏輯**：使用 `router.onBeforeRouteChange` 攔截頁面路由切換，並以 `document.startViewTransition` 執行過渡。
    ::: details 關鍵邏輯程式碼段落
    ```javascript
    // packages/vitepress-page-transitions/index.js
    let isTransitioning = false
    const normalizePath = (path) => {
      return decodeURIComponent(path.split('#')[0].split('?')[0])
        .replace(/\/$/, '')
        .replace(/\.html$/, '')
    }

    router.onBeforeRouteChange = (to) => {
      if (isTransitioning) return true
      if (normalizePath(to) === normalizePath(window.location.pathname)) return true

      if (document.startViewTransition) {
        isTransitioning = true
        const hadSidebar = document.querySelector('.VPSidebar') !== null

        const transition = document.startViewTransition(async () => {
          try {
            await router.go(to)
            const hasSidebar = document.querySelector('.VPSidebar') !== null
            if (hadSidebar && hasSidebar) {
              document.documentElement.classList.add('transition-sidebar-fade')
            } else if (hadSidebar && !hasSidebar) {
              document.documentElement.classList.add('transition-sidebar-leave')
            } else if (!hadSidebar && hasSidebar) {
              document.documentElement.classList.add('transition-sidebar-enter')
            }
          } finally {
            isTransitioning = false
          }
        })

        if (transition && transition.finished) {
          transition.finished.then(() => {
            document.documentElement.classList.remove(
              'transition-sidebar-fade',
              'transition-sidebar-leave',
              'transition-sidebar-enter'
            )
          })
        }
        return false
      }
    }
    ```
    :::
*   **動畫**：透過 CSS 設定：
    *   導覽列 (`.VPNavBar`) 保持固定（不重新渲染淡入淡出）。
    *   主要內容區域 (`#VPContent`) 呈現淡入/淡出與上下滑動的組合動畫。
    *   側邊欄 (`.VPSidebar`) 根據是否有 sidebar 的頁面互相切換，來決定要原地淡入淡出，還是從左側滑入/滑出。
*   **減敏動畫**：支援 `prefers-reduced-motion`，若使用者系統設定減少動態效果，則自動略過此動畫。

### B. 深淺色模式切換圓形動畫 (Circular Theme Toggle)

*   **邏輯**：透過 `provide('toggle-appearance', ...)` 覆蓋 VitePress 原生深淺色切換。根據滑鼠點擊位置，使用 `clip-path: circle(...)` 來擴散切換背景。
    ::: details 關鍵邏輯程式碼段落
    ```javascript
    // packages/vitepress-page-transitions/index.js
    provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
      const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isAppearanceTransition) {
        isDark.value = !isDark.value
        return
      }

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
        )}px at ${x}px ${y}px)`
      ]

      document.documentElement.classList.add('theme-appearance-transition')

      try {
        await document.startViewTransition(async () => {
          isDark.value = !isDark.value
          await nextTick()
        }).ready

        await document.documentElement.animate(
          { clipPath: isDark.value ? clipPath.reverse() : clipPath },
          {
            duration: 300,
            easing: 'ease-in',
            fill: 'forwards',
            pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
          }
        ).finished
      } finally {
        document.documentElement.classList.remove('theme-appearance-transition')
      }
    })
    ```
    :::
*   **樣式**：設定 `z-index` 以確保擴散圖層在最上方，並在切換時關閉路由切換的轉場名稱避免衝突。

### C. 側邊欄滾動與錨點高亮追蹤 (Intersection Observer for Same-Page Sidebar Links)

*   **邏輯**：使用 `IntersectionObserver` 監控當前頁面所有在側邊欄出現的 `#` 錨點標題。當滾動到該區域時，自動給側邊欄的 `.VPSidebarItem` 與 `.VPLink` 添加 `is-active` / `active` 樣式。
    ::: details 關鍵邏輯程式碼段落
    ```javascript
    // packages/vitepress-sidebar-anchor/index.js
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeHash = entry.target.id
          
          hashLinks.forEach(({ el, hash }) => {
            const container = el.closest('.VPSidebarItem')
            if (decodeURIComponent(hash) === activeHash) {
              container?.classList.add('is-active')
              el.classList.add('active')
            } else {
              container?.classList.remove('is-active')
              el.classList.remove('active')
            }
          })
        }
      })
    }, observerOptions)
    ```
    :::

## 主要特色
### 1. 無 JS 環境 (JS 完全被停用/載入失敗)

**✅ 完美支援，不會發生白畫面。**
*   **原因**：VitePress 在建置（Build）時會進行靜態網站生成（SSR），將所有 Markdown 內容預先渲染成靜態的 HTML 檔案。
*   **表現**：
    *   在沒有 JS 的情況下，瀏覽器能完全正常地顯示網頁內容、圖片與排版。
    *   **路由切換 (A)**：點擊連結時，瀏覽器會直接走傳統的網頁跳轉（Page Reload），動畫不會觸發，但能正常換頁。
    *   **深淺色切換 (B)**：由於深淺色切換依賴 Vue 的狀態控制，按鈕會失效，但網頁仍會以預設的佈景主題（或系統偏好）正常顯示。
    *   **側邊欄追蹤 (C)**：滾動時側邊欄不會自動高亮，但點擊錨點連結時，瀏覽器仍會透過 HTML 原生機制跳轉至對應的標題位置（即 `id` 錨點）。

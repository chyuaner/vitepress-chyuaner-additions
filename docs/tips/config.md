VitePress `config.mts` 常用設定
===

以下適用於 `.vitepress/config.mts` 的設定範例

## 通用

```js{6-12}
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    // 顯示最後修改時間
    lastUpdated: true,

    // 設定右側目錄的標題文案
    outline: {
      label: '目錄'
    }
  }
}
```

## 本專案的config範例
<<< ../.vitepress/config.mts

## `nav` 的 `activeMatch`

在 VitePress 的導覽列設定中，`activeMatch` 會被當作正則表達式（`RegExp`）來與目前的路徑進行比對。

為了達到**「在排除 `/examples/` 路由與首頁 `/` 的情況下，讓『使用說明』保持 active 高亮」**的目的，將 `docs/.vitepress/config.mts` 中的 `activeMatch` 修改如下：

```typescript
{ text: '使用說明', link: '/intro', activeMatch: '^/(?!examples/|$)' }
```

### 正則表達式解析：
* **`^/`**：必須以斜線 `/` 開頭。
* **`(?!examples/|$)`**：使用**負向先行斷言**（Negative Lookahead），代表 `/` 的後面：
  * **不能是** `examples/`（用來排除 `/examples/` 底下的所有頁面）。
  * **不能是** `$`（用來排除純首頁 `/`，避免待在首頁時「使用說明」也亮起）。

這樣調整後，當你在以下路徑時：
* `/intro` ➔ **Active** 🟢
* `/vitepress-page-transitions` ➔ **Active** 🟢
* `/vitepress-sidebar-anchor` ➔ **Active** 🟢
* `/`（首頁） ➔ **不 Active** ⚪
* `/examples/markdown-examples` ➔ **不 Active** ⚪

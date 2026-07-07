# vitepress-sidebar-anchor

為 VitePress 的側邊欄提供基於滾動位置的錨點高亮追蹤（Scrollspy），當滾動到該區域時，自動給側邊欄的項目加上啟用狀態樣式。

## 安裝

由於目前套件尚未發布至 npm，請直接透過 GitHub 儲存庫的子路徑進行安裝：

::: code-group

```bash [npm]
npm install github:chyuaner/vitepress-chyuaner-additions?path=packages/vitepress-sidebar-anchor
```

```bash [pnpm]
pnpm add github:chyuaner/vitepress-chyuaner-additions#path:packages/vitepress-sidebar-anchor
```

```bash [yarn]
yarn add https://github.com/chyuaner/vitepress-chyuaner-additions.git#path=packages/vitepress-sidebar-anchor
```

:::

## 使用說明

### 步驟 1：在 VitePress 主題中啟用套件

修改你的 `.vitepress/theme/index.ts`（或 `index.js`）檔案：

```typescript
import DefaultTheme from 'vitepress/theme'
import { useSidebarScrollTracker } from 'vitepress-sidebar-anchor'

export default {
  extends: DefaultTheme,
  setup() {
    // 啟用側邊欄錨點滾動追蹤
    useSidebarScrollTracker()
  }
}
```

### 步驟 2：樣式客製化（選填）

此套件在滾動到對應錨點標題時，會自動在對應側邊欄連結的父層元素（`.VPSidebarItem`）加上 `.is-active` 類別，並在連結元素（`.VPLink`）加上 `.active` 類別。

你可以透過 CSS 客製化高亮時的樣式，例如在 `.vitepress/theme/custom.css` 中：

```css
.VPSidebarItem.is-active > .item > .link {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
```


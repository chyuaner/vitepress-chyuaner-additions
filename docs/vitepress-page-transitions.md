# vitepress-page-transitions

為 VitePress 網站提供流暢的頁面路由切換轉場動畫與深淺色模式切換的圓形擴散動畫。

## 安裝

由於目前套件尚未發布至 npm，請直接透過 GitHub 儲存庫的子路徑進行安裝：

::: code-group

```bash [npm]
npm install github:chyuaner/vitepress-chyuaner-additions?path=packages/vitepress-page-transitions
```

```bash [pnpm]
pnpm add github:chyuaner/vitepress-chyuaner-additions#path:packages/vitepress-page-transitions
```

```bash [yarn]
yarn add https://github.com/chyuaner/vitepress-chyuaner-additions.git#path=packages/vitepress-page-transitions
```

:::

## 使用說明

### 步驟 1：在 VitePress 主題中啟用套件

修改你的 `.vitepress/theme/index.ts`（或 `index.js`）檔案：

```typescript
import DefaultTheme from 'vitepress/theme'
import { useThemeTransitions } from 'vitepress-page-transitions'
import 'vitepress-page-transitions/style.css' // 引入轉場樣式

export default {
  extends: DefaultTheme,
  setup() {
    // 啟用轉場動畫與外觀切換動畫
    useThemeTransitions()
  }
}
```

### 步驟 2：注意事項

1. **瀏覽器支援度**：
   此功能依賴 [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)。在不支援的瀏覽器中，頁面切換與深淺色切換會降級為原生無動畫模式。
2. **減敏動畫**：
   此套件會自動偵測使用者的系統偏好，若系統啟用了「減少動態效果」（`prefers-reduced-motion: reduce`），將會自動跳過動畫以維護使用者體驗。


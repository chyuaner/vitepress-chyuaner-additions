Markdown常用語法
===

## 直接在 Markdown 檔案中匯入（include）其他檔案的內容

這項功能主要分為兩種情境：

---

### 1. 匯入其他 Markdown 檔案的內容（Markdown Snippets）
如果您想把另一份 `.md` 檔案的內容直接嵌入目前的文件中，可以使用 VitePress 內建的 `@include` 語法。

#### 💡 基本用法（匯入整份檔案）
```markdown
<!-- @include: ./parts/shared-content.md -->
```

#### 💡 進階用法（僅匯入特定行數範圍）
如果您只想嵌入該檔案中的某個段落，可以加上 `#L` 加上行號範圍：
```markdown
<!-- @include: ./parts/shared-content.md#L5-10 -->
```
*(這會只載入 `shared-content.md` 的第 5 行到第 10 行)*

---

### 2. 匯入程式碼檔案並顯示為程式碼區塊（Code Snippets）
如果您要直接把外部的程式源碼（如 `.js`, `.ts`, `.json` 等）直接載入並渲染成高亮的程式碼區塊，可以使用 `<<<` 語法。

#### 💡 基本用法（載入整份程式碼）
使用 `@` 代表 VitePress 專案的根目錄（通常是 `docs`）：
```markdown
<<< @/packages/vitepress-page-transitions/index.js
```

#### 💡 進階用法（指定行號、語言與標題）
您可以限制只顯示該檔案的特定行數，並自訂顯示的語言與標題：
```markdown
<<< @/packages/vitepress-page-transitions/index.js#L10-48{javascript}
```

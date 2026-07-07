Github Actions
===

## 整體範例
以下是列出我常用的部署腳本，放置在 `.github/workflows/deploy.yml`

<<< @/../.github/workflows/deploy.yml{9,53}

## Purge Cloudflare Cache
因為我有設置 Cloudflare CDN 指定將一般的 HTML 檔案也列入快取，導致後續有新 commit 上傳並成功部署後，會因為被 CDN 快取佔住而沒有即時更新，所以此腳本中也順便處理了這個問題。

### 關鍵Secret變數
- `CLOUDFLARE_API_TOKEN`：填入在步驟 1 取得的 API Token。
- `CLOUDFLARE_ZONE_ID`：填入在步驟 2 取得的 Zone ID。
- `CLOUDFLARE_HOST`：填入部署上架後的網域（例如：`your-domain.com`，不需加 `https://`）。

### 使用說明

#### 1. 建立 Cloudflare API Token
要讓 GitHub Actions 能夠呼叫 Cloudflare 的 API 清除快取，必須先建立一個專屬的 API Token：

1. 登入 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 點擊右上角頭像 ➔ 選擇 **My Profile (我的個人資料)**。
3. 在左側選單點擊 **API Tokens**。
4. 點擊 **Create Token (建立權限 Token)**。
5. 找到 **Create Custom Token (建立自訂 Token)** 區塊，點擊 **Get Started**：
   - **Token name**：自訂名稱（例如：`GitHub Actions Cache Purge`）。
   - **Permissions**：選擇 `Zone` ➔ `Cache Purge` ➔ `Edit`。
   - **Zone Resources**：選擇 `Include` ➔ `Specific zone` ➔ 選擇你要清除快取的網域。
6. 點擊 **Continue to summary** ➔ **Create Token**。
7. **複製產生出來的 API Token**（此 Token 只會顯示一次，請妥善保存）。

#### 2. 取得 Cloudflare Zone ID
1. 在 Cloudflare 控制台首頁，點擊進入你的網域（Zone）。
2. 在 **Overview (總覽)** 頁面向下滾動，在右側的 API 區塊中可以找到 **Zone ID**，將其複製下來。

#### 3. 設置 GitHub 儲存庫的 Actions Secrets
1. 進入你的 GitHub 專案儲存庫頁面。
2. 點擊上方導覽列的 **Settings (設定)**。
3. 在左側選單中展開 **Secrets and variables** ➔ 點擊 **Actions**。
4. 點擊 **New repository secret**，依序新增[上述提到的關鍵Secret變數](#%E9%97%9C%E9%8D%B5secret%E8%AE%8A%E6%95%B8)

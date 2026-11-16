# ✿ 可愛學術版LLM Research Wiki｜作業完成版

**主要亮點**：依據Karpathy式持續累積Wiki構想，建立中文版AGENTS.md、原始資料／Wiki／規則三層架構，再加入Wiki → notes → slides → HTML成果鏈。網站可搜尋並閱讀14篇Wiki頁面。

- [✿ 開啟9頁HTML學術簡報](presentations/taiwan-nutrition-2018/index.html)
- [研究筆記](notes/taiwan-nutrition-2018/notes.md)
- [逐頁簡報Markdown](slides/taiwan-nutrition-2018/slide-content.md)
- [AI維護規則AGENTS.md](AGENTS.md)

## GitHub Pages發布

建立Public儲存庫`llm-research-wiki`，上傳**此資料夾內的檔案**到儲存庫根目錄(不是上傳整個ZIP)。在Settings → Pages選擇Deploy from a branch，main與/(root)。公開網址通常是`https://你的帳號.github.io/llm-research-wiki/`。

**著作權提醒**：公開上傳時請使用`llm-research-wiki-github-safe.zip`版本(不含兩份PDF)；保留PDF的完整版用於本機研究。網站的原始PDF全文連結於公開安全版改為來源書目頁，不會把受限全文公開。

## 示範新增頁面

向AI說：`請先讀AGENTS.md，根據wiki已核實的來源新增一個研究主題的notes，建立slides及HTML簡報，不要使用外部尚未Wiki化資料；完成後檢核連結與來源編號。`

---

# LLM研究知識庫(LLM Research Wiki)

這是一份**可直接公開成GitHub Pages網站**的中文LLM Wiki範例，實作「原始來源唯讀、Wiki持續更新、AGENTS.md規範AI工作方式」的三層知識庫架構。

## 快速開始

1. 將整個資料夾的內容上傳到**公開GitHub儲存庫的最外層**。不要把ZIP本身上傳。
2. 在儲存庫選擇`Settings → Pages → Build and deployment`，設定`Deploy from a branch`、`main`、`/(root)`，並儲存。
3. 發布後網址通常是`https://你的帳號.github.io/儲存庫名稱/`。若要在本機預覽，執行`python -m http.server 8000`並開啟`http://localhost:8000`。因瀏覽器的檔案安全限制，不要直接雙擊`index.html`測試資料載入。
4. 以AI編輯器(如Codex或Claude Code)開啟專案資料夾，要求它**先讀`AGENTS.md`**，再整理新文獻並更新Wiki。

## 與一般RAG的差別

這份Wiki不是把PDF丟入搜尋工具後每次重新問答，而是讓AI長期維護一套已有結構、摘要、交叉連結和修訂紀錄的Markdown研究知識庫。網站只是成果的唯讀展示；目前**不具備自動上傳PDF、呼叫LLM或從網頁直接編輯檔案的功能**。

## 檔案規則

- `raw/`：原始來源與書目，原則上不可修改。公開儲存庫不要放未授權論文全文。
- `wiki/`：AI撰寫的研究概念、來源摘要及跨文獻綜整。
- `wiki/index.md`：依分類整理的內容索引。
- `wiki/log.md`：每次Ingest、Query回存或Lint的追加式紀錄。
- `wiki/catalog.json`：網頁用的頁面清單；**新增Wiki頁面必須同步加入**。
- `AGENTS.md`：AI在新增、修改與檢核內容前必讀的規則。

## 建議給AI的新增筆記指令

> 請先閱讀AGENTS.md與wiki/index.md。接著替我的LLM Wiki新增一篇「LLM評估方法」概念頁，僅使用已查核的SCIE/SSCI文獻或政府正式資料，不要虛構來源或實驗數據。請建立Markdown、更新相關頁面的交叉連結、wiki/catalog.json、wiki/index.md和wiki/log.md，最後執行scripts/lint_wiki.py並列出修改結果。

## 這份範例的注意事項

初始內容是**知識庫架構和示範頁面**，不代表已完成系統性文獻回顧。示範研究來源使用美國國家標準暨技術研究院(NIST)的政府文件；其他主題條目標示為概念導覽，後續應依`AGENTS.md`補充經查證的SCIE/SSCI文獻或政府資料。

## 2026-11-16文獻匯入紀錄

本版在原有7篇LLM示範頁面基礎上，新增兩份2018年衛生福利部國民健康署政府出版品(已取得PDF全文)、7篇相關Wiki頁面，並更新2篇既有綜整/方法頁。新增內容屬**營養與飲食研究的跨領域示範**，不是LLM研究證據。來源文件保存於`raw/sources/`，由Wiki引用，不經修改；第3篇提及文獻尚未提供。

若將專案發布為公開GitHub Pages，請先確認是否具有公開散布原始PDF全文的授權；若沒有，請在公開版移除PDF全文並以政府官方原始連結替代，保留可公開之摘要及書目資料。此作業專案包則保存使用者已提供的原始檔供後續本機處理。

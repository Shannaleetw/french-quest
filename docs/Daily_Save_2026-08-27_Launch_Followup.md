# French Quest Daily Save — 2026-08-27

## 1. 明天要交給光希處理的 launch follow-up

### A. 先確認 / 實作「進行中 Mission session persistence」
目前已驗證：完成後的 Total XP、Last Mission Attempt、Last Review、Skill Performance、Weak Spots 會保留；但做到一半直接 refresh 會回首頁，無法回到原本題目繼續。

注意：不要把這件事簡化成只在每題呼叫一次現有 saveProgress()。目前進行中的 currentQuestion、answers、activeQuestions、selected/guessed state 等屬於 session state，不一定已存在 progress object。明天先讓光希分析需要保存哪些 state，再實作「中途離開 / refresh / 關掉 tab 後可繼續未完成 Mission」。

驗收重點：
- 做到第 5–8 題 refresh 後可繼續，不回到全新 Mission。
- 已作答題目的答案、guessed 狀態、題目 random order、options order 不應被洗掉或重算。
- 計時邏輯要合理，不因關閉分頁數小時而把離線時間算進作答時間。
- 完成後仍正確寫入 Last Mission Attempt、XP、Skill Performance、Weak Spots。
- Review / Retake / localStorage migration 不受影響。

### B. Coffee Shop vocabulary 欄位繁中化
Founder 第四輪審查指出：tef_tip 已 25/25 繁中，但 vocabulary 仍是英文，例如 `café = coffee`。中文市場定位下，應改為直接中文，例如 `café = 咖啡`，避免學習者多繞一層英文。

原則：
- 25 題 vocabulary 全面改成自然繁中。
- 法文詞保留；解釋用繁中。
- 不動 answer、scoring、skill、question id、TEF tip 邏輯。

### C. 首頁加「入門軌」定位
目前 Coffee Shop 題庫約 A1 × 20、A2 × 5；首頁定位是 TEF Canada，但這批內容是入門程度。

建議新增一句：
`從零開始的 TEF Canada 情境入門；更高程度內容陸續推出。`

目標：避免 B1/B2 備考者誤解目前題庫代表整個產品難度。

### D. coffee_shop.json status 欄位
目前 25 題 status 皆為 `draft`。既然 Coffee Shop 已作為正式 V1 題庫，明天確認後改為 `published`，或若 status 暫時沒有實際流程用途就移除欄位。偏好：保留欄位並改 `published`，方便未來內容審核流程。

### E. 完成頁繁中化 deploy 到 production
Dev 已完成 Mission Complete / Review Complete 繁中化：commit `64bca20`。
已測：Full Mission / Review Complete、`複習 N 題待加強`、Retake / Review / Back、Forms、390px mobile、console 均正常。
Production 尚未 deploy。明天確認後同步這次 `script.js` 變更到 `frenchquestapp/frenchquestapp.github.io`。

### F. Founder 審查中已經被今天 QA 關閉的項目
- 完整 25 題：已實際跑完，PASS。
- Mission Complete：PASS。
- Weak Spots / Review：PASS。
- Retake：有按鈕；題目與 options 都會 randomize，PASS。
- Persistence（完成後資料）：PASS；只有「進行中 session」未保存。
- Early Access / Feedback Forms：PASS。
- Mobile：PASS。
- Production repo：已排除 docs、grocery_store.json、未公開資料與音檔。
- 新站：`https://frenchquestapp.github.io/` 已可正常開啟。

## 2. 今天討論到，但不是明天 launch blocker 的後續 / 調整

### Audio bait — 延後
原先規劃 Coffee Shop 3–5 題 AI voice audio；已完成 Azure Speech F0 setup，偏好 French (Canada) voice `Thierry`，並成功產出第一個 `cs010.mp3` prototype。
Founder 討論後決定：audio 不擋 V1，上線後再加。
未來若續做：selected questions、24k MP3、簡單 Listen 按鈕即可；不要一開始做完整 listening system。

### Vocabulary Memory Engine — future feature
Spaced Repetition + Active Recall。Mission 中標記陌生字，之後做 recognition → partial recall → full recall → context cloze → situational application。與 Question Weak Spots 分開。

### TEF Readiness Roadmap — future monetization
A1 Foundation → A2 Building → A2 Ready → B1 Building → B1 Ready。不要把單次 raw score / XP 說成官方 CEFR / TEF level。Free 顯示基本 skill / XP；Paid 之後提供 trends、weak-point diagnosis、roadmap、personalized next step。

### Login / Payment — 延後
V1 不做。先驗證 acquisition、activation、retention、willingness-to-pay，再決定登入 / 訂閱架構。

### Grocery Store / Banking — 仍 Coming Soon
不要因 launch 壓力打開。`grocery_store.json` 保留在 dev repo，不進 production。

### Public / Dev repo 架構
- Dev / product brain：`Shannaleetw/french-quest`
- Production-only：`frenchquestapp/frenchquestapp.github.io`
- Production repo 不放 docs、future strategy、unreleased mission data。
- 目前用 `Shannaleetw` collaborator 權限寫入 production repo。

### Domain
第一筆收入前不花錢。現階段正式網址使用 `https://frenchquestapp.github.io/`；未來有收入後再考慮 `frenchquest.app`。

### Favicon
目前本機可看到 `/favicon.ico` 404。非功能問題、非 launch blocker；之後補品牌 favicon。

### In-progress UX refinement
進行中的 Mission session persistence 完成後，可再考慮更完整的「Resume Mission」UI，例如首頁顯示 `Continue Coffee Shop Mission`，但 V1 先做到 refresh / 關閉後可續做即可。

## 明天建議順序
1. 先分析並修 session persistence。
2. vocabulary 繁中化。
3. 首頁加入門軌定位。
4. status draft → published。
5. 把完成頁繁中化 + 上述已確認的 launch 修正 deploy production。
6. 做短版 smoke test：開始 Mission → 中途 refresh/resume → 完成 → Review → Retake → Forms → mobile。
7. Go / No-Go；若全過就正式對外分享。

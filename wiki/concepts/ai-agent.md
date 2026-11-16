---
id: agent
title: AI代理(Agent)
type: concept
tags: [Agent, 工作流程]
updated: 2026-11-16
source_ids: []
status: draft
---

# AI代理(Agent)

## 核心說明
本專案將AI代理(Agent)視為能依據使用者指令與專案規範，分階段讀取、編輯和查核指定檔案的工作流程。這是**本Wiki的操作性定義**，並非通用學術分類結論。

## 在本專案中的任務
AI代理會先閱讀`AGENTS.md`，再執行三種核心工作：
- **Ingest**：閱讀新來源、建立摘要、更新其他相關頁面。
- **Query**：透過索引找到相關頁面，整合成具有來源脈絡的回答。
- **Lint**：檢查連結、矛盾、過時主張、缺漏與待補的研究證據。

## 限制與待查問題
- AI產生的摘要仍須由使用者查核，不能因為有自動化流程就視為正確。
- 公開網站僅供瀏覽；它本身不會自動執行AI代理。

## 相關頁面
- [檢索增強生成(RAG)](./retrieval-augmented-generation.md)
- [研究評估與證據品質](../methods/evaluation-and-evidence.md)
- [LLM研究知識地圖](../synthesis/research-map.md)

## 參考來源
- 本頁為專案工作規範示例，尚待補入符合本專案引用標準的實證文獻。

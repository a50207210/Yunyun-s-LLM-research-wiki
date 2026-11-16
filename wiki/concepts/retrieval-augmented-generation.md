---
id: rag
title: 檢索增強生成(RAG)
type: concept
tags: [RAG, 知識管理]
updated: 2026-11-16
source_ids: []
status: draft
---

# 檢索增強生成(RAG)

## 核心說明
檢索增強生成(Retrieval-Augmented Generation, RAG)指模型在產生回答時，先取用外部資訊作為參考的系統設計。這是一項技術概念介紹；正式的效能比較仍需補入經查核的研究文獻。

## 與LLM Wiki的關係
一般RAG可以在每次提問時搜尋相關資料；本專案的LLM Wiki則要求AI在**來源加入當下**整理成可持續維護的Markdown知識頁，並同步更新既有概念、索引及交叉連結。因此兩者的目標不同，也可以並用。

## 研究要點
可以整理的研究問題包括：檢索品質、來源可追溯性、回答的引用準確性、知識更新成本，以及不同任務的適用性。這些是**待實證檢驗的比較面向**，不能直接推論Wiki一定優於RAG。

## 限制與待查問題
- 尚未加入符合本專案證據規範的RAG實證期刊論文。
- 不宣稱本專案能夠自動上傳PDF、建立向量資料庫或即時回答所有問題。

## 相關頁面
- [大型語言模型(LLM)](./large-language-model.md)
- [AI代理(Agent)](./ai-agent.md)
- [LLM研究知識地圖](../synthesis/research-map.md)

## 參考來源
- 本頁目前為技術概念與專案設計說明；**尚待補入符合SCIE/SSCI或政府來源規範的實證研究**。

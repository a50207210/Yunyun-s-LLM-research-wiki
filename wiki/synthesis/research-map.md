---
id: research-map
title: LLM研究知識地圖
type: synthesis
tags: [研究架構, LLM]
updated: 2026-11-16
source_ids: [nist-ai-rmf, nist-genai-profile, hpa-diet-2018, hpa-prenatal-2018]
status: draft
---

# LLM研究知識地圖

## 核心說明
本頁示範LLM Wiki如何將分散概念整合成可以持續修訂的研究知識網絡。內容目前屬於**研究主題導覽**，不是已完成的系統性文獻回顧。

## 主題架構
- **基礎模型**：[大型語言模型](../concepts/large-language-model.md)記錄基本概念及研究範圍。
- **知識存取**：[檢索增強生成(RAG)](../concepts/retrieval-augmented-generation.md)整理外部資料與生成之間的關係。
- **工作流程**：[AI代理(Agent)](../concepts/ai-agent.md)記錄工具使用及多步驟工作流程。
- **品質與風險**：[研究評估與證據品質](../methods/evaluation-and-evidence.md)管理正確性、可信度與限制。

## 跨領域資料整理示範(營養主題)
另以兩份國健署2018年政府出版物實際演示Ingest流程，建立[一般與孕產期飲食指引比較](./taiwan-nutrition-guidelines-comparison.md)及相關概念頁。此示範用於檢查Wiki的來源追溯與交叉連結能力，不將營養資料當作LLM研究證據。

## 持續累積的方法
新增一篇來源後，AI應將其研究結果連到上述相關概念，並檢查是否需要修訂既有綜整。若不同研究結果相互衝突，應保留各自的條件與證據，而非只保留最新的主張。

## 限制與待查問題
- 各主題仍需更多經查核的SCIE/SSCI研究文獻。
- 不同LLM版本與評估情境可能導致結果不可直接比較，未經查核不推定成效。

## 相關頁面
- [NIST AI風險管理架構](../sources/nist-ai-rmf.md)
- [NIST生成式AI風險管理概況](../sources/nist-generative-ai-profile.md)
- [營養指引比較示範](./taiwan-nutrition-guidelines-comparison.md)

## 參考來源
- NIST. (2023). *Artificial Intelligence Risk Management Framework (AI RMF 1.0).* [官方文件](https://doi.org/10.6028/NIST.AI.100-1)
- NIST. (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile.* [官方文件](https://doi.org/10.6028/NIST.AI.600-1)
- 衛生福利部國民健康署(2018)。*每日飲食指南手冊*。[原始PDF](../../raw/sources/hpa-daily-dietary-guidelines-2018.md)。
- 衛生福利部國民健康署(2018)。*媽媽的營養，寶寶的健康：懷孕及哺乳期營養參考手冊*。[原始PDF](../../raw/sources/hpa-prenatal-lactation-nutrition-2018.md)。

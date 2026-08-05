export default `# 其它常见数据库

> 索引卡：知道名字、模型、常见舞台即可。深用再开专书。  
> 分数见 **版图与流行度**；本仓落点只在文末一行。
> **学会之后**：能索引 Oracle/SQL Server/搜索/向量库各一句定位。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 关系巨头 | Oracle / SQL Server 企业存量 |
| 搜索 | ES/OpenSearch 倒排检索 |
| 向量 | 嵌入相似度；可独立 Core |
| 本仓 | 按需可选，勿堆进 Runtime 必需 |

\`\`\`check
{"title":"其它库通关","items":[{"id":"ent","text":"能各一句定位 Oracle / SQL Server","hint":"企业关系"},{"id":"search","text":"知道 ES/OpenSearch 主战场是倒排检索","hint":"搜索"},{"id":"vec","text":"知道向量检索可独立 Core，不进 Runtime 必需","hint":"本仓"}]}
\`\`\`

## 商业 / 企业关系库

| 产品 | 直觉 |
|------|------|
| **Oracle Database** | 大型企业核心账务与套件常见；DB-Engines 分数长期居首档 |
| **Microsoft SQL Server** | Windows / .NET 生态与企业 BI 常见 |

## 搜索与分析

| 产品 | 直觉 |
|------|------|
| **Elasticsearch / OpenSearch** | 全文检索、日志检索；倒排索引 |
| **Snowflake 等云数仓** | 分析型、存算分离 |

## 向量与 AI 检索

| 形态 | 直觉 |
|------|------|
| **专用向量库** | 相似度检索、RAG 后端之一 |
| **PG / 其它扩展** | 在关系库上加向量能力 |
| **本仓** | \`vector-Core\` 可选；契约见第四章 **数据与缓存** |

## 选型记忆钩

\`\`\`mermaid
flowchart TB
  Need[你要存什么访问模式] --> Rel{强事务表格?}
  Rel -->|是| SQL[PG / MySQL / 商业 SQL]
  Rel -->|文档灵活| Doc[MongoDB]
  Rel -->|热键值| KV[Redis]
  Rel -->|嵌入单机| Emb[SQLite]
  Rel -->|全文搜索| SE[Elasticsearch…]
  Rel -->|向量相似| Vec[向量库 / 扩展]
\`\`\`

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **OLTP**（Online Transaction Processing，联机事务处理） | 面向短事务、频繁读写的业务库（下单、支付） | Oracle / SQL Server / PG / MySQL 常见主战场 | 别和 **OLAP**（分析型、扫大表报表）混 |
| **OLAP**（Online Analytical Processing，联机分析处理） | 面向聚合分析、列存/数仓的读多场景 | Snowflake、部分数仓；报表「昨天下单多少」 | 别把分析库当唯一交易库硬扛高并发写入 |
| **倒排索引（Inverted Index）** | 从「词 → 含该词的文档列表」查全文 | Elasticsearch / OpenSearch 搜日志、商品标题 | 不是 B+ 树主键索引的另一种叫法；用途不同 |
| **向量检索（Vector Search）** | 用嵌入向量做相似度（近邻）查找 | RAG 召回、推荐；本仓可选 \`vector-Core\` | 向量库 ≠ 大模型本身；只是存/查向量的中间件 |
| **RAG**（Retrieval-Augmented Generation，检索增强生成） | 先检索再让 LLM 生成，减少胡编 | 客服知识库、文档问答；检索后端可能是向量库或 ES | RAG 是架构模式，不是某一个数据库产品名 |
| **多模型 DBMS（Multi-model）** | 一个产品同时支持多种数据模型 | PostgreSQL 有关系 + JSON + 扩展向量；Mongo 也有多能力 | 多模型 ≠ 「一个库解决全世界」；复杂度与运维仍要评估 |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 企业 / 搜索 / 向量 | 按需可选；**勿**堆进 Runtime 必需 |
| 向量检索 | 可选 \`vector-Core\`；RAG 模式见第五章 |
| 契约 | 第四章 **数据与缓存** · \`docs/database.md\` |

## 下一步

回 **版图** 对照分数；动手 → **SQL 最小动手**。
`;

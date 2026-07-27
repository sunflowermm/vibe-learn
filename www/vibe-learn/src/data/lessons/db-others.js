/** 其它常见数据库索引 */
export default `# 其它常见数据库

> 索引卡：知道名字、模型、常见舞台即可。深用再开专书。  
> 分数见 **版图与流行度**；本仓落点只在文末一行。

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

## 下一步

回 **版图** 对照分数；本仓实践 → 第四章 **数据与缓存**。  
`;

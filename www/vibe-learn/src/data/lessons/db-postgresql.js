export default `# PostgreSQL

> **分类：开源关系型 DBMS**（可多模型扩展：JSON、全文、地理、向量等）。  
> 独立服务（默认 **5432**）。本课讲 **产品定位与选型口述**；本仓 \`postgres-Core\` → 第四章 **数据与缓存**。  
> **学会之后**：能说清「PG 是关系库服务 / 中间件，不是语言」；并对照 MySQL / Redis / SQLite 各一句。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 关系型 C/S DBMS；扩展可多模型，仍是同一产品 |
| 端口直觉 | 默认 5432；应用用驱动连，不链进源码 |
| 本仓 | 可选 \`postgres-Core\`；**不**进 Runtime fail-fast；不替代 Redis/SQLite |
| 对照 | vs MySQL（生态/扩展）、vs Redis（模型）、vs SQLite（嵌入） |

\`\`\`check
{"title":"PostgreSQL 通关","items":[{"id":"what","text":"能说明：关系型 C/S DBMS（可扩展），不是语言","hint":"分类"},{"id":"port","text":"默认 5432；应用用驱动连","hint":"形态"},{"id":"xrk","text":"知道 postgres-Core 可选，不进 Runtime fail-fast","hint":"本仓"}]}
\`\`\`

## 1. 它是什么

| 点 | 说明 |
|----|------|
| **模型** | 表 + SQL；事务与约束成熟 |
| **生态** | 扩展丰富（含向量等，视版本/扩展） |
| **定位** | 复杂查询、强一致业务库的常见开源首选之一 |
| **流行度** | DB-Engines 前列（见 **版图与流行度**） |

\`\`\`mermaid
flowchart LR
  App[应用] -->|SQL| PG[postgres 服务]
  PG --> Disk[(数据目录)]
\`\`\`

## 2. 何时优先考虑

| 适合 | 谨慎 |
|------|------|
| 多表关联、强约束、复杂报表 SQL | 只要热缓存（→ Redis） |
| 要 JSON/地理/向量等扩展且想少换库 | 单机零运维嵌入（→ SQLite） |
| 团队已有 PG 运维与托管习惯 | 「因为火」且无人会备份/迁移 |

## 3. 与 MySQL / Redis / SQLite（口述）

| 维度 | PostgreSQL | 对照 |
|------|------------|------|
| 模型 | 关系 + 强 SQL | Redis：键值/结构；Mongo：文档 |
| 形态 | C/S 服务 | SQLite：嵌入文件 |
| 生态惯性 | 扩展与标准符合度常被强调 | MySQL：传统 Web / LAMP 存量大 |
| 本仓 | 可选业务 Core | Runtime 必需仍是 Redis + SQLite |

服务形态总论见 **数据库服务**；中间件定义见语言章。

## 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **RDBMS**（Relational Database Management System） | 用表、行、列 + SQL 管理数据 | 订单、账务、库存等多表关联 | 关系型也可存 JSON；不等于「只能存关系」 |
| **ACID** | 事务四性质：原子 / 一致 / 隔离 / 持久 | 转账扣款与入账同一事务 | 别和 BASE（最终一致口号）混 |
| **MVCC** | 多版本并发，读写少互堵 | PG 读多写场景常见 | ≠ 完全无锁；真空清理仍要懂 |
| **WAL** | 预写日志，崩溃可恢复 | 生产可靠持久化；备份常结合归档 | 思想近 Redis AOF，产品不同 |
| **扩展（Extension）** | 插件式加类型/索引/函数 | \`vector\` / PostGIS 等 | 扩展 ≠ 换数据库产品 |
| **本仓 \`postgres-Core\`** | 可选业务 Core，自管连接 | 有关系型业务数据时接入 | 不替代 Runtime Redis / SQLite |

\`\`\`quiz
{"title":"PostgreSQL","questions":[{"q":"本仓主服没装 PostgreSQL 能否启动？","choices":[{"t":"不能，PG 是 Runtime 必需","ok":false,"why":"必需是 Redis + SQLite；PG 可选。"},{"t":"能；PG 走可选 Core，不进 fail-fast","ok":true,"why":"契约在第四章数据与缓存。"},{"t":"能，因为 PostgreSQL 是编程语言","ok":false,"why":"它是 DBMS。"}]}]}
\`\`\`

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 关系业务库 | 可选 \`postgres-Core\`；自管连接与备份 |
| 热路径 | **不**替代 Redis；本地轻量状态仍看 SQLite |
| 契约 | 第四章 **数据与缓存** · \`docs/database.md\` |

## Coding Agent

\`\`\`prompt
目标：帮我判断某业务表该放 PostgreSQL 还是继续用本仓 SQLite/Redis。
现场：读写模式=…；是否要多机共享=…；是否要复杂 JOIN=…
约束：不建议把热缓存职责塞进 PG；不修改 Runtime 把 PG 变成必需。
验收：给出推荐与一条迁移/接入下一步（文档或 Core 名）。
\`\`\`

## 下一步

**MySQL** — 另一关系巨头；**MongoDB** — 文档对照。
`;

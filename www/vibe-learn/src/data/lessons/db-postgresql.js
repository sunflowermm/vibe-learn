/** PostgreSQL */
export default `# PostgreSQL

> **分类：开源关系型 DBMS**（可多模型扩展：JSON、全文、地理、向量等）。  
> 独立服务（默认 5432）。本课讲 **产品定位**；本仓 \`postgres-Core\` → 第四章 **数据与缓存**。

## 要点

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

与 **MySQL** 对照见下一课；服务形态见 **数据库服务**。

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **RDBMS**（Relational Database Management System，关系型数据库管理系统） | 用表、行、列 + SQL 管理数据，强调约束与事务 | 订单、账务、库存等多表关联场景常选 PostgreSQL / MySQL | 关系型 ≠ 「只能存关系」；PostgreSQL 也可存 JSON、做扩展 |
| **ACID**（Atomicity / Consistency / Isolation / Durability，原子性/一致性/隔离性/持久性） | 事务要「要么全成要么全不成、结果合法、隔离并发、落盘可靠」的四性质 | 转账扣款与入账包在一个事务里；崩溃重启后已提交数据仍在 | 别和 **BASE**（Eventually consistent 等）混：BASE 偏分布式最终一致口号 |
| **MVCC**（Multi-Version Concurrency Control，多版本并发控制） | 读写各看合适版本，减少锁互等 | PostgreSQL 读多写场景常见；「幻读」等隔离级别面试常问 | MVCC ≠ 完全无锁；写冲突、真空清理仍要理解 |
| **WAL**（Write-Ahead Logging，预写式日志） | 先写日志再改数据页，崩溃可恢复 | 生产打开可靠持久化；备份常结合 WAL 归档 | 别和 Redis **AOF** 混名：思想相近，产品实现不同 |
| **扩展（Extension）** | 给数据库加插件能力（类型、索引、函数） | \`vector\`/\`postgis\` 等；本仓向量也可走独立 \`vector-Core\` | 扩展 ≠ 换数据库产品；仍是同一 PostgreSQL 实例上的能力 |
| **本仓 \`postgres-Core\`** | 可选业务 Core，自管连接，不进 Runtime fail-fast | 有关系型业务数据时接入；主服无 Postgres 仍可启动 | 不替代 Runtime 的 Redis / SQLite |

## 下一步

**MySQL** — 另一关系巨头；**MongoDB** — 文档对照。  
可选 \`postgres-Core\` 落点仍在第四章 **数据与缓存**（图谱主桥：Redis / SQLite）。  
`;

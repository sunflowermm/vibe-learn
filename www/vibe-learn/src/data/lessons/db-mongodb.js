/** MongoDB */
export default `# MongoDB

> **分类：文档型 DBMS（NoSQL 头部之一）**。  
> 以 BSON 文档集合存储；**独立服务进程**（默认端口常 27017）。  
> **不是**语言、不是框架。本课讲 **模型与服务形态**；本仓 \`mongodb-Core\` / soft-skip → 第四章 **数据与缓存**。

## 本课你要带走什么
\`\`\`flip
{"title":"MongoDB · 翻卡","cards":[{"front":"MongoDB","back":"文档模型，JSON 样文档集合"},{"front":"别混成","back":"编程语言 / Web 框架"}]}
\`\`\`


1. 文档模型 vs 关系表  
2. 为何仍是「服务 / 中间件」那一层  
3. 和本仓 Redis/SQLite 职责不重叠

---

## 1. 文档模型直觉

| 关系库 | MongoDB |
|--------|---------|
| 表 · 行 · 列 | 集合 · 文档（类 JSON） |
| 预先严格 schema（可演进） | 文档结构更灵活（仍要纪律） |
| SQL | 查询 API / 聚合管道 |
| JOIN 一等公民 | 嵌套文档 + 应用侧关联 / \`$lookup\` |

适合：产品迭代快、半结构化对象、内容/日志类文档。  
不适合：把「需要强多表事务与复杂报表」的场景硬塞进来却不评估。

---

## 2. 服务与中间件

\`\`\`mermaid
flowchart LR
  App[业务应用] -->|驱动| Mongod[mongod 服务]
  Mongod --> Data[(数据文件)]
\`\`\`

- 独立安装或 Atlas 等托管  
- 多应用可连同一集群  
- 故与其它 DBMS 一样，常归 **数据中间件 / 数据层**（定义见 **中间件视角**）

流行度：DB-Engines 上长期居文档库前列（见 **版图与流行度**）。

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **文档模型（Document Model）** | 以 JSON 样文档为一条记录 | 用户 profile 嵌套地址数组 | 别和 **关系表行** 混：嵌套 vs 规范化多表 |
| **BSON（Binary JSON，二进制 JSON）** | MongoDB 磁盘与线上的二进制文档格式 | 比纯 JSON 多类型（Date、ObjectId） | 别和「API 里的 JSON 字符串」混：存储格式不同 |
| **NoSQL（Not Only SQL）** | 非关系为主的一类数据库统称 | Mongo、Redis、Cassandra | 不是「不能写查询」；很多有丰富 API |
| **集合（Collection）** | 文档的容器 | \`users\` 集合里许多 \`{...}\` 文档 | 别和 **表（Table）** 一一等同：schema 更灵活 |
| **mongod（MongoDB Daemon）** | MongoDB 服务端守护进程 | 默认 27017；多 App 共享 | 别和 **mongosh** 混：后者是客户端 shell |
| **$lookup（聚合关联）** | 类似 JOIN 的聚合阶段 | 跨集合拉关联文档 | 性能与关系库 JOIN 不同；能嵌套优先嵌套 |

## 下一步

**其它常见库** — 索引卡收尾；关系库对照见 **PostgreSQL / MySQL**。  
本仓若要用文档库：第四章 **数据与缓存** 里的可选 Core / soft-skip（图谱主桥仍是 Redis / SQLite）。  
`;

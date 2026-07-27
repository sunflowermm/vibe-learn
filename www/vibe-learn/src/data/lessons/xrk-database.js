/** 数据库 · Redis / SQLite / 可选 Core */
export default `# 数据与缓存 · 本仓契约

> 本课钉 **XRK-AGT 怎么用库**，不重讲「数据库是什么」。  
> 概念 / 产品门派 / 流行度 → 番外 **数据库**；本机安装 Redis → **部署环境**。

## 模块边界

| 问题 | 去哪一课 |
|------|----------|
| Redis / Mongo / SQLite 各是什么模型？ | 番外对应产品课 |
| 为何叫中间件？Node 是不是框架？ | 语言章 **库 · 框架 · 运行时 · 中间件** + 番外 **中间件视角** |
| 怎么装 Redis、进 PATH？ | **部署环境** |
| Runtime 必需谁？路径、全局名、health？ | **本课** + \`docs/database.md\` |

## 本课你要带走什么

1. 五种存储在本仓的**归属**（Runtime vs 可选 Core）  
2. \`src/infrastructure/database\` 与 \`docs/database.md\` 权威约定  
3. 实践：启动日志 / \`/api/health\` 确认 Redis 与 SQLite  

---

## 1. 用途分工（本仓）

| 存储 | 归属 | 典型用途 | 业务访问 |
|------|------|----------|----------|
| **Redis** | Runtime | 会话热缓存、插件计数、\`AGT:restart:\`、HTTP 控制面 | 裸名 \`redis\` / \`getRedis()\` |
| **SQLite** | Runtime | 本地持久、单机查询；**不替代** Redis | 裸名 \`sqlite\` / \`getSqlite()\` |
| **Mongo** | \`mongodb-Core\` | 文档型业务数据 | Core 自管连接 |
| **Postgres** | \`postgres-Core\` | 关系型业务数据 | Core 自管连接 |
| **Vector** | \`vector-Core\` | 向量检索 / RAG 后端之一 | Core 自管连接 |

\`\`\`mermaid
flowchart TB
  Start[启动] --> Ensure[ensure-redis]
  Ensure --> DM[DatabaseManager.initDatabases]
  DM --> R[redisInit fail-fast]
  DM --> S[sqliteInit fail-fast]
  R --> G1["setRuntimeGlobal redis"]
  S --> G2["setRuntimeGlobal sqlite"]
  Opt[mongodb / postgres / vector Core] -.->|registerPersistenceProvider| Health["/api/health.services.persistence"]
\`\`\`

跨引擎：**仅最终一致**，无跨库统一事务（见 \`docs/database.md\` · \`PERSISTENCE_POLICY\`）。

---

## 2. 本仓路径

| 项 | 路径 |
|----|------|
| 总文档 | \`docs/database.md\` |
| 入口 | \`src/infrastructure/database/index.js\` |
| Redis / SQLite 实现 | \`src/infrastructure/redis.js\` · \`sqlite.js\` |
| 模板 | \`config/default_config/redis.yaml\` · \`sqlite.yaml\` |
| 运行时配置 | \`data/server_bots/redis.yaml\` 等 |
| Schema | \`core/system-Core/commonconfig/\`（含 redis / sqlite 段） |
| 可选 Core | \`core/mongodb-Core/\` · \`postgres-Core/\` · \`vector-Core/\` |
| 健康检查 | \`GET /api/health\` → \`services.redis\` / \`services.sqlite\` |

禁止：再为 Runtime 引入 npm \`sqlite3\` / \`sequelize\` 等替代 \`node:sqlite\`。

---

## 3. 业务写法直觉

\`\`\`javascript
// Redis（启动完成后）
if (redis?.isOpen) await redis.set('my:key', 'value')

// SQLite（同步 API）
sqlite.prepare('SELECT 1 AS ok').get()
\`\`\`

配置变更（连接参数）通常要**重启**才重建连接。测试可用 \`XRK_SQLITE_MEMORY=1\`、\`XRK_FAST_START=1\`（见文档）。

可选 DB Core 探活可出现在 health 的 \`persistence\`；**单独挂掉一般不把整个 Runtime 打成 unhealthy**（与 Redis/SQLite 不同）——以 \`docs/database.md\` 为准。

---

## 4. 边界 FAQ（勿发明 API）

| 问题 | 答案骨架 |
|------|----------|
| 不装 Redis 行吗？ | **不行**（Runtime 必需，见 database.md FAQ） |
| 关 SQLite 行吗？ | **不建议**；与 Redis 同级初始化 |
| Mongo 挂了主服会挂吗？ | 可选 Core soft-skip；探活进 \`persistence\`，一般不单独打成 unhealthy |
| 配置改了？ | 连接多在启动期建立 → **重启** |
| 跨 Redis+SQLite 事务？ | **无**统一 UoW；仅最终一致 |

Docker / 本机拉起 Redis：见 \`docs/docker.md\`、\`scripts/ensure-redis.mjs\`（database.md）；手顺也见 **部署环境**。

### 可选数据 Core 仓库

| Core | 作用 | 仓库 |
|------|------|------|
| mongodb-Core | Mongo 文档库 SPI | [sunflowermm/mongodb-Core](https://github.com/sunflowermm/mongodb-Core) |
| postgres-Core | PostgreSQL SPI | [sunflowermm/postgres-Core](https://github.com/sunflowermm/postgres-Core) |
| vector-Core | Qdrant 向量 / RAG | [sunflowermm/vector-Core](https://github.com/sunflowermm/vector-Core) |

名录总表 → **业务层全景** §4。

---

## 5. 实践清单

1. 启动主服，日志确认 Redis 探测/连接成功（\`ensure-redis\` / redisInit）。  
2. \`GET /api/health\`，查看 \`services.redis\` 与 \`services.sqlite\`。  
3. 打开 \`docs/database.md\`「用途分工」表，对照本机是否启用了任一 \`*-Core\`。  
4. 口述：会话热数据为何优先 Redis，而不是只写 SQLite。  

---

## 6. 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **fail-fast（快速失败）** | 必需依赖缺失则启动即报错退出 | 本仓无 Redis → redisInit 失败，主服不起 | 别和 **soft-skip** 混：后者允许跳过继续跑 |
| **soft-skip（软跳过）** | 可选组件失败不拖垮整个 Runtime | Mongo/PG Core 挂了 → persistence 探活告警 | Redis/SQLite **不** soft-skip——二者必需 |
| **热数据（Hot Data）** | 高频读写、可过期、宜放内存 | 会话、插件计数、\`AGT:restart:\` → **Redis** | 别全塞 SQLite：并发与过期语义不同 |
| **落盘（On-Disk Persistence）** | 重启后仍要保留的本地结构化数据 | Runtime **SQLite**；非替代 Redis 缓存 | 别用 SQLite 当跨实例共享缓存 |
| **裸名全局（Runtime Global）** | 启动后 \`redis\`/\`sqlite\` 挂 globalThis | 业务 \`if (redis?.isOpen)\` 即用 | 别 \`import\` 再造实例；见 dev-requirements |
| **最终一致（Eventual Consistency）** | 跨引擎无统一事务，各写各的稍后对齐 | Redis 与 SQLite 无跨库 UoW | 别发明「分布式两阶段提交」在本仓 |
| **health 探活（Health Check）** | \`/api/health\` 报告各服务状态 | \`services.redis\`/\`sqlite\` 必需；\`persistence\` 可选 | 可选 Core 单独挂一般不 overall unhealthy |

---

## 7. 文档链接

- \`docs/database.md\`（本课真源）  
- \`docs/startup.md\` · \`docs/docker.md\`  
- \`docs/config-base.md\` · \`docs/app-dev.md\` · \`docs/plugin-base.md\`

## 下一步

番外 **Redis / SQLite / MongoDB**（补产品直觉）· **部署环境**（装机）· **Auth** · **Stream / RAG**（向量 Core）· **配置归属**。
`;

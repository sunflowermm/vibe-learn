/** Express / NestJS — 场景 + 特性 + 本仓对照（加厚） */
export default `# Express / NestJS（框架）

> **分类：Node.js 上的 Web 框架。不是语言。**  
> 宿主语言：**JavaScript / TypeScript**；运行时：**Node.js**。  
> 本仓主服是自研 **AgentRuntime + Loader**（同样有「框架气质」），**不是** Express/Nest；但大厂面试、外包交付、对照选型几乎必谈这一对。

## 本课你要带走什么

1. Express 和 Nest **各自解决什么问题**、**什么场景选谁**  
2. 中间件 / 模块 / DI 等框架特性怎么讲清楚  
3. 和本仓主服、www、子服分别是什么关系（别混）

---

## 1. 使用场景：何时用、何时不用

### 1.1 Express —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **小 API / 原型 / 内部工具** | 几行就能起 HTTP；心智负担低 |
| **中间件拼装型网关** | 鉴权、日志、限流用 \`app.use\` 串起来很直观 |
| **已有大量 Express 中间件生态** | passport、multer、各类现成包 |
| **团队小、约定能口头对齐** | 不需要强目录规范也能跑 |

### 1.2 Express —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **多人、多模块长期演进的中大型后端** | 无强制分层，易变成「路由文件里写一切」 |
| **强依赖注入、可测试架构诉求** | 要自己搭容器或约定，不如 Nest 开箱 |
| **要和 Angular/Spring 同构的企业规范** | Nest 更对齐 |
| **本仓主服替代** | **不要**；主服契约是 AgentRuntime，不是再挂一套 Express 抢入口 |

### 1.3 NestJS —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **中大型 Node 后端、多人协作** | Module / Provider / Controller 边界清晰 |
| **要 DI、单元测试、替换实现** | 构造器注入，mock 友好 |
| **从 Java Spring / Angular 转 Node 的团队** | 装饰器 + 模块心智接近 |
| **GraphQL / 微服务 / WebSocket 统一架构** | 官方有成套集成方式 |
| **OpenAPI / 校验 / 守卫一套齐** | Pipe、Guard、Interceptor 现成 |

### 1.4 NestJS —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **一天要上线的极简脚本 API** | 脚手架与概念偏重，Express 更快 |
| **团队只会回调式 JS、拒绝 TS** | Nest 以 TypeScript 为一等公民 |
| **把 Nest 塞进本仓主服进程「重写 Runtime」** | 违反 Core/主服边界；应用逻辑进 \`core/\` |

### 1.5 一张对照表（选型口述版）

| 维度 | Express | NestJS |
|------|---------|--------|
| 定位 | 微框架 / 中间件核 | 意见性强的应用框架 |
| 上手 | 快 | 中等（要学模块与 DI） |
| 结构 | 靠约定 | 框架强制分层 |
| 类型 | 可选 | 几乎默认 TS |
| 类似谁 | Connect 系、Koa 近亲 | Spring / Angular |
| 本仓关系 | 对照学习 | 对照学习；主服不用它替换 Runtime |

\`\`\`mermaid
flowchart TB
  Need[要做 Node HTTP 服务] --> Size{规模与团队?}
  Size -->|小/快| Ex[Express]
  Size -->|中大/要结构| Nest[NestJS]
  Need --> XRK{是 XRK 主服吗?}
  XRK -->|是| RT[用 AgentRuntime + core/http]
  XRK -->|否，独立服务或对照| Size
\`\`\`

---

## 2. Express 框架特性（讲清楚）

### 2.1 中间件管道（灵魂）

每个中间件形如 \`(req, res, next) => { … }\`：

- 处理完调用 \`next()\` → 交给下一个  
- 不调用 \`next\` 且已 \`res.end\` → 结束  
- 传 \`next(err)\` → 跳到错误中间件  

**顺序 = 行为。** 鉴权放错位置，未登录请求可能打到业务。

| 类型 | 例子 |
|------|------|
| 应用级 | \`app.use(cors())\` |
| 路由级 | \`router.use(auth)\` |
| 错误级 | \`(err, req, res, next)\` **四个参数** |

### 2.2 路由

\`app.get/post/put/delete(path, ...handlers)\`；\`express.Router()\` 按资源拆文件。  
路径参数 \`/users/:id\`，查询串 \`req.query\`，体 \`req.body\`（需 \`express.json()\` 等解析中间件）。

### 2.3 无强约束的代价与好处

| 好处 | 代价 |
|------|------|
| 灵活、包体小、 intervening 少 | 目录、错误处理、校验各写各的 |
| 易嵌进现有 Node 进程 | 长期项目要自己立规矩 |

---

## 3. NestJS 框架特性（讲清楚）

### 3.1 模块

\`@Module({ imports, controllers, providers, exports })\`  
边界清晰：谁提供、谁导出、谁可见。大应用靠模块拆分，而不是一个 \`routes.js\` 三千行。

### 3.2 依赖注入

\`\`\`ts
constructor(private readonly users: UsersService) {}
\`\`\`

框架创建 \`UsersService\` 并注入；测试时换假实现。这是 Nest 相对 Express 的核心价值之一。

### 3.3 请求管道上的「角色」

| 角色 | 做什么 |
|------|--------|
| **Guard** | 能不能进（鉴权、角色） |
| **Pipe** | 参数校验/转换（DTO + class-validator） |
| **Controller** | 解析 HTTP，调 Service |
| **Service / Provider** | 业务逻辑 |
| **Interceptor** | 前后环绕（日志、统一包装、缓存） |
| **Filter** | 异常到 HTTP 响应 |

\`\`\`mermaid
flowchart LR
  Req --> Guard --> Pipe --> Ctrl[Controller] --> Svc[Service]
  Svc --> Interceptor
  Interceptor --> Res
\`\`\`

### 3.4 底层可换

默认 Express；可切 Fastify 等适配器——学的是 Nest 的架构层，不是绑死某一个 HTTP 库。

---

## 4. 与本仓、www、子服的关系（别混）

| 层次 | 本仓怎么做 | Express/Nest 的位置 |
|------|------------|---------------------|
| **主服 HTTP** | \`core/*/http\` + \`HttpResponse\` + AgentRuntime | **对照**；不要用 Express 替换主服入口 |
| **浏览器页面** | \`core/*/www/<应用>/\`（Vue/React…） | Express/Nest **不是** www 前端框架 |
| **独立 Node 微服务** | 可放仓库外或另仓；经网关/主服调用 | 这里才常真正用 Express/Nest |
| **子服** | Python/Go/… 各 runtime | Nest 仍是 Node；与 pyserver 等并列的是「另一种后端」，不是子服替代品 |

页面怎么挂：见 **HTTP 与 www**、**Vue**。  
主服为何是自研 Runtime：见 **AgentRuntime**、**插件式架构**。

---

## 5. 和大厂面试怎么答

### 「Express / Nest 是库还是框架？」

**Express**：偏**微框架**，核心是中间件 + 路由，**你组装**栈，IoC 弱。  
**NestJS**：**意见性应用框架**，Module/Provider/Controller + **DI**，IoC 强，像 Spring。  
二者都跑在 **Node.js 运行时**上，语言是 **JavaScript/TypeScript**——**Node 本身不是框架**。  
**本仓**：主服是 **AgentRuntime + Loader**（框架式运行时），**不是 Express/Nest**；这对照学习、外包交付常见，非主服技术选型。

### 「Express 中间件原理？」

线性 \`(req, res, next) => {}\` 链：调 \`next()\` 进下一个；\`next(err)\` 跳错误中间件（**四参**）；顺序决定鉴权是否在业务前。  
与 **Koa 洋葱模型**、**ASP.NET Middleware** 概念相近，API 不同。

### 「为什么上 Nest 不上 Express？」

团队规模、要 **DI** 与可测性、统一 **Guard/Pipe/Interceptor** 横切 → Nest。  
小 API、原型、中间件拼装网关 → Express 更快。  
**别和 Next.js 混名**：Next 是 React 元框架，Nest 是 Node 后端框架。

### 「Nest 和 Spring 像吗？」

都像：**IoC + 分层 + 装饰器/注解风格**；语言（TS vs Java）与生态（JVM vs Node）不同。  
从 Java 转 Node 的团队常选 Nest 降低心智切换成本。

### 「在本仓能用 Express 替换主服吗？」

**不能。** 主服契约是 AgentRuntime、Loader、CommonConfig、插件热加载；业务进 \`core/*/http\`，页面进 \`www/\`。  
Express/Nest 适合**独立 Node 微服务**或对照学习，不是第二套主入口。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [expressjs/express](https://github.com/expressjs/express) | ⭐ 六万级 | 中间件 \`next\` 链、路由 | **对照**主服 HTTP；业务进 \`core/*/http/\` |
| [nestjs/nest](https://github.com/nestjs/nest) | ⭐ 六万级 | DI、模块、Guard/Interceptor | **对照**自研 Runtime；勿再造第二主入口 |
| [koajs/koa](https://github.com/koajs/koa) | ⭐ 三万级 | 洋葱模型、async 中间件 | 理解中间件家族；本仓仍用 Loader 挂路由 |

---

## 6. 下一步

- 语言：**JavaScript** / **TypeScript**  
- 同生态前端元框架：**Next.js**（别和 Nest 名字搞混）  
- 企业后端对照：**Spring**  
- 本仓落点：**HTTP 与 www** · **AgentRuntime** · **语言栈**  
- 可选：读 Express 中间件一页，再对照本仓 HTTP handler 怎么写。
`;

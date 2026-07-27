/** ASP.NET Core — 场景 + 特性 + 本仓 netserver 子服对照（加厚） */
export default `# ASP.NET Core（框架）

> **分类：.NET 跨平台 Web 框架。不是语言。**  
> 宿主语言：**C#**；运行平台：**.NET / CLR**。  
> 本仓经 **netserver 子服**暴露 .NET 能力；**不进 www**；浏览器 SPA 走 **Vue/React → www**。

## 本课你要带走什么

1. ASP.NET Core **何时选、何时别用**，和 Spring / Nest 怎么口述  
2. 中间件管道、DI 生命周期、MVC/Minimal API 等**特性**  
3. 在本仓 **netserver** 与主服 \`http/\` 的分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"ASP.NET · 翻卡","cards":[{"front":"ASP.NET","back":".NET Web 框架"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 ASP.NET Core —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **微软系 / .NET 团队** | 工具链、Azure、Visual Studio 一体 |
| **高性能 API + 强类型** | C# + 异步 + DI 内置 |
| **企业级鉴权、策略** | Identity、Policy、JWT 成熟 |
| **跨平台部署（Kestrel）** | Linux 容器常见 |
| **本仓 netserver 跑 .NET 服务** | 主服 http 门面调用 |

### 1.2 ASP.NET Core —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **团队只会 JavaScript/Python** | 学习与运维成本 |
| **极简几个端点** | Minimal API 仍要 .NET 运行时 |
| **强依赖 JVM/Spring 生态** | 组织标准可能选 Spring |
| **把 Razor 当本仓主 SPA** | 复杂交互推荐 **www + Vue/React** |
| **把 .NET 嵌进 Node 主服进程** | 违反边界；走 netserver |

### 1.3 与竞品对照（选型口述版）

| 维度 | ASP.NET Core | Spring Boot | NestJS |
|------|--------------|-------------|--------|
| 语言 | C# | Java | TypeScript |
| 服务器 | Kestrel | 内嵌 Tomcat 等 | 默认 Express |
| DI | 内置容器 | ApplicationContext | Nest Injector |
| 管道 | Middleware | Filter/Interceptor | Guard/Pipe |
| 本仓 | **netserver** | **jserver** | 对照 |

\`\`\`mermaid
flowchart TB
  Need[企业 Web API] --> Stack{组织栈?}
  Stack -->|.NET| Net[ASP.NET Core]
  Stack -->|Java| Spring[Spring]
  Stack -->|Node| Nest[NestJS]
  Net --> NS[netserver 子服]
  WWW[www] --> Main[主服 http]
  Main --> NS
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 中间件管道

| 点 | 说明 |
|----|------|
| **\`RequestDelegate\`** | \`async Task Invoke(HttpContext ctx)\` |
| **\`await next()\`** | 进入下一节；之前/之后可写逻辑 |
| **短路** | 不调用 next 即结束管道 |
| **顺序** | \`Program.cs\` 注册顺序决定异常页、HTTPS、鉴权、路由 |
| **内置** | Routing、CORS、Authentication、StaticFiles |

\`\`\`mermaid
flowchart LR
  Req --> M1[Middleware 1]
  M1 --> M2[Middleware 2]
  M2 --> Ep[Endpoint]
  Ep --> M2
  M2 --> M1
  M1 --> Res[Response]
\`\`\`

### 2.2 依赖注入（内置）

| 生命周期 | 说明 |
|----------|------|
| **Singleton** | 进程内单例 |
| **Scoped** | 每 HTTP 请求一个（**DbContext** 常用） |
| **Transient** | 每次解析新建 |
| **构造器注入** | Controller / Minimal API 均支持 |
| **与 Spring 对照** | 都是容器 + 接口编程 |

### 2.3 宿主 API 风格

| 风格 | 说明 |
|------|------|
| **MVC / Web API** | \`[ApiController]\` + 路由特性 |
| **Razor Pages** | 页为中心；服务端渲染 |
| **Minimal API** | \`app.MapGet(...)\` 轻量映射 |
| **gRPC** | 高性能 RPC（生态） |

### 2.4 配置与托管

| 点 | 说明 |
|----|------|
| **\`appsettings.json\`** | 分层；环境 \`appsettings.Development.json\` |
| **环境变量** | 容器部署覆盖 |
| **Kestrel** | 跨平台 Web 服务器 |
| **IHost / WebApplication** | .NET 6+ 统一宿主模型 |

### 2.5 数据与 ORM（生态）

| 点 | 说明 |
|----|------|
| **EF Core** | 常用 ORM；迁移、LINQ |
| **Dapper** | 轻量 micro-ORM |
| **异步** | \`async/await\` 贯穿；避免阻塞线程池 |

### 2.6 认证授权（名称级）

| 点 | 说明 |
|----|------|
| **JWT Bearer** | API 常见 |
| **Cookie / Identity** | Web 应用 |
| **Policy** | 基于 claim/角色的授权 |

---

## 3. 与本仓：netserver 子服，不进 www

| 层次 | 本仓 | ASP.NET Core |
|------|------|--------------|
| **主服** | Node + \`core/*/http\` + HttpResponse | 不替换 Runtime |
| **www** | \`core/*/www/\` + sign.json | 浏览器 UI 用 Vue/React 等 |
| **.NET 后端** | **netserver** | Kestrel 应用 |
| **静态文件** | www 的 dist | ASP.NET 可 \`UseStaticFiles\`，但 XRK SPA 仍推荐 www |

\`\`\`mermaid
flowchart LR
  subgraph www_layer [www]
    SPA[Vue / React / Angular]
  end
  subgraph main [主服 Node]
    Http[core/*/http]
  end
  subgraph sub [netserver]
    DotNet[ASP.NET Core API]
  end
  SPA --> Http
  Http --> DotNet
\`\`\`

**sign.json** 描述的是 **www 前端工程**（例：vibe-learn 的 Vue3+Vite，mount \`/vibe-learn/\`）。.NET API **不**用 sign.json 挂到主服静态路径。

---

## 4. 和大厂面试怎么答

### 「ASP.NET Core 是库还是框架？」

**Web 框架（Framework）**——内置 **DI** 容器、中间件管道、MVC/Minimal API，**框架编排请求生命周期**。  
宿主语言：**C#**；运行平台：**CLR**（Common Language Runtime，公共语言运行时）/ **.NET**。  
与 **Spring Boot**（Java + JVM）对照：都有 DI + 管道 + 企业鉴权；平台是微软/Azure 生态。  
**本仓**：.NET 在 **netserver 子服**；主服 Node；SPA 在 **www**，**不替换 AgentRuntime**。

### 「中间件管道怎么工作？」

\`RequestDelegate\`：\`await next()\` 进入下一节，前后可写逻辑；注册顺序决定 HTTPS、鉴权、路由、异常页先后。  
与 **Express \`next()\` 链**、**Spring Filter** 概念相近。

### 「Scoped vs Singleton？」

**Singleton**：进程内单例；**Scoped**：每 HTTP 请求一个（**EF Core DbContext** 必须 Scoped）；**Transient**：每次解析新建。  
Scoped 误当 Singleton → 并发请求共享 DbContext → 严重 bug。

### 「Minimal API vs Controller？」

**Minimal API**：\`app.MapGet\` 轻量映射，适合小服务。  
**Controller + \`[ApiController]\`**：传统分层、过滤器、模型绑定更完整。  
与 **Gin 单文件路由** vs **Spring 分层** 的取舍类似。

### 「在本仓 .NET 放哪？」

**netserver** 子服 Kestrel 应用；\`sign.json\` 只挂 **www 前端**（Vue/React），不挂 .NET API 进程。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [dotnet/aspnetcore](https://github.com/dotnet/aspnetcore) | ⭐ 三万级 | 中间件、DI、Minimal API | **netserver** Web 主机 |
| [dotnet/runtime](https://github.com/dotnet/runtime) | ⭐ 一万级+ | CLR / BCL / async | .NET 子服运行时根基 |
| [dotnet/efcore](https://github.com/dotnet/efcore) | ⭐ 一万级 | ORM、迁移、DbContext 生命周期 | 企业数据访问；主服仍用 Redis/SQLite |

---

## 5. 下一步

- 语言：**C#**  
- 对照：**Spring** · **NestJS** · **Laravel**  
- 前端：**HTTP 与 www** · **Angular**（企业前端常配）  
- 本仓：**子服务端** · **语言栈**  
- 可选：读 ASP.NET 中间件管道一页，对照 \`callSubserver\` → netserver。
`;

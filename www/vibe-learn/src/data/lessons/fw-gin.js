/** Gin — 场景 + 特性 + 本仓 goserver 子服对照（加厚） */
export default `# Gin（框架）

> **分类：Go 语言 HTTP Web 框架。不是语言。**  
> 宿主语言：**Go**；标准库基础：**net/http**。  
> 本仓经 **goserver 子服**暴露 Go 能力；**不进 www**；浏览器页面仍用 **Vue/React → www**。

## 本课你要带走什么

1. Gin **何时选、何时别用**，和标准库 / Echo / Fiber 怎么口述  
2. 路由、中间件、绑定、Context 等**特性**  
3. 在本仓 **goserver** 与主服 \`http/\` 的分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Gin · 翻卡","cards":[{"front":"Gin","back":"Go HTTP 框架"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Gin —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **高性能 JSON API、微服务** | Go 编译型 + 轻量框架 |
| **团队已有 Go、云原生部署** | 单二进制、容器友好 |
| **中间件链式网关/BFF** | \`Group\` + \`Use\` 清晰 |
| **需要比 stdlib 更省 boilerplate** | 路由参数、JSON 绑定开箱 |
| **本仓 goserver 提供 Go 端点** | 主服 http 门面转发 |

### 1.2 Gin —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **强 ORM/Admin 全栈后台** | Django/Laravel 更省工 |
| **团队只会 Python/JS** | Go 学习与工程规范成本 |
| **极简一两个端点** | \`net/http\` 足够 |
| **把 Gin 当 www 前端框架** | Gin 是后端；UI 走 www |
| **Handler 里无脑起 goroutine** | 泄漏与取消传播要自己管 |

### 1.3 与竞品对照（选型口述版）

| 维度 | Gin | net/http | Echo / Fiber |
|------|-----|----------|--------------|
| 路由 | 树 + 参数 | 自己 mux | 类似 Gin |
| 性能叙事 | 高 | 基线高 | 各有 benchmark |
| 生态 | 国内极流行 | 标准 | 备选 |
| 本仓 | **goserver** | 可 goserver | 可 goserver |
| www | **否** | **否** | **否** |

\`\`\`mermaid
flowchart TB
  Need[Go HTTP API] --> Size{规模?}
  Size -->|极小| Std[net/http]
  Size -->|要路由/中间件| Gin[Gin]
  Gin --> GoSrv[goserver 子服]
  WWW[www SPA] --> Main[主服 http]
  Main --> GoSrv
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 Engine 与 net/http

| 点 | 说明 |
|----|------|
| **基于 \`net/http\`** | \`gin.Engine\` 实现 \`http.Handler\` |
| **兼容生态** | 可挂标准中间件、pprof 等 |
| **模式** | \`gin.Default()\` 含 Logger + Recovery |

### 2.2 路由与路由组

| 点 | 说明 |
|----|------|
| **HTTP 方法** | \`GET\` \`POST\` \`PUT\` \`DELETE\`… |
| **路径参数** | \`/users/:id\` → \`c.Param("id")\` |
| **路由组 \`Group\`** | 版本前缀 \`/api/v1\`、统一中间件 |
| **404/405** | 框架统一处理 |

\`\`\`mermaid
flowchart LR
  Req --> Eng[gin.Engine]
  Eng --> G1[Group /api]
  G1 --> MW[中间件链]
  MW --> H[HandlerFunc]
\`\`\`

### 2.3 中间件

| 点 | 说明 |
|----|------|
| **签名** | \`func(c *gin.Context)\` |
| **链式** | \`c.Next()\` 进入下一个；\`c.Abort()\` 短路 |
| **顺序** | 注册顺序 = 执行顺序；Recovery 宜靠前 |
| **常用** | Logger、Recovery、CORS、JWT 鉴权 |

### 2.4 绑定与校验

| 点 | 说明 |
|----|------|
| **JSON** | \`c.ShouldBindJSON(&req)\` |
| **Query / URI** | \`ShouldBindQuery\` \`ShouldBindUri\` |
| **struct tag** | \`binding:"required"\` 等 |
| **错误响应** | 统一 \`c.JSON(400, gin.H{...})\` |

### 2.5 Context 与响应

| 点 | 说明 |
|----|------|
| **\`*gin.Context\`** | 请求级；封装 request/response |
| **\`c.JSON\`** | 常用 API 响应 |
| **与 \`context.Context\`** | \`c.Request.Context()\` 传递取消/超时 |
| **模板** | \`c.HTML\` 可用但 Gin 少当全栈模板主场 |

### 2.6 并发与优雅退出

| 点 | 说明 |
|----|------|
| **每请求一 goroutine** | net/http 模型 |
| **Handler 内再开 goroutine** | 须监听 \`ctx.Done()\` |
| **优雅关闭** | \`http.Server.Shutdown(ctx)\` |

---

## 3. 与本仓：goserver 子服，不进 www

| 层次 | 本仓 | Gin |
|------|------|-----|
| **主服** | Node AgentRuntime + \`core/*/http\` | 不替换主服 |
| **www** | \`core/*/www/\` + sign.json（Vue/React） | **不是** Gin 的职责 |
| **Go 后端** | **goserver** | Gin 服务跑在子服 |
| **调用** | 浏览器 → www → 主服 API → 可选 goserver | JSON HTTP |

\`\`\`mermaid
flowchart LR
  subgraph www_layer [www]
    FE[Vue vibe-learn 等]
  end
  subgraph main [主服 Node]
    Http[core/*/http]
  end
  subgraph sub [goserver]
    GinApp[Gin API]
  end
  FE --> Http
  Http --> GinApp
\`\`\`

**sign.json** 仅用于 **www 前端工程**（如 \`core/vibe-learn-Core/www/vibe-learn/\` 的 Vue3+Vite）。Gin **不**通过 \`mountCoreWwwStatic\` 挂 API 进程。

---

## 4. 和大厂面试怎么答

### 「Gin 是库还是框架？」

**Web 框架（Framework）**——基于 Go **标准库 \`net/http\`**，封装路由树、中间件链、参数绑定。  
宿主语言：**Go**；编译为本地二进制，无 JVM/Node 式长驻脚本宿主。  
与 **Echo/Fiber** 同类对照；与 **Spring**（Java 全家桶 + ORM）比，Gin 更轻、偏 API。  
**本仓**：Go 能力在 **goserver 子服**；主服 Node；UI 在 **www**，**不用 Gin 挂页面**。

### 「Gin 和 net/http 关系？」

\`gin.Engine\` 实现 \`http.Handler\`，可挂标准中间件；Gin 提供 \`:id\` 路由、\`ShouldBindJSON\`、Recovery 等省样板代码。  
极简一两个端点 → 直接用 \`net/http\` 也够。

### 「中间件执行顺序？」

注册顺序 = 执行顺序；\`c.Next()\` 进入链内下一个，返回后执行后置逻辑；\`c.Abort()\` 短路。  
**Recovery** 宜靠前，防 panic 拖垮进程。

### 「goroutine 泄漏怎么防？」

Handler 内再开 goroutine 须监听 \`c.Request.Context().Done()\`；优雅退出用 \`http.Server.Shutdown(ctx)\`。

### 「在本仓 Go 放哪？」

**goserver** 子服跑 Gin API；浏览器 → www → 主服 \`http/\` → 可选转发 goserver。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [gin-gonic/gin](https://github.com/gin-gonic/gin) | ⭐ 八万级 | Engine、中间件、\`Context\` | **goserver** 典型 HTTP 框架 |
| [labstack/echo](https://github.com/labstack/echo) | ⭐ 三万级 | 另一派 Go Web 风格 | 选型对照；本仓仍走子服 HTTP |
| [golang/go](https://github.com/golang/go) | ⭐ 十二万级 | \`net/http\` 标准库 | Gin 之下的语言运行时 |

---

## 5. 下一步

- 语言：**Go**  
- Node 对照：**Express/Nest**  
- 企业对照：**Spring** · **ASP.NET Core**  
- 本仓：**子服务端** · **HTTP 与 www** · **语言栈**  
- 可选：翻 Gin 中间件示例，记住 **sign.json 不挂 Gin 进程**。
`;

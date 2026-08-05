export default `# 库 · 框架 · 运行时 · 中间件

> 语言解决「怎么写」；**库与框架**解决「别从零造轮子」；**运行时**解决「代码在哪执行」；**中间件**解决「业务进程之外的共用能力」。  
> 高频误区：「Node.js 是框架/语言」「Redis 是语言」「Spring 是语言」——本课专门拆开。  
> **学会之后**：30 秒说清库 vs 框架（谁调谁）、Node 是运行时、Redis 是中间件服务。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 库 vs 框架 | 用「控制反转」判断：axios 是库；Vue/Spring 是框架 |
| Node 定位 | 明确：非语言、非框架；是 JS 服务端运行时 |
| 中间件双义 | 能区分「独立服务」与「HTTP 管道中间件」 |
| 本仓归类 | 主服 Node；www Vue；Redis/SQLite 是数据中间件 |

## 本课职责

\`\`\`match
{"title":"别把这四样说成一种","pairs":[{"id":"lib","left":"库","right":"你调用它；控制权在你"},{"id":"fw","left":"框架","right":"它调用你；控制反转"},{"id":"rt","left":"运行时","right":"代码在哪执行（如 Node）"},{"id":"mw","left":"中间件（服务）","right":"独立进程的共用能力（如 Redis）"}]}
\`\`\`

| 本课钉 | 别处钉 |
|--------|--------|
| 库 / 框架 / 运行时 / 中间件 **定义与对照** | 各框架产品课（Vue / Spring…） |
| Node ≠ 语言 ≠ 框架 | Node 装机 → 第一章；分类专课 → **Node.js（运行时）** |
| 中间件两种含义（服务 vs 管道） | DBMS 产品与流行度 → 番外 **数据库** |
| 本仓一句话归类 | Redis/SQLite 契约 → 第四章 **数据与缓存** |

## 本课分块

| 块 | 目标 |
|----|------|
| **库 vs 框架** | 谁调用谁（控制反转） |
| **运行时 vs 框架 vs 语言** | 钉死 Node.js 是什么 |
| **中间件** | 定义 + 两种同名；产品深挖甩番外 |
| **对照表** | Web / 本仓 |
| **面试答法** | 一句话分层 |

---

## 1. 库（Library）：你调用它

**库**是可复用的代码集合。你的程序是主角，**你决定何时调用**库函数。

\`\`\`
你的代码 ──调用──► 库（lodash、axios、requests）
\`\`\`

| 特征 | 说明 |
|------|------|
| 控制权在你 | 用不用、何时用，你说了算 |
| 可替换性相对高 | 换一个 HTTP 库往往局部改动 |
| 例子 | \`numpy\`、\`react\`（作 UI 库时） |

---

## 2. 框架（Framework）：它调用你

**框架**提供应用骨架与生命周期；你往约定位置填业务，**框架在适当时机回调你的代码**——**控制反转（IoC）** / 「好莱坞原则」。

\`\`\`
框架启动 ──约定──► 调用你的 Controller / 插件 / 生命周期钩子
\`\`\`

| 特征 | 说明 |
|------|------|
| 控制权在框架 | 路由、注入、生命周期由框架定规矩 |
| 例子 | Spring Boot、Django、Angular、NestJS、Vue |

记忆钩：**库是工具箱；框架是流水线——你站在工位上被安排干活。**

---

## 3. 语言 · 运行时 · 框架：Node.js 到底是什么

很多人把三层说成一层。拆开：

| 层 | 是什么 | Node.js？ | Express / Nest？ | JavaScript？ |
|----|--------|-----------|------------------|--------------|
| **语言** | 语法 + 语义 +（常含）标准库规范 | **否** | 否 | **是** |
| **运行时 / 引擎宿主** | 真正执行代码的进程环境 | **是**（V8 + 系统 API） | 否 | 否（规范本身不「跑」） |
| **框架** | 应用骨架，IoC 调你的代码 | **否** | **是** | 否 |

\`\`\`mermaid
flowchart TB
  L[JavaScript 语言] --> R[Node.js 运行时]
  L --> B[浏览器运行时]
  R --> F[Express / Nest 等框架]
  B --> V[Vue / React 等]
\`\`\`

**正确说法**

| 别说 | 说 |
|------|-----|
| 「Node 语言」「Node 框架」 | 「**JavaScript** 语言，跑在 **Node.js 运行时**」 |
| 「我们用 Node 写前端框架」 | 「前端语言仍是 JS；UI 用 **Vue/React 框架**；服务端用 **Node 运行时**」 |
| 「会 Node = 会 Express」 | Node 是宿主；Express 是其上的 **框架**（可换 Nest、可不用框架） |

本仓：主服语言 = **JavaScript**；运行时 = **Node ≥ 26**；页面框架示例 = **Vue**。专课见 **Node.js（运行时分类）**。

其它对照：Java 语言 ↔ JVM 运行时 ↔ Spring 框架；Python 语言 ↔ CPython ↔ Django/FastAPI。

---

## 4. 中间件：为什么数据库 / Redis 常叫这个

### 4.1 基础设施意义上的中间件（本课主含义）

在分布式 / 后端架构里，**中间件**多指：

> **独立于业务进程**、通过网络（或本机套接字）提供**可复用能力**的软件——常以 **守护进程 / 服务** 形式存在。

\`\`\`mermaid
flowchart LR
  App1[业务进程 A] --> MW[中间件服务]
  App2[业务进程 B] --> MW
  MW --> Disk[(磁盘 / 内存数据结构)]
\`\`\`

| 例子 | 提供什么 | 为何算「中间」 |
|------|----------|----------------|
| **PostgreSQL / MySQL / MongoDB** | 持久化查询与事务 | 夹在「业务逻辑」与「裸文件」之间 |
| **Redis** | 高速键值 / 缓存 / 会话 | 夹在「应用」与「慢存储 / 协调」之间 |
| **Kafka / RabbitMQ** | 消息传递 | 夹在生产者与消费者之间 |
| **Nginx** | 反代 / 静态 / 负载 | 夹在客户端与上游应用之间 |

特征直觉：

1. **单独安装、单独进程**（或托管成云服务）  
2. **多应用可共享**同一套能力  
3. 业务代码通过 **驱动 / 客户端协议** 访问，而不是「把数据库源码编译进你的 JS」  

所以：**数据库管理系统（DBMS）在工程口语里常被归为数据类中间件**——不是编程语言，也不是 Web 框架。  
产品、服务形态、流行度图 → 番外 **数据库**（本课不展开各库专课）。

### 4.2 别和「请求管道中间件」混名

| 说法 | 含义 | 例子 |
|------|------|------|
| **基础设施中间件** | 独立服务 | Redis、PostgreSQL、Kafka |
| **应用内中间件**（同名易混） | 进程内请求处理链的一环 | Express \`app.use\`、ASP.NET Middleware、Koa 中间件 |

简历 / 面试说「中间件」时，先声明是 **Redis 那种服务**，还是 **Express 那种管道插件**。  
DBMS 侧判据与 SQLite 例外 → 番外 **中间件视角**。

### 4.3 SDK

**SDK**：对接某平台的工具包（库 + 文档 + 样例），如微信 SDK、AWS SDK。通常跑在你的进程里，**不是**独立数据库服务。

---

## 5. 对照总表（含本仓）

| 说法 | 归类 |
|------|------|
| JavaScript / Python / Go / Shell… | **语言** |
| HTML / CSS | **语言**（标记 / 样式） |
| **Node.js** | **运行时**（不是语言、不是框架） |
| V8 / JVM / CLR | **引擎**（运行时的核心执行器） |
| **Vue / Spring / Nest…** | **框架**（或 UI 库） |
| axios / lodash | **库** |
| pnpm | **工具** |
| AgentRuntime + Loader | **框架式运行时**（本仓） |
| PostgreSQL / Redis / MongoDB / SQLite… | **数据库 / 数据中间件**（见番外） |

### 本框框架分课（点卡片）

| 课 | 宿主 | 一句话 |
|----|------|--------|
| Vue / React / Angular / Next | JS/TS | 前端框架轨 |
| Spring · Express/Nest · Django/FastAPI · Gin · ASP.NET · Laravel | 各语言 | 后端框架轨 |

> 框架轨 **不进**语言版图。简历：**语言 + 运行时 + 框架 + 中间件** 分开写。

---

## 6. 大厂面试常见问法

\`\`\`quiz
{"title":"面试快测","question":"Node.js 更准确的归类是？","options":[{"id":"a","label":"一门编程语言"},{"id":"b","label":"JavaScript 的运行时"},{"id":"c","label":"和 Express 同类的 Web 框架"},{"id":"d","label":"一种数据库中间件"}],"answer":"b","explain":"语言是 JavaScript；Node 提供 V8 + 系统 API，让 JS 跑在服务端。"}
\`\`\`

### 「Node 是框架还是语言？」

**都不是。** Node.js 是 **JavaScript 的运行时**（Runtime），不是语言也不是 Web 框架。  
语言 = JavaScript（语法 + 语义）；运行时 = Node.js（V8 + 文件/网络 API）；框架 = Express、Nest、Vue 等。  
本仓主服：语言 JavaScript，运行时 Node ≥ 26，骨架是 **AgentRuntime**（框架式运行时），**不是 Express/Nest**。

### 「Spring 是语言吗？」

**否。** Spring / Spring Boot 是 **Java 语言上的应用框架**，跑在 **JVM**（Java Virtual Machine，Java 虚拟机）上。  
正确说法：「语言 Java，运行时 JVM，框架 Spring Boot」。  
本仓 Spring 若出现，在 **jserver 子服**，不进主服 Node 进程。

### 「Redis 是什么？」

**Redis**（Remote Dictionary Server，远程字典服务）是 **内存键值数据中间件**，以独立守护进程运行，多应用通过 TCP 协议访问。  
归类：**数据库 / 数据类中间件**（DBMS 的一种），不是编程语言，也不是 Web 框架。  
本仓 Runtime 侧常用 Redis + SQLite；业务通过驱动/客户端访问，不是把 Redis 源码编进 JS。

### 「中间件是什么？」

先澄清指哪一种：  
1. **基础设施中间件**：业务进程外的共用服务（Redis、PostgreSQL、Kafka、Nginx）——面试默认这层。  
2. **应用内中间件**：HTTP 请求管道里的一环（Express \`app.use\`、ASP.NET Middleware）——同名易混，须主动说明。  
**别和「中台（业务能力层）」混**：中台偏组织复用，中间件偏技术组件。

### 「React 是框架还是库？」

官方定位是 **UI 库**（Library）：你调用 \`React.createElement\` / JSX，组合自由度大。  
工程上常加 React Router、Redux、Next.js 组成「类框架栈」——此时 **IoC**（Inversion of Control，控制反转）程度仍低于 Angular/Spring。  
判断口诀：**谁掌握调用时机**——库是你调它；框架是它调你（回调 Controller/生命周期）。

### 「库和框架怎么一句话区分？」

**库（Library）**：你的代码是主角，**你决定何时调用**（axios、lodash）。  
**框架（Framework）**：它定骨架与生命周期，**在约定时机回调你**（Spring、Vue、Nest）——即 **IoC**。  
**运行时（Runtime）**：真正执行代码的宿主（Node、JVM、CPython）；**中间件（Middleware）**：独立进程提供的共用能力（Redis、Kafka）。


## 下一步

- **Node.js（运行时分类）** — 语言章上的专课  
- **技术栈** — 语言 + 运行时 + 框架 + 中间件如何拼  
- **番外 · 数据库** — DBMS 本质、服务形态、Redis / SQLite / MongoDB…  
- 框架轨任选 Vue / Spring / …
`;

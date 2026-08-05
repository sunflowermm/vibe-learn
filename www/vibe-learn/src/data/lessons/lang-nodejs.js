export default `# Node.js（运行时 · 语言章分类）

> **分类：运行时（Runtime），不是一门编程语言，也不是 Web 框架。**  
> 语言是 **JavaScript**；框架是 Express / Nest / Vue 等；Node.js 是让 JS **在浏览器之外**执行的宿主（V8 + 系统 API）。  
> 本仓主服固定跑在 **Node.js ≥ 26**；装机见第一章；本课钉**分类与关系**。  
> **学会之后**：能向面试官/Agent 钉死「语言 JS · 运行时 Node · 框架另说」，并区分浏览器与 Node API。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 拒绝「Node 语言 / Node 框架」两种说法 |
| 双宿主 | 说出浏览器有 DOM、Node 有 fs/进程；语言相同 |
| 本仓 | \`engines\` ≥ 26；装依赖仅 pnpm；主服入口 \`node\` |
| 对照 | 能类比 Java↔JVM、Python↔CPython |

## 本课你要带走什么

1. 为什么语言版图里要挂 Node，却不能说「Node 语言」  
2. Node / JavaScript / V8 / 浏览器 各管哪一层  
3. 和 Python、Java 等「语言 + 运行时」配对怎么对照  

---

## 1. 分类钉死

| 说法 | 对不对 | 理由 |
|------|--------|------|
| 「我学 Node 语言」 | **不对** | 没有独立的 Node 语法；写的仍是 JS（或编译成 JS 的 TS） |
| 「Node 是 JS 的服务端运行时」 | **对** | 提供文件、端口、进程等系统 API |
| 「会浏览器 JS = 会运维本仓」 | **不对** | 同语言、不同运行时；无 DOM，入口是 \`node app\` |
| 「主服语言是 Node」 | **口语可、严格不严谨** | 严格说：**语言 JS，运行时 Node** |

\`\`\`algo
{"title":"双宿主：同一门 JS，API 不同","kind":"dualhost","speed":520,"caption":"主服 = Node；www = 浏览器。改码前先钉在哪跑","data":{"apis":[{"name":"document.querySelector","browser":true,"node":false},{"name":"fs.readFile","browser":false,"node":true},{"name":"fetch","browser":true,"node":true},{"name":"process.env","browser":false,"node":true},{"name":"addEventListener","browser":true,"node":false}]}}
\`\`\`

\`\`\`mermaid
flowchart LR
  JS[JavaScript 语言] --> V8[V8 引擎]
  V8 --> Browser[浏览器 · 含 DOM]
  V8 --> Node[Node.js · 含系统 API]
  Node --> XRK[本仓主服]
\`\`\`

---

## 2. 和其它「语言 ↔ 运行时」对照

| 语言 | 常见运行时 / VM | 本仓落点 |
|------|-----------------|----------|
| **JavaScript** | **Node.js**（另：Deno、Bun） | **主服** |
| TypeScript | 先编译/转译 → 仍进 Node（或浏览器） | 可选工具链 |
| Python | CPython 等 | pyserver |
| Java | JVM | jserver |
| C# | CLR / .NET | netserver |
| Go / Rust | 多编译为本地二进制 | goserver / rustserver |

**记法：** 语言版图收「写什么」；Node 卡片回答「主服这段 JS **在哪执行**」。

---

## 3. 与第一章、本仓的分工

| 课 | 回答什么 |
|----|----------|
| **第一章 · 运行时 Node.js** | 怎么装、\`node -v\`、自带 npm/npx、PATH |
| **本课（第二章）** | 分类：语言 vs 运行时；与 JS / V8 / 浏览器边界 |
| **接到本仓运行时** | \`engines\` ≥ 26、仅 pnpm、\`node app\` |
| **第四章 · 语言栈** | 主服 Node + 六语言子服 |

浏览器里的 Chrome / Edge 也用 **V8**，但那是**带 Blink 排版引擎的完整浏览器**；Node **只有 V8 + 系统绑定**，没有网页 DOM。部署时还要另装的 Playwright Chromium，见 **部署环境**。

---

## 4. 大厂面试常见问法

### 「Node 是语言还是框架？」

**都不是。** **Node.js** 是 **JavaScript 的服务端运行时**（V8 引擎 + libuv + 系统 API），不是独立语言，也不是 Web 框架。  
写的仍是 JavaScript（或编译成 JS 的 TypeScript）；Express、Nest 才是跑在 Node 上的**框架**。  
**钉死三层**：语言 = JavaScript → 运行时 = Node.js → 框架 = Express/Nest/Vue（视场景）。

### 「会 Node 是不是就会 Express？」

**否。** Node 提供 \`http\`、\`fs\` 等底层能力；Express 是在其上封装路由与中间件链的**可选框架**。  
会 Node 表示懂事件循环、模块、异步 I/O；Express 还要学中间件顺序、错误四参等。  
本仓主服用自研 **AgentRuntime + Loader**，**不是 Express/Nest 替换入口**。

### 「Node 和浏览器 JavaScript 一样吗？」

**语言相同，运行时不同。** 都执行 JavaScript，但浏览器有 DOM/BOM；Node 有文件、进程、网络端口。  
同一段 \`fetch\` 在 Node 26 原生可用；浏览器 Core www 须 \`xrk-www-compat\` 语义，**勿当 Node 26 写前端**。  
本仓：主服用 Node；页面用 Vue 跑在**浏览器**运行时。

### 「为什么语言版图里要单独挂 Node 卡片？」

语言章收「写什么」；Node 卡片答「主服这段 JS **在哪执行**」。  
对照：Java ↔ JVM；Python ↔ CPython；JavaScript ↔ Node（服务端）或浏览器（客户端）。  
本仓主服固定 **Node ≥ 26 + pnpm**；子服另有 Python/Go/Java 等运行时。

## 5. 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **Runtime（运行时）** | 真正执行你代码的宿主环境（引擎 + 系统 API） | 主服进程是 \`node app\`；没有 Node 就跑不起来 | 运行时 ≠ 语言；也 ≠ Express 这类框架 |
| **V8** | Google 开源的 JavaScript 引擎，负责解析与执行 JS | Chrome/Edge 与 Node 都用 V8 跑 JS | V8 ≠ 浏览器；浏览器还有排版/DOM；Node 没有网页 DOM |
| **libuv** | Node 用来做跨平台异步 I/O 的底层库 | 文件、网络、定时器很多最终走到事件循环 | 别背成「又一门语言」；是 C 库，支撑 Node 异步模型 |
| **事件循环（Event Loop）** | 单线程里轮询队列、处理回调/微任务的机制 | 高并发 I/O 服务常见；CPU 死循环会卡住整进程 | 单线程 ≠ 不能用多核；可用 Worker / 多进程 |
| **npm / pnpm / yarn** | Node 生态的包管理器 | 本仓 **只认 pnpm**；\`packageManager\` 字段约束 | 包管理器 ≠ 运行时；装依赖用 pnpm，执行仍靠 \`node\` |
| **Express / NestJS** | 跑在 Node 上的 Web 框架（微框架 / 意见性框架） | 外包、对照学习常见；**不是**本仓主服入口 | 会 Node ≠ 会 Express；本仓主服是 AgentRuntime |


## 下一步

- **JavaScript** — 语言本体与事件循环动画  
- **接到本仓运行时** — 版本与包管理契约  
- **部署环境** — Git · Node · Redis · 浏览器引擎清单  
装机细节回 **第一章 · 运行时 Node.js**。
`;

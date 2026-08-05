export default `# 语言栈 · 主服与多语言子服

> **主服**：Node.js（JavaScript），负责 Runtime、Core 加载、HTTP/www、AiWorkflow 与 LLM。  
> **子服**：独立进程族，覆盖 Python、Go、PHP、Java、.NET、Rust，经 \`callSubserver\` 以 HTTP JSON 调用。  
> 目录与端口：\`src/utils/subserver-runtimes.js\`；选型依据：\`subserver/LANGUAGES.md\`。  
> **学会之后**：能复述主服 JS/Node 与六子服边界，并指向 LANGUAGES.md。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 主服 | JavaScript + Node≥26 |
| 子服 | py/go/php/java/net/rust 目录 |
| 选型 | 短板进子服，勿主服拼盘 |
| 包管理 | 主仓仅 pnpm |

\`\`\`algo
{"kind":"xrklayers","title":"短板能力离开主服事件循环","autoplay":true,"speed":850,"data":{"mode":"sub"}}
\`\`\`

## 与第二章的对应
\`\`\`match
{"title":"本仓语言栈配对","pairs":[{"id":"main","left":"主服","right":"Node.js / JavaScript"},{"id":"py","left":"Python 子服","right":"pyserver 等"},{"id":"else","left":"Go/PHP/Java/.NET/Rust","right":"按需子服"}]}
\`\`\`


| 第二章概念 | 本仓落点 |
|------------|----------|
| **运行时** | 主服进程运行 Node；每一套子服 runtime 运行对应语言的独立进程 |
| **语言版图** | 按生态与性能短板选型，能力落在不同 runtime |
| **包管理** | 主仓仅 pnpm；各子服使用本语言工具链（uv、go、Maven、dotnet、Cargo 等） |
| **运行时边界** | 浏览器 JS、主服 Node、子服各语言分属不同执行环境 |

\`\`\`mermaid
flowchart TB
  Main["主服 Node · AgentRuntime"]
  Main -->|HTTP JSON callSubserver| Py["pyserver · Python :8000"]
  Main --> Go["goserver · Go :8001"]
  Main --> Php["phpserver · PHP :8002"]
  Main --> J["jserver · Java :8003"]
  Main --> Net["netserver · .NET :8004"]
  Main --> Rs["rustserver · Rust :8005"]
\`\`\`

---

## 架构原则
\`\`\`quiz
{"title":"本仓语言栈","questions":[{"q":"主服默认语言/运行时是？","choices":[{"t":"Python + CPython 主服","ok":false,"why":"Python 多在子服场景。"},{"t":"JavaScript + Node（≥26）","ok":true,"why":"主服契约。"},{"t":"只用浏览器、无服务端","ok":false,"why":"AGT 是后端 Runtime。"}]}]}
\`\`\`


子服务选用**与主栈不同**、且能覆盖业务短板的语言（\`subserver/LANGUAGES.md\`）。主服已承担 Node 职责，子服侧不再增设 Node runtime，避免能力重复。

---

## 各语言优势与适用场景

| Runtime | 语言 / 框架 | 端口 | 核心优势 | 典型场景 |
|---------|-------------|------|----------|----------|
| \`pyserver\`（默认） | Python | 8000 | 科学计算与 AI 生态成熟；媒体、文档、爬虫库齐全；迭代快 | 模型周边、音视频处理、PDF/OCR、数据采集 |
| \`goserver\` | Go | 8001 | 原生并发（goroutine）；单静态二进制易部署；标准库适合网络与加解密 | 高并发网关式任务、哈希/加密、长连接工具 |
| \`phpserver\` | PHP | 8002 | 脚本启动成本低；字符串与 Web 模板处理直观；适合单文件能力 | 轻量文本处理、共享主机式脚本、快速 Web 小工具 |
| \`jserver\` | Java 21 + Spring Boot | 8003 | 企业中间件与 JDBC 生态深厚；类型与工程化约束强 | 对接遗留 Java 库、事务型数据访问、Spring 组件复用 |
| \`netserver\` | .NET 8 + ASP.NET Core | 8004 | 与 Windows / Office / 系统 API 集成顺畅；CLR 与 C# 工具链完整 | Windows 企业场景、Office 自动化、系统级 GUID/API |
| \`rustserver\` | Rust + Axum | 8005 | 无 GC 开销的可控性能；所有权模型利于安全；FFI 友好 | CPU 热点、复杂正则、与原生库互操作 |

**默认** \`subserver.default: pyserver\`：当前插件与 AI 周边示例最多，适合作为首选入口。其它 runtime 按上表选型，在调用中指定 \`runtime\` 即可并存。

---

## 职责划分

| 层级 | 职责 |
|------|------|
| **主服** | 通道接入、Core / Loader、HTTP 与 www、配置中枢、LLM 与工作流 |
| **子服族** | 按语言优势承担重计算与生态专用能力；统一 HTTP 契约 |
| **并存方式** | \`ai-workflow.yaml\` → \`subserver.runtimes\` 分别启用；\`callSubserver({ runtime })\` 路由 |

未指定 \`runtime\` 时使用 \`subserver.default\`。

## 实践入口

- 配置：\`config/default_config/ai-workflow.yaml\` 的 \`subserver\` 段  
- 契约：\`subserver/CONTRACT.md\`（\`/health\`、\`/api/list\`、\`/api/{group}/*\`）  
- 插件：\`subserver/<runtime>/apis/<group>/\`

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。下表按语言横切挑选，便于和本课「主服 Node + 多语言子服」对照。

| 语言 / 栈 | 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|-----------|------|----------|--------|------------|
| JavaScript | [nodejs/node](https://github.com/nodejs/node) | ⭐ 十万级 | 事件循环、模块、流 | **主服 Node** / AgentRuntime |
| TypeScript | [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | ⭐ 十万级 | 类型擦除、编译管道 | www / 子 Core 构建；运行时仍是 JS |
| Python | [fastapi/fastapi](https://github.com/fastapi/fastapi) | ⭐ 八万级 | API、Depends、OpenAPI | **callSubserver** → **pyserver** |
| Go | [gin-gonic/gin](https://github.com/gin-gonic/gin) | ⭐ 八万级 | 路由与中间件 | **goserver** |
| Rust | [tokio-rs/axum](https://github.com/tokio-rs/axum) | ⭐ 两万级 | 类型安全 HTTP | **rustserver** |
| Java | [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) | ⭐ 七万级 | Boot / IoC | **jserver** |
| C# | [dotnet/aspnetcore](https://github.com/dotnet/aspnetcore) | ⭐ 三万级 | 中间件管道、DI | **netserver** |
| PHP | [laravel/framework](https://github.com/laravel/framework) | ⭐ 三万级 | 容器与路由 | **phpserver** |
| 前端 | [vuejs/core](https://github.com/vuejs/core) / [vitejs/vite](https://github.com/vitejs/vite) | ⭐ 四万 / 七万级 | 组件与构建 | **www** + **sign.json** |
| 前端 | [facebook/react](https://github.com/facebook/react) / [vercel/next.js](https://github.com/vercel/next.js) | ⭐ 二十万 / 十三万级 | SPA / 元框架 | 同上；SSR 需反代 |

各语言课另有更细的「高星仓库」表；此处只作栈级索引。

## 下一步

**子服务端** — 进程模型、端口、配置读写边界与主服协作方式。  
可选：从上表挑一个与你当前子服 runtime 对应的仓库，对照 \`subserver/CONTRACT.md\` 读一页入口代码。  
HTTP/www 前端产物挂载 → **HTTP 与 www**；主服编排 LLM → **工作流**。
`;

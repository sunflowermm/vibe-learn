export default `# 接到运行时 · 本仓库

> 语言选型之后，工程问题收敛为：**运行时版本、包管理工具、进程入口、边界在哪**。  
> 本仓硬契约：**主服固定 Node.js（语言是 JavaScript）+ 仅 pnpm**；短板用多语言**子服**补，而不是把主服改成「语言拼盘」。  
> **学会之后**：能对照下表自检本机是否对齐主服契约，并说清「何时该开子服」。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 契约自检 | \`node -v\`≥26、\`pnpm -v\`、站在仓库根 |
| 边界 | 主服 JS+Node；短板开子服，不改主服语言拼盘 |
| 进程链 | 源码→工具链→运行时→OS 进程 能口述 |
| 下一步 | 知道进第四章 Runtime/Core/子服 |

## 从概念到进程
\`\`\`steps
{"title":"语言到进程","steps":[{"title":"源码","body":"人写的文本（本仓主服多为 .js）。"},{"title":"工具链","body":"包管理 / 可选转译（TS→JS）。"},{"title":"运行时","body":"Node 加载并执行。"},{"title":"OS 进程","body":"占 CPU、内存、端口的是进程。"}]}
\`\`\`

\`\`\`mermaid
flowchart TB
  A["序章：进程跑在 OS 上"] --> B["第一章：Node 与 pnpm"]
  B --> C["01.5：会写 JS"]
  C --> D[第二章：运行时模型与选型]
  D --> E[本课：对齐本仓契约]
  E --> F["第四章：Runtime / Core / 子服"]
\`\`\`

前置自检：\`node -v\`（≥ 26）· \`pnpm -v\` · 当前目录是仓库根（可见根 \`package.json\`）。

\`\`\`algo
{"kind":"dualhost","title":"接到本仓 · 别把浏览器 API 写进 Node","autoplay":true,"speed":780}
\`\`\`

## 本仓坐标（背这张表）

| 项 | 选择 | 自检 |
|----|------|------|
| 主服**语言** | JavaScript（及可选 TS 构建链） | 仓库内主路径 \`.js\`；别说「主服语言是 Node」 |
| 主服**运行时** | **Node.js ≥ 26** | \`node -v\`；\`package.json\` → \`engines\` |
| 主仓**包管理** | **仅 pnpm** | 根 \`pnpm-lock.yaml\` + \`packageManager\`；勿 \`npm i\` |
| 主服**入口** | 常见 \`node app.js\` | README「快速开始」 |
| 学习站 UI | **Vue**（浏览器运行时） | 与主服 Node **不是同一个宿主** |
| 子服 | Python / Go / PHP / Java / .NET / Rust | \`subserver/<runtime>/\`；\`subserver/LANGUAGES.md\` |

主服契约由 \`engines\` / \`packageManager\` 约束。  
子服登记：\`src/utils/subserver-runtimes.js\`（子服侧不提供 Node runtime，避免与主服职责重叠）。

这是 **技术选型** 的结果：主栈 Node 做编排与 AgentRuntime；数值/系统/特定生态用子服经 HTTP 调用（见 **技术栈** / **技术选型**）。

## 包管理对照（与第一章一致）

| 层 | 本仓 |
|----|------|
| 装 Node 常自带 | **npm / npx**（生态默认客户端） |
| 装**本仓**依赖 | **只认 pnpm** |
| Python 子服 | 常见 **uv** / pip 工作流（见子服文档） |

有 Node ≠ 允许用 npm 装主仓依赖。

## 来自其它背景的对照

### 编译型语言习惯

| 既有习惯 | 本仓对应 |
|----------|----------|
| 编译为二进制再运行 | 主服：\`pnpm install\` + \`node\`；Go/Rust 子服用各自构建命令 |
| 头文件 / 链接库 | 主服 \`node_modules\`；子服用该语言依赖管理 |
| 目标平台 | Node 主版本 + OS；子服另计本语言工具链 |

### 浏览器 JS 习惯

| 浏览器 | 本仓 Node 主服 |
|--------|----------------|
| \`document\` / DOM | **无 DOM** |
| 刷新页面观察效果 | 重启进程或按文档热加载 |
| \`<script>\` 引入 | \`import\` / \`node_modules\`（ESM） |
| 随便用最新浏览器 API | 主服以 **Node 26** 为准；www 见 \`xrk-www-compat\` |

需要 Python、Go 等生态时，能力落在对应**子服**，由主服调用——不要假设「主服进程里已经有 CPython」。

## 失败时倒推（接到第一章）

| 症状 | 先查 |
|------|------|
| \`node\` 不是命令 / 版本过低 | PATH · engines · 第一章运行时课 |
| \`pnpm\` 不可用或锁冲突 | 包管理器课；是否误用 npm |
| 代码里用了 \`document\` | 跑错宿主：浏览器 API 不进主服 |
| 想「顺便」上 Python 库 | 开 **pyserver**，别塞进主服 \`node_modules\` |

## Coding Agent

\`\`\`prompt
目标：确认我的本机是否对齐 XRK-AGT 主服契约，并指出是否该用子服。
现场：node -v=…；pnpm -v=…；仓库根路径=…；我想做的能力=…
约束：主服保持 JS/Node；不要建议用 npm 装主仓；不要把浏览器 API 写进主服。
验收：给出「已对齐 / 未对齐项」清单；若需子服，指出哪一个 runtime 目录与下一步文档。
\`\`\`

## 下一步

- **语言栈**（第四章）— 六 runtime 与各语言优势  
- **项目鸟瞰** — Runtime / Core / 子服分工  
- **部署环境** — Redis / 浏览器引擎等齐套清单
`;

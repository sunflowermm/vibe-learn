export default `# 运行时 · Node.js

> **运行时（runtime）**：在操作系统中执行某类程序的引擎。  
> **Node.js** 使 JavaScript 可在服务器与本机工具中运行，而非仅限浏览器。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 身份 | Node=运行时，不是语言；语言是 JS |
| 本仓 | \`node -v\` ≥ 26，对齐 engines |
| 对照 | 浏览器与 Node API 不同 |
| 跟 Agent | 报版本；勿用 npm 装本仓依赖 |


## 本课分块

| 块 | 目标 |
|----|------|
| **浏览器 JS vs Node** | 同语言、不同运行时 |
| **版本与 engines** | 本仓要求 Node ≥ 26 的原因 |
| **安装附带什么** | \`node\` + 官方包管理入口 \`npm\` / \`npx\` |
| **与「项目包管理器」的边界** | 执行引擎 ≠ 本仓选用的依赖工具 |

---

## 1. 同一种语言，两套执行环境

\`\`\`mermaid
flowchart LR
  JS[JavaScript 源码] --> B[浏览器 · V8 等]
  JS --> N[Node.js · V8 + 系统 API]
  B --> DOM[DOM / 网页]
  N --> FS[文件 / 网络 / 进程]
\`\`\`

| | 浏览器中的 JS | Node.js |
|--|----------------|---------|
| 引擎 | 常为 V8 | 同样基于 **V8** |
| 能力域 | DOM、页面事件 | 文件、端口、进程、本机服务 |
| 典型产物 | 前端页面 | 后端、CLI、本仓库主服 |

**Node.js ≈ V8 + 绑定操作系统的一组 API。**

第二章会把这句话钉进「语言版图」：**JS 是语言，Node 是运行时，Vue/React 是框架**——本章先把「能跑起来」这一层装齐，避免后面说「我装了 Vue」。

---

## 2. 版本与 engines

本仓库 \`package.json\` 声明 \`engines.node >= 26\`。版本过低会导致语法与依赖不兼容。

对照 [Node.js Release 日程](https://github.com/nodejs/Release#release-schedule)（2026-08 口径）：

| 线 | 状态（约） | 对本仓含义 |
|----|------------|------------|
| **26.x** | **Current**（预计 2026-10 进 Active LTS） | 本仓目标线；可用最新语言特性 |
| **24.x** | Active LTS（Krypton） | 生产常见；**低于 engines 时本仓不保证** |
| **22.x** | Maintenance LTS | 仅维护；勿当本仓开发机 |

| 概念 | 含义 |
|------|------|
| **Current** | 新特性线；每半年一条偶数大版本，约半年后进 LTS |
| **Active / Maintenance LTS** | 生产推荐 / 仅修关键与安全 |
| **\`engines\`** | 项目声明的兼容版本契约——**以仓库为准，不以「网上流行 LTS」为准** |
| **PATH 上的 \`node\`** | Shell 实际调用的那一套安装（多版本时顺序决定胜负） |

\`\`\`env
{"title":"核对 Node 版本 · 按壳","caption":"本仓 engines：node ≥ 26。找不到命令 → 安装器与 PATH。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["node -v","which node"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["node -v","Get-Command node"]},{"id":"unix","label":"Linux / macOS","os":"Unix","shell":"bash/zsh","lines":["node -v","which node"]}]}
\`\`\`

模拟窗（假数据 · 自动演示 which / PATH）：

\`\`\`shell
{"preset":"path-check"}
\`\`\`

若提示「不是内部命令」，先处理 **安装器与 PATH**。

---

## 3. 安装 Node 时通常附带什么

官方安装器（Windows MSI、macOS pkg、多数 Linux 渠道）在写入 \`node\` 的同时，一般会附带：

| 命令 | 角色 |
|------|------|
| **\`node\`** | 运行时本身 |
| **\`npm\`** | Node 生态的**默认 / 官方**包管理器 |
| **\`npx\`** | 按需执行某包里的命令（不必先全局安装该包） |

这是解释型语言生态的常见模式：**运行时分发时附带一套「默认包管理器」**，保证「装完立刻能装依赖」。

| 语言 / 运行时 | 常见默认包管理入口（随安装附带或同发行） |
|---------------|------------------------------------------|
| **Node.js** | \`npm\`、\`npx\` |
| **Python** | \`pip\`（及近年的 \`pipx\` 等；发行版差异较大） |
| **Ruby** | \`gem\` |
| **PHP** | \`composer\`（常需另装，但属官方推荐主线） |
| **Go** | 模块由 \`go\` 命令自带（\`go get\` / \`go mod\`） |
| **Rust** | \`cargo\`（随 rustup 工具链） |
| **.NET** | \`dotnet\` CLI 管理包与项目 |
| **Java** | 构建工具常为 Maven / Gradle（不随 JRE 必带，属生态惯例） |

**共性与原因：**

1. **语言本体不自带「全世界所有库」** — 库由社区发布到注册表，需要统一下载与解析工具。  
2. **默认工具降低冷启动成本** — 装完运行时即可 \`install\` 依赖，不必先研究第三套工具。  
3. **契约文件随语言而定** — 如 Node 的 \`package.json\`、Python 的 \`pyproject.toml\` / \`requirements.txt\`、Rust 的 \`Cargo.toml\`。  
4. **默认工具追求「通用可用」**，不一定追求「磁盘最省 / 解析最严 / 多项目共享最优」——于是才会出现替代品。

---

## 4. 与项目包管理器的边界

| 角色 | 职责 |
|------|------|
| **Node** | 执行代码 |
| **npm（自带）** | 官方默认：按 \`package.json\` 装依赖、跑脚本 |
| **pnpm（本仓选用）** | 替代实现：同样读 \`package.json\`，布局与策略不同 |

有 Node 不等于本仓允许用 npm 装依赖：根目录 \`packageManager\` 与文档约定 **仅 pnpm**。详见下一课。

## 安装入口（按平台）

- **Windows**：官网 MSI，或 winget / scoop  
- **Linux**：发行版源、NodeSource、nvm / fnm  
- **macOS**：官网 pkg、Homebrew、或版本管理器  

## 下一步

**安装器与 PATH** — 让 Shell 找得到 \`node\` / \`npm\`；  
**包管理器** — 默认工具 vs pnpm / uv 等替代品，以及本仓为何钉死 pnpm；  
**第二章 · Node.js** — 在语言版图上的**分类**（运行时 ≠ 语言）；  
**部署环境** — 与 Git / Redis / 浏览器引擎一起看齐套清单。
## 导图2 · JavaScript / npm / 环境变量 × Node 装机

> 导图2 常把 Node 与 JS 并列；本课钉装机与版本契约。分类深讲见第二章。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **JavaScript** | 语言 | 由 Node 在本机执行 |
| **npm** | 随 Node 常见 | 本仓装依赖只用 pnpm |
| **环境变量** | PATH 找到 node | 多版本时尤要注意 |
| **后端** | 主服宿主 | 本仓主服跑在 Node 上 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

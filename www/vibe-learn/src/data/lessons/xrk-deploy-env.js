/** 部署环境 · 跑通 XRK-AGT 前要准备什么 */
export default `# 部署环境 · 跑通前清单

> 本课回答：**本机要先备齐什么，才能稳定跑起 XRK-AGT。**  
> 下载地址写在本课 / 思维导图卡片里，便于**复制**；口播视频**不念 URL**，可提示「去思维导图复制」或本机浏览器搜索。  
> 更深的「终端是什么」见第一章 **不同终端环境**；本课补 **部署场景下** 要用到的基础与手顺。

## 本课你要带走什么

1. 五样：Git · Node.js（≥26）+ pnpm · Redis · **日常浏览器** ·（按需）Playwright Chromium  
2. **非 Windows 也要准备日常浏览器**  
3. 终端细节在第一章 **不同终端环境**；部署时认准 Git Bash Here，改 PATH 后**新开**窗口  
4. Windows Redis 发行版常需**自己设 PATH**；clone 用对目录与终端  
5. 引擎事实：**Chromium 系**仍用 **V8** 跑 JS；**不是**所有浏览器都是 V8  

---

## 1. 总清单

| 项 | 是否必需 | 用来干什么 | 本仓怎么验 |
|----|----------|------------|------------|
| **Git** | **必需** | 拿源码 \`clone\` / 更新 | \`git --version\` |
| **Node.js ≥ 26** + **pnpm** | **必需** | 主服运行时与依赖 | \`node -v\` · \`pnpm -v\` |
| **Redis** | **必需** | Runtime 热数据；没它启动 fail-fast | \`redis-cli ping\` 或启动日志 |
| **日常浏览器** | **必需**（看控制台） | 打开 \`/xrk/\` 等页面 | 能打开本机控制台 URL |
| **Playwright Chromium** | **按功能** | 服务端截图 / HTML→图 | \`pnpm run setup:browsers\` |

\`\`\`mermaid
flowchart TB
  Prep[Git + Node + Redis + 日常浏览器] --> Clone[clone 到目标目录]
  Clone --> Install[pnpm install]
  Install --> App["node app"]
  App --> UI[日常浏览器打开控制台]
  App --> Render[可选 Playwright Chromium]
\`\`\`

### 下载地址（写进图 · 复制用 · 勿口头念长链）

| 软件 | 推荐入口（复制） | 搜索关键词（备选） |
|------|------------------|--------------------|
| **Git（Windows）** | \`https://git-scm.com/download/win\` | \`git 安装\` → git-scm |
| **Git（macOS / Linux）** | \`https://git-scm.com/download/mac\` · \`https://git-scm.com/download/linux\` | \`git 安装\` 选系统 |
| **Node.js** | \`https://nodejs.org/\` | \`nodejs\`；选 **Current ≥ 26** |
| **Redis（Windows 发行）** | \`https://github.com/redis-windows/redis-windows/releases\` | \`redis windows github releases\` |
| **Redis（Linux / macOS）** | 包管理或 [redis.io/download](https://redis.io/download/) | \`apt install redis\` / \`brew install redis\` |
| **Chrome** | \`https://www.google.com/chrome/\` | \`chrome 下载\` |
| **本仓库** | \`https://github.com/sunflowermm/XRK-AGT.git\` | 托管页 Code → HTTPS |

> Redis **官方不直接发** Windows 安装包；上表 Windows 行为社区维护发行。本仓 \`ensure-redis\` 也会认 Memurai、PATH 上的 \`redis-server\`、或 Docker redis。

---

## 2. 终端怎么选（细节在第一章）

> **完整分块**见 **不同终端环境**：多种 Shell、命令如何经 PATH 起进程、Git Bash Here vs CMD vs PowerShell、Claude Code 为何要 Git Bash、WSL vs 原生 Linux。  
> 这里只留部署时要用的最短对照。

| 场景 | 建议 |
|------|------|
| Windows 上 \`git clone\` | 目标父目录 → **Git Bash Here** |
| 查 \`node -v\` / \`pnpm\` / 改完 PATH 后验证 | **新开** PowerShell 或 Git Bash（旧窗口看不到新 PATH） |
| 已在 WSL 里开发 | 工具链整套留在 WSL；不要和 Windows 本机 PATH 混用 |
| Linux / macOS | 本机终端 + \`cd\` 进目录再 clone |

**原则：** 工具装进哪套环境，就在哪套 Shell 里验证。

---

## 3. 分项安装

### 3.1 Git

1. 思维导图复制地址，或搜索 \`git 安装\` 进 git-scm。  
2. Windows 安装器建议保留「加入 PATH / 也可从命令行使用」。  
3. **新开**终端：\`git --version\`。

### 3.2 Node.js（语言 JS · 运行时 Node）

1. 复制 \`https://nodejs.org/\` 或搜 \`nodejs\`。  
2. 装 **Current ≥ 26**（本仓 \`engines\`）。  
3. **新开**终端：

\`\`\`bash
node -v
corepack enable
pnpm -v
\`\`\`

本仓依赖 **仅 pnpm**。分类见第二章 **Node.js**。

### 3.3 Redis

> **是什么 / 为何叫中间件**：番外 **Redis** · **中间件视角**。本小节只负责 **装上并能 ping**。

**Windows**

1. 发行页（复制）：\`https://github.com/redis-windows/redis-windows/releases\`  
2. 下 Windows x64 包 → 解压到固定目录（如 \`C:\\tools\\redis\`，内含 \`redis-server.exe\`）。  
3. **自行设 PATH**：开始菜单搜「环境变量」→ Path → 新建 → 填入该目录 → 确定。  
4. **新开**终端（旧窗口看不到新 PATH；原理见 **不同终端环境** §3）：

\`\`\`bash
redis-server --version
redis-cli ping   # 服务起来后期望 PONG
\`\`\`

Git / Node 安装器常自动写 PATH；Redis zip **通常不会**——所以要手动加。

**Linux / macOS：** 包管理或官方文档；保证 \`6379\` 可连。Docker 见 \`docs/docker.md\`。  
启动链：\`scripts/ensure-redis.mjs\`。**没 Redis → fail-fast**（契约见 **数据与缓存**）。

### 3.4 日常浏览器（各系统都要）

| 系统 | 常见情况 | 你要做什么 |
|------|----------|------------|
| **Windows** | 常自带 **Edge**（Chromium 系） | Edge / Chrome 打开控制台即可 |
| **macOS** | 自带 Safari（**不是** V8） | 建议另装 Chrome/Edge；Safari 多数页可用 |
| **Linux** | 常无 Chrome/Edge | **自己装** Chrome、Chromium 或 Firefox |

打开控制台用「能上网页的现代浏览器」即可；排障、对照开发者工具时，优先 **Chromium 系**（Chrome / Edge / Chromium）。

### 3.5 Playwright Chromium（≠ 日常浏览器）

| | 日常浏览器 | Playwright Chromium |
|--|------------|---------------------|
| 来源 | 系统 / 官网 | \`pnpm run setup:browsers\` |
| 用途 | 人眼开 \`/xrk/\` | 服务端截图、HTML→图 |
| 关系 | **不能互相顶替** | 独立 Chromium 构建 |

---

## 4. 浏览器引擎：现在还是 V8 吗？（写对分层）

**结论（2026 现行）：**

| 产品 / 运行时 | JS 引擎 | 排版引擎 | 还是不是 V8？ |
|---------------|---------|----------|----------------|
| **Chrome** | **V8** | Blink | **是** |
| **Edge**（Chromium 内核） | **V8** | Blink | **是** |
| **Playwright / 本仓截图用 Chromium** | **V8** | Blink | **是** |
| **Node.js** | **V8** | （无网页排版） | **是**（无 DOM） |
| **Firefox** | **SpiderMonkey** | Gecko | **不是** |
| **Safari** | **JavaScriptCore** | WebKit | **不是** |

所以：

- 说「**Chrome / Edge / Node 用 V8**」——**对**。  
- 说「**所有浏览器都是 V8**」——**错**；Firefox、Safari 不是。  
- **V8 ≠ 整个浏览器**：Chromium 系里，**V8 只负责执行 JS**；把 HTML/CSS 画成页面的是 **Blink**。

\`\`\`mermaid
flowchart TB
  subgraph chrom_family["Chromium 家族 · JS 引擎仍是 V8"]
    Blink[Blink 排版]
    V8[V8 执行 JS]
    Blink --- V8
  end
  chrom_family --> Chrome[Chrome]
  chrom_family --> Edge[Edge]
  chrom_family --> PW[Playwright Chromium]
  V8 --> Node[Node.js · 无 Blink/DOM]
  FF[Firefox] --> SM[SpiderMonkey]
  SF[Safari] --> JSC[JavaScriptCore]
\`\`\`

| 名词 | 含义 |
|------|------|
| **V8** | Google 开源的 **JS 引擎**；Chromium 系与 Node 使用 |
| **Blink** | Chromium 的 **排版/渲染** 引擎 |
| **Chromium** | 开源浏览器项目（Blink + V8 + 壳…） |
| **Chrome / Edge** | 基于 Chromium 的**产品** |
| **Playwright Chromium** | 自动化专用构建 ≠ 桌面 Chrome 快捷方式 |

---

## 5. Clone 手顺（Windows 推荐）

1. 资源管理器进入**要放项目的父目录**。  
2. 空白处右键 → **Git Bash Here**（Win11 可能先「显示更多选项」）。  
3. 当前即 **Git 终端（bash）**，目录已对。  
4. 仓库地址可从思维导图复制：

\`\`\`bash
git clone https://github.com/sunflowermm/XRK-AGT.git
cd XRK-AGT
pnpm install
# Redis 可用后：
node app
\`\`\`

**macOS / Linux：** 本机终端 \`cd\` 到父目录后同样 \`git clone\` …  

再用**日常浏览器**打开启动日志里的控制台地址。

---

## 6. 倒推表

| 症状 | 先查 | 回扣 |
|------|------|------|
| \`git\` / \`node\` 不是命令 | 未装 / PATH / **旧终端未关** | §2 · §3 |
| Node 版本过低 | 装成了旧 LTS | §3.2 |
| \`pnpm\` 没有 | \`corepack enable\` | 包管理器课 |
| Redis 找不到 | zip 未加 PATH；服务未起 | §2.4 · §3.3 |
| 控制台打不开 | 端口；**有无日常浏览器** | §3.4 |
| Linux 无处点网页 | 未装浏览器 | §3.4 |
| 「浏览器不都是 V8 吗」 | 只有 Chromium 系 + Node | §4 |
| 截图失败但有 Chrome | 未装 Playwright | §3.5 |
| clone 目录不对 | 没在目标父目录开终端 | §5 |

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **PATH（环境变量路径列表）** | OS 找可执行文件的目录清单 | \`git\`/\`node\`/\`redis-cli\` 能敲出来 | 改 PATH 后**新开终端**；旧窗口看不见 |
| **Runtime（运行时）** | 执行代码的环境与内置库 | 本仓 **Node.js ≥ 26** 跑 \`node app\` | 别和 **框架** 混：Express 在 runtime 之上 |
| **V8（Google 开源 JavaScript 引擎）** | 执行 JS 的核心虚拟机 | Node、Chrome、Edge、Playwright Chromium | **不是**整个浏览器；排版靠 Blink |
| **Blink（Chromium 排版引擎）** | 把 HTML/CSS 画成页面 | Chrome/Edge 内核 | Node **没有** Blink/DOM |
| **JavaScriptCore（WebKit JS 引擎）** | Safari 使用的 JS 引擎 | macOS/iOS 默认浏览器 | 别假设「所有浏览器都是 V8」 |
| **SpiderMonkey（Mozilla JS 引擎）** | Firefox 使用的 JS 引擎 | 排障时 DevTools 行为可能不同 | 与 V8 实现细节不同 |
| **corepack / pnpm** | Node 包管理器启用器 + 本仓唯一包管理 | \`corepack enable\` 后用 \`pnpm install\` | 别用 npm/yarn 装本仓依赖 |
| **ensure-redis（启动前 Redis 探测）** | 本仓脚本确认 Redis 可用 | 无 Redis → fail-fast；见数据与缓存课 | 别与「可选 Mongo Core」同等对待 |

## 下一步

- **不同终端环境**（第一章）— 终端 / Shell / OS 完整概念  
- **首次跑通** — 最短命令串  
- **数据库** — Redis / SQLite  
- **项目鸟瞰** — 架构  
`;

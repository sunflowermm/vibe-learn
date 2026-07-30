/** 部署环境 · 跑通 XRK-AGT 前要准备什么 */
export default `# 部署环境 · 跑通前清单

> 本课回答：**本机要先备齐什么，才能稳定跑起 XRK-AGT。**  
> **国内部署高频卡点：** clone / 下 GitHub Releases 前先打通代理（§0）；终端要单独设 \`HTTP(S)_PROXY\`。  
> 下载地址写在本课 / 思维导图卡片里，便于**复制**；口播视频**不念 URL**，可提示「去思维导图复制」或本机浏览器搜索。  
> 更深的「终端是什么」见第一章 **不同终端环境**；本课补 **部署场景下** 要用到的基础与手顺。

## 本课你要带走什么

1. 五样：Git · Node.js（≥26）+ pnpm · Redis · **日常浏览器** ·（按需）Playwright Chromium  
2. **访问 GitHub（clone / Releases）前先打通代理**；终端也要设 \`HTTP(S)_PROXY\`  
3. **非 Windows 也要准备日常浏览器**  
4. 终端细节在第一章 **不同终端环境**；部署时认准 Git Bash Here，改 PATH 后**新开**窗口  
5. Windows Redis 发行版常需**自己设 PATH**；clone 用对目录与终端  
6. 引擎事实：**Chromium 系**仍用 **V8** 跑 JS；**不是**所有浏览器都是 V8  

---

## 0. 先过关：GitHub 与代理（国内高频卡点）
\`\`\`match
{"title":"部署环境配对","pairs":[{"id":"env","left":"环境变量","right":"密钥与开关，勿写进仓"},{"id":"proxy","left":"代理","right":"境外依赖走本地代理"},{"id":"data","left":"data/","right":"运行时状态与工作区"}]}
\`\`\`


本仓源码在 **GitHub**：\`https://github.com/sunflowermm/XRK-AGT.git\`。  
Windows 社区 Redis 发行也常从 **GitHub Releases** 下。网页打不开、\`git clone\` 卡住 / 超时，多半是 **出网到 GitHub 不通**，不是 Git 命令写错。

| 步骤 | 做什么 |
|------|--------|
| 1 | 本机先有可用的 **代理引擎**（如 Clash Verge）：订阅 → 节点 → **系统代理** |
| 2 | 浏览器能打开 \`github.com\` 后再 clone / 下 Releases |
| 3 | **终端 / Git 常常不吃系统代理** → 为当前会话写环境变量（端口以你客户端显示为准） |
| 4 | 备选：用 **ghproxy.com** 一类前缀加速（见下）；或项目提供的 Gitee 镜像 |

> 下列终端窗**全部是模拟**：自动打字、假报错、假成功；**不会上网**。真实 clone 请复制命令到本机终端。

### 0.1 不设代理时，失败长什么样？（模拟）

\`\`\`shell
{"preset":"clone-fail"}
\`\`\`

常见真实报错还包括：\`Connection timed out\`、\`SSL_ERROR\`、\`Recv failure\`、长时间停在 \`Cloning into...\` 无下文。

### 0.2 设好 \`HTTPS_PROXY\` 后再 clone（模拟成功）

### 按环境复制：会话代理变量

> **分清环境**：Windows Terminal 里的标签决定方言。Git Bash ≠ PowerShell ≠ cmd。下列命令只对**当前会话**有效。

\`\`\`env
{"title":"设 HTTP(S)_PROXY · 按壳选择","caption":"系统代理救浏览器；终端变量救 Git / pnpm / Agent。端口改成你客户端显示的 Mixed Port。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","note":"Git for Windows 自带的 bash；路径常是 /c/Users/…","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1","git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh / powershell","note":"变量名用 $env:；勿把 export 抄进 PowerShell。","warn":"新开 PowerShell 窗口后这些 $env: 会丢，需重设或写入用户环境变量。","lines":["$env:HTTP_PROXY='http://127.0.0.1:7890'","$env:HTTPS_PROXY='http://127.0.0.1:7890'","$env:ALL_PROXY='http://127.0.0.1:7890'","$env:NO_PROXY='127.0.0.1,localhost,::1'","git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"linux","label":"Linux / WSL","os":"Linux","shell":"bash","note":"WSL 里是真 Linux 用户态；代理端口仍指向 Windows 主机时，有时要用宿主机 IP，而非 127.0.0.1。","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1","git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"macos","label":"macOS","os":"macOS","shell":"zsh / bash","note":"近年默认 zsh；export 写法与 bash 相同。","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1","git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]}]}
\`\`\`

\`\`\`decide
{"title":"clone 不通时怎么选通路？","caption":"点选项走最短决策；结果是建议，不是替你改本机。","start":"start","steps":[{"id":"start","q":"浏览器现在能打开 github.com 吗？","options":[{"label":"能","next":"browser_ok"},{"label":"不能","next":"browser_bad"}]},{"id":"browser_bad","q":"本机代理引擎（如 Clash）系统代理开了吗？","options":[{"label":"还没 / 不确定","next":"open_proxy"},{"label":"已开仍打不开","next":"node_or_sub"}]},{"id":"open_proxy","result":"先开代理客户端 → 选节点 → 开系统代理，再用浏览器验证 github.com。","detail":"浏览器不通时，先别纠结 Git 命令。"},{"id":"node_or_sub","result":"换节点 / 检查订阅是否过期；公司网络可能另需合规通道。","detail":"学习站不绑定任何商家。"},{"id":"browser_ok","q":"终端里 git clone 是否仍超时 / Failed to connect？","options":[{"label":"是，终端失败","next":"term_proxy"},{"label":"终端也成功了","next":"done"}]},{"id":"term_proxy","q":"当前终端会话设了 HTTP(S)_PROXY 吗？","options":[{"label":"还没（常见）","next":"set_env"},{"label":"设了仍失败","next":"ghproxy"}]},{"id":"set_env","result":"在**当前壳**按上一节环境分栏 export / $env: 后再 clone。","detail":"浏览器通 ≠ Git 通：多数 CLI 不读系统代理。"},{"id":"ghproxy","result":"可临时试 ghproxy.com 前缀 URL；仍优先修好本机代理。","detail":"第三方前缀会限速/失效，勿当长期方案。"},{"id":"done","result":"通路已通。下一步：确认在仓库根再 pnpm install。","detail":"见「首次跑通」与「包管理器」。"}]}
\`\`\`

\`\`\`quiz
{"title":"代理通路 · 快速自测","caption":"选最贴切的一项；解析会说明常见误判。","questions":[{"q":"浏览器能开 GitHub，但 Git Bash 里 git clone 报 Failed to connect。最可能是？","choices":[{"t":"Git 语法写错了","ok":false,"why":"语法错多半是 usage / repository not found，不是连 443 超时。"},{"t":"当前终端会话没有 HTTP(S)_PROXY","ok":true,"why":"系统代理常只覆盖浏览器；Git 等 CLI 要单独设环境变量。"},{"t":"必须重装 Node.js","ok":false,"why":"Node 与 clone 网络通路无关。"}]},{"q":"PowerShell 里应该怎么设代理变量？","choices":[{"t":"export HTTPS_PROXY=http://127.0.0.1:7890","ok":false,"why":"export 是 bash/zsh 方言，PowerShell 不认。"},{"t":"$env:HTTPS_PROXY='http://127.0.0.1:7890'","ok":true,"why":"PowerShell 用 $env:NAME= 形式；只对当前窗口有效。"},{"t":"在 cmd 里 setx 一次就永远够用且所有壳共享","ok":false,"why":"持久化可以，但 Git Bash / 已打开窗口未必立刻看到；仍要分壳验证。"}]}]}
\`\`\`

\`\`\`check
{"title":"clone 前检查清单","caption":"勾完再 clone，少踩「半通半不通」。","items":[{"text":"代理客户端已运行，并选中可用节点","hint":"延迟全红时先换节点"},{"text":"系统代理已开，浏览器能打开 github.com","hint":"浏览器不通 → 先别打 Git"},{"text":"当前终端已按方言设好 HTTP(S)_PROXY","hint":"Git Bash 用 export；PowerShell 用 $env:"},{"text":"工作目录是你想放仓库的文件夹","hint":"clone 会新建子目录"},{"text":"若无代理：知道 ghproxy 只是临时前缀","hint":"第三方可用性不保证"}]}
\`\`\`

\`\`\`shell
{"preset":"clone-proxy-ok"}
\`\`\`

本机可复制：

\`\`\`bash
# Git Bash / macOS / Linux（端口改成你的 Mixed Port）
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
export ALL_PROXY=http://127.0.0.1:7890
export NO_PROXY=127.0.0.1,localhost,::1

git clone https://github.com/sunflowermm/XRK-AGT.git
\`\`\`

\`\`\`powershell
# Windows PowerShell（端口同上）
$env:HTTP_PROXY='http://127.0.0.1:7890'
$env:HTTPS_PROXY='http://127.0.0.1:7890'
$env:ALL_PROXY='http://127.0.0.1:7890'
$env:NO_PROXY='127.0.0.1,localhost,::1'
\`\`\`

### 0.3 不设本机代理时：ghproxy.com 前缀（模拟）

[ghproxy.com](https://ghproxy.com/)（以及同类如 **gh-proxy.com**）把 GitHub URL **套一层前缀**，让 \`git clone\` 先打到国内可及的中转（**第三方公益/镜像，可用性会变，非官方**）。写法示例：

\`\`\`text
https://ghproxy.com/https://github.com/sunflowermm/XRK-AGT.git
\`\`\`

\`\`\`shell
{"preset":"clone-ghproxy"}
\`\`\`

| 方式 | 何时用 | 注意 |
|------|--------|------|
| **本机 \`HTTP(S)_PROXY\`** | 已有 Clash 等引擎 | 终端要单独 export；优先推荐 |
| **ghproxy 前缀** | 暂无代理、只想拉代码 | 前缀站可能限速/失效；勿当长期方案 |
| **Gitee 镜像** | 项目文档提供镜像地址 | URL 换掉即可，Git 命令不变 |

概念手顺：番外 **代理引擎** → **端口与 Coding Agent**。  
环境变量地基：第一章 **安装器与 PATH**。家目录 / 点文件：番外 **本机目录**。

### 没有合适代理时（迫不得已）

若你**没有**可用订阅/节点，可打开门户选入口试通：

\`https://129.226.120.177:8000/\`

| 声明 | 说明 |
|------|------|
| **这不是推荐首选** | 优先用你已有的合规代理 / 公司通道 / 能直连的网络 |
| **并非价格很便宜** | 套餐与线路以站点说明为准；**不要**当「便宜替代品」冲动下单 |
| **迫不得已再来** | 仅在 GitHub 完全不可达、又必须完成本仓部署时，再考虑临时通路 |
| **用完仍要设代理变量** | 门户只解决「有没有通路」；本机 Git/终端仍按上一节写 \`HTTP(S)_PROXY\` |

> 学习站**不绑定**任何代理商家或镜像站；上表与 ghproxy 仅作「通路备忘」，后果与费用自负。

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
  Proxy[代理通路 · 能开 GitHub] --> Prep[Git + Node + Redis + 日常浏览器]
  Prep --> Clone[clone 到目标目录]
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

> **先确认 §0**：浏览器能开 GitHub，且当前终端已设 \`HTTP(S)_PROXY\`（若需要）。

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
| \`git clone\` 超时 / Failed to connect | **GitHub 通路**；系统代理；终端 \`HTTP(S)_PROXY\`；或 **ghproxy 前缀** | §0 · 番外 Clash |
| 浏览器能开 GitHub，终端 clone 不行 | 终端**未设**代理变量（不吃系统代理） | §0.2 |
| 直连失败想先拉代码 | \`https://ghproxy.com/https://github.com/...\`（可用性不保证） | §0.3 |
| 完全没有可用代理 | 迫不得已再看 §0 门户备忘；**非便宜首选** | §0 |
| \`git\` / \`node\` 不是命令 | 未装 / PATH / **旧终端未关** | §2 · §3 |
| Node 版本过低 | 装成了旧 LTS | §3.2 |
| \`pnpm\` 没有 | \`corepack enable\` | 包管理器课 |
| Redis 找不到 | zip 未加 PATH；服务未起 | §2.4 · §3.3 |
| Redis zip 下不动 | Releases 也在 GitHub → 同 §0 | §0 · §3.3 |
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
| **Environment Variable（环境变量）** | 进程可见的 \`名=值\`；常被子进程继承 | PATH、\`HTTP_PROXY\`、\`HOME\` | 会话级 \`export\` ≠ 已写入系统设置 |
| **HTTP_PROXY / HTTPS_PROXY** | 告诉进程「出网走哪个代理」的环境变量 | Git / pnpm / Coding Agent 常读它们 | **≠** 系统代理开关；终端常要手写 |
| **ghproxy（GitHub 代理前缀）** | 把 \`https://github.com/...\` 套上中转前缀再 clone | \`https://ghproxy.com/https://github.com/...\` | 第三方；会失效；优先本机代理 |
| **正向代理 / 代理引擎** | 靠近客户端替你出网选路 | Clash Verge 开系统代理 + 本机端口 | 别和 Nginx **反向代理**混 |
| **Runtime（运行时）** | 执行代码的环境与内置库 | 本仓 **Node.js ≥ 26** 跑 \`node app\` | 别和 **框架** 混：Express 在 runtime 之上 |
| **V8（Google 开源 JavaScript 引擎）** | 执行 JS 的核心虚拟机 | Node、Chrome、Edge、Playwright Chromium | **不是**整个浏览器；排版靠 Blink |
| **Blink（Chromium 排版引擎）** | 把 HTML/CSS 画成页面 | Chrome/Edge 内核 | Node **没有** Blink/DOM |
| **JavaScriptCore（WebKit JS 引擎）** | Safari 使用的 JS 引擎 | macOS/iOS 默认浏览器 | 别假设「所有浏览器都是 V8」 |
| **SpiderMonkey（Mozilla JS 引擎）** | Firefox 使用的 JS 引擎 | 排障时 DevTools 行为可能不同 | 与 V8 实现细节不同 |
| **corepack / pnpm** | Node 包管理器启用器 + 本仓唯一包管理 | \`corepack enable\` 后用 \`pnpm install\` | 别用 npm/yarn 装本仓依赖 |
| **ensure-redis（启动前 Redis 探测）** | 本仓脚本确认 Redis 可用 | 无 Redis → fail-fast；见数据与缓存课 | 别与「可选 Mongo Core」同等对待 |

## Coding Agent 协作

> 完整提问地图见 **Vibe Coding 心智**。部署最适合「检查表 + 一步一层」。

可复制：

\`\`\`
目标：按 XRK-AGT 部署清单，确认本机/服务器是否具备 Git、Node≥26、pnpm、Redis、出网代理。
现场：OS=…；仓库路径=…；我粘贴 node -v / pnpm -v / redis-cli ping 的输出如下：…
约束：只用 pnpm；未确认前不要改 yaml / .env；不要提交密钥；不要改 src/infrastructure。
验收：给出缺项安装步骤；全部绿后说明下一步应打开「首次跑通」还是「面板上跑 Node」。
\`\`\`

面板 / systemd / 证书：同课框 **面板上跑 Node**、**systemd 直觉** 里也有对应提问。

## 下一步

- **番外 · Vibe Coding 心智（提问附录）** — 部署/反代提示词全集  
- **番外 · 代理引擎（Clash）** — \`HTTP_PROXY\` 与系统代理；部署卡 GitHub 时优先回这里  
- **番外 · 本机目录** — Users / \`/home\` / \`.xxx\`  
- **不同终端环境**（第一章）— 终端 / Shell / OS 完整概念  
- **首次跑通** — 最短命令串  
- **数据库** — Redis / SQLite  
- 番外 **容器** — Docker / Compose；\`docs/docker.md\`  
- **第三章 · Nginx** — 生产门面产品  
- **项目鸟瞰** — 架构  
`;

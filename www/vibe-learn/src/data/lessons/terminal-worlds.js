/** 不同终端环境 — 分块：三件套 · 多种 Shell · 命令本质 · Win 对照 · Claude Code · WSL vs 原生 */
export default `# 不同终端环境

> **终端**是窗口；**Shell**是窗口里的命令解释器（而且**不止一种**）；**OS**才真正创建进程。  
> 本课按块拆开：先本质，再 Windows 对照，再 WSL / 原生 Linux，最后接到工具链与部署。

## 本课分块

| 块 | 回答什么 |
|----|----------|
| **1 · 三件套** | 窗口 / Shell / OS 各管什么 |
| **2 · 多种 Shell** | 不是「只有一个壳」；bash ≠ PowerShell ≠ cmd |
| **3 · 命令如何能用** | 敲下一行字，系统里实际发生了什么 |
| **4 · Windows 对照** | Git Bash Here · CMD · PowerShell · Windows Terminal |
| **5 · 为何偏好 Git 终端** | 含 Claude Code 官方为何推荐 Git Bash |
| **6 · WSL vs 原生 Linux** | 同像 Linux，内核与边界不同 |
| **7 · 平台组合 · 提示符** | Win / mac / Linux / SSH；\`$\` 只是化妆 |

---

## 1. 三件套：你看见的 · 你说的 · 真正干活的

\`\`\`mermaid
flowchart TB
  subgraph you["你看见的"]
    TE["终端仿真器<br/>窗口 / 标签页"]
  end
  subgraph talk["你说的话"]
    SH["Shell<br/>bash / zsh / PowerShell / cmd …"]
  end
  subgraph real["真正干活"]
    OS["操作系统<br/>创建进程 · 文件 · 权限 · PATH"]
  end
  TE --> SH
  SH -->|系统调用 / 起进程| OS
\`\`\`

| 层 | 职责 | 例子 |
|----|------|------|
| **终端仿真器** | 显示文字、收键盘、多标签；**自己不解释命令** | Windows Terminal、Terminal.app、Git Bash 自带的 MinTTY、SSH 客户端窗口 |
| **Shell** | 解析你敲的字符串：内建命令、管道、变量、再决定去跑哪个程序 | bash、zsh、fish、**PowerShell**、**cmd** |
| **操作系统** | 按 PATH 找可执行文件、创建进程、管权限与文件 | Windows / Linux 内核 / macOS |

把文档里的命令「翻译」进**当前 Shell 的方言**，不要连提示符一起照抄。

---

## 2. Shell 不是只有一个「壳」

\`\`\`env
{"title":"列目录 · 四种方言","caption":"同一意图，写法不同。先认壳，再抄命令。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","note":"Unix 风格工具链；右键 Git Bash Here 时 cwd 已是该文件夹。","lines":["pwd","ls -la","cd ~","echo $HOME"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","note":"管道传的是对象；Get-ChildItem 才是原生动词。","lines":["Get-Location","Get-ChildItem -Force","Set-Location $env:USERPROFILE","echo $env:USERPROFILE"]},{"id":"cmd","label":"CMD","os":"Windows","shell":"cmd.exe","warn":"能力最窄；新文档请优先 Git Bash / PowerShell。","lines":["cd","dir","cd %USERPROFILE%","echo %USERPROFILE%"]},{"id":"linux","label":"Linux / macOS","os":"Unix","shell":"bash / zsh","lines":["pwd","ls -la","cd ~","echo $HOME"]}]}
\`\`\`

\`\`\`quiz
{"title":"终端三件套 · 自测","questions":[{"q":"Windows Terminal 是什么？","choices":[{"t":"一种 Shell 方言，和 bash 平级","ok":false,"why":"它是终端仿真器（窗框），里面再挂 PowerShell / Git Bash 等壳。"},{"t":"终端仿真器：负责显示与输入，不解释命令","ok":true,"why":"真正解析命令的是窗口里的 Shell。"},{"t":"操作系统内核","ok":false,"why":"内核在更底层；Terminal 只是用户态窗口。"}]}]}
\`\`\`


「Shell」= 壳层：人在外，内核在内。历史上有很多实现，**彼此语法不通用**。

| Shell | 常见环境 | 方言特点（直觉） |
|-------|----------|------------------|
| **bash** | Linux 默认之一；**Git Bash**；多数服务器教程 | \`ls\`、\`/\` 路径、\`&&\`、\`export\` |
| **zsh** | 近年 **macOS 默认** | 与 bash 很像，补全更强 |
| **fish** | 可选美化壳 | 语法有差异，别当 bash 抄 |
| **PowerShell** | **Windows 自带**（也有跨平台版） | 对象管道、\`Get-ChildItem\`、\`$\` 变量另一套；提示符常 \`PS>\` |
| **cmd** | Windows 老命令提示符 | \`dir\`、\`\\\` 路径、批处理 \`.bat\`；能力最窄 |

**要点：**

- 同一个「黑窗口」里，换一个 Shell = 换一种语言。  
- **Git Bash** 给你的是 **bash 方言 + 一套 Unix 风格工具**（在 Windows 用户态里），不是换了一个操作系统。  
- 第二章还有 **Shell / PowerShell 语言课**——那是语法深挖；本课先钉「环境与边界」。

---

## 3. 命令是如何能用的（本质）

你敲下 \`git --version\` 再回车，大致是：

\`\`\`mermaid
flowchart LR
  A[键盘输入一行] --> B[Shell 解析]
  B --> C{内建命令?}
  C -->|是| D[Shell 自己执行]
  C -->|否| E[按 PATH 找可执行文件]
  E --> F[OS 创建进程]
  F --> G[程序跑完 · 退出码回 Shell]
\`\`\`

滚动进入下方终端，看一次「敲命令 → 出结果」的节奏（可点重播）：

\`\`\`term
{"title":"外部命令经 PATH 找到","prompt":"$ ","steps":[{"type":"in","text":"git --version"},{"type":"out","text":"git version 2.45.2"},{"type":"in","text":"which git"},{"type":"out","text":"/usr/bin/git"},{"type":"in","text":"echo $?"},{"type":"out","text":"0"}]}
\`\`\`

| 步骤 | 含义 |
|------|------|
| **1. 解析** | Shell 拆词、展开变量、处理管道 \`|\`、逻辑 \`&&\`（各 Shell 规则不同） |
| **2. 内建 vs 外部** | \`cd\` 常是内建；\`git\` / \`node\` 一般是磁盘上的程序 |
| **3. PATH** | 环境变量里一串目录；按顺序找 \`git.exe\` / \`git\` 等 |
| **4. 创建进程** | 真正干活的是 OS；Shell 只是「调度员 + 方言」 |
| **5. 退出码** | 0 常表示成功；脚本用它决定下一步 |

所以：

- 「命令不是内部命令」→ 多半是 **PATH 里没有**，或装了却在**旧终端**里（环境变量未刷新）。  
- 「换个终端就好了」→ 常因 **另一个窗口用了另一份 PATH / 另一个 Shell**。  
- 详解装完如何进 PATH：下一课附近的 **安装器与 PATH**。  
- 家目录 / \`bin\` 在各系统怎么写：番外 **本机目录**（**先角色，后路径**）。

---

## 4. Windows：Git Bash Here · CMD · PowerShell 差在哪

| | **Git Bash Here** | **CMD** | **PowerShell** |
|--|-------------------|---------|----------------|
| **怎么开** | 文件夹空白处右键（Win11 可能先「显示更多选项」） | \`cmd\` / 某些「命令提示符」 | 开始菜单 / Windows Terminal 默认配置 |
| **窗口里跑谁** | **bash**（Git for Windows 自带） | **cmd.exe** | **powershell** / pwsh |
| **路径直觉** | Unix 风格 \`/c/Users/...\` 或 \`~\`；也能理解不少 Windows 路径 | \`C:\\Users\\...\` | \`C:\\Users\\...\`；另有 PowerShell 路径 cmdlet |
| **命令方言** | 教程里的 Linux/mac 命令大多可直接试 | 老式 \`dir\` / \`copy\` | 既可调 Win 命令，也有自己的动词名词 |
| **当前目录** | **右键时那个文件夹**（最大便利） | 开在哪算哪，常要 \`cd\` | 同左 |
| **和 Git** | 与 Git 安装捆绑；clone / 脚本友好 | 若 Git 在 PATH 也能 \`git\`，但缺 bash 生态 | 同上；脚本写法是另一套 |

**Windows Terminal** 只是「窗框」：同一个 Terminal 里可以开多个标签，分别挂 PowerShell、CMD、Git Bash、WSL——**标签里的 Shell 才决定方言**。

\`\`\`compare
{"title":"同一目标：列目录","caption":"方言不同，角色相同。","items":[{"role":"列当前目录","win":"dir  /  Get-ChildItem","linux":"ls  /  ls -la","mac":"ls","note":"Git Bash 用 ls；PowerShell 用 Get-ChildItem（有 ls 别名但对象语义不同）"},{"role":"家目录","win":"%USERPROFILE%  /  $env:USERPROFILE","linux":"$HOME  /  ~","mac":"$HOME  /  ~","note":"先角色后路径：见番外「本机目录」"},{"role":"设代理变量","win":"$env:HTTPS_PROXY='…'","linux":"export HTTPS_PROXY=…","mac":"export HTTPS_PROXY=…","note":"终端常不吃系统代理"}]}
\`\`\`

可输入沙箱（假数据 · 自动演示 PATH / which）：

\`\`\`shell
{"preset":"path-check"}
\`\`\`

\`\`\`text
资源管理器文件夹
    └─ 右键「Git Bash Here」
         └─ MinTTY 窗口 + bash + 当前目录已是该文件夹
\`\`\`

---

## 5. 为什么 Claude Code 希望用上「Git 的终端」

这里说的不是「你必须只用 Git Bash 打字」，而是：**在原生 Windows 上，给 AI/自动化一条可靠的 Bash 工具链**。

依据 [Claude Code 安装文档](https://code.claude.com/docs/en/installation)：

- 官方**推荐**安装 **Git for Windows**，以便 Claude Code 使用 **Bash tool**。  
- 若未装 Git for Windows，则退回用 **PowerShell** 当壳工具。  
- 找不到 Git Bash 时可在配置里指定 \`CLAUDE_CODE_GIT_BASH_PATH\`（指向 \`bash.exe\`）。  
- 若你整套开发已在 **WSL** 里跑，则不依赖 Git for Windows 那份 Bash。

**为什么要 Bash：**

| 原因 | 说明 |
|------|------|
| **教程与脚本方言** | 开源、CI、文档大量假设 bash/\`sh\` 语法 |
| **工具链一致** | \`curl\`、管道、Unix 路径习惯与 Linux/mac 对齐 |
| **Agent 执行面** | 编码助手内部跑命令时，Bash 行为更可预期；纯 CMD 能力窄，PowerShell 语法另一套 |

对本仓：装 Git 不只为了 \`clone\`，也顺便给 **Git Bash**（以及依赖 Bash 的工具）备好环境。人手日常仍可用 PowerShell 跑 \`node\` / \`pnpm\`——**认清当前标签是哪种 Shell** 即可。

---

## 6. WSL 和原生 Linux 有什么区别

| | **原生 Linux**（实体机 / 云主机） | **WSL**（Windows 上的 Linux） |
|--|----------------------------------|-------------------------------|
| **内核** | 就是 Linux 内核 | WSL2 用**虚拟化的 Linux 内核**；仍挂在 Windows 主机上 |
| **你打开的窗口** | 本机终端 / SSH 进这台 Linux | Windows Terminal 里的 Ubuntu 等；或 \`wsl\` 命令 |
| **装软件** | apt/dnf 等装进这套 Linux | 同样在 WSL 发行版里装——**不是**自动进 Windows PATH |
| **文件** | 原生文件系统 | 家目录在 Linux 侧；访问 \`C:\` 常经 \`/mnt/c\`（跨界又慢又易权限别扭） |
| **图形 / 驱动 / Docker** | 按发行版与硬件来 | 能做很多，但边界在 Windows↔WSL；Docker 等常要额外设计 |
| **和本仓 Windows 本机安装** | 整机就是 Linux 部署 | **WSL 里的 node ≠ PowerShell 里的 node**；别混着用 |

**一句话：** WSL 是「Windows 里的一台（轻量）Linux」；原生 Linux 是「机器本身就是 Linux」。命令长得像，**进程、PATH、服务、网卡命名空间**不是同一套。

---

## 7. 平台组合与提示符

| 系统 | 常见窗口 App | 常用 Shell | 路径直觉 |
|------|--------------|------------|----------|
| **Windows** | Windows Terminal、Git Bash 窗、\`conhost\` | PowerShell、cmd、**Git Bash(bash)**、WSL 内 bash | \`C:\\...\` 或 Git Bash 的 \`/c/...\` |
| **macOS** | 终端.app、iTerm2 | **zsh** | \`/Users/...\` |
| **Linux 桌面** | GNOME Terminal、Konsole… | bash / zsh | \`/home/...\` |
| **远程服务器** | SSH 客户端窗口 | 多为 bash | 无图形，一切靠命令 |

\`\`\`html5
<figure>
  <svg viewBox="0 0 540 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="本机与 SSH 远程">
    <rect x="20" y="30" width="160" height="90" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.65"/>
    <text x="100" y="70" text-anchor="middle" fill="currentColor" font-size="13">本机终端</text>
    <text x="100" y="95" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.65">窗口在你眼前</text>
    <path d="M180 75 H250" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5"/>
    <text x="215" y="65" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.6">SSH</text>
    <rect x="250" y="30" width="160" height="90" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.65"/>
    <text x="330" y="70" text-anchor="middle" fill="currentColor" font-size="13">远程 Shell</text>
    <text x="330" y="95" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.65">进程跑在服务器</text>
    <rect x="430" y="45" width="90" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.45"/>
    <text x="475" y="80" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.7">机房 OS</text>
  </svg>
  <figcaption>SSH：键盘在本地，进程与文件在远端</figcaption>
</figure>
\`\`\`

### 提示符只是化妆

| 你看到的 | 常见含义 |
|----------|----------|
| \`$\` | bash/zsh 普通用户（文档习惯） |
| \`#\` | 常表示 root（不绝对） |
| \`PS>\` | PowerShell |
| \`>\` | 依配置而变 |

---

## 学完应能说明

- 终端窗口 ≠ Shell ≠ OS  
- 至少能点名三种 Shell，并知道 **Git Bash = Windows 上的 bash 环境**  
- 用「PATH → 起进程」解释「不是内部命令」  
- 说清 Git Bash Here / CMD / PowerShell 的差别  
- 说清 Claude Code 为何推荐 Git for Windows（Bash tool）  
- 说清 WSL 与原生 Linux 不是同一台机器  

\`\`\`quiz
{"title":"终端环境自测","questions":[{"q":"终端仿真器、Shell、OS 的分工？","choices":[{"t":"仿真器管窗口输入输出；Shell 解释命令；OS 起进程管文件权限","ok":true,"why":"三件套分层；混为一谈会排错层。"},{"t":"三者完全同义","ok":false,"why":"换终端窗口不会换掉 Shell 语义。"},{"t":"Shell 负责磁盘分区","ok":false,"why":"分区是 OS/存储层。"},{"t":"没有图形桌面就没有 Shell","ok":false,"why":"服务器 SSH 正是终端+Shell。"}]},{"q":"WSL 与原生 Linux 云主机？","choices":[{"t":"WSL 在 Windows 上提供 Linux 环境；原生机有独立内核与硬件边界，验收要对准目标","ok":true,"why":"路径、网络、systemd 完整度可能不同。"},{"t":"二者强制比特级一致","ok":false,"why":"现实常有差异。"},{"t":"WSL 不能跑命令行","ok":false,"why":"正是为了跑 Linux 工具链。"},{"t":"原生 Linux 禁止 SSH","ok":false,"why":"云主机常用 SSH。"}]}]}
\`\`\`

## 下一步

- **安装器与 PATH** — 命令如何进 PATH、为何要新开终端；环境变量地基  
- **Linux 发行版 / 基础指令** — 在 bash 方言里建立空间感  
- 番外 **本机目录** — Users / AppData / \`/bin\` / \`/home\` / \`.xxx\`  
- **Git 与工作区** — clone 与三区  
- **部署环境** — 把终端选择落到 XRK-AGT 安装手顺  

## 结合知识导图2

导图2 **终端**词条把「命令行窗口」说成可检索定义；本课钉的是**三件套分层**（仿真器 / Shell / OS）与 Windows 对照。

| 本课重点 | 导图2 | 别混 |
|----------|-------|------|
| 终端仿真器 | **终端** | 窗口 ≠ 解释器 |
| 多种 Shell | 终端（用法场景） | bash ≠ PowerShell |
| PATH 起进程 | **环境变量**（下一课展开） | 「命令不存在」常在 PATH 层 |

跨导图可打开终端词条看边界与演示；排障仍按本课分层。

`;

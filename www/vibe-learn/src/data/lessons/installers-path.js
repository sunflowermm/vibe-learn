export default `# 安装器与 PATH

> 软件要被 Shell 找到，通常需写入磁盘并进入 **PATH**（可执行文件搜索路径）。  
> 安装 Node 时，除 \`node\` 外，常一并登记 \`npm\`、\`npx\`。  
> 本课也钉清：**Homebrew / apt / winget** 这类「往系统里装软件」的工具是什么。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| PATH | 能解释 PATH 如何让壳找到可执行文件 |
| 安装器 | 知道改 PATH 后要开新终端 |
| 排障 | command not found 先查 PATH 与安装位置 |
| 跟 Agent | 贴 \`where node\`/\`which node\` 与 PATH 片段 |


## 本课分块

| 块 | 目标 |
|----|------|
| **环境变量是什么** | 键值配置；会话与继承；PATH 只是其中一种 |
| **安装器做什么** | 落盘 + 登记 PATH |
| **系统级包管理器** | brew / apt / winget / scoop… |
| **装完能敲哪些命令** | \`node\` / \`npm\` / \`npx\` |
| **「不是内部命令」** | PATH 与会话未刷新 |

---

## 0. 环境变量（Environment Variable）是什么？

**环境变量** = 操作系统 / Shell 维护的一组 \`名字 → 字符串值\`，在**进程启动时**交给该进程（及其子进程常可继承）。

| 点 | 说明 |
|----|------|
| **谁在用** | Shell、安装器、\`node\`、\`git\`、CI、Coding Agent… 都可能读 |
| **生命周期** | 在终端里 \`export\` / \`$env:…=\` → 多半只活在**当前窗口**；写入「用户/系统环境变量」或 shell 配置文件 → 新开终端也有 |
| **继承** | 父进程设好后，再启动的子进程通常能看见同一组变量 |

\`\`\`mermaid
flowchart LR
  OS[OS / Shell 环境块] --> P1[当前终端进程]
  P1 --> P2[子进程 git / node / Agent]
  OS -.->|用户级持久化| New[新开的终端]
\`\`\`

### 两种最常见用途（先分清）

| 变量族 | 回答的问题 | 本图谱深挖 |
|--------|------------|------------|
| **\`PATH\`** | 敲命令时，到哪些目录找可执行文件？ | **本课后半** |
| **\`HTTP_PROXY\` / \`HTTPS_PROXY\` / \`NO_PROXY\`…** | 出网请求走哪台代理？哪些主机直连？ | 番外 **端口与 Coding Agent** |

同一机制，不同业务含义——部署时「GitHub 要代理」卡的是第二族，不是 PATH。

**跨系统同构：** \`PATH\` / \`HTTP_PROXY\` 在 Windows、Linux、macOS 上**角色相同**；写法是 \`export\` 还是 \`$env:…=\`、家目录叫 \`HOME\` 还是 \`USERPROFILE\`——见番外 **本机目录**（先角色后路径）。

可输入练习（假终端 · 自动打字）：

**PATH / which**

\`\`\`shell
{"preset":"path-check"}
\`\`\`

**代理变量族（与 PATH 对照）**

\`\`\`env
{"title":"查看 PATH · 按壳","caption":"「不是内部命令」时，先在对应壳里打印 PATH / 用 which / Get-Command。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["echo $PATH","which node","which git","node -v"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["echo $env:Path","Get-Command node","Get-Command git","node -v"]},{"id":"linux","label":"Linux / macOS","os":"Unix","shell":"bash / zsh","lines":["echo $PATH","which node","which git","node -v"]}]}
\`\`\`


\`\`\`shell
{"preset":"env-proxy"}
\`\`\`

\`\`\`term
{"title":"会话里查看环境变量（bash）","prompt":"$ ","steps":[{"type":"in","text":"echo $HOME"},{"type":"out","text":"/home/alice"},{"type":"in","text":"echo $PATH"},{"type":"out","text":"/usr/local/bin:/usr/bin:/bin"},{"type":"in","text":"echo $HTTP_PROXY"},{"type":"out","text":""}]}
\`\`\`

\`\`\`term
{"title":"同一角色 · PowerShell 写法","prompt":"PS> ","steps":[{"type":"in","text":"echo $env:USERPROFILE","prompt":"PS> "},{"type":"out","text":"C:\\\\Users\\\\alice"},{"type":"in","text":"echo $env:HTTP_PROXY","prompt":"PS> "},{"type":"out","text":""}]}
\`\`\`

---

## 1. 安装器与 PATH

| 概念 | 说明 |
|------|------|
| **安装器** | 按平台写入文件、（可选）改环境变量 |
| **MSI / pkg** | Windows / macOS 常见图形安装包 |
| **PATH** | Shell 按序查找可执行文件的目录列表 |
| **环境变量** | 进程可见的配置；PATH 是其中最常用者 |

\`\`\`mermaid
flowchart LR
  I[安装器或 brew/apt 写入磁盘] --> P[登记到 PATH]
  P --> S[新开 Shell]
  S --> C["Get-Command / which node"]
  C --> OK[找得到可执行文件]
\`\`\`

---

## 2. 系统级包管理器（往「电脑里」装软件）

这和 **pnpm / npm**（往**项目**里装库）不是同一层——详见 **包管理器** 课「三种装东西」。

| 工具 | 常见平台 | 白话 |
|------|----------|------|
| **Homebrew（brew）** | macOS（也有 Linux） | 用公式仓库装 CLI/库；\`brew install git\` |
| **apt** | Debian / Ubuntu | 发行版官方仓库；\`sudo apt install curl\` |
| **dnf / yum** | Fedora / RHEL 系 | 同上，另一家族 |
| **pacman** | Arch | 滚动发行版仓库 |
| **winget** | Windows | 微软商店/清单式装软件 |
| **Chocolatey / Scoop** | Windows | 社区向包管理；Scoop 偏用户目录 |

\`\`\`env
{"title":"系统包装 curl/git · 按平台","caption":"系统包管理器 ≠ pnpm。装完仍要新开终端核对 PATH。","default":"mac","tabs":[{"id":"mac","label":"macOS · brew","os":"macOS","shell":"zsh/bash","lines":["brew install git","brew install curl","which git","which curl"]},{"id":"ubuntu","label":"Ubuntu · apt","os":"Linux","shell":"bash","lines":["sudo apt update","sudo apt install -y curl git","which git","which curl"]},{"id":"win","label":"Windows · winget","os":"Windows","shell":"pwsh","note":"也可用官网安装器；装完新开终端","lines":["winget install --id Git.Git -e","winget install --id cURL.cURL -e","Get-Command git","Get-Command curl"]}]}
\`\`\`

**Homebrew 是什么？**  
macOS 上最常用的 **第三方系统包管理器**：维护一份配方（formula），帮你下载、编译或下瓶子（bottle）、把可执行文件链到 brew 的前缀目录，并通常已在 PATH 里。  
它 **不是** Node 的包管理器；\`brew install node\` 装的是 **运行时**，项目依赖仍用 pnpm。

Windows 上装 Git/Node 更常见 **官网安装器**；装完仍要确认 PATH（Redis zip 常需手动加，见 **部署环境**）。

---

## 3. 装完通常能敲到的命令（以 Node 为例）

| 命令 | 来源 | 说明 |
|------|------|------|
| \`node\` | 运行时 | 执行 JS |
| \`npm\` | 官方默认包管理器 | 随多数官方安装附带 |
| \`npx\` | 官方附带 | 临时执行包内命令 |

\`\`\`env
{"title":"核对 node/npm/npx · 按壳","caption":"能输出版本只说明官方默认工具链在 PATH；本仓依赖仍用 pnpm。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["node -v","npm -v","npx -v","which node"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["node -v","npm -v","npx -v","Get-Command node"]},{"id":"unix","label":"Linux / macOS","os":"Unix","shell":"bash/zsh","lines":["node -v","npm -v","npx -v","which node"]}]}
\`\`\`

也可回上文模拟窗 **path-check** 练习 \`which\` / \`Get-Command\`。

---

## 4. 「装了却不是内部命令」

1. 勾选了加入 PATH，但未 **重开终端**  
2. 用户目录安装，当前会话看不到  
3. 多套 Node，PATH 顺序指向另一套  
4. 只装了 brew/apt 里的包，但当前 Shell 不是加载了该前缀的会话  

核对命令：用上文 **「查看 PATH · 按壳」** 或 **「核对 node/npm/npx」** 分栏；旧终端找不到时先**新开窗口**。

---

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **Environment Variable（环境变量）** | 进程可见的 \`名=值\` 配置，常被子进程继承 | PATH、\`HTTP_PROXY\`、\`JAVA_HOME\` | 不是某个 App 的私有配置文件格式 |
| **PATH** | 查找外部命令的目录列表 | \`git\`/\`node\` 能敲出来 | 改完要**新开终端**；与代理变量无关 |
| **会话级 vs 持久化** | 当前窗口有效 vs 写入用户/系统后长期有效 | 临时 \`export\`；或系统设置里改 PATH | 持久化 PATH ≠ 自动带上 \`HTTP_PROXY\` |
| **Homebrew / apt / winget** | 系统级包管理器 | 往电脑里装 CLI | 不是 pnpm |
| **MSI** | Windows 安装包格式 | 常顺带改 PATH | 解压 zip（如部分 Redis）常不改 PATH |

\`\`\`quiz
{"title":"PATH 自测","questions":[{"q":"PATH 回答的核心问题？","choices":[{"t":"敲命令时到哪些目录按序搜索可执行文件","ok":true,"why":"多版本时前面的目录优先。"},{"t":"HTTP 默认走哪台代理","ok":false,"why":"那是 HTTP_PROXY 族。"},{"t":"Git 默认分支名","ok":false,"why":"Git 配置。"},{"t":"DNS 服务器列表","ok":false,"why":"解析器配置。"}]},{"q":"刚装完 Node，旧终端仍找不到 node，优先？","choices":[{"t":"新开终端或重载配置，用 which/where 核对 PATH","ok":true,"why":"旧会话不会自动刷新安装器写入的 PATH。"},{"t":"立刻格式化磁盘","ok":false,"why":"过激。"},{"t":"删除 .git","ok":false,"why":"无关。"},{"t":"调 temperature","ok":false,"why":"模型参数无关。"}]}]}
\`\`\`

## 下一步

**包管理器** — 系统包 vs 语言包；本仓为何钉 pnpm。  
**Linux 基础指令** — \`curl\` 等网络命令是什么。  
番外 **本机目录** — 家目录 / \`bin\` / 点文件，弄清 PATH 里那些路径从哪来。  
需要给终端配置出网代理时 → 番外 **端口与 Coding Agent**（\`HTTP_PROXY\` 体系）。
## 导图2 · 环境变量 / 终端 × 安装器与 PATH

> 导图2 环境变量核心课之一；本课钉「命令从哪来」。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **环境变量** | PATH | 搜索可执行文件的目录列表 |
| **终端命令行** | 读当前环境 | 新开终端才吃到安装器改动 |
| **部署上线** | 机器上要有正确 PATH | 服务账号环境≠你的交互壳 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

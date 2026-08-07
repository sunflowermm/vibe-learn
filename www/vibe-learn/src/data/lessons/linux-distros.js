export default `# Linux 发行版

> Linux 严格说常指 **内核**；你安装的 Ubuntu、Fedora、Arch… 是 **发行版（distro）**：  
> 内核 + 软件包仓库 + 安装器 + 默认桌面/工具的组合拳。  
> **学会之后**：会认家族与包管理方言；跟文档时先对「哪一系」；知道 apt/brew ≠ pnpm。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 发行版 | 能说明发行版=内核+用户态+包生态的组合 |
| 对照 | apt/dnf/brew 是系统包，不是 pnpm |
| 场景 | 服务器/WSL 常见绕不开发行版 |
| 跟 Agent | 要装系统包时写明发行版与包管理器 |

## 本课分块

| 块 | 内容 |
|----|------|
| **为何要分发行版** | 同一句「在 Linux 上装」可能完全不同 |
| **家族速写** | Debian / Fedora / 独立系 / Alpine |
| **和桌面系统对比** | brew / apt / winget |
| **WSL 怎么选** | 跟服务器教程对齐 |
| **实践建议** | 对文档、避坑包过旧 |

---

## 1. 为何要分块讲

「在 Linux 上装 Node」——哪一种 Linux？  
包名、初始化系统、防火墙命令都可能不同。分清发行版，才能对上文档。

\`\`\`mermaid
flowchart TB
  K["Linux 内核"] --> D1["Ubuntu / Debian"]
  K --> D2["Fedora / RHEL"]
  K --> D3[Arch 等]
  K --> D4["Alpine 等"]
  D1 --> P1[apt]
  D2 --> P2[dnf]
  D3 --> P3[pacman]
  D4 --> P4[apk]
\`\`\`

自检：先认清自己是哪一系，再抄文档。

\`\`\`env
{"title":"认发行版 · 再选包管理器","caption":"Windows 原生没有 /etc/os-release；WSL 里选 Ubuntu 再跟 apt 教程。","default":"debian","tabs":[{"id":"debian","label":"Debian / Ubuntu","os":"Linux","shell":"bash","lines":["cat /etc/os-release","# 看 ID= / ID_LIKE=","sudo apt update","sudo apt install -y curl"]},{"id":"fedora","label":"Fedora / RHEL","os":"Linux","shell":"bash","lines":["cat /etc/os-release","sudo dnf install -y curl"]},{"id":"arch","label":"Arch","os":"Linux","shell":"bash","lines":["cat /etc/os-release","sudo pacman -Syu curl"]},{"id":"wsl","label":"WSL · 对照","os":"Windows","shell":"bash in WSL","note":"在 WSL 终端里执行，不是 PowerShell","lines":["cat /etc/os-release","uname -a","sudo apt update"]}]}
\`\`\`

---

## 2. 家族速写

### 包管理方言对照

\`\`\`compare
{"title":"同一意图：装软件","caption":"发行版不同，命令不同；角色都是系统包管理器。","items":[{"role":"装包","win":"winget install …","linux":"apt / dnf / pacman / apk","mac":"brew install …","note":"系统级软件，不是 pnpm 项目依赖"},{"role":"更新索引","win":"winget upgrade","linux":"apt update 等","mac":"brew update","note":"先更新再装，少踩旧包坑"}]}
\`\`\`

| 家族 | 代表 | 包管理直觉 | 常见场合 |
|------|------|------------|----------|
| **Debian 系** | Debian、Ubuntu、Mint | \`apt\` / \`.deb\` | 云主机教程最多；**WSL 默认常选 Ubuntu** |
| **Fedora 系** | Fedora、RHEL、CentOS Stream | \`dnf\` / \`.rpm\` | 企业与部分云镜像 |
| **独立系** | Arch、openSUSE 等 | \`pacman\`、\`zypper\`… | 桌面玩家、滚动更新 |
| **容器/最小** | Alpine | \`apk\` | Docker 基础镜像（体积小，musl 边界要小心） |

服务器文档里最常见的是 **Ubuntu LTS** 与各类 **RHEL 兼容** 环境。

<details>
<summary>展开：发行版 ≠ 桌面环境</summary>

Ubuntu 可以装 GNOME；同一发行版也可以几乎无桌面、只当服务器。  
「我用的是 Ubuntu」描述的是 **软件发行与仓库**，不是「长得像不像 Windows」。
</details>

---

## 3. 和桌面 Windows / macOS

| | Windows / macOS | Linux 发行版 |
|--|-----------------|--------------|
| 更新软件 | 商店 / 安装包 / **Homebrew（mac）** / winget | 发行版仓库为主（apt/dnf…） |
| 权限 | UAC / 管理员 | 常遇 \`sudo\` |
| 所见即所得 | 相对统一 | 桌面环境可选，差异大 |

**brew 与 apt：** 都是系统级装软件。apt 跟发行版官方源绑定；**Homebrew** 是 macOS 上事实标准的第三方包管理器（也有 Linux 版）。  
\`brew install curl\` / \`sudo apt install curl\` 装的是 **命令行程序**；项目里的 JS 依赖仍用 **pnpm**（见 **包管理器**、**安装器与 PATH**）。

---

## 4. WSL：Windows 上的「真发行版」

| 点 | 说明 |
|----|------|
| WSL 里的 Ubuntu | 就是 Debian 系成员；\`apt\` 照旧 |
| 与 Git Bash | Git Bash ≈ 用户态 Unix 工具；WSL ≈ 更接近真 Linux 用户态（内核仍是 Windows 的 WSL 层） |
| 跟 XRK 教程 | 若作者给的是 \`apt install\`，在 **WSL Ubuntu** 里抄最省事；在纯 PowerShell 里硬抄会翻车 |
| 文件互通 | \`/mnt/c/...\` 可碰 Windows 盘；大项目依赖安装更建议放在 Linux 文件系统侧（性能） |

边界细节见 **不同终端环境**「WSL vs 原生」。

\`\`\`decide
{"title":"WSL 选哪一系？","start":"start","steps":[{"id":"start","q":"你的目标？","options":[{"label":"跟多数云主机 / XRK apt 教程","next":"ubu"},{"label":"企业 RHEL 系文档","next":"fed"},{"label":"只要最小容器体感","next":"alp"},{"label":"还没装 WSL","next":"win"}]},{"id":"ubu","result":"WSL 选 Ubuntu（Debian 系）。","detail":"apt 与多数教程同方言。"},{"id":"fed","result":"选 Fedora 或相关镜像。","detail":"dnf 方言；确认教程是否也是 RHEL 系。"},{"id":"alp","result":"Alpine 更适合当容器基础镜像。","detail":"日常 WSL 开发仍建议 Ubuntu。"},{"id":"win","result":"先装 WSL2 + Ubuntu，再回本课认家族。","detail":"纯 PowerShell 硬抄 apt 会翻车。"}]}
\`\`\`

---

## 5. 实践建议（给本仓）

- 跟 XRK / Node 教程时：看清作者基于 **哪一系** 写的安装命令  
- 不确定时，用版本管理器（fnm/nvm）或官方二进制，减少「发行版包过旧」——本仓要 **Node ≥ 26**，系统源里的 \`nodejs\` 常常偏旧  
- 容器基础镜像常见 Alpine（\`apk\`）——连到番外 **Docker**；Alpine 上编原生模块可能比 Ubuntu 折腾  
- **永远分清**：\`apt/brew\` 装的是系统命令；\`pnpm\` 装的是仓库依赖  

\`\`\`quiz
{"title":"发行版自测","questions":[{"q":"Ubuntu 与 Fedora「装软件」命令不同，首先因为？","choices":[{"t":"发行版家族不同，默认系统包管理器方言不同","ok":true,"why":"apt vs dnf 等；内核可同属 Linux。"},{"t":"TCP 端口数学定义不同","ok":false,"why":"端口是协议标准。"},{"t":"必须用 pnpm 装内核","ok":false,"why":"pnpm 管 JS 项目依赖。"},{"t":"HTTP 404 语义相反","ok":false,"why":"Web 标准一致。"}]},{"q":"brew / apt 相对 pnpm？","choices":[{"t":"系统级装 CLI/运行时；pnpm 管项目 node_modules","ok":true,"why":"角色分层，勿互换。"},{"t":"系统包与项目依赖完全等价可互换，无层级差别","ok":false,"why":"系统包≠语言项目依赖。"},{"t":"pnpm 负责管理系统内核升级与发行版安全补丁","ok":false,"why":"pnpm 是 JS 包管理器。"},{"t":"apt 只能装 npm 包，不能装 git/curl 这类系统 CLI","ok":false,"why":"apt 是发行版软件包。"}]},{"q":"WSL 选 Ubuntu 学服务器文档，主要收益？","choices":[{"t":"可以不用 PATH","ok":false,"why":"仍要 PATH。"},{"t":"apt 方言与多数云主机教程对齐","ok":true,"why":"Debian 系材料最多。"},{"t":"自动等于本仓已 pnpm install","ok":false,"why":"发行版与项目依赖无关。"}]}]}
\`\`\`

## 下一步

**Linux 基础指令** — 目录、进程，以及 **curl / wget**。  
装运行时回 **Node.js / PATH / pnpm**。
## 导图2 · 终端 / 环境变量 / 部署 × 发行版

> 导图2 部署常假设「有一台 Linux」；本课钉发行版差异。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **终端命令行** | 系统上的壳 | 发行版决定默认包管理 |
| **环境变量** | 系统与用户环境 | 与包安装路径相关 |
| **部署上线** | 选哪套用户态 | 服务器镜像常绑死发行版 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

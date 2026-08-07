export default `# PowerShell（语言）

> **分类：脚本语言。** 对象管道，不是纯文本流。  
> **Windows 本机**开发 XRK 常用（\`pnpm\`、\`node app\`）。本仓 **无 PowerShell 子服** — 主服仍是 Node JS。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 身份 | Windows 常见壳；与 Bash 语法不同 |
| 环境 | 设置 env 的方式与 Unix 有别 |
| 边界 | 不是 AgentRuntime 宿主 |
| 跟 Agent | Windows 自动化注明 PowerShell 版本假设 |


## 本课你要带走什么

1. **什么场景用 PowerShell、什么场景用 Bash/Python**  
2. 对象管道、Cmdlet、错误模型怎么讲清  
3. 在 Windows 上跑本仓与 CI 用 Bash 的分工

---

## 1. 使用场景：何时用、何时不用

### 1.1 适合用 PowerShell 的场景

| 场景 | 为什么 |
|------|--------|
| **Windows 本机开发 XRK** | 默认终端；\`pnpm\` \`node\` 路径管理 |
| **Windows 系统管理** | 服务、注册表、WMI/CIM、IIS |
| **AD / Exchange / Azure 自动化** | 微软 cmdlet 生态 |
| **需要 .NET 互操作的脚本** | 直接调 \`[System.IO.*]\` |
| **跨平台 pwsh 7+ 脚本** | 与 Bash 并列的选项（仍偏对象） |
| **格式化结构化输出** | \`Select-Object\` \`Format-Table\` 保留类型 |

### 1.2 不适合 / 应换方案的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **Linux CI（本仓主流流水线）** | **Bash** | 服务器默认环境 |
| **复杂算法与可测业务** | **Python / JavaScript** | PS 适合胶不擅长域逻辑 |
| **本仓插件、HTTP** | **JavaScript** 主服 | 不在 PS 写 Core |
| **极简 POSIX 可移植** | **sh/bash** | PS 5.1 不跨 Unix |
| **字符串管道 Unix 工具链** | Bash + grep/sed | PS 别名背后仍是 cmdlet |
| **生产 Linux 容器入口** | bash/sh | 镜像更小、习惯统一 |

### 1.3 与 Bash / Python / JavaScript 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| Windows 桌面运维 | **PowerShell** |
| Linux CI / Docker | **Bash** |
| 跨平台自动化库 | **Python** |
| 本仓 Agent 业务 | **JavaScript** |

\`\`\`mermaid
flowchart TB
  Win[Windows 开发机] --> PS[PowerShell]
  PS --> Pnpm[pnpm / node app]
  CI[Linux CI] --> Bash[Bash]
  Biz[业务] --> JS[主服 JS]
\`\`\`

### 动手：方言对照（只读回放）

\`\`\`term
{"title":"PowerShell · 列目录与环境变量","prompt":"PS> ","steps":[{"type":"in","text":"Get-ChildItem | Select-Object -First 3 Name","prompt":"PS> "},{"type":"out","text":"Name\\n----\\nDocuments\\nDownloads\\nprojects"},{"type":"in","text":"echo $env:USERPROFILE","prompt":"PS> "},{"type":"out","text":"C:\\\\Users\\\\alice"},{"type":"in","text":"$env:HTTPS_PROXY='http://127.0.0.1:7890'; echo $env:HTTPS_PROXY","prompt":"PS> "},{"type":"out","text":"http://127.0.0.1:7890"}]}
\`\`\`

\`\`\`compare
{"title":"同一意图，两套写法","caption":"Windows 本机常用左列；CI / Linux 常用右列。","items":[{"role":"列目录","win":"Get-ChildItem","linux":"ls -la","note":"PS 有 ls 别名，但管道传的是对象"},{"role":"环境变量","win":"$env:NAME='v'","linux":"export NAME=v","note":"会话级；新开窗口可能丢"},{"role":"当前目录","win":"Get-Location / cd","linux":"pwd / cd","note":"角色相同"}]}
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 对象管道（相对 Bash 的本质差异）

| Bash | PowerShell |
|------|------------|
| 管道传**文本行** | 管道传 **.NET 对象** |
| \`grep\` 切字符串 | \`Where-Object\` 滤属性 |
| 易丢结构 | 保留类型直到格式化输出 |

\`\`\`powershell
Get-Process | Where-Object { $_.CPU -gt 100 } | Select-Object Name, Id
\`\`\`

### 2.2 语法

| 点 | 说明 |
|----|------|
| **Cmdlet** | 动词-名词：\`Get-ChildItem\`；别名 \`ls\`/\`dir\` |
| **变量** | \`$name\`；作用域 script/local/global |
| **比较** | \`-eq -ne -lt -gt -like -match\`（不是 \`==\`） |
| **字符串** | \`"Hi $name"\` 插值；\`'\` 字面；here-string \`@"…"@\` |
| **数组 / 哈希表** | \`@(1,2)\`；\`@{k='v'}\` |
| **管道绑定** | 按参数属性名自动绑 |

### 2.3 错误与控制流

| 点 | 说明 |
|----|------|
| **终止 / 非终止错误** | \`$ErrorActionPreference\`；\`-ErrorAction Stop\` |
| **\`try/catch/finally\`** | 捕终止错误 |
| **\`if/foreach/switch\`** | 流程 |
| **函数进阶** | \`[CmdletBinding()]\`、\`Mandatory\` 参数 |

### 2.4 执行环境

| 点 | 说明 |
|----|------|
| **执行策略** | 限制脚本；开发机常 \`RemoteSigned\` |
| **\`.script.ps1\`** | 当前目录要 \`.\\\` 前缀 |
| **\`$env:PATH\`** | 环境变量 |
| **Windows PS 5.1 vs pwsh 7+** | 7+ 跨平台、更现代 |

### 2.5 .NET 互通

可直接 \`[System.IO.File]::ReadAllText(...)\` — 企业自动化优势。

---

## 3. 工具链
\`\`\`quiz
{"title":"powershell 快测","questions":[{"q":"学一门语言时，最先要分清的两件基础事是？","choices":[{"t":"只背语法关键字","ok":false,"why":"语法重要，但交付模型更影响工程。"},{"t":"语言 vs 运行时 vs 常用框架","ok":true,"why":"三层混谈会面试翻车、选型也翻车。"},{"t":"必须先会操作系统内核","ok":false,"why":"有帮助，但不是本课第一刀。"}]}]}
\`\`\`


| 工具 | 作用 |
|------|------|
| **pwsh / powershell.exe** | 5.1（Windows 内置）vs 7+（跨平台） |
| **PSReadLine** | 命令行编辑 |
| **PSScriptAnalyzer** | 静态分析 |
| **ISE / VS Code 扩展** | 编辑与调试 |
| **Winget / Chocolatey** | Windows 装 Node/pnpm |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **本机启服** | \`pnpm install\` → \`node app\` 多在 PowerShell |
| **路径** | 注意 \`\\\` vs \`/\`；Node 一般两者皆可 |
| **跨平台脚本** | 仓库 CI 优先 Bash；本机辅助可用 \`*.ps1\` |
| **主服** | JavaScript；不在 PS 写 \`core/\` 业务 |
| **子服** | 各子服在对应 runtime 终端运维 |

---

## 5. 大厂 / 实务题

| 题 | 答法要点 |
|----|----------|
| 对象管道是什么 | 传对象非纯文本 |
| 脚本无法运行 | \`ExecutionPolicy\`、签名 |
| 与 Bash 对照 | \`Get-Content\` vs \`cat\`；对象 vs 文本 |
| \`-eq\` vs \`==\` | PS 比较运算符规则 |
| 如何传参给脚本 | \`param(...)\` 块 |
| pwsh 与 Windows PS | 版本与跨平台差异 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [PowerShell/PowerShell](https://github.com/PowerShell/PowerShell) | ⭐ 四万级 | 对象管道、\`param\`、跨平台 pwsh | **Windows 本机**启服 / 辅助脚本 |
| [PowerShell/PSReadLine](https://github.com/PowerShell/PSReadLine) | ⭐ 三千级 | 行编辑、历史、补全体验 | 本机终端效率；与 Bash 对照 |
| [microsoft/winget-cli](https://github.com/microsoft/winget-cli) | ⭐ 两万级 | Windows 包管理 CLI | 本机装 Node / 工具链的实务入口 |

---

## 6. 下一步

**Shell（Bash）** · **终端环境** · **PATH** · **首次跑通** · **Windows 开发备忘**。  
可选：打开 PowerShell 仓库 README 的「Getting Started」，再在本机跑通 \`node app\`。
## 导图2 · 终端 / 环境变量 × PowerShell

> Windows 上常见壳；对象管道与 Bash 不同。本仓跨平台脚本宜谨慎假设。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **终端命令行** | Windows 默认壳之一 | 与 Git Bash/CMD 分清 |
| **环境变量** | 进程环境 | 设置方式与 Unix export 不同 |
| **后端** | 可自动化本机 | 不是 AgentRuntime 宿主语言 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

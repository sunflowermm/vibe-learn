export default `# 番外 · 本机目录

> 第一章教你在终端里 \`cd\` / \`ls\`；本框补一张**跨系统都能用的地图**。  
> 短链：**目录地图（角色对照）→ 点文件与隐藏项（机制对照）**。  
> 真源：[FHS](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html) · [XDG Base Directory](https://specifications.freedesktop.org/basedir-spec/latest/) · Win \`USERPROFILE\` / AppData。  
> 目录课含 **\`\`\`compare\`\`\`** 交互对照卡；读完再回头看 **PATH** / **HTTP_PROXY**：可执行常在 **bin 角色**，配置常在**家目录 / 点文件**。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 先角色后路径 | Users ↔ \`/home\` 说得清；\`pwd\` 站对仓库根 |
| XDG | 能口述 config / data / cache / state 默认落点 |
| 点文件 | 知道 \`.env\` 等隐藏配置；密钥不进 Git |

## 零基础先建立画面

\`\`\`steps
{"title":"本机目录番外","steps":[{"title":"先角色","body":"家 / bin / 配置 / 临时。"},{"title":"再路径","body":"Win / Linux / mac 写法。"},{"title":"点文件","body":"隐藏机制不同；隐藏≠加密。"}]}
\`\`\`

Windows、Linux、macOS **不是三套无关世界**：序章里进程、文件、权限是同一抽象；本框只把「文件」落到日常路径。

学法：**先角色，后路径。**

| 角色 | 直觉 | 跨系统例子（写法不同） |
|------|------|------------------------|
| **家目录** | 属于我的地盘 | \`C:\\Users\\你\` · \`/home/你\` · \`/Users/你\` |
| **程序 / bin** | 软件本体与可执行命令 | \`Program Files\` · \`/usr/bin\` · \`/Applications\` |
| **配置与缓存** | 常藏着、不常手点 | \`AppData\` · \`~/.config\` · 各种 \`.xxx\` |

\`\`\`mermaid
flowchart LR
  OS[序章 · OS 抽象相同] --> Role[本框 · 目录角色相同]
  Role --> Map[目录地图 · 各系统怎么写]
  Map --> Dot[点文件 · 隐藏机制不同]
  Dot --> Path[PATH / 环境变量]
\`\`\`

## 章专属动画（分镜）

| 课 | kind | 钉什么 |
|----|------|--------|
| 目录地图 | \`dirrole\` | 家 / bin / 配置 / 临时 / 安装 |
| 点文件 | \`dothide\` | Unix 点前缀 vs Win Hidden · 常见点名 |

## 知识串（和正章怎么咬合）

| 正章 / 其它番外 | 本框补什么 |
|-----------------|------------|
| **系统的本质 · 文件** | 文件是抽象；本框是**角色导游 + 路径对照** |
| **不同终端环境** | Git Bash 的 \`/c/Users\` = 仍是 Windows 家目录 |
| **Linux 基础指令** | \`cd ~\` / \`ls -la\` 背后是家目录与隐藏约定 |
| **安装器与 PATH** | PATH 里一串目录 ≈ 若干 **bin 角色**路径 |
| **代理 · HTTP_PROXY** | 会话变量；持久化常进家目录下的 shell 点文件 |

## 建议阅读顺序

1. **目录地图** — 先读角色对照与 XDG，再按需看 Win / Linux / mac 细节  
2. **点文件与隐藏项** — 目的相同（少打扰），Unix \`.\` 与 Win 隐藏属性机制不同  

入口：第一章 **不同终端环境** 或 **Linux 基础指令** 读完即可；不必等跑通本仓。

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 仓库根 | \`pwd\` 站对再跑 \`node app\` / \`pnpm\` |
| 配置 | Core \`default/\` + \`data/<产品>/\`；用户规则可在 \`.cursor\` |
| 机密 | \`.env\` / 密钥不进 Git |
`;

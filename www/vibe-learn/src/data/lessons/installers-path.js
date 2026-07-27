/** 安装器与 PATH */
export default `# 安装器与 PATH

> 软件要被 Shell 找到，通常需写入磁盘并进入 **PATH**（可执行文件搜索路径）。  
> 安装 Node 时，除 \`node\` 外，常一并登记 \`npm\`、\`npx\`。  
> 本课也钉清：**Homebrew / apt / winget** 这类「往系统里装软件」的工具是什么。

## 本课分块

| 块 | 目标 |
|----|------|
| **安装器做什么** | 落盘 + 登记 PATH |
| **系统级包管理器** | brew / apt / winget / scoop… |
| **装完能敲哪些命令** | \`node\` / \`npm\` / \`npx\` |
| **「不是内部命令」** | PATH 与会话未刷新 |

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

\`\`\`bash
# macOS 示例（需已装 Homebrew）
brew install git
brew install curl

# Ubuntu 示例
sudo apt update
sudo apt install -y curl git
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

\`\`\`bash
node -v
npm -v
npx -v
\`\`\`

三者都在 PATH 中，只说明 **官方默认工具链可用**。  
本仓库仍要求使用 **pnpm** 安装项目依赖（见包管理课）。

---

## 4. 「装了却不是内部命令」

1. 勾选了加入 PATH，但未 **重开终端**  
2. 用户目录安装，当前会话看不到  
3. 多套 Node，PATH 顺序指向另一套  
4. 只装了 brew/apt 里的包，但当前 Shell 不是加载了该前缀的会话  

\`\`\`bash
# Windows PowerShell
Get-Command node, npm, npx

# macOS / Linux / WSL
which node npm npx
\`\`\`

---

## 5. 实践建议

- 优先官方或文档推荐渠道，少混用互抢 PATH 的安装源  
- 版本达标、PATH 通畅后，再启用 **pnpm**（可用 Corepack）  
- 企业若禁用 MSI，再考虑版本管理器或 **Docker**（番外 **容器**）  

## 下一步

**包管理器** — 系统包 vs 语言包；本仓为何钉 pnpm。  
**Linux 基础指令** — \`curl\` 等网络命令是什么。  
`;

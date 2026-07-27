/** Linux 发行版 */
export default `# Linux 发行版

> Linux 严格说常指 **内核**；你安装的 Ubuntu、Fedora、Arch… 是 **发行版（distro）**：  
> 内核 + 软件包仓库 + 安装器 + 默认桌面/工具的组合拳。

## 本课分块

| 块 | 内容 |
|----|------|
| **为何要分发行版** | 同一句「在 Linux 上装」可能完全不同 |
| **家族速写** | Debian / Fedora / 独立系 / Alpine |
| **和桌面系统对比** | brew / apt / winget |
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

---

## 2. 家族速写

### 包管理方言对照

\`\`\`compare
{"title":"同一意图：装软件","caption":"发行版不同，命令不同；角色都是系统包管理器。","items":[{"role":"装包","win":"winget install …","linux":"apt / dnf / pacman / apk","mac":"brew install …","note":"系统级软件，不是 pnpm 项目依赖"},{"role":"更新索引","win":"winget upgrade","linux":"apt update 等","mac":"brew update","note":"先更新再装，少踩旧包坑"}]}
\`\`\`


| 家族 | 代表 | 包管理直觉 | 常见场合 |
|------|------|------------|----------|
| **Debian 系** | Debian、Ubuntu、Mint | \`apt\` / \`.deb\` | 云主机教程最多 |
| **Fedora 系** | Fedora、RHEL、CentOS Stream | \`dnf\` / \`.rpm\` | 企业与部分云镜像 |
| **独立系** | Arch、openSUSE 等 | \`pacman\`、\`zypper\`… | 桌面玩家、滚动更新 |
| **容器/最小** | Alpine | \`apk\` | Docker 基础镜像 |

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

## 4. 实践建议

- 跟 XRK / Node 教程时：看清作者基于 **哪一系** 写的安装命令  
- 不确定时，用版本管理器（fnm/nvm）或官方二进制，减少「发行版包过旧」  
- WSL 里选的发行版，就是上面某一家族的成员  
- 容器基础镜像常见 Alpine（\`apk\`）——连到番外 **Docker**  

## 下一步

**Linux 基础指令** — 目录、进程，以及 **curl / wget**。  
`;

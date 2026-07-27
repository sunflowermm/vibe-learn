/** 番外 · 点文件与隐藏项 */
export default `# 点文件与隐藏项 · .xxx 是什么

> 上一张用**角色**对齐了 Users / \`/home\` / \`/bin\`。  
> 本课钉另一层跨系统本质：**「不想天天看见」的文件，各系统用不同机制藏起来**——目的相同，开关不同。  
> 换位想——\`ls\` 看不到 \`.env\`，克隆仓库却「缺配置」：多半是隐藏约定，不是文件丢了。

## 本课你要带走什么

1. 关联学习：隐藏 = **少打扰日常浏览**；Unix 用点前缀，Windows 常用文件属性  
2. \`.\` 开头是**文件名约定**，不是魔法扩展名 / 特殊二进制格式  
3. 常见点文件：\`.git\` \`.gitignore\` \`.env\` \`.bashrc\` \`.ssh\` …（跨平台项目里写法常一样）  
4. 密钥与 \`.env\` **不要**提交进 Git  

---

## 0. 本质：同一目的，两套开关

\`\`\`mermaid
flowchart TB
  Goal[目的：默认列表少显示杂讯]
  Goal --> Unix["Unix / macOS / Git Bash<br/>文件名以 . 开头"]
  Goal --> Win["Windows 资源管理器<br/>Hidden 属性 / 隐藏文件夹"]
  Unix --> Skill[排障：先问「我在用哪套可见性规则」]
  Win --> Skill
\`\`\`

| | Unix 系（含 Git Bash） | Windows 资源管理器 |
|--|------------------------|-------------------|
| **机制** | 名字以 \`.\` 开头 → \`ls\` 默认不列 | 文件/文件夹 Hidden 等属性 |
| **怎么看见** | \`ls -la\` | 「隐藏的项目」；\`Get-ChildItem -Force\` |
| **和家目录的关系** | 配置爱堆在 \`~/.\`* | \`AppData\` 常被界面藏起（上一课角色） |
| **项目里的 \`.env\`** | 两边 Git 都认这个**文件名** | 在资源管理器里也可能再被标成隐藏 |

**口诀：** 在 Git Bash 里找不到 \`.bashrc\`，与在资源管理器里找不到 \`AppData\`，**原因不同**；都不要先当成「文件丢了」。

---

## 1. \`.xxx\` 命名：约定，不是魔法扩展名

在 Unix 风格文件系统里：

| 规则 | 含义 |
|------|------|
| 名字以 **\`.\`** 开头 | 对 \`ls\`（默认）**隐藏**；\`ls -a\` / \`ls -la\` 才列出 |
| \`.gitignore\`、\`.env\` | 仍是普通文件；\`.\` 只是文件名的第一个字符 |
| \`.git/\` | 仍是普通目录；里面是 Git 元数据 |

\`\`\`bash
# 当前目录：默认看不到点文件
ls

# 含隐藏（点开头）+ 详细信息
ls -la

# 只关心家目录里藏了啥（示例）
ls -la ~
\`\`\`

> 模拟窗**全程假数据**：对比 \`ls\` 与 \`ls -la\`（自动打字）。

\`\`\`shell
{"preset":"dotfiles"}
\`\`\`

\`\`\`powershell
# PowerShell：强制列出隐藏项
Get-ChildItem -Force
Get-ChildItem $env:USERPROFILE -Force
\`\`\`

\`\`\`term
{"title":"PowerShell · 强制列出隐藏项","prompt":"PS> ","steps":[{"type":"in","text":"Get-ChildItem -Force","prompt":"PS> "},{"type":"out","text":"Mode  Name\\nd----  .ssh\\n-a---  .bashrc\\nd----  Documents"},{"type":"in","text":"Get-ChildItem $env:USERPROFILE -Force | Select-Object -First 5 Name","prompt":"PS> "},{"type":"out","text":"Name\\n----\\n.ssh\\nAppData\\nDocuments"}]}
\`\`\`

**不是：** 「\`.env\` 是一种特殊二进制格式」。  
**是：** 文件名叫 \`.env\`，内容通常是 \`KEY=value\` 文本——Linux 服务器与 Windows 开发机**文件名相同**，这是跨系统协作的约定。

---

## 2. 两套「隐藏」对照（落实 §0）

| 机制 | 平台 | 怎么看到 |
|------|------|----------|
| **Dotfile（点文件）** | Linux / macOS / Git Bash | \`ls -la\`；编辑器「显示隐藏文件」 |
| **Hidden 属性** | Windows NTFS 等 | 资源管理器「隐藏的项目」；\`Get-ChildItem -Force\` |
| **超级隐藏 / 系统目录** | Windows | 「受保护的操作系统文件」；日常开发少动 |

\`\`\`mermaid
flowchart TB
  U[Unix / macOS / Git Bash] --> Dot["文件名以 . 开头 → ls 默认隐藏"]
  W[Windows 资源管理器] --> Attr["文件属性 Hidden"]
  W --> AppData["Users\\\\你\\\\AppData 常被界面藏起"]
  Dot --> Same[都是「少打扰」]
  Attr --> Same
\`\`\`

---

## 3. 家目录里最常见的点文件 / 点目录

| 名字 | 是什么 | 业务直觉 |
|------|--------|----------|
| **\`.git/\`** | 仓库的 Git 元数据目录 | 有它才是 Git 仓库；勿手改里面对象 |
| **\`.gitignore\`** | 告诉 Git「哪些路径别跟踪」 | 常忽略 \`node_modules/\`、\`.env\`、构建产物 |
| **\`.env\`** | 环境变量式配置（常本地机密） | API Key、代理；**应忽略提交** |
| **\`.bashrc\` / \`.zshrc\`** | Shell 启动时读的配置脚本 | 持久化 \`export PATH=…\`、别名；新开终端才加载 |
| **\`.profile\` / \`.bash_profile\`** | 登录 Shell 相关配置 | 与交互 Shell 加载顺序因环境而异 |
| **\`.ssh/\`** | SSH 密钥与已知主机 | \`id_ed25519\`、\`known_hosts\`；权限过宽会拒用 |
| **\`.npmrc\` / \`.npm\`** | npm 用户配置与缓存 | 镜像、token；token 勿进仓库 |
| **\`.cursor/\` · \`.claude/\` 等** | 编辑器 / Agent 用户或项目配置 | 项目内规则可能提交；密钥类仍勿提交 |
| **\`.editorconfig\`** | 跨编辑器的缩进/换行约定 | 可进仓库，利于风格统一 |

\`\`\`mermaid
flowchart LR
  Home[家目录角色 ~] --> Shell[".bashrc / .zshrc"]
  Home --> Ssh[".ssh"]
  Repo[项目根] --> Git[".git / .gitignore"]
  Repo --> Env[".env · 通常不提交"]
  Shell -->|export HTTP_PROXY| Sess[当前终端会话继承]
\`\`\`

**和上一课咬合：** 个人偏好 → 家目录点文件；系统级服务配置 → Linux \`/etc\` 或 Windows 服务/机器级位置——先问「影响一个用户还是整台机器」（仍是角色问题）。

---

## 4. 和「环境变量」怎么连上（跨系统同构）

| 做法 | 生命周期 | 典型落点 |
|------|----------|----------|
| 终端里临时 \`export\` / \`$env:…=\` | **当前窗口** | 内存中的环境块（Win / Linux / mac  alike） |
| 写入 \`.bashrc\` / \`.zshrc\` | 之后**新开**的该 Shell | 家目录点文件（Unix 家族 / Git Bash） |
| Windows「系统属性 → 环境变量」 | 用户或机器级持久化 | 系统设置（不是点文件，角色仍是「持久化环境块」） |

所以：

- 部署课里的 \`HTTP_PROXY\` 手顺 = **会话级**（见番外 **端口与 Coding Agent**）  
- 想每次开终端都带上 → 才考虑写进 \`.bashrc\` 等（并理解公司策略是否允许）  
- **PATH** 持久化同理：安装器改用户/系统 PATH，或你自己写进 shell 配置  

环境变量「是什么」→ 第一章 **安装器与 PATH** §0。

---

## 5. 安全与协作底线

| 项 | 建议 |
|----|------|
| \`.env\`、私钥、\`*.pem\` | 进 \`.gitignore\`；用示例文件 \`.env.example\`（无秘密）说明键名 |
| \`git add -A\` 前 | \`git status\` 看是否误加点文件机密 |
| 权限 | Linux 上 \`.ssh\` 私钥常见要求仅本人可读（如 \`chmod 600\`） |
| 「删了点文件」 | 可能丢掉 Shell 配置或 SSH 信任；删前先备份 |

---

## 6. 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **可见性机制（跨系统）** | 默认不把杂讯甩脸上的规则 | 点前缀 vs Hidden 属性 | 目的相同 ≠ 机制相同 |
| **Dotfile（点文件）** | 文件名以 \`.\` 开头的配置/数据 | \`.env\` \`.gitignore\` \`.bashrc\` | ≠ 文件格式；只是命名约定 |
| **Hidden file（隐藏文件）** | 对默认列表不可见的文件 | Unix 靠点前缀；Win 靠属性 | Git Bash ≠ 资源管理器 |
| **\`.gitignore\`** | Git 忽略规则文件 | 不跟踪 \`node_modules\`、\`.env\` | 忽略 ≠ 删除已跟踪文件 |
| **\`.env\`** | 常存放键值环境配置的本地文件 | 本地密钥、代理、DB URL | ≠ 已注入进程的环境变量本身 |
| **Dotfiles 管理** | 把家目录配置用 Git 同步的做法 | 新机器恢复 \`.bashrc\` | 勿把密钥同步进**公开**仓库 |
| **XDG Base Directory**（了解） | Linux 上配置/缓存/数据目录约定 | \`~/.config\` \`~/.cache\` \`~/.local\` | 老程序仍可能只用 \`~/.某名字\` |

## 下一步

第一章 **安装器与 PATH** — PATH 与环境变量地基。  
番外 **端口与 Coding Agent** — \`HTTP_PROXY\` 族；可对照「写进 \`.bashrc\`」的持久化。  
**Git 与工作区** — \`.git\` 与三区；勿提交机密。  
第四章 **部署环境** — 本机齐套后再 clone。  
`;

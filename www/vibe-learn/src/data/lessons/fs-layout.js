export default `# 本机目录地图 · 跨系统同一套角色

> 终端里你「站在」某个路径；本课先钉**本质**，再给 Windows / Linux / macOS 的地图。  
> **树形不同、分隔符不同，角色往往相同**——先问「这是家、程序、配置还是临时」，再记具体路径。  
> \`cd\` / \`ls\` 手感见第一章 **Linux 基础指令**；本课是地图与对照，不是命令手册。  
> **学会之后**：先角色后路径，能把 Win/Linux/mac 家目录与 bin 对上号。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 角色 | 家 / 程序·bin / 配置 / 临时 分得清 |
| 对照 | 三套系统各举一例路径 |
| PATH | 理解 PATH 是若干 bin 角色拼接 |
| 边界 | 本课是地图，不是命令手册 |

## 本课你要带走什么

1. 学目录 = 学**角色**，不是背三套互不相关的路径表  
2. 跨系统高频角色：家目录 · 程序目录 · 用户配置/缓存 · 系统配置 · 临时区 · 可执行 \`bin\`  
3. 本质差异：盘符 vs 单根 \`/\`、\`\\\` vs \`/\`、大小写敏感与否  
4. PATH 里出现的，多半是某处的 **bin**（可执行文件目录）  

---

## 0. 本质：不同系统，同一套「地盘分工」

操作系统都要把磁盘收成**命名空间（目录树）**，并回答同类问题：

| 角色（先记这个） | 回答的问题 | Windows 常见落点 | Linux（FHS） | macOS |
|------------------|------------|------------------|--------------|--------|
| **家目录 Home** | 属于「我这个用户」的地盘在哪？ | \`C:\\Users\\<你>\`（\`USERPROFILE\`） | \`/home/<你>\`（\`HOME\`） | \`/Users/<你>\`（\`HOME\`） |
| **用户配置 / 缓存** | App 把个人设置和缓存塞哪？ | \`AppData\\Roaming\` · \`Local\` | \`~/.config\` · \`~/.cache\` 或 \`~/.某应用\` | 同 Unix 约定 + \`Library\` |
| **程序安装** | 「正式装上的软件」本体在哪？ | \`Program Files\` 等 | \`/usr\` · \`/opt\` · 包管理前缀 | \`/Applications\` · Homebrew 前缀 |
| **系统级配置** | 影响整机、不单属某一用户的配置？ | 注册表 / \`ProgramData\` 等 | \`/etc\` | \`/etc\` · \`/Library\` 等 |
| **临时区** | 可丢的短命文件？ | \`%TEMP%\` / \`AppData\\Local\\Temp\` | \`/tmp\` | \`/tmp\` · 系统临时目录 |
| **命令所在 bin** | Shell 按 PATH 去哪找可执行文件？ | 安装树下的 \`…\\bin\` 等 | \`/bin\` \`/usr/bin\` \`/usr/local/bin\` | 同上 + brew 的 \`bin\` |

\`\`\`compare
{"title":"先看角色，再看路径","caption":"卡片会错落入场：同一职责，三套写法。","items":[{"role":"家目录 Home","win":"C:\\\\Users\\\\你","linux":"/home/你","mac":"/Users/你","note":"环境变量：USERPROFILE ↔ HOME；Shell 里常写 ~"},{"role":"命令所在 bin","win":"…\\\\Program Files\\\\…\\\\bin","linux":"/usr/bin · /usr/local/bin","mac":"/opt/homebrew/bin 等","note":"装进 PATH 的通常是这类目录"},{"role":"用户配置 / 缓存","win":"AppData\\\\Roaming · Local","linux":"~/.config · ~/.cache","mac":"~/Library · ~/.config"}]}
\`\`\`

\`\`\`mermaid
flowchart TB
  Role[先问角色：家 / 程序 / 配置 / 临时 / bin]
  Role --> W[Windows 路径长什么样]
  Role --> L[Linux FHS 长什么样]
  Role --> M[macOS 长什么样]
  W --> Same[排障时：换系统只换写法，不换问题]
  L --> Same
  M --> Same
\`\`\`

**关联学习口诀：**

1. 换电脑 / 换系统时，先翻译**角色**，再查路径。  
2. 文档写 \`~/.ssh\` = 「家目录下的 \`.ssh\`」——Windows 上往往是 \`%USERPROFILE%\\.ssh\` 或 Git Bash 的 \`~/.ssh\`。  
3. 「不是内部命令」= **bin 角色**的目录没进 PATH——与「家目录在哪」是两件事。

### 真正不一样的「底层外观」（别和角色搞混）

| 差异 | 本质 | 学习时怎么用 |
|------|------|--------------|
| **盘符 vs 单根** | Win 多卷 \`C:\` \`D:\`；Unix 一个 \`/\`，其它盘挂载到某路径下 | Git Bash 把 \`C:\\Users\` 写成 \`/c/Users\`——是**同一棵树的另一套写法** |
| **分隔符** | Win 常用 \`\\\`；Unix / macOS / 多数工具文档用 \`/\` | 多数现代工具两边都认 \`/\`；PowerShell 也常接受 |
| **大小写** | 常见 Linux 文件系统区分大小写；Win / 默认 macOS 往往不区分或可配 | 仓库在 Linux CI 上 \`Import\` 大小写错误会炸，本机 Win 却「看起来没事」 |
| **权限模型外观** | Unix 权限位 / 属主常见；Win ACL 更细 | 报 \`Permission denied\` 时先问「我是谁、文件属谁」——序章 **系统的本质** |

> Windows、Linux、macOS 都是 **Operating System** 实例：进程、文件、权限、环境变量是**同一套抽象**（序章）；本课只是把「文件」抽象落到**日常路径导游**。

---

## 1. 家目录：三角色，一名多径

| 平台 | 典型路径 | 环境变量 / 简写 |
|------|----------|-----------------|
| **Windows** | \`C:\\Users\\<用户名>\` | \`USERPROFILE\`；Git Bash 常 \`/c/Users/<用户名>\` |
| **Linux** | \`/home/<用户名>\` | \`HOME\`；Shell \`~\` |
| **macOS** | \`/Users/<用户名>\` | 同上 \`HOME\` / \`~\` |

\`\`\`bash
# bash / Git Bash / macOS / Linux — 同一问题
echo "$HOME"
cd ~
pwd

# PowerShell — 同一角色，变量名不同
echo $env:USERPROFILE
cd $env:USERPROFILE
\`\`\`

> 模拟窗（假数据）：在家目录里 \`pwd\` / \`ls -la\`，感受「站在哪」。

\`\`\`shell
{"preset":"dotfiles"}
\`\`\`

**原则：** 个人配置、SSH 密钥、多数编辑器 / Agent 的用户级设置，优先找**家目录**（或其下的配置/缓存角色目录），不要往系统盘根目录乱扔。

---

## 2. Windows：角色如何长成树

\`\`\`
C:\\
├── Users\\
│   └── <你>\\                 ← 家目录（USERPROFILE）
│       ├── Desktop\\
│       ├── Documents\\
│       ├── Downloads\\
│       └── AppData\\          ← 用户配置/缓存角色（界面常藏）
│           ├── Roaming\\      ← 偏「跟着账号」的配置
│           ├── Local\\        ← 本机缓存、大体量
│           └── LocalLow\\     ← 低完整性进程用（较少手碰）
├── Program Files\\            ← 程序安装角色
├── Program Files (x86)\\      ← 32 位程序常见落点
└── ProgramData\\              ← 全机共用程序数据（近系统级）
\`\`\`

| 路径 | 对应 §0 角色 | 开发时常见用途 |
|------|--------------|----------------|
| \`Users\\<你>\` | 家目录 | 项目常放 \`Desktop\` / \`Documents\` / 自建 \`dev\` |
| \`AppData\\Roaming\` | 用户配置 | 许多 App 的 settings |
| \`AppData\\Local\` | 用户缓存 | 包缓存、日志、IDE 索引 |
| \`Program Files\` | 程序安装 | Node / Git 安装器常见落点 |
| \`ProgramData\` | 系统/全机数据 | 服务、机器级安装状态 |

> 资源管理器默认不显示 \`AppData\`：查看 →「隐藏的项目」。与 Unix「点开头隐藏」是**另一套机制**（下一课）——目的相同（少打扰），开关不同。

### Git Bash：同一家目录，两套拼写

| 资源管理器 | Git Bash | 本质 |
|------------|----------|------|
| \`C:\\Users\\me\` | \`/c/Users/me\` | 仍是这块盘上的同一目录 |
| \`C:\\Program Files\` | \`/c/Program Files\` | 有空格要加引号 |

---

## 3. Linux：FHS 是「角色公约」

**FHS**（Filesystem Hierarchy Standard）= 约定根 \`/\` 下各目录**职责**。发行版大体遵守；你背的是角色，不是某一个发行版的截图。

\`\`\`
/                         ← 单根；一切路径从这长出来
├── home/<你>/            ← 家目录
├── root/                 ← root 用户的家（不是 /）
├── bin/                  ← 基础命令（bin 角色；部分发行版与 usr 合并）
├── usr/
│   ├── bin/              ← 多数用户命令
│   └── local/bin/        ← 本机自装 CLI 常见处
├── etc/                  ← 系统级配置
├── var/                  ← 可变数据：日志、缓存、队列
├── tmp/                  ← 临时区
├── opt/                  ← 可选第三方整包
└── sbin/                 ← 偏系统管理命令
\`\`\`

| 目录 | §0 角色 | 别和谁搞混 |
|------|---------|------------|
| **\`/home/<你>\`** | 家目录 | ≠ \`/root\`（管理员的家） |
| **\`/bin\` · \`/usr/bin\`** | bin | 「bin」= binaries，不是垃圾桶 |
| **\`/usr/local/bin\`** | bin（本机加料） | 版本管理器、手装工具爱用 |
| **\`/etc\`** | 系统配置 | 个人偏好优先放家目录点文件 |
| **\`/var\`** | 可变/日志（近缓存与数据） | \`/var/log\` 查服务日志 |
| **\`/tmp\`** | 临时区 | 不要当永久盘 |
| **\`/opt\`** | 程序安装（整包） | 有的 IDE 套件装这里 |

\`\`\`mermaid
flowchart TB
  Home["家目录角色"] --> Dot[点文件 · 下一课]
  Bin["bin 角色"] --> Path[PATH 查找]
  Etc["系统配置角色"] --> Machine[影响整机]
\`\`\`

### macOS：Unix 家 + 自己的「程序」外观

| 角色 | macOS 常见 |
|------|------------|
| 家目录 | \`/Users/<你>\` |
| 程序安装（GUI） | \`/Applications\` |
| bin / 包管理 | Homebrew 前缀常 \`/opt/homebrew\` 或 \`/usr/local\`（芯片代际不同） |
| 用户配置 | \`~/Library\` 以及 Unix 式 \`~/.config\` 等 |

装完用 \`which brew\` / \`brew --prefix\` 确认——仍是「bin 进 PATH」同一问题。

---

## 4. 和 PATH、安装器如何咬合（跨系统同构）

| 现象 | 角色层解释 | 各系统只是写法不同 |
|------|------------|--------------------|
| \`git\` / \`node\` 不是内部命令 | **bin 角色**的目录不在当前 PATH | Win / Linux / mac  alike |
| 安装器「添加到 PATH」 | 把某 \`…\\bin\` 或 \`…/bin\` **追加**进 PATH | 持久化位置：系统设置或 shell 点文件 |
| \`which node\` / \`Get-Command node\` | 看命中了哪个 bin | 用来确认「装的是哪一套」 |

环境变量地基 → 第一章 **安装器与 PATH**。  
出网代理变量 → 番外 **端口与 Coding Agent**。  
点文件如何藏配置 → 下一课。

---

## 5. 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **跨系统目录角色** | 家 / 程序 / 配置 / 临时 / bin 等职责 | Win\`Users\` ↔ Linux\`/home\` | 路径字符串不同 ≠ 概念不同 |
| **Home directory（家目录）** | 当前用户的主文件夹 | \`~\`、\`HOME\`、\`USERPROFILE\` | ≠ 项目仓库根；≠ \`/\` |
| **USERPROFILE** | Windows 上的家目录变量 | \`C:\\Users\\你\` | 与 \`HOME\` 同角色、不同名 |
| **AppData** | Win 用户配置/缓存区 | Roaming / Local | ≠ \`Program Files\`（程序本体） |
| **FHS** | Linux 根下目录职责约定 | \`/etc\` 配置、\`/var/log\` 日志 | ≠ 文件系统格式（ext4 才是） |
| **\`/bin\` · \`/usr/bin\`** | 可执行命令目录（bin 角色） | 进 PATH；\`curl\` 常在此 | ≠ node_modules；≠ 回收站 |
| **单根 \`/\` vs 盘符** | Unix 一棵树；Win 多卷 | Git Bash \`/c/…\` | 挂载点 ≠ 又一个「家目录」 |
| **\`~\`（tilde）** | Shell 里家目录简写 | \`cd ~\`、\`~/.ssh\` | 非登录上下文可能不展开 |

## 下一步

**点文件与隐藏项** — 同一「少打扰」目的，Unix 点前缀 vs Win 隐藏属性。  
第一章 **Linux 基础指令** — 拿着**角色地图**去 \`cd\` / \`ls\`。  
**安装器与 PATH** — bin 如何被找到。
## 导图2 · 终端 / 环境变量 × 本机目录布局

> 先角色后路径（Users ↔ /home）。站对仓库根。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **终端命令行** | 在目录活动 | pwd 验收 |
| **环境变量** | HOME 等 | 决定家目录 |
| **部署上线** | 路径约定 | 服务账号家目录可能不同 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

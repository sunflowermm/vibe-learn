/** 番外 · 端口服务 — 谁连上代理引擎；HTTP_PROXY 体系 */
export default `# 端口服务 · 系统代理 · HTTP_PROXY · Coding Agent

> 上一张把代理引擎拆成「入口 + 决策 + 出口」。  
> 本课钉三件事：**本机入口端口**、**系统代理只管谁**、**环境变量 \`HTTP_PROXY\` 一族是什么**。  
> 换位想——系统代理开了、浏览器通了、\`git clone\` / Agent 却超时：多半是它们**没读到**「走 \`127.0.0.1:端口\`」。

## 本课你要带走什么

1. 代理引擎入口 = \`127.0.0.1\` + 端口（常是 mixed-port）  
2. **系统代理 ≠ 环境变量代理**：GUI 常吃前者，终端 / Git / CLI 常只吃后者  
3. \`HTTP_PROXY\` / \`HTTPS_PROXY\` / \`ALL_PROXY\` / \`NO_PROXY\` 各管什么  
4. 会话级设置只影响**当前终端**；子进程会继承  

环境变量「是什么」的地基见第一章 **安装器与 PATH**（PATH 也是环境变量）。本课专讲**出网代理**这一族。

---

## 1. 先记住：服务 = 地址 + 端口

Clash（以及同类工具）本质是本机上的一个**代理应用服务**，例如：

\`\`\`
http://127.0.0.1:7890
\`\`\`

| 部分 | 含义 |
|------|------|
| \`127.0.0.1\` | 回环地址：只进本机协议栈，不出网卡 |
| \`7890\` | 监听端口（**以 Verge / 手机端界面为准**，也可能是 7897 等） |
| \`http://\` 前缀 | 告诉客户端「用 HTTP 代理协议连这个入口」（mixed-port 上通常也认） |

配置里可能叫 \`mixed-port\`（HTTP+SOCKS 合一）、\`port\`、\`socks-port\`——记界面上的数字即可。

> **几乎所有要「走代理」的程序配置，填的都是这类本机服务地址**，不是机场节点域名。

---

## 2. 「系统代理」只是帮一部分程序填好了

打开 **系统代理**，操作系统大致登记：

\`\`\`
HTTP/HTTPS 代理 → 127.0.0.1:<你的端口>
\`\`\`

| 谁 | 行为 |
|----|------|
| 多数浏览器、不少桌面 GUI | 会去读系统代理 |
| 终端、\`git\`、\`curl\`、\`pnpm\`、Docker CLI、**Coding Agent** | **常常不读**；要环境变量或各自配置项 |

| 现象 | 含义 |
|------|------|
| 浏览器能上、Agent / \`git\` 不行 | 后者没连上本机代理端口 |
| 托盘绿了、终端仍直连 | 服务在跑；当前 Shell **没有**代理类环境变量 |

口诀：**系统代理救浏览器；\`HTTP_PROXY\` 救终端。**

---

## 3. 环境变量代理：\`HTTP_PROXY\` 是什么？

### 3.1 它在知识体系里站哪一层

\`\`\`mermaid
flowchart TB
  EV[环境变量 Environment Variable<br/>进程启动时可见的键值配置]
  EV --> PATH[PATH · 找可执行文件]
  EV --> PROXY[HTTP_PROXY 族 · 出网走哪]
  PROXY --> HP[HTTP_PROXY]
  PROXY --> HSP[HTTPS_PROXY]
  PROXY --> AP[ALL_PROXY]
  PROXY --> NP[NO_PROXY]
  SP[系统代理 System Proxy] -.->|GUI 常读| Browser[浏览器]
  PROXY -->|CLI 常读| Git[git / curl / pnpm / Agent]
\`\`\`

**定义：** \`HTTP_PROXY\` 是一条（跨工具广泛约定的）**环境变量**：值为代理服务的 URL。  
支持该约定的程序在发起 HTTP 请求前，若发现该变量非空，就**先连代理**，再由代理去访问目标站。

它不是：

| 不是 | 那是什么 |
|------|----------|
| 操作系统里的「系统代理」开关 | 另一套登记处；变量不会自动等于系统代理 |
| Clash / 机场本身 | 变量只是**路标**，指向本机已在 listen 的端口 |
| PATH | PATH 管「命令在哪」；\`HTTP_PROXY\` 管「流量往哪拐」 |

### 3.2 四个名字（建议一起设）

| 变量 | 全称直觉 | 作用 |
|------|----------|------|
| **\`HTTP_PROXY\`** | 明文 HTTP 请求走哪 | 访问 \`http://…\` 目标时常用 |
| **\`HTTPS_PROXY\`** | TLS/HTTPS 请求走哪 | \`git clone https://github.com/…\`、多数 API **主要看它** |
| **\`ALL_PROXY\`** | 其它协议的兜底代理 | 部分工具对 SOCKS/非 HTTP 也看它；可与上两者同指 HTTP 入口 |
| **\`NO_PROXY\`** | 直连名单 | 匹配到的主机**不要**走代理（\`localhost\`、内网、\`127.0.0.1\`） |

大小写：多数工具认大写；有的也认 \`http_proxy\` 小写。为省事，**大写四个一起写**最稳。

URL 形态常见两种（端口改成你的）：

| 写法 | 何时 |
|------|------|
| \`http://127.0.0.1:7890\` | mixed-port / HTTP 代理入口（**部署本仓、Git 最常用**） |
| \`socks5://127.0.0.1:7890\` | 明确要求 SOCKS5 时；部分场景放进 \`ALL_PROXY\` |

本仓部署示例统一用 \`http://127.0.0.1:<端口>\` 即可（见第四章 **部署环境 §0**）。

### 3.3 作用范围：只影响「谁继承了它」

| 范围 | 行为 |
|------|------|
| **当前终端会话** | \`export\` / \`$env:…=\` 只对**这个窗口**及它再拉起的子进程有效 |
| **新开一个终端** | **不会**自动带上刚才的值（除非写入用户配置文件 / 系统环境变量） |
| **子进程** | 在已设置的 Shell 里再跑 \`git\`、\`node\`、Agent，一般会**继承**这些变量 |

所以自检必须在**同一个**终端：

\`\`\`bash
# bash
echo "$HTTP_PROXY"
echo "$HTTPS_PROXY"
echo "$NO_PROXY"
\`\`\`

\`\`\`powershell
echo $env:HTTP_PROXY
echo $env:HTTPS_PROXY
echo $env:NO_PROXY
\`\`\`

### 3.4 手顺（把 \`7890\` 换成你的端口）

下列窗**全是假的**（自动打字演示）；对照第四章部署课的可复制命令。

**① 未设代理 · clone 失败长什么样**

\`\`\`shell
{"preset":"clone-fail"}
\`\`\`

**② 会话里 export 代理变量**

\`\`\`shell
{"preset":"env-proxy"}
\`\`\`

**③ 已带代理 · clone 成功路径（仍假）**

\`\`\`shell
{"preset":"clone-proxy-ok"}
\`\`\`

**④ 无本机代理时 · ghproxy 前缀（仍假）**

\`\`\`shell
{"preset":"clone-ghproxy"}
\`\`\`

**Git Bash / macOS / Linux / WSL**（可复制到真实终端）

\`\`\`env
{"title":"同一意图 · 四种壳","caption":"端口 7890 请改成你的 Mixed Port。复制后只在对应环境粘贴。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["$env:HTTP_PROXY='http://127.0.0.1:7890'","$env:HTTPS_PROXY='http://127.0.0.1:7890'","$env:ALL_PROXY='http://127.0.0.1:7890'","$env:NO_PROXY='127.0.0.1,localhost,::1'"]},{"id":"linux","label":"Linux / WSL","os":"Linux","shell":"bash","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1"]},{"id":"macos","label":"macOS","os":"macOS","shell":"zsh","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1"]}]}
\`\`\`

\`\`\`quiz
{"title":"端口与环境变量 · 自测","questions":[{"q":"Clash 开了系统代理，Coding Agent / Git 仍直连失败。优先查？","choices":[{"t":"Agent / 终端是否读取 HTTP(S)_PROXY","ok":true,"why":"多数 CLI 与 Agent 不自动吃系统代理。"},{"t":"是不是没装 pnpm","ok":false,"why":"包管理器与出网代理是两件事。"},{"t":"把端口改成 80","ok":false,"why":"端口以客户端显示的 Mixed Port 为准，乱改无效。"}]}]}
\`\`\`


\`\`\`bash
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
export ALL_PROXY=http://127.0.0.1:7890
export NO_PROXY=127.0.0.1,localhost,::1

git clone https://github.com/sunflowermm/XRK-AGT.git
\`\`\`

**Windows PowerShell（当前窗口）**

\`\`\`powershell
$env:HTTP_PROXY='http://127.0.0.1:7890'
$env:HTTPS_PROXY='http://127.0.0.1:7890'
$env:ALL_PROXY='http://127.0.0.1:7890'
$env:NO_PROXY='127.0.0.1,localhost,::1'
\`\`\`

可选（Git 自己的配置，与环境变量二选一或并存，以你实际生效者为准）：

\`\`\`bash
git config --global http.proxy  http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
# 不用时：git config --global --unset http.proxy
\`\`\`

Agent / IDE：设置里找 Proxy，填 \`http://127.0.0.1:<端口>\`；若只认环境变量，**先在已 export 的终端里启动它**。

### 3.5 和「正向代理 / 反向代理」怎么对齐

| 词 | 本课落点 |
|----|----------|
| **正向代理** | Clash 引擎 + 你填的 \`HTTP_PROXY\`：替**客户端**出门 |
| **反向代理** | 第三章 Nginx：替**服务器**收请求 | 
| **系统代理** | OS 给 GUI 的默认正向代理地址 |
| **\`HTTP_PROXY\`** | 给 CLI 的默认正向代理地址（约定变量名） |

### 3.6 自检清单

1. Verge 已运行，节点可用，浏览器经**系统代理**正常。  
2. 界面确认端口，没有抄错截图。  
3. **同一终端** \`echo\` 出 \`HTTPS_PROXY\`，再 \`git clone\` / 开 Agent。  
4. 访问本机服务失败时，检查 \`NO_PROXY\` 是否包含 \`localhost\` / \`127.0.0.1\`。

---

## 4. TUN：另开一章说的「不想每个软件手填」

**TUN** 建虚拟网卡，尽量把流量截进代理服务——适合死活不读代理设置的程序。权限更高，也可能误伤局域网。

| 路径 | 适用 |
|------|------|
| 订阅 → 节点 → **系统代理** | 浏览器最小路径（下一张 Verge） |
| **\`HTTP_PROXY\` 族** | 终端 / Git / pnpm / Coding Agent |
| **TUN** | 进阶全局；熟悉上面两步再开 |

口诀：**系统代理救浏览器；\`HTTP_PROXY\` 救终端；TUN 不是入门必点。**

---

## 5. 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **Environment Variable（环境变量）** | 进程可见的 \`名字=值\` 配置；子进程默认可继承 | PATH、\`HTTP_PROXY\`、\`NODE_ENV\` | 不是「某个软件私有 ini」；是 OS/Shell 层约定 |
| **listen / 绑定地址** | 进程在哪个 IP:端口等连接 | \`127.0.0.1\` 仅本机；\`0.0.0.0\` 可被局域网访问（慎开） | 别和「节点公网 IP」混：填的是本机入口 |
| **HTTP Proxy（HTTP 代理）** | 用 HTTP 代理协议转发请求（常含 CONNECT） | \`HTTP_PROXY=http://127.0.0.1:7890\` | 别和 **反向代理**、也别和 SOCKS5 混名 |
| **SOCKS5（Socket Secure 5）** | 更通用的代理协议，可代理 TCP（及部分 UDP） | \`ALL_PROXY=socks5://…\` | 不是 \`http://\` URL 的同义词 |
| **mixed-port（混合端口）** | 单端口同时收 HTTP 与 SOCKS | Verge 常见 7890 | 不是机场节点端口 |
| **\`HTTP_PROXY\` / \`HTTPS_PROXY\`** | 告诉进程「HTTP / HTTPS 出网走哪个代理 URL」 | \`git clone https://…\` 卡死时优先查 \`HTTPS_PROXY\` | **≠** 系统代理开关；写了变量不等于 Clash 已启动 |
| **\`ALL_PROXY\`** | 其它协议的代理兜底 | 与 HTTP(S)_PROXY 常设成同一入口 | 有的工具忽略它；不能只设这一个指望覆盖一切 |
| **\`NO_PROXY\`（No Proxy）** | 列出的主机直连、不进代理 | \`localhost\`、内网 API、公司域名 | 漏配则本机 \`node app\` 控制台请求也可能被错误代理 |
| **System Proxy（系统代理）** | OS 登记的默认 HTTP(S) 代理 | 救浏览器 | 别和 TUN、也别和 \`HTTP_PROXY\` 当成同一开关 |
| **TUN（Network TUNnel）** | 虚拟网卡尽量截流 | 顽固进程；权限高 | 入门优先手填端口 / 环境变量 |

业务对照：公司办公网强制代理时，开发机既要 \`HTTPS_PROXY\` 出外网，也要 \`NO_PROXY\` 保住内网 Jenkins——和本课是同一套词。

## 下一步

**Verge / Android 配置** — 订阅与系统代理最小路径。  
第四章 **部署环境 §0** — 把本课变量套进 clone GitHub 的实操。  
环境变量地基（PATH 等）— 第一章 **安装器与 PATH**。  
`;

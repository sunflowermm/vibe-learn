export default `# 端口服务 · 系统代理 · HTTP_PROXY · Coding Agent

> 上一张把代理引擎拆成「入口 + 决策 + 出口」。  
> 本课钉三件事：**本机入口端口**、**系统代理只管谁**、**环境变量 \`HTTP_PROXY\` 一族**。  
> 口径：Clash \`mixed-port\` 单口收 HTTP+SOCKS；CLI 常用 \`http://127.0.0.1:端口\`，需要远端 DNS 时 \`ALL_PROXY=socks5h://…\`。  
> **学会之后**：能分清系统代理与 \`HTTP_PROXY\` 族，并给终端/Agent 配通同一入口。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 入口 | \`127.0.0.1\` + mixed-port（以界面为准） |
| 双通道 | 系统代理 ≠ 环境变量；浏览器通≠终端通 |
| 变量族 | HTTP(S)_PROXY / ALL_PROXY / NO_PROXY 各一句 |
| 验收 | 同一会话里 echo 出变量再 clone / 开 Agent |

\`\`\`algo
{"kind":"proxyroute","title":"终端必须先连上本机入口","autoplay":true,"speed":850,"data":{"mode":"proxy","dest":"api.github.com","rule":"HTTPS_PROXY → 127.0.0.1:mixed-port → PROXY"}}
\`\`\`

---

## 1. 服务 = 地址 + 端口

\`\`\`
http://127.0.0.1:7890
\`\`\`

| 部分 | 含义 |
|------|------|
| \`127.0.0.1\` | 回环：只进本机，不出网卡 |
| \`7890\` | 监听端口（**以 Verge / 手机端为准**） |
| \`http://\` | 用 HTTP 代理协议连入口（mixed-port 通常也认） |

配置名可能叫 \`mixed-port\` / \`port\` / \`socks-port\`——记界面数字即可。  
**要走代理的程序填的都是本机入口，不是节点域名。**

---

## 2. 系统代理只救一部分程序

打开 **系统代理**，OS 大致登记：\`HTTP/HTTPS → 127.0.0.1:<端口>\`。

| 谁 | 行为 |
|----|------|
| 多数浏览器、不少 GUI | 常读系统代理 |
| 终端、\`git\`、\`curl\`、\`pnpm\`、**Coding Agent** | **常常不读**；要环境变量或各自配置 |

口诀：**系统代理救浏览器；\`HTTP_PROXY\` 救终端。**

\`\`\`decide
{"title":"浏览器通、git 不通？","start":"s","caption":"先分清谁读了代理。","steps":[{"id":"s","q":"同一台机，浏览器已开系统代理能上网，git clone 超时。优先？","options":[{"label":"查终端有没有 HTTPS_PROXY","next":"env"},{"label":"把 Mixed Port 改成 80","next":"bad"},{"label":"立刻开 TUN","next":"tun"}]},{"id":"env","result":"对。CLI 多半不吃系统代理。","detail":"同一会话 export 后再 clone；或给 git 配 http.proxy。"},{"id":"bad","result":"别乱改端口。","detail":"以客户端显示为准；乱改只让所有配置一起坏。"},{"id":"tun","result":"TUN 是进阶，不是第一步。","detail":"先把 HTTP_PROXY 打通；TUN 权限高、副作用大。"}]}
\`\`\`

---

## 3. \`HTTP_PROXY\` 族是什么？

\`\`\`mermaid
flowchart TB
  EV[环境变量]
  EV --> PATH[PATH · 找可执行文件]
  EV --> PROXY[HTTP_PROXY 族 · 出网走哪]
  PROXY --> HP[HTTP_PROXY]
  PROXY --> HSP[HTTPS_PROXY]
  PROXY --> AP[ALL_PROXY]
  PROXY --> NP[NO_PROXY]
  SP[系统代理] -.->|GUI 常读| Browser[浏览器]
  PROXY -->|CLI 常读| Git[git / curl / Agent]
\`\`\`

**定义：** \`HTTP_PROXY\` 是跨工具约定的环境变量，值为代理 URL；支持该约定的程序会先连代理再访目标。

| 不是 | 那是什么 |
|------|----------|
| 系统代理开关 | 另一套登记处 |
| Clash / 机场本身 | 变量只是**路标**，指向本机已 listen 的口 |
| PATH | PATH 管命令在哪；代理变量管流量往哪拐 |

| 变量 | 作用 |
|------|------|
| **\`HTTP_PROXY\`** | 明文 HTTP 出网 |
| **\`HTTPS_PROXY\`** | HTTPS / \`git clone https://…\` **最常看它** |
| **\`ALL_PROXY\`** | 其它协议兜底；可 \`socks5h://127.0.0.1:端口\`（远端 DNS） |
| **\`NO_PROXY\`** | 直连名单：\`localhost\`、\`127.0.0.1\`、内网 |

大小写：多数认大写；稳妥做法是大小写一起设或只设大写四个。

\`\`\`fill
{"title":"补全会话代理变量","caption":"端口按你的 Mixed Port；这里用 7890 练习。","template":"export HTTPS_PROXY=http://127.0.0.1:___","answers":["7890"],"hint":"本机代理入口端口，不是 80/443。"}
\`\`\`

\`\`\`pick
{"title":"这些变量各管什么？","caption":"先点条目，再点类别。","bins":[{"id":"out","label":"出网走代理"},{"id":"skip","label":"直连名单"},{"id":"find","label":"找可执行文件"}],"items":[{"id":"hp","text":"HTTP_PROXY","bin":"out"},{"id":"hsp","text":"HTTPS_PROXY","bin":"out"},{"id":"np","text":"NO_PROXY","bin":"skip"},{"id":"path","text":"PATH","bin":"find"}]}
\`\`\`

| 写法 | 何时 |
|------|------|
| \`http://127.0.0.1:7890\` | mixed-port HTTP 入口（**本仓部署最常用**） |
| \`socks5h://127.0.0.1:7890\` | 要代理侧解析 DNS 时放进 \`ALL_PROXY\` |

### 作用范围

| 范围 | 行为 |
|------|------|
| **当前终端会话** | \`export\` / \`$env:\` 只影响本窗及子进程 |
| **新开终端** | **不会**自动带上（除非写进用户配置） |
| **子进程** | 已设的 Shell 里再跑 git / Agent 一般会继承 |

\`\`\`env
{"title":"同一会话里回显代理变量","caption":"在刚设过的窗口里查；新开终端看不到属正常。","default":"bash","tabs":[{"id":"bash","label":"Git Bash / Unix","os":"Win/Linux/mac","shell":"bash","lines":["echo $HTTP_PROXY","echo $HTTPS_PROXY","echo $NO_PROXY"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["echo $env:HTTP_PROXY","echo $env:HTTPS_PROXY","echo $env:NO_PROXY"]}]}
\`\`\`

### 手顺（把 \`7890\` 换成你的端口）

下列窗是假演示；真机对照第四章部署课。

\`\`\`shell
{"preset":"clone-fail"}
\`\`\`

\`\`\`shell
{"preset":"env-proxy"}
\`\`\`

\`\`\`shell
{"preset":"clone-proxy-ok"}
\`\`\`

\`\`\`env
{"title":"同一意图 · 四种壳","caption":"端口 7890 请改成你的 Mixed Port。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["$env:HTTP_PROXY='http://127.0.0.1:7890'","$env:HTTPS_PROXY='http://127.0.0.1:7890'","$env:ALL_PROXY='http://127.0.0.1:7890'","$env:NO_PROXY='127.0.0.1,localhost,::1'"]},{"id":"linux","label":"Linux / WSL","os":"Linux","shell":"bash","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1"]},{"id":"macos","label":"macOS","os":"macOS","shell":"zsh","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export ALL_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1"]}]}
\`\`\`

\`\`\`quiz
{"title":"端口与环境变量 · 自测","questions":[{"q":"Clash 开了系统代理，Coding Agent / Git 仍直连失败。优先查？","choices":[{"t":"Agent / 终端是否读取 HTTP(S)_PROXY","ok":true,"why":"多数 CLI 与 Agent 不自动吃系统代理。"},{"t":"是不是没装 pnpm","ok":false,"why":"包管理器与出网代理是两件事。"},{"t":"把端口改成 80","ok":false,"why":"端口以客户端显示的 Mixed Port 为准。"}]},{"q":"Clash 的 mixed-port 主要作用是什么？","choices":[{"t":"单端口同时收 HTTP 与 SOCKS","ok":true,"why":"Clash Inbound：减少记两套端口。"},{"t":"机场节点的公网端口","ok":false,"why":"那是出口侧，不是本机入口。"},{"t":"替换 DNS","ok":false,"why":"DNS 另有配置。"}]}]}
\`\`\`

\`\`\`env
{"title":"代理就绪后 clone / 可选 git 代理","caption":"优先会话环境变量；git config 可选。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash · clone","os":"Windows","shell":"bash","lines":["git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"pwsh","label":"PowerShell · clone","os":"Windows","shell":"pwsh","lines":["git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"gitcfg","label":"可选 · git config 代理","os":"任意","shell":"bash","note":"不用时记得 unset","lines":["git config --global http.proxy http://127.0.0.1:7890","git config --global https.proxy http://127.0.0.1:7890","git config --global --unset http.proxy","git config --global --unset https.proxy"]}]}
\`\`\`

Agent / IDE：设置里填 \`http://127.0.0.1:<端口>\`；若只认环境变量，**先在已 export 的终端里启动它**。

### 自检清单

1. 客户端已运行，节点可用，浏览器经系统代理正常。  
2. 界面确认端口，没有抄错截图。  
3. **同一终端** \`echo\` 出 \`HTTPS_PROXY\`，再 \`git clone\` / 开 Agent。  
4. 访问本机服务失败时，查 \`NO_PROXY\` 是否含 \`localhost\` / \`127.0.0.1\`。

---

## 4. TUN：进阶再开

| 路径 | 适用 |
|------|------|
| 订阅 → 节点 → **系统代理** | 浏览器最小路径 |
| **\`HTTP_PROXY\` 族** | 终端 / Git / pnpm / Agent |
| **TUN** | 顽固进程；熟悉上面两步再开 |

口诀：**系统代理救浏览器；\`HTTP_PROXY\` 救终端；TUN 不是入门必点。**

---

## 5. 八股 × 业务串联

| 名词（全称） | 白话 | 业务里长什么样 | 别和谁搞混 |
|--------------|------|----------------|------------|
| **Environment Variable** | 进程可见的 \`名=值\` | PATH、\`HTTP_PROXY\` | ≠ 某软件私有 ini |
| **listen / 绑定** | 在哪个 IP:端口等连接 | \`127.0.0.1\` 仅本机 | ≠ 节点公网 IP |
| **HTTP Proxy** | HTTP 代理协议（常含 CONNECT） | \`HTTP_PROXY=http://127.0.0.1:7890\` | ≠ 反向代理 |
| **SOCKS5 / socks5h** | 更通用代理；\`h\`=远端 DNS | \`ALL_PROXY=socks5h://…\` | ≠ \`http://\` 同义词 |
| **mixed-port** | 单口 HTTP+SOCKS | Verge 常见 7890 | ≠ 机场端口 |
| **\`NO_PROXY\`** | 直连名单 | 保本机与内网 | 漏配则本机请求被误代理 |
| **System Proxy** | OS 默认 HTTP(S) 代理 | 救浏览器 | ≠ TUN、≠ 环境变量 |
| **TUN** | 虚拟网卡截流 | 进阶全局 | 入门优先手填变量 |

## 下一步

**Verge / Android 配置** — 订阅与系统代理最小路径。  
第四章 **部署环境** — 把本课变量套进 clone GitHub。  
第一章 **安装器与 PATH** — 环境变量地基。
`;

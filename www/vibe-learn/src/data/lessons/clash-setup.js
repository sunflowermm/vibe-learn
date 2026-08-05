export default `# 最简上手：订阅就够（Clash Verge）

> 换位思考：你刚拿到一串「订阅链接」，最怕打开客户端看到一堆 YAML、TUN、规则。  
> **入门其实可以极简：填订阅 → 选节点 → 开系统代理。** 先让浏览器通，再管 Agent 端口；TUN 放到后面。  
> **学会之后**：能走通订阅→节点→系统代理最小路径，并知终端还要代理变量。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 最小路径 | 订阅更新 → 选节点 → 开系统代理 |
| 终端 | 浏览器通 ≠ Agent 通；查 HTTP_PROXY |
| 安全 | 订阅链接当敏感信息 |
| 正章 | 正向代理概念回网络章 |

电脑用 **Clash Verge**（或 Verge Rev）；手机用 **Clash for Android / Clash Meta for Android**。外壳不同，底下都是「本机开端口的代理服务」。

\`\`\`check
{"title":"Verge 最小路径通关","items":[{"id":"sub","text":"订阅已更新，节点列表可见"},{"id":"node","text":"已点选一个可用节点（可先测延迟）"},{"id":"sys","text":"已开系统代理；浏览器能访问目标站"},{"id":"port","text":"记下 Mixed Port，准备给终端/Agent"}]}
\`\`\`

---

## 电脑 Verge：侧边栏五步

1. **订阅（Subscription / 配置）** — 粘贴订阅链接 → 更新，等节点出来  
2. **选中这份订阅** 为当前生效配置  
3. **代理（Proxies）** — 验证通路时可先 **全局（Global）** → **点选一个节点**  
4. **首页** — 打开 **系统代理（System Proxy）**  
5. 浏览器试一个平时打不开的站 —— 通了 = 本机引擎在听 + 系统已指过去  

日常更省流量用 **规则（Rule）**；刚上手验证「通路」时用 **全局 + 节点 + 系统代理** 最直观。

### 端口记在哪

首页或设置里找 **Mixed Port**，记下数字。  
Git / npm / Agent 填 \`127.0.0.1\` + 这个数 —— 见上一课。

\`\`\`env
{"title":"探针：本机代理是否出网","caption":"把 7890 换成你 Verge 界面上的 Mixed Port。","default":"pwsh","tabs":[{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["curl.exe -I --proxy http://127.0.0.1:7890 https://www.cloudflare.com"]},{"id":"bash","label":"Git Bash / Unix","os":"Win/Linux/mac","shell":"bash","lines":["curl -I --proxy http://127.0.0.1:7890 https://www.cloudflare.com","export HTTPS_PROXY=http://127.0.0.1:7890","export HTTP_PROXY=http://127.0.0.1:7890","curl -I https://www.cloudflare.com"]}]}
\`\`\`

有 HTTP 头返回 ≈ 「本机代理 → 出网」正常。

\`\`\`shell
{"preset":"env-proxy"}
\`\`\`

\`\`\`algo
{"kind":"proxyroute","title":"开系统代理后的选路直觉","autoplay":false,"speed":850,"data":{"mode":"proxy","dest":"目标站","rule":"系统代理 → mixed-port → 当前节点"}}
\`\`\`

---

## 手机：Clash for Android / Meta

1. 贴同一类订阅 → 更新  
2. 启动，首次允许 **VPN**  
3. 选节点；验证后再细调规则 / 全局  
4. 没启动、没给 VPN 权限 ≈ 仍直连  

电脑和手机各跑自己的客户端更省心。

---

## TUN 与规则：入门可跳过

| 东西 | 什么时候才需要想 |
|------|------------------|
| **系统代理** | 入门必开：救浏览器 |
| **手填端口 / 环境变量** | 开发、Agent |
| **规则（Rule）** | 通了之后：国内直连、少耗节点 |
| **TUN** | 仍有软件漏网时再开；先别当第一步 |

TUN ≈ 在系统网络层尽量把流量导入代理服务。  
**先会订阅 + 系统代理，再学 TUN。**

---

## 订阅背后大概有什么

订阅更新下来的配置通常自带：本机端口、节点列表、DNS、规则。  
Verge 侧边栏订阅 = 客户端替你拉这份文件。

若哪天要读懂文件，抓四块：端口入口、节点/策略组、DNS、rules。  
正章对照：端口 ↔ TCP；规则 ↔ 路由；域名规则 ↔ DNS；本机服务 ↔ 正向代理。

## 安全习惯

- 订阅链接别贴进公开仓库  
- 公共 Wi‑Fi 慎开「允许局域网连接」  
- 改了端口，记得同步改 Agent / 环境变量  

\`\`\`quiz
{"title":"Verge 上手","questions":[{"q":"入门最小验证通路顺序？","choices":[{"t":"订阅更新 → 选节点 → 开系统代理","ok":true,"why":"先让 GUI 通，再管终端变量。"},{"t":"先开 TUN 再装客户端","ok":false,"why":"TUN 是进阶。"},{"t":"把业务端口裸奔到公网","ok":false,"why":"与代理引擎无关且危险。"}]},{"q":"浏览器通了但 Coding Agent 仍超时，优先？","choices":[{"t":"给 Agent/终端设 HTTP(S)_PROXY 指向 Mixed Port","ok":true,"why":"多数 CLI 不吃系统代理。"},{"t":"删除全部节点","ok":false,"why":"通路已经证明节点可用。"},{"t":"改成只开灰云 Cloudflare","ok":false,"why":"那是源站侧边缘，不是本机正向代理。"}]}]}
\`\`\`

---

## 八股 × 业务串联

| 名词（全称） | 白话 | 业务里长什么样 | 别和谁搞混 |
|--------------|------|----------------|------------|
| **订阅（Subscription）** | 远端 URL 下发节点+规则 | Verge 粘贴链接、点更新 | 勿提交公开仓；≠ 单个节点密码 |
| **Rule / Global / Direct** | 三种默认选路策略 | 通了再切 Rule；排障可临时 Global | ≠ 「节点开关」本身 |
| **GEOIP** | 按 IP 地区分流 | 「国内直连」 | ≠ 域名后缀规则（可并用） |
| **RTT** | 往返时延 | 测速「绿」≈ 延迟低 | 绿不一定稳 |
| **配置热更新** | 改订阅后重载 | 更新订阅刷新节点与 rules | 改 mixed-port 仍要同步环境变量 |
| **合规网络环境** | 仅合法用途与组织政策 | 企业走正规 VPN/专线 | 本课只讲引擎机制 |

## 下一步

打通后回第四章 **部署环境**：给终端设 \`HTTP(S)_PROXY\`，再 \`git clone\` 本仓。  
回第三章 **边缘实务**：分清「本机出口选路」与「源站前面的 CDN」。
`;

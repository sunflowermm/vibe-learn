export default `# 首次跑通 · XRK-AGT

> 把工具链收成一条可执行路径，然后**把接力棒交给第四章（项目实践）**。  
> 细节以仓库根 README「快速开始」为准；这里钉 **分层检查点** 与 **成功信号**。  
> **学会之后**：能按最短路径起主服，或准确说出卡在哪一层（而不是随机重装）。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 版本 | \`node -v\` ≥ 26；\`pnpm -v\` 有输出 |
| 工作区 | \`pwd\` 在含根 \`package.json\` 的仓库根 |
| 依赖 | \`pnpm install\` 无红字 |
| Redis | 启动日志无 Redis 致命错；能 ping/连上 |
| 启动 | \`node app.js\` 见成功信号；能打开控制台或健康检查 |
| 排障 | 失败时能说卡在「版本/目录/依赖/Redis/代码」哪一层 |

## 本课分块

| 块 | 内容 |
|----|------|
| **标准路径** | 版本 → 工作区 → install → Redis → 启动 |
| **倒推表** | 症状对应哪一层 |
| **和第四章的衔接** | 起跑线 vs 架构 |
| **可选分支** | Docker / 多语言子服（点到为止） |

---

## 1. 标准路径

\`\`\`check
{"title":"首次跑通通关","caption":"一层绿再进下一层","items":[{"id":"node","text":"node -v ≥ 26","hint":"engines"},{"id":"root","text":"终端位于仓库根（有根 package.json）","hint":"pwd"},{"id":"pnpm","text":"pnpm -v 有输出；pnpm install 无红字","hint":"勿 npm install"},{"id":"redis","text":"Redis 可用；启动无致命连接错","hint":"database.md"},{"id":"boot","text":"node app.js 见 online/端口或控制台可开","hint":"分层排障表"}]}
\`\`\`

\`\`\`match
{"title":"首跑配对","pairs":[{"id":"node","left":"Node 版本","right":"PATH 与引擎要先对（≥26）"},{"id":"pnpm","left":"pnpm","right":"本仓唯一包管理"},{"id":"redis","left":"Redis","right":"框架内置库依赖"},{"id":"app","left":"node app.js","right":"拉起 Runtime 与 Loader"}]}
\`\`\`

\`\`\`mermaid
flowchart TB
  A["node -v ≥ 26"] --> B[位于仓库根目录]
  B --> C["pnpm install"]
  C --> D[Redis 可用]
  D --> E["node app.js"]
  E --> F["控制台 / 健康检查"]
\`\`\`

\`\`\`env
{"title":"首次跑通 · 按壳复制","caption":"一层绿再进下一层。把 path/to 换成你的仓库路径。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["node -v","cd /c/path/to/XRK-AGT","pwd","pnpm -v","pnpm install","node app.js"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["node -v","cd C:\\\\path\\\\to\\\\XRK-AGT","pwd","pnpm -v","pnpm install","node app.js"]},{"id":"unix","label":"Linux / macOS","os":"Unix","shell":"bash/zsh","lines":["node -v","cd ~/path/to/XRK-AGT","pwd","pnpm -v","pnpm install","node app.js"]}]}
\`\`\`

模拟窗（假数据 · 版本检查；真 install 在本机）：

\`\`\`shell
{"preset":"first-run"}
\`\`\`

Redis 连通（假 PONG · 本机真要起 redis-server）：

\`\`\`shell
{"preset":"redis-ping"}
\`\`\`

### 成功时你大概会看见

| 信号 | 含义 |
|------|------|
| install 结束无红字 | 依赖树落地 |
| 启动日志无 Redis 致命连接失败 | 内置库可用 |
| 终端打印 online / 端口 | HTTP 已听 |
| 浏览器能开控制台或 \`/xrk/\` | 最小路径通 |

若还卡在 **clone**：见第四章 **部署环境 §0**（失败报错 / 代理 / **ghproxy.com** 前缀）。  
截图/渲染：\`pnpm run setup:browsers\`（Playwright Chromium ≠ 系统 Chrome）。

---

## 2. 检查点（出问题时从这里倒推）

| 症状 | 先查哪一层 | 回哪张卡片 |
|------|------------|------------|
| \`git\` / \`node\` 不是命令 | PATH / 安装器 | 安装器与 PATH · **部署环境** |
| 版本过低 | 运行时与 \`engines\` | 运行时 · Node.js |
| \`pnpm\` 不可用 | Corepack 或 pnpm 安装 | 包管理器 · pnpm |
| install 失败 | 网络、锁文件、是否在仓库根 | Git 工作区 / pnpm · **分层排障** |
| clone 很慢或失败 | 远程主机与网络；代理 / ghproxy | **Git 与工作区** · **代码托管** |
| 启动死在数据库 / 6379 | Redis 未起 | **部署环境** · \`docs/database.md\` |
| 截图/渲染失败 | 未装 Playwright Chromium | **部署环境** |
| 启动后打不开控制台 | 端口、防火墙、日志 | README；可用 \`XRK_SERVER_PORT=…\` |

<details>
<summary>展开：一张「分层洋葱」</summary>

最外层是「网页打不开」，往里剥：

1. 进程在不在（启动日志）  
2. 端口监听了没有  
3. Redis 通不通  
4. 依赖装全了没有  
5. Node 版本对不对  
6. 是不是在错误的目录里操作  

每一层对应第一章里的一张卡片，而不是随机重装系统。
</details>

---

## 3. 和第四章的衔接

| 第一章（本课） | 第四章 · 项目实践 |
|----------------|-------------------|
| 保证起跑线 | **部署环境**清单 → Runtime / Core / HTTP / **多语言子服** / 配置 |
| \`node app.js\` 能起来 | 代码放哪、配置如何归属、\`callSubserver\` |

跑通之后，进入 **第四章 · XRK-AGT**，建议先读 **部署环境**（补全 Redis / 浏览器引擎概念），再进 **项目鸟瞰**。

## 4. 可选分支（本课不展开）

- **Docker Compose**：以容器打包运行时与依赖（含 \`redis\` 服务示例）  
- **子服务**：主服可独立运行；按需启动 \`pyserver\` / \`goserver\` / \`phpserver\` / \`jserver\` / \`netserver\` / \`rustserver\`（默认端口 8000–8005，见 \`subserver/LANGUAGES.md\`）  

建议先完成主服最小路径，再启用子服分支。

## Coding Agent 协作

可复制：

\`\`\`prompt
目标：在仓库根跑通主服（pnpm i → 确认 Redis → node app.js）。
现场：路径=…；node -v=…；pnpm -v=…；已执行过的命令=…；最新报错原文（整段粘贴）=…
约束：一次只解一层（代理/依赖/配置/代码）；勿重装系统；勿改业务插件来「绕过」环境问题；包管理只用 pnpm。
验收：日志无 Redis 致命错；本机能打开控制台或看到启动成功信号；告诉我成功时该看到哪几行日志。
\`\`\`

提问地图：番外 **Vibe Coding 心智** · **分层排障**。

## 导图2 · 终端 / npm / 环境变量 / 部署 × 首次跑通

> 导图2 的终端、包管理、部署是上线口语；本课钉 **本仓最短可执行路径**。  
> **仅 pnpm**；npm 词条只作对照，不能用来装本仓依赖。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **终端命令行** | 敲命令的地方 | 在仓库根执行；分清 Shell 方言 |
| **npm** | 装依赖口语 | 本仓**禁止**用 npm 装依赖；只用 pnpm + 锁文件 |
| **环境变量** | PATH / 代理 / 密钥 | 命令找不着先查 PATH；代理见 Clash；密钥不进仓 |
| **Git** | 拿到源码 | clone 只是起点；跑通再谈贡献 |
| **部署上线** | 能访问服务 | 本课是本机起主服；上线门面见第三章/主机 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

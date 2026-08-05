export default `# 工作台 · 分层排障

> 「跑不起来」时最忌一上来改业务代码。先**分层**：环境 → 依赖 → 配置 → 代码。  
> **学会之后**：能把报错归到一层，并给出该层「成功长什么样」；会向 Agent 交一份可验收的现场。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分层 | 失败时先说卡在环境/依赖/配置/代码哪一层 |
| 证据 | 贴命令、cwd、完整报错 |
| 本仓 | Redis/版本/pnpm 优先于改业务 |
| 跟 Agent | 一次只解一层；用五拍 |

## 先认词（别被缩写吓到）

| 写法 | 白话 |
|------|------|
| **PATH** | 系统找「可执行命令」时翻的目录列表；不在列表里 → \`command not found\` |
| **cwd** | current working directory = 你现在站的文件夹（\`pwd\` 打印它） |
| **依赖 / node_modules** | \`pnpm install\` 下载的第三方库目录（本仓**禁止**用 npm 装） |
| **engines** | \`package.json\` 声明的 Node 版本下限；本仓 **≥ 26** |
| **代理 / HTTP_PROXY** | 告诉程序「出网走哪扇门」；国内拉 GitHub / npm 注册表常要 |
| **堆栈** | 报错里一串 \`文件:行号\`，从**最上第一帧自己的文件**往下看 |

\`\`\`flip
{"title":"排障翻卡","cards":[{"front":"command not found","back":"多半是没装，或装了但 PATH 没生效（新开终端）"},{"front":"先改插件？","back":"错。先确认 node/pnpm/目录/依赖都绿"},{"front":"模拟窗 vs 真机","back":"下面沙箱练口诀；真失败仍要在本机终端复现"},{"front":"ECONNREFUSED 6379","back":"多半 Redis 未起；属配置/依赖服务层，不是业务语法"}]}
\`\`\`

## 固定口诀


\`\`\`decide
{"title":"报错先归哪一层？","start":"start","steps":[{"id":"start","q":"你最先看见的是？","options":[{"label":"command not found / 不是内部命令","next":"env"},{"label":"pnpm/npm 锁冲突、装包红字","next":"dep"},{"label":"ECONNREFUSED 6379 / Redis","next":"cfg"},{"label":"堆栈落到 core/ 自己的文件","next":"code"}]},{"id":"env","result":"环境层：装没装、PATH、是否新开终端。","detail":"先 which/Get-Command，再谈业务。"},{"id":"dep","result":"依赖层：是否在仓库根、是否只用 pnpm。","detail":"勿 npm install 本仓。"},{"id":"cfg","result":"配置/服务层：Redis 是否起来、端口是否对。","detail":"见 database.md；不是改插件语法。"},{"id":"code","result":"代码层：带着完整堆栈改一处。","detail":"上面层绿了再动业务。"}]}
\`\`\`

\`\`\`check
{"title":"分层排障通关","caption":"真失败仍要在本机复现；勾的是习惯。","items":[{"id":"v","text":"能说出卡在环境/依赖/配置/代码哪一层"},{"id":"e","text":"贴出 node -v · pnpm -v · pwd"},{"id":"r","text":"完整报错原文（不截半截）"},{"id":"o","text":"一次只解一层后再往下"}]}
\`\`\`


\`\`\`steps
{"title":"排障分层","steps":[{"title":"命令在不在","body":"node -v / pnpm -v / git -v"},{"title":"目录对不对","body":"是否在仓库根（有 package.json）"},{"title":"依赖装没装","body":"node_modules / pnpm install"},{"title":"配置与服务","body":"Redis、端口、代理、yaml"},{"title":"再读报错","body":"堆栈第一帧自己的文件"}]}
\`\`\`

## 动手：模拟终端

> 假数据；练「先查工具链」。真机排障命令一样。

\`\`\`shell
{"preset":"troubleshoot"}
\`\`\`

| 层 | 检查 | 成功长什么样 | 失败常见话 |
|----|------|----------------|------------|
| **运行时** | \`node -v\` | \`v26.x\` 或更高 | 版本过低 → 换 Node；不是命令 → PATH |
| **包管理** | \`pnpm -v\`；根目录 \`pnpm install\` | 有版本号；install 结束无红字 | \`pnpm: not found\` → Corepack/安装；混用 npm 锁 → 清掉改回 pnpm |
| **工作区** | \`pwd\` + 看见 \`package.json\` | 路径以仓库根结尾 | 在子目录 install → 装错树 |
| **网络/代理** | 装包 / clone 超时 | 能拉下 tarball | 回 Clash / \`HTTP_PROXY\`；见 **代码托管** |
| **配置/服务** | Redis、端口 | 启动日志无 Redis 致命错；端口可访问 | \`ECONNREFUSED 6379\` → ensure-redis / Docker |
| **浏览器引擎** | 截图/渲染 | Playwright Chromium 已装 | \`pnpm run setup:browsers\`（≠ 系统 Chrome） |
| **代码** | 语法/逻辑 | 上面都绿再查 | 堆栈落到 \`core/…\` 自己的文件 |

## 本仓高频症状速查


\`\`\`reveal
{"title":"6379 拒绝连接会长这样","prompt":"先认形态，再点开分层","tone":"warn","face":"Error: connect ECONNREFUSED 127.0.0.1:6379\\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)","body":"这是 TCP 连不上本机 Redis，不是业务语法错。先 ensure-redis / 起 Redis / 查端口，再改插件。"}
\`\`\`


| 你看见 | 先落哪一层 | 下一刀 |
|--------|------------|--------|
| \`node: command not found\` | 环境 | 重装 Node；**新开**终端；查 PATH |
| \`pnpm: command not found\` | 环境 | 启用 pnpm（Corepack 或独立安装） |
| \`engine\` / 版本不符 | 环境 | Node ≥ 26 |
| \`ERR_PNPM_*\` / 锁冲突 | 依赖 | 确认在根、只用 pnpm、必要时按文档清缓存 |
| GitHub clone 失败 | 网络 | 代理 / ghproxy；见 **Git 工作区** |
| Redis / 6379 | 配置 | README「快速开始」+ \`docs/database.md\` |
| 控制台打不开 | 配置 | 端口、防火墙、启动日志里的 URL |
| 只有业务堆栈 | 代码 | 带着**整段报错**再改插件 |

## 和调不通模型 / Agent 的交界

同一口诀，只是多两层：

| 层 | 多查什么 |
|----|----------|
| 网络 | DNS、代理、\`HTTP_PROXY\`、TLS |
| HTTP | 401 密钥、429 配额、超时 |
| 业务 | 提示、工具、检索——**最后**才动 |

\`\`\`quiz
{"title":"排障","questions":[{"q":"pnpm: command not found 时，优先？","choices":[{"t":"先改插件业务逻辑","ok":false,"why":"命令都没有，与业务无关。"},{"t":"查 PATH / 是否安装 pnpm","ok":true,"why":"落在工具链层。"},{"t":"格式化硬盘","ok":false,"why":"过激且无关。"}]},{"q":"启动日志反复连不上 6379，优先？","choices":[{"t":"重写 HTTP 插件","ok":false,"why":"服务依赖未就绪。"},{"t":"确认 Redis/Memurai 已起并可 TCP 探测","ok":true,"why":"框架内置库依赖 Redis。"},{"t":"改成 npm install","ok":false,"why":"本仓仅 pnpm，且与 6379 无关。"}]}]}
\`\`\`

## 接到本仓

首次跑通失败：按本课分层倒推，再对照 **部署环境** 清单与根 README「快速开始」。

## Coding Agent 协作

可复制：

\`\`\`prompt
目标：按「命令 → 目录 → 依赖 → 配置 → 代码」分层排查，我起不来主服。
现场：OS=…；当前目录=…；node -v=…；pnpm -v=…；报错原文=…；已试过=…
约束：一次只解一层；不要一上来重写业务；需要我跑命令时给出可复制的一行。
验收：指出当前卡在哪一层；给出下一层成功信号（例如 node -v 输出形态 / Redis 探测通过）。
\`\`\`

## 下一步

有 Node 后进入 **编程基础**；或继续 **首次跑通** / Git。
## 导图2 · 终端 / 环境变量 / 调试 × 分层排障

> 导图2 调试口语；本课钉倒推顺序。接 Vibe 五拍。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **终端命令行** | 复现现场 | 同一 cwd 再跑一次 |
| **环境变量** | 代理/PATH/密钥 | 常是「本机能跑别人不能」的真因 |
| **调试** | 分层倒推 | 勿一上来改业务插件绕过环境 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

export default `# 工作台 · 分层排障

> 「跑不起来」时最忌先改业务。先分层：环境 → 依赖 → 配置 → 代码。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分层 | 失败时先说卡在哪一层 |
| 证据 | 贴命令、cwd、完整报错 |
| 跟 Agent | 一次只解一层 |

---

## 口诀

\`\`\`decide
{"title":"报错先归哪一层？","start":"start","steps":[{"id":"start","q":"你最先看见的是？","options":[{"label":"command not found / 不是内部命令","next":"env"},{"label":"pnpm 锁冲突、装包红字","next":"dep"},{"label":"ECONNREFUSED 6379 / Redis","next":"cfg"},{"label":"堆栈落到 core/ 自己的文件","next":"code"}]},{"id":"env","result":"环境层：装没装、PATH、是否新开终端。","detail":"先 which/Get-Command。"},{"id":"dep","result":"依赖层：是否在仓库根、是否只用 pnpm。","detail":"勿 npm install 本仓。"},{"id":"cfg","result":"配置/服务层：Redis、端口。","detail":"见 database.md。"},{"id":"code","result":"代码层：带着完整堆栈改一处。","detail":"上面层绿了再动业务。"}]}
\`\`\`

\`\`\`shell
{"preset":"troubleshoot"}
\`\`\`

| 层 | 检查 | 成功长什么样 |
|----|------|----------------|
| **运行时** | \`node -v\` | ≥ 26 |
| **包管理** | \`pnpm -v\`；根目录 install | 无红字 |
| **工作区** | \`pwd\` + 看见 \`package.json\` | 在仓库根 |
| **网络** | clone / 装包超时 | 代理见 Clash / Git 课 |
| **服务** | Redis 6379 | 启动无致命错 |
| **代码** | 堆栈第一帧自己的文件 | 上面都绿再查 |

\`\`\`reveal
{"title":"6379 拒绝连接","prompt":"先认形态","tone":"warn","face":"Error: connect ECONNREFUSED 127.0.0.1:6379","body":"TCP 连不上本机 Redis，不是业务语法错。先起 Redis / 查端口，再改插件。"}
\`\`\`

## 接到本仓

首次跑通失败：按本课倒推，再对照 **部署环境** 与根 README。

\`\`\`prompt
目标：按分层排障定位当前失败。
现场：node -v=…；pnpm -v=…；pwd=…；完整报错=…
约束：一次只解一层；勿重装系统；只用 pnpm。
验收：指出卡层 + 下一道可复制命令。
\`\`\`
`;

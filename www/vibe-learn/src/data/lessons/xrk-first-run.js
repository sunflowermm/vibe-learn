export default `# 首次跑通 · XRK-AGT

> 把工具链收成一条可执行路径，再交给第四章。  
> 细节以仓库根 README「快速开始」为准；本课钉**分层检查点**。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 版本 | \`node -v\` ≥ 26；\`pnpm -v\` 有输出 |
| 目录 | \`pwd\` 在含根 \`package.json\` 的仓库根 |
| 依赖 | \`pnpm install\` 无红字 |
| Redis | 启动无 Redis 致命错 |
| 启动 | \`node app.js\` 见 online/端口或控制台可开 |
| 排障 | 能说出卡在哪一层 |

---

## 1. 标准路径

\`\`\`check
{"title":"首次跑通通关","caption":"一层绿再进下一层","items":[{"id":"node","text":"node -v ≥ 26","hint":"engines"},{"id":"root","text":"位于仓库根（有根 package.json）","hint":"pwd"},{"id":"pnpm","text":"pnpm -v；pnpm install 无红字","hint":"勿 npm install"},{"id":"redis","text":"Redis 可用","hint":"database.md"},{"id":"boot","text":"node app.js 见成功信号","hint":"分层表"}]}
\`\`\`

\`\`\`mermaid
flowchart TB
  A["node -v ≥ 26"] --> B[仓库根]
  B --> C["pnpm install"]
  C --> D[Redis 可用]
  D --> E["node app.js"]
  E --> F[控制台 / 健康检查]
\`\`\`

\`\`\`env
{"title":"首次跑通 · 按壳","caption":"把 path/to 换成你的仓库路径。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash","os":"Windows","shell":"bash","lines":["node -v","cd /c/path/to/XRK-AGT","pwd","pnpm -v","pnpm install","node app.js"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["node -v","cd C:\\\\path\\\\to\\\\XRK-AGT","pwd","pnpm -v","pnpm install","node app.js"]},{"id":"unix","label":"Linux / macOS","os":"Unix","shell":"bash/zsh","lines":["node -v","cd ~/path/to/XRK-AGT","pwd","pnpm -v","pnpm install","node app.js"]}]}
\`\`\`

\`\`\`shell
{"preset":"first-run"}
\`\`\`

\`\`\`shell
{"preset":"redis-ping"}
\`\`\`

成功信号：install 无红字 · 无 Redis 致命错 · 日志有 online/端口 · 浏览器能开控制台或 \`/xrk/\`。  
clone 仍失败 → **Git 与工作区** / 部署环境 §0。截图能力：\`pnpm run setup:browsers\`。

---

## 2. 倒推表

| 症状 | 先查 | 回哪课 |
|------|------|--------|
| 不是命令 | PATH / 安装 | 安装器与 PATH |
| 版本过低 | engines | 运行时 · Node |
| pnpm 不可用 | Corepack | 包管理器 |
| install 失败 | 是否在根、网络 | Git 工作区 / pnpm |
| 6379 / Redis | 服务未起 | 部署环境 · database.md |
| 控制台打不开 | 端口 / 防火墙 | README · \`XRK_SERVER_PORT\` |

口诀：网页打不开 → 进程 → 端口 → Redis → 依赖 → Node 版本 → 是否站错目录。

---

## 3. 接到第四章

本课保证起跑线；第四章讲 Runtime / Core / 配置 / 子服。  
建议：跑通 → **部署环境** → **项目鸟瞰**。

可选（本课不展开）：Docker Compose；多语言子服（见 \`subserver/LANGUAGES.md\`）。

\`\`\`prompt
目标：仓库根跑通主服（pnpm i → Redis → node app.js）。
现场：路径=…；node -v=…；pnpm -v=…；已执行=…；报错原文=…
约束：一次只解一层；勿重装系统；只用 pnpm。
验收：无 Redis 致命错；能开控制台或指出成功日志行。
\`\`\`
`;

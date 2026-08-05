export default `# CI 直觉

> **CI（Continuous Integration，持续集成）**：推送或开 PR 后，**机器**自动跑检查（安装、测试、构建），避免「我机器能跑」成为唯一定义。  
> 常见：GitHub Actions、GitLab CI。本课钉心智；YAML 细节以各平台文档为准。  
> 本仓包管理是 **pnpm** —— CI 里也应用 pnpm，且优先锁文件冻结安装。
> **学会之后**：能解释 CI 红叉该先读日志，并坚持本仓 pnpm + 锁文件。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 定义 | 推送/PR 后机器自动检查 |
| 红叉 | 先读失败步骤日志再让 Agent 猜 |
| 本仓 | CI 用 pnpm；优先 frozen lockfile |
| Secrets | 密钥进平台密钥库，不进仓库 |


## 你在平台上看到什么

| 概念 | 白话 |
|------|------|
| **Workflow / Pipeline** | 一串自动步骤（checkout → install → test → build） |
| **Runner** | 执行这些步骤的虚拟机 |
| **触发** | \`push\` / \`pull_request\` / 定时 / 手动 |
| **红叉 / 绿勾** | 最近一次检查失败或通过 |
| **Artifact** | 构建产物（可选上传） |
| **Secret** | 平台保管的密钥，注入为环境变量——**勿写进 YAML 明文** |

\`\`\`match
{"title":"CI 配对","pairs":[{"id":"p","left":"push / PR","right":"常触发 CI"},{"id":"t","left":"测试/构建失败","right":"应挡住合并"},{"id":"s","left":"密钥","right":"放 CI Secret，不写进仓库"},{"id":"f","left":"frozen-lockfile","right":"CI 安装不擅自改锁文件"}]}
\`\`\`

## pnpm 在 CI（事实钉）

官方指引见 [pnpm · Continuous Integration](https://pnpm.io/continuous-integration)：

| 做法 | 为什么 |
|------|--------|
| \`pnpm/action-setup\` + \`setup-node\` 且 \`cache: pnpm\` | 装 pnpm 并缓存加速 |
| \`pnpm install\`（CI 常自动 frozen）或显式 \`--frozen-lockfile\` | 锁文件与 \`package.json\` 不一致就**失败**，避免静默漂移 |
| Node 版本与本地约定对齐 | 本仓目标 Node ≥ 26；CI 矩阵别用过旧 Node |
| 密钥用 \`secrets.XXX\` | 与本地 \`.env\` 同理，不进 Git |

最小形状（版本号以你仓库为准，概念如下）：

\`\`\`yaml
# 概念示意 — 勿照抄过期 action 大版本而不查文档
- uses: actions/checkout@…
- uses: pnpm/action-setup@…   # with: version: …
- uses: actions/setup-node@…  # with: node-version: '26'; cache: 'pnpm'
- run: pnpm install
- run: pnpm test   # 若有
- run: pnpm run build  # 若有前端/包构建
\`\`\`

> CI 红叉时，先在**本机用同一套命令**复现（假窗；真机在仓库根跑）。

\`\`\`shell
{"preset":"ci-local"}
\`\`\`

\`\`\`term
{"title":"CI 红叉日志形态（假）","prompt":"$ ","env":"GitHub Actions · ubuntu-latest","steps":[{"type":"in","text":"pnpm install --frozen-lockfile"},{"type":"out","text":"ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with \\"frozen-lockfile\\" because pnpm-lock.yaml is not up to date with package.json\\n##[error]Process completed with exit code 1."}]}
\`\`\`

## 安全卫生（CI 特有）

| 项 | 做 |
|----|----|
| Secrets | 仓库/环境级 Secret；生产环境可加审批 |
| 日志 | 勿 \`echo\` 密钥；派生值需 mask |
| Action 来源 | 优先可信 action；进阶可 pin commit SHA |
| \`GITHUB_TOKEN\` | 默认权限尽量收窄（\`permissions\`） |
| 依赖 | PR 改 lockfile 要人审；防投毒包进锁文件 |

\`\`\`flip
{"title":"CI 翻卡","cards":[{"front":"红叉怎么办","back":"先读 Job 日志，本地复现同一命令"},{"front":"只有我能跑","back":"缺依赖/Node 版本/环境变量未进 CI"},{"front":"CD","back":"Continuous Deploy：绿了再自动发布；本课先 CI"},{"front":"与测试课","back":"没有测试脚本，CI 只能做 install/build"}]}
\`\`\`

\`\`\`quiz
{"title":"CI","questions":[{"q":"API Token 写进 workflow YAML 明文？","choices":[{"t":"方便，反正只有维护者能看","ok":false,"why":"进 Git 即泄漏面。"},{"t":"应放到 GitHub Secrets 再引用","ok":true,"why":"平台侧保管。"},{"t":"写进 README 说明怎么配","ok":false,"why":"文档也会传密钥。"}]}]}
\`\`\`

## 和本仓 / Vibe

- 开 PR 前：本地至少跑通你改动的路径；有 CI 则**红叉先读日志**再催合并  
- Agent 改完：让它给出「CI 会跑的等价命令」，你本地先跑  
- www 课：\`pnpm run build\` 常应成为检查一步  

## Coding Agent

\`\`\`prompt
目标：草拟本仓 GitHub Actions CI：pnpm + Node 26 风格 + install（frozen）+ 可选 build。
现场：是否已有 .github/workflows=…；要跑的脚本=…
约束：密钥用 secrets；先给 YAML 全文让我确认；action 版本注明需我对照官网。
验收：推送后能理解绿/红含义；说明失败时看哪段日志。
\`\`\`

## 下一步

**测试入门**（先有断言）· **Git 进阶**（PR 流）· **安全常识**（Secrets 与泄漏应急）。
## 导图2 · CI / CD / Git × 持续集成

> 锁文件与 pnpm 在 CI 同样生效。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **持续集成** | 每次推送检查 | 勿只在本机绿 |
| **持续交付** | 可重复发布 | 不缩短清单 |
| **Git** | 触发源 | PR 门禁 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

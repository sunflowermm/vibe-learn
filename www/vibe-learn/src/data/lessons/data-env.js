export default `# 环境变量与 .env

> **环境变量** = 进程启动时带上的「名=值」小纸条（路径、代理、密钥…）。  
> 程序用 \`process.env.名字\` 读取。密钥写进将提交的源码 = 事故。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 读写 | 理解 KEY=VALUE；.env 不进 Git |
| 进程 | 环境变量是进程可见配置 |
| 本仓 | 密钥与代理常见 |
| 跟 Agent | 勿把真实密钥贴进聊天留存 |


## 先认词

| 写法 | 白话 |
|------|------|
| **环境变量** | 对当前进程可见的配置；子进程常能继承 |
| **PATH** | 特殊环境变量：命令搜索路径列表 |
| **.env 文件** | 本地放键值的文本；工具可读入后变成环境变量 |
| **.env.example** | 只列键名与假值，**可以**进 Git |
| **gitignore** | 告诉 Git 别提交；\`.env\` 通常在里面 |
| **HTTP_PROXY** | 「出网走代理」的常见变量名 |

在 JS：\`process.env.HTTP_PROXY\`。未设置时多为 \`undefined\`。

## 分层：谁覆盖谁

\`\`\`mermaid
flowchart TB
  OS[系统 / 用户环境变量] --> SHELL[当前终端 export]
  SHELL --> DOT[.env 被工具注入]
  DOT --> PROC[node 进程 process.env]
  CI[CI Secrets] --> PROC
\`\`\`

| 层 | 典型用途 |
|----|----------|
| 系统 / 用户 | PATH、长期代理 |
| 当前终端 \`export\` | 临时调试；关窗即无 |
| \`.env\` | 本机密钥、端口；**勿提交** |
| CI Secrets | 流水线里的真密钥 |

本仓配置还有 yaml 三同步；环境变量偏**密钥与机器差**，别把一切塞进 \`.env\`。

## 和 AI 全栈的交界

| 场景 | 常见变量 |
|------|----------|
| 调云端模型 | \`OPENAI_API_KEY\` / 各厂商 Key（名以实际配置为准） |
| 出网代理 | \`HTTP_PROXY\` \`HTTPS_PROXY\` \`NO_PROXY\` |
| 本机服务 | \`PORT\`、数据库 URL |

对照：[菜鸟 Linux export](https://www.runoob.com/linux/linux-comm-export.html) / [env](https://www.runoob.com/linux/linux-comm-env.html)——\`export\` 影响后续进程，\`env\` 可查看或在干净环境跑命令。  
**密钥进 Git = 事故**；模板用 \`.env.example\`。

常见本地 \`.env\`（通常 **不要** 进 Git）：

\`\`\`dotenv
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
NO_PROXY=127.0.0.1,localhost,::1
API_KEY=sk-xxx
\`\`\`

\`\`\`flip
{"title":".env 翻卡","cards":[{"front":".env","back":"本机密钥与环境；通常不进 Git"},{"front":".env.example","back":"只含键名与假值，可进仓库"},{"front":"源码硬编码密钥","back":"泄漏面最大，禁止"},{"front":"export 一次","back":"只对当前终端会话有效；关窗就没"}]}
\`\`\`

## 动手：代理变量

本机终端按壳设置（关窗即失效；要持久化再写入用户环境或 shell 配置）：

\`\`\`env
{"title":"会话里设代理 · 按壳","caption":"仅境外资源；本机 Redis/Node 走 NO_PROXY。端口以 Clash 界面为准。","default":"gitbash","tabs":[{"id":"gitbash","label":"Git Bash / Unix","os":"Win/Linux/mac","shell":"bash","lines":["export HTTP_PROXY=http://127.0.0.1:7890","export HTTPS_PROXY=http://127.0.0.1:7890","export NO_PROXY=127.0.0.1,localhost,::1","echo $HTTPS_PROXY"]},{"id":"pwsh","label":"PowerShell","os":"Windows","shell":"pwsh","lines":["$env:HTTP_PROXY='http://127.0.0.1:7890'","$env:HTTPS_PROXY='http://127.0.0.1:7890'","$env:NO_PROXY='127.0.0.1,localhost,::1'","echo $env:HTTPS_PROXY"]}]}
\`\`\`

模拟窗（假数据 · 看 export 前后变化）：

\`\`\`shell
{"preset":"env-proxy"}
\`\`\`

详见 **Clash · 端口**。

\`\`\`quiz
{"title":"环境变量","questions":[{"q":"API 密钥最不该放哪？","choices":[{"t":"已 gitignore 的 .env","ok":false,"why":"这是常见正确做法（仍注意别误提交）。"},{"t":"将要 push 的源码字符串里","ok":true,"why":"一推就泄漏。"},{"t":".env.example 里的假值","ok":false,"why":"示例假值可以进仓。"}]},{"q":"CI 里放生产 Key？","choices":[{"t":"写进 workflow YAML 明文","ok":false,"why":"进 Git 即泄漏。"},{"t":"平台 Secrets，再注入环境变量","ok":true,"why":"见 CI 课。"},{"t":"写进 README","ok":false,"why":"更糟。"}]}]}
\`\`\`

## Coding Agent

\`\`\`prompt
目标：检查仓库是否误提交 .env / 源码硬编码密钥；给出 .env.example 键列表建议。
现场：仓库路径=…
约束：不要把真实密钥写进回复可提交区；只报告风险路径。
验收：列出应 gitignore 的模式；说明本机如何设代理变量。
\`\`\`

## 下一步

**过关练习** — 把本章串成可检查作品。  
安全底线：**安全常识**。
## 导图2 · 环境变量 / 部署 / Git × .env

> 与第一章 PATH、Clash 代理课衔接。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **环境变量** | 名=值 | 进程级配置 |
| **部署上线** | 每环境不同 | 勿把生产密钥写进仓 |
| **Git** | 忽略 .env | 可提交 .env.example |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

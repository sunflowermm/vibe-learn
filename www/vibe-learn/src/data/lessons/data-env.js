/** 环境变量与 .env */
export default `# 环境变量与 .env

> **环境变量** = 进程启动时带上的「名=值」小纸条（路径、代理、密钥…）。  
> 程序用 \`process.env.名字\` 读取。密钥写进将提交的源码 = 事故。

## 先认词

| 写法 | 白话 |
|------|------|
| **环境变量** | 对当前进程可见的配置；子进程常能继承 |
| **PATH** | 特殊环境变量：命令搜索路径列表 |
| **.env 文件** | 本地放键值的文本；工具可读入后变成环境变量 |
| **gitignore** | 告诉 Git「别提交这些文件」；\`.env\` 通常在里面 |
| **HTTP_PROXY** | 「出网走代理」的常见变量名 |

在 JS：\`process.env.HTTP_PROXY\`。

常见本地 \`.env\`（通常 **不要** 进 Git）：

\`\`\`
HTTP_PROXY=http://127.0.0.1:7890
API_KEY=sk-xxx
\`\`\`

\`\`\`flip
{"title":".env 翻卡","cards":[{"front":".env","back":"本机密钥与环境；通常不进 Git"},{"front":".env.example","back":"只含键名与假值，可进仓库"},{"front":"源码硬编码密钥","back":"泄漏面最大，禁止"},{"front":"export 一次","back":"只对当前终端会话有效；关窗就没"}]}
\`\`\`

## 动手：代理变量（模拟）

> 和 Clash 课同一套沙箱：看 \`export\` 前后变量变了没。

\`\`\`shell
{"preset":"env-proxy"}
\`\`\`

境外/GitHub 网络常设：\`HTTP_PROXY\` / \`HTTPS_PROXY\` = \`http://127.0.0.1:7890\`（端口以你本机代理为准）。

\`\`\`quiz
{"title":"环境变量","questions":[{"q":"API 密钥最不该放哪？","choices":[{"t":"已 gitignore 的 .env","ok":false,"why":"这是常见正确做法（仍注意别误提交）。"},{"t":"将要 push 的源码字符串里","ok":true,"why":"一推就泄漏。"},{"t":".env.example 里的假值","ok":false,"why":"示例假值可以进仓。"}]}]}
\`\`\`

## 下一步

**过关练习** — 把本章串成可检查作品。
`;

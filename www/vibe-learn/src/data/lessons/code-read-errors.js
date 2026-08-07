export default `# 读懂报错

> 报错是**定位器**：类型 · 信息 · 堆栈（文件:行号）。  
> 对齐 MDN \`Error\` 心智与工程实践：先找**自己的帧**，再改一处验证。  
> Vibe 时：把**完整堆栈**贴给 Agent，并要求「先指出第一帧自己的文件」，禁止上来重构。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 堆栈 | 能落到自己的文件:行号 |
| 复述 | 一句话说明错因 |
| 分层 | 区分语法错 / 运行时 / 依赖与路径 |
| 跟 Agent | 贴完整报错，不要截半截 |

上一课：**异步**。下一课：**JSON**（数据文字系列）。

---

## 怎么读一行堆栈

\`\`\`reveal
{"title":"真机堆栈会长这样","prompt":"先盯第一行与第一帧自己的文件","tone":"warn","face":"TypeError: Cannot read properties of undefined (reading 'name')\\n    at render (C:\\\\proj\\\\app.js:12:18)\\n    at main (C:\\\\proj\\\\app.js:20:3)\\n    at Object.<anonymous> (C:\\\\proj\\\\app.js:25:1)\\n    at Module._compile (node:internal/modules/cjs/loader:1521:14)","body":"忽略 node:internal / node_modules。打开 app.js 第 12 行，查谁是 undefined。给 Agent 时贴完整原文，不要只截 TypeError 一行。"}
\`\`\`

\`\`\`
TypeError: Cannot read properties of undefined (reading 'name')
    at render (C:\\proj\\app.js:12:18)
    at main (C:\\proj\\app.js:20:3)
    at Object.<anonymous> (C:\\proj\\app.js:25:1)
\`\`\`

1. **第一行**：错因（\`TypeError\` + 信息）  
2. **第一帧自己的文件**：\`app.js:12\`（忽略 \`node_modules\` / \`node:internal\`）  
3. 向上看调用链：谁调用了 \`render\`  

\`\`\`steps
{"title":"排错顺序","steps":[{"title":"读类型与信息","body":"TypeError / ReferenceError / SyntaxError…"},{"title":"跳到自己的行","body":"忽略 node_modules 与 node:internal 噪声"},{"title":"打印中间值","body":"console.log / 断点确认 undefined 从哪来"},{"title":"改一处再跑","body":"一次一个假设；能测就留下回归"}]}
\`\`\`

---

## 常见错对照

\`\`\`term
{"title":"SyntaxError 终端形态","prompt":"$ ","steps":[{"type":"in","text":"node broken.js"},{"type":"out","text":"/home/alice/broken.js:2\\nconsole.log('hi'\\n            ^^^^^^^\\n\\nSyntaxError: missing ) after argument list\\n    at checkSyntax (node:internal/main/check_syntax:74:5)"}]}
\`\`\`

| 错 | 常见原因 | 第一反应 |
|----|----------|----------|
| **ReferenceError** | 未声明 / 拼写错 | 搜变量名 |
| **TypeError** | 对 \`undefined\` 取属性；非函数却 \`()\` | 看谁是 \`undefined\` |
| **SyntaxError** | 括号引号没配平 | 看报错指出的行附近 |
| **ENOENT** | 文件路径不存在 | cwd 是否对；\`pwd\`/\`ls\` |
| **EADDRINUSE** | 端口被占 | 换端口或杀掉旧进程 |
| **ERR_MODULE_NOT_FOUND** | 模块路径 / 漏 \`.js\` | 回 **模块** 课 |
| **ERR_UNHANDLED_REJECTION** | Promise 失败没 catch | 回 **异步** 课补 \`try/catch\` |

异步里：\`await\` 失败常进 \`catch\`；未处理的拒绝可能只打 \`UnhandledRejection\`——仍要找**自己的**帧。

\`\`\`quiz
{"title":"读报错 · 场景","questions":[{"q":"堆栈里一长串 node_modules，你该？","choices":[{"t":"从最底下 node 内部帧开始改","ok":false,"why":"那不是你的代码。"},{"t":"找第一帧属于自己项目的文件:行号","ok":true,"why":"定位器。"},{"t":"整段删掉重写项目","ok":false,"why":"过大。"}]},{"q":"给 Agent 排错时，最有效的输入材料是？","choices":[{"t":"只说「报错了」","ok":false,"why":"无法定位。"},{"t":"完整堆栈原文 + 已试过的命令","ok":true,"why":"可复现、可落到文件行。"},{"t":"只贴截图半截红字","ok":false,"why":"丢关键帧。"}]}]}
\`\`\`

## Vibe Coding

\`\`\`prompt
目标：解释下面堆栈并给出最小修复。
现场：（粘贴完整报错）
约束：先指出我该打开的文件:行号；不要顺手重构无关文件。
验收：我按你的改法跑通后，口述错因一句话。
\`\`\`

## 接到过关

过关练习要求你**故意写错一次**，再按本课四步修好——比「听懂」更重要。

## 下一步

**JSON** — 前后端交换数据的文字格式。  
配套：番外 **调试与日志**（若已开）。
`;

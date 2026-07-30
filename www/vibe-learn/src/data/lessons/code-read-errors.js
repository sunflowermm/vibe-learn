/** 读懂报错 */
export default `# 读懂报错

> 报错是**定位器**：类型 · 信息 · 堆栈（文件:行号）。  
> Vibe 时：把**完整堆栈**贴给 Agent，并要求「先指出第一帧自己的文件」，禁止上来重构。

## 怎么读一行堆栈

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

## 常见错对照

| 错 | 常见原因 | 第一反应 |
|----|----------|----------|
| **ReferenceError** | 未声明 / 拼写错 | 搜变量名 |
| **TypeError** | 对 \`undefined\` 取属性；非函数却 \`()\` | 看谁是 \`undefined\` |
| **SyntaxError** | 括号引号没配平 | 看报错指出的行附近 |
| **ENOENT** | 文件路径不存在 | cwd 是否在仓库根 |
| **EADDRINUSE** | 端口被占 | 换端口或杀掉旧进程 |

异步里：\`await\` 失败常进 \`catch\`；未处理的 Promise 拒绝可能只打一行 \`UnhandledRejection\`——仍要找**自己的**帧。

\`\`\`flip
{"title":"报错翻卡","cards":[{"front":"堆栈从上往下？","back":"先看类型行，再找第一帧自己的文件"},{"front":"node_modules 里好长一串","back":"多半噪声；继续找你的路径"},{"front":"给 Agent 什么","back":"完整原文 + 你已试过什么"},{"front":"只截半截？","back":"丢关键帧，定位变猜谜"}]}
\`\`\`

\`\`\`quiz
{"title":"读报错","questions":[{"q":"堆栈里一长串 node_modules，你该？","choices":[{"t":"从最底下 node 内部帧开始改","ok":false,"why":"那不是你的代码。"},{"t":"找第一帧属于自己项目的文件:行号","ok":true,"why":"定位器。"},{"t":"整段删掉重写项目","ok":false,"why":"过大。"}]}]}
\`\`\`

## Vibe Coding

\`\`\`prompt
目标：解释下面堆栈并给出最小修复。
现场：（粘贴完整报错）
约束：先指出我该打开的文件:行号；不要顺手重构无关文件。
验收：我按你的改法跑通后，口述错因一句话。
\`\`\`

## 下一步

**JSON** — 前后端交换数据的文字格式。  
配套：**调试与日志**。
`;

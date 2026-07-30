/** 读懂报错 */
export default `# 读懂报错

> 报错是**定位器**：类型 · 信息 · 堆栈（文件:行号）。  
> Vibe 时：把**完整堆栈**贴给 Agent，并要求「先指出第一帧自己的文件」，禁止上来重构。

\`\`\`
TypeError: Cannot read properties of undefined (reading 'name')
    at render (C:\\proj\\app.js:12:18)
    at main (C:\\proj\\app.js:20:3)
\`\`\`

1. 第一行：错因  
2. 第一帧**自己的文件**：\`app.js:12\`  
3. 向上看调用链  

\`\`\`steps
{"title":"排错顺序","steps":[{"title":"读类型与信息","body":"TypeError / ReferenceError…"},{"title":"跳到自己的行","body":"忽略 node_modules 噪声。"},{"title":"打印中间值","body":"console.log / 断点。"},{"title":"改一处再跑","body":"一次一个假设。"}]}
\`\`\`

| 错 | 常见原因 |
|----|----------|
| **ReferenceError** | 未声明 / 拼写错 |
| **TypeError** | 对 undefined 取属性；非函数却调用 |
| **SyntaxError** | 括号引号没配平 |

\`\`\`flip
{"title":"报错翻卡","cards":[{"front":"堆栈从上往下？","back":"先看类型行，再找第一帧自己的文件"},{"front":"node_modules 里好长一串","back":"多半噪声；继续找你的路径"},{"front":"给 Agent 什么","back":"完整原文 + 你已试过什么"}]}
\`\`\`

## Vibe Coding

可复制：

\`\`\`
目标：解释下面堆栈并给出最小修复。
现场：（粘贴完整报错）
约束：先指出我该打开的文件:行号；不要顺手重构无关文件。
验收：我按你的改法跑通后，口述错因一句话。
\`\`\`

## 下一步

**JSON** — 前后端交换数据的文字格式。
`;

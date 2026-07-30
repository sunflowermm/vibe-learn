/** 控制流 */
export default `# 控制流

> 默认从上到下执行；**分支**与**循环**让程序按条件换路或重复。

## 分支

\`\`\`javascript
const n = 3
if (n > 0) {
  console.log('正数')
} else if (n === 0) {
  console.log('零')
} else {
  console.log('负数')
}
\`\`\`

用 \`===\` / \`!==\`（少用 \`==\`，会隐式转换）。

\`\`\`flip
{"title":"控制流翻卡","cards":[{"front":"===","back":"严格相等：类型和值都要比"},{"front":"for...of","back":"直接拿数组元素"},{"front":"死循环","back":"while 条件永远真且无 break"}]}
\`\`\`

## 循环

\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i)
}
const items = ['a', 'b']
for (const item of items) {
  console.log(item)
}
\`\`\`

| 写法 | 适合 |
|------|------|
| \`for\` | 次数 / 下标 |
| \`for...of\` | 遍历数组元素 |
| \`while\` | 条件驱动（防死循环） |

\`\`\`quiz
{"title":"控制流","questions":[{"q":"遍历数组元素且不需要下标，优先？","choices":[{"t":"for...of","ok":true,"why":"直接拿元素。"},{"t":"永远 while(true)","ok":false,"why":"易死循环。"},{"t":"只用 ==","ok":false,"why":"与遍历无关。"}]}]}
\`\`\`

## 下一步

**函数** — 把重复逻辑收成可调用的块。
`;

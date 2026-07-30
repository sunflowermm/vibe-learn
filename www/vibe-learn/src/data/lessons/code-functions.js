/** 函数 */
export default `# 函数

> 函数 = **起名的可复用计算**：参数 → 过程 → 返回值。

\`\`\`javascript
function add(a, b) {
  return a + b
}
const add2 = (a, b) => a + b
console.log(add(1, 2), add2(1, 2))
\`\`\`

\`\`\`flip
{"title":"函数翻卡","cards":[{"front":"参数","back":"调用时传入的输入"},{"front":"返回值","back":"return 交回的结果；无 return 则为 undefined"},{"front":"副作用","back":"打印 / 写文件 / 改外部状态"}]}
\`\`\`

- 函数内绑定默认出不了函数
- 本仓插件 \`async run(e)\`、HTTP handler 都是「收上下文 → 做事」

\`\`\`quiz
{"title":"函数","questions":[{"q":"函数没有 return 时，调用结果通常是？","choices":[{"t":"0","ok":false,"why":"不是默认数字。"},{"t":"undefined","ok":true,"why":"没有交回值。"},{"t":"报错必崩","ok":false,"why":"可以没有 return。"}]}]}
\`\`\`

## 下一步

**对象与数组** — 一次传递一包相关数据。
`;

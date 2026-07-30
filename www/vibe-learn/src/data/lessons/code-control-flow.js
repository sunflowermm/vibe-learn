/** 控制流 */
export default `# 控制流

> 默认从上到下执行；**分支**与**循环**让程序按条件换路或重复。  
> 插件 \`if\`、校验输入、遍历列表——每天都在用。

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

// 三元：简单二选一赋值
const label = n > 0 ? '正' : '非正'
\`\`\`

| 比较 | 用法 |
|------|------|
| \`===\` / \`!==\` | **优先**：类型和值都比 |
| \`==\` / \`!=\` | 会隐式转换，少用 |
| \`&&\` \`\\|\\|\` | 并且 / 或者；短路求值 |
| \`?\.\` | 可选链：中间 \`null/undefined\` 不崩 |
| \`??\` | 空值合并：仅 \`null/undefined\` 时用右侧 |

\`\`\`flip
{"title":"控制流翻卡","cards":[{"front":"===","back":"严格相等：类型和值都要比"},{"front":"for...of","back":"直接拿数组元素"},{"front":"死循环","back":"while 条件永远真且无 break"},{"front":"短路","back":"a && b：a 假则不算 b"}]}
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
let k = 0
while (k < 2) {
  k += 1
}
\`\`\`

| 写法 | 适合 |
|------|------|
| \`for\` | 次数 / 下标 |
| \`for...of\` | 遍历数组元素（不需下标） |
| \`for...in\` | 对象键；数组上少用 |
| \`while\` | 条件驱动（**必有退出**） |
| \`break\`/\`filter\` | 由数组派生（见对象与数组课） |

\`break\` 跳出循环；\`continue\` 跳过本轮。嵌套过深 → 抽函数。

\`\`\`quiz
{"title":"控制流","questions":[{"q":"遍历数组元素且不需要下标，优先？","choices":[{"t":"for...of","ok":true,"why":"直接拿元素。"},{"t":"永远 while(true)","ok":false,"why":"易死循环。"},{"t":"只用 ==","ok":false,"why":"与遍历无关。"}]},{"q":"0 == false 与 0 === false？","choices":[{"t":"都为 true","ok":false,"why":"=== 要求类型相同。"},{"t":"== 常为 true，=== 为 false","ok":true,"why":"== 会转换；=== 不。"},{"t":"都不能比","ok":false,"why":"能比，结果不同。"}]}]}
\`\`\`

## 接到本仓

插件 \`rule\` 匹配后常 \`if\` 分支处理；校验用户输入先判类型再往下。别写「看起来能跑」的 \`==\`。

## 下一步

**函数** — 把重复逻辑收成可调用的块。
`;

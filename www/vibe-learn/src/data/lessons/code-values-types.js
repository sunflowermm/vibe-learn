/** 值与类型 */
export default `# 值与类型

> 程序操作的是**值**；类型告诉你这个值能干什么、不能干什么。

## 本课你要带走

1. 原始类型 vs 对象（粗分）
2. \`let\` / \`const\`（优先 \`const\`）
3. \`typeof\` 直觉与易混点（\`null\`）

---

## 1. 常见值

\`\`\`match
{"title":"类型配对","pairs":[{"id":"n","left":"number","right":"42、3.14"},{"id":"s","left":"string","right":"文本"},{"id":"b","left":"boolean","right":"true / false"},{"id":"u","left":"undefined","right":"没赋值"}]}
\`\`\`

| 类型 | 例子 | 备注 |
|------|------|------|
| **number** | \`42\`、\`3.14\` | 日常无独立「整数类型」 |
| **string** | \`'xrk'\`、模板字符串 | 可插值 |
| **boolean** | \`true\` / \`false\` | 分支条件 |
| **undefined** | 未赋值 | 「还没有」 |
| **null** | 刻意空 | \`typeof null === 'object'\`（历史坑） |
| **object / array** | \`{}\` / \`[]\` | 后文展开 |

---

## 2. 绑定名字

\`\`\`javascript
const name = 'xrk'
let count = 0
count = count + 1
console.log(name, count, typeof count)
\`\`\`

- 优先 \`const\`；需要再赋值再用 \`let\`
- 现代代码少用 \`var\`

\`\`\`flip
{"title":"值与类型翻卡","cards":[{"front":"const","back":"绑定后不要再换成别的值（对象内容仍可能被改）"},{"front":"typeof null","back":"历史坑：结果是 'object'"},{"front":"string","back":"文本；用引号或模板字符串"}]}
\`\`\`

\`\`\`quiz
{"title":"值与类型","questions":[{"q":"多数时候优先用？","choices":[{"t":"var","ok":false,"why":"现代代码少用。"},{"t":"const，必要时再 let","ok":true,"why":"减少意外重绑。"},{"t":"全部不用声明","ok":false,"why":"会变成隐式全局，危险。"}]}]}
\`\`\`

## 下一步

**控制流** — 用 boolean 决定走哪条路。
`;

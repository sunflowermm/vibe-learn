/** 值与类型 */
export default `# 值与类型

> 程序操作的是**值**；类型告诉你这个值能干什么、不能干什么。  
> JS 是**动态类型**：变量可以先后装不同种类的值——更要小心 \`typeof\` 与 \`===\`。

## 本课你要带走

1. 原始类型 vs 对象（粗分）
2. \`let\` / \`const\`（优先 \`const\`）
3. \`typeof\` 直觉与易混点（\`null\`、数组）

---

## 1. 常见值

\`\`\`match
{"title":"类型配对","pairs":[{"id":"n","left":"number","right":"42、3.14"},{"id":"s","left":"string","right":"文本"},{"id":"b","left":"boolean","right":"true / false"},{"id":"u","left":"undefined","right":"没赋值"},{"id":"o","left":"object","right":"{} / [] / null 坑"}]}
\`\`\`

| 类型 | 例子 | 备注 |
|------|------|------|
| **number** | \`42\`、\`3.14\`、\`NaN\` | 日常无独立「整数类型」 |
| **string** | \`'xrk'\`、\`\\\`hi\\\${x}\\\`\` | 模板字符串可插值 |
| **boolean** | \`true\` / \`false\` | 分支条件 |
| **undefined** | 未赋值 | 「还没有」 |
| **null** | 刻意空 | \`typeof null === 'object'\`（历史坑） |
| **bigint** | \`10n\` | 极大整数；本仓少见 |
| **symbol** | \`Symbol('id')\` | 唯一键；进阶 |
| **object / array** | \`{}\` / \`[]\` | \`typeof [] === 'object'\`；用 \`Array.isArray\` |

真假值（进 \`if\` 当假）：\`false\` \`0\` \`''\` \`null\` \`undefined\` \`NaN\`。

### 严格相等（题库高频）

| 写法 | 行为 | 建议 |
|------|------|------|
| \`===\` / \`!==\` | **不**做类型转换；类型或值不同即为假 | **日常优先** |
| \`==\` / \`!=\` | 会隐式转换（如 \`0 == false\` 为真） | 少用；易踩坑 |

\`typeof null === 'object'\` 是历史包袱；判空用 \`== null\`（同时吃 null/undefined）或显式判断。  
判数组：**\`Array.isArray(x)\`**，不要 \`typeof x === 'array'\`（不存在这种返回值）。

---

## 2. 绑定名字

\`\`\`javascript
const name = 'xrk'
let count = 0
count = count + 1
console.log(name, count, typeof count, typeof null, Array.isArray([]))
\`\`\`

- 优先 \`const\`；需要再赋值再用 \`let\`  
- 现代代码少用 \`var\`（函数作用域、易踩提升坑）  
- \`const\` 禁止**换绑**；对象/数组**内容**仍可能被改  

\`\`\`flip
{"title":"值与类型翻卡","cards":[{"front":"const","back":"绑定后不要再换成别的值（对象内容仍可能被改）"},{"front":"typeof null","back":"历史坑：结果是 'object'"},{"front":"string","back":"文本；用引号或模板字符串"},{"front":"NaN","back":"Not a Number；NaN === NaN 为 false，用 Number.isNaN"}]}
\`\`\`

\`\`\`quiz
{"title":"值与类型","questions":[{"q":"多数时候优先用？","choices":[{"t":"var","ok":false,"why":"现代代码少用。"},{"t":"const，必要时再 let","ok":true,"why":"减少意外重绑。"},{"t":"全部不用声明","ok":false,"why":"会变成隐式全局，危险。"}]},{"q":"判断是不是数组？","choices":[{"t":"typeof x === 'array'","ok":false,"why":"typeof 数组是 object。"},{"t":"Array.isArray(x)","ok":true,"why":"正确做法。"},{"t":"x instanceof String","ok":false,"why":"不对口。"}]}]}
\`\`\`

## 下一步

**控制流** — 用 boolean 决定走哪条路。
`;

export default `# 控制流

> 默认从上到下执行；**分支**与**循环**让程序按条件换路或重复。  
> 口径对齐 [MDN · 控制流与错误处理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) 与 [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)：条件用块语句、假值列表、遍历数组优先 \`for...of\`。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分支 | 能写 \`if / else if / else\` 与简单三元 |
| 循环 | 会 \`for\`、\`for...of\`、\`while\`，知道必有退出 |
| 运算符 | 分支里用 \`===\`；会 \`&&\`/\`||\` 短路与 \`?.\`/\`??\` |
| 跟 Agent | 逻辑错先自己追「进了哪条分支」 |

上一课：**值与类型**（真假值、\`===\`）。下一课：**函数**（把分支收进可复用块）。

---

## 1. 分支：\`if...else\`

MDN 建议：条件体**一律用 \`{}\` 块**，尤其嵌套时。

\`\`\`javascript
const n = 3
if (n > 0) {
  console.log('正数')
} else if (n === 0) {
  console.log('零')
} else {
  console.log('负数')
}

// 简单二选一赋值可用三元；复杂逻辑仍用 if
const label = n > 0 ? '正' : '非正'
\`\`\`

**假值**（条件为假，与值与类型课同一列表）：\`false\`、\`undefined\`、\`null\`、\`0\`、\`NaN\`、\`''\`。  
注意：\`new Boolean(false)\` 是对象，进 \`if\` 为**真**——别用 Boolean 对象包装。

| 写法 | 用途 |
|------|------|
| \`===\` / \`!==\` | 条件里默认 |
| \`&&\` / \`\|\|\` | 并且 / 或者；**短路**（左边已定结果则不算右边） |
| \`?.\` | 可选链：中间 \`null/undefined\` 不崩 |
| \`??\` | 空值合并：仅 \`null/undefined\` 时用右侧（\`0\`/\`''\` 会保留） |

\`\`\`term
{"title":"分支跑通","prompt":"$ ","steps":[{"type":"in","text":"node -e \\"const n=3; console.log(n>0?'正':'非正')\\""},{"type":"out","text":"正"}]}
\`\`\`

\`switch\`：多分支匹配同一表达式时可用；每个 \`case\` 末尾记得 \`break\`，否则会「穿透」执行下一个 case（MDN 强调）。入门优先把 \`if\` 写熟。

---

## 2. 循环

\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i)
}

const items = ['a', 'b']
for (const item of items) {
  console.log(item) // 直接拿元素
}

let k = 0
while (k < 2) {
  k += 1
}
\`\`\`

| 写法 | 适合 | 注意 |
|------|------|------|
| \`for\` | 已知次数 / 需要下标 | — |
| \`for...of\` | 遍历**可迭代值**（数组元素） | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)：拿的是值，不是键 |
| \`for...in\` | 对象的可枚举**键** | 数组上少用（会扫到意外属性） |
| \`while\` | 条件驱动 | **必须有退出**，否则死循环 |
| \`map\` / \`filter\` | 由数组派生新数组 | 见 **对象与数组** |

\`break\` 跳出循环；\`continue\` 跳过本轮。嵌套过深 → 抽成**函数**（下一课）。

---

## 3. 接到本仓

| 场景 | 控制流角色 |
|------|------------|
| 插件 \`rule\` 命中后 | \`if\` 分支处理不同消息类型 |
| 校验用户输入 | 先判类型（上一课）再 \`if\` |
| 遍历配置列表 | \`for...of\` 或 \`map\` |

\`\`\`quiz
{"title":"控制流 · 场景","questions":[{"q":"遍历数组元素且不需要下标，优先？","choices":[{"t":"for...of","ok":true,"why":"按可迭代值逐个取出元素（MDN）。"},{"t":"永远 while(true) 再手动 break","ok":false,"why":"易死循环，且啰嗦。"},{"t":"for...in","ok":false,"why":"那是枚举键；数组上易踩继承属性。"}]},{"q":"条件里写 if (x = y) 赋值，MDN 态度更接近？","choices":[{"t":"推荐，更短","ok":false,"why":"易与比较写混；文档劝阻。"},{"t":"一般应避免，极少数才故意这么写","ok":true,"why":"赋值当条件可读性差。"},{"t":"语法非法","ok":false,"why":"合法，但不推荐。"}]},{"q":"0 ?? 5 与 0 || 5 的结果？","choices":[{"t":"都是 5","ok":false,"why":"|| 会把 0 当假。"},{"t":"?? 得 0，|| 得 5","ok":true,"why":"?? 只替换 null/undefined。"},{"t":"都是 0","ok":false,"why":"|| 会走到右侧。"}]}]}
\`\`\`

## 下一步

**函数** — 给一段计算起名：参数 → 过程 → 返回值。
`;

export default `# 值与类型

> 程序操作的是**值**；类型告诉你这个值能干什么。  
> 口径对齐 [MDN · 数据类型与数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)：JS 是**动态类型**（变量可先后装不同种类的值），也是**弱类型**（运算时可能隐式转换）——所以日常要钉死 \`===\` 与 \`typeof\` 坑。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 能分清原始值 vs 对象；说出 \`null\` / 数组的 \`typeof\` 坑 |
| 相等 | 默认 \`===\`；仅用 \`== null\` 同时吃 null/undefined |
| 绑定 | 优先 \`const\`，必要时 \`let\`；知道 \`const\` 禁的是换绑 |
| 跟 Agent | 审代码时能指出 \`==\` / 误判数组 / 误用 \`typeof null\` |

上一课：**第一个程序**（会 \`node\` 跑文件）。下一课：**控制流**（用 boolean 决定走哪条路）。

---

## 1. 动态类型长什么样

\`\`\`javascript
let foo = 42        // number
foo = 'xrk'         // 变成 string —— 合法，但可读性靠纪律
foo = true          // 又变成 boolean
\`\`\`

弱类型例子（隐式转换）：\`42 + '1'\` → \`'421'\`（数字被拼成字符串）。  
写业务时：**显式转换**（\`Number(x)\` / \`String(x)\`）比依赖 \`+\` 的“聪明”更安全。

---

## 2. 原始值一览（MDN 口径）

除 **object** 外，下列都是**不可变的原始值**（改字符串方法会得到新字符串，不会改旧的那份）。

| 类型 | \`typeof\` | 例子 | 学生要记住的 |
|------|-----------|------|----------------|
| **undefined** | \`"undefined"\` | 未赋值的变量 | 「还没有」 |
| **null** | \`"object"\`（历史坑） | 刻意空 | 用 \`=== null\` 判断，别信 typeof |
| **boolean** | \`"boolean"\` | \`true\` / \`false\` | 进 \`if\` 的真假 |
| **number** | \`"number"\` | \`42\`、\`NaN\`、\`Infinity\` | 无独立「整数类型」；\`NaN !== NaN\`，用 \`Number.isNaN\` |
| **bigint** | \`"bigint"\` | \`10n\` | 超大整数；本仓少见 |
| **string** | \`"string"\` | \`'xrk'\`；反引号模板可插值 | 文本 |
| **symbol** | \`"symbol"\` | \`Symbol('id')\` | 唯一键；进阶 |

**对象 / 数组**：\`typeof {}\`、\`typeof []\` 都是 \`"object"\`。  
判数组：**\`Array.isArray(x)\`**（MDN / 业界默认），不要写 \`typeof x === 'array'\`。

假值（进 \`if\` 当假，MDN 列表）：\`false\`、\`0\`、\`''\`、\`null\`、\`undefined\`、\`NaN\`。其余（含所有对象）为真。

\`\`\`term
{"title":"typeof 与 Array.isArray","prompt":"$ ","steps":[{"type":"in","text":"node -e \\"console.log(typeof 42, typeof null, typeof [], Array.isArray([]), Number.isNaN(NaN))\\""},{"type":"out","text":"number object object true true"}]}
\`\`\`

---

## 3. 相等：\`===\` 默认，\`==\` 少用

依据 [MDN · Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness) 与常见工程习惯：

| 写法 | 行为 | 建议 |
|------|------|------|
| \`===\` / \`!==\` | **不做**类型转换；类型不同直接假 | **日常默认** |
| \`==\` / \`!=\` | 会隐式转换（\`0 == false\` 为真） | 少用 |
| \`x == null\` | 同时匹配 \`null\` 与 \`undefined\` | **唯一常见例外**（比写两遍 \`===\` 更短） |
| \`Number.isNaN(x)\` | 判 NaN | 别用全局 \`isNaN\` 糊弄字符串 |
| \`Object.is(a,b)\` | 能区分 \`+0\`/\`-0\`，且 \`NaN\` 等于自身 | 元编程 / 边角；一般用 \`===\` |

对象比较的是**引用**：\`{} === {}\` 为假（两份内存）；\`const b = a\` 后 \`a === b\` 为真（同一份）。深拷贝与浅拷贝见 **对象与数组**。

---

## 4. 绑定名字：\`const\` / \`let\`

\`\`\`javascript
const name = 'xrk'   // 不能再写成 name = 'aya'
let count = 0
count = count + 1    // 可以换绑
\`\`\`

| 规则 | 说明 |
|------|------|
| 优先 \`const\` | 减少意外重绑 |
| 需要再赋值 → \`let\` | 计数器、累加器 |
| 少用 \`var\` | 函数作用域 + 提升，易踩坑（MDN 控制流章对比过块级作用域） |
| \`const\` 对象 | 禁的是换绑；\`obj.x = 1\` 仍可能改**内容** |

---

## 5. 接到本仓 / Agent

| 场景 | 用法 |
|------|------|
| 插件校验输入 | 先 \`typeof\` / \`Array.isArray\` / \`== null\`，再分支 |
| 审 Agent 补丁 | 盯 \`==\`、\`typeof null\`、把数组当非 object |
| HTTP / 配置 | 字段常是 string/number/object 嵌套——下一课用 boolean 做分支 |

\`\`\`quiz
{"title":"值与类型 · 场景","questions":[{"q":"要判断变量 x 是不是数组，应优先用什么？","choices":[{"t":"typeof x === 'array'","ok":false,"why":"typeof 对数组返回 'object'，没有 'array'。"},{"t":"Array.isArray(x)","ok":true,"why":"MDN / 工程默认做法。"},{"t":"x instanceof String","ok":false,"why":"对不上数组。"}]},{"q":"日常比较两个值是否相等，默认应怎么写？","choices":[{"t":"用 ==，让引擎帮转换","ok":false,"why":"隐式转换易出隐蔽 bug。"},{"t":"用 ===；仅用 == null 同时判断空","ok":true,"why":"严格相等为默认；== null 是常见例外。"},{"t":"永远 Object.is","ok":false,"why":"边角场景才需要。"}]},{"q":"const user = { name: 'aya' } 之后，下列哪句合法？","choices":[{"t":"user = { name: 'bob' }","ok":false,"why":"换绑被 const 禁止。"},{"t":"user.name = 'bob'","ok":true,"why":"改的是对象内容，不是换绑。"},{"t":"二者都非法","ok":false,"why":"改属性合法。"}]}]}
\`\`\`

## 下一步

**控制流** — 用真假值决定走哪条路、循环几次。
`;

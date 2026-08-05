export default `# 函数

> 函数 = **起名的可复用计算**：参数 → 过程 → 返回值。  
> 口径对齐 [MDN · 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)：原始值按**值**传入；对象/数组传入的是**引用**——函数里改属性，外面看得见。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 写法 | 会 \`function\` 声明与箭头；知道无 \`return\` → \`undefined\` |
| 作用域 | 函数内 \`const\`/\`let\` 默认出不去；默认参数会写 |
| 闭包 | 能口述「带着定义时外层变量」并举 \`makeCounter\` |
| 跟 Agent | 大函数先拆；说清输入、返回值、副作用 |

上一课：**控制流**。下一课：**对象与数组**（引用心智在函数参数上也会爆）。

---

## 1. 两种日常写法

\`\`\`javascript
function add(a, b) {
  return a + b
}

const add2 = (a, b) => a + b

console.log(add(1, 2), add2(1, 2)) // 3 3
\`\`\`

\`\`\`term
{"title":"函数跑通","prompt":"$ ","steps":[{"type":"in","text":"node -e \\"const add=(a,b)=>a+b; console.log(add(1,2))\\""},{"type":"out","text":"3"}]}
\`\`\`

| 写法 | 何时用 | 备注（MDN） |
|------|--------|-------------|
| \`function\` 声明 | 具名逻辑块 | 有提升；调试堆栈名清晰 |
| 函数表达式 \`const f = function () {}\` | 当值赋给变量 | 可具名便于递归/堆栈 |
| 箭头 \`=>\` | 短回调、\`map\` | \`this\` 词法绑定（进阶）；不能当构造器 |

**参数按值**：给参数重新赋值不影响外面的变量。  
**对象参数**：改 \`obj.x\` / \`arr[0]\` 会反映到调用方——与下一课「引用」同一条坑。

---

## 2. 作用域、默认参数、剩余参数

\`\`\`javascript
function greet(name = 'guest') {
  const msg = \`hi, \${name}\`
  return msg
}
// msg 出不了函数

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}
\`\`\`

| 点 | 说明 |
|----|------|
| 块级作用域 | \`const\`/\`let\` 在函数（或 \`{}\`）内 |
| 默认参数 | 调用方省略时用默认值 |
| 剩余参数 \`...args\` | 收成数组 |
| 纯函数 | 同输入同输出、无副作用；最好测 |
| 副作用 | \`console.log\`、写文件、改外部对象——要显式意识到 |

---

## 3. 回调与高阶（提前认脸）

函数是**一等公民**：可当参数、当返回值。

\`\`\`javascript
const nums = [1, 2, 3]
const doubled = nums.map((n) => n * 2) // map 接收函数
\`\`\`

下一课会大量用 \`map\` / \`filter\`；心智先钉死：「函数本身也是值」。

---

## 4. 闭包

**闭包** = 内层函数能访问**定义时**外层作用域里的变量（MDN / 面试常考开口）。

\`\`\`javascript
function makeCounter() {
  let n = 0
  return () => {
    n += 1
    return n
  }
}
const next = makeCounter()
console.log(next(), next()) // 1 2 —— n 被闭包保住
\`\`\`

用途：私有状态、工厂、回调里「带着」配置。  
代价：无意闭包住大对象 → 难回收；别把整个请求上下文塞进长期回调。

\`\`\`quiz
{"title":"函数 · 场景","questions":[{"q":"function f() {} 没有 return，调用 f() 得到？","choices":[{"t":"0","ok":false,"why":"不是默认数字。"},{"t":"undefined","ok":true,"why":"未交回值即为 undefined。"},{"t":"必报错","ok":false,"why":"合法。"}]},{"q":"function bump(obj) { obj.n += 1 } 传入 { n: 0 } 后外面的 n？","choices":[{"t":"仍是 0，按值拷贝了整对象","ok":false,"why":"对象按引用共享。"},{"t":"变成 1","ok":true,"why":"MDN：改对象属性对外可见。"},{"t":"语法非法","ok":false,"why":"合法且常见坑。"}]},{"q":"闭包更贴切？","choices":[{"t":"把代码压成一行","ok":false,"why":"那是压缩。"},{"t":"内层函数能访问定义时外层变量","ok":true,"why":"标准定义。"},{"t":"只存在于 TypeScript","ok":false,"why":"JS 本身就有。"}]}]}
\`\`\`

## 接到本仓

| 场景 | 函数角色 |
|------|----------|
| 插件 \`async run(e)\` | 参数是事件；副作用是回消息 |
| HTTP handler | \`(req, res)\` → \`HttpResponse.*\` |
| 工具函数 | 优先纯函数，方便测试 |

\`\`\`prompt
目标：把这段重复逻辑收成函数，保持行为不变。
现场：代码=…
约束：先起名与参数列表让我确认；不要改无关文件；补 1～2 条断言思路。
验收：调用处变短；说明返回值与副作用各是什么。
\`\`\`

## 下一步

**对象与数组** — 一次传递一包相关数据；引用坑在这里钉死。
`;

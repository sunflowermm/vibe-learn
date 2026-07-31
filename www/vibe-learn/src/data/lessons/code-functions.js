/** 函数 */
export default `# 函数

> 函数 = **起名的可复用计算**：参数 → 过程 → 返回值。  
> 插件 \`async run(e)\`、HTTP handler、\`map\` 回调——全是函数心智。

## 两种写法

\`\`\`javascript
function add(a, b) {
  return a + b
}

const add2 = (a, b) => a + b

console.log(add(1, 2), add2(1, 2))
\`\`\`

| 写法 | 备注 |
|------|------|
| \`function\` 声明 | 有函数名；提升（hoist）行为与 \`const\` 不同 |
| 箭头 \`=>\` | 常作短回调；\`this\` 词法绑定（进阶） |

\`\`\`flip
{"title":"函数翻卡","cards":[{"front":"参数","back":"调用时传入的输入"},{"front":"返回值","back":"return 交回；无 return 则为 undefined"},{"front":"副作用","back":"打印 / 写文件 / 改外部状态"},{"front":"纯函数","back":"同输入同输出、无副作用；最好测"}]}
\`\`\`

## 作用域与默认参数

\`\`\`javascript
function greet(name = 'guest') {
  const msg = \`hi, \${name}\`
  return msg
}
// msg 出不了函数
\`\`\`

- 函数内 \`const\`/\`let\` **默认出不了**函数  
- 默认参数：调用方省略时使用  
- **剩余参数**：\`function f(...args)\` 收成数组  

## 回调与高阶（提前认脸）

\`\`\`javascript
const nums = [1, 2, 3]
const doubled = nums.map((n) => n * 2) // map 接收函数
\`\`\`

「函数当值传递」= 高阶函数的日常形态；下一课数组方法会大量用到。

## 闭包（面试开口）

**闭包** = 函数能访问**定义时**外层作用域里的变量。  
常见用途：封装私有状态、工厂函数、回调里「带着」当时的配置。

\`\`\`javascript
function makeCounter() {
  let n = 0
  return () => {
    n += 1
    return n
  }
}
const next = makeCounter()
console.log(next(), next()) // 1 2；n 被闭包保住
\`\`\`

口述：定义 + 用途；追问时提「别无意间闭包住大对象导致难回收」。

\`\`\`quiz
{"title":"函数","questions":[{"q":"函数没有 return 时，调用结果通常是？","choices":[{"t":"0","ok":false,"why":"不是默认数字。"},{"t":"undefined","ok":true,"why":"没有交回值。"},{"t":"报错必崩","ok":false,"why":"可以没有 return。"}]},{"q":"闭包更贴切的说法？","choices":[{"t":"把代码压成一行","ok":false,"why":"那是压缩/混淆。"},{"t":"函数能访问定义时外层作用域的变量","ok":true,"why":"标准定义。"},{"t":"只存在于 TypeScript","ok":false,"why":"JS 本身就有。"}]},{"q":"本仓插件 run(e) 更像？","choices":[{"t":"无参数的打印脚本","ok":false,"why":"接收事件上下文。"},{"t":"收上下文、做事、可异步返回","ok":true,"why":"参数→过程→（可选）结果。"},{"t":"只能同步不能 async","ok":false,"why":"常用 async。"}]}]}
\`\`\`

## 接到本仓

| 场景 | 函数角色 |
|------|----------|
| \`plugin\` \`run(e)\` | 参数是事件；副作用是回消息 |
| HTTP handler | \`(req, res)\` → \`HttpResponse.*\` |
| 工具函数 | 优先纯函数，方便 **测试入门** |

## Coding Agent

\`\`\`prompt
目标：把这段重复逻辑收成函数，保持行为不变。
现场：代码=…
约束：先起名与参数列表让我确认；不要改无关文件；补 1～2 条断言思路。
验收：调用处变短；说明返回值与副作用各是什么。
\`\`\`

## 下一步

**对象与数组** — 一次传递一包相关数据。
`;

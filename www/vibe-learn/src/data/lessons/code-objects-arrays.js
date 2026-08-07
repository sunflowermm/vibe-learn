export default `# 对象与数组

> **数组**：有序列表（下标 0、1、2…）。**对象**：名 → 值的属性袋。  
> 口径对齐 [MDN · 使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_objects) 与 [数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)：点号 / 方括号访问；赋值共享引用；\`map\`/\`filter\` 派生新数组。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 读写 | 会 \`obj.key\` / \`obj['key']\`、\`arr[i]\`、解构与展开 |
| 引用 | 亲手验证 \`const b = a\` 改一边两边变 |
| 方法 | 会读 \`map\` / \`filter\` / \`find\`；分清 \`push\` 改原数组 |
| 跟 Agent | 审补丁是否误改共享对象 / 浅拷贝当深拷贝 |

上一课：**函数**（对象当参数会改外面）。下一课：**模块**（把函数与对象分文件）。

---

## 1. 最小动手

\`\`\`javascript
const xs = [10, 20, 30]
xs.push(40)
const doubled = xs.map((n) => n * 2)
const onlyBig = xs.filter((n) => n >= 20)

const user = { id: 1, name: 'aya' }
const { name } = user
const copy = { ...user, name: 'bob' }

console.log(doubled, onlyBig, name, copy)
\`\`\`

\`\`\`term
{"title":"数组 / 对象跑通","prompt":"$ ","steps":[{"type":"in","text":"node -e \\"const xs=[10,20]; console.log(xs.map(n=>n*2).join(','))\\""},{"type":"out","text":"20,40"}]}
\`\`\`

| 结构 | 访问 | 直觉 |
|------|------|------|
| \`[]\` 数组 | \`xs[0]\` | 有序、下标从 0 |
| \`{}\` 对象 | \`user.name\` 或 \`user['name']\` | 键 → 值；未赋值属性为 \`undefined\`（MDN） |
| 动态键 | 必须方括号 \`obj[keyVar]\` | 键名运行时才知道时 |

---

## 2. 必踩坑：引用

| 写法 | 实际 |
|------|------|
| \`const b = a\`（a 是对象/数组） | **同一份**；改 b 也改 a |
| \`{ ...obj }\` / \`[ ...arr ]\` | **浅拷贝**：第一层新容器，嵌套仍可能共享 |
| \`JSON.parse(JSON.stringify(x))\` | 简单深拷贝；丢函数、\`undefined\`、循环引用会挂 |

\`\`\`javascript
const a = { n: 1 }
const b = a
b.n = 2
console.log(a.n) // 2 —— 同一对象
\`\`\`

这与函数课「改 \`obj\` 属性对外可见」是同一机制。

---

## 3. 常用数组方法

| 方法 | 作用 | 是否改原数组 |
|------|------|----------------|
| \`map\` | 每个元素 → 新元素 | 否（返回新数组） |
| \`filter\` | 留下通过检验的 | 否 |
| \`find\` | 第一个匹配 | 否 |
| \`reduce\` | 收成单个值 | 否 |
| \`push\` / \`pop\` | 尾部增删 | **是** |

可选链 \`?.\`、空值合并 \`??\` 已在**控制流**认脸；嵌套对象读字段时常用 \`user?.profile?.name\`。

---

## 4. 动手小练习

\`\`\`javascript
const users = [
  { id: 1, name: 'aya', score: 90 },
  { id: 2, name: 'bob', score: 70 },
]
const names = users.map((u) => u.name)
const pass = users.filter((u) => u.score >= 80)
const aya = users.find((u) => u.id === 1)
console.log(names, pass, aya?.name)

const shared = users
shared.push({ id: 3, name: 'cara', score: 85 })
console.log(users.length) // 会变 —— 引用坑
\`\`\`

本机保存后 \`node\` 跑通。

\`\`\`quiz
{"title":"对象数组 · 场景","questions":[{"q":"const b = a（a 为对象）后改 b.x，a.x？","choices":[{"t":"不变，已深拷贝","ok":false,"why":"赋值共享引用。"},{"t":"一起变","ok":true,"why":"同一对象。"},{"t":"必报错","ok":false,"why":"合法。"}]},{"q":"要从用户列表抽出所有 name，优先？","choices":[{"t":"users.map(u => u.name)","ok":true,"why":"派生新数组，不改原列表。"},{"t":"for...in users 取下标再拼","ok":false,"why":"数组元素遍历优先 for...of / map。"},{"t":"JSON.stringify 再正则抠","ok":false,"why":"过度且脆。"}]},{"q":"对象展开 { ...user } 对嵌套对象会怎样？","choices":[{"t":"整棵树深拷贝","ok":false,"why":"浅拷贝，嵌套仍共享。"},{"t":"只保证第一层是新对象","ok":true,"why":"展开是浅拷贝。"},{"t":"会丢所有属性","ok":false,"why":"第一层属性会复制。"}]}]}
\`\`\`

## 接到本仓

| 场景 | 为什么重要 |
|------|------------|
| HTTP / 配置 | 载荷几乎都是对象嵌套 |
| \`HttpResponse.success\` | 普通对象字段拍平到顶层——对象心智 |
| 工具调用 / RAG 元数据 | JSON 形状；序列化边界见后续 **JSON** 课 |

## 下一步

**模块** — 把函数和对象分到多个文件（\`import\` / \`export\`）。
`;

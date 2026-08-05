export default `# 对象与数组

> **数组**：有序列表（下标 0、1、2…）。**对象**：键 → 值的表。  
> JSON、HTTP 载荷、配置片段——几乎都是二者嵌套。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 引用 | 对象/数组赋值是引用直觉 |
| 常用方法 | map/filter 等会读会用 |
| 可变性 | 知道原地改与拷贝差别 |
| 跟 Agent | 审是否误改共享对象 |


## 最小动手

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
{"title":"数组 / 对象跑通形态","prompt":"$ ","env":"练习目录（演示）","steps":[{"type":"in","text":"node -e \\"const xs=[10,20]; console.log(xs.map(n=>n*2).join(','))\\""},{"type":"out","text":"20,40"}]}
\`\`\`

\`\`\`match
{"title":"结构配对","pairs":[{"id":"a","left":"[]","right":"有序、下标访问"},{"id":"o","left":"{}","right":"键 → 值"},{"id":"m","left":"map/filter","right":"由数组派生新数组"},{"id":"s","left":"展开 ...","right":"浅拷贝/合并常用"}]}
\`\`\`

## 必踩坑：引用

| 写法 | 实际 |
|------|------|
| \`const b = a\`（a 是对象/数组） | **同一份**数据；改 b 也改 a |
| \`{ ...obj }\` / \`[ ...arr ]\` | **浅拷贝**：第一层新容器，嵌套对象仍可能共享 |
| \`JSON.parse(JSON.stringify(x))\` | 简单深拷贝；丢函数、\`undefined\`、循环引用会挂 |

\`\`\`flip
{"title":"对象数组翻卡","cards":[{"front":"JSON 能表示？","back":"对象/数组/字符串/数字/布尔/null"},{"front":"JSON 不能？","back":"函数、undefined、Symbol、循环引用"},{"front":"可选链 ?.","back":"user?.profile?.name 避免中途 undefined 崩"},{"front":"空值合并 ??","back":"仅 null/undefined 时用右侧"}]}
\`\`\`

## 常用数组方法（认脸）

| 方法 | 作用 |
|------|------|
| \`map\` | 每个元素 → 新元素，得到新数组 |
| \`filter\` | 留下通过检验的元素 |
| \`find\` | 第一个匹配 |
| \`reduce\` | 收成单个值（求和等） |
| \`push\` / \`pop\` | 尾部增删（**改原数组**） |

可变 vs 不可变：\`push\` 改原数组；\`map\` 一般返回新数组。团队风格不一，改共享状态前先想清楚。

## 和 AI 全栈的交界

| 场景 | 为什么对象/数组功底重要 |
|------|------------------------|
| 工具调用参数 | 模型吐 JSON，运行时要校验、浅拷贝、防污染 |
| RAG 元数据 | chunk payload 常是嵌套对象 |
| HttpResponse | 拍平字段、解包成功体——全是对象心智 |

\`\`\`quiz
{"title":"对象数组","questions":[{"q":"const b = a（a 为对象）后改 b.x，a.x？","choices":[{"t":"不变，已深拷贝","ok":false,"why":"赋值共享引用。"},{"t":"一起变","ok":true,"why":"同一对象。"},{"t":"必报错","ok":false,"why":"合法。"}]}]}
\`\`\`

## 接到本仓

- API / 配置：先 \`JSON\` 课看序列化  
- 插件上下文 \`e\`、\`HttpResponse.success\` 拍平字段——都是对象心智  

## 动手小练习

\`\`\`javascript
const users = [
  { id: 1, name: 'aya', score: 90 },
  { id: 2, name: 'bob', score: 70 },
]
const names = users.map((u) => u.name)
const pass = users.filter((u) => u.score >= 80)
const aya = users.find((u) => u.id === 1)
console.log(names, pass, aya?.name)
\`\`\`

本机保存后 \`node\` 跑通；再试：\`const b = users; b.push(...)\` 会不会改到原数组——亲手验证「引用」坑。

## 下一步

**模块** — 把函数和对象分到多个文件。
## 导图2 · JavaScript / JSON × 对象与数组

> 与 JSON 数据课衔接。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **JavaScript** | 结构化数据 | 对象/数组是日常 |
| **JSON** | 交换格式 | 对象字面量相近但不等同 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

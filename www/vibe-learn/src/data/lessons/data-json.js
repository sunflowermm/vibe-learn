export default `# JSON

> **JSON** = JavaScript Object Notation（「JS 对象记号」）。  
> 纯文字数据交换格式：[json.org](https://www.json.org/json-zh.html) / [MDN · JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)。  
> 聊天接口、HTTP 响应、配置片段里你会反复遇见它。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 读写 | 能手改合法 JSON；\`JSON.parse\` / \`stringify\` 跑通 |
| 边界 | 知道 JSON ≠ JS 对象字面量（更严：双引号、无注释、无尾逗号） |
| 本仓 | 能口述 \`HttpResponse.success\` 对象拍平 vs 数组进 \`data\` |
| 跟 Agent | 贴 JSON 时保持合法；parse 失败连同原始字符串一起贴 |

\`\`\`reveal
{"title":"JSON.parse 炸了会长这样","prompt":"先认 SyntaxError，再查逗号/引号","tone":"warn","face":"SyntaxError: Unexpected token } in JSON at position 8\\n    at JSON.parse (<anonymous>)\\n    at Object.<anonymous> (/home/alice/parse.js:2:27)","body":"多半是尾逗号、单引号、或注释——标准 JSON 都不允许。修好字符串再 parse；给 Agent 时连同原始字符串一起贴。"}
\`\`\`

## 先认词

| 写法 | 白话 |
|------|------|
| **键 / key** | 名字，必须双引号，如 \`"success"\` |
| **值 / value** | 数字、字符串、true/false、null、对象、数组 |
| **stringify** | 对象 → 文字（好传输） |
| **parse** | 文字 → 对象（好在程序里用） |
| **Content-Type** | HTTP 头声明身体是 JSON：\`application/json\` |

\`\`\`json
{
  "success": true,
  "message": "ok",
  "items": [1, 2]
}
\`\`\`

规则（易踩坑）：

- 键用**双引号**（单引号不行）  
- 严格 JSON：**不能写注释**、**不能末尾多逗号**  
- 字符串也是双引号  
- **没有** \`undefined\`、函数、\`NaN\`（\`stringify\` 时会丢或变 \`null\`）  

\`\`\`javascript
const text = JSON.stringify({ a: 1, skip: undefined })
const back = JSON.parse(text)
console.log(text, back)
// text 里没有 skip 键

try {
  JSON.parse('{a:1}') // 键没双引号 → 抛错
} catch (e) {
  console.error(e.message)
}
\`\`\`

| 对照 | 说明 |
|------|------|
| 为什么要文字 | 网络/文件认字节；对象要先 \`stringify\` |
| parse 失败 | 少引号、尾逗号、注释、根本不是 JSON |
| 与 JS 字面量 | 长得像，JSON 更严 |
| 美化 | \`JSON.stringify(obj, null, 2)\` |

## 接到本仓

\`HttpResponse.success\`：**普通对象**字段拍平到顶层（没有统一 \`data\` 包裹）；数组/标量才进 \`data\`。  
前端：有 \`json.data\` 用它，否则读顶层字段（见 \`unwrapSuccess\` 语义）。

\`\`\`quiz
{"title":"JSON","questions":[{"q":"严格 JSON 标准里，键名应怎样书写？","choices":[{"t":"可以不写引号","ok":false,"why":"那是 JS 对象字面量宽松写法。"},{"t":"使用双引号","ok":true,"why":"JSON 标准要求。"},{"t":"只能用单引号","ok":false,"why":"JSON 字符串也是双引号。"}]},{"q":"HttpResponse.success(res, { assessments: [] }) 前端？","choices":[{"t":"只能 json.data.assessments","ok":false,"why":"对象会拍平。"},{"t":"常在顶层读 assessments","ok":true,"why":"拍平约定。"},{"t":"一定没有 assessments","ok":false,"why":"有。"}]}]}
\`\`\`

## 下一步

**YAML** — 本仓配置模板主文字（更靠缩进）。
`;

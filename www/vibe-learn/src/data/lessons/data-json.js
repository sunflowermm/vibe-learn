/** JSON */
export default `# JSON

> **JSON** = JavaScript Object Notation（「JS 对象记号」）。  
> 它是一种**纯文字**格式：用 \`{}\` \`[]\` 描述数据，很多语言都能读写。  
> 聊天接口、HTTP 响应、配置片段里你都会反复遇见它。

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

\`\`\`flip
{"title":"JSON 翻卡","cards":[{"front":"为什么要文字？","back":"网络和文件只认字节/文字；对象要先变成文字再传"},{"front":"parse 失败？","back":"多半少引号、尾逗号、或根本不是 JSON"},{"front":"和 JS 对象字面量","back":"长得像，但 JSON 更严（键必须双引号）"},{"front":"美化","back":"JSON.stringify(obj, null, 2) 缩进两格"}]}
\`\`\`

\`\`\`match
{"title":"JSON 配对","pairs":[{"id":"s","left":"stringify","right":"对象 → 字符串"},{"id":"p","left":"parse","right":"字符串 → 对象"},{"id":"h","left":"HTTP JSON","right":"Content-Type: application/json"},{"id":"flat","left":"本仓 success 对象","right":"字段常拍平到顶层"}]}
\`\`\`

## 接到本仓

\`HttpResponse.success\`：**普通对象**字段拍平到顶层（没有统一 \`data\` 包裹）；数组/标量才进 \`data\`。  
前端：有 \`json.data\` 用它，否则读顶层字段（见 \`unwrapSuccess\` 语义）。

\`\`\`quiz
{"title":"JSON","questions":[{"q":"严格 JSON 里键名应？","choices":[{"t":"可以不写引号","ok":false,"why":"那是 JS 对象字面量宽松写法。"},{"t":"使用双引号","ok":true,"why":"JSON 标准要求。"},{"t":"只能用单引号","ok":false,"why":"JSON 字符串也是双引号。"}]},{"q":"HttpResponse.success(res, { assessments: [] }) 前端？","choices":[{"t":"只能 json.data.assessments","ok":false,"why":"对象会拍平。"},{"t":"常在顶层读 assessments","ok":true,"why":"拍平约定。"},{"t":"一定没有 assessments","ok":false,"why":"有。"}]}]}
\`\`\`

## 下一步

**YAML** — 本仓配置模板主文字（更靠缩进）。
`;

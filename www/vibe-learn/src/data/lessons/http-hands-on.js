/** HTTP 动手 */
export default `# HTTP 动手

> 第三章讲清了协议；本课用**一次请求**把方法、状态码、JSON 体串起来。  
> 先认词，再进模拟终端，最后对照本仓。

## 先认词

| 写法 | 白话 |
|------|------|
| **HTTP** | 浏览器/程序访问网址、调用接口时用的「对话规矩」 |
| **URL** | 地址，如 \`https://httpbin.org/get\` |
| **方法 / GET** | 这次请求想干什么；**GET** ≈ 读取（约定无副作用） |
| **状态码** | 三位数结果：\`200\` 一类表示成功，\`404\` 找不到，\`500\` 服务器出错 |
| **响应头 / Header** | 元信息（类型、长度…）；\`Content-Type\` 说明体是什么格式 |
| **JSON** | 花括号键值文字，接口最常见的身体格式 |
| **curl** | 终端里发 HTTP 请求的小工具（本课练手） |
| **API** | Application Programming Interface：给程序调用的接口，不是给人点的网页 |

\`\`\`flip
{"title":"HTTP 翻卡","cards":[{"front":"200","back":"成功一类（还可更细）"},{"front":"Content-Type: application/json","back":"身体按 JSON 解析"},{"front":"curl -I","back":"主要看响应头/状态行"},{"front":"curl -sS","back":"安静输出身体；出错仍提示"}]}
\`\`\`

## 通关目标

1. 用模拟窗或本机 \`curl\` 打一次请求  
2. 说出：方法、URL、状态码、身体是不是 JSON  
3. 对照本仓：成功响应里 \`success\` / \`message\` 与业务字段  

---

## 0. 先动手：模拟终端

> 不上真网；输出是假的，但形状和真响应很像。

\`\`\`shell
{"preset":"curl-get"}
\`\`\`

---

## 1. 本机也可再试一次

\`\`\`bash
curl -sS -D - -o body.txt https://httpbin.org/get
\`\`\`

- \`-D -\`：把响应头打到屏幕  
- \`-o body.txt\`：身体存文件  
看状态行与 \`Content-Type\`，再打开 \`body.txt\`。

\`\`\`javascript
const res = await fetch('https://httpbin.org/get', {
  signal: AbortSignal.timeout(8000),
})
console.log(res.status, res.headers.get('content-type'))
console.log(await res.json())
\`\`\`

---

## 2. 和本仓 API 的对照

| 概念 | 本仓落点 |
|------|----------|
| 路由 + handler | \`core/*/http/*.js\`（放处理函数的文件） |
| 统一成功/失败 | \`HttpResponse\`（\`#utils/http-utils.js\`） |
| 鉴权 | \`X-API-Key\` 等（见 **HTTP 认证**） |
| 静态页 | \`www/<应用>/\` + \`sign.json\` |

**前端解包**：普通对象成功时字段在**顶层**拍平，不要默认 \`json.data.xxx\`。

\`\`\`match
{"title":"HTTP 动手配对","pairs":[{"id":"m","left":"GET","right":"读资源（无副作用约定）"},{"id":"s","left":"2xx","right":"成功类状态"},{"id":"j","left":"application/json","right":"体是 JSON 文字"}]}
\`\`\`

\`\`\`quiz
{"title":"HTTP 动手","questions":[{"q":"看到 Content-Type: application/json 时，身体通常？","choices":[{"t":"是一张图片","ok":false,"why":"图片会是 image/…"},{"t":"应按 JSON 键值去读","ok":true,"why":"类型头告诉你怎么解析。"},{"t":"表示请求失败","ok":false,"why":"类型与成败无关；看状态码。"}]}]}
\`\`\`

## Coding Agent 协作

可复制：

\`\`\`
目标：写一段 Node 脚本，用 fetch + AbortSignal.timeout(8000) 请求 https://httpbin.org/get，打印 status 与 JSON 前几字段。
现场：我在仓库外练习目录即可；Node 版本=…
约束：不要引入 node-fetch；解释本仓 HttpResponse.success 普通对象为何字段在顶层。
验收：脚本可 node 跑通；口述前端解包时为何不能默认 json.data。
\`\`\`

## 下一步

**反向代理 / Nginx** 或 **第四章 HTTP 与 www**。
`;

/** HTTP、状态码、缓存、Cookie/Session、CORS — 对齐课件 Web 相关页 */
export default `# HTTP 与 Web 基础

> **HTTP（超文本传输协议）** 是浏览器与 Web 服务器之间最常用的应用层协议，通常跑在 TCP 之上。

## 请求与响应长什么样

**请求示例：**

\`\`\`
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
\`\`\`

**响应示例：**

\`\`\`
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>
\`\`\`

### 常见方法

| 方法 | 直觉 | 常考点 |
|------|------|--------|
| GET | 获取资源 | 常幂等、可缓存 |
| POST | 提交数据（新建/提交表单等） | 默认非幂等；支付勿盲目重试 |
| PUT | 更新 / 替换 | 常幂等（整资源） |
| DELETE | 删除 | 常幂等 |
| PATCH | 部分更新 | 是否幂等看实现 |
| HEAD / OPTIONS | 取头 / 预检 | CORS 预检常用 OPTIONS |

## HTTP 状态码（五大类）

\`\`\`flip
{"title":"状态码翻卡","caption":"先想「谁的锅」，再翻面核对。","cards":[{"front":"404","back":"客户端要的资源服务器说没有"},{"front":"401","back":"未认证 / 缺凭证"},{"front":"403","back":"已识别但禁止访问"},{"front":"502","back":"网关/反代后面的上游出问题"},{"front":"304","back":"协商缓存：内容未改，用本地副本"}]}
\`\`\`

\`\`\`match
{"title":"HTTP 方法配对","pairs":[{"id":"get","left":"GET","right":"获取资源；常幂等、可缓存"},{"id":"post","left":"POST","right":"提交数据；默认非幂等"},{"id":"put","left":"PUT","right":"整资源替换；常幂等"},{"id":"options","left":"OPTIONS","right":"CORS 预检等探测"}]}
\`\`\`


| 类 | 含义 | 例子 |
|----|------|------|
| **1xx** | 信息 | 较少直接关心 |
| **2xx** | 成功 | \`200 OK\`、\`201 Created\`、\`204 No Content\` |
| **3xx** | 重定向 / 缓存相关 | \`301\` 永久、\`302\` 临时、\`304 Not Modified\` |
| **4xx** | 客户端错误 | \`400\`、\`401\`、\`403\`、\`404\` |
| **5xx** | 服务器错误 | \`500\`、\`502 Bad Gateway\`、\`503\` |

> \`404\` = 你要的页面服务器说没有；\`502\` = 网关/代理后面的上游出问题——和「反代」场景很常一起出现。

## HTTP 缓存（强缓存 vs 协商缓存）

目的：少打网、加快打开速度。

### 强缓存（未过期可不打服务器）

- \`Cache-Control\`：如 \`max-age=3600\`、\`no-cache\`、\`no-store\`、\`private\`/\`public\`  
- \`Expires\`：绝对过期时间（老标准，优先级通常低于 Cache-Control）  

流程直觉：请求 → 本地缓存未过期 → 直接用（常显示 from cache）。

### 协商缓存（要问服务器「变了没」）

| 机制 | 依据 | 结果 |
|------|------|------|
| Last-Modified / If-Modified-Since | 修改时间 | 没变常回 \`304\` |
| ETag / If-None-Match | 内容指纹 | 更精确，常优先 |

流程：带验证头 → 服务器判断 → \`304\`（用缓存）或 \`200\`（新内容）。

> 记忆：强缓存直接用；协商缓存要验证；ETag 往往比时间戳更靠谱。

## Cookie vs Session

| | Cookie | Session |
|--|--------|---------|
| 存哪 | 浏览器（客户端） | 服务器 |
| 大小 | 很小（约 4KB 级） | 相对灵活 |
| 安全 | 可被脚本读（除非限制） | 内容在服务端，相对可控 |
| 寿命 | 可设过期 | 会话结束或超时 |

### Session 常见配合方式

1. 服务器创建 Session，生成 SessionID  
2. 通过 Cookie 把 SessionID 交给浏览器  
3. 之后请求带着这个 ID  
4. 服务器用 ID 找回 Session 数据  

**Cookie 重要属性（安全相关）：**

- \`HttpOnly\`：JS 读不到，降低 XSS 偷 Cookie 风险  
- \`Secure\`：仅 HTTPS 发送  
- \`SameSite\`：缓解 CSRF  
- \`Domain\` / \`Path\`：作用范围  

> 面试常记：Cookie 在客户端，Session 在服务器；SessionID 常靠 Cookie 传递。

## CORS 跨域

浏览器同源策略：协议、域名、端口**任一不同**，就算跨域。跨域时，浏览器会按规则限制前端读响应。

### 两类请求直觉

1. **简单请求**：如部分 GET/POST + 简单头；带 \`Origin\`，服务器用 \`Access-Control-Allow-Origin\` 等放行  
2. **预检（OPTIONS）**：复杂方法/自定义头等，先问服务器允不允许，再发真请求  

### 常见解决思路

- 服务端正确配置 CORS 响应头  
- 开发时用**同源代理**转发（本质常是反代）  
- JSONP（老方案，基本仅 GET）  
- \`postMessage\`（窗口间）等  

配置示例字段：

\`\`\`
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 3600
\`\`\`

（生产环境 \`*\` 与凭证组合有限制，入门先理解「服务器明确允许哪些来源」。）

---

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **幂等（Idempotent）** | 同一个操作执行多次，资源最终状态与执行一次相同，不会产生额外副作用。 | GET 查订单、PUT 全量更新、DELETE 删除应设计成幂等；支付回调必须幂等，防止重复扣款。 | 幂等 ≠ 「可以无限重试无副作用」；POST 创建可能每次多一条记录，通常不幂等。 |
| **安全方法（Safe HTTP Methods）** | 语义上不应改变服务器资源状态的 HTTP 方法，如 GET、HEAD、OPTIONS。 | 爬虫、CDN、浏览器 prefetch 可能重复 GET，后端不应在 GET 里偷偷改数据库。 | 安全方法 ≠ 需要登录；GET 仍可能返回私密数据，要靠鉴权保护。 |
| **Keep-Alive / 长连接（Persistent Connection）** | 在一个 TCP 连接上连续发送多个 HTTP 请求/响应，避免反复三次握手。 | 高 QPS API、Nginx 反代要开 \`proxy_http_version 1.1\` 和 \`Connection ""\`；短连接压测会把 TIME_WAIT 打满。 | HTTP 长连接 ≠ WebSocket；前者仍是一问一答为主，后者全双工。 |
| **HTTP/1.1 · HTTP/2 · HTTP/3** | 三代 HTTP：1.1 队头阻塞、2 多路复用单连接、3 基于 QUIC(UDP) 进一步减延迟。 | 生产站点常见 1.1/2 混用；Chrome 对很多站走 HTTP/3；升级主要收益在弱网与多资源页面。 | HTTP 版本 ≠ TLS 版本；HTTP/2 仍需 TLS（浏览器实践上），但协议层是不同东西。 |
| **短轮询 / 长轮询 / WebSocket（Polling / Long Polling / WebSocket）** | 短轮询：定时问有没有新消息；长轮询：服务器挂起直到有消息；WebSocket：建立全双工长连接推送。 | 消息未读数可用短轮询；IM 在线状态用 WebSocket；选型看实时性与服务器连接数成本。 | 长轮询 ≠ WebSocket；前者仍是 HTTP 请求/响应循环，后者换协议升级。 |
| **401 vs 403（Unauthorized vs Forbidden）** | 401 表示未认证或凭证无效；403 表示已认证但权限不够访问该资源。 | Token 过期、Cookie 丢了返回 401，前端跳登录；登录了但不是管理员访问 \`/admin\` 返回 403。 | 401 要「你是谁」；403 是「我知道你是谁，但你不能」。 |
| **502 / 504（Bad Gateway / Gateway Timeout）** | 502 是网关收到无效/错误的上游响应；504 是网关等上游超时。 | Nginx 反代后 Node 进程挂了常见 502；后端处理超过 \`proxy_read_timeout\` 常见 504。 | 502/504 是网关说的；源站应用自己返回的 500 不会变成 502，除非前面还有一层网关。 |
| **JWT vs Session（JSON Web Token vs 服务端会话）** | JWT 把声明签在令牌里，服务端可无状态校验；Session 把状态存在服务端，用 session id 关联。 | 微服务横向扩容爱 JWT；要强踢下线、即时失效用 Redis Session 更顺手。 | JWT 不是「加密用户名」；默认只是签名防篡改，payload 可 base64 解码看见。 |
| **CSRF / XSS（Cross-Site Request Forgery / Cross-Site Scripting）** | CSRF：诱使用户浏览器带上 Cookie 发恶意请求；XSS：把恶意脚本注入页面偷数据或冒充用户操作。 | Cookie 设 \`SameSite\`、\`HttpOnly\`；富文本入库要消毒；CORS 不能替代 CSRF 防护（Cookie 同站仍会带）。 | CSRF 利用「浏览器自动带 Cookie」；XSS 是「你的页面执行了别人的脚本」。 |

业务一条链：浏览器跨域调 API → CORS 或同源反代 → Cookie/JWT 鉴权 → 缓存头影响「改了配置怎么还不生效」。

## HTTP 版本（对照常见入门教程）

| 版本 | 要点 | 对调 LLM API 的直觉 |
|------|------|---------------------|
| **HTTP/1.1** | 持久连接（Keep-Alive），同连接多请求；仍可能队头阻塞 | 多数 SDK 默认走 HTTPS/1.1 或由运行时协商 |
| **HTTP/2** | 二进制分帧、**多路复用**，单连接并行流 | 网关/CDN 支持时可降延迟；业务仍是请求-响应 |
| **HTTP/3** | 基于 **QUIC（UDP）**，弱网更稳、建连更快 | 客户端与边缘是否启用决定你能不能吃到红利 |

> 参考：[菜鸟教程 · HTTP](https://www.runoob.com/http/http-tutorial.html) 对「请求-响应 / 方法 / 状态码 / 版本」的分层讲法。  
> **AI 全栈**：云端 Chat Completions、许多远程 MCP 出口，本质都是 **HTTPS 上的应用层请求**——先会读状态码与鉴权，再谈提示词。

\`\`\`quiz
{"title":"HTTP 与调模型","questions":[{"q":"调模型 API 返回 401，优先查？","choices":[{"t":"API Key / Bearer 是否有效","ok":true,"why":"401 是未认证或凭证无效。"},{"t":"立刻换更大参数模型","ok":false,"why":"与鉴权无关。"},{"t":"删除向量库","ok":false,"why":"请求都未通过鉴权。"}]}]}
\`\`\`

## 下一步

**反向代理与 CDN**（入口工程化）；第四章 **HTTP 与 www**。
`;


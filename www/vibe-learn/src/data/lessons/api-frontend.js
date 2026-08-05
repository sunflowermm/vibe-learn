export default `# API 与前后端

> **API（Application Programming Interface，应用程序编程接口）** 是一组定义和协议，规定软件之间**如何交换数据**：能做什么、怎么请求、返回什么格式。  
> **学会之后**：能说明前后端分界常落在 HTTP API，并对照 REST/RPC/WebSocket。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分界 | 浏览器/客户端 ↔ HTTP API ↔ 服务 |
| 风格 | REST / RPC / WebSocket 各一句适用场景 |
| CORS | 浏览器跨源限制；服务端要配合，≠ 鉴权 |
| 本仓 | \`core/*/http\` 与 \`www/\` 分层；业务不进 Runtime |
| 跟 Agent | 要接口时写清路径、方法、鉴权与成功响应形状 |

## 知识串

| 将学到的网络词 | 和本课的关系 |
|----------------|--------------|
| **HTTP** | 多数 Web API 的「运输语言」 |
| **前端 / 后端** | 谁发起请求、谁提供 API |
| **JSON** 等 | 常见响应身体格式（正文稍后会碰到） |
| 第四章 XRK | \`core/*/http\` 就是在提供后端 API |

先建立「菜单」直觉，再进协议栈与 HTTP 细节。

\`\`\`algo
{"kind":"mwchain","title":"API 分界 · 请求怎么穿过后端","autoplay":true,"speed":800,"data":{"layers":[{"id":"fe","name":"前端/客户端","sub":"发起请求"},{"id":"http","name":"HTTP","sub":"方法 · 路径 · 头"},{"id":"api","name":"后端 API","sub":"业务 · 鉴权"},{"id":"data","name":"数据层","sub":"DB / 缓存"},{"id":"res","name":"响应","sub":"JSON 等"}]}}
\`\`\`

## API 的本质

\`\`\`match
{"title":"API / 前后端配对","pairs":[{"id":"api","left":"API","right":"程序之间约定好的调用界面"},{"id":"fe","left":"前端","right":"靠近用户的展示与交互"},{"id":"be","left":"后端","right":"业务、数据、权限与集成"},{"id":"http","left":"HTTP API","right":"用请求/响应交换 JSON 等载荷"}]}
\`\`\`

**现实类比**：API 像餐厅菜单——告诉顾客（客户端）可以点什么、怎么点、会端上什么；后厨怎么炒不用你管。

- **接口定义**：能做什么、怎么做、返回什么  
- **标准化通信**：统一的请求 / 响应格式  
- **封装复杂性**：隐藏实现细节，只暴露必要能力  

### 常见 API 类型

| 类型 | 特点 | 典型场景 |
|------|------|----------|
| **REST** | 基于 HTTP，用 URL + GET/POST/PUT/DELETE | Web、移动端、微服务 |
| **GraphQL** | 客户端声明要哪些字段 | 复杂查询、减少多余数据 |
| **WebSocket** | 双向长连接、实时推送 | 聊天、行情、协作 |
| **gRPC** | 高性能 RPC，常用 Protobuf | 微服务内部通信 |

### REST 请求长什么样（直觉）

\`\`\`
客户端：GET /api/users/123
服务器：查 ID=123 → 返回 200 + { "id": 123, "name": "张三" }
\`\`\`

> 核心理解：API = 软件之间的「菜单」，用来跨系统协作。

---

## 前端 vs 后端

| | 前端（Frontend） | 后端（Backend） |
|--|------------------|-----------------|
| 在哪跑 | 浏览器 / App 界面 | 服务器上 |
| 你看到吗 | 看得到、点得到 | 通常看不到 |
| 典型技术 | HTML / CSS / JavaScript | Node.js、Python、Java… |
| 职责 | UI、交互、展示、客户端校验 | 业务逻辑、数据库、API、安全 |

**一条完整链路：**

\`用户操作 → 前端 → HTTP 请求 → 后端 → 数据库 → 响应 → 前端显示\`

---

## 客户端–服务器模型

分布式里最常见的架构：**客户端发起请求，服务器处理并返回响应**。这是 Web 的基础。

| 角色 | 含义 |
|------|------|
| **客户端（Client）** | 请求发起者（浏览器、App） |
| **服务器（Server）** | 请求处理者（提供网页、API、数据） |

### 打开网页的五步（再记一遍）

1. 用户在浏览器输入 URL  
2. 浏览器发出 HTTP 请求  
3. 服务器处理  
4. 返回 HTML / CSS / JS 等  
5. 浏览器渲染成你看到的页面  

同一台机器也可既是客户端又是服务器（角色相对，不是「服务器更高级」）。

---

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **B/S · C/S（Browser/Server · Client/Server，浏览器/服务器 · 客户端/服务器）** | B/S 用浏览器当客户端访问服务器；C/S 要安装独立客户端程序再连服务器。 | 本仓 \`/vibe-learn\` 管理台是 B/S；微信 PC 版、游戏启动器是 C/S。 | B/S 底层仍是 C/S 架构；只是客户端被浏览器统一了。 |
| **REST（Representational State Transfer，表述性状态转移）** | 一种 API 设计风格：用 URL 表示资源，用 HTTP 方法表示动作，状态无保存在服务端会话里。 | \`GET /orders/1\` 查订单、\`PATCH /orders/1\` 改状态；忌 \`/getOrder?id=1\` 动词堆在 URL 里。 | REST 不是协议；是约定。GraphQL 是另一种 API 风格，不是 REST 的升级版协议。 |
| **同步 vs 异步 API（Synchronous vs Asynchronous API）** | 同步：请求后立刻在同一响应里给最终结果；异步：先返回任务 ID，客户端再轮询或回调取结果。 | 导出百万行报表、视频转码走异步任务队列；查单条用户信息用同步 JSON 即可。 | 异步 API ≠ WebSocket；异步常仍是 HTTP 202 + 轮询，WS 是推送通道。 |
| **RPC（Remote Procedure Call，远程过程调用）** | 像调本地函数一样调远程服务，参数序列化后发送，对方执行再返回。 | 内网微服务用 gRPC/Thrift 高性能互调；对外开放平台仍多用 REST + OpenAPI 文档。 | RPC ≠ 「比 REST 高级」；REST 偏资源与 HTTP 语义，RPC 偏过程调用。 |
| **WebSocket** | 在单个 TCP 连接上建立全双工通道，服务器可主动推消息给浏览器。 | IM 聊天、协同编辑、实时行情；部署时常仍经 Nginx 反代升级协议，注意超时与粘滞。 | WebSocket ≠ SSE（Server-Sent Events）；SSE 是服务器单向推，基于 HTTP。 |
| **OpenAPI / Swagger** | 用 YAML/JSON 描述 HTTP API 的路径、参数、响应结构的开放规范，Swagger 是常用工具链名。 | 前后端并行开发：先定 OpenAPI，再生成 Mock 与客户端 SDK；联调少扯皮。 | OpenAPI 描述 HTTP API；gRPC 用 Protobuf 与 .proto，不是同一套文档格式。 |
| **API 网关（API Gateway）** | 所有对外 API 的统一入口，集中做鉴权、限流、路由、协议转换、灰度。 | 用户只访问 \`api.example.com\`，网关把 \`/pay\` 转到支付服务、\`/user\` 转到用户服务。 | 网关 ≠ 纯反向代理；网关通常带鉴权配额、开发者门户等 API 产品能力。 |
| **GraphQL（可选对照）** | 客户端用单一端点 + 查询语言精确索取需要的字段，减少 over-fetch。 | 移动端流量贵时只拉 \`user { name avatar }\`；服务端要防复杂查询打爆 DB。 | GraphQL ≠ REST 的替代品 everywhere；简单 CRUD REST 往往更省事。 |

业务一条链：前端 →（可选网关）→ 后端 API → DB；实时能力另开 WebSocket；对内高频微服务调用可用 gRPC 等 RPC。

## 下一步

对照 **HTTP 与 Web** 看请求方法与状态码；对照 **反向代理** 看「门面」如何转发 API；对照第四章 **HTTP 与 www** 看本仓 \`core/*/http\` + \`www/\`。
`;

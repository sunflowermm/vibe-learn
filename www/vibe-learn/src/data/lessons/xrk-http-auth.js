export default `# HTTP Auth · API Key

> 主服**不会**在 Server 层对全部 \`/api/*\` 做统一拦截；经 **HttpApi** 注册且路径以 \`/api/\` 开头时，基础设施**默认**校验系统 API Key。  
> 权威：\`docs/AUTH.md\`；实现：\`runtime-auth.js\` / \`auth.js\` / \`http.js\`。  
> **学会之后**：能说明 API Key / runtime-auth 心智，并避免把密钥写进仓。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 鉴权 | 敏感接口服务端再判 |
| 密钥 | 环境/密钥库；不进 Git |
| 文档 | docs/AUTH.md |
| 跟 Agent | 审 diff 有无关掉鉴权 |

\`\`\`algo
{"kind":"authgate","title":"带 Key 过门 · 成功","autoplay":true,"speed":900,"data":{"mode":"ok"}}
\`\`\`

\`\`\`algo
{"kind":"authgate","title":"缺 Key / 错 Key · 401","autoplay":false,"speed":900,"data":{"mode":"fail"}}
\`\`\`

\`\`\`algo
{"kind":"authgate","title":"本机 loopback 常见免鉴权","autoplay":false,"speed":900,"data":{"mode":"loopback"}}
\`\`\`

## 本课你要带走什么

\`\`\`quiz
{"title":"鉴权快测","questions":[{"q":"多数 /api/* 业务路由的鉴权默认在哪一层？","choices":[{"t":"Server 对全部路径统一拦截","ok":false,"why":"Server 不做全盘 /api 拒答。"},{"t":"HttpApi 注册且 /api/ 时默认校验","ok":true,"why":"ensureSystemCoreAuth → checkApiAuthorization。"},{"t":"每个 Core handler 必须手写","ok":false,"why":"一般不必在 handler 里重复。"},{"t":"只校验 www 静态文件扩展名","ok":false,"why":"静态常放行；鉴权针对 /api 业务路由。"}]}]}
\`\`\`

1. Server 层 vs HttpApi 层 vs 业务 handler 的职责划分  
2. 请求如何携带 Key（\`X-API-Key\` 等）  
3. loopback 免鉴权与 \`tools.file.runEnabled\` 强制鉴权的例外  
4. 实践：带 Key 调健康检查或业务 API

---

## 1. 分层表
\`\`\`match
{"title":"鉴权配对","pairs":[{"id":"tok","left":"令牌 / Session","right":"证明「你是谁」"},{"id":"rbac","left":"授权","right":"证明「你能做什么」"},{"id":"http","left":"HTTP 层","right":"中间件/守卫统一拦"}]}
\`\`\`


| 层级 | 职责 |
|------|------|
| **Server**（\`agent-runtime.js\`） | 速率限制、Body、静态资源；静态扩展名放行；**不做**全盘 \`/api\` 统一拒答 |
| **HttpApi**（\`infrastructure/http/http.js\`） | \`/api/*\` 默认 \`ensureSystemCoreAuth\` → \`checkApiAuthorization\` |
| **system-Core / 其它 Core 路由** | 定义 path/handler；一般**不必**在 handler 里重复鉴权 |
| **非 HttpApi / 非 /api** | 需自管；可调 \`AgentRuntime.checkApiAuthorization\` 或 \`ensureSystemCoreAuth\` |

\`\`\`mermaid
flowchart TB
  Req[HTTP 请求] --> Static{静态资源?}
  Static -->|是| Pass[放行]
  Static -->|否| Route[路由到 Handler]
  Route --> API{HttpApi 且 /api/?}
  API -->|是且 systemAuth| Auth[runtime-auth 比对 Key]
  API -->|systemAuth:false| H[handler]
  Auth -->|通过| H
  Auth -->|失败| E401[401]
\`\`\`

WebSocket：\`AgentRuntime.wsf\` 经 \`runtime-ws\`；远程默认要 Key；\`skipAuth: true\` 交给 Tasker 自管。

---

## 2. Key 从哪来、怎么带

| 项 | 说明 |
|----|------|
| **密钥文件** | \`server.auth.apiKey.file\`（如 \`config/server_config/api_key.json\` 的 \`key\`）；未配置则启动生成 |
| **请求头** | \`X-API-Key\`；或 \`Authorization: Bearer|Token|ApiKey\`；或 \`X-Auth-Token\` / \`X-Access-Token\` / \`Api-Key\` |
| **查询 / Body** | \`api_key\` 等兼容字段（见 AUTH.md 列表） |
| **比对** | \`crypto.timingSafeEqual\` 常量时间比较 |

### loopback 与危险工具

- 一般 **\`127.*\` / \`::ffff:127.*\`** 来源免鉴权  
- 若 \`ai-workflow.tools.file.runEnabled === true\`，loopback **也强制** Key（可用配置显式关闭，不推荐）  
- 内网段（\`192.168.*\` 等）**不会**自动免鉴权  

公开接口：路由上设 \`systemAuth: false\`。

---

## 3. 本仓路径

| 文件 | 角色 |
|------|------|
| \`docs/AUTH.md\` | 本课真源 |
| \`src/infrastructure/http/runtime-auth.js\` | 实际比对 |
| \`src/infrastructure/http/auth.js\` | loopback / tools 策略、\`ensureSystemCoreAuth\` |
| \`src/infrastructure/http/http.js\` | \`systemAuth\` 默认包装 |
| \`src/agent-runtime.js\` | \`checkApiAuthorization\` 薄包装 |
| \`core/system-Core/http/*.js\` | 系统路由定义 |

业务 HTTP 形状仍走 \`HttpResponse\`（\`docs/http-api.md\` / 开发约定）——鉴权通过后才谈成功 JSON 形状。

---

## 4. 实践清单

1. 打开 \`config/server_config/api_key.json\`（或配置指向的文件），复制 \`key\`（勿提交到公开仓库）。  
2. 本机请求健康检查：  
   \`\`\`bash
   curl -s http://127.0.0.1:<端口>/api/health
   \`\`\`  
   loopback 下通常可通；再从非 127 地址或关免鉴权场景验证。  
3. 带 Key：  
   \`\`\`bash
   curl -s -H "X-API-Key: <key>" http://<主机>:<端口>/api/health
   \`\`\`  

> 模拟窗只演示 curl 形态（**假响应**）；真实 Key 与端口以本机配置为准。

\`\`\`shell
{"preset":"curl-auth"}
\`\`\`

4. 读任意 \`system-Core/http\` 路由，确认未手写重复鉴权；找一个 \`systemAuth: false\` 的公开对照（若有）。

---

## 5. 文档链接

- \`docs/AUTH.md\`  
- \`docs/http-api.md\` · \`docs/runtime-surface.md\`  
- \`docs/ai-workflow.md\`（\`tools.file.runEnabled\`）

## 下一步

**HTTP / www**（接口与页面）· **MCP 运维**（同样可能经 HTTP/WS 鉴权）· **实践·最小插件**（消息链不经 HTTP Key，但管理 API 要）。  
安全默认：远程必带 Key，公开面显式关闭并最小化。
`;

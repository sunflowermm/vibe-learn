export default `# 实践课 · 最小 HTTP API

> 目标：在 Core 的 \`http/\` 下放一个最小接口，用 \`HttpResponse\` 返回 JSON，并会用 \`curl\` 验证。  
> 真源：\`docs/base-classes.md\` · \`docs/http-api.md\` · skill \`xrk-http-api\`。
> **学会之后**：能加一个最小 HTTP handler 并用 HttpResponse 返回。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 位置 | core/*/http/ |
| 响应 | HttpResponse.success 拍平规则 |
| 鉴权 | 敏感接口接 Auth 课 |
| 验收 | curl 看到 success 与字段 |


## 本课你要带走什么

1. **推荐对象导出**（Loader 包装为 HttpApi），不是一上来就继承类  
2. \`HttpResponse.success\`：普通对象**字段拍平**；数组/标量进 \`data\`  
3. \`/api/*\` 默认 \`systemAuth\`；本地验收要带 Key 或显式 \`systemAuth: false\`  
4. handler 第三参是裸名 \`AgentRuntime\`（与 \`req.agentRuntime\` 等价）

---

## 1. 通关清单

\`\`\`check
{"title":"最小 HTTP 通关","items":[{"id":"dir","text":"文件在 core/*/http/","hint":"HttpApiLoader 能扫到"},{"id":"export","text":"对象导出 name + routes","hint":"见 base-classes"},{"id":"flat","text":"success 对象字段在顶层（非默认 json.data）","hint":"HttpResponse 拍平"},{"id":"auth","text":"鉴权策略明确（Key 或 systemAuth:false）","hint":"/api 默认要 Key"},{"id":"curl","text":"curl 看到 success 与业务字段","hint":"本地可复制命令"}]}
\`\`\`


| # | 步骤 | 完成标准 |
|---|------|----------|
| 1 | 选定 \`core/<core>/http/\` | HttpApiLoader 扫描到文件 |
| 2 | **对象导出** \`name\` + \`routes\` | 对齐 \`docs/base-classes.md\` HttpApi 节 |
| 3 | \`HttpResponse.success(res, { hello: 'lab' })\` | JSON 含 \`success\`、\`message\`、顶层 \`hello\` |
| 4 | 鉴权 | 公开路由设 \`systemAuth: false\`；或带 API Key 打 \`/api/...\` |
| 5 | \`curl -sS\` | 看到拍平字段；**不要**默认读 \`json.data.hello\` |

\`\`\`steps
{"title":"HTTP 实验","steps":[{"title":"放对目录","body":"core/*/http/*.js"},{"title":"对象导出","body":"推荐 export default { name, routes }"},{"title":"统一响应","body":"HttpResponse；普通对象拍平"},{"title":"鉴权","body":"/api 默认要 Key；实验室可 systemAuth:false"}]}
\`\`\`

---

## 2. 最小骨架（推荐）

\`\`\`javascript
import { HttpResponse } from '#utils/http-utils.js'

export default {
  name: 'hello-lab-api',
  priority: 100,
  routes: [
    {
      method: 'GET',
      path: '/api/lab/hello',
      // 实验室可临时关闭；正式接口默认走系统 API Key
      systemAuth: false,
      handler: async (req, res, AgentRuntime) => {
        return HttpResponse.success(res, { hello: 'lab' }, 'ok')
      },
    },
  ],
}
\`\`\`

| 要点 | 说明 |
|------|------|
| 对象导出 | 复杂再考虑 \`extends HttpApi\`；日常用对象即可 |
| 导入 | 无 Core \`package.json\` 用 \`#utils/http-utils.js\`；有则相对路径到根 \`src/\` |
| 勿混用 | 不要 \`res.json({...})\` 与 \`HttpResponse\` 混用 |
| 拍平 | \`{ hello: 'lab' }\` → 顶层有 \`hello\`；\`success(res, list)\` 才进 \`data\` |

验收示例：

\`\`\`bash
curl -sS "http://127.0.0.1:<端口>/api/lab/hello"
# 期望含 "success":true 与 "hello":"lab"（顶层）
\`\`\`

---

## 3. 常见失败

| 现象 | 排查 |
|------|------|
| 401 / 未授权 | \`/api/\` 默认鉴权；加 Key 或 \`systemAuth: false\` |
| 前端 \`json.data.hello\` 为空 | 对象成功响应**没有**统一 \`data\` 包一层 |
| 路由未出现 | 是否在 \`http/\`；热更/重启；\`enable\` |
| \`#utils\` 解析失败 | Core 有 \`package.json\` 却用了 \`#\` |

\`\`\`quiz
{"title":"最小 HTTP","questions":[{"q":"本仓日常新增 HTTP 接口，更推荐？","choices":[{"t":"core/*/http 对象导出 { name, routes }，handler 用 HttpResponse","ok":true,"why":"Loader 包装为 HttpApi；对齐 base-classes。"},{"t":"必须改 src/infrastructure/http 才能注册路由","ok":false,"why":"业务不进 Runtime。"},{"t":"只用 res.json 自定义外壳即可","ok":false,"why":"应统一 HttpResponse。"},{"t":"接口只能写在 www/ 静态目录","ok":false,"why":"API 在 http/；www 是前端。"}]},{"q":"HttpResponse.success(res, { hello: 'lab' }) 后，前端应？","choices":[{"t":"读顶层 hello（或 unwrapSuccess），勿默认假定 json.data.hello","ok":true,"why":"普通对象拍平到顶层。"},{"t":"永远只读 json.data.hello","ok":false,"why":"对象成功时常常没有 data 包一层。"},{"t":"忽略 success 字段","ok":false,"why":"约定含 success/message。"},{"t":"响应一定是纯字符串","ok":false,"why":"是 JSON 对象。"}]}]}
\`\`\`

## Coding Agent 协作

\`\`\`prompt
目标：在 core/<core>/http/ 加最小接口，对象导出 + HttpResponse.success(res, { hello: 'lab' })。
现场：core 名=…；端口=…；是否要关闭 systemAuth=…
约束：勿改 src/；勿裸 res.json；说明拍平与鉴权；有 package.json 则用相对路径。
验收：curl 见顶层 hello；口述为何不能默认读 json.data。
\`\`\`

## 导图2 · HTTP / 路由 / 前端 × 最小 HTTP 实践

> 练习课：把导图2 HTTP/路由钉到 **HttpResponse 拍平验收**。

| 导图2 | Vibe 口语 | 本练习落点 |
|-------|-----------|------------|
| **HTTP / 路由** | 接口与路径 | \`core/*/http\` handler + HttpResponse |
| **前端** | 联调页面 | 拍平解包，勿默认 \`json.data\` |
| **MVP** | 最小可验证 | curl 见顶层字段即过关 |


## 下一步

**HTTP 认证** · **HTTP 与 www** · **实践 · 配置三同步**。
`;

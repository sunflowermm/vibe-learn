/** 实践 · 最小 HTTP */
export default `# 实践课 · 最小 HTTP API

> 目标：在 Core 的 \`http/\` 下放一个最小接口，用 \`HttpResponse\` 返回 JSON，并会用 \`curl\`/浏览器验证。

## 通关清单

| # | 步骤 | 完成标准 |
|---|------|----------|
| 1 | 选定 \`core/<core>/http/\` | 文件被 HTTP Loader 扫描 |
| 2 | 继承 HttpApi 基类 | 路径与 method 填对 |
| 3 | \`return HttpResponse.success(res, { hello: 'lab' })\` | 响应含 \`success\` 且字段拍平 |
| 4 | 带鉴权时加 Key | 见 **HTTP 认证** |
| 5 | \`curl -sS\` 打本地端口 | 看到 JSON |

\`\`\`steps
{"title":"HTTP 实验","steps":[{"title":"放对目录","body":"core/*/http/*.js"},{"title":"统一响应","body":"HttpResponse，勿裸 res.json 混用"},{"title":"前端解包","body":"普通对象在顶层，勿默认 json.data"}]}
\`\`\`

真源：\`docs/http-api.md\` · skill \`xrk-http-api\`。

## Coding Agent 协作

可复制：

\`\`\`
目标：在 core/<core>/http/ 加最小接口，用 HttpResponse.success(res, { hello: 'lab' })。
现场：core 名=…；本地端口=…；是否已有鉴权中间件=…
约束：勿裸 res.json 混用；普通对象字段拍平到顶层；先给文件骨架与 curl 验收命令，再改文件。
验收：curl 看到 success 与顶层 hello；说明前端为何不能默认读 json.data。
\`\`\`

## 下一步

**实践 · 配置三同步** 或 **HTTP 与 www**。
`;

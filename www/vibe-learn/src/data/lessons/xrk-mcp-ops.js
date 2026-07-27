/** 主服 MCP 运维 */
export default `# 主服 MCP 运维

> 第五章讲 MCP **概念**（模型如何发现/调用工具）；本课讲本仓 **主服如何挂载** MCP：工作流工具汇总、HTTP/WS 出口、启动日志如何确认。  
> 真源：\`docs/mcp-guide.md\` · \`docs/mcp-config-guide.md\` · \`docs/ai-workflow.md\`。

## 本课你要带走什么
\`\`\`check
{"title":"MCP 运维清单","items":[{"text":"分清 MCP 服务与客户端角色","hint":"谁暴露工具、谁来调"},{"text":"鉴权与网络边界清楚","hint":"别裸奔到公网"},{"text":"与 AiWorkflow 配置对得上","hint":"文档路径为准"}]}
\`\`\`


1. 主服 MCP 与 AiWorkflow 工具注册的关系  
2. 关键代码路径：\`src/utils/mcp-server.js\`、\`core/system-Core/http/mcp.js\`  
3. 和第五章 \`ai-mcp\` 课的分工：概念 vs 本仓挂载  
4. 实践：启动日志看到「MCP服务已挂载」（或同类成功文案）

---

## 1. 在地图上的位置
\`\`\`match
{"title":"MCP 运维配对","pairs":[{"id":"mcp","left":"MCP","right":"工具协议，给 Agent 接外部能力"},{"id":"auth","left":"鉴权","right":"工具也有信任边界"},{"id":"ops","left":"运维","right":"日志、超时、限额"}]}
\`\`\`


\`\`\`mermaid
flowchart LR
  WF[core/*/workflow] -->|registerMCPTool| Map[工作流工具表]
  Map --> Srv[mcp-server]
  Srv --> HTTP[system-Core http/mcp]
  Srv --> WS[MCP WebSocket]
  Ext[Cursor / Claude / 其它] --> HTTP
  Ext --> WS
  Chat[主服对话 AiWorkflow] --> Map
\`\`\`

| 角色 | 说明 |
|------|------|
| **工作流** | \`init\` 里 \`registerMCPTool\`；\`streams\` 白名单限制暴露面 |
| **mcp-server** | 汇总工具、协议版本、对外会话 |
| **system-Core HTTP** | REST/WS 形态给外部平台连 |
| **鉴权** | 走系统 API Key / WS 规则（\`docs/AUTH.md\`） |

协议版本与端点细节以 \`mcp-guide.md\` 正文为准（文档标注规范版本，随代码演进）。

---

## 2. 本仓路径

| 路径 | 说明 |
|------|------|
| \`docs/mcp-guide.md\` | 完整指南（工具列表示意、HTTP/WS） |
| \`docs/mcp-config-guide.md\` | 外部平台连接配置 |
| \`docs/ai-workflow.md\` | tool calling + MCP 链路 |
| \`src/utils/mcp-server.js\` | 服务实现 |
| \`core/system-Core/http/mcp.js\` | HTTP 挂载入口之一 |
| \`config/default_config/ai-workflow.yaml\` → \`mcp.*\` | 开关与相关项 |

> 历史「子服 AI 业务接口」已下线；工具执行以主服工作流 + MCP 为准（\`ai-workflow.md\` / \`subserver-api.md\` 结论）。

---

## 3. 与第五章的桥

| 第五章概念课 | 本课工程落点 |
|--------------|--------------|
| MCP 为何出现 | 主服需要标准工具通道给外部 Agent |
| tools / resources | 工作流注册的工具名（常 \`stream.tool\`） |
| Host / Client / Server | 外部平台为 Client；本仓 \`mcp-server\` 为 Server |
| 安全 | API Key、白名单 \`streams\`、file 工具开关 |

先读本课能「指着仓库说挂在哪」；再回第五章把协议词吃透。

---

## 4. 运维核对表

| 检查项 | 正常时你应看到 |
|--------|----------------|
| 启动日志 | MCP 服务挂载成功类提示（文案以现行日志为准） |
| 工作流加载 | 相关 workflow 已 init，工具已注册 |
| 外部 Client | URL / 协议版本 / API Key 与 \`mcp-config-guide.md\` 一致 |
| 白名单 | 请求里的 \`streams\` 只含本轮需要的工作流名 |
| 危险工具 | \`tools.file.runEnabled\` 默认 false；开启则 loopback 也要 Key |

<details>
<summary>排障口诀（连不上时）</summary>

1. 主服是否真的起来、MCP 路由是否在 \`system-Core/http/mcp\`  
2. Key 是否带对（\`docs/AUTH.md\`）  
3. 客户端填的是 HTTP 还是 WS、路径是否多/少斜杠  
4. 工具列表为空：工作流未加载或 \`streams\` 过窄  
5. 工具执行失败：看工作流 handler 日志，而非只怪「MCP 协议」

</details>

---

## 5. 实践清单

1. 启动主服，在日志中搜索 **MCP** / **已挂载**（以实际日志文案为准）。  
2. 打开 \`core/system-Core/http/mcp.js\` 扫一眼路由前缀，对照 \`mcp-guide.md\` HTTP API 节。  
3. 在配置中确认 \`ai-workflow\` 的 \`mcp\` 相关项；按 \`mcp-config-guide.md\` 看外部客户端要填的 URL 与 Key。  
4. 选一个已加载 workflow，确认其 \`registerMCPTool\` 名称出现在工具列表（文档示例或调试接口）。  
5. 对照第五章 **ai-mcp** 课：用本仓路径把「Server / 工具」指认一遍。

---

## 6. 文档链接

- \`docs/mcp-guide.md\` · \`docs/mcp-config-guide.md\`  
- \`docs/ai-workflow.md\` · \`docs/AUTH.md\`  
- \`docs/base-classes.md\`（\`frameworkToolSurface\` / \`registerMCPTool\`）  
- 源码：\`src/utils/mcp-server.js\` · \`core/system-Core/http/mcp.js\`

## 下一步

**Stream**（对话里如何调工具）· **Factory**（模型侧）· 第五章 **ai-mcp**（概念加深）。  
外部连不通时优先查：挂载日志、API Key、URL 路径、\`streams\` 白名单。
`;

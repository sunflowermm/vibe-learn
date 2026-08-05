export default `# 主服 MCP 运维

> 第五章讲 MCP **是什么**；本课讲本仓 **挂在哪、怎么验、挂了连不上怎么拆**。  
> 真源：\`docs/mcp-guide.md\` · \`docs/mcp-config-guide.md\` · \`docs/ai-workflow.md\`。  
> **学会之后**：能说明 MCP 工具挂载与 handleToolCall 门禁心智。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 挂载 | 主服工具面 |
| 门禁 | 不是模型想调就能调 |
| 扩展 | tools 扩展面有文档 |
| 对照 | 第五章 Tool Calling 概念 |

\`\`\`algo
{"kind":"toolloop","title":"模型提议 → 门禁 → 回灌","autoplay":true,"speed":880}
\`\`\`

## 设计巧思：USB 口在主机上

| 角色 | 人话 | 本仓 |
|------|------|------|
| MCP Server | 电脑上的 USB 口 + 驱动表 | \`mcp-server\` + 工作流工具表 |
| MCP Client | 插上来的设备（Cursor 等） | 外部平台 |
| 工具 | 口上挂的设备能力 | \`registerMCPTool\` |
| API Key | 机箱锁 | \`docs/AUTH.md\` |

本仓对话 Agent 也可以**同时是**工具的使用者（吃同一张工具表）——对内对外共用插口，省一套私有协议。

| 核对 | 做什么 |
|------|--------|
| 工作流 init | \`registerMCPTool\` 写入工具表 |
| mcp-server | 汇总协议；执行走 \`handleToolCall\` |
| HTTP/WS 出口 | system-Core \`http/mcp\` |
| 日志 | 看到挂载成功类文案 |
| 白名单 | streams 只开本轮需要；policies 可再卡 \`tool.call\` |

---

## 1. 跨章地图

| 方向 | 课 |
|------|-----|
| 概念词 Host/Client/Server | 第五章 **ai-mcp** |
| 模型怎么提议调用 | 第五章 **Tool Calling** · **协议分层** |
| 本仓对话怎么跑工具环 | **工作流** · **对话管线**（出站压缩 / finalize） |
| 鉴权 · 策略 · 审批 | **HTTP Auth** · 第五章 **提示安全**（\`policies\` / toolScan / \`#批准\`） |
| 提示注入风险 | 工具有副作用时更危险；门禁在 \`handleToolCall\` |
| 子服 | 历史「子服 AI 业务接口」已下线；工具执行以**主服**为准 |

\`\`\`mermaid
flowchart LR
  WF[workflow registerMCPTool] --> Map[工具表]
  Map --> Srv[mcp-server]
  Srv --> Out[HTTP / WS]
  Ext[外部 Client] --> Out
  Chat[主服 AiWorkflow] --> Map
\`\`\`

---

## 2. 路径揉碎

| 路径 | 干什么 |
|------|--------|
| \`src/utils/mcp-server.js\` | 服务实现；**\`handleToolCall\` 统一门禁** |
| \`core/system-Core/http/mcp.js\` | 对外挂载入口之一 |
| \`core/system-Core/workflow/tools.js\` | 文件工具面（含 apply_edit / verify / repo_map / update_todos） |
| \`ai-workflow.yaml\` → \`mcp.*\` · \`policies\` · \`security.*\` | 开关、策略、扫描与审批 |
| \`docs/mcp-config-guide.md\` | 外部怎么填 URL/Key |

工具名常带工作流前缀（如 \`tools.read\`）。\`frameworkToolSurface: true\` 的工作流可进 chat 白名单（见 base-classes）。  
\`mergeWorkflows\` 含 \`tools\` 时群聊自动吃到上述文件工具（\`plugin/ai.js\` 不必改）。

\`\`\`quiz
{"title":"MCP 运维","questions":[{"q":"本仓 MCP 工具主要在哪注册？","choices":[{"t":"core/*/workflow 的 registerMCPTool","ok":true,"why":"汇总进 mcp-server。"},{"t":"随便写在 www 静态 JS","ok":false,"why":"前端不是工具注册面。"},{"t":"必须改 Linux 内核模块","ok":false,"why":"应用层协议。"},{"t":"只能写在子服且主服禁止执行","ok":false,"why":"现行以主服工具执行为准。"}]},{"q":"外部 Client 连不上时，第一刀？","choices":[{"t":"先看主服是否起来、MCP 挂载日志、Key 与 URL 路径","ok":true,"why":"运维核对表。"},{"t":"先微调基座权重","ok":false,"why":"连口都没有。"},{"t":"删掉全部 plugin","ok":false,"why":"不对症。"},{"t":"把 Key 贴进公开 Issue","ok":false,"why":"泄漏。"}]},{"q":"策略 / 扫描 / 审批卡在哪？","choices":[{"t":"只在 Cursor 插件里","ok":false,"why":"运行时门禁。"},{"t":"MCPServer.handleToolCall（各入口共用）","ok":true,"why":"LLM/HTTP/WS 一条路。"},{"t":"只在 Nginx 配置","ok":false,"why":"无关。"},{"t":"只在 Vite 构建时","ok":false,"why":"无关。"}]}]}
\`\`\`

---

## 3. 运维核对表（可打印）

| 检查项 | 正常时 |
|--------|--------|
| 启动日志 | MCP 已挂载类提示 |
| 工作流 | 已 init，工具已注册（含 tools.* 扩展面） |
| Client | URL / 协议版本 / Key 对齐 config-guide |
| \`streams\` | 只含本轮需要的工作流名 |
| 策略 / 安全 | \`policies\` · \`security.toolScan\`；\`approval\` 默认关 |
| 危险工具 | \`tools.file.runEnabled\` 默认 false；开启则 loopback 也要 Key |

<details>
<summary>连不上五步</summary>

1. 主服进程与 \`http/mcp\` 路由  
2. Key（AUTH.md）  
3. HTTP vs WS、斜杠多寡  
4. 工具列表空 → 工作流未载或白名单过窄  
5. 执行失败 → 看工作流 handler 日志，别只骂「协议」

</details>

---

## 4. 实践清单

1. 日志搜 MCP / 已挂载。  
2. 扫一眼 \`http/mcp.js\` 路由前缀。  
3. 对照 \`mcp-config-guide.md\` 填外部 Client。  
4. 指认一个 \`registerMCPTool\` 名称出现在工具列表。  
5. 回第五章 **ai-mcp**：用本仓路径说清 Server / 工具。

## 下一步

**Factory**（模型口 · finalize / variants）· **对话管线**（出站 / 斜杠）· **提示安全**（策略与 \`#批准\`）· **HTTP Auth**（外部 Client 也要 Key）。
`;

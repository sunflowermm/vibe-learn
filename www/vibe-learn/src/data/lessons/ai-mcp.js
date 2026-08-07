export default `# 模型上下文协议

> **本课位置**：学习路径**行动**段；**紧跟工具调用**。  
> **先修**：**工具调用**（已分清「点菜语法」）。  
> **文献 / 规范锚点**：[Model Context Protocol](https://modelcontextprotocol.io/)（开放协议）；本仓运维真源 \`docs/mcp-guide.md\`。  
> **下一课**：**协议分层**；再后是 **智能体与控制循环**。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 定义 | 统一发现/调用工具与资源的开放协议 |
| 比喻 | 能说「工具 USB-C」且不把它说成聊天 API |
| 本仓 | 一等公民工具面；远程 remote-mcp.*；门禁 handleToolCall |
| 跟 Agent | 加工具走 MCP/注册，勿只改提示词假装 |

\`\`\`algo
{"kind":"toolloop","title":"MCP：提议 → 门禁 → 执行","autoplay":true,"speed":820}
\`\`\`

\`\`\`check
{"title":"MCP 通关","items":[{"id":"def","text":"能说明 MCP=发现/调用外部能力的标准方言","hint":"定义"},{"id":"vs","text":"能对照工具调用=点菜语法 vs MCP=统一插座","hint":"分工"},{"id":"xrk","text":"能指到 registerMCPTool / remote-mcp / handleToolCall","hint":"本仓"}]}
\`\`\`

## 定义

**模型上下文协议（Model Context Protocol，MCP）** = 一种开放协议：让「宿主应用」用统一方式**发现并使用**外部工具、资源和提示模板。  
常被比喻为 **人工智能工具的 USB-C**；设计灵感接近编辑器界的 **语言服务器协议（Language Server Protocol）**：「一种协议，多种客户端」。

| 角色 | 做什么 |
|------|--------|
| **宿主 / 主机** | 跑对话的应用（桌面助手、集成开发环境、本仓主服等） |
| **客户端** | 宿主里连协议的那一层 |
| **服务器** | 暴露具体能力（仓库、数据库、浏览器……） |

| 常见原语 | 作用 |
|----------|------|
| **工具 Tools** | 可执行动作 |
| **资源 Resources** | 可读的上下文数据 |
| **提示 Prompts** | 可复用的提示或工作流模板 |

---

## 和「工具调用」怎么分工

| | 工具调用 | 模型上下文协议 |
|--|----------|----------------|
| 解决 | 这一次请求里，模型如何**结构化提出**调用 | 工具如何被**标准地注册、发现、复用** |
| 比喻 | 点菜的说法 | 厨房电器的统一插座 |

没有统一插座时：每个客户端 × 每个数据源都要手写对接（N×M）。  
有了协议：服务器写一次，多个宿主可插。

\`\`\`mermaid
flowchart LR
  Host[宿主应用] --> Client[协议客户端]
  Client --> S1[服务器 · 仓库]
  Client --> S2[服务器 · 数据库]
\`\`\`

---

## 本仓怎么做

| 行为 | 落点 |
|------|------|
| 工作流内注册工具 | \`registerMCPTool\`（名称、说明、输入 Schema、处理函数） |
| 配置段 | \`ai-workflow.yaml\` → \`mcp.*\` · \`policies\` · \`security.*\` |
| 对话可用工具范围 | 合并工作流名 + 框架工具面 + \`remote-mcp.*\` |
| \`tools\` 副流常用面 | \`read\` / \`grep\` / \`write\`… 与 \`apply_edit\` / \`verify\` / \`repo_map\` / \`update_todos\` |
| 执行门禁 | \`MCPServer.handleToolCall\`（策略 / toolScan / 审批）；远程连 \`mcp.connect\` |
| 运维与排错 | 第四章 **MCP 运维** · \`docs/mcp-guide.md\` · 技能 \`agent-tools\` |

\`\`\`quiz
{"title":"模型上下文协议","questions":[{"q":"提出 MCP 协议，主要想减少什么对接成本？","choices":[{"t":"每个客户端对接每个数据源的手写连接器","ok":true,"why":"N×M 问题。"},{"t":"上下文窗口的物理上限","ok":false,"why":"窗口是模型侧预算，不是协议能取消的。"},{"t":"令牌化算法","ok":false,"why":"无关。"}]},{"q":"本仓工具真正执行前，统一要经过哪一层门禁？","choices":[{"t":"任意插件各自解析正文里的 Action:","ok":false,"why":"禁止文本假协议。"},{"t":"MCPServer.handleToolCall（策略/扫描/审批）","ok":true,"why":"一条门禁路径。"},{"t":"只改 system 提示即可放行一切","ok":false,"why":"提示不是 ACL。"}]}]}
\`\`\`

## 下一课

插座之外还有厂商自有接口与多智能体协作——**协议分层**；然后进入 **智能体与控制循环**。
`;

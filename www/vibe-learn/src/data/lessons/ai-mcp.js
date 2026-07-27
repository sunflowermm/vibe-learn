/** MCP */
export default `# MCP · 模型上下文协议

> **时间线：2024-11-25**，Anthropic 开源 **Model Context Protocol**。  
> 灵感接近编辑器界的 **LSP**：「一种协议，多种客户端」。  
> 常被称作 **AI 工具的 USB-C**。

## 时间线上的位置

上一课：Function Calling 解决「模型如何提出调用」。  
本课：解决「调用对象如何被 **标准地发现与复用**」。  
下一课：推理面、工具面、协作面继续分化——**厂商自有协议与 A2A**。

---

## 为什么诞生

\`\`\`flip
{"title":"MCP 翻卡","cards":[{"front":"MCP","back":"模型调用外部工具/资源的协议与生态"},{"front":"工具","back":"可被模型发起的结构化动作"},{"front":"本仓","back":"主服可暴露/消费 MCP（见 MCP 运维课）"}]}
\`\`\`

| 痛点 | 说明 |
|------|------|
| **N×M 连接器** | N 个 AI 客户端 × M 个数据源，每个都要手写对接 |
| **工具锁死在 App 内** | 你为 ChatGPT 写的插件，Cursor 用不了，反之亦然 |
| **FC 只覆盖「这一次请求」** | 缺少长期的发现、资源读取、提示模板等标准原语 |

需要一个 **开放标准**：Server 暴露能力，Host（Claude Desktop、Cursor、ChatGPT…）用同一方言接入。

---

## 它有什么作用

| 原语 | 作用 |
|------|------|
| **Tools** | 可执行动作 |
| **Resources** | 可读的上下文数据 |
| **Prompts** | 可复用提示 / 工作流模板 |

| 作用（全局） | 人话 |
|--------------|------|
| **写一次，插多处** | 一个 MCP Server，多个 Agent 客户端能用 |
| **分工清晰** | Host / Client / Server 各管一段 |
| **与 FC 互补** | MCP 提供外设；FC 仍是模型侧的「点菜口音」 |

\`\`\`mermaid
flowchart LR
  Host[Host] --> Client[MCP Client]
  Client --> S1[Server · 仓库]
  Client --> S2[Server · 数据库]
\`\`\`

---

## 深入浅出

Function Calling = **点菜的语法**。  
MCP = **厨房电器的统一插座**。  

没有插座，每家餐厅要给每台电器焊死线；有了插座，买来就能插。

本仓：\`registerMCPTool\`、\`ai-workflow.yaml\` 的 \`mcp.*\`、请求里的 \`streams\` 白名单。

## 接到下一站

工具插好了，还有「模型原生能力」与「多 Agent 协作」要协议——下一课 **协议分层与自有协议**。
`;

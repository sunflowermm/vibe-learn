/** 对话管线 · 上下文组成 · mergeWorkflows（本仓工程） */
export default `# 对话管线 · 上下文组成

> **工程课**：一次完整 Agent 跑通时，消息怎么排、工具怎么合并、工作区怎么进 system。  
> 真源：\`docs/agent-context.md\`。概念侧见第五章 **Token/窗口 · 注意力 · 自适应**。

## 本课你要带走什么

\`\`\`steps
{"title":"一条热路径","steps":[{"title":"入口","body":"插件 runChatAgent 或 HTTP v3。"},{"title":"合并能力","body":"mergeWorkflows → 合成 mcpTools。"},{"title":"组消息","body":"assembleChatLlmMessages 三层。"},{"title":"工具环","body":"callAI → tool_calls → MCP → 回灌。"},{"title":"出站","body":"reply / sendMessages · 写回历史。"}]}
\`\`\`

\`\`\`match
{"title":"三层消息","pairs":[{"id":"sys","left":"buildChatContext","right":"system + 当前 user 骨架"},{"id":"his","left":"mergeMessageHistory","right":"笔录 + [当前消息]"},{"id":"vol","left":"buildEnhancedContext","right":"易变切片（时间/会话）独立 user"}]}
\`\`\`

---

## 1. 两入口

| 入口 | 路径 | 差别 |
|------|------|------|
| 群聊 | \`plugin/ai.js\` → \`runChatAgent\` | 触发 + 抽文本 → \`chat.process\` |
| HTTP | \`http/ai.js\` v3 | 已有 messages；直接工作区注入 + streams 白名单 |

组合点统一：\`process({ mergeWorkflows })\` → \`execute\` → \`assembleChatLlmMessages\` → \`callAI\`。

---

## 2. mergeWorkflows = 工具并集

| 来源 | 例子 |
|------|------|
| chat 自带 | reply、poke、群管、发图… |
| \`ai_config.mergeWorkflows\` | memory、database、tools… |
| 框架自动 | web、browser、\`remote-mcp.*\` |

副流工具名前缀（如 \`tools.read\`）。**有工具 ≠ 会办事**——还要 system 协议与工作区手册。

---

## 3. 消息三层（为何拆）

| 层 | 为何单独 |
|----|----------|
| system | 稳定前缀：人设、MCP 纪律、Workspace；利缓存 |
| 历史 / 当前 | 会话笔录；\`【我·工具】\` 延续任务 |
| 易变 user | 时间、群角色、随机旁观——**勿污染**可缓存 system |

\`\`\`mermaid
flowchart TB
  S[system：协议 + Workspace] --> V[易变 user]
  V --> H[历史块]
  H --> C["[当前消息]"]
  C --> LLM[LLM + 工具环]
\`\`\`

---

## 4. Workspace 五段（进 system）

顺序固定（\`agent-workspace.js\`）：

1. **assistant** — AGENTS / SOUL / USER / … / memory  
2. **contextFiles**  
3. **rules** — \`agents/rules\` 全文  
4. **Skills** — \`<available_skills>\` 目录（细则 \`tools.read\`）  
5. **Agents** — subagents 清单（提示路由，非隔离子会话）

根 \`AGENTS.md\` / \`.cursor/*\` **不**进办事助手链。细节见 **办事助手** 课与 \`docs/agents.md\`。

---

## 5. 和第五章概念怎么对表

| 概念课 | 本课落点 |
|--------|----------|
| Token / 窗口 | \`max*Chars\`、历史条数、Skills compact |
| 注意力 | 模型内部；我们负责**谁进窗** |
| 自适应 · ICL | 工作区 + Rules + Skills 目录 |
| 自适应 · 外挂 | merge 的 database/tools、MCP |
| 自适应 · Agent | 工具环 + 笔录 + MEMORY |

\`\`\`quiz
{"title":"管线自测","questions":[{"q":"易变的「当前时间」应放哪？","choices":[{"t":"拼进可缓存的 system 最前面","ok":false,"why":"会搅乱前缀缓存。"},{"t":"独立 user（buildEnhancedContext）","ok":true,"why":"代码刻意拆层。"},{"t":"只写进 Redis 不给模型","ok":false,"why":"模型需要看见会话元数据。"},{"t":"写进 package.json engines","ok":false,"why":"无关。"}]}]}
\`\`\`

## 文档链接

- \`docs/agent-context.md\`（本课真源）  
- \`docs/agents.md\` · \`docs/ai-workflow.md\`  
- 第四章 **工作流** · **办事助手**；第五章 **Token** · **注意力** · **自适应**
`;

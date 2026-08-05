export default `# 对话管线 · 上下文组成

> **工程课**：一次完整 Agent 跑通时，消息怎么排、工具怎么合并、出站怎么省窗、安全怎么卡工具。  
> 真源：\`docs/agent-context.md\`（含 §5 出站 / 策略）。概念侧见第五章 **Token/窗口 · 工具调用 · 提示安全**。  
> **学会之后**：能对照消息三层与出站压缩/策略，并指向本仓文件与配置键。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 三层 | 概念地图见 docs/agent-context.md |
| 上下文工程 | 知五段注入与出站压缩分工 |
| 窗口 | toolPair / compaction / contextWindow 各一句 |
| 流式 | 知道响应可流式，但不等于「无门禁」 |
| 勿混 | 根 AGENTS（写代码）≠ 工作区 AGENTS（注入） |

\`\`\`algo
{"kind":"msgpipe","title":"assemble → prepareOutbound","autoplay":true,"speed":880}
\`\`\`

## 本课你要带走什么

\`\`\`steps
{"title":"一条热路径","steps":[{"title":"入口","body":"插件 runChatAgent 或 HTTP v3。"},{"title":"斜杠","body":"/recipe · /recipes 可展开或短路回复。"},{"title":"合并能力","body":"mergeWorkflows → 合成 mcpTools。"},{"title":"组消息","body":"assembleChatLlmMessages 三层。"},{"title":"出站准备","body":"toolPair → compaction(+sidecar) → contextWindow 裁剪。"},{"title":"工具环","body":"callAI → tool_calls → MCP 门禁 → 回灌；轮尽可 finalize。"},{"title":"出站","body":"reply / sendMessages · 写回历史。"}]}
\`\`\`

\`\`\`match
{"title":"三层消息","pairs":[{"id":"sys","left":"buildChatContext","right":"system + 当前 user 骨架"},{"id":"his","left":"mergeMessageHistory","right":"笔录 + [当前消息]"},{"id":"vol","left":"buildEnhancedContext","right":"易变切片（时间/会话）独立 user"}]}
\`\`\`

---

## 1. 两入口

| 入口 | 路径 | 差别 |
|------|------|------|
| 群聊 | \`plugin/ai.js\` → \`runChatAgent\` | 触发 + 抽文本 → \`chat.process\`；**插件本身不注册 MCP** |
| HTTP | \`http/ai.js\` v3 | 已有 messages；直接工作区注入 + streams 白名单 |

组合点统一：\`process({ mergeWorkflows })\` → \`execute\` → \`assembleChatLlmMessages\` → \`prepareOutboundMessages\` → \`callAI\`。

默认 \`ai_config.mergeWorkflows\` 常含 \`memory\` / \`database\` / \`tools\`——群聊自动吃到文件工具与下游出站/安全链。

---

## 2. mergeWorkflows = 工具并集

| 来源 | 例子 |
|------|------|
| chat 自带 | reply、poke、群管、发图… |
| \`ai_config.mergeWorkflows\` | memory、database、**tools**（含 apply_edit / repo_map 等）… |
| 框架自动 | web、browser、\`remote-mcp.*\` |

副流 \`buildSystemPrompt\` 经 \`collectAuxiliaryStreamPrompts\` 注入 chat system「可用能力」。**有工具 ≠ 会办事**——还要 system 协议与工作区手册。

---

## 3. 消息三层（为何拆）

| 层 | 为何单独 |
|----|----------|
| system | 稳定前缀：人设、MCP 纪律、Workspace；利缓存 |
| 历史 / 当前 | 会话笔录；\`【我·工具】\` 延续任务；可配 \`chatHistory.keepFirst\` 保最早锚点 |
| 易变 user | 时间、群角色、随机旁观——**勿污染**可缓存 system |

\`\`\`mermaid
flowchart TB
  Slash[斜杠展开] --> S[system：协议 + Workspace]
  S --> V[易变 user]
  V --> H[历史块]
  H --> C["[当前消息]"]
  C --> Out[toolPair → compaction → trim]
  Out --> LLM[LLM + 工具环]
\`\`\`

---

## 4. Workspace 五段（进 system）

顺序固定（\`agent-workspace.js\`）：

1. **assistant** — AGENTS / SOUL / USER / … / memory  
2. **contextFiles**  
3. **rules** — \`agents/rules\` ∪ 工作区 \`rules/\`（同路径覆盖）  
4. **Skills** — \`<available_skills>\` 目录（细则 \`tools.read\`；装技能 **agent-skillhub**）  
5. **Agents** — subagents 清单（提示路由，非隔离子会话）

另：triggers **microagents** 命中用户文本时可整段注入。  
根 \`AGENTS.md\` / \`.cursor/*\` **不**进办事助手链（那是 Coding Agent 工牌）。

---

## 5. 出站准备（省窗 · 2026 融合）

进 LLM 前固定链（\`prepareOutboundMessages\`）：

| 步 | 配置 | 作用 |
|----|------|------|
| **toolPair** | \`context.toolPair\` | 过旧 \`role=tool\` 结果投影压缩（不改持久历史） |
| **compaction** | \`context.compaction\` | 超预算用辅/主模型摘要；可选 backup + session sidecar |
| **裁剪** | Provider \`contextWindow\` | 保留 system + 尾部 |

辅模型：\`llm.aux\`。历史条数：\`context.chatHistory\`（\`limit\` / \`globalLimit\` / \`keepFirst\`）。

---

## 6. 策略与安全（工具执行前）

| 能力 | 配置 | 落点 |
|------|------|------|
| 运行时策略 | \`policies[]\` | \`provider.use\` / \`tool.call\` / \`mcp.connect\`；\`ask\` 仍注入工具，执行时审批或拒绝 |
| 威胁扫描 | \`security.toolScan\` | 危险 command 等模式（默认开） |
| 交互审批 | \`security.approval\`（**默认关**） | 主人 \`#批准\` / \`#批准id\`；关则 ask=拒绝 |
| 统一门禁 | — | **\`MCPServer.handleToolCall\`**（LLM / HTTP / WS 一条路） |

工具轮用尽：各 LLM 客户端可再发一轮无工具 **finalize**（\`tool-loop-finalize\`）。

---

## 7. 斜杠与配方

| 命令 | 作用 |
|------|------|
| \`/recipes\` | 列表（可短路直接回复） |
| \`/recipe <id> [k=v]\` | 注入配方 instructions + prompt |

种子：\`agents/recipes/*.yaml\`；\`recipes.scheduleEnabled\` 时 cron 默认只打日志。

---

## 8. 和第五章概念怎么对表

| 概念课 | 本课落点 |
|--------|----------|
| Token / 窗口 | compaction · toolPair · contextWindow · \`max*Chars\` |
| 工具调用 | 工厂 tool_calls + finalize |
| MCP | registerMCPTool；执行门禁在 mcp-server |
| 智能体循环 | maxToolRounds · onAfterToolRound · 笔录 |
| 提示安全 | policies · toolScan · approval |

\`\`\`quiz
{"title":"管线自测","questions":[{"q":"易变的「当前时间」应放哪？","choices":[{"t":"拼进可缓存的 system 最前面","ok":false,"why":"会搅乱前缀缓存。"},{"t":"独立 user（buildEnhancedContext）","ok":true,"why":"代码刻意拆层。"},{"t":"只写进 Redis 不给模型","ok":false,"why":"模型需要看见会话元数据。"},{"t":"写进 package.json engines","ok":false,"why":"无关。"}]},{"q":"出站 toolPair 改的是？","choices":[{"t":"磁盘上永久聊天记录","ok":false,"why":"不改持久历史。"},{"t":"即将送给模型的过旧 tool 结果投影","ok":true,"why":"省窗；笔录仍在。"},{"t":"Provider 的 API Key","ok":false,"why":"无关。"},{"t":"Nginx 反代证书","ok":false,"why":"无关。"}]},{"q":"security.approval 默认？","choices":[{"t":"开启，所有工具都要群里投票","ok":false,"why":"默认关。"},{"t":"关闭；危险 ask 未开审批则拒绝（主人可旁路）","ok":true,"why":"日常不打扰；需要时再开。"},{"t":"不存在该配置","ok":false,"why":"ai-workflow.security.approval。"},{"t":"只对 web_search 生效","ok":false,"why":"针对工具执行 ask。"}]}]}
\`\`\`

## 文档链接

- \`docs/agent-context.md\`（本课真源，含出站 §5）  
- \`docs/agents.md\` · \`docs/ai-workflow.md\` · \`docs/mcp-guide.md\`  
- 第四章 **工作流** · **办事助手** · **MCP 运维**；第五章 **Token** · **工具调用** · **提示安全**
`;

export default `# Factory · LLM / ASR / TTS

> 工厂 = **按配置创建模型客户端**（对话 LLM · 语音 ASR · 合成 TTS）。  
> 业务（\`AiWorkflow\`）经工厂取客户端，**不要**在 Core 里散落 \`new\` 各厂商 SDK。  
> **学会之后**：能说明 LLM Factory 统一客户端与 finalize/aux 直觉。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 插座 | 业务不直接裸 new 各家 SDK |
| 配置 | 工厂模板在 default_config 体系 |
| 代理 | 境外模型才挂代理 |
| 下一步 | 工作流里真正调用 |

## 设计巧思：插座 vs 菜谱

| 角色 | 比喻 | 本仓 |
|------|------|------|
| **Factory** | 墙上的统一插座（电压/插头标准） | \`src/factory/llm|asr|tts\` |
| **配置** | 插哪一路电（Provider / Key / Base） | \`*_llm\` · \`ai-workflow\` |
| **AiWorkflow** | 菜谱：先备料再开火 | \`core/*/workflow\` |
| **MCP** | 橱柜里的电动工具 | \`registerMCPTool\` |

换插座品牌（换模型厂商）不该重写整本菜谱。

\`\`\`steps
{"title":"一次调用","steps":[{"title":"配置就绪","body":"CommonConfig 已 load（见 Runtime 课）。"},{"title":"出站准备","body":"管线侧 toolPair / compaction / trim（工厂之前）。"},{"title":"工厂取客户端","body":"LLMFactory 按 Provider 选 *Client。"},{"title":"工具环","body":"tool_calls → MCP 门禁 → 回灌；轮尽可 finalize。"},{"title":"工具另线","body":"工具走 MCP；工厂不管工具目录。"}]}
\`\`\`

---

## 1. 跨章串联

| 章 | 接法 |
|----|------|
| **配置归属** | 工厂 yaml ∈ \`config/default_config/\`；**产品业务**勿塞这里 |
| **环境 · 代理** | 国内出网常要 \`HTTP_PROXY\`；工厂 fetch 跟环境走 |
| **网络 · HTTPS** | 调云端模型默认 TLS；Key 勿进 Git（提示安全） |
| **工作流 / 对话管线** | 工厂供客户端；三层消息 + 出站压缩在管线课 |
| **第五章 · 协议分层** | Chat Completions 兼容 ≈ 多数客户端心智；\`openai_compat_llm\` 给第三方网关 |

\`\`\`match
{"title":"工厂配对","pairs":[{"id":"fac","left":"LLMFactory","right":"创建/切换对话客户端"},{"id":"asr","left":"ASR 工厂","right":"语音→文本"},{"id":"tts","left":"TTS 工厂","right":"文本→语音"},{"id":"compat","left":"openai_compat_llm","right":"第三方 OpenAI 形态网关"}]}
\`\`\`

---

## 2. 目录揉碎

| 工厂 | 路径 | 一句话 |
|------|------|--------|
| LLM | \`src/factory/llm/\` | Chat / completions |
| ASR | \`src/factory/asr/\` | 听写 |
| TTS | \`src/factory/tts/\` | 播报 |
| 基类 | \`BaseFactory.js\` | 共性 |

\`\`\`mermaid
flowchart LR
  CFG["ai-workflow · *_llm"] --> FAC[LLMFactory]
  FAC --> CLI[*Client]
  WF[AiWorkflow] --> FAC
  WF --> MCP[工具面]
  CLI --> Net[厂商 HTTP]
\`\`\`

对齐 \`docs/base-classes.md\`：builtin 客户端各管自家协议；兼容网关用 \`openai_compat_llm\`。业务可 \`patchLLMConfig\` 追加场景字段，勿复制签名逻辑。

客户端侧（2026 融合后常见能力）：**工具环 finalize** · 重试 · **variants / reasoning budget** · 辅模型 \`llm.aux\`（compaction 等）。Provider 可配 \`contextWindow\`（出站裁剪用）。

\`\`\`quiz
{"title":"工厂快测","questions":[{"q":"Core 里正确用模型的方式？","choices":[{"t":"经 AiWorkflow / 工厂 API 取客户端，配置选 Provider","ok":true,"why":"统一超时、代理、协议差异。"},{"t":"每个插件 new 一份厂商 SDK 并硬编码 Key","ok":false,"why":"密钥与分叉维护灾难。"},{"t":"模型只能跑在子服 Python，主服禁止","ok":false,"why":"本仓 LLM 在主服工厂。"},{"t":"有 Factory 就不必 HTTPS","ok":false,"why":"出网仍要安全传输。"}]},{"q":"openai_compat_llm 更适合？","choices":[{"t":"第三方 OpenAI 形态网关","ok":true,"why":"builtin 留给官方协议客户端。"},{"t":"替代 Redis","ok":false,"why":"无关。"},{"t":"只用于前端 Vite","ok":false,"why":"服务端配置。"},{"t":"关闭所有 MCP","ok":false,"why":"正交。"}]},{"q":"工具轮用尽后 finalize 是？","choices":[{"t":"再发一轮无工具请求，用已有结果写正文","ok":true,"why":"tool-loop-finalize。"},{"t":"自动改仓库根 AGENTS.md","ok":false,"why":"无关。"},{"t":"重启 Redis","ok":false,"why":"无关。"},{"t":"关闭 MCP 挂载","ok":false,"why":"正交。"}]}]}
\`\`\`

---

## 3. 配置落点（防写错）

| 类型 | 模板 | Schema |
|------|------|--------|
| 工作流总控 | \`ai-workflow.yaml\`（含 \`context.*\` · \`security\` · \`policies\` · \`recipes\`） | system-ai-workflow |
| 各 LLM | \`config/default_config/*_llm*.yaml\`（\`contextWindow\` · variant 等） | 对应 commonconfig |
| 产品业务开关 | **\`core/<产品>/default/\`** | 产品 commonconfig |

密钥：环境变量 / 面板密文；模板只放字段结构。面板 \`/xrk\` 经 schema 暴露上述字段。

---

## 4. 和实践的咬合

1. 数 \`src/factory/llm/*Client.js\`，对照配置 Provider 名。  
2. 配置页确认 \`ai-workflow\` + LLM 段已加载（含 compaction / policies）。  
3. 本地故意错 Base（再改回）→ 看报错是否来自客户端层。  
4. 回 **对话管线**：工厂 = 连哪个模型；出站链 = 窗里塞什么；\`streams\` = 能调哪些工具。

## 文档

\`docs/ai-workflow.md\` · \`docs/base-classes.md\` · \`docs/factory.md\` · skill \`xrk-llm\` · Runtime 课「配置就绪时机」。

## 下一步

**MCP 运维** · **工作流** · **对话管线** · 第五章 **Tool Calling / 协议分层**。

## 导图2 · AI Agent / 流式 / 上下文窗口 × Factory

> 导图2 Agent/流式/窗口；本课钉 **统一插座**，业务勿散落 SDK。

| 导图2 | Vibe 口语 | 本仓专业落点 |
|-------|-----------|--------------|
| **AI Agent** | 调模型办事 | 业务经 Factory 取客户端，勿 Core 里散落 SDK |
| **流式响应** | 边生成边出 | 工厂客户端能力之一；由工作流决定是否流式 |
| **上下文窗口** | 能塞多少 | Provider contextWindow + 管线裁剪；见对话管线 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;

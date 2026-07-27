/** Factory · LLM / ASR / TTS */
export default `# Factory · LLM / ASR / TTS

> 主服通过 **工厂** 统一创建模型客户端：对话走 LLM，语音识别 ASR，语音合成 TTS。  
> 业务（尤其 \`AiWorkflow\`）**不要**自己 \`new\` 厂商 SDK 散落各处——经工厂 + CommonConfig 取客户端。

## 本课你要带走什么
\`\`\`flip
{"title":"LLM 工厂翻卡","cards":[{"front":"工厂","back":"按配置创建模型客户端"},{"front":"配置归属","back":"运行时模板在 default_config；业务勿乱塞"}]}
\`\`\`


1. \`src/factory/llm|asr|tts\` 的职责边界  
2. CommonConfig / 默认 yaml 里各 LLM 工厂配置落在哪  
3. 与 **Stream（AiWorkflow）**、**MCP** 的关系：工厂供客户端，工作流做编排，MCP 挂工具  
4. 实践：在配置页确认已加载工厂 / Provider

---

## 1. 目录与职责
\`\`\`match
{"title":"LLM 工厂配对","pairs":[{"id":"fac","left":"工厂","right":"按配置创建/切换模型客户端"},{"id":"cfg","left":"配置模板","right":"运行时 default_config 体系"},{"id":"core","left":"业务调用","right":"Core 消费工厂，不复制协议细节"},{"id":"key","left":"密钥","right":"本地配置，勿提交"}]}
\`\`\`


| 工厂 | 路径 | 作用 |
|------|------|------|
| **LLM** | \`src/factory/llm/\`（\`LLMFactory.js\` + 各 \`*LLMClient.js\`） | Chat / completions 类客户端 |
| **ASR** | \`src/factory/asr/\` | 语音 → 文本 |
| **TTS** | \`src/factory/tts/\` | 文本 → 语音 |
| 基类 | \`src/factory/BaseFactory.js\` | 工厂共性 |

\`\`\`mermaid
flowchart LR
  CFG[CommonConfig / ai-workflow · *_llm] --> FAC[LLMFactory]
  FAC --> CLI[具体 *LLMClient]
  WF[AiWorkflow.process] --> FAC
  WF --> MCP[MCP tools]
  CLI --> API[厂商 / 兼容网关 HTTP]
\`\`\`

| 角色 | 说明 |
|------|------|
| **工厂** | 按配置选出客户端实现（OpenAI、DeepSeek、Gemini、兼容网关…） |
| **AiWorkflow** | 组 messages、调工厂、跑 tool_calls 循环 |
| **MCP** | 工具发现与执行通道（见 MCP 课 / 第五章概念） |

对齐 \`docs/base-classes.md\`：厂商协议用各 builtin 客户端；\`openai_compat_llm\` 留给第三方 OpenAI 形态网关。业务可重写 \`patchLLMConfig(merged, apiConfig)\` 追加场景字段。

---

## 2. 配置落点（别写错目录）

| 类型 | 模板 / 数据 | Schema 直觉 |
|------|-------------|-------------|
| 工作流总控 | \`config/default_config/ai-workflow.yaml\` → 运行时 \`data/server_bots/.../ai-workflow.yaml\` | \`core/system-Core/commonconfig/\` |
| 各 LLM 工厂 | \`config/default_config/*_llm*.yaml\`（以仓库实际文件名为准） | system-Core commonconfig 对应段 |
| ASR / TTS | 对应 default_config 与 commonconfig | 同上 |

规则回顾（\`xrk-project\`）：**框架 / LLM 工厂类模板**可在 \`config/default_config/\`；**独立产品业务配置**应在 \`core/<产品>/default/\`，不要塞进 default_config。

业务取客户端：经 Runtime 已加载的工厂 API / 工作流基类封装（以 \`docs/ai-workflow.md\` 与 \`LLMFactory\` 源码为准），**禁止**在 Core 里复制一套厂商签名逻辑。

---

## 3. 和 Stream 的衔接

一次对话（摘要，细节见 **Stream** 课与 \`docs/ai-workflow.md\`）：

1. \`buildChatContext\` / \`buildSystemPrompt\`  
2. 经 \`LLMFactory\` 发 OpenAI 兼容形态（或对应客户端协议）请求  
3. 若有 \`tool_calls\` → MCP / 工作流注册工具 → 结果回灌再生成  
4. 流式则推 \`delta.content\`

\`streams\` 白名单限制本轮暴露的工具集——工厂解决「连哪个模型」，白名单解决「能调哪些工具」。

---

## 4. 实践清单

1. 打开 \`src/factory/llm/\`，数一数有哪些 \`*Client.js\`，对照配置里的 Provider 名。  
2. 打开主服**配置页**（system 控制台 / CommonConfig），查看 **ai-workflow** 与各 LLM 相关段是否已加载、Provider 是否指向你期望的工厂。  
3. 故意填错 API Base 或 Key（仅本地）→ 看工作流报错是否来自客户端层，再改回。  
4. 读 \`docs/ai-workflow.md\`「配置要点」一节，把 \`llm.*\` 字段与 UI 对上号。

---

## 5. 文档链接

- \`docs/ai-workflow.md\`  
- \`docs/base-classes.md\`（AiWorkflow · 厂商协议说明）  
- \`docs/runtime-surface.md\`  
- \`config/default_config/ai-workflow.yaml\`  
- 源码：\`src/factory/llm/LLMFactory.js\`

## 下一步

**Stream 业务层**（编排）· **MCP 运维**（工具挂载）· 第五章 **Tool Calling / MCP 概念**。  
语音能力需要时再看同目录 ASR/TTS 客户端与对应 yaml。
`;

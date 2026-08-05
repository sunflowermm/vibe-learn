export default `# 令牌与上下文窗口

> **本课位置**：学习路径**计算**段第 1 课。  
> **文献锚点**：[OpenAI Help · What are tokens](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)；[tiktoken](https://github.com/openai/tiktoken)（BPE）；Cookbook *How to count tokens*。  
> **下一课**：注意力——进窗之后，各个令牌如何互相「看」。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 令牌 | token≠字/词；计费与窗预算单位 |
| 窗口 | 单次请求有上限；窗外模型看不见 |
| 本仓 | 能指到 contextWindow / 管线裁剪 / toolPair |
| 跟 Agent | 超长上下文先谈裁剪与分层，不盲堆 |

\`\`\`algo
{"kind":"tokbudget","title":"一次请求怎么吃掉窗口预算","autoplay":true,"speed":720,"data":{"limit":16,"chunks":[{"id":"sys","name":"系统说明","n":3},{"id":"hist","name":"历史","n":4},{"id":"user","name":"本轮用户","n":2},{"id":"tool","name":"工具结果","n":3},{"id":"out","name":"预留生成","n":4}]}}
\`\`\`

\`\`\`check
{"title":"令牌与窗口通关","items":[{"id":"bpe","text":"知道常见 LLM 用子词/BPE 切分，中英占用不同","hint":"tiktoken"},{"id":"in_out","text":"窗口常含输入+输出（以厂商文档为准）","hint":"别只算 prompt"},{"id":"cut","text":"能说出超窗后的工程手段：截断/压缩/外挂检索","hint":"本仓三步"}]}
\`\`\`

## 先把四个词说清楚

| 中文全称 | 英文 | 定义 |
|----------|------|------|
| **令牌** | token | 模型读写的最小文本片。多为**子词**（不是「一个汉字 = 一个令牌」） |
| **上下文窗口** | context window | **一次请求**里模型能同时处理的令牌上限 |
| **提示 / 消息列表** | prompt / messages | 塞进窗口的内容：系统、历史、本轮、工具结果、检索片段等 |
| **上下文工程** | context engineering | 在窗口预算内决定：看见什么、顺序如何、各块占多少 |

OpenAI 说明：模型先把文本变成 token 列表再算；可用官方 Tokenizer 工具或 **tiktoken** 本地计数。经验上英文约 4 字符≈1 token，但**务必程序计数**，尤其是中文与代码。

\`\`\`steps
{"title":"一次请求怎么吃预算","steps":[{"title":"切成令牌","body":"分词器（如 BPE）切开；中英比例不同。"},{"title":"占满窗口","body":"系统 + 历史 + 本轮 + 工具回传都算进预算。"},{"title":"再生成","body":"回答也占额度；超限截断或报错。"},{"title":"人工取舍","body":"限历史、规则宜短、技能先目录——都是抢窗。"}]}
\`\`\`

---

## 常见现象 ←→ 窗口原因

| 你看到的现象 | 更可能的原因 |
|--------------|--------------|
| 「模型忘了刚才说的」 | 历史被截掉或没注入——那些字**不在窗口里** |
| 长篇常驻说明让回答变飘 | 常驻文本挤占了任务相关上下文 |
| 要不要建向量库争论不休 | 同一预算：外挂检索几段 vs 整段塞进提示 |
| 多轮调工具又慢又贵 | 每轮工具结果回灌，再次占用窗口 |

---

## 和邻近概念的边界

| 概念 | 和本课的差别 |
|------|----------------|
| **参数里的知识** | 写在权重里；单次对话改不了 |
| **本次上下文** | 只存在于这一次可见文本 |
| **键值缓存** | KV Cache：推理复用已算注意力中间结果，依赖**前缀稳定** |
| **嵌入向量** | 做检索相似度；不替代「生成用的窗口」 |

\`\`\`mermaid
flowchart LR
  Tok[切成令牌] --> Win[上下文窗口]
  Win --> Sys[宜稳定的前缀]
  Win --> Dyn[历史 / 本轮 / 工具结果]
  Sys --> Cache[利于键值缓存]
  Dyn --> Task[完成本轮任务]
\`\`\`

---

## 本仓怎么做

| 行为 | 落点 |
|------|------|
| 限制注入总长、规则/技能/子代理预算 | \`ai-workflow.yaml\` → \`agentWorkspace\` 的 \`max*Chars\` 等 |
| 历史条数 / 保最早锚点 | \`context.chatHistory\` |
| 过旧 tool 结果投影压缩 | \`context.toolPair\` → \`tool-pair-compact.js\` |
| 超预算辅/主模型摘要 | \`context.compaction\` · \`llm.aux\` |
| 按 Provider 窗尾部裁剪 | Provider \`contextWindow\` |
| 技能先目录再按需读全文 | \`<available_skills>\` + \`tools.read\` |
| 系统说明与「当前时间」分层 | \`assembleChatLlmMessages\` |

出站固定顺序（**对话管线** · \`docs/agent-context.md\` §5）：  
\`toolPair → compaction → contextWindow 裁剪 → LLM\`。压缩只动**即将送模**的消息，不等于删磁盘笔录。

\`\`\`quiz
{"title":"令牌与窗口","questions":[{"q":"上下文窗口主要限制什么？","choices":[{"t":"模型一共有多少参数","ok":false,"why":"参数量是规模，不是单次可见文本量。"},{"t":"单次请求里能同时处理多少令牌","ok":true,"why":"窗口 = 一次可见预算。"},{"t":"磁盘上有多少个技能文件夹","ok":false,"why":"文件多少不等于进窗多少。"}]},{"q":"本仓 toolPair 压缩的是？","choices":[{"t":"永久聊天记录文件","ok":false,"why":"不改持久历史。"},{"t":"即将送给模型的过旧 tool 结果投影","ok":true,"why":"省窗；笔录仍在。"},{"t":"Provider 的 API Key","ok":false,"why":"无关。"}]}]}
\`\`\`

## 下一课

窗口里「哪个令牌该看哪些令牌」——**注意力**。
`;

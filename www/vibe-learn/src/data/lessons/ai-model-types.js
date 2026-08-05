export default `# 模型类型

> **本课位置**：导读最后一课；下一课起进入计算主线 **令牌与窗口**。  
> **文献锚点**：[Hugging Face · Transformer Architectures](https://huggingface.co/learn/llm-course/en/chapter1/6)——Encoder-only / Decoder-only / Encoder–Decoder。  
> **学会之后**：能按「骨干 × 任务 × 部署」三刀切开「上个模型」的含混说法。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 骨干三族 | Encoder-only / Decoder-only / Encoder–Decoder 各举一例 |
| 任务切 | 判别 / 生成 / 嵌入 / 多模态不混 |
| 本仓 | Factory 选的多是云端对话向 Decoder-only；嵌入是另一类 |
| 跟 Agent | 要模型时写清任务形态（补全/对话/多模态） |

\`\`\`check
{"title":"模型类型通关","items":[{"id":"bert","text":"BERT 类≈理解向 Encoder-only","hint":"双向"},{"id":"gpt","text":"GPT/Llama 类≈生成向 Decoder-only","hint":"因果"},{"id":"t5","text":"T5/BART≈序列变换 Encoder–Decoder","hint":"翻译摘要"},{"id":"emb","text":"嵌入模型≠聊天模型","hint":"向量检索"}]}
\`\`\`

## 为什么要先分类型

口头说「上个人工智能」什么都没说清。选型、报价、延迟、能不能微调，都取决于类型。

---

## 1. 按 Transformer 骨干（选型第一刀）

| 骨干 | 注意力直觉 | 擅长 | 例子 |
|------|------------|------|------|
| **Encoder-only** | 双向：每个位置可读全句 | 分类、抽取、理解 | BERT、RoBERTa |
| **Decoder-only** | 因果：只能看过去令牌 | 续写、对话、工具调用底座 | GPT、LLaMA、Claude 等 |
| **Encoder–Decoder** | 编码全读 + 解码生成（可交叉注意） | 翻译、摘要等序列变换 | T5、BART |

原论文 *Attention Is All You Need*（2017）做的是 **Encoder–Decoder** 机器翻译；当代对话大模型多数走 **Decoder-only** 放大。

\`\`\`mermaid
flowchart TB
  Say[说「模型」] --> Arch[按骨干]
  Say --> Task[按任务]
  Say --> Deploy[按部署]
  Arch --> Enc[Encoder-only]
  Arch --> Dec[Decoder-only]
  Arch --> ED[Encoder-Decoder]
\`\`\`

---

## 2. 按任务形态

| 类型 | 作用 | 例子直觉 |
|------|------|----------|
| **判别 / 分类** | 判断属于哪一类 | 垃圾邮件、情感 |
| **生成** | 写出新内容 | 文案、代码 |
| **嵌入模型**（embedding） | 文本→向量，便于相似检索 | RAG 索引器 |
| **多模态** | 同时吃图/文/音 | 看图回答 |

---

## 3. 按「语言」角色（产品口语）

| 类型 | 作用 |
|------|------|
| **基座语言模型** | 海量预训练，擅长续写，未必听话 |
| **对话 / 指令模型** | 再经微调与对齐，听人话、会拒答 |
| **推理加强模型** | 更擅长多步思考（各家命名不同） |
| **编码专用 / 补全模型** | 偏向编辑器补全、填空 |

---

## 4. 按部署

| 类型 | 诞生原因 | 作用 |
|------|----------|------|
| **云端大模型接口** | 训练贵，集中服务 | 开箱即用 |
| **开源可自托管** | 数据主权 / 成本 | 本地或私有云 |
| **小模型 / 端侧** | 离线低延迟 | 牺牲上限换可控 |

---

## 本仓怎么做

| 你配置的 | 常见是 |
|----------|--------|
| \`ai-workflow.yaml\` 里的提供商 | 云端 **对话向 Decoder-only LLM** |
| 嵌入（若开启记忆/知识增强） | **另一类**嵌入模型，不是聊天模型 |
| 工厂课 | 第四章 **Factory**：按配置创建客户端 |

\`\`\`match
{"title":"别混","pairs":[{"id":"chat","left":"对话模型","right":"生成回答、可工具调用"},{"id":"emb","left":"嵌入模型","right":"文本→向量做相似检索"},{"id":"base","left":"基座","right":"未充分对齐的通用预训练权重"},{"id":"enc","left":"Encoder-only","right":"理解向；如 BERT 族"}]}
\`\`\`

## 下一课

第 1 步开始——**令牌与上下文窗口**。
`;

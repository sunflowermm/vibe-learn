/**
 * 改编题库 · interview-adapted-naresh-llm
 * 系统非原创 · AI 全栈向 · 中文 · Nareshedagotti/AI-Engineer-Interview-QA · LLM
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    "id": "adapted:naresh-llm:q1",
    "q": "Large Language Model（LLM）本质上是什么？",
    "choices": [
      {
        "t": "在海量文本上预训练、能理解与生成类人文本的 AI 系统；「大」指参数量与训练数据规模",
        "ok": true,
        "why": "LLM 的核心是 Transformer 架构 + 大规模自监督预训练，使模型具备通用语言能力。"
      },
      {
        "t": "BERT 的 Next Sentence Prediction（NSP）预训练任务",
        "ok": false,
        "why": "NSP 是 BERT 的辅助预训练目标，不是 LLM 的定义。"
      },
      {
        "t": "Multi-head attention 并行运行多个注意力头",
        "ok": false,
        "why": "这是 Transformer 内部机制，不是 LLM 整体定义。"
      },
      {
        "t": "LoRA 冻结主干、只训低秩适配矩阵的 fine-tuning 方法",
        "ok": false,
        "why": "LoRA 是适配手段；LLM 指预训练大模型本身。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q2",
    "q": "LLM 与传统统计语言模型（如 N-gram、HMM）的主要差异是？",
    "choices": [
      {
        "t": "LLM 用 Transformer 捕获长程依赖与上下文语义；传统模型受局部窗口限制，难建模复杂语言结构",
        "ok": true,
        "why": "Transformer 自注意力可全局关联 Token；N-gram 等只看有限历史，表达能力弱得多。"
      },
      {
        "t": "自回归模型（GPT 类）从左到右逐 Token 生成，掩码模型（BERT 类）双向看上下文",
        "ok": false,
        "why": "这是 LLM 内部架构分野，不是与传统统计模型的对比。"
      },
      {
        "t": "自注意力里 Query-Key 点积衡量 Token 间相似度",
        "ok": false,
        "why": "描述注意力计算细节，未回答与传统模型的宏观差异。"
      },
      {
        "t": "蒸馏用小 student 模型模仿大 teacher 模型",
        "ok": false,
        "why": "蒸馏是压缩部署手段，与统计语言模型的本质区别无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q3",
    "q": "context window（上下文窗口）是什么？为何重要？",
    "choices": [
      {
        "t": "推理时模型能同时处理的 Token 上限（含提示与生成）；决定能读多长文档、记多少对话历史",
        "ok": true,
        "why": "超出窗口的旧 Token 会被截断或遗忘，直接影响 RAG 拼上下文与多轮对话能力。"
      },
      {
        "t": "RNN Seq2Seq 用固定长度向量压缩整句输入",
        "ok": false,
        "why": "这是 Transformer 出现前的瓶颈，不是 context window 定义。"
      },
      {
        "t": "beam search 与 greedy decoding 两种解码策略",
        "ok": false,
        "why": "解码策略影响生成质量，与窗口大小无关。"
      },
      {
        "t": "模型背熟训练集、验证集表现差的现象叫过拟合",
        "ok": false,
        "why": "过拟合是训练问题，不是上下文长度概念。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q4",
    "q": "Foundation Model（基础模型）指什么？常见类型有哪些？",
    "choices": [
      {
        "t": "大规模无/自监督预训练、可迁移到多种下游任务的通用模型；如文本 LLM、视觉、多模态基础模型",
        "ok": true,
        "why": "「先预训练学通用表征，再微调或提示适配」是 Foundation Model 范式核心。"
      },
      {
        "t": "自注意力置换不变，必须加位置编码才懂顺序",
        "ok": false,
        "why": "讲 Transformer 位置信息，不是 Foundation Model 概念。"
      },
      {
        "t": "temperature 控制采样随机性：越高输出越多样",
        "ok": false,
        "why": "推理超参，与基础模型定义无关。"
      },
      {
        "t": "embedding 把离散 Token 映射到连续向量空间",
        "ok": false,
        "why": "embedding 是组件层概念；Foundation Model 指整模型范式。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q5",
    "q": "Tokenization（分词）在 LLM 里做什么？为何重要？",
    "choices": [
      {
        "t": "把原始文本切成模型处理的 Token 序列；决定词表大小、序列长度与多语言/罕见词处理能力",
        "ok": true,
        "why": "分词方案（BPE、WordPiece 等）直接影响计费 Token 数、上下文占用与 OOV 处理。"
      },
      {
        "t": "Transformer 编码器双向建表示，解码器带掩码自回归生成",
        "ok": false,
        "why": "描述编解码分工，不是分词流程。"
      },
      {
        "t": "top-k / top-p 截断低概率 Token 防止胡言乱语",
        "ok": false,
        "why": "采样策略，发生在分词之后的生成阶段。"
      },
      {
        "t": "MoE 用路由只激活部分专家层以扩容量",
        "ok": false,
        "why": "模型架构扩展手段，与文本如何切成 Token 无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q6",
    "q": "LLM 如何处理未登录词（OOV）？",
    "choices": [
      {
        "t": "子词分词（BPE、WordPiece）：罕见词拆成已知子词组合，几乎消除传统词表 OOV",
        "ok": true,
        "why": "字符/子词级片段可拼出新词；词级词表才会整词 OOV。"
      },
      {
        "t": "深层 RNN 反传时梯度指数衰减导致早期层学不动",
        "ok": false,
        "why": "梯度消失是 RNN 训练问题，不是 OOV 处理方案。"
      },
      {
        "t": "LoRA 在冻结权重旁加低秩矩阵做参数高效微调",
        "ok": false,
        "why": "微调技术，与词表外词如何编码无关。"
      },
      {
        "t": "GPT-4 相对 GPT-3 支持多模态与更强推理",
        "ok": false,
        "why": "产品能力对比，不回答 OOV 机制。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q7",
    "q": "Masked Language Modeling（MLM，掩码语言建模）如何用于预训练？",
    "choices": [
      {
        "t": "随机遮盖约 15% 的 Token，让模型根据双向上下文预测被遮词；BERT 的核心自监督目标",
        "ok": true,
        "why": "MLM 迫使模型学深层双向语义，适合理解类任务；生成类 GPT 通常用因果 LM 而非 MLM。"
      },
      {
        "t": "注意力用 Q/K/V 加权聚合，让输出聚焦相关输入位置",
        "ok": false,
        "why": "注意力机制通用描述，不是 MLM 预训练目标。"
      },
      {
        "t": "fine-tuning 新任务时覆盖掉预训练知识叫灾难性遗忘",
        "ok": false,
        "why": "微调副作用，与 MLM 预训练无关。"
      },
      {
        "t": "RAG 先检索再生成，把外部知识拼进提示",
        "ok": false,
        "why": "推理架构，不是预训练目标。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q8",
    "q": "Next Sentence Prediction（NSP）预训练任务做什么？",
    "choices": [
      {
        "t": "给两句 A、B，预测 B 是否真是 A 的下一句；帮 BERT 学句间连贯与篇章关系",
        "ok": true,
        "why": "NSP 与 MLM 配合，增强句子级语义；后续研究对其收益有争议，但考点是任务定义。"
      },
      {
        "t": "Multi-head attention 多头并行学不同关系模式",
        "ok": false,
        "why": "架构组件，不是 NSP 任务。"
      },
      {
        "t": "PEFT 冻结主干只训少量参数减轻遗忘",
        "ok": false,
        "why": "微调策略，与 BERT 预训练目标无关。"
      },
      {
        "t": "换种问法模型答案差很多，说明提示工程重要",
        "ok": false,
        "why": "推理期提示敏感性，不是 NSP。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q9",
    "q": "自回归模型与掩码模型在 LLM 训练上有何不同？",
    "choices": [
      {
        "t": "自回归（GPT 类）只看左侧上下文、逐 Token 预测下一词；掩码（BERT 类）双向看全句、适合理解而非开放生成",
        "ok": true,
        "why": "因果掩码保证生成时不偷看未来；双向 MLM 不能原样做自回归解码。"
      },
      {
        "t": "Q·K 点积越大表示两 Token 越该互相关注",
        "ok": false,
        "why": "注意力打分细节，不是两类预训练范式对比。"
      },
      {
        "t": "蒸馏让 student 模仿 teacher 的软标签分布",
        "ok": false,
        "why": "模型压缩方法，与自回归/掩码训练范式无关。"
      },
      {
        "t": "Chain-of-Thought 让模型先写推理步骤再答",
        "ok": false,
        "why": "提示技巧，不是训练目标差异。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q10",
    "q": "Transformer 如何克服传统 RNN Seq2Seq 的瓶颈？",
    "choices": [
      {
        "t": "自注意力并行处理全序列、直接建模任意距离依赖；摆脱 RNN 顺序计算与固定长度上下文向量瓶颈",
        "ok": true,
        "why": "RNN 编码整句为一个向量易信息丢失；Transformer 每层都能全局交互，训练还可并行。"
      },
      {
        "t": "greedy 每步取最高概率 Token；beam search 保留多条候选路径",
        "ok": false,
        "why": "解码算法，不是相对 RNN 的架构优势。"
      },
      {
        "t": "训练集准确率很高但验证集差，说明过拟合",
        "ok": false,
        "why": "泛化诊断，与 Seq2Seq 架构局限无关。"
      },
      {
        "t": "语言建模每步预测下一 Token，常用交叉熵损失",
        "ok": false,
        "why": "训练目标描述，未解释 Transformer 如何突破 RNN 限制。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q11",
    "q": "Transformer 为何需要 positional encoding（位置编码）？",
    "choices": [
      {
        "t": "自注意力对 Token 顺序不敏感（置换等变）；位置编码注入顺序信息，模型才能区分「狗咬人」与「人咬狗」",
        "ok": true,
        "why": "无位置信息时打乱顺序注意力分数不变；绝对/相对位置编码或 RoPE 等是标配。"
      },
      {
        "t": "temperature 除 logits 后 softmax，越高分布越平、采样越随机",
        "ok": false,
        "why": "生成采样超参，不是位置信息问题。"
      },
      {
        "t": "embedding 层把 Token ID 查表成稠密向量",
        "ok": false,
        "why": "embedding 不含顺序；还需额外位置信号。"
      },
      {
        "t": "KL 散度衡量两个概率分布的差异",
        "ok": false,
        "why": "训练/评估指标，与位置编码动机无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q12",
    "q": "原始 Transformer 里 encoder 与 decoder 有何分工？",
    "choices": [
      {
        "t": "编码器双向处理输入建上下文表示；解码器带掩码自注意力 + 交叉注意力，自回归生成输出",
        "ok": true,
        "why": "经典 Seq2Seq Transformer 用 encoder 读源句、decoder 写目标句；纯 GPT 只有 decoder 栈。"
      },
      {
        "t": "top-k 固定保留前 k 个候选；top-p 按累积概率动态截断词表",
        "ok": false,
        "why": "采样截断策略，不是编解码结构。"
      },
      {
        "t": "MoE 每层按路由只激活少数专家 FFN",
        "ok": false,
        "why": "稀疏激活架构，与 encoder/decoder 角色无关。"
      },
      {
        "t": "softmax 把 logits 归一化成概率分布",
        "ok": false,
        "why": "通用激活/归一化，不区分 encoder 与 decoder。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q13",
    "q": "梯度消失问题是什么？Transformer 如何缓解？",
    "choices": [
      {
        "t": "深层网络反传梯度指数缩小，早期层难更新；Transformer 用残差连接、LayerNorm 与更短路径改善梯度流",
        "ok": true,
        "why": "RNN 长链反传尤甚；Transformer 并行层 + 残差让梯度更直达，配合 Adam 等优化器稳定训练。"
      },
      {
        "t": "LoRA 只训低秩适配矩阵，省显存又保预训练能力",
        "ok": false,
        "why": "微调效率手段，不是解决梯度消失的主因。"
      },
      {
        "t": "GPT-4 多模态、更长上下文、更强指令遵循",
        "ok": false,
        "why": "产品能力，与梯度传播机制无关。"
      },
      {
        "t": "Jacobian 矩阵存向量函数对各输入的偏导，用于链式反传",
        "ok": false,
        "why": "数学工具描述，未点明 Transformer 的具体缓解手段。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q14",
    "q": "Transformer 里的 attention（注意力）机制如何工作？",
    "choices": [
      {
        "t": "用 Query 与 Key 算相关性权重，对 Value 加权求和；让每步输出聚焦最相关的上下文 Token",
        "ok": true,
        "why": "Scaled dot-product attention：softmax(QK^T/√d)·V，是 Transformer 捕获依赖的核心。"
      },
      {
        "t": "微调新域数据时忘掉旧能力叫灾难性遗忘",
        "ok": false,
        "why": "持续学习问题，不是注意力计算流程。"
      },
      {
        "t": "RAG 检索相关片段拼进提示再让 LLM 回答",
        "ok": false,
        "why": "应用架构，不是模型内部注意力。"
      },
      {
        "t": "复合函数求导用链式法则连乘各层 Jacobian",
        "ok": false,
        "why": "反传数学基础，不解释注意力直觉。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q15",
    "q": "Multi-head attention（多头注意力）比单头好在哪里？",
    "choices": [
      {
        "t": "多个头并行学不同子空间关系（语法、指代、共现等），再拼接融合，表达力更强",
        "ok": true,
        "why": "单头只能一种注意力模式；多头相当于多视角同时看序列。"
      },
      {
        "t": "PEFT 只更新少量附加参数，冻结预训练权重防覆盖",
        "ok": false,
        "why": "微调策略，不是多头设计动机。"
      },
      {
        "t": "提示措辞微调可显著改变输出质量",
        "ok": false,
        "why": "推理期现象，与注意力头数无关。"
      },
      {
        "t": "PCA 用协方差矩阵特征向量做降维",
        "ok": false,
        "why": "经典降维方法，不是 Transformer 多头机制。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q16",
    "q": "自注意力里点积（dot product）起什么作用？算力上有何影响？",
    "choices": [
      {
        "t": "Q·K 衡量 Token 相似度得注意力分数；序列长 n 时注意力矩阵 O(n²)，长上下文成本高",
        "ok": true,
        "why": "点积是默认打分方式；n² 复杂度是长窗口推理/训练的主要瓶颈之一。"
      },
      {
        "t": "蒸馏压缩模型体积，部署到小端",
        "ok": false,
        "why": "部署优化，与注意力打分和复杂度无关。"
      },
      {
        "t": "CoT 提示模型分步推理再给出答案",
        "ok": false,
        "why": "提示策略，不是 Q·K 计算。"
      },
      {
        "t": "判别模型学 P(y|x)，生成模型学 P(x) 或 P(x,y)",
        "ok": false,
        "why": "机器学习范式对比，不是自注意力细节。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q17",
    "q": "beam search 与 greedy decoding（贪心解码）有何区别？",
    "choices": [
      {
        "t": "贪心每步只取最高概率 Token，快但易局部最优；beam search 同时保留 k 条高分路径，质量更好但更慢",
        "ok": true,
        "why": "beam 在翻译等任务常用；开放对话更常配合 sampling（top-p 等）。"
      },
      {
        "t": "验证 loss 上升而训练 loss 下降是过拟合信号",
        "ok": false,
        "why": "训练诊断，不是解码算法对比。"
      },
      {
        "t": "下一 Token 分类用交叉熵对齐 one-hot 标签",
        "ok": false,
        "why": "训练损失，与推理解码策略无关。"
      },
      {
        "t": "零样本只靠提示描述、不给示例就能做新任务",
        "ok": false,
        "why": "上下文学习概念，不是 beam vs greedy。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q18",
    "q": "LLM 生成里的 temperature（温度）参数如何起作用？",
    "choices": [
      {
        "t": "softmax 前把 logits 除以 T：T 低则分布更尖、输出更确定；T 高则更随机、更有创意",
        "ok": true,
        "why": "T→0 接近贪心；T>1 拉平概率，适合头脑风暴；事实问答常用低 temperature。"
      },
      {
        "t": "embedding 把 Token 映射到 d 维连续向量",
        "ok": false,
        "why": "输入表示，不是采样随机性控制。"
      },
      {
        "t": "KL(P||Q) 衡量分布 P 相对 Q 的信息损失",
        "ok": false,
        "why": "训练/蒸馏指标，与 temperature 无关。"
      },
      {
        "t": "few-shot 在提示里放少量输入输出示例",
        "ok": false,
        "why": "上下文学习手段，不是 logits 缩放。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q19",
    "q": "top-k sampling 与 nucleus sampling（top-p）有何不同？",
    "choices": [
      {
        "t": "top-k 固定保留概率最高的 k 个 Token；top-p 按累积概率达 p 动态截断，词表大时更自适应",
        "ok": true,
        "why": "两者都避免采到长尾低概率 Token；top-p 在分布平坦/尖锐时截断集大小会自动变。"
      },
      {
        "t": "MoE 用门控网络选 top 专家，稀疏激活扩参数量",
        "ok": false,
        "why": "模型架构，不是解码采样截断。"
      },
      {
        "t": "softmax 输出非负且和为 1 的概率向量",
        "ok": false,
        "why": "归一化步骤，未区分 top-k 与 top-p 策略。"
      },
      {
        "t": "生产 LLM 要防幻觉、控成本、做评测与护栏",
        "ok": false,
        "why": "系统工程清单，不是采样算法差异。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag-eval",
      "ai-prompt-security",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q20",
    "q": "LoRA 与 QLoRA 是什么？何时选用？",
    "choices": [
      {
        "t": "LoRA 冻结主干、训低秩适配矩阵做参数高效 fine-tuning；QLoRA 再量化基座（如 4bit）+ LoRA，单卡也能训大模型",
        "ok": true,
        "why": "显存/算力有限、要多任务适配权重时首选；全参微调成本高且易遗忘。"
      },
      {
        "t": "GPT-4 比 GPT-3 更强多模态与工具使用",
        "ok": false,
        "why": "产品代际对比，不是 LoRA/QLoRA 定义。"
      },
      {
        "t": "Jacobian 存各输出对输入偏导，链式反传连乘",
        "ok": false,
        "why": "优化数学，与 PEFT 方法无关。"
      },
      {
        "t": "LLM 是在海量文本上预训练的语言模型",
        "ok": false,
        "why": "过于宽泛，未回答 LoRA/QLoRA 机制与场景。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-finetune",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q21",
    "q": "LLM fine-tuning 时如何缓解灾难性遗忘（catastrophic forgetting）？",
    "choices": [
      {
        "t": "用 PEFT/LoRA 少动主干、混合旧数据回放、较小学习率、正则与早停等多手段组合",
        "ok": true,
        "why": "全参猛训新域最易覆盖通用能力；工程上常 PEFT + 回放 + 监控通用 benchmark。"
      },
      {
        "t": "RAG 把私有知识放向量库，推理时再检索",
        "ok": false,
        "why": "补知识手段，不直接解决权重被覆盖的遗忘。"
      },
      {
        "t": "链式法则把复合函数梯度逐层相乘",
        "ok": false,
        "why": "反传基础，不是防遗忘策略。"
      },
      {
        "t": "N-gram 只看固定长度历史，难建模长依赖",
        "ok": false,
        "why": "传统模型局限，与微调遗忘无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-vector-store",
      "ai-rag",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q22",
    "q": "Parameter-Efficient Fine-Tuning（PEFT）为何能减轻灾难性遗忘？",
    "choices": [
      {
        "t": "冻结预训练权重，只训少量附加参数（如 LoRA 矩阵），难大规模覆盖原有表征",
        "ok": true,
        "why": "主干能力保留在 frozen weights；适配增量集中在小模块，遗忘风险低于全参微调。"
      },
      {
        "t": "换提示模板就能大幅改变模型行为",
        "ok": false,
        "why": "提示工程不改权重，不是 PEFT 机制。"
      },
      {
        "t": "特征值分解用于 PCA 找主成分方向",
        "ok": false,
        "why": "线性代数降维，与 PEFT 无关。"
      },
      {
        "t": "context window 决定一次能读多少 Token",
        "ok": false,
        "why": "推理上下文限制，不是微调防遗忘原理。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-finetune",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q23",
    "q": "model distillation（模型蒸馏）在 LLM 里怎么用？",
    "choices": [
      {
        "t": "用大 teacher 的软标签/logits 训小 student，在更小体积下逼近大模型行为，便于边缘部署",
        "ok": true,
        "why": "蒸馏传的不只是硬标签，还有类间相对概率；常配合数据增强与中间层对齐。"
      },
      {
        "t": "CoT 让模型显式写出中间推理链",
        "ok": false,
        "why": "推理提示技巧，不是模型压缩训练。"
      },
      {
        "t": "生成模型建模 P(x)，判别模型建模 P(y|x)",
        "ok": false,
        "why": "建模范式对比，未涉及 teacher-student 蒸馏。"
      },
      {
        "t": "Foundation Model 先大规模预训练再下游适配",
        "ok": false,
        "why": "训练范式概述，不是蒸馏流程。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-llm-era"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q24",
    "q": "训练 LLM 时什么是过拟合（overfitting）？如何预防？",
    "choices": [
      {
        "t": "模型背训练集、验证集变差；可用 dropout、权重衰减、早停、更多数据、降低学习率等",
        "ok": true,
        "why": "大模型亦会过拟合小数据集微调；监控 train/val loss 与下游 benchmark 是关键。"
      },
      {
        "t": "语言建模每步用交叉熵比较预测分布与真实 Token",
        "ok": false,
        "why": "标准训练目标，不是过拟合定义或预防。"
      },
      {
        "t": "零样本靠任务描述、不给示例完成新任务",
        "ok": false,
        "why": "推理能力，与训练期过拟合无关。"
      },
      {
        "t": "BPE 把词拆成子词降低 OOV",
        "ok": false,
        "why": "分词策略，不是正则化或过拟合手段。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q25",
    "q": "embedding 在 LLM 中扮演什么角色？通常如何初始化？",
    "choices": [
      {
        "t": "把离散 Token ID 映射到连续向量供网络计算；词嵌入常随机初始化，预训练中与权重一起学；也可用语义预训练向量初始化",
        "ok": true,
        "why": "输入/输出常共享或绑权 embedding；质量影响语义几何与下游检索（同一空间可算相似度）。"
      },
      {
        "t": "KL 散度非对称，衡量用 Q 近似 P 的信息损失",
        "ok": false,
        "why": "分布距离指标，不是 embedding 职能。"
      },
      {
        "t": "few-shot 在提示里放 k 个示范样本",
        "ok": false,
        "why": "上下文学习，不是向量查表层。"
      },
      {
        "t": "子词分词把罕见词拆成片段",
        "ok": false,
        "why": "分词步骤在 embedding 查表之前，角色不同。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q26",
    "q": "Mixture of Experts（MoE）如何提升 LLM 可扩展性？",
    "choices": [
      {
        "t": "多层 FFN 换成多个「专家」，门控按 Token 只激活 top-k 专家；参数量大增但每 Token 计算量可控",
        "ok": true,
        "why": "稀疏激活让「大容量、低 FLOPs/Token」成为可能；路由与负载均衡是工程难点。"
      },
      {
        "t": "softmax 把注意力分数归一化为权重",
        "ok": false,
        "why": "注意力步骤，不是 MoE 稀疏 FFN 设计。"
      },
      {
        "t": "上线要监控幻觉率、延迟、成本与安全护栏",
        "ok": false,
        "why": "运维清单，不是 MoE 架构原理。"
      },
      {
        "t": "MLM 随机遮盖 Token 做双向预测",
        "ok": false,
        "why": "BERT 预训练目标，与 MoE 扩展无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-prompt-security",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q27",
    "q": "相对 GPT-3，GPT-4 在能力与典型应用上有哪些提升？",
    "choices": [
      {
        "t": "更强推理与指令遵循、更长上下文、多模态（图像输入）、更好安全对齐；适合复杂 Agent、文档分析、代码助手",
        "ok": true,
        "why": "GPT-4 代际跃迁主要在可靠性、多模态与工具链；具体架构未全公开但 API 能力可观测。"
      },
      {
        "t": "Jacobian 矩阵描述向量值函数局部线性近似",
        "ok": false,
        "why": "数学概念，不是 GPT 代际差异。"
      },
      {
        "t": "LLM 是在大量文本上训练的语言模型",
        "ok": false,
        "why": "泛化定义，未体现 GPT-3→4 的具体提升。"
      },
      {
        "t": "NSP 判断两句是否相邻",
        "ok": false,
        "why": "BERT 预训练任务，与 GPT-4 产品能力无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-birth",
      "craft-security",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q28",
    "q": "Retrieval-Augmented Generation（RAG）流水线关键步骤有哪些？",
    "choices": [
      {
        "t": "文档解析分块 → embedding 入库 → 查询向量化 → 检索 Top-K →（可选重排）→ 拼进提示 → LLM 生成",
        "ok": true,
        "why": "RAG 核心是把训练集外知识经检索注入 context window，减少幻觉并支持私有数据。"
      },
      {
        "t": "复合函数梯度用链式法则逐层相乘",
        "ok": false,
        "why": "优化数学，不是 RAG 流程。"
      },
      {
        "t": "统计语言模型只看短 n-gram 窗口",
        "ok": false,
        "why": "历史背景，不是 RAG 步骤。"
      },
      {
        "t": "GPT 自回归、BERT 双向掩码",
        "ok": false,
        "why": "模型范式，不是检索增强生成管线。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "ai-rerank",
      "ai-rag-eval"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q29",
    "q": "prompt engineering（提示工程）如何影响 LLM 输出？",
    "choices": [
      {
        "t": "同一任务不同措辞/角色/格式/示例顺序可显著改变质量；系统化设计 system、user、few-shot 与输出约束很重要",
        "ok": true,
        "why": "LLM 对上下文极敏感；提示是「软编程」，影响遵循度、风格与事实性。"
      },
      {
        "t": "协方差矩阵特征向量张成数据主变化方向",
        "ok": false,
        "why": "PCA 数学，不是提示设计。"
      },
      {
        "t": "context window 满了就要截断或摘要历史",
        "ok": false,
        "why": "上下文长度管理，不是提示工程本身。"
      },
      {
        "t": "Transformer 用自注意力替代 RNN 顺序计算",
        "ok": false,
        "why": "架构历史，与提示如何塑造输出无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q30",
    "q": "Chain-of-Thought（CoT）提示如何改善复杂推理？",
    "choices": [
      {
        "t": "要求或示范「先写中间推理步骤再给最终答案」，把多步计算摊开，降低一步算错的概率",
        "ok": true,
        "why": "CoT 利用 LLM 自回归生成能力，让后续 Token  conditioning 在前文推理链上；对算术、逻辑题尤其有效。"
      },
      {
        "t": "判别模型直接学决策边界，生成模型建模数据分布",
        "ok": false,
        "why": "ML 范式对比，不是 CoT 机制。"
      },
      {
        "t": "Foundation Model 大规模预训练后迁移",
        "ok": false,
        "why": "训练范式，不是推理期提示策略。"
      },
      {
        "t": "位置编码注入 Token 顺序信息",
        "ok": false,
        "why": "模型结构组件，与 CoT 提示无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q31",
    "q": "语言建模为何常用 cross-entropy loss（交叉熵损失）？",
    "choices": [
      {
        "t": "每步把预测下一 Token 当多类分类，交叉熵衡量预测分布与 one-hot 真值的差距，梯度性质好、与 perplexity 直接相关",
        "ok": true,
        "why": "等价于最大化正确 Token 的对数似然；是 GPT 类预训练的标准目标。"
      },
      {
        "t": "零样本只靠自然语言任务描述、无微调无示例",
        "ok": false,
        "why": "推理设定，不是训练损失选择。"
      },
      {
        "t": "分词决定序列长度与词表",
        "ok": false,
        "why": "预处理，与损失函数无关。"
      },
      {
        "t": "encoder 读输入、decoder 写输出",
        "ok": false,
        "why": "架构分工，未解释为何用交叉熵。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q32",
    "q": "KL divergence（KL 散度）在 LLM 训练与评估中怎么用？",
    "choices": [
      {
        "t": "衡量两概率分布差异；蒸馏里 student 对齐 teacher 软分布，RLHF 里约束策略勿偏离参考模型太远",
        "ok": true,
        "why": "KL(P||Q) 非对称；过小 KL 保能力，过大 KL 限制探索——对齐训练的核心正则之一。"
      },
      {
        "t": "few-shot 在提示中放 k 个输入输出对",
        "ok": false,
        "why": "上下文学习，不是分布距离指标。"
      },
      {
        "t": "BPE 子词分词缓解 OOV",
        "ok": false,
        "why": "分词方案，与 KL 无关。"
      },
      {
        "t": "RNN 深层梯度消失",
        "ok": false,
        "why": "训练稳定性问题，不是 KL 用途。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q33",
    "q": "softmax 函数是什么？在 attention 里起何作用？",
    "choices": [
      {
        "t": "把 logits 映射为非负且和为 1 的概率；attention 中对 QK 分数做 softmax 得权重，再加权 V",
        "ok": true,
        "why": "softmax(x_i)=exp(x_i)/Σexp(x_j)；保证注意力权重可解释且可微。"
      },
      {
        "t": "生产系统要处理幻觉、注入、成本与延迟",
        "ok": false,
        "why": "工程挑战清单，不是 softmax 定义。"
      },
      {
        "t": "MLM 遮盖 15% Token 做预测",
        "ok": false,
        "why": "预训练任务，虽也用 softmax 输出，但不是本题所问 attention 角色。"
      },
      {
        "t": "注意力让模型动态选择关注哪些 Token",
        "ok": false,
        "why": "注意力直觉正确，但未说明 softmax 如何把分数变成归一化权重。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer",
      "craft-security"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q34",
    "q": "Jacobian 矩阵在 Transformer 反传中扮演什么角色？",
    "choices": [
      {
        "t": "存向量函数对各输入偏导；链式法则把各层 Jacobian 连乘（或高效等价形式）得到梯度",
        "ok": true,
        "why": "多层 attention、FFN、LayerNorm 复合；自动微分实质是链式 Jacobian 传播。"
      },
      {
        "t": "LLM 是在海量文本上预训练的语言模型",
        "ok": false,
        "why": "概念定义，未触及反传数学。"
      },
      {
        "t": "NSP 判断句子是否连续",
        "ok": false,
        "why": "预训练任务，与 Jacobian 无关。"
      },
      {
        "t": "多头注意力并行多个子空间",
        "ok": false,
        "why": "模块结构，不是梯度传播的矩阵形式。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q35",
    "q": "微积分链式法则（chain rule）与深度学习梯度下降有何关系？",
    "choices": [
      {
        "t": "复合函数导数是各层导数连乘；深度网络反传就是链式法则，把损失梯度传到每层参数",
        "ok": true,
        "why": "没有链式法则就无法训练多层 Transformer；实现上由 autograd 自动完成。"
      },
      {
        "t": "传统 N-gram 难捕获长程依赖",
        "ok": false,
        "why": "语言模型历史，不是链式法则应用。"
      },
      {
        "t": "自回归 vs 掩码是两种预训练范式",
        "ok": false,
        "why": "架构训练差异，与求导链式无关。"
      },
      {
        "t": "Q·K 点积算注意力分数",
        "ok": false,
        "why": "前向计算细节，不是梯度链式传播。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q36",
    "q": "特征值与特征向量（eigenvalues/eigenvectors）在降维里如何用？",
    "choices": [
      {
        "t": "对协方差矩阵求特征分解，最大特征值对应方向即主成分；PCA 保留前 k 个特征向量投影降维",
        "ok": true,
        "why": "Av=λv 表示沿 v 方向变换只缩放；PCA 找数据方差最大的正交轴。"
      },
      {
        "t": "context window 限制一次可见 Token 数",
        "ok": false,
        "why": "LLM 推理概念，不是线性代数降维。"
      },
      {
        "t": "RNN Seq2Seq 用固定向量压缩句子",
        "ok": false,
        "why": "旧架构瓶颈，与 PCA/特征分解无关。"
      },
      {
        "t": "beam search 保留多条解码假设",
        "ok": false,
        "why": "解码算法，不是降维数学。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q37",
    "q": "生成模型（Generative）与判别模型（Discriminative）有何区别？",
    "choices": [
      {
        "t": "判别模型学 P(y|x) 决策边界（如分类器）；生成模型学 P(x) 或 P(x,y) 可采样生成数据；LLM 是生成模型",
        "ok": true,
        "why": "BERT 分类头常当判别用；GPT 建模联合/条件序列概率以生成文本。"
      },
      {
        "t": "Foundation Model 先预训练再适配下游",
        "ok": false,
        "why": "训练流程，不是生成/判别建模范式对比。"
      },
      {
        "t": "自注意力置换不变需位置编码",
        "ok": false,
        "why": "Transformer 细节，不是两类模型定义。"
      },
      {
        "t": "temperature 调节采样随机性",
        "ok": false,
        "why": "推理超参，与 P(y|x) vs P(x) 无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q38",
    "q": "zero-shot learning（零样本）在 LLM 里指什么？",
    "choices": [
      {
        "t": "不给任务示例、只靠自然语言指令描述，模型凭预训练泛化完成未见过的任务格式",
        "ok": true,
        "why": "大模型 + 指令微调后零样本能力显著；与 few-shot、fine-tuning 形成光谱。"
      },
      {
        "t": "BPE 把未知词拆成子词",
        "ok": false,
        "why": "分词机制，不是零样本学习定义。"
      },
      {
        "t": "encoder 双向、decoder 单向生成",
        "ok": false,
        "why": "架构分工，与是否给示例无关。"
      },
      {
        "t": "top-k/top-p 截断采样空间",
        "ok": false,
        "why": "解码策略，不是零样本概念。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q39",
    "q": "LLM 的 few-shot learning（少样本）是什么？有何优势？",
    "choices": [
      {
        "t": "在提示里放少量输入输出示范，不更新权重即可引导格式与任务；比零样本稳，比全量 fine-tuning 便宜",
        "ok": true,
        "why": "利用 in-context learning：示例占 context window，模型从模式推断规则。"
      },
      {
        "t": "子词分词解决 OOV",
        "ok": false,
        "why": "词表处理，不是上下文示例学习。"
      },
      {
        "t": "深层 RNN 梯度消失",
        "ok": false,
        "why": "训练问题，与 few-shot 无关。"
      },
      {
        "t": "LoRA 参数高效微调",
        "ok": false,
        "why": "LoRA 要更新权重；few-shot 是推理期 in-context，不训参。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-finetune",
      "ai-rules"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  },
  {
    "id": "adapted:naresh-llm:q40",
    "q": "落地 LLM 应用常见挑战有哪些？如何应对？",
    "choices": [
      {
        "t": "幻觉、时效性、成本延迟、安全注入、评测难；组合 RAG、护栏、监控、RLHF/对齐、缓存与路由等小模型",
        "ok": true,
        "why": "生产不是裸调 API；需数据、评测、安全与可观测性整套工程。"
      },
      {
        "t": "MLM 随机遮盖 Token 预训练",
        "ok": false,
        "why": "预训练技巧，不是上线挑战清单。"
      },
      {
        "t": "注意力动态加权上下文",
        "ok": false,
        "why": "模型机制，不是运维/产品风险。"
      },
      {
        "t": "fine-tune 新数据会灾难性遗忘",
        "ok": false,
        "why": "训练侧问题之一，但未覆盖幻觉、成本等更常见的生产痛点。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "LLM",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag-eval",
      "ai-prompt-security",
      "ai-rag"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · LLM",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-llm"
  }
];

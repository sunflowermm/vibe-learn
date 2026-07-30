/**
 * 改编题库 · interview-adapted-naresh-transformer
 * 系统非原创 · AI 全栈向 · 中文 · Nareshedagotti/AI-Engineer-Interview-QA · Transformers
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    "id": "adapted:naresh-transformer:1",
    "q": "原始 Transformer 在 seq2seq 里主要想解决什么问题？它如何摆脱循环或卷积的串行瓶颈？",
    "choices": [
      {
        "t": "RNN 必须逐 token 串行，长依赖难、训练慢；Transformer 用 self-attention 并行算全局依赖，无需 recurrence/convolution",
        "ok": true,
        "why": "Attention 让序列内任意位置一步互看，计算可高度并行，同时缓解长程依赖衰减。"
      },
      {
        "t": "把输入乘三组权重矩阵得到 Q、K、V，再 softmax 加权求和",
        "ok": false,
        "why": "这是 scaled dot-product attention 的计算步骤，不是「为何发明 Transformer」。"
      },
      {
        "t": "自回归生成：每步只产出下一个 token，依赖已生成前缀",
        "ok": false,
        "why": "描述解码方式，与 RNN 瓶颈及并行化动机无关。"
      },
      {
        "t": "mBART/mT5 在多语言单语数据上做去噪预训练，再微调翻译",
        "ok": false,
        "why": "多语言训练范式，不是 Transformer 相对 RNN 的核心动机。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "ai-transformer",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:2",
    "q": "标准 Transformer 从输入 token 到输出 logits，数据大致怎样流动？",
    "choices": [
      {
        "t": "分词 → token embedding + positional encoding → N 层 encoder（self-attention + FFN）→ 输出头；decoder 侧另有 masked self-attention 与 cross-attention",
        "ok": true,
        "why": "嵌入与位置信息先融合，再经堆叠的注意力与 FFN 子层，最后线性映射到词表概率。"
      },
      {
        "t": "multi-head attention 并行跑多组 Q/K/V 投影，再 concat 回投影",
        "ok": false,
        "why": "只是层内子模块，不是端到端全链路。"
      },
      {
        "t": "理解任务用 encoder-only，生成用 decoder-only，翻译用 encoder-decoder",
        "ok": false,
        "why": "架构选型原则，不是单条前向数据流描述。"
      },
      {
        "t": "MoE 用门控网络为每个 token 挑选少数 expert FFN",
        "ok": false,
        "why": "稀疏 FFN 变体，不是 vanilla Transformer 主路径。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:3",
    "q": "Transformer 为何依赖 embedding？token embedding、positional embedding、segment embedding 各管什么？",
    "choices": [
      {
        "t": "离散 token 需连续向量才能做矩阵运算；token 表语义，positional 表顺序，segment（如 BERT）区分句子 A/B",
        "ok": true,
        "why": "三种嵌入分别注入词义、位置与段落身份，再相加或拼接进模型。"
      },
      {
        "t": "self-attention 里 Q、K、V 都来自同一输入序列",
        "ok": false,
        "why": "说明 self-attention 数据来源，不是 embedding 类型分工。"
      },
      {
        "t": "BPE 从字符出发迭代合并高频对；WordPiece 按似然选合并",
        "ok": false,
        "why": "分词算法对比，与 embedding 角色无关。"
      },
      {
        "t": "Dense Transformer 每个 token 激活全部参数，成本随模型线性涨",
        "ok": false,
        "why": "Dense vs MoE 成本，不是 embedding 解释。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:4",
    "q": "为何 Transformer 必须加 positional encoding？正弦固定式与可学习式各有什么特点？",
    "choices": [
      {
        "t": "attention 对输入集合无序，不加位置则「猫追鼠」与「鼠追猫」等价；正弦可外推、无额外参数，可学习式灵活但常受训练长度限制",
        "ok": true,
        "why": "位置编码把顺序信息注入表示；固定正弦有相对距离结构，学习式依赖见过长度。"
      },
      {
        "t": "序列长 n 时 attention 矩阵是 n×n，复杂度 O(n²)",
        "ok": false,
        "why": "复杂度分析，不是「为何需要位置信息」。"
      },
      {
        "t": "weight tying：输入 embedding 矩阵与输出投影共用权重",
        "ok": false,
        "why": "参数共享技巧，与顺序建模无关。"
      },
      {
        "t": "label smoothing 把 one-hot 标签软化为带小概率的分布",
        "ok": false,
        "why": "训练正则，不是 positional encoding 问题。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:5",
    "q": "残差连接（residual connection）在 attention 与 FFN 外为何几乎标配？",
    "choices": [
      {
        "t": "output = Layer(x) + x，给梯度开捷径、缓解深层 vanishing gradient，并保留低层表示供高层组合",
        "ok": true,
        "why": "恒等旁路让训练更稳，深层堆叠才可行。"
      },
      {
        "t": "Query 表「找什么」，Key 表「提供什么」，Value 表「取回什么」",
        "ok": false,
        "why": "Q/K/V 语义，不是残差动机。"
      },
      {
        "t": "Bi-Encoder 双塔各自编码，再用余弦比相似度",
        "ok": false,
        "why": "检索架构，与残差无关。"
      },
      {
        "t": "AdamW 把 weight decay 与梯度更新解耦，正则更好",
        "ok": false,
        "why": "优化器细节，不是残差连接作用。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:6",
    "q": "LayerNorm 在做什么？为何现代模型多用 Pre-LN 而非 Post-LN？",
    "choices": [
      {
        "t": "对每个 token 的特征维做归一化再仿射变换；Pre-LN 先 norm 再子层，梯度更稳、深层更好训，Post-LN 原始论文用法但深模型易不稳定",
        "ok": true,
        "why": "Pre-LN 把归一化放在子层前，减轻深层训练发散风险。"
      },
      {
        "t": "encoder 每层含 multi-head self-attention 与 position-wise FFN 两个子层",
        "ok": false,
        "why": "encoder 块结构，不是 LayerNorm 机制。"
      },
      {
        "t": "Cross-Encoder 把两段文本拼接后联合编码，交互更充分",
        "ok": false,
        "why": "双塔 vs 交叉编码对比，与 norm 位置无关。"
      },
      {
        "t": "gradient checkpointing 只存部分中间激活，反向时重算以省显存",
        "ok": false,
        "why": "显存优化，不是 LayerNorm 选型。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:7",
    "q": "FFN（前馈网络）在 Transformer 层里扮演什么角色？为何对每个 token 独立施加？",
    "choices": [
      {
        "t": "两层线性 + 非线性（常 GELU/ReLU），在 attention 混合信息后再做 per-token 非线性变换，相当于「逐位置 MLP」",
        "ok": true,
        "why": "Attention 负责 token 间交互，FFN 负责同一位置上的特征变换与容量扩展。"
      },
      {
        "t": "decoder 三层子结构：masked self-attention、encoder-decoder cross-attention、FFN",
        "ok": false,
        "why": "decoder 整体布局，不是 FFN 单独职责。"
      },
      {
        "t": "多语言 encoder 用共享子词表 + MLM 联合训练各语言",
        "ok": false,
        "why": "多语言训练，与 FFN 功能无关。"
      },
      {
        "t": "RoPE 通过旋转 Q/K 向量编码相对位置",
        "ok": false,
        "why": "位置编码方案，不是 FFN。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:8",
    "q": "scaled dot-product self-attention 怎么算？为何要除以 √d_k？",
    "choices": [
      {
        "t": "Q= XW_Q, K=XW_K, V=XW_V；scores=QK^T/√d_k 再 softmax 乘 V；缩放防止 d_k 大时点积方差过大导致 softmax 饱和、梯度变小",
        "ok": true,
        "why": "不缩放时高维点积分布尖峰，attention 权重趋 one-hot，训练难。"
      },
      {
        "t": "自回归：每步只依赖已生成前缀预测下一 token",
        "ok": false,
        "why": "解码策略，不是 attention 公式。"
      },
      {
        "t": "mT5 先在多语言单语语料去噪预训练，再用少量平行语料微调",
        "ok": false,
        "why": "多语言训练流程，与缩放因子无关。"
      },
      {
        "t": "对比学习拉近正样本、推远负样本以学 embedding",
        "ok": false,
        "why": "Bi-Encoder 训练目标，不是 attention 数学。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:9",
    "q": "multi-head attention 相比单头 attention 多学到什么？",
    "choices": [
      {
        "t": "h 组并行 Q/K/V 投影，各头学不同关系（语法、共指、远近等），concat 后再线性融合",
        "ok": true,
        "why": "多子空间并行关注，比单一 attention 模式表达力更强。"
      },
      {
        "t": "理解类任务用 encoder-only 双向上下文，生成用 decoder-only",
        "ok": false,
        "why": "架构选型，不是多头机制。"
      },
      {
        "t": "MoE 每层只激活少数 expert FFN 以扩容量",
        "ok": false,
        "why": "稀疏 FFN，与 attention head 无关。"
      },
      {
        "t": "greedy decoding 每步取 argmax，快但易重复",
        "ok": false,
        "why": "推理解码，不是多头 attention。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:10",
    "q": "self-attention、cross-attention、masked self-attention 分别是什么？典型用在哪？",
    "choices": [
      {
        "t": "self：Q/K/V 同源（encoder/decoder 内）；cross：Q 来自 decoder、K/V 来自 encoder；masked self：decoder 内因果掩码，只看左侧",
        "ok": true,
        "why": "三种模式对应序列内交互、编解码对齐与自回归约束。"
      },
      {
        "t": "BPE/WordPiece/SentencePiece 都是子词分词，利于 OOV 与多语言",
        "ok": false,
        "why": "分词器，不是 attention 类型。"
      },
      {
        "t": "Dense 模型每 token 激活全参数；MoE 只激活部分 expert",
        "ok": false,
        "why": "FFN 稀疏化，与 attention 分类无关。"
      },
      {
        "t": "标准 attention 序列长度 n 时复杂度 O(n²)",
        "ok": false,
        "why": "复杂度陈述，不是三种 attention 对比。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:11",
    "q": "attention 矩阵为何随序列长度二次增长？线上会带来哪些实际问题？",
    "choices": [
      {
        "t": "每 token 与全体 token 两两算分，n 个 token 约 n² 对；显存/算力随上下文暴涨，长文档、高并发推理成本与延迟难控",
        "ok": true,
        "why": "O(n²) 是长上下文与 batch 扩展的主要瓶颈之一。"
      },
      {
        "t": "weight tying 减少 embedding 与输出层参数量",
        "ok": false,
        "why": "参数共享，不是二次复杂度问题。"
      },
      {
        "t": "label smoothing 缓解过拟合 one-hot 标签",
        "ok": false,
        "why": "训练技巧，与 attention 规模无关。"
      },
      {
        "t": "翻译重复多先查 decoder self-attention 是否过度关注近邻 token",
        "ok": false,
        "why": "故障排查，不是复杂度成因。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:12",
    "q": "Query、Key、Value 各表示什么？为何不直接在原始 embedding 上做 attention？",
    "choices": [
      {
        "t": "Q=「我要查什么」，K=「我能被怎样匹配」，V=「被选中后带回的信息」；三组线性投影让同一 embedding 分角色参与匹配与聚合",
        "ok": true,
        "why": "分离匹配空间（Q·K）与内容空间（V）比裸 embedding 更灵活。"
      },
      {
        "t": "Bi-Encoder 双塔独立编码，适合大规模召回",
        "ok": false,
        "why": "检索架构，不是 Q/K/V 定义。"
      },
      {
        "t": "AdamW 自适应学习率 + 解耦 weight decay",
        "ok": false,
        "why": "优化器，与 attention 投影无关。"
      },
      {
        "t": "低资源语言优先在冻结层间插 adapter 微调",
        "ok": false,
        "why": "微调策略，不是 Q/K/V 动机。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-transformer",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:13",
    "q": "Transformer encoder 由什么堆叠而成？各层大致学什么？",
    "choices": [
      {
        "t": "N 个相同层（常 6–12），每层 = multi-head self-attention + FFN，带残差与 LayerNorm；浅层偏局部语法，深层偏语义与长依赖",
        "ok": true,
        "why": "重复块逐层抽象，self-attention 提供全局上下文。"
      },
      {
        "t": "Cross-Encoder 拼接 query 与 doc 后联合 attention，精但慢",
        "ok": false,
        "why": "重排序模型，不是 encoder 层结构。"
      },
      {
        "t": "gradient checkpointing 用重算换显存",
        "ok": false,
        "why": "训练技巧，不是 encoder 学什么。"
      },
      {
        "t": "用 t-SNE/UMAP 看 embedding 聚类诊断检索质量",
        "ok": false,
        "why": "调试手段，不是 encoder 架构。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-embedding",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:14",
    "q": "decoder 为何同时需要 masked self-attention 与 encoder-decoder cross-attention？",
    "choices": [
      {
        "t": "masked self 保证自回归（不能偷看未来 token）；cross-attention 让 decoder 查询 encoder 表示以对齐源句；再加 FFN 做局部变换",
        "ok": true,
        "why": "因果掩码保训练/推理一致，cross-attention 注入源端信息。"
      },
      {
        "t": "XLM-R 等多语言 encoder 共享子词表做 MLM",
        "ok": false,
        "why": "多语言预训练，不是 decoder 双子层动机。"
      },
      {
        "t": "RoPE 把相对位置编进 Q/K 旋转",
        "ok": false,
        "why": "位置编码，与 decoder 结构无关。"
      },
      {
        "t": "RAG 先用 Bi-Encoder 召回再用 Cross-Encoder 重排",
        "ok": false,
        "why": "检索流水线，不是 seq2seq decoder 设计。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-rag",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:15",
    "q": "decoder 如何自回归生成 token？teacher forcing 与 exposure bias 是什么？",
    "choices": [
      {
        "t": "每步基于已生成前缀预测下一 token；训练用 teacher forcing（喂 gold 前缀），推理用自己输出，分布偏移即 exposure bias",
        "ok": true,
        "why": "训练见真前缀、测试见错前缀，误差会累积。"
      },
      {
        "t": "mBART 多语言去噪预训练 + 语言 tag 控制输出语种",
        "ok": false,
        "why": "预训练配方，不是自回归机制。"
      },
      {
        "t": "对比学习用 in-batch 负样本训练双塔检索",
        "ok": false,
        "why": "检索训练，与 decoder 生成无关。"
      },
      {
        "t": "8 万 token 上下文需 block-sparse / sliding-window attention",
        "ok": false,
        "why": "长上下文工程，不是 teacher forcing。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag-shift",
      "ai-token-context",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:16",
    "q": "何时用纯 encoder（如 BERT）、纯 decoder（如 GPT）、还是 encoder-decoder（如 T5）？",
    "choices": [
      {
        "t": "encoder-only：分类/理解，需双向上下文；decoder-only：左到右生成；encoder-decoder：条件生成（翻译、摘要等需编解码对齐）",
        "ok": true,
        "why": "任务是否需要看到全文、是否条件于另一段输入决定架构。"
      },
      {
        "t": "MoE 用门控选 expert 扩模型容量",
        "ok": false,
        "why": "容量扩展方式，不是三段式架构选型。"
      },
      {
        "t": "greedy 解码最快但多样性差",
        "ok": false,
        "why": "推理策略，与模型骨架无关。"
      },
      {
        "t": "超长序列改 RoPE/ALiBi 等相对位置以改善外推",
        "ok": false,
        "why": "位置编码升级，不是 encoder/decoder 组合选择。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:17",
    "q": "BPE、WordPiece、SentencePiece 有何异同？子词分词对多语言系统为何关键？",
    "choices": [
      {
        "t": "BPE 按频次合并；WordPiece 按似然增益合并；SentencePiece 无预分词、可训于 raw 文本；子词共享片段降 OOV、跨语言共享词根",
        "ok": true,
        "why": "统一子词表让稀有词与多语言更可控，词表大小与覆盖率平衡。"
      },
      {
        "t": "Dense Transformer 每 token 走全参数 FFN",
        "ok": false,
        "why": "模型密度，不是分词器对比。"
      },
      {
        "t": "attention 对长度 n 为 O(n²)",
        "ok": false,
        "why": "复杂度，与 BPE 无关。"
      },
      {
        "t": "多头塌缩时可加 head diversity 辅助损失",
        "ok": false,
        "why": "训练正则，不是分词问题。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:18",
    "q": "embedding 与输出层 weight tying 是什么？为何能减参又常略提效果？",
    "choices": [
      {
        "t": "输入 token embedding 矩阵与最后 softmax 投影共用同一权重；少一份大矩阵参数，且输入/输出词表空间一致有正则效果",
        "ok": true,
        "why": "词表维权重最大， tying 显著省参并约束表示一致。"
      },
      {
        "t": "label smoothing 给错误类留小概率",
        "ok": false,
        "why": "标签平滑，不是 weight tying。"
      },
      {
        "t": "翻译重复先查 decoder attention 是否锁死近邻",
        "ok": false,
        "why": "故障排查，与参数共享无关。"
      },
      {
        "t": "attention 全均匀说明 Q/K 交互或 scale 有问题",
        "ok": false,
        "why": "attention 诊断，不是 tying。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:19",
    "q": "Bi-Encoder 怎么工作？相对 Cross-Encoder，何时更适合 RAG 召回？",
    "choices": [
      {
        "t": "query 与 document 各过独立 encoder 得固定向量，余弦/点积比相似度；文档可离线嵌入、在线只算 query，适合百万级召回",
        "ok": true,
        "why": "双塔一次编码、ANN 检索，吞吐高；精度不如交叉编码但 scale 好。"
      },
      {
        "t": "AdamW + warmup + cosine decay 是 Transformer 预训练常见 schedule",
        "ok": false,
        "why": "优化 schedule，不是 Bi-Encoder。"
      },
      {
        "t": "低资源语言在冻结 backbone 上插 adapter",
        "ok": false,
        "why": "微调手段，与双塔检索无关。"
      },
      {
        "t": "MoE expert 不平衡加 load balancing loss",
        "ok": false,
        "why": "MoE 训练，不是 Bi-Encoder。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-vector-store",
      "ai-rag"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:20",
    "q": "Cross-Encoder 为何更准但更慢？典型重排序场景是什么？",
    "choices": [
      {
        "t": "query 与 doc 拼接后联合 self-attention，token 级交互充分；每对都要前向，无法预计算 doc，适合 top-k 精排",
        "ok": true,
        "why": "交互在层内完成，相关性强于单向量相似度，但复杂度随候选对数线性涨。"
      },
      {
        "t": "gradient checkpointing 降低训练显存",
        "ok": false,
        "why": "训练优化，不是 Cross-Encoder 特性。"
      },
      {
        "t": "t-SNE 可视化 embedding 聚类",
        "ok": false,
        "why": "分析工具，不是交叉编码架构。"
      },
      {
        "t": "MoE 用 expert parallelism 跨 GPU 切 expert",
        "ok": false,
        "why": "分布式 MoE，与 reranker 无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-embedding",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:21",
    "q": "XLM-R、mBERT 等多语言 encoder 如何在单一 embedding 空间里表示多种语言？",
    "choices": [
      {
        "t": "大规模多语语料 + 共享 SentencePiece 子词表 + MLM；模型被迫跨语言对齐语义，相似概念在不同语言靠近",
        "ok": true,
        "why": "联合训练与共享词表促进 cross-lingual 表示对齐。"
      },
      {
        "t": "RoPE 优于固定正弦在于相对距离外推",
        "ok": false,
        "why": "位置编码，不是多语言空间。"
      },
      {
        "t": "RAG 召回 Bi-Encoder、重排 Cross-Encoder 是常见两段式",
        "ok": false,
        "why": "检索流水线，不是多语言表示学习。"
      },
      {
        "t": "seq2seq 重复输出先查 cross-attention 是否用到 encoder",
        "ok": false,
        "why": "翻译/debug 场景，与 multilingual embedding 机制无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-embedding",
      "ai-rag"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:22",
    "q": "多语言 encoder-decoder 如何在没有大量平行语料时学会多语对翻译？",
    "choices": [
      {
        "t": "先在多语言单语上做 denoising/MLM 预训练，再用语言 tag + 少量平行句微调；零样本/少样本跨语迁移靠共享表示",
        "ok": true,
        "why": "mT5/mBART 等靠大规模单语 + 语言标识符泛化到未见语对。"
      },
      {
        "t": "对比学习拉近 query-doc 正样本",
        "ok": false,
        "why": "检索训练，不是多语翻译预训练。"
      },
      {
        "t": "8 万 token 需稀疏/分块 attention 降复杂度",
        "ok": false,
        "why": "长上下文工程，与平行语料无关。"
      },
      {
        "t": "ablation 掉 cross-attention 看翻译是否崩",
        "ok": false,
        "why": "诊断实验，不是训练范式。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "ai-rag-shift",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:23",
    "q": "MoE（Mixture of Experts）是什么？门控如何路由 token？常见挑战有哪些？",
    "choices": [
      {
        "t": "用多个 expert FFN 替单层 dense FFN；门控 softmax 选 top-k expert；挑战含 expert 负载不均、通信开销、训练不稳定",
        "ok": true,
        "why": "稀疏激活扩容量但需 load balancing 与路由设计。"
      },
      {
        "t": "greedy decoding 每步 argmax",
        "ok": false,
        "why": "解码，不是 MoE。"
      },
      {
        "t": "RoPE/ALiBi 改善长序列外推",
        "ok": false,
        "why": "位置编码，与 expert 路由无关。"
      },
      {
        "t": "exposure bias 来自 train/test 前缀分布不一致",
        "ok": false,
        "why": "seq2seq 训练问题，不是 MoE。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-token-context",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:24",
    "q": "Dense Transformer 与 MoE Transformer 在速度、扩展与成本上如何权衡？",
    "choices": [
      {
        "t": "Dense 每 token 激活全参，性能稳、实现简单，成本随参数量线性涨；MoE 总参大但每 token 只激活少数 expert，算力/显存可更低，路由与负载均衡更复杂",
        "ok": true,
        "why": "MoE 用稀疏换容量，工程与通信成本更高。"
      },
      {
        "t": "标准 attention O(n²) 限制长上下文",
        "ok": false,
        "why": "attention 复杂度，不是 Dense vs MoE。"
      },
      {
        "t": "head diversity loss 防多头同质化",
        "ok": false,
        "why": "attention 训练技巧，与 MoE 对比无关。"
      },
      {
        "t": "幻觉要靠更好的训练目标与 grounding 缓解",
        "ok": false,
        "why": "生成可靠性，不是架构密度对比。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:25",
    "q": "label smoothing 是什么？在 seq2seq 训练里有什么用？",
    "choices": [
      {
        "t": "把 one-hot 目标软化为 (1-ε) 给真类、ε 分给其他类；减轻过置信、改善校准与泛化",
        "ok": true,
        "why": "硬标签易让 logits 过尖，平滑后模型更鲁棒。"
      },
      {
        "t": "翻译重复先查 decoder self-attention",
        "ok": false,
        "why": "故障排查，不是 label smoothing。"
      },
      {
        "t": "attention 权重全均匀要查 scale 与初始化",
        "ok": false,
        "why": "attention 诊断，与标签平滑无关。"
      },
      {
        "t": "多语微调遗忘旧语言叫 catastrophic forgetting",
        "ok": false,
        "why": "持续学习问题，不是 label smoothing。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:26",
    "q": "Transformer 预训练为何常用 Adam/AdamW，并配合 warmup 与 cosine decay？",
    "choices": [
      {
        "t": "Adam 系自适应逐参学习率；AdamW 解耦 weight decay；warmup 避免初期大步长发散，cosine 后期细调收敛",
        "ok": true,
        "why": "大 batch + 深模型对 LR schedule 敏感，该组合是实践共识。"
      },
      {
        "t": "adapter 插在冻结 Transformer 层间做参数高效微调",
        "ok": false,
        "why": "PEFT 方法，不是预训练优化 schedule。"
      },
      {
        "t": "MoE 加 load balancing loss 防 expert 独占",
        "ok": false,
        "why": "MoE 训练，与 AdamW schedule 无关。"
      },
      {
        "t": "early stopping + dropout + weight decay 组合防过拟合",
        "ok": false,
        "why": "泛化正则集合，不是「为何选 AdamW+schedule」。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-transformer",
      "ai-finetune",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:27",
    "q": "gradient checkpointing 如何提升训练显存效率？代价是什么？",
    "choices": [
      {
        "t": "前向只存少数 checkpoint 层激活，反向需重算中间层；显存降、计算时间增",
        "ok": true,
        "why": "以时间换空间，使更大 batch/更长序列可训。"
      },
      {
        "t": "t-SNE 看 doc embedding 是否聚类",
        "ok": false,
        "why": "可视化调试，不是 checkpointing。"
      },
      {
        "t": "expert parallelism 把不同 expert 放不同 GPU",
        "ok": false,
        "why": "MoE 并行策略，与 activation checkpoint 无关。"
      },
      {
        "t": "MLM 随机 mask token 用双向上下文预测",
        "ok": false,
        "why": "BERT 预训练目标，不是显存技巧。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:28",
    "q": "RoPE（Rotary Position Embedding）是什么？为何许多新模型用它替代固定正弦 positional encoding？",
    "choices": [
      {
        "t": "对 Q/K 按位置做旋转变换，内积自然编码相对距离；相对位置泛化好、与 attention 融合紧，长上下文外推常优于绝对可学习 embedding",
        "ok": true,
        "why": "RoPE 把位置信息绑在 Q·K 交互里，外推与 KV cache 友好。"
      },
      {
        "t": "Bi-Encoder 召回 + Cross-Encoder 重排是 RAG 两段式",
        "ok": false,
        "why": "检索架构，不是 RoPE。"
      },
      {
        "t": "翻译偏题先查 encoder-decoder cross-attention",
        "ok": false,
        "why": "故障排查，与 RoPE 无关。"
      },
      {
        "t": "MLM 训练见 [MASK]、推理无 mask 是 train-test mismatch",
        "ok": false,
        "why": "BERT 预训练/推理差异，不是 RoPE 动机。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-embedding",
      "ai-rag"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:29",
    "q": "对比学习（contrastive learning）如何用于训练 Bi-Encoder 检索模型？",
    "choices": [
      {
        "t": "query 与正 doc 嵌入拉近、与 batch 内负样本推远（InfoNCE 等）；学到可分 embedding 空间供 ANN 检索",
        "ok": true,
        "why": "in-batch negatives 高效，是双塔语义检索主流训练范式。"
      },
      {
        "t": "8 万 token 需 block-sparse attention",
        "ok": false,
        "why": "长上下文，不是对比学习。"
      },
      {
        "t": "可视化 cross-attention 权重做 ablation",
        "ok": false,
        "why": "seq2seq 分析，与双塔对比损失无关。"
      },
      {
        "t": "CLM 只能看左侧 token，适合 GPT 类 decoder",
        "ok": false,
        "why": "预训练目标，不是 contrastive retrieval。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-vector-store",
      "ai-rag-eval",
      "ai-embedding"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:30",
    "q": "greedy decoding、beam search、top-k 与 nucleus（top-p）采样各适合什么场景？",
    "choices": [
      {
        "t": "greedy：快、确定性高但易重复；beam：翻译/摘要等需较优路径；top-k/top-p：开放生成要多样性",
        "ok": true,
        "why": "确定性 vs 探索性权衡，任务对质量/创意要求不同。"
      },
      {
        "t": "超长上下文用 RoPE/ALiBi 相对位置外推",
        "ok": false,
        "why": "位置编码，不是解码策略对比。"
      },
      {
        "t": "exposure bias 来自 teacher forcing 与自生成前缀差异",
        "ok": false,
        "why": "训练/推理 mismatch，不是解码算法选型。"
      },
      {
        "t": "MLM 双向、CLM 单向，对应 encoder vs decoder 预训练",
        "ok": false,
        "why": "预训练范式，与推理采样无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:31",
    "q": "超长上下文下 vanilla attention 为何吃力？sliding-window、sparse、linear attention 等思路各解决什么？",
    "choices": [
      {
        "t": "O(n²) 算力/显存爆炸；sliding-window 限局部+少量全局；sparse 只算重要块；linear/low-rank 近似全连接降复杂度",
        "ok": true,
        "why": "都在用结构稀疏或核技巧把二次依赖降下来。"
      },
      {
        "t": "head diversity loss 让各头学不同模式",
        "ok": false,
        "why": "多头训练，不是长上下文算法。"
      },
      {
        "t": "幻觉要靠 RAG 与更好对齐缓解",
        "ok": false,
        "why": "生成可靠性，不是 attention 复杂度。"
      },
      {
        "t": "Transformer 相对 RNN 可并行算全局依赖",
        "ok": false,
        "why": "历史动机，不是长上下文近期解法。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-transformer"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:32",
    "q": "翻译模型反复输出同一词，你会先查 Transformer 哪一块？为什么？",
    "choices": [
      {
        "t": "优先看 decoder masked self-attention：权重若过度盯最近几个 token，会形成重复反馈环",
        "ok": true,
        "why": "自回归解码中近邻偏置常直接导致 n-gram 循环。"
      },
      {
        "t": "attention 全均匀要查 temperature 与初始化",
        "ok": false,
        "why": "均匀权重是另一类故障，不是重复首选排查点。"
      },
      {
        "t": "多语微调遗忘旧语需混合多语数据",
        "ok": false,
        "why": "catastrophic forgetting，与单句重复现象不同。"
      },
      {
        "t": "端到端数据流：分词 → embedding + 位置 → encoder/decoder 层",
        "ok": false,
        "why": "总体架构复习，不是重复 bug 定位。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:33",
    "q": "要给多语言模型加一种低资源语言：重训 embedding、整 encoder 还是 adapter？怎么选？",
    "choices": [
      {
        "t": "优先 adapter/LoRA 等 PEFT：冻结主干、只训小模块，数据少时防 catastrophic forgetting；数据够再扩词表或部分解冻",
        "ok": true,
        "why": "低资源全量微调易过拟合且伤其他语言；adapter 成本与风险更低。"
      },
      {
        "t": "MoE 用 capacity factor 与 balancing loss 均衡 expert",
        "ok": false,
        "why": "MoE 运维，不是低资源语言接入策略。"
      },
      {
        "t": "early stopping + dropout 防过拟合",
        "ok": false,
        "why": "通用正则，未回答「训哪部分参数」。"
      },
      {
        "t": "token/positional/segment embedding 各司其职",
        "ok": false,
        "why": "embedding 类型说明，不是微调策略。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-token-context",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:34",
    "q": "文档检索 Bi-Encoder 语义相似度差，如何系统调试 embedding 空间？",
    "choices": [
      {
        "t": "t-SNE/UMAP 看同类是否聚类；抽 hard negative 查误配；看训练损失与 in-batch negative 设置；必要时换对比损失或加 hard mining",
        "ok": true,
        "why": "先可视化空间结构，再对负样本与训练配方做针对性修正。"
      },
      {
        "t": "MoE expert 跨 GPU 做 expert parallelism",
        "ok": false,
        "why": "大规模训练并行，不是 embedding 调试。"
      },
      {
        "t": "MLM 用双向上下文预测 mask",
        "ok": false,
        "why": "预训练目标，与检索空间诊断无关。"
      },
      {
        "t": "无 positional encoding 则语序不可分",
        "ok": false,
        "why": "基础概念，不是检索质量排查流程。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:35",
    "q": "生产 RAG 里，何时在 Bi-Encoder 召回之上加 Cross-Encoder 重排？",
    "choices": [
      {
        "t": "候选量大先用 Bi-Encoder+ANN 粗召回 top-k，再用 Cross-Encoder 对少量候选精排，平衡延迟与相关性",
        "ok": true,
        "why": "两段式是工业界速度与精度折中的标准做法。"
      },
      {
        "t": "翻译偏题查 encoder-decoder cross-attention 是否生效",
        "ok": false,
        "why": "seq2seq 调试，不是 RAG rerank 时机。"
      },
      {
        "t": "BERT MLM 推理无 [MASK]  token 是 mismatch",
        "ok": false,
        "why": "encoder 预训练/推理差异，与 RAG 无关。"
      },
      {
        "t": "残差连接缓解梯度消失",
        "ok": false,
        "why": "通用结构，不是「何时上 reranker」。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rerank",
      "ai-vector-store",
      "ai-rag"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:36",
    "q": "必须处理约 8 万 token 序列，vanilla attention 太慢，你会怎样改模型？",
    "choices": [
      {
        "t": "block-sparse / sliding-window + 少量 global token；或 FlashAttention 等 IO 友好实现；必要时分层：局部层 + 稀疏全局层",
        "ok": true,
        "why": "8 万² 量级不可全连接，需稀疏模式或内核优化才可行。"
      },
      {
        "t": "ablation cross-attention 看是否必要",
        "ok": false,
        "why": "结构验证实验，不是 80k 性能 redesign。"
      },
      {
        "t": "CLM 单向预训练适合 GPT",
        "ok": false,
        "why": "预训练范式，与长序列 attention 改造无关。"
      },
      {
        "t": "LayerNorm 对每个 token 特征维归一化",
        "ok": false,
        "why": "基础层组件，解决不了 O(n²) 瓶颈。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:37",
    "q": "positional embedding 在更长序列上失效，如何改以改善外推？",
    "choices": [
      {
        "t": "从绝对可学习位置切到 RoPE、ALiBi 等相对编码；或训练时做 length extrapolation / 渐进加长上下文微调",
        "ok": true,
        "why": "相对位置对未见长度更稳，配合继续预训练可扩窗口。"
      },
      {
        "t": "exposure bias 用 scheduled sampling 等方式缓解",
        "ok": false,
        "why": "解码训练技巧，不是长度外推。"
      },
      {
        "t": "MLM vs CLM 决定 encoder 还是 decoder 架构",
        "ok": false,
        "why": "架构选型，与 position extrapolation 无关。"
      },
      {
        "t": "FFN 是 per-token 两层 MLP",
        "ok": false,
        "why": "层内组件，不解决「训短测长」位置问题。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-embedding",
      "ai-token-context",
      "ai-finetune"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:38",
    "q": "12 个 attention head 里只有 1 个似乎有用，如何鼓励 head 多样性？",
    "choices": [
      {
        "t": "加 head diversity / orthogonality 辅助损失；或 prune 冗余头；检查是否 LR/初始化导致塌缩",
        "ok": true,
        "why": "显式惩罚头间相似或减冗余头，可提升有效容量。"
      },
      {
        "t": "幻觉用 grounding 与更好数据缓解",
        "ok": false,
        "why": "生成可靠性，不是 head 多样性。"
      },
      {
        "t": "Transformer 为并行全局依赖替代 RNN",
        "ok": false,
        "why": "历史背景，不是 head 塌缩对策。"
      },
      {
        "t": "scaled dot-product 要除以 √d_k",
        "ok": false,
        "why": "attention 公式细节，与 head 分工无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:39",
    "q": "attention 权重塌成近似均匀分布，可能原因与排查思路？",
    "choices": [
      {
        "t": "Q·K 尺度过小/过大、缺少 √d_k 缩放、初始化或 LR 不当、层过深梯度弱；查 score 分布、熵、单层 ablation",
        "ok": true,
        "why": "均匀意味着无法区分 relevant token，要从分数与优化入手。"
      },
      {
        "t": "多语微调遗忘需混合旧语言数据",
        "ok": false,
        "why": "持续学习，不是 attention 均匀的主因。"
      },
      {
        "t": "标准前向：embedding + 位置 → 堆叠层",
        "ok": false,
        "why": "流程概述，不是故障诊断。"
      },
      {
        "t": "multi-head 并行多组投影再 concat",
        "ok": false,
        "why": "结构描述，不是均匀权重成因。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  },
  {
    "id": "adapted:naresh-transformer:40",
    "q": "MoE 训练后发现只有 2 个 expert 承接几乎所有 token，怎么均衡负载？",
    "choices": [
      {
        "t": "加 load balancing auxiliary loss、capacity factor 限制单 expert 吞吐、噪声门控、必要时 expert dropout",
        "ok": true,
        "why": "路由需显式惩罚倾斜，否则大 expert 更强 → 更常被选 → 更不平衡。"
      },
      {
        "t": "early stopping 看验证集 loss",
        "ok": false,
        "why": "通用训练，不针对 expert 路由倾斜。"
      },
      {
        "t": "离散 token 必须先 embedding 化",
        "ok": false,
        "why": "基础前提，不是 MoE 均衡方案。"
      },
      {
        "t": "self-attention 的 Q/K/V 同源",
        "ok": false,
        "why": "attention 定义，与 expert 负载无关。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "Transformer",
      "注意力",
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
    "attribution": "Nareshedagotti/AI-Engineer-Interview-QA · Transformers",
    "attributionUrl": "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA",
    "setId": "interview-adapted-naresh-transformer"
  }
];

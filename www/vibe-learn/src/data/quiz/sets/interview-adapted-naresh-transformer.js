import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：Nareshedagotti/AI-Engineer-Interview-QA · Transformer
 * https://github.com/Nareshedagotti/AI-Engineer-Interview-QA
 */
const ATTR = "Nareshedagotti/AI-Engineer-Interview-QA · Transformer";
const ATTR_URL = "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA";

function q(id, stem, choices, relatedNodes) {
  return {
    id: `adapted:naresh-transformer:${id}`,
    q: stem,
    choices,
    relatedNodes,
    origin: "adapted",
    attribution: ATTR,
    attributionUrl: ATTR_URL,
  };
}

export default defineQuizSet({
  id: "interview-adapted-naresh-transformer",
  title: "开源改编 · naresh-transformer",
  kind: "interview",
  domain: "ai",
  tags: ["Transformer", "注意力", "AI全栈", "系统非原创", "adapted", "中文"],
  relatedNodes: ["ai-llm-era", "ai-token-context", "ai-embedding"],
  caption: "系统非原创 · AI 全栈向 · 中文 · Nareshedagotti/AI-Engineer-Interview-QA · Transformer",
  origin: "adapted",
  attribution: ATTR,
  attributionUrl: ATTR_URL,
  questions: [
    q("1", "原始 Transformer 想摆脱 RNN Seq2Seq 的哪类瓶颈？", [
      { t: "逐步串行计算与长依赖难建模，训练难以充分并行", ok: true, why: "self-attention 可并行算全局依赖，不再依赖 recurrence 逐步推进。" },
      { t: "完全取消非线性，只保留矩阵乘法", ok: false, why: "FFN 仍有非线性；瓶颈不在「有没有激活」。" },
      { t: "推理时必须单线程 CPU", ok: false, why: "硬件调度不是架构要解决的核心论文问题。" },
      { t: "词表必须小于 1000", ok: false, why: "与摆脱循环瓶颈无关。" },
    ], ["ai-llm-era"]),
    q("2", "标准 encoder-decoder Transformer 中，decoder 相对 encoder 多出来的关键子层是？", [
      { t: "masked self-attention 与 encoder-decoder cross-attention", ok: true, why: "因果掩码保自回归；交叉注意力对齐源端表示。" },
      { t: "仅多一层 BatchNorm", ok: false, why: "经典结构用 LayerNorm，且关键差异不是 BN。" },
      { t: "专门的 BM25 检索层", ok: false, why: "检索不是 Transformer 块内组件。" },
      { t: "只在输出端加温度采样，无结构差异", ok: false, why: "温度是解码超参；结构上确有掩码与交叉注意力。" },
    ], ["ai-llm-era"]),
    q("3", "离散 token 进入 Transformer 前必须先 embedding，主要因为？", [
      { t: "需要连续向量才能做矩阵乘法与注意力运算", ok: true, why: "ID 本身不能直接点积聚合；embedding 提供可学习表示。" },
      { t: "embedding 会自动完成权限校验", ok: false, why: "与安全无关。" },
      { t: "没有 embedding 就无法使用 GPU", ok: false, why: "硬件可用性不依赖这一层语义。" },
      { t: "embedding 替代全部损失函数", ok: false, why: "损失仍在输出端计算。" },
    ], ["ai-embedding"]),
    q("4", "不加 positional encoding 时，模型对语序的典型问题是？", [
      { t: "注意力视输入为无序集合，「猫追鼠」与「鼠追猫」难区分", ok: true, why: "纯集合运算缺顺序信号，必须注入位置信息。" },
      { t: "词表会自动翻倍", ok: false, why: "位置编码不改词表大小。" },
      { t: "梯度保证不会消失", ok: false, why: "位置与梯度消失无此关系。" },
      { t: "只能做分类不能做回归", ok: false, why: "任务头选择与位置编码正交。" },
    ], ["ai-llm-era"]),
    q("5", "在 attention/FFN 外包一层残差（y=F(x)+x）的首要好处是？", [
      { t: "给梯度开捷径，缓解深层 vanishing，并保留低层信号", ok: true, why: "残差是深层 Transformer 几乎标配的稳定训练结构。" },
      { t: "把序列长度复杂度从 O(n²) 降到 O(1)", ok: false, why: "残差不改注意力复杂度。" },
      { t: "自动完成子词分词", ok: false, why: "分词在模型外。" },
      { t: "替代 softmax", ok: false, why: "注意力仍需要归一化权重。" },
    ], ["ai-llm-era"]),
    q("6", "现代深 Transformer 更常用 Pre-LN 而非 Post-LN，主要因为？", [
      { t: "先归一化再进子层，梯度更稳，深层更好训", ok: true, why: "Post-LN 是原论文写法，深模型上常更不稳。" },
      { t: "Pre-LN 能取消全部残差连接", ok: false, why: "残差通常仍保留。" },
      { t: "Pre-LN 专用于图像，文本禁用", ok: false, why: "文本大模型广泛使用 Pre-LN。" },
      { t: "Pre-LN 会把注意力变成平均池化", ok: false, why: "归一化位置不决定注意力形式。" },
    ], ["ai-llm-era"]),
    q("7", "Transformer 层里的 FFN 对每个位置独立施加，角色是？", [
      { t: "在 attention 混合上下文后，做 per-token 非线性变换", ok: true, why: "相当于逐位置 MLP，补足注意力的线性加权聚合。" },
      { t: "在全序列上再做一次全局卷积替代注意力", ok: false, why: "标准 FFN 不跨位置混合。" },
      { t: "专门存储 KV cache", ok: false, why: "KV cache 是推理优化，不是 FFN 定义。" },
      { t: "只在评估时开启", ok: false, why: "训练推理都有 FFN。" },
    ], ["ai-llm-era"]),
    q("8", "scaled dot-product attention 为何要除以 √d_k？", [
      { t: "防止 d_k 大时点积方差过大，softmax 饱和、梯度变小", ok: true, why: "缩放稳定注意力分布，是公式里的关键常数。" },
      { t: "把序列长度裁成固定值", ok: false, why: "缩放不改长度。" },
      { t: "把多头强制合并成单头", ok: false, why: "与头数无关。" },
      { t: "替代位置编码", ok: false, why: "缩放不是位置信息。" },
    ], ["ai-llm-era"]),
    q("9", "multi-head attention 相对单头多学到的是？", [
      { t: "不同子空间并行捕获不同关系，再融合", ok: true, why: "语法、共指、远近依赖等可分头学习。" },
      { t: "把 O(n²) 变成 O(log n)", ok: false, why: "标准多头不改变二次复杂度量级。" },
      { t: "取消对 Value 的需求", ok: false, why: "每头仍有 V。" },
      { t: "保证采样输出字节级可复现", ok: false, why: "与解码随机性无关。" },
    ], ["ai-llm-era"]),
    q("10", "decoder 内的 masked self-attention 与 cross-attention，分工分别是？", [
      { t: "masked self 只看已生成左侧；cross 用 encoder 的 K/V 对齐源端", ok: true, why: "因果掩码保自回归；交叉注意力注入源表示。" },
      { t: "两者完全相同，只是命名", ok: false, why: "Q/K/V 来源与掩码不同。" },
      { t: "masked self 只在训练关闭，推理打开", ok: false, why: "推理同样需要因果掩码。" },
      { t: "cross-attention 只能用于分类头", ok: false, why: "它服务条件生成对齐。" },
    ], ["ai-llm-era"]),
    q("11", "标准自注意力随序列长度二次增长，线上最直接的痛点是？", [
      { t: "显存与算力随上下文暴涨，长文档/高并发延迟与成本失控", ok: true, why: "n×n 分数矩阵是长上下文的主瓶颈。" },
      { t: "词表会被强制缩小", ok: false, why: "复杂度与词表是不同维度。" },
      { t: "梯度方向会反转", ok: false, why: "无此必然。" },
      { t: "只能用 CPU 推理", ok: false, why: "GPU 上同样受二次复杂度约束。" },
    ], ["ai-token-context"]),
    q("12", "为何不在原始 token embedding 上直接做 attention，而要投影出 Q/K/V？", [
      { t: "三组投影让同一向量分饰「查询/被匹配/被聚合」角色", ok: true, why: "匹配空间与内容空间可分离学习，表达更灵活。" },
      { t: "投影是为了把维度改成词表大小", ok: false, why: "投影维是 d_model/d_k，不是词表。" },
      { t: "没有投影就无法做残差", ok: false, why: "残差与 QKV 投影独立。" },
      { t: "投影专门实现 dropout", ok: false, why: "dropout 是另一机制。" },
    ], ["ai-llm-era"]),
    q("13", "堆叠多层 encoder 时，深浅层表征的经验差异是？", [
      { t: "浅层偏局部/语法，深层偏语义与长依赖", ok: true, why: "逐层组合上下文是常见观察，也解释为何要足够深度。" },
      { t: "只有第一层有用，其余可删", ok: false, why: "深度通常带来可组合抽象。" },
      { t: "层数与表示无关，只影响颜色主题", ok: false, why: "玩笑式错误。" },
      { t: "深层必须关闭注意力", ok: false, why: "深层同样用注意力。" },
    ], ["ai-llm-era"]),
    q("14", "训练翻译模型时，decoder 为何不能去掉 cross-attention？", [
      { t: "没有它就难以查询源句表示，条件生成对齐会崩", ok: true, why: "masked self 只看目标端前缀；源信息靠交叉注意力注入。" },
      { t: "去掉后训练一定会更快且更好", ok: false, why: "速度或有，质量通常显著下降。" },
      { t: "cross-attention 只用于图像分类", ok: false, why: "经典用途正是条件序列生成。" },
      { t: "可以用更大的 temperature 替代它", ok: false, why: "温度不提供源端对齐。" },
    ], ["ai-llm-era"]),
    q("15", "teacher forcing 训练与自回归推理之间的分布偏移叫什么？", [
      { t: "exposure bias：训练喂 gold 前缀，推理用自己输出", ok: true, why: "前缀分布不一致会导致错误累积；可用 scheduled sampling 等缓解。" },
      { t: "mode collapse", ok: false, why: "更常用于 GAN 等生成多样性问题。" },
      { t: "covariate shift 仅出现在检索系统", ok: false, why: "概念可更广，但本题点名的是 teacher forcing 特有偏移。" },
      { t: "vanishing gradient", ok: false, why: "那是优化动态，不是前缀分布偏移。" },
    ], ["ai-llm-era"]),
    q("16", "文本分类应优先 encoder-only，开放续写应优先 decoder-only，主要因为？", [
      { t: "理解任务吃双向上下文；开放生成需要左到右因果建模", ok: true, why: "架构归纳偏置匹配任务；翻译/摘要等条件生成才上 encoder-decoder。" },
      { t: "encoder-only 参数必须更多", ok: false, why: "容量无此必然。" },
      { t: "decoder-only 不能输出文本", ok: false, why: "恰恰擅长生成。" },
      { t: "三者完全等价可随机选", ok: false, why: "归纳偏置不同，效果与成本不同。" },
    ], ["ai-llm-era"]),
    q("17", "子词分词（BPE/WordPiece/SentencePiece）对多语言系统关键，是因为？", [
      { t: "共享片段降 OOV，并让跨语言词根/词缀可共用参数", ok: true, why: "封闭整词词表在多语上几乎不可用。" },
      { t: "子词会消除对位置编码的需求", ok: false, why: "顺序仍需要。" },
      { t: "子词把注意力复杂度降为线性", ok: false, why: "分词不改注意力渐近复杂度。" },
      { t: "子词强制模型只输出英文", ok: false, why: "相反，子词服务多语。" },
    ], ["ai-token-context"]),
    q("18", "输入 embedding 与输出投影 weight tying 的直接收益是？", [
      { t: "少存一份大矩阵，并让输入/输出词表空间一致", ok: true, why: "减参且常有轻微正则效果。" },
      { t: "把训练变成无监督聚类", ok: false, why: "仍是语言建模/seq2seq 目标。" },
      { t: "取消 softmax", ok: false, why: "输出仍要归一化。" },
      { t: "自动完成 RAG 检索", ok: false, why: "无关。" },
    ], ["ai-llm-era"]),
    q("19", "百万级文档召回阶段为何更常用 Bi-Encoder 而不是 Cross-Encoder？", [
      { t: "文档可离线嵌入，在线只算 query 再 ANN，可扩展", ok: true, why: "Cross-Encoder 每对都要联合前向，无法预计算全库。" },
      { t: "Bi-Encoder 永远比 Cross-Encoder 更准", ok: false, why: "通常更粗；精排才上 Cross。" },
      { t: "Bi-Encoder 不需要任何向量", ok: false, why: "正是向量双塔。" },
      { t: "Cross-Encoder 不能处理文本", ok: false, why: "它很擅长文本对交互。" },
    ], ["ai-embedding", "ai-rerank"]),
    q("20", "Cross-Encoder 更准但更慢的根本原因是？", [
      { t: "query-doc 拼接后联合自注意力，每对都要完整前向", ok: true, why: "token 级交互充分，但无法预计算文档向量。" },
      { t: "它使用了更大的词表", ok: false, why: "慢主要来自交互计算，不是词表。" },
      { t: "它禁止使用 GPU", ok: false, why: "即便 GPU 上，两两前向仍贵。" },
      { t: "它输出维度必须是 1 bit", ok: false, why: "无此限制。" },
    ], ["ai-rerank"]),
    q("21", "多语言 encoder（如 XLM-R）如何把多语放进共享语义空间？", [
      { t: "共享子词表 + 大规模多语 MLM，迫使跨语言对齐概念", ok: true, why: "相似含义在不同语言上被拉近，支撑跨语检索/迁移。" },
      { t: "为每种语言训练互不相通的独立空间", ok: false, why: "那就无法跨语对齐。" },
      { t: "只靠翻译 API 在推理时互转", ok: false, why: "那是流水线，不是 encoder 内共享空间。" },
      { t: "删除所有非英语数据", ok: false, why: "与多语目标相反。" },
    ], ["ai-embedding"]),
    q("22", "平行语料很少时，多语翻译系统常见的预训练路径是？", [
      { t: "先多语单语去噪/MLM，再用语言 tag + 少量平行句微调", ok: true, why: "共享表示支撑零/少样本跨语迁移。" },
      { t: "从零只用 10 句平行语料训到收敛", ok: false, why: "数据太少无法学通用对齐。" },
      { t: "禁止使用任何单语数据", ok: false, why: "单语预训练正是关键一环。" },
      { t: "只用字符级编辑距离对齐", ok: false, why: "不够语义，也难扩展。" },
    ], ["ai-llm-era"]),
    q("23", "MoE 层相对 dense FFN 的关键变化是？", [
      { t: "门控为每个 token 只激活少数 expert，总参大增但每步算力可控", ok: true, why: "稀疏激活解耦「总参数」与「每 token 算力」。" },
      { t: "每个 token 必须跑完所有 expert", ok: false, why: "那就失去 MoE 意义。" },
      { t: "MoE 取消了全部非线性", ok: false, why: "expert 内通常仍是 FFN。" },
      { t: "MoE 只能用于卷积网络", ok: false, why: "语言模型广泛使用。" },
    ], ["ai-llm-era"]),
    q("24", "在同等每 token 算力预算下，选 Dense 还是 MoE 的典型权衡是？", [
      { t: "Dense 实现稳；MoE 可用更大总参换能力，但路由/负载更复杂", ok: true, why: "不是单纯「越大越好」，要看通信、均衡与工程成本。" },
      { t: "MoE 永远更快更稳，无代价", ok: false, why: "负载不均与通信是真实代价。" },
      { t: "Dense 不能用于语言任务", ok: false, why: "大量成功模型仍是 dense。" },
      { t: "二者数学完全等价可随便切", ok: false, why: "激活模式与优化动态不同。" },
    ], ["ai-llm-era"]),
    q("25", "seq2seq 训练加 label smoothing 的主要作用是？", [
      { t: "软化 one-hot，减轻过置信，改善校准与泛化", ok: true, why: "给非真类留小概率，降低极端 logits。" },
      { t: "把注意力复杂度降为线性", ok: false, why: "与复杂度无关。" },
      { t: "自动生成平行语料", ok: false, why: "不产生数据。" },
      { t: "替换 teacher forcing", ok: false, why: "二者正交。" },
    ], ["ai-finetune"]),
    q("26", "预训练常用 AdamW + warmup + cosine，warmup 的直接目的是？", [
      { t: "避免训练初期过大学习率导致发散", ok: true, why: "早期统计不稳，从小步长爬升更安全。" },
      { t: "把模型量化到 4bit", ok: false, why: "量化是另一技术。" },
      { t: "删除验证集", ok: false, why: "无关。" },
      { t: "强制使用 greedy 解码", ok: false, why: "训练 schedule ≠ 推理解码。" },
    ], ["ai-finetune"]),
    q("27", "gradient checkpointing 省显存的代价是？", [
      { t: "反向时重算部分前向激活，训练更慢", ok: true, why: "用时间换空间：少存激活、多算一次。" },
      { t: "推理准确率必然下降一半", ok: false, why: "checkpointing 是训练技巧，不直接改推理精度定义。" },
      { t: "词表被清空", ok: false, why: "无关。" },
      { t: "必须改成 RNN", ok: false, why: "仍是 Transformer。" },
    ], ["ai-finetune"]),
    q("28", "许多新模型用 RoPE 替代绝对可学习位置，主要看中？", [
      { t: "旋转 Q/K 自然编码相对距离，长上下文外推通常更好", ok: true, why: "相对位置与注意力内积结合紧，泛化常优于固定绝对表。" },
      { t: "RoPE 可以取消全部注意力", ok: false, why: "RoPE 服务于注意力，不取消它。" },
      { t: "RoPE 只用于音频", ok: false, why: "文本大模型广泛使用。" },
      { t: "RoPE 把损失改成铰链损失", ok: false, why: "无关。" },
    ], ["ai-token-context"]),
    q("29", "用对比学习训 Bi-Encoder 检索时，优化目标直观上是？", [
      { t: "拉近 query-正文档，推远 batch 内负样本（如 InfoNCE）", ok: true, why: "学到可 ANN 检索的可分 embedding 空间。" },
      { t: "最大化生成交叉熵到过拟合", ok: false, why: "那是生成 LM，不是双塔对比。" },
      { t: "随机打乱所有向量维度", ok: false, why: "会毁掉相似度。" },
      { t: "只优化解码 temperature", ok: false, why: "检索训练不靠温度。" },
    ], ["ai-embedding"]),
    q("30", "开放闲聊要多样性，翻译要稳妥高分路径。解码策略应如何匹配？", [
      { t: "闲聊偏 top-k/top-p；翻译/摘要常 beam；要极速确定可用 greedy", ok: true, why: "策略服务目标：多样性 vs 寻求较优序列。" },
      { t: "所有任务都必须 greedy", ok: false, why: "开放生成会又干又重复。" },
      { t: "所有任务都必须 temperature=2", ok: false, why: "翻译会被随机性毁掉。" },
      { t: "解码策略只影响训练，不影响推理", ok: false, why: "解码发生在推理。" },
    ], ["ai-llm-era"]),
    q("31", "超长上下文下缓解 vanilla O(n²) 注意力的合理方向是？", [
      { t: "sliding-window / block-sparse / 线性近似等限制或近似全连接", ok: true, why: "用结构假设换复杂度，常配合少量全局 token。" },
      { t: "把 n 平方项藏进常数假装没有", ok: false, why: "物理显存不会消失。" },
      { t: "禁止使用位置编码", ok: false, why: "长上下文更需要位置外推，不是删位置。" },
      { t: "只增加 head 数到上千", ok: false, why: "不降低对 n 的二次依赖。" },
    ], ["ai-token-context"]),
    q("32", "翻译模型反复输出同一词，调试时优先怀疑哪块？", [
      { t: "decoder masked self-attention 是否过度盯最近 token 形成重复环", ok: true, why: "近邻反馈环是重复生成的经典注意力病灶。" },
      { t: "词表文件的文件名拼写", ok: false, why: "除非加载错误，否则不是首选。" },
      { t: "CPU 风扇转速", ok: false, why: "与重复解码无关。" },
      { t: "是否开启了 HTTPS", ok: false, why: "无关。" },
    ], ["ai-llm-era"]),
    q("33", "给多语基座加低资源语言且数据很少，优先策略是？", [
      { t: "adapter/LoRA 等 PEFT，冻结主干防灾难性遗忘", ok: true, why: "数据少时全参硬训易冲掉旧语言能力。" },
      { t: "立刻全参高学习率重训整网", ok: false, why: "极易遗忘。" },
      { t: "删除原有全部语言数据", ok: false, why: "与多语保持相反。" },
      { t: "只改 temperature", ok: false, why: "学不会新语言。" },
    ], ["ai-finetune"]),
    q("34", "Bi-Encoder 检索相似度整体很差，系统调试应先看？", [
      { t: "embedding 空间是否聚类、hard negative、对比损失与负采样设置", ok: true, why: "空间结构与训练目标决定召回上限。" },
      { t: "把生成 max_tokens 开到最大", ok: false, why: "生成长度不修检索空间。" },
      { t: "关闭所有验证集", ok: false, why: "更难发现问题。" },
      { t: "随机降低嵌入维度到 2", ok: false, why: "通常毁掉可分性。" },
    ], ["ai-embedding", "ai-rag-eval"]),
    q("35", "生产 RAG 在 Bi-Encoder 粗召回之上再加 Cross-Encoder 的时机是？", [
      { t: "候选已收到 top-k，需要更高精确率且延迟预算允许精排", ok: true, why: "两段式：可扩展召回 + 昂贵精排。" },
      { t: "语料只有十条文档时也必须上", ok: false, why: "小库可能直接精排或甚至全扫。" },
      { t: "作为 ACL 的唯一实现", ok: false, why: "重排不是授权。" },
      { t: "用来替代分词器", ok: false, why: "无关。" },
    ], ["ai-rerank", "ai-rag"]),
    q("36", "必须处理约 8 万 token，vanilla 全注意力太慢。较务实的改法是？", [
      { t: "block-sparse/sliding-window + 少量 global，或 IO 友好注意力实现", ok: true, why: "用稀疏/分块结构把复杂度压下来，再配合工程内核。" },
      { t: "把 batch size 调到 1 就够了", ok: false, why: "单条 80k 仍可能爆。" },
      { t: "删掉 FFN 层", ok: false, why: "省不了注意力二次项的主开销。" },
      { t: "改用字符 one-hot 不用向量", ok: false, why: "更糟且仍要交互。" },
    ], ["ai-token-context"]),
    q("37", "绝对可学习位置在更长序列失效时，改善外推应转向？", [
      { t: "RoPE/ALiBi 等相对位置，或渐进加长上下文微调", ok: true, why: "相对编码对未见长度通常更稳。" },
      { t: "完全取消位置信息", ok: false, why: "语序会坏。" },
      { t: "只增加 softmax 温度", ok: false, why: "不提供位置外推。" },
      { t: "把层数减到 1", ok: false, why: "不解决位置外推。" },
    ], ["ai-token-context"]),
    q("38", "12 个 attention head 里多数塌成同质，鼓励多样性的办法是？", [
      { t: "加 diversity/orthogonality 辅助损失，或剪枝冗余头并检查 LR/初始化", ok: true, why: "塌缩常见于优化动态；辅助损失与剪枝是实务手段。" },
      { t: "强制所有头共享同一组 QKV 权重", ok: false, why: "会更同质。" },
      { t: "关掉残差", ok: false, why: "通常伤训练，不专治头多样性。" },
      { t: "把词表随机打乱", ok: false, why: "破坏输入语义。" },
    ], ["ai-llm-era"]),
    q("39", "attention 权重近似均匀分布，优先排查？", [
      { t: "Q·K 尺度、是否缺 √d_k、初始化/LR，以及分数熵与单层 ablation", ok: true, why: "尺度失控会让 softmax 变平或过尖；要用分布诊断。" },
      { t: "是否开启了 HTTPS", ok: false, why: "无关。" },
      { t: "用户界面主题色", ok: false, why: "无关。" },
      { t: "磁盘文件系统类型", ok: false, why: "无关。" },
    ], ["ai-llm-era"]),
    q("40", "MoE 训练后只有两三个 expert 吃掉几乎所有 token。应如何均衡？", [
      { t: "加 load balancing loss、设 capacity factor，必要时噪声门控/expert dropout", ok: true, why: "防止路由塌缩到少数专家是 MoE 训练标配。" },
      { t: "删掉门控，让每个 token 随机选 expert", ok: false, why: "失去学习到的路由，质量不稳。" },
      { t: "把所有 expert 合并成一个", ok: false, why: "等于退回 dense。" },
      { t: "提高 temperature 到 5 专治负载", ok: false, why: "解码温度不解决训练路由塌缩。" },
    ], ["ai-llm-era"]),
  ],
});

import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：Nareshedagotti/AI-Engineer-Interview-QA · LLM
 * https://github.com/Nareshedagotti/AI-Engineer-Interview-QA
 */
const ATTR = "Nareshedagotti/AI-Engineer-Interview-QA · LLM";
const ATTR_URL = "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA";

function q(id, stem, choices, relatedNodes) {
  return {
    id: `adapted:naresh-llm:${id}`,
    q: stem,
    choices,
    relatedNodes,
    origin: "adapted",
    attribution: ATTR,
    attributionUrl: ATTR_URL,
  };
}

export default defineQuizSet({
  id: "interview-adapted-naresh-llm",
  title: "开源改编 · naresh-llm",
  kind: "interview",
  domain: "ai",
  tags: ["LLM", "Transformer", "AI全栈", "系统非原创", "adapted", "中文"],
  relatedNodes: ["ai-llm-era", "ai-token-context", "ai-finetune"],
  caption: "系统非原创 · AI 全栈向 · 中文 · Nareshedagotti/AI-Engineer-Interview-QA · LLM",
  origin: "adapted",
  attribution: ATTR,
  attributionUrl: ATTR_URL,
  questions: [
    q("q1", "Large Language Model（LLM）本质上指什么？", [
      { t: "在海量文本上预训练、能理解与生成类人文本的大参数神经网络", ok: true, why: "「大」通常同时指参数规模与训练语料规模，能力来自规模化预训练。" },
      { t: "专门做关键词倒排的小型检索引擎", ok: false, why: "检索引擎不是语言模型，也不靠下一词预测预训练。" },
      { t: "只能分类情感、不能生成文本的线性模型", ok: false, why: "现代 LLM 的核心能力包含开放生成。" },
      { t: "必须每次从零随机初始化、不能迁移的模型", ok: false, why: "LLM 价值正在于预训练后可迁移/提示适配。" },
    ], ["ai-llm-era"]),
    q("q2", "相对 N-gram / HMM 等传统统计语言模型，现代 LLM 的主要优势是？", [
      { t: "用深度注意力建模长程依赖与上下文语义，突破局部窗口", ok: true, why: "N-gram 受固定窗口限制；Transformer LLM 可直接关联远距离 token。" },
      { t: "完全不再需要任何训练数据", ok: false, why: "LLM 反而需要更大规模语料。" },
      { t: "推理时保证零幻觉", ok: false, why: "生成模型仍会编造；这不是相对 N-gram 的定义性优势。" },
      { t: "只能做填空，不能续写", ok: false, why: "自回归 LLM 的强项正是续写/生成。" },
    ], ["ai-llm-era"]),
    q("q3", "context window（上下文窗口）限制的是什么？", [
      { t: "单次推理能同时处理的 Token 上限（含提示与生成）", ok: true, why: "窗口决定能读多长文档、保留多少对话历史，超限就要截断/摘要。" },
      { t: "模型权重文件在磁盘上的字节数", ok: false, why: "那是存储体积，不是上下文长度。" },
      { t: "训练时允许的最大 GPU 数量", ok: false, why: "并行规模与上下文窗口是不同概念。" },
      { t: "词表里允许的最大 Unicode 码点", ok: false, why: "词表与窗口长度无关。" },
    ], ["ai-token-context"]),
    q("q4", "Foundation Model（基础模型）最贴切的定义是？", [
      { t: "大规模自监督预训练、可迁移到多种下游任务的通用模型", ok: true, why: "关键是「先通用预训练，再适配」；不限于文本，也可含视觉/多模态。" },
      { t: "只为单一客户微调过、不可复用的私有小模型", ok: false, why: "那与「基础/通用」相反。" },
      { t: "不含神经网络、仅规则引擎的系统", ok: false, why: "基础模型是数据驱动的大规模模型。" },
      { t: "必须开源权重才算 foundation", ok: false, why: "开源与否不是定义条件；闭源基座同样存在。" },
    ], ["ai-llm-era"]),
    q("q5", "Tokenization 在 LLM 流水线中的首要作用是？", [
      { t: "把原始文本切成模型可计算的 Token 序列", ok: true, why: "分词决定词表、序列长度与罕见词/多语处理能力。" },
      { t: "把生成概率映射成温度参数", ok: false, why: "温度是解码超参，不是分词。" },
      { t: "在向量库里做 ANN 检索", ok: false, why: "检索发生在应用层，不是 tokenizer 职责。" },
      { t: "对输出做毒性分类", ok: false, why: "那是安全/审核层。" },
    ], ["ai-token-context"]),
    q("q6", "现代 LLM 如何基本消除传统「整词词表」的 OOV？", [
      { t: "子词分词（BPE/WordPiece 等）把罕见词拆成已知片段", ok: true, why: "几乎任意字符串都能由子词拼出，不再依赖封闭词表。" },
      { t: "遇到未知词就跳过，不进入模型", ok: false, why: "会丢信息；子词方案才是主流。" },
      { t: "把未知词映射成随机高维噪声向量且不再学习", ok: false, why: "不可靠；子词共享参数更稳。" },
      { t: "要求用户只输入词表内单词", ok: false, why: "产品不可用；应由分词层消化。" },
    ], ["ai-token-context"]),
    q("q7", "Masked Language Modeling（MLM）预训练在做什么？", [
      { t: "随机遮盖部分 Token，让模型按双向上下文预测被遮词", ok: true, why: "BERT 类核心自监督目标，适合学深层双向表示。" },
      { t: "只预测序列最后一个 Token，忽略中间", ok: false, why: "那更接近自回归下一词预测，不是 MLM。" },
      { t: "用人工标注分类标签做全监督", ok: false, why: "MLM 是自监督，不依赖类别标签。" },
      { t: "对整句做情感打分", ok: false, why: "下游任务，不是 MLM 预训练目标。" },
    ], ["ai-llm-era"]),
    q("q8", "BERT 的 Next Sentence Prediction（NSP）训练信号是？", [
      { t: "判断句 B 是否真是句 A 的下一句", ok: true, why: "帮助学句间连贯；后来不少工作认为其收益有限并改用其他句对任务。" },
      { t: "预测被遮盖的单个 Token", ok: false, why: "那是 MLM，不是 NSP。" },
      { t: "生成整段摘要", ok: false, why: "生成式摘要不是原始 NSP。" },
      { t: "对齐图像与文本 embedding", ok: false, why: "多模态对齐是另一类目标。" },
    ], ["ai-llm-era"]),
    q("q9", "自回归（GPT 类）与掩码（BERT 类）预训练目标的关键差别是？", [
      { t: "自回归只看左侧逐词预测；掩码双向看全句、更偏理解", ok: true, why: "目标函数决定擅长开放生成还是双向编码。" },
      { t: "自回归不能用于文本，掩码不能用于文本", ok: false, why: "两者都是文本预训练范式。" },
      { t: "二者损失完全相同，只是营销名不同", ok: false, why: "可见上下文与预测位置不同，损失形式也不同。" },
      { t: "掩码模型必须用 RNN，自回归必须用 CNN", ok: false, why: "现代两者都以 Transformer 为主。" },
    ], ["ai-llm-era"]),
    q("q10", "Transformer 相对传统 RNN Seq2Seq 的关键突破是？", [
      { t: "自注意力并行处理全序列，直接建模任意距离依赖", ok: true, why: "摆脱逐步递推与固定长度句向量瓶颈。" },
      { t: "不再需要任何非线性激活", ok: false, why: "FFN 仍有非线性。" },
      { t: "训练时保证不会过拟合", ok: false, why: "过拟合仍可能发生。" },
      { t: "推理复杂度恒为 O(1) 与长度无关", ok: false, why: "标准注意力随长度平方增长。" },
    ], ["ai-llm-era"]),
    q("q11", "自注意力为何还要加 positional encoding？", [
      { t: "纯注意力对顺序不敏感，需要显式注入位置信息", ok: true, why: "否则「狗咬人」与「人咬狗」在集合意义上难区分。" },
      { t: "位置编码用来替换全部词嵌入", ok: false, why: "是叠加/拼接，不是替换。" },
      { t: "位置编码只在评估时开启", ok: false, why: "训练与推理都需要顺序信号。" },
      { t: "有了 LayerNorm 就不需要位置信息", ok: false, why: "归一化不提供顺序。" },
    ], ["ai-llm-era"]),
    q("q12", "原始 Transformer 中 encoder 与 decoder 的分工是？", [
      { t: "编码器双向建输入表示；解码器掩码自回归生成并做交叉注意力", ok: true, why: "这是经典编码-解码结构；GPT 后来演化为 decoder-only。" },
      { t: "编码器只负责采样 temperature", ok: false, why: "温度是解码超参，不是编码器职责。" },
      { t: "解码器禁止看见任何输入表示", ok: false, why: "交叉注意力正是为了读编码器输出。" },
      { t: "两者权重必须逐层完全共享", ok: false, why: "原始设计是分离模块，不必强制共享。" },
    ], ["ai-llm-era"]),
    q("q13", "深层网络梯度消失时，早期层会怎样？Transformer 常用哪些结构缓解？", [
      { t: "早期层几乎得不到有效更新；靠残差、LayerNorm 与更短路径改善梯度流", ok: true, why: "残差提供恒等捷径，稳定深层训练。" },
      { t: "梯度只会爆炸不会消失，故无需残差", ok: false, why: "两者都可能；残差对消失尤其关键。" },
      { t: "只要加大 learning rate 就永远解决", ok: false, why: "过大学习率常导致发散，不治结构问题。" },
      { t: "去掉所有非线性即可", ok: false, why: "会毁掉表达能力，也不是标准解法。" },
    ], ["ai-llm-era"]),
    q("q14", "注意力机制一步计算的直观含义是？", [
      { t: "用 Query-Key 得权重，再对 Value 加权求和", ok: true, why: "让每个位置聚合最相关的上下文信息。" },
      { t: "随机丢弃一半参数当作正则", ok: false, why: "那是 dropout，不是 attention。" },
      { t: "把所有 Token 平均池化后分类", ok: false, why: "平均池化没有内容自适应权重。" },
      { t: "仅比较相邻两个 Token 的编辑距离", ok: false, why: "注意力是可学习的相似度，作用在表示空间。" },
    ], ["ai-llm-era"]),
    q("q15", "Multi-head attention 相对单头的主要好处是？", [
      { t: "多个头在不同子空间学不同关系，再融合，表达力更强", ok: true, why: "语法、指代、共现等模式可并行捕获。" },
      { t: "头数越多，序列长度的平方复杂度会消失", ok: false, why: "多头不消除 O(n²)，只是拆分通道。" },
      { t: "多头可以取消位置编码", ok: false, why: "顺序信息仍需要。" },
      { t: "多头保证输出确定性采样", ok: false, why: "采样随机性由解码策略决定。" },
    ], ["ai-llm-era"]),
    q("q16", "自注意力里 Q·K 点积的作用，以及算力含义是？", [
      { t: "衡量 Token 相关性得分数；序列长 n 时注意力约 O(n²)", ok: true, why: "长上下文贵，主要因为两两交互的注意力矩阵。" },
      { t: "点积用于更新词表大小", ok: false, why: "词表与注意力打分无关。" },
      { t: "点积保证训练不失任何信息", ok: false, why: "无此信息论保证。" },
      { t: "复杂度与 n 无关，只与层数有关", ok: false, why: "标准点积注意力随 n 平方增长。" },
    ], ["ai-token-context"]),
    q("q17", "greedy decoding 与 beam search 的关键差别是？", [
      { t: "贪心每步只取最高概率；beam 保留多条高分路径再选", ok: true, why: "beam 常更稳但更慢更贵；贪心快但易局部最优。" },
      { t: "beam search 不需要模型概率", ok: false, why: "同样基于模型打分。" },
      { t: "贪心一定比 beam 质量更高", ok: false, why: "通常相反或视任务而定。" },
      { t: "二者只在训练时使用，推理禁用", ok: false, why: "它们是推理解码策略。" },
    ], ["ai-llm-era"]),
    q("q18", "升高 temperature 对采样分布的典型影响是？", [
      { t: "分布更平，输出更随机、更多样", ok: true, why: "logits/T 后 softmax：T↑尖锐度↓。" },
      { t: "分布更尖，几乎总是同一答案", ok: false, why: "那是降低温度的效果。" },
      { t: "上下文窗口自动变长", ok: false, why: "温度不改变窗口。" },
      { t: "词表被永久裁剪一半", ok: false, why: "词表裁剪是 top-k/p 等机制。" },
    ], ["ai-llm-era"]),
    q("q19", "top-k 与 nucleus（top-p）截断的差别是？", [
      { t: "top-k 固定保留 k 个；top-p 按累积概率动态截断", ok: true, why: "词表大、分布尖/平时，top-p 往往更自适应。" },
      { t: "top-p 只在训练损失里出现", ok: false, why: "两者都是推理采样。" },
      { t: "top-k 会修改模型权重", ok: false, why: "只改候选集合，不改权重。" },
      { t: "二者等价且参数可互换", ok: false, why: "截断准则不同，行为不同。" },
    ], ["ai-llm-era"]),
    q("q20", "显存紧张又要微调大模型时，LoRA/QLoRA 的核心思路是？", [
      { t: "冻结主干，只训低秩适配；QLoRA 再量化基座以降显存", ok: true, why: "参数高效微调让单卡也能碰大模型。" },
      { t: "删掉全部注意力层再全参训练", ok: false, why: "会毁掉模型能力。" },
      { t: "只调 temperature，不改任何权重", ok: false, why: "那不是 fine-tuning。" },
      { t: "把词表扩到十倍以「吸收」新知识", ok: false, why: "扩词表不替代适配训练，还更吃资源。" },
    ], ["ai-finetune"]),
    q("q21", "全参 fine-tune 新域后旧能力明显退化。较稳妥的缓解方向是？", [
      { t: "PEFT/LoRA、旧数据回放、较小学习率与早停等组合", ok: true, why: "少动主干 + 回放，降低灾难性遗忘。" },
      { t: "把学习率开到最大以「快速覆盖」", ok: false, why: "更易冲掉旧表征。" },
      { t: "删除验证集以免看见退化", ok: false, why: "掩耳盗铃。" },
      { t: "只加大 batch size，不必改训练策略", ok: false, why: "batch 不解决遗忘机制。" },
    ], ["ai-finetune"]),
    q("q22", "PEFT 为何常能减轻灾难性遗忘？", [
      { t: "冻结预训练权重，只更新少量附加参数，难大规模覆盖原表征", ok: true, why: "主干保持稳定，适配器吸收任务差异。" },
      { t: "PEFT 会重写全部词嵌入", ok: false, why: "典型 PEFT 尽量少动原权重。" },
      { t: "PEFT 禁止使用任何验证集", ok: false, why: "无关。" },
      { t: "PEFT 把模型变成纯规则引擎", ok: false, why: "仍是神经适配。" },
    ], ["ai-finetune"]),
    q("q23", "模型蒸馏在 LLM 落地中的典型用途是？", [
      { t: "用大 teacher 的软分布训小 student，在更小体积逼近行为", ok: true, why: "便于边缘/低成本部署，同时保留部分能力。" },
      { t: "把小模型参数复制进大模型以「变强」", ok: false, why: "方向反了。" },
      { t: "蒸馏等于删除全部对齐数据", ok: false, why: "与对齐数据无关定义。" },
      { t: "蒸馏只改变解码温度", ok: false, why: "蒸馏是训练过程，不是调温度。" },
    ], ["ai-finetune"]),
    q("q24", "训练出现「训练 loss 降、验证 loss 升」最可能是？", [
      { t: "过拟合：背训练集，泛化变差", ok: true, why: "可用正则、早停、更多数据、降学习率等缓解。" },
      { t: "欠拟合：容量严重不足", ok: false, why: "欠拟合通常训练/验证都差。" },
      { t: "上下文窗口突然加倍", ok: false, why: "与这条曲线形态无直接对应。" },
      { t: "词表被清空", ok: false, why: "那会训练直接崩溃，不是经典过拟合曲线。" },
    ], ["ai-finetune"]),
    q("q25", "Token embedding 层在模型中的角色是？", [
      { t: "把离散 Token ID 映射为连续向量供后续层计算", ok: true, why: "嵌入与网络一起在预训练中学习（也可语义向量初始化）。" },
      { t: "只在推理结束后把文本存进磁盘", ok: false, why: "那是 I/O，不是 embedding 层。" },
      { t: "专门计算 BLEU 分数", ok: false, why: "评测指标不在模型图内。" },
      { t: "替换掉全部注意力计算", ok: false, why: "embedding 是输入表示，注意力在其后。" },
    ], ["ai-llm-era"]),
    q("q26", "Mixture of Experts（MoE）提升可扩展性的关键机制是？", [
      { t: "门控只激活少量专家 FFN，参数量大增但每 Token 计算可控", ok: true, why: "稀疏激活让「总参数」与「每步算力」解耦。" },
      { t: "每个 Token 必须跑遍所有专家", ok: false, why: "那就失去稀疏优势。" },
      { t: "MoE 取消了全部前馈层", ok: false, why: "专家本身通常是 FFN。" },
      { t: "MoE 只用于图像，不能用于语言", ok: false, why: "现代大语言模型广泛使用 MoE。" },
    ], ["ai-llm-era"]),
    q("q27", "相对早期 GPT-3 类文本补全，GPT-4 类模型被强调的能力跃迁不包括？", [
      { t: "训练时完全不再需要任何数据", ok: true, why: "仍需大规模数据与对齐；「不需要数据」不是真实跃迁。" },
      { t: "更强推理与指令遵循", ok: false, why: "这是常被强调的提升。" },
      { t: "更长上下文与多模态输入", ok: false, why: "确是产品代际差异点。" },
      { t: "更好的安全对齐与工具使用潜力", ok: false, why: "同样是常见对比点。" },
    ], ["ai-llm-era", "ai-chat-era"]),
    q("q28", "标准 RAG 流水线中，生成之前必不可少的步骤是？", [
      { t: "查询向量化并检索（可选重排）相关 chunk，再拼进提示", ok: true, why: "没有检索增强，就不是 RAG。" },
      { t: "先全参微调基座到过拟合", ok: false, why: "RAG 正是为减少把事实烤进权重。" },
      { t: "关闭所有嵌入，只用随机向量", ok: false, why: "检索会失效。" },
      { t: "删除系统提示以节省 token", ok: false, why: "与 RAG 定义无关，且常有害。" },
    ], ["ai-rag"]),
    q("q29", "同一任务换提示措辞/示例顺序后质量大变，说明什么？", [
      { t: "提示工程显著影响行为，需系统化设计约束与示例", ok: true, why: "LLM 对格式与上下文高度敏感，不是「有模型就稳」。" },
      { t: "模型权重每次推理都被改写了", ok: false, why: "提示不改权重。" },
      { t: "分词器坏了", ok: false, why: "同一分词下仍可能因提示差而表现不同。" },
      { t: "必须立刻废弃该模型", ok: false, why: "应先改进提示与评测，而非直接报废。" },
    ], ["ai-llm-era"]),
    q("q30", "Chain-of-Thought 提示改善复杂推理的机制是？", [
      { t: "把多步计算摊成显式中间步骤，降低一步跳结论的错误率", ok: true, why: "先写推理再答，给模型更多「工作记忆」通道。" },
      { t: "自动扩展上下文窗口硬件上限", ok: false, why: "CoT 不改硬件窗口。" },
      { t: "把模型变成非概率规则引擎", ok: false, why: "仍是同一生成模型。" },
      { t: "取消对训练数据的所有依赖", ok: false, why: "能力仍来自预训练。" },
    ], ["ai-llm-era"]),
    q("q31", "语言建模训练常用交叉熵，是因为？", [
      { t: "把下一 Token 当多类分类，交叉熵对齐预测分布与真值", ok: true, why: "梯度性质好，并与困惑度直接相关。" },
      { t: "交叉熵会强制注意力变成平均池化", ok: false, why: "损失不决定注意力形式。" },
      { t: "交叉熵只用于图像分类，不能用于文本", ok: false, why: "NLP 分类/LM 广泛使用。" },
      { t: "交叉熵保证不会过拟合", ok: false, why: "损失选择≠正则保证。" },
    ], ["ai-llm-era"]),
    q("q32", "KL 散度在 LLM 对齐/蒸馏中的常见用途是？", [
      { t: "衡量两分布差异：蒸馏对齐 teacher，RLHF 约束勿偏离参考策略太远", ok: true, why: "KL 是分布距离工具，不是生成解码器本身。" },
      { t: "直接替代 softmax", ok: false, why: "KL 是损失/约束，不是归一化函数。" },
      { t: "计算编辑距离", ok: false, why: "编辑距离是字符串度量。" },
      { t: "决定 GPU 拓扑", ok: false, why: "硬件无关。" },
    ], ["ai-finetune"]),
    q("q33", "attention 里对 QK 分数做 softmax 的目的是？", [
      { t: "变成非负且和为 1 的权重，再去加权 Value", ok: true, why: "把相似度变成可解释的注意力分布。" },
      { t: "把序列长度裁成固定 512", ok: false, why: "softmax 不截断长度。" },
      { t: "更新优化器的动量系数", ok: false, why: "与优化器状态无关。" },
      { t: "删除所有负值梯度", ok: false, why: "那是另一类启发式，不是 softmax 作用。" },
    ], ["ai-llm-era"]),
    q("q34", "反传中 Jacobian 扮演的角色是？", [
      { t: "描述向量值函数局部线性；链式法则用各层导数（或其高效形式）传梯度", ok: true, why: "深度学习反传就是复合函数求导。" },
      { t: "存储词表字符串", ok: false, why: "词表不是 Jacobian。" },
      { t: "替代损失函数", ok: false, why: "Jacobian 是导数结构，不是损失本身。" },
      { t: "只在推理时计算，训练不用", ok: false, why: "训练反传才密集用到。" },
    ], ["ai-llm-era"]),
    q("q35", "微积分链式法则与梯度下降的关系是？", [
      { t: "复合函数导数连乘（或等价高效算法）得到每层梯度，供下降更新", ok: true, why: "没有链式法则就无法训练深网。" },
      { t: "链式法则用来采样下一个 Token", ok: false, why: "采样是推理解码。" },
      { t: "链式法则决定 temperature", ok: false, why: "温度是超参。" },
      { t: "有了链式法则就不必再要数据", ok: false, why: "梯度来自数据上的损失。" },
    ], ["ai-llm-era"]),
    q("q36", "PCA 里特征值/特征向量如何用于降维？", [
      { t: "协方差特征分解后，取最大特征值方向作主成分投影", ok: true, why: "保留方差最大的方向，丢掉次要维度。" },
      { t: "特征值用来设置 decoding temperature", ok: false, why: "无关。" },
      { t: "特征向量替代全部训练标签", ok: false, why: "PCA 通常无监督，不产生标签。" },
      { t: "特征分解会自动完成 RLHF", ok: false, why: "风马牛不相及。" },
    ], ["ai-embedding"]),
    q("q37", "生成模型与判别模型的核心差别是？", [
      { t: "判别学 P(y|x)；生成学 P(x) 或 P(x,y) 并可采样；LLM 属生成", ok: true, why: "能否建模数据分布并采样，是关键分界。" },
      { t: "生成模型不能输出文本", ok: false, why: "LLM 正是文本生成模型。" },
      { t: "判别模型参数必须更多", ok: false, why: "容量无此必然。" },
      { t: "二者损失必须是同一个公式", ok: false, why: "目标不同，损失也常不同。" },
    ], ["ai-llm-era"]),
    q("q38", "LLM 语境下的 zero-shot 指？", [
      { t: "不给任务示例，只靠自然语言指令完成未见格式的任务", ok: true, why: "依赖预训练泛化；无权重更新、无 few-shot 示范。" },
      { t: "训练从零随机初始化到收敛", ok: false, why: "那是 train from scratch，不是 zero-shot 推理。" },
      { t: "上下文窗口为零", ok: false, why: "字面误读。" },
      { t: "禁止模型输出任何 Token", ok: false, why: "那就无法完成任务。" },
    ], ["ai-llm-era"]),
    q("q39", "few-shot prompting 相对零样本与全量微调的定位是？", [
      { t: "提示里放少量示范，不更新权重；通常比零样本稳、比全参微调便宜", ok: true, why: "用上下文示范锁定格式与任务，是性价比很高的适配方式。" },
      { t: "必须更新全部模型权重", ok: false, why: "few-shot 恰恰不更新权重。" },
      { t: "示范越多越必须变成强化学习", ok: false, why: "示范仍属提示；RL 是另一条线。" },
      { t: "few-shot 只能用于图像", ok: false, why: "文本 LLM 广泛使用。" },
    ], ["ai-llm-era"]),
    q("q40", "落地 LLM 应用时，应对幻觉与时效性的工程组合更合理的是？", [
      { t: "RAG/工具取新鲜事实 + 护栏与评测监控 + 成本路由/缓存", ok: true, why: "单靠更大模型不够；要检索、约束与运营指标。" },
      { t: "关掉所有日志与评测以提速", ok: false, why: "更难发现幻觉与回退。" },
      { t: "禁止一切检索，只信参数记忆", ok: false, why: "时效与私有知识会更差。" },
      { t: "把 temperature 固定为 2.0", ok: false, why: "更高随机性通常加重胡言。" },
    ], ["ai-rag", "ai-prompt-security"]),
  ],
});

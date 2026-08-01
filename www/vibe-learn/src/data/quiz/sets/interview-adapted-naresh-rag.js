import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：Nareshedagotti/AI-Engineer-Interview-QA · RAG
 * https://github.com/Nareshedagotti/AI-Engineer-Interview-QA
 */
const ATTR = "Nareshedagotti/AI-Engineer-Interview-QA · RAG";
const ATTR_URL = "https://github.com/Nareshedagotti/AI-Engineer-Interview-QA";

function q(id, stem, choices, relatedNodes) {
  return {
    id: `adapted:naresh-rag:${id}`,
    q: stem,
    choices,
    relatedNodes,
    origin: "adapted",
    attribution: ATTR,
    attributionUrl: ATTR_URL,
  };
}

export default defineQuizSet({
  id: "interview-adapted-naresh-rag",
  title: "开源改编 · naresh-rag",
  kind: "interview",
  domain: "ai",
  tags: ["RAG", "检索", "AI全栈", "系统非原创", "adapted", "中文"],
  relatedNodes: ["ai-hybrid-search", "ai-vector-store", "ai-chunking"],
  caption: "系统非原创 · AI 全栈向 · 中文 · Nareshedagotti/AI-Engineer-Interview-QA · RAG",
  origin: "adapted",
  attribution: ATTR,
  attributionUrl: ATTR_URL,
  questions: [
    q(
      "1",
      "多版式 PDF（表格、图片、重复页眉页脚）若只用纯文本解析器入库，最常见的破坏是？",
      [
        { t: "表格行列打散、图片丢失、页眉页脚重复污染正文", ok: true, why: "PDF 是视觉布局；不懂版式的抽取会把结构信息毁掉，后续检索再精也救不回。" },
        { t: "向量维度自动减半，ANN 失效", ok: false, why: "解析器不改嵌入维度；坏的是抽取文本质量。" },
        { t: "BM25 索引会自动纠正版式错误", ok: false, why: "词法索引只能搜已抽出的脏字符串，不会修复表格结构。" },
        { t: "只要换更大生成模型就能还原表格语义", ok: false, why: "生成器看不到从未正确入库的行列关系。" },
      ],
      ["ai-chunking", "ai-rag"],
    ),
    q(
      "2",
      "入库前要尽早发现「PDF 其实是扫描件、文本抽取几乎为空」，最稳的信号是？",
      [
        { t: "空文本、异常字符占比高、词/字符比过低等启发式", ok: true, why: "这些信号在索引前拦截无声失败，再决定是否转 OCR。" },
        { t: "线上 P99 延迟突然升高", ok: false, why: "延迟是运行指标，发现不了入库文本为空。" },
        { t: "生成答案的 BLEU 分数偏低", ok: false, why: "那是生成质量，且依赖已有脏索引，来得太晚。" },
        { t: "HNSW 的 ef 参数偏小", ok: false, why: "ANN 调参与「抽取是否成功」无关。" },
      ],
      ["ai-vector-store", "ai-rag"],
    ),
    q(
      "3",
      "把 chunk 从约 200 token 提到 1200+ token，对检索精确率最典型的影响是？",
      [
        { t: "语境更全，但语义过宽，精确率常下降", ok: true, why: "大块把多个主题揉进同一向量，相似度更「糊」。" },
        { t: "精确率必然上升，因为信息更多", ok: false, why: "信息更多不等于向量更聚焦；常见是 recall 形态变、precision 掉。" },
        { t: "嵌入维度会自动变大以装下内容", ok: false, why: "维度由模型决定，不随 chunk 字数变。" },
        { t: "BM25 会失效，只能走稠密检索", ok: false, why: "词法检索仍可用；变的是语义块粒度。" },
      ],
      ["ai-chunking", "ai-rag-eval"],
    ),
    q(
      "3b",
      "政策条文与 FAQ 混库时，定最优 chunk 大小最可靠的做法是？",
      [
        { t: "按文档类型分桶，用标注集做 A/B（Recall/Precision）", ok: true, why: "没有跨类型的万能 N；要用你的查询分布实测。" },
        { t: "一律固定 512 token，业界标准", ok: false, why: "512 只是常见起点，不是跨语料最优。" },
        { t: "越大越好，直到塞满模型上下文", ok: false, why: "检索粒度与生成窗口是不同预算；过大块伤精确率。" },
        { t: "只看嵌入厂商推荐值，不必评测", ok: false, why: "厂商默认值不懂你的文档结构与问法。" },
      ],
      ["ai-chunking", "ai-rag-eval"],
    ),
    q(
      "4",
      "索引代码仓库时，问「parseConfig 在哪定义？」却常只召回半截函数。当前是固定 512 token 切。最先该改什么？",
      [
        { t: "按函数/类/方法等语法边界切，并保留 import/签名上下文", ok: true, why: "代码语义绑在结构单元上；固定 token 常把定义拦腰截断。" },
        { t: "把 top-k 从 5 提到 50", ok: false, why: "候选再多也补不齐被切碎的定义单元。" },
        { t: "换更大参数的生成模型", ok: false, why: "生成侧救不了检索从未拿到完整定义。" },
        { t: "关掉重叠，只保留硬切边界", ok: false, why: "对代码更糟；需要的是语法边界，不是更硬的机械切。" },
      ],
      ["ai-chunking", "ai-token-context"],
    ),
    q(
      "5",
      "叙事性文档里关键句常跨段落边界。何时最该给相邻 chunk 加 overlap？",
      [
        { t: "完整论断可能被边界切断时，加约 50–100 token 重叠", ok: true, why: "overlap 防止「半句话」落在不同块里导致两边都召不稳。" },
        { t: "任何语料都越大 overlap 越好", ok: false, why: "过度重叠涨索引冗余与噪声，结构化清晰边界可少叠。" },
        { t: "只有用 BM25 时才需要 overlap", ok: false, why: "稠密与词法都会受边界切断影响。" },
        { t: "加 overlap 可替代重排器", ok: false, why: "overlap 管分块完整性，不管候选精排。" },
      ],
      ["ai-chunking"],
    ),
    q(
      "7",
      "在 OpenAI / Cohere / Voyage / Jina 等嵌入家族间选型，最不该只看哪一项？",
      [
        { t: "公开榜单名次，而不在自有语料上测 Recall@K", ok: true, why: "榜单分布≠你的领域与语种；必须用业务评测集。" },
        { t: "延迟与单次调用成本", ok: false, why: "成本/延迟是合法约束，应纳入权衡。" },
        { t: "目标语种与领域适配", ok: false, why: "多语/垂直检索能力差异很大，必须看。" },
        { t: "向量维度与存储预算", ok: false, why: "维度直接影响索引 footprint，是选型因子。" },
      ],
      ["ai-embedding", "ai-rag-eval"],
    ),
    q(
      "8",
      "查询用模型 A 嵌入、文档用模型 B 嵌入（维度还不一致）。相似度分数会怎样？",
      [
        { t: "语义空间不可比，分数基本无意义", ok: true, why: "双塔前提是同一嵌入函数；混模型等于比不同坐标系的点。" },
        { t: "只要做 L2 归一化就能对齐", ok: false, why: "归一化不统一坐标系，只统一模长。" },
        { t: "可用 PCA 把两边投影到同一维后直接比", ok: false, why: "盲目投影不能恢复语义对齐；应重嵌到同一模型。" },
        { t: "生成阶段会自动校正嵌入空间", ok: false, why: "生成看不到「错误坐标系」问题，只会基于错召回编答案。" },
      ],
      ["ai-embedding", "ai-rag"],
    ),
    q(
      "9",
      "线上检索质量缓慢变差，语料近期大量新增了带页眉 HTML 的导出件。最可能的嵌入侧原因是？",
      [
        { t: "脏文本（HTML/重复头尾）造成嵌入噪声，分布相对旧索引漂移", ok: true, why: "入库垃圾决定向量质量；应用清洗语料或重嵌/换模型，并监控召回。" },
        { t: "temperature 设得太高", ok: false, why: "temperature 影响生成随机性，不改已存向量。" },
        { t: "top-k 必须改成偶数", ok: false, why: "无依据的超参迷信。" },
        { t: "交叉编码器重排把噪声「吸收」掉了", ok: false, why: "重排只能在脏候选里挑；根因仍在入库文本。" },
      ],
      ["ai-embedding", "ai-vector-store"],
    ),
    q(
      "10",
      "要用英文问句召回西班牙语 FAQ，关键机制是？",
      [
        { t: "多语嵌入把不同语言映到共享语义空间", ok: true, why: "跨语言 RAG 靠对齐的向量空间，而不是逐语言各建互不相通的索引。" },
        { t: "先机器翻译整库再只用英文单语嵌入", ok: false, why: "可行但贵且易损；多语嵌入是更直接路径。" },
        { t: "把西班牙语文档维度扩到两倍", ok: false, why: "维度魔法对不齐语言。" },
        { t: "只用 BM25，因为词面能跨语言匹配", ok: false, why: "词法几乎无法跨语种对齐同义表述。" },
      ],
      ["ai-embedding", "ai-rag"],
    ),
    q(
      "11",
      "语义检索默认常用余弦相似度，主要因为？",
      [
        { t: "看方向不看模长，减少文档长短带来的偏置", ok: true, why: "长文向量模长常更大；余弦更贴「语义朝向」。" },
        { t: "余弦一定比点积算得更快", ok: false, why: "已归一化时二者等价；速度不是选用主因。" },
        { t: "余弦能自动做权限过滤", ok: false, why: "相似度公式不管 ACL。" },
        { t: "余弦保证 ANN 零假阴性", ok: false, why: "度量与近似索引误差是两回事。" },
      ],
      ["ai-vector-store"],
    ),
    q(
      "12",
      "对嵌入做 L2 归一化后，余弦与点积的关系是？",
      [
        { t: "单位向量上二者等价，可简化打分实现", ok: true, why: "‖a‖=‖b‖=1 时 cos=a·b；许多库默认假设已归一化。" },
        { t: "归一化后必须改用欧氏距离，否则非法", ok: false, why: "欧氏可用，但不是「必须」；余弦/点积仍合法。" },
        { t: "归一化会破坏语义，生产禁用", ok: false, why: "文本检索里归一化是常规做法。" },
        { t: "归一化只影响 BM25，不影响稠密分", ok: false, why: "归一化作用在向量，与 BM25 无关。" },
      ],
      ["ai-embedding", "ai-vector-store"],
    ),
    q(
      "13",
      "下列哪项最应该触发全库重新嵌入？",
      [
        { t: "更换嵌入模型，或旧模型被厂商 deprecate", ok: true, why: "向量与模型绑定；空间变了，旧向量与新 query 不可比。" },
        { t: "调大了一次 top-k", ok: false, why: "运行超参，不改已存向量。" },
        { t: "换了重排器厂商", ok: false, why: "重排吃的是候选文本，通常不必全库重嵌。" },
        { t: "生成模型升级了一个小版本", ok: false, why: "生成权重变≠嵌入空间变。" },
      ],
      ["ai-embedding", "ai-rag"],
    ),
    q(
      "14",
      "语料只有数千向量、又要近似 100% 召回时，索引选型优先？",
      [
        { t: "Flat（暴力全扫）", ok: true, why: "小库全扫可承受，且召回上限最高。" },
        { t: "IVF 且 nprobe=1", ok: false, why: "极端省算但召回风险大，小库没必要。" },
        { t: "必须上磁盘 PQ，否则装不下", ok: false, why: "数千向量内存压力通常很小。" },
        { t: "关掉向量检索，只留关键词", ok: false, why: "因噎废食；小库完全可以 dense+精确。" },
      ],
      ["ai-vector-store"],
    ),
    q(
      "14b",
      "HNSW 上想在延迟可接受时抬高 recall，优先调哪个旋钮？",
      [
        { t: "增大查询时的 ef（efSearch）", ok: true, why: "ef 控制搜索时探索宽度，是经典 recall–latency 旋钮。" },
        { t: "把嵌入维度减半", ok: false, why: "降维改变表示，不是 HNSW 标准调 recall 手段。" },
        { t: "把 temperature 调到 0", ok: false, why: "生成参数，不影响 ANN 图搜索。" },
        { t: "删掉所有元数据字段", ok: false, why: "与图搜索宽度无关。" },
      ],
      ["ai-vector-store"],
    ),
    q(
      "15",
      "用户常搜零件号「ACME-X200」。为何混合检索（稠密 + BM25）往往必要？",
      [
        { t: "稠密对罕见精确 token 弱，词法支路保住 exact match", ok: true, why: "语义近邻救不了稀有编码；BM25 补精确召回。" },
        { t: "混合检索能自动做 ACL", ok: false, why: "融合是召回策略，不是授权。" },
        { t: "有了混合就不再需要分块", ok: false, why: "两路检索仍吃 chunk。" },
        { t: "混合检索会消除一切幻觉", ok: false, why: "召回更好≠生成不再编造。" },
      ],
      ["ai-hybrid-search"],
    ),
    q(
      "16",
      "ANN 已开启，同时元数据过滤会丢掉约 99% 向量。最危险的副作用是？",
      [
        { t: "高选择性过滤叠加近似搜索，召回断崖（假阴性暴增）", ok: true, why: "候选空间被滤到极薄时，朴素 HNSW 易空窗；需分区/过滤感知索引。" },
        { t: "嵌入维度会被迫升高", ok: false, why: "过滤不改维度。" },
        { t: "BM25 会自动接管并保证 100% 召回", ok: false, why: "词法支路若同样被错误过滤，一样空。" },
        { t: "只会变慢，不会漏召回", ok: false, why: "典型症状是漏，而不只是慢。" },
      ],
      ["ai-vector-store", "craft-security"],
    ),
    q(
      "17",
      "向量库跑久了查询变慢，频繁增删改之后最常见的结构性原因是？",
      [
        { t: "索引碎片/未 compaction，参数也未随数据量重调", ok: true, why: "ANN 结构会随写入退化；需要 rebuild/compaction 与容量规划。" },
        { t: "生成模型上下文窗口变小了", ok: false, why: "生成窗口不影响向量查询毫秒数。" },
        { t: "余弦被偷偷换成了点积", ok: false, why: "度量切换少见，且不是「跑久了」的典型衰减。" },
        { t: "用户问法变得更礼貌", ok: false, why: "措辞礼貌不解释索引性能劣化。" },
      ],
      ["ai-vector-store", "craft-observability"],
    ),
    q(
      "18",
      "生产向量库要支持回滚旧版本文档且避免重复嵌入，元数据上最关键的组合是？",
      [
        { t: "version + is_deleted + content_hash，查询过滤最新未删版", ok: true, why: "软删可回滚；hash 跳过重复嵌入；版本过滤防旧文污染。" },
        { t: "只存原始文件名，靠运维口头约定", ok: false, why: "不可机读，无法在查询路径强制。" },
        { t: "把全文再抄一份进日志当版本库", ok: false, why: "制造 PII/泄密面，也不是向量库版本方案。" },
        { t: "用更高 temperature 覆盖旧内容", ok: false, why: "生成随机性删不掉旧向量。" },
      ],
      ["ai-vector-store"],
    ),
    q(
      "19",
      "简单 factoid 问答已加重排。top-k 从 8 提到 80，最可能的负面效果是？",
      [
        { t: "更多噪声进窗，涨延迟与 LLM 费用，精确率易掉", ok: true, why: "k 连接 recall 与上下文预算；有 rerank 时也不该无界放大。" },
        { t: "嵌入模型会自动切换到更大尺寸", ok: false, why: "k 不触发换模。" },
        { t: "ACL 会失效", ok: false, why: "授权与 k 无关（除非你错误地后过滤）。" },
        { t: "向量维度减半", ok: false, why: "无此耦合。" },
      ],
      ["ai-rerank", "ai-token-context"],
    ),
    q(
      "20",
      "初检已用双塔召回 top-50。上线 cross-encoder 重排的核心收益是？",
      [
        { t: "对短名单做 query–doc 联合打分，显著抬精确率", ok: true, why: "双塔快但粗；交叉编码器贵但准，适合百级候选精排。" },
        { t: "可以跳过第一阶段，直接对全库 cross-encode", ok: false, why: "全库交叉不可扩展；必须先宽召回。" },
        { t: "自动修复错误的分词器", ok: false, why: "重排不改正文 token 化。" },
        { t: "把多租户隔离一并解决", ok: false, why: "隔离是 ACL/索引分区问题。" },
      ],
      ["ai-rerank"],
    ),
    q(
      "21",
      "同一政策被切成多个高度重叠 chunk，top-k 全是近重复。应用什么机制提升信息覆盖？",
      [
        { t: "MMR：在相关性与多样性间加权，惩罚与已选过于相似的候选", ok: true, why: "纯相似度排序易返回 duplicates；MMR 提高上下文覆盖面。" },
        { t: "把 temperature 调高让生成更多样", ok: false, why: "那是生成多样性，不解决检索重复。" },
        { t: "关掉重排器", ok: false, why: "往往让重复/噪声更严重。" },
        { t: "只保留 BM25，去掉稠密", ok: false, why: "词法也可能返回近重复段落。" },
      ],
      ["ai-chunking", "ai-rerank"],
    ),
    q(
      "22",
      "gold chunk 已在上下文里，模型仍陈述检索未支持的事实。最先该加强的是？",
      [
        { t: "拒答/忠实度护栏 + 矛盾检测 + 强约束提示与 citation 校验", ok: true, why: "RAG 不是「有上下文就不会编」；生成器仍可能忽略或曲解片段。" },
        { t: "把 top-k 再加大一倍", ok: false, why: "更多上下文有时更吵，不保证更忠实。" },
        { t: "换成 Flat 索引", ok: false, why: "索引类型不解决「有据仍编」。" },
        { t: "关闭系统提示以减少干扰", ok: false, why: "更需要明确的忠实度约束，不是拆提示。" },
      ],
      ["ai-rag", "ai-prompt-security"],
    ),
    q(
      "23",
      "用户问得很口语、多义，文档表述却很正式。改善首轮召回最直接的查询侧手段是？",
      [
        { t: "查询改写：扩写/消歧/改成更贴索引表述", ok: true, why: "缩小 query–document 表述 gap，是检索前最便宜的杠杆之一。" },
        { t: "把生成 max_tokens 加大", ok: false, why: "输出长度不改善检索匹配。" },
        { t: "删除所有元数据", ok: false, why: "通常有害，且与语义 gap 无关。" },
        { t: "只用更大的交叉编码器做第一阶段", ok: false, why: "第一阶段要对全库可扩展；应改写 query 或混合检索。" },
      ],
      ["ai-agentic-rag"],
    ),
    q(
      "24",
      "HyDE：先让 LLM 写假想答案再嵌入检索。何时最容易有害？",
      [
        { t: "假想答案事实错误，把检索带向错误邻域", ok: true, why: "HyDE 放大生成质量；错假想 = 错召回，还多付一次 LLM。" },
        { t: "语料是干净小型 FAQ 且 query 已很贴文档", ok: false, why: "这时 HyDE 常多余，但「有害」主因仍是错误假想。" },
        { t: "使用了余弦而不是点积", ok: false, why: "度量选择不是 HyDE 特有风险。" },
        { t: "开启了 ACL 预过滤", ok: false, why: "授权与 HyDE 正交，通常仍应开。" },
      ],
      ["ai-rag", "ai-embedding"],
    ),
    q(
      "25",
      "向量库从百万级扩到亿级后，同样 k 下召回变差。规模化侧最该优先考虑？",
      [
        { t: "分区/分层索引、调 ANN、混合检索 + rerank，并定期 rebuild", ok: true, why: "空间更拥挤 + 近似误差叠加；不能同一套参数硬扛。" },
        { t: "把所有文档糊进一条超长系统提示", ok: false, why: "不可扩展，也放弃检索。" },
        { t: "禁止新增文档", ok: false, why: "业务不可接受；应工程化扩容。" },
        { t: "只降低嵌入维度到 8 维", ok: false, why: "极端降维会毁语义，不是首选扩容策略。" },
      ],
      ["ai-vector-store", "ai-hybrid-search"],
    ),
    q(
      "26",
      "对话记忆与长期记忆的关键差别是？",
      [
        { t: "对话记忆随会话、可短 TTL；长期记忆跨会话持久，需检索与更新策略", ok: true, why: "TTL、后端与隐私模型不同；混用易爆窗或泄旧偏好。" },
        { t: "长期记忆只能存向量，对话记忆只能存明文", ok: false, why: "存储形态可多样；关键是生命周期与范围。" },
        { t: "二者必须用不同嵌入维度", ok: false, why: "无此硬性要求。" },
        { t: "有了长期记忆就不必做文档 RAG", ok: false, why: "用户画像 ≠ 企业知识库。" },
      ],
      ["ai-agent-memory"],
    ),
    q(
      "27",
      "防止密钥/PII 写入 Agent 记忆库，正确落点是？",
      [
        { t: "入库前检测与 redaction，记忆检索同样走 ACL", ok: true, why: "记忆是可检索持久化面；生成后再打码太晚。" },
        { t: "只在最终答案里打码", ok: false, why: "敏感内容已进可检索存储。" },
        { t: "把 temperature 设为 0", ok: false, why: "随机性参数不防写入。" },
        { t: "记忆库只用更大维度向量", ok: false, why: "维度与脱敏无关。" },
      ],
      ["ai-agent-memory", "ai-prompt-security"],
    ),
    q(
      "28",
      "要把系统提示、用户问、记忆与检索 chunk 一并塞进窗，最可靠的防溢出手段是？",
      [
        { t: "给各段固定 token 预算，按相关性/时效裁剪", ok: true, why: "无界堆历史与 top-k 必爆窗；显式预算是硬约束。" },
        { t: "指望模型自动忽略超长部分", ok: false, why: "超长会截断或丢中间，行为不可控。" },
        { t: "关掉检索，只留记忆", ok: false, why: "因噎废食，且记忆仍可能爆。" },
        { t: "把所有内容 base64 压缩进提示", ok: false, why: "模型读不懂随意编码，且不一定更短。" },
      ],
      ["ai-token-context", "ai-agent-memory"],
    ),
    q(
      "29",
      "内部 Wiki 事实问答、关系不复杂、也无工具调用。默认应先选哪种 RAG 形态？",
      [
        { t: "基础 RAG：检索相似 chunk 后生成", ok: true, why: "简单 FAQ/Wiki 用基础形态即可；Graph/Agentic 是复杂度税。" },
        { t: "Graph RAG：先建全库知识图谱", ok: false, why: "关系推理需求不强时，图谱成本过高。" },
        { t: "Agentic RAG：每步都让模型决定要不要搜", ok: false, why: "多步决策带来延迟与失控面，简单 QA 不值得。" },
        { t: "不做检索，直接微调进权重", ok: false, why: "事实易变时微调难保鲜、难引用。" },
      ],
      ["ai-rag", "ai-agentic-rag"],
    ),
    q(
      "30",
      "问题需要「先找政策 A 的条款，再对照产品 B 的例外」。单跳 top-k 常不够。应采用？",
      [
        { t: "多跳检索：按信息缺口改写/分解后再检", ok: true, why: "跨文档综合要把大问题拆成可检索子问题。" },
        { t: "只把 k 调到 200 一次性捞齐", ok: false, why: "噪声爆炸且仍可能缺关键跳。" },
        { t: "换成欧氏距离", ok: false, why: "度量换不来多跳推理。" },
        { t: "关闭重排以保留更多原始顺序", ok: false, why: "与多跳信息补全无关。" },
      ],
      ["ai-agentic-rag"],
    ),
    q(
      "31",
      "语料含法务/工程/HR 多个子库。chunk 路由的核心做法是？",
      [
        { t: "先判 query 意图/领域，再搜对应子索引", ok: true, why: "路由等于粗筛，降低异构大库上的噪声邻居。" },
        { t: "把所有子库向量平均成一条再搜", ok: false, why: "平均向量毁掉可检索结构。" },
        { t: "随机选一个子库以降低延迟", ok: false, why: "正确性不可接受。" },
        { t: "路由完成后即可取消 ACL", ok: false, why: "领域路由 ≠ 授权。" },
      ],
      ["ai-chunking", "ai-vector-store"],
    ),
    q(
      "32",
      "复杂 RAG 需要「检索→评估→不够则改写再检→生成」。编排器（如状态机/图）的核心价值是？",
      [
        { t: "把分支、重试与人审做成显式状态，而非写死线性函数", ok: true, why: "失败路径可编程，才便于观测与回归。" },
        { t: "自动把私有知识写入基座权重", ok: false, why: "编排 ≠ 微调。" },
        { t: "替代向量数据库", ok: false, why: "编排调度步骤，不存向量。" },
        { t: "保证零幻觉", ok: false, why: "流程可控≠事实必对。" },
      ],
      ["ai-agent-graph", "ai-rag"],
    ),
    q(
      "33",
      "要 enforce「只许依据检索上下文作答」，单靠一句 system prompt 不够。还应加上？",
      [
        { t: "检索分阈值、结构化输出、citation 校验与拒答路径", ok: true, why: "护栏是检索+生成+后验多层；提示只是其中一层。" },
        { t: "更大的嵌入维度", ok: false, why: "维度不 enforce 忠实度。" },
        { t: "关闭所有日志", ok: false, why: "更难审计违规输出。" },
        { t: "把 top-k 固定为 1", ok: false, why: "过窄召回会漏据，也不等于忠实度护栏。" },
      ],
      ["ai-prompt-security", "ai-rag"],
    ),
    q(
      "34",
      "初检 top 结果相似度明显偏低、内容也不相关。在线侧应如何阻断胡答？",
      [
        { t: "低于阈值则拒答或澄清，勿把垃圾上下文送去生成", ok: true, why: "无关 chunk 进窗等于邀请编造。" },
        { t: "强制模型「自信地回答」", ok: false, why: "与忠实度目标相反。" },
        { t: "自动把阈值降到 0 以提高回答率", ok: false, why: "回答率上去，幻觉率也上去。" },
        { t: "换成更大生成模型硬答", ok: false, why: "没有依据时更大模型仍会编。" },
      ],
      ["ai-rag", "ai-rerank"],
    ),
    q(
      "35",
      "实现引用强制时，比「提示里写请注明来源」更可靠的是？",
      [
        { t: "结构化输出要求 [n] + 后验校验 ID 是否落在检索列表", ok: true, why: "把引用变成可验证格式问题；无支撑陈述可重生成或标红。" },
        { t: "加长系统提示抒情强调诚信", ok: false, why: "合规率仍低，且不可自动检测。" },
        { t: "只用更大的 reranker", ok: false, why: "重排提高相关性，不保证引用格式。" },
        { t: "把引用检查放到下周人工抽检", ok: false, why: "抽检太慢，挡不住线上漏标。" },
      ],
      ["ai-rag", "craft-observability"],
    ),
    q(
      "36",
      "攻击者向语料写入看似权威、实则误导的文档并被高分召回。这属于？",
      [
        { t: "检索投毒（retrieval poisoning）", ok: true, why: "在知识层下毒，绕过许多生成侧护栏；需来源校验、写入权限与审核。" },
        { t: "直接提示注入（仅用户输入框）", ok: false, why: "载荷在语料，不一定出现在用户输入。" },
        { t: "梯度消失", ok: false, why: "训练动态术语，与语料投毒无关。" },
        { t: "HNSW 构建失败", ok: false, why: "索引构建问题不是这种攻击模型。" },
      ],
      ["ai-rag", "craft-security"],
    ),
    q(
      "37",
      "召回后、拼提示前，如何确认 chunk 属于当前用户允许文档集？",
      [
        { t: "元数据带 tenant/ACL；预过滤 + 召回后二次校验", ok: true, why: "授权必须在片段进窗前生效；仅生成侧拒绝不够。" },
        { t: "让模型阅读后自行判断是否越权", ok: false, why: "模型不是可信 PEP。" },
        { t: "靠 HTTPS 即可", ok: false, why: "传输加密≠文档级授权。" },
        { t: "把所有租户文档拼进同一提示再靠提示约束", ok: false, why: "特权内容已进窗，约束可被绕过。" },
      ],
      ["craft-security", "ai-rag"],
    ),
    q(
      "38",
      "生产上要压低向量查询 P99，下列哪组手段最对口？",
      [
        { t: "合适 ANN、调 ef/nprobe、量化/分片、热 query 缓存与就近副本", ok: true, why: "延迟来自索引结构、硬件与数据布局，需在 recall 约束下压 P99。" },
        { t: "把系统提示写得更短", ok: false, why: "主要影响生成，不是向量检索毫秒数。" },
        { t: "提高 temperature", ok: false, why: "与检索延迟无关。" },
        { t: "取消所有元数据字段以「简化」", ok: false, why: "可能毁掉过滤能力，也不一定更快。" },
      ],
      ["ai-vector-store", "craft-observability"],
    ),
    q(
      "39",
      "缓存检索结果（同一 query→同一 chunk 列表）时，最大风险是？",
      [
        { t: "语料/权限变更后命中 stale 结果", ok: true, why: "缓存键须含模型/索引版本/ACL；更新要失效。" },
        { t: "余弦变成点积", ok: false, why: "不是缓存特有风险。" },
        { t: "嵌入维度自动变化", ok: false, why: "无此机制。" },
        { t: "BM25 被永久禁用", ok: false, why: "缓存策略不必然关掉词法支路。" },
      ],
      ["ai-rag", "craft-security"],
    ),
    q(
      "40",
      "端到端链路是 embed→向量检索→BM25→融合→生成。哪段最适合并行以降延迟？",
      [
        { t: "向量检索与 BM25 两路并行，再融合", ok: true, why: "两路互相独立，串行只是把延迟相加。" },
        { t: "生成与检索同时开写，不等待任何 chunk", ok: false, why: "无上下文开写易胡答；最多流式，仍需首包依据。" },
        { t: "把 ACL 校验放到生成之后并行", ok: false, why: "授权必须在进窗前，不能并行推迟。" },
        { t: "并行训练一个新基座模型", ok: false, why: "与单次请求延迟无关。" },
      ],
      ["ai-hybrid-search"],
    ),
    q(
      "41",
      "小 chunk + 高维嵌入 + 强 rerank，对成本/延迟的典型合力是？",
      [
        { t: "索引与检索次数↑、存储↑、精排延迟↑，生成 token 可能↓", ok: true, why: "三杠杆联动：索引体量、QPS 与精排费用要对着 profiling。" },
        { t: "总成本一定下降", ok: false, why: "检索/精排侧常更贵，需实测。" },
        { t: "只会加快、不会变慢", ok: false, why: "rerank 与更多向量通常加延迟。" },
        { t: "ACL 会自动变严", ok: false, why: "与权限无关。" },
      ],
      ["ai-chunking", "ai-rerank"],
    ),
    q(
      "42",
      "要降低 RAG 推理费用，上下文占用上最有效的方向是？",
      [
        { t: "去 boilerplate、压缩/精选 top chunk，避免重复贴全文", ok: true, why: "input token 近似线性计费；少而准是主杠杆。" },
        { t: "把输出 max_tokens 开到最大", ok: false, why: "输出更贵，通常更糟。" },
        { t: "每个请求全库重嵌", ok: false, why: "极端昂贵。" },
        { t: "取消引用以缩短提示", ok: false, why: "省了几个字，丢掉可审计性。" },
      ],
      ["ai-token-context", "ai-rag"],
    ),
    q(
      "43",
      "系统提示里写清「仅依据所给上下文，不知则拒答，关键陈述需引用」，主要改善的是？",
      [
        { t: "降低用参数记忆补全、乱引与硬编的概率", ok: true, why: "行为先验能显著改忠实度；弱约束下模型更爱「补全」。" },
        { t: "提高 ANN 召回率", ok: false, why: "提示不改向量检索。" },
        { t: "自动修复 PDF 表格", ok: false, why: "入库问题不在提示层。" },
        { t: "消除对 ACL 的需求", ok: false, why: "提示不是授权机制。" },
      ],
      ["ai-prompt-security", "ai-rag"],
    ),
    q(
      "44",
      "长上下文里检索段被模型「无视」。提示组装上较有效的缓解是？",
      [
        { t: "清晰分隔/标签标来源；关键摘录靠前，减少噪声与指令冲突", ok: true, why: "lost-in-the-middle 与指令竞争会让模型跳过检索段。" },
        { t: "把检索段打成一段无标点长文", ok: false, why: "更难定位与遵守。" },
        { t: "把系统提示删到只剩一个词", ok: false, why: "失去行为约束，问题更大。" },
        { t: "只依赖更大窗口，不做结构", ok: false, why: "窗口变大仍可能丢中间。" },
      ],
      ["ai-token-context", "ai-rag"],
    ),
    q(
      "45",
      "RAG 里 system / retrieval / answer 三类提示应如何分工？",
      [
        { t: "system 管全局行为；retrieval 管改写/子问；answer 基于已检 chunk 作答", ok: true, why: "分阶段避免指令打架，也便于分别评测。" },
        { t: "三类提示必须字字相同以免漂移", ok: false, why: "职责不同，强行相同会冲突。" },
        { t: "只需 answer 提示，其他多余", ok: false, why: "缺全局约束与检索侧改写时，链路更脆。" },
        { t: "retrieval 提示负责 ACL 判决", ok: false, why: "授权应在应用/检索过滤层，不靠提示。" },
      ],
      ["ai-rag"],
    ),
    q(
      "46",
      "要把「必须引用来源」做成高合规行为，提示设计上应优先？",
      [
        { t: "明确格式 + few-shot + 结构化 schema，并做后验 ID 校验", ok: true, why: "口头要求 compliance 低；示例与 schema 把任务变成可验证格式。" },
        { t: "只在用户消息里偶尔提一句", ok: false, why: "不稳定，且难自动检查。" },
        { t: "用诗歌形式写系统提示以增加「庄重感」", ok: false, why: "风格无助于可验证引用。" },
        { t: "禁止一切标点，迫使模型简写", ok: false, why: "与引用无关，还伤可读性。" },
      ],
      ["ai-rag", "craft-observability"],
    ),
    q(
      "47",
      "按 query 检索规则/示例并动态拼进 system prompt。这种做法何时最容易失败？",
      [
        { t: "检索到错误规则，或指令过多互相打架", ok: true, why: "动态规则依赖检索质量与长度预算；错规则比静态缺失更糟。" },
        { t: "使用了 JSON 而不是 YAML", ok: false, why: "序列化格式不是主因。" },
        { t: "开启了 HTTPS", ok: false, why: "传输安全与提示冲突无关。" },
        { t: "向量已 L2 归一化", ok: false, why: "归一化不导致规则冲突。" },
      ],
      ["ai-rag", "ai-rules"],
    ),
    q(
      "48",
      "构建可靠 RAG 评测集，不可或缺的标注是？",
      [
        { t: "真实多样 query + gold 答案 + 支持 chunk（能区分检索/生成失败）", ok: true, why: "没有 chunk 级依据就无法定位失败在哪一层。" },
        { t: "只有最终答案的点赞数", ok: false, why: "点赞混杂偏好，归因不清。" },
        { t: "只有嵌入模型的参数量", ok: false, why: "不是评测集。" },
        { t: "随机生成的无领域 query 即可", ok: false, why: "要覆盖真实难度与失败模式，并定期回归。" },
      ],
      ["ai-rag-eval"],
    ),
    q(
      "49",
      "更关心「相关 chunk 有没有进前 K」，应主看哪个指标？",
      [
        { t: "Recall@K", ok: true, why: "漏召回诊断用 Recall@K；排序质量再用 MRR/nDCG，控噪声看 Precision@K。" },
        { t: "仅 BLEU", ok: false, why: "生成表面重合，不代表检索召回。" },
        { t: "仅 GPU 利用率", ok: false, why: "基础设施指标，不是检索质量。" },
        { t: "仅用户会话时长", ok: false, why: "产品指标，归因混杂。" },
      ],
      ["ai-rag-eval"],
    ),
    q(
      "50",
      "怀疑幻觉。二分调试的第一步应看？",
      [
        { t: "gold chunk 是否出现在 top-k：不在查检索，在则查生成/护栏", ok: true, why: "检索与生成优化手段不同；先定位层再动手。" },
        { t: "先无条件换最大生成模型", ok: false, why: "可能掩埋检索黑洞。" },
        { t: "先把整个向量库删重建", ok: false, why: "成本高且未必是根因。" },
        { t: "先关闭所有评测以免干扰", ok: false, why: "评测正是定位工具。" },
      ],
      ["ai-rag-eval", "ai-rag"],
    ),
  ],
});

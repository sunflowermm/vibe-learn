import { defineQuizSet } from '../schema.js';

/**
 * 第五章 · 知识段精选：Embedding → 经典 RAG → 分块/混合/重排/向量库/评测 → Agentic → 上下文工程。
 * 每题挂准节点；填补「工程细课 curated≈0」与课文自测单点抽查。
 */
export default defineQuizSet({
  id: 'concept-ai-rag',
  title: '概念 · RAG 知识工程全链',
  kind: 'concept',
  domain: 'ai',
  tags: ['RAG', 'Embedding', '分块', '混合检索', '重排', '评测'],
  relatedNodes: [
    'ai-embedding',
    'ai-rag',
    'ai-chunking',
    'ai-hybrid-search',
    'ai-rerank',
    'ai-vector-store',
    'ai-rag-eval',
    'ai-agentic-rag',
  ],
  caption: '按因果链考边界：检索层先于微调；经典 RAG 不依赖智能体。',
  questions: [
    {
      id: 'concept-ai-rag:q1',
      q: '建库用嵌入模型 A、查询用模型 B，最可能发生什么？',
      choices: [
        {
          t: '向量空间不对齐，近邻排序失真，通常要统一模型并重嵌',
          ok: true,
          why: '同一嵌入空间是近邻有意义的前提；维度相同也不等于同一空间。',
        },
        {
          t: '一般更好，因为模型多样性可互相校正',
          ok: false,
          why: '多样性不能对齐坐标系；近邻比较会失效。',
        },
        {
          t: '只要两端维度数字相同就完全等价',
          ok: false,
          why: '维度只描述长度，坐标语义由具体模型决定。',
        },
        {
          t: '运行时会自动把 B 线性变换到 A 的空间',
          ok: false,
          why: '没有通用的模型间自动对齐；换模型通常整库重嵌。',
        },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'concept-ai-rag:q2',
      q: '相对关键词/BM25，向量检索的典型强项与弱项是什么？',
      choices: [
        {
          t: '强在同义改写；弱在专名/编号/错误码等字面强信号',
          ok: true,
          why: 'embedding 课对照表：语义近 ≠ 字面稳，故生产常走混合检索。',
        },
        {
          t: '强在精确条款号；弱在同义改写',
          ok: false,
          why: '那是 BM25 侧画像，说反了。',
        },
        {
          t: '向量检索保证事实正确，无需再生成',
          ok: false,
          why: '检索只取近邻片段；生成与忠实度是另一步。',
        },
        {
          t: '向量检索不需要同模型，任意嵌入可混用',
          ok: false,
          why: '建库与查询必须同一嵌入模型。',
        },
      ],
      relatedNodes: ['ai-embedding', 'ai-hybrid-search'],
    },
    {
      id: 'concept-ai-rag:q3',
      q: '经典检索增强生成（RAG）的三步是什么？是否必须先有智能体循环？',
      choices: [
        {
          t: '检索→增强进提示→生成；不必先有智能体，经典可为固定管道',
          ok: true,
          why: 'Agentic RAG 是汇合段形态；经典知识段先讲无工具环流水线。',
        },
        {
          t: '必须先微调基座，否则片段进不了提示',
          ok: false,
          why: 'RAG 正是少改权重：片段在推理期拼进消息即可。',
        },
        {
          t: '必须先部署 MCP，否则无法检索',
          ok: false,
          why: 'MCP 是工具插接；RAG 检索不依赖 MCP。',
        },
        {
          t: 'RAG 等于 Agent 控制循环，二者同义',
          ok: false,
          why: '层次不同：RAG 管材料进窗；Agent 管多步决策与工具。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-agentic-rag'],
    },
    {
      id: 'concept-ai-rag:q4',
      q: '相对「每更新知识就微调」，经典 RAG 主要解决哪类痛点？',
      choices: [
        {
          t: '知识截止与私有文档未进权重，又要可追溯出处时，外挂证据更划算',
          ok: true,
          why: '档位 D（外挂证据）：更新文档比重训权重便宜，且便于引用。',
        },
        {
          t: '彻底消灭幻觉，使模型永不胡说',
          ok: false,
          why: '检错仍会「有据胡说」；RAG 降风险不保证零幻觉。',
        },
        {
          t: '替代全部工具调用与写文件能力',
          ok: false,
          why: 'RAG 解决「看见什么材料」；行动仍靠工具调用。',
        },
        {
          t: '把上下文窗口扩到无限',
          ok: false,
          why: '检索块仍占窗口预算，不是无限窗。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-adaptation'],
    },
    {
      id: 'concept-ai-rag:q5',
      q: '分块（chunking）时，「固定长度 / 重叠窗 / 结构感知 / 语义切」分别最怕什么？',
      choices: [
        {
          t: '硬切切断句表；重叠抬成本；结构依赖解析质量；语义切实现更重',
          ok: true,
          why: '策略谱系各有代价，没有「永远最优」的一种切法。',
        },
        {
          t: '四种策略都会自动把嵌入维度翻倍',
          ok: false,
          why: '维度由嵌入模型决定，与切法无关。',
        },
        {
          t: '只有固定长度可用，其余都是伪概念',
          ok: false,
          why: '结构感知与语义切在法规/长文里很常见。',
        },
        {
          t: '重叠窗可以完全消除评测需求',
          ok: false,
          why: '重叠只减边界损失，仍要用黄金集验证。',
        },
      ],
      relatedNodes: ['ai-chunking'],
    },
    {
      id: 'concept-ai-rag:q6',
      q: '分块过碎与过大，各自最常见的后果？',
      choices: [
        {
          t: '过碎缺语境易断章取义；过大噪声多、易超窗、嵌入被稀释',
          ok: true,
          why: '粒度服务可读证据与窗口预算，不是越细越好。',
        },
        {
          t: '过碎会让检索永远召不回；过大则维度自动变大',
          ok: false,
          why: '过碎仍可能召回；维度不随块大小变。',
        },
        {
          t: '两种都只影响 UI 字体，与生成无关',
          ok: false,
          why: '进窗材料质量直接决定生成。',
        },
        {
          t: '向量库会自动合并或拆分，切法可随意',
          ok: false,
          why: '索引按你写入的块检索，不会替你修好坏切。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag'],
    },
    {
      id: 'concept-ai-rag:q7',
      q: '政策条文、源代码、FAQ、多栏 PDF，分块时更稳妥的倾向？',
      choices: [
        {
          t: '结构感知留条款号；按符号/文件切代码；FAQ 一块一问答；PDF 先版面还原再切',
          ok: true,
          why: '场景口诀：先保结构与可引用标识，再谈长度。',
        },
        {
          t: '一律按 200 字硬切，场景无关',
          ok: false,
          why: '硬切常切断签名与条款号。',
        },
        {
          t: '代码应按自然语言段落语义切',
          ok: false,
          why: '代码更宜按符号/文件，忌切断函数签名。',
        },
        {
          t: 'PDF 直接当纯文本硬切即可，无需版面',
          ok: false,
          why: '多栏/页眉脚先还原，必要时 OCR。',
        },
      ],
      relatedNodes: ['ai-chunking'],
    },
    {
      id: 'concept-ai-rag:q8',
      q: '小语料工作区知识，是否必须先切块入库向量库？',
      choices: [
        {
          t: '不必；常可用 tools.read / 工作区直读进窗，大语料才谈 chunk+索引',
          ok: true,
          why: '上下文工程与本仓实践：小而稳语料硬上向量库得不偿失。',
        },
        {
          t: '必须；没有向量库就不能做任何 RAG',
          ok: false,
          why: '经典 RAG 可用多种检索；直读文件也是外挂证据。',
        },
        {
          t: '必须先微调，才能读工作区文件',
          ok: false,
          why: '读文件是工具/运行时能力，与微调无关。',
        },
        {
          t: '小语料也应把 Top-K 开到最大并关闭权限过滤',
          ok: false,
          why: '噪声与安全问题不会因语料小而消失。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag-shift', 'ai-agentic-rag'],
    },
    {
      id: 'concept-ai-rag:q9',
      q: '混合检索（hybrid search）的核心直觉是什么？',
      choices: [
        {
          t: '同一查询并行稀疏（如 BM25）与稠密（向量）通道，再融合候选',
          ok: true,
          why: '专名与同义互补；常见再接 RRF/加权与重排。',
        },
        {
          t: '先微调两个基座，再任选一个通道检索',
          ok: false,
          why: '混合是召回层策略，不要求先微调。',
        },
        {
          t: '只用向量，但把 BM25 分数写进生成提示当装饰',
          ok: false,
          why: 'BM25 应参与召回候选，不是提示里的摆设。',
        },
        {
          t: '禁止融合，两路结果必须分两次回答用户',
          ok: false,
          why: '融合正是为了一次给出更全的候选再精排。',
        },
      ],
      relatedNodes: ['ai-hybrid-search'],
    },
    {
      id: 'concept-ai-rag:q10',
      q: '倒数排名融合（RRF）相对「强行加原始分数」的实务优点？',
      choices: [
        {
          t: '按各通道排名倒数相加，少做跨量纲校准，调参压力更小',
          ok: true,
          why: 'BM25 与向量分数量纲不同；RRF 用名次融合更稳。',
        },
        {
          t: 'RRF 会自动加密租户数据',
          ok: false,
          why: 'RRF 是融合算法，不是安全机制。',
        },
        {
          t: 'RRF 等于交叉编码器重排',
          ok: false,
          why: '融合在召回侧；交叉编码器是精排手法。',
        },
        {
          t: '用了 RRF 就不必再评测',
          ok: false,
          why: '融合权重/K 仍要用黄金集回归。',
        },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-rerank'],
    },
    {
      id: 'concept-ai-rag:q11',
      q: '用户问「报错 ECONNRESET 怎么办」，检索层更该怎么做？',
      choices: [
        {
          t: '混合：关键词保住错误码，向量补解释性文档',
          ok: true,
          why: '错误码是字面强信号；纯语义易漂到无关「连接失败」散文。',
        },
        {
          t: '只靠语义向量，并删掉报错码以免干扰嵌入',
          ok: false,
          why: '删掉最强字面信号只会更难命中。',
        },
        {
          t: '立刻全量微调基座写入该错误码',
          ok: false,
          why: '先修召回层，勿一上来改权重。',
        },
        {
          t: '关闭所有检索，只靠模型预训练记忆',
          ok: false,
          why: '私有运维文档往往不在权重里。',
        },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-embedding'],
    },
    {
      id: 'concept-ai-rag:q12',
      q: '重排序（rerank）相对宽召回，主要目标是什么？',
      choices: [
        {
          t: '从宽召回里挑出最值得写入提示的 Top-N，服务上下文预算',
          ok: true,
          why: '召回求「别漏」，重排求「别噪」。',
        },
        {
          t: '把嵌入维度降下来以省存储',
          ok: false,
          why: '维度由嵌入模型决定；重排不改向量长度。',
        },
        {
          t: '替换生成用的大语言模型',
          ok: false,
          why: '重排在检索侧，不更换生成模型。',
        },
        {
          t: '把 BM25 与向量原始分强制加到同一量纲',
          ok: false,
          why: '那是融合/校准；重排是对候选再打分。',
        },
      ],
      relatedNodes: ['ai-rerank', 'ai-hybrid-search'],
    },
    {
      id: 'concept-ai-rag:q13',
      q: '何时几乎必须重排，何时可以先跳过？',
      choices: [
        {
          t: 'K 很大噪声多时几乎必须；候选已很少且字面强命中时可先跳过再用评测决定',
          ok: true,
          why: '重排有延迟/成本；用评测证明是否值得，而不是教条全开。',
        },
        {
          t: '永远必须上交叉编码器，否则非法',
          ok: false,
          why: '轻量规则/标题命中也是重排；且小候选可先跳过。',
        },
        {
          t: '永远跳过重排，靠更大窗口吞掉噪声',
          ok: false,
          why: '噪声进窗会「有据胡说」，窗口不是免费的。',
        },
        {
          t: '只有微调之后才能重排',
          ok: false,
          why: '重排是推理期检索步骤，与是否微调无关。',
        },
      ],
      relatedNodes: ['ai-rerank', 'ai-rag-eval'],
    },
    {
      id: 'concept-ai-rag:q14',
      q: '交叉编码器精排相对双塔/向量近邻，直觉差异是什么？',
      choices: [
        {
          t: '问句+片段成对打分更准但更贵；适合短候选列表，不适合对全库暴力扫',
          ok: true,
          why: '宽召回用 ANN/双塔求全，交叉编码在小候选上求准。',
        },
        {
          t: '交叉编码器专门降低嵌入维度',
          ok: false,
          why: '它做相关性打分，不是降维算法。',
        },
        {
          t: '交叉编码器可以替代生成模型直接写最终答案',
          ok: false,
          why: '精排仍输出排序；生成另一步。',
        },
        {
          t: '交叉编码器与权限过滤互斥，用了就不能做 ACL',
          ok: false,
          why: '过滤与精排可组合：先过滤再排。',
        },
      ],
      relatedNodes: ['ai-rerank'],
    },
    {
      id: 'concept-ai-rag:q15',
      q: '向量库里 ANN / HNSW 在工程上主要换什么？',
      choices: [
        {
          t: '用少许召回损失换查询速度；常吃内存，需与 metadata 过滤一起设计',
          ok: true,
          why: '近似近邻是性能杠杆；安全过滤不能只靠提示。',
        },
        {
          t: '保证 100% 精确最近邻且零内存',
          ok: false,
          why: 'ANN 正是牺牲一点召换速度；HNSW 通常吃内存。',
        },
        {
          t: '自动完成嵌入模型跨厂商对齐',
          ok: false,
          why: '索引结构不解决空间不对齐。',
        },
        {
          t: '替代关系库的事务与报表能力',
          ok: false,
          why: '元数据/事务仍常放 PG；向量库擅长相似检索。',
        },
      ],
      relatedNodes: ['ai-vector-store'],
    },
    {
      id: 'concept-ai-rag:q16',
      q: '已有 Postgres 时，向量检索的常见落地直觉？',
      choices: [
        {
          t: '可用 pgvector「一库两用」：结构化字段 + 向量；大规模多租户再考虑专用向量服务',
          ok: true,
          why: '选型课：不必一上来上独立向量集群。',
        },
        {
          t: 'Postgres 绝对不能存向量，必须另购专用库',
          ok: false,
          why: 'pgvector 就是常见路径。',
        },
        {
          t: '有了 pgvector 就不必再做 ACL 过滤',
          ok: false,
          why: '过滤仍要显式做。',
        },
        {
          t: '换嵌入模型时只需改端口号',
          ok: false,
          why: '要重嵌重建；端口无关。',
        },
      ],
      relatedNodes: ['ai-vector-store', 'db-postgresql'],
    },
    {
      id: 'concept-ai-rag:q17',
      q: '多租户 RAG 为何不能只靠「提示里写不要看别的租户」？',
      choices: [
        {
          t: '提示不可靠；应在检索层用 metadata/ACL 过滤可见文档',
          ok: true,
          why: '安全边界在检索/存储；模型可能忽略提示或被注入绕过。',
        },
        {
          t: '因为向量没有维度',
          ok: false,
          why: '向量有固定维度；问题在权限控制面。',
        },
        {
          t: '因为 HTTP 不支持 JSON',
          ok: false,
          why: '与传输格式无关。',
        },
        {
          t: '因为向量库无法存文档 id',
          ok: false,
          why: 'payload 正是存 id/租户字段并过滤的地方。',
        },
      ],
      relatedNodes: ['ai-vector-store', 'ai-prompt-security'],
    },
    {
      id: 'concept-ai-rag:q18',
      q: 'RAG 评测最小闭环里，哪一步缺了最危险？',
      choices: [
        {
          t: '没有黄金集（固定问题+可接受证据）就改分块/重排——无法回归',
          ok: true,
          why: '攒集→改一处杠杆→看指标与抽检；凭感觉等于演示过拟合。',
        },
        {
          t: '题干用了中文',
          ok: false,
          why: '语言不是评测闭环问题。',
        },
        {
          t: '使用了 HTTPS',
          ok: false,
          why: '传输安全 ≠ 检索质量闭环。',
        },
        {
          t: '延迟没有降到 0',
          ok: false,
          why: '延迟是系统层；先要能证伪检索/忠实度。',
        },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-chunking'],
    },
    {
      id: 'concept-ai-rag:q19',
      q: '检索 Recall@K 变好，但用户仍骂「胡编」，应优先加测什么？',
      choices: [
        {
          t: '生成忠实度 / 是否引用进窗证据',
          ok: true,
          why: '召回好只说明材料进了候选；生成仍可能无视证据胡说。',
        },
        {
          t: '嵌入维度是否为质数',
          ok: false,
          why: '与忠实度无关。',
        },
        {
          t: 'DNS TTL',
          ok: false,
          why: '与回答是否守证据无关。',
        },
        {
          t: '把窗口扩到最大并关闭重排',
          ok: false,
          why: '放大噪声，不是测忠实度。',
        },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-rerank'],
    },
    {
      id: 'concept-ai-rag:q20',
      q: 'Agentic RAG 相对经典「一检索一生成」，核心差别是什么？',
      choices: [
        {
          t: '由智能体动态决定是否/如何多次检索、改写查询与校验证据',
          ok: true,
          why: '检索被工具化；可多跳，成本与可观测性也更高。',
        },
        {
          t: '必须换更大参数量基座，否则无法检索',
          ok: false,
          why: '差别在控制环，不在参数量。',
        },
        {
          t: '取消生成步骤，只检索不回答',
          ok: false,
          why: '仍要生成；变的是检索策略。',
        },
        {
          t: '禁止关键词，只能纯向量',
          ok: false,
          why: 'Agentic 不排斥混合检索。',
        },
      ],
      relatedNodes: ['ai-agentic-rag', 'ai-rag', 'ai-agent-birth'],
    },
    {
      id: 'concept-ai-rag:q21',
      q: '上下文工程首先关心什么？是否等于「凡 AI 必上向量库」？',
      choices: [
        {
          t: '在窗口预算内安排模型看见的内容与顺序；小而稳语料可直塞/读文件，不必教条上向量库',
          ok: true,
          why: '先问需要看见什么；向量库是大而变/要引用时的手段之一。',
        },
        {
          t: '模型参数量越大越好，窗口拼装无关',
          ok: false,
          why: '参数量≠本次请求塞进窗的内容。',
        },
        {
          t: '必须取消全部工具调用',
          ok: false,
          why: '工具结果也是上下文的一部分。',
        },
        {
          t: '上下文工程就是把 Top-K 调到最大',
          ok: false,
          why: 'K 只是检索杠杆之一，不是窗内拼装的全部。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-token-context', 'ai-rag'],
    },
    {
      id: 'concept-ai-rag:q22',
      q: '哪些场景仍强依赖检索层，而不是「全量长上下文直塞」？',
      choices: [
        {
          t: '超大常变语料、权限/审计引用、高并发成本账、多租户先过滤再生成',
          ok: true,
          why: '检索是控制面与成本面，不只是省 token。',
        },
        {
          t: '只有打印 Hello World 时必须上向量库',
          ok: false,
          why: '简单任务通常不必检索。',
        },
        {
          t: '只要窗口够大，权限隔离可交给模型自觉',
          ok: false,
          why: '权限必须在检索过滤，不能靠自觉。',
        },
        {
          t: '长上下文出现后，RAG 已完全过时无用',
          ok: false,
          why: '路由课：大而变/要引用时 RAG 仍强。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-vector-store'],
    },
  ],
});

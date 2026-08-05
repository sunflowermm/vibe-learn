import { defineQuizSet } from '../schema.js';

/**
 * 第五章 · RAG 知识工程全链。命题：mcq-expert（一题一事）。
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
      q: '相对关键词/BM25，向量检索最典型的强项是什么？',
      choices: [
        {
          t: '同义改写与语义相近表达仍能召回',
          ok: true,
          why: 'embedding 抓语义近邻，不怕换说法。',
        },
        {
          t: '精确匹配错误码、合同条款号等字面强信号',
          ok: false,
          why: '那是 BM25/关键词的强项。',
        },
        {
          t: '保证生成答案事实正确',
          ok: false,
          why: '检索只取近邻片段；忠实度是生成侧问题。',
        },
        {
          t: '建库与查询可随意换不同嵌入模型',
          ok: false,
          why: '必须同一嵌入模型。',
        },
      ],
      relatedNodes: ['ai-embedding', 'ai-hybrid-search'],
    },
    {
      id: 'concept-ai-rag:q2b',
      q: '相对向量检索，BM25/关键词检索更稳的场景是？',
      choices: [
        {
          t: '专名、编号、错误码等字面必须命中的查询',
          ok: true,
          why: '字面强信号上稀疏检索通常更稳。',
        },
        {
          t: '用户用完全不同同义词复述同一问题',
          ok: false,
          why: '同义改写更偏向量侧。',
        },
        {
          t: '替代生成模型直接写最终答案',
          ok: false,
          why: '检索不替代生成。',
        },
        {
          t: '自动对齐两个厂商的嵌入空间',
          ok: false,
          why: 'BM25 不做嵌入对齐。',
        },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-embedding'],
    },
    {
      id: 'concept-ai-rag:q3',
      q: '经典检索增强生成（RAG）的三步流水线是？',
      choices: [
        {
          t: '检索 → 把证据增强进提示 → 大模型生成',
          ok: true,
          why: '先找材料，再塞窗，再生成。',
        },
        {
          t: '微调 → 部署上线 → 删掉语料库',
          ok: false,
          why: '那是改权重/上线路径，不是检索增强三步。',
        },
        {
          t: '从零训练基座 → 再部署 → 最后才谈提示',
          ok: false,
          why: '经典 RAG 通常复用现有 LLM，先检索再生成。',
        },
        {
          t: '只生成不检索，全程依赖预训练记忆作答',
          ok: false,
          why: '没有外挂证据就不是检索增强生成。',
        },
      ],
      relatedNodes: ['ai-rag'],
    },
    {
      id: 'concept-ai-rag:q3b',
      q: '经典 RAG 是否必须先搭好多步 Agent 循环才能跑？',
      choices: [
        {
          t: '不必；经典可为固定管道：检索→增强→生成',
          ok: true,
          why: 'Agentic RAG 是可选形态；知识段先讲无工具环流水线。',
        },
        {
          t: '必须先部署 MCP，否则无法检索',
          ok: false,
          why: 'MCP 是工具插接；RAG 检索不依赖 MCP。',
        },
        {
          t: '必须先微调基座，否则片段进不了提示',
          ok: false,
          why: '片段在推理期拼进消息即可。',
        },
        {
          t: 'RAG 与 Agent 完全同义',
          ok: false,
          why: '可组合但非同义。',
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
          why: '更新文档比重训权重便宜，且便于引用。',
        },
        {
          t: '彻底消灭幻觉，使模型在任何问题上都永不胡说',
          ok: false,
          why: 'RAG 降风险、可追溯，但不保证零幻觉。',
        },
        {
          t: '替代全部工具调用、写文件与外部 API 行动能力',
          ok: false,
          why: 'RAG 解决「看见什么材料」；行动仍靠工具。',
        },
        {
          t: '把模型上下文窗口一次性扩到无限、不再需要预算',
          ok: false,
          why: '检索块仍占窗口；RAG 不取消上下文预算。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-adaptation'],
    },
    {
      id: 'concept-ai-rag:q5',
      q: '固定长度硬切分块，最常见的风险是什么？',
      choices: [
        {
          t: '切断句子、表格或条款号，破坏可引用结构',
          ok: true,
          why: '硬切省事但易断章；法规/表格常要结构感知。',
        },
        {
          t: '自动把嵌入向量维度翻倍，从而提升召回',
          ok: false,
          why: '维度由嵌入模型决定，与硬切长度无直接关系。',
        },
        {
          t: '完全消除评测需求，切块策略不必再回归',
          ok: false,
          why: '切法仍要用黄金集验证召回与可引用性。',
        },
        {
          t: '保证拼进提示后永不超出上下文窗口预算',
          ok: false,
          why: '块再拼进窗仍可能超预算；硬切不保证窗宽。',
        },
      ],
      relatedNodes: ['ai-chunking'],
    },
    {
      id: 'concept-ai-rag:q5b',
      q: '分块时加重叠窗，主要换来什么、付出什么？',
      choices: [
        {
          t: '减轻边界切断；但抬高存储与检索成本',
          ok: true,
          why: '重叠是边界保险，不是免费午餐。',
        },
        {
          t: '自动对齐不同嵌入模型',
          ok: false,
          why: '重叠不管空间对齐。',
        },
        {
          t: '使 BM25 永久失效',
          ok: false,
          why: '与稀疏检索无关。',
        },
        {
          t: '替代重排序',
          ok: false,
          why: '重叠在切分侧；重排在候选精选侧。',
        },
      ],
      relatedNodes: ['ai-chunking'],
    },
    {
      id: 'concept-ai-rag:q6',
      q: '分块过碎，检索后生成最常见的后果是？',
      choices: [
        {
          t: '缺语境，易断章取义或拼不出完整证据',
          ok: true,
          why: '粒度要服务可读证据，不是越细越好。',
        },
        {
          t: '嵌入维度自动变大',
          ok: false,
          why: '维度不随块大小变。',
        },
        {
          t: '向量库会自动合并碎块',
          ok: false,
          why: '索引按你写入的块检索。',
        },
        {
          t: '只影响 UI 字体',
          ok: false,
          why: '进窗材料质量直接决定生成。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag'],
    },
    {
      id: 'concept-ai-rag:q6b',
      q: '分块过大，最常见的后果是？',
      choices: [
        {
          t: '噪声多、易超窗、嵌入语义被稀释',
          ok: true,
          why: '大块难精排，也浪费窗口。',
        },
        {
          t: '永远召不回任何文档',
          ok: false,
          why: '过大仍可能召回，只是质量差。',
        },
        {
          t: '自动完成多租户 ACL',
          ok: false,
          why: '权限过滤要另做。',
        },
        {
          t: '消灭幻觉',
          ok: false,
          why: '噪声进窗更易「有据胡说」。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-token-context'],
    },
    {
      id: 'concept-ai-rag:q7',
      q: '政策条文类文档分块，更稳妥的倾向是？',
      choices: [
        {
          t: '结构感知：按条款/章节切，保留可引用的条款号',
          ok: true,
          why: '先保结构与标识，再谈长度。',
        },
        {
          t: '一律按 200 字硬切，忽略条款边界',
          ok: false,
          why: '硬切常切断条款号。',
        },
        {
          t: '按自然语言段落语义切代码一样切法规',
          ok: false,
          why: '法规结构优先于散文语义切。',
        },
        {
          t: '整本法规塞进一条向量即可',
          ok: false,
          why: '过大块噪声与稀释严重。',
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
          why: '小而稳语料硬上向量库得不偿失。',
        },
        {
          t: '必须；没有向量库就谈不上任何形式的检索增强或外挂证据',
          ok: false,
          why: '工作区直读/塞窗也是外挂证据，不必先入库。',
        },
        {
          t: '必须先微调基座模型，否则运行时根本读不了工作区里的文件',
          ok: false,
          why: '读文件是工具/运行时能力，与是否微调无关。',
        },
        {
          t: '小语料也应把 Top-K 开到最大，并顺手关闭租户权限与 ACL 过滤',
          ok: false,
          why: '噪声与安全问题不会因语料小而消失。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag-shift', 'ai-agentic-rag'],
    },
    {
      id: 'concept-ai-rag:q9',
      q: '专名漏召、同义又飘时，同一查询实务上怎么做？',
      choices: [
        {
          t: '并行稀疏（如 BM25）与稠密（向量）通道，再融合候选',
          ok: true,
          why: '专名与同义互补；常见再接 RRF 与重排。',
        },
        {
          t: '先微调两个基座，再任选一个通道',
          ok: false,
          why: '混合是召回层策略，不要求先微调。',
        },
        {
          t: '只用向量，把 BM25 分数写进提示当装饰',
          ok: false,
          why: 'BM25 应参与召回候选。',
        },
        {
          t: '禁止融合，两路结果必须分两次回答用户',
          ok: false,
          why: '融合是为了一次给出更全候选再精排。',
        },
      ],
      relatedNodes: ['ai-hybrid-search'],
    },
    {
      id: 'concept-ai-rag:q10',
      q: '倒数排名融合（RRF）相对「强行加原始分数」的实务优点？',
      choices: [
        {
          t: '按各通道排名倒数相加，少做跨量纲校准',
          ok: true,
          why: 'BM25 与向量分数量纲不同；用名次融合更稳。',
        },
        {
          t: 'RRF 会自动加密租户数据',
          ok: false,
          why: 'RRF 是融合算法，不是安全机制。',
        },
        {
          t: 'RRF 等于交叉编码器重排',
          ok: false,
          why: '融合在召回侧；交叉编码器是精排。',
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
          why: '错误码是字面强信号；纯语义易漂。',
        },
        {
          t: '只靠语义向量，并删掉报错码以免干扰嵌入',
          ok: false,
          why: '删掉最强字面信号只会更难命中。',
        },
        {
          t: '立刻全量微调基座写入该错误码',
          ok: false,
          why: '先修召回层。',
        },
        {
          t: '关闭所有检索，只靠预训练记忆',
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
          t: '把嵌入向量维度降下来，专门用来节省向量库存储',
          ok: false,
          why: '重排做相关性筛选，不改嵌入维度。',
        },
        {
          t: '替换生成用的大语言模型，让精排模型直接写最终答案',
          ok: false,
          why: '重排在检索侧；生成仍由生成模型完成。',
        },
        {
          t: '把 BM25 与向量原始分强制加总，当作唯一的融合算法',
          ok: false,
          why: '那是融合/校准议题，不是重排的主要目标。',
        },
      ],
      relatedNodes: ['ai-rerank', 'ai-hybrid-search'],
    },
    {
      id: 'concept-ai-rag:q13',
      q: '宽召回 K 很大、候选噪声多时，工程上几乎必须做什么？',
      choices: [
        {
          t: '加重排，压到可进窗的 Top-N',
          ok: true,
          why: '噪声进窗会「有据胡说」。',
        },
        {
          t: '关闭检索，只靠更大窗口',
          ok: false,
          why: '窗口不是免费的，也解决不了权限与规模。',
        },
        {
          t: '先全参微调再谈检索',
          ok: false,
          why: '先修检索层杠杆。',
        },
        {
          t: '把 K 再开大一倍代替重排',
          ok: false,
          why: '更大 K 更噪。',
        },
      ],
      relatedNodes: ['ai-rerank', 'ai-rag-eval'],
    },
    {
      id: 'concept-ai-rag:q13b',
      q: '候选已经很少且字面强命中时，重排策略上可以？',
      choices: [
        {
          t: '先跳过重排，用评测决定是否值得加',
          ok: true,
          why: '重排有延迟/成本；小候选可先验证必要性。',
        },
        {
          t: '永远必须上交叉编码器，否则非法',
          ok: false,
          why: '教条全开浪费成本。',
        },
        {
          t: '只有微调之后才能重排',
          ok: false,
          why: '重排是推理期步骤。',
        },
        {
          t: '跳过重排后必须关闭全部评测',
          ok: false,
          why: '更要用评测度决策。',
        },
      ],
      relatedNodes: ['ai-rerank', 'ai-rag-eval'],
    },
    {
      id: 'concept-ai-rag:q14',
      q: '交叉编码器精排相对双塔/向量近邻，直觉差异是？',
      choices: [
        {
          t: '问句+片段成对打分更准但更贵；适合短候选，不适合对全库暴力扫',
          ok: true,
          why: '宽召回求全，交叉编码在小候选上求准。',
        },
        {
          t: '交叉编码器专门用来降低嵌入维度、压缩向量库体积',
          ok: false,
          why: '它做问句+片段成对打分，不是降维压缩。',
        },
        {
          t: '交叉编码器可以直接替代生成模型，写出最终用户答案',
          ok: false,
          why: '精排输出排序/分数，最终回答仍靠生成模型。',
        },
        {
          t: '一旦上了交叉编码器，就不能再做租户 ACL 或 metadata 过滤',
          ok: false,
          why: '权限过滤与精排可组合，并不互斥。',
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
          t: '保证 100% 精确最近邻，同时把索引内存占用压到接近于零',
          ok: false,
          why: 'ANN/HNSW 正是用少许召回损失换速度，且常吃内存。',
        },
        {
          t: '自动完成不同厂商嵌入模型之间的向量空间对齐与互通',
          ok: false,
          why: '索引结构不解决嵌入空间不对齐；换模型通常要重嵌。',
        },
        {
          t: '替代关系库承担事务一致性、复杂报表查询与强约束写入',
          ok: false,
          why: '向量索引擅长相似检索，不是事务/报表引擎。',
        },
      ],
      relatedNodes: ['ai-vector-store'],
    },
    {
      id: 'concept-ai-rag:q16',
      q: '已有 Postgres 时，向量检索的常见落地直觉？',
      choices: [
        {
          t: '可用 pgvector「一库两用」：结构化字段 + 向量；大规模再考虑专用向量服务',
          ok: true,
          why: '不必一上来上独立向量集群。',
        },
        {
          t: 'Postgres 绝对不能存向量，必须立刻拆出独立的专用向量集群',
          ok: false,
          why: 'pgvector 正是常见「一库两用」路径。',
        },
        {
          t: '有了 pgvector 扩展之后，多租户 ACL 与可见性过滤可以完全省略',
          ok: false,
          why: '可见性仍要在检索层显式过滤，扩展不替代 ACL。',
        },
        {
          t: '换嵌入模型时只需改一下服务端口号，旧向量空间可直接继续用',
          ok: false,
          why: '空间变了通常要重嵌并重建索引，不是改端口。',
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
          why: '安全边界在检索/存储。',
        },
        {
          t: '因为向量没有维度，检索层天然无法区分不同租户的文档',
          ok: false,
          why: '问题在权限控制面，不是「向量没有维度」。',
        },
        {
          t: '因为 HTTP 不支持 JSON，租户字段根本传不到检索服务',
          ok: false,
          why: '与传输格式无关；关键是检索层 ACL/metadata。',
        },
        {
          t: '因为向量库无法存文档 id，所以没法按租户过滤可见范围',
          ok: false,
          why: 'payload/metadata 正是存租户字段并过滤的地方。',
        },
      ],
      relatedNodes: ['ai-vector-store', 'ai-prompt-security'],
    },
    {
      id: 'concept-ai-rag:q18',
      q: 'RAG 评测最小闭环里，缺哪一步最危险？',
      choices: [
        {
          t: '没有黄金集（固定问题+可接受证据）就改分块/重排',
          ok: true,
          why: '无法回归；凭感觉等于演示过拟合。',
        },
        {
          t: '题干或文档用了中文，导致无法建立任何评测闭环',
          ok: false,
          why: '语言不是闭环问题；缺的是可回归的黄金集。',
        },
        {
          t: '接口使用了 HTTPS，传输层安全破坏了检索质量评测',
          ok: false,
          why: '传输安全 ≠ 检索/忠实度质量闭环。',
        },
        {
          t: '端到端延迟没有降到 0，所以改分块/重排没有意义',
          ok: false,
          why: '先要能证伪检索与忠实度；延迟是另一维指标。',
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
          why: '召回好只说明材料进了候选；生成仍可能无视证据。',
        },
        {
          t: '嵌入维度是否为质数',
          ok: false,
          why: '与忠实度无关。',
        },
        {
          t: 'DNS TTL',
          ok: false,
          why: '无关。',
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
      q: 'Agentic RAG 相对经典「一检索一生成」，核心差别是？',
      choices: [
        {
          t: '由智能体动态决定是否/如何多次检索、改写查询与校验证据',
          ok: true,
          why: '检索被工具化；可多跳，成本与可观测性也更高。',
        },
        {
          t: '必须先换更大参数量基座，否则无法做第二次检索',
          ok: false,
          why: '差别在控制环与工具化检索，不在参数量。',
        },
        {
          t: '取消生成步骤，只返回检索列表、不再对用户作答',
          ok: false,
          why: 'Agentic RAG 仍要生成；差别是检索可多跳。',
        },
        {
          t: '禁止关键词通道，整条链路只能走纯向量近邻',
          ok: false,
          why: '不排斥混合检索；核心是动态决定检索策略。',
        },
      ],
      relatedNodes: ['ai-agentic-rag', 'ai-rag', 'ai-agent-birth'],
    },
    {
      id: 'concept-ai-rag:q21',
      q: '上下文工程首先关心什么？',
      choices: [
        {
          t: '在窗口预算内安排模型看见的内容与顺序',
          ok: true,
          why: '先问需要看见什么；拼装策略服务于任务。',
        },
        {
          t: '模型参数量是否足够大',
          ok: false,
          why: '参数量≠本次请求塞进窗的内容。',
        },
        {
          t: '必须取消全部工具调用',
          ok: false,
          why: '工具结果也是上下文的一部分。',
        },
        {
          t: '把 Top-K 调到最大即可',
          ok: false,
          why: 'K 只是杠杆之一。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-token-context'],
    },
    {
      id: 'concept-ai-rag:q21b',
      q: '上下文工程是否等于「凡 AI 必上向量库」？',
      choices: [
        {
          t: '否；小而稳语料可直塞/读文件，向量库是大而变/要引用时的手段之一',
          ok: true,
          why: '手段服务于「看见什么」，不是教条。',
        },
        {
          t: '是；没有向量库就不算真正的 LLM 应用，对话 API 也不合格',
          ok: false,
          why: '对话 API 本身即可产品化；向量库不是准入门槛。',
        },
        {
          t: '是；长上下文窗口出现后，向量库已被判为非法手段',
          ok: false,
          why: '长上下文与 RAG 可并存；不是「有长窗就非法」。',
        },
        {
          t: '否，仅仅因为向量库只能存图片、不能存文本块嵌入',
          ok: false,
          why: '向量库常存文本块嵌入；否的理由也不该是「只能存图」。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-rag'],
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
          why: '权限必须在检索过滤。',
        },
        {
          t: '长上下文出现后，RAG 已完全过时',
          ok: false,
          why: '大而变/要引用时 RAG 仍强。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-vector-store'],
    },
  ],
});

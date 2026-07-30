import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：landedjobs/rag-engineer-interview-questions · evaluation
 * https://github.com/landedjobs/rag-engineer-interview-questions
 */
export default defineQuizSet({
  id: "interview-adapted-landed-evaluation",
  title: "开源改编 · RAG 评测",
  kind: "interview",
  domain: "ai",
  tags: ["RAG","评测","AI全栈","系统非原创","adapted","中文"],
  relatedNodes: ["craft-observability","ai-rag-eval","craft-security"],
  caption: "系统非原创 · AI 全栈向 · 中文 · landedjobs/rag-engineer-interview-questions · evaluation",
  origin: 'adapted',
  attribution: "landedjobs/rag-engineer-interview-questions · evaluation",
  attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
  questions: [
    {
      id: "adapted:landed-evaluation:q1",
      q: "答案很流畅，但常陈述检索上下文里没有的事实。哪项指标最直接标记这个问题？",
      choices: [
        { t: "Faithfulness / groundedness（忠实度 /  groundedness）", ok: true, why: "检查每个 claim 是否被检索上下文蕴含 — 数字/多跳场景会退化，宜配合置信度感知检查。" },
        { t: "Answer relevancy（答案相关性）", ok: false, why: "衡量是否答所问，不衡量 claim 是否有依据。" },
        { t: "Context recall（上下文召回）", ok: false, why: "衡量是否取到所需上下文，不衡量答案是否 stick to 它。" },
        { t: "Latency p99", ok: false, why: "延迟指标与幻觉/无依据陈述无直接关系。" },
      ],
      relatedNodes: ["craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · evaluation",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-evaluation:q2",
      q: "用大模型对手挑片段生成问答建金标集。离线召回率 0.91，线上仅 0.40。问题出在哪？",
      choices: [
        { t: "标准答案上下文来自手挑片段，而非生产检索器；离线评的是线上系统从未实际用到的语料", ok: true, why: "问题可由大模型生成，但标准上下文应从真实生产检索链路采集。" },
        { t: "生产检索器太差，该换更大嵌入模型", ok: false, why: "差距是测量失真 — 你评的是线上系统根本召不回来的上下文。" },
        { t: "评测框架把忠实度算错了", ok: false, why: "这是召回标注来源问题，不是指标实现 bug。" },
        { t: "金标集太小，扩大到 1 万条就好", ok: false, why: "规模不能修复标准上下文与生产检索路径脱节；方法论错了加量仍虚高。" },
      ],
      relatedNodes: ["ai-rag-eval"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · evaluation",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-evaluation:q3",
      q: "同事用大模型当自动裁判，分数直接当上线门禁，未与人工对比。资深异议是？",
      choices: [
        { t: "未校验的裁判可能系统性偏差 — 先测与人工标注的一致性（科恩 κ），校准后再作门禁", ok: true, why: "裁判本身也是模型输出，需单独评估；裸一致率会虚高，应报 κ 并迭代裁判提示词。" },
        { t: "该模型太便宜，不可靠", ok: false, why: "成本不是重点；未校准的偏差（位置、冗长、自偏好）才是。" },
        { t: "裁判应永远用 1–10 质量分才够细", ok: false, why: "反了 — 窄二元判断题比模糊十分制更可靠。" },
        { t: "只要离线分数高于基线就能上线", ok: false, why: "未与人工对齐的裁判分数可能系统性偏，不能单独作上线门闩。" },
      ],
      relatedNodes: ["craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · evaluation",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-evaluation:q4",
      q: "更换嵌入服务商后离线评测分数上升。最安全的上线方式是？",
      choices: [
        { t: "对真实生产流量做影子/金丝雀发布，盯各阶段命中@k 与长尾查询，再全量", ok: true, why: "换嵌入是静默漂移典型；只有生产分布 + 分阶段链路追踪能暴露长尾召回损失。" },
        { t: "直接全量 — 离线涨了", ok: false, why: "离线集 oversample 简单问法，可能被新厂商调参 flattering；长尾仍可能塌。" },
        { t: "信厂商公开 benchmark", ok: false, why: "厂商 benchmark 很少匹配你的语料与查询分布。" },
        { t: "只在小流量对照实验看用户点赞率", ok: false, why: "点赞对召回退化不敏感；需检索阶段级命中@k 与固定探针集。" },
      ],
      relatedNodes: ["ai-rag-eval","craft-security","craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · evaluation",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-evaluation:q5",
      q: "护栏能可靠拦用户 prompt 里的 jailbreak，但把文档注入其上下文会在可观比例翻转判断 — 而检索 chunk 正是这类文档。教训是？",
      choices: [
        { t: "RAG 有两路输入 — 用户 prompt 与检索上下文；必须校验检索内容与工具调用白名单，不能只守用户侧", ok: true, why: "间接 prompt injection 从文档进来；只守用户侧是 negligent。" },
        { t: "护栏阈值再调高就行", ok: false, why: "阈值不解决架构缺口：检索上下文通道根本没检。" },
        { t: "敏感查询关掉检索", ok: false, why: "等于阉割产品；修第二输入通道才是正解。" },
        { t: "换更强 base model，注入就不生效了", ok: false, why: "注入利用的是上下文通道，与 base 参数量无必然关系。" },
      ],
      relatedNodes: ["ai-chunking","ai-prompt-security","ai-rag"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · evaluation",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
  ],
});

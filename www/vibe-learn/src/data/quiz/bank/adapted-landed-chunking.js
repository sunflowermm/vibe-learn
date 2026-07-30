/**
 * 改编题库 · interview-adapted-landed-chunking
 * 系统非原创 · AI 全栈向 · 中文 · landedjobs/rag-engineer-interview-questions · chunking
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    "id": "adapted:landed-chunking:q1",
    "q": "召回片段写「营收较上季增长 3%」，模型却分不清哪家公司、哪一季；搜「ACME Q2 2023 营收」也常排不进正确 chunk。最强修复是？",
    "choices": [
      {
        "t": "上下文检索：索引前用 LLM 为每个 chunk  prepend 语境说明（嵌入 + BM25 同步更新）",
        "ok": true,
        "why": "让每个 chunk 在文档中「有坐标」，标识符脱离原文仍存活；Anthropic 报告失败降约 35–49%，加重排可再降约 67%。"
      },
      {
        "t": "把 chunk 开得很大，多带 surrounding 文本",
        "ok": false,
        "why": "略有帮助但稀释嵌入、膨胀索引 — 仍不可靠地注入缺失标识符。"
      },
      {
        "t": "换更大的生成模型",
        "ok": false,
        "why": "标识符从未被检索到 — 生成器无法恢复上下文里没有的信息。"
      },
      {
        "t": "只在用户提问里要求模型「自行推断公司名」",
        "ok": false,
        "why": "推断可能幻觉；根因是 chunk 孤立导致检索匹配不到含标识符的语境。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "RAG",
      "分块",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "ai-hybrid-search",
      "ai-rerank"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "landedjobs/rag-engineer-interview-questions · chunking",
    "attributionUrl": "https://github.com/landedjobs/rag-engineer-interview-questions",
    "setId": "interview-adapted-landed-chunking"
  },
  {
    "id": "adapted:landed-chunking:q2",
    "q": "RAG 前 20 召回率正常，但答案含糊、缺细节；前 5 精确率只有 0.55。最先该做什么？",
    "choices": [
      {
        "t": "把分块缩到约 256 词元，并加重排器收紧最终进提示的前五条",
        "ok": true,
        "why": "前 5 精确率是瓶颈：更小分块 + 交叉编码器重排，能精确收紧进提示的内容，又不必然丢召回。"
      },
      {
        "t": "增大分块，让每个片段带更多上下文",
        "ok": false,
        "why": "更大分块通常降精确率 — 每条向量噪声更多 — 与需求相反。"
      },
      {
        "t": "换更大嵌入模型",
        "ok": false,
        "why": "很少是主杠杆；先量分块尺寸与重排效果。"
      },
      {
        "t": "把候选数从 5 提到 20，让模型多看几个片段",
        "ok": false,
        "why": "精确率低说明前五条已噪声多；再加候选会放大「中间丢失」效应与幻觉面。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "RAG",
      "分块",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "ai-rerank",
      "ai-rag"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "landedjobs/rag-engineer-interview-questions · chunking",
    "attributionUrl": "https://github.com/landedjobs/rag-engineer-interview-questions",
    "setId": "interview-adapted-landed-chunking"
  },
  {
    "id": "adapted:landed-chunking:q3",
    "q": "要在 1 TB 线上索引改 chunk 尺寸与 contextualization 提示词。安全 rollout 方式是？",
    "choices": [
      {
        "t": "用新分块器建第二套索引，在 held-out 标注集验证后原子切流量",
        "ok": true,
        "why": "双索引避免混代向量；新索引验证通过再切换，可 instant rollback。"
      },
      {
        "t": "低峰期原地逐文档 re-chunk + re-embed",
        "ok": false,
        "why": "原地重嵌会混新旧表示；recall 静默剪切而大盘仍绿。"
      },
      {
        "t": "两套分块器的向量放进同一索引，让 RRF 自己排",
        "ok": false,
        "why": "跨代向量不可比；融合只是掩盖剪切分布，不修复。"
      },
      {
        "t": "先改 10% 文档做 A/B，旧索引与新索引并行 serving 同一查询",
        "ok": false,
        "why": "同一索引内混代向量仍不可比；应完整双索引后再切流量，不是同索引部分更新。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "RAG",
      "分块",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "craft-security"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "landedjobs/rag-engineer-interview-questions · chunking",
    "attributionUrl": "https://github.com/landedjobs/rag-engineer-interview-questions",
    "setId": "interview-adapted-landed-chunking"
  },
  {
    "id": "adapted:landed-chunking:q4",
    "q": "索引代码库时，问「parseConfig 在哪定义？」常漏召或只返回碎片。当前是固定 512 token 切分。最佳修复？",
    "choices": [
      {
        "t": "按语言边界切（AST 识别函数/类），元数据附带文件路径 +  enclosing 符号名",
        "ok": true,
        "why": "代码语义单元是函数/类；AST 切分保持定义完整，元数据让「在哪定义」可答 — Cursor 类做法。"
      },
      {
        "t": "chunk 提到 2048 token，多装代码",
        "ok": false,
        "why": "更大 chunk 稀释嵌入且仍在任意点切断；问题是边界不对，不是尺寸。"
      },
      {
        "t": "加 overlap，让碎片跨 chunk 重复",
        "ok": false,
        "why": "overlap 修补跨句，救不了函数体与签名/imports 被拆开。"
      },
      {
        "t": "改用 Markdown 标题层级切分 README",
        "ok": false,
        "why": "代码库主体是源码不是 Markdown；标题切分对函数定义无效。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "RAG",
      "分块",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "landedjobs/rag-engineer-interview-questions · chunking",
    "attributionUrl": "https://github.com/landedjobs/rag-engineer-interview-questions",
    "setId": "interview-adapted-landed-chunking"
  },
  {
    "id": "adapted:landed-chunking:q5",
    "q": "语料多为扫描 PDF 含表格。recall 差且数字事实经常乱。应先查哪一环？",
    "choices": [
      {
        "t": "解析阶段 — 用 layout/OCR 感知抽取，表格保留为 Markdown/HTML 再分块",
        "ok": true,
        "why": "解析已毁的结构，任何分块器都救不回；解析是 stage zero。"
      },
      {
        "t": "换语义分块器",
        "ok": false,
        "why": "语义分块无法恢复解析已破坏的结构；阶段错了。"
      },
      {
        "t": "提高 k 并加重排",
        "ok": false,
        "why": "更多候选救不了列交错噪声 chunk；文本在索引前已 corrupted。"
      },
      {
        "t": "换支持表格的嵌入模型",
        "ok": false,
        "why": "garbled 文本进索引后，换 encoder 不能还原正确单元格语义。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "RAG",
      "分块",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-chunking",
      "ai-rerank"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "landedjobs/rag-engineer-interview-questions · chunking",
    "attributionUrl": "https://github.com/landedjobs/rag-engineer-interview-questions",
    "setId": "interview-adapted-landed-chunking"
  }
];

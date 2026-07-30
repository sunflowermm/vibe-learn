/**
 * 静态题库 · dsa
 * 人工可审；零基础概念题，对齐知识图谱课节点。
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:dsa-hash:core",
    q: "学习知识图谱里的「哈希表」时，零基础同学应先抓住下面哪一点？",
    choices: [
      { t: "计数、两数之和、LRU 组件。", ok: true, why: "对。学「哈希表」时，零基础应先建立这一核心认知，再去看细节与例子。" },
      { t: "环境变量地基；落盘与 PATH；代理变量指向番外。", ok: false, why: "这是其他课「安装器与 PATH」的要点，不是本课。" },
      { t: "别把脚打穿的底线。", ok: false, why: "这是其他课「安全常识」的要点，不是本课。" },
      { t: "现代化开源面板；Docker 路径更顺。", ok: false, why: "这是其他课「1Panel」的要点，不是本课。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["零基础概念","番外·DSA"],
    relatedNodes: ["dsa-hash"],
    source: 'static',
  },
  {
    id: "s:dsa-hot:core",
    q: "学习知识图谱里的「大厂高频题型」时，零基础同学应先抓住下面哪一点？",
    choices: [
      { t: "把结构课串成一面常见组合。", ok: true, why: "对。学「大厂高频题型」时，零基础应先建立这一核心认知，再去看细节与例子。" },
      { t: "别把脚打穿的底线。", ok: false, why: "这是其他课「安全常识」的要点，不是本课。" },
      { t: "环境变量地基；落盘与 PATH；代理变量指向番外。", ok: false, why: "这是其他课「安装器与 PATH」的要点，不是本课。" },
      { t: "现代化开源面板；Docker 路径更顺。", ok: false, why: "这是其他课「1Panel」的要点，不是本课。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["零基础概念","番外·DSA"],
    relatedNodes: ["dsa-hot"],
    source: 'static',
  },
  {
    id: "s:dsa-tree:core",
    q: "学习知识图谱里的「树与堆」时，零基础同学应先抓住下面哪一点？",
    choices: [
      { t: "二叉树高频；堆作优先队列。", ok: true, why: "对。学「树与堆」时，零基础应先建立这一核心认知，再去看细节与例子。" },
      { t: "现代化开源面板；Docker 路径更顺。", ok: false, why: "这是其他课「1Panel」的要点，不是本课。" },
      { t: "别把脚打穿的底线。", ok: false, why: "这是其他课「安全常识」的要点，不是本课。" },
      { t: "环境变量地基；落盘与 PATH；代理变量指向番外。", ok: false, why: "这是其他课「安装器与 PATH」的要点，不是本课。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["零基础概念","番外·DSA"],
    relatedNodes: ["dsa-tree"],
    source: 'static',
  }
];

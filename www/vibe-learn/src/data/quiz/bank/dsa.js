/**
 * 静态题库 · dsa
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:dsa:openers:core",
    q: "复杂度怎么开口？两数之和近线性？括号匹配？依赖有环？有序才能二分？",
    choices: [
      { t: "先讲 n 下时间/空间阶；哈希存值；栈匹配；图+拓扑/检环；二分前提是有序（或可比较序）", ok: true, why: "高频开口模板合并，对应结构课一张「急救卡」。" },
      { t: "用代码行数当复杂度；再套循环到 O(n³)；只数左右括号个数；字典序当拓扑；乱序硬二分", ok: false, why: "全是经典错法。" },
      { t: "有哈希就不必考虑有序场景；树一定强于图", ok: false, why: "题型决定结构。" },
      { t: "DP 可替代所有图与栈问题", ok: false, why: "先认题型再选武器。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["场景","课核"],
    relatedNodes: ["dsa-complexity","dsa-linear","dsa-hash","dsa-tree","dsa-graph","dsa-sort","dsa-dp","dsa-hot"],
    source: 'static',
  }
];

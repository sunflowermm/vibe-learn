/**
 * 静态题库 · dsa
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:dsa:complexity-talk:core",
    q: "面试被问「复杂度」时，更靠谱的开口方式是？",
    choices: [
      { t: "说明输入规模 n 下时间/空间的阶（如 O(n)、O(1)）", ok: true, why: "复杂度讲的是随 n 增长的阶，不是代码行数。" },
      { t: "用源代码行数当作复杂度", ok: false, why: "行数≠渐近复杂度。" },
      { t: "再套一层循环就宣称一定是 O(1)", ok: false, why: "增加嵌套通常会升高阶。" },
      { t: "只回答「很快」即可", ok: false, why: "缺少可比较的阶。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["场景","课核"],
    relatedNodes: ["dsa-complexity","dsa-hot"],
    source: 'static',
  },
  {
    id: "s:dsa:stack-brackets:core",
    q: "校验括号序列是否合法匹配，最经典的结构是？",
    choices: [
      { t: "栈：遇开括号入栈，遇闭括号与栈顶匹配", ok: true, why: "匹配问题天然是后进先出。" },
      { t: "只统计左右括号总数是否相等", ok: false, why: "顺序错误时总数仍可能相等。" },
      { t: "字典序排序后比较", ok: false, why: "丢失位置信息。" },
      { t: "最短路径算法", ok: false, why: "题型不匹配。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["场景","课核"],
    relatedNodes: ["dsa-linear","dsa-hot"],
    source: 'static',
  },
  {
    id: "s:dsa:topo-cycle:core",
    q: "任务依赖「有环则无法排程」，应用哪类图算法思路？",
    choices: [
      { t: "拓扑排序 / 环检测", ok: true, why: "有向依赖图的排程与环检测是经典题型。" },
      { t: "在无序数组上二分", ok: false, why: "前提与题型都不对。" },
      { t: "只比较字符串字典序", ok: false, why: "字典序≠拓扑序。" },
      { t: "用动态规划替代一切图问题", ok: false, why: "先认题型再选武器。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["场景","课核"],
    relatedNodes: ["dsa-graph","dsa-tree","dsa-hot"],
    source: 'static',
  },
  {
    id: "s:dsa:two-sum-hash:core",
    q: "两数之和要在近线性时间内找到互补对，常用什么结构？",
    choices: [
      { t: "哈希表存已见过的值", ok: true, why: "用空间换时间，避免双重循环到 O(n²)。" },
      { t: "无序数组上硬二分查找", ok: false, why: "二分前提是有序。" },
      { t: "只数括号个数的栈算法", ok: false, why: "题型不匹配。" },
      { t: "Dijkstra 最短路", ok: false, why: "不是两数之和的常规解。" },
    ],
    kind: "concept",
    domain: "dsa",
    tags: ["场景","课核"],
    relatedNodes: ["dsa-hash","dsa-linear","dsa-hot"],
    source: 'static',
  }
];

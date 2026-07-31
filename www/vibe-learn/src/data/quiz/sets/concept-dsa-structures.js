import { defineQuizSet } from '../schema.js';

/** 选型/题型层：名词细节见 concept-dsa-*-kw；落地场景见 dsa-scenarios */
export default defineQuizSet({
  id: 'concept-dsa-structures',
  title: '概念 · DSA 题型选型',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '选型', '题型'],
  relatedNodes: ['dsa-graph', 'dsa-dp', 'dsa-hash'],
  caption: '何时上图/DP/哈希/排序——与全表名词题分工，不重复背结构定义。',
  questions: [
    {
      id: 'concept-dsa-structures:pick_graph',
      q: '依赖、网格连通、无权最短层数——开口应先往哪类模型靠？',
      choices: [
        {
          t: '图：建邻接关系后选 BFS/DFS/拓扑等模板',
          ok: true,
          why: '先识别「点+边」，再选遍历；细节见概念·图论全表。',
        },
        {
          t: '只会冒泡排序就够',
          ok: false,
          why: '排序解决不了连通、依赖与最短层数。',
        },
        {
          t: '必须先写四层 DP',
          ok: false,
          why: '未必是 DP；先判断是否图遍历更贴。',
        },
        {
          t: '禁止使用队列或栈',
          ok: false,
          why: 'BFS 用队列、DFS 用栈/递归，正是图遍历工具。',
        },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
      tags: ['选型'],
    },
    {
      id: 'concept-dsa-structures:pick_dp',
      q: '动态规划题起手通常先问什么？',
      choices: [
        {
          t: '有无最优子结构；状态如何定义；转移是什么',
          ok: true,
          why: '状态与转移是 DP 核心。',
        },
        {
          t: '循环层数越多越像 DP',
          ok: false,
          why: '层数不是 DP 标志；关键是状态与重叠子问题。',
        },
        {
          t: '禁止记忆化',
          ok: false,
          why: '记忆化是自顶向下 DP，完全合法。',
        },
        {
          t: '凡递归都自动是 DP',
          ok: false,
          why: '还要重叠子问题、最优子结构等条件。',
        },
      ],
      relatedNodes: ['dsa-dp'],
      tags: ['选型'],
    },
    {
      id: 'concept-dsa-structures:pick_hash',
      q: '要把 O(n²) 两层扫描压到近线性，最常见的空间换时间是？',
      choices: [
        {
          t: '哈希表边扫边查（如两数之和记补数）',
          ok: true,
          why: '用 Map/字典降循环层数。',
        },
        {
          t: '再套一层同长循环',
          ok: false,
          why: '复杂度更高，不是优化。',
        },
        {
          t: '改成 O(2ⁿ) 回溯',
          ok: false,
          why: '指数级通常更差。',
        },
        {
          t: '删除全部输入',
          ok: false,
          why: '改题不是算法优化。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity'],
      tags: ['选型'],
    },
    {
      id: 'concept-dsa-structures:pick_sort',
      q: '需要稳定排序或多关键字保序时，更稳妥的直觉？',
      choices: [
        {
          t: '优先考虑稳定算法（如归并）；快排/堆排通常不保证稳定',
          ok: true,
          why: '稳定性在多关键字时关键。',
        },
        {
          t: '所有 O(n log n) 排序都稳定',
          ok: false,
          why: '快排、堆排通常不稳定。',
        },
        {
          t: '稳定等于时间 O(1)',
          ok: false,
          why: '稳定性指相等元素相对顺序，与时间复杂度无关。',
        },
        {
          t: '无序数组可直接二分',
          ok: false,
          why: '二分要求区间单调/有序。',
        },
      ],
      relatedNodes: ['dsa-sort'],
      tags: ['选型'],
    },
  ],
});

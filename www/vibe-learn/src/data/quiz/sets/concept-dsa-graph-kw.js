import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-graph-kw',
  title: '基础 · 图',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '图', '基础'],
  relatedNodes: ['dsa-graph'],
  caption: 'BFS/DFS/拓扑/表示。',
  questions: [
    {
      id: 'concept-dsa-graph-kw:bfs',
      q: '无权图最少边数到目标，优先？',
      choices: [
        { t: 'BFS 队列扩层', ok: true, why: '无权最短层数。' },
        { t: 'DFS 一条走到底', ok: false, why: '不保证最短。' },
        { t: '无序下标硬二分', ok: false, why: '不是有序查找。' },
        { t: '先全排边权', ok: false, why: '无权不必排。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-graph-kw:dfs',
      q: '网格沉岛/连通分量，常用？',
      choices: [
        { t: 'DFS/BFS 标记遍历', ok: true, why: '标记已访防回头。' },
        { t: '无序值上硬二分', ok: false, why: '连通不是二分。' },
        { t: '只排序各行元素', ok: false, why: '丢邻接关系。' },
        { t: '栈匹配括号计数', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-graph-kw:topo',
      q: '有向依赖能否排成序，用？',
      choices: [
        { t: '拓扑排序检环', ok: true, why: '有环则失败。' },
        { t: '按名字字典序', ok: false, why: '≠拓扑序。' },
        { t: '无序编号二分', ok: false, why: '编号≠依赖。' },
        { t: '堆求最短名字', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-graph-kw:adj',
      q: '稀疏图最常用表示？',
      choices: [
        { t: '邻接表', ok: true, why: '空间随边数。' },
        { t: '必用 n² 矩阵', ok: false, why: '稀疏浪费。' },
        { t: '只能用栈', ok: false, why: '栈不是图表示。' },
        { t: '只能用并查集', ok: false, why: 'UF 是另一结构。' },
      ],
      relatedNodes: ['dsa-graph'],
    },
    {
      id: 'concept-dsa-graph-kw:vs',
      q: 'BFS 与 DFS 结构差异？',
      choices: [
        { t: 'BFS 队列，DFS 栈', ok: true, why: '递归也是栈。' },
        { t: '两者都必须用堆', ok: false, why: '不是标配。' },
        { t: '两者都必须二分', ok: false, why: '概念混淆。' },
        { t: '两者禁止标记访', ok: false, why: '都要防回头。' },
      ],
      relatedNodes: ['dsa-graph'],
    },
  ],
});

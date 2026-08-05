import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-ml-kw',
  title: '基础 · ML 算法直觉',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '机器学习'],
  relatedNodes: ['dsa-ml'],
  caption: '梯度下降与经典名；不重复第五章。',
  questions: [
    {
      id: 'concept-dsa-ml-kw:gd',
      q: '梯度下降更新方向是？',
      choices: [
        { t: '沿损失梯度反方向', ok: true, why: 'w ← w−η∇L。' },
        { t: '沿梯度正方向', ok: false, why: '会增损失。' },
        { t: '有序权重上硬二分', ok: false, why: '不是二分。' },
        { t: '按字典序轮换参数', ok: false, why: '与梯度无关。' },
      ],
      relatedNodes: ['dsa-ml'],
    },
    {
      id: 'concept-dsa-ml-kw:bp',
      q: '反向传播与图的对应？',
      choices: [
        { t: '前向求值，反向链式求导', ok: true, why: '计算图依赖边。' },
        { t: '无序权重硬二分', ok: false, why: '不是二分题。' },
        { t: '只 BFS 一遍即更新', ok: false, why: '要链式法则。' },
        { t: '禁止使用图结构', ok: false, why: '计算图是标准。' },
      ],
      relatedNodes: ['dsa-ml', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-ml-kw:km',
      q: 'k-means 一轮在做什么？',
      choices: [
        { t: '归簇再更新中心', ok: true, why: '迭代启发式。' },
        { t: '栈匹配决定簇数', ok: false, why: '题型不对。' },
        { t: '一次哈希得全局最优', ok: false, why: '不保证全局优。' },
        { t: '等于 Transformer 解码', ok: false, why: '概念不同。' },
      ],
      relatedNodes: ['dsa-ml'],
    },
    {
      id: 'concept-dsa-ml-kw:bound',
      q: '本课相对第五章边界？',
      choices: [
        { t: '本课优化直觉，五章 LLM 产品', ok: true, why: '刻意分流。' },
        { t: '两章应全文重复 Transformer', ok: false, why: '避免重复。' },
        { t: 'DSA 禁止提梯度', ok: false, why: '本课正讲 GD。' },
        { t: '会 GD 等于会训大模型', ok: false, why: '验收是直觉。' },
      ],
      relatedNodes: ['dsa-ml', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-ml-kw:tree',
      q: '决策树结构感最像？',
      choices: [
        { t: '树：按特征分裂', ok: true, why: '层级分裂。' },
        { t: '并查集按秩', ok: false, why: '非主叙事。' },
        { t: 'Dijkstra 最短路', ok: false, why: '题型不对。' },
        { t: '禁止分支的链表', ok: false, why: '树正是分支。' },
      ],
      relatedNodes: ['dsa-ml', 'dsa-tree'],
    },
  ],
});

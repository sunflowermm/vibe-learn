import { defineQuizSet } from '../schema.js';

/** 基础 · ML 算法直觉（与 LLM 产品章分流） */
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
      q: '梯度下降更新参数的方向是？',
      choices: [
        { t: '沿损失梯度的反方向迈步', ok: true, why: 'w ← w − η∇L。' },
        { t: '沿损失梯度的正方向迈步', ok: false, why: '会增大损失。' },
        { t: '把权重当有序数组硬二分更新', ok: false, why: '不是有序查找。' },
        { t: '按参数名字典序轮流加减常数', ok: false, why: '与梯度无关。' },
      ],
      relatedNodes: ['dsa-ml'],
    },
    {
      id: 'concept-dsa-ml-kw:bp',
      q: '反向传播与计算图的对应？',
      choices: [
        { t: '前向求值，反向按依赖边链式求导', ok: true, why: '计算图上的链式法则。' },
        { t: '对无序权重硬二分找更新量', ok: false, why: '不是二分题。' },
        { t: '只 BFS 扫一遍图就完成全部更新', ok: false, why: '要求导链式传递误差。' },
        { t: '训练时禁止使用任何图结构', ok: false, why: '计算图是标准抽象。' },
      ],
      relatedNodes: ['dsa-ml', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-ml-kw:km',
      q: 'k-means 一轮在做什么？',
      choices: [
        { t: '按最近中心归簇，再更新各簇中心', ok: true, why: '迭代启发式，不保证全局最优。' },
        { t: '用栈匹配决定簇的个数 K', ok: false, why: 'K 是超参，不是括号匹配。' },
        { t: '一次哈希映射就得到全局最优分簇', ok: false, why: '不保证全局最优。' },
        { t: '等价于 Transformer 解码一步', ok: false, why: '概念不同。' },
      ],
      relatedNodes: ['dsa-ml'],
    },
    {
      id: 'concept-dsa-ml-kw:bound',
      q: '本课相对「LLM 产品章」的边界？',
      choices: [
        { t: '本课讲优化/经典算法直觉；产品章讲 LLM 落地', ok: true, why: '刻意分流，避免全文重复。' },
        { t: '两章应全文重复讲解 Transformer', ok: false, why: '避免重复堆砌。' },
        { t: 'DSA 课禁止提到梯度下降', ok: false, why: '本课正讲 GD 直觉。' },
        { t: '会写 GD 更新式就等于会训大模型', ok: false, why: '验收是直觉，不是完整训练栈。' },
      ],
      relatedNodes: ['dsa-ml', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-ml-kw:tree',
      q: '决策树的结构感最像？',
      choices: [
        { t: '树：按特征分裂成层级分支', ok: true, why: '分裂轴 + 叶子预测。' },
        { t: '并查集按秩合并样本', ok: false, why: '不是决策树主叙事。' },
        { t: 'Dijkstra 求特征最短路', ok: false, why: '不是最短路题。' },
        { t: '禁止分支的单链表', ok: false, why: '树正是允许分支。' },
      ],
      relatedNodes: ['dsa-ml', 'dsa-tree'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-tree-kw',
  title: '基础 · 树与堆',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '树', '堆', '基础'],
  relatedNodes: ['dsa-tree'],
  caption: '遍历、BST、堆 TopK。',
  questions: [
    {
      id: 'concept-dsa-tree-kw:level',
      q: '按层打印二叉树，首选？',
      choices: [
        { t: '队列层序 BFS', ok: true, why: '一层层出队。' },
        { t: '只做递归先序', ok: false, why: '先序不是按层。' },
        { t: '中序后整体排序', ok: false, why: '丢层级。' },
        { t: '并查集合并孩子', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-tree-kw:bst',
      q: 'BST 中序遍历的结果是？',
      choices: [
        { t: '有序（非降）序列', ok: true, why: 'BST 中序有序。' },
        { t: '一定按层输出', ok: false, why: '层序才是按层。' },
        { t: '一定随机打乱', ok: false, why: '与 BST 性质相反。' },
        { t: '一定只含叶子', ok: false, why: '会访全部节点。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
    {
      id: 'concept-dsa-tree-kw:heap',
      q: '反复取当前最小的 K 个，结构常选？',
      choices: [
        { t: '大小为 K 的堆', ok: true, why: 'TopK 模板。' },
        { t: '无序数组硬二分', ok: false, why: '缺有序整体。' },
        { t: '栈匹配最小值', ok: false, why: '题型不对。' },
        { t: '并查集按秩合并', ok: false, why: '不管 TopK。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-tree-kw:dfs',
      q: '根-左-右的遍历顺序叫？',
      choices: [
        { t: '先序遍历', ok: true, why: '先访根。' },
        { t: '中序遍历', ok: false, why: '中序是左-根-右。' },
        { t: '后序遍历', ok: false, why: '后序是左-右-根。' },
        { t: '层序遍历', ok: false, why: '层序用队列。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
    {
      id: 'concept-dsa-tree-kw:pq',
      q: '优先队列底层常见实现是？',
      choices: [
        { t: '堆', ok: true, why: '取极值 O(log n)。' },
        { t: '单向队列 FIFO', ok: false, why: '无优先级。' },
        { t: '只能哈希表', ok: false, why: '哈希不保极值序。' },
        { t: '只能并查集', ok: false, why: '不管优先级。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
  ],
});

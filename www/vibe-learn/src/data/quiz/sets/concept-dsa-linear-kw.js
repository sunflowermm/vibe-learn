import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-linear-kw',
  title: '基础 · 线性结构',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '线性', '基础'],
  relatedNodes: ['dsa-linear'],
  caption: '数组/链表/栈/队列选型。',
  questions: [
    {
      id: 'concept-dsa-linear-kw:arr',
      q: '需要按下标 O(1) 读写，首选？',
      choices: [
        { t: '数组（或动态数组）', ok: true, why: '连续下标随机访问。' },
        { t: '单向链表', ok: false, why: '按下标要 O(n)。' },
        { t: '只能用栈', ok: false, why: '栈不提供任意下标。' },
        { t: '只能用队列', ok: false, why: '队列不提供任意下标。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
    {
      id: 'concept-dsa-linear-kw:list',
      q: '已知节点指针，中间插入更便宜的是？',
      choices: [
        { t: '链表局部改指针', ok: true, why: '不必搬移后续元素。' },
        { t: '数组中部插入', ok: false, why: '要搬移，O(n)。' },
        { t: '哈希表按值排序', ok: false, why: '不是插入链表语义。' },
        { t: '堆调整堆顶', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
    {
      id: 'concept-dsa-linear-kw:stack',
      q: '后进先出（LIFO）对应？',
      choices: [
        { t: '栈', ok: true, why: '括号、递归栈同构。' },
        { t: '队列', ok: false, why: '队列是 FIFO。' },
        { t: '优先队列', ok: false, why: '按优先级，不是 LIFO。' },
        { t: '并查集', ok: false, why: '管连通不是进出序。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
    {
      id: 'concept-dsa-linear-kw:queue',
      q: 'BFS 一层层扩展，配套结构是？',
      choices: [
        { t: '队列（FIFO）', ok: true, why: '先入先出对齐层序。' },
        { t: '栈（LIFO）', ok: false, why: '栈更像 DFS。' },
        { t: '只能平衡树', ok: false, why: '不是 BFS 标配。' },
        { t: '只能并查集', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-linear-kw:cycle',
      q: '链表判环且要 O(1) 额外空间？',
      choices: [
        { t: '快慢指针相遇法', ok: true, why: 'Floyd 模板。' },
        { t: '先排序再两两比', ok: false, why: '链表不便排序。' },
        { t: '整表拷成数组', ok: false, why: '空间 O(n)。' },
        { t: '层序队列扫表', ok: false, why: '层序概念不对口。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-two-pointers', 'dsa-hot'],
    },
  ],
});

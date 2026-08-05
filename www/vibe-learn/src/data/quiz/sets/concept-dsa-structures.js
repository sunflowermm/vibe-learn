import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-structures',
  title: '选型 · DSA 结构对照',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '选型'],
  relatedNodes: ['dsa-linear', 'dsa-hash', 'dsa-tree'],
  caption: '按操作代价选结构。',
  questions: [
    {
      id: 'concept-dsa-structures:lookup',
      q: '高频「键 → 值」查询，首选？',
      choices: [
        { t: '哈希表', ok: true, why: '平均 O(1) 查找。' },
        { t: '无序数组线性扫', ok: false, why: '平均 O(n)。' },
        { t: '只能用栈', ok: false, why: '栈不按键查。' },
        { t: '只能用队列', ok: false, why: '队列不按键查。' },
      ],
      relatedNodes: ['dsa-hash'],
    },
    {
      id: 'concept-dsa-structures:order',
      q: '要有序区间/名次，更合适？',
      choices: [
        { t: '有序树或有序容器', ok: true, why: '保序才能区间操作。' },
        { t: '纯哈希无序桶', ok: false, why: '哈希不保序。' },
        { t: '只能 FIFO 队列', ok: false, why: '无全序检索。' },
        { t: '只能括号栈', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hash'],
    },
    {
      id: 'concept-dsa-structures:minmax',
      q: '反复取当前最小任务，首选？',
      choices: [
        { t: '堆（优先队列）', ok: true, why: '取极值高效。' },
        { t: '无序数组每次全扫', ok: false, why: '每次 O(n)。' },
        { t: '哈希表按插入序', ok: false, why: '不保极值。' },
        { t: '并查集按秩合并', ok: false, why: '不管优先级。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
    {
      id: 'concept-dsa-structures:fifo',
      q: '生产者消费者缓冲，语义常是？',
      choices: [
        { t: '队列 FIFO', ok: true, why: '先入先出。' },
        { t: '栈 LIFO', ok: false, why: '后进先出不合适。' },
        { t: '只能 BST', ok: false, why: '过重。' },
        { t: '只能并查集', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
  ],
});

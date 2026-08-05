import { defineQuizSet } from '../schema.js';

/** 选型 · DSA 结构对照（按操作代价选结构） */
export default defineQuizSet({
  id: 'concept-dsa-structures',
  title: '选型 · DSA 结构对照',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '选型'],
  relatedNodes: ['dsa-linear', 'dsa-hash', 'dsa-tree'],
  caption: '按操作代价选结构；干扰项=邻近结构误用。',
  questions: [
    {
      id: 'concept-dsa-structures:lookup',
      q: '高频「键 → 值」查询，首选？',
      choices: [
        { t: '哈希表（平均近常数查找）', ok: true, why: '平均 O(1) 查找；冲突严重可能退化。' },
        { t: '无序数组每次从头线性扫描', ok: false, why: '平均 O(n)，高频查询不合适。' },
        { t: '栈：靠弹出顺序间接找到键', ok: false, why: '栈只暴露栈顶，不按键随机查。' },
        { t: '队列：靠出队顺序间接找到键', ok: false, why: '队列是 FIFO，不按键索引。' },
      ],
      relatedNodes: ['dsa-hash'],
    },
    {
      id: 'concept-dsa-structures:order',
      q: '要有序区间查询 / 按名次取元素，更合适？',
      choices: [
        { t: '有序树或有序容器（保序）', ok: true, why: '保序才能做区间与名次类操作。' },
        { t: '纯哈希桶（不维护键序）', ok: false, why: '哈希平均快，但不保全序。' },
        { t: 'FIFO 队列按入队先后当「有序」', ok: false, why: '入队序≠键值序，难做区间检索。' },
        { t: '括号匹配用的栈当有序表', ok: false, why: '栈管 LIFO，不提供有序区间。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hash'],
    },
    {
      id: 'concept-dsa-structures:minmax',
      q: '反复取出当前优先级最高/最低的任务，首选？',
      choices: [
        { t: '堆（优先队列）', ok: true, why: '取极值高效；插入/调整对数级。' },
        { t: '无序数组每次全表扫描找极值', ok: false, why: '每次 O(n)，反复取会很慢。' },
        { t: '哈希表按插入顺序当优先级', ok: false, why: '插入序≠优先级；哈希不保极值。' },
        { t: '并查集按秩合并代替优先队列', ok: false, why: '并查集管连通分量，不管优先级。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
    {
      id: 'concept-dsa-structures:fifo',
      q: '生产者-消费者缓冲里，消费顺序通常是？',
      choices: [
        { t: '队列：先入先出（FIFO）', ok: true, why: '先生产的先被消费是常见语义。' },
        { t: '栈：后进先出（LIFO）', ok: false, why: '后进先出会打乱到达顺序。' },
        { t: '必须上平衡二叉搜索树缓冲', ok: false, why: '过重；除非还要按键检索。' },
        { t: '必须用并查集合并生产者', ok: false, why: '并查集不管缓冲进出序。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
  ],
});

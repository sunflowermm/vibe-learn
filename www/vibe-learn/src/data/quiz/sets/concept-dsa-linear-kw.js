import { defineQuizSet } from '../schema.js';

/** 基础 · 线性结构：数组/链表/栈/队列选型 */
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
        { t: '单向链表按「第 k 个」走到目标', ok: false, why: '按下标访问要 O(n)。' },
        { t: '栈：靠多次弹出间接到达下标', ok: false, why: '栈只暴露栈顶，不提供任意下标。' },
        { t: '队列：靠多次出队间接到达下标', ok: false, why: '队列是 FIFO，不提供任意下标。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
    {
      id: 'concept-dsa-linear-kw:list',
      q: '已知节点指针，在中间插入更便宜的是？',
      choices: [
        { t: '链表：局部改指针即可', ok: true, why: '不必搬移后续元素。' },
        { t: '数组：在中部插入并搬移后续', ok: false, why: '搬移代价 O(n)。' },
        { t: '哈希表：先按值排好再插入', ok: false, why: '不是「已知节点旁插入」语义。' },
        { t: '堆：调整堆顶完成插入', ok: false, why: '堆管优先级，不管链表局部插入。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
    {
      id: 'concept-dsa-linear-kw:stack',
      q: '后进先出（LIFO）对应？',
      choices: [
        { t: '栈', ok: true, why: '括号匹配、函数调用栈同构。' },
        { t: '队列', ok: false, why: '队列是 FIFO。' },
        { t: '优先队列（堆）', ok: false, why: '按优先级出队，不是严格 LIFO。' },
        { t: '并查集', ok: false, why: '管连通分量，不管进出序。' },
      ],
      relatedNodes: ['dsa-linear'],
    },
    {
      id: 'concept-dsa-linear-kw:queue',
      q: 'BFS 一层层扩展，配套结构是？',
      choices: [
        { t: '队列（FIFO）', ok: true, why: '先入先出对齐层序。' },
        { t: '栈（LIFO）', ok: false, why: '栈更像 DFS 一路深入。' },
        { t: '必须上平衡二叉搜索树', ok: false, why: 'BFS 标配是队列，不是 BST。' },
        { t: '必须用并查集扩层', ok: false, why: '并查集回答连通，不按层扩展。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-linear-kw:cycle',
      q: '链表判环且要 O(1) 额外空间？',
      choices: [
        { t: '快慢指针相遇法（Floyd）', ok: true, why: '一面高频模板。' },
        { t: '先把链表排序再两两比较', ok: false, why: '链表不便高效原地排序。' },
        { t: '整表拷成数组再用哈希查地址', ok: false, why: '额外空间 O(n)。' },
        { t: '用层序队列扫完整张表', ok: false, why: '层序是树/图概念，不是判环模板。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-two-pointers', 'dsa-hot'],
    },
  ],
});

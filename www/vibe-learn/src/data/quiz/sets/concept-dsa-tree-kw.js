import { defineQuizSet } from '../schema.js';

/** 基础 · 树与堆 */
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
        { t: '队列做层序 BFS', ok: true, why: '一层层出队。' },
        { t: '只做递归先序遍历再输出', ok: false, why: '先序是根左右，不是按层。' },
        { t: '中序遍历完再对结果全局排序', ok: false, why: '丢掉层级信息。' },
        { t: '并查集合并左右孩子当一层', ok: false, why: '层序靠队列，不是并查集。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-tree-kw:bst',
      q: 'BST 中序遍历的结果是？',
      choices: [
        { t: '有序（非降）序列', ok: true, why: 'BST 中序有序是核心性质。' },
        { t: '一定按层从左到右输出', ok: false, why: '按层是层序/BFS。' },
        { t: '一定把节点值随机打乱', ok: false, why: '与 BST 有序性质相反。' },
        { t: '一定只访问叶子节点', ok: false, why: '中序会访问全部节点。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
    {
      id: 'concept-dsa-tree-kw:heap',
      q: '反复取当前最小的 K 个，结构常选？',
      choices: [
        { t: '大小为 K 的堆（优先队列）', ok: true, why: 'TopK 模板。' },
        { t: '无序数组下标直接二分第 K', ok: false, why: '无序不能按名次二分下标。' },
        { t: '栈：弹出第 K 个当作最小值集合', ok: false, why: '栈序≠第 K 小集合。' },
        { t: '并查集按秩合并代替 TopK', ok: false, why: '并查集不管名次统计。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-tree-kw:dfs',
      q: '根-左-右的遍历顺序叫？',
      choices: [
        { t: '先序遍历', ok: true, why: '先访问根。' },
        { t: '中序遍历', ok: false, why: '中序是左-根-右。' },
        { t: '后序遍历', ok: false, why: '后序是左-右-根。' },
        { t: '层序遍历', ok: false, why: '层序用队列按层。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
    {
      id: 'concept-dsa-tree-kw:pq',
      q: '优先队列底层常见实现是？',
      choices: [
        { t: '堆', ok: true, why: '取极值大约 O(log n)。' },
        { t: '普通 FIFO 队列', ok: false, why: 'FIFO 无优先级。' },
        { t: '哈希表按插入序当优先级', ok: false, why: '哈希不保极值序。' },
        { t: '并查集按秩当优先级', ok: false, why: '秩服务合并，不是任务优先级。' },
      ],
      relatedNodes: ['dsa-tree'],
    },
  ],
});

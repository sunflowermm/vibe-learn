import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-hash-kw',
  title: '基础 · 哈希表',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '哈希', '基础'],
  relatedNodes: ['dsa-hash'],
  caption: '平均 O(1)、冲突与计数题。',
  questions: [
    {
      id: 'concept-dsa-hash-kw:avg',
      q: '哈希查找说 O(1) 时更严谨是？',
      choices: [
        { t: '平均 O(1)，冲突可退化', ok: true, why: '要报边界。' },
        { t: '最坏也恒为 O(1)', ok: false, why: '可退化到 O(n)。' },
        { t: '空间也恒为 O(1)', ok: false, why: '空间随元素数。' },
        { t: '哈希无需谈复杂度', ok: false, why: '仍用大 O。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity'],
    },
    {
      id: 'concept-dsa-hash-kw:two-sum',
      q: '两数之和近线性，核心结构是？',
      choices: [
        { t: '哈希表记已见值', ok: true, why: '查互补。' },
        { t: '无序数组硬二分', ok: false, why: '缺有序。' },
        { t: '小根堆优先队列', ok: false, why: '非主路径。' },
        { t: '并查集合并下标', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-hash-kw:count',
      q: '统计字符出现次数，常用？',
      choices: [
        { t: '哈希表或计数数组', ok: true, why: '键→次数。' },
        { t: '只能用栈匹配', ok: false, why: '不是括号题。' },
        { t: '无权图最短路', ok: false, why: '题型不对。' },
        { t: '归并稳定性证明', ok: false, why: '与计数无关。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-string'],
    },
    {
      id: 'concept-dsa-hash-kw:lru',
      q: 'LRU 平均 O(1)，哈希搭配？',
      choices: [
        { t: '双向链表维次序', ok: true, why: '哈希定位+链表挪序。' },
        { t: '单链表从头查找', ok: false, why: '查找 O(n)。' },
        { t: '动态数组中部插', ok: false, why: '搬移达不到 O(1)。' },
        { t: '只排序全部键', ok: false, why: '不是 O(1) 更新。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-hash-kw:collide',
      q: '哈希冲突常见处理是？',
      choices: [
        { t: '链地址或开放寻址', ok: true, why: '把冲突放到桶/探查。' },
        { t: '禁止任何冲突发生', ok: false, why: '实际无法保证。' },
        { t: '改成二分必无冲突', ok: false, why: '概念混淆。' },
        { t: '用栈弹出冲突键', ok: false, why: '不是标准做法。' },
      ],
      relatedNodes: ['dsa-hash'],
    },
  ],
});

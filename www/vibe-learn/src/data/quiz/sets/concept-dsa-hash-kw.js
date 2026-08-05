import { defineQuizSet } from '../schema.js';

/** 基础 · 哈希表 */
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
        { t: '平均 / 均摊常为 O(1)，冲突严重可能退化', ok: true, why: '面试要报均摊与最坏。' },
        { t: '最坏情况下也恒为 O(1)，与冲突无关', ok: false, why: '链表法冲突严重时可到 O(n)。' },
        { t: '占用空间也恒为 O(1)，与元素个数无关', ok: false, why: '存 n 个元素，空间通常随 n 增长。' },
        { t: '哈希结构不必谈复杂度，只看语言实现', ok: false, why: '仍用大 O 描述随规模增长。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity'],
    },
    {
      id: 'concept-dsa-hash-kw:two-sum',
      q: '两数之和近线性，核心结构是？',
      choices: [
        { t: '哈希表记录已见值（及下标）', ok: true, why: '查互补 target−x。' },
        { t: '对无序数组直接二分找加数', ok: false, why: '缺有序前提。' },
        { t: '小根堆当优先队列逐个弹出', ok: false, why: '不是两数之和主路径。' },
        { t: '并查集按下标合并成一对', ok: false, why: '并查集不管两数之和。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-hash-kw:count',
      q: '统计字符出现次数，常用？',
      choices: [
        { t: '哈希表或定长计数数组', ok: true, why: '键 → 次数。' },
        { t: '栈：靠括号匹配顺便计数', ok: false, why: '频次统计不是括号合法性。' },
        { t: '无权图最短路累加访问次数', ok: false, why: '字符频次不是图距离。' },
        { t: '归并排序的稳定性证明代替计数', ok: false, why: '稳定性与频次统计无关。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-string'],
    },
    {
      id: 'concept-dsa-hash-kw:lru',
      q: 'LRU 要平均 O(1) get/put，哈希常搭配？',
      choices: [
        { t: '双向链表维护新旧次序', ok: true, why: '哈希定位 + 链表 O(1) 挪序。' },
        { t: '单链表每次从头线性扫描', ok: false, why: '查找是 O(n)。' },
        { t: '动态数组中部插入/删除', ok: false, why: '搬移达不到稳定 O(1)。' },
        { t: '每次操作前对全部键排序', ok: false, why: '达不到 O(1) 更新。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-hash-kw:collide',
      q: '哈希冲突常见处理是？',
      choices: [
        { t: '链地址（拉链）或开放寻址', ok: true, why: '把冲突放到桶链表或探查序列。' },
        { t: '从设计上禁止任何冲突发生', ok: false, why: '实际无法对任意输入保证零冲突。' },
        { t: '改成二分查找就一定没有冲突', ok: false, why: '二分是有序查找，不解决哈希冲突。' },
        { t: '用栈弹出冲突键当作解决', ok: false, why: '不是标准冲突处理。' },
      ],
      relatedNodes: ['dsa-hash'],
    },
  ],
});

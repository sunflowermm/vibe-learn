import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-two-pointers-kw',
  title: '基础 · 双指针与滑窗',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '双指针', '滑窗'],
  relatedNodes: ['dsa-two-pointers'],
  caption: '对撞、快慢、右扩左收。',
  questions: [
    {
      id: 'concept-dsa-two-pointers-kw:forms',
      q: '双指针三种高频形态是？',
      choices: [
        { t: '对撞、快慢、滑窗', ok: true, why: '覆盖有序/环/子串。' },
        { t: '只有对撞一种', ok: false, why: '还有快慢与窗。' },
        { t: '必须建两棵树', ok: false, why: '指针≠树。' },
        { t: '只能用于链表', ok: false, why: '数组同样高频。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:collide',
      q: '有序数组两数之和，对撞怎么动？',
      choices: [
        { t: '和偏小 L++，偏大 R--', ok: true, why: '利用单调性。' },
        { t: '两端下标随机乱跳', ok: false, why: '丢正确性。' },
        { t: '每轮重新全表排序', ok: false, why: '已有序。' },
        { t: '退回双重循环扫完', ok: false, why: '目标是线性。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:window',
      q: '最长无重复子串，窗口在？',
      choices: [
        { t: '右扩纳入，重复左收', ok: true, why: '哈希维护合法性。' },
        { t: '每次从 0 重扫', ok: false, why: '失去线性收益。' },
        { t: '只能用堆维护', ok: false, why: '常用哈希。' },
        { t: '窗口只扩不缩', ok: false, why: '不合法必须左收。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:floyd',
      q: '链表判环快慢指针属于？',
      choices: [
        { t: '同向双指针', ok: true, why: '快两步慢一步。' },
        { t: '两端对撞指针', ok: false, why: '不是从两端靠。' },
        { t: '必须先转数组', ok: false, why: '非经典解。' },
        { t: '只能匹配括号', ok: false, why: '括号用栈。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:when',
      q: '子串区间约束能线性维护时，优先？',
      choices: [
        { t: '滑窗/双指针', ok: true, why: '先别上重 DP。' },
        { t: '见到最值就 DP', ok: false, why: '先认约束。' },
        { t: '无序一律不能', ok: false, why: '滑窗常不需全序。' },
        { t: '只做最短路', ok: false, why: '主战场是序列。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-dp'],
    },
  ],
});

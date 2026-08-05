import { defineQuizSet } from '../schema.js';

/** 基础 · 双指针与滑窗 */
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
        { t: '对撞、快慢、滑窗', ok: true, why: '覆盖有序两数/环/子串等。' },
        { t: '只有对撞一种形态', ok: false, why: '还有快慢指针与滑动窗口。' },
        { t: '必须先建两棵树再移动指针', ok: false, why: '指针是下标/引用，不是树结构。' },
        { t: '只能用在链表上，数组禁用', ok: false, why: '有序数组对撞、子串滑窗都极高频。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:collide',
      q: '有序数组两数之和，对撞指针怎么动？',
      choices: [
        { t: '和偏小则左指针右移；偏大则右指针左移', ok: true, why: '利用单调性收缩区间。' },
        { t: '两端下标每轮随机乱跳', ok: false, why: '丢失正确性与可终止性。' },
        { t: '每轮先重新全表排序再对撞', ok: false, why: '题目已假设有序。' },
        { t: '放弃对撞，退回双重循环扫完', ok: false, why: '目标是近线性，不是再平方。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:window',
      q: '最长无重复子串，窗口在做什么？',
      choices: [
        { t: '右指针扩张纳入；窗口内重复则左收', ok: true, why: '哈希维护窗口合法性。' },
        { t: '每次从下标 0 重新扫描整段', ok: false, why: '失去线性收益。' },
        { t: '只能用堆维护窗口内字符', ok: false, why: '常用哈希/数组计频。' },
        { t: '窗口只扩大、永不收缩', ok: false, why: '出现重复必须左收。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:floyd',
      q: '链表判环的快慢指针属于？',
      choices: [
        { t: '同向双指针（快两步、慢一步）', ok: true, why: 'Floyd 模板。' },
        { t: '两端对撞指针（一头一尾靠拢）', ok: false, why: '链表判环不是从两端靠。' },
        { t: '必须先转成数组再双指针', ok: false, why: '非经典 O(1) 空间解。' },
        { t: '只能用来匹配括号合法性', ok: false, why: '括号匹配用栈；判环用快慢针。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-two-pointers-kw:when',
      q: '子串/区间约束能线性维护时，优先？',
      choices: [
        { t: '滑窗或双指针', ok: true, why: '先别直接上重 DP。' },
        { t: '一见到「最值」就上完整 DP 表', ok: false, why: '先认清约束是否可滑窗维护。' },
        { t: '序列无全序就一律不能滑窗', ok: false, why: '滑窗常不需要全表有序。' },
        { t: '一律改成图最短路来做', ok: false, why: '主战场仍是序列区间。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-dp'],
    },
  ],
});

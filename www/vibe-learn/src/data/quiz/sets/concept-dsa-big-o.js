import { defineQuizSet } from '../schema.js';

/** 复杂度 · 应用场景（等长选项） */
export default defineQuizSet({
  id: 'concept-dsa-big-o',
  title: '基础 · 复杂度开口',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '复杂度', '基础'],
  relatedNodes: ['dsa-complexity'],
  caption: '报阶、分清平均/最坏；不是背口号。',
  questions: [
    {
      id: 'concept-dsa-big-o:o1',
      q: '数组按下标读写一次，时间通常记？',
      choices: [
        { t: 'O(1)', ok: true, why: '随机访问常数时间。' },
        { t: 'O(n)', ok: false, why: '不是扫整表。' },
        { t: 'O(log n)', ok: false, why: '不是折半查找。' },
        { t: 'O(n²)', ok: false, why: '单次下标访问不是平方。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-linear'],
    },
    {
      id: 'concept-dsa-big-o:olog',
      q: '有序数组二分查找，时间通常记？',
      choices: [
        { t: 'O(log n)', ok: true, why: '每次丢掉一半。' },
        { t: 'O(1)', ok: false, why: '仍随 n 变，不是常数。' },
        { t: 'O(n)', ok: false, why: '优于线性扫描。' },
        { t: 'O(n²)', ok: false, why: '不是双重扫描。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-big-o:on',
      q: '单层循环扫完长度 n 的数组，通常记？',
      choices: [
        { t: 'O(n)', ok: true, why: '与输入规模成正比。' },
        { t: 'O(1)', ok: false, why: '次数随 n 变。' },
        { t: 'O(log n)', ok: false, why: '没有折半。' },
        { t: 'O(n²)', ok: false, why: '只有一层完整扫描。' },
      ],
      relatedNodes: ['dsa-complexity'],
    },
    {
      id: 'concept-dsa-big-o:on2',
      q: '双重完整嵌套扫描长度 n，通常记？',
      choices: [
        { t: 'O(n²)', ok: true, why: '两层相乘。' },
        { t: 'O(n)', ok: false, why: '嵌套不是相加一次。' },
        { t: 'O(n log n)', ok: false, why: '完整双重扫描更重。' },
        { t: 'O(2ⁿ)', ok: false, why: '不是指数枚举。' },
      ],
      relatedNodes: ['dsa-complexity'],
    },
    {
      id: 'concept-dsa-big-o:onlog',
      q: '比较排序的常见平均下界量级是？',
      choices: [
        { t: '约 n log n 阶', ok: true, why: '快排/归并/堆排平均档。' },
        { t: '约线性的 n 阶', ok: false, why: '比较模型一般到不了线性。' },
        { t: '约常数的 1 阶', ok: false, why: '要碰齐所有元素。' },
        { t: '约平方的 n² 阶', ok: false, why: '那是朴素档，不是下界。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-big-o:avg',
      q: '快排说「平均 n log n」时还要补？',
      choices: [
        { t: '最坏可能到 O(n²)', ok: true, why: '枢轴极端会退化。' },
        { t: '最坏也必是 O(1)', ok: false, why: '与事实相反。' },
        { t: '空间一定是 O(1)', ok: false, why: '递归栈也占空间。' },
        { t: '一定是稳定排序', ok: false, why: '快排通常不稳。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-sort', 'dsa-hash'],
    },
  ],
});

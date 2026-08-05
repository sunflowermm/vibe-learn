import { defineQuizSet } from '../schema.js';

/** 复杂度 · 应用场景 */
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
        { t: 'O(1)（随机访问常数时间）', ok: true, why: '连续内存下标寻址。' },
        { t: 'O(n)（等于扫完整张表）', ok: false, why: '单次下标访问不是线性扫描。' },
        { t: 'O(log n)（等于折半查找）', ok: false, why: '下标读写本身不折半。' },
        { t: 'O(n²)（等于双重扫描）', ok: false, why: '单次访问不是平方阶。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-linear'],
    },
    {
      id: 'concept-dsa-big-o:olog',
      q: '有序数组二分查找，时间通常记？',
      choices: [
        { t: 'O(log n)（每次丢掉一半）', ok: true, why: '对数阶经典。' },
        { t: 'O(1)（与 n 完全无关）', ok: false, why: '仍随 n 变，不是常数。' },
        { t: 'O(n)（与线性扫描同阶）', ok: false, why: '优于线性扫描。' },
        { t: 'O(n²)（等于双重扫描）', ok: false, why: '不是双重循环。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-big-o:on',
      q: '单层循环扫完长度 n 的数组，通常记？',
      choices: [
        { t: 'O(n)（与输入规模成正比）', ok: true, why: '线性阶。' },
        { t: 'O(1)（循环次数与 n 无关）', ok: false, why: '次数随 n 变。' },
        { t: 'O(log n)（每步都折半）', ok: false, why: '完整扫描没有折半。' },
        { t: 'O(n²)（两层嵌套才对）', ok: false, why: '只有一层完整扫描。' },
      ],
      relatedNodes: ['dsa-complexity'],
    },
    {
      id: 'concept-dsa-big-o:on2',
      q: '双重完整嵌套扫描长度 n，通常记？',
      choices: [
        { t: 'O(n²)（两层循环次数相乘）', ok: true, why: '平方阶。' },
        { t: 'O(n)（只算外层，内层可忽略）', ok: false, why: '嵌套应相乘，不是只加一次。' },
        { t: 'O(n log n)（等于比较排序下界）', ok: false, why: '完整双重扫描通常更重。' },
        { t: 'O(2ⁿ)（等于指数枚举）', ok: false, why: '不是子集指数枚举。' },
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
        { t: '约平方的 n² 阶（当作下界）', ok: false, why: '那是朴素档，不是信息论下界。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-big-o:avg',
      q: '快排说「平均 n log n」时还要补？',
      choices: [
        { t: '最坏可能退化到 O(n²)', ok: true, why: '枢轴极端会退化。' },
        { t: '最坏也必定是 O(1)', ok: false, why: '与事实相反。' },
        { t: '额外空间一定是严格 O(1)', ok: false, why: '递归栈也占空间。' },
        { t: '一定是稳定排序', ok: false, why: '经典快排通常不稳。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-sort', 'dsa-hash'],
    },
  ],
});

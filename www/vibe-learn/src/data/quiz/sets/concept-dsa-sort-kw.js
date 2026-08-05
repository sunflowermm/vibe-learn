import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-sort-kw',
  title: '基础 · 排序与二分',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '排序', '二分', '基础'],
  relatedNodes: ['dsa-sort'],
  caption: '快排/归并/堆排/二分边界。',
  questions: [
    {
      id: 'concept-dsa-sort-kw:quick',
      q: '快排需要口头补的边界？',
      choices: [
        { t: '平均 n log n，最坏 n²', ok: true, why: '枢轴极端会退化。' },
        { t: '最坏也压在线性 O(n)', ok: false, why: '不符。' },
        { t: '结果序列一定能稳定', ok: false, why: '快排通常不稳。' },
        { t: '平均复杂度是指数阶', ok: false, why: '数量级错。' },
      ],
      relatedNodes: ['dsa-sort'],
    },
    {
      id: 'concept-dsa-sort-kw:merge',
      q: '归并相对快排的突出点？',
      choices: [
        { t: '稳定且最坏 n log n', ok: true, why: '常需额外空间。' },
        { t: '不稳且最坏常 n²', ok: false, why: '说反了。' },
        { t: '禁止任何额外内存', ok: false, why: '归并常要 O(n) 空间。' },
        { t: '只适用于链表排序', ok: false, why: '数组同样常用。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-recurse'],
    },
    {
      id: 'concept-dsa-sort-kw:heap',
      q: '堆排序常见标签？',
      choices: [
        { t: '原地，最坏 n log n', ok: true, why: '常数通常不如快排。' },
        { t: '稳定，平均只需 O(n)', ok: false, why: '堆排通常不稳。' },
        { t: '最坏情况必到 O(n²)', ok: false, why: '堆排最坏仍 n log n。' },
        { t: '只能排序两个元素', ok: false, why: '荒谬。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-tree'],
    },
    {
      id: 'concept-dsa-sort-kw:bin',
      q: '二分查找的前提是？',
      choices: [
        { t: '答案单调（可有序）', ok: true, why: '才能弃半边。' },
        { t: '元素必须全不重复', ok: false, why: '可有重复。' },
        { t: '长度必须 2 的幂', ok: false, why: '无关。' },
        { t: '必须先建平衡树', ok: false, why: '数组可直接二分。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-sort-kw:stable',
      q: '多关键字要保留相等键次序，偏？',
      choices: [
        { t: '稳定排序（如归并）', ok: true, why: '相对次序保留。' },
        { t: '快排一定稳定', ok: false, why: '通常不稳。' },
        { t: '堆排一定稳定', ok: false, why: '通常不稳。' },
        { t: '选择一定稳定', ok: false, why: '通常不稳。' },
      ],
      relatedNodes: ['dsa-sort'],
    },
  ],
});

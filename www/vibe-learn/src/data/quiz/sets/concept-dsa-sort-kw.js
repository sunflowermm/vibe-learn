import { defineQuizSet } from '../schema.js';

/** 基础 · 排序与二分 */
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
        { t: '平均约 n log n，最坏可能到 n²', ok: true, why: '枢轴极端会退化。' },
        { t: '最坏也能压在线性 O(n)', ok: false, why: '最坏可到平方阶。' },
        { t: '结果序列一定是稳定排序', ok: false, why: '经典快排通常不稳定。' },
        { t: '平均复杂度是指数阶 O(2ⁿ)', ok: false, why: '数量级错；平均是 n log n 档。' },
      ],
      relatedNodes: ['dsa-sort'],
    },
    {
      id: 'concept-dsa-sort-kw:merge',
      q: '归并相对快排的突出点？',
      choices: [
        { t: '稳定，且最坏也是 n log n', ok: true, why: '常需额外 O(n) 空间。' },
        { t: '不稳定，且最坏常退化到 n²', ok: false, why: '说反了。' },
        { t: '禁止任何额外内存，必须原地', ok: false, why: '经典归并常要辅助数组。' },
        { t: '只适用于链表，数组上不能归并', ok: false, why: '数组归并同样常用。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-recurse'],
    },
    {
      id: 'concept-dsa-sort-kw:heap',
      q: '堆排序常见标签？',
      choices: [
        { t: '可原地，最坏约 n log n', ok: true, why: '常数通常不如快排好看。' },
        { t: '稳定，且平均只需线性 O(n)', ok: false, why: '堆排通常不稳，也不是线性。' },
        { t: '最坏情况必然会到 O(n²)', ok: false, why: '堆排最坏仍是 n log n 档。' },
        { t: '只能给长度≤2 的数组排序', ok: false, why: '可对任意长度数组建堆排序。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-tree'],
    },
    {
      id: 'concept-dsa-sort-kw:bin',
      q: '二分查找的前提是？',
      choices: [
        { t: '答案单调（或数组有序）', ok: true, why: '才能安全弃掉半边。' },
        { t: '元素必须全部互不相同', ok: false, why: '可有重复，需约定边界。' },
        { t: '长度必须是 2 的幂', ok: false, why: '与能否二分无关。' },
        { t: '必须先建成平衡二叉搜索树', ok: false, why: '有序数组上即可二分。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-sort-kw:stable',
      q: '多关键字要保留相等键次序，偏？',
      choices: [
        { t: '稳定排序（如归并）', ok: true, why: '相对次序得以保留。' },
        { t: '普通快排即可，一定稳定', ok: false, why: '经典快排通常不稳。' },
        { t: '堆排序即可，一定稳定', ok: false, why: '堆排通常不稳。' },
        { t: '选择排序即可，一定稳定', ok: false, why: '选择排序通常不稳。' },
      ],
      relatedNodes: ['dsa-sort'],
    },
  ],
});

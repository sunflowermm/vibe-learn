import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-recurse-kw',
  title: '基础 · 递归与分治',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '递归', '分治'],
  relatedNodes: ['dsa-recurse'],
  caption: '终止、缩小、合并；回溯会撤销。',
  questions: [
    {
      id: 'concept-dsa-recurse-kw:trio',
      q: '递归开口缺一不可的是？',
      choices: [
        { t: '终止、缩小、合并', ok: true, why: '三件套。' },
        { t: '只要全局变量', ok: false, why: '缺终止会炸。' },
        { t: '禁止用于树', ok: false, why: '树是主场。' },
        { t: '最坏必须 O(1)', ok: false, why: '分治常更高阶。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-recurse-kw:divide',
      q: '分治相对朴素循环，多强调？',
      choices: [
        { t: '拆子问题再合并', ok: true, why: '归并/快排模板。' },
        { t: '永远不拆分', ok: false, why: '那就不是分治。' },
        { t: '必须用哈希替代', ok: false, why: '哈希另一类。' },
        { t: '最坏必须 O(1)', ok: false, why: '不符。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-recurse-kw:back',
      q: '子集/排列回溯的核心动作？',
      choices: [
        { t: '试探写入，失败撤销', ok: true, why: 'path + pop。' },
        { t: '只做一次二分', ok: false, why: '不是搜方案。' },
        { t: '禁止使用递归', ok: false, why: '常用递归/栈。' },
        { t: '输入必须已排序', ok: false, why: '排序只为去重等。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-recurse-kw:stack',
      q: '担心递归爆栈时，可靠说法是？',
      choices: [
        { t: '可改显式栈迭代', ok: true, why: '递归↔栈等价。' },
        { t: '语言会无限扩栈', ok: false, why: '栈有限。' },
        { t: '全局变量必安全', ok: false, why: '更易写乱。' },
        { t: '只能故意变慢解', ok: false, why: '先改迭代。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-linear'],
    },
    {
      id: 'concept-dsa-recurse-kw:qs',
      q: '快排与归并同属分治，差异常在？',
      choices: [
        { t: '快排划分，归并先递归', ok: true, why: '稳/空间取舍不同。' },
        { t: '两者最坏都是线性', ok: false, why: '不符。' },
        { t: '两者都一定稳定', ok: false, why: '快排通常不稳。' },
        { t: '两者只能用于图', ok: false, why: '数组主战场。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-sort'],
    },
  ],
});

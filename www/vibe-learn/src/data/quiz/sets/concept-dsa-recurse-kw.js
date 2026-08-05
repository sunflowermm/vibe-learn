import { defineQuizSet } from '../schema.js';

/** 基础 · 递归与分治 */
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
        { t: '终止条件、问题缩小、结果合并', ok: true, why: '三件套。' },
        { t: '只要塞全局变量就够，不必终止', ok: false, why: '缺终止会栈溢出。' },
        { t: '递归禁止用于树结构', ok: false, why: '树正是递归主场。' },
        { t: '递归最坏必须是 O(1)', ok: false, why: '分治常更高阶。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-recurse-kw:divide',
      q: '分治相对朴素单层循环，多强调？',
      choices: [
        { t: '拆成子问题分别求解，再合并', ok: true, why: '归并/快排模板。' },
        { t: '永远不拆分，只扫一遍', ok: false, why: '那就不是分治。' },
        { t: '必须用哈希表替代递归', ok: false, why: '哈希是另一类工具。' },
        { t: '分治最坏必须压成 O(1)', ok: false, why: '常见是 n log n 等。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-sort'],
    },
    {
      id: 'concept-dsa-recurse-kw:back',
      q: '子集/排列回溯的核心动作？',
      choices: [
        { t: '试探写入路径，失败再撤销（pop）', ok: true, why: 'path + 回溯。' },
        { t: '只做一次二分查找就结束', ok: false, why: '回溯是搜方案空间。' },
        { t: '禁止使用递归或显式栈', ok: false, why: '常用递归/栈实现。' },
        { t: '输入数组必须已全局有序', ok: false, why: '排序多为去重服务，非必须。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-recurse-kw:stack',
      q: '担心递归爆栈时，可靠说法是？',
      choices: [
        { t: '可改成显式栈的迭代写法', ok: true, why: '递归 ↔ 栈等价。' },
        { t: '语言保证会无限扩栈', ok: false, why: '调用栈有限。' },
        { t: '改成全局变量就一定安全', ok: false, why: '更易写乱状态。' },
        { t: '只能故意选更慢的算法', ok: false, why: '先改迭代/换算法，不先摆烂。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-linear'],
    },
    {
      id: 'concept-dsa-recurse-kw:qs',
      q: '快排与归并同属分治，差异常在？',
      choices: [
        { t: '快排先划分再递归；归并先递归再合并', ok: true, why: '稳定/空间取舍不同。' },
        { t: '两者最坏都是严格线性 O(n)', ok: false, why: '不符。' },
        { t: '两者都一定是稳定排序', ok: false, why: '快排通常不稳。' },
        { t: '两者只能用于图算法', ok: false, why: '数组排序是主战场。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-sort'],
    },
  ],
});

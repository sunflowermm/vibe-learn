import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-string-kw',
  title: '基础 · 字符串',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '字符串'],
  relatedNodes: ['dsa-string'],
  caption: '计数、滑窗、匹配。',
  questions: [
    {
      id: 'concept-dsa-string-kw:anagram',
      q: '两串是否异位词，开口？',
      choices: [
        { t: '计数相等或排序比', ok: true, why: '频次一致。' },
        { t: '必须最短路', ok: false, why: '过重。' },
        { t: '禁止计数只能递归', ok: false, why: '计数是标准。' },
        { t: '长度必须不同', ok: false, why: '通常要相同。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-hash'],
    },
    {
      id: 'concept-dsa-string-kw:window',
      q: '最长无重复子串，优先？',
      choices: [
        { t: '滑窗加哈希位置', ok: true, why: '线性模板。' },
        { t: '无序硬二分前缀', ok: false, why: '缺单调。' },
        { t: '哈希是否质数', ok: false, why: '不解约束。' },
        { t: '最小生成树', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-string-kw:kmp',
      q: 'KMP 主要解决？',
      choices: [
        { t: '模式串高效匹配', ok: true, why: '前缀函数跳转。' },
        { t: '图的拓扑排序', ok: false, why: '不是图算法。' },
        { t: '保证哈希零冲突', ok: false, why: '另一话题。' },
        { t: '只匹配长度 1', ok: false, why: '一般模式串。' },
      ],
      relatedNodes: ['dsa-string'],
    },
    {
      id: 'concept-dsa-string-kw:trie',
      q: '大量单词按前缀检索，常选？',
      choices: [
        { t: '字典树 Trie', ok: true, why: '前缀路径共享。' },
        { t: '栈匹配括号', ok: false, why: '题型不对。' },
        { t: '并查集按秩', ok: false, why: '不管前缀。' },
        { t: '最小生成树', ok: false, why: '过重。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-tree'],
    },
    {
      id: 'concept-dsa-string-kw:eng',
      q: '生产匹配 vs 面试模板？',
      choices: [
        { t: '生产优先库，面试讲模板', ok: true, why: '工程与开口分流。' },
        { t: '生产必须手写 KMP', ok: false, why: '多数用库。' },
        { t: '字符串禁止哈希', ok: false, why: '计数常用。' },
        { t: '一律先上神经网络', ok: false, why: '面试不靠这开口。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-hot'],
    },
  ],
});

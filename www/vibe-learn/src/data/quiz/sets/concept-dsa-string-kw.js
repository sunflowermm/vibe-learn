import { defineQuizSet } from '../schema.js';

/** 基础 · 字符串 */
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
        { t: '字符计数相等，或排序后比较', ok: true, why: '频次一致即异位。' },
        { t: '必须上最短路算法', ok: false, why: '过重且题型不对。' },
        { t: '禁止计数，只能纯递归逐字符试', ok: false, why: '计数/排序是标准开口。' },
        { t: '两串长度必须不同才可能是异位词', ok: false, why: '异位词通常长度相同。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-hash'],
    },
    {
      id: 'concept-dsa-string-kw:window',
      q: '最长无重复子串，优先？',
      choices: [
        { t: '滑窗 + 哈希记录字符位置', ok: true, why: '近线性模板。' },
        { t: '对无序串硬二分前缀长度', ok: false, why: '缺单调前提。' },
        { t: '先判断哈希表容量是不是质数', ok: false, why: '不解子串约束。' },
        { t: '先建最小生成树再取路径', ok: false, why: '与子串无关。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-string-kw:kmp',
      q: 'KMP 主要解决？',
      choices: [
        { t: '模式串在文本中的高效匹配', ok: true, why: '前缀函数避免回退浪费。' },
        { t: '有向图的拓扑排序', ok: false, why: '不是图排程算法。' },
        { t: '保证哈希表零冲突', ok: false, why: '另一话题。' },
        { t: '只匹配长度为 1 的模式', ok: false, why: '一般长度模式串都适用。' },
      ],
      relatedNodes: ['dsa-string'],
    },
    {
      id: 'concept-dsa-string-kw:trie',
      q: '大量单词按前缀检索，常选？',
      choices: [
        { t: '字典树 Trie（前缀路径共享）', ok: true, why: '前缀查询主场。' },
        { t: '栈做括号匹配代替前缀树', ok: false, why: '括号栈不管前缀检索。' },
        { t: '并查集按秩合并单词', ok: false, why: '不管前缀路径。' },
        { t: '最小生成树连接所有单词', ok: false, why: '过重且题型不对。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-tree'],
    },
    {
      id: 'concept-dsa-string-kw:eng',
      q: '生产环境字符串匹配 vs 面试模板？',
      choices: [
        { t: '生产优先成熟库；面试讲清模板思路', ok: true, why: '工程与开口分流。' },
        { t: '生产必须手写完整 KMP 才能上线', ok: false, why: '多数场景直接用库。' },
        { t: '字符串题一律禁止用哈希计数', ok: false, why: '异位词/频次题常用哈希。' },
        { t: '一律先上神经网络再谈匹配', ok: false, why: '面试开口不靠这。' },
      ],
      relatedNodes: ['dsa-string', 'dsa-hot'],
    },
  ],
});

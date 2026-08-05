import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-bitwise-kw',
  title: '基础 · 位运算',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '位运算'],
  relatedNodes: ['dsa-bitwise'],
  caption: '异或、清最低 1、状压。',
  questions: [
    {
      id: 'concept-dsa-bitwise-kw:xor',
      q: '其余成对、一个单独，位运算解？',
      choices: [
        { t: '全体异或抵消成对', ok: true, why: 'a^a=0。' },
        { t: '并查集合并下标', ok: false, why: '非连通题。' },
        { t: '无序硬二分每个', ok: false, why: '前提不对。' },
        { t: '最短路求单独值', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-bitwise', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-bitwise-kw:n1',
      q: '`n & (n-1)` 常用来？',
      choices: [
        { t: '清掉最低位的 1', ok: true, why: '亦可数 1 个数。' },
        { t: '把 n 变成 n+1', ok: false, why: '不是加一。' },
        { t: '保证哈希零冲突', ok: false, why: '无关。' },
        { t: '转成字符串长度', ok: false, why: '无关。' },
      ],
      relatedNodes: ['dsa-bitwise'],
    },
    {
      id: 'concept-dsa-bitwise-kw:low',
      q: '`n & -n` 通常取出？',
      choices: [
        { t: '最低位的那一个 1', ok: true, why: 'lowbit。' },
        { t: '最高位的 1', ok: false, why: '是最低。' },
        { t: '把 n 清零', ok: false, why: '仅单比特时等于 n。' },
        { t: '字符串长度', ok: false, why: '无关。' },
      ],
      relatedNodes: ['dsa-bitwise'],
    },
    {
      id: 'concept-dsa-bitwise-kw:mask',
      q: '状压 DP 为何常用位？',
      choices: [
        { t: '比特表示子集选中', ok: true, why: '转移用位运算。' },
        { t: '任意 DP 变 O(1)', ok: false, why: '仍可能指数。' },
        { t: '压缩后不能转移', ok: false, why: '仍写转移。' },
        { t: '必须用浮点梯度', ok: false, why: '混淆 ML。' },
      ],
      relatedNodes: ['dsa-bitwise', 'dsa-dp'],
    },
    {
      id: 'concept-dsa-bitwise-kw:odd',
      q: '快速判奇偶常用？',
      choices: [
        { t: 'n & 1 看最低位', ok: true, why: '偶 0 奇 1。' },
        { t: '先转字符串数位', ok: false, why: '过重。' },
        { t: '并查集合并奇偶', ok: false, why: '题型不对。' },
        { t: '只能浮点取模', ok: false, why: '位运算更直接。' },
      ],
      relatedNodes: ['dsa-bitwise'],
    },
  ],
});

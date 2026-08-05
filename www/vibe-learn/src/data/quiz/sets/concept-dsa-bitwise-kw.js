import { defineQuizSet } from '../schema.js';

/** 基础 · 位运算 */
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
      q: '其余成对、一个单独出现，位运算解？',
      choices: [
        { t: '全体异或，成对抵消得答案', ok: true, why: 'a^a=0，0^x=x。' },
        { t: '并查集按下标合并成对', ok: false, why: '不是连通分量题。' },
        { t: '无序数组上对每个值硬二分', ok: false, why: '无序且无单调前提。' },
        { t: '最短路算法求「单独值」', ok: false, why: '与图距离无关。' },
      ],
      relatedNodes: ['dsa-bitwise', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-bitwise-kw:n1',
      q: '`n & (n-1)` 常用来？',
      choices: [
        { t: '清掉最低位的那个 1', ok: true, why: '也可循环统计 1 的个数。' },
        { t: '把 n 变成 n+1', ok: false, why: '不是加一运算。' },
        { t: '保证哈希表从此零冲突', ok: false, why: '与哈希冲突无关。' },
        { t: '直接得到字符串长度', ok: false, why: '与字符串无关。' },
      ],
      relatedNodes: ['dsa-bitwise'],
    },
    {
      id: 'concept-dsa-bitwise-kw:low',
      q: '`n & -n` 通常取出？',
      choices: [
        { t: '最低位的那一个 1（lowbit）', ok: true, why: '树状数组等常用。' },
        { t: '最高位的那一个 1', ok: false, why: '取出的是最低位 1。' },
        { t: '一定把 n 清成 0', ok: false, why: '仅当 n 本身是 2 的幂时结果等于 n。' },
        { t: '字符串的 UTF-8 字节长度', ok: false, why: '与编码长度无关。' },
      ],
      relatedNodes: ['dsa-bitwise'],
    },
    {
      id: 'concept-dsa-bitwise-kw:mask',
      q: '状压 DP 为何常用位掩码？',
      choices: [
        { t: '每个比特表示子集中某元素是否选中', ok: true, why: '转移常配合位运算。' },
        { t: '任意 DP 压完后都变成 O(1)', ok: false, why: '子集枚举仍可能指数。' },
        { t: '压缩成掩码后就不能再写转移', ok: false, why: '仍要写状态转移。' },
        { t: '必须改用浮点梯度下降', ok: false, why: '与机器学习训练无关。' },
      ],
      relatedNodes: ['dsa-bitwise', 'dsa-dp'],
    },
    {
      id: 'concept-dsa-bitwise-kw:odd',
      q: '快速判奇偶常用？',
      choices: [
        { t: 'n & 1 看最低位（偶 0 奇 1）', ok: true, why: '位运算比取模更直接。' },
        { t: '先转成十进制字符串再数位数', ok: false, why: '过重。' },
        { t: '并查集合并奇数与偶数', ok: false, why: '不是连通问题。' },
        { t: '只能用浮点取模判断', ok: false, why: '整数位运算更干净。' },
      ],
      relatedNodes: ['dsa-bitwise'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-dp-kw',
  title: '基础 · DP 与贪心',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', 'DP', '贪心'],
  relatedNodes: ['dsa-dp'],
  caption: '状态转移；贪心要证。',
  questions: [
    {
      id: 'concept-dsa-dp-kw:stairs',
      q: '爬 n 阶（1 或 2），dp[i] 等于？',
      choices: [
        { t: 'dp[i-1] + dp[i-2]', ok: true, why: '两来源相加。' },
        { t: 'max(dp[i-1], i)', ok: false, why: '不是取高度。' },
        { t: 'dp[i-1] * dp[i-2]', ok: false, why: '方案相加。' },
        { t: 'dp[i-1] - dp[i-2]', ok: false, why: '非差分。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-dp-kw:opt',
      q: '适合 DP 的关键性质是？',
      choices: [
        { t: '最优子结构+重叠子问题', ok: true, why: '可复用子答案。' },
        { t: '输入长度必须质数', ok: false, why: '无关。' },
        { t: '禁止任何记忆化', ok: false, why: '记忆化正消重叠。' },
        { t: '只能用于 KMP', ok: false, why: '域更广。' },
      ],
      relatedNodes: ['dsa-dp'],
    },
    {
      id: 'concept-dsa-dp-kw:greedy',
      q: '贪心相对 DP，面试要补？',
      choices: [
        { t: '局部最优能否推全局', ok: true, why: '要证明或举反例。' },
        { t: '贪心永远优于 DP', ok: false, why: '错误。' },
        { t: '贪心禁止先排序', ok: false, why: '常先排序。' },
        { t: '贪心只用在字符串', ok: false, why: '域很广。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-dp-kw:knapsack',
      q: '0-1 背包「每件至多一次」对吗？',
      choices: [
        { t: '对，每件选或不选', ok: true, why: '区别于完全背包。' },
        { t: '错，每件可用无限次', ok: false, why: '那是完全背包。' },
        { t: '错，必须用并查集', ok: false, why: '题型不对。' },
        { t: '错，必须 Dijkstra', ok: false, why: '非主路径。' },
      ],
      relatedNodes: ['dsa-dp'],
    },
    {
      id: 'concept-dsa-dp-kw:vs',
      q: '子数组约束能线性维护时，先想？',
      choices: [
        { t: '滑窗/双指针', ok: true, why: '能 O(n) 就别先重 DP。' },
        { t: '一律上状压 DP', ok: false, why: '可能过重。' },
        { t: '无序硬二分', ok: false, why: '前提常不成立。' },
        { t: '只建最小生成树', ok: false, why: '题型不对。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-two-pointers'],
    },
  ],
});

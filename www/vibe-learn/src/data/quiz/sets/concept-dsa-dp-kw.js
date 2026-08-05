import { defineQuizSet } from '../schema.js';

/** 基础 · DP 与贪心 */
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
      q: '爬 n 阶（每次 1 或 2），方案数 dp[i] 等于？',
      choices: [
        { t: 'dp[i-1] + dp[i-2]（两来源相加）', ok: true, why: '斐波那契型递推。' },
        { t: 'max(dp[i-1], i)（取更大高度）', ok: false, why: '求的是方案数，不是高度。' },
        { t: 'dp[i-1] * dp[i-2]（方案相乘）', ok: false, why: '互斥来源应相加。' },
        { t: 'dp[i-1] - dp[i-2]（方案差分）', ok: false, why: '不是差分关系。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-dp-kw:opt',
      q: '适合 DP 的关键性质是？',
      choices: [
        { t: '最优子结构 + 重叠子问题', ok: true, why: '子答案可复用。' },
        { t: '输入长度必须是质数', ok: false, why: '与 DP 适用性无关。' },
        { t: '禁止任何记忆化 / 表缓存', ok: false, why: '记忆化正是消除重叠计算。' },
        { t: '只能用于 KMP 字符串匹配', ok: false, why: 'DP 域远大于 KMP。' },
      ],
      relatedNodes: ['dsa-dp'],
    },
    {
      id: 'concept-dsa-dp-kw:greedy',
      q: '贪心相对 DP，面试要补的一句是？',
      choices: [
        { t: '局部最优能否推出全局最优（证明或反例）', ok: true, why: '贪心要能辩护。' },
        { t: '贪心永远优于 DP，不必再比', ok: false, why: '许多题贪心不成立，只能 DP。' },
        { t: '贪心禁止先排序，排序就不叫贪心', ok: false, why: '区间/活动选择常先排序。' },
        { t: '贪心只能用在字符串题', ok: false, why: '调度、背包特例、图等都常见。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-dp-kw:knapsack',
      q: '0-1 背包「每件至多选一次」对吗？',
      choices: [
        { t: '对：每件选或不选，不能重复拿', ok: true, why: '区别于完全背包。' },
        { t: '错：每件可用无限次', ok: false, why: '那是完全背包。' },
        { t: '错：0-1 背包必须改用并查集', ok: false, why: '背包是 DP/贪心特例，不是 UF。' },
        { t: '错：0-1 背包必须跑 Dijkstra', ok: false, why: '不是最短路主路径。' },
      ],
      relatedNodes: ['dsa-dp'],
    },
    {
      id: 'concept-dsa-dp-kw:vs',
      q: '子数组约束能线性维护时，先想？',
      choices: [
        { t: '滑窗 / 双指针（能 O(n) 就别先重 DP）', ok: true, why: '先认约束。' },
        { t: '一律直接上状压 DP，不管约束是否可线性维护', ok: false, why: '可能过重。' },
        { t: '无序数组上硬套二分答案长度，当作通用解', ok: false, why: '单调前提常不成立。' },
        { t: '只建最小生成树再取值，代替区间约束求解', ok: false, why: '子数组约束不是 MST。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-two-pointers'],
    },
  ],
});

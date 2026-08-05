import { defineQuizSet } from '../schema.js';

/**
 * DSA 一面开口：对齐高频模板题型（LeetCode 热题 / 大厂一面）。
 * 命题：mcq-expert — 一题一事、应用层、选项等长、干扰=新手误判。
 */
export default defineQuizSet({
  id: 'interview-dsa-open',
  title: '大厂 · 数据结构与算法一面',
  kind: 'interview',
  domain: 'dsa',
  tags: ['DSA', '一面', '模板'],
  relatedNodes: ['dsa-hot', 'dsa-complexity', 'dsa-linear', 'dsa-hash'],
  caption: '复杂度边界 · 结构选型 · 高频模板（等长选项，禁三短一长）。',
  questions: [
    {
      id: 'interview-dsa-open:n2',
      q: '长度 n 的数组做双重完整嵌套扫描，时间复杂度通常记为？',
      choices: [
        { t: 'O(n²)', ok: true, why: '两层都随 n 增长，相乘得平方阶。' },
        { t: 'O(n)', ok: false, why: '嵌套是相乘，不是只算一层。' },
        { t: 'O(1)', ok: false, why: '次数随 n 变，不是常数。' },
        { t: 'O(log n)', ok: false, why: '完整扫描不会每次折半。' },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:hash-o1',
      q: '说「哈希查找 O(1)」时，更严谨的说法是？',
      choices: [
        { t: '平均 O(1)，冲突可退化', ok: true, why: '要报均摊与最坏，不当口号。' },
        { t: '最坏情况也恒 O(1)', ok: false, why: '冲突严重时可到 O(n)。' },
        { t: '占用空间也恒 O(1)', ok: false, why: '存 n 个元素，空间随 n。' },
        { t: '哈希不必谈复杂度', ok: false, why: '仍用大 O 描述增长。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity'],
    },
    {
      id: 'interview-dsa-open:two-sum',
      q: '无序数组两数之和要从 O(n²) 压到近线性，首选？',
      choices: [
        { t: '一遍扫描，哈希记已见', ok: true, why: '查 target−x；空间换时间。' },
        { t: '无序数组上直接二分', ok: false, why: '二分要有序/单调。' },
        { t: '小根堆做优先队列', ok: false, why: '不是两数之和主路径。' },
        { t: '笛卡尔树再 DFS', ok: false, why: '过重且非标准解。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:brackets',
      q: '校验括号嵌套是否合法闭合，首选结构？',
      choices: [
        { t: '栈：左入栈，右对顶', ok: true, why: '后开先关对应 LIFO。' },
        { t: '只数左右括号个数', ok: false, why: ')( 个数等但非法。' },
        { t: '队列按进入顺序配', ok: false, why: 'FIFO 对不上嵌套。' },
        { t: '排序后逐字比较', ok: false, why: '丢失位置关系。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:cycle',
      q: '单链表判环且额外空间 O(1)，经典做法是？',
      choices: [
        { t: '快慢指针，相遇有环', ok: true, why: 'Floyd；一面高频。' },
        { t: '先排序再两两比较', ok: false, why: '链表不便高效排序。' },
        { t: '整表拷成数组再查', ok: false, why: '空间 O(n)，多余。' },
        { t: '层序队列扫整表', ok: false, why: '层序是树/图概念。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:lru',
      q: 'LRU 要求 get/put 平均 O(1)，标准组件是？',
      choices: [
        { t: '哈希表加双向链表', ok: true, why: '哈希定位，链表调序。' },
        { t: '动态数组每次挪尾', ok: false, why: '中间删插要搬移。' },
        { t: '平衡树只存全部键', ok: false, why: '多为 O(log n)。' },
        { t: '单链表从头线性找', ok: false, why: '查找是 O(n)。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:bfs',
      q: '无权网格求最少步数到终点，优先？',
      choices: [
        { t: 'BFS 队列层层扩展', ok: true, why: '无权最短层数用 BFS。' },
        { t: 'DFS 一条路走到底', ok: false, why: '先探到的未必最短。' },
        { t: '无序下标硬套二分', ok: false, why: '距离不是有序下标。' },
        { t: '先按边权全排序', ok: false, why: '无权题不必排边权。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:topo',
      q: '课程有先后依赖，有环则无法修完。应使用？',
      choices: [
        { t: '拓扑排序并检测环', ok: true, why: '有向依赖图排程模板。' },
        { t: '按课号直接二分', ok: false, why: '编号有序≠可排依赖。' },
        { t: '按课名字典序排', ok: false, why: '字典序不是拓扑序。' },
        { t: '堆求最短课名', ok: false, why: '不是最短路题型。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:window',
      q: '最长无重复字符子串，近线性标准解是？',
      choices: [
        { t: '滑窗右扩，重复左收', ok: true, why: '哈希记位置；字符串高频。' },
        { t: '无序串上直接二分', ok: false, why: '无单调不能硬二分。' },
        { t: '先建最小生成树', ok: false, why: '与子串约束无关。' },
        { t: '对字母做拓扑排序', ok: false, why: '字母无修课依赖。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:uf',
      q: '边动态加入并反复问是否连通，首选？',
      choices: [
        { t: '并查集维护连通', ok: true, why: '动态连通经典结构。' },
        { t: '每次全图最短路', ok: false, why: '连通不必最短路。' },
        { t: '点编号上硬二分', ok: false, why: '编号有序≠连通。' },
        { t: '栈匹配代替连通', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:dp',
      q: '爬 n 阶（每次 1 或 2），方案数 dp[i] 等于？',
      choices: [
        { t: 'dp[i-1] + dp[i-2]', ok: true, why: '只能从上一或上二阶来。' },
        { t: 'max(dp[i-1], i)', ok: false, why: '求方案数不是取最大高度。' },
        { t: 'dp[i-1] * dp[i-2]', ok: false, why: '分支方案是相加。' },
        { t: 'dp[i-1] - dp[i-2]', ok: false, why: '不是差分关系。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:merge',
      q: '要稳定且最坏也 O(n log n) 的排序，更稳妥？',
      choices: [
        { t: '归并排序', ok: true, why: '稳定且最坏 n log n。' },
        { t: '快速排序', ok: false, why: '不稳，最坏可 n²。' },
        { t: '冒泡排序', ok: false, why: '平均 O(n²)。' },
        { t: '选择排序', ok: false, why: '平均 O(n²) 且不稳。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-recurse', 'dsa-hot'],
    },
  ],
});

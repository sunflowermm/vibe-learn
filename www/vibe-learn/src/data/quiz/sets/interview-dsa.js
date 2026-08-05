import { defineQuizSet } from '../schema.js';

/**
 * DSA 一面开口：对齐高频模板题型（LeetCode 热题 / 大厂一面）。
 * 命题：mcq-expert — 一题一事、应用层、似真误判（错误结构/复杂度）
 */
export default defineQuizSet({
  id: 'interview-dsa-open',
  title: '大厂 · 数据结构与算法一面',
  kind: 'interview',
  domain: 'dsa',
  tags: ['DSA', '一面', '模板'],
  relatedNodes: ['dsa-hot', 'dsa-complexity', 'dsa-linear', 'dsa-hash'],
  caption: '复杂度边界 · 结构选型 · 高频模板。',
  questions: [
    {
      id: 'interview-dsa-open:n2',
      q: '长度 n 的数组做双重完整嵌套扫描，时间复杂度通常记为？',
      choices: [
        {
          t: 'O(n²)：两层循环都随 n 增长，次数相乘',
          ok: true,
          why: '嵌套完整扫描是平方阶，不是只算一层。',
        },
        {
          t: 'O(n)：只按外层循环计数，内层可忽略',
          ok: false,
          why: '内层同样随 n 增长，应相乘。',
        },
        {
          t: 'O(1)：数组下标访问是常数，整体也是常数',
          ok: false,
          why: '单次访问是 O(1)，完整双重扫描次数随 n 变。',
        },
        {
          t: 'O(log n)：每次扫描都会把问题规模折半',
          ok: false,
          why: '完整扫描不会每次折半；折半是二分等算法。',
        },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:hash-o1',
      q: '说「哈希查找 O(1)」时，更严谨的说法是？',
      choices: [
        {
          t: '平均 / 均摊常为 O(1)，冲突严重时可能退化到 O(n)',
          ok: true,
          why: '面试要报均摊与最坏，不当口号。',
        },
        {
          t: '最坏情况下也恒为 O(1)，与哈希冲突严重程度无关',
          ok: false,
          why: '链表法冲突严重时可到 O(n)。',
        },
        {
          t: '占用空间也恒为 O(1)，与存了多少个元素无关',
          ok: false,
          why: '存 n 个元素，空间通常随 n 增长。',
        },
        {
          t: '哈希结构不必讨论复杂度，只看实现语言就够了',
          ok: false,
          why: '仍用大 O 描述随输入规模的增长。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity'],
    },
    {
      id: 'interview-dsa-open:two-sum',
      q: '无序数组两数之和（要返回下标）要从 O(n²) 压到近线性，首选？',
      choices: [
        {
          t: '一遍扫描，用哈希表记录已见值及其下标',
          ok: true,
          why: '查 target−x；空间换时间，保留下标。',
        },
        {
          t: '对无序数组直接二分查找另一个加数',
          ok: false,
          why: '二分要求有序或单调结构。',
        },
        {
          t: '先排序再双指针（若题面必须保留原下标则不够）',
          ok: false,
          why: '排序会打乱下标；要下标时仍优先哈希。',
        },
        {
          t: '建小根堆当优先队列，逐个弹出凑对',
          ok: false,
          why: '不是两数之和的标准近线性路径。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:brackets',
      q: '校验括号嵌套是否合法闭合，首选结构？',
      choices: [
        {
          t: '栈：遇左括号入栈，遇右括号与栈顶配对弹出',
          ok: true,
          why: '后开先关对应 LIFO。',
        },
        {
          t: '只统计左右括号个数是否相等即可判定合法',
          ok: false,
          why: '如 )( 个数相等但非法。',
        },
        {
          t: '用队列按进入顺序依次配对左右括号',
          ok: false,
          why: 'FIFO 对不上嵌套的后进先出。',
        },
        {
          t: '把字符串排序后再逐字符比较是否成对',
          ok: false,
          why: '丢失位置与嵌套关系。',
        },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:cycle',
      q: '单链表判环，且额外空间要求 O(1)，经典做法是？',
      choices: [
        {
          t: '快慢指针（Floyd）：相遇则有环',
          ok: true,
          why: '一面高频模板。',
        },
        {
          t: '先把链表排序，再两两比较相邻结点',
          ok: false,
          why: '链表不便高效原地排序，也不是判环标准解。',
        },
        {
          t: '把整表拷成数组，再用哈希查重复地址',
          ok: false,
          why: '空间 O(n)，不满足 O(1) 额外空间。',
        },
        {
          t: '用层序遍历队列扫完整张表',
          ok: false,
          why: '层序是树/图概念，不是链表判环模板。',
        },
      ],
      relatedNodes: ['dsa-linear', 'dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:lru',
      q: '实现 LRU，要求 get/put 平均 O(1)，标准组合是？',
      choices: [
        {
          t: '哈希表 + 双向链表：哈希定位，链表维护新旧顺序',
          ok: true,
          why: '一面标准答法。',
        },
        {
          t: '只用动态数组，每次命中就把元素搬到尾部',
          ok: false,
          why: '中间删插要搬移，难稳定 O(1)。',
        },
        {
          t: '只用平衡二叉搜索树存全部键值对',
          ok: false,
          why: '多为 O(log n)，且还要单独维护「最近使用」语义。',
        },
        {
          t: '只用单链表，每次从头线性扫描查找键',
          ok: false,
          why: '查找是 O(n)。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:bfs',
      q: '无权网格求从起点到终点的最少步数，优先？',
      choices: [
        {
          t: 'BFS：队列按层扩展，第一次到达即最短',
          ok: true,
          why: '无权最短路径用 BFS。',
        },
        {
          t: 'DFS：一条路走到底，回溯时碰运气找最短',
          ok: false,
          why: '先探到的路径未必最短。',
        },
        {
          t: '对无序网格下标硬套二分查找',
          ok: false,
          why: '距离不是有序下标空间。',
        },
        {
          t: '先按边权把所有边排序再跑 Kruskal',
          ok: false,
          why: '无权最短路不必建最小生成树。',
        },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:topo',
      q: '课程有先后依赖，存在环则无法修完。应使用？',
      choices: [
        {
          t: '拓扑排序，并在过程中检测是否有环',
          ok: true,
          why: '有向依赖图排程模板。',
        },
        {
          t: '按课号大小直接二分查找下一门课',
          ok: false,
          why: '编号有序不等于依赖可排。',
        },
        {
          t: '按课名字典序排序当作修课顺序',
          ok: false,
          why: '字典序不是拓扑序。',
        },
        {
          t: '用堆求「最短课名」，当作最优修课序列',
          ok: false,
          why: '不是最短路 / 字符串长度题型。',
        },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:window',
      q: '最长无重复字符子串，近线性标准解是？',
      choices: [
        {
          t: '滑动窗口：右指针扩张，出现重复则左指针收缩',
          ok: true,
          why: '哈希记字符位置；字符串高频。',
        },
        {
          t: '对无序字符串直接二分答案长度',
          ok: false,
          why: '无单调性时不能硬二分（除非额外判定可证）。',
        },
        {
          t: '先把字符关系建成最小生成树再求路径',
          ok: false,
          why: '与子串约束无关。',
        },
        {
          t: '对字母做拓扑排序得到最长合法子串',
          ok: false,
          why: '字母之间没有修课式依赖。',
        },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:uf',
      q: '边会动态加入，并反复询问两点是否连通。首选？',
      choices: [
        {
          t: '并查集（Union-Find）维护连通分量',
          ok: true,
          why: '动态连通经典结构。',
        },
        {
          t: '每次询问都跑一遍全图最短路',
          ok: false,
          why: '只需连通性，不必最短路，也太慢。',
        },
        {
          t: '对点编号做二分，编号接近即视为连通',
          ok: false,
          why: '编号有序不等于图连通。',
        },
        {
          t: '用括号匹配栈代替连通分量的维护',
          ok: false,
          why: '括号栈不管动态连通。',
        },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:dp',
      q: '爬 n 阶楼梯（每次 1 或 2 阶），方案数 dp[i] 通常等于？',
      choices: [
        {
          t: 'dp[i-1] + dp[i-2]（只能从上一阶或上两阶过来）',
          ok: true,
          why: '斐波那契型递推。',
        },
        {
          t: 'max(dp[i-1], i)（取更大高度即可，与方案无关）',
          ok: false,
          why: '求的是方案数，不是最大高度。',
        },
        {
          t: 'dp[i-1] * dp[i-2]（两段方案数直接相乘）',
          ok: false,
          why: '互斥来源应相加，不是相乘。',
        },
        {
          t: 'dp[i-1] - dp[i-2]（用方案数做差分）',
          ok: false,
          why: '不是差分关系。',
        },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:merge',
      q: '既要稳定，又要最坏也 O(n log n) 的排序，更稳妥？',
      choices: [
        {
          t: '归并排序：稳定，最坏 O(n log n)',
          ok: true,
          why: '面试常与快排对比稳定性与最坏界。',
        },
        {
          t: '快速排序：平均很快，因此最坏也一定是 O(n log n)',
          ok: false,
          why: '不稳定，最坏可退化到 O(n²)。',
        },
        {
          t: '冒泡排序：实现简单，平均也是 O(n log n)',
          ok: false,
          why: '平均 O(n²)。',
        },
        {
          t: '选择排序：稳定且最坏 O(n log n)',
          ok: false,
          why: '平均/最坏 O(n²)，经典实现也不稳定。',
        },
      ],
      relatedNodes: ['dsa-sort', 'dsa-recurse', 'dsa-hot'],
    },
  ],
});

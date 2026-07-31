import { defineQuizSet } from '../schema.js';

/**
 * DSA 场景：把结构选进真实题型/工程直觉。
 * 名词全表见 concept-dsa-*-kw；开口见 interview-dsa-open；选型见 structures。
 */
export default defineQuizSet({
  id: 'concept-dsa-scenarios',
  title: '场景 · DSA 题型落地',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '场景', '模板'],
  relatedNodes: ['dsa-hot', 'dsa-linear', 'dsa-hash'],
  caption: '括号/两数之和/拓扑/二分/滑窗——先认题型再套模板。',
  questions: [
    {
      id: 'concept-dsa-scenarios:brackets',
      q: '校验「配置括号/标签是否正确闭合」（含嵌套），首选结构？',
      choices: [
        {
          t: '栈：遇左入栈，遇右与栈顶匹配；结束时空栈才合法',
          ok: true,
          why: '嵌套「后开先关」对应 LIFO；队列 FIFO 对不上。',
        },
        {
          t: '只数左右括号个数相等即可',
          ok: false,
          why: ')( 个数相等但非法；顺序也要合法。',
        },
        {
          t: '必须建平衡二叉搜索树再中序',
          ok: false,
          why: '过重且不表达嵌套匹配。',
        },
        {
          t: '用哈希表存所有字符位置，不必栈',
          ok: false,
          why: '哈希找不到「最近未闭合」的顺序关系。',
        },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
      tags: ['场景'],
    },
    {
      id: 'concept-dsa-scenarios:two-sum',
      q: '要从列表里找「两数之和等于 target」，从 O(n²) 压到近线性，怎么做？',
      choices: [
        {
          t: '边扫边用哈希表记「值→下标」，查 target−x 是否出现过',
          ok: true,
          why: '空间换时间；与选型课一致。',
        },
        {
          t: '再套一层同长循环到 O(n³)',
          ok: false,
          why: '更慢，方向反了。',
        },
        {
          t: '先全排序再对每个元素做完整线性扫，仍号称 O(n)',
          ok: false,
          why: '排序 n log n，再加扫描也不是「一遍哈希」的经典路径。',
        },
        {
          t: '删掉一半输入假装复杂度降了',
          ok: false,
          why: '改输入规模不是算法优化，面试也不认。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity', 'dsa-hot'],
      tags: ['场景'],
    },
    {
      id: 'concept-dsa-scenarios:topo',
      q: '插件/任务有「A 依赖 B」边，要求合法启动顺序，更贴哪类模型？',
      choices: [
        {
          t: '有向无环图 + 拓扑排序（或检测环）',
          ok: true,
          why: '依赖=有向边；有环则无法线性化。',
        },
        {
          t: '只对任务名做字典序排序即可',
          ok: false,
          why: '字典序不尊重依赖边。',
        },
        {
          t: '用二分查找依赖是否存在',
          ok: false,
          why: '二分要有序区间；这里是图上的先后约束。',
        },
        {
          t: '一律随机打乱启动，靠重试',
          ok: false,
          why: '不稳定且可能永远撞环。',
        },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
      tags: ['场景', '进阶'],
    },
    {
      id: 'concept-dsa-scenarios:bfs-levels',
      q: '无权图上「最少跳数/层数」到目标，经典开口？',
      choices: [
        {
          t: 'BFS 按层扩展；第一次到达即最短层数',
          ok: true,
          why: '无权最短路径模板；带权才优先考虑 Dijkstra 等。',
        },
        {
          t: 'DFS 一定比 BFS 更短',
          ok: false,
          why: 'DFS 不保证最少层数。',
        },
        {
          t: '必须动态规划四维状态',
          ok: false,
          why: '未必是 DP；先认图遍历。',
        },
        {
          t: '堆排序图的邻接表即可',
          ok: false,
          why: '排序邻接表不给出最短路径。',
        },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
      tags: ['场景'],
    },
    {
      id: 'concept-dsa-scenarios:binsearch',
      q: '版本号/日志时间戳已有序，查「第一个满足条件的位置」，优先？',
      choices: [
        {
          t: '二分查找（或二分答案）：在单调区间上折半',
          ok: true,
          why: '有序/单调是二分前提；无序不能硬套。',
        },
        {
          t: '无脑全表哈希，因为哈希永远更快',
          ok: false,
          why: '已有序时二分 O(log n) 常更省空间与常数。',
        },
        {
          t: '冒泡排序后再线性扫，仍称 O(log n)',
          ok: false,
          why: '排序已是 n log n，且说法不严谨。',
        },
        {
          t: '建完全二叉树只为打印中序',
          ok: false,
          why: '与「有序数组上找边界」题型不符。',
        },
      ],
      relatedNodes: ['dsa-sort', 'dsa-complexity'],
      tags: ['场景'],
    },
    {
      id: 'concept-dsa-scenarios:sliding',
      q: '「连续子数组最长满足某条件」一类题，常先想到？',
      choices: [
        {
          t: '滑动窗口 / 双指针：维护当前窗口左右界并扩缩',
          ok: true,
          why: '连续区间 + 可单调维护时窗口很香。',
        },
        {
          t: '只能全排列枚举所有子数组下标对',
          ok: false,
          why: '暴力可行但常超时；先想窗口。',
        },
        {
          t: '拓扑排序窗口边界',
          ok: false,
          why: '拓扑管依赖序，不管连续子数组。',
        },
        {
          t: '把数组当图做最小生成树',
          ok: false,
          why: 'MST 解决连通代价，不是连续子数组窗口。',
        },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
      tags: ['场景', '进阶'],
    },
    {
      id: 'concept-dsa-scenarios:tree-dfs',
      q: '嵌套菜单/文件系统目录树上「收集所有叶子路径」，常见写法？',
      choices: [
        {
          t: '树的 DFS/递归：带路径状态深入，到叶子记录',
          ok: true,
          why: '树是特例图；递归天然贴嵌套结构。',
        },
        {
          t: '必须先转成哈希表丢掉父子关系',
          ok: false,
          why: '丢掉边就无法还原路径。',
        },
        {
          t: '只能用排序关键字替代遍历',
          ok: false,
          why: '排序不替代树遍历。',
        },
        {
          t: '用栈模拟括号匹配即可得全部路径',
          ok: false,
          why: '括号题另一类；目录树要沿边递归/显式栈 DFS。',
        },
      ],
      relatedNodes: ['dsa-tree', 'dsa-graph'],
      tags: ['场景'],
    },
    {
      id: 'concept-dsa-scenarios:topk',
      q: '实时流里维护「当前 Top-K 热度」，内存要紧时更贴？',
      choices: [
        {
          t: '大小为 K 的堆（常小根堆）维护候选；或计数后堆/快选',
          ok: true,
          why: '不必全局全排序；堆适合 Top-K。',
        },
        {
          t: '每次来一个元素就对全部历史做稳定归并',
          ok: false,
          why: '过重；流式场景通常维护有界结构。',
        },
        {
          t: '禁止使用堆，只能冒泡到世界末日',
          ok: false,
          why: '堆正是本题型工具。',
        },
        {
          t: '用 DFS 找最短路径代替 Top-K',
          ok: false,
          why: '最短路径管距离，不管频率 Top-K。',
        },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hot'],
      tags: ['场景', '进阶'],
    },
    {
      id: 'concept-dsa-scenarios:dp-or-not',
      q: '背包/路径计数「最优/方案数」且有重叠子问题，开口三问？',
      choices: [
        {
          t: '状态定义是什么、转移怎么写、边界与遍历顺序',
          ok: true,
          why: 'DP 起手式；细节见选型与全表。',
        },
        {
          t: '循环层数越多就越是 DP',
          ok: false,
          why: '层数不是充分条件。',
        },
        {
          t: '凡递归都自动叫 DP，不必重叠子问题',
          ok: false,
          why: '还要最优子结构/重叠等条件。',
        },
        {
          t: 'DP 禁止记忆化，只能迭代',
          ok: false,
          why: '记忆化是自顶向下 DP。',
        },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
      tags: ['场景'],
    },
    {
      id: 'concept-dsa-scenarios:dont-overdo',
      q: '业务里只有几十条配置、偶尔查一次，面试外工程选型？',
      choices: [
        {
          t: '可读的线性结构/现成 API 往往够用；别先上复杂图算法炫技',
          ok: true,
          why: 'DSA 服务约束；规模与变更频率决定是否上重型结构。',
        },
        {
          t: '必须自研红黑树否则不专业',
          ok: false,
          why: '语言标准库已有；业务优先清晰。',
        },
        {
          t: '一律 O(2ⁿ) 回溯才正确',
          ok: false,
          why: '指数级常不可接受。',
        },
        {
          t: '禁止测量，凭感觉选最炫复杂度',
          ok: false,
          why: '先估规模与瓶颈，再选型。',
        },
      ],
      relatedNodes: ['dsa-complexity', 'dsa-hot', 'craft-debug'],
      tags: ['场景', '进阶'],
    },
  ],
});

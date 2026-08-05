import { defineQuizSet } from '../schema.js';

/** 场景 · DSA 题型落地；干扰项=该题型一面常见误判（不用万用填充） */
export default defineQuizSet({
  id: 'concept-dsa-scenarios',
  title: '场景 · DSA 题型落地',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '场景', '模板'],
  relatedNodes: ['dsa-hot', 'dsa-linear', 'dsa-hash'],
  caption: '先认题型再套模板；干扰项来自一面常见误判。',
  questions: [
    {
      id: 'concept-dsa-scenarios:brackets',
      q: '配置里括号/标签要校验嵌套闭合，首选？',
      choices: [
        { t: '栈：遇左入栈，遇右与栈顶配对弹出', ok: true, why: '嵌套后开先关，对应 LIFO。' },
        { t: '只统计左右括号个数是否相等', ok: false, why: ')( 个数相等但非法。' },
        { t: '用队列按进入顺序依次配对', ok: false, why: 'FIFO 对不上嵌套的后进先出。' },
        { t: '把字符串排序后再逐字符比较', ok: false, why: '丢失位置与嵌套关系。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:two-sum',
      q: '无序列表找两数之和=target（要下标），近线性怎么做？',
      choices: [
        { t: '一遍扫描，哈希表记已见值与下标', ok: true, why: '查 target−x 是否出现过。' },
        { t: '对无序数组直接二分找另一个加数', ok: false, why: '二分要有序或单调前提。' },
        { t: '先排序再双指针（若必须保留原下标则不够）', ok: false, why: '排序打乱下标；要下标优先哈希。' },
        { t: '建小根堆逐个弹出凑对', ok: false, why: '不是两数之和标准近线性路径。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:island',
      q: '二维网格数岛屿（四连通），常用？',
      choices: [
        { t: 'DFS/BFS 沉岛：访过标记，新分量计数', ok: true, why: '连通块遍历经典。' },
        { t: '把格子值当关键字做二分查找整块连通区域', ok: false, why: '网格连通不是有序查找。' },
        { t: '只对每行排序后再逐行比较，当作已连通', ok: false, why: '排序打乱邻接，丢连通信息。' },
        { t: '用并查集按格子值大小合并，而不是按邻接', ok: false, why: '应按邻接合并，不是按值大小。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:course',
      q: '选课有先修约束，判断能否修完？',
      choices: [
        { t: '拓扑排序，有环则无法修完', ok: true, why: '依赖图有环=死锁。' },
        { t: '按课号对课程做二分查找', ok: false, why: '编号大小≠依赖方向。' },
        { t: '按课名字典序排完即可上课', ok: false, why: '字典序≠拓扑序。' },
        { t: '最短路求「最少学分」代替判环', ok: false, why: '先问能否修完，不是学分最优。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:binsearch',
      q: '对答案做二分前，序列/判定要满足？',
      choices: [
        { t: '对答案单调（或数组有序）', ok: true, why: '才能安全丢掉半边。' },
        { t: '元素必须全部互不相同', ok: false, why: '可有重复，需约定左右边界。' },
        { t: '长度必须是 2 的幂', ok: false, why: '与能否二分无关。' },
        { t: '必须先建成平衡二叉搜索树', ok: false, why: '有序数组上即可二分。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:window',
      q: '最长无重复字符子串，近线性模板是？',
      choices: [
        { t: '滑窗右扩；窗口内重复则左边界收', ok: true, why: '哈希/数组维护窗口字符。' },
        { t: '对无序串硬套二分找最长', ok: false, why: '缺单调前提。' },
        { t: '先建最小生成树再取路径', ok: false, why: '与子串无关。' },
        { t: '对字符做拓扑排序再拼接', ok: false, why: '合法子串靠窗口，不是拓扑。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:topk',
      q: '海量数据取频率 TopK，常用？',
      choices: [
        { t: '哈希计数，再维护大小为 K 的堆', ok: true, why: '计数+堆是一面常见口径。' },
        { t: '无序数组下标直接二分出第 K', ok: false, why: '无序不能按名次二分下标。' },
        { t: '只能全排序再取前 K，没有更轻写法', ok: false, why: '全排可行但更重，非必需。' },
        { t: '用栈匹配括号顺便得到 TopK', ok: false, why: '频率统计不是括号匹配。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:reverse',
      q: '反转单链表，迭代三指针通常指？',
      choices: [
        { t: 'prev、cur、next（扳指针再前移）', ok: true, why: '先存 next，再 cur.next=prev。' },
        { t: 'root、left、right（二叉树用语）', ok: false, why: '链表反转不是树的左右孩。' },
        { t: 'lo、mid、hi（三分/二分用语）', ok: false, why: '那是区间划分，不是链表指针。' },
        { t: 'find、union、rank（并查集用语）', ok: false, why: '并查集不管链表方向。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:level',
      q: '二叉树按层输出节点，首选？',
      choices: [
        { t: '队列做层序 BFS', ok: true, why: '树的层序遍历=BFS。' },
        { t: '只递归先序遍历再输出', ok: false, why: '先序是根左右，不是按层。' },
        { t: '中序遍历完再对结果全局排序', ok: false, why: '丢掉层级信息，还多余。' },
        { t: '并查集合并左右孩子当一层', ok: false, why: '层序靠队列分层，不是并查集。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:stable',
      q: '多关键字排序要保留相等键的相对次序，应偏？',
      choices: [
        { t: '稳定排序（如归并）', ok: true, why: '稳定才保留相等键相对序。' },
        { t: '普通快排即可，一定稳定', ok: false, why: '经典快排通常不稳定。' },
        { t: '堆排序即可，一定稳定', ok: false, why: '堆排通常不稳定。' },
        { t: '选择排序即可，一定稳定', ok: false, why: '选择排序通常不稳定。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:median',
      q: '无序数组找第 K 大，一面常见优化？',
      choices: [
        { t: '大小为 K 的堆，或快选分区', ok: true, why: '全排更重；TopK/快选常见。' },
        { t: '无序数组下标直接二分第 K', ok: false, why: '无序不能按名次二分下标。' },
        { t: '用栈弹出第 K 个元素即答案', ok: false, why: '栈序≠第 K 大。' },
        { t: '并查集合并前 K 个下标', ok: false, why: '并查集不管名次统计。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:merge-list',
      q: '合并两条有序链表，首选思路？',
      choices: [
        { t: '双指针每次取较小节点接上', ok: true, why: '利用有序，一次扫描。' },
        { t: '先打乱两条链再整体排序', ok: false, why: '丢掉已有序优势。' },
        { t: '丢进哈希表再按插入序拼回', ok: false, why: '哈希不保证有序输出。' },
        { t: '对节点值做拓扑排序', ok: false, why: '链表合并不是依赖图排程。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:path-sum',
      q: '二叉树根到叶路径和是否等于 target？',
      choices: [
        { t: 'DFS/回溯沿路径累加判断', ok: true, why: '树路径经典递归。' },
        { t: '层序遍历后对每一层求和', ok: false, why: '层和≠某一条根到叶路径。' },
        { t: '把节点值拷到数组再硬二分', ok: false, why: '丢失树结构与路径约束。' },
        { t: '并查集合并左右子树当路径', ok: false, why: '路径是父子链，不是随意合并。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-recurse', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:duplicate',
      q: '判断数组是否有重复元素，近线性？',
      choices: [
        { t: '哈希表记录已出现的值', ok: true, why: '空间换时间，平均近线性。' },
        { t: '无序数组上硬套二分查重', ok: false, why: '缺有序前提。' },
        { t: '只比较首尾两个元素是否相等', ok: false, why: '漏掉中间位置的重复。' },
        { t: '先全排列再看相邻是否相等', ok: false, why: '过重；哈希/排序已够。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:rotate',
      q: '旋转有序数组里做二分查找，关键是？',
      choices: [
        { t: '判断 mid 左/右哪一段仍有序', ok: true, why: '旋转数组二分模板。' },
        { t: '先线性还原成有序再暴力扫', ok: false, why: '可行但不是考察的对数解。' },
        { t: '改成图上最短路搜索下标', ok: false, why: '仍是数组二分题。' },
        { t: '用并查集合并旋转前后两段', ok: false, why: '关键是有序半区判定，不是合并。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:stock',
      q: '股票只交易一次求最大利润，线性解？',
      choices: [
        { t: '一边扫一边维护历史最低价', ok: true, why: '利润=今日价−历史最低。' },
        { t: '对价格下标做二分找买卖点', ok: false, why: '价格序列不是按值有序查找。' },
        { t: '用栈把涨跌当成括号匹配', ok: false, why: '利润问题不是括号合法性。' },
        { t: '枚举全部买卖对再取最大（必做）', ok: false, why: 'O(n²) 可行但非线性最优口径。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:paren-gen',
      q: '生成 n 对合法括号序列，常用？',
      choices: [
        { t: '回溯：约束左括号数与右括号数', ok: true, why: '递归/回溯模板。' },
        { t: '对 n 做二分查找合法串', ok: false, why: '是生成问题，不是有序查找。' },
        { t: '把括号字符排序后直接输出', ok: false, why: '合法嵌套靠计数约束，不是排序。' },
        { t: 'Dijkstra 求「最短合法括号串」', ok: false, why: '要枚举全部合法串，不是单源最短路。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:word-ladder',
      q: '单词接龙最短变换次数，优先？',
      choices: [
        { t: '把单词当隐式图，BFS 求最短层数', ok: true, why: '无权最短路径。' },
        { t: 'DFS 一条路走到底再比长度', ok: false, why: '先走到的不一定最短。' },
        { t: '对单词表排序后硬二分下一个', ok: false, why: '邻接是差一字，不是字典序二分。' },
        { t: '并查集合并字母相同的单词', ok: false, why: '要的是变换步数，不是连通块大小。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:bit-single',
      q: '其余成对出现、只有一个单独出现，位运算？',
      choices: [
        { t: '全体异或，成对抵消得答案', ok: true, why: 'a^a=0，0^x=x。' },
        { t: '无序数组上硬二分找单独值', ok: false, why: '无序且无单调，不能直接二分。' },
        { t: '排序后只看首尾是否成对', ok: false, why: '单独值可能在中间；异或更干净。' },
        { t: '最短路算法求「单独值」', ok: false, why: '与图距离无关。' },
      ],
      relatedNodes: ['dsa-bitwise', 'dsa-hot'],
    },
  ],
});

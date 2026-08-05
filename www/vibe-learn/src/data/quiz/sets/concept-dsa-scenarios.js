import { defineQuizSet } from '../schema.js';

/** 场景 · DSA 题型落地（大厂模板，选项等长） */
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
        { t: '栈：左入栈，右对顶', ok: true, why: '嵌套后开先关。' },
        { t: '只数左右括号个数', ok: false, why: '顺序错仍可能相等。' },
        { t: '平衡树存所有位置', ok: false, why: '找不到最近未闭合。' },
        { t: '哈希存字符即可', ok: false, why: '哈希无 LIFO 顺序。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:two-sum',
      q: '列表找两数之和=target，近线性怎么做？',
      choices: [
        { t: '扫描时哈希记已见值', ok: true, why: '查互补是否出现过。' },
        { t: '无序上直接二分查找', ok: false, why: '缺有序前提。' },
        { t: '再建堆维护全部和', ok: false, why: '不是主路径。' },
        { t: '先拓扑再逐对相加', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:island',
      q: '二维网格数岛屿（四连通），常用？',
      choices: [
        { t: 'DFS/BFS 沉岛计数', ok: true, why: '访过改标记防回头。' },
        { t: '按格子值直接二分', ok: false, why: '网格连通不是二分。' },
        { t: '只排序每行再比较', ok: false, why: '丢连通信息。' },
        { t: '栈匹配括号代计数', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:course',
      q: '选课有先修约束，判断能否修完？',
      choices: [
        { t: '拓扑排序检测有环', ok: true, why: '有环则无法排程。' },
        { t: '按课号二分查找', ok: false, why: '编号≠依赖序。' },
        { t: '按课名字典序排', ok: false, why: '字典序≠拓扑序。' },
        { t: '最短路求最少学分', ok: false, why: '先问能否修完。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:binsearch',
      q: '对答案做二分前，序列要满足？',
      choices: [
        { t: '对答案单调（可有序）', ok: true, why: '才能安全丢掉半边。' },
        { t: '元素必须全不重复', ok: false, why: '可有重复，需定边界。' },
        { t: '长度必须是 2 的幂', ok: false, why: '与能否二分无关。' },
        { t: '必须先建成平衡树', ok: false, why: '数组上也可二分。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:window',
      q: '最长无重复子串，近线性模板是？',
      choices: [
        { t: '滑窗右扩，重复左收', ok: true, why: '哈希维护窗口字符。' },
        { t: '无序串硬套二分', ok: false, why: '无单调前提。' },
        { t: '先建最小生成树', ok: false, why: '与子串无关。' },
        { t: '对字符拓扑排序', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-two-pointers', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:topk',
      q: '海量数据取频率 TopK，常用？',
      choices: [
        { t: '哈希计数再大小为 K 的堆', ok: true, why: '计数+堆是一面口径。' },
        { t: '无序数组直接二分 K', ok: false, why: '无序不能二分。' },
        { t: '只排序全部再取尾', ok: false, why: '全排更重，非必需。' },
        { t: '栈匹配括号得 TopK', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:reverse',
      q: '反转单链表，迭代三指针通常指？',
      choices: [
        { t: 'prev、cur、next', ok: true, why: '扳 next 再三人前移。' },
        { t: 'root、left、right', ok: false, why: '那是二叉树用语。' },
        { t: 'lo、mid、hi', ok: false, why: '那是二分用语。' },
        { t: 'find、union、rank', ok: false, why: '那是并查集用语。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:level',
      q: '二叉树按层输出节点，首选？',
      choices: [
        { t: '队列做层序 BFS', ok: true, why: '树的层序=BFS。' },
        { t: '只递归先序遍历', ok: false, why: '先序不是按层。' },
        { t: '中序再对结果排序', ok: false, why: '丢层级，还多余。' },
        { t: '并查集合并左右孩', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:stable',
      q: '多关键字排序要保留相等键次序，应偏？',
      choices: [
        { t: '稳定排序如归并', ok: true, why: '稳定才保留相对序。' },
        { t: '快排即可必稳', ok: false, why: '快排通常不稳定。' },
        { t: '堆排即可必稳', ok: false, why: '堆排通常不稳定。' },
        { t: '选择排序必稳', ok: false, why: '选择通常不稳定。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:median',
      q: '无序数组找第 K 大，一面常见优化？',
      choices: [
        { t: '堆或快选分区', ok: true, why: '全排更重；TopK/快选常见。' },
        { t: '无序上直接二分 K', ok: false, why: '无序不能二分下标。' },
        { t: '栈匹配第 K 个', ok: false, why: '题型不匹配。' },
        { t: '并查集合并前 K', ok: false, why: '不管名次。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:merge-list',
      q: '合并两条有序链表，首选思路？',
      choices: [
        { t: '双指针逐个取较小', ok: true, why: '有序前提，一次扫描。' },
        { t: '先打乱再全排序', ok: false, why: '丢掉有序优势。' },
        { t: '无序哈希随便拼', ok: false, why: '不能保证有序。' },
        { t: '拓扑排序节点值', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-linear', 'dsa-two-pointers', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:path-sum',
      q: '二叉树根到叶路径和是否等于 target？',
      choices: [
        { t: 'DFS/回溯累加判断', ok: true, why: '树路径经典递归。' },
        { t: '层序后对层求和', ok: false, why: '层和≠根到叶路径。' },
        { t: '无序数组硬二分', ok: false, why: '树不是有序下标。' },
        { t: '并查集合并左右', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-tree', 'dsa-recurse', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:duplicate',
      q: '判断数组是否有重复元素，近线性？',
      choices: [
        { t: '哈希表记已出现', ok: true, why: '空间换时间。' },
        { t: '无序硬套二分', ok: false, why: '缺有序前提。' },
        { t: '只比较首尾元素', ok: false, why: '漏中间重复。' },
        { t: '栈匹配相等括号', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:rotate',
      q: '旋转有序数组里二分查找，关键是？',
      choices: [
        { t: '判断哪半边仍有序', ok: true, why: '旋转数组二分模板。' },
        { t: '先还原再暴力扫', ok: false, why: '可行但非考察点。' },
        { t: '改成最短路搜索', ok: false, why: '题型不匹配。' },
        { t: '用并查集合并段', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-sort', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:stock',
      q: '股票只交易一次最大利润，线性解？',
      choices: [
        { t: '维护历史最低价', ok: true, why: '一遍扫：价差=今-历史低。' },
        { t: '无序下标硬二分', ok: false, why: '价格序列非查找键。' },
        { t: '栈匹配涨跌括号', ok: false, why: '题型不匹配。' },
        { t: '先全排列再取最大', ok: false, why: '过重。' },
      ],
      relatedNodes: ['dsa-dp', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:paren-gen',
      q: '生成 n 对合法括号序列，常用？',
      choices: [
        { t: '回溯控制左右计数', ok: true, why: '递归分治/回溯模板。' },
        { t: '无序数组硬二分 n', ok: false, why: '不是查找题。' },
        { t: '只排序字符再输出', ok: false, why: '合法嵌套靠计数。' },
        { t: 'Dijkstra 求最短串', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-recurse', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:word-ladder',
      q: '单词接龙最短变换次数，优先？',
      choices: [
        { t: '隐式图上 BFS', ok: true, why: '无权最短层数。' },
        { t: 'DFS 一条走到底', ok: false, why: '不保证最短。' },
        { t: '无序硬二分单词', ok: false, why: '不是有序查找。' },
        { t: '并查集合并字母', ok: false, why: '最短层数用 BFS。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-string', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-scenarios:bit-single',
      q: '其余成对、一个单独出现，位运算？',
      choices: [
        { t: '全体异或得答案', ok: true, why: '成对抵消。' },
        { t: '无序硬二分单独', ok: false, why: '前提不对。' },
        { t: '栈匹配成对括号', ok: false, why: '题型不匹配。' },
        { t: '最短路求单独值', ok: false, why: '题型不匹配。' },
      ],
      relatedNodes: ['dsa-bitwise', 'dsa-hot'],
    },
  ],
});

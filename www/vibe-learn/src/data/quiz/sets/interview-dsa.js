import { defineQuizSet } from '../schema.js';

/** DSA：对齐常见面试与算法教材表述（均摊/最坏、模板题） */
export default defineQuizSet({
  id: 'interview-dsa-open',
  title: '大厂 · 数据结构与复杂度开口',
  kind: 'interview',
  domain: 'dsa',
  tags: ['DSA', '一面', '复杂度'],
  relatedNodes: ['dsa-complexity', 'dsa-linear', 'dsa-hash'],
  caption: '复杂度边界 → 结构选型 → 高频模板。',
  questions: [
    {
      id: 'interview-dsa-open:hash-o1',
      q: '口头说「哈希表查找是 O(1)」时，面试里更严谨的补全应该是什么？',
      choices: [
        {
          t: '平均（均摊）O(1)；最坏可因冲突退化；还与负载因子有关',
          ok: true,
          why: '要听边界，不是喊口号；要能解释何时变慢。',
        },
        {
          t: '最坏情况也一定是 O(1)，与数据量无关',
          ok: false,
          why: '冲突严重时查找可能扫整条链，可到 O(n)。',
        },
        {
          t: '哈希表的空间复杂度一定是 O(1)',
          ok: false,
          why: '表要存 n 个元素，空间通常随 n 增长。',
        },
        {
          t: '哈希查找不需要比较，因此没有复杂度概念',
          ok: false,
          why: '仍用大 O 描述随规模增长的操作次数。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-complexity'],
    },
    {
      id: 'interview-dsa-open:cycle',
      q: '判断单链表是否有环，经典且省空间的做法是什么？',
      choices: [
        {
          t: 'Floyd 快慢指针：一快一慢，若相遇则存在环',
          ok: true,
          why: '一面高频模板；O(1) 额外空间。',
        },
        {
          t: '只能先把链表排序，再两两比较相邻节点',
          ok: false,
          why: '链表不便高效原地排序，且会改变结构。',
        },
        {
          t: '必须先完整拷贝成数组再判环',
          ok: false,
          why: '可行但多余；O(1) 空间题不适用。',
        },
        {
          t: '用队列按层遍历就能判定任意链表是否有环',
          ok: false,
          why: '层序是树/图概念；链表判环用快慢指针或哈希。',
        },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:brackets',
      q: 'LeetCode 式「有效括号匹配」题，首选哪种数据结构？',
      choices: [
        {
          t: '栈（后进先出）：遇到右括号就匹配最近未闭合的左括号',
          ok: true,
          why: '嵌套「最后开的先关」，与栈 LIFO 一致。',
        },
        {
          t: '队列（先进先出）：按进入顺序依次匹配',
          ok: false,
          why: 'FIFO 对不上嵌套闭合，例如 ([]) 会错。',
        },
        {
          t: '只统计左括号和右括号个数是否相等',
          ok: false,
          why: ')( 个数相等但顺序非法。',
        },
        {
          t: '把字符插入平衡二叉搜索树再中序遍历',
          ok: false,
          why: '与 BST 无关，不能自然表达嵌套匹配。',
        },
      ],
      relatedNodes: ['dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:two-sum',
      q: '两数之和要从暴力 O(n²) 优化到平均 O(n)，常用思路是什么？',
      choices: [
        {
          t: '一遍扫描：哈希表存「值→下标」，查 target−x 是否出现过',
          ok: true,
          why: '空间换时间经典题。',
        },
        {
          t: '再套一层循环，优化到 O(n³)',
          ok: false,
          why: '增加循环只会更慢。',
        },
        {
          t: '只能用二叉堆做优先队列，不能用哈希表',
          ok: false,
          why: '标准解是哈希表；堆不是此题主路径。',
        },
        {
          t: '先建笛卡尔树再深度优先搜索',
          ok: false,
          why: '过重且非教材标准解。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:lru',
      q: '设计 LRU 缓存，要求 get/put 平均 O(1)，标准组件组合是什么？',
      choices: [
        {
          t: '哈希表 + 双向链表：哈希定位节点，链表维护最近使用顺序',
          ok: true,
          why: '设计题标配：哈希 O(1) 找，链表 O(1) 挪顺序。',
        },
        {
          t: '仅用动态数组，每次命中就把元素移到数组末尾',
          ok: false,
          why: '数组中间删除/插入要搬移，达不到 O(1)。',
        },
        {
          t: '仅用平衡二叉搜索树存键，不用链表',
          ok: false,
          why: 'BST 操作 O(log n)，口述通常要求 O(1) 均摊。',
        },
        {
          t: '仅用单链表，每次 get 从头遍历找键',
          ok: false,
          why: '查找 O(n)，不满足平均 O(1)。',
        },
      ],
      relatedNodes: ['dsa-hash', 'dsa-linear', 'dsa-hot'],
    },
    {
      id: 'interview-dsa-open:n2',
      q: '对长度为 n 的数组做双重嵌套完整扫描，时间复杂度通常记为？',
      choices: [
        {
          t: 'O(n²)：外层 n 次，内层每次也约 n 次基本操作',
          ok: true,
          why: '两层都与 n 成正比，相乘得平方级。',
        },
        {
          t: 'O(n)：因为只有两层循环所以算一次 n',
          ok: false,
          why: '嵌套是相乘不是相加。',
        },
        {
          t: 'O(1)：循环次数固定不随 n 变',
          ok: false,
          why: '内层范围随 n 增长，不是常数。',
        },
        {
          t: 'O(log n)：因为内层循环每次减半',
          ok: false,
          why: '完整双重扫描不是折半。',
        },
      ],
      relatedNodes: ['dsa-complexity'],
    },
  ],
});

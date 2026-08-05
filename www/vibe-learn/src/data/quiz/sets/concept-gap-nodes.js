import { defineQuizSet } from '../schema.js';

/** 补齐图谱覆盖缺口：规则 / 读报错 / 图 / 排序 / DP */
export default defineQuizSet({
  id: 'concept-gap-nodes',
  title: '概念 · 图谱补缺（规则·报错·DSA）',
  kind: 'concept',
  domain: 'dsa',
  tags: ['补缺', '零基础', '进阶'],
  relatedNodes: [
    'ai-rules',
    'code-read-errors',
    'dsa-graph',
    'dsa-sort',
    'dsa-dp',
    'dsa-tree',
    'dsa-hot',
    'code-checkpoint',
  ],
  caption: '补齐原先缺少刷题绑定的课节点；从零基础到开口三步。',
  questions: [
    {
      id: 'concept-gap-nodes:q1',
      q: '助手总越权改生产配置。你准备加「规则」文件。怎样写才有效？',
      choices: [
        {
          t: '规则要短、硬、可执行，和「技能说明书」分工',
          ok: true,
          why: '规则是常驻护栏；写太长会淹没模型注意力。复杂流程放技能或文档。',
        },
        {
          t: '规则越长越好，最好把整本教材粘贴进去，模型才会听话',
          ok: false,
          why: '超长规则容易被忽略，也难维护；应拆成短护栏 + 技能。',
        },
        {
          t: '规则和技能是同一个东西，随便写在哪一处都行',
          ok: false,
          why: '二者分工不同：规则是硬约束，技能是可调用的操作说明。',
        },
        {
          t: '没有规则也能保证模型绝不越权，所以可以完全不写',
          ok: false,
          why: '没有红线时模型更容易越界；短规则是性价比最高的护栏。',
        },
      ],
      relatedNodes: ['ai-rules'],
      domain: 'ai',
      tags: ['场景', 'ai-rules'],
    },
    {
      id: 'concept-gap-nodes:q2',
      q: '程序报错时，把它当成「定位器」而不是吓唬人，首先应看什么？',
      choices: [
        {
          t: '错误类型、关键信息，以及堆栈里指向你自己代码的那几行',
          ok: true,
          why: '类型告诉你错在哪一类；信息给线索；堆栈告诉你从哪一行冒出来的。',
        },
        {
          t: '直接重装操作系统，因为报错几乎都是系统坏了',
          ok: false,
          why: '绝大多数是应用或依赖问题；先读报错再决定要不要动环境。',
        },
        {
          t: '关掉所有日志，报错看多了会影响心情，不利于学习',
          ok: false,
          why: '报错是学习反馈；关掉等于丢掉定位信息。',
        },
        {
          t: '只看第一行英文单词的长度，越长说明越严重',
          ok: false,
          why: '严重程度不取决于单词长度；要读类型与堆栈位置。',
        },
      ],
      relatedNodes: ['code-read-errors'],
      domain: 'lang',
      tags: ['零基础', 'code-read-errors'],
    },
    {
      id: 'concept-gap-nodes:q3',
      q: '插件依赖可能互相指向、形成环；任务调度要表达「谁依赖谁」。用树还是图更贴？',
      choices: [
        {
          t: '用图：结点加边，边可成环，也常表达网格、依赖、社交关系',
          ok: true,
          why: '树一般无环且有根；依赖与环检测属于图，遍历常用 BFS/DFS。',
        },
        {
          t: '只能用树，因为图不能表示模块与模块之间的关系',
          ok: false,
          why: '图恰恰擅长表示关系；有环时树模型会装不下。',
        },
        {
          t: '等于数据库一张表，没有遍历问题',
          ok: false,
          why: '落库可以是表，但算法上仍要谈遍历、路径与环。',
        },
        {
          t: '必须先会写操作系统内核才能用图',
          ok: false,
          why: '图是通用数据结构，与写内核无必要绑定。',
        },
      ],
      relatedNodes: ['dsa-graph'],
      domain: 'dsa',
      tags: ['场景', 'dsa-graph'],
    },
    {
      id: 'concept-gap-nodes:q4',
      q: '排序与查找题里，高级工程师开口时常强调的「有序前提」指什么？',
      choices: [
        {
          t: '二分查找等算法要求数据先有序（或可比较序）',
          ok: true,
          why: '模板有边界条件：是否稳定排序、是否允许重复、查找区间开闭等，都要先说清。',
        },
        {
          t: '只要数组长度大于 2，任何查找都可以宣称是二分',
          ok: false,
          why: '二分依赖有序与正确的中点收缩；长度不是充分条件。',
        },
        {
          t: '排序永远比查找重要，所以从不讨论查找模板',
          ok: false,
          why: '二者常成对出现：先排序再查找，或在有序结构上直接查。',
        },
        {
          t: '快排保证最坏情况也是线性时间，所以不用谈复杂度',
          ok: false,
          why: '快排平均很好，最坏仍可能退化；工程上要谈最坏与实际数据分布。',
        },
      ],
      relatedNodes: ['dsa-sort'],
      domain: 'dsa',
      tags: ['进阶', 'dsa-sort'],
    },
    {
      id: 'concept-gap-nodes:q5',
      q: '动态规划（DP）与贪心，面试开口三步更接近哪一种说法？',
      choices: [
        {
          t: '先定义状态，再写转移',
          ok: true,
          why: 'DP 靠状态转移；贪心要证明局部最优能推到全局。开口按这三步不易跑偏。',
        },
        {
          t: '先把答案背下来，状态和转移可以面试临场再想',
          ok: false,
          why: '背题遇变形就崩；状态与转移才是可迁移的能力。',
        },
        {
          t: '贪心一定优于 DP，所以永远优先写贪心',
          ok: false,
          why: '许多题贪心不正确；需要证明或退回 DP/搜索。',
        },
        {
          t: 'DP 只能用于游戏得分，与工程调度无关',
          ok: false,
          why: 'DP 广泛用于路径、背包、编辑距离、资源调度等。',
        },
      ],
      relatedNodes: ['dsa-dp'],
      domain: 'dsa',
      tags: ['进阶', 'dsa-dp'],
    },
  ],
});

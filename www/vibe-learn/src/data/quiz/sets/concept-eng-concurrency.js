import { defineQuizSet } from '../schema.js';

/** 并发与异步正确性：竞态、共享状态、取消——不只 typeof  trivia */
export default defineQuizSet({
  id: 'concept-eng-concurrency',
  title: '工程 · 并发与异步正确性',
  kind: 'concept',
  domain: 'lang',
  tags: ['并发', '竞态', '异步', '基础', '进阶'],
  relatedNodes: ['code-async', 'code-objects-arrays', 'craft-debug'],
  caption: '单线程事件循环也会有竞态；共享可变状态是事故温床。',
  questions: [
    {
      id: 'concept-eng-concurrency:q1',
      q: '「JS 是单线程」是否等于「不会有竞态」？',
      choices: [
        { t: '否：异步交错仍会导致读改写乱序，共享对象会被并发逻辑踩踏', ok: true, why: 'await 间隙其它任务可插入。' },
        { t: '是：单线程绝对无竞态', ok: false, why: '经典误解。' },
        { t: '只有多核 CPU 才有 bug', ok: false, why: '否。' },
        { t: '竞态只存在于数据库', ok: false, why: '应用层同样。' },
      ],
      relatedNodes: ['code-async', 'code-objects-arrays'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-concurrency:q2',
      q: '两个请求同时改同一内存里的会话对象，风险？',
      choices: [
        { t: '丢失更新、读到半成品状态——要用隔离、队列或不可变快照', ok: true, why: 'Agent 会话/缓存里的高频坑。' },
        { t: 'JS 对象有数据库级行锁自动保护', ok: false, why: '没有。' },
        { t: '同时写会自动合并成正确结果', ok: false, why: '不会。' },
        { t: '只有文件会丢更新，内存不会', ok: false, why: '内存更易。' },
      ],
      relatedNodes: ['code-objects-arrays', 'xrk-chat-pipeline'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q3',
      q: 'Promise.all 相对 allSettled，失败语义差在？',
      choices: [
        { t: 'all：一失败就拒；allSettled：等全部结束并带各自状态——部分失败策略不同', ok: true, why: '批量调工具/API 时要显式选。' },
        { t: '二者完全等价', ok: false, why: '否。' },
        { t: 'allSettled 更快因为它跳过网络', ok: false, why: '无关。' },
        { t: 'all 会忽略所有错误', ok: false, why: '相反更敏感。' },
      ],
      relatedNodes: ['code-async'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q4',
      q: '请求已取消/客户端断开，服务端仍继续跑重活，问题？',
      choices: [
        { t: '浪费 CPU/配额/锁；应传播 AbortSignal/取消令牌并停止', ok: true, why: '流式对话与长任务必备。' },
        { t: '断开后服务端必须跑完才算礼貌', ok: false, why: '常该停。' },
        { t: '取消只存在于浏览器 UI', ok: false, why: '服务端同样。' },
        { t: 'AbortSignal 会自动回滚数据库事务（总是）', ok: false, why: '要自己设计补偿。' },
      ],
      relatedNodes: ['code-async', 'xrk-stream', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q5',
      q: '缓存里的「读改写」无锁时？',
      choices: [
        { t: '可能丢增量：应用层要用原子操作、版本号或单飞（singleflight）', ok: true, why: 'Redis INCR/Lua、或互斥刷新。' },
        { t: '缓存永远串行化所有写', ok: false, why: '除非你设计如此。' },
        { t: '读改写只在 HDD 发生', ok: false, why: '否。' },
        { t: '有 CDN 就无此问题', ok: false, why: '否。' },
      ],
      relatedNodes: ['db-redis', 'db-middleware'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q6',
      q: 'async 函数里「先查后写」两段 await 之间？',
      choices: [
        { t: '其它逻辑可能已改数据，TOCTOU 经典；关键路径要事务或条件写', ok: true, why: 'Time-of-check to time-of-use。' },
        { t: 'await 会冻结整个操作系统', ok: false, why: '否。' },
        { t: '两段 await 之间不可能插入其它任务', ok: false, why: '可以。' },
        { t: '只有同步代码有 TOCTOU', ok: false, why: '异步更常见。' },
      ],
      relatedNodes: ['code-async', 'db-as-service'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q7',
      q: '限流器放在哪里更合理？',
      choices: [
        { t: '入口与昂贵依赖前（网关/服务内）；按主体（IP/用户/API Key）计量', ok: true, why: '保护自己也保护下游。' },
        { t: '只限流静态资源，不管 LLM 调用', ok: false, why: 'LLM 更贵。' },
        { t: '限流等于鉴权，可替代登录', ok: false, why: '不同。' },
        { t: '无限 QPS 证明架构优秀', ok: false, why: '否。' },
      ],
      relatedNodes: ['net-nginx', 'http-web', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q8',
      q: '日志里出现交错的同一 requestId 两段输出，说明？',
      choices: [
        { t: '并发处理同一请求或复用了错误的上下文——要用正确的异步上下文传递', ok: true, why: '可观测性与并发正确性交界。' },
        { t: '证明单线程不可能交错', ok: false, why: '会交错打印。' },
        { t: 'requestId 无意义可删', ok: false, why: '更要正确。' },
        { t: '只是字体问题', ok: false, why: '否。' },
      ],
      relatedNodes: ['craft-observability', 'code-async'],
      tags: ['进阶'],
    },
  ],
});

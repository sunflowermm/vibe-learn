import { defineQuizSet } from '../schema.js';

/** 并发与异步正确性：竞态、共享状态、取消（Promise 语法见 js-async） */
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
        {
          t: "否：异步交错仍会导致读改写乱序，共享对象会被并发逻辑踩踏",
          ok: true,
          why: 'await 间隙其它任务可插入，单线程≠无竞态。',
        },
        {
          t: '是：单线程绝对无竞态，await 间隙也不会交错',
          ok: false,
          why: '经典误解；异步回调交错一样会丢更新。',
        },
        {
          t: '只有多核 CPU 才会出 bug，单核机器可以忽略竞态',
          ok: false,
          why: '逻辑竞态与核数无关，事件循环上也会发生。',
        },
        {
          t: '竞态只存在于数据库行锁，应用内存对象天然安全',
          ok: false,
          why: '应用内存、缓存、会话对象同样有竞态。',
        },
      ],
      relatedNodes: ['code-async', 'code-objects-arrays'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-concurrency:q2',
      q: '两个请求同时改同一内存里的会话对象，风险？',
      choices: [
        {
          t: "丢失更新、读到半成品状态——要用隔离、队列或不可变快照",
          ok: true,
          why: 'Agent 会话/缓存里的高频坑。',
        },
        {
          t: '普通 JS 对象自带数据库级行锁，并发写会自动串行化',
          ok: false,
          why: '普通对象没有行锁；要自己设计互斥或不可变。',
        },
        {
          t: '两个写者同时改同一对象时，运行时会自动合并成正确最终态',
          ok: false,
          why: '不会自动合并；后写覆盖或交错字段很常见。',
        },
        {
          t: '只有写文件才会丢更新，纯内存里的对象天然不会被踩踏',
          ok: false,
          why: '内存共享对象更容易被并发逻辑踩踏。',
        },
      ],
      relatedNodes: ['code-objects-arrays', 'xrk-chat-pipeline'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q3',
      q: 'Promise.all 相对 allSettled，失败语义差在？',
      choices: [
        {
          t: "all：一失败就拒；allSettled：等全部结束并带各自状态——部分失败策略不同",
          ok: true,
          why: '批量调工具/API 时要显式选语义。',
        },
        {
          t: "Promise.all 会忽略所有错误并总是 resolve 成空数组",
          ok: false,
          why: '失败是否短路、返回形状都不同。',
        },
        {
          t: "all 与 allSettled 完全等价，只是方法名营销不同",
          ok: false,
          why: '都不跳过网络；差别在聚合失败策略。',
        },
        {
          t: "allSettled 更快，因为它会跳过网络 I/O 只做本地聚合",
          ok: false,
          why: '相反：all 对第一个失败更敏感。',
        },
      ],
      relatedNodes: ['code-async'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q4',
      q: '请求已取消/客户端断开，服务端仍继续跑重活，问题？',
      choices: [
        {
          t: "浪费 CPU/配额/锁；应传播 AbortSignal/取消令牌并停止",
          ok: true,
          why: '流式对话与长任务必备。',
        },
        {
          t: '客户端断开后，服务端必须把重活跑完才算礼貌与可靠',
          ok: false,
          why: '无人消费的结果常该停，避免浪费配额。',
        },
        {
          t: '取消信号只存在于浏览器 UI，服务端进程不必理会',
          ok: false,
          why: '服务端同样应传播取消信号。',
        },
        {
          t: 'AbortSignal 触发后总会自动回滚已开启的数据库事务',
          ok: false,
          why: '取消不会自动回滚；事务与补偿要自己设计。',
        },
      ],
      relatedNodes: ['code-async', 'xrk-stream', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q5',
      q: '缓存里的「读改写」无锁时？',
      choices: [
        {
          t: "可能丢增量：应用层要用原子操作、版本号或单飞（singleflight）",
          ok: true,
          why: 'Redis INCR/Lua、或互斥刷新。',
        },
        {
          t: "缓存层会永远串行化所有写操作，因此读改写不会丢任何增量",
          ok: false,
          why: '除非你显式设计串行，否则并发写会交错。',
        },
        {
          t: "有了 CDN 边缘缓存就无此问题，源站不必再做任何原子更新",
          ok: false,
          why: '内存缓存与 Redis 上同样常见。',
        },
        {
          t: "读改写竞态只会出现在机械硬盘上，SSD 与内存缓存可以忽略",
          ok: false,
          why: 'CDN/介质不解决应用侧读改写竞态。',
        },
      ],
      relatedNodes: ['db-redis', 'db-middleware'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q6',
      q: 'async 函数里「先查后写」两段 await 之间？',
      choices: [
        {
          t: "其它逻辑可能已改数据，TOCTOU 经典；关键路径要事务或条件写",
          ok: true,
          why: 'Time-of-check to time-of-use。',
        },
        {
          t: 'await 会冻结整个操作系统，期间其它进程也无法调度',
          ok: false,
          why: '只让出当前异步函数，事件循环继续跑其它任务。',
        },
        {
          t: '两段 await 之间不可能插入其它任务，读到的值永远新鲜',
          ok: false,
          why: '可以插入；这正是 TOCTOU 窗口。',
        },
        {
          t: '只有同步代码有 TOCTOU，异步路径天然免疫该问题',
          ok: false,
          why: '异步间隙更常见、更难直觉看见。',
        },
      ],
      relatedNodes: ['code-async', 'db-as-service'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q7',
      q: '限流器放在哪里更合理？',
      choices: [
        {
          t: "入口与昂贵依赖前（网关/服务内）；按主体（IP/用户/API Key）计量",
          ok: true,
          why: '保护自己也保护下游。',
        },
        {
          t: '只限流静态 CSS/图片即可，昂贵的 LLM 调用可以完全不管配额',
          ok: false,
          why: 'LLM 调用更贵，更该限流与配额。',
        },
        {
          t: '限流等于鉴权：有了 QPS 配额就可以完全替代登录与权限检查',
          ok: false,
          why: '限流管吞吐；鉴权管身份，不能互相替代。',
        },
        {
          t: '无限 QPS 且从不拒绝任何请求，就证明架构已经足够优秀',
          ok: false,
          why: '无限吞吐会打爆自己与依赖，不是优点。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-concurrency:q8',
      q: '日志里出现交错的同一 requestId 两段输出，说明？',
      choices: [
        {
          t: "并发处理同一请求或复用了错误的上下文——要用正确的异步上下文传递",
          ok: true,
          why: '可观测性与并发正确性交界。',
        },
        {
          t: '证明单线程运行时绝对不可能出现日志行交错',
          ok: false,
          why: '异步交错仍会交错打印日志行。',
        },
        {
          t: 'requestId 无意义可删，交错日志也不影响排障',
          ok: false,
          why: '更要正确传递，才能把日志串成一条请求。',
        },
        {
          t: '只是终端字体或换行显示问题，与请求上下文无关',
          ok: false,
          why: '是上下文绑定问题，不是显示字体。',
        },
      ],
      relatedNodes: ['craft-observability', 'code-async'],
      tags: ['进阶'],
    },
  ],
});

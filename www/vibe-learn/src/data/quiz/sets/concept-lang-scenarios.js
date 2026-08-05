import { defineQuizSet } from '../schema.js';

/** Bloom 3 · 应用：语言/运行时场景决策 */
export default defineQuizSet({
  id: 'concept-lang-scenarios',
  title: '场景 · 语言运行时落地',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '场景', '应用'],
  relatedNodes: ['code-async', 'code-read-errors', 'data-env', 'lang-typescript'],
  caption: '竞态、堆栈、选型、异步错误——给场景选动作（密钥卫生见 git-security）。',
  questions: [
    {
      id: 'concept-lang-scenarios:race',
      q: '两个异步请求先后写同一条记录，后写覆盖先写。宜？',
      choices: [
        {
          t: '对共享写入串行化，或用版本号/条件更新防止覆盖',
          ok: true,
          why: '消异步交错导致的丢失更新。',
        },
        {
          t: '认定 Node 单线程绝无竞态，继续并行写即可',
          ok: false,
          why: 'await 间隙仍会交错，覆盖写照样发生。',
        },
        {
          t: '用 while(true) 空转等待「写完再继续」当作同步',
          ok: false,
          why: '卡死事件循环，不是正确同步。',
        },
        {
          t: '把所有 I/O 改成同步阻塞后，竞态会自动永久消失',
          ok: false,
          why: '同步 I/O 不自动消灭逻辑层的覆盖写与共享状态问题。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-scenarios:stack',
      q: 'Node 打出很长堆栈，定位业务 bug 时优先？',
      choices: [
        {
          t: '先看错误类型，再找堆栈里属于自己项目的帧与行号',
          ok: true,
          why: '框架底层帧往往只是表象；根因常在调用处。',
        },
        {
          t: '堆栈越长就越可以整段忽略，只看最后一行成功日志',
          ok: false,
          why: '长栈仍含关键业务帧，忽略会丢线索。',
        },
        {
          t: '只盯框架最底层一帧，业务代码帧一律跳过',
          ok: false,
          why: '根因常在你的调用处，不在框架入口。',
        },
        {
          t: '编辑器能高亮文件就等于功能已跑通、无需再测',
          ok: false,
          why: '高亮只是打开文件；跑通要看运行结果与断言。',
        },
      ],
      relatedNodes: ['code-read-errors'],
    },
    {
      id: 'concept-lang-scenarios:select',
      q: '为新服务选语言/框架时，比追热门更靠谱的是？',
      choices: [
        {
          t: '先对齐场景约束、团队技能与部署/运维成本',
          ok: true,
          why: '热门≠适合；约束驱动选型。',
        },
        {
          t: '只看薪资榜第一名，团队不会也要硬上',
          ok: false,
          why: '交付与维护成本会反噬。',
        },
        {
          t: '对外宣称「我们是某某缩写栈」就够，不必谈运行时与数据层',
          ok: false,
          why: '技术栈是组合，不是一个缩写。',
        },
        {
          t: '选了编译型语言就可以忽略运行时与部署环境',
          ok: false,
          why: '上线仍要 OS、进程、依赖与运维路径。',
        },
      ],
      relatedNodes: ['lang-tech-selection'],
    },
    {
      id: 'concept-lang-scenarios:ts-prod',
      q: 'TypeScript 项目部署到 Node 生产后，类型检查通常？',
      choices: [
        {
          t: '已在构建期完成；运行的是擦除类型后的 JavaScript',
          ok: true,
          why: '勿把 TS 当成生产运行时的强制类型卫士。',
        },
        {
          t: 'Node 会在每次请求时重新做完整静态类型检查',
          ok: false,
          why: '默认擦除；生产跑的是 JS。',
        },
        {
          t: '会自动变成 Java 字节码，由 JVM 接管进程',
          ok: false,
          why: '标准路径仍是 JS on Node。',
        },
        {
          t: '有了 TS 就可以卸载 Node，直接用 tsc 当生产服务器',
          ok: false,
          why: 'tsc 是编译器；进程仍要 Node（或其它运行时）。',
        },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'concept-lang-scenarios:timeout',
      q: '需要「尽快但非同步」调度一段回调，宜？',
      choices: [
        {
          t: 'setTimeout(fn, 0) 排入宏任务，等当前栈与微任务后再跑',
          ok: true,
          why: '不能打断同步代码；只是尽快排队。',
        },
        {
          t: '认定 timeout(0) 会立刻打断正在执行的当前函数',
          ok: false,
          why: '定时器不能打断同步调用栈。',
        },
        {
          t: '另起一个操作系统进程专门跑这段回调',
          ok: false,
          why: '事件循环同线程调度即可；不必为「尽快」起进程。',
        },
        {
          t: '保证它一定早于所有已排队的 Promise.then 微任务',
          ok: false,
          why: '宏任务通常晚于当前轮微任务。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-scenarios:eq',
      q: '接口把用户 id 有时给字符串、有时给数字，业务比较宜？',
      choices: [
        {
          t: '先统一成同一类型，再用 === 比较',
          ok: true,
          why: '避免 == 隐式转换带来的隐蔽相等。',
        },
        {
          t: '一律用 ==，让语言自动转类型最省事',
          ok: false,
          why: '隐式转换易踩坑，审查也更难。',
        },
        {
          t: '先把两边 JSON.stringify 成字符串再比，当作唯一正路',
          ok: false,
          why: '过重且对对象引用语义易误导；id 先规范化即可。',
        },
        {
          t: '把比较结果写进前端可下载脚本，当成长久密钥使用',
          ok: false,
          why: '与比较无关，且把逻辑当密钥更危险。',
        },
      ],
      relatedNodes: ['lang-javascript'],
    },
    {
      id: 'concept-lang-scenarios:async-err',
      q: 'async 函数里抛错，要避免变成未处理的 Promise 拒绝，宜？',
      choices: [
        {
          t: '用 try/catch 包住 await，或在返回的 Promise 上 .catch',
          ok: true,
          why: '拒绝必须有人接；否则可能 UnhandledRejection。',
        },
        {
          t: '假定异步抛错一定会同步杀掉整个 Node 进程并退出码非零',
          ok: false,
          why: '很多情况只是警告/未处理拒绝，服务可能带病继续。',
        },
        {
          t: '依赖运行时默认自动重试失败的 await 三次，再向上抛出最后一次错误',
          ok: false,
          why: 'Node 无此默认；重试要自己做且要幂等。',
        },
        {
          t: '未处理的拒绝会自动映射成 HTTP 200 空 body，前端可当成功忽略',
          ok: false,
          why: '框架不会替你把未处理拒绝变成成功响应。',
        },
      ],
      relatedNodes: ['code-async', 'code-read-errors'],
    },
  ],
});

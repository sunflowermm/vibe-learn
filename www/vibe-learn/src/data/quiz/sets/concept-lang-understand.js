import { defineQuizSet } from '../schema.js';

/** Bloom 2 · 理解：语言概念边界 */
export default defineQuizSet({
  id: 'concept-lang-understand',
  title: '理解 · 语言与框架边界',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '理解', '边界'],
  relatedNodes: ['lang-library-framework', 'fw-vue', 'fw-express-nest', 'lang-nodejs'],
  caption: '库≠框架，UI≠HTTP，主服≠子服语言。',
  questions: [
    {
      id: 'concept-lang-understand:lib-fw',
      q: '库与框架在「控制反转」上的差别？',
      choices: [
        {
          t: '库由你调用；框架约定生命周期并回调你的代码',
          ok: true,
          why: '控制流归属不同：你调库 vs 框架调你。',
        },
        {
          t: '框架等于一门全新编程语言，必须单独学语法规范',
          ok: false,
          why: '框架建在已有语言之上，不另起语法语言。',
        },
        {
          t: '库一定比框架运行更慢，选型时只能二选一',
          ok: false,
          why: '性能无必然；且项目常同时用库与框架。',
        },
        {
          t: '二者只是营销同义词，工程上可随意互换称呼',
          ok: false,
          why: '控制流与约定强度不同，不是同义词。',
        },
      ],
      relatedNodes: ['lang-library-framework'],
    },
    {
      id: 'concept-lang-understand:ui-http',
      q: 'Vue/React 与 Express/Nest 更贴近哪一层？',
      choices: [
        {
          t: '前者偏 UI/组件；后者偏 HTTP 服务与路由',
          ok: true,
          why: '分层不同，常在同一产品里协作。',
        },
        {
          t: 'Vue 是操作系统级语言，Nest 是硬件驱动框架',
          ok: false,
          why: '二者都是应用层框架，层级说反了。',
        },
        {
          t: '有了前端框架就可以完全免去 Node/后端进程',
          ok: false,
          why: '浏览器 UI 不能替代服务端契约与密钥边界。',
        },
        {
          t: 'Express 只能写浏览器扩展插件，不能跑在服务器',
          ok: false,
          why: 'Express/Nest 是服务端 HTTP 框架。',
        },
      ],
      relatedNodes: ['fw-vue', 'fw-express-nest'],
    },
    {
      id: 'concept-lang-understand:polyglot',
      q: '主服已是 Node 时，Python/Go 更合理的位置？',
      choices: [
        {
          t: '作子服/旁路卸重活，经 HTTP 契约协作，不另起一套主服宿主',
          ok: true,
          why: '多语言协作靠边界，不靠多内核复制。',
        },
        {
          t: '每种语言各写一套完整主服，对外同时暴露多入口',
          ok: false,
          why: '多内核成本与一致性灾难；主服应单一宿主。',
        },
        {
          t: '一旦引入 Spring，就可以不再理解进程与端口概念',
          ok: false,
          why: '框架仍跑在进程上，端口与部署照旧要懂。',
        },
        {
          t: '用 Shell 脚本替代主服承载全部长期业务状态',
          ok: false,
          why: '脚本适合胶水与运维，不是稳定业务宿主。',
        },
      ],
      relatedNodes: ['lang-python', 'lang-nodejs'],
    },
    {
      id: 'concept-lang-understand:stack',
      q: '「技术栈」更准确指？',
      choices: [
        {
          t: '语言 + 运行时 + 框架 + 中间件等协同组合',
          ok: true,
          why: '不是单报一个框架缩写。',
        },
        {
          t: '只报一个框架缩写（例如「我们是 Vue 栈」）就够了',
          ok: false,
          why: '过窄；缺运行时、服务端、数据层等约束。',
        },
        {
          t: '等于各大厂薪资榜上排名第一的技术名称',
          ok: false,
          why: '薪资热度≠你的场景与团队约束。',
        },
        {
          t: '等于操作系统发行版代号（如 Ubuntu 版本号）',
          ok: false,
          why: 'OS 是部署层；技术栈通常指应用工具组合。',
        },
      ],
      relatedNodes: ['lang-tech-stack'],
    },
    {
      id: 'concept-lang-understand:micro-macro',
      q: 'Promise.then 相对 setTimeout(fn, 0) 的调度直觉？',
      choices: [
        {
          t: '通常微任务（then）会先于该宏任务（timeout 0）执行',
          ok: true,
          why: '当前栈清空后先清空微任务队列。',
        },
        {
          t: 'timeout(0) 保证比任何 Promise.then 都更早执行',
          ok: false,
          why: 'timeout(0) 进宏任务，常晚于已排队的微任务。',
        },
        {
          t: '二者都会同步打断正在执行的当前调用栈',
          ok: false,
          why: '都不能打断同步代码；只能排队稍后跑。',
        },
        {
          t: 'then 会另起操作系统进程来跑回调',
          ok: false,
          why: '同线程事件循环调度，不是新进程。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-understand:race',
      q: '单线程是否意味着不会出现数据竞态？',
      choices: [
        {
          t: '否：异步交错仍可能后写覆盖先写，需要串行或版本控制',
          ok: true,
          why: '单线程≠无交错；await 间隙可被其它任务插入。',
        },
        {
          t: '是：只要不开 Worker，就绝对不可能有任何覆盖写',
          ok: false,
          why: '异步回调交错仍可覆盖共享状态。',
        },
        {
          t: '只有多核 CPU 才会产生任何类别的程序 bug',
          ok: false,
          why: '逻辑错误、契约错误与单线程竞态都很常见。',
        },
        {
          t: '用 while(true) 空转等待即可安全消除一切竞态',
          ok: false,
          why: '会卡死事件循环，不是正确同步手段。',
        },
      ],
      relatedNodes: ['code-async', 'code-functions'],
    },
  ],
});

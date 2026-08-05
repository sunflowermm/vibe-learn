import { defineQuizSet } from '../schema.js';

/** JS 深坑：typeof / isArray / await / ESM / Promise.all / 事件循环（竞态见 eng-concurrency） */
export default defineQuizSet({
  id: 'concept-js-async',
  title: '概念 · JavaScript 与异步',
  kind: 'concept',
  domain: 'lang',
  tags: ['JS', 'Promise', '模块', 'MDN'],
  relatedNodes: ['code-async', 'code-values-types', 'code-modules'],
  caption: 'typeof / Array.isArray / await / ESM · 对齐 MDN。',
  questions: [
    {
      id: 'concept-js-async:typeof-null',
      q: '在 JavaScript 中，对 null 使用 typeof 运算符会得到什么结果？',
      choices: [
        {
          t: "'object'，这是语言规范中的历史遗留行为",
          ok: true,
          why: 'ECMAScript 规定 typeof null 返回 object，初学者应记住这一特殊情形。',
        },
        {
          t: "'null'，表示空值专用的类型标签",
          ok: false,
          why: 'typeof 不会返回字符串 null；null 是值而非 typeof 标签。',
        },
        {
          t: "'undefined'，因为 null 代表未定义",
          ok: false,
          why: 'undefined 表示未赋值；null 是刻意空值，typeof null 不是 undefined。',
        },
        {
          t: "'nil'，与 Ruby 等语言保持一致",
          ok: false,
          why: 'JavaScript 没有 nil，typeof 也不会返回这个字符串。',
        },
      ],
      relatedNodes: ['code-values-types', 'lang-javascript'],
    },
    {
      id: 'concept-js-async:isarray',
      q: '判断某个值是否为数组（Array），最推荐的方式是什么？',
      choices: [
        {
          t: '使用 Array.isArray(x)，这是 MDN 推荐的标准方法',
          ok: true,
          why: 'typeof 对数组返回 object，instanceof 跨 iframe 可能失效，isArray 最可靠。',
        },
        {
          t: "写 typeof x === 'array' 来直接判断",
          ok: false,
          why: 'typeof 对数组是 object，不存在 array 这个 typeof 返回值。',
        },
        {
          t: '用 x instanceof String 来判断是否为数组',
          ok: false,
          why: 'instanceof String 判断字符串包装对象，与数组无关。',
        },
        {
          t: '写 x === Array 比较是否等于数组构造函数',
          ok: false,
          why: '这比较的是值与构造函数本身，不能判断实例是否为数组。',
        },
      ],
      relatedNodes: ['code-objects-arrays', 'code-values-types'],
    },
    {
      id: 'concept-js-async:forgot-await',
      q: '调用 async 异步函数时如果忘记写 await，变量实际拿到的是什么？',
      choices: [
        {
          t: '一个 Promise 对象，代表尚未完成的异步结果',
          ok: true,
          why: 'async 函数总是返回 Promise，不 await 就拿不到最终解析值。',
        },
        {
          t: '已经解析完毕的最终返回值',
          ok: false,
          why: '没有 await 时不会等待完成，变量只是 Promise 本身。',
        },
        {
          t: '必定抛出语法错误，程序完全无法运行',
          ok: false,
          why: '忘记 await 是逻辑错误而非语法错误，代码能跑但结果不对。',
        },
        {
          t: 'undefined，且会自动取消正在进行的网络请求',
          ok: false,
          why: 'Promise 仍在后台执行，不会自动变 undefined 或取消请求。',
        },
      ],
      relatedNodes: ['code-async', 'code-functions'],
    },
    {
      id: 'concept-js-async:fetch-timeout',
      q: '在本仓库 Node.js 服务端，为 fetch 请求设置超时的推荐写法是什么？',
      choices: [
        {
          t: 'fetch(url, { signal: AbortSignal.timeout(ms) })',
          ok: true,
          why: 'Node 原生支持 AbortSignal.timeout，是项目约定的现代写法。',
        },
        {
          t: '必须安装 node-fetch 第三方包才能发请求',
          ok: false,
          why: 'Node 已内置全局 fetch，项目规范禁止 node-fetch 等旧依赖。',
        },
        {
          t: '不设超时，请求可以一直挂着直到进程自己崩掉',
          ok: false,
          why: '无超时可能永久挂起，拖垮连接与调用链。',
        },
        {
          t: '自己 new AbortController，再用 setTimeout 里手动 abort 拼超时',
          ok: false,
          why: '项目约定优先 AbortSignal.timeout，避免手写拼装。',
        },
      ],
      relatedNodes: ['code-async', 'lang-nodejs', 'http-web'],
    },
    {
      id: 'concept-js-async:esm',
      q: '在 ECMAScript 模块（ESM）中，如何从 ./math.js 引入命名导出 add？',
      choices: [
        {
          t: "import { add } from './math.js'",
          ok: true,
          why: '命名导出用花括号；路径通常带 .js 后缀。',
        },
        {
          t: "import add from './math.js'",
          ok: false,
          why: '不带花括号是默认导出语法，不能导入命名导出。',
        },
        {
          t: "const { add } = require('./math.js')",
          ok: false,
          why: 'require 是 CommonJS；本仓主路径用 ESM import。',
        },
        {
          t: "import add as { add } from './math.js'",
          ok: false,
          why: '非法语法；命名导入直接写花括号即可。',
        },
      ],
      relatedNodes: ['code-modules', 'lang-nodejs'],
    },
    {
      id: 'concept-js-async:promise-all',
      q: 'Promise.all 等待的多个 Promise 中，有一个失败时会发生什么？',
      choices: [
        {
          t: '整体立即以该失败原因 reject，其余请求可能仍在后台执行',
          ok: true,
          why: '短路策略；要汇总各自结果用 allSettled（见并发正确性课）。',
        },
        {
          t: '自动忽略失败的项，只返回成功项组成的数组',
          ok: false,
          why: '那是 allSettled 一类「等全部结束」的语义，不是 all。',
        },
        {
          t: '在代码解析阶段就报语法错误，无法运行',
          ok: false,
          why: '这是运行时 Promise 状态变化，不是语法错误。',
        },
        {
          t: '会变成同步 throw，无法用 catch 捕获',
          ok: false,
          why: '仍通过 Promise reject 传递，可用 .catch 或 try/await。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-js-async:event-loop',
      q: '浏览器和 Node.js 中 JavaScript「事件循环（Event Loop）」的直觉模型是什么？',
      choices: [
        {
          t: '单线程执行 JS 代码，异步回调通过任务队列调度，不阻塞调用栈',
          ok: true,
          why: '主线程跑同步代码，完成后处理队列中的回调——异步基础模型。',
        },
        {
          t: '每执行一条 console.log 都会新建一个操作系统进程',
          ok: false,
          why: 'console.log 只是输出，不会创建新进程。',
        },
        {
          t: 'JavaScript 没有任务队列，所有 I/O 必须同步阻塞等待',
          ok: false,
          why: '正是靠事件循环做非阻塞 I/O；同步阻塞会冻结页面或服务。',
        },
        {
          t: 'JavaScript 会用多线程并行执行每一行源代码',
          ok: false,
          why: '主线程仍是单线程执行 JS；Worker 是额外并行机制。',
        },
      ],
      relatedNodes: ['code-async', 'lang-javascript', 'lang-nodejs'],
    },
  ],
});

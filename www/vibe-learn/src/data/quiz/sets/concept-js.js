import { defineQuizSet } from '../schema.js';

/** JS：对齐 ECMAScript / MDN 常见坑点表述 */
export default defineQuizSet({
  id: 'concept-js-async',
  title: '概念 · JavaScript 与异步',
  kind: 'concept',
  domain: 'lang',
  tags: ['JS', 'Promise', '模块', 'MDN'],
  relatedNodes: [
    'code-values-types',
    'code-async',
    'code-modules',
    'code-functions',
    'code-objects-arrays',
    'code-typescript-hands',
    'lang-javascript',
    'lang-nodejs',
  ],
  caption: 'typeof / Array.isArray / await / ESM · 对齐 MDN。',
  questions: [
    {
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
          why: 'JavaScript 的 typeof 不会返回 null 这个字符串，null 是值而非类型名。',
        },
        {
          t: "'undefined'，因为 null 代表未定义",
          ok: false,
          why: 'undefined 表示变量未赋值，null 表示刻意为空，typeof null 不是 undefined。',
        },
        {
          t: "'nil'，与 Ruby 等语言保持一致",
          ok: false,
          why: 'JavaScript 没有 nil 类型，typeof 也不会返回这个字符串。',
        },
      ],
    },
    {
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
          why: 'typeof 对数组的结果是 object，JavaScript 不存在 array 这个 typeof 返回值。',
        },
        {
          t: '用 x instanceof String 来判断是否为数组',
          ok: false,
          why: 'instanceof String 判断的是字符串包装对象，与数组完全无关。',
        },
        {
          t: '写 x === Array 比较是否等于数组构造函数',
          ok: false,
          why: '这比较的是值与构造函数本身，不能判断某个实例是否为数组。',
        },
      ],
    },
    {
      q: '调用 async 异步函数时如果忘记写 await，变量实际拿到的是什么？',
      choices: [
        {
          t: '一个 Promise 对象，代表尚未完成的异步结果',
          ok: true,
          why: 'async 函数总是返回 Promise，不 await 就拿不到最终的解析值。',
        },
        {
          t: '已经解析完毕的最终返回值',
          ok: false,
          why: '没有 await 时程序不会等待异步完成，变量只是 Promise 本身。',
        },
        {
          t: '必定抛出语法错误，程序完全无法运行',
          ok: false,
          why: '忘记 await 是逻辑错误而非语法错误，代码可以运行但结果不对。',
        },
        {
          t: 'undefined，且会自动取消正在进行的网络请求',
          ok: false,
          why: 'Promise 仍在后台执行，不会自动变成 undefined 或取消请求。',
        },
      ],
    },
    {
      q: '在本仓库 Node.js 服务端，为 fetch 请求设置超时的推荐写法是什么？',
      choices: [
        {
          t: 'fetch(url, { signal: AbortSignal.timeout(ms) })',
          ok: true,
          why: 'Node 26 原生支持 AbortSignal.timeout，是项目约定的现代写法。',
        },
        {
          t: '必须安装 node-fetch 第三方包才能发请求',
          ok: false,
          why: 'Node 已内置全局 fetch，项目规范禁止使用 node-fetch 等旧依赖。',
        },
        {
          t: '不设超时，一直等待直到服务器响应',
          ok: false,
          why: '无超时的请求可能永久挂起，导致服务线程被阻塞。',
        },
        {
          t: '用 setInterval 轮询 XMLHttpRequest 的 readyState',
          ok: false,
          why: 'fetch API 没有 readyState 属性，这是 XMLHttpRequest 的旧模型。',
        },
      ],
    },
    {
      q: '在 ECMAScript 模块（ESM）中，如何从 ./math.js 引入命名导出 add？',
      choices: [
        {
          t: "import { add } from './math.js'",
          ok: true,
          why: '命名导出必须用花括号包裹导入名，且路径需带 .js 后缀。',
        },
        {
          t: "import add from './math.js'",
          ok: false,
          why: '不带花括号是默认导出语法，不能用来导入命名导出。',
        },
        {
          t: "const { add } = require('./math.js')",
          ok: false,
          why: 'require 是 CommonJS 语法，本仓主路径使用 ESM 的 import。',
        },
        {
          t: "import add as { add } from './math.js'",
          ok: false,
          why: '这不是合法的 import 语法，命名导入直接用花括号即可。',
        },
      ],
    },
    {
      q: 'Promise.all 等待的多个 Promise 中，有一个失败时会发生什么？',
      choices: [
        {
          t: '整体立即以该失败原因 reject，其余请求可能仍在后台执行',
          ok: true,
          why: 'Promise.all 采用短路策略，一个失败就整体失败；要汇总结果可用 allSettled。',
        },
        {
          t: '自动忽略失败的项，只返回成功项组成的数组',
          ok: false,
          why: '忽略失败项是 Promise.allSettled 的语义，不是 Promise.all 的行为。',
        },
        {
          t: '在代码解析阶段就报语法错误，无法运行',
          ok: false,
          why: '这是运行时的 Promise 状态变化，不是语法层面的错误。',
        },
        {
          t: '会变成同步 throw，无法用 catch 捕获',
          ok: false,
          why: '失败仍是通过 Promise 的 reject 传递，可以用 .catch 或 try/await 捕获。',
        },
      ],
    },
    {
      q: '浏览器和 Node.js 中 JavaScript「事件循环（Event Loop）」的直觉模型是什么？',
      choices: [
        {
          t: '单线程执行 JS 代码，异步回调通过任务队列调度，不阻塞调用栈',
          ok: true,
          why: '理解事件循环是掌握 JS 异步的关键：主线程跑同步代码，完成后处理队列中的回调。',
        },
        {
          t: '每执行一条 console.log 都会新建一个操作系统进程',
          ok: false,
          why: 'console.log 只是输出到控制台，不会创建新进程。',
        },
        {
          t: 'JavaScript 没有任务队列，所有 I/O 必须同步阻塞等待',
          ok: false,
          why: 'JS 正是通过事件循环实现非阻塞 I/O，同步阻塞会冻结整个页面或服务。',
        },
        {
          t: 'JavaScript 会用多线程并行执行每一行源代码',
          ok: false,
          why: '主线程仍是单线程执行 JS，Web Worker 是额外的并行机制另作讨论。',
        },
      ],
    },
  ],
});

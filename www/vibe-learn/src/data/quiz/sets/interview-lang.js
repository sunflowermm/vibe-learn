import { defineQuizSet } from '../schema.js';

/**
 * 语言/运行时大厂开口（mcq-expert：完整选项、长度相近、似真干扰）
 */
export default defineQuizSet({
  id: 'interview-lang-runtime',
  title: '大厂 · 语言与运行时',
  kind: 'interview',
  domain: 'lang',
  tags: ['JS', '事件循环', '闭包', '异步', '模块'],
  relatedNodes: ['code-async', 'code-functions', 'code-modules'],
  caption: '开口：事件循环、闭包、Promise、模块边界。',
  questions: [
    {
      id: 'interview-lang-runtime:timeout0',
      q: 'setTimeout(fn, 0) 会立刻同步执行吗？',
      choices: [
        {
          t: '不会；它进宏任务，等当前栈与微任务后再跑',
          ok: true,
          why: '延迟 0 只是尽快排队，不能插队同步代码。',
        },
        {
          t: '会；延迟写成 0 就能打断当前函数立刻执行',
          ok: false,
          why: '定时器不能打断正在执行的同步栈。',
        },
        {
          t: '会；运行时会另起操作系统进程来跑该回调',
          ok: false,
          why: '仍在同一 JS 线程的事件循环里调度。',
        },
        {
          t: '会；延迟 0 保证一定早于 Promise.then',
          ok: false,
          why: '通常微任务先于下一轮宏任务。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'interview-lang-runtime:closure',
      q: '闭包是什么？举一个实际用途。',
      choices: [
        {
          t: '函数可访问定义时外层变量；常用来封装私有状态',
          ok: true,
          why: '既给定义又给用途，方便追问生命周期。',
        },
        {
          t: '把源码压成一行方便拷贝，与作用域无关',
          ok: false,
          why: '那是压缩/混淆，不是闭包。',
        },
        {
          t: '只存在于 TypeScript，纯 JavaScript 没有',
          ok: false,
          why: '闭包是语言运行时概念，JS 本身就有。',
        },
        {
          t: '等价于全局变量，任何函数都能随便改写',
          ok: false,
          why: '闭包常用来限制可见范围，而非污染全局。',
        },
      ],
      relatedNodes: ['code-functions'],
    },
    {
      id: 'interview-lang-runtime:async-await',
      q: 'Promise 和 async/await 是什么关系？',
      choices: [
        {
          t: "async/await 是基于 Promise 的语法糖，让异步代码读起来像同步",
          ok: true,
          why: 'await 通常跟 Promise；本质仍是微任务调度。',
        },
        {
          t: '有了 async/await 就不再需要事件循环与微任务调度机制',
          ok: false,
          why: '异步仍靠事件循环；语法糖不取消运行时模型。',
        },
        {
          t: 'async 函数的返回值一定是普通字符串，绝不会被包装成 Promise',
          ok: false,
          why: 'async 函数返回 Promise，返回值会被包装。',
        },
        {
          t: 'Promise 只能用在浏览器端，Node 运行时本身并不支持',
          ok: false,
          why: 'Node 长期支持 Promise 与 async/await。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'interview-lang-runtime:modules',
      q: '为什么用 ESM 模块，而不是一个大脚本？',
      choices: [
        {
          t: '按文件拆分依赖与作用域，便于复用、少全局污染',
          ok: true,
          why: '模块解决组织与边界，是工程化基础。',
        },
        {
          t: '模块能让 JavaScript 自动变成多线程并行执行',
          ok: false,
          why: '模块不改变单线程模型；并行要靠 Worker 等。',
        },
        {
          t: '有了模块就完全不必再使用包管理器',
          ok: false,
          why: '第三方依赖仍常靠 npm/pnpm；模块只是加载格式。',
        },
        {
          t: 'export 会把变量复制到各导入方并自动同步内存',
          ok: false,
          why: '核心价值是封装与依赖图，不是「复制内存」。',
        },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'interview-lang-runtime:eq',
      q: '=== 和 == 在业务代码里怎么选？',
      choices: [
        {
          t: '=== 不转类型；业务比较优先用严格相等',
          ok: true,
          why: '== 会做类型转换，容易踩坑。',
        },
        {
          t: '== 更短，所以业务里应到处优先使用',
          ok: false,
          why: '隐式转换才是主要风险。',
        },
        {
          t: '二者语义完全相同，只是写法不一样',
          ok: false,
          why: '是否转换类型是关键差别。',
        },
        {
          t: '=== 只在 TypeScript 里存在，JS 没有',
          ok: false,
          why: '严格相等是 JavaScript 本身就有的运算。',
        },
      ],
      relatedNodes: ['lang-javascript'],
    },
    {
      id: 'interview-lang-runtime:race',
      q: '单线程 JavaScript 还会有数据竞态吗？',
      choices: [
        {
          t: '会；异步交错写共享状态时仍要串行或版本控制',
          ok: true,
          why: '事件循环不消灭交错覆盖。',
        },
        {
          t: '不会；单线程意味着绝不可能出现竞态',
          ok: false,
          why: '异步回调交错仍会造成覆盖写。',
        },
        {
          t: '不会；只有多核 CPU 上才会出现任何错误',
          ok: false,
          why: '逻辑层的交错写与核数无关。',
        },
        {
          t: '不会；用死循环空转等待即可永久消除竞态',
          ok: false,
          why: '会卡死事件循环，也不是正确并发控制。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'interview-lang-runtime:ts',
      q: 'TypeScript 类型信息上线到 Node 后还在吗？',
      choices: [
        {
          t: '默认编译擦除，运行时仍按 JavaScript 执行',
          ok: true,
          why: '类型主要在编译期检查。',
        },
        {
          t: '运行时仍完整保留类型并一直强制检查',
          ok: false,
          why: '默认产物会擦除类型。',
        },
        {
          t: '上线后会自动变成 Java 字节码再执行',
          ok: false,
          why: '本仓主服仍是 JS/TS on Node。',
        },
        {
          t: '有了 TypeScript 就不需要任何 JS 运行时',
          ok: false,
          why: '仍要 Node 等运行时执行。',
        },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'interview-lang-runtime:lib-fw',
      q: '库和框架的关键差别是什么？',
      choices: [
        {
          t: '库是你调用它；框架是它回调你的代码',
          ok: true,
          why: '控制反转是最常用的分界。',
        },
        {
          t: '框架等于一门新的编程语言，库只是语法糖',
          ok: false,
          why: '框架建立在语言与运行时之上。',
        },
        {
          t: '库一定比框架慢，所以生产只能用框架',
          ok: false,
          why: '性能与库/框架身份无必然关系。',
        },
        {
          t: '二者没有实质区别，只是营销用词不同',
          ok: false,
          why: '控制流归属不同，不是纯营销。',
        },
      ],
      relatedNodes: ['lang-library-framework'],
    },
  ],
});

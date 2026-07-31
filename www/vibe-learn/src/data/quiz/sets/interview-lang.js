import { defineQuizSet } from '../schema.js';

/**
 * 语言运行时大厂开口：事件循环、闭包、异步、模块。
 * 语法细节见 js-async / code-basics；竞态见 eng-concurrency。
 */
export default defineQuizSet({
  id: 'interview-lang-runtime',
  title: '大厂 · 语言与运行时',
  kind: 'interview',
  domain: 'lang',
  tags: ['JS', '事件循环', '闭包', '异步', '模块'],
  relatedNodes: ['code-async', 'code-functions', 'code-modules'],
  caption: '开口题：事件循环、闭包、Promise、模块边界——面试官能追问的那种。',
  questions: [
    {
      id: 'interview-lang-runtime:timeout0',
      q: '面试官问「JavaScript 里 setTimeout(fn, 0) 会不会立刻执行」，较好的回答是？',
      choices: [
        {
          t: '不会立刻；它进入宏任务队列，等当前调用栈与微任务清空后再跑',
          ok: true,
          why: '延迟 0 只是尽快排队，仍晚于同步代码与 Promise.then 等微任务。',
        },
        {
          t: '会像同步代码一样插队，打断当前函数立刻执行',
          ok: false,
          why: '定时器回调不能打断正在执行的同步代码。',
        },
        {
          t: 'setTimeout 会创建新的操作系统进程来跑回调',
          ok: false,
          why: '在同一 JS 线程的事件循环里调度，不是另起进程。',
        },
        {
          t: '只要延迟写成 0，就保证比 Promise.then 更早执行',
          ok: false,
          why: '通常微任务（then）先于下一轮宏任务（timeout）。',
        },
      ],
      relatedNodes: ['code-async', 'lang-javascript'],
    },
    {
      id: 'interview-lang-runtime:closure',
      q: '被问「什么是闭包（Closure），举一个实际用途」，怎么答比较稳？',
      choices: [
        {
          t: '函数能访问定义时外层作用域的变量；常用于封装私有状态或工厂函数',
          ok: true,
          why: '既给定义又给用途，方便追问内存与生命周期。',
        },
        {
          t: '闭包就是把代码压缩成一行，方便拷贝',
          ok: false,
          why: '那是压缩/混淆，与作用域闭包无关。',
        },
        {
          t: '闭包只存在于 TypeScript，纯 JavaScript 没有',
          ok: false,
          why: '闭包是语言运行时概念，JS 本身就有。',
        },
        {
          t: '闭包等于全局变量，任何函数都能随便改',
          ok: false,
          why: '闭包常用来避免污染全局、限制可见范围。',
        },
      ],
      relatedNodes: ['code-functions', 'lang-javascript'],
    },
    {
      id: 'interview-lang-runtime:async-await',
      q: '「Promise 和 async/await 是什么关系」，一句话怎么说清楚？',
      choices: [
        {
          t: 'async/await 是基于 Promise 的语法糖，让异步代码读起来像同步',
          ok: true,
          why: 'await 后面通常是 Promise；本质仍是微任务调度。',
        },
        {
          t: '有了 async/await 就不需要事件循环了',
          ok: false,
          why: '异步仍靠事件循环；语法糖不取消运行时模型。',
        },
        {
          t: 'async 函数返回的一定是字符串，不是 Promise',
          ok: false,
          why: 'async 函数返回 Promise；返回值会被包装。',
        },
        {
          t: 'Promise 只能用在浏览器，Node 不支持',
          ok: false,
          why: 'Node 长期支持 Promise 与 async/await。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'interview-lang-runtime:modules',
      q: '面试官问「为什么要用模块（ESM import/export）而不是一个大脚本」，重点说什么？',
      choices: [
        {
          t: '按文件拆分依赖与作用域，可复用、可缓存、避免全局污染与隐式顺序依赖',
          ok: true,
          why: '模块解决组织与边界问题，是工程化基础。',
        },
        {
          t: '模块能让 JavaScript 自动变成多线程并行执行',
          ok: false,
          why: '模块不改变单线程模型；并行要靠 Worker 等。',
        },
        {
          t: '有了模块就不需要包管理器了',
          ok: false,
          why: '第三方依赖仍常靠 npm/pnpm；模块只是加载格式。',
        },
        {
          t: 'export 会把变量复制到每个导入方，改一处全部自动同步改内存',
          ok: false,
          why: '核心价值是封装与依赖图；勿用「复制内存」糊弄过去。',
        },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'interview-lang-runtime:eq',
      q: '「== 和 === 有什么区别」被追问时，更专业的答法是？',
      choices: [
        {
          t: '=== 严格相等不转类型；== 会做类型转换，容易踩坑，业务代码优先 ===',
          ok: true,
          why: '大厂偏好明确、少隐式转换；可举字符串数字例子。',
        },
        {
          t: '两者完全一样，只是写法不同',
          ok: false,
          why: '== 会触发强制转换，行为不同。',
        },
        {
          t: '=== 只能比较数字，== 才能比较字符串',
          ok: false,
          why: '=== 可比较任意类型，类型不同时直接为 false。',
        },
        {
          t: '线上环境会自动把 == 优化成 ===，所以随便写',
          ok: false,
          why: '引擎不会改语义；混用 == 仍可能出逻辑 bug。',
        },
      ],
      relatedNodes: ['code-values-types', 'lang-javascript'],
    },
    {
      id: 'interview-lang-runtime:callback-hell',
      q: '被问「前端/Node 里如何避免回调地狱」，你可以说哪些手段？',
      choices: [
        {
          t: '用 Promise 链式或 async/await 扁平化控制流，并统一错误用 catch/try',
          ok: true,
          why: '标准演进路径；比继续嵌套回调更清晰。',
        },
        {
          t: '把所有回调函数都命名成 a、b、c 就行',
          ok: false,
          why: '命名不能解决嵌套与错误传播问题。',
        },
        {
          t: '禁止使用任何异步，全部改成同步阻塞',
          ok: false,
          why: 'I/O 同步阻塞会拖垮吞吐；应正确组织异步。',
        },
        {
          t: '只在全局挂一个回调，所有结果都往那里丢',
          ok: false,
          why: '全局回调难追踪、易互相覆盖。',
        },
      ],
      relatedNodes: ['code-async', 'code-functions'],
    },
  ],
});

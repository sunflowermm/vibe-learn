import { defineQuizSet } from '../schema.js';

/** Bloom 1 · 记忆：语言/运行时术语 */
export default defineQuizSet({
  id: 'concept-lang-remember',
  title: '术语 · 语言与运行时',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '记忆', '术语'],
  relatedNodes: ['lang-javascript', 'code-async', 'lang-typescript'],
  caption: '先认得词：闭包、事件循环、ESM、严格相等。',
  questions: [
    {
      id: 'concept-lang-remember:closure',
      q: '「闭包」指的是？',
      choices: [
        {
          t: '函数能访问定义时的外层变量（作用域链被保留）',
          ok: true,
          why: '作用域链保留；常用来封装私有状态。',
        },
        {
          t: '把源码压缩成一行以加快网络传输的构建步骤',
          ok: false,
          why: '那是 minify/压缩，不是闭包语义。',
        },
        {
          t: '仅 TypeScript 编译器提供、纯 JavaScript 没有的特性',
          ok: false,
          why: '闭包是 JS 语言特性，TS 同样继承。',
        },
        {
          t: '给全局变量起个别名，方便在任意文件直接改写',
          ok: false,
          why: '闭包常用来限制可见性，不是全局别名。',
        },
      ],
      relatedNodes: ['code-functions'],
    },
    {
      id: 'concept-lang-remember:esm',
      q: 'ESM 里导出/导入符号常用关键字？',
      choices: [
        {
          t: 'export / import',
          ok: true,
          why: '模块边界的标准关键字。',
        },
        {
          t: 'include / require_once',
          ok: false,
          why: '偏 PHP 等语言，不是 ESM。',
        },
        {
          t: 'using / namespace',
          ok: false,
          why: '偏 C#/C++ 命名空间写法。',
        },
        {
          t: 'package main',
          ok: false,
          why: 'Go 入口包声明，不是 JS ESM。',
        },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'concept-lang-remember:promise',
      q: 'async 函数的返回值，运行时通常是？',
      choices: [
        {
          t: 'Promise（即便函数体 return 普通值也会被包装）',
          ok: true,
          why: 'async 总是返回 Promise；要用 await/.then 取结果。',
        },
        {
          t: '一定是字符串类型，其它返回值会被运行时自动丢掉',
          ok: false,
          why: '可包装任意解析值，不限字符串。',
        },
        {
          t: '只能是 null，用来表示异步结果尚未完成',
          ok: false,
          why: '未完成时是 pending 的 Promise，不是强制 null。',
        },
        {
          t: '操作系统进程句柄，由内核直接调度该异步任务',
          ok: false,
          why: 'Promise 是语言/运行时对象，不是 OS 进程句柄。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-remember:ts',
      q: 'TypeScript 类型在默认编译后？',
      choices: [
        {
          t: '被擦除，产物是普通 JavaScript',
          ok: true,
          why: '运行时按 JS 执行；类型只在编译期。',
        },
        {
          t: '完整保留在产物里，并由 V8 强制运行时检查',
          ok: false,
          why: '默认擦除；运行时不读 TS 类型。',
        },
        {
          t: '变成 Java 字节码，由 JVM 直接执行',
          ok: false,
          why: '标准 tsc 输出是 JS，不是 JVM 字节码。',
        },
        {
          t: '替代 Node 运行时，浏览器可直接执行 .ts 文件',
          ok: false,
          why: '仍需转译/运行时；浏览器默认跑 JS。',
        },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'concept-lang-remember:json',
      q: 'HTTP API 结构化载荷最常见的文本格式？',
      choices: [
        {
          t: 'JSON',
          ok: true,
          why: 'Web API 生态默认；也常见于配置与本地存储。',
        },
        {
          t: '仅 Markdown（README 同款）',
          ok: false,
          why: 'Markdown 偏文档，不是 API 载荷主流。',
        },
        {
          t: '正则表达式源码本身',
          ok: false,
          why: '正则是匹配工具，不是载荷交换格式。',
        },
        {
          t: '强制且只能用二进制 protobuf，禁止 JSON',
          ok: false,
          why: 'protobuf 常见于高性能 RPC；JSON 仍是 HTTP API 主流。',
        },
      ],
      relatedNodes: ['data-json'],
    },
    {
      id: 'concept-lang-remember:eq',
      q: 'JavaScript 严格相等运算符是？',
      choices: [
        {
          t: '===（类型与值都相同才为真）',
          ok: true,
          why: '不做隐式类型转换；日常更推荐。',
        },
        {
          t: '==，并推荐在所有业务比较里优先使用',
          ok: false,
          why: '== 会转类型，易踩坑；应优先 ===。',
        },
        {
          t: ':=（短变量声明兼比较）',
          ok: false,
          why: '不是 JavaScript 运算符。',
        },
        {
          t: '<>（不等比较的唯一合法写法）',
          ok: false,
          why: '不是 JS；不等用 !== 或 !=。',
        },
      ],
      relatedNodes: ['lang-javascript'],
    },
  ],
});

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
        { t: '函数能访问定义时的外层变量', ok: true, why: '作用域链保留。' },
        { t: '把代码压成一行', ok: false, why: '那是压缩。' },
        { t: '仅 TypeScript 才有', ok: false, why: 'JS 就有。' },
        { t: '等于全局变量别名', ok: false, why: '常用来限制可见性。' },
      ],
      relatedNodes: ['code-functions'],
    },
    {
      id: 'concept-lang-remember:esm',
      q: 'ESM 里导出符号常用关键字？',
      choices: [
        { t: 'export / import', ok: true, why: '模块边界。' },
        { t: 'include / require_once', ok: false, why: '那是别的语言。' },
        { t: 'using / namespace', ok: false, why: '偏 C#/C++。' },
        { t: 'package main', ok: false, why: 'Go 入口。' },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'concept-lang-remember:promise',
      q: 'async 函数返回值类型通常是？',
      choices: [
        { t: 'Promise', ok: true, why: '返回值会被包装。' },
        { t: '一定是字符串', ok: false, why: '不是。' },
        { t: '只能是 null', ok: false, why: '不是。' },
        { t: '操作系统进程句柄', ok: false, why: '无关。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-remember:ts',
      q: 'TypeScript 类型在默认编译后？',
      choices: [
        { t: '被擦除，产物是 JS', ok: true, why: '运行时按 JS。' },
        { t: '完整保留并强制检查', ok: false, why: '默认擦除。' },
        { t: '变成 Java 字节码', ok: false, why: '不是。' },
        { t: '替代 Node 运行时', ok: false, why: '仍需运行时。' },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'concept-lang-remember:json',
      q: 'HTTP API 结构化载荷最常见？',
      choices: [
        { t: 'JSON', ok: true, why: '生态默认。' },
        { t: '仅 Markdown', ok: false, why: '偏文档。' },
        { t: '正则表达式', ok: false, why: '不是载荷格式。' },
        { t: '仅二进制 protobuf 强制', ok: false, why: 'JSON 仍主流。' },
      ],
      relatedNodes: ['data-json'],
    },
    {
      id: 'concept-lang-remember:eq',
      q: 'JS 严格相等运算符是？',
      choices: [
        { t: '===', ok: true, why: '不转类型。' },
        { t: '== 且推荐到处用', ok: false, why: '会转类型。' },
        { t: ':=', ok: false, why: '不是 JS。' },
        { t: '<>', ok: false, why: '不是 JS。' },
      ],
      relatedNodes: ['lang-javascript'],
    },
  ],
});

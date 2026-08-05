import { defineQuizSet } from '../schema.js';

/** TypeScript 与正则：类型擦除、any、模式匹配边界 */
export default defineQuizSet({
  id: 'concept-code-ts-regex',
  title: '概念 · TypeScript 与正则',
  kind: 'concept',
  domain: 'lang',
  tags: ['TypeScript', '正则'],
  relatedNodes: ['code-typescript-hands', 'code-regex'],
  caption: '类型把错误提前；正则管模式，嵌套结构交给解析器。',
  questions: [
    {
      id: 'concept-code-ts-regex:ts-gain',
      q: 'TypeScript 相对 JavaScript 带来的核心增益是什么？',
      choices: [
        {
          t: '在编写阶段做静态类型检查，把一类错误提前到编辑期发现',
          ok: true,
          why: '类型标注让编辑器能提示拼写与类型不匹配。',
        },
        {
          t: '编译后的程序在运行时一定比纯 JavaScript 更快',
          ok: false,
          why: '类型会擦除，运行的仍是普通 JS，性能相当。',
        },
        {
          t: '运行时自带完整反射，每个变量都能查出完整类型树',
          ok: false,
          why: '类型在编译期擦除；运行时没有 TS 类型树。',
        },
        {
          t: '让代码不需要经过任何编译步骤即可在浏览器直接当 TS 执行',
          ok: false,
          why: 'TS 需编译/转译为 JS 后才能执行（除非特殊工具链）。',
        },
      ],
      relatedNodes: ['code-typescript-hands', 'lang-typescript'],
    },
    {
      id: 'concept-code-ts-regex:erase',
      q: 'TypeScript 中的类型标注，最终进入 Node.js 运行时后会怎样？',
      choices: [
        {
          t: '在编译或转译阶段被擦除，实际运行的是普通 JavaScript',
          ok: true,
          why: '类型系统只存在于开发时。',
        },
        {
          t: '类型信息会原样保留在 V8 引擎字节码中并参与执行',
          ok: false,
          why: '引擎不执行类型标注，它们只在编译前由 TS 使用。',
        },
        {
          t: '必须手动把每个类型标注复制到 .env 环境变量里才能生效',
          ok: false,
          why: '类型写在 .ts 源文件，与环境变量无关。',
        },
        {
          t: '类型标注会在运行时自动拦截所有非法操作并回滚',
          ok: false,
          why: 'TS 不做运行时强制校验，错误应在编译期捕获。',
        },
      ],
      relatedNodes: ['code-typescript-hands', 'lang-nodejs'],
    },
    {
      id: 'concept-code-ts-regex:regex',
      q: '正则表达式（Regular Expression）相对更擅长处理什么任务？',
      choices: [
        {
          t: '按模式匹配、搜索和抽取文本中的特定片段',
          ok: true,
          why: '适合校验格式、抽日志字段等模式操作。',
        },
        {
          t: '替代关系型数据库执行跨表 ACID 事务与索引优化',
          ok: false,
          why: '事务由数据库引擎管理，正则只处理字符串。',
        },
        {
          t: '完整解析任意层嵌套的 HTML/JSON 并保证结构正确',
          ok: false,
          why: '深层嵌套应交应用解析器；正则易碎难维护。',
        },
        {
          t: '编译并链接操作系统内核模块到目标硬件',
          ok: false,
          why: '那是编译器/链接器的工作，与正则无关。',
        },
      ],
      relatedNodes: ['code-regex'],
    },
    {
      id: 'concept-code-ts-regex:parser',
      q: '面对复杂的嵌套语法结构（如完整 JSON 或 HTML），是否总该用正则解析？',
      choices: [
        {
          t: '不应该；嵌套结构通常需要专门的解析器（Parser）来处理',
          ok: true,
          why: '正则不擅长任意层嵌套；用 JSON.parse 或 DOM 等工具。',
        },
        {
          t: '应该；一条足够长的正则就能可靠解析任意编程语言源码',
          ok: false,
          why: '经典误区；不可靠且难维护。',
        },
        {
          t: '正则只能匹配单个字符，无法匹配多个字符组成的模式',
          ok: false,
          why: '可以匹配多字符模式；短板是深层嵌套结构。',
        },
        {
          t: '正则和解析器在能力上完全等价，选哪个对正确性没影响',
          ok: false,
          why: '解析器理解语法结构；复杂场景应选对工具。',
        },
      ],
      relatedNodes: ['code-regex', 'data-json'],
    },
    {
      id: 'concept-code-ts-regex:any',
      q: 'TypeScript 中过度使用 any 类型会导致什么问题？',
      choices: [
        {
          t: '等于关闭了类型检查的收益，应逐步替换为具体类型',
          ok: true,
          why: 'any 让编译器跳过检查，失去 TS 最大安全保障。',
        },
        {
          t: '类型系统会因此变得更加严格，拒绝所有隐式转换',
          ok: false,
          why: 'any 恰恰放松检查，允许任意操作。',
        },
        {
          t: '程序在运行时必定崩溃，无法正常启动或执行',
          ok: false,
          why: 'any 不导致必崩，只是编译期发现不了错误。',
        },
        {
          t: 'any 只能用于数字类型，不能用于字符串或对象',
          ok: false,
          why: 'any 表示任意类型，可赋任何值。',
        },
      ],
      relatedNodes: ['code-typescript-hands', 'lang-typescript'],
    },
    {
      id: 'concept-code-ts-regex:email-ok',
      q: '校验「用户输入是否像邮箱格式」时，更稳妥的工程直觉？',
      choices: [
        {
          t: '用适度正则或成熟校验库做格式门禁，最终仍以发信/验证码确认',
          ok: true,
          why: '格式像邮箱≠真实邮箱；正则只做第一道。',
        },
        {
          t: '写一条试图覆盖 RFC 全部边角的超长正则，并当作唯一真理',
          ok: false,
          why: '邮箱 RFC 极复杂；超长正则难维护且仍会误判。',
        },
        {
          t: '只要包含 @ 字符就一律放行，不再做任何格式检查',
          ok: false,
          why: '过松会产生大量脏数据；至少做基础格式门禁。',
        },
        {
          t: '把整段用户输入交给 eval 执行，用运行结果判断是否合法邮箱',
          ok: false,
          why: 'eval 用户输入是严重安全风险，与邮箱校验无关。',
        },
      ],
      relatedNodes: ['code-regex', 'craft-security'],
      tags: ['应用'],
    },
  ],
});

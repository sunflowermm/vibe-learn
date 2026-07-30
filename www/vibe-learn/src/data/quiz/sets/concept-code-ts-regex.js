import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-code-ts-regex',
  title: '概念 · TypeScript 与正则',
  kind: 'concept',
  domain: 'lang',
  tags: ['TypeScript', '正则'],
  relatedNodes: ['code-typescript-hands', 'code-regex', 'lang-typescript'],
  questions: [
    {
      q: 'TypeScript 相对 JavaScript 带来的核心增益是什么？',
      choices: [
        {
          t: '在编写阶段做静态类型检查，把一类错误提前到编辑期发现',
          ok: true,
          why: '类型标注让编辑器能提示拼写错误和类型不匹配，减少运行时才发现的 bug。',
        },
        {
          t: '编译后的程序在运行时一定比纯 JavaScript 更快',
          ok: false,
          why: 'TypeScript 编译后会擦除类型，最终运行的 JS 与手写 JS 性能相当。',
        },
        {
          t: '完全取代操作系统，直接在硬件上执行类型检查',
          ok: false,
          why: 'TypeScript 是语言层面的工具，仍需要 Node 等运行时和操作系统支持。',
        },
        {
          t: '让代码不需要经过任何编译步骤即可在浏览器运行',
          ok: false,
          why: 'TypeScript 必须编译或转译为 JavaScript 后才能被浏览器和 Node 执行。',
        },
      ],
    },
    {
      q: 'TypeScript 中的类型标注，最终进入 Node.js 运行时后会怎样？',
      choices: [
        {
          t: '在编译或转译阶段被擦除，实际运行的是普通 JavaScript',
          ok: true,
          why: 'TypeScript 的类型系统只存在于开发时，运行时没有类型信息。',
        },
        {
          t: '类型信息会原样保留在 V8 引擎字节码中并参与执行',
          ok: false,
          why: 'JavaScript 引擎不执行类型标注，它们只在编译前由 TS 编译器使用。',
        },
        {
          t: '必须手动把每个类型标注复制到 .env 环境变量里',
          ok: false,
          why: '类型标注写在 .ts 源文件中，由编译器处理，与环境变量无关。',
        },
        {
          t: '类型标注会在运行时自动拦截所有非法操作',
          ok: false,
          why: 'TypeScript 不做运行时强制校验，类型错误应在编译期被捕获。',
        },
      ],
    },
    {
      q: '正则表达式（Regular Expression）相对更擅长处理什么任务？',
      choices: [
        {
          t: '按模式匹配、搜索和抽取文本中的特定片段',
          ok: true,
          why: '正则适合验证邮箱格式、提取日志字段等基于模式的文本操作。',
        },
        {
          t: '替代关系型数据库执行 ACID 事务',
          ok: false,
          why: '数据库事务由 SQL 引擎管理，正则只处理字符串模式，不能存取数据。',
        },
        {
          t: '编译 C 语言内核模块并链接到操作系统',
          ok: false,
          why: '编译内核需要 gcc 等编译器，与正则表达式完全无关。',
        },
        {
          t: '管理 Docker 容器的生命周期和镜像构建',
          ok: false,
          why: '容器管理是 Docker 等工具的职能，不是正则表达式的用途。',
        },
      ],
    },
    {
      q: '面对复杂的嵌套语法结构（如完整 JSON 或 HTML），是否总该用正则解析？',
      choices: [
        {
          t: '不应该；嵌套结构通常需要专门的解析器（Parser）来处理',
          ok: true,
          why: '正则不擅长处理任意层嵌套，复杂语法应使用 JSON.parse 或 DOM 解析等工具。',
        },
        {
          t: '应该；一条足够长的正则就能解析任意编程语言',
          ok: false,
          why: '这是经典误区，正则无法可靠匹配任意嵌套结构，会导致难以维护的代码。',
        },
        {
          t: '正则只能匹配单个字符，无法匹配多个字符组成的模式',
          ok: false,
          why: '正则可以匹配多字符模式如 \\d+、\\w+，只是不擅长处理深层嵌套。',
        },
        {
          t: '正则和解析器完全等价，选哪个都一样',
          ok: false,
          why: '解析器理解语法结构，正则是字符模式匹配，复杂场景应选对工具。',
        },
      ],
    },
    {
      q: 'TypeScript 中过度使用 any 类型会导致什么问题？',
      choices: [
        {
          t: '等于关闭了类型检查的收益，应逐步替换为具体类型',
          ok: true,
          why: 'any 让编译器跳过检查，失去 TypeScript 最大的安全保障。',
        },
        {
          t: '类型系统会因此变得更加严格，拒绝所有隐式转换',
          ok: false,
          why: 'any 的效果恰恰相反，它允许任意操作而不报错。',
        },
        {
          t: '程序在运行时必定崩溃，无法正常运行',
          ok: false,
          why: 'any 不会导致运行时崩溃，只是让编译期无法发现潜在错误。',
        },
        {
          t: 'any 只能用于数字类型，不能用于字符串或对象',
          ok: false,
          why: 'any 表示任意类型，可以赋任何值，这正是它失去类型安全的原因。',
        },
      ],
    },
  ],
});

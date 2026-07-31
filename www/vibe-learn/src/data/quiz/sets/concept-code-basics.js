import { defineQuizSet } from '../schema.js';

/** 编程脊骨：控制流/函数/对象/模块/读错（JS 深坑见 js-async；竞态见 eng-concurrency） */
export default defineQuizSet({
  id: 'concept-code-basics',
  title: '概念 · 编程基础脊骨',
  kind: 'concept',
  domain: 'lang',
  tags: ['JS', '控制流', '函数', '对象'],
  relatedNodes: ['code-first-program', 'code-control-flow', 'code-functions'],
  caption: '会跑、会分支、会封装、会读错——再进异步与类型。',
  questions: [
    {
      id: 'concept-code-basics:first',
      q: '编写并运行「第一个程序」对零基础学习者最大的价值是什么？',
      choices: [
        {
          t: '打通从编辑代码、保存文件到运行并看到输出的完整闭环',
          ok: true,
          why: '亲手跑通第一个程序能建立信心，确认开发环境已正确配置。',
        },
        {
          t: '要求一次就写出完整的产品级应用',
          ok: false,
          why: '第一个程序通常只有几行，目的是熟悉流程而非交付产品。',
        },
        {
          t: '证明编程不需要学习任何语法规则',
          ok: false,
          why: '即使最简单的程序也涉及基本语法，语法是后续学习的基础。',
        },
        {
          t: '只要复制粘贴代码就算学会，不必理解每行含义',
          ok: false,
          why: '能运行只是开始，理解代码在做什么才能真正建立编程思维。',
        },
      ],
      relatedNodes: ['code-first-program', 'workbench-editor'],
    },
    {
      id: 'concept-code-basics:control',
      q: '编程语言中的 if 和 for 语句属于哪一类基础概念？',
      choices: [
        {
          t: '控制流（Control Flow）：决定程序走哪条分支、循环执行几次',
          ok: true,
          why: '控制流让程序能根据条件做判断和重复操作，是逻辑表达的核心工具。',
        },
        {
          t: '网络传输协议，负责在远程两台电脑之间发送数据包',
          ok: false,
          why: '网络协议如 TCP、HTTP 属于通信层，与控制流是完全不同的层次。',
        },
        {
          t: '操作系统内核模块，直接管理硬件中断',
          ok: false,
          why: '内核模块是系统软件，if/for 是高级语言提供的语法结构。',
        },
        {
          t: '数据库查询语言，专门用来写 SQL 语句',
          ok: false,
          why: 'SQL 用于查询数据库，if/for 是通用编程语言的控制结构。',
        },
      ],
      relatedNodes: ['code-control-flow'],
    },
    {
      id: 'concept-code-basics:fn',
      q: '把重复逻辑封装成函数（Function），最直接的好处是什么？',
      choices: [
        {
          t: '可以复用代码、用名字表达意图，并缩小变量作用范围',
          ok: true,
          why: '函数让代码更易读、易维护，避免同一逻辑在多处复制粘贴。',
        },
        {
          t: '让程序永远不会出现任何运行时错误',
          ok: false,
          why: '函数只是组织代码的方式，逻辑错误仍可能发生，需要测试和调试。',
        },
        {
          t: '完全取代 Git 等版本控制工具',
          ok: false,
          why: '版本控制管理代码历史，函数管理代码结构，两者解决不同问题。',
        },
        {
          t: '函数只能调用一次，第二次调用会自动报错',
          ok: false,
          why: '函数的设计目的就是允许反复调用，复用正是其核心价值。',
        },
      ],
      relatedNodes: ['code-functions'],
    },
    {
      id: 'concept-code-basics:obj',
      q: '编程中的对象（Object）和数组（Array）常用来做什么？',
      choices: [
        {
          t: '把多个相关值打包成结构，通过键名或下标索引来取用',
          ok: true,
          why: '对象和数组是组织数据的基本容器，几乎每段程序都会用到。',
        },
        {
          t: '专门用来加密 TLS 传输层的数据',
          ok: false,
          why: 'TLS 加密由密码学库和协议栈完成，与数据结构无关。',
        },
        {
          t: '启动 Docker 容器并管理镜像',
          ok: false,
          why: '容器管理是运维工具的职责，不是对象和数组的用途。',
        },
        {
          t: '只能在数据库中创建，编程语言里不存在',
          ok: false,
          why: 'JavaScript 等语言原生支持对象和数组，是最常用的数据类型。',
        },
      ],
      relatedNodes: ['code-objects-arrays'],
    },
    {
      id: 'concept-code-basics:errors',
      q: '程序报错时，推荐的阅读和排查顺序是什么？',
      choices: [
        {
          t: '先看错误类型和栈顶的文件行号，再对照刚才修改的代码',
          ok: true,
          why: '错误信息通常指向最近改动处，按栈顶定位是最高效的排障起点。',
        },
        {
          t: '第一步先重装操作系统，再考虑看报错内容',
          ok: false,
          why: '绝大多数代码错误与系统无关，重装既耗时又无法定位问题。',
        },
        {
          t: '第一步先删除整个代码仓库，从头重新 clone',
          ok: false,
          why: '删仓库会丢失未提交的改动，且无法帮助理解错误原因。',
        },
        {
          t: '忽略所有报错信息，反复运行直到偶然成功',
          ok: false,
          why: '错误信息包含类型和位置线索，忽略它们会浪费大量时间。',
        },
      ],
      relatedNodes: ['code-read-errors', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-code-basics:eq',
      q: 'JavaScript 中严格相等运算符 === 与 == 的主要区别是什么？',
      choices: [
        {
          t: '=== 不做类型转换，类型和值都相同才为真，日常更推荐',
          ok: true,
          why: '== 会在比较前自动转换类型，可能产生意外结果，=== 行为更可预测。',
        },
        {
          t: '两者完全等价，在任何情况下结果都相同',
          ok: false,
          why: '例如 0 == false 为 true，但 0 === false 为 false，行为明显不同。',
        },
        {
          t: '== 永远比 === 更安全，应优先使用',
          ok: false,
          why: '== 的隐式类型转换容易引入隐蔽 bug，社区普遍推荐 ===。',
        },
        {
          t: '=== 只能比较数字，不能比较字符串',
          ok: false,
          why: '=== 可以比较任意类型，只是要求类型和值都严格匹配。',
        },
      ],
      relatedNodes: ['code-values-types', 'lang-javascript'],
    },
    {
      id: 'concept-code-basics:const',
      q: '现代 JS 声明变量时，更推荐的默认选择是？',
      choices: [
        {
          t: 'const 优先；需要再赋值再用 let；少用 var',
          ok: true,
          why: '缩小意外重绑与函数作用域坑。',
        },
        {
          t: '只用 var，禁止 const',
          ok: false,
          why: '社区已转向 let/const；var 有函数作用域与提升坑。',
        },
        {
          t: '变量必须全部挂到 globalThis',
          ok: false,
          why: '污染全局、难追踪；应尽量模块内局部声明。',
        },
        {
          t: '声明关键字可以随便造',
          ok: false,
          why: '语法固定为 let/const/var，随意造词是语法错误。',
        },
      ],
      relatedNodes: ['code-values-types', 'code-first-program'],
      tags: ['基础'],
    },
    {
      id: 'concept-code-basics:ref',
      q: '对象/数组作为工具参数或 JSON 体时，最该警惕？',
      choices: [
        {
          t: '引用共享与浅拷贝：改「副本」可能改到原对象',
          ok: true,
          why: '会话状态、缓存、工具参数常被偷偷改写。',
        },
        {
          t: '数组下标必须从 1 开始否则 JSON 非法',
          ok: false,
          why: 'JS 数组从 0；JSON 数组本身不写数字下标字段。',
        },
        {
          t: '对象不能嵌套',
          ok: false,
          why: '对象可以多层嵌套；嵌套是常见数据结构。',
        },
        {
          t: 'map/filter 一定深拷贝整棵树',
          ok: false,
          why: '通常只映射一层；元素若是对象仍可能是同一引用。',
        },
      ],
      relatedNodes: ['code-objects-arrays', 'data-json'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-code-basics:modules',
      q: '把代码拆成模块（import/export）的直接收益？',
      choices: [
        {
          t: '边界清晰、可复用、依赖显式，避免单文件巨石',
          ok: true,
          why: '与「函数封装」同一思想，升到文件级。',
        },
        {
          t: '模块化后永不需要测试',
          ok: false,
          why: '边界更清晰后仍要测关键路径与回归。',
        },
        {
          t: 'import 会自动部署到生产',
          ok: false,
          why: 'import 只是加载模块；部署靠 CI/发布流程。',
        },
        {
          t: '有模块就不需要 Git',
          ok: false,
          why: '模块管组织，Git 管历史，互不替代。',
        },
      ],
      relatedNodes: ['code-modules', 'code-functions'],
      tags: ['基础'],
    },
    {
      id: 'concept-code-basics:json',
      q: 'JSON.parse 与 JSON.stringify 的正确配对直觉？',
      choices: [
        {
          t: 'parse：字符串→对象；stringify：对象→字符串——API 与本地存储常成对出现',
          ok: true,
          why: '非法 JSON 会抛错，要 try/catch 或校验。',
        },
        {
          t: 'parse 用于加密',
          ok: false,
          why: 'parse 只做反序列化，不提供加密能力。',
        },
        {
          t: 'stringify 会执行字符串里的代码',
          ok: false,
          why: '那是 eval 的危险；stringify 只生成文本。',
        },
        {
          t: '二者只能用于 YAML',
          ok: false,
          why: '面向 JSON；YAML 要用专门解析库。',
        },
      ],
      relatedNodes: ['data-json', 'code-values-types'],
      tags: ['基础'],
    },
    {
      id: 'concept-code-basics:await',
      q: 'async/await 相对「回调金字塔」的主要价值？',
      choices: [
        {
          t: '用同步外形写异步流程，错误可用 try/catch 收敛',
          ok: true,
          why: '底层仍是 Promise；深坑见 js-async / eng-concurrency。',
        },
        {
          t: 'await 会让 CPU 真的休眠操作系统',
          ok: false,
          why: '等待的是 Promise 完成，事件循环继续调度其它任务。',
        },
        {
          t: '有了 await 就不需要处理拒绝（reject）',
          ok: false,
          why: '拒绝仍会抛错，要用 try/catch 或 .catch。',
        },
        {
          t: 'async 函数不能返回 Promise',
          ok: false,
          why: 'async 函数总是返回 Promise。',
        },
      ],
      relatedNodes: ['code-async'],
      tags: ['进阶'],
    },
    {
      id: 'concept-code-basics:typeerror',
      q: 'TypeError: Cannot read properties of undefined 读堆栈时优先想？',
      choices: [
        {
          t: '某个对象是 undefined/null，却还在取属性——对一下数据与可选链',
          ok: true,
          why: '读报错类型+行号，再查数据来源。',
        },
        {
          t: '一定是路由器硬件坏了',
          ok: false,
          why: '这是应用层数据问题，不是硬件故障。',
        },
        {
          t: '表示 Git 冲突标记未删',
          ok: false,
          why: '冲突标记是另一类报错/语法问题，不是 TypeError 取属性。',
        },
        {
          t: '可以忽略，浏览器会自动补对象',
          ok: false,
          why: '不会自动补；不处理就会在该行抛错中断。',
        },
      ],
      relatedNodes: ['code-read-errors', 'code-objects-arrays'],
      tags: ['基础', '进阶'],
    },
  ],
});

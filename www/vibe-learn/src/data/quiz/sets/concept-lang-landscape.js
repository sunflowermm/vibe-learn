import { defineQuizSet } from '../schema.js';

/** 语言 / 库 / 框架 / 技术栈选型原则（具体框架名见 lang-frameworks） */
export default defineQuizSet({
  id: 'concept-lang-landscape',
  title: '概念 · 语言、框架与技术栈',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '框架', '选型'],
  relatedNodes: ['lang-what-is-language', 'lang-library-framework', 'lang-tech-stack'],
  caption: '先分清语言/库/框架/栈，再谈选型与本仓契约。',
  questions: [
    {
      id: 'concept-lang-landscape:lang-vs-fw',
      q: '从层次关系看，「编程语言」与「框架（Framework）」的主要区别是什么？',
      choices: [
        {
          t: '语言定义语法与语义规则；框架是在语言之上提供约定和脚手架',
          ok: true,
          why: '先选语言再选框架：语言是表达工具，框架帮你组织项目结构。',
        },
        {
          t: '二者完全同义，只是叫法不同没有实质差别',
          ok: false,
          why: 'JavaScript 是语言，Express 是框架，层次明显不同。',
        },
        {
          t: '框架比编程语言更底层，直接运行在硬件之上',
          ok: false,
          why: '框架依赖语言及其运行时，语言才是更底层的抽象。',
        },
        {
          t: '编程语言只能写配置文件，框架才能写业务逻辑',
          ok: false,
          why: '语言可以写任何逻辑；框架提供结构与约定。',
        },
      ],
      relatedNodes: ['lang-what-is-language', 'lang-library-framework'],
    },
    {
      id: 'concept-lang-landscape:lib-vs-fw',
      q: '你在写业务：调 lodash 是一种体验，搭 Vue/Express 又是另一种。库和框架差在谁主导调用？',
      choices: [
        {
          t: '你主动调用库里的函数',
          ok: true,
          why: '控制反转（IoC）：用库是你主导，用框架是框架主导调用顺序。',
        },
        {
          t: '库一定比框架运行速度更慢',
          ok: false,
          why: '性能取决于实现，与是库还是框架无必然关系。',
        },
        {
          t: '框架不能依赖任何第三方库，必须全部自研',
          ok: false,
          why: '框架通常由大量库组成。',
        },
        {
          t: '库只能在前端使用，框架只能在后端使用',
          ok: false,
          why: '前后端都有库和框架。',
        },
      ],
      relatedNodes: ['lang-library-framework'],
    },
    {
      id: 'concept-lang-landscape:stack',
      q: '团队讨论「技术栈（Tech Stack）」时，通常指的是什么？',
      choices: [
        {
          t: '一组协同工作的语言、运行时、框架和中间件的整体选择',
          ok: true,
          why: '如「Node + TypeScript + Express + PostgreSQL」就是一套栈。',
        },
        {
          t: '某一个源代码文件的文件名',
          ok: false,
          why: '技术栈是宏观技术组合，不是单个文件名。',
        },
        {
          t: '仅指显示器或键盘等硬件设备的品牌',
          ok: false,
          why: '栈通常指软件选型，不是外设品牌。',
        },
        {
          t: 'Git 仓库中的 commit 提交历史记录',
          ok: false,
          why: '提交历史是版本记录，与工具组合无关。',
        },
      ],
      relatedNodes: ['lang-tech-stack', 'lang-landscape'],
    },
    {
      id: 'concept-lang-landscape:xrk',
      q: '本仓库（XRK-AGT）主服的技术语言契约更贴近哪一项？',
      choices: [
        {
          t: 'Node.js 运行时上的 JavaScript 与 Ty',
          ok: true,
          why: '主服以 JS/TS + Node 编写；子服可另用 Python 等。',
        },
        {
          t: '必须且只能使用 PHP 作为唯一后端语言',
          ok: false,
          why: '本仓主服不是 PHP 选型。',
        },
        {
          t: '只能在单片机裸机上运行，不支持通用服务器',
          ok: false,
          why: '面向标准 Node 服务器环境的后端 Runtime。',
        },
        {
          t: '主服用 Python 编写，Node 只负责前端页面',
          ok: false,
          why: 'Python 常见于子服 apis；主服入口是 Node。',
        },
      ],
      relatedNodes: ['lang-to-runtime', 'runtime-nodejs', 'xrk-language-stack'],
    },
    {
      id: 'concept-lang-landscape:compiled',
      q: '讨论「编译型」与「解释型」语言时，更稳妥的说法是什么？',
      choices: [
        {
          t: '要看具体实现和运行时，很多语言两种特征兼有，边界常模糊',
          ok: true,
          why: 'Java 字节码、JS JIT 等混合策略很常见。',
        },
        {
          t: '所有编程语言都可以严格分成编译或解释两类，永不混合',
          ok: false,
          why: '现代语言常混合；严格二分易误导。',
        },
        {
          t: '编译型语言完全不需要任何运行时环境即可执行',
          ok: false,
          why: '仍需 OS 与系统调用等运行时支持。',
        },
        {
          t: '解释型语言在运行前必须先完整编译成独立可执行文件',
          ok: false,
          why: '解释路径通常不必然产出独立可执行文件。',
        },
      ],
      relatedNodes: ['lang-compiled-runtime', 'lang-what-is-language'],
    },
    {
      id: 'concept-lang-landscape:select',
      q: '为新项目做语言或框架选型时，更应优先问清哪些问题？',
      choices: [
        {
          t: '团队现有技能、部署环境、生态成熟度和问题域是否匹配',
          ok: true,
          why: '选型服务需求，而非追逐热度。',
        },
        {
          t: '哪个技术的 Logo 颜色最好看、最符合审美',
          ok: false,
          why: '审美与长期可维护性无直接关系。',
        },
        {
          t: '哪个关键词在搜索引擎上热度最高就选哪个',
          ok: false,
          why: '热度不等于适合你的团队与场景。',
        },
        {
          t: '永远选最新发布的语言，不考虑文档和社区支持',
          ok: false,
          why: '缺生态与文档风险高。',
        },
      ],
      relatedNodes: ['lang-tech-selection', 'lang-tech-stack'],
    },
  ],
});

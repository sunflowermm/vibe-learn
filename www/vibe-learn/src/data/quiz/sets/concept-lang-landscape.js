import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-lang-landscape',
  title: '概念 · 语言、框架与技术栈',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '框架', '选型'],
  relatedNodes: [
    'lang-what-is-language',
    'lang-library-framework',
    'lang-tech-stack',
    'lang-tech-selection',
    'lang-landscape',
    'lang-compiled-runtime',
    'lang-to-runtime',
    'fw-vue',
  ],
  questions: [
    {
      q: '从层次关系看，「编程语言」与「框架（Framework）」的主要区别是什么？',
      choices: [
        {
          t: '语言定义语法与语义规则；框架是在语言之上提供约定和脚手架',
          ok: true,
          why: '先选语言再选框架：语言是表达工具，框架帮你组织项目结构和常见模式。',
        },
        {
          t: '二者完全同义，只是叫法不同没有实质差别',
          ok: false,
          why: 'JavaScript 是语言，Express 是框架，层次和功能明显不同。',
        },
        {
          t: '框架比编程语言更底层，直接运行在硬件之上',
          ok: false,
          why: '框架依赖语言及其运行时，语言才是更底层的抽象。',
        },
        {
          t: '编程语言只能写配置文件，框架才能写业务逻辑',
          ok: false,
          why: '语言可以写任何逻辑，框架提供的是结构和约定而非唯一手段。',
        },
      ],
    },
    {
      q: '「库（Library）」与「框架（Framework）」的常见差别直觉是什么？',
      choices: [
        {
          t: '你主动调用库里的函数；框架定义流程，在合适时机回调你的代码',
          ok: true,
          why: '这被称为控制反转（IoC）：用库是你主导，用框架是框架主导调用顺序。',
        },
        {
          t: '库一定比框架运行速度更慢',
          ok: false,
          why: '性能取决于具体实现，与是库还是框架没有必然关系。',
        },
        {
          t: '框架不能依赖任何第三方库，必须全部自研',
          ok: false,
          why: '框架本身通常由大量库组成，如 React 生态中的各种配套包。',
        },
        {
          t: '库只能在前端使用，框架只能在后端使用',
          ok: false,
          why: '前后端都有库和框架，如 lodash 是库、NestJS 是后端框架。',
        },
      ],
    },
    {
      q: '团队讨论「技术栈（Tech Stack）」时，通常指的是什么？',
      choices: [
        {
          t: '一组协同工作的语言、运行时、框架和中间件的整体选择',
          ok: true,
          why: '如「Node + TypeScript + Express + PostgreSQL」描述的就是一套技术栈。',
        },
        {
          t: '某一个源代码文件的文件名',
          ok: false,
          why: '技术栈是宏观的技术组合，不是单个文件的命名。',
        },
        {
          t: '仅指显示器或键盘等硬件设备的品牌',
          ok: false,
          why: '硬件属于基础设施，技术栈通常指软件层面的技术选型。',
        },
        {
          t: 'Git 仓库中的 commit 提交历史记录',
          ok: false,
          why: '提交历史是版本记录，与技术栈所描述的工具组合无关。',
        },
      ],
    },
    {
      q: '本仓库（XRK-AGT）主服的技术语言契约更贴近哪一项？',
      choices: [
        {
          t: 'Node.js 运行时上的 JavaScript 与 TypeScript',
          ok: true,
          why: '项目规范明确使用 Node ≥ 26 和 pnpm，主服代码以 JS/TS 编写。',
        },
        {
          t: '必须且只能使用 PHP 作为唯一后端语言',
          ok: false,
          why: '本仓是 Node.js 项目，PHP 不是主服的技术选型。',
        },
        {
          t: '只能在单片机裸机上运行，不支持通用服务器',
          ok: false,
          why: 'XRK-AGT 是面向多端的后端 Runtime，运行在标准 Node 服务器环境。',
        },
        {
          t: '主服用 Python 编写，Node 只负责前端页面',
          ok: false,
          why: 'Python 用于子服 apis，主服入口是 Node.js 的 app.js / agent-runtime。',
        },
      ],
    },
    {
      q: '讨论「编译型」与「解释型」语言时，更稳妥的说法是什么？',
      choices: [
        {
          t: '要看具体实现和运行时，很多语言两种特征兼有，边界常模糊',
          ok: true,
          why: 'Java 先编译成字节码再解释，JS 有 JIT 编译，简单二分容易误导初学者。',
        },
        {
          t: '所有编程语言都可以严格分成编译或解释两类，永不混合',
          ok: false,
          why: '现代语言常采用混合策略，如 TypeScript 编译后由 Node 解释执行。',
        },
        {
          t: '编译型语言完全不需要任何运行时环境即可执行',
          ok: false,
          why: '即使 C 编译成机器码，也需要操作系统提供系统调用等运行时支持。',
        },
        {
          t: '解释型语言在运行前必须先完整编译成独立可执行文件',
          ok: false,
          why: '解释型语言通常逐行或逐段执行，不必然产生独立可执行文件。',
        },
      ],
    },
    {
      q: '为新项目做语言或框架选型时，更应优先问清哪些问题？',
      choices: [
        {
          t: '团队现有技能、部署环境、生态成熟度和问题域是否匹配',
          ok: true,
          why: '选型应服务于实际需求，而非追逐热度，匹配度决定长期维护成本。',
        },
        {
          t: '哪个技术的 Logo 颜色最好看、最符合审美',
          ok: false,
          why: '视觉偏好与项目能否顺利交付和维护没有直接关系。',
        },
        {
          t: '哪个关键词在搜索引擎上热度最高就选哪个',
          ok: false,
          why: '搜索热度反映关注度，不保证适合你的团队规模和业务场景。',
        },
        {
          t: '永远选最新发布的语言，不考虑文档和社区支持',
          ok: false,
          why: '缺乏生态和文档的新语言风险高，初学者更需要成熟稳定的工具链。',
        },
      ],
    },
  ],
});

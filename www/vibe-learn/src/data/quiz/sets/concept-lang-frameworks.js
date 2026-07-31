import { defineQuizSet } from '../schema.js';

/**
 * 语言 / 框架地图：每题锚定具体 fw-* / lang-*；选型原则见 lang-landscape。
 */
export default defineQuizSet({
  id: 'concept-lang-frameworks',
  title: '概念 · 语言与框架地图（补绑）',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '框架', '选型', '补缺'],
  relatedNodes: ['lang-library-framework', 'lang-landscape'],
  caption: '分清语言与框架职责；每题锚定不同课节点。',
  questions: [
    {
      id: 'concept-lang-frameworks:q1',
      q: 'React 在技术栈里更准确的定位是？',
      choices: [
        {
          t: '建立在 JavaScript 上的 UI 库（生态常当框架用），不是一门独立编程语言',
          ok: true,
          why: '宿主仍是 JS/TS；语言与库分层。',
        },
        {
          t: '替代操作系统的内核',
          ok: false,
          why: 'React 是用户态 UI 库，调度仍由 OS/浏览器负责。',
        },
        {
          t: '只能写数据库存储过程',
          ok: false,
          why: '面向界面渲染与组件，不是 SQL 存储过程语言。',
        },
        {
          t: '与 HTTP 协议同层',
          ok: false,
          why: 'HTTP 是传输协议；React 在应用/表现层。',
        },
      ],
      relatedNodes: ['fw-react', 'lang-javascript', 'lang-library-framework'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q2',
      q: 'Angular 相对「只选一个 UI 库」的常见差异？',
      choices: [
        {
          t: '更偏全家桶 Framework：路由、表单、依赖注入等约定更完整，TypeScript 优先',
          ok: true,
          why: '选型时要接受其约束换生产力。',
        },
        {
          t: 'Angular 是一种 CPU 指令集',
          ok: false,
          why: '它是 Web 应用框架，不是处理器指令集。',
        },
        {
          t: 'Angular 等于 DNS',
          ok: false,
          why: 'DNS 解析域名；Angular 组织前端应用结构。',
        },
        {
          t: '没有 TypeScript 也能称 Angular 官方默认栈',
          ok: false,
          why: '官方文档与脚手架以 TypeScript 为默认路径。',
        },
      ],
      relatedNodes: ['fw-angular', 'lang-typescript', 'lang-library-framework'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q3',
      q: 'Next.js 与「纯客户端 React SPA」的关键差别？',
      choices: [
        {
          t: 'Next 在 React 之上提供路由与服务端渲染/全栈能力，仍用 JS/TS',
          ok: true,
          why: '元框架 ≠ 新语言。',
        },
        {
          t: 'Next 取代 TCP',
          ok: false,
          why: '仍建立在网络栈之上，不取代传输协议。',
        },
        {
          t: '有了 Next 就不需要 HTTP',
          ok: false,
          why: '页面与 API 仍走 HTTP（或同源约定）。',
        },
        {
          t: 'Next 只能跑在单片机',
          ok: false,
          why: '面向 Node/服务器与浏览器部署，不是 MCU 固件框架。',
        },
      ],
      relatedNodes: ['fw-nextjs', 'fw-react', 'lang-javascript'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q4',
      q: 'Spring / Spring Boot 主要服务哪一类宿主语言生态？',
      choices: [
        {
          t: 'Java（及 JVM 生态）应用框架，提供 IoC、自动配置等，不是「Spring 语言」',
          ok: true,
          why: '语言与框架分层：先有 Java，再有 Spring。',
        },
        {
          t: '只写 CSS 动画',
          ok: false,
          why: 'Spring 是后端应用框架，不是样式语言。',
        },
        {
          t: '替代 IP 地址',
          ok: false,
          why: '与寻址无关；它组织 JVM 上的应用组件。',
        },
        {
          t: '只能做嵌入式固件',
          ok: false,
          why: '主流场景是服务端与企业应用，不是 MCU 固件。',
        },
      ],
      relatedNodes: ['fw-spring', 'lang-java', 'lang-library-framework'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q5',
      q: 'Express / Nest 通常建立在什么运行时上？',
      choices: [
        {
          t: 'Node.js（JavaScript/TypeScript）HTTP 服务框架层',
          ok: true,
          why: '本仓主服同属 Node 世界。',
        },
        {
          t: '只能编译成机器码的 Fortran',
          ok: false,
          why: '二者是 JS/TS 生态的 HTTP 框架，不是 Fortran。',
        },
        {
          t: '浏览器专用汇编',
          ok: false,
          why: '跑在 Node 服务端（也可配合前端），不是汇编。',
        },
        {
          t: '与 Docker 镜像格式相同',
          ok: false,
          why: '框架是代码层；镜像是打包运行环境的格式。',
        },
      ],
      relatedNodes: ['fw-express-nest', 'lang-nodejs', 'runtime-nodejs'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q6',
      q: 'Django / FastAPI 分别更贴近？',
      choices: [
        {
          t: 'Python Web 框架：Django 偏全家桶，FastAPI 偏现代 API/类型注解与性能',
          ok: true,
          why: '同语言不同框架风格。',
        },
        {
          t: '二者都是以太网物理层标准',
          ok: false,
          why: '物理层是网线/光电；它们是应用层 Web 框架。',
        },
        {
          t: '只能操作 Redis 协议',
          ok: false,
          why: '可接多种存储与 HTTP API，不限于 Redis。',
        },
        {
          t: '与域名注册商 API 同义',
          ok: false,
          why: '是应用框架，不是域名注册服务。',
        },
      ],
      relatedNodes: ['fw-django-fastapi', 'lang-python', 'lang-library-framework'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q7',
      q: 'Gin 与 ASP.NET Core、Laravel 的共同点？',
      choices: [
        {
          t: '都是各自语言生态里的 Web/应用框架（Go / C# / PHP），不是独立操作系统',
          ok: true,
          why: '选型看团队与宿主语言。',
        },
        {
          t: '三者必须同时安装才能上网',
          ok: false,
          why: '任选其一即可建服务；上网也不依赖装齐三者。',
        },
        {
          t: '都是 MAC 地址格式',
          ok: false,
          why: 'MAC 是网卡地址；这些是应用框架名。',
        },
        {
          t: '只能跑在没有 CPU 的机器上',
          ok: false,
          why: '正需要 CPU 与操作系统来跑进程。',
        },
      ],
      relatedNodes: ['fw-gin', 'fw-aspnet', 'fw-laravel', 'lang-go'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q8',
      q: 'HTML / CSS 在「语言版图」里应如何归类？',
      choices: [
        {
          t: '标记与样式语言：描述结构与呈现，不是 Vue/React 那类应用框架',
          ok: true,
          why: '前端地基与框架分层。',
        },
        {
          t: '等于 TCP 三次握手',
          ok: false,
          why: '握手是传输层行为；HTML/CSS 描述文档与样式。',
        },
        {
          t: '只能写后端事务',
          ok: false,
          why: '面向文档结构与视觉呈现，不是数据库事务语言。',
        },
        {
          t: '替代包管理器 lockfile',
          ok: false,
          why: 'lockfile 锁依赖版本；HTML/CSS 不管包版本。',
        },
      ],
      relatedNodes: ['lang-html-css', 'lang-landscape'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q9',
      q: 'Rust / C 相对托管运行时语言（如 JS）的常见工程直觉？',
      choices: [
        {
          t: '更贴近系统与性能边界，内存/安全模型与心智成本不同；选型看问题域',
          ok: true,
          why: '没有绝对最优语言，只有匹配场景。',
        },
        {
          t: 'Rust 和 C 都是 CSS 预处理器',
          ok: false,
          why: '它们是系统级编程语言，不是样式预处理器。',
        },
        {
          t: '有了它们就不需要网络协议',
          ok: false,
          why: '仍可实现/调用网络协议；语言不取消网络栈。',
        },
        {
          t: '只能用于写小说',
          ok: false,
          why: '用于系统、嵌入式、高性能服务等工程场景。',
        },
      ],
      relatedNodes: ['lang-rust', 'lang-c', 'lang-tech-selection', 'lang-compiled-runtime'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q10',
      q: '「接到本仓运行时」时，语言选型最务实的第一问？',
      choices: [
        {
          t: '主服能力用 Node；子服/工具链可用 Python 等——按扩展点与团队熟练度接，而不是追新潮名词',
          ok: true,
          why: '对齐本仓边界：主服 JS/TS，子服可多语言。',
        },
        {
          t: '必须先重写操作系统',
          ok: false,
          why: '接到 Runtime 扩展点即可，不必重写 OS。',
        },
        {
          t: '禁止使用任何框架',
          ok: false,
          why: '框架可按场景选用；禁令过于绝对。',
        },
        {
          t: '只能选已经停更的语言',
          ok: false,
          why: '应选有维护与生态的语言，停更反而危险。',
        },
      ],
      relatedNodes: ['lang-to-runtime', 'runtime-nodejs', 'xrk-language-stack'],
      tags: ['进阶', 'XRK'],
    },
  ],
});

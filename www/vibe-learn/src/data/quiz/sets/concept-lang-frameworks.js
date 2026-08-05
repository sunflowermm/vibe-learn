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
          t: '一门独立于 JavaScript 的编程语言，自带编译器、包管理与标准库',
          ok: false,
          why: 'React 是 JS 库；语法仍是 JS/JSX，宿主是 JS 引擎。',
        },
        {
          t: '浏览器内核级渲染引擎，可直接替代 Chromium 的排版与合成管线',
          ok: false,
          why: '仍跑在浏览器/运行时之上，不替代渲染引擎。',
        },
        {
          t: '后端 ORM 与 SQL 方言，专门把组件树编译成数据库存储过程语句',
          ok: false,
          why: '面向界面组件与渲染，不是数据库访问层。',
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
          t: '更偏极简 UI 原语：官方不提供路由、表单与 DI，约定尽量少，默认用纯 JS',
          ok: false,
          why: 'Angular 正是约定完整的全家桶；官方路径以 TypeScript 为主。',
        },
        {
          t: '只是 CSS 原子类工具集，不负责组件树、变更检测、路由、表单与依赖注入',
          ok: false,
          why: 'Angular 是应用框架，不是原子 CSS 工具。',
        },
        {
          t: '只是构建打包器插件，编译结束后运行时不再保留模块、变更检测与 DI 概念',
          ok: false,
          why: '运行时仍有模块、DI 与变更检测等框架机制。',
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
          t: 'Next 是一门新语言，编译后不再依赖 JavaScript 或 TypeScript',
          ok: false,
          why: '仍是 JS/TS 元框架，建立在 React 之上。',
        },
        {
          t: 'Next 只能做纯客户端 SPA，官方禁止任何服务端渲染或路由约定',
          ok: false,
          why: 'SSR/路由/全栈正是相对纯 SPA 的常见增值。',
        },
        {
          t: '有了 Next 就可以取消 HTTP，页面与数据只走自定义二进制总线',
          ok: false,
          why: '页面与 API 仍建立在 HTTP（或同源 Web 约定）上。',
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
          t: 'Python Web 微框架生态，默认解释执行，与 JVM 字节码无关',
          ok: false,
          why: '那是 Django/Flask/FastAPI 一侧；Spring 锚定 JVM。',
        },
        {
          t: '浏览器端 UI 组件库，主要输出 JSX，宿主是 JavaScript 引擎',
          ok: false,
          why: 'Spring 是服务端/应用框架，不是前端 UI 库。',
        },
        {
          t: '一门叫 Spring 的独立语言，可脱离 Java/Kotlin 单独编译运行',
          ok: false,
          why: '没有「Spring 语言」；代码仍是 Java/Kotlin 等。',
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
          t: 'JVM（Java/Kotlin）Servlet 容器与 Spring 生态之上',
          ok: false,
          why: '那是 Spring 等路径；Express/Nest 锚定 Node。',
        },
        {
          t: '浏览器专用渲染进程，不能在服务器上监听 TCP 端口',
          ok: false,
          why: '典型用途正是 Node 上的 HTTP 服务。',
        },
        {
          t: '仅 Docker 镜像规范层，与具体语言运行时无关',
          ok: false,
          why: '框架是代码层；镜像只是可选的打包方式。',
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
          t: 'JavaScript 前端框架：Django 偏组件库，FastAPI 偏构建工具链',
          ok: false,
          why: '二者都是 Python Web 框架，不是前端 JS 栈。',
        },
        {
          t: '同一框架的两个发行版名：功能完全等价，只是文档品牌不同',
          ok: false,
          why: '风格与默认能力不同：全家桶 vs 偏 API/类型。',
        },
        {
          t: '仅操作 Redis 协议的客户端库，不能处理 HTTP 请求与路由',
          ok: false,
          why: '核心是 HTTP Web/API；存储可接多种后端。',
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
          t: '都是同一门语言的官方标准库模块，换宿主语言后就不能再使用任何同名包',
          ok: false,
          why: '分属 Go / C# / PHP 生态，不是「一门语言的标准库」。',
        },
        {
          t: '都是独立操作系统发行版，安装后可以直接替代 Linux 内核以及整套用户态',
          ok: false,
          why: '它们是应用框架，跑在已有 OS 与语言运行时之上。',
        },
        {
          t: '必须三个同时部署在同一个进程里，否则就无法对外提供任何 HTTP 服务',
          ok: false,
          why: '任选其一即可建服务；无「三者同装」硬性要求。',
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
          t: '应用框架层：自带路由、状态管理与构建约定，可替代 Vue/React',
          ok: false,
          why: 'HTML/CSS 描述文档与样式；组件框架是另一层。',
        },
        {
          t: '后端事务与存储过程语言：专门表达数据库提交与回滚语义',
          ok: false,
          why: '面向结构与呈现，不是事务 DSL。',
        },
        {
          t: '包管理与锁文件格式：用来钉死依赖树，替代 package-lock/pnpm-lock',
          ok: false,
          why: 'lockfile 管依赖版本；HTML/CSS 不管包解析。',
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
          t: '有了它们就可以取消网络与操作系统，应用直接跑在裸金属上且无需协议',
          ok: false,
          why: '仍可实现/调用网络与 OS 能力；语言不取消协议栈。',
        },
        {
          t: '二者都是样式预处理器，编译后只输出 CSS，与系统编程无关',
          ok: false,
          why: '它们是系统/性能向编程语言，不是 CSS 预处理。',
        },
        {
          t: '心智成本更低、默认有 GC 托管，因此任何 Web 业务都应优先于 JS',
          ok: false,
          why: '内存模型与心智成本往往更高；选型应看问题域而非绝对优先。',
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
          t: '先把主服整体改写成当前最新潮的一门语言，再回头考虑是否还要保留现有扩展点与 Loader',
          ok: false,
          why: '应沿扩展点接入；追语言名词重写底座成本高、风险大。',
        },
        {
          t: '禁止使用任何框架与子服，所有业务能力都必须用裸 Node 标准库在主服进程内全部重写',
          ok: false,
          why: '框架与子服可按场景选用；禁令过于绝对。',
        },
        {
          t: '只选已经停更、几乎没有包生态的冷门语言，以免日后依赖升级带来兼容、迁移与安全成本',
          ok: false,
          why: '停更与无生态反而更危险；应选可维护路径。',
        },
      ],
      relatedNodes: ['lang-to-runtime', 'runtime-nodejs', 'xrk-language-stack'],
      tags: ['进阶', 'XRK'],
    },
  ],
});

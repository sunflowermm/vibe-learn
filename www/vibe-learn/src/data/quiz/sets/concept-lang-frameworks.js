import { defineQuizSet } from '../schema.js';

/**
 * 语言 / 框架地图补绑：让各 fw-*、lang-* 课都能刷到本课相关题。
 */
export default defineQuizSet({
  id: 'concept-lang-frameworks',
  title: '概念 · 语言与框架地图（补绑）',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '框架', '选型', '补缺'],
  relatedNodes: [
    'fw-react',
    'fw-angular',
    'fw-nextjs',
    'fw-spring',
    'lang-html-css',
    'lang-python',
    'lang-go',
    'lang-java',
  ],
  caption: '分清语言与框架职责；每题锚定不同课节点，避免「相关题」只落在三四个枢纽卡。',
  questions: [
    {
      id: 'concept-lang-frameworks:q1',
      q: 'React 在技术栈里更准确的定位是？',
      choices: [
        { t: '建立在 JavaScript 上的 UI 库（生态常当框架用），不是一门独立编程语言', ok: true, why: '宿主仍是 JS/TS。' },
        { t: '替代操作系统的内核', ok: false, why: '否。' },
        { t: '只能写数据库存储过程', ok: false, why: '否。' },
        { t: '与 HTTP 协议同层', ok: false, why: '层次不对。' },
      ],
      relatedNodes: ['fw-react', 'lang-javascript', 'lang-library-framework'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q2',
      q: 'Angular 相对「只选一个 UI 库」的常见差异？',
      choices: [
        { t: '更偏全家桶 Framework：路由、表单、依赖注入等约定更完整，TypeScript 优先', ok: true, why: '选型时要接受其约束换生产力。' },
        { t: 'Angular 是一种 CPU 指令集', ok: false, why: '否。' },
        { t: 'Angular 等于 DNS', ok: false, why: '否。' },
        { t: '没有 TypeScript 也能称 Angular 官方默认栈', ok: false, why: '官方以 TS 为主。' },
      ],
      relatedNodes: ['fw-angular', 'lang-typescript', 'lang-library-framework'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q3',
      q: 'Next.js 与「纯客户端 React SPA」的关键差别？',
      choices: [
        { t: 'Next 在 React 之上提供路由与服务端渲染/全栈能力，仍用 JS/TS', ok: true, why: '元框架 ≠ 新语言。' },
        { t: 'Next 取代 TCP', ok: false, why: '否。' },
        { t: '有了 Next 就不需要 HTTP', ok: false, why: '仍走 HTTP。' },
        { t: 'Next 只能跑在单片机', ok: false, why: '否。' },
      ],
      relatedNodes: ['fw-nextjs', 'fw-react', 'lang-javascript'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q4',
      q: 'Spring / Spring Boot 主要服务哪一类宿主语言生态？',
      choices: [
        { t: 'Java（及 JVM 生态）应用框架，提供 IoC、自动配置等，不是「Spring 语言」', ok: true, why: '语言与框架分层。' },
        { t: '只写 CSS 动画', ok: false, why: '否。' },
        { t: '替代 IP 地址', ok: false, why: '否。' },
        { t: '只能做嵌入式固件', ok: false, why: '否。' },
      ],
      relatedNodes: ['fw-spring', 'lang-java', 'lang-library-framework'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q5',
      q: 'Express / Nest 通常建立在什么运行时上？',
      choices: [
        { t: 'Node.js（JavaScript/TypeScript）HTTP 服务框架层', ok: true, why: '本仓主服同属 Node 世界。' },
        { t: '只能编译成机器码的 Fortran', ok: false, why: '否。' },
        { t: '浏览器专用汇编', ok: false, why: '否。' },
        { t: '与 Docker 镜像格式相同', ok: false, why: '否。' },
      ],
      relatedNodes: ['fw-express-nest', 'lang-nodejs', 'runtime-nodejs'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q6',
      q: 'Django / FastAPI 分别更贴近？',
      choices: [
        { t: 'Python Web 框架：Django 偏全家桶，FastAPI 偏现代 API/类型注解与性能', ok: true, why: '同语言不同框架风格。' },
        { t: '二者都是以太网物理层标准', ok: false, why: '否。' },
        { t: '只能操作 Redis 协议', ok: false, why: '否。' },
        { t: '与域名注册商 API 同义', ok: false, why: '否。' },
      ],
      relatedNodes: ['fw-django-fastapi', 'lang-python', 'lang-library-framework'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q7',
      q: 'Gin 与 ASP.NET Core、Laravel 的共同点？',
      choices: [
        { t: '都是各自语言生态里的 Web/应用框架（Go / C# / PHP），不是独立操作系统', ok: true, why: '选型看团队与宿主语言。' },
        { t: '三者必须同时安装才能上网', ok: false, why: '否。' },
        { t: '都是 MAC 地址格式', ok: false, why: '否。' },
        { t: '只能跑在没有 CPU 的机器上', ok: false, why: '否。' },
      ],
      relatedNodes: ['fw-gin', 'fw-aspnet', 'fw-laravel', 'lang-go', 'lang-csharp', 'lang-php'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q8',
      q: 'HTML / CSS 在「语言版图」里应如何归类？',
      choices: [
        { t: '标记与样式语言：描述结构与呈现，不是 Vue/React 那类应用框架', ok: true, why: '前端地基与框架分层。' },
        { t: '等于 TCP 三次握手', ok: false, why: '否。' },
        { t: '只能写后端事务', ok: false, why: '否。' },
        { t: '替代包管理器 lockfile', ok: false, why: '否。' },
      ],
      relatedNodes: ['lang-html-css', 'lang-landscape', 'fw-vue'],
      tags: ['基础'],
    },
    {
      id: 'concept-lang-frameworks:q9',
      q: 'Rust / C 相对托管运行时语言（如 JS）的常见工程直觉？',
      choices: [
        { t: '更贴近系统与性能边界，内存/安全模型与心智成本不同；选型看问题域', ok: true, why: '没有绝对最优语言。' },
        { t: 'Rust 和 C 都是 CSS 预处理器', ok: false, why: '否。' },
        { t: '有了它们就不需要网络协议', ok: false, why: '否。' },
        { t: '只能用于写小说', ok: false, why: '否。' },
      ],
      relatedNodes: ['lang-rust', 'lang-c', 'lang-tech-selection', 'lang-compiled-runtime'],
      tags: ['进阶'],
    },
    {
      id: 'concept-lang-frameworks:q10',
      q: '「接到本仓运行时」时，语言选型最务实的第一问？',
      choices: [
        { t: '主服能力用 Node；子服/工具链可用 Python 等——按扩展点与团队熟练度接，而不是追新潮名词', ok: true, why: '对齐本仓边界。' },
        { t: '必须先重写操作系统', ok: false, why: '否。' },
        { t: '禁止使用任何框架', ok: false, why: '过激。' },
        { t: '只能选已经停更的语言', ok: false, why: '否。' },
      ],
      relatedNodes: ['lang-to-runtime', 'runtime-nodejs', 'xrk-language-stack'],
      tags: ['进阶', 'XRK'],
    },
  ],
});

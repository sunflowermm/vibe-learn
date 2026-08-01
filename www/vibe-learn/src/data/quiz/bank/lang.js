/**
 * 静态题库 · lang
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:lang:code-spine:core",
    q: "工具链闭环；封装函数；对象/数组用途；两请求写库互盖；报错怎么读——哪组判断全对？",
    choices: [
      { t: "编辑→保存→正确运行时→见输出；函数复用与命名；对象/数组是 JSON 载荷底座；单线程也有异步竞态；读类型+关键句+自己代码帧", ok: true, why: "编程脊骨合并成一案，考点密度高于五道「应先抓住」。" },
      { t: "能高亮就算跑通；函数只能调用一次；对象不能做 API 载荷；单线程无竞态；报错越长越可忽略", ok: false, why: "全是反模式。" },
      { t: "异步竞态靠死循环等待最稳", ok: false, why: "卡死事件循环。" },
      { t: "报错只看第三方框架最底帧", ok: false, why: "先看自己代码帧。" },
    ],
    kind: "concept",
    domain: "lang",
    tags: ["场景","课核"],
    relatedNodes: ["code-first-program","code-values-types","code-control-flow","code-functions","code-objects-arrays","code-async","code-modules","code-read-errors","code-checkpoint"],
    source: 'static',
  },
  {
    id: "s:lang:data-text:core",
    q: "HTTP/LLM 载荷；本仓配置模板；AGENTS/skills；代理与密钥；插件字符串校验——各更贴哪种文字形态？",
    choices: [
      { t: "JSON；YAML；Markdown；.env/环境变量；正则", ok: true, why: "数据文字四件套 + 正则，对接配置与校验，不必拆五道名词题。" },
      { t: "全部用 Markdown 当 API 载荷最稳", ok: false, why: "API 常用 JSON；MD 偏文档。" },
      { t: "密钥应写进 YAML 并提交仓库", ok: false, why: "应用 env/秘密管理，勿进仓。" },
      { t: "正则可以替代权限与鉴权", ok: false, why: "校验≠授权。" },
    ],
    kind: "concept",
    domain: "lang",
    tags: ["场景","课核"],
    relatedNodes: ["data-json","data-yaml","data-markdown","data-env","code-regex"],
    source: 'static',
  },
  {
    id: "s:lang:js-node-ts:core",
    q: "本仓主服语言/运行时？TS 上线后本质？Vue/React 与 Express/Nest 各属哪一层？",
    choices: [
      { t: "主服 JS/TS on Node；TS 编译擦除后仍是 JS；Vue/React 是前端 UI 层，Express/Nest 是 Node HTTP 框架——都不是「另一门主服语言」", ok: true, why: "宿主与框架轨分清；对接本仓多 runtime 子服前先锁主服契约。" },
      { t: "主服应改 Java；TS 运行时仍保留全部类型", ok: false, why: "与本仓相反；类型擦除。" },
      { t: "Vue 是语言；Nest 是操作系统", ok: false, why: "都是框架/库层。" },
      { t: "有了前端框架就不需要 Node 主服", ok: false, why: "本仓主服仍是 Node。" },
    ],
    kind: "concept",
    domain: "lang",
    tags: ["场景","课核"],
    relatedNodes: ["lang-javascript","lang-nodejs","lang-typescript","code-typescript-hands","lang-to-runtime","fw-vue","fw-react","fw-express-nest"],
    source: 'static',
  },
  {
    id: "s:lang:polyglot-fw:core",
    q: "主服仍是 Node 时，Python/Go/Rust/Java… 与 Spring/Django/Gin 在本仓地图上怎么摆？",
    choices: [
      { t: "多语言多在子服卸重活；Spring 等是各语言上的框架轨，不是替换主服宿主；HTML/CSS 是页面地基；Shell/PS 是运维脚本", ok: true, why: "版图题：语言宿主 vs 框架 vs 脚本，一次堵住「全都重写主服」。" },
      { t: "每种语言都应再写一套完整主服 Runtime", ok: false, why: "主服单一 Node 宿主。" },
      { t: "框架名可以当语言名写进简历分层", ok: false, why: "语言与框架要分开说。" },
      { t: "有了 Spring 就不需要 HTTP 与进程概念", ok: false, why: "框架仍跑在进程与协议上。" },
    ],
    kind: "concept",
    domain: "lang",
    tags: ["场景","课核"],
    relatedNodes: ["lang-python","lang-go","lang-rust","lang-java","lang-csharp","lang-php","lang-c","lang-shell","lang-powershell","lang-html-css","fw-spring","fw-django-fastapi","fw-gin","fw-aspnet","fw-laravel","fw-angular","fw-nextjs"],
    source: 'static',
  },
  {
    id: "s:lang:what-stack:core",
    q: "lodash 与 Vue/Express；介绍「技术栈」；选型第一原则；编译型与 VM 型差别——四问合并，正确组合是？",
    choices: [
      { t: "库你调用它、框架回调你；栈是语言+运行时+框架+中间件组合；选型看场景约束；编译/VM 决定如何变成进程动作", ok: true, why: "语言章「地图题」：分层与选型一次考清，避免四道定义背诵。" },
      { t: "框架=语言；栈=只选一个框架名；永远追最热门；编译型无需运行时考虑", ok: false, why: "层级与约束都错了。" },
      { t: "库一定比框架慢；选型只看薪资排名", ok: false, why: "无必然性能关系；要看场景。" },
      { t: "技术栈面试只背缩写不必说约束", ok: false, why: "缺约束的选型是空话。" },
    ],
    kind: "concept",
    domain: "lang",
    tags: ["场景","课核"],
    relatedNodes: ["lang-what-is-language","lang-library-framework","lang-tech-stack","lang-tech-selection","lang-landscape","lang-compiled-runtime"],
    source: 'static',
  }
];

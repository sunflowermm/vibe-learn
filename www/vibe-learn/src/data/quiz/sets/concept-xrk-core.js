import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-xrk-core',
  title: '概念 · XRK Runtime / Core / 配置',
  kind: 'concept',
  domain: 'xrk',
  tags: ['Runtime', 'Core', '配置', '插件'],
  relatedNodes: [
    'xrk-runtime',
    'xrk-core-layout',
    'xrk-plugin-arch',
    'xrk-config',
    'xrk-http-www',
    'xrk-http-auth',
    'xrk-lab-http',
  ],
  questions: [
    {
      q: '在 XRK-AGT 里，Agent Runtime（智能体运行时）启动后主要负责哪些事情？',
      choices: [
        { t: '在 Node 进程内扫描各 Core 目录，挂载插件、HTTP 等扩展并读取配置', ok: true, why: 'Agent Runtime 是框架底座：负责加载扩展与统一配置，不是某个聊天机器人产品的固定名字。' },
        { t: 'Agent Runtime 就是某个固定品牌的 QQ 机器人成品，下载后只能改昵称', ok: false, why: 'XRK-AGT 是通用运行时，具体业务由各 Core 插件实现，并非单一成品应用。' },
        { t: 'Agent Runtime 必须手写操作系统内核模块，否则 Node.js 无法启动', ok: false, why: '运行时跑在 Node.js 之上，不需要也不应该由业务开发者写 OS 内核。' },
        { t: 'Agent Runtime 只在浏览器里运行，与服务器进程和 Loader 完全无关', ok: false, why: 'Agent Runtime 是服务端进程内的中枢对象；浏览器静态页只是 Core 的一种交付形态。' },
      ],
    },
    {
      q: '作为 Core 开发者，你的插件、HTTP 接口、AI 工作流等业务代码，默认应放在仓库哪里？',
      choices: [
        { t: 'core/<core名>/ 下对应子目录，例如 plugin/、http/、workflow/', ok: true, why: '业务一律进 Core 目录，Loader 按约定扫描挂载；放对位置才会被自动发现。' },
        { t: '直接修改 src/infrastructure/ 里的框架源码，改完保存就能被 Loader 加载', ok: false, why: 'Core 开发者不得改 Runtime；缺能力应扩基类或请框架维护者扩展 src/。' },
        { t: '写在聊天窗口或本地笔记里，Agent 会自动把内容注入到运行中的进程', ok: false, why: '代码必须落盘到约定目录，Loader 只会扫描文件系统，不会读聊天记录。' },
        { t: '放在仓库根目录任意新建的文件夹里，只要文件名看起来像插件即可', ok: false, why: '放码位置有固定约定，随意放置不会被 Loader 扫描到，也就无法挂载。' },
      ],
    },
    {
      q: 'XRK 的插件式架构对新手来说，Loader 最该记住的直觉是什么？',
      choices: [
        { t: '把插件按目录约定放好，继承基类，启动时 Loader 自动扫描并挂载', ok: true, why: '无需手改 app.js 主入口；继承 PluginBase 等基类、放对目录即可被加载。' },
        { t: '每次启动前都要手动把插件源码复制粘贴进 app.js 才能生效', ok: false, why: 'Loader 负责发现与实例化，不是人工拼接 main 入口。' },
        { t: '框架禁止扩展，只能使用内置的几个固定功能，不能新增插件', ok: false, why: 'XRK 的设计核心就是可扩展：插件、HTTP、工作流、Tasker 等都是扩展点。' },
        { t: '插件必须先发布到应用商店审核通过，主服才会从云端下载并加载', ok: false, why: '本地 core/ 目录内的插件即可被扫描，没有应用商店审核环节。' },
      ],
    },
    {
      q: '独立产品 Core 改一项配置时，为什么要同时维护 default/、commonconfig/ 与消费代码这三处？',
      choices: [
        { t: 'default/ 模板 + commonconfig/ schema + 实际读取配置的代码，三处字段一致才能生效', ok: true, why: '缺模板则新环境无法引导复制；缺 schema 则字段无校验；缺消费代码则改了 yaml 也不被读取。' },
        { t: '只改 data/<产品>/ 下的一份 yaml，README 和代码都不用动就算完成', ok: false, why: '运行时数据依赖模板引导；schema 约束字段；代码必须真正 read 配置。' },
        { t: '只改 README 文档说明，代码里硬编码同样字符串就能替代配置系统', ok: false, why: '文档不驱动运行时；消费代码必须通过 ConfigBase 等读配置，不能靠注释。' },
        { t: '三同步指 Git 的 add、commit、push 三个命令，与 yaml 字段无关', ok: false, why: '这是 XRK 配置工程约定，指模板、schema、代码三处同步，不是 Git 工作流。' },
      ],
    },
    {
      q: 'Core 自带的 Web 静态页（www）应该放在哪里？为什么产品目录名不能用 shared？',
      choices: [
        { t: '放在 core/<core>/www/<应用名>/；shared 是框架保留根段，会被挂载规则占用', ok: true, why: '每个产品用自有目录名（如 vibe-learn）；mountCoreWwwStatic 会跳过保留段。' },
        { t: '放在仓库根目录随便建 shared/ 文件夹，因为访问路径最短最省事', ok: false, why: 'shared 为保留名，产品页应放在 Core 的 www 子目录，避免路由冲突。' },
        { t: '放在 src/factory/ 里与 LLM 工厂放一起，方便统一管理所有前端资源', ok: false, why: 'www 是 Core 业务前端，不属于 LLM 工厂等基础设施目录。' },
        { t: 'Core 目录里不允许放 HTML，静态页只能托管在外部 CDN 上', ok: false, why: '框架提供 mountCoreWwwStatic，可直接挂载 Core 内 www 子目录为 /<应用名>。' },
      ],
    },
    {
      q: 'config/default_config/ 适合放哪类配置？独立产品 Core 的业务配置模板又应放在哪里？',
      choices: [
        { t: 'default_config 放 AGT 运行时与 system-Core 模板；独立产品放 core/<名>/default/', ok: true, why: '配置归属按产品类型划分，避免业务 yaml 污染框架根 config 目录。' },
        { t: '所有 Core（含娱乐插件、独立产品）的业务配置都塞进 default_config/', ok: false, why: '独立产品模板在 Core 自己的 default/，按规则不得进根 config/default_config/。' },
        { t: '把 API 密钥明文写进 default_config 模板，同事 clone 仓库后就能直接调用', ok: false, why: '密钥应走环境变量或 Secrets 管理，禁止提交进仓，模板只放字段结构。' },
        { t: 'default_config 只放前端 CSS 和图标，服务端 YAML 配置全部硬编码在插件里', ok: false, why: '该目录是服务端 YAML 配置模板，不是静态样式资源目录。' },
      ],
    },
    {
      q: '若某个 Core 目录自带 package.json（子包），它引用项目根 src/ 下基础设施代码时，正确做法是什么？',
      choices: [
        { t: '用相对路径引用，例如 ../../../src/infrastructure/...，勿用 # 别名', ok: true, why: '子包的 package.json 无法解析根包 # 别名，相对路径到 src/ 才可靠。' },
        { t: '必须用 #infrastructure/plugins/plugin-base.js，与无 package.json 的 Core 写法完全相同', ok: false, why: '有 package.json 的 Core 禁止使用 #，在子包上下文里会模块解析失败。' },
        { t: '把 src/infrastructure 整份复制进 Core 目录再 import，避免跨目录引用', ok: false, why: '复制 Runtime 代码会造成分叉维护，且违反 Core 不改 src/ 的边界。' },
        { t: '通过浏览器 fetch 动态加载 src/ 下的 .js 模块，服务端插件也这样引用', ok: false, why: 'Core 服务端代码在 Node ESM 环境运行，应使用静态 import，不是浏览器 fetch。' },
      ],
    },
    {
      q: '业务代码何时才能稳定使用 runtimeConfig？',
      choices: [
        {
          t: 'AgentRuntime.run 里 CommonConfigRegistry.load() 完成并挂全局之后',
          ok: true,
          why: 'docs/runtime-surface.md：配置阶段完成前勿假设已就绪。',
        },
        {
          t: '任意文件一被 import 的瞬间，即使 Loader 未跑完',
          ok: false,
          why: '挂载有先后；过早读取会空或未定义。',
        },
        {
          t: '只能在 www 前端页面里读 runtimeConfig',
          ok: false,
          why: 'runtimeConfig 是服务端单例。',
        },
        {
          t: '永远禁止读配置，只能硬编码端口与密钥',
          ok: false,
          why: '就绪后正常 import runtimeConfig。',
        },
      ],
      relatedNodes: ['xrk-runtime', 'xrk-config'],
    },
    {
      q: '新增 /api/... 路由时，关于 systemAuth 的正确说法？',
      choices: [
        {
          t: 'path 以 /api/ 开头时默认启用系统 API Key；公开接口显式 systemAuth: false',
          ok: true,
          why: 'HttpApi 基类约定；见 http-api / AUTH。',
        },
        {
          t: '/api 路由永远跳过鉴权',
          ok: false,
          why: '默认相反。',
        },
        {
          t: '鉴权只对 www 静态文件生效',
          ok: false,
          why: '针对 HTTP API 路由。',
        },
        {
          t: 'systemAuth 等于关闭 HTTPS',
          ok: false,
          why: '鉴权与 TLS 是不同层。',
        },
      ],
      relatedNodes: ['xrk-http-auth', 'xrk-http-www', 'xrk-lab-http'],
    },
  ],
});

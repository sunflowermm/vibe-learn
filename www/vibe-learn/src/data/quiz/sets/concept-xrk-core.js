import { defineQuizSet } from '../schema.js';

/** Runtime / Core / 配置归属 / 业务层——第四章主脊 */
export default defineQuizSet({
  id: 'concept-xrk-core',
  title: '概念 · XRK Runtime / Core / 配置',
  kind: 'concept',
  domain: 'xrk',
  tags: ['Runtime', 'Core', '配置', '分层'],
  relatedNodes: ['xrk-runtime', 'xrk-core-layout'],
  caption: '分层与配置归属；少背 API，多懂「该改哪一层」。',
  questions: [
    {
      id: 'concept-xrk-core:runtime',
      q: 'Agent Runtime 启动后主要负责什么？',
      choices: [
        {
          t: '在 Node 进程内扫描 Core、挂载扩展并完成配置加载',
          ok: true,
          why: '框架底座：发现扩展 + 统一配置，不是某个聊天产品的固定品牌名。',
        },
        {
          t: '只负责渲染 www 静态页，不碰插件与配置',
          ok: false,
          why: 'www 挂载只是一环；插件/HTTP/工作流等也由 Runtime/Loader 管。',
        },
        {
          t: '每个业务插件各自 new 一个 Runtime 互不共享',
          ok: false,
          why: '进程内单例；业务用裸名 AgentRuntime，禁止 new。',
        },
        {
          t: '必须手写 OS 内核模块才能启动 Node',
          ok: false,
          why: '跑在 Node 之上，不要求业务写内核。',
        },
      ],
      relatedNodes: ['xrk-runtime'],
    },
    {
      id: 'concept-xrk-core:layout',
      q: '业务层全景里，插件 / HTTP / 工作流默认应放哪里？',
      choices: [
        {
          t: 'core/<core名>/ 下对应子目录（plugin、http、workflow 等）',
          ok: true,
          why: 'Loader 按约定扫描；放对位置才会被发现。',
        },
        {
          t: '直接改 src/infrastructure 里的框架源码',
          ok: false,
          why: 'Core 开发者不得改 Runtime；缺能力扩基类或提框架改动。',
        },
        {
          t: '仓库根目录任意文件夹，文件名像插件即可',
          ok: false,
          why: '随意放置不会被扫描。',
        },
        {
          t: '只写在聊天窗口，由 Agent 注入运行中进程',
          ok: false,
          why: '必须落盘；Loader 不读聊天记录。',
        },
      ],
      relatedNodes: ['xrk-core-layout', 'xrk-biz-map'],
    },
    {
      id: 'concept-xrk-core:loader',
      q: '你在 `core/foo-Core/plugin/` 新加了一个插件文件，重启后希望自动生效。Loader 靠什么挂上它？',
      choices: [
        {
          t: '按目录约定放好、继承基类，启动时自动扫描挂载',
          ok: true,
          why: '无需手改 app.js 硬编码 import。',
        },
        {
          t: '每次新增功能都要改主入口手工 import',
          ok: false,
          why: '那是 Loader 要消除的负担。',
        },
        {
          t: '只有 system-Core 会被扫描，其它 Core 无效',
          ok: false,
          why: '扫描 core/*/ 各产品目录。',
        },
        {
          t: '插件必须先上应用商店审核才能加载',
          ok: false,
          why: '本地 core/ 即可。',
        },
      ],
      relatedNodes: ['xrk-plugin-arch'],
    },
    {
      id: 'concept-xrk-core:trisync',
      q: '独立产品改一项配置，为什么要「三同步」？',
      choices: [
        {
          t: 'default 模板 + commonconfig schema + 消费代码字段一致才生效',
          ok: true,
          why: '缺模板难引导；缺 schema 无校验；缺消费则 yaml 改了也不被读。',
        },
        {
          t: '只改 data/<产品>/ 一份运行时 yaml 永远够用',
          ok: false,
          why: '新 clone 缺模板；字段无 schema；代码可能未 read。',
        },
        {
          t: '只改 README 说明，硬编码同名字符串即可替代配置系统',
          ok: false,
          why: '文档不驱动运行时。',
        },
        {
          t: '三同步指 Git 的 add/commit/push',
          ok: false,
          why: '指模板、schema、代码三处工程同步。',
        },
      ],
      relatedNodes: ['xrk-config', 'xrk-lab-config'],
    },
    {
      id: 'concept-xrk-core:default-home',
      q: 'config/default_config/ 与独立产品模板各放什么？',
      choices: [
        {
          t: '前者放 AGT/工厂/system-Core 模板；独立产品放 core/<名>/default/',
          ok: true,
          why: '避免业务 yaml 污染框架根配置目录。',
        },
        {
          t: '所有产品业务配置都应塞进 default_config/',
          ok: false,
          why: '独立产品模板在自己的 default/。',
        },
        {
          t: 'default_config 只放前端 CSS，服务端配置全硬编码',
          ok: false,
          why: '该目录是服务端 YAML 模板。',
        },
        {
          t: '两处随便写，Loader 会合并任意路径',
          ok: false,
          why: '归属有明确约定，乱放读不到或污染框架。',
        },
      ],
      relatedNodes: ['xrk-config'],
    },
    {
      id: 'concept-xrk-core:www',
      q: 'Core 静态页（www）放哪？为何不能用 shared 当应用名？',
      choices: [
        {
          t: 'core/<core>/www/<应用名>/；shared 是框架保留根段',
          ok: true,
          why: '挂载为 /<应用名>；保留名会被跳过或冲突。',
        },
        {
          t: '仓库根建 shared/ 最短路径最好',
          ok: false,
          why: '保留名；产品用自有应用名。',
        },
        {
          t: '静态页只能放 src/factory',
          ok: false,
          why: 'www 属 Core 业务前端。',
        },
        {
          t: 'Core 禁止 HTML，必须全部外链',
          ok: false,
          why: 'mountCoreWwwStatic 支持仓内挂载。',
        },
      ],
      relatedNodes: ['xrk-http-www'],
    },
    {
      id: 'concept-xrk-core:biz-map',
      q: '业务层全景课要建立的核心地图是什么？',
      choices: [
        {
          t: 'Runtime / Core / 各扩展点（plugin·http·workflow·Tasker·events·配置）如何分工',
          ok: true,
          why: '先认「改哪一层」，再进实践课动手。',
        },
        {
          t: '只背某一个文件的绝对路径，不必理解分工',
          ok: false,
          why: '地图是职责边界，不是死记文件名。',
        },
        {
          t: '证明所有能力都应写进同一个 plugin 文件',
          ok: false,
          why: '扩展点拆分正是为了职责清晰。',
        },
        {
          t: '业务层全景只讲前端配色，不涉及服务端',
          ok: false,
          why: '讲的是服务端扩展点与放码。',
        },
      ],
      relatedNodes: ['xrk-biz-map', 'xrk-overview'],
    },
    {
      id: 'concept-xrk-core:config-ready',
      q: '业务代码何时才能稳定使用 runtimeConfig？',
      choices: [
        {
          t: 'CommonConfigRegistry.load() 完成并挂全局之后',
          ok: true,
          why: '启动有阶段；过早读可能空或未定义。',
        },
        {
          t: '任意模块被 import 的瞬间即可假定配置齐全',
          ok: false,
          why: '加载顺序决定就绪时机。',
        },
        {
          t: '只能在浏览器 www 里读 runtimeConfig',
          ok: false,
          why: '它是服务端单例。',
        },
        {
          t: '永远禁止读配置，端口与密钥只能硬编码',
          ok: false,
          why: '就绪后正常读配置；密钥仍走环境注入。',
        },
      ],
      relatedNodes: ['xrk-runtime', 'xrk-config'],
    },
  ],
});

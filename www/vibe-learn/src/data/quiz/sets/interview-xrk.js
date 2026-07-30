import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'interview-xrk-arch',
  title: '大厂 / 项目 · XRK 架构开口',
  kind: 'interview',
  domain: 'xrk',
  tags: ['架构', '扩展点', 'Loader'],
  relatedNodes: ['xrk-biz-map', 'xrk-plugin-arch', 'xrk-subserver'],
  caption: '把本仓架构讲清楚，像介绍你负责的系统。',
  questions: [
    {
      q: '若面试官问「用一句话介绍 XRK-AGT」，下面哪种说法最准确？',
      choices: [
        { t: '多端 Agent Runtime：提供插件/HTTP/工作流/Tasker/配置等扩展点的运行时', ok: true, why: 'overview / biz-map：强调是运行时底座 + 扩展点，不是单一聊天机器人产品。' },
        { t: 'XRK-AGT 是一个只能本地玩的贪吃蛇小游戏，与 Agent 无关', ok: false, why: 'XRK-AGT 是 Agent 运行时框架，贪吃蛇只是可能的娱乐插件示例。' },
        { t: 'XRK-AGT 必须绑定某一家云厂商账号才能启动，否则无法运行', ok: false, why: '主服可在本机 Node 跑，不绑定特定云；部署时才涉及云资源。' },
        { t: 'XRK-AGT 是纯前端 React 框架，不涉及 Node.js 服务端', ok: false, why: '核心是 Node Agent Runtime；www 静态页只是 Core 的一种交付形态。' },
      ],
    },
    {
      q: 'XRK 里各扩展点（plugin、http、workflow 等）通常是如何被加载挂载的？',
      choices: [
        { t: 'Loader 启动时扫描 core/*/ 下约定目录，自动发现并实例化', ok: true, why: 'plugin-arch：无需手改 main；继承基类、放对目录即可被扫描。' },
        { t: '每次新增扩展都要人工修改框架 app.js 主入口硬编码 import', ok: false, why: 'Loader 负责发现与挂载，不是人工拼接 main 入口。' },
        { t: '扩展点必须从 Chrome 浏览器扩展商店下载安装后才能用', ok: false, why: '扩展在 core/ 本地目录，与浏览器扩展商店无关。' },
        { t: '只有 system-Core 能放扩展，其他 Core 目录不会被 Loader 扫描', ok: false, why: 'Loader 扫描 core/*/ 各子目录，不限于 system-Core。' },
      ],
    },
    {
      q: '在 XRK 架构里，子服（subserver）相对主服的定位更接近什么？',
      choices: [
        { t: '独立进程能力（如 Python apis），经主服门面与 Agent Runtime 协作', ok: true, why: 'subserver：主服 Node 做编排，子服可多语言，通过 HTTP/RPC 等协作。' },
        { t: '子服必须与主服同进程、同语言，不能单独起 Python 进程', ok: false, why: '子服设计就是独立进程（如 pyserver），语言可以不同。' },
        { t: '子服的作用是替代 DNS 解析，把域名指向 CDN', ok: false, why: '子服提供额外能力插件族，与 DNS/CDN 基础设施无关。' },
        { t: '子服就是 Tasker 的别名，两者完全同义只负责 QQ 消息', ok: false, why: 'Tasker 是消息通道适配；子服是独立进程的能力扩展（如 Python API）。' },
      ],
    },
    {
      q: '本仓强调的「最小贡献路径」，开口时应怎么说才到位？',
      choices: [
        { t: '先本机跑通主脊，再改最小可验证的一小片，而不是一上来大重构', ok: true, why: 'min-path：小步、可 review、可回滚，是新人贡献的推荐节奏。' },
        { t: '一上来就重构全部 src/infrastructure/，改动越大越显能力', ok: false, why: 'Core 开发者不得改 Runtime；大重构也难 review 和回滚。' },
        { t: '可以先提交 API 密钥到仓库，方便 reviewer 本地调试', ok: false, why: '密钥禁止进仓；贡献路径不包含以 Secrets 换便利。' },
        { t: '最小贡献指只写文档、永远不碰任何可运行代码', ok: false, why: '最小路径通常包含可验证的一小步代码或配置，文档 alone 不够。' },
      ],
    },
    {
      q: '主服与子服在语言与技术栈上的常见分工直觉是什么？',
      choices: [
        { t: '主服以 Node.js 为主；子服可承载 Python 等多语言 apis 插件族', ok: true, why: 'language-stack：主服统一编排，子服补足 Python 生态等能力。' },
        { t: '主服和子服全部必须用 Rust 重写，禁止 Node 和 Python', ok: false, why: '本仓主服契约是 Node ≥26；子服常见 Python，并非全 Rust。' },
        { t: 'XRK 禁止使用 Python，子服目录只是摆设不能跑', ok: false, why: 'subserver/pyserver 就是 Python 子服，是官方支持的扩展方式。' },
        { t: '主服跑在浏览器里，子服跑在 Node 里，两者语言必须相同', ok: false, why: '主服是 Node 服务端进程；浏览器 www 不是主服。' },
      ],
    },
    {
      q: 'Events 监听扩展点适合用来做什么？它和 HTTP 路由的分工如何？',
      choices: [
        { t: '对运行时内部事件做副作用，如日志、联动、统计，不替代 HTTP 路由', ok: true, why: 'events：监听框架/运行时事件；HTTP 是对外主动提供接口，职责不同。' },
        { t: 'Events 可以完全替代 core/*/http/ 里全部 REST 路由', ok: false, why: 'HTTP 负责对外 API；Events 是事件驱动副作用，不能取代 REST。' },
        { t: 'Events 扩展点专用于编译 ESP32 固件并烧录到开发板', ok: false, why: 'Events 是运行时事件钩子，与嵌入式固件编译无关。' },
        { t: 'Events 与 Tasker 完全同义，都只负责接收 QQ 群消息', ok: false, why: 'Tasker 对接外部消息通道；Events 监听运行时内部事件。' },
      ],
    },
    {
      q: '面试官问「HttpResponse.success 普通对象为什么前端不能死读 data？」怎么答？',
      choices: [
        { t: '框架把对象字段拍平到顶层并带 success/message；数组/标量才进 data——要按约定解包', ok: true, why: '联调高频坑；体现你读过本仓契约。' },
        { t: '这是 bug，应立刻改 src/utils 破坏兼容', ok: false, why: '现行契约；前端适配即可。' },
        { t: 'success 响应没有 message', ok: false, why: '始终有。' },
        { t: '只有浏览器扩展能解包', ok: false, why: '普通前端页同样。' },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-lab-http'],
      tags: ['进阶'],
    },
    {
      q: '如何向面试官说明「配置三同步」解决什么工程问题？',
      choices: [
        { t: '模板可引导、schema 可校验、代码真消费——避免三处漂移导致「改了不生效」', ok: true, why: '可迁移到任何 Config-as-code 系统。' },
        { t: '三同步就是一天提交三次', ok: false, why: '否。' },
        { t: '只改运行时 data yaml 永远够用', ok: false, why: '缺模板/schema/代码会翻车。' },
        { t: '密钥应写进默认模板仓库', ok: false, why: '禁止。' },
      ],
      relatedNodes: ['xrk-config', 'xrk-lab-config'],
      tags: ['进阶'],
    },
    {
      q: '把 XRK 与 Docker/反代一起讲部署时，开口结构？',
      choices: [
        { t: '进程与依赖（Node/中间件）→ 端口与反代/TLS → 环境变量与密钥 → 健康检查与日志', ok: true, why: '全栈部署叙事，不单背目录名。' },
        { t: '只说「用了 AI」即可', ok: false, why: '缺少工程结构。' },
        { t: '部署与网络无关', ok: false, why: '强相关。' },
        { t: '密钥可以提交进镜像层当文档', ok: false, why: '事故。' },
      ],
      relatedNodes: ['xrk-deploy-env', 'ops-docker', 'net-nginx'],
      tags: ['进阶'],
    },
  ],
});

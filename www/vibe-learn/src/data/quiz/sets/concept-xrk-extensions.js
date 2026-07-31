import { defineQuizSet } from '../schema.js';

/** 扩展点：通道 / 事件 / 鉴权 / 语言栈 / 本仓数据契约 */
export default defineQuizSet({
  id: 'concept-xrk-extensions',
  title: '概念 · XRK 扩展点要点',
  kind: 'concept',
  domain: 'xrk',
  tags: ['扩展点', 'Tasker', 'Events', 'Auth', 'Database'],
  relatedNodes: ['xrk-events', 'xrk-tasker-channels', 'xrk-database'],
  caption: 'Tasker≠plugin；e.bot≠AgentRuntime；Redis/SQLite 是 Runtime 契约。',
  questions: [
    {
      id: 'concept-xrk-extensions:events',
      q: 'events/ 监听器更适合什么？',
      choices: [
        {
          t: '监听内部事件做副作用（日志、联动、审计），不替代对外 HTTP',
          ok: true,
          why: '横切解耦；对外 API 仍走 http/。',
        },
        {
          t: '取代全部 http 路由',
          ok: false,
          why: 'HTTP 仍是对外产品面。',
        },
        {
          t: '与 Tasker 同义',
          ok: false,
          why: 'Tasker 接通道协议；events 听进程内事件。',
        },
        {
          t: '把全部用户聊天指令写进 Listener',
          ok: false,
          why: '指令业务在 plugin/。',
        },
      ],
      relatedNodes: ['xrk-events'],
    },
    {
      id: 'concept-xrk-extensions:events-vs-plugin',
      q: '同一需求既可写 plugin 也可写 events 时，怎么分？',
      choices: [
        {
          t: '用户可见指令/规则 → plugin；内部钩子与副作用 → events',
          ok: true,
          why: '按「谁触发、是否对外」选型，避免双份逻辑。',
        },
        {
          t: '永远只写 events，plugin 已废弃',
          ok: false,
          why: 'plugin 仍是指令主扩展点。',
        },
        {
          t: '永远只写 plugin，events 目录无效',
          ok: false,
          why: 'events 有独立 Loader 扫描。',
        },
        {
          t: '二者都必须改 src/infrastructure 才能生效',
          ok: false,
          why: '放对 Core 目录即可被扫描。',
        },
      ],
      relatedNodes: ['xrk-events', 'xrk-plugin-arch'],
    },
    {
      id: 'concept-xrk-extensions:tasker',
      q: 'Tasker 解决什么？',
      choices: [
        {
          t: '把 QQ/OneBot/Stdin 等协议适配进 Runtime',
          ok: true,
          why: '从哪收消息；领域逻辑仍在 plugin/workflow。',
        },
        {
          t: '替代 plugin 堆领域逻辑',
          ok: false,
          why: 'Tasker 只管通道适配。',
        },
        {
          t: '等于 REST 网关',
          ok: false,
          why: '消息通道 ≠ HTTP 产品面。',
        },
        {
          t: '有 Tasker 就不必鉴权',
          ok: false,
          why: '通道仍有信任边界与权限。',
        },
      ],
      relatedNodes: ['xrk-tasker-channels'],
    },
    {
      id: 'concept-xrk-extensions:bot',
      q: 'e.bot 与 AgentRuntime 戴错会怎样？',
      choices: [
        {
          t: '回消息找错对象，或在通道实例上误调编排/子服',
          ok: true,
          why: 'e.bot≈账号通道；AgentRuntime≈全局编排（裸名）。',
        },
        {
          t: '二者可互换，框架自动纠正',
          ok: false,
          why: '不会自动纠正，只会在运行时怪错。',
        },
        {
          t: '只有浏览器有 e.bot',
          ok: false,
          why: '服务端事件对象上的通道句柄。',
        },
        {
          t: 'e.bot 等于 HttpResponse',
          ok: false,
          why: 'HttpResponse 是 HTTP 响应工具，与通道无关。',
        },
      ],
      relatedNodes: ['xrk-tasker-channels', 'xrk-runtime', 'xrk-lab-plugin'],
    },
    {
      id: 'concept-xrk-extensions:auth',
      q: '对外 HTTP 鉴权相对插件内部调用？',
      choices: [
        {
          t: '对外 API 要鉴权与校验；不能假设调用方都可信',
          ok: true,
          why: '/api 默认系统鉴权；公开接口须显式放开。',
        },
        {
          t: '内网可永久不做鉴权策略',
          ok: false,
          why: '内网也会被扫；最小权限仍要做。',
        },
        {
          t: '前端隐藏按钮等于鉴权',
          ok: false,
          why: '前端不可靠；鉴权在服务端。',
        },
        {
          t: 'HttpResponse 自动完成 OAuth',
          ok: false,
          why: '形状工具 ≠ 鉴权方案。',
        },
      ],
      relatedNodes: ['xrk-http-auth', 'craft-security'],
    },
    {
      id: 'concept-xrk-extensions:lang',
      q: '主服与子服语言栈？',
      choices: [
        {
          t: '主服 Node 编排；子服可跑 Python 等，经门面协作',
          ok: true,
          why: '多语言扩展；运维在子服终端，不经主服 stdin 转发。',
        },
        {
          t: '禁止 Python',
          ok: false,
          why: 'pyserver / apis 正是 Python 子服路径。',
        },
        {
          t: '子服命令必须从主服 stdin 转发',
          ok: false,
          why: '子服终端「子服>」直接输入。',
        },
        {
          t: '主服跑在浏览器里',
          ok: false,
          why: '主服是 Node 进程。',
        },
      ],
      relatedNodes: ['xrk-language-stack', 'xrk-subserver'],
    },
    {
      id: 'concept-xrk-extensions:database',
      q: '本仓 Runtime 数据面里，Redis 与 SQLite 各自角色？',
      choices: [
        {
          t: 'Redis 热缓存/会话类；SQLite 本地持久——二者互补，不互相替代',
          ok: true,
          why: '启动常 fail-fast 校验二者；概念深挖见番外数据库课。',
        },
        {
          t: '有 SQLite 就不必装 Redis',
          ok: false,
          why: '热数据路径依赖 Redis，不是「二选一」。',
        },
        {
          t: '两者都必须改成 Mongo 才能启动',
          ok: false,
          why: 'Mongo 是可选 Core，不是 Runtime 硬前置。',
        },
        {
          t: '数据库只能写在浏览器 localStorage',
          ok: false,
          why: '服务端基础设施；业务经裸名 redis/sqlite。',
        },
      ],
      relatedNodes: ['xrk-database', 'xrk-deploy-env'],
    },
    {
      id: 'concept-xrk-extensions:database-access',
      q: '业务 Core 访问 Redis/SQLite 更贴本仓？',
      choices: [
        {
          t: '启动完成后用全局裸名（redis / sqlite）或封装在 Core；配置走 yaml，密钥勿进仓',
          ok: true,
          why: '见 docs/database.md；勿在 src/ 另引一套 ORM 替代 node:sqlite。',
        },
        {
          t: '每个插件自己再装一份 sqlite3 npm 替代 Runtime',
          ok: false,
          why: '禁止另起炉灶替代约定实现。',
        },
        {
          t: '连接串写进 www 前端打包',
          ok: false,
          why: '浏览器可见即泄漏。',
        },
        {
          t: '跨 Redis 与 SQLite 默认有统一分布式事务',
          ok: false,
          why: '跨引擎仅最终一致，无统一事务。',
        },
      ],
      relatedNodes: ['xrk-database', 'xrk-config'],
    },
  ],
});

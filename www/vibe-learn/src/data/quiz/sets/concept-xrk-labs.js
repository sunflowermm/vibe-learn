import { defineQuizSet } from '../schema.js';

/**
 * 实践课验收：一题一挂；考「过关标准与边界」，不考背函数签名。
 */
export default defineQuizSet({
  id: 'concept-xrk-labs',
  title: '概念 · XRK 实践课验收',
  kind: 'concept',
  domain: 'xrk',
  tags: ['实践', '验收'],
  relatedNodes: ['xrk-lab-plugin'],
  caption: '实践铺路：能验收、守边界；一课一挂不串台。',
  questions: [
    {
      id: 'concept-xrk-labs:plugin',
      q: '「最小插件」怎样才算验收通过？',
      choices: [
        {
          t: '落在 core/*/plugin/、能被加载，且规则触发可观察到预期行为',
          ok: true,
          why: '目录约定 + 可观察结果；口头描述不算挂载。',
        },
        {
          t: '只在聊天里描述功能，不必落盘',
          ok: false,
          why: 'Loader 只扫文件系统。',
        },
        {
          t: '必须先改 src/ 里的 Loader 才能加载',
          ok: false,
          why: '放对 plugin/ 即可；改 Runtime 是越界。',
        },
        {
          t: 'constructor 里反复 new Map() 当永久缓存更稳妥',
          ok: false,
          why: '热更易错乱；状态用类字段或 init。',
        },
      ],
      relatedNodes: ['xrk-lab-plugin', 'xrk-plugin-arch'],
    },
    {
      id: 'concept-xrk-labs:http',
      q: '「最小 HTTP」实践过关，工程上优先守什么？',
      choices: [
        {
          t: '用统一响应约定（HttpResponse）；形状前后端一致，本地能打通',
          ok: true,
          why: '混用裸 res.json 会导致解包分裂；联调要可复查。',
        },
        {
          t: '每个接口自创一套 JSON 外壳，字段名随意',
          ok: false,
          why: '前端无法复用统一解包。',
        },
        {
          t: '接口只能写在 www 的 script 标签里',
          ok: false,
          why: 'API 在 core/*/http/。',
        },
        {
          t: '必须改 src/infrastructure/http 才能注册路由',
          ok: false,
          why: '业务路由放 Core；Loader 扫描挂载。',
        },
      ],
      relatedNodes: ['xrk-lab-http', 'xrk-http-www'],
    },
    {
      id: 'concept-xrk-labs:http-auth',
      q: '实验室打 /api/... 返回 401，优先怎么想？',
      choices: [
        {
          t: '/api 默认要系统鉴权：带 Key，或公开接口显式关闭鉴权',
          ok: true,
          why: '进 handler 前就会；见 Auth 约定。',
        },
        {
          t: '一定是前端组件写错了',
          ok: false,
          why: '401 常发生在鉴权中间层。',
        },
        {
          t: '把 API Key 写进 README 并提交以方便联调',
          ok: false,
          why: '密钥禁止进仓。',
        },
        {
          t: '删掉 plugin 目录即可恢复',
          ok: false,
          why: '与 HTTP 鉴权无关。',
        },
      ],
      relatedNodes: ['xrk-lab-http', 'xrk-http-auth'],
    },
    {
      id: 'concept-xrk-labs:config',
      q: '配置实践「三同步」验收通过的标志？',
      choices: [
        {
          t: '模板、commonconfig schema、消费代码键名一致且能读到值',
          ok: true,
          why: '缺任一环，新环境或校验会失败。',
        },
        {
          t: '只改 data/ 运行时文件，永不写模板与 schema',
          ok: false,
          why: '新 clone 无法引导复制与校验。',
        },
        {
          t: '独立产品业务 yaml 应塞进 config/default_config/',
          ok: false,
          why: '产品模板在 core/<名>/default/。',
        },
        {
          t: '用提交生产密钥证明配置可读',
          ok: false,
          why: '密钥禁入仓；测非敏感字段即可。',
        },
      ],
      relatedNodes: ['xrk-lab-config', 'xrk-config'],
    },
    {
      id: 'concept-xrk-labs:subserver-accept',
      q: '「实践 · 调子服」关键验收点？',
      choices: [
        {
          t: '子服进程起来；主服经门面',
          ok: true,
          why: '独立进程 + 主服编排；不是同进程硬塞。',
        },
        {
          t: '子服命令必须从主服 stdin 转发',
          ok: false,
          why: '运维在子服终端「子服>」输入。',
        },
        {
          t: '必须先改根 .gitignore 白名单才能启动',
          ok: false,
          why: '白名单是入库策略，不是运行开关。',
        },
        {
          t: '改完 README 即可，不必真调通',
          ok: false,
          why: '要有可观察的调用结果。',
        },
      ],
      relatedNodes: ['xrk-lab-subserver', 'xrk-subserver'],
    },
    {
      id: 'concept-xrk-labs:subserver-config',
      q: '子服插件业务配置通常谁写谁读？',
      choices: [
        {
          t: '主服 CommonConfig 编辑；子服侧只读加载',
          ok: true,
          why: '配置中枢在主服；见 subserver-commonconfig。',
        },
        {
          t: '只在子服进程改 yaml，主服永远不碰',
          ok: false,
          why: '与现行约定相反。',
        },
        {
          t: '配置必须写进 src/factory',
          ok: false,
          why: '工厂不管子服业务插件配置。',
        },
        {
          t: '子服配置等于把密钥提交进 Git',
          ok: false,
          why: '密钥仍走环境/密文。',
        },
      ],
      relatedNodes: ['xrk-lab-subserver', 'xrk-subserver', 'xrk-config'],
    },
    {
      id: 'concept-xrk-labs:subserver-runtime',
      q: '调用子服时指定 runtime（如 pyserver）在表达什么？',
      choices: [
        {
          t: '打到哪一套已登记的子服运行时（主机/端口以配置为准）',
          ok: true,
          why: '多 runtime 并存；不要假设写死端口。',
        },
        {
          t: '强制把主服进程改成 Python',
          ok: false,
          why: '主服仍是 Node；子服是另一进程。',
        },
        {
          t: '忽略配置，永远连 localhost:80',
          ok: false,
          why: '以 runtimes 登记表为准。',
        },
        {
          t: '只给浏览器 fetch 用，与主服编排无关',
          ok: false,
          why: '业务侧经主服门面调用。',
        },
      ],
      relatedNodes: ['xrk-lab-subserver', 'xrk-subserver', 'xrk-language-stack'],
    },
    {
      id: 'concept-xrk-labs:min-path',
      q: '「最小贡献路径」的终点感更接近？',
      choices: [
        {
          t: '可复查的一小步：本机跑通、有 diff、行为可验证',
          ok: true,
          why: '先主脊小步，再展开。',
        },
        {
          t: '一次重写全部章节与所有 Core',
          ok: false,
          why: '难 review、难回滚。',
        },
        {
          t: '跳过本机跑通，直接大 PR',
          ok: false,
          why: '主脊先本地绿。',
        },
        {
          t: '只改 README 也算完成贡献路径',
          ok: false,
          why: '通常要有可运行的一小步。',
        },
      ],
      relatedNodes: ['xrk-min-path'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-xrk-labs',
  title: '概念 · XRK 实践课验收',
  kind: 'concept',
  domain: 'xrk',
  tags: ['实践', '插件', 'HTTP', '配置'],
  relatedNodes: [
    'xrk-lab-plugin',
    'xrk-lab-http',
    'xrk-lab-config',
    'xrk-lab-subserver',
    'xrk-http-www',
    'xrk-http-auth',
    'xrk-min-path',
    'xrk-config',
  ],
  questions: [
    {
      q: '完成「最小插件」实践课后，怎样才算验收通过？',
      choices: [
        { t: '插件按 core/*/plugin/ 目录约定放好，被 Loader 加载且能触发预期行为', ok: true, why: 'lab-plugin：可见日志、响应指令或注册事件之一即可证明挂载成功。' },
        { t: '只在聊天里向 Agent 描述插件功能，不必在仓库里创建任何 .js 文件', ok: false, why: '未落盘到约定目录就不会被 Loader 扫描，口头描述不算验收。' },
        { t: '为了快速验证，必须修改 src/infrastructure/ 里的 Loader 源码', ok: false, why: 'Core 开发者禁区；正确做法是继承基类、放对 plugin/ 目录。' },
        { t: '插件文件名随意即可，不必继承 PluginBase，Loader 会自动包装', ok: false, why: '必须继承对应基类并按约定导出，否则 Loader 无法正确实例化。' },
      ],
    },
    {
      q: '完成「最小 HTTP」实践课时，handler 应优先使用哪种响应方式？',
      choices: [
        { t: 'HttpResponse 统一成功/错误形状，前端按 unwrapSuccess 语义解包', ok: true, why: 'lab-http：success 含 message；普通对象拍平到顶层，与裸 res.json() 不同。' },
        { t: '每个接口自创一套 JSON 外壳，字段名随开发者喜好命名', ok: false, why: '自创格式难维护，前端也无法复用统一的解包逻辑。' },
        { t: 'HttpResponse.success 禁止返回 message 字段，只能返回裸 data', ok: false, why: '约定始终含 success 与 message；普通对象还会拍平业务字段。' },
        { t: 'HTTP handler 里可以混用 HttpResponse 和裸 res.json()，前端自行适配', ok: false, why: '应统一用 HttpResponse，混用会导致前端解包规则不一致。' },
      ],
    },
    {
      q: '本仓日常新增 HTTP 接口，导出形态更推荐？',
      choices: [
        {
          t: 'core/*/http 对象导出 { name, routes }，由 HttpApiLoader 包装；复杂再考虑 extends HttpApi',
          ok: true,
          why: '对齐 docs/base-classes.md；对象导出是推荐路径。',
        },
        {
          t: '必须修改 src/infrastructure/http 才能注册任何路由',
          ok: false,
          why: '业务不进 Runtime；放对 http/ 即可被扫描。',
        },
        {
          t: '只能把接口写在 www/ 静态 HTML 的 script 标签里',
          ok: false,
          why: '服务端 API 在 http/；www 是前端。',
        },
        {
          t: '禁止使用 HttpResponse，一律手写 res.end 字符串',
          ok: false,
          why: '应统一 HttpResponse 形状。',
        },
      ],
      relatedNodes: ['xrk-lab-http', 'xrk-http-www'],
    },
    {
      q: 'HttpResponse.success(res, { hello: "lab" }) 后，前端读字段的正确直觉？',
      choices: [
        {
          t: '读顶层 hello（或 unwrapSuccess）；勿默认假定一定有 json.data.hello',
          ok: true,
          why: '普通对象拍平到顶层；数组/标量才进 data。',
        },
        {
          t: '永远只读 json.data.hello，没有就报框架坏了',
          ok: false,
          why: '对象成功时常无 data 包一层。',
        },
        {
          t: '响应一定是纯文本，不能是 JSON',
          ok: false,
          why: 'HttpResponse 输出 JSON。',
        },
        {
          t: 'success 为 false 时 hello 仍保证存在',
          ok: false,
          why: '失败走 error 形状，勿假设业务字段仍在。',
        },
      ],
      relatedNodes: ['xrk-lab-http', 'xrk-http-www'],
    },
    {
      q: '路径以 /api/ 开头的路由，鉴权默认直觉？',
      choices: [
        {
          t: '默认走系统 API Key（systemAuth）；公开接口显式 systemAuth: false',
          ok: true,
          why: '见 docs/http-api.md / AUTH.md；实验室可临时关闭，生产慎用。',
        },
        {
          t: '/api 永远不需要鉴权',
          ok: false,
          why: '默认相反。',
        },
        {
          t: '鉴权只存在于浏览器 localStorage，与服务端无关',
          ok: false,
          why: '主服 checkApiAuthorization。',
        },
        {
          t: '必须把 Key 写进仓库 yaml 明文才能启动',
          ok: false,
          why: '密钥走环境/面板，勿提交。',
        },
      ],
      relatedNodes: ['xrk-http-auth', 'xrk-lab-http'],
    },
    {
      q: '做完配置「三同步」实践课后，你应该能在运行时看到什么结果？',
      choices: [
        { t: 'default/ 模板、commonconfig/ schema、消费代码三处字段一致且能读到值', ok: true, why: 'lab-config：改 yaml 后重启或 reload，代码 read() 能拿到新字段即通过。' },
        { t: '只改一处 yaml 并口头说「已同步」，schema 和模板可以暂时不管', ok: false, why: '三处缺任何一环，新环境或校验都会失败，不算完成实践。' },
        { t: '把 API 密钥提交进仓作为验收凭证，证明配置系统能读到密钥', ok: false, why: '密钥禁止进仓；验收应测非敏感字段的读写与 schema 校验。' },
        { t: '只改 commonconfig/ schema，default/ 模板和 read 代码可以字段名不同', ok: false, why: '三处字段名与类型必须对齐，否则引导复制或校验会报错。' },
      ],
    },
    {
      q: '调通子服（subserver）实践的关键验收点是什么？',
      choices: [
        { t: '子服进程能起来，主服能按约定门面调用其能力（如 Python apis）', ok: true, why: 'lab-subserver：主服 Node + 子服独立进程协作，不是同进程同语言。' },
        { t: '子服运维命令应从主服 stdin 转发输入，不能在子服终端自己敲', ok: false, why: '子服命令在子服终端「子服>」输入，不经主服 stdin 转发。' },
        { t: '子服必须改根 .gitignore 加白名单才能在本机跑起来', ok: false, why: '本地 clone 即可跑；白名单是主仓入库策略，不是运行前提。' },
        { t: '子服与主服必须合并成同一 Node 进程，禁止独立进程', ok: false, why: '子服设计就是独立进程（如 pyserver），经主服 HTTP/RPC 门面调用。' },
      ],
    },
    {
      q: '部署环境实践课的清单里，通常应包含哪些基础项？',
      choices: [
        { t: 'Node/pnpm 版本、监听端口、反向代理、Redis 等依赖是否就绪', ok: true, why: 'deploy-env：环境层先通，再排查业务；端口冲突和缺依赖是最常见卡点。' },
        { t: '只需确认 IDE 主题和壁纸是否好看，服务器环境可以后补', ok: false, why: '部署验收关注运行时依赖与网络，与 IDE 外观无关。' },
        { t: '只要浏览器能打开网页，不必安装 Node.js 或 pnpm', ok: false, why: 'XRK 主服跑在 Node 上，缺 Node/pnpm 无法启动 Agent Runtime。' },
        { t: '部署清单只含 Git 账号，不含端口、代理或中间件配置', ok: false, why: '生产/本地部署需检查端口占用、反向代理与健康检查等工程项。' },
      ],
    },
    {
      q: '「最小贡献路径」实践课的终点感，更接近下面哪种描述？',
      choices: [
        { t: '可复查的一小步已合入主路径：跑通、有 diff、行为可验证', ok: true, why: 'min-path：先跑通主脊，再提交最小可验证切片，而非一次大重构。' },
        { t: '一次重写全部章节文档和所有 Core 代码，越大越好', ok: false, why: '过大改动难 review、难回滚；最小路径强调小步可验证。' },
        { t: '可以跳过首次本机跑通，直接提交 PR 让 CI 帮忙发现问题', ok: false, why: '主脊要先在本机跑通；CI 是补充，不能替代本地验收。' },
        { t: '最小贡献指只改 README 不改代码，文档更新即算完成', ok: false, why: '最小路径通常包含可运行的一小步代码或配置改动，并可验证。' },
      ],
    },
    {
      q: '实践课里写 HTTP handler 时，和「Linux 上看端口」如何配合验收？',
      choices: [
        { t: '先确认进程监听端口，再用 curl/浏览器打到路由，核对 success 形状', ok: true, why: 'lab-http + troubleshoot：环境通了再验业务。' },
        { t: '只改 CSS 就能证明 handler 正确', ok: false, why: '否。' },
        { t: '禁止使用 curl', ok: false, why: 'curl 是好工具。' },
        { t: '端口占用时可忽略，硬上生产', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-lab-http', 'workbench-troubleshoot', 'linux-cli'],
      tags: ['进阶'],
    },
    {
      q: '子服实践与「主仓 gitignore 白名单」的关系？',
      choices: [
        { t: '本地 clone 即可跑；白名单是入库策略，不是进程启动开关', ok: true, why: '第三方 apis 常本地存在；勿混淆运行与提交。' },
        { t: '不加白名单就绝对无法启动子服', ok: false, why: '运行≠入库。' },
        { t: '子服必须写进 src/infrastructure', ok: false, why: '否。' },
        { t: '子服命令只能从主服 stdin 转发', ok: false, why: '子服终端输入。' },
      ],
      relatedNodes: ['xrk-lab-subserver', 'xrk-subserver'],
      tags: ['进阶'],
    },
  ],
});

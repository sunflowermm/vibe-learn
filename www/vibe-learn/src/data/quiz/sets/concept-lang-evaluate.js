import { defineQuizSet } from '../schema.js';

/** Bloom 5 · 评价：给定工程标准选更好做法 */
export default defineQuizSet({
  id: 'concept-lang-evaluate',
  title: '评价 · 语言工程取舍',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '评价', '实践'],
  relatedNodes: ['lang-tech-selection', 'code-async', 'craft-security', 'lang-typescript'],
  caption: '可读、可维护、安全、可协作——有标准才评价。',
  questions: [
    {
      id: 'concept-lang-evaluate:eq',
      q: '以「少踩类型坑」为标准，业务相等比较更宜？',
      choices: [
        {
          t: '统一类型后优先用 ===',
          ok: true,
          why: '避免 == 隐式转换。',
        },
        {
          t: '一律用 ==，让运行时自动转类型',
          ok: false,
          why: '易踩坑，审查成本高。',
        },
        {
          t: '禁止在业务代码里做任何相等比较',
          ok: false,
          why: '不可行；身份与状态判断离不开比较。',
        },
        {
          t: '把比较结果提交进 Git 当成长久密钥使用',
          ok: false,
          why: '与比较标准无关，且把逻辑当密钥危险。',
        },
      ],
      relatedNodes: ['lang-javascript'],
    },
    {
      id: 'concept-lang-evaluate:async',
      q: '以「可读异步流」为标准，更优？',
      choices: [
        {
          t: '用 Promise/async 扁平化控制流，并显式处理拒绝',
          ok: true,
          why: '告别回调地狱，错误路径可见。',
        },
        {
          t: '层层嵌套回调，并且在每一层吞掉错误不往上抛',
          ok: false,
          why: '难维护，故障静默。',
        },
        {
          t: '用死循环轮询替代全部异步与事件循环',
          ok: false,
          why: '卡死事件循环，吞吐与延迟都差。',
        },
        {
          t: '忽略所有 Promise 拒绝，靠进程重启当错误处理',
          ok: false,
          why: '埋雷；拒绝应就地处理或上抛到边界。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-evaluate:secret',
      q: '以「密钥不进仓、不进前端包」为标准？',
      choices: [
        {
          t: '环境变量或密钥管理注入；示例用 .env.example',
          ok: true,
          why: '真密钥不进 Git；前端也不该持有服务端密钥。',
        },
        {
          t: '把密钥写进前端 bundle，方便浏览器直连第三方',
          ok: false,
          why: '可被下载拿走。',
        },
        {
          t: '把密钥写进 YAML 并提交仓库，方便同事 clone 即用',
          ok: false,
          why: '进历史难收回。',
        },
        {
          t: '把密钥藏在看似无害的文件名里再提交',
          ok: false,
          why: '内容仍在仓库；伪装文件名无效。',
        },
      ],
      relatedNodes: ['data-env'],
    },
    {
      id: 'concept-lang-evaluate:select',
      q: '以「可交付、可维护」为标准，选型？',
      choices: [
        {
          t: '匹配场景、团队技能与运维约束，再小范围验证',
          ok: true,
          why: '热门其次；约束驱动。',
        },
        {
          t: '只追本周最热框架，文档与招聘池先不管',
          ok: false,
          why: '缺约束，交付风险高。',
        },
        {
          t: '每种流行语言各写一套主服，对外多入口并存',
          ok: false,
          why: '成本与一致性爆炸。',
        },
        {
          t: '禁止使用任何框架，一切从零自研协议与路由',
          ok: false,
          why: '过偏；框架成本与收益要按场景权衡。',
        },
      ],
      relatedNodes: ['lang-tech-selection'],
    },
    {
      id: 'concept-lang-evaluate:ts',
      q: '以「上线行为可预期」理解 TypeScript？',
      choices: [
        {
          t: '类型在编译期；运行仍是 JS，不能替代测试与校验',
          ok: true,
          why: '勿把 TS 当成运行时强制检查或测试替身。',
        },
        {
          t: '类型在生产运行时永久强制，非法值会自动回滚',
          ok: false,
          why: '默认擦除，无此运行时回滚。',
        },
        {
          t: '有了 TS 就可以删除全部单元测试与集成测试',
          ok: false,
          why: '类型≠行为测试；契约与边界仍要测。',
        },
        {
          t: 'TS 可以替代进程管理与 HTTP 协议栈',
          ok: false,
          why: '语言工具链与部署/协议层不是同一层。',
        },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'concept-lang-evaluate:module',
      q: '以「可协作」为标准，组织代码更宜？',
      choices: [
        {
          t: '用 ESM 拆分模块，依赖与导出边界显式',
          ok: true,
          why: '边界清晰才好分工与复用。',
        },
        {
          t: '单文件堆砌全局变量，靠约定「别改错名字」',
          ok: false,
          why: '难协作、难审查。',
        },
        {
          t: '把同一段逻辑复制粘贴到十个文件各改一点',
          ok: false,
          why: '难同步，回归成本高。',
        },
        {
          t: '禁止任何 import，强制所有人改同一个巨型文件',
          ok: false,
          why: '过偏，放大冲突面。',
        },
      ],
      relatedNodes: ['code-modules'],
    },
  ],
});

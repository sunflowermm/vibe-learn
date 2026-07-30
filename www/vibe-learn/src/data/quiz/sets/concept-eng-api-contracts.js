import { defineQuizSet } from '../schema.js';

/** API 契约：版本、错误模型、分页、兼容——前后端与 Agent 工具共用 */
export default defineQuizSet({
  id: 'concept-eng-api-contracts',
  title: '工程 · API 契约与演化',
  kind: 'concept',
  domain: 'net',
  tags: ['API', '契约', '兼容', '基础', '进阶'],
  relatedNodes: ['http-web', 'http-hands-on', 'api-frontend'],
  caption: 'API 是合同：字段、错误、兼容性比「能打通一次」重要。',
  questions: [
    {
      id: 'concept-eng-api-contracts:q1',
      q: '把 HTTP API 当成「契约」时，最少应明确什么？',
      choices: [
        { t: '路径/方法、请求响应形状、错误码语义、鉴权与幂等约定', ok: true, why: '前端、移动端、Agent 工具都依赖同一合同。' },
        { t: '只要 200 且 body 是字符串就够', ok: false, why: '无法协作演化。' },
        { t: '契约可以每天无告知改字段类型', ok: false, why: '破坏消费者。' },
        { t: '只有 GraphQL 才有契约', ok: false, why: 'REST 同样。' },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-api-contracts:q2',
      q: '向响应新增可选字段，相对「重命名/删必填字段」？',
      choices: [
        { t: '通常向后兼容；破坏性变更要版本化或双写迁移期', ok: true, why: '兼容性是专业分水岭。' },
        { t: '删必填字段对旧客户端无影响', ok: false, why: '会炸。' },
        { t: '改字段类型永远安全', ok: false, why: '常破坏。' },
        { t: '兼容性只关前端 CSS', ok: false, why: '否。' },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q3',
      q: '错误响应设计，更专业的做法？',
      choices: [
        { t: '稳定错误码 + 人类可读 message + 可选细节；别只丢无结构堆栈给客户端', ok: true, why: '客户端要可分支处理；堆栈留给服务端日志。' },
        { t: '一律返回 200 并把错误写在 HTML 注释', ok: false, why: '反模式。' },
        { t: '错误时不返回任何 body', ok: false, why: '难排查。' },
        { t: '把数据库密码放进错误信息方便调试', ok: false, why: '泄漏。' },
      ],
      relatedNodes: ['http-web', 'xrk-lab-http', 'craft-security'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q4',
      q: '列表接口为什么常要分页/游标，而不是一次返回百万行？',
      choices: [
        { t: '控制延迟、内存与超时；契约里写清 page/cursor 与排序稳定性', ok: true, why: '否则偶发大数据集会拖垮双方。' },
        { t: '分页只是为了 UI 动画', ok: false, why: '资源保护是核心。' },
        { t: '一次返回全部永远最优', ok: false, why: '否。' },
        { t: '游标分页禁止用于 API', ok: false, why: '深分页常用。' },
      ],
      relatedNodes: ['http-hands-on', 'db-sql-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q5',
      q: 'Idempotency-Key（幂等键）常见用在哪？',
      choices: [
        { t: '客户端重试 POST 创建类请求时，服务端用键去重，避免双花', ok: true, why: '支付/下单/资源创建经典；Agent 工具调用同样需要。' },
        { t: '只用于静态 CSS 缓存', ok: false, why: '否。' },
        { t: '幂等键等于 JWT 签名算法', ok: false, why: '概念不同。' },
        { t: '有了幂等键就可以明文传密码', ok: false, why: '无关。' },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q6',
      q: 'API 版本策略里，较务实的一种？',
      choices: [
        { t: 'URL 或头带版本；破坏性变更走新版本并给迁移窗，旧版有日落计划', ok: true, why: '避免静默破坏。' },
        { t: '永不告知直接改语义', ok: false, why: '不专业。' },
        { t: '版本号写在服务器主机名里即可', ok: false, why: '脆弱。' },
        { t: '禁止任何版本，字段每周随机改', ok: false, why: '否。' },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q7',
      q: '本仓 HttpResponse 拍平对象，从「契约」角度说明什么？',
      choices: [
        { t: '团队约定的响应形状是合同一部分；消费者必须按合同解包，不能假设业界某教程万能', ok: true, why: '通识：读你们系统的合同；本仓是实例。' },
        { t: '可以无视约定混用多种外壳', ok: false, why: '分裂契约。' },
        { t: '契约只存在于 OpenAPI 文件，运行时可随便', ok: false, why: '运行时形状才是真相。' },
        { t: '拍平意味着没有 message 字段', ok: false, why: '仍有 success/message。' },
      ],
      relatedNodes: ['xrk-http-www', 'http-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q8',
      q: '给 Agent 暴露「工具 API」时，契约上最该多约束？',
      choices: [
        { t: '参数 schema、权限边界、超时与失败语义——模型会乱调用', ok: true, why: '工具环=不可信调用方之一。' },
        { t: '工具应拥有生产库 root 且无审计', ok: false, why: '危险。' },
        { t: '工具失败可以静默当成功', ok: false, why: '会编造。' },
        { t: '不必描述参数类型', ok: false, why: '更易胡调。' },
      ],
      relatedNodes: ['ai-tool-calling', 'xrk-mcp-ops', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q9',
      q: '429 Too Many Requests 作为契约信号，调用方应？',
      choices: [
        { t: '尊重限流：退避重试、降并发，必要时排队——别打爆对方', ok: true, why: '礼貌与自保。' },
        { t: '立刻把 QPS 翻倍撞过去', ok: false, why: '雪崩。' },
        { t: '429 表示永久删除账号', ok: false, why: '否。' },
        { t: '忽略 429，当 200 用', ok: false, why: '否。' },
      ],
      relatedNodes: ['http-web', 'craft-observability'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q10',
      q: 'OpenAPI/JSON Schema 在工程协作里的价值？',
      choices: [
        { t: '可生成文档/客户端/校验，减少口口相传的漂移', ok: true, why: '契约可机器检查。' },
        { t: '有文档就可以不写实现', ok: false, why: '否。' },
        { t: 'Schema 应包含生产密钥', ok: false, why: '否。' },
        { t: '只对前端有用，后端可无视', ok: false, why: '双方合同。' },
      ],
      relatedNodes: ['http-hands-on', 'data-json'],
      tags: ['进阶'],
    },
  ],
});

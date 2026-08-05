import { defineQuizSet } from '../schema.js';

/**
 * API 契约与演化（网络章工程向）。
 * 命题：mcq-expert。
 */
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
        {
          t: '路径/方法、请求响应形状、错误码语义、鉴权与幂等约定',
          ok: true,
          why: '前端、移动端、Agent 工具都依赖同一合同。',
        },
        {
          t: '只要状态码 200 且 body 是任意字符串就够',
          ok: false,
          why: '无法协作演化与分支处理。',
        },
        {
          t: '契约可以每天无告知改字段类型',
          ok: false,
          why: '破坏消费者。',
        },
        {
          t: '只有 GraphQL 才谈得上契约，REST 不用',
          ok: false,
          why: 'REST 同样需要稳定合同。',
        },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-api-contracts:q2',
      q: '向响应新增可选字段，相对「重命名/删除必填字段」？',
      choices: [
        {
          t: '新增可选字段通常向后兼容；破坏性变更要版本化或双写迁移期',
          ok: true,
          why: '兼容性是专业分水岭。',
        },
        {
          t: '删除必填字段对旧客户端无影响',
          ok: false,
          why: '旧客户端会直接炸。',
        },
        {
          t: '把 number 改成 string 永远安全',
          ok: false,
          why: '类型变更常破坏解析。',
        },
        {
          t: '兼容性只关前端 CSS 主题',
          ok: false,
          why: '关的是数据合同。',
        },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q3',
      q: '错误响应设计，更专业的做法是？',
      choices: [
        {
          t: '稳定错误码 + 人类可读 message + 可选细节',
          ok: true,
          why: '客户端要可分支处理；勿把内部堆栈当合同。',
        },
        {
          t: '一律返回 200，把错误写在 HTML 注释里',
          ok: false,
          why: '反模式，自动化客户端无法依赖。',
        },
        {
          t: '错误时不返回任何 body，也不给稳定码',
          ok: false,
          why: '难排查、难分支。',
        },
        {
          t: '把数据库密码放进错误信息方便联调',
          ok: false,
          why: '泄漏事故。',
        },
      ],
      relatedNodes: ['http-web', 'xrk-lab-http', 'craft-security'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q4',
      q: '列表接口为什么常要分页/游标，而不是一次返回百万行？',
      choices: [
        {
          t: '控制延迟、内存与超时',
          ok: true,
          why: '偶发大数据集会拖垮双方。',
        },
        {
          t: '分页只是为了 UI 动画好看',
          ok: false,
          why: '资源保护才是核心。',
        },
        {
          t: '一次返回全部永远最优',
          ok: false,
          why: '规模上来必炸。',
        },
        {
          t: '游标分页禁止用于 API',
          ok: false,
          why: '深分页常用游标。',
        },
      ],
      relatedNodes: ['http-hands-on', 'db-sql-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q5',
      q: 'Idempotency-Key（幂等键）常见用在哪？',
      choices: [
        {
          t: '客户端重试 POST 创建类请求时',
          ok: true,
          why: '支付/下单/资源创建经典；Agent 工具调用同样需要。',
        },
        {
          t: '只用于静态 CSS 强缓存',
          ok: false,
          why: '缓存用 Cache-Control/ETag，不是幂等键。',
        },
        {
          t: '幂等键等于 JWT 签名算法名称',
          ok: false,
          why: '概念不同。',
        },
        {
          t: '有了幂等键就可以明文传密码',
          ok: false,
          why: '与机密性无关。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q6',
      q: 'API 版本策略里，较务实的一种是？',
      choices: [
        {
          t: 'URL 或头带版本',
          ok: true,
          why: '避免静默破坏。',
        },
        {
          t: '永不告知，直接改语义',
          ok: false,
          why: '不专业。',
        },
        {
          t: '版本号只写在服务器主机名里即可',
          ok: false,
          why: '脆弱且难发现。',
        },
        {
          t: '禁止任何版本，字段每周随机改',
          ok: false,
          why: '无法协作。',
        },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q7',
      q: '本仓 HttpResponse 把普通对象拍平到顶层，从「契约」角度说明什么？',
      choices: [
        {
          t: '团队约定的响应形状是合同一部分；消费者必须按合同解包',
          ok: true,
          why: '不能假设业界某教程的 data 包裹万能。',
        },
        {
          t: '可以无视约定，前端混用多种外壳',
          ok: false,
          why: '分裂契约。',
        },
        {
          t: '契约只存在于 OpenAPI 文件，运行时可随便',
          ok: false,
          why: '运行时形状才是真相。',
        },
        {
          t: '拍平意味着没有 success/message 字段',
          ok: false,
          why: '仍有 success 与 message。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'http-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q8',
      q: '给 Agent 暴露「工具 API」时，契约上最该多约束什么？',
      choices: [
        {
          t: '参数 schema、权限边界、超时与失败语义',
          ok: true,
          why: '工具环=不可信调用方之一。',
        },
        {
          t: '工具应拥有生产库 root 且无审计',
          ok: false,
          why: '危险。',
        },
        {
          t: '工具失败可以静默当成功',
          ok: false,
          why: '模型会据此编造。',
        },
        {
          t: '不必描述参数类型',
          ok: false,
          why: '更易胡调。',
        },
      ],
      relatedNodes: ['ai-tool-calling', 'xrk-mcp-ops', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q9',
      q: '429 Too Many Requests 作为契约信号，调用方应？',
      choices: [
        {
          t: '尊重限流：退避重试、降并发，必要时排队',
          ok: true,
          why: '礼貌与自保；可看 Retry-After。',
        },
        {
          t: '立刻把 QPS 翻倍撞过去',
          ok: false,
          why: '雪崩。',
        },
        {
          t: '把 429 当成永久删除账号',
          ok: false,
          why: '429 是限流，不是销户。',
        },
        {
          t: '忽略 429，当 200 继续写库',
          ok: false,
          why: '会丢失败语义。',
        },
      ],
      relatedNodes: ['http-web', 'craft-observability'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q10',
      q: 'OpenAPI / JSON Schema 在工程协作里的价值是？',
      choices: [
        {
          t: '可生成文档/客户端/校验',
          ok: true,
          why: '契约可机器检查。',
        },
        {
          t: '有文档就可以不写实现',
          ok: false,
          why: '文档不是代码。',
        },
        {
          t: 'Schema 应包含生产密钥',
          ok: false,
          why: '密钥勿进契约文件。',
        },
        {
          t: '只对前端有用，后端可无视',
          ok: false,
          why: '双方合同。',
        },
      ],
      relatedNodes: ['http-hands-on', 'data-json'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q11',
      q: '前后端对同一字段：后端改名、前端未发版。最可能的结果是？',
      choices: [
        {
          t: '前端读到 undefined/异常分支',
          ok: true,
          why: '要版本化、双写或同步发版。',
        },
        {
          t: '浏览器会自动把旧字段名映射到新名',
          ok: false,
          why: '不会。',
        },
        {
          t: '只要 HTTP 200，字段名可以随便变',
          ok: false,
          why: '200 不保证形状兼容。',
        },
        {
          t: 'DNS TTL 会缓冲字段重命名',
          ok: false,
          why: 'DNS 不管 JSON 字段。',
        },
      ],
      relatedNodes: ['api-frontend', 'http-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-api-contracts:q12',
      q: '写接口要支持网关自动重试时，契约层最该补什么？',
      choices: [
        {
          t: '幂等语义或幂等键，避免重试造成重复下单/扣款',
          ok: true,
          why: '重试是常态；合同必须扛得住。',
        },
        {
          t: '强制每次重试都创建新资源且无去重',
          ok: false,
          why: '双花事故。',
        },
        {
          t: '关掉全部超时，永不失败',
          ok: false,
          why: '掩盖故障。',
        },
        {
          t: '把重试次数写进前端 CSS 变量',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶'],
    },
  ],
});

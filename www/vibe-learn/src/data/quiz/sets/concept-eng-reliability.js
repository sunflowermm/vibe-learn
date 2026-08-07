import { defineQuizSet } from '../schema.js';

/**
 * 生产可靠性：超时、重试、幂等、降级、背压。
 * 面试开口复述见 interview-craft-eng；密钥/Git 卫生见 git-security。
 */
export default defineQuizSet({
  id: 'concept-eng-reliability',
  title: '工程 · 可靠性（超时·重试·降级）',
  kind: 'concept',
  domain: 'craft',
  tags: ['可靠性', '超时', '重试', '幂等', '基础', '进阶'],
  relatedNodes: ['craft-observability', 'craft-debug', 'http-web'],
  caption: '故障是常态；假设网络会抖、依赖会挂、重试会放大事故。',
  questions: [
    {
      id: 'concept-eng-reliability:q1',
      q: '对外部 HTTP/LLM API 调用，没有超时限制时最常见的后果？',
      choices: [
        {
          t: "线程/连接被挂死，故障在调用方堆积，最终拖垮整条链路",
          ok: true,
          why: '超时是责任边界：宁肯失败可重试，也不要无限等待。',
        },
        {
          t: '没有超时会让请求自动在约 1ms 内完成，所以更省资源',
          ok: false,
          why: '没有超时不会自动变快；只会占住资源。',
        },
        {
          t: '超时策略只影响 DNS 查询，不影响后续 TCP/HTTP 等待',
          ok: false,
          why: '整段调用（含等待响应）都要有 deadline。',
        },
        {
          t: '不设超时更安全，因为调用方有更充足的时间等下游恢复',
          ok: false,
          why: '无界等待是可用性杀手，不是安全特性。',
        },
      ],
      relatedNodes: ['http-web', 'craft-observability'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-reliability:q2',
      q: '对写操作（下单、扣款、创建资源）盲目自动重试，危险在哪？',
      choices: [
        {
          t: "可能重复执行副作用；除非接口幂等或带幂等键",
          ok: true,
          why: '网关/Agent 重试很常见；写路径必须可安全重放。',
        },
        {
          t: '重试一定比成功一次更省钱',
          ok: false,
          why: '重复写常更贵，还会制造脏数据。',
        },
        {
          t: '写操作天生幂等，无需设计',
          ok: false,
          why: '多数 POST/创建不是天然幂等。',
        },
        {
          t: '只有 GET 会产生副作用',
          ok: false,
          why: 'POST/PUT/DELETE 更常有副作用；GET 也不应有写副作用。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-reliability:q3',
      q: '指数退避 + 抖动（jitter）用在重试上，主要图什么？',
      choices: [
        {
          t: '避免雪崩：别让所有客户端同一时刻打满已恢复的依赖',
          ok: true,
          why: '经典流量整形；LLM 429 场景同样适用。',
        },
        {
          t: '主要是为了让错误日志排版更好看，与保护依赖无关',
          ok: false,
          why: '目的是保护依赖与自身，不是美化日志。',
        },
        {
          t: '用来消除对幂等的需求：有了退避就可以随意重放任意写操作',
          ok: false,
          why: '退避管节奏；幂等管「重放是否安全」。',
        },
        {
          t: '用来保证第一次请求就一定成功，后续重试只是装饰',
          ok: false,
          why: '退避只影响后续重试间隔，不保证首次成功。',
        },
      ],
      relatedNodes: ['craft-observability', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-reliability:q4',
      q: '依赖持续 5xx 时，「熔断/快速失败」相对「死磕重试」？',
      choices: [
        {
          t: "短时拒绝或走降级，给依赖恢复空间，保护本服务资源",
          ok: true,
          why: '失败要可控；无限重试会自我 DDoS。',
        },
        {
          t: '把超时一律提高到 1 小时，靠更长等待扛过下游故障',
          ok: false,
          why: '掩盖问题并占满连接/线程。',
        },
        {
          t: '关掉全部监控与告警以免心烦，等用户投诉再处理',
          ok: false,
          why: '失去告警与定位能力，事故更大。',
        },
        {
          t: '熔断等于永久下线该业务能力，且不必再发告警或半开探测',
          ok: false,
          why: '应半开探测、可恢复，并要有告警。',
        },
      ],
      relatedNodes: ['craft-observability', 'craft-debug'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-reliability:q5',
      q: '优雅降级（degradation）更接近哪句？',
      choices: [
        {
          t: "核心路径保可用；次要能力关掉或返回缓存/默认，而不是整站 500",
          ok: true,
          why: '产品与工程共同设计「坏的时候还剩什么」。',
        },
        {
          t: '一有错误就删库清盘重建，把「干净降级」理解成清空数据',
          ok: false,
          why: '灾难操作，与降级相反。',
        },
        {
          t: '降级等于对用户隐瞒全部故障，并且对内也不记任何日志',
          ok: false,
          why: '仍要对内可观测、对外诚实降能力。',
        },
        {
          t: '只有前端页面需要降级；服务端可以整站直接 500 了事',
          ok: false,
          why: '服务端同样要设计降级路径。',
        },
      ],
      relatedNodes: ['craft-observability', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-reliability:q6',
      q: '背压（backpressure）直觉？',
      choices: [
        {
          t: "下游处理不过来时，上游应限速/排队/丢弃策略明确，而不是无限缓冲撑爆内存",
          ok: true,
          why: '流式 LLM、消息队列、日志管道都要谈。',
        },
        {
          t: "只有磁盘 IO 存在背压，内存与网络队列可以无限堆积而无害",
          ok: false,
          why: '背压管流量与资源，不是加密。',
        },
        {
          t: "背压等于加密：只要开了 TLS，下游过载就不会传到上游",
          ok: false,
          why: '延迟上升且易 OOM。',
        },
        {
          t: "缓冲越大永远越好：无限队列是吸收峰值的唯一正确策略",
          ok: false,
          why: '网络、CPU、下游 API 同样存在。',
        },
      ],
      relatedNodes: ['xrk-stream', 'craft-observability'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-reliability:q7',
      q: '线上故障处理顺序，专业工程师更认哪套？',
      choices: [
        {
          t: '止血（回滚/限流/开关）→ 定位（日志/指标/追踪）→ 根因与防护 → 复盘',
          ok: true,
          why: '先保护用户，再追求完美根因。',
        },
        {
          t: '先删掉监控与告警假装没问题，等用户投诉再临时加回日志与指标面板',
          ok: false,
          why: '掩盖症状，延误处理。',
        },
        {
          t: '先做大范围重构与依赖大版本升级，恢复服务可以放到迭代末期再处理',
          ok: false,
          why: '故障窗禁忌大改，恢复优先。',
        },
        {
          t: '只改前端文案安抚用户即可结案，不必止血、定位根因，也无需复盘',
          ok: false,
          why: '未修复根因，影响会继续。',
        },
      ],
      relatedNodes: ['craft-debug', 'craft-observability'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-reliability:q8',
      q: '健康检查（liveness vs readiness）为何要分开想？',
      choices: [
        {
          t: "进程活着≠能接流量；未就绪时应摘流，避免把请求打进半残实例",
          ok: true,
          why: 'K8s/反代/容器编排经典；本机 Docker 同样适用。',
        },
        {
          t: '两个词完全同义可混用，探针名字怎么起都行',
          ok: false,
          why: 'liveness 管「要不要重启」；readiness 管「能不能接流」。',
        },
        {
          t: '有健康检查就不必看日志与指标，探针已覆盖一切',
          ok: false,
          why: '探针只给信号；细节仍靠日志与指标。',
        },
        {
          t: 'readiness 失败应立即删库清盘，当作彻底止血',
          ok: false,
          why: '应摘流或重启实例，与删库无关。',
        },
      ],
      relatedNodes: ['ops-docker', 'net-nginx', 'craft-observability'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-reliability:q9',
      q: 'SLO/错误预算对「要不要继续发版」的意义？',
      choices: [
        {
          t: "用客观可用性预算约束发版节奏：烧完预算就优先稳定性",
          ok: true,
          why: '比「感觉还行」更专业。',
        },
        {
          t: 'SLO 只是汇报用的 PPT 指标，不必真正约束发版节奏',
          ok: false,
          why: '应驱动是否发版、是否冻结变更。',
        },
        {
          t: '写了 SLO 定义后就可以关掉可用性告警，靠感觉盯盘即可',
          ok: false,
          why: 'SLO 依赖告警与测量，关掉告警等于失明。',
        },
        {
          t: '错误预算是鼓励团队故意制造故障，把额度用完才算达标',
          ok: false,
          why: '预算是约束变更的额度，不是鼓励捣乱。',
        },
      ],
      relatedNodes: ['craft-observability', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-reliability:q10',
      q: '调用 LLM 时，可靠性设计还要额外多想一层？',
      choices: [
        {
          t: '超时、限流、费用上限、部分失败与幻觉兜底——模型不是可靠函数',
          ok: true,
          why: '非确定性输出 + 供应商配额，按不可靠依赖设计。',
        },
        {
          t: '模型 API 永不死、永不限流',
          ok: false,
          why: '现实常有 429/5xx 与配额。',
        },
        {
          t: 'temperature 调到 2 可消除全部故障',
          ok: false,
          why: '采样参数不解决超时、限流与依赖宕机。',
        },
        {
          t: '可靠性只属于运维，应用不必管',
          ok: false,
          why: '调用方必须设超时、重试与降级。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'xrk-factory-llm', 'craft-observability'],
      tags: ['进阶'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

/**
 * XRK 作为通识模式的实例：插件、适配器、配置即代码、网关——
 * 先讲工程模式，再落本仓目录（纠正「只背仓内名词」）。
 */
export default defineQuizSet({
  id: 'concept-xrk-patterns',
  title: '工程 · 可扩展系统模式（以 XRK 为实例）',
  kind: 'concept',
  domain: 'xrk',
  tags: ['架构模式', '插件', '适配器', '配置', '进阶'],
  relatedNodes: ['xrk-plugin-arch', 'xrk-biz-map', 'xrk-runtime'],
  caption: '好架构是可替换的边界；XRK 目录是这些边界的一种落地。',
  questions: [
    {
      id: 'concept-xrk-patterns:q1',
      q: '插件架构相对「所有逻辑写进 main」的工程收益？',
      choices: [
        { t: '稳定内核 + 可发现扩展点：新能力按约定接入，降低改核心的频率', ok: true, why: 'XRK 的 Loader 扫描是该模式的实例，不是唯一实现。' },
        { t: '插件架构禁止测试', ok: false, why: '否。' },
        { t: '所有插件必须同文件', ok: false, why: '恰恰分离。' },
        { t: '只有游戏引擎才用插件', ok: false, why: 'IDE、浏览器、后端皆常用。' },
      ],
      relatedNodes: ['xrk-plugin-arch', 'xrk-runtime'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q2',
      q: '端口-适配器（六边形）视角下，Tasker 更像？',
      choices: [
        { t: '入站适配器：把外部消息协议翻译成内核可理解的命令/事件', ok: true, why: '内核不绑死 QQ；换通道换适配器。' },
        { t: '数据库引擎本身', ok: false, why: '否。' },
        { t: '唯一允许的业务层', ok: false, why: '业务在 plugin/workflow。' },
        { t: 'CSS 预处理器', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-tasker-channels', 'xrk-chat-pipeline'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q3',
      q: '配置即代码（模板+schema+消费）要解决的通识问题？',
      choices: [
        { t: '可重复环境、可校验字段、可审查变更——避免「机器上的神秘 yaml」', ok: true, why: '三同步是该通识在本仓的纪律化。' },
        { t: '配置越多越好且互不理睬', ok: false, why: '否。' },
        { t: '密钥应进入默认模板仓', ok: false, why: '密钥分离仍是通识。' },
        { t: '只有 Kubernetes 需要配置即代码', ok: false, why: '应用同样。' },
      ],
      relatedNodes: ['xrk-config', 'xrk-lab-config', 'data-env'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q4',
      q: '反代/API 网关模式解决什么？',
      choices: [
        { t: '统一入口做 TLS、路由、限流、观测；上游专注领域逻辑', ok: true, why: 'Nginx 课与 XRK 部署是同一模式。' },
        { t: '网关可替代领域模型', ok: false, why: '否。' },
        { t: '有网关就不需要鉴权', ok: false, why: '常在网关或上游做。' },
        { t: '网关只能用于静态博客', ok: false, why: '否。' },
      ],
      relatedNodes: ['net-nginx', 'xrk-deploy-env', 'reverse-proxy'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q5',
      q: '工厂模式在「多厂商 LLM」场景的价值？',
      choices: [
        { t: '把创建与策略集中：业务依赖抽象客户端，而不是散落各家 SDK 细节', ok: true, why: 'LLM Factory 是实例；换供应商时炸点收敛。' },
        { t: '工厂会自动微调权重', ok: false, why: '否。' },
        { t: '有工厂就不必处理错误与超时', ok: false, why: '仍要。' },
        { t: '工厂等于提示词本身', ok: false, why: '层次不同。' },
      ],
      relatedNodes: ['xrk-factory-llm', 'ai-openai-protocol'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q6',
      q: '事件驱动相对「请求函数里写死所有副作用」？',
      choices: [
        { t: '发布者不知晓全部订阅者：扩展新副作用不必改原请求主路径', ok: true, why: 'events/ 是实例；也要接受最终一致与排障复杂度。' },
        { t: '事件可替代数据库约束', ok: false, why: '否。' },
        { t: '有事件就不必日志', ok: false, why: '更需要关联 ID。' },
        { t: '事件驱动禁止用于后端', ok: false, why: '后端常用。' },
      ],
      relatedNodes: ['xrk-events', 'craft-observability'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q7',
      q: '「稳定内核 / 不稳定插件」边界被破坏时，典型坏味道？',
      choices: [
        { t: '业务需求频繁改基础设施目录；插件与内核循环依赖', ok: true, why: '本仓映射：Core 不该常改 src/infrastructure。' },
        { t: '插件放在约定目录', ok: false, why: '这是好味道。' },
        { t: '内核提供基类', ok: false, why: '正常。' },
        { t: '用配置开关特性', ok: false, why: '常见做法。' },
      ],
      relatedNodes: ['xrk-core-layout', 'xrk-runtime', 'xrk-plugin-arch'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q8',
      q: '多进程子系统（子服）相对「全塞进一个进程」的权衡？',
      choices: [
        { t: '隔离故障与语言生态，但多了部署、发现与部分失败；要用明确门面', ok: true, why: '通识权衡；XRK subserver 是案例。' },
        { t: '多进程永远零成本', ok: false, why: '有运维税。' },
        { t: '单进程永远无法完成 IO', ok: false, why: '否。' },
        { t: '子进程禁止写日志', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-subserver', 'xrk-language-stack'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q9',
      q: '从模式迁移视角：若离开 XRK，你应带走什么？',
      choices: [
        { t: '边界划分、契约、配置纪律、可靠性与安全习惯——目录名可以变', ok: true, why: '教育目标是可迁移工程力，不是锁死品牌。' },
        { t: '只能背具体文件夹字符串', ok: false, why: '过窄。' },
        { t: '离开后应抛弃测试与观测', ok: false, why: '否。' },
        { t: '模式知识无法迁移到其它栈', ok: false, why: '可以。' },
      ],
      relatedNodes: ['xrk-overview', 'xrk-biz-map', 'xrk-min-path'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-patterns:q10',
      q: 'www 静态挂载 + HTTP API 的组合，对应哪种常见架构切片？',
      choices: [
        { t: '同一产品的交付面与控制面分离：静态资源与 JSON API 各有契约', ok: true, why: '前后端分离通识；本仓挂载规则是约束实例。' },
        { t: '静态页必须内嵌数据库引擎', ok: false, why: '否。' },
        { t: 'API 与页面必须同域且禁止 CORS 讨论', ok: false, why: '现实常要处理。' },
        { t: '只有微前端才允许静态资源', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-http-www', 'api-frontend', 'http-web'],
      tags: ['进阶'],
    },
  ],
});

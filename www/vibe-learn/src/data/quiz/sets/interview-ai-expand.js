import { defineQuizSet } from '../schema.js';

/**
 * 大厂 · Agent / 工具 / 安全开口
 */
export default defineQuizSet({
  id: 'interview-ai-stack',
  title: '大厂 · Agent / 工具 / 安全',
  kind: 'interview',
  domain: 'ai',
  tags: ['AI', 'Agent', 'MCP', '安全', '一面'],
  relatedNodes: ['ai-tool-calling', 'ai-mcp', 'ai-prompt-security'],
  caption: '工具闭环 · 注入隔离 · 权限与编排克制。',
  questions: [
    {
      id: 'interview-ai-stack:tool',
      q: '模型说该查库存，系统无查库动作。缺？',
      choices: [
        { t: '工具执行并回灌结果', ok: true, why: '提议→执行→回灌。' },
        { t: '提示里重复十遍查库', ok: false, why: '无执行器无效。' },
        { t: '有 Chat 就不需工具', ok: false, why: '多步靠编排。' },
        { t: '用户原文当系统规则', ok: false, why: '不安全。' },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-agent-birth'],
    },
    {
      id: 'interview-ai-stack:inject',
      q: '不可信用户文可能触发工具副作用。优先？',
      choices: [
        { t: '隔离规则并限制 ACL', ok: true, why: '边界与权限。' },
        { t: '代理步数不设上限', ok: false, why: '空转爆炸。' },
        { t: '用户文可覆盖系统规', ok: false, why: '注入面。' },
        { t: '只关日志就算安全', ok: false, why: '不替 ACL。' },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-agent-planning'],
    },
    {
      id: 'interview-ai-stack:mcp',
      q: '给 Agent 挂 MCP/工具，底线？',
      choices: [
        { t: '最小权限与可审计', ok: true, why: '默认拒绝越权。' },
        { t: '默认开放全部工具', ok: false, why: '攻击面过大。' },
        { t: '用户说就能提权', ok: false, why: '注入可接管。' },
        { t: '不记日志更安全', ok: false, why: '失去审计。' },
      ],
      relatedNodes: ['ai-mcp', 'ai-tool-calling'],
    },
    {
      id: 'interview-ai-stack:rules',
      q: '越权改生产时，rules 与 skills？',
      choices: [
        { t: '规则护栏，技能讲流程', ok: true, why: '红线与手册分离。' },
        { t: '规则越长越好无技能', ok: false, why: '淹没关键约束。' },
        { t: '两者混成无结构一锅', ok: false, why: '难维护。' },
        { t: '一律先全参微调替代', ok: false, why: '非第一步。' },
      ],
      relatedNodes: ['ai-rules', 'ai-skills'],
    },
    {
      id: 'interview-ai-stack:agent',
      q: '单次问答能搞定，还上多智能体？',
      choices: [
        { t: '通常不必，先单链', ok: true, why: '编排有成本。' },
        { t: '智能体越多越好', ok: false, why: '失败面上升。' },
        { t: '无工具也能改库存', ok: false, why: '缺执行闭环。' },
        { t: '先微调再谈要不要', ok: false, why: '先检索工具。' },
      ],
      relatedNodes: ['ai-agent-birth', 'ai-agent-planning'],
    },
    {
      id: 'interview-ai-stack:role',
      q: '系统约束与用户输入，角色上应？',
      choices: [
        { t: '系统与用户内容分开', ok: true, why: '降注入与混淆。' },
        { t: '全部塞进同一 user', ok: false, why: '易被覆盖。' },
        { t: '用户内容写进 system', ok: false, why: '扩大注入。' },
        { t: '取消 system 只用 tool', ok: false, why: '仍需系统约束。' },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-prompt-security'],
    },
    {
      id: 'interview-ai-stack:stream',
      q: '聊天要边生成边显示，接口侧常？',
      choices: [
        { t: '流式输出 chunk/SSE', ok: true, why: '降首字延迟。' },
        { t: '必须同步一次返回', ok: false, why: '体感更慢。' },
        { t: '改成 UDP 才流式', ok: false, why: '应用协议能力。' },
        { t: '关掉 token 计数', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-chat-era'],
    },
    {
      id: 'interview-ai-stack:loop',
      q: 'Agent 空转烧钱，工程上先加？',
      choices: [
        { t: '步数/预算硬上限', ok: true, why: '防无限循环。' },
        { t: '取消全部超时', ok: false, why: '更易空转。' },
        { t: '默认开放写生产', ok: false, why: '风险更大。' },
        { t: '禁止一切日志', ok: false, why: '更难排障。' },
      ],
      relatedNodes: ['ai-agent-planning', 'ai-prompt-security'],
    },
    {
      id: 'interview-ai-stack:memory',
      q: '多轮助手要记住用户偏好，更稳？',
      choices: [
        { t: '结构化记忆+检索写入', ok: true, why: '可控可过期。' },
        { t: '整段历史永不截断', ok: false, why: '易爆窗。' },
        { t: '把密钥写进记忆', ok: false, why: '泄密。' },
        { t: '禁止任何记忆机制', ok: false, why: '无法跨轮。' },
      ],
      relatedNodes: ['ai-agent-memory', 'ai-token-context'],
    },
    {
      id: 'interview-ai-stack:demo',
      q: '演示环境 Agent 误改生产，根因常是？',
      choices: [
        { t: '工具指向了生产凭据', ok: true, why: '环境隔离失败。' },
        { t: '温度设置过低', ok: false, why: '与写库目标无关。' },
        { t: '分块略大了一点', ok: false, why: '非主因。' },
        { t: '用了流式输出', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ai-mcp', 'ai-prompt-security', 'ai-tool-calling'],
    },
  ],
});

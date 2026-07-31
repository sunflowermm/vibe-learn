import { defineQuizSet } from '../schema.js';

/** 管线 / 工作流 / 办事交底 */
export default defineQuizSet({
  id: 'concept-xrk-agent-pipe',
  title: '概念 · 工作流、管线与办事助手',
  kind: 'concept',
  domain: 'xrk',
  tags: ['工作流', '管线', '办事助手'],
  relatedNodes: ['xrk-stream', 'xrk-chat-pipeline', 'xrk-agent-workspace'],
  caption: 'workflow 编排；管线组上下文；两张 AGENTS 别戴错。',
  questions: [
    {
      id: 'concept-xrk-agent-pipe:workflow',
      q: 'AiWorkflow 代码与配置通常？',
      choices: [
        {
          t: '代码在 core/*/workflow/；配置常对应 ai-workflow',
          ok: true,
          why: 'Loader 按约定扫描 workflow；配置名别和目录搞反。',
        },
        {
          t: '必须安装 LangChain 才能跑',
          ok: false,
          why: '本仓自有工作流约定，不强制 LangChain。',
        },
        {
          t: '只能写在浏览器',
          ok: false,
          why: '工作流是服务端扩展点。',
        },
        {
          t: '与 http 必须同一文件',
          ok: false,
          why: 'http/ 与 workflow/ 分目录，职责不同。',
        },
      ],
      relatedNodes: ['xrk-stream'],
    },
    {
      id: 'concept-xrk-agent-pipe:pipeline',
      q: '对话管线相对单次调模型 API？',
      choices: [
        {
          t: '组上下文、介入工具、流式推到通道',
          ok: true,
          why: '不是单次 prompt→answer；要管多层消息与工具环。',
        },
        {
          t: '只负责网页配色',
          ok: false,
          why: '管线是服务端对话链路。',
        },
        {
          t: '只做原样 echo',
          ok: false,
          why: '要处理系统/历史/工作区/工具结果。',
        },
        {
          t: '就是 LLM Factory 别名',
          ok: false,
          why: '工厂选客户端；管线管整条对话链路。',
        },
      ],
      relatedNodes: ['xrk-chat-pipeline'],
    },
    {
      id: 'concept-xrk-agent-pipe:two-badges',
      q: '根 AGENTS 与办事工作区 AGENTS？',
      choices: [
        {
          t: '根给框架/Core 开发；工作区给群聊办事模型——戴错改错舞台',
          ok: true,
          why: '注入链不同：开发交底 ≠ 办事人设。',
        },
        {
          t: '两份必须全文一致',
          ok: false,
          why: '读者与场景不同，全文复制会互相污染。',
        },
        {
          t: '办事人设应改 src/agent-runtime.js',
          ok: false,
          why: '人设在工作区文稿，不锁进 Runtime。',
        },
        {
          t: '根 AGENTS 会自动注入办事 system',
          ok: false,
          why: '根 AGENTS 不在办事注入链上。',
        },
      ],
      relatedNodes: ['xrk-agent-workspace', 'ai-agents-md', 'adev-project-memory'],
    },
    {
      id: 'concept-xrk-agent-pipe:ortho',
      q: 'Factory、MCP、工作流分工？',
      choices: [
        {
          t: '工厂选模型客户端；MCP 挂工具；工作流编排步骤',
          ok: true,
          why: '三者正交：模型面 / 工具面 / 编排面。',
        },
        {
          t: '有工厂就不必 MCP',
          ok: false,
          why: '模型客户端不会自动带来工具面。',
        },
        {
          t: 'MCP 替代全部 YAML 配置',
          ok: false,
          why: '业务配置仍走 CommonConfig。',
        },
        {
          t: '三者都必须写在 www/',
          ok: false,
          why: '都是服务端扩展点，不是静态页。',
        },
      ],
      relatedNodes: ['xrk-factory-llm', 'xrk-mcp-ops', 'xrk-stream'],
    },
  ],
});

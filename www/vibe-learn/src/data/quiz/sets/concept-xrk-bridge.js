import { defineQuizSet } from '../schema.js';

/** 桥接：联调与解包（前端契约在此保留一道） */
export default defineQuizSet({
  id: 'concept-xrk-bridge',
  title: '概念 · XRK 工程桥接',
  kind: 'concept',
  domain: 'xrk',
  tags: ['联调', 'Git', '环境'],
  relatedNodes: ['xrk-biz-map', 'xrk-deploy-env'],
  caption: '协作、排障、出网——接到业务层。',
  questions: [
    {
      id: 'concept-xrk-bridge:git',
      q: '往 Core 加能力后协作上仍应？',
      choices: [
        {
          t: '分支 → 本地跑通 → PR 写 why → CI 绿再合',
          ok: true,
          why: '能加载 ≠ 可跳过审查。',
        },
        {
          t: '生产机直接改不提交',
          ok: false,
          why: '无审计。',
        },
        {
          t: 'message 只写 update',
          ok: false,
          why: '应写意图。',
        },
        {
          t: '禁止使用分支',
          ok: false,
          why: '分支是常规手段。',
        },
      ],
      relatedNodes: ['git-advanced', 'xrk-plugin-arch'],
    },
    {
      id: 'concept-xrk-bridge:http-debug',
      q: 'HTTP 联调失败分层顺序？',
      choices: [
        {
          t: '进程/端口 → 反代与路径 → 鉴权 → 响应形状与业务',
          ok: true,
          why: '先入口，再契约。',
        },
        {
          t: '先微调基座模型',
          ok: false,
          why: 'HTTP 未通时无关。',
        },
        {
          t: '先删远程历史',
          ok: false,
          why: '无关。',
        },
        {
          t: '只改前端配色',
          ok: false,
          why: '不解决 4xx/5xx。',
        },
      ],
      relatedNodes: ['xrk-lab-http', 'workbench-troubleshoot', 'xrk-http-auth'],
    },
    {
      id: 'concept-xrk-bridge:proxy',
      q: '出网拉依赖/调模型失败，优先？',
      choices: [
        {
          t: '查 HTTP_PROXY 等与 NO_PROXY，再查业务 yaml',
          ok: true,
          why: '环境层优先。',
        },
        {
          t: '先重写 src/infrastructure',
          ok: false,
          why: '越界且常不对症。',
        },
        {
          t: '长期关 TLS 校验',
          ok: false,
          why: '危险。',
        },
        {
          t: '删除 PATH',
          ok: false,
          why: '更糟。',
        },
      ],
      relatedNodes: ['data-env', 'xrk-first-run', 'xrk-factory-llm'],
    },
    {
      id: 'concept-xrk-bridge:env-yaml',
      q: '三同步时 .env 角色？',
      choices: [
        {
          t: '偏密钥与环境注入；不能替代 default/schema/消费代码',
          ok: true,
          why: '业务字段仍要三同步。',
        },
        {
          t: '.env 可替代全部 yaml',
          ok: false,
          why: '面板与校验会失效。',
        },
        {
          t: '生产密钥写入 default_config 提交',
          ok: false,
          why: '禁止。',
        },
        {
          t: '三同步只针对前端文案',
          ok: false,
          why: '服务端配置工程。',
        },
      ],
      relatedNodes: ['xrk-config', 'data-env', 'xrk-lab-config'],
    },
  ],
});

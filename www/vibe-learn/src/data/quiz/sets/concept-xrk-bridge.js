import { defineQuizSet } from '../schema.js';

/** 桥接：联调与环境（三同步正文在 core；此处只钉 .env 角色） */
export default defineQuizSet({
  id: 'concept-xrk-bridge',
  title: '概念 · XRK 工程桥接',
  kind: 'concept',
  domain: 'xrk',
  tags: ['联调', 'Git', '环境'],
  relatedNodes: ['xrk-biz-map', 'xrk-deploy-env'],
  caption: '协作、排障、出网、.env——接到业务层。',
  questions: [
    {
      id: 'concept-xrk-bridge:git',
      q: '往 Core 加能力后协作上仍应？',
      choices: [
        {
          t: "分支 → 本地跑通 → PR 写 why → CI 绿再合",
          ok: true,
          why: '能加载 ≠ 可跳过审查与验收。',
        },
        {
          t: '生产机直接改源码且从不提交，靠口头同步即可',
          ok: false,
          why: '无审计、难回滚。',
        },
        {
          t: 'commit message 只写 update，意图留给审阅者猜',
          ok: false,
          why: '应写清意图，方便后人与回滚。',
        },
        {
          t: '禁止使用分支：所有人必须直接往 main 推送',
          ok: false,
          why: '分支是常规协作手段。',
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
          why: '先确认入口通，再抠契约与业务。',
        },
        {
          t: '联调失败时先微调基座模型参数，再回头看端口与鉴权',
          ok: false,
          why: 'HTTP 未通时与微调无关。',
        },
        {
          t: '先删除远程 Git 历史与 lockfile，期望 HTTP 形状随之恢复',
          ok: false,
          why: '与联调失败无关，且危险。',
        },
        {
          t: '只改前端配色与文案即可，服务端进程与反代路径无关紧要',
          ok: false,
          why: '不解决 4xx/5xx 或鉴权。',
        },
      ],
      relatedNodes: ['xrk-lab-http', 'workbench-troubleshoot', 'xrk-http-auth'],
    },
    {
      id: 'concept-xrk-bridge:proxy',
      q: '出网拉依赖/调模型失败，优先？',
      choices: [
        {
          t: "查 HTTP_PROXY 等与 NO_PROXY，再查业务 yaml",
          ok: true,
          why: '环境层优先；业务代理字段是第二刀。',
        },
        {
          t: '先重写 src/infrastructure 网络栈，再回头看代理环境变量',
          ok: false,
          why: '越界且常不对症。',
        },
        {
          t: '长期关闭 TLS 证书校验当解法，并写进默认配置模板',
          ok: false,
          why: '掩盖中间人风险，不是正经解法。',
        },
        {
          t: '删除 PATH 让系统重装网络栈，期望代理问题随之消失',
          ok: false,
          why: '命令找不到，网络问题更难排。',
        },
      ],
      relatedNodes: ['data-env', 'xrk-first-run', 'xrk-factory-llm'],
    },
    {
      id: 'concept-xrk-bridge:env-yaml',
      q: '配置三同步时，.env 扮演什么角色？',
      choices: [
        {
          t: "偏密钥与机器差注入；不能替代 default / schema / 消费代码",
          ok: true,
          why: '业务字段仍要三同步；.env 只管机密与环境差。',
        },
        {
          t: '.env 可替代全部 yaml 与 commonconfig，面板与校验都不必要',
          ok: false,
          why: '面板、校验与引导复制会失效。',
        },
        {
          t: '生产密钥写入 default_config 并提交进仓库方便复用',
          ok: false,
          why: '密钥禁止进仓。',
        },
        {
          t: '三同步只针对前端文案与配色，服务端配置不必对齐',
          ok: false,
          why: '指服务端配置工程三处对齐。',
        },
      ],
      relatedNodes: ['xrk-config', 'data-env', 'xrk-lab-config'],
    },
  ],
});

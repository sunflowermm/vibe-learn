import { defineQuizSet } from '../schema.js';

/** Vibe：Accept 与交底 */
export default defineQuizSet({
  id: 'concept-adev',
  title: '概念 · Vibe Coding 与项目记忆',
  kind: 'concept',
  domain: 'xrk',
  tags: ['Vibe', 'AGENTS'],
  relatedNodes: ['adev-vibe-coding', 'adev-project-memory'],
  caption: '审 diff、守边界、交底对齐。',
  questions: [
    {
      id: 'concept-adev:accept',
      q: 'Accept Agent 改动前？',
      choices: [
        {
          t: '审 diff（防越界改 src/）+ 本机跑通相关路径',
          ok: true,
          why: '人机协作底线：看行为，不看语气。',
        },
        {
          t: '无脑全盘 Accept',
          ok: false,
          why: '易引入越界改 Runtime 或破坏配置归属。',
        },
        {
          t: '先提交密钥再 Accept',
          ok: false,
          why: '密钥禁止进仓，与 Accept 无关。',
        },
        {
          t: '只看语气是否友好',
          ok: false,
          why: '要看 diff 与可运行结果。',
        },
      ],
      relatedNodes: ['adev-vibe-coding'],
    },
    {
      id: 'concept-adev:memory',
      q: '项目交底优先维护？',
      choices: [
        {
          t: 'AGENTS.md / skills 等版本化文件，事实对齐',
          ok: true,
          why: '可移植、可 PR；不写密钥。',
        },
        {
          t: '互相矛盾的两套说明书',
          ok: false,
          why: '模型行为会不可预测。',
        },
        {
          t: '生产密码写进 AGENTS.md',
          ok: false,
          why: '机密走环境/密文，不进交底文稿。',
        },
        {
          t: '只放 IDE 本地，仓库不需要',
          ok: false,
          why: '应进仓共享，否则同事与 CI 无交底。',
        },
      ],
      relatedNodes: ['adev-project-memory', 'ai-agents-md'],
    },
    {
      id: 'concept-adev:deploy',
      q: '委派 Agent 改部署/端口/权限时？',
      choices: [
        {
          t: '仍要懂端口、权限与回滚，审输出',
          ok: true,
          why: '高影响面必须人把关。',
        },
        {
          t: '可不看输出直接离开',
          ok: false,
          why: '生产翻车代价大。',
        },
        {
          t: '改生产可跳过备份',
          ok: false,
          why: '备份与回滚路径不可省。',
        },
        {
          t: '不必理解改了什么',
          ok: false,
          why: '故障时无法定位与回滚。',
        },
      ],
      relatedNodes: ['adev-vibe-coding', 'xrk-deploy-env'],
    },
  ],
});

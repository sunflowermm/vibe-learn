import { defineQuizSet } from '../schema.js';

/** Vibe：Accept 与交底（形态课不单开题） */
export default defineQuizSet({
  id: 'concept-adev',
  title: '概念 · Vibe Coding 与项目记忆',
  kind: 'concept',
  domain: 'xrk',
  tags: ['Vibe', 'AGENTS'],
  relatedNodes: ['adev-vibe-coding'],
  caption: '审 diff、守边界、交底对齐。',
  questions: [
    {
      id: 'concept-adev:accept',
      q: 'Accept Agent 改动前？',
      choices: [
        {
          t: '审 diff（防越界改 src/）+ 本机跑通相关路径',
          ok: true,
          why: '人机协作底线。',
        },
        {
          t: '无脑全盘 Accept',
          ok: false,
          why: '反模式。',
        },
        {
          t: '先提交密钥再 Accept',
          ok: false,
          why: '密钥禁入仓。',
        },
        {
          t: '只看语气是否友好',
          ok: false,
          why: '看行为。',
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
          why: '可移植；不写密钥。',
        },
        {
          t: '互相矛盾的两套说明书',
          ok: false,
          why: '行为不可预测。',
        },
        {
          t: '生产密码写进 AGENTS.md',
          ok: false,
          why: '机密不进仓。',
        },
        {
          t: '只放 IDE 本地，仓库不需要',
          ok: false,
          why: '应进仓共享。',
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
          why: '代价大。',
        },
        {
          t: '改生产可跳过备份',
          ok: false,
          why: '备份回滚不可省。',
        },
        {
          t: '不必理解改了什么',
          ok: false,
          why: '故障时无法回滚。',
        },
      ],
      relatedNodes: ['adev-vibe-coding', 'xrk-deploy-env'],
    },
  ],
});

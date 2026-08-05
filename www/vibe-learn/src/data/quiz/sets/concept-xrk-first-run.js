import { defineQuizSet } from '../schema.js';

/** 首次跑通：环境先绿（config 就绪见 concept-xrk-core） */
export default defineQuizSet({
  id: 'concept-xrk-first-run',
  title: '概念 · XRK 首次跑通与部署环境',
  kind: 'concept',
  domain: 'xrk',
  tags: ['首次跑通', '部署', 'Node', 'pnpm'],
  relatedNodes: ['xrk-first-run', 'xrk-deploy-env'],
  caption: 'pnpm / Node / 端口 / 反代 / 出网——再谈插件。',
  questions: [
    {
      id: 'concept-xrk-first-run:pnpm',
      q: '本仓包管理器约定？',
      choices: [
        {
          t: '仅 pnpm，勿混用导致锁文件漂移',
          ok: true,
          why: '安装与脚本走 pnpm；混用会搅乱 lockfile。',
        },
        {
          t: 'npm/yarn/pnpm 各装一遍更稳',
          ok: false,
          why: '多把锁互相覆盖，制造不可复现。',
        },
        {
          t: '禁止锁文件',
          ok: false,
          why: '锁文件保证依赖图可复现。',
        },
        {
          t: '只能用图形界面安装',
          ok: false,
          why: 'CLI 是正路；CI 也靠命令。',
        },
      ],
      relatedNodes: ['xrk-first-run', 'package-managers'],
    },
    {
      id: 'concept-xrk-first-run:node',
      q: 'Node 不满足 engines 时？',
      choices: [
        {
          t: '新语法/API 不可用或告警',
          ok: true,
          why: '本仓面向较新 Node（Current/LTS 要求见 package）。',
        },
        {
          t: '版本越旧越符合本仓',
          ok: false,
          why: '相反：旧 Node 缺新 API，会直接挂。',
        },
        {
          t: 'Node 版本与运行无关',
          ok: false,
          why: '语法、全局 API、依赖引擎都绑版本。',
        },
        {
          t: '卸载 pnpm 来兼容旧 Node',
          ok: false,
          why: '应对症升级 Node，而不是拆包管理器。',
        },
      ],
      relatedNodes: ['xrk-first-run', 'runtime-nodejs'],
    },
    {
      id: 'concept-xrk-first-run:port',
      q: '端口占用起不来，优先？',
      choices: [
        {
          t: '查占用进程、改监听或结束旧进程——环境层排障',
          ok: true,
          why: '先环境，再怀疑业务代码。',
        },
        {
          t: '立刻重写全部 Core',
          ok: false,
          why: '端口冲突时重写业务过早且不对症。',
        },
        {
          t: '删远程 main',
          ok: false,
          why: '与本机端口占用无关，且破坏协作。',
        },
        {
          t: '把模型 temperature 调到 0',
          ok: false,
          why: '采样参数不释放端口。',
        },
      ],
      relatedNodes: ['xrk-deploy-env', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-xrk-first-run:proxy',
      q: '公网访问与反代的常见结构？',
      choices: [
        {
          t: '公网 443 → Nginx',
          ok: true,
          why: '部署环境课与 nginx 课同一模式。',
        },
        {
          t: '反代可以替代数据库',
          ok: false,
          why: '反代管入口；库管持久化，职责不同。',
        },
        {
          t: '有反代就不必再谈 TLS',
          ok: false,
          why: 'TLS 常在反代终止，仍要正确配证书。',
        },
        {
          t: '反代只用于静态博客',
          ok: false,
          why: 'API 与 www 挂载都常用反代。',
        },
      ],
      relatedNodes: ['xrk-deploy-env', 'net-nginx'],
    },
    {
      id: 'concept-xrk-first-run:outbound',
      q: '出网拉依赖或调模型 API 失败，环境层先查？',
      choices: [
        {
          t: 'HTTP(S)_PROXY',
          ok: true,
          why: '境外源与模型 API 常卡在代理；先环境后业务。',
        },
        {
          t: '先重写 src/infrastructure',
          ok: false,
          why: '越界且常不对症。',
        },
        {
          t: '长期关闭 TLS 证书校验当解法',
          ok: false,
          why: '掩盖中间人风险，不是正经排障。',
        },
        {
          t: '删除 PATH 让系统重装网络栈',
          ok: false,
          why: 'PATH 管命令搜索，删了只会更糟。',
        },
      ],
      relatedNodes: ['xrk-deploy-env', 'data-env', 'xrk-first-run'],
    },
  ],
});

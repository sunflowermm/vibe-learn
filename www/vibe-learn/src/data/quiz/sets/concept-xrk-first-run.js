import { defineQuizSet } from '../schema.js';

/** 首次跑通 / 部署环境：接 Node、pnpm、端口、代理 */
export default defineQuizSet({
  id: 'concept-xrk-first-run',
  title: '概念 · XRK 首次跑通与部署环境',
  kind: 'concept',
  domain: 'xrk',
  tags: ['首次跑通', '部署', 'Node', 'pnpm', '基础', '进阶'],
  relatedNodes: ['xrk-first-run', 'xrk-deploy-env', 'xrk-overview'],
  caption: '从 clone 到监听端口：环境层先绿，再谈插件。',
  questions: [
    {
      id: 'concept-xrk-first-run:q1',
      q: '本仓包管理器约定是？',
      choices: [
        { t: '仅支持 pnpm（勿混用乱装导致锁文件漂移）', ok: true, why: 'engines/文档约定；安装与脚本走 pnpm。' },
        { t: '必须用随机三种包管理器各装一遍', ok: false, why: '制造漂移。' },
        { t: '禁止使用锁文件', ok: false, why: '锁文件保证可复现。' },
        { t: '只能用图形界面点装，禁止 CLI', ok: false, why: 'CLI 是正路。' },
      ],
      relatedNodes: ['xrk-first-run', 'package-managers'],
      tags: ['基础'],
    },
    {
      id: 'concept-xrk-first-run:q2',
      q: 'Node 版本不满足 engines 时常见现象？',
      choices: [
        { t: '新语法/API 不可用或安装告警——应升级到文档要求的 Node', ok: true, why: '本仓面向较新 Node；对照 node -v。' },
        { t: '版本越旧越符合本仓', ok: false, why: '相反。' },
        { t: 'Node 版本与运行无关', ok: false, why: '有关。' },
        { t: '应卸载 pnpm 来兼容旧 Node', ok: false, why: '不对症。' },
      ],
      relatedNodes: ['xrk-first-run', 'runtime-nodejs'],
      tags: ['基础'],
    },
    {
      id: 'concept-xrk-first-run:q3',
      q: '启动链直觉（简化）？',
      choices: [
        { t: '入口启动 → 引导/配置就绪 → Agent Runtime 扫描 Core 并挂载扩展', ok: true, why: '细节见 startup 文档；先建立阶段感。' },
        { t: '浏览器直接执行 src/infrastructure', ok: false, why: '服务端 Node。' },
        { t: '无需任何入口文件', ok: false, why: '有 app/start 链。' },
        { t: '启动等于 git push --force', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-runtime', 'xrk-first-run'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-xrk-first-run:q4',
      q: '端口被占用导致起不来，优先？',
      choices: [
        { t: '查谁占用端口、改配置监听或结束旧进程——属环境层排障', ok: true, why: '接 troubleshoot-cli。' },
        { t: '重写全部 Core 业务', ok: false, why: '过早。' },
        { t: '删除远程 main', ok: false, why: '无关。' },
        { t: '把 temperature 调到 0', ok: false, why: '无关。' },
      ],
      relatedNodes: ['xrk-deploy-env', 'workbench-troubleshoot'],
      tags: ['基础'],
    },
    {
      id: 'concept-xrk-first-run:q5',
      q: '部署环境清单里和「反代」相关的一项？',
      choices: [
        { t: '公网 443 → Nginx 等 → 本机 Node 端口；证书挂在入口', ok: true, why: '接 nginx-ops。' },
        { t: '反代可以替代数据库', ok: false, why: '否。' },
        { t: '有反代就不必 HTTPS', ok: false, why: '常在反代上做 TLS。' },
        { t: '反代只用于 UDP 游戏', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-deploy-env', 'net-nginx'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-first-run:q6',
      q: 'system-Core 白名单策略对「娱乐插件」？',
      choices: [
        { t: '本地可跑、默认不进主仓白名单；勿为玩梗插件加 !', ok: true, why: '项目规则；配置可写插件顶部。' },
        { t: '娱乐插件必须提交进 system-Core', ok: false, why: '相反。' },
        { t: '娱乐插件只能放 src/', ok: false, why: '业务在 core。' },
        { t: '白名单与 gitignore 无关', ok: false, why: '入库靠忽略规则。' },
      ],
      relatedNodes: ['xrk-core-layout', 'xrk-overview'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-first-run:q7',
      q: '业务全局对象写法：AgentRuntime / msgSegment？',
      choices: [
        { t: '裸名使用；勿 import AgentRuntime、勿 new、勿写 global.', ok: true, why: '挂在 globalThis；基类才 import。' },
        { t: '每个插件 new 一个 Runtime', ok: false, why: '禁止。' },
        { t: '必须 global.AgentRuntime 双写', ok: false, why: '勿手写双份。' },
        { t: '仅浏览器可用', ok: false, why: '服务端插件常用。' },
      ],
      relatedNodes: ['xrk-runtime', 'xrk-plugin-arch'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-first-run:q8',
      q: '配置在 CommonConfigRegistry.load() 完成前？',
      choices: [
        { t: 'runtimeConfig 可能尚未就绪；启动早期用模板/引导路径', ok: true, why: '时序很重要，避免过早读空。' },
        { t: '任何时刻读配置都保证完整', ok: false, why: '有窗口期。' },
        { t: '配置只存在于浏览器 localStorage', ok: false, why: '服务端 yaml 体系。' },
        { t: 'load 完成前应提交密钥进仓', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-config', 'xrk-runtime'],
      tags: ['进阶'],
    },
  ],
});

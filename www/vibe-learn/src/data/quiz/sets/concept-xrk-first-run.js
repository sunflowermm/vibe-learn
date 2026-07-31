import { defineQuizSet } from '../schema.js';

/** 首次跑通：环境先绿 */
export default defineQuizSet({
  id: 'concept-xrk-first-run',
  title: '概念 · XRK 首次跑通与部署环境',
  kind: 'concept',
  domain: 'xrk',
  tags: ['首次跑通', '部署', 'Node', 'pnpm'],
  relatedNodes: ['xrk-first-run', 'xrk-deploy-env'],
  caption: 'pnpm / Node / 端口 / 反代——再谈插件。',
  questions: [
    {
      id: 'concept-xrk-first-run:pnpm',
      q: '本仓包管理器约定？',
      choices: [
        {
          t: '仅 pnpm，勿混用导致锁文件漂移',
          ok: true,
          why: '安装与脚本走 pnpm。',
        },
        {
          t: 'npm/yarn/pnpm 各装一遍更稳',
          ok: false,
          why: '制造漂移。',
        },
        {
          t: '禁止锁文件',
          ok: false,
          why: '锁文件保证可复现。',
        },
        {
          t: '只能用图形界面安装',
          ok: false,
          why: 'CLI 是正路。',
        },
      ],
      relatedNodes: ['xrk-first-run', 'package-managers'],
    },
    {
      id: 'concept-xrk-first-run:node',
      q: 'Node 不满足 engines 时？',
      choices: [
        {
          t: '新语法/API 不可用或告警——升级到文档要求版本',
          ok: true,
          why: '本仓面向较新 Node。',
        },
        {
          t: '版本越旧越符合本仓',
          ok: false,
          why: '相反。',
        },
        {
          t: 'Node 版本与运行无关',
          ok: false,
          why: '有关。',
        },
        {
          t: '卸载 pnpm 来兼容旧 Node',
          ok: false,
          why: '不对症。',
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
          why: '先环境，再业务。',
        },
        {
          t: '立刻重写全部 Core',
          ok: false,
          why: '过早。',
        },
        {
          t: '删远程 main',
          ok: false,
          why: '无关。',
        },
        {
          t: '把模型 temperature 调到 0',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['xrk-deploy-env', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-xrk-first-run:proxy',
      q: '公网访问与反代的常见结构？',
      choices: [
        {
          t: '公网 443 → Nginx 等 → 本机 Node 端口；证书挂在入口',
          ok: true,
          why: '部署环境课与 nginx 课同一模式。',
        },
        {
          t: '反代可以替代数据库',
          ok: false,
          why: '职责不同。',
        },
        {
          t: '有反代就不必再谈 TLS',
          ok: false,
          why: 'TLS 常在反代终止。',
        },
        {
          t: '反代只用于静态博客',
          ok: false,
          why: 'API 与 www 都常用。',
        },
      ],
      relatedNodes: ['xrk-deploy-env', 'net-nginx'],
    },
    {
      id: 'concept-xrk-first-run:config-ready',
      q: 'CommonConfigRegistry.load() 完成前？',
      choices: [
        {
          t: 'runtimeConfig 可能未就绪；启动早期走模板/引导，勿假设配置齐全',
          ok: true,
          why: '时序窗口。',
        },
        {
          t: '任意时刻读配置都保证完整',
          ok: false,
          why: '有窗口期。',
        },
        {
          t: '配置只存在于浏览器 localStorage',
          ok: false,
          why: '服务端 yaml 体系。',
        },
        {
          t: 'load 前应提交密钥进仓',
          ok: false,
          why: '禁止。',
        },
      ],
      relatedNodes: ['xrk-config', 'xrk-runtime'],
    },
  ],
});

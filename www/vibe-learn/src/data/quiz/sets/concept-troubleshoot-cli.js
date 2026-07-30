import { defineQuizSet } from '../schema.js';

/** 排障指令：环境层 checklist 可敲命令（挂 workbench） */
export default defineQuizSet({
  id: 'concept-troubleshoot-cli',
  title: '概念 · 排障指令（基础→进阶）',
  kind: 'concept',
  domain: 'craft',
  tags: ['排障', '指令', '基础', '进阶'],
  relatedNodes: ['workbench-troubleshoot', 'installers-path', 'runtime-nodejs'],
  caption: 'node 起不来时先敲这些：版本、端口、进程、依赖——再谈业务。',
  questions: [
    {
      id: 'concept-troubleshoot-cli:q1',
      q: '确认本机 Node 是否在 PATH 且版本符合预期？',
      choices: [
        { t: 'node -v 与 which node（Windows: where.exe node）', ok: true, why: '版本与实际路径；多版本时防用错。' },
        { t: 'git merge --abort 必显示 Node 版本', ok: false, why: '无关。' },
        { t: 'docker pause', ok: false, why: '无关。' },
        { t: 'nginx -t', ok: false, why: '测 Nginx 配置。' },
      ],
      relatedNodes: ['runtime-nodejs', 'installers-path'],
      tags: ['基础'],
    },
    {
      id: 'concept-troubleshoot-cli:q2',
      q: 'EADDRINUSE：端口已被占用，Linux/macOS 常见查法？',
      choices: [
        { t: 'ss -lntp | grep :3000 或 lsof -i :3000', ok: true, why: '找到 PID 再决定 kill 或换端口。' },
        { t: 'pwd :3000', ok: false, why: '否。' },
        { t: 'git status :3000', ok: false, why: '否。' },
        { t: 'npm publish 释放端口', ok: false, why: '否。' },
      ],
      relatedNodes: ['workbench-troubleshoot', 'linux-cli', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q3',
      q: '依赖装了但运行报 cannot find module，优先？',
      choices: [
        { t: '确认在项目根、node_modules 存在、包管理器锁定文件一致，必要时重装依赖', ok: true, why: '工作目录与安装器漂移是高频。' },
        { t: '删除远程 main 分支', ok: false, why: '无关。' },
        { t: '把所有 import 改成 http://', ok: false, why: '否。' },
        { t: '关闭 TLS 全局校验当长期方案', ok: false, why: '危险且常不对症。' },
      ],
      relatedNodes: ['workbench-troubleshoot', 'package-managers'],
      tags: ['基础'],
    },
    {
      id: 'concept-troubleshoot-cli:q4',
      q: 'curl 本机 API 做最小连通性检查？',
      choices: [
        { t: 'curl -i http://127.0.0.1:端口/路径', ok: true, why: '-i 看状态行与头；再对响应体。' },
        { t: 'curl 只能测数据库事务', ok: false, why: 'HTTP 客户端。' },
        { t: '必须用浏览器才能发 GET', ok: false, why: 'curl 即可。' },
        { t: 'curl -i 会格式化磁盘', ok: false, why: '否。' },
      ],
      relatedNodes: ['workbench-troubleshoot', 'http-hands-on', 'linux-cli'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q5',
      q: 'pnpm / npm 脚本跑不起来，先看？',
      choices: [
        { t: 'package.json 的 scripts 实际命令、是否在正确目录执行', ok: true, why: '脚本是入口约定，不是魔法。' },
        { t: '把 scripts 改成随机字符串碰运气', ok: false, why: '否。' },
        { t: '先 force push --mirror', ok: false, why: '危险无关。' },
        { t: '卸载显卡驱动', ok: false, why: '否。' },
      ],
      relatedNodes: ['workbench-troubleshoot', 'package-managers'],
      tags: ['基础'],
    },
    {
      id: 'concept-troubleshoot-cli:q6',
      q: '日志里只有堆栈、本地复现不了，较稳妥？',
      choices: [
        { t: '对齐 Node 版本、环境变量、依赖锁、输入数据，再加最小复现用例', ok: true, why: '环境漂移是「我这边能跑」的根源。' },
        { t: '断言一定是量子噪声', ok: false, why: '先对齐环境。' },
        { t: '删掉全部测试', ok: false, why: '更糟。' },
        { t: '关闭所有日志', ok: false, why: '丢掉证据。' },
      ],
      relatedNodes: ['workbench-troubleshoot', 'craft-debug', 'data-env'],
      tags: ['进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q7',
      q: 'Windows 上查占用端口的进程？',
      choices: [
        { t: 'netstat -ano | findstr :3000 再 tasklist /FI "PID eq ..."', ok: true, why: '经典组合；也可资源监视器。' },
        { t: 'chmod +x 端口', ok: false, why: 'Unix 权限命令。' },
        { t: 'systemctl status :3000 在纯 Windows 服务管理里总是唯一写法', ok: false, why: 'systemd 是 Linux。' },
        { t: 'git bisect 端口', ok: false, why: '否。' },
      ],
      relatedNodes: ['workbench-troubleshoot', 'terminal-worlds'],
      tags: ['进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q8',
      q: '读报错时「Cannot find package \'x\' imported from …」下一步？',
      choices: [
        { t: '核对 import 路径/包名、是否 ESM/CJS、依赖是否声明并安装', ok: true, why: '模块解析错误，不是先重装 OS。' },
        { t: '立刻格式化 C 盘', ok: false, why: '过激。' },
        { t: '把报错当成功标志', ok: false, why: '否。' },
        { t: '删除 node 二进制再不问原因', ok: false, why: '先读信息。' },
      ],
      relatedNodes: ['code-read-errors', 'code-modules', 'workbench-troubleshoot'],
      tags: ['基础', '进阶'],
    },
  ],
});

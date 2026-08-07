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
        {
          t: 'node -v，并用 which/where 看实际路径',
          ok: true,
          why: '版本与实际路径；多版本时防用错。',
        },
        {
          t: 'git merge --abort 必会打印 Node 版本',
          ok: false,
          why: '只取消合并，不查 Node。',
        },
        {
          t: 'docker pause 会显示宿主机 Node 版本',
          ok: false,
          why: '暂停容器，不显示本机 Node 版本。',
        },
        {
          t: 'nginx -t 等于检查 Node 是否在 PATH',
          ok: false,
          why: '测 Nginx 配置语法，与 Node 无关。',
        },
      ],
      relatedNodes: ['runtime-nodejs', 'installers-path'],
      tags: ['基础'],
    },
    {
      id: 'concept-troubleshoot-cli:q2',
      q: 'EADDRINUSE：端口已被占用，Linux/macOS 常见查法？',
      choices: [
        {
          t: 'ss -lntp | grep :3000（或 lsof -i :3000）找 PID',
          ok: true,
          why: '找到 PID 再决定 kill 或换端口。',
        },
        {
          t: 'git status :3000（仓库状态会自动列出占用该端口的全部进程）',
          ok: false,
          why: 'Git 状态，与监听端口无关。',
        },
        {
          t: 'npm publish 一次就会自动释放本机被占用的全部监听端口',
          ok: false,
          why: '发布包到仓库，不会释放本机端口。',
        },
        {
          t: 'pwd :3000（打印工作目录就会自动释放该监听端口）',
          ok: false,
          why: 'pwd 打印工作目录，不查端口。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'linux-cli', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q3',
      q: '依赖装了但运行报 cannot find module，优先？',
      choices: [
        {
          t: '确认在项目根、node_modules 存在，且装过对应包',
          ok: true,
          why: '工作目录与安装器漂移是高频。',
        },
        {
          t: '删除远程 main 分支再重新 clone',
          ok: false,
          why: '与模块解析无关，且破坏协作。',
        },
        {
          t: '把所有 import 改成 http:// 远程 URL',
          ok: false,
          why: '不会修好缺包；还引入错误解析。',
        },
        {
          t: '关闭 TLS 全局校验并当作长期方案',
          ok: false,
          why: '危险且对 cannot find module 不对症。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'package-managers'],
      tags: ['基础'],
    },
    {
      id: 'concept-troubleshoot-cli:q4',
      q: 'curl 本机 API 做最小连通性检查？',
      choices: [
        {
          t: 'curl -i http://127.0.0.1:...（看状态行与响应头）',
          ok: true,
          why: '-i 看状态行与头；再对响应体。',
        },
        {
          t: 'curl 只能用来测数据库事务是否已经提交成功',
          ok: false,
          why: 'curl 是 HTTP 客户端，不管事务。',
        },
        {
          t: '必须打开图形浏览器才能对本机发出任何 GET 请求',
          ok: false,
          why: '命令行 curl 就能发 GET。',
        },
        {
          t: 'curl -i 会改写本机 hosts，因此绝对不能对本机地址测',
          ok: false,
          why: '只发 HTTP 请求，不改 hosts/分区。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'http-hands-on', 'linux-cli'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q5',
      q: 'pnpm / npm 脚本跑不起来，先看？',
      choices: [
        {
          t: 'package.json 的 scripts 实际命令与依赖是否齐全',
          ok: true,
          why: '脚本是入口约定，不是魔法。',
        },
        {
          t: '把 scripts 改成随机字符串碰运气',
          ok: false,
          why: '应读懂实际命令与依赖。',
        },
        {
          t: '先 force push --mirror 清掉远程再试脚本',
          ok: false,
          why: '危险且与脚本失败无关。',
        },
        {
          t: '先卸掉无关外设驱动，再重跑 package 脚本碰运气',
          ok: false,
          why: '脚本执行不依赖卸驱动。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'package-managers'],
      tags: ['基础'],
    },
    {
      id: 'concept-troubleshoot-cli:q6',
      q: '日志里只有堆栈、本地复现不了，较稳妥？',
      choices: [
        {
          t: '对齐 Node 版本、环境变量、依赖锁与输入数据',
          ok: true,
          why: '环境漂移是「我这边能跑」的根源。',
        },
        {
          t: '断言一定是硬件随机噪声导致，不必再对齐版本与依赖',
          ok: false,
          why: '先对齐版本/依赖/输入，再谈玄学。',
        },
        {
          t: '删掉全部自动化测试，让偶发失败「自然消失」就算修好',
          ok: false,
          why: '丢掉回归网，更难定位。',
        },
        {
          t: '关闭全部应用日志与指标，先减少干扰信息再慢慢猜',
          ok: false,
          why: '丢掉排障证据。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'craft-debug', 'data-env'],
      tags: ['进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q7',
      q: 'Windows 上查占用端口的进程？',
      choices: [
        {
          t: 'netstat -ano | findstr :3000，再对照 tasklist / PID',
          ok: true,
          why: '经典组合；也可资源监视器。',
        },
        {
          t: 'chmod +x 端口号，即可看到占用进程',
          ok: false,
          why: 'chmod 改文件权限，不查端口。',
        },
        {
          t: 'systemctl status :3000 在纯 Windows 上是唯一写法',
          ok: false,
          why: 'systemd 是 Linux；Win 用 netstat/资源监视器。',
        },
        {
          t: 'git bisect 端口号，自动找出占用进程',
          ok: false,
          why: 'bisect 用来二分坏提交，不查端口占用。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'terminal-worlds'],
      tags: ['进阶'],
    },
    {
      id: 'concept-troubleshoot-cli:q8',
      q: '读报错时「Cannot find package \'x\' imported from …」下一步？',
      choices: [
        {
          t: '核对 import 路径、包是否已安装、是否在正确工作目录',
          ok: true,
          why: '模块解析错误，不是先动系统盘。',
        },
        {
          t: '立刻把 Node 升到最新 major，并跳过核对 import 与依赖',
          ok: false,
          why: '盲升级常引入新问题；先读报错与依赖图。',
        },
        {
          t: '把这条报错当成构建成功的标志忽略',
          ok: false,
          why: '模块解析失败需要修依赖/路径。',
        },
        {
          t: '删除 node 二进制后不再排查依赖图',
          ok: false,
          why: '先读报错与依赖图，别盲卸运行时。',
        },
      ],
      relatedNodes: ['code-read-errors', 'code-modules', 'workbench-troubleshoot'],
      tags: ['基础', '进阶'],
    },
  ],
});

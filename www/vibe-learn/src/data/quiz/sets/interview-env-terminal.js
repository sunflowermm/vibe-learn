import { defineQuizSet } from '../schema.js';

/**
 * 大厂/开口向：环境与终端——分层排障、发行版、PATH、工具链边界。
 */
export default defineQuizSet({
  id: 'interview-env-terminal',
  title: '大厂 · 环境、终端与 PATH',
  kind: 'interview',
  domain: 'ops',
  tags: ['终端', 'PATH', 'Linux', '排障', '包管理'],
  relatedNodes: [
    'terminal-worlds',
    'installers-path',
    'linux-distros',
    'linux-cli',
    'package-managers',
    'runtime-nodejs',
    'workbench-troubleshoot',
  ],
  caption: '开口对齐：先定层（Shell/PATH/代理/依赖），再动手。',
  questions: [
    {
      id: 'interview-env-terminal:q1',
      q: '同事说「Linux 上装一下 Node」，你首先会追问什么？',
      choices: [
        {
          t: '哪一种发行版/基础镜像（Ubuntu、RHEL、Alpine…），以免包管理命令与文档对不上',
          ok: true,
          why: '发行版决定 apt/dnf/apk 等方言；「Linux」不是单一操作系统产品。',
        },
        {
          t: '是否必须先格式化硬盘',
          ok: false,
          why: '过激且通常无关。',
        },
        {
          t: 'TCP 三次握手公式怎么推导',
          ok: false,
          why: '装运行时不先抠握手推导。',
        },
        {
          t: '是否把生产密钥写进 README',
          ok: false,
          why: '安全反例；与选型发行版无关。',
        },
      ],
      relatedNodes: ['linux-distros', 'installers-path'],
    },
    {
      id: 'interview-env-terminal:q2',
      q: '本机 `node -v` 正常，CI 报 command not found，最可能的分层原因？',
      choices: [
        {
          t: 'CI 镜像未安装 Node，或 PATH/缓存步骤与本地会话不一致',
          ok: true,
          why: '本地有 ≠ 流水线有；要对齐镜像与 setup-node 一类步骤。',
        },
        {
          t: '一定是 JavaScript 语法在 CI 中被禁止',
          ok: false,
          why: '找不到命令发生在起进程之前。',
        },
        {
          t: '一定是 DNS 污染',
          ok: false,
          why: '本地命令解析不走 DNS。',
        },
        {
          t: '一定是显示器分辨率不够',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['installers-path', 'runtime-nodejs', 'craft-ci'],
    },
    {
      id: 'interview-env-terminal:q3',
      q: '为什么面试里强调「提交 lockfile」而不只提交 package.json？',
      choices: [
        {
          t: 'package.json 给范围，lockfile 钉死解析树；CI/同事才能复现同一依赖图',
          ok: true,
          why: '无锁文件时「能跑」不可移植；有锁才能谈可复现构建。',
        },
        {
          t: 'lockfile 是操作系统内核的一部分',
          ok: false,
          why: '它是包管理器生成的项目文件。',
        },
        {
          t: '有 lockfile 就可以把密钥明文写进仓库',
          ok: false,
          why: '密钥管理与锁文件正交。',
        },
        {
          t: 'lockfile 只对前端 CSS 生效',
          ok: false,
          why: 'Node/Python 等语言依赖树都适用同一思想。',
        },
      ],
      relatedNodes: ['package-managers', 'craft-ci', 'workbench-troubleshoot'],
    },
    {
      id: 'interview-env-terminal:q4',
      q: '排障口诀「先定层」：敲命令失败时，较合理的第一刀顺序？',
      choices: [
        {
          t: '拼写/是否内建 → which/where 与 PATH → 是否装上 → 权限与架构 → 再谈业务配置',
          ok: true,
          why: '先确认「程序能否被壳找到并启动」，再查 .env、代理、业务逻辑。',
        },
        {
          t: '先改业务代码里的文案颜色',
          ok: false,
          why: '命令都找不到时改 UI 无意义。',
        },
        {
          t: '先删生产数据库',
          ok: false,
          why: '危险且无关。',
        },
        {
          t: '先把所有环境变量清空',
          ok: false,
          why: '会制造更多 command not found。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'installers-path', 'terminal-worlds'],
    },
    {
      id: 'interview-env-terminal:q5',
      q: '为何说「WSL 能跑通」不等于「生产 Linux 机器一定同样表现」？',
      choices: [
        {
          t: '文件系统、网络回环、服务管理（如 systemd）、路径习惯可能不同，要以目标环境验收',
          ok: true,
          why: 'WSL 是开发便利层；生产要按真实发行版与部署方式验证。',
        },
        {
          t: 'WSL 与生产比特级强制一致，差异非法',
          ok: false,
          why: '现实中常见差异，需要显式对齐。',
        },
        {
          t: '生产禁止使用任何包管理器',
          ok: false,
          why: '生产同样用包管理或容器构建。',
        },
        {
          t: 'WSL 不能访问网络，生产才能',
          ok: false,
          why: 'WSL 通常能上网；问题不在「能不能」而在边界差异。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'linux-distros'],
    },
    {
      id: 'interview-env-terminal:q6',
      q: '国内环境 `pnpm install` / `git clone` GitHub 失败，环境侧优先查什么？',
      choices: [
        {
          t: 'HTTP(S)_PROXY / 镜像源 / NO_PROXY（localhost），以及证书与公司防火墙，而不是先怀疑 package.json 语法',
          ok: true,
          why: '出网与解析问题常被误判成「依赖写错」；先分层验证连通。',
        },
        {
          t: '删除 PATH 全部内容',
          ok: false,
          why: '命令会全部找不到。',
        },
        {
          t: '把密钥写进前端打包文件以「加快下载」',
          ok: false,
          why: '安全事故且不解决出网。',
        },
        {
          t: '关闭所有 TLS 并作为长期方案',
          ok: false,
          why: '临时诊断可讨论，长期关校验危险。',
        },
      ],
      relatedNodes: ['data-env', 'package-managers', 'clash'],
    },
  ],
});

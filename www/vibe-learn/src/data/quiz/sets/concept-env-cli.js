import { defineQuizSet } from '../schema.js';

/** 环境场景题（名词定义见 concept-env-kw） */
export default defineQuizSet({
  id: 'concept-env-cli',
  title: '概念 · 环境变量与 PATH（基础→进阶）',
  kind: 'concept',
  domain: 'craft',
  tags: ['环境变量', 'PATH', '代理', '基础', '进阶'],
  relatedNodes: ['data-env', 'runtime-nodejs'],
  caption: '路径、一次性注入、CI、PowerShell、NODE_ENV——名词见环境变量全表。',
  questions: [
    {
      id: 'concept-env-cli:q2',
      q: '在 Linux 终端查看当前环境变量列表？',
      choices: [
        {
          t: 'env 或 printenv',
          ok: true,
          why: '也可 env NAME=value cmd 在干净/定制环境跑单条命令。',
        },
        {
          t: 'npm env 一定等于完整 OS 环境转储',
          ok: false,
          why: 'npm 相关子命令看的是 npm 自身配置，不能替代 env。',
        },
        {
          t: 'git env',
          ok: false,
          why: 'Git 无此子命令列出 OS 环境块。',
        },
        {
          t: 'lsenv',
          ok: false,
          why: '不是标准工具名。',
        },
      ],
      relatedNodes: ['data-env', 'linux-cli'],
      tags: ['基础'],
    },
    {
      id: 'concept-env-cli:q3',
      q: '路径 `/home/u/proj` 与 `./src` 的关键差别？',
      choices: [
        {
          t: '前者常为绝对路径；后者相对当前工作目录',
          ok: true,
          why: '文档/脚本写相对路径是「我这边能跑」的高频原因。',
        },
        {
          t: '相对路径永远比绝对路径更安全且永不改变含义',
          ok: false,
          why: '相对路径依赖 cwd，换目录就错。',
        },
        {
          t: '绝对路径只能出现在 Windows',
          ok: false,
          why: 'Unix 以 / 开头同样是绝对路径。',
        },
        {
          t: '二者只是装饰，与文件系统无关',
          ok: false,
          why: '路径就是定位文件的方式。',
        },
      ],
      relatedNodes: ['linux-cli', 'terminal-worlds'],
      tags: ['基础'],
    },
    {
      id: 'concept-env-cli:q7',
      q: '只对「这一条命令」临时注入变量、不改当前 shell 会话？',
      choices: [
        {
          t: 'FOO=1 node app.js 或 env F',
          ok: true,
          why: '仅该子进程可见；关终端或开新会话不受影响。',
        },
        {
          t: '必须先 unset -a 清空全部变量再启动',
          ok: false,
          why: '过猛，且不是「单条注入」的含义。',
        },
        {
          t: '用 git -c 设置任意 OS 环境变量',
          ok: false,
          why: 'git -c 只改 Git 配置，不是通用环境注入。',
        },
        {
          t: 'docker unset 是标准写法',
          ok: false,
          why: '不是日常 shell 注入环境的方式。',
        },
      ],
      relatedNodes: ['data-env', 'linux-cli'],
      tags: ['进阶'],
    },
    {
      id: 'concept-env-cli:q8',
      q: 'Shell 里的 `~` 与 `HOME`（Windows 常对照 `USERPROFILE`）？',
      choices: [
        {
          t: '`~` 展开为当前用户家目录；许多点文件默认写在家目录下',
          ok: true,
          why: '先认「家目录」角色，再记各 OS 具体路径名。',
        },
        {
          t: '`~` 永远等于磁盘根目录 `/`',
          ok: false,
          why: '根是 `/`；家目录是用户私有空间。',
        },
        {
          t: '只有 root 才有家目录',
          ok: false,
          why: '普通用户也有。',
        },
        {
          t: '`HOME` 必须与 PATH 设成同一个值',
          ok: false,
          why: '语义不同：一个是家，一个是命令搜索路径。',
        },
      ],
      relatedNodes: ['data-env', 'fs-layout'],
      tags: ['基础'],
    },
    {
      id: 'concept-env-cli:q9',
      q: 'CI 里放模型 API Key，较稳妥？',
      choices: [
        {
          t: 'CI Secrets / 密文变量注入环境',
          ok: true,
          why: '与本地 .env 同一原则：密钥不进 Git。',
        },
        {
          t: '写进 README 方便复制',
          ok: false,
          why: '文档传播面大，必泄漏。',
        },
        {
          t: '写进前端打包后的 JS',
          ok: false,
          why: '浏览器可见。',
        },
        {
          t: '用 commit message 传递',
          ok: false,
          why: '进历史且难轮换。',
        },
      ],
      relatedNodes: ['data-env', 'craft-ci', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-env-cli:q10',
      q: 'Windows PowerShell 当前会话临时设代理变量？',
      choices: [
        {
          t: '$env:HTTPS_PROXY="http://127.0.0.1:7890"',
          ok: true,
          why: '会话级；调试代理用这个。持久化另说（用户环境/系统设置）。',
        },
        {
          t: '在纯 PowerShell 里只能写 export HTTPS_PROXY=…',
          ok: false,
          why: 'export 是 Bash；PowerShell 用 $env:。',
        },
        {
          t: 'git config --global http.proxy 能替代一切 Node fetch 代理',
          ok: false,
          why: '只影响 Git；Node 仍看环境变量或自身代理配置。',
        },
        {
          t: '每次临时调试都必须用 setx 写用户持久变量',
          ok: false,
          why: 'setx 持久化；会话级 $env: 更适合试代理。',
        },
      ],
      relatedNodes: ['data-env', 'lang-powershell'],
      tags: ['进阶'],
    },
    {
      id: 'concept-env-cli:q11',
      q: 'NODE_ENV=production 的常见工程含义？',
      choices: [
        {
          t: '框架/工具按生产模式优化或关掉开发中间件',
          ok: true,
          why: '约定开关，不是魔法：不会自动给你无限 API 额度。',
        },
        {
          t: '设置后自动获得无限云 API 额度',
          ok: false,
          why: '与计费无关。',
        },
        {
          t: '等于关闭所有安全校验',
          ok: false,
          why: '生产更应加强校验与鉴权。',
        },
        {
          t: 'NODE_ENV 只能是整数',
          ok: false,
          why: '字符串约定，如 production / development。',
        },
      ],
      relatedNodes: ['data-env', 'runtime-nodejs'],
      tags: ['进阶'],
    },
    {
      id: 'concept-env-cli:q12',
      q: 'dotenv 类库加载 .env 时，更稳妥的习惯？',
      choices: [
        {
          t: '仅非生产或明确场景加载；真实密钥勿提交；已存在的环境变量通常不覆盖',
          ok: true,
          why: '生产常由编排/面板注入，避免本地文件盖掉线上配置。',
        },
        {
          t: '生产必须把含真密钥的 .env 提交进 Git',
          ok: false,
          why: '泄漏事故。',
        },
        {
          t: '有 dotenv 就不需要再读 process.env',
          ok: false,
          why: '加载后最终仍落在 process.env。',
        },
        {
          t: 'dotenv 可以替代 TLS',
          ok: false,
          why: '只注入环境变量，不做传输加密。',
        },
      ],
      relatedNodes: ['data-env', 'craft-security'],
      tags: ['进阶'],
    },
  ],
});

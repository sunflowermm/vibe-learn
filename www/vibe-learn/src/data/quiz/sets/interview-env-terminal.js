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
    'package-managers',
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
          t: "要先确认 Linux 内核小版本号与 TCP 拥塞控制算法，否则 Node 官方包无法正确解压安装",
          ok: false,
          why: '装 Node 先对齐发行版/包管理方言，不是抠网络协议细节。',
        },
        {
          t: "要先问是否已在 README 明文写入生产数据库连接串，方便装完 Node 后立刻本地连库调试",
          ok: false,
          why: '密钥不进 README；与装运行时无关。',
        },
        {
          t: "要先确认是否已清空用户目录下全部旧 PATH 条目，否则新装 Node 无法覆盖旧的命令查找路径",
          ok: false,
          why: '过激；发行版选型才是第一问。',
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
          t: 'CI 与本地用了不同的 Node 主版本，语法在一边能跑、另一边被引擎拒绝',
          ok: false,
          why: '找不到命令发生在起进程之前；版本不匹配通常是跑起来后的报错。',
        },
        {
          t: 'package.json 的 scripts 字段写错了脚本名，所以 CI 报 command not found',
          ok: false,
          why: '`node -v` 本身找不到时，问题在镜像/PATH，不是业务脚本名。',
        },
        {
          t: 'CI 工作目录不在仓库根，相对路径脚本找不到，被误报成 node 命令不存在',
          ok: false,
          why: 'node 可执行文件找不到是 PATH/安装问题；cwd 问题通常是脚本路径报错。',
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
          t: "lockfile 由操作系统在 apt install 时自动生成，与 npm/pnpm 的依赖解析与安装完全无关",
          ok: false,
          why: '锁文件是包管理器根据 package.json 解析生成的。',
        },
        {
          t: "提交 lockfile 后就可以把 API 密钥明文写进仓库，团队通过锁文件安全共享与复现环境",
          ok: false,
          why: '密钥与锁文件正交；密钥应走 Secrets。',
        },
        {
          t: "lockfile 只对 CSS 与前端静态资源生效，Node 后端依赖树不需要也不应该提交到 Git",
          ok: false,
          why: 'Node/Python 等 lockfile 都用于钉死依赖图。',
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
          t: "先把业务代码里的 UI 文案与按钮颜色改对，再回头读终端 command not found 报错信息",
          ok: false,
          why: '命令都找不到时改 UI 无意义；应先定 Shell/PATH 层。',
        },
        {
          t: "先把生产数据库整库删除并重建，用「干净数据环境」排除命令找不到的干扰因素",
          ok: false,
          why: '危险且与「能否找到可执行文件」无关。',
        },
        {
          t: "先把 PATH 与其它环境变量全部 unset 清空，用「零配置 Shell 会话」排除变量污染干扰",
          ok: false,
          why: '清空 PATH 会让更多命令找不到。',
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
          t: "WSL 与生产 Linux 必须文件系统、网络栈与服务管理完全一致，否则本地开发结果一律无效",
          ok: false,
          why: '有差异正常；要在目标环境验收而非要求比特一致。',
        },
        {
          t: "生产环境禁止 apt/yum 等包管理器，只能手工 scp 二进制，WSL 上的安装经验因此无法迁移",
          ok: false,
          why: '生产同样常用包管理或容器构建。',
        },
        {
          t: "WSL 默认不能访问外网安装依赖，只有生产机器可以 git clone，两者表现因此必然不同",
          ok: false,
          why: 'WSL 通常能出网；差异在边界而非「能不能上网」。',
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
          t: "遇到 clone 或 install 失败时，应先怀疑 package.json 语法错误并重写依赖范围，而不是先查代理与镜像",
          ok: false,
          why: '出网失败常被误判成依赖写错；应先查代理/镜像/证书。',
        },
        {
          t: "把 GitHub Personal Access Token 与 npm 镜像密钥明文写进前端打包后的 JS 静态资源，作为加快 git clone 与 pnpm install 出网访问的长期默认加速方案",
          ok: false,
          why: '密钥泄露且不解决代理/防火墙；应配 HTTP_PROXY 与镜像。',
        },
        {
          t: "在公司代理网络里永久关闭 git sslVerify、Node TLS 证书校验与 pnpm 严格模式，作为加快 GitHub clone 与 install 的默认安全配置",
          ok: false,
          why: '关 TLS 是危险权宜；长期应修代理/证书/NO_PROXY。',
        },
      ],
      relatedNodes: ['data-env', 'package-managers', 'clash'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

/** 零基础：网络 / Git / 环境——应用向入门；容器见 docker 专套 */
export default defineQuizSet({
  id: 'concept-zero-web-git',
  title: '零基础 · 上网、Git 与环境变量',
  kind: 'concept',
  domain: 'craft',
  tags: ['零基础', 'Git', 'HTTP', '环境变量'],
  relatedNodes: ['http-web', 'git-workspace', 'data-env'],
  caption: '浏览器链路、Git 存档、密钥不进仓——入门地图。',
  questions: [
    {
      id: 'concept-zero-web-git:q1',
      q: '打开 https://example.com 时，浏览器大致在做什么？',
      choices: [
        {
          t: '经 DNS 找 IP，建立安全连接，再用 HTTP 要页面/数据',
          ok: true,
          why: '后面网课会展开；先有整条链路。',
        },
        {
          t: '只在本机打开离线 Office 文档，不经过域名解析与远端请求',
          ok: false,
          why: '网页通常来自远端服务器，不是本地 Office 文件。',
        },
        {
          t: 'HTTPS 表示连接一定不安全，所以浏览器会跳过证书校验',
          ok: false,
          why: 'S 表示 TLS 加密传输，比明文 HTTP 更安全。',
        },
        {
          t: '页面全部预置在浏览器安装包里，打开网址时不必访问任何服务器',
          ok: false,
          why: '浏览器要向服务器要内容；本地 file:// 是特例。',
        },
      ],
      relatedNodes: ['http-web', 'dns-https'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q2',
      q: '前端页面要向本机 :3000 的后端「要一份用户列表 JSON」，这种约定通常叫什么？',
      choices: [
        {
          t: 'API：程序与程序约定好的怎么问、怎么答（常见 HTTP+JSON）',
          ok: true,
          why: '前端、后端、LLM 服务都靠 API 协作。',
        },
        {
          t: '等于数据库引擎本身：调用它就是直接改表结构与索引',
          ok: false,
          why: 'API 常访问库，但库是存储，API 是访问面。',
        },
        {
          t: '只能写成给人读的 PDF 说明书，程序端无法解析或调用',
          ok: false,
          why: 'API 主要给程序调用，文档只是给人看的说明书。',
        },
        {
          t: 'Git 分支命名规范：列表接口必须用 feature/api-* 前缀',
          ok: false,
          why: '分支命名与 HTTP API 契约不是同一层。',
        },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q3',
      q: '为什么学编程几乎一定要碰 Git？',
      choices: [
        {
          t: '记录历史、协作分支、回滚试错——不是可选项',
          ok: true,
          why: 'AI 改代码更需要可审查的 diff。',
        },
        {
          t: 'Git 主要用来高速下载影视资源，与写代码无关',
          ok: false,
          why: 'Git 是版本控制，不是下载站。',
        },
        {
          t: '有了网盘同步文件夹，就不必再要提交级版本历史',
          ok: false,
          why: '云盘≠提交级历史、分支与可审 diff。',
        },
        {
          t: '装上 Git 就会自动生成业务逻辑，人不用再写代码',
          ok: false,
          why: 'Git 只记录改动，不替你写业务。',
        },
      ],
      relatedNodes: ['git-workspace', 'git-advanced'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q4',
      q: '改完几处代码，想留下「可回看的存档点」并写清为什么改，应做什么？',
      choices: [
        {
          t: 'git add 相关文件后 git commit，message 写 why',
          ok: true,
          why: 'commit 是本地存档点；再 push 才进远程。',
        },
        {
          t: '直接 git push，跳过 commit，远程会自动生成存档说明',
          ok: false,
          why: '没有本地提交就无可推的新历史。',
        },
        {
          t: '只保存编辑器文件，等于已经 commit，无需 Git 命令',
          ok: false,
          why: '保存只写磁盘；版本历史要 add/commit。',
        },
        {
          t: '删除 .git 再 init，历史会自动从编辑器本地缓存恢复',
          ok: false,
          why: '毁掉仓库元数据；不能当存档手段。',
        },
      ],
      relatedNodes: ['git-advanced', 'git-workspace'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q5',
      q: '环境变量（如 API Key）为什么不要写进代码仓库？',
      choices: [
        {
          t: '进 Git 历史就难收回；应放环境/.env（勿提交）或 CI Secrets',
          ok: true,
          why: '安全底线；后面 env-cli 会练命令。',
        },
        {
          t: '写进仓库最方便协作，明文提交密钥是团队推荐默认做法',
          ok: false,
          why: '方便换来的是永久泄漏风险。',
        },
        {
          t: '只要仓库设为私有，密钥进历史也绝对不会经由任何渠道外泄',
          ok: false,
          why: '误分享、离职、CI 日志都可能外泄。',
        },
        {
          t: '环境变量只能存图片二进制，不能存 API Key 这类字符串密钥',
          ok: false,
          why: '一般是字符串配置与密钥。',
        },
      ],
      relatedNodes: ['data-env', 'craft-security'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q6',
      q: '浏览器访问 http://127.0.0.1:3000 时，127.0.0.1 表示？',
      choices: [
        {
          t: '本机自己——本地开发服务常绑在这里',
          ok: true,
          why: '回环地址；本机 Node 服务常用。',
        },
        {
          t: '一定指向某台固定的国外公网服务器地址',
          ok: false,
          why: '这是回环地址，指本机而非公网主机。',
        },
        {
          t: '等于拔掉网线，本机任何服务都无法再互通',
          ok: false,
          why: '本机服务仍可互通，与是否上网无关。',
        },
        {
          t: '只能用于打印机发现，不能绑定 HTTP 服务',
          ok: false,
          why: '用于本机网络服务，不是打印机协议。',
        },
      ],
      relatedNodes: ['ip-addressing', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q7',
      q: '同一台电脑上，:3000 与 :5432 同时被不同进程监听，端口号在说什么？',
      choices: [
        {
          t: '同一台机器上区分不同服务进程的「门牌号」',
          ok: true,
          why: 'IP 找主机，端口找进程。',
        },
        {
          t: '显示器的刷新率（Hz），与网络传输无关',
          ok: false,
          why: '刷新率是 Hz，与 TCP/UDP 端口无关。',
        },
        {
          t: 'Git 仓库里的分支名称，用来区分功能线',
          ok: false,
          why: '分支是 Git 概念，端口是网络概念。',
        },
        {
          t: '合法端口只能是 80，其它数字一律非法',
          ok: false,
          why: '可有很多端口；80/443 只是常见 Web 口。',
        },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q8',
      q: '后端 API 返回一段可读的键值文本给前端解析，最常见的格式是？',
      choices: [
        {
          t: 'JSON：文本数据格式，键值清晰，API 里极常见',
          ok: true,
          why: '稍后学 parse/stringify。',
        },
        {
          t: '一种关系型数据库引擎品牌，类似 MySQL',
          ok: false,
          why: 'JSON 是格式，不是 MySQL 这类引擎。',
        },
        {
          t: '只能封装视频码流，不能描述对象与数组',
          ok: false,
          why: '文本结构，常存对象与数组。',
        },
        {
          t: '浏览器运行时无法解析 JSON，只能靠后端处理',
          ok: false,
          why: '前端天天用 JSON.parse / fetch。',
        },
      ],
      relatedNodes: ['data-json', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:staged-env',
      q: 'git status 里看到 .env 出现在「Changes to be committed」，下一步最稳妥？',
      choices: [
        {
          t: '立刻从暂存区撤出（如 restore --staged），确认已在 .gitignore，密钥走环境/Secrets',
          ok: true,
          why: '未 push 前还能止损；已进历史要轮换密钥。',
        },
        {
          t: '马上 commit 并 push 到 origin，方便同事 clone 后直接共享同一把 API Key',
          ok: false,
          why: '密钥进仓即泄漏面；应撤出并忽略。',
        },
        {
          t: '改名为 .env.bak 再提交：Git 看见 bak 后缀就不会当敏感文件处理',
          ok: false,
          why: '换名仍是明文密钥进历史。',
        },
        {
          t: '对 main 做 force push 覆盖远程，本地暂存区里的 .env 就会自动消失',
          ok: false,
          why: '强推解决不了本地暂存；还可能毁掉他人工作。',
        },
      ],
      relatedNodes: ['git-workspace', 'data-env', 'craft-security'],
      tags: ['零基础', '应用'],
    },
    {
      id: 'concept-zero-web-git:q10',
      q: '你本地能跑通小脚本了，但一换机器就「找不到命令 / 密钥乱飞」。接下来哪组练习最贴这个坑？',
      choices: [
        {
          t: '练 Git 工作区与远程、Linux/环境指令，并把密钥放进 .env（勿进仓库）',
          ok: true,
          why: '环境与密钥是换机必踩坑。',
        },
        {
          t: '把生产环境密钥贴到公开聊天群，让同事复制粘贴到各自机器里继续沿用',
          ok: false,
          why: '泄密且无法审计轮换。',
        },
        {
          t: '跳过工具链与环境配置，直接把「微调大模型权重」当作换机问题的下一步练习',
          ok: false,
          why: '未解决 PATH/密钥，换机仍挂。',
        },
        {
          t: '删掉所有报错与日志输出源，只要界面看起来清爽就算已经把环境问题练过关',
          ok: false,
          why: '掩盖排障信号，不解决环境不一致。',
        },
      ],
      relatedNodes: ['git-workspace', 'installers-path', 'data-env'],
      tags: ['零基础'],
    },
  ],
});

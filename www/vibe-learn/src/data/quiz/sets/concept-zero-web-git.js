import { defineQuizSet } from '../schema.js';

/** 零基础：网络 / Git / 环境——干扰项与正解同密度（mcq-expert：消三短一长，不砍正解） */
export default defineQuizSet({
  id: 'concept-zero-web-git',
  title: '零基础 · 上网、Git 与环境变量',
  kind: 'concept',
  domain: 'craft',
  tags: ['零基础', 'Git', 'HTTP', '环境变量'],
  relatedNodes: ['http-web', 'git-workspace', 'data-env'],
  caption: '浏览器背后在干什么、为什么要 Git、密钥放哪——入门地图。',
  questions: [
    {
      id: 'concept-zero-web-git:q1',
      q: '打开 https://example.com 时，浏览器大致在做什么？',
      choices: [
        { t: '经 DNS 找 IP，建立安全连接，再用 HTTP 要页面/数据', ok: true, why: '后面网课会展开；先有整条链路。' },
        { t: '只在本机打开离线 Office 文档，不经过域名解析与远端请求', ok: false, why: '网页通常来自远端服务器，不是本地 Office 文件。' },
        { t: 'HTTPS 表示连接一定不安全，所以浏览器会跳过证书校验', ok: false, why: 'S 表示 TLS 加密传输，比明文 HTTP 更安全。' },
        { t: '页面全部预置在浏览器内核里，永远不需要访问任何服务器', ok: false, why: '浏览器要向服务器要内容；本地 file:// 是特例。' },
      ],
      relatedNodes: ['http-web', 'dns-https'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q2',
      q: 'API 对零基础最顺口的解释？',
      choices: [
        { t: '程序与程序约定好的「怎么问、怎么答」（常见是 HTTP+JSON）', ok: true, why: '前端、后端、LLM 服务都靠 API 协作。' },
        { t: '等于数据库引擎本身：调用 API 就是直接改表结构与索引', ok: false, why: 'API 常访问库，但库是存储，API 是访问面。' },
        { t: '只能写成给人读的 PDF 说明书，程序端无法解析或调用', ok: false, why: 'API 主要给程序调用，文档只是给人看的说明书。' },
        { t: '一种电源插头的物理型号标准，用来规范硬件接口尺寸', ok: false, why: '那是硬件接口；软件 API 是调用约定。' },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q3',
      q: '为什么学编程几乎一定要碰 Git？',
      choices: [
        { t: '记录历史、协作分支、回滚试错——不是可选项', ok: true, why: 'AI 改代码更需要可审查的 diff。' },
        { t: 'Git 主要用来高速下载影视资源，与写代码无关', ok: false, why: 'Git 是版本控制，不是下载站。' },
        { t: '有了网盘同步文件夹，就不必再要提交级版本历史', ok: false, why: '云盘≠提交级历史、分支与可审 diff。' },
        { t: '装上 Git 就会自动生成业务逻辑，人不用再写代码', ok: false, why: 'Git 只记录改动，不替你写业务。' },
      ],
      relatedNodes: ['git-workspace', 'git-advanced'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q4',
      q: 'commit 对零基础的直觉？',
      choices: [
        { t: '给当前改动拍一张「可回看的存档点」，并写清为什么改', ok: true, why: '先 add 再 commit；message 写 why。' },
        { t: 'commit 等于立刻部署上线，全世界用户马上看到改动', ok: false, why: '还要 push 与部署，commit 只进本地历史。' },
        { t: '每次 commit 都会清空仓库历史，只保留最新一版', ok: false, why: '恰恰是保留历史的存档点。' },
        { t: '团队约定每人每天最多只能 commit 一次，多了无效', ok: false, why: '按逻辑小步提交更好，没有次数上限。' },
      ],
      relatedNodes: ['git-advanced', 'git-workspace'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q5',
      q: '环境变量（如 API Key）为什么不要写进代码仓库？',
      choices: [
        { t: '进 Git 历史就难收回；应放环境/.env（勿提交）或 CI Secrets', ok: true, why: '安全底线；后面 env-cli 会练命令。' },
        { t: '写进仓库最方便协作，明文提交密钥是团队推荐默认做法', ok: false, why: '方便换来的是永久泄漏风险。' },
        { t: '只要仓库设为私有，密钥进历史也绝对不会经由任何渠道外泄', ok: false, why: '误分享、离职、CI 日志都可能外泄。' },
        { t: '环境变量只能存图片二进制，不能存 API Key 这类字符串密钥', ok: false, why: '一般是字符串配置与密钥。' },
      ],
      relatedNodes: ['data-env', 'craft-security'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q6',
      q: 'localhost / 127.0.0.1 表示？',
      choices: [
        { t: '本机自己——本地开发服务常绑在这里', ok: true, why: '浏览器访问本机 Node 常用。' },
        { t: '一定指向某台固定的国外公网服务器地址', ok: false, why: '这是回环地址，永远指本机。' },
        { t: '等于拔掉网线，本机任何服务都无法再互通', ok: false, why: '本机服务仍可互通，与是否上网无关。' },
        { t: '只能用于打印机发现，不能绑定 HTTP 服务', ok: false, why: '用于本机网络服务，不是打印机协议。' },
      ],
      relatedNodes: ['ip-addressing', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q7',
      q: '端口号（如 :3000）在说什么？',
      choices: [
        { t: '同一台机器上区分不同服务进程的「门牌号」', ok: true, why: 'IP 找主机，端口找进程。' },
        { t: '显示器的刷新率（Hz），与网络传输无关', ok: false, why: '刷新率是 Hz，与 TCP/UDP 端口无关。' },
        { t: 'Git 仓库里的分支名称，用来区分功能线', ok: false, why: '分支是 Git 概念，端口是网络概念。' },
        { t: '合法端口只能是 80，其它数字一律非法', ok: false, why: '可有很多端口；80/443 只是常见 Web 口。' },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q8',
      q: 'JSON 对零基础？',
      choices: [
        { t: '一种文本数据格式，键值清晰，API 里极常见', ok: true, why: '稍后学 parse/stringify。' },
        { t: '一种关系型数据库引擎品牌，类似 MySQL', ok: false, why: 'JSON 是格式，不是 MySQL 这类引擎。' },
        { t: '只能封装视频码流，不能描述对象与数组', ok: false, why: '文本结构，常存对象与数组。' },
        { t: '浏览器运行时无法解析 JSON，只能靠后端处理', ok: false, why: '前端天天用 JSON.parse / fetch。' },
      ],
      relatedNodes: ['data-json', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q9',
      q: 'Docker 对零基础一句话？',
      choices: [
        { t: '把应用和依赖打包成可重复运行的容器，减少「我机器能跑」', ok: true, why: '后面 docker-cli 练命令。' },
        { t: '一种水产养殖管理系统，与软件交付无关', ok: false, why: '谐音梗不是定义。' },
        { t: '可以完全替代 Git，同时管版本历史与运行环境', ok: false, why: '容器管运行环境，Git 管版本历史。' },
        { t: '只能在手机 App 里运行，服务器场景并不支持', ok: false, why: '服务器与开发机更常见。' },
      ],
      relatedNodes: ['ops-docker', 'ops-container'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q10',
      q: '你本地能跑通小脚本了，但一换机器就「找不到命令 / 密钥乱飞」。接下来哪组练习最贴这个坑？',
      choices: [
        { t: '练 Git 工作区与远程、Linux/环境指令，并把密钥放进 .env（勿进仓库）', ok: true, why: '环境与密钥是换机必踩坑。' },
        { t: '把生产环境密钥贴到公开聊天群，让同事复制粘贴到各自机器里继续沿用', ok: false, why: '泄密且无法审计轮换。' },
        { t: '跳过工具链与环境配置，直接把「微调大模型权重」当作换机问题的下一步练习', ok: false, why: '未解决 PATH/密钥，换机仍挂。' },
        { t: '删掉所有报错与日志输出源，只要界面看起来清爽就算已经把环境问题练过关', ok: false, why: '掩盖排障信号，不解决环境不一致。' },
      ],
      relatedNodes: ['git-workspace', 'installers-path', 'data-env'],
      tags: ['零基础'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

/** 零基础：网络 / Git / 环境——和后面指令模块衔接 */
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
        { t: '只是本地打开一个 Word 文档', ok: false, why: '网页通常来自远端服务器，不是本地 Office 文件。' },
        { t: '不需要任何服务器', ok: false, why: '浏览器要向服务器要内容；本地 file:// 是特例。' },
        { t: 'HTTPS 表示一定不安全', ok: false, why: 'S 表示 TLS 加密传输，比明文 HTTP 更安全。' },
      ],
      relatedNodes: ['http-web', 'dns-https'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q2',
      q: 'API 对零基础最顺口的解释？',
      choices: [
        { t: '程序与程序约定好的「怎么问、怎么答」（常见是 HTTP+JSON）', ok: true, why: '前端、后端、LLM 服务都靠 API 协作。' },
        { t: '一种电源插头型号', ok: false, why: '那是硬件接口；软件 API 是调用约定。' },
        { t: '只能给人类阅读的说明书 PDF', ok: false, why: 'API 主要给程序调用，文档只是给人看的说明书。' },
        { t: '等于数据库本身', ok: false, why: 'API 常访问库，但库是存储，API 是访问面。' },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q3',
      q: '为什么学编程几乎一定要碰 Git？',
      choices: [
        { t: '记录历史、协作分支、回滚试错——不是可选项', ok: true, why: 'AI 改代码更需要可审查的 diff。' },
        { t: 'Git 只用来下载电影', ok: false, why: 'Git 是版本控制，不是下载站。' },
        { t: '有了云盘就不需要版本历史', ok: false, why: '云盘≠提交级历史、分支与可审 diff。' },
        { t: 'Git 会自动写业务逻辑', ok: false, why: 'Git 只记录改动，不替你写业务。' },
      ],
      relatedNodes: ['git-workspace', 'git-advanced'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q4',
      q: 'commit 对零基础的直觉？',
      choices: [
        { t: '给当前改动拍一张「可回看的存档点」，并写清为什么改', ok: true, why: '先 add 再 commit；message 写 why。' },
        { t: 'commit 等于立刻上线给全世界用户', ok: false, why: '还要 push 与部署，commit 只进本地历史。' },
        { t: 'commit 会删除所有历史', ok: false, why: '恰恰是保留历史的存档点。' },
        { t: '只能每天 commit 一次', ok: false, why: '按逻辑小步提交更好，没有次数上限。' },
      ],
      relatedNodes: ['git-advanced', 'git-workspace'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q5',
      q: '环境变量（如 API Key）为什么不要写进代码仓库？',
      choices: [
        { t: '进 Git 历史就难收回；应放环境/.env（勿提交）或 CI Secrets', ok: true, why: '安全底线；后面 env-cli 会练命令。' },
        { t: '写进仓库更方便所以推荐', ok: false, why: '方便换来的是永久泄漏风险。' },
        { t: '私有仓绝对不会泄漏', ok: false, why: '误分享、离职、CI 日志都可能外泄。' },
        { t: '环境变量只能存图片', ok: false, why: '一般是字符串配置与密钥。' },
      ],
      relatedNodes: ['data-env', 'craft-security'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q6',
      q: 'localhost / 127.0.0.1 表示？',
      choices: [
        { t: '本机自己——本地开发服务常绑在这里', ok: true, why: '浏览器访问本机 Node 常用。' },
        { t: '一定是某台国外服务器', ok: false, why: '这是回环地址，永远指本机。' },
        { t: '等于断开网线', ok: false, why: '本机服务仍可互通，与是否上网无关。' },
        { t: '只能用于打印', ok: false, why: '用于本机网络服务，不是打印机协议。' },
      ],
      relatedNodes: ['ip-addressing', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q7',
      q: '端口号（如 :3000）在说什么？',
      choices: [
        { t: '同一台机器上区分不同服务进程的「门牌号」', ok: true, why: 'IP 找主机，端口找进程。' },
        { t: '显示器刷新率', ok: false, why: '刷新率是 Hz，与 TCP/UDP 端口无关。' },
        { t: 'Git 分支名', ok: false, why: '分支是 Git 概念，端口是网络概念。' },
        { t: '只能是 80，其它非法', ok: false, why: '可有很多端口；80/443 只是常见 Web 口。' },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q8',
      q: 'JSON 对零基础？',
      choices: [
        { t: '一种文本数据格式，键值清晰，API 里极常见', ok: true, why: '稍后学 parse/stringify。' },
        { t: '一种数据库引擎品牌', ok: false, why: 'JSON 是格式，不是 MySQL 这类引擎。' },
        { t: '只能存视频', ok: false, why: '文本结构，常存对象与数组。' },
        { t: '浏览器看不懂 JSON', ok: false, why: '前端天天用 JSON.parse / fetch。' },
      ],
      relatedNodes: ['data-json', 'http-web'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q9',
      q: 'Docker 对零基础一句话？',
      choices: [
        { t: '把应用和依赖打包成可重复运行的容器，减少「我机器能跑」', ok: true, why: '后面 docker-cli 练命令。' },
        { t: '一种鱼类养殖系统', ok: false, why: '谐音梗不是定义。' },
        { t: '替代 Git', ok: false, why: '容器管运行环境，Git 管版本历史。' },
        { t: '只能在手机上运行', ok: false, why: '服务器与开发机更常见。' },
      ],
      relatedNodes: ['ops-docker', 'ops-container'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-web-git:q10',
      q: '学完本套零基础后，下一步最贴本站地图的是？',
      choices: [
        { t: '练 Git/Linux/环境指令模块，同时跑通第一个 Node 小程序', ok: true, why: '知行合一；再进 XRK 放码与 HTTP。' },
        { t: '直接微调大模型权重', ok: false, why: '跳过基础工具链；先把指令与本地跑通。' },
        { t: '删除所有报错信息来源', ok: false, why: '报错是排障线索，应读懂而不是删掉。' },
        { t: '把生产密钥发到公开群', ok: false, why: '直接制造安全事故。' },
      ],
      relatedNodes: ['git-workspace', 'linux-cli', 'data-env'],
      tags: ['零基础'],
    },
  ],
});

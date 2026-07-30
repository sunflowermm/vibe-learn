import { defineQuizSet } from '../schema.js';

/** XRK ↔ 其它板块桥接：Git / HTTP / Docker / Linux / 环境 */
export default defineQuizSet({
  id: 'concept-xrk-bridge',
  title: '概念 · XRK 与全栈基础桥接',
  kind: 'concept',
  domain: 'xrk',
  tags: ['桥接', 'Git', 'HTTP', 'Docker', '环境', '进阶'],
  relatedNodes: ['xrk-biz-map', 'xrk-http-www', 'xrk-deploy-env'],
  caption: '把 XRK 放码接到 Git/HTTP/容器/环境——同一套工程肌肉。',
  questions: [
    {
      id: 'concept-xrk-bridge:q1',
      q: '往 core/*/plugin 加功能后，工程上仍应走哪套 Git 习惯？',
      choices: [
        { t: '分支隔离 → 本地跑通 → PR 说明 why → CI 绿再合', ok: true, why: 'Loader 能加载 ≠ 可以跳过协作与审查。' },
        { t: '直接在生产机改文件不提交', ok: false, why: '无审计。' },
        { t: 'commit message 只写 update', ok: false, why: '应写 why。' },
        { t: 'XRK 仓库禁止使用分支', ok: false, why: '否。' },
      ],
      relatedNodes: ['git-advanced', 'xrk-plugin-arch', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q2',
      q: 'Core HTTP 联调失败时，分层排查顺序更接近？',
      choices: [
        { t: '进程是否起来 → 端口/反代 → 鉴权与路径 → 再看 HttpResponse 解包', ok: true, why: '网络+工程排障，再业务。' },
        { t: '先微调基座模型', ok: false, why: 'HTTP 都没通。' },
        { t: '先删远程 Git 历史', ok: false, why: '无关。' },
        { t: '只改前端颜色', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-lab-http', 'workbench-troubleshoot', 'net-nginx'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q3',
      q: '前端解包本仓 success 响应时，和「标准 {data}」教程冲突怎么办？',
      choices: [
        { t: '遵守本仓：普通对象拍平到顶层；用 unwrapSuccess 或读顶层字段', ok: true, why: '与 http-hands / www-compat 一致。' },
        { t: '强制后端改成只返回 data，忽略框架约定', ok: false, why: '应统一约定。' },
        { t: '可以混用裸 res.json 和 HttpResponse', ok: false, why: '形状分裂。' },
        { t: 'success 响应没有 message', ok: false, why: '始终有。' },
      ],
      relatedNodes: ['xrk-http-www', 'http-hands-on'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-xrk-bridge:q4',
      q: '本地用 Docker 起 Redis/PG 给 XRK 用时，配置侧常接什么？',
      choices: [
        { t: '连接串进环境变量或产品配置；容器端口映射与 compose 服务名分清', ok: true, why: 'docker-cli + data-env + xrk-database。' },
        { t: '把容器 root 密码写进前端', ok: false, why: '否。' },
        { t: '有 Docker 就不必备份', ok: false, why: '仍要备份。' },
        { t: '服务名在宿主机永远可解析', ok: false, why: 'compose 网络内外不同。' },
      ],
      relatedNodes: ['ops-compose', 'xrk-database', 'data-env'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q5',
      q: '部署 XRK 到面板/主机时，Linux 侧仍要会？',
      choices: [
        { t: 'systemd/进程守护、端口、日志、权限与反代——面板不能代替理解', ok: true, why: 'linux-cli + nginx-ops + panel。' },
        { t: '只会点按钮即可忽略端口占用', ok: false, why: '仍会踩。' },
        { t: '禁止看 journalctl/logs', ok: false, why: '排障要看。' },
        { t: '主机命令应从主服 stdin 转发到子服', ok: false, why: '子服有自己的终端约定。' },
      ],
      relatedNodes: ['xrk-deploy-env', 'host-systemd', 'panel-run-node'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q6',
      q: '拉 GitHub 依赖或模型 API 出网失败，与 XRK 配置的关系？',
      choices: [
        { t: '先查代理环境变量（HTTP_PROXY 等）与 NO_PROXY；再查业务 yaml', ok: true, why: '环境层优先；env-cli 技能直接复用。' },
        { t: '一定是 Loader 坏了，先重写 src/', ok: false, why: '越界且常不对症。' },
        { t: '关掉 TLS 校验当长期方案', ok: false, why: '危险。' },
        { t: '删除 PATH 试试', ok: false, why: '更糟。' },
      ],
      relatedNodes: ['data-env', 'clash', 'xrk-first-run'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q7',
      q: '独立产品配置三同步时，.env 扮演什么角色？',
      choices: [
        { t: '偏密钥与环境注入；不能吞掉 default/schema/代码里的全部业务配置', ok: true, why: '配置归属课 + env 课合读。' },
        { t: '.env 可以替代全部 yaml 与 schema', ok: false, why: '否。' },
        { t: '生产密钥应写入 default_config 提交', ok: false, why: '禁止。' },
        { t: '三同步只针对前端文案', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-config', 'data-env', 'xrk-lab-config'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q8',
      q: 'www 静态页要调本仓 HTTP 时，浏览器侧还缺哪块网络知识？',
      choices: [
        { t: '同源/CORS、Cookie/Token、HTTPS 混合内容——不只是会写 fetch', ok: true, why: 'http-hands 与 xrk-http-www 交界。' },
        { t: '浏览器会自动执行服务器磁盘 SQL', ok: false, why: '无此机制。' },
        { t: '静态页禁止发 HTTP', ok: false, why: '可以。' },
        { t: 'CORS 只存在于 Git', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-http-www', 'http-web', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q9',
      q: '用 Agent 改 Core 时，Git + Vibe 的组合底线？',
      choices: [
        { t: '小步提交、审 diff、守 core/ 边界；越界改 Runtime 要有框架身份', ok: true, why: 'adev + git-cli + xrk-core。' },
        { t: '一次 Accept 上千文件并 force push main', ok: false, why: '灾难。' },
        { t: '不跑本地验收，只信模型自称通过', ok: false, why: '否。' },
        { t: '娱乐插件必须加进 system-Core 白名单', ok: false, why: '默认不提交。' },
      ],
      relatedNodes: ['adev-vibe-coding', 'git-advanced', 'xrk-core-layout'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-bridge:q10',
      q: '排查「插件没反应」时，跨板块 checklist？',
      choices: [
        { t: '文件是否在约定目录、进程是否加载、日志有无报错、事件/命令是否匹配、配置是否读到', ok: true, why: 'Linux 日志 + 读报错 + XRK Loader 约定。' },
        { t: '只换 IDE 主题', ok: false, why: '否。' },
        { t: '直接格式化磁盘', ok: false, why: '否。' },
        { t: '删掉全部测试以加速', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-lab-plugin', 'code-read-errors', 'workbench-troubleshoot'],
      tags: ['基础', '进阶'],
    },
  ],
});

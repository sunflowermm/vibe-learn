import { defineQuizSet } from '../schema.js';

/** Bloom 3 · 应用：运维场景「你怎么做」 */
export default defineQuizSet({
  id: 'concept-ops-scenarios',
  title: '场景 · 运维落地决策',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '场景', '应用'],
  relatedNodes: [
    'installers-path',
    'ops-docker',
    'clash',
    'host-systemd',
    'panel-run-node',
  ],
  caption: 'PATH、代理、面板、守护、磁盘——给场景选动作。',
  questions: [
    {
      id: 'concept-ops-scenarios:node-path',
      q: '安装器显示已装 Node，终端仍找不到。优先？',
      choices: [
        { t: '查 PATH 并新开终端', ok: true, why: '旧终端常沿用旧环境。' },
        { t: '立刻格式化系统盘', ok: false, why: '未验证 PATH。' },
        { t: '把 node 提交进 Git', ok: false, why: '勿塞运行时。' },
        { t: '改用 UDP 安装 Node', ok: false, why: '无此说法。' },
      ],
      relatedNodes: ['installers-path', 'runtime-nodejs'],
    },
    {
      id: 'concept-ops-scenarios:agent-proxy',
      q: '系统代理已开，终端 Agent 仍直连失败。宜？',
      choices: [
        { t: '为进程设置代理环境变量', ok: true, why: 'CLI 常不读系统代理。' },
        { t: '系统代理必然覆盖所有进程', ok: false, why: '不少 CLI 忽略。' },
        { t: '把代理端口写进业务仓库', ok: false, why: '易泄密。' },
        { t: '关掉防火墙就等于配代理', ok: false, why: '防火墙≠代理。' },
      ],
      relatedNodes: ['clash', 'clash-port'],
    },
    {
      id: 'concept-ops-scenarios:localhost',
      q: '设了 HTTP_PROXY 后访问 127.0.0.1 异常。宜？',
      choices: [
        { t: 'NO_PROXY 排除本机地址', ok: true, why: '环回常应直连。' },
        { t: '代理必须覆盖 localhost', ok: false, why: '易环回异常。' },
        { t: '删掉 Node 重装一次', ok: false, why: '未对症。' },
        { t: '把端口改成 22 即可', ok: false, why: '无关。' },
      ],
      relatedNodes: ['clash', 'installers-path'],
    },
    {
      id: 'concept-ops-scenarios:panel-node',
      q: '面板上部署 Node，业务进程怎么看？',
      choices: [
        { t: '面板管入口，业务是本机进程', ok: true, why: '仍要监听与保活。' },
        { t: '面板等于操作系统', ok: false, why: '业务仍要进程。' },
        { t: '面板替代 Node 运行时', ok: false, why: '运行时仍要装。' },
        { t: '有面板就免 HTTPS', ok: false, why: 'TLS 仍要配。' },
      ],
      relatedNodes: ['panel-essence', 'panel-run-node'],
    },
    {
      id: 'concept-ops-scenarios:no-panel',
      q: '无面板时 Linux 守护 Node，常见做法？',
      choices: [
        { t: '写 systemd unit 保活', ok: true, why: '自启与崩溃拉起。' },
        { t: 'crontab 每分钟杀再起', ok: false, why: '粗暴难观测。' },
        { t: '私钥塞进前端 www', ok: false, why: '私钥勿进前端。' },
        { t: 'SSH 前台挂着算生产', ok: false, why: '断会话即停。' },
      ],
      relatedNodes: ['host-systemd'],
    },
    {
      id: 'concept-ops-scenarios:disk',
      q: '写失败且 df 显示磁盘 100%。优先？',
      choices: [
        { t: '清日志/镜像并扩容排查', ok: true, why: '先腾空间。' },
        { t: '先重写全部业务代码', ok: false, why: '未解决空间。' },
        { t: '把磁盘当无限即可', ok: false, why: '会继续写爆。' },
        { t: '只关防火墙就够了', ok: false, why: '与磁盘无关。' },
      ],
      relatedNodes: ['linux-cli', 'ops-docker'],
    },
    {
      id: 'concept-ops-scenarios:tls',
      q: '证书临期浏览器报错，运维侧宜？',
      choices: [
        { t: '续期/自动续签并核域名', ok: true, why: '查 ACME/SAN。' },
        { t: '改成 UDP 监听 443', ok: false, why: '无关。' },
        { t: '把私钥提交进 Git', ok: false, why: '更危险。' },
        { t: '只清浏览器缓存即可', ok: false, why: '服务端仍过期。' },
      ],
      relatedNodes: ['host-tls', 'panel-essence'],
    },
    {
      id: 'concept-ops-scenarios:compose',
      q: '本机库+API 多容器联调，Compose 角色？',
      choices: [
        { t: '编排本机多服务小栈', ok: true, why: '≠生产 K8s。' },
        { t: '等于生产 Kubernetes', ok: false, why: '定位不同。' },
        { t: '只能启动单个容器', ok: false, why: '价值在多服务。' },
        { t: '有它就免健康检查', ok: false, why: '依赖仍要探针。' },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-ops-scenarios:env-git',
      q: '含密钥的 .env 对待 Git？',
      choices: [
        { t: '不进仓，用示例与密钥管理', ok: true, why: '密钥勿进历史。' },
        { t: '.env 应提交开箱即用', ok: false, why: '密钥不应进仓。' },
        { t: '隐藏等于加密可进仓', ok: false, why: '隐藏≠加密。' },
        { t: '改后缀再提交就安全', ok: false, why: '改名不降风险。' },
      ],
      relatedNodes: ['fs-dotfiles', 'fs-layout'],
    },
    {
      id: 'concept-ops-scenarios:distro',
      q: '陌生 Linux 装系统包，动手前先确认？',
      choices: [
        { t: '发行版与包管理器家族', ok: true, why: 'apt/dnf/pacman 不同。' },
        { t: '所有发行版命令相同', ok: false, why: '家族不同。' },
        { t: '先 rm -rf / 再装', ok: false, why: '破坏性无必要。' },
        { t: '看桌面主题就够了', ok: false, why: '主题≠包管理。' },
      ],
      relatedNodes: ['linux-distros', 'package-managers'],
    },
  ],
});

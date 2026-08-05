import { defineQuizSet } from '../schema.js';

/** Bloom 4 · 分析：分层归因 / 根因定位 */
export default defineQuizSet({
  id: 'concept-ops-analyze',
  title: '分析 · 运维排障归因',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '分析', '排障'],
  relatedNodes: [
    'workbench-troubleshoot',
    'terminal-worlds',
    'ops-docker',
    'clash',
    'host-tls',
  ],
  caption: '先定层再动手：壳、PATH、代理、磁盘、证书、容器。',
  questions: [
    {
      id: 'concept-ops-analyze:shell',
      q: '同命令 PS 通、Bash 语法错。根因层？',
      choices: [
        { t: '壳语法/内建差异', ok: true, why: '解释器不同。' },
        { t: '主板硬件损坏', ok: false, why: '与硬件无关。' },
        { t: 'DNS 解析失败', ok: false, why: '是语法报错。' },
        { t: '证书已过期', ok: false, why: '与壳语法无关。' },
      ],
      relatedNodes: ['terminal-worlds', 'linux-cli'],
    },
    {
      id: 'concept-ops-analyze:path',
      q: '安装成功但旧终端仍「找不到 node」。归因？',
      choices: [
        { t: '旧会话未继承新 PATH', ok: true, why: '新开终端验证。' },
        { t: 'Node 只能用 UDP', ok: false, why: '无此说。' },
        { t: 'Git 锁文件损坏', ok: false, why: '与 PATH 无关。' },
        { t: '反代证书过期', ok: false, why: '无关。' },
      ],
      relatedNodes: ['installers-path', 'runtime-nodejs'],
    },
    {
      id: 'concept-ops-analyze:proxy',
      q: '浏览器能上外网，CLI 拉镜像失败。更可能？',
      choices: [
        { t: 'CLI 未吃代理环境变量', ok: true, why: '系统代理≠进程代理。' },
        { t: '镜像源语法变成 Bash', ok: false, why: '非主因。' },
        { t: 'pnpm 禁止一切网络', ok: false, why: '非默认。' },
        { t: 'systemd 删除了 Docker', ok: false, why: '过臆测。' },
      ],
      relatedNodes: ['clash', 'ops-docker'],
    },
    {
      id: 'concept-ops-analyze:drift',
      q: '本机通、CI 不通，容器主要对准哪层问题？',
      choices: [
        { t: '运行环境不一致', ok: true, why: '固化可复现环境。' },
        { t: '自动修业务逻辑 bug', ok: false, why: '不改代码正确性。' },
        { t: '替代全部单元测试', ok: false, why: '职责不同。' },
        { t: '消灭一切网络延迟', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ops-container', 'ops-docker'],
    },
    {
      id: 'concept-ops-analyze:write',
      q: '服务写文件失败，日志含「No space left」。先看？',
      choices: [
        { t: '磁盘占用与 inode', ok: true, why: '空间/inode 写爆。' },
        { t: '仅改前端主题色', ok: false, why: '无关。' },
        { t: '仅升 Node 大版本', ok: false, why: '未对症。' },
        { t: '删掉全部单元测试', ok: false, why: '无关。' },
      ],
      relatedNodes: ['linux-cli', 'host-backup'],
    },
    {
      id: 'concept-ops-analyze:tls',
      q: '用户报证书错误，curl -v 显示过期。故障在？',
      choices: [
        { t: '边缘 TLS/证书配置', ok: true, why: '续签与域名核对。' },
        { t: '业务 SQL 慢查询', ok: false, why: '层不对。' },
        { t: '前端 CSS 压缩', ok: false, why: '无关。' },
        { t: 'pnpm store 损坏', ok: false, why: '无关。' },
      ],
      relatedNodes: ['host-tls', 'panel-essence'],
    },
    {
      id: 'concept-ops-analyze:loopback',
      q: '设全局代理后本机 API 调不通。更合理归因？',
      choices: [
        { t: '环回被代理劫持', ok: true, why: 'NO_PROXY 排除。' },
        { t: 'Node 禁止 localhost', ok: false, why: '非默认。' },
        { t: 'Compose 删除了 DNS', ok: false, why: '过臆测。' },
        { t: '证书算法变成 MD5', ok: false, why: '非主因。' },
      ],
      relatedNodes: ['clash', 'clash-port'],
    },
    {
      id: 'concept-ops-analyze:latest',
      q: '生产偶发「依赖行为变了」，镜像写 :latest。风险点？',
      choices: [
        { t: '标签漂移导致不可复现', ok: true, why: '应钉 digest/tag。' },
        { t: 'latest 自动签名校验', ok: false, why: '无关。' },
        { t: 'latest 冻结一切版本', ok: false, why: '指向会变。' },
        { t: 'Compose 禁止钉版本', ok: false, why: '仍可钉。' },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
  ],
});

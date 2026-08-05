import { defineQuizSet } from '../schema.js';

/** Bloom 5 · 评价：给定工程标准，选更合适做法 */
export default defineQuizSet({
  id: 'concept-ops-evaluate',
  title: '评价 · 运维实践取舍',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '评价', '实践'],
  relatedNodes: [
    'ops-docker',
    'host-backup',
    'craft-security',
    'host-systemd',
    'fs-dotfiles',
  ],
  caption: '有标准才评价：可复现、最小权限、可恢复、密钥不进仓。',
  questions: [
    {
      id: 'concept-ops-evaluate:tag',
      q: '以「可复现构建」为标准，生产镜像引用？',
      choices: [
        { t: '钉具体 tag 或 digest', ok: true, why: '避免 latest 漂移。' },
        { t: '一律只用 latest', ok: false, why: '不可复现。' },
        { t: '每次随机拉最新层', ok: false, why: '更漂。' },
        { t: '禁止写任何版本', ok: false, why: '更糟。' },
      ],
      relatedNodes: ['ops-docker'],
    },
    {
      id: 'concept-ops-evaluate:root',
      q: '以「最小权限」为标准，业务进程宜？',
      choices: [
        { t: '非 root / 容器 USER', ok: true, why: '缩小被攻破面。' },
        { t: '长期以 root 跑', ok: false, why: '权限面过大。' },
        { t: '把私钥世界可读', ok: false, why: '更危险。' },
        { t: '关闭一切审计日志', ok: false, why: '无法追责。' },
      ],
      relatedNodes: ['craft-security', 'ops-docker'],
    },
    {
      id: 'concept-ops-evaluate:backup',
      q: '以「可恢复」为标准，备份策略更优？',
      choices: [
        { t: '定期备份+恢复演练', ok: true, why: '证明能还原。' },
        { t: '只拷文件从不恢复', ok: false, why: '未验证。' },
        { t: '备份提交公开仓库', ok: false, why: '泄密。' },
        { t: '永不备份靠运气', ok: false, why: '不可接受。' },
      ],
      relatedNodes: ['host-backup'],
    },
    {
      id: 'concept-ops-evaluate:secret',
      q: '以「密钥不进历史」为标准，.env 宜？',
      choices: [
        { t: 'gitignore + 示例与密钥管理', ok: true, why: '分发不进仓。' },
        { t: '提交 .env 方便开箱', ok: false, why: '密钥进历史。' },
        { t: '改后缀伪装进仓', ok: false, why: '仍泄密。' },
        { t: '写进前端静态资源', ok: false, why: '更暴露。' },
      ],
      relatedNodes: ['fs-dotfiles'],
    },
    {
      id: 'concept-ops-evaluate:guard',
      q: '无面板生产守护 Node，更合适？',
      choices: [
        { t: 'systemd（或同类）托管', ok: true, why: '自启与崩溃拉起。' },
        { t: 'SSH 前台挂着跑', ok: false, why: '断会话即停。' },
        { t: 'crontab 每分钟杀起', ok: false, why: '粗暴难观测。' },
        { t: '私钥塞进 www 目录', ok: false, why: '安全灾难。' },
      ],
      relatedNodes: ['host-systemd'],
    },
    {
      id: 'concept-ops-evaluate:pm',
      q: '本仓依赖安装，以「锁一致」为标准？',
      choices: [
        { t: '只用约定的 pnpm', ok: true, why: '避免锁漂移。' },
        { t: 'npm/yarn/pnpm 轮装', ok: false, why: '锁易乱。' },
        { t: '从不写 lockfile', ok: false, why: '难复现。' },
        { t: '用 pip 装 Node 树', ok: false, why: '工具错位。' },
      ],
      relatedNodes: ['package-managers'],
    },
    {
      id: 'concept-ops-evaluate:state',
      q: '以「容器易失」为标准，持久数据宜？',
      choices: [
        { t: '外挂卷或托管库', ok: true, why: '状态与计算分离。' },
        { t: '只写容器可写层', ok: false, why: '重建即丢。' },
        { t: '靠 docker history 恢复', ok: false, why: '不是备份。' },
        { t: 'bake 密钥进镜像层', ok: false, why: '难轮换且泄密。' },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
  ],
});

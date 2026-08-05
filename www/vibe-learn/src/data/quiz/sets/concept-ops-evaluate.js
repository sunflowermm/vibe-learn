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
      q: '以「可复现构建」为标准，生产镜像引用更宜？',
      choices: [
        {
          t: '钉具体 tag 或镜像 digest，避免无声漂移',
          ok: true,
          why: '同一摘要才能复现环境。',
        },
        {
          t: '一律只用 latest，让仓库自动给最新层',
          ok: false,
          why: '不可复现，排障困难。',
        },
        {
          t: '每次构建随机拉「当前最新层」，不记录版本',
          ok: false,
          why: '比 latest 更不可追溯。',
        },
        {
          t: '禁止在编排文件里写任何版本信息',
          ok: false,
          why: '更糟；版本正是可复现的关键。',
        },
      ],
      relatedNodes: ['ops-docker'],
    },
    {
      id: 'concept-ops-evaluate:root',
      q: '以「最小权限」为标准，业务进程更宜？',
      choices: [
        {
          t: '非 root 用户运行；容器内声明 USER',
          ok: true,
          why: '缩小被攻破后的影响面。',
        },
        {
          t: '长期以 root 跑业务，图省事免权限问题',
          ok: false,
          why: '权限面过大。',
        },
        {
          t: '把 TLS 私钥改成世界可读，方便任意进程加载',
          ok: false,
          why: '私钥权限应尽可能收紧。',
        },
        {
          t: '关闭一切审计与访问日志，减少磁盘占用',
          ok: false,
          why: '失去追责与排障线索。',
        },
      ],
      relatedNodes: ['craft-security', 'ops-docker'],
    },
    {
      id: 'concept-ops-evaluate:backup',
      q: '以「可恢复」为标准，备份策略更优？',
      choices: [
        {
          t: '定期备份，并做恢复演练证明能还原',
          ok: true,
          why: '未演练的备份只是安慰剂。',
        },
        {
          t: '只拷贝文件到某处，从不做恢复验证',
          ok: false,
          why: '不知能否在时限内还原。',
        },
        {
          t: '把含数据的备份提交到公开 Git 仓库',
          ok: false,
          why: '泄密风险高，也不是正规灾备。',
        },
        {
          t: '永不备份，出问题再靠运气与重做',
          ok: false,
          why: '不可接受的生产策略。',
        },
      ],
      relatedNodes: ['host-backup'],
    },
    {
      id: 'concept-ops-evaluate:secret',
      q: '以「密钥不进 Git 历史」为标准，.env 宜？',
      choices: [
        {
          t: 'gitignore；仓内只放示例；真密钥走环境/Secrets',
          ok: true,
          why: '分发与秘密分离。',
        },
        {
          t: '提交真实 .env，方便同事 clone 开箱即用',
          ok: false,
          why: '密钥进历史难收回。',
        },
        {
          t: '改个后缀伪装成普通文件再提交',
          ok: false,
          why: '内容仍在仓库，扫描器照样能抓。',
        },
        {
          t: '写进前端静态资源，让浏览器直接带密钥请求',
          ok: false,
          why: '前端包可被下载，暴露面更大。',
        },
      ],
      relatedNodes: ['fs-dotfiles'],
    },
    {
      id: 'concept-ops-evaluate:guard',
      q: '无面板的生产机守护 Node，更合适？',
      choices: [
        {
          t: '用 systemd（或同类）托管：自启、崩溃拉起、日志可查',
          ok: true,
          why: '可观测的守护方式。',
        },
        {
          t: 'SSH 登录后前台挂着 node，断线再重连',
          ok: false,
          why: '会话结束进程停，不适合生产。',
        },
        {
          t: 'crontab 每分钟杀进程再拉起，当作保活',
          ok: false,
          why: '粗暴、难观测，易打断请求。',
        },
        {
          t: '把私钥塞进 www 静态目录，方便反代与业务共用',
          ok: false,
          why: '安全灾难；与守护方式无关且更糟。',
        },
      ],
      relatedNodes: ['host-systemd'],
    },
    {
      id: 'concept-ops-evaluate:pm',
      q: '本仓依赖安装，以「锁文件一致」为标准？',
      choices: [
        {
          t: '只用约定的 pnpm，并提交/冻结对应 lockfile',
          ok: true,
          why: '避免混用包管理器造成安装图漂移。',
        },
        {
          t: 'npm、yarn、pnpm 轮流装，哪个快用哪个',
          ok: false,
          why: '锁文件与依赖解析易乱。',
        },
        {
          t: '从不提交或生成 lockfile，每次解析最新范围',
          ok: false,
          why: '难复现，CI/生产易漂。',
        },
        {
          t: '用 pip 安装整棵 Node 依赖树',
          ok: false,
          why: '工具错位：pip 管 Python，不是 Node。',
        },
      ],
      relatedNodes: ['package-managers'],
    },
    {
      id: 'concept-ops-evaluate:state',
      q: '以「容器可丢可重建」为标准，持久数据宜？',
      choices: [
        {
          t: '外挂卷或托管数据库，状态与计算分离',
          ok: true,
          why: '容器重建不应丢掉业务状态。',
        },
        {
          t: '只写在容器可写层，重建时再碰运气',
          ok: false,
          why: '重建即丢。',
        },
        {
          t: '靠 docker history 当备份与恢复手段',
          ok: false,
          why: 'history 不是数据备份方案。',
        },
        {
          t: '把密钥 bake 进镜像层，随镜像分发',
          ok: false,
          why: '难轮换且易泄密；密钥应运行时注入。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
  ],
});

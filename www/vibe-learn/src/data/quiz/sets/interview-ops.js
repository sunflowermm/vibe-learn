import { defineQuizSet } from '../schema.js';

/**
 * 运维/托管大厂开口：容器、Compose、反代、守护、排障、权限——选项等长。
 */
export default defineQuizSet({
  id: 'interview-ops-host',
  title: '大厂 · 运维与托管',
  kind: 'interview',
  domain: 'ops',
  tags: ['容器', 'Docker', '反代', 'systemd', '排障'],
  relatedNodes: ['ops-container', 'ops-docker', 'ops-compose', 'host-systemd'],
  caption: '开口：容器边界、Compose、反代、守护与排障——上线保命。',
  questions: [
    {
      id: 'interview-ops-host:vs-vm',
      q: '容器和虚拟机差在哪？',
      choices: [
        {
          t: '容器共享内核更轻；VM 带完整客户机更重',
          ok: true,
          why: '内核共享 vs 完整 OS。',
        },
        {
          t: '容器一定更安全因为名字小',
          ok: false,
          why: '隔离强度另论。',
        },
        {
          t: '虚拟机不能跑 Linux 系统',
          ok: false,
          why: '可跑多种客户机。',
        },
        {
          t: '有了容器就不需要操作系统',
          ok: false,
          why: '仍依赖宿主机内核。',
        },
      ],
      relatedNodes: ['ops-container'],
    },
    {
      id: 'interview-ops-host:compose',
      q: 'compose 相对单条 docker run 的价值？',
      choices: [
        {
          t: '声明式描述多容器网络卷，可版本化',
          ok: true,
          why: '可复现协作环境。',
        },
        {
          t: '能让镜像体积自动变成零',
          ok: false,
          why: '不魔法压缩。',
        },
        {
          t: '有了 compose 就不需要镜像',
          ok: false,
          why: '仍引用镜像。',
        },
        {
          t: '只适合玩具，生产绝对不能用',
          ok: false,
          why: '小规模也可；大集群多转 K8s。',
        },
      ],
      relatedNodes: ['ops-compose'],
    },
    {
      id: 'interview-ops-host:ephemeral',
      q: '「容器是易失的」状态怎么放？',
      choices: [
        {
          t: '持久状态外挂卷/库，密钥运行时注入',
          ok: true,
          why: '计算与状态分离。',
        },
        {
          t: '重要数据只写容器可写层',
          ok: false,
          why: '重建即丢。',
        },
        {
          t: '易失意味着禁止使用数据库',
          ok: false,
          why: '库可挂卷或托管。',
        },
        {
          t: '打了 tag 就不会丢运行时写入',
          ok: false,
          why: 'tag 钉镜像非可写层。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
    {
      id: 'interview-ops-host:proxy',
      q: '为何生产常用反代挡在应用前？',
      choices: [
        {
          t: '统一 TLS 与路由，应用少公网直暴露',
          ok: true,
          why: '边缘处理流量与证书。',
        },
        {
          t: '反代能让 JS 自动变多线程',
          ok: false,
          why: '不改线程模型。',
        },
        {
          t: '有了反代就不需要 DNS',
          ok: false,
          why: '客户端仍靠 DNS。',
        },
        {
          t: '反代唯一作用是页面更好看',
          ok: false,
          why: '与视觉无关。',
        },
      ],
      relatedNodes: ['net-nginx', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:systemd',
      q: '服务挂了怎么自动拉起？',
      choices: [
        {
          t: '用 systemd unit 声明重启并由 init 守护',
          ok: true,
          why: '系统级托管与日志。',
        },
        {
          t: '代码里 while true 自重启就算生产级',
          ok: false,
          why: '开机与被杀仍要系统管。',
        },
        {
          t: 'systemd 只能管理图形桌面不能管服务',
          ok: false,
          why: '正是服务管理核心。',
        },
        {
          t: '有 Docker 就一定自动恢复无需配置',
          ok: false,
          why: '取决于 restart 策略。',
        },
      ],
      relatedNodes: ['host-systemd', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:timeout',
      q: '线上接口超时，运维第一步更可能？',
      choices: [
        {
          t: '看入口延迟与上游健康再定位',
          ok: true,
          why: '先分层再改业务。',
        },
        {
          t: '立刻重写全部业务并强推',
          ok: false,
          why: '未定位风险高。',
        },
        {
          t: '先关掉所有日志',
          ok: false,
          why: '排障需要观测。',
        },
        {
          t: '只重启用户浏览器即可',
          ok: false,
          why: '服务端超时常无关。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:nonroot',
      q: '为何业务不要长期以 root 跑？',
      choices: [
        {
          t: '缩小权限面，被攻破时限制破坏',
          ok: true,
          why: '最小权限；容器同 USER。',
        },
        {
          t: 'root 一定更快大厂都这么干',
          ok: false,
          why: '与性能无必然关系。',
        },
        {
          t: '公网服务必须 root 才能听 443',
          ok: false,
          why: '反代可听特权端口。',
        },
        {
          t: '只要 HTTPS 用不用 root 无所谓',
          ok: false,
          why: 'TLS 与进程权限分层。',
        },
      ],
      relatedNodes: ['craft-security', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:latest',
      q: '生产镜像写 :latest 有何风险？',
      choices: [
        {
          t: '标签漂移，构建与回滚不可复现',
          ok: true,
          why: '应钉 digest/具体 tag。',
        },
        {
          t: 'latest 永远最安全无风险',
          ok: false,
          why: '指向会变。',
        },
        {
          t: 'latest 等于完成签名校验',
          ok: false,
          why: '无关。',
        },
        {
          t: '有 Compose 就不必钉版本',
          ok: false,
          why: '仍要钉镜像。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
    {
      id: 'interview-ops-host:backup',
      q: '怎样证明备份有效？',
      choices: [
        {
          t: '做过恢复演练能在目标时间还原',
          ok: true,
          why: '未演练只是安慰剂。',
        },
        {
          t: '只要定时拷过文件即可',
          ok: false,
          why: '不知能否还原。',
        },
        {
          t: '备份放进公开 Git 最安全',
          ok: false,
          why: '常含密钥数据。',
        },
        {
          t: '面板自动备就永不必演练',
          ok: false,
          why: '仍要验证路径。',
        },
      ],
      relatedNodes: ['host-backup'],
    },
    {
      id: 'interview-ops-host:secret',
      q: '含密钥配置如何对待 Git？',
      choices: [
        {
          t: '不进仓，用示例文件与密钥管理分发',
          ok: true,
          why: '密钥勿进历史。',
        },
        {
          t: '提交 .env 方便同事开箱',
          ok: false,
          why: '密钥不应进仓。',
        },
        {
          t: '隐藏属性等于加密可进仓',
          ok: false,
          why: '隐藏≠加密。',
        },
        {
          t: '改后缀伪装后再提交即可',
          ok: false,
          why: '改名不降风险。',
        },
      ],
      relatedNodes: ['fs-dotfiles'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

/**
 * 运维/托管大厂开口：容器、Compose、反代、守护、排障、权限
 * （.env 细节见 craft/git-security；此处只保留生产镜像与备份）
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
      q: '面试里怎么一句话说清容器和虚拟机的差别？',
      choices: [
        {
          t: '容器共享宿主机内核，更轻更快起；VM 通常带完整客户机 OS，更重',
          ok: true,
          why: '内核共享 vs 完整 OS 是核心分界。',
        },
        {
          t: '容器名字更短，所以在任何场景下都一定比虚拟机更安全可靠',
          ok: false,
          why: '隔离强度取决于加固与威胁模型，不是名字。',
        },
        {
          t: '虚拟机不能安装或运行任何 Linux 发行版客户机系统',
          ok: false,
          why: 'VM 可跑多种客户机，包括各类 Linux。',
        },
        {
          t: '有了容器就不需要任何操作系统内核或宿主机支持',
          ok: false,
          why: '仍依赖宿主机内核与容器运行时。',
        },
      ],
      relatedNodes: ['ops-container'],
    },
    {
      id: 'interview-ops-host:compose',
      q: 'Compose 相对「多条 docker run」的主要价值？',
      choices: [
        {
          t: '用声明式文件描述多容器、网络与卷，可版本化、可复现协作环境',
          ok: true,
          why: '本地/小栈编排利器；大集群常另看 K8s。',
        },
        {
          t: '能让引用的镜像体积自动压缩到接近零',
          ok: false,
          why: 'Compose 不魔法压缩镜像。',
        },
        {
          t: '有了 Compose 就不需要再准备或引用任何镜像',
          ok: false,
          why: '服务定义仍要指向镜像或构建上下文。',
        },
        {
          t: 'Compose 只适合玩具项目，生产环境绝对禁止使用',
          ok: false,
          why: '小规模生产也可用；规模与编排需求变了再升 K8s。',
        },
      ],
      relatedNodes: ['ops-compose'],
    },
    {
      id: 'interview-ops-host:ephemeral',
      q: '「容器是易失的」——持久状态应该怎么放？',
      choices: [
        {
          t: '持久状态外挂卷或托管库；密钥在运行时注入，不 bake 进镜像',
          ok: true,
          why: '计算与状态分离，重建容器不丢数据。',
        },
        {
          t: '重要业务数据只写在容器可写层里，重建容器时再想办法找回',
          ok: false,
          why: '重建即丢。',
        },
        {
          t: '易失意味着生产环境禁止使用任何形式的数据库',
          ok: false,
          why: '库可以挂卷或用托管服务，不是禁用。',
        },
        {
          t: '只要给镜像打了 tag，容器运行时写入就保证不会丢',
          ok: false,
          why: 'tag 钉的是镜像内容，不是可写层数据。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
    {
      id: 'interview-ops-host:proxy',
      q: '为何生产常用反向代理挡在应用前面？',
      choices: [
        {
          t: '统一做 TLS 终结与路由，减少应用直接暴露在公网',
          ok: true,
          why: '边缘处理流量与证书；应用专注业务端口。',
        },
        {
          t: '反代能让 JavaScript 自动变成多线程并行执行',
          ok: false,
          why: '不改变语言线程模型。',
        },
        {
          t: '有了反代就不需要再配置 DNS 解析',
          ok: false,
          why: '客户端仍靠 DNS 找到入口。',
        },
        {
          t: '反代的唯一作用是让页面视觉上更好看',
          ok: false,
          why: '与视觉无关，价值在流量与安全边界。',
        },
      ],
      relatedNodes: ['net-nginx', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:systemd',
      q: '服务进程挂了，怎样比较稳妥地自动拉起？',
      choices: [
        {
          t: '用 systemd unit 声明重启策略，由 init 守护并收集日志',
          ok: true,
          why: '系统级托管：开机自启、崩溃拉起、可观测。',
        },
        {
          t: '只在业务代码里写 while(true) 自重启，就算生产级',
          ok: false,
          why: '开机、被 OOM kill、会话结束仍要系统层托管。',
        },
        {
          t: 'systemd 只能管理图形桌面，不能管理后台服务',
          ok: false,
          why: '服务管理正是 systemd 的核心用途之一。',
        },
        {
          t: '只要用了 Docker，就一定自动恢复，无需任何 restart 配置',
          ok: false,
          why: '取决于容器的 restart 策略与编排配置。',
        },
      ],
      relatedNodes: ['host-systemd', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:timeout',
      q: '线上接口超时，运维侧更合理的第一步？',
      choices: [
        {
          t: '先看入口延迟、上游依赖健康与资源告警，再决定是否改业务',
          ok: true,
          why: '先分层定位，避免未诊断就大改。',
        },
        {
          t: '立刻全量重写业务逻辑并强推生产',
          ok: false,
          why: '未定位风险极高。',
        },
        {
          t: '先关掉所有日志与指标，减少「噪音」再观察',
          ok: false,
          why: '排障需要观测，不是关掉眼睛。',
        },
        {
          t: '只让用户重启浏览器，服务端可以先不管',
          ok: false,
          why: '服务端 / 依赖超时与浏览器重启常无关。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:nonroot',
      q: '为何业务进程不要长期以 root 跑？',
      choices: [
        {
          t: '缩小权限面：被攻破时限制可造成的破坏；容器内同理用 USER',
          ok: true,
          why: '最小权限原则。',
        },
        {
          t: 'root 一定更快，大厂生产都默认长期用 root',
          ok: false,
          why: '与性能无必然关系；最小权限才是目标。',
        },
        {
          t: '公网服务必须用 root 才能监听 443，没有别的办法',
          ok: false,
          why: '可用反代听特权端口，业务用非特权端口。',
        },
        {
          t: '只要开了 HTTPS，业务进程用不用 root 都不再影响安全边界',
          ok: false,
          why: 'TLS 与进程权限是不同层；权限面仍要收。',
        },
      ],
      relatedNodes: ['craft-security', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:latest',
      q: '生产镜像写成 :latest 有什么风险？',
      choices: [
        {
          t: '标签漂移：同一 latest 可能指向不同摘要，构建与回滚难复现',
          ok: true,
          why: '应钉具体 tag 或 digest。',
        },
        {
          t: 'latest 永远指向最安全、已审计的版本，无漂移风险',
          ok: false,
          why: '指向会随仓库更新而变。',
        },
        {
          t: '写 latest 就等于完成了镜像签名与供应链校验',
          ok: false,
          why: '标签名与签名校验无关。',
        },
        {
          t: '只要用了 Compose，就可以不必钉任何镜像版本',
          ok: false,
          why: 'Compose 里仍应钉镜像引用。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
    {
      id: 'interview-ops-host:backup',
      q: '怎样向面试官证明「备份有效」？',
      choices: [
        {
          t: '做过恢复演练，能在约定时限内把数据/服务还原回来',
          ok: true,
          why: '未演练的备份只是安慰剂。',
        },
        {
          t: '只要定时把文件拷到某处，就可以称为有效备份',
          ok: false,
          why: '不知介质是否可读、流程是否可复现。',
        },
        {
          t: '把备份提交进公开 Git 仓库，是最安全的灾备',
          ok: false,
          why: '常含敏感数据，且不等于可恢复演练。',
        },
        {
          t: '面板开了自动备份后，就永远不必再做恢复演练',
          ok: false,
          why: '仍要定期验证恢复路径。',
        },
      ],
      relatedNodes: ['host-backup'],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

/** Bloom 2 · 理解：概念边界（面板/进程、容器/VM、Compose/K8s） */
export default defineQuizSet({
  id: 'concept-ops-understand',
  title: '理解 · 运维概念边界',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '理解', '边界'],
  relatedNodes: ['panel-essence', 'ops-container', 'ops-compose', 'host-systemd'],
  caption: '说清差在哪：面板≠OS，容器≠VM，Compose≠K8s。',
  questions: [
    {
      id: 'concept-ops-understand:panel',
      q: '宝塔 / 1Panel 这类面板与操作系统的关系？',
      choices: [
        {
          t: '面板是托管与运维工具，底下仍是 OS、进程与端口',
          ok: true,
          why: '不替代内核；业务仍要自己的运行时与进程。',
        },
        {
          t: '装上面板就等于换成了另一套操作系统内核',
          ok: false,
          why: '面板跑在原 OS 上，内核没被替换。',
        },
        {
          t: '有了面板就可以卸载 Node，由面板解释业务代码',
          ok: false,
          why: 'Node 等运行时仍要安装；面板只帮你管启停/入口。',
        },
        {
          t: '装了面板后业务不必再监听任何端口',
          ok: false,
          why: '反代仍要把流量转到业务监听端口。',
        },
      ],
      relatedNodes: ['panel-essence', 'panel-run-node'],
    },
    {
      id: 'concept-ops-understand:ctr-vm',
      q: '容器相对虚拟机，最核心的差别是？',
      choices: [
        {
          t: '容器共享宿主机内核，更轻、启动更快',
          ok: true,
          why: 'VM 通常带完整客户机 OS，更重。',
        },
        {
          t: '容器在任何配置下都一定比虚拟机更安全',
          ok: false,
          why: '隔离模型不同；安全取决于加固与威胁模型。',
        },
        {
          t: '容器完全不依赖任何操作系统或内核即可运行',
          ok: false,
          why: '仍依赖宿主机内核与运行时。',
        },
        {
          t: '虚拟机不能安装或运行 Linux 客户机系统',
          ok: false,
          why: 'VM 可跑多种客户机，包括各类 Linux。',
        },
      ],
      relatedNodes: ['ops-container'],
    },
    {
      id: 'concept-ops-understand:compose-k8s',
      q: '本机 Docker Compose 与生产向 Kubernetes 的定位？',
      choices: [
        {
          t: 'Compose 擅本地/小栈编排；K8s 擅集群调度与声明式运维',
          ok: true,
          why: '能力与运维面不同，勿混称「上了 Compose=上了 K8s」。',
        },
        {
          t: '二者命令、API 与能力完全相同，只是品牌不同',
          ok: false,
          why: '对象模型、规模与运维工具链都不一样。',
        },
        {
          t: '写好 Compose 文件就等于已经在生产集群跑 K8s',
          ok: false,
          why: '本地编排≠集群控制面。',
        },
        {
          t: 'Kubernetes 只能当本机玩具，不能用于生产集群',
          ok: false,
          why: 'K8s 正是面向生产集群的编排平台。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-ops-understand:shell',
      q: 'PowerShell 与 Bash 能否默认当成「同一套语法」互换？',
      choices: [
        {
          t: '不能：壳语法、管道语义与内建命令常不同，要按当前壳改写法',
          ok: true,
          why: '复制 Linux 教程到 PowerShell 常直接语法错。',
        },
        {
          t: '能：所有常见壳已统一成一种语法标准，可直接互拷',
          ok: false,
          why: '并不统一；跨壳要改命令与引号规则。',
        },
        {
          t: '只差主题颜色与配色方案，命令解释完全一致',
          ok: false,
          why: '差异在解释器与语法，不是主题。',
        },
        {
          t: '只差默认字体大小与字重，其它行为完全相同',
          ok: false,
          why: '字体无关；语法与内建才是关键差。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'linux-cli'],
    },
    {
      id: 'concept-ops-understand:esp',
      q: 'ESP32 板端与云端 AgentRuntime 的关系？',
      choices: [
        {
          t: '板端资源紧，经协议与云协作；完整 Runtime 不跑在 MCU 上',
          ok: true,
          why: '边缘设备与云进程职责分离。',
        },
        {
          t: '应在 MCU 上直接跑完整 AgentRuntime 与全部插件',
          ok: false,
          why: '算力与内存不够承载完整主服。',
        },
        {
          t: '一块 ESP32 可以替代云端 Redis 做全集群缓存',
          ok: false,
          why: '职责与容量都对不上。',
        },
        {
          t: '板端固件与云端 Runtime 必须是同一个操作系统进程',
          ok: false,
          why: '分离部署，靠网络/协议协作。',
        },
      ],
      relatedNodes: ['esp-mcu', 'esp-link'],
    },
    {
      id: 'concept-ops-understand:backup',
      q: '「有备份」和「备份有效」差在哪里？',
      choices: [
        {
          t: '有效=做过恢复演练，证明能在目标时限内还原',
          ok: true,
          why: '未演练的备份只是安慰剂。',
        },
        {
          t: '只要曾经拷过一份文件，就可以称为有效备份',
          ok: false,
          why: '不知介质是否可读、流程是否可复现。',
        },
        {
          t: '把备份提交到公开 Git 仓库是最有效的灾备',
          ok: false,
          why: '易泄密；也不等于可恢复演练。',
        },
        {
          t: '面板开了自动备份后，就永远不必再验证可恢复性',
          ok: false,
          why: '仍要定期恢复演练与抽查。',
        },
      ],
      relatedNodes: ['host-backup'],
    },
    {
      id: 'concept-ops-understand:pnpm',
      q: '本仓约定只用 pnpm，主要是为了避免什么？',
      choices: [
        {
          t: '锁文件漂移、幽灵依赖，以及混用 npm/yarn 带来的不一致',
          ok: true,
          why: '统一包管理器才能保证安装图可复现。',
        },
        {
          t: '浏览器页面渲染变慢、首屏与交互指标一起变差',
          ok: false,
          why: '与前端渲染性能无直接关系。',
        },
        {
          t: 'TCP 三次握手在本机必然失败，导致无法访问任何外网',
          ok: false,
          why: '网络握手与包管理器选型无关。',
        },
        {
          t: '磁盘扇区物理损坏，必须更换整块硬盘才能继续开发',
          ok: false,
          why: '硬件损坏不是 pnpm 约定要解决的问题。',
        },
      ],
      relatedNodes: ['package-managers', 'runtime-nodejs'],
    },
  ],
});

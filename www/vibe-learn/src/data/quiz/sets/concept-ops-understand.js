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
      q: '宝塔/1Panel 与操作系统的关系？',
      choices: [
        { t: '面板是托管工具，底下仍是 OS/进程', ok: true, why: '不替代内核与业务进程。' },
        { t: '装面板就等于换了操作系统', ok: false, why: '仍跑在原 OS 上。' },
        { t: '面板会替代 Node 运行时', ok: false, why: '运行时仍要装。' },
        { t: '有面板就无需任何端口', ok: false, why: '业务仍监听端口。' },
      ],
      relatedNodes: ['panel-essence', 'panel-run-node'],
    },
    {
      id: 'concept-ops-understand:ctr-vm',
      q: '容器相对虚拟机，最核心差别？',
      choices: [
        { t: '共享宿主机内核，更轻更快起', ok: true, why: 'VM 带完整客户机 OS。' },
        { t: '容器一定更安全', ok: false, why: '隔离强度不同。' },
        { t: '容器不需要任何操作系统', ok: false, why: '依赖宿主机内核。' },
        { t: 'VM 不能跑 Linux', ok: false, why: '可跑多种客户机。' },
      ],
      relatedNodes: ['ops-container'],
    },
    {
      id: 'concept-ops-understand:compose-k8s',
      q: '本机 Compose 与生产 Kubernetes？',
      choices: [
        { t: 'Compose 擅本地小栈；K8s 擅集群编排', ok: true, why: '定位不同勿混称。' },
        { t: '二者命令与能力完全相同', ok: false, why: 'API 与规模不同。' },
        { t: '有 Compose 就等于上了 K8s', ok: false, why: '不是。' },
        { t: 'K8s 只能本机玩具用', ok: false, why: '正是集群生产向。' },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-ops-understand:shell',
      q: 'PowerShell 与 Bash「能跑同一语法」？',
      choices: [
        { t: '否，壳语法与内建常不同', ok: true, why: '要按当前壳改写法。' },
        { t: '是，所有壳语法统一', ok: false, why: '并不统一。' },
        { t: '只差主题颜色', ok: false, why: '是解释器差异。' },
        { t: '只差字体大小', ok: false, why: '无关。' },
      ],
      relatedNodes: ['terminal-worlds', 'linux-cli'],
    },
    {
      id: 'concept-ops-understand:esp',
      q: 'ESP32 与云端 AgentRuntime？',
      choices: [
        { t: '板端资源紧，经协议与云协作', ok: true, why: '主服不跑在 MCU。' },
        { t: '应在 MCU 上跑完整 Runtime', ok: false, why: '算力不够。' },
        { t: 'ESP32 可替代云 Redis', ok: false, why: '职责不同。' },
        { t: '二者是同一进程', ok: false, why: '分离部署。' },
      ],
      relatedNodes: ['esp-mcu', 'esp-link'],
    },
    {
      id: 'concept-ops-understand:backup',
      q: '「有备份」与「备份有效」差在？',
      choices: [
        { t: '有效=做过恢复演练能还原', ok: true, why: '未演练只是安慰剂。' },
        { t: '只要拷过文件就算有效', ok: false, why: '不知能否还原。' },
        { t: '备份进公开仓最有效', ok: false, why: '泄密风险。' },
        { t: '有面板自动备就免验证', ok: false, why: '仍要演练。' },
      ],
      relatedNodes: ['host-backup'],
    },
    {
      id: 'concept-ops-understand:pnpm',
      q: '本仓约定只用 pnpm，主要为避免？',
      choices: [
        { t: '锁文件漂移与幽灵依赖', ok: true, why: '混用 npm/yarn 易乱。' },
        { t: '浏览器渲染变慢', ok: false, why: '无关。' },
        { t: 'TCP 握手失败', ok: false, why: '无关。' },
        { t: '磁盘扇区损坏', ok: false, why: '无关。' },
      ],
      relatedNodes: ['package-managers', 'runtime-nodejs'],
    },
  ],
});

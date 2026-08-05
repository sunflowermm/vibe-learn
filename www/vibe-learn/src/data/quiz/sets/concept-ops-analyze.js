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
      q: '同一串命令在 PowerShell 能跑，拷到 Bash 报语法错。根因更可能在？',
      choices: [
        {
          t: '壳语法 / 管道 / 内建命令差异，不是同一解释器',
          ok: true,
          why: '先确认当前壳，再改写法。',
        },
        {
          t: '主板硬件损坏导致字符被随机改写',
          ok: false,
          why: '过臆测；稳定复现的语法错优先看壳差异。',
        },
        {
          t: 'DNS 解析失败导致命令名找不到',
          ok: false,
          why: '语法报错与 DNS 无关；「找不到命令」才可能是 PATH。',
        },
        {
          t: 'TLS 证书过期导致本地 shell 拒绝执行脚本',
          ok: false,
          why: '证书层不解释 shell 语法。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'linux-cli'],
    },
    {
      id: 'concept-ops-analyze:path',
      q: '安装器显示成功，但旧终端窗口仍「找不到 node」。更合理归因？',
      choices: [
        {
          t: '旧会话未继承安装后写入的 PATH，需新开终端验证',
          ok: true,
          why: '环境变量对已打开会话不自动热更新。',
        },
        {
          t: 'Node 运行时规定只能通过 UDP 启动，TCP 终端无效',
          ok: false,
          why: '无此协议限制；问题在 PATH/会话。',
        },
        {
          t: '仓库 Git 锁文件损坏导致可执行文件被隐藏',
          ok: false,
          why: '锁文件与 PATH 查找无关。',
        },
        {
          t: '反向代理证书过期，终端因此拒绝解析 node 命令',
          ok: false,
          why: '证书问题不会表现为「找不到 node」。',
        },
      ],
      relatedNodes: ['installers-path', 'runtime-nodejs'],
    },
    {
      id: 'concept-ops-analyze:proxy',
      q: '浏览器能上外网，但 CLI 拉容器镜像 / 装包失败。更可能？',
      choices: [
        {
          t: 'CLI 未读取代理环境变量（系统代理≠进程代理）',
          ok: true,
          why: '为 docker/pnpm 等单独配置代理或镜像源。',
        },
        {
          t: '镜像源地址被自动翻译成 Bash 脚本语法导致失败',
          ok: false,
          why: '非典型主因；优先查代理与可达性。',
        },
        {
          t: 'pnpm 默认禁止一切出站网络，必须改源码开关',
          ok: false,
          why: '非默认行为；失败更常见是网络/代理/registry。',
        },
        {
          t: 'systemd 在后台静默卸载了 Docker 引擎',
          ok: false,
          why: '过臆测；应先看错误是否为超时/连接被拒。',
        },
      ],
      relatedNodes: ['clash', 'ops-docker'],
    },
    {
      id: 'concept-ops-analyze:drift',
      q: '本机跑得通、CI 跑不通。引入容器主要对准哪一层问题？',
      choices: [
        {
          t: '运行环境不一致（依赖、系统库、路径）导致不可复现',
          ok: true,
          why: '容器固化环境；不自动修业务逻辑。',
        },
        {
          t: '自动重写并修复业务逻辑里的算法 bug',
          ok: false,
          why: '容器不管代码正确性。',
        },
        {
          t: '替代项目中全部单元测试与集成测试',
          ok: false,
          why: '环境复现≠测试职责。',
        },
        {
          t: '消灭公网到机房之间的一切网络延迟',
          ok: false,
          why: '与延迟无关。',
        },
      ],
      relatedNodes: ['ops-container', 'ops-docker'],
    },
    {
      id: 'concept-ops-analyze:write',
      q: '服务写文件失败，日志出现 No space left on device。应先看？',
      choices: [
        {
          t: '磁盘容量占用，以及 inode 是否耗尽',
          ok: true,
          why: '空间或 inode 写满都会表现为写失败。',
        },
        {
          t: '仅修改前端主题色与 Logo',
          ok: false,
          why: '与磁盘写满无关。',
        },
        {
          t: '仅升级 Node 大版本号碰运气',
          ok: false,
          why: '未对症；先腾空间/查 inode。',
        },
        {
          t: '删掉仓库里全部单元测试文件腾业务逻辑',
          ok: false,
          why: '测试体积通常不是根因；且损害质量网。',
        },
      ],
      relatedNodes: ['linux-cli', 'host-backup'],
    },
    {
      id: 'concept-ops-analyze:tls',
      q: '用户报证书错误，curl -v 显示证书已过期。故障主要在？',
      choices: [
        {
          t: '边缘 TLS / 证书配置（续签、域名与 SAN）',
          ok: true,
          why: '先修证书与反代，再查业务代码。',
        },
        {
          t: '业务 SQL 慢查询导致握手超时被误报成证书错',
          ok: false,
          why: 'curl 已明确过期；层在证书。',
        },
        {
          t: '前端 CSS 压缩插件改写了证书内容',
          ok: false,
          why: '静态资源构建不负责服务端证书。',
        },
        {
          t: '本机 pnpm store 损坏触发 TLS 校验失败',
          ok: false,
          why: '包存储与站点证书过期无关。',
        },
      ],
      relatedNodes: ['host-tls', 'panel-essence'],
    },
    {
      id: 'concept-ops-analyze:loopback',
      q: '设置全局代理后，本机调 127.0.0.1 上的 API 突然不通。更合理归因？',
      choices: [
        {
          t: '环回流量被代理劫持；应用 NO_PROXY 排除本机',
          ok: true,
          why: '本地服务应直连。',
        },
        {
          t: 'Node 默认禁止访问 localhost，必须改编译选项',
          ok: false,
          why: '非默认；问题在代理范围。',
        },
        {
          t: 'Compose 静默删除了宿主机 DNS 配置',
          ok: false,
          why: '过臆测；先查代理与 NO_PROXY。',
        },
        {
          t: '证书算法被自动降级成 MD5 导致本地失败',
          ok: false,
          why: '非本症状主因。',
        },
      ],
      relatedNodes: ['clash', 'clash-port'],
    },
    {
      id: 'concept-ops-analyze:latest',
      q: '生产偶发「依赖行为变了」，镜像引用写的是 :latest。风险点？',
      choices: [
        {
          t: '标签漂移：同一 latest 可能指向不同摘要，构建不可复现',
          ok: true,
          why: '生产应钉具体 tag 或 digest。',
        },
        {
          t: 'latest 会自动完成镜像签名校验，因此最安全',
          ok: false,
          why: 'latest 不提供「自动更安全」；反而易漂。',
        },
        {
          t: 'latest 会冻结所有依赖版本，保证永不变化',
          ok: false,
          why: '恰恰相反：指向会随仓库更新而变。',
        },
        {
          t: 'Compose 规范禁止钉版本，只能写 latest',
          ok: false,
          why: 'Compose 完全可以钉 tag/digest。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
  ],
});

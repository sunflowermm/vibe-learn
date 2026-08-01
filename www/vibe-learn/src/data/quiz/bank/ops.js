/**
 * 静态题库 · ops
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:ops:clash-proxy:core",
    q: "系统代理开了，终端/Coding Agent 仍直连失败。更靠谱的处理？",
    choices: [
      { t: "为进程显式设 HTTP_PROXY/HTTPS_PROXY/ALL_PROXY（及 NO_PROXY）；别假定吃系统代理", ok: true, why: "代理引擎与「谁吃代理」是两层；Agent/CLI 常要环境变量。" },
      { t: "只要开了系统代理，所有进程必然走代理", ok: false, why: "许多 CLI 不读系统代理。" },
      { t: "把代理端口写进业务仓库当默认密钥", ok: false, why: "环境相关，且易泄密。" },
      { t: "关掉本机防火墙就等于配置好了代理规则", ok: false, why: "防火墙≠代理出站策略。" },
    ],
    kind: "concept",
    domain: "ops",
    tags: ["场景","课核"],
    relatedNodes: ["clash","clash-port","clash-setup"],
    source: 'static',
  },
  {
    id: "s:ops:container-compose:core",
    q: "「我机器能跑、同事/CI 不行」；要把 DB+API 本机一起拉起。容器与 Compose 怎么分工？",
    choices: [
      { t: "容器固化可重复运行环境；Compose 编排多容器本机栈——≠ K8s，也不替代业务修 bug", ok: true, why: "环境一致性与编排分层；面试常混容器/虚机/编排。" },
      { t: "容器=必须完整桌面虚机；Compose=生产 K8s", ok: false, why: "容器更轻；Compose 是本机/小栈编排。" },
      { t: "有 Docker 就不必钉版本与健康检查", ok: false, why: "可复现靠钉扎与探针。" },
      { t: "容器会自动修复业务逻辑错误", ok: false, why: "只解决环境，不修代码。" },
    ],
    kind: "concept",
    domain: "ops",
    tags: ["场景","课核"],
    relatedNodes: ["ops-container","ops-docker","ops-compose","ops-others"],
    source: 'static',
  },
  {
    id: "s:ops:fs-esp:core",
    q: ".env 该当「隐藏配置」；ESP32 项目与云端主服关系？",
    choices: [
      { t: "点文件/权限管本地密钥与配置；MCU 固件资源紧，经 MQTT/HTTP 与云协作——主服不在板子上", ok: true, why: "本机目录与嵌入式协作两条线，合并考「边界」：密钥落盘 vs 算力在哪。" },
      { t: ".env 应提交进 Git 方便同事；固件应跑完整 AgentRuntime", ok: false, why: "密钥勿进仓；板子不是云主服。" },
      { t: "隐藏属性等于加密；ESP32=云服务器", ok: false, why: "隐藏≠加密；算力与模型天差地别。" },
      { t: "烧录工具与 PATH 无关；板子可替代 Redis", ok: false, why: "工具链仍依赖 PATH；职责不同。" },
    ],
    kind: "concept",
    domain: "ops",
    tags: ["场景","课核"],
    relatedNodes: ["fs-layout","fs-dotfiles","esp-mcu","esp-esp32","esp-toolchain","esp-link"],
    source: 'static',
  },
  {
    id: "s:ops:panel-host:core",
    q: "面板上跑 Node、要 HTTPS；无面板时用什么拉起；备份怎样才算数？",
    choices: [
      { t: "面板管入口/反代，业务仍听本地端口；无面板用 systemd unit；备份必须演练恢复", ok: true, why: "面板≠OS≠业务；TLS 在网关终止；没测过的备份是安慰剂。" },
      { t: "面板就是操作系统，装上面板就不用进程管理", ok: false, why: "底下仍是进程/反代/证书。" },
      { t: "证书丢在前端 www 仓库最方便", ok: false, why: "私钥勿进前端产物。" },
      { t: "备份了从未恢复演练也算高可用", ok: false, why: "恢复演练才证明有效。" },
    ],
    kind: "concept",
    domain: "ops",
    tags: ["场景","课核"],
    relatedNodes: ["panel-essence","panel-baota","panel-1panel","panel-compare","panel-run-node","host-systemd","host-tls","host-backup"],
    source: 'static',
  },
  {
    id: "s:ops:shell-path:core",
    q: "同一命令 PowerShell 通、Git Bash 挂；node 已装但找不到；本仓该用啥装依赖；跨发行版先认什么？",
    choices: [
      { t: "壳语法/PATH 不同要分清；查 PATH 与新开终端；本仓 pnpm；装软件先认发行版家族/包管理器", ok: true, why: "环境章把「壳·PATH·包管理·发行版」捏成一条值班链，比四道口水题有效。" },
      { t: "全部问题先重装 Windows", ok: false, why: "成本高且常不是根因。" },
      { t: "npm/yarn/pnpm 轮着装锁文件会自己和解", ok: false, why: "锁漂移与幽灵依赖。" },
      { t: "所有 Linux 发行版装包命令完全相同", ok: false, why: "家族与包管理器不同。" },
    ],
    kind: "concept",
    domain: "ops",
    tags: ["场景","课核"],
    relatedNodes: ["terminal-worlds","installers-path","package-managers","runtime-nodejs","linux-distros","linux-cli"],
    source: 'static',
  }
];

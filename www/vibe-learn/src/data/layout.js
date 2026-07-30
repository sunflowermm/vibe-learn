/**
 * 章框与卡片布局 — 循序渐进的思维导图式分布。
 *
 * 原则（见 layout-from-edges.js）：
 * 1. 方块迁就边；有边应相邻
 * 2. 按「故事」选模式，禁止一律填格
 * 3. 间距 ≥ CARD_W/H + gutter；assertNoCardOverlap
 * 4. **章框**：XRK-AGT 居中枢纽；语言在上、AI 在右、环境/网络在左；番外贴亲和章（勿堆同一底栏）
 *
 * 各章模式：
 * | 章 | 模式 | 读法 |
 * |----|------|------|
 * | 序章 | spineForkMerge | 环境左侧同高 |
 * | 环境 | pipelineColumns | 左→右工具链，上下成对 |
 * | 编程 | pipelineColumns | 压在环境上方（01.5） |
 * | 语言 | 分区泳道 + hub-grid | 编程框上方 |
 * | 网络 | pipelineColumns | 左柱贴 XRK |
 * | XRK  | laneBlock 泳道 | **画布中心枢纽** |
 * | AI   | snake | 贴 XRK 右侧 |
 * | Clash | chain | 贴网络下方 |
 * | 数据库 | laneBlock | 贴 XRK 正下方 |
 * | 容器 | laneBlock | 贴环境下方 |
 * | 本机目录 | chain | 贴容器右侧（同高） |
 * | ESP32 | laneBlock | 贴序章下方 |
 * | 工程素养 | chain | 贴 AI 下方 |
 * | DSA | laneBlock | 贴语言左侧/下方 |
 */
import {
  CARD_COL,
  CARD_GUTTER_X,
  CARD_H,
  CARD_ROW,
  CARD_W,
  assertNoCardOverlap,
  belowBlockY,
  chainRowPositions,
  hubSpokeGridPositions,
  laneBlockPositions,
  pipelineColumnsPositions,
  snakeRowPositions,
  spineForkMergePositions,
} from '../utils/layout-from-edges.js';

const TOP = 120;
const ORIGIN_X = 48;
const LANE_GAP = CARD_ROW + 56;
const PIPE_PAIR = CARD_ROW + 24;

/* ═══════════════════════════════════════════
 * 序章 · 脊柱分叉汇合
 * computer-system → (os ‖ hw-sw) → chip-units
 * ═══════════════════════════════════════════ */
const MACHINE_TOPICS = spineForkMergePositions({
  spine: ['computer-system', 'os-essence', 'chip-units'],
  /* os 作脊柱中段；硬件链路作下支，与 os 并行后汇入芯片 */
  lower: 'hw-sw-link',
  originX: ORIGIN_X,
  originY: 220,
  colGap: CARD_COL,
  branchGap: CARD_ROW,
});
/* os 与 hw-sw 同列上下：微调 os 到上支位置 */
MACHINE_TOPICS['os-essence'] = {
  x: MACHINE_TOPICS['computer-system'].x + CARD_COL,
  y: 220 - CARD_ROW,
};
MACHINE_TOPICS['hw-sw-link'] = {
  x: MACHINE_TOPICS['computer-system'].x + CARD_COL,
  y: 220 + CARD_ROW,
};
MACHINE_TOPICS['chip-units'] = {
  x: MACHINE_TOPICS['computer-system'].x + CARD_COL * 2,
  y: 220,
};
assertNoCardOverlap(MACHINE_TOPICS, 'frameMachine');

/* ═══════════════════════════════════════════
 * 第一章 · 左→右流水线（上下双轨）
 * 终端 → Linux → Node 工具链 → Git → 首次跑通
 * ═══════════════════════════════════════════ */
const ENV_TOPICS = pipelineColumnsPositions(
  [
    'terminal-worlds',
    ['linux-distros', 'linux-cli'],
    ['runtime-nodejs', 'installers-path'],
    'package-managers',
    ['git-workspace', 'git-forges'],
    'git-advanced',
    ['workbench-editor', 'workbench-troubleshoot'],
    'xrk-first-run',
  ],
  { originX: ORIGIN_X, originY: 240, colGap: CARD_COL, pairGap: PIPE_PAIR }
);
assertNoCardOverlap(ENV_TOPICS, 'frameEnv');

/* ═══════════════════════════════════════════
 * 第一章半 · 编程基础（JS 动手 + 数据文字）
 * ═══════════════════════════════════════════ */
const CODE_TOPICS = pipelineColumnsPositions(
  [
    'code-first-program',
    ['code-values-types', 'code-control-flow'],
    ['code-functions', 'code-objects-arrays'],
    ['code-modules', 'code-async'],
    'code-read-errors',
    ['data-json', 'data-yaml'],
    ['data-markdown', 'data-env'],
    ['code-regex', 'code-typescript-hands'],
    'code-checkpoint',
  ],
  { originX: ORIGIN_X, originY: 220, colGap: CARD_COL, pairGap: PIPE_PAIR }
);
assertNoCardOverlap(CODE_TOPICS, 'frameCode');

/* ═══════════════════════════════════════════
 * 第二章 · 分区泳道 + 版图枢纽网格
 * 概念链 → 模型 → 语言网格 → 框架带 → 落地
 * ═══════════════════════════════════════════ */
const LANG_CONCEPTS = chainRowPositions(
  [
    'lang-what-is-language',
    'lang-library-framework',
    'lang-tech-stack',
    'lang-tech-selection',
  ],
  { x: ORIGIN_X, y: TOP, gap: CARD_COL }
);

const MODEL_Y = belowBlockY(LANG_CONCEPTS, 80);
const LANG_MODEL = {
  'lang-compiled-runtime': { x: ORIGIN_X, y: MODEL_Y },
  'lang-landscape': {
    x: LANG_CONCEPTS['lang-tech-selection'].x,
    y: MODEL_Y,
  },
};

/** 本仓优先：JS + Node 运行时 → TS/前端 → 子服语言 → 系统/脚本 */
const LANG_IDS = [
  'lang-javascript',
  'lang-nodejs',
  'lang-typescript',
  'lang-html-css',
  'lang-python',
  'lang-go',
  'lang-rust',
  'lang-java',
  'lang-csharp',
  'lang-php',
  'lang-c',
  'lang-shell',
  'lang-powershell',
];

const LANG_GRID = hubSpokeGridPositions('lang-landscape', LANG_IDS, {
  hub: LANG_MODEL['lang-landscape'],
  childX: LANG_MODEL['lang-landscape'].x + CARD_W + CARD_GUTTER_X + 40,
  cols: 3,
  colGap: CARD_COL,
  rowGap: CARD_ROW,
  align: 'top',
  fill: 'column',
  includeHub: false,
});

const langBand = { ...LANG_CONCEPTS, ...LANG_MODEL, ...LANG_GRID };

const FW_Y0 = belowBlockY(langBand, 100);
const FW_FRONT = chainRowPositions(
  ['fw-vue', 'fw-react', 'fw-angular', 'fw-nextjs'],
  { x: LANG_CONCEPTS['lang-library-framework'].x, y: FW_Y0, gap: CARD_COL }
);
const FW_BACK = chainRowPositions(
  [
    'fw-spring',
    'fw-express-nest',
    'fw-django-fastapi',
    'fw-gin',
    'fw-aspnet',
    'fw-laravel',
  ],
  {
    x: LANG_CONCEPTS['lang-what-is-language'].x,
    y: FW_Y0 + CARD_ROW,
    gap: CARD_COL,
  }
);

const LANG_TOPICS = {
  ...langBand,
  ...FW_FRONT,
  ...FW_BACK,
  'lang-to-runtime': {
    x: Math.min(...LANG_IDS.map((id) => LANG_GRID[id].x)),
    y: belowBlockY({ ...LANG_GRID, ...FW_FRONT, ...FW_BACK }, 48),
  },
};
assertNoCardOverlap(LANG_TOPICS, 'frameLang');

/* ═══════════════════════════════════════════
 * 第三章 · 左→右网络栈流水线
 * 双入口 → 协议 → 寻址/传输 → 路由/DNS → HTTP → 反代 → 边缘
 * ═══════════════════════════════════════════ */
const NET_TOPICS = pipelineColumnsPositions(
  [
    ['network-basics', 'api-frontend'],
    'protocol-stack',
    ['ip-addressing', 'tcp-udp'],
    ['routing-nat', 'dns-https'],
    ['http-web', 'http-hands-on'],
    'reverse-proxy',
    ['net-nginx', 'net-edge-practice'],
  ],
  { originX: ORIGIN_X, originY: 260, colGap: CARD_COL, pairGap: PIPE_PAIR }
);
assertNoCardOverlap(NET_TOPICS, 'frameNet');

/* ═══════════════════════════════════════════
 * 第四章 · 纵向泳道（循序渐进）
 * 鸟瞰 → 结构 → 暴露/通道 → 横切 → 实践 → Stream 收束
 * ═══════════════════════════════════════════ */
const XRK_TOPICS = laneBlockPositions(
  [
    /* L0 入口：最小路径 → 环境清单 → 鸟瞰 → 全景 */
    ['xrk-min-path', 'xrk-deploy-env', 'xrk-overview', 'xrk-biz-map'],
    /* L1 结构：Runtime / Core / 插件 / 语言栈 */
    ['xrk-runtime', 'xrk-core-layout', 'xrk-plugin-arch', 'xrk-language-stack'],
    /* L2 暴露与通道 */
    [
      'xrk-tasker-channels',
      'xrk-events',
      'xrk-http-www',
      'xrk-subserver',
      'xrk-http-auth',
    ],
    /* L3 横切基建 */
    ['xrk-config', 'xrk-database', 'xrk-factory-llm', 'xrk-mcp-ops'],
    /* L4 动手 */
    ['xrk-lab-plugin', 'xrk-lab-http', 'xrk-lab-config', 'xrk-lab-subserver'],
    /* L5 汇合 → 第五章 */
    ['xrk-stream', 'xrk-chat-pipeline', 'xrk-agent-workspace'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(XRK_TOPICS, 'frameXrk');

/* ═══════════════════════════════════════════
 * 第五章 · 循序渐进蛇形
 * 导读 → 计算基础 → 产品与行动 → 知识 → 协议与驯服
 * ═══════════════════════════════════════════ */
const AI_SNAKE = snakeRowPositions(
  [
    [
      'ai-what',
      'ai-llm-era',
      'ai-model-types',
      'ai-token-context',
      'ai-attention',
      'ai-transformer',
      'ai-arch-beyond',
      'ai-adaptation',
    ],
    [
      'ai-finetune',
      'ai-chat-era',
      'ai-openai-protocol',
      'ai-embedding',
      'ai-rag',
      'ai-tool-calling',
      'ai-mcp',
      'ai-protocol-forks',
    ],
    [
      'ai-agent-birth',
      'ai-agent-graph',
      'ai-agentic-rag',
      'ai-rag-shift',
      'ai-rules',
      'ai-skills',
      'ai-subagent',
      'ai-cli',
      'ai-agents-md',
    ],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, rowGap: LANE_GAP + 40 }
);
/* 旁支：Pi 脚手架（非主干先修）——挂在 CLI 下方 */
AI_SNAKE['ai-pi-agent'] = {
  x: AI_SNAKE['ai-cli'].x,
  y: AI_SNAKE['ai-cli'].y + CARD_ROW + 48,
};
assertNoCardOverlap(AI_SNAKE, 'frameAi');
/* ═══════════════════════════════════════════
 * 番外 Clash · 短链
 * ═══════════════════════════════════════════ */
const CLASH_TOPICS = chainRowPositions(
  ['clash', 'clash-port', 'clash-setup'],
  { x: ORIGIN_X, y: TOP, gap: CARD_COL }
);
assertNoCardOverlap(CLASH_TOPICS, 'frameClash');

/* ═══════════════════════════════════════════
 * 番外 · 数据库
 * 本质/服务/中间件 → 版图 → 各产品分课
 * ═══════════════════════════════════════════ */
const DB_TOPICS = laneBlockPositions(
  [
    ['db-essence', 'db-as-service', 'db-middleware'],
    ['db-landscape', 'db-sql-hands-on'],
    ['db-redis', 'db-sqlite', 'db-mongodb'],
    ['db-postgresql', 'db-mysql', 'db-others'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(DB_TOPICS, 'frameDb');

/* ═══════════════════════════════════════════
 * 番外 · 工程素养（调试 / 安全 / 测试）
 * ═══════════════════════════════════════════ */
const CRAFT_TOPICS = chainRowPositions(
  ['craft-debug', 'craft-security', 'craft-testing', 'craft-observability', 'craft-ci'],
  { x: ORIGIN_X, y: TOP, gap: CARD_COL }
);
assertNoCardOverlap(CRAFT_TOPICS, 'frameCraft');

/* ═══════════════════════════════════════════
 * 番外 · 数据结构与算法
 * ═══════════════════════════════════════════ */
const DSA_TOPICS = laneBlockPositions(
  [
    ['dsa-complexity', 'dsa-linear', 'dsa-hash'],
    ['dsa-tree', 'dsa-graph', 'dsa-sort'],
    ['dsa-dp', 'dsa-hot'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(DSA_TOPICS, 'frameDsa');

/* ═══════════════════════════════════════════
 * 番外 · 主机面板（宝塔 / 1Panel）
 * ═══════════════════════════════════════════ */
const PANEL_TOPICS = laneBlockPositions(
  [
    ['panel-essence', 'panel-baota', 'panel-1panel'],
    ['panel-compare', 'panel-run-node'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(PANEL_TOPICS, 'framePanel');

/* ═══════════════════════════════════════════
 * 番外 · 主机运维（systemd / TLS / 备份）
 * ═══════════════════════════════════════════ */
const HOST_TOPICS = chainRowPositions(
  ['host-systemd', 'host-tls', 'host-backup'],
  { x: ORIGIN_X, y: TOP, gap: CARD_COL }
);
assertNoCardOverlap(HOST_TOPICS, 'frameHost');

/* ═══════════════════════════════════════════
 * 番外 · AI 编程工具（Cursor / Claude Code / Codex…）
 * ═══════════════════════════════════════════ */
const ADEV_TOPICS = laneBlockPositions(
  [['adev-vibe-coding', 'adev-compare', 'adev-project-memory']],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(ADEV_TOPICS, 'frameAdev');

/* ═══════════════════════════════════════════
 * 番外 · 容器（交付隔离；网关在第三章）
 * ═══════════════════════════════════════════ */
const OPS_TOPICS = laneBlockPositions(
  [
    ['ops-container', 'ops-docker', 'ops-compose'],
    ['ops-others'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(OPS_TOPICS, 'frameOps');

/* ═══════════════════════════════════════════
 * 番外 · 本机目录（Users / FHS / 点文件）
 * ═══════════════════════════════════════════ */
const FS_TOPICS = chainRowPositions(
  ['fs-layout', 'fs-dotfiles'],
  { x: ORIGIN_X, y: TOP, gap: CARD_COL }
);
assertNoCardOverlap(FS_TOPICS, 'frameFs');

/* ═══════════════════════════════════════════
 * 番外 · ESP32
 * ═══════════════════════════════════════════ */
const ESP_TOPICS = laneBlockPositions(
  [
    ['esp-mcu', 'esp-esp32'],
    ['esp-toolchain', 'esp-link'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(ESP_TOPICS, 'frameEsp');

/* —— 包围盒 → 章框尺寸 —— */
function boundsOf(map) {
  const xs = Object.values(map).map((p) => p.x);
  const ys = Object.values(map).map((p) => p.y);
  return {
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  };
}

const machineB = boundsOf(MACHINE_TOPICS);
const envB = boundsOf(ENV_TOPICS);
const codeB = boundsOf(CODE_TOPICS);
const langB = boundsOf(LANG_TOPICS);
const netB = boundsOf(NET_TOPICS);
const xrkB = boundsOf(XRK_TOPICS);
const aiB = boundsOf(AI_SNAKE);
const clashB = boundsOf(CLASH_TOPICS);
const dbB = boundsOf(DB_TOPICS);
const opsB = boundsOf(OPS_TOPICS);
const fsB = boundsOf(FS_TOPICS);
const espB = boundsOf(ESP_TOPICS);
const craftB = boundsOf(CRAFT_TOPICS);
const dsaB = boundsOf(DSA_TOPICS);
const panelB = boundsOf(PANEL_TOPICS);
const hostB = boundsOf(HOST_TOPICS);
const adevB = boundsOf(ADEV_TOPICS);

const PAD_W = CARD_W + 100;
const PAD_H = CARD_H + 140;
const FRAME_GAP = 100;

function frameBox(b) {
  return {
    w: Math.ceil(b.maxX + PAD_W),
    h: Math.ceil(b.maxY + PAD_H),
  };
}

const S = {
  machine: frameBox(machineB),
  env: frameBox(envB),
  code: frameBox(codeB),
  lang: frameBox(langB),
  net: frameBox(netB),
  xrk: frameBox(xrkB),
  ai: frameBox(aiB),
  clash: frameBox(clashB),
  db: frameBox(dbB),
  ops: frameBox(opsB),
  fs: frameBox(fsB),
  esp: frameBox(espB),
  craft: frameBox(craftB),
  dsa: frameBox(dsaB),
  panel: frameBox(panelB),
  host: frameBox(hostB),
  adev: frameBox(adevB),
};

function framesOverlap(a, sa, b, sb, pad = 24) {
  return !(
    a.x + sa.w + pad <= b.x ||
    b.x + sb.w + pad <= a.x ||
    a.y + sa.h + pad <= b.y ||
    b.y + sb.h + pad <= a.y
  );
}

/**
 * 章框锚点：XRK-AGT 为中心枢纽；正章环绕；番外贴亲和章，缩短跨章边。
 *
 * ```
 *              [······语言······]
 *         [编程基础]              [DSA]
 *   [序章] [环境····]        [XRK] [AI]
 *    [ESP] [容器][本机目录]        [工程素养][AI编程工具]
 *          [网络····]     [面板][主机运维]
 *          [Clash]        [数据库]
 * ```
 */
const FRAME_XRK = { x: 0, y: 0 };

/* 先定环境，编程压在环境上方，语言再压在编程上方 */
const FRAME_ENV = {
  x: FRAME_XRK.x - S.env.w - FRAME_GAP,
  y: FRAME_XRK.y,
};

const FRAME_CODE = {
  x: FRAME_ENV.x,
  y: FRAME_ENV.y - S.code.h - FRAME_GAP,
};

const envXrkSpan = S.env.w + FRAME_GAP + S.xrk.w;
const FRAME_LANG = {
  x: FRAME_ENV.x + Math.floor((envXrkSpan - S.lang.w) / 2),
  y: FRAME_CODE.y - S.lang.h - FRAME_GAP,
};

const FRAME_AI = {
  x: FRAME_XRK.x + S.xrk.w + FRAME_GAP,
  y: FRAME_XRK.y + 80,
};

const FRAME_CRAFT = {
  x: FRAME_AI.x,
  y: FRAME_AI.y + S.ai.h + FRAME_GAP,
};

/* AI 编程工具：贴工程素养下方（同属「怎么用 AI 干活」） */
const FRAME_ADEV = {
  x: FRAME_CRAFT.x,
  y: FRAME_CRAFT.y + S.craft.h + FRAME_GAP,
};

const FRAME_DSA = {
  x: FRAME_LANG.x - S.dsa.w - FRAME_GAP,
  y: FRAME_LANG.y,
};

/* 序章在环境左侧（同高） */
const FRAME_MACHINE = {
  x: FRAME_ENV.x - S.machine.w - FRAME_GAP,
  y: FRAME_ENV.y,
};

const FRAME_ESP = {
  x: FRAME_MACHINE.x + Math.floor((S.machine.w - S.esp.w) / 2),
  y: FRAME_MACHINE.y + S.machine.h + FRAME_GAP,
};

const FRAME_OPS = {
  x: FRAME_ENV.x,
  y: FRAME_ENV.y + S.env.h + FRAME_GAP,
};

/* 本机目录：容器右侧同高，缩短与环境章的认知距离 */
const FRAME_FS = {
  x: FRAME_OPS.x + S.ops.w + FRAME_GAP,
  y: FRAME_OPS.y,
};

const FRAME_NET = {
  x: FRAME_XRK.x - S.net.w - FRAME_GAP,
  y: FRAME_OPS.y + S.ops.h + FRAME_GAP,
};

const FRAME_CLASH = {
  x: FRAME_NET.x,
  y: FRAME_NET.y + S.net.h + FRAME_GAP,
};

/* 面板：贴网络右侧，缩短与反代/边缘的认知距离 */
const FRAME_PANEL = {
  x: FRAME_NET.x + S.net.w + FRAME_GAP,
  y: FRAME_NET.y,
};

const FRAME_HOST = {
  x: FRAME_PANEL.x + S.panel.w + FRAME_GAP,
  y: FRAME_PANEL.y,
};

/* 数据库：XRK 正下方，缩短契约桥 */
const FRAME_DB = {
  x: FRAME_XRK.x,
  y: FRAME_XRK.y + S.xrk.h + FRAME_GAP,
};

if (framesOverlap(FRAME_DB, S.db, FRAME_NET, S.net)) {
  FRAME_DB.y = Math.max(FRAME_DB.y, FRAME_NET.y + S.net.h + FRAME_GAP);
}
if (framesOverlap(FRAME_DB, S.db, FRAME_CLASH, S.clash)) {
  FRAME_DB.x = FRAME_CLASH.x + S.clash.w + FRAME_GAP;
  FRAME_DB.y = Math.max(FRAME_DB.y, FRAME_CLASH.y);
}
if (framesOverlap(FRAME_DB, S.db, FRAME_AI, S.ai)) {
  FRAME_DB.x = FRAME_XRK.x;
  FRAME_DB.y = Math.max(FRAME_DB.y, FRAME_AI.y + S.ai.h + FRAME_GAP);
}

if (framesOverlap(FRAME_FS, S.fs, FRAME_XRK, S.xrk)) {
  FRAME_FS.x = FRAME_OPS.x;
  FRAME_FS.y = FRAME_OPS.y + S.ops.h + FRAME_GAP;
}
if (framesOverlap(FRAME_FS, S.fs, FRAME_NET, S.net)) {
  FRAME_FS.x = FRAME_NET.x + S.net.w + FRAME_GAP;
  FRAME_FS.y = FRAME_OPS.y;
}
if (framesOverlap(FRAME_FS, S.fs, FRAME_DB, S.db)) {
  FRAME_FS.y = Math.min(FRAME_FS.y, FRAME_DB.y - S.fs.h - FRAME_GAP);
  if (FRAME_FS.y < FRAME_OPS.y) {
    FRAME_FS.y = FRAME_OPS.y;
    FRAME_FS.x = FRAME_OPS.x + S.ops.w + FRAME_GAP;
  }
}
if (framesOverlap(FRAME_FS, S.fs, FRAME_XRK, S.xrk) || framesOverlap(FRAME_FS, S.fs, FRAME_DB, S.db)) {
  FRAME_FS.x = FRAME_OPS.x + S.ops.w + FRAME_GAP;
  FRAME_FS.y = FRAME_OPS.y + Math.max(S.ops.h, S.fs.h) + FRAME_GAP;
  if (framesOverlap(FRAME_FS, S.fs, FRAME_NET, S.net)) {
    FRAME_FS.y = FRAME_NET.y + S.net.h + FRAME_GAP;
  }
}

if (
  framesOverlap(FRAME_ESP, S.esp, FRAME_ENV, S.env) ||
  framesOverlap(FRAME_ESP, S.esp, FRAME_OPS, S.ops) ||
  framesOverlap(FRAME_ESP, S.esp, FRAME_NET, S.net) ||
  framesOverlap(FRAME_ESP, S.esp, FRAME_FS, S.fs)
) {
  FRAME_ESP.x = FRAME_MACHINE.x;
  FRAME_ESP.y = FRAME_MACHINE.y + S.machine.h + FRAME_GAP;
}

if (framesOverlap(FRAME_LANG, S.lang, FRAME_MACHINE, S.machine)) {
  FRAME_LANG.x = FRAME_MACHINE.x + S.machine.w + FRAME_GAP;
}

if (framesOverlap(FRAME_CODE, S.code, FRAME_MACHINE, S.machine)) {
  FRAME_CODE.x = FRAME_ENV.x;
  FRAME_CODE.y = FRAME_ENV.y - S.code.h - FRAME_GAP;
}

if (framesOverlap(FRAME_DSA, S.dsa, FRAME_MACHINE, S.machine)) {
  FRAME_DSA.x = FRAME_LANG.x;
  FRAME_DSA.y = FRAME_LANG.y + S.lang.h + FRAME_GAP;
}
if (framesOverlap(FRAME_DSA, S.dsa, FRAME_CODE, S.code)) {
  FRAME_DSA.x = FRAME_LANG.x + S.lang.w + FRAME_GAP;
  FRAME_DSA.y = FRAME_LANG.y;
}
if (framesOverlap(FRAME_DSA, S.dsa, FRAME_LANG, S.lang)) {
  FRAME_DSA.y = FRAME_LANG.y + S.lang.h + FRAME_GAP;
  FRAME_DSA.x = FRAME_LANG.x;
}

if (framesOverlap(FRAME_CRAFT, S.craft, FRAME_DB, S.db)) {
  FRAME_CRAFT.y = Math.max(FRAME_CRAFT.y, FRAME_DB.y + S.db.h + FRAME_GAP);
}
if (framesOverlap(FRAME_CRAFT, S.craft, FRAME_AI, S.ai)) {
  FRAME_CRAFT.y = FRAME_AI.y + S.ai.h + FRAME_GAP;
}

if (framesOverlap(FRAME_PANEL, S.panel, FRAME_XRK, S.xrk)) {
  FRAME_PANEL.x = FRAME_NET.x;
  FRAME_PANEL.y = FRAME_CLASH.y + S.clash.h + FRAME_GAP;
}
if (framesOverlap(FRAME_PANEL, S.panel, FRAME_DB, S.db)) {
  FRAME_PANEL.y = Math.max(FRAME_PANEL.y, FRAME_DB.y + S.db.h + FRAME_GAP);
}
if (framesOverlap(FRAME_PANEL, S.panel, FRAME_CLASH, S.clash)) {
  FRAME_PANEL.x = FRAME_CLASH.x + S.clash.w + FRAME_GAP;
  FRAME_PANEL.y = FRAME_NET.y;
}
if (framesOverlap(FRAME_HOST, S.host, FRAME_PANEL, S.panel)) {
  FRAME_HOST.x = FRAME_PANEL.x + S.panel.w + FRAME_GAP;
  FRAME_HOST.y = FRAME_PANEL.y;
}
if (framesOverlap(FRAME_HOST, S.host, FRAME_DB, S.db) || framesOverlap(FRAME_HOST, S.host, FRAME_XRK, S.xrk)) {
  FRAME_HOST.x = FRAME_PANEL.x;
  FRAME_HOST.y = FRAME_PANEL.y + S.panel.h + FRAME_GAP;
}

if (framesOverlap(FRAME_ADEV, S.adev, FRAME_CRAFT, S.craft)) {
  FRAME_ADEV.y = FRAME_CRAFT.y + S.craft.h + FRAME_GAP;
}
if (framesOverlap(FRAME_ADEV, S.adev, FRAME_DB, S.db)) {
  FRAME_ADEV.x = FRAME_CRAFT.x + Math.max(S.craft.w, S.adev.w) + FRAME_GAP;
  FRAME_ADEV.y = FRAME_CRAFT.y;
}
if (framesOverlap(FRAME_ADEV, S.adev, FRAME_AI, S.ai)) {
  FRAME_ADEV.y = Math.max(FRAME_ADEV.y, FRAME_AI.y + S.ai.h + FRAME_GAP);
}

const FRAME_PLACES = [
  ['machine', FRAME_MACHINE, S.machine],
  ['env', FRAME_ENV, S.env],
  ['code', FRAME_CODE, S.code],
  ['lang', FRAME_LANG, S.lang],
  ['net', FRAME_NET, S.net],
  ['xrk', FRAME_XRK, S.xrk],
  ['ai', FRAME_AI, S.ai],
  ['clash', FRAME_CLASH, S.clash],
  ['db', FRAME_DB, S.db],
  ['ops', FRAME_OPS, S.ops],
  ['fs', FRAME_FS, S.fs],
  ['esp', FRAME_ESP, S.esp],
  ['craft', FRAME_CRAFT, S.craft],
  ['dsa', FRAME_DSA, S.dsa],
  ['panel', FRAME_PANEL, S.panel],
  ['host', FRAME_HOST, S.host],
  ['adev', FRAME_ADEV, S.adev],
];

for (let i = 0; i < FRAME_PLACES.length; i++) {
  for (let j = i + 1; j < FRAME_PLACES.length; j++) {
    const [na, pa, sa] = FRAME_PLACES[i];
    const [nb, pb, sb] = FRAME_PLACES[j];
    if (framesOverlap(pa, sa, pb, sb)) {
      throw new Error(
        `[layout frames] 章框重叠: ${na}@(${pa.x},${pa.y}) × ${nb}@(${pb.x},${pb.y})`
      );
    }
  }
}

/* 画布原点归一：左上留边 */
{
  const minX = Math.min(...FRAME_PLACES.map(([, p]) => p.x));
  const minY = Math.min(...FRAME_PLACES.map(([, p]) => p.y));
  const shiftX = 40 - minX;
  const shiftY = 40 - minY;
  for (const [, p] of FRAME_PLACES) {
    p.x += shiftX;
    p.y += shiftY;
  }
}

export const LAYOUT = {
  frameMachine: {
    ...FRAME_MACHINE,
    width: Math.ceil(machineB.maxX + PAD_W),
    height: Math.ceil(machineB.maxY + PAD_H),
  },
  frameEnv: {
    ...FRAME_ENV,
    width: Math.ceil(envB.maxX + PAD_W),
    height: Math.ceil(envB.maxY + PAD_H),
  },
  frameCode: {
    ...FRAME_CODE,
    width: Math.ceil(codeB.maxX + PAD_W),
    height: Math.ceil(codeB.maxY + PAD_H),
  },
  frameLang: {
    ...FRAME_LANG,
    width: Math.ceil(langB.maxX + PAD_W),
    height: Math.ceil(langB.maxY + PAD_H),
  },
  frameNet: {
    ...FRAME_NET,
    width: Math.ceil(netB.maxX + PAD_W),
    height: Math.ceil(netB.maxY + PAD_H),
  },
  frameXrk: {
    ...FRAME_XRK,
    width: Math.ceil(xrkB.maxX + PAD_W),
    height: Math.ceil(xrkB.maxY + PAD_H),
  },
  frameAi: {
    ...FRAME_AI,
    width: Math.ceil(aiB.maxX + PAD_W),
    height: Math.ceil(aiB.maxY + PAD_H),
  },
  frameClash: {
    ...FRAME_CLASH,
    width: Math.ceil(clashB.maxX + PAD_W),
    height: Math.ceil(clashB.maxY + PAD_H),
  },
  frameDb: {
    ...FRAME_DB,
    width: Math.ceil(dbB.maxX + PAD_W),
    height: Math.ceil(dbB.maxY + PAD_H),
  },
  frameOps: {
    ...FRAME_OPS,
    width: Math.ceil(opsB.maxX + PAD_W),
    height: Math.ceil(opsB.maxY + PAD_H),
  },
  frameFs: {
    ...FRAME_FS,
    width: Math.ceil(fsB.maxX + PAD_W),
    height: Math.ceil(fsB.maxY + PAD_H),
  },
  frameEsp: {
    ...FRAME_ESP,
    width: Math.ceil(espB.maxX + PAD_W),
    height: Math.ceil(espB.maxY + PAD_H),
  },
  frameCraft: {
    ...FRAME_CRAFT,
    width: Math.ceil(craftB.maxX + PAD_W),
    height: Math.ceil(craftB.maxY + PAD_H),
  },
  frameDsa: {
    ...FRAME_DSA,
    width: Math.ceil(dsaB.maxX + PAD_W),
    height: Math.ceil(dsaB.maxY + PAD_H),
  },
  framePanel: {
    ...FRAME_PANEL,
    width: Math.ceil(panelB.maxX + PAD_W),
    height: Math.ceil(panelB.maxY + PAD_H),
  },
  frameHost: {
    ...FRAME_HOST,
    width: Math.ceil(hostB.maxX + PAD_W),
    height: Math.ceil(hostB.maxY + PAD_H),
  },
  frameAdev: {
    ...FRAME_ADEV,
    width: Math.ceil(adevB.maxX + PAD_W),
    height: Math.ceil(adevB.maxY + PAD_H),
  },

  topics: {
    ...MACHINE_TOPICS,
    ...ENV_TOPICS,
    ...CODE_TOPICS,
    ...LANG_TOPICS,
    ...NET_TOPICS,
    ...XRK_TOPICS,
    ...AI_SNAKE,
    ...CLASH_TOPICS,
    ...DB_TOPICS,
    ...OPS_TOPICS,
    ...FS_TOPICS,
    ...ESP_TOPICS,
    ...CRAFT_TOPICS,
    ...DSA_TOPICS,
    ...PANEL_TOPICS,
    ...HOST_TOPICS,
    ...ADEV_TOPICS,
  },
};

export const LAYOUT_META = {
  CARD_W,
  CARD_H,
  CARD_COL,
  CARD_ROW,
  LANE_GAP,
  strategy: {
    machine: 'spineForkMerge · left of env',
    env: 'pipelineColumns · left of XRK',
    code: 'pipelineColumns · above env',
    lang: 'lanes+hubGrid · above code',
    net: 'pipelineColumns · left column',
    xrk: 'laneBlock · canvas hub',
    ai: 'snake · right of XRK',
    clash: 'chain · under net',
    db: 'laneBlock · under XRK',
    ops: 'laneBlock · under env',
    fs: 'chain · right of ops',
    esp: 'laneBlock · under machine',
    craft: 'chain · under AI',
    dsa: 'laneBlock · by lang',
    panel: 'laneBlock · right of net',
    host: 'chain · right of panel',
    adev: 'laneBlock · under craft',
  },
  MACHINE_TOPICS,
  ENV_TOPICS,
  CODE_TOPICS,
  LANG_TOPICS,
  NET_TOPICS,
  XRK_TOPICS,
  AI_SNAKE,
  CLASH_TOPICS,
  DB_TOPICS,
  OPS_TOPICS,
  FS_TOPICS,
  ESP_TOPICS,
  CRAFT_TOPICS,
  DSA_TOPICS,
  PANEL_TOPICS,
  HOST_TOPICS,
  ADEV_TOPICS,
};

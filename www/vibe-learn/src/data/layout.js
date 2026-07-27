/**
 * 章框与卡片布局 — 循序渐进的思维导图式分布。
 *
 * 原则（见 layout-from-edges.js）：
 * 1. 方块迁就边；有边应相邻
 * 2. 按「故事」选模式，禁止一律填格
 * 3. 间距 ≥ CARD_W/H + gutter；assertNoCardOverlap
 *
 * 各章模式：
 * | 章 | 模式 | 读法 |
 * |----|------|------|
 * | 序章 | spineForkMerge | 入口 → 双支 → 汇合 |
 * | 环境 | pipelineColumns | 左→右工具链，上下成对 |
 * | 语言 | 分区泳道 + hub-grid | 概念→版图扇出→框架→落地 |
 * | 网络 | pipelineColumns | 入口→协议→分层→HTTP→边缘 |
 * | XRK  | laneBlock 泳道 | 鸟瞰→结构→暴露→横切→实践→Stream |
 * | AI   | snake | 时间线折返 |
 * | 番外 | chain | 短链 |
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
    'xrk-first-run',
  ],
  { originX: ORIGIN_X, originY: 240, colGap: CARD_COL, pairGap: PIPE_PAIR }
);
assertNoCardOverlap(ENV_TOPICS, 'frameEnv');

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
    'http-web',
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
    /* L0 入口：环境清单 → 鸟瞰 → 全景 */
    ['xrk-deploy-env', 'xrk-overview', 'xrk-biz-map'],
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
    ['xrk-lab-plugin', 'xrk-lab-subserver'],
    /* L5 汇合 → 第五章 */
    ['xrk-stream'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(XRK_TOPICS, 'frameXrk');

/* ═══════════════════════════════════════════
 * 第五章 · 蛇形时间线（已最优，略增行距）
 * ═══════════════════════════════════════════ */
const AI_SNAKE = snakeRowPositions(
  [
    [
      'ai-what',
      'ai-llm-era',
      'ai-model-types',
      'ai-arch-beyond',
      'ai-transformer',
      'ai-finetune',
      'ai-chat-era',
    ],
    [
      'ai-openai-protocol',
      'ai-tool-calling',
      'ai-agent-birth',
      'ai-rag',
      'ai-agentic-rag',
      'ai-rag-shift',
      'ai-mcp',
    ],
    [
      'ai-protocol-forks',
      'ai-rules',
      'ai-skills',
      'ai-subagent',
      'ai-cli',
      'ai-agents-md',
    ],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, rowGap: LANE_GAP + 40 }
);
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
    ['db-landscape'],
    ['db-redis', 'db-sqlite', 'db-mongodb'],
    ['db-postgresql', 'db-mysql', 'db-others'],
  ],
  { originX: ORIGIN_X, originY: TOP, colGap: CARD_COL, laneGap: LANE_GAP }
);
assertNoCardOverlap(DB_TOPICS, 'frameDb');

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
const langB = boundsOf(LANG_TOPICS);
const netB = boundsOf(NET_TOPICS);
const xrkB = boundsOf(XRK_TOPICS);
const aiB = boundsOf(AI_SNAKE);
const clashB = boundsOf(CLASH_TOPICS);
const dbB = boundsOf(DB_TOPICS);
const opsB = boundsOf(OPS_TOPICS);
const espB = boundsOf(ESP_TOPICS);

const PAD_W = CARD_W + 100;
const PAD_H = CARD_H + 140;

/** 章框在画布上的锚点：上→下主线，语言/XRK 靠右，循序不叠框 */
const FRAME_MACHINE = { x: 40, y: -1180 };
const FRAME_ENV = { x: 40, y: -540 };
const FRAME_LANG = { x: 40 + Math.ceil(envB.maxX + PAD_W) + 80, y: -540 };
const FRAME_NET = { x: 40, y: 280 };
const FRAME_XRK = {
  x: FRAME_LANG.x + Math.ceil(langB.maxX + PAD_W) + 80,
  y: 200,
};
const FRAME_AI = { x: 40, y: 1160 };
const FRAME_CLASH = {
  x: 80,
  y: FRAME_AI.y + Math.ceil(aiB.maxY + PAD_H) + 60,
};
const FRAME_DB = {
  x: FRAME_CLASH.x + Math.ceil(clashB.maxX + PAD_W) + 80,
  y: FRAME_CLASH.y,
};
const FRAME_OPS = {
  x: FRAME_DB.x + Math.ceil(dbB.maxX + PAD_W) + 80,
  y: FRAME_CLASH.y,
};
const FRAME_ESP = {
  x: FRAME_CLASH.x,
  y: FRAME_CLASH.y + Math.ceil(Math.max(clashB.maxY, dbB.maxY, opsB.maxY) + PAD_H) + 60,
};

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
  frameEsp: {
    ...FRAME_ESP,
    width: Math.ceil(espB.maxX + PAD_W),
    height: Math.ceil(espB.maxY + PAD_H),
  },

  topics: {
    ...MACHINE_TOPICS,
    ...ENV_TOPICS,
    ...LANG_TOPICS,
    ...NET_TOPICS,
    ...XRK_TOPICS,
    ...AI_SNAKE,
    ...CLASH_TOPICS,
    ...DB_TOPICS,
    ...OPS_TOPICS,
    ...ESP_TOPICS,
  },
};

export const LAYOUT_META = {
  CARD_W,
  CARD_H,
  CARD_COL,
  CARD_ROW,
  LANE_GAP,
  strategy: {
    machine: 'spineForkMerge',
    env: 'pipelineColumns',
    lang: 'lanes+hubGrid',
    net: 'pipelineColumns',
    xrk: 'laneBlock',
    ai: 'snake',
    clash: 'chain',
    db: 'laneBlock',
    ops: 'laneBlock',
    esp: 'laneBlock',
  },
  MACHINE_TOPICS,
  ENV_TOPICS,
  LANG_TOPICS,
  NET_TOPICS,
  XRK_TOPICS,
  AI_SNAKE,
  CLASH_TOPICS,
  DB_TOPICS,
  OPS_TOPICS,
  ESP_TOPICS,
};

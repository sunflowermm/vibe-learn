import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-pnpm-cmd",
  title: "基础 · pnpm / Corepack 全表",
  kind: 'concept',
  domain: "ops",
  tags: ["pnpm","Node","基础"],
  relatedNodes: ["package-managers","runtime-nodejs","xrk-first-run"],
  caption: "本仓包管理约定：corepack → pnpm install/run/lock。",
  questions: [
  {
    "id": "concept-pnpm-cmd:corepack",
    "q": "启用 Corepack 以便用项目锁定的 pnpm？",
    "choices": [
      {
        "t": "corepack enable",
        "ok": true,
        "why": "corepack enable：启用 Node 自带的包管理器管理，便于按 packageManager 字段用 pnpm。"
      },
      {
        "t": "npm disable-corepack 启用",
        "ok": false,
        "why": "与「corepack enable」不符。"
      },
      {
        "t": "pnpm enable-corepack 唯一官方名",
        "ok": false,
        "why": "与「corepack enable」不符。"
      },
      {
        "t": "npx corepack-off",
        "ok": false,
        "why": "与「corepack enable」不符。"
      }
    ],
    "relatedNodes": [
      "package-managers",
      "runtime-nodejs"
    ],
    "tags": [
      "基础",
      "corepack"
    ]
  },
  {
    "id": "concept-pnpm-cmd:install",
    "q": "安装项目依赖（本仓）？",
    "choices": [
      {
        "t": "pnpm install",
        "ok": true,
        "why": "pnpm install：按 lockfile 安装依赖。本仓默认包管理命令。"
      },
      {
        "t": "必须混用 npm/yarn 各装一遍",
        "ok": false,
        "why": "与「pnpm install」不符。"
      },
      {
        "t": "pnpm uninstall 安装",
        "ok": false,
        "why": "与「pnpm install」不符。"
      },
      {
        "t": "corepack install-deps",
        "ok": false,
        "why": "与「pnpm install」不符。"
      }
    ],
    "relatedNodes": [
      "package-managers",
      "xrk-first-run"
    ],
    "tags": [
      "基础",
      "install"
    ]
  },
  {
    "id": "concept-pnpm-cmd:run",
    "q": "执行 package.json 里的脚本？",
    "choices": [
      {
        "t": "pnpm run <name>",
        "ok": true,
        "why": "pnpm run <script>：执行 package.json scripts。"
      },
      {
        "t": "pnpm play <name>",
        "ok": false,
        "why": "与「pnpm run」不符。"
      },
      {
        "t": "npm 是本仓唯一允许",
        "ok": false,
        "why": "与「pnpm run」不符。"
      },
      {
        "t": "node run <name> 读 scripts",
        "ok": false,
        "why": "与「pnpm run」不符。"
      }
    ],
    "relatedNodes": [
      "package-managers"
    ],
    "tags": [
      "基础",
      "run"
    ]
  },
  {
    "id": "concept-pnpm-cmd:frozen",
    "q": "CI 安装且禁止改 lock？",
    "choices": [
      {
        "t": "pnpm install --frozen-lockfile",
        "ok": true,
        "why": "pnpm install --frozen-lockfile：CI 禁止更新 lockfile，锁不一致则失败。"
      },
      {
        "t": "pnpm install --force-update-lock",
        "ok": false,
        "why": "与「pnpm install --frozen-lockfile」不符。"
      },
      {
        "t": "npm install --thaw",
        "ok": false,
        "why": "与「pnpm install --frozen-lockfile」不符。"
      },
      {
        "t": "yarn unlock",
        "ok": false,
        "why": "与「pnpm install --frozen-lockfile」不符。"
      }
    ],
    "relatedNodes": [
      "package-managers",
      "craft-ci"
    ],
    "tags": [
      "基础",
      "frozen"
    ]
  },
  {
    "id": "concept-pnpm-cmd:lock",
    "q": "pnpm 的锁文件名？",
    "choices": [
      {
        "t": "pnpm-lock.yaml",
        "ok": true,
        "why": "pnpm-lock.yaml：依赖精确版本锁；应提交进仓保证可复现。"
      },
      {
        "t": "package-lock.json 是 pnpm 锁",
        "ok": false,
        "why": "与「pnpm-lock.yaml」不符。"
      },
      {
        "t": "yarn.lock 是 pnpm 锁",
        "ok": false,
        "why": "与「pnpm-lock.yaml」不符。"
      },
      {
        "t": "不必提交锁文件",
        "ok": false,
        "why": "与「pnpm-lock.yaml」不符。"
      }
    ],
    "relatedNodes": [
      "package-managers"
    ],
    "tags": [
      "基础",
      "lock"
    ]
  },
  {
    "id": "concept-pnpm-cmd:npx",
    "q": "临时执行某 npm 包 CLI？",
    "choices": [
      {
        "t": "npx <pkg>（或 pnpm dlx / pnpm exec）",
        "ok": true,
        "why": "npx：执行 npm 包中的二进制（临时或本地）。与 pnpm exec/dlx 同类需求。"
      },
      {
        "t": "npx 只能装系统 apt 包",
        "ok": false,
        "why": "与「npx」不符。"
      },
      {
        "t": "npx 等于 rm -rf node_modules",
        "ok": false,
        "why": "与「npx」不符。"
      },
      {
        "t": "npx 替代 git",
        "ok": false,
        "why": "与「npx」不符。"
      }
    ],
    "relatedNodes": [
      "package-managers",
      "runtime-nodejs"
    ],
    "tags": [
      "基础",
      "npx"
    ]
  }
],
});

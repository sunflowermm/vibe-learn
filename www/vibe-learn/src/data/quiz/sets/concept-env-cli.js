import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-env-cli",
  title: "概念 · 环境变量与 PATH（基础→进阶）",
  kind: "concept",
  domain: "craft",
  tags: ["环境变量","PATH","代理","指令","基础","进阶"],
  relatedNodes: ["data-env","linux-cli","terminal-worlds","fs-layout","fs-dotfiles","craft-ci","craft-security","lang-powershell"],
  caption: "路径、一次性注入、CI、PowerShell、NODE_ENV——名词见环境变量全表。",
  questions: [
  {
    "id": "concept-env-cli:q2",
    "q": "打印当前环境变量列表（Linux）？",
    "choices": [
      {
        "t": "env 或 printenv",
        "ok": true,
        "why": "菜鸟 env：查看/在定制环境跑命令。"
      },
      {
        "t": "npm env 必列出系统全部变量",
        "ok": false,
        "why": "npm 配置命令看的是 npm 自身配置，不是完整 process 环境转储的替代。"
      },
      {
        "t": "lsenv",
        "ok": false,
        "why": "不是标准工具名；系统侧用 env/printenv。"
      },
      {
        "t": "git env",
        "ok": false,
        "why": "Git 无此子命令来列出 OS 环境块。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q3",
    "q": "路径 `/home/u/proj` 与 `./src` 的差别？",
    "choices": [
      {
        "t": "前者常为绝对路径（从根说起）；后者相对当前工作目录——cwd 一变，相对路径指向就变",
        "ok": true,
        "why": "脚本与文档里写错相对路径是「我这边能跑」高频原因。"
      },
      {
        "t": "二者与文件系统无关，只是装饰",
        "ok": false,
        "why": "路径就是定位文件的方式。"
      },
      {
        "t": "绝对路径只能用在 Windows",
        "ok": false,
        "why": "Unix 以 / 开头同样是绝对路径。"
      },
      {
        "t": "相对路径永远比绝对路径更安全且不可变",
        "ok": false,
        "why": "相对路径依赖 cwd；换目录就错。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds",
      "fs-layout"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q7",
    "q": "只对「这一条命令」临时注入变量，不改当前 shell？",
    "choices": [
      {
        "t": "env FOO=1 node app.js 或 FOO=1 node app.js",
        "ok": true,
        "why": "仅子进程可见。"
      },
      {
        "t": "git -c 只能设 Git 配置，不能当通用环境注入示例",
        "ok": false,
        "why": "git -c 是 Git 配置；通用注入用 env/前缀赋值。"
      },
      {
        "t": "docker unset",
        "ok": false,
        "why": "无此日常用法。"
      },
      {
        "t": "必须先 unset -a",
        "ok": false,
        "why": "过猛。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q8",
    "q": "Shell 里 `~` 与环境变量 `HOME`（Windows 常对照 `USERPROFILE`）？",
    "choices": [
      {
        "t": "`~` 展开为当前用户家目录；配置与很多工具默认写在家目录下的点文件里",
        "ok": true,
        "why": "跨系统先认「家目录」角色，再记具体路径名。"
      },
      {
        "t": "只有 root 才有家目录",
        "ok": false,
        "why": "普通用户也有。"
      },
      {
        "t": "`~` 永远等于磁盘根目录 `/`",
        "ok": false,
        "why": "根是 `/`；家目录是用户私有空间。"
      },
      {
        "t": "`HOME` 与 PATH 必须设成同一个值",
        "ok": false,
        "why": "语义不同。"
      }
    ],
    "relatedNodes": [
      "fs-layout",
      "fs-dotfiles",
      "terminal-worlds",
      "data-env"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q9",
    "q": "CI 里放模型 API Key，较稳妥？",
    "choices": [
      {
        "t": "CI Secrets / 密文变量注入环境，勿写进仓库 yaml 明文",
        "ok": true,
        "why": "与本地 .env 同一原则。"
      },
      {
        "t": "用 commit message 传递",
        "ok": false,
        "why": "进历史。"
      },
      {
        "t": "写进 README 方便复制",
        "ok": false,
        "why": "泄漏。"
      },
      {
        "t": "写进前端打包后的 JS",
        "ok": false,
        "why": "浏览器可见。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "craft-ci",
      "craft-security"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q10",
    "q": "Windows PowerShell 临时设环境变量（当前会话）？",
    "choices": [
      {
        "t": "$env:HTTPS_PROXY=\"http://127.0.0.1:7890\"",
        "ok": true,
        "why": "PowerShell 环境变量语法。"
      },
      {
        "t": "export HTTPS_PROXY=...（在纯 PowerShell 里总是唯一写法）",
        "ok": false,
        "why": "export 是 Bash；PS 用 $env:。"
      },
      {
        "t": "git config --global http.proxy 替代一切 Node fetch 代理",
        "ok": false,
        "why": "只影响 Git；Node 仍看环境变量/自身配置。"
      },
      {
        "t": "setx 必须每次调试都用且无法改会话",
        "ok": false,
        "why": "setx 写用户持久变量，调试宜用会话级。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "lang-powershell",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q11",
    "q": "NODE_ENV=production 常见工程含义？",
    "choices": [
      {
        "t": "框架/工具按生产模式优化或关闭开发中间件；仍要自己管密钥与日志级别",
        "ok": true,
        "why": "约定而非魔法开关。"
      },
      {
        "t": "设置后自动获得无限 API 额度",
        "ok": false,
        "why": "否。"
      },
      {
        "t": "等于关闭所有安全校验",
        "ok": false,
        "why": "更应加强。"
      },
      {
        "t": "NODE_ENV 只能是整数",
        "ok": false,
        "why": "字符串约定。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "runtime-nodejs"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-env-cli:q12",
    "q": "dotenv 类库加载 .env 时，更稳妥的习惯？",
    "choices": [
      {
        "t": "仅非生产或明确场景加载；真实密钥勿提交；已存在的环境变量通常不覆盖",
        "ok": true,
        "why": "生产常由编排/面板注入，避免本地文件覆盖线上。"
      },
      {
        "t": "dotenv 会替代 TLS",
        "ok": false,
        "why": "否。"
      },
      {
        "t": "生产必须把 .env 提交进 Git",
        "ok": false,
        "why": "泄漏。"
      },
      {
        "t": "有 dotenv 就不需要 process.env",
        "ok": false,
        "why": "最终仍读 process.env。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "craft-security"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  }
],
});

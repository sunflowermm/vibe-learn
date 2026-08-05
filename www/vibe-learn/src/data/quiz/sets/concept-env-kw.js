import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-env-kw",
  title: "基础 · 环境变量 / .env 全表",
  kind: 'concept',
  domain: "craft",
  tags: ["环境变量",".env","代理","基础"],
  relatedNodes: ["data-env","installers-path","craft-security"],
  caption: "PATH、export、.env、代理变量、process.env——密钥与机器差的地基。",
  questions: [
  {
    "id": "concept-env-kw:env_var",
    "q": "环境变量最贴切的描述？",
    "choices": [
      {
        "t": "对当前进程可见的名值配置，子进程常可继承",
        "ok": true,
        "why": "环境变量：进程可见的「名=值」配置；子进程常继承。密钥、代理、路径等多放这里，勿写进将提交的源码。"
      },
      {
        "t": "只能存在 Git 提交里",
        "ok": false,
        "why": "与「环境变量」不符。"
      },
      {
        "t": "等同 HTTP 响应体",
        "ok": false,
        "why": "与「环境变量」不符。"
      },
      {
        "t": "浏览器 CSS 变量的服务端别名",
        "ok": false,
        "why": "与「环境变量」不符。"
      }
    ],
    "relatedNodes": [
      "data-env"
    ],
    "tags": [
      "基础",
      "env_var"
    ]
  },
  {
    "id": "concept-env-kw:path",
    "q": "PATH 环境变量的作用？",
    "choices": [
      {
        "t": "告诉 shell 到哪些目录找可执行命令",
        "ok": true,
        "why": "PATH：特殊环境变量，列出 shell 搜索可执行文件的目录列表；「command not found」常先查 PATH。"
      },
      {
        "t": "指定 HTTP 代理端口",
        "ok": false,
        "why": "与「PATH」不符。"
      },
      {
        "t": "存放 API Key 的唯一合法位置",
        "ok": false,
        "why": "与「PATH」不符。"
      },
      {
        "t": "Docker 镜像仓库地址",
        "ok": false,
        "why": "与「PATH」不符。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "installers-path"
    ],
    "tags": [
      "基础",
      "path"
    ]
  },
  {
    "id": "concept-env-kw:export",
    "q": "Bash 里 export MY=1 的效果？",
    "choices": [
      {
        "t": "写入当前 shell 环境",
        "ok": true,
        "why": "export：把变量标进当前 shell 环境，供后续子进程继承；关终端会话通常即失效（除非写入配置文件）。"
      },
      {
        "t": "永久写入远程 Git 仓库",
        "ok": false,
        "why": "与「export（shell）」不符。"
      },
      {
        "t": "等同 chmod +x",
        "ok": false,
        "why": "与「export（shell）」不符。"
      },
      {
        "t": "删除 PATH",
        "ok": false,
        "why": "与「export（shell）」不符。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "export"
    ]
  },
  {
    "id": "concept-env-kw:dotenv",
    "q": ".env 文件的正确用法？",
    "choices": [
      {
        "t": "本机密钥与环境差；通常不进 Git",
        "ok": true,
        "why": ".env：本地键值文本，工具可读入变成环境变量；通常含真实密钥，必须 gitignore，勿提交。"
      },
      {
        "t": "应提交生产真实 Key 方便协作",
        "ok": false,
        "why": "与「.env 文件」不符。"
      },
      {
        "t": "替代 TLS 证书",
        "ok": false,
        "why": "与「.env 文件」不符。"
      },
      {
        "t": "只能存 CSS 颜色",
        "ok": false,
        "why": "与「.env 文件」不符。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "craft-security"
    ],
    "tags": [
      "基础",
      "dotenv"
    ]
  },
  {
    "id": "concept-env-kw:dotenv_example",
    "q": ".env.example 相对 .env？",
    "choices": [
      {
        "t": "可提交的键名/假值模板，不含真实密钥",
        "ok": true,
        "why": ".env.example：只列键名与假值/说明，可以进仓库，作为同事与 CI 的填写模板。"
      },
      {
        "t": "必须加密才能进 Git",
        "ok": false,
        "why": "与「.env.example」不符。"
      },
      {
        "t": "应复制生产密钥明文",
        "ok": false,
        "why": "与「.env.example」不符。"
      },
      {
        "t": "禁止出现在文档里",
        "ok": false,
        "why": "与「.env.example」不符。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "craft-security"
    ],
    "tags": [
      "基础",
      "dotenv_example"
    ]
  },
  {
    "id": "concept-env-kw:http_proxy",
    "q": "出网拉 GitHub/npm 失败时，环境侧常见设置？",
    "choices": [
      {
        "t": "HTTP_PROXY",
        "ok": true,
        "why": "HTTP_PROXY / HTTPS_PROXY：告诉许多工具出网走哪个代理（如本机 7890）。国内拉 GitHub/npm 常见设置。"
      },
      {
        "t": "删除全部环境变量",
        "ok": false,
        "why": "与「HTTP_PROXY / HTTPS_PROXY」不符。"
      },
      {
        "t": "把代理写成 git commit message",
        "ok": false,
        "why": "与「HTTP_PROXY / HTTPS_PROXY」不符。"
      },
      {
        "t": "只能设 FTP_ONLY_PROXY",
        "ok": false,
        "why": "与「HTTP_PROXY / HTTPS_PROXY」不符。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "clash"
    ],
    "tags": [
      "基础",
      "http_proxy"
    ]
  },
  {
    "id": "concept-env-kw:no_proxy",
    "q": "NO_PROXY 的典型用途？",
    "choices": [
      {
        "t": "指定哪些主机不走 HTTP(S) 代理",
        "ok": true,
        "why": "NO_PROXY：列出不走代理的主机（常含 127.0.0.1,localhost,::1），避免本机回环也被代理绕一圈。"
      },
      {
        "t": "禁用主机全部网卡，使任何流量都发不出去",
        "ok": false,
        "why": "NO_PROXY 是代理旁路名单，不是断网/清 PATH/强制 Tor。"
      },
      {
        "t": "清空 PATH，让所有命令都找不到可执行文件",
        "ok": false,
        "why": "NO_PROXY 是代理旁路名单，不是断网/清 PATH/强制 Tor。"
      },
      {
        "t": "强制所有流量必须走 Tor 出口，不能直连",
        "ok": false,
        "why": "NO_PROXY 是代理旁路名单，不是断网/清 PATH/强制 Tor。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "clash"
    ],
    "tags": [
      "基础",
      "no_proxy"
    ]
  },
  {
    "id": "concept-env-kw:process_env",
    "q": "Node 里读取环境变量的标准方式？",
    "choices": [
      {
        "t": "process.env.NAME",
        "ok": true,
        "why": "process.env：Node 进程读取环境变量的对象；值为字符串或 undefined。启动前注入，不是运行时随意改 OS 全局的唯一方式。"
      },
      {
        "t": "window.env 在纯服务端",
        "ok": false,
        "why": "与「process.env（Node）」不符。"
      },
      {
        "t": "document.cookie 读系统 PATH",
        "ok": false,
        "why": "与「process.env（Node）」不符。"
      },
      {
        "t": "require(\"os\").envKey 官方唯一",
        "ok": false,
        "why": "与「process.env（Node）」不符。"
      }
    ],
    "relatedNodes": [
      "data-env",
      "runtime-nodejs"
    ],
    "tags": [
      "基础",
      "process_env"
    ]
  }
],
});

import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-linux-cli",
  title: "概念 · Linux 指令（基础→进阶）",
  kind: "concept",
  domain: "ops",
  tags: ["Linux","指令","Shell","基础","进阶"],
  relatedNodes: ["linux-distros","linux-cli","package-managers","runtime-nodejs","host-systemd","lang-shell"],
  caption: "发行版差异、进程组合、systemd/作业控制——命令词典见 Linux 命令全表。",
  questions: [
  {
    "id": "concept-linux-cli:q7",
    "q": "同一意图「装系统软件」，Ubuntu 与 Fedora 常见命令差别说明什么？",
    "choices": [
      {
        "t": "发行版家族不同 → 包管理方言不同（如 apt vs dnf），文档要对准发行版",
        "ok": true,
        "why": "内核可同属 Linux；仓库与工具链是发行版产品差异。"
      },
      {
        "t": "Fedora 禁止使用任何包管理器",
        "ok": false,
        "why": "dnf/rpm 正是其包管理路径。"
      },
      {
        "t": "二者必须使用 pnpm 安装内核",
        "ok": false,
        "why": "pnpm 管 JS 项目依赖，不管系统内核。"
      },
      {
        "t": "TCP 端口数学定义随发行版变化",
        "ok": false,
        "why": "端口是协议标准，与 apt/dnf 无关。"
      }
    ],
    "relatedNodes": [
      "linux-distros",
      "linux-cli",
      "package-managers"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-linux-cli:q11",
    "q": "后台查看进程、按名过滤 node？",
    "choices": [
      {
        "t": "ps aux | grep node（注意排除 grep 自身）",
        "ok": true,
        "why": "经典组合；也可用 pgrep -a node。"
      },
      {
        "t": "kill -9 不加 pid 即可",
        "ok": false,
        "why": "必须指定进程。"
      },
      {
        "t": "ls node",
        "ok": false,
        "why": "列文件。"
      },
      {
        "t": "nice node 只用来杀进程",
        "ok": false,
        "why": "nice 调优先级。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "runtime-nodejs"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-linux-cli:q13",
    "q": "用 systemd 看某服务是否在跑（现代发行版）？",
    "choices": [
      {
        "t": "systemctl status my.service",
        "ok": true,
        "why": "主机服务管理入口。"
      },
      {
        "t": "npm status",
        "ok": false,
        "why": "无关。"
      },
      {
        "t": "git status my.service",
        "ok": false,
        "why": "Git。"
      },
      {
        "t": "docker status 等于 systemctl",
        "ok": false,
        "why": "容器另有体系。"
      }
    ],
    "relatedNodes": [
      "host-systemd",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-linux-cli:q18",
    "q": "看 systemd 服务近期日志？",
    "choices": [
      {
        "t": "journalctl -u my.service -n 100 --no-pager",
        "ok": true,
        "why": "主机服务排障入口。"
      },
      {
        "t": "docker journalctl 等于删除镜像",
        "ok": false,
        "why": "journalctl 读日志，不删镜像。"
      },
      {
        "t": "npm journal",
        "ok": false,
        "why": "无此标准命令。"
      },
      {
        "t": "git log -u my.service",
        "ok": false,
        "why": "Git 历史，不是服务日志。"
      }
    ],
    "relatedNodes": [
      "host-systemd",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-linux-cli:q19",
    "q": "把命令放到后台跑、再拉回前台，经典？",
    "choices": [
      {
        "t": "末尾 `&` 后台；`fg` 拉回前台；`Ctrl+C` 打断前台进程",
        "ok": true,
        "why": "长任务与交互会话管理基础；与「另开一个终端」互补。"
      },
      {
        "t": "后台进程无法再被管理",
        "ok": false,
        "why": "jobs/fg/bg/kill 都可管。"
      },
      {
        "t": "只有 root 能用 Ctrl+C",
        "ok": false,
        "why": "普通用户也可中断自己的前台进程。"
      },
      {
        "t": "`&` 表示逻辑与，不能用于后台",
        "ok": false,
        "why": "命令末尾的 `&` 是作业控制后台。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "lang-shell"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  }
],
});

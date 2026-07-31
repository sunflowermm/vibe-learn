import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-docker-cli",
  title: "概念 · Docker 指令（基础→进阶）",
  kind: "concept",
  domain: "ops",
  tags: ["Docker","指令","Compose","基础","进阶"],
  relatedNodes: ["ops-docker","ops-compose","craft-ci","workbench-troubleshoot"],
  caption: "run 参数、卷、标签、排障、网络、多阶段——单词命令见 Docker 命令全表。",
  questions: [
  {
    "id": "concept-docker-cli:q2",
    "q": "前台运行并映射端口 6379，较完整的是？",
    "choices": [
      {
        "t": "docker run --rm -p 6379:6379 redis:7",
        "ok": true,
        "why": "-p 宿主:容器；--rm 退出删容器（演示友好）。"
      },
      {
        "t": "docker build -p 6379",
        "ok": false,
        "why": "build 是构建镜像。"
      },
      {
        "t": "docker network -p 6379",
        "ok": false,
        "why": "网络子命令。"
      },
      {
        "t": "docker run redis:7 -p 6379",
        "ok": false,
        "why": "选项位置与语法不对。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q7",
    "q": "数据库数据要跨容器重建仍在，应？",
    "choices": [
      {
        "t": "挂 volume / bind mount，勿只写容器可写层",
        "ok": true,
        "why": "删容器默认可写层丢。"
      },
      {
        "t": "关闭所有端口映射即可持久化",
        "ok": false,
        "why": "无关。"
      },
      {
        "t": "只靠 docker logs",
        "ok": false,
        "why": "日志不是数据持久化。"
      },
      {
        "t": "每次 docker commit 当备份",
        "ok": false,
        "why": "反模式。"
      }
    ],
    "relatedNodes": [
      "ops-docker",
      "ops-compose"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q8",
    "q": "镜像名与标签的稳妥习惯？",
    "choices": [
      {
        "t": "生产钉具体标签或 digest，避免长期依赖 :latest 漂",
        "ok": true,
        "why": "可复现；CI/CD 同理。"
      },
      {
        "t": "标签越长越不安全",
        "ok": false,
        "why": "无关。"
      },
      {
        "t": "永远只用 latest",
        "ok": false,
        "why": "静默升级风险。"
      },
      {
        "t": "digest 不能用于部署",
        "ok": false,
        "why": "digest 最钉死。"
      }
    ],
    "relatedNodes": [
      "ops-docker",
      "craft-ci"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q9",
    "q": "清理已停止容器、悬空镜像（小心）？",
    "choices": [
      {
        "t": "docker container prune / docker image prune（先看帮助，确认范围）",
        "ok": true,
        "why": "释放磁盘；system prune 更猛要确认。"
      },
      {
        "t": "docker logout 清理镜像",
        "ok": false,
        "why": "登出仓库凭证。"
      },
      {
        "t": "docker pause 全部等于删除",
        "ok": false,
        "why": "pause 暂停进程。"
      },
      {
        "t": "rm -rf /",
        "ok": false,
        "why": "危险且非 Docker 语义。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q10",
    "q": "容器反复重启，第一眼看？",
    "choices": [
      {
        "t": "docker ps -a 状态 → docker logs → 必要时 inspect 健康检查与退出码",
        "ok": true,
        "why": "分层排障。"
      },
      {
        "t": "立刻 docker system prune -a --volumes",
        "ok": false,
        "why": "先取证再清理。"
      },
      {
        "t": "改 Git remote",
        "ok": false,
        "why": "无关。"
      },
      {
        "t": "关掉宿主机网卡",
        "ok": false,
        "why": "过激。"
      }
    ],
    "relatedNodes": [
      "ops-docker",
      "workbench-troubleshoot"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q11",
    "q": "Dockerfile 里 COPY 与 RUN 的分工？",
    "choices": [
      {
        "t": "COPY 拷文件进镜像；RUN 在构建时执行命令（装依赖等）",
        "ok": true,
        "why": "层缓存友好写法：先依赖文件再 COPY 源码。"
      },
      {
        "t": "COPY 在容器运行时每次启动都执行",
        "ok": false,
        "why": "构建期。"
      },
      {
        "t": "RUN 只能拷文件",
        "ok": false,
        "why": "说反了。"
      },
      {
        "t": "二者禁止出现在同一 Dockerfile",
        "ok": false,
        "why": "常态并存。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q12",
    "q": "本机 Node 连「Compose 里的 Redis 服务名」时，正确网络直觉？",
    "choices": [
      {
        "t": "同一 compose 网络内用服务名作主机名；在宿主机则常用 localhost:映射端口",
        "ok": true,
        "why": "网络命名空间不同。"
      },
      {
        "t": "端口映射后容器内端口号会改变",
        "ok": false,
        "why": "容器内仍听原端口；映射改的是宿主侧。"
      },
      {
        "t": "容器内禁止使用 IP",
        "ok": false,
        "why": "可用，但服务名更稳。"
      },
      {
        "t": "服务名在宿主机永远等于 DNS 根",
        "ok": false,
        "why": "宿主机默认解析不了 compose 服务名。"
      }
    ],
    "relatedNodes": [
      "ops-compose",
      "ops-docker"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  },
  {
    "id": "concept-docker-cli:q15",
    "q": "多阶段构建（multi-stage）主要图什么？",
    "choices": [
      {
        "t": "构建阶段装编译器，最终镜像只留运行所需，体积与攻击面更小",
        "ok": true,
        "why": "现代 Dockerfile 经典手法。"
      },
      {
        "t": "阶段越多密钥越安全到可以明文提交",
        "ok": false,
        "why": "密钥仍勿进镜像。"
      },
      {
        "t": "禁止使用 COPY",
        "ok": false,
        "why": "仍用。"
      },
      {
        "t": "多阶段会自动做数据库迁移",
        "ok": false,
        "why": "否。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "进阶"
    ]
  }
],
});

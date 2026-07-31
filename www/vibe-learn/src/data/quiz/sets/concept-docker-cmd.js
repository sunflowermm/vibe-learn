import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-docker-cmd",
  title: "基础 · Docker / Compose 命令全表",
  kind: 'concept',
  domain: "ops",
  tags: ["Docker","Compose","命令","基础"],
  relatedNodes: ["ops-docker","ops-compose"],
  caption: "pull/run/ps/logs + build/exec + compose up/down。",
  questions: [
  {
    "id": "concept-docker-cmd:pull",
    "q": "Docker：从镜像仓库拉取镜像到本机？",
    "choices": [
      {
        "t": "docker pull <image:tag>",
        "ok": true,
        "why": "docker pull：从仓库拉取镜像到本机。"
      },
      {
        "t": "docker push 当本机无镜像时的拉取",
        "ok": false,
        "why": "与「docker pull」不符。"
      },
      {
        "t": "docker kill 拉镜像",
        "ok": false,
        "why": "与「docker pull」不符。"
      },
      {
        "t": "docker attach 拉镜像",
        "ok": false,
        "why": "与「docker pull」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "pull"
    ]
  },
  {
    "id": "concept-docker-cmd:run",
    "q": "创建并启动容器？",
    "choices": [
      {
        "t": "docker run … <image>",
        "ok": true,
        "why": "docker run：基于镜像创建并启动容器；-p 映射端口，-d 后台，--rm 退出删除。"
      },
      {
        "t": "docker build 代替每次运行",
        "ok": false,
        "why": "与「docker run」不符。"
      },
      {
        "t": "docker network run",
        "ok": false,
        "why": "与「docker run」不符。"
      },
      {
        "t": "docker volume run 启动业务容器",
        "ok": false,
        "why": "与「docker run」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "run"
    ]
  },
  {
    "id": "concept-docker-cmd:ps",
    "q": "查看正在运行的容器？",
    "choices": [
      {
        "t": "docker ps",
        "ok": true,
        "why": "docker ps：列出运行中容器；-a 含已停止。"
      },
      {
        "t": "docker images ps",
        "ok": false,
        "why": "与「docker ps」不符。"
      },
      {
        "t": "docker volume ps",
        "ok": false,
        "why": "与「docker ps」不符。"
      },
      {
        "t": "docker login ps",
        "ok": false,
        "why": "与「docker ps」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "ps"
    ]
  },
  {
    "id": "concept-docker-cmd:logs",
    "q": "Docker 看容器日志用？",
    "choices": [
      {
        "t": "docker logs <container>（-f 跟踪）",
        "ok": true,
        "why": "docker logs：看容器标准输出/错误；-f 跟踪。排障第一眼。"
      },
      {
        "t": "docker pull --logs",
        "ok": false,
        "why": "与「docker logs」不符。"
      },
      {
        "t": "docker network logs 唯一方式",
        "ok": false,
        "why": "与「docker logs」不符。"
      },
      {
        "t": "docker login logs",
        "ok": false,
        "why": "与「docker logs」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker",
      "workbench-troubleshoot"
    ],
    "tags": [
      "基础",
      "logs"
    ]
  },
  {
    "id": "concept-docker-cmd:stop",
    "q": "停止运行中的容器？",
    "choices": [
      {
        "t": "docker stop <container>",
        "ok": true,
        "why": "docker stop：优雅停止容器（发信号）；粗暴可用 kill。"
      },
      {
        "t": "docker pull stop",
        "ok": false,
        "why": "与「docker stop」不符。"
      },
      {
        "t": "docker images stop",
        "ok": false,
        "why": "与「docker stop」不符。"
      },
      {
        "t": "docker login stop",
        "ok": false,
        "why": "与「docker stop」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "stop"
    ]
  },
  {
    "id": "concept-docker-cmd:rm",
    "q": "删除已停止的容器？",
    "choices": [
      {
        "t": "docker rm <container>",
        "ok": true,
        "why": "docker rm：删除已停止的容器实例（不是删镜像）。"
      },
      {
        "t": "docker rmi 删容器实例（那是删镜像）",
        "ok": false,
        "why": "与「docker rm」不符。"
      },
      {
        "t": "docker pull --rm-container",
        "ok": false,
        "why": "与「docker rm」不符。"
      },
      {
        "t": "docker network rm 删任意业务容器",
        "ok": false,
        "why": "与「docker rm」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "rm"
    ]
  },
  {
    "id": "concept-docker-cmd:images",
    "q": "Docker 列出本机镜像用？",
    "choices": [
      {
        "t": "docker images",
        "ok": true,
        "why": "docker images：列出本机镜像。"
      },
      {
        "t": "docker ps --images-only",
        "ok": false,
        "why": "与「docker images」不符。"
      },
      {
        "t": "docker logs --images",
        "ok": false,
        "why": "与「docker images」不符。"
      },
      {
        "t": "docker run --list-images",
        "ok": false,
        "why": "与「docker images」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "images"
    ]
  },
  {
    "id": "concept-docker-cmd:build",
    "q": "用 Dockerfile 构建镜像？",
    "choices": [
      {
        "t": "docker build -t name:tag .",
        "ok": true,
        "why": "docker build -t name:tag ：按 Dockerfile 构建镜像并打标签。"
      },
      {
        "t": "docker pull -t 构建",
        "ok": false,
        "why": "与「docker build」不符。"
      },
      {
        "t": "docker run -t 等于 build",
        "ok": false,
        "why": "与「docker build」不符。"
      },
      {
        "t": "docker compose build 禁止本地 Dockerfile",
        "ok": false,
        "why": "与「docker build」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "build"
    ]
  },
  {
    "id": "concept-docker-cmd:exec",
    "q": "进入运行中容器执行命令？",
    "choices": [
      {
        "t": "docker exec -it <container> sh",
        "ok": true,
        "why": "docker exec -it：在运行中容器内执行命令（进 shell 排障）。"
      },
      {
        "t": "docker attach 是唯一进容器方式且等于 exec",
        "ok": false,
        "why": "与「docker exec」不符。"
      },
      {
        "t": "docker pull -it",
        "ok": false,
        "why": "与「docker exec」不符。"
      },
      {
        "t": "docker images -it",
        "ok": false,
        "why": "与「docker exec」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "exec"
    ]
  },
  {
    "id": "concept-docker-cmd:compose_up",
    "q": "按 compose 后台启动服务栈？",
    "choices": [
      {
        "t": "docker compose up -d",
        "ok": true,
        "why": "docker compose up -d：按 compose 文件后台拉起多服务。本地依赖栈常用。"
      },
      {
        "t": "docker pull compose",
        "ok": false,
        "why": "与「docker compose up」不符。"
      },
      {
        "t": "docker images up -d",
        "ok": false,
        "why": "与「docker compose up」不符。"
      },
      {
        "t": "docker login up",
        "ok": false,
        "why": "与「docker compose up」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose",
      "ops-docker"
    ],
    "tags": [
      "基础",
      "compose_up"
    ]
  },
  {
    "id": "concept-docker-cmd:compose_down",
    "q": "拆除 compose 栈？",
    "choices": [
      {
        "t": "docker compose down",
        "ok": true,
        "why": "docker compose down：停止并移除 compose 创建的容器/网络（卷需额外选项）。"
      },
      {
        "t": "docker rm -f 唯一拆栈方式",
        "ok": false,
        "why": "与「docker compose down」不符。"
      },
      {
        "t": "docker pull down",
        "ok": false,
        "why": "与「docker compose down」不符。"
      },
      {
        "t": "docker images down",
        "ok": false,
        "why": "与「docker compose down」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose"
    ],
    "tags": [
      "基础",
      "compose_down"
    ]
  },
  {
    "id": "concept-docker-cmd:df_from",
    "q": "Dockerfile 里指定基础镜像？",
    "choices": [
      {
        "t": "FROM <base>",
        "ok": true,
        "why": "Dockerfile FROM：指定基础镜像，构建第一指令。"
      },
      {
        "t": "RUN 指定基础镜像",
        "ok": false,
        "why": "与「Dockerfile FROM」不符。"
      },
      {
        "t": "CMD 指定基础镜像",
        "ok": false,
        "why": "与「Dockerfile FROM」不符。"
      },
      {
        "t": "COPY 指定基础镜像",
        "ok": false,
        "why": "与「Dockerfile FROM」不符。"
      }
    ],
    "relatedNodes": [
      "ops-docker"
    ],
    "tags": [
      "基础",
      "df_from"
    ]
  }
],
});

import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-compose-kw",
  title: "基础 · Compose YAML 字段全表",
  kind: 'concept',
  domain: "ops",
  tags: ["Compose","Docker","基础"],
  relatedNodes: ["ops-compose","ops-docker"],
  caption: "services、image、build、ports、volumes、depends_on——多容器编排单词。",
  questions: [
  {
    "id": "concept-compose-kw:services",
    "q": "compose.yaml 里 services 表示？",
    "choices": [
      {
        "t": "要编排的各个容器角色定义",
        "ok": true,
        "why": "services：声明有哪些容器角色（如 redis、app）。Compose 管「一套」，docker run 管「一个」。"
      },
      {
        "t": "仅宿主机 systemd 单元列表",
        "ok": false,
        "why": "与「Compose services」不符。"
      },
      {
        "t": "仅 Git submodule",
        "ok": false,
        "why": "与「Compose services」不符。"
      },
      {
        "t": "仅 Nginx upstream 名",
        "ok": false,
        "why": "与「Compose services」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose"
    ],
    "tags": [
      "基础",
      "services"
    ]
  },
  {
    "id": "concept-compose-kw:image",
    "q": "services.redis.image: redis:7 的意思？",
    "choices": [
      {
        "t": "该服务用名为 redis:7 的镜像运行",
        "ok": true,
        "why": "image：使用已有镜像名（可含标签）启动服务，不必本地 build。"
      },
      {
        "t": "在宿主机安装 apt 包 redis",
        "ok": false,
        "why": "与「Compose image」不符。"
      },
      {
        "t": "删除所有卷",
        "ok": false,
        "why": "与「Compose image」不符。"
      },
      {
        "t": "只生成 Dockerfile 不运行",
        "ok": false,
        "why": "与「Compose image」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose",
      "ops-docker"
    ],
    "tags": [
      "基础",
      "image"
    ]
  },
  {
    "id": "concept-compose-kw:build",
    "q": "Compose 的 build 字段表示？",
    "choices": [
      {
        "t": "从本地 Dockerfile/上下文构建镜像",
        "ok": true,
        "why": "build：按 Dockerfile（或上下文）本地构建镜像再运行；与直接 image 拉现成对照。"
      },
      {
        "t": "只下载不含构建",
        "ok": false,
        "why": "与「Compose build」不符。"
      },
      {
        "t": "编译宿主机内核",
        "ok": false,
        "why": "与「Compose build」不符。"
      },
      {
        "t": "强制 git push",
        "ok": false,
        "why": "与「Compose build」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose",
      "ops-docker"
    ],
    "tags": [
      "基础",
      "build"
    ]
  },
  {
    "id": "concept-compose-kw:ports",
    "q": "ports: [\"6379:6379\"] 表示？",
    "choices": [
      {
        "t": "把宿主机 6379 映射到容器 6379",
        "ok": true,
        "why": "ports：宿主机端口:容器端口映射，如 6379:6379，让本机进程连 localhost 进容器。"
      },
      {
        "t": "设置 HTTP 状态码",
        "ok": false,
        "why": "与「Compose ports」不符。"
      },
      {
        "t": "修改镜像架构",
        "ok": false,
        "why": "与「Compose ports」不符。"
      },
      {
        "t": "等同 depends_on",
        "ok": false,
        "why": "与「Compose ports」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose",
      "network-basics"
    ],
    "tags": [
      "基础",
      "ports"
    ]
  },
  {
    "id": "concept-compose-kw:volumes",
    "q": "Compose volumes 的核心收益？",
    "choices": [
      {
        "t": "数据持久化，删容器不必然丢库文件",
        "ok": true,
        "why": "volumes：把容器内目录持久化到命名卷或宿主机路径，避免删容器丢数据。卷 ≠ 镜像只读层。"
      },
      {
        "t": "加快 CPU 主频",
        "ok": false,
        "why": "与「Compose volumes」不符。"
      },
      {
        "t": "替代 TLS",
        "ok": false,
        "why": "与「Compose volumes」不符。"
      },
      {
        "t": "禁止端口映射",
        "ok": false,
        "why": "与「Compose volumes」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose"
    ],
    "tags": [
      "基础",
      "volumes"
    ]
  },
  {
    "id": "concept-compose-kw:depends_on",
    "q": "depends_on 保证了什么、不保证什么？",
    "choices": [
      {
        "t": "大致启动顺序；不保证依赖已就绪可连",
        "ok": true,
        "why": "depends_on：启动顺序提示（先起 A 再起 B）；不等于健康检查「已可接受连接」。"
      },
      {
        "t": "保证 TCP 一定连通",
        "ok": false,
        "why": "与「depends_on」不符。"
      },
      {
        "t": "自动做数据库迁移",
        "ok": false,
        "why": "与「depends_on」不符。"
      },
      {
        "t": "等同 Kubernetes 全集群调度",
        "ok": false,
        "why": "与「depends_on」不符。"
      }
    ],
    "relatedNodes": [
      "ops-compose"
    ],
    "tags": [
      "基础",
      "depends_on"
    ]
  }
],
});

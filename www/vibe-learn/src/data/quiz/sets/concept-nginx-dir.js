import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-nginx-dir",
  title: "基础 · Nginx 指令 / 操作全表",
  kind: 'concept',
  domain: "net",
  tags: ["Nginx","反代","基础"],
  relatedNodes: ["net-nginx","reverse-proxy"],
  caption: "server、location、proxy_pass、listen、upstream、nginx -t、reload——门面配置单词。",
  questions: [
  {
    "id": "concept-nginx-dir:server",
    "q": "Nginx 的 server 块大致表示？",
    "choices": [
      {
        "t": "一个虚拟主机/站点的配置单元",
        "ok": true,
        "why": "server：一组虚拟主机配置（监听、域名、location 等）。一台 Nginx 可有多个 server。"
      },
      {
        "t": "数据库事务",
        "ok": false,
        "why": "与「Nginx server 块」不符。"
      },
      {
        "t": "仅 Docker 网络别名",
        "ok": false,
        "why": "与「Nginx server 块」不符。"
      },
      {
        "t": "Git remote 名",
        "ok": false,
        "why": "与「Nginx server 块」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx"
    ],
    "tags": [
      "基础",
      "server"
    ]
  },
  {
    "id": "concept-nginx-dir:location",
    "q": "location 指令主要按什么匹配？",
    "choices": [
      {
        "t": "请求 URI 路径（可配前缀/正则等规则）",
        "ok": true,
        "why": "location：按 URI 路径匹配规则；可挂静态 root、反代 proxy_pass、重写等。路径拼接细节影响上游看到的 URI。"
      },
      {
        "t": "仅按客户端 MAC",
        "ok": false,
        "why": "与「Nginx location」不符。"
      },
      {
        "t": "仅按 SQL 表名",
        "ok": false,
        "why": "与「Nginx location」不符。"
      },
      {
        "t": "仅按 Git 分支",
        "ok": false,
        "why": "与「Nginx location」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx",
      "http-web"
    ],
    "tags": [
      "基础",
      "location"
    ]
  },
  {
    "id": "concept-nginx-dir:proxy_pass",
    "q": "proxy_pass 在 Nginx 里做什么？",
    "choices": [
      {
        "t": "把请求转发到指定上游地址",
        "ok": true,
        "why": "proxy_pass：把匹配到的请求转到上游（如 http://127.0.0.1:3000）。反代核心；尾斜杠会影响路径拼接。"
      },
      {
        "t": "编译 Nginx 源码",
        "ok": false,
        "why": "与「proxy_pass」不符。"
      },
      {
        "t": "删除上游进程",
        "ok": false,
        "why": "与「proxy_pass」不符。"
      },
      {
        "t": "在浏览器执行 SQL",
        "ok": false,
        "why": "与「proxy_pass」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx",
      "reverse-proxy"
    ],
    "tags": [
      "基础",
      "proxy_pass"
    ]
  },
  {
    "id": "concept-nginx-dir:listen",
    "q": "Nginx listen 80 表示？",
    "choices": [
      {
        "t": "该 server 在 80 端口接受连接",
        "ok": true,
        "why": "listen：指定 server 监听的地址/端口（如 80、443 ssl）。公网入口常见只暴露 443。"
      },
      {
        "t": "监听 Git 协议专用且不能改",
        "ok": false,
        "why": "与「listen」不符。"
      },
      {
        "t": "表示进程优先级",
        "ok": false,
        "why": "与「listen」不符。"
      },
      {
        "t": "等同关闭防火墙",
        "ok": false,
        "why": "与「listen」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx",
      "network-basics"
    ],
    "tags": [
      "基础",
      "listen"
    ]
  },
  {
    "id": "concept-nginx-dir:upstream",
    "q": "Nginx upstream 的用途？",
    "choices": [
      {
        "t": "声明一组后端，供反代负载/引用",
        "ok": true,
        "why": "upstream：定义一组后端服务器，供 proxy_pass 引用，可做简单负载。不是容器专有词。"
      },
      {
        "t": "定义 CSS 变量",
        "ok": false,
        "why": "与「upstream」不符。"
      },
      {
        "t": "存储 JWT 私钥",
        "ok": false,
        "why": "与「upstream」不符。"
      },
      {
        "t": "替代 DNS 根服务器",
        "ok": false,
        "why": "与「upstream」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx",
      "reverse-proxy"
    ],
    "tags": [
      "基础",
      "upstream"
    ]
  },
  {
    "id": "concept-nginx-dir:nginx_t",
    "q": "改完 nginx.conf，上线前应先？",
    "choices": [
      {
        "t": "nginx -t 测配置，通过后再 reload",
        "ok": true,
        "why": "nginx -t：测试配置语法/基本正确性。改 conf 后应先 -t 再 reload，避免写挂全站。"
      },
      {
        "t": "直接 rm -rf /",
        "ok": false,
        "why": "与「nginx -t」不符。"
      },
      {
        "t": "必须重启物理机电源",
        "ok": false,
        "why": "与「nginx -t」不符。"
      },
      {
        "t": "改 conf 会自动 git push",
        "ok": false,
        "why": "与「nginx -t」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx"
    ],
    "tags": [
      "基础",
      "nginx_t"
    ]
  },
  {
    "id": "concept-nginx-dir:reload",
    "q": "Nginx reload 相对硬重启进程？",
    "choices": [
      {
        "t": "热载配置，通常比杀进程重启更平滑",
        "ok": true,
        "why": "reload：热加载配置（如 nginx -s reload / systemctl reload nginx），多数改动无需掐断全部连接硬重启。"
      },
      {
        "t": "清空所有磁盘",
        "ok": false,
        "why": "与「Nginx reload」不符。"
      },
      {
        "t": "只重载浏览器缓存",
        "ok": false,
        "why": "与「Nginx reload」不符。"
      },
      {
        "t": "删除上游数据库",
        "ok": false,
        "why": "与「Nginx reload」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx"
    ],
    "tags": [
      "基础",
      "reload"
    ]
  },
  {
    "id": "concept-nginx-dir:root_static",
    "q": "用 root 挂静态目录相对 proxy_pass 的差别？",
    "choices": [
      {
        "t": "直接由 Nginx 读磁盘文件返回，不必进上游应用",
        "ok": true,
        "why": "root（及 alias）：把 URI 映射到磁盘目录，直接返回静态文件，不经应用逻辑。与 proxy_pass 反代业务 API 对照。"
      },
      {
        "t": "root 只能反代 gRPC",
        "ok": false,
        "why": "与「root / 静态资源」不符。"
      },
      {
        "t": "root 会执行 SQL",
        "ok": false,
        "why": "与「root / 静态资源」不符。"
      },
      {
        "t": "二者完全无法共存于同一 server",
        "ok": false,
        "why": "与「root / 静态资源」不符。"
      }
    ],
    "relatedNodes": [
      "net-nginx",
      "http-web"
    ],
    "tags": [
      "基础",
      "root_static"
    ]
  }
],
});

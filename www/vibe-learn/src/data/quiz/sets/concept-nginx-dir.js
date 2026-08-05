import { defineQuizSet } from '../schema.js';

/**
 * Nginx 指令 / 操作：一题一决策；干扰项=邻近指令误判。
 */
export default defineQuizSet({
  id: 'concept-nginx-dir',
  title: '基础 · Nginx 指令 / 操作全表',
  kind: 'concept',
  domain: 'net',
  tags: ['Nginx', '反代', '基础'],
  relatedNodes: ['net-nginx', 'reverse-proxy'],
  caption: 'server、location、proxy_pass、listen、upstream、nginx -t、reload——门面配置单词。',
  questions: [
    {
      id: 'concept-nginx-dir:server',
      q: 'Nginx 的 server 块大致表示什么？',
      choices: [
        {
          t: '一个虚拟主机/站点的配置单元',
          ok: true,
          why: '一台 Nginx 可有多个 server，靠 server_name/listen 区分。',
        },
        {
          t: '一组后端机器列表，专供负载均衡引用',
          ok: false,
          why: '那是 upstream。',
        },
        {
          t: '按 URI 路径匹配的一条规则',
          ok: false,
          why: '那是 location。',
        },
        {
          t: '把请求转发到上游的指令名',
          ok: false,
          why: '那是 proxy_pass。',
        },
      ],
      relatedNodes: ['net-nginx'],
      tags: ['基础', 'server'],
    },
    {
      id: 'concept-nginx-dir:location',
      q: 'location 指令主要按什么匹配？',
      choices: [
        {
          t: '请求 URI 路径（可配前缀/正则等规则）',
          ok: true,
          why: '可挂静态 root、反代 proxy_pass、重写等。',
        },
        {
          t: '仅按客户端 MAC 地址匹配，与 URI 无关',
          ok: false,
          why: 'location 看 URI，不是 MAC。',
        },
        {
          t: '仅按 SQL 表名匹配，用来路由到不同数据库',
          ok: false,
          why: '无关。',
        },
        {
          t: '仅按上游 upstream 名称自动生成，配置里不可手写',
          ok: false,
          why: 'location 是手写匹配规则。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['基础', 'location'],
    },
    {
      id: 'concept-nginx-dir:proxy_pass',
      q: 'proxy_pass 在 Nginx 里做什么？',
      choices: [
        {
          t: '把匹配到的请求转发到指定上游地址',
          ok: true,
          why: '反代核心；尾斜杠会影响路径拼接。',
        },
        {
          t: '把 URI 映射到磁盘目录直接吐静态文件',
          ok: false,
          why: '那是 root/alias。',
        },
        {
          t: '测试配置语法是否正确',
          ok: false,
          why: '那是 nginx -t。',
        },
        {
          t: '热加载配置而不硬杀进程',
          ok: false,
          why: '那是 reload。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['基础', 'proxy_pass'],
    },
    {
      id: 'concept-nginx-dir:listen',
      q: 'Nginx listen 443 ssl 表示？',
      choices: [
        {
          t: '该 server 在 443 端口接受 TLS/HTTPS 连接',
          ok: true,
          why: '公网入口常见只暴露 443；证书另配。',
        },
        {
          t: '监听只能走 Git 协议，端口号写死且永远不能改成别的',
          ok: false,
          why: 'listen 可改端口与地址。',
        },
        {
          t: '等同关闭防火墙或安全组，对外全部端口自动放行',
          ok: false,
          why: 'listen ≠ 安全组放行。',
        },
        {
          t: '声明一组后端 upstream 供负载均衡引用，不是接连接',
          ok: false,
          why: '那是 upstream 块。',
        },
      ],
      relatedNodes: ['net-nginx', 'network-basics'],
      tags: ['基础', 'listen'],
    },
    {
      id: 'concept-nginx-dir:upstream',
      q: 'Nginx upstream 的用途是？',
      choices: [
        {
          t: '声明一组后端，供 proxy_pass 引用',
          ok: true,
          why: '不是容器专有词；健康检查与策略可再配。',
        },
        {
          t: '定义虚拟主机的 server_name',
          ok: false,
          why: 'server_name 在 server 块。',
        },
        {
          t: '测试 conf 语法',
          ok: false,
          why: '那是 nginx -t。',
        },
        {
          t: '替代 DNS 根服务器',
          ok: false,
          why: 'upstream 不管全球 DNS。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['基础', 'upstream'],
    },
    {
      id: 'concept-nginx-dir:nginx_t',
      q: '改完 nginx.conf，上线前应先做什么？',
      choices: [
        {
          t: 'nginx -t 测配置，通过后再 reload',
          ok: true,
          why: '避免写挂全站；-t 查语法与基本正确性。',
        },
        {
          t: '必须重启物理机电源才能让新配置生效',
          ok: false,
          why: '过激且通常无必要。',
        },
        {
          t: '改 conf 会自动 git push，无需自己做配置管理',
          ok: false,
          why: '配置管理要自己做。',
        },
        {
          t: '直接杀进程上线，不必先测配置语法',
          ok: false,
          why: '高风险；先 -t。',
        },
      ],
      relatedNodes: ['net-nginx'],
      tags: ['基础', 'nginx_t'],
    },
    {
      id: 'concept-nginx-dir:reload',
      q: 'Nginx reload 相对硬重启进程？',
      choices: [
        {
          t: '热载配置，通常比杀进程重启更平滑、连接中断更少',
          ok: true,
          why: '如 nginx -s reload / systemctl reload nginx。',
        },
        {
          t: 'reload 会清空 Nginx 的 access/error 日志文件内容',
          ok: false,
          why: 'reload 重载配置，不负责清日志。',
        },
        {
          t: 'reload 只重载浏览器本地缓存，与 Nginx 进程无关',
          ok: false,
          why: 'reload 的是 Nginx 进程配置。',
        },
        {
          t: 'reload 会删除上游数据库里的全部表',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['net-nginx'],
      tags: ['基础', 'reload'],
    },
    {
      id: 'concept-nginx-dir:root_static',
      q: '用 root 挂静态目录相对 proxy_pass 的关键差别是？',
      choices: [
        {
          t: '直接由 Nginx 读磁盘文件返回，不必进上游应用',
          ok: true,
          why: '静态产物走 root/alias；业务 API 走 proxy_pass。',
        },
        {
          t: 'root 只能反代 gRPC',
          ok: false,
          why: 'root 管静态文件映射。',
        },
        {
          t: 'root 会执行 SQL',
          ok: false,
          why: 'Nginx 不跑业务 SQL。',
        },
        {
          t: '二者完全无法共存于同一 server',
          ok: false,
          why: '同域静态+/api 反代正是常见组合。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['基础', 'root_static'],
    },
    {
      id: 'concept-nginx-dir:proxy_pass_slash',
      q: 'location /api/ 配 proxy_pass http://127.0.0.1:3000/ 时，尾斜杠常影响什么？',
      choices: [
        {
          t: '上游看到的 URI 路径如何拼接/裁剪',
          ok: true,
          why: '斜杠细节是反代经典坑；改完用日志核对上游路径。',
        },
        {
          t: '是否必须使用 UDP',
          ok: false,
          why: '与传输协议选型无关。',
        },
        {
          t: 'TLS 证书品牌',
          ok: false,
          why: '无关。',
        },
        {
          t: 'nginx -t 是否可省略',
          ok: false,
          why: '路径问题更要测与验证，不是省略 -t。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['进阶', 'proxy_pass'],
    },
    {
      id: 'concept-nginx-dir:server_name',
      q: '多个 server 都 listen 443 时，靠什么把不同域名分到不同站点？',
      choices: [
        {
          t: 'server_name（配合证书与 SNI）',
          ok: true,
          why: '虚拟主机核心；与 Host/SNI 一致才进对站点。',
        },
        {
          t: '只能靠不同 upstream 名字，不能靠域名',
          ok: false,
          why: '域名匹配在 server_name。',
        },
        {
          t: '靠 Cookie 的 HttpOnly 标志',
          ok: false,
          why: 'HttpOnly 不管虚拟主机选型。',
        },
        {
          t: '靠 DNS TTL 数值',
          ok: false,
          why: 'TTL 管缓存多久，不管选哪个 server 块。',
        },
      ],
      relatedNodes: ['net-nginx', 'dns-https'],
      tags: ['进阶'],
    },
  ],
});

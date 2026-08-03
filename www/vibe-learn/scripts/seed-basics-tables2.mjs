/**
 * 基础全表第二批：Cookie / CORS / 缓存头 / Env / Nginx 指令 / Compose / DSA 线性 / 安全底线
 * 与 seed-basics-tables.mjs 同模式；合并写入 basics-tables-ids.json（不覆盖旧表）
 *
 * node scripts/seed-basics-tables2.mjs
 * 然后：pnpm quiz:glossary
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * @typedef {{
 *   key: string,
 *   term: string,
 *   brief: string,
 *   q: string,
 *   ok: string,
 *   bad: [string, string, string],
 *   nodes: string[],
 *   domain: string,
 * }} Item
 */

/** @type {Record<string, { setId: string, title: string, caption: string, tags: string[], relatedNodes: string[], domain: string, prefix: string, glossaryPrefix: string, items: Item[] }>} */
const TABLES = {
  cookieFlag: {
    setId: 'concept-cookie-flag',
    title: '基础 · Cookie / Session 属性全表',
    caption: 'Cookie、Session、HttpOnly、Secure、SameSite、Domain/Path——Web 会话与 CSRF/XSS 边界。',
    tags: ['Cookie', 'Session', '安全', '基础'],
    relatedNodes: ['http-web', 'craft-security'],
    domain: 'net',
    prefix: 'concept-cookie-flag',
    glossaryPrefix: 'cookie',
    items: [
      {
        key: 'cookie',
        term: 'Cookie',
        brief:
          'Cookie：服务器经 Set-Cookie 让浏览器保存的小段名值对；后续同范围请求自动带上。约 4KB 级，内容对客户端可见（除非 HttpOnly）。',
        q: 'Cookie 主要存在哪里、谁会自动带上？',
        ok: '存在浏览器；符合 Domain/Path 等条件的请求会自动附带',
        bad: ['只存在服务器内存，浏览器永不保存', '只能用 WebSocket 传递', '等同数据库主键'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'session',
        term: 'Session（服务端会话）',
        brief:
          'Session：会话状态存在服务器；浏览器通常只持有 SessionID（常经 Cookie）。强踢下线、即时失效往往比纯 JWT 更顺手。',
        q: '相对 Cookie 里直接塞用户资料，Session 的典型分工？',
        ok: '敏感状态放服务端，浏览器主要持有会话标识',
        bad: ['Session 只能存在 localStorage', 'Session 禁止使用 Cookie 传 ID', 'Session 就是 JWT 的别名'],
        nodes: ['http-web', 'craft-security'],
        domain: 'net',
      },
      {
        key: 'httponly',
        term: 'HttpOnly（Cookie 标志）',
        brief:
          'HttpOnly：标记后文档脚本（如 document.cookie）读不到该 Cookie，降低 XSS 偷会话标识的风险；不防 CSRF。',
        q: 'Cookie 设 HttpOnly 的直接效果？',
        ok: '前端 JS 读不到该 Cookie，降低 XSS 窃取会话风险',
        bad: ['禁止 HTTPS', '自动防住所有 CSRF', '让 Cookie 永不过期'],
        nodes: ['http-web', 'craft-security'],
        domain: 'net',
      },
      {
        key: 'secure',
        term: 'Secure（Cookie 标志）',
        brief:
          'Secure：仅在 HTTPS（安全连接）请求中发送该 Cookie，降低明文信道被窃听风险。',
        q: 'Cookie 的 Secure 标志表示？',
        ok: '只在 HTTPS 请求中发送该 Cookie',
        bad: ['只允许 HTTP 明文发送', '等同 HttpOnly', '表示 Cookie 永不发送'],
        nodes: ['http-web', 'host-tls'],
        domain: 'net',
      },
      {
        key: 'samesite',
        term: 'SameSite（Cookie 标志）',
        brief:
          'SameSite：控制跨站请求是否带 Cookie（Lax/Strict/None）；是缓解 CSRF 的关键手段之一，不能替代 XSS 防护。',
        q: 'SameSite 主要用来缓解哪类问题？',
        ok: '跨站请求伪造（CSRF）：限制跨站请求是否附带 Cookie',
        bad: ['SQL 注入', '磁盘配额耗尽', 'DNS 污染'],
        nodes: ['http-web', 'craft-security'],
        domain: 'net',
      },
      {
        key: 'domain_path',
        term: 'Cookie Domain / Path',
        brief:
          'Domain / Path：限定 Cookie 作用的主机与路径范围；范围过大易扩大泄漏与 CSRF 面，应按最小必要设置。',
        q: 'Cookie 的 Domain / Path 决定什么？',
        ok: '哪些主机与路径的请求会附带该 Cookie',
        bad: ['HTTP 状态码含义', 'TLS 证书品牌', 'Docker 镜像标签'],
        nodes: ['http-web'],
        domain: 'net',
      },
    ],
  },

  corsKw: {
    setId: 'concept-cors-kw',
    title: '基础 · CORS 名词全表',
    caption: '同源、Origin、简单请求、预检 OPTIONS、Allow-Origin——浏览器跨域读响应的规则。',
    tags: ['CORS', 'HTTP', '基础'],
    relatedNodes: ['http-web', 'reverse-proxy'],
    domain: 'net',
    prefix: 'concept-cors-kw',
    glossaryPrefix: 'cors',
    items: [
      {
        key: 'same_origin',
        term: '同源（Same-Origin）',
        brief:
          '同源：协议、主机、端口三者皆同。任一不同即跨源；浏览器据此限制前端脚本读跨源响应。',
        q: '浏览器「同源」通常比哪三样？',
        ok: '协议、主机（域名）、端口',
        bad: ['仅文件扩展名', '仅 User-Agent', '仅 Cookie 名'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'origin',
        term: 'Origin 请求头',
        brief:
          'Origin：浏览器在跨源请求中标明页面来源（协议+主机+端口）。服务器用它决定是否放行 CORS。',
        q: '跨源请求里 Origin 头表示？',
        ok: '发起页面的协议+主机+端口来源',
        bad: ['服务器磁盘路径', 'JWT 私钥', 'Docker 网络名'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'preflight',
        term: 'CORS 预检（Preflight）',
        brief:
          '预检：对「非简单」跨源请求，浏览器先发 OPTIONS 询问服务器是否允许方法/头，通过后再发真实请求。',
        q: 'CORS 预检常见用什么方法先问服务器？',
        ok: 'OPTIONS',
        bad: ['TRACE 专用且必须带 body', 'CONNECT 隧道', 'PURGE 缓存专用'],
        nodes: ['http-web', 'http-hands-on'],
        domain: 'net',
      },
      {
        key: 'acao',
        term: 'Access-Control-Allow-Origin',
        brief:
          'Access-Control-Allow-Origin：响应头，声明哪些 Origin 可读该响应。生产慎用 * 搭配凭证；常与反代同源转发对照。',
        q: 'Access-Control-Allow-Origin 的作用？',
        ok: '告诉浏览器哪些来源可以读取该跨源响应',
        bad: ['设置 Cookie 的 HttpOnly', '指定数据库连接串', '替换 TLS 证书'],
        nodes: ['http-web', 'reverse-proxy'],
        domain: 'net',
      },
    ],
  },

  cacheHdr: {
    setId: 'concept-cache-hdr',
    title: '基础 · HTTP 缓存头全表',
    caption: 'Cache-Control、Expires、ETag、Last-Modified、强缓存 vs 协商缓存。',
    tags: ['缓存', 'HTTP', '基础'],
    relatedNodes: ['http-web', 'net-edge-practice'],
    domain: 'net',
    prefix: 'concept-cache-hdr',
    glossaryPrefix: 'cache',
    items: [
      {
        key: 'cache_control',
        term: 'Cache-Control',
        brief:
          'Cache-Control：控制缓存的主头（max-age、no-cache、no-store、private/public 等）。强缓存未过期时常直接用本地副本。',
        q: '现代 HTTP 强缓存更常看哪个响应头？',
        ok: 'Cache-Control（如 max-age）',
        bad: ['仅 Server 头', '仅 Set-Cookie', '仅 Content-Language'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'expires',
        term: 'Expires',
        brief:
          'Expires：绝对过期时间的老标准；优先级通常低于 Cache-Control。理解遗留系统时仍会遇到。',
        q: '相对 Cache-Control，Expires 更像？',
        ok: '用绝对时间表达过期的较老机制，优先级通常更低',
        bad: ['TLS 握手专用', 'CORS 预检专用', '表示永久删除资源'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'etag',
        term: 'ETag',
        brief:
          'ETag：资源内容指纹；客户端用 If-None-Match 协商，未变常回 304。比纯时间戳更精确。',
        q: 'ETag 在协商缓存里扮演？',
        ok: '内容指纹，配合 If-None-Match 判断是否 304',
        bad: ['用户密码哈希存浏览器', '仅表示 TCP 窗口大小', 'Docker 镜像 digest 的浏览器别名'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'last_modified',
        term: 'Last-Modified',
        brief:
          'Last-Modified：资源上次修改时间；客户端用 If-Modified-Since 协商。精度与时钟问题下常不如 ETag。',
        q: 'Last-Modified / If-Modified-Since 属于？',
        ok: '基于修改时间的协商缓存机制',
        bad: ['强行关闭 TLS', 'SQL 事务隔离级别', '仅用于 WebSocket 升级'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'strong_vs_revalidate',
        term: '强缓存 vs 协商缓存',
        brief:
          '强缓存：未过期可不打服务器直接用；协商缓存：带验证头问服务器，304 用本地或 200 拿新内容。',
        q: '强缓存与协商缓存的核心差别？',
        ok: '强缓存未过期可不请求；协商要带验证头问服务器变了没',
        bad: ['二者都禁止任何缓存', '协商缓存只能用于 UDP', '强缓存等于必须每次下载全文'],
        nodes: ['http-web', 'net-edge-practice'],
        domain: 'net',
      },
    ],
  },

  envKw: {
    setId: 'concept-env-kw',
    title: '基础 · 环境变量 / .env 全表',
    caption: 'PATH、export、.env、代理变量、process.env——密钥与机器差的地基。',
    tags: ['环境变量', '.env', '代理', '基础'],
    relatedNodes: ['data-env', 'installers-path', 'craft-security'],
    domain: 'craft',
    prefix: 'concept-env-kw',
    glossaryPrefix: 'env_kw',
    items: [
      {
        key: 'env_var',
        term: '环境变量',
        brief:
          '环境变量：进程可见的「名=值」配置；子进程常继承。密钥、代理、路径等多放这里，勿写进将提交的源码。',
        q: '环境变量最贴切的描述？',
        ok: '对当前进程可见的名值配置，子进程常可继承',
        bad: ['只能存在 Git 提交里', '等同 HTTP 响应体', '浏览器 CSS 变量的服务端别名'],
        nodes: ['data-env'],
        domain: 'craft',
      },
      {
        key: 'path',
        term: 'PATH',
        brief:
          'PATH：特殊环境变量，列出 shell 搜索可执行文件的目录列表；「command not found」常先查 PATH。',
        q: 'PATH 环境变量的作用？',
        ok: '告诉 shell 到哪些目录找可执行命令',
        bad: ['指定 HTTP 代理端口', '存放 API Key 的唯一合法位置', 'Docker 镜像仓库地址'],
        nodes: ['data-env', 'installers-path'],
        domain: 'craft',
      },
      {
        key: 'export',
        term: 'export（shell）',
        brief:
          'export：把变量标进当前 shell 环境，供后续子进程继承；关终端会话通常即失效（除非写入配置文件）。',
        q: 'Bash 里 export MY=1 的效果？',
        ok: '写入当前 shell 环境，后续命令/子进程可见',
        bad: ['永久写入远程 Git 仓库', '等同 chmod +x', '删除 PATH'],
        nodes: ['data-env', 'linux-cli'],
        domain: 'craft',
      },
      {
        key: 'dotenv',
        term: '.env 文件',
        brief:
          '.env：本地键值文本，工具可读入变成环境变量；通常含真实密钥，必须 gitignore，勿提交。',
        q: '.env 文件的正确用法？',
        ok: '本机密钥与环境差；通常不进 Git',
        bad: ['应提交生产真实 Key 方便协作', '替代 TLS 证书', '只能存 CSS 颜色'],
        nodes: ['data-env', 'craft-security'],
        domain: 'craft',
      },
      {
        key: 'dotenv_example',
        term: '.env.example',
        brief:
          '.env.example：只列键名与假值/说明，可以进仓库，作为同事与 CI 的填写模板。',
        q: '.env.example 相对 .env？',
        ok: '可提交的键名/假值模板，不含真实密钥',
        bad: ['必须加密才能进 Git', '应复制生产密钥明文', '禁止出现在文档里'],
        nodes: ['data-env', 'craft-security'],
        domain: 'craft',
      },
      {
        key: 'http_proxy',
        term: 'HTTP_PROXY / HTTPS_PROXY',
        brief:
          'HTTP_PROXY / HTTPS_PROXY：告诉许多工具出网走哪个代理（如本机 7890）。国内拉 GitHub/npm 常见设置。',
        q: '出网拉 GitHub/npm 失败时，环境侧常见设置？',
        ok: 'HTTP_PROXY / HTTPS_PROXY 指向本机或公司代理',
        bad: ['删除全部环境变量', '把代理写成 git commit message', '只能设 FTP_ONLY_PROXY'],
        nodes: ['data-env', 'clash'],
        domain: 'craft',
      },
      {
        key: 'no_proxy',
        term: 'NO_PROXY',
        brief:
          'NO_PROXY：列出不走代理的主机（常含 127.0.0.1,localhost,::1），避免本机回环也被代理绕一圈。',
        q: 'NO_PROXY 的典型用途？',
        ok: '指定哪些主机不走 HTTP(S)_PROXY',
        bad: ['禁用全部网络', '清空 PATH', '强制所有流量走 Tor'],
        nodes: ['data-env', 'clash'],
        domain: 'craft',
      },
      {
        key: 'process_env',
        term: 'process.env（Node）',
        brief:
          'process.env：Node 进程读取环境变量的对象；值为字符串或 undefined。启动前注入，不是运行时随意改 OS 全局的唯一方式。',
        q: 'Node 里读取环境变量的标准方式？',
        ok: 'process.env.NAME',
        bad: ['window.env 在纯服务端', 'document.cookie 读系统 PATH', 'require("os").envKey 官方唯一'],
        nodes: ['data-env', 'runtime-nodejs'],
        domain: 'craft',
      },
    ],
  },

  nginxDir: {
    setId: 'concept-nginx-dir',
    title: '基础 · Nginx 指令 / 操作全表',
    caption: 'server、location、proxy_pass、listen、upstream、nginx -t、reload——门面配置单词。',
    tags: ['Nginx', '反代', '基础'],
    relatedNodes: ['net-nginx', 'reverse-proxy'],
    domain: 'net',
    prefix: 'concept-nginx-dir',
    glossaryPrefix: 'nginx_dir',
    items: [
      {
        key: 'server',
        term: 'Nginx server 块',
        brief:
          'server：一组虚拟主机配置（监听、域名、location 等）。一台 Nginx 可有多个 server。',
        q: 'Nginx 的 server 块大致表示？',
        ok: '一个虚拟主机/站点的配置单元',
        bad: ['数据库事务', '仅 Docker 网络别名', 'Git remote 名'],
        nodes: ['net-nginx'],
        domain: 'net',
      },
      {
        key: 'location',
        term: 'Nginx location',
        brief:
          'location：按 URI 路径匹配规则；可挂静态 root、反代 proxy_pass、重写等。路径拼接细节影响上游看到的 URI。',
        q: 'location 指令主要按什么匹配？',
        ok: '请求 URI 路径（可配前缀/正则等规则）',
        bad: ['仅按客户端 MAC', '仅按 SQL 表名', '仅按 Git 分支'],
        nodes: ['net-nginx', 'http-web'],
        domain: 'net',
      },
      {
        key: 'proxy_pass',
        term: 'proxy_pass',
        brief:
          'proxy_pass：把匹配到的请求转到上游（如 http://127.0.0.1:3000）。反代核心；尾斜杠会影响路径拼接。',
        q: 'proxy_pass 在 Nginx 里做什么？',
        ok: '把请求转发到指定上游地址',
        bad: ['编译 Nginx 源码', '删除上游进程', '在浏览器执行 SQL'],
        nodes: ['net-nginx', 'reverse-proxy'],
        domain: 'net',
      },
      {
        key: 'listen',
        term: 'listen',
        brief:
          'listen：指定 server 监听的地址/端口（如 80、443 ssl）。公网入口常见只暴露 443。',
        q: 'Nginx listen 80 表示？',
        ok: '该 server 在 80 端口接受连接',
        bad: ['监听 Git 协议专用且不能改', '表示进程优先级', '等同关闭防火墙'],
        nodes: ['net-nginx', 'network-basics'],
        domain: 'net',
      },
      {
        key: 'upstream',
        term: 'upstream',
        brief:
          'upstream：定义一组后端服务器，供 proxy_pass 引用，可做简单负载。不是容器专有词。',
        q: 'Nginx upstream 的用途？',
        ok: '声明一组后端，供反代负载/引用',
        bad: ['定义 CSS 变量', '存储 JWT 私钥', '替代 DNS 根服务器'],
        nodes: ['net-nginx', 'reverse-proxy'],
        domain: 'net',
      },
      {
        key: 'nginx_t',
        term: 'nginx -t',
        brief:
          'nginx -t：测试配置语法/基本正确性。改 conf 后应先 -t 再 reload，避免写挂全站。',
        q: '改完 nginx.conf，上线前应先？',
        ok: 'nginx -t 测配置，通过后再 reload',
        bad: ['直接 rm -rf /', '必须重启物理机电源', '改 conf 会自动 git push'],
        nodes: ['net-nginx'],
        domain: 'net',
      },
      {
        key: 'reload',
        term: 'Nginx reload',
        brief:
          'reload：热加载配置（如 nginx -s reload / systemctl reload nginx），多数改动无需掐断全部连接硬重启。',
        q: 'Nginx reload 相对硬重启进程？',
        ok: '热载配置，通常比杀进程重启更平滑',
        bad: ['清空所有磁盘', '只重载浏览器缓存', '删除上游数据库'],
        nodes: ['net-nginx'],
        domain: 'net',
      },
      {
        key: 'root_static',
        term: 'root / 静态资源',
        brief:
          'root（及 alias）：把 URI 映射到磁盘目录，直接返回静态文件，不经应用逻辑。与 proxy_pass 反代业务 API 对照。',
        q: '用 root 挂静态目录相对 proxy_pass 的差别？',
        ok: '直接由 Nginx 读磁盘文件返回，不必进上游应用',
        bad: ['root 只能反代 gRPC', 'root 会执行 SQL', '二者完全无法共存于同一 server'],
        nodes: ['net-nginx', 'http-web'],
        domain: 'net',
      },
    ],
  },

  composeKw: {
    setId: 'concept-compose-kw',
    title: '基础 · Compose YAML 字段全表',
    caption: 'services、image、build、ports、volumes、depends_on——多容器编排单词。',
    tags: ['Compose', 'Docker', '基础'],
    relatedNodes: ['ops-compose', 'ops-docker'],
    domain: 'ops',
    prefix: 'concept-compose-kw',
    glossaryPrefix: 'compose_kw',
    items: [
      {
        key: 'services',
        term: 'Compose services',
        brief:
          'services：声明有哪些容器角色（如 redis、app）。Compose 管「一套」，docker run 管「一个」。',
        q: 'compose.yaml 里 services 表示？',
        ok: '要编排的各个容器角色定义',
        bad: ['仅宿主机 systemd 单元列表', '仅 Git submodule', '仅 Nginx upstream 名'],
        nodes: ['ops-compose'],
        domain: 'ops',
      },
      {
        key: 'image',
        term: 'Compose image',
        brief:
          'image：使用已有镜像名（可含标签）启动服务，不必本地 build。',
        q: 'services.redis.image: redis:7 的意思？',
        ok: '该服务用名为 redis:7 的镜像运行',
        bad: ['在宿主机安装 apt 包 redis', '删除所有卷', '只生成 Dockerfile 不运行'],
        nodes: ['ops-compose', 'ops-docker'],
        domain: 'ops',
      },
      {
        key: 'build',
        term: 'Compose build',
        brief:
          'build：按 Dockerfile（或上下文）本地构建镜像再运行；与直接 image 拉现成对照。',
        q: 'Compose 的 build 字段表示？',
        ok: '从本地 Dockerfile/上下文构建镜像',
        bad: ['只下载不含构建', '编译宿主机内核', '强制 git push'],
        nodes: ['ops-compose', 'ops-docker'],
        domain: 'ops',
      },
      {
        key: 'ports',
        term: 'Compose ports',
        brief:
          'ports：宿主机端口:容器端口映射，如 6379:6379，让本机进程连 localhost 进容器。',
        q: 'ports: ["6379:6379"] 表示？',
        ok: '把宿主机 6379 映射到容器 6379',
        bad: ['设置 HTTP 状态码', '修改镜像架构', '等同 depends_on'],
        nodes: ['ops-compose', 'network-basics'],
        domain: 'ops',
      },
      {
        key: 'volumes',
        term: 'Compose volumes',
        brief:
          'volumes：把容器内目录持久化到命名卷或宿主机路径，避免删容器丢数据。卷 ≠ 镜像只读层。',
        q: 'Compose volumes 的核心收益？',
        ok: '数据持久化，删容器不必然丢库文件',
        bad: ['加快 CPU 主频', '替代 TLS', '禁止端口映射'],
        nodes: ['ops-compose'],
        domain: 'ops',
      },
      {
        key: 'depends_on',
        term: 'depends_on',
        brief:
          'depends_on：启动顺序提示（先起 A 再起 B）；不等于健康检查「已可接受连接」。',
        q: 'depends_on 保证了什么、不保证什么？',
        ok: '大致启动顺序；不保证依赖已就绪可连',
        bad: ['保证 TCP 一定连通', '自动做数据库迁移', '等同 Kubernetes 全集群调度'],
        nodes: ['ops-compose'],
        domain: 'ops',
      },
    ],
  },

  dsaLinear: {
    setId: 'concept-dsa-linear-kw',
    title: '基础 · 线性结构全表',
    caption: '数组、链表、栈、队列、双端队列、哑节点——DSA 底座一物一题。',
    tags: ['DSA', '线性结构', '基础'],
    relatedNodes: ['dsa-linear', 'dsa-complexity'],
    domain: 'dsa',
    prefix: 'concept-dsa-linear-kw',
    glossaryPrefix: 'dsa_lin',
    items: [
      {
        key: 'array',
        term: '数组 / 动态数组',
        brief:
          '数组：下标连续，随机访问 O(1)；中部插入删除常 O(n)。JS Array 日常当动态数组用。',
        q: '数组相对链表的突出优点？',
        ok: '按下标随机访问快（常 O(1)）',
        bad: ['任意位置插入永远比链表便宜', '不能存引用类型', '只能用递归访问'],
        nodes: ['dsa-linear'],
        domain: 'dsa',
      },
      {
        key: 'linked_list',
        term: '链表',
        brief:
          '链表：节点用指针/引用串联；已知节点时局部插入删除便宜，随机访问要 O(n)。常考反转、环、合并。',
        q: '链表相对数组的典型代价？',
        ok: '按下标随机访问慢，常要 O(n) 遍历',
        bad: ['永远不能插入', '缓存一定更好', '只能实现队列不能实现栈'],
        nodes: ['dsa-linear'],
        domain: 'dsa',
      },
      {
        key: 'stack',
        term: '栈（Stack）',
        brief:
          '栈：LIFO 后进先出；一端进出。典型：括号匹配、撤销、DFS/递归模拟。',
        q: '栈（LIFO）更贴哪类场景？',
        ok: '括号匹配、撤销、深度优先的回溯',
        bad: ['银行叫号先来先服务', '必须 O(1) 取第 k 大', '只能用队列实现且禁止数组'],
        nodes: ['dsa-linear'],
        domain: 'dsa',
      },
      {
        key: 'queue',
        term: '队列（Queue）',
        brief:
          '队列：FIFO 先进先出；典型 BFS、任务排队。JS 可用数组 push + shift 模拟（大数据量注意 shift 成本）。',
        q: '队列（FIFO）更贴？',
        ok: '广度优先、公平排队：先入先出',
        bad: ['括号嵌套匹配的主结构', '只能后进先出', '必须哈希才能实现'],
        nodes: ['dsa-linear'],
        domain: 'dsa',
      },
      {
        key: 'deque',
        term: '双端队列（Deque）',
        brief:
          '双端队列：两头都能进出；滑动窗口最值等题常用单调双端队列。',
        q: '双端队列相对普通队列？',
        ok: '两端都可插入/删除，适合窗口最值等题',
        bad: ['只能从一端操作', '等同二叉树', '禁止用于 BFS'],
        nodes: ['dsa-linear', 'dsa-hot'],
        domain: 'dsa',
      },
      {
        key: 'dummy',
        term: '哑节点（Dummy）',
        brief:
          '哑节点：链表题里放在真头前的哨兵，简化头插/头删边界，少写空指针特判。',
        q: '链表题里哑节点（dummy）的主要价值？',
        ok: '简化头结点边界，少写空指针特判',
        bad: ['提高 CPU 主频', '替代哈希表', '强制改成数组'],
        nodes: ['dsa-linear'],
        domain: 'dsa',
      },
    ],
  },

  secKw: {
    setId: 'concept-sec-kw',
    title: '基础 · 开发者安全底线全表',
    caption: 'SQL 注入、XSS、命令注入、密钥泄漏、参数化——别把脚打穿。',
    tags: ['安全', 'OWASP', '基础'],
    relatedNodes: ['craft-security', 'data-env'],
    domain: 'craft',
    prefix: 'concept-sec-kw',
    glossaryPrefix: 'sec_kw',
    items: [
      {
        key: 'sqli',
        term: 'SQL 注入',
        brief:
          'SQL 注入：不可信输入改变了 SQL 结构。防御：参数化/预编译/ORM 绑定，禁止字符串拼接查询。',
        q: '防 SQL 注入的首要做法？',
        ok: '参数化/预编译绑定，勿拼接用户输入进 SQL',
        bad: ['只靠把按钮藏起来', '关闭数据库日志', '改用更大的字体'],
        nodes: ['craft-security', 'db-sql-hands-on'],
        domain: 'craft',
      },
      {
        key: 'xss',
        term: 'XSS（跨站脚本）',
        brief:
          'XSS：不可信输入当脚本在别人浏览器执行。防御：按上下文输出编码；勿把未消毒 HTML 当可信；Cookie 可加 HttpOnly。',
        q: 'XSS 的核心风险？',
        ok: '恶意脚本在受害者浏览器执行，可偷数据或冒充操作',
        bad: ['只能攻击数据库端口', '等同 CSRF 且同一防御即可', '只发生在 UDP'],
        nodes: ['craft-security', 'http-web'],
        domain: 'craft',
      },
      {
        key: 'cmdi',
        term: '命令注入',
        brief:
          '命令注入：用户输入进了 shell/exec。防御：避免 shell；参数白名单；用数组形式传参而非字符串拼接命令行。',
        q: '调用系统命令时更稳妥的是？',
        ok: '避免经 shell 拼接；白名单参数，数组形式传参',
        bad: ['把用户输入直接拼进 bash -c', '关闭所有日志', '只用 GET 就不会注入'],
        nodes: ['craft-security'],
        domain: 'craft',
      },
      {
        key: 'secret_leak',
        term: '密钥泄漏应急',
        brief:
          '密钥进 Git/日志：先在服务商处轮换/吊销，再清配置与历史。只删提交不能替代轮换——机器人可能已扫到。',
        q: '发现 API Key 已进公开仓库，第一步硬动作？',
        ok: '立刻在服务商处轮换/吊销该 Key',
        bad: ['只改文件名继续用同一 Key', '只 force-push 删历史就够', '写进 README 说明已泄漏'],
        nodes: ['craft-security', 'data-env'],
        domain: 'craft',
      },
      {
        key: 'authz',
        term: '服务端鉴权',
        brief:
          '鉴权：每个敏感接口服务端再判身份与权限；只藏前端按钮或关鉴权「图省事」上生产是事故。',
        q: '敏感 API 的鉴权应落在？',
        ok: '服务端对每个敏感接口再校验',
        bad: ['只靠隐藏前端按钮', '只靠注释写「内部接口」', '只靠仓库私有'],
        nodes: ['craft-security', 'http-web'],
        domain: 'craft',
      },
    ],
  },
};

function esc(s) {
  return JSON.stringify(s);
}

function writeQuizSet(table) {
  const qs = table.items.map((it) => ({
    id: `${table.prefix}:${it.key}`,
    q: it.q,
    choices: [
      { t: it.ok, ok: true, why: it.brief.slice(0, 140) },
      ...it.bad.map((t) => ({
        t,
        ok: false,
        why: `与「${it.term}」不符。`,
      })),
    ],
    relatedNodes: it.nodes,
    tags: ['基础', it.key],
  }));
  return `import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: ${esc(table.setId)},
  title: ${esc(table.title)},
  kind: 'concept',
  domain: ${esc(table.domain)},
  tags: ${esc(table.tags)},
  relatedNodes: ${esc(table.relatedNodes)},
  caption: ${esc(table.caption)},
  questions: ${JSON.stringify(qs, null, 2)},
});
`;
}

// —— glossary：按 key 缺失才追加 ——
const glossPath = path.join(root, 'src/data/glossary.js');
let gloss = fs.readFileSync(glossPath, 'utf8');
const missingGloss = [];
for (const table of Object.values(TABLES)) {
  for (const it of table.items) {
    const gKey = `${table.glossaryPrefix}_${it.key}`;
    if (!gloss.includes(`${gKey}:`)) missingGloss.push(gKey);
  }
}
if (missingGloss.length) {
  const lines = ['\n  /* —— 基础全表名词 batch2（seed-basics-tables2） —— */'];
  for (const table of Object.values(TABLES)) {
    for (const it of table.items) {
      const gKey = `${table.glossaryPrefix}_${it.key}`;
      if (!missingGloss.includes(gKey)) continue;
      lines.push(`  ${gKey}: {`);
      lines.push(`    term: ${esc(it.term)},`);
      lines.push(`    brief: ${esc(it.brief)},`);
      lines.push(`    also: ${esc(it.nodes)},`);
      lines.push(`  },`);
    }
  }
  const insertAt = gloss.lastIndexOf('\n};');
  gloss = gloss.slice(0, insertAt) + lines.join('\n') + gloss.slice(insertAt);
  fs.writeFileSync(glossPath, gloss);
  console.log('glossary: appended', missingGloss.length, 'keys');
} else {
  console.log('glossary: all batch2 keys present');
}

// —— quiz sets ——
const setsDir = path.join(root, 'src/data/quiz/sets');
for (const table of Object.values(TABLES)) {
  fs.writeFileSync(path.join(setsDir, `${table.setId}.js`), writeQuizSet(table));
  console.log('wrote', table.setId, table.items.length);
}

// —— merge audit ids ——
const idsPath = path.join(root, 'scripts/basics-tables-ids.json');
const prev = fs.existsSync(idsPath)
  ? JSON.parse(fs.readFileSync(idsPath, 'utf8'))
  : {};
for (const table of Object.values(TABLES)) {
  prev[table.setId] = table.items.map((i) => `${table.prefix}:${i.key}`);
}
fs.writeFileSync(idsPath, JSON.stringify(prev, null, 2) + '\n');
console.log(
  'basics-tables-ids.json merged, sets=',
  Object.keys(prev).length,
  'ids=',
  Object.values(prev).reduce((n, a) => n + a.length, 0)
);
console.log('next: node scripts/sync-basics-node-terms.mjs && pnpm quiz:glossary');

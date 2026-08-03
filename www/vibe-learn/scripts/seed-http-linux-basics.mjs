/**
 * 种子：HTTP 状态码 + Linux 基础命令 → glossary / NODE_TERMS / curated 一题一码
 * node scripts/seed-http-linux-basics.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** @type {{ code: string, term: string, brief: string, q: string, ok: string, bad: [string,string,string] }[]} */
const HTTP = [
  {
    code: '200',
    term: 'HTTP 200 OK',
    brief:
      'HTTP 200 OK：请求已成功，响应体通常携带所请求的资源表示；是最常见的成功状态码。大厂联调时先确认业务是否真成功，勿只看「有响应」。',
    q: 'HTTP 200 OK 表示？',
    ok: '请求成功，响应通常携带资源表示',
    bad: ['资源一定不存在', '必须携带新创建资源的 Location', '仅表示 TLS 握手成功'],
  },
  {
    code: '201',
    term: 'HTTP 201 Created',
    brief:
      'HTTP 201 Created：请求已成功且服务器已创建新资源；响应常带 Location 指向新资源。POST/PUT 创建场景的大厂约定，勿与 200 混用掩盖「已创建」。',
    q: 'HTTP 201 Created 更适合？',
    ok: '成功创建了新资源（常带 Location）',
    bad: ['删除资源成功', '客户端未认证', '网关超时'],
  },
  {
    code: '204',
    term: 'HTTP 204 No Content',
    brief:
      'HTTP 204 No Content：成功处理但响应无正文；常见于 DELETE 成功或无需回写体的更新。客户端不应期望解析 JSON body。',
    q: 'HTTP 204 No Content 表示？',
    ok: '成功但没有响应正文',
    bad: ['资源未找到', '请求体格式错误', '服务器内部错误'],
  },
  {
    code: '301',
    term: 'HTTP 301 Moved Permanently',
    brief:
      'HTTP 301 Moved Permanently：资源永久迁移；客户端与搜索引擎应改记新 URL。缓存与 SEO 敏感，勿拿 301 做临时活动跳转。',
    q: 'HTTP 301 表示？',
    ok: '资源永久换址，应更新书签/索引到新 URL',
    bad: ['仅本次临时跳转', '客户端权限不足', '上游网关坏了'],
  },
  {
    code: '302',
    term: 'HTTP 302 Found',
    brief:
      'HTTP 302 Found：临时重定向（历史语义混杂）；许多客户端会把 POST 改成 GET。需要保留方法时优先考虑 307/308。',
    q: 'HTTP 302 常见含义与坑？',
    ok: '临时重定向；部分客户端可能把 POST 变成 GET',
    bad: ['永久迁移且 SEO 应改索引', '表示资源创建成功', '表示未授权'],
  },
  {
    code: '304',
    term: 'HTTP 304 Not Modified',
    brief:
      'HTTP 304 Not Modified：协商缓存命中，正文不传；依赖 If-None-Match / If-Modified-Since 与 ETag/Last-Modified。用于省带宽，不是错误。',
    q: 'HTTP 304 Not Modified 表示？',
    ok: '协商缓存命中，可继续用本地缓存，无新正文',
    bad: ['资源永久删除', '必须重新下载全文', '网关错误'],
  },
  {
    code: '307',
    term: 'HTTP 307 Temporary Redirect',
    brief:
      'HTTP 307 Temporary Redirect：临时重定向且禁止擅自改请求方法与正文；比 302 语义更清晰，适合 API 临时换入口。',
    q: '相对 302，HTTP 307 更强调？',
    ok: '临时跳转且不应擅自改方法/正文',
    bad: ['永久改址', '创建成功', '缓存命中无正文'],
  },
  {
    code: '308',
    term: 'HTTP 308 Permanent Redirect',
    brief:
      'HTTP 308 Permanent Redirect：永久重定向且保留原方法与正文；比 301 更适合「POST 也要跟到新 URL」的 API 场景。',
    q: 'HTTP 308 相对 301？',
    ok: '永久跳转且保留方法/正文语义更严',
    bad: ['临时跳转', '未认证', '无内容成功'],
  },
  {
    code: '400',
    term: 'HTTP 400 Bad Request',
    brief:
      'HTTP 400 Bad Request：请求语法或语义无法被服务器理解（缺字段、JSON 非法、参数校验失败等）。大厂应返回可机器解析的错误体，勿只用 500 糊弄客户端错误。',
    q: 'HTTP 400 Bad Request 典型场景？',
    ok: '请求本身不合法（参数/格式/校验失败）',
    bad: ['Token 过期应优选用 400 而非 401', '上游超时', '资源不存在应优选用 400 而非 404'],
  },
  {
    code: '401',
    term: 'HTTP 401 Unauthorized',
    brief:
      'HTTP 401 Unauthorized：未提供或凭证无效；应触发重新认证。名称历史误导，实质是 authentication 失败，与 403 授权失败区分。',
    q: 'HTTP 401 相对 403？',
    ok: '未认证或凭证无效；403 是已识别但无权限',
    bad: ['两者完全同义', '表示创建成功', '表示缓存命中'],
  },
  {
    code: '403',
    term: 'HTTP 403 Forbidden',
    brief:
      'HTTP 403 Forbidden：服务器理解请求且通常已识别身份，但拒绝执行（权限/策略）。客户端换 Token 未必有用，需改角色或资源 ACL。',
    q: 'HTTP 403 Forbidden 表示？',
    ok: '已理解请求但拒绝授权访问',
    bad: ['资源一定不存在', '仅表示 JSON 写错', '网关连不上上游'],
  },
  {
    code: '404',
    term: 'HTTP 404 Not Found',
    brief:
      'HTTP 404 Not Found：目标资源不存在或对调用方不可见。联调先查路径、挂载与路由；有时故意对无权限也回 404 以防枚举。',
    q: 'HTTP 404 Not Found 表示？',
    ok: '服务器响应了，但目标资源不存在（或不可见）',
    bad: ['服务器硬件损坏', 'TLS 握手成功的别名', '创建成功'],
  },
  {
    code: '405',
    term: 'HTTP 405 Method Not Allowed',
    brief:
      'HTTP 405 Method Not Allowed：URI 存在但不支持该 HTTP 方法；响应宜带 Allow 列出可用方法。例如对只读资源发 DELETE。',
    q: 'HTTP 405 表示？',
    ok: '资源在，但当前方法不被允许',
    bad: ['域名解析失败', '未登录', '网关超时'],
  },
  {
    code: '408',
    term: 'HTTP 408 Request Timeout',
    brief:
      'HTTP 408 Request Timeout：服务器等待请求完整到达超时。与 504（网关等上游）不同，偏客户端发送过慢或连接空闲。',
    q: 'HTTP 408 更接近？',
    ok: '服务器等请求超时（客户端侧发送/空闲问题居多）',
    bad: ['上游应用挂了的网关超时（504）', '永久重定向', '创建成功'],
  },
  {
    code: '409',
    term: 'HTTP 409 Conflict',
    brief:
      'HTTP 409 Conflict：与当前资源状态冲突，如乐观锁版本不符、唯一键冲突。大厂 API 常用其表达「可重试的状态冲突」而非笼统 400。',
    q: 'HTTP 409 Conflict 典型？',
    ok: '与资源当前状态冲突（版本/唯一约束等）',
    bad: ['文件一定物理损坏', 'DNS 失败', '缓存命中'],
  },
  {
    code: '413',
    term: 'HTTP 413 Content Too Large',
    brief:
      'HTTP 413 Content Too Large（Payload Too Large）：请求体超过服务器或网关限制。上传接口需在反代与应用层同时设限并返回清晰错误。',
    q: 'HTTP 413 表示？',
    ok: '请求体过大，被服务器/网关拒绝',
    bad: ['URL 不存在', '未授权', '永久跳转'],
  },
  {
    code: '415',
    term: 'HTTP 415 Unsupported Media Type',
    brief:
      'HTTP 415 Unsupported Media Type：Content-Type 不被支持，如接口只要 application/json 却收到 form。检查头与序列化，而非乱改状态码为 500。',
    q: 'HTTP 415 表示？',
    ok: '媒体类型（Content-Type）不被支持',
    bad: ['路径不存在', '网关坏掉', '缓存命中'],
  },
  {
    code: '429',
    term: 'HTTP 429 Too Many Requests',
    brief:
      'HTTP 429 Too Many Requests：触发限流；响应常带 Retry-After。调用方应退避重试，服务方需防刷与配额。大厂开放 API 高频考点。',
    q: 'HTTP 429 表示？',
    ok: '请求过于频繁，触发限流',
    bad: ['资源创建成功', '永久迁移', '仅表示 JSON 语法错'],
  },
  {
    code: '500',
    term: 'HTTP 500 Internal Server Error',
    brief:
      'HTTP 500 Internal Server Error：服务器未捕获的故障。生产应记日志与关联 ID，勿把堆栈直接回给公网；能区分的客户端错误不要一律 500。',
    q: 'HTTP 500 表示？',
    ok: '服务器内部出错，未能正常完成请求',
    bad: ['客户端参数错误的首选码', '未登录的首选码', '缓存命中'],
  },
  {
    code: '502',
    term: 'HTTP 502 Bad Gateway',
    brief:
      'HTTP 502 Bad Gateway：作为网关/反代收到上游无效响应。排障看上游进程、端口、协议是否通，而不是先改前端文案。',
    q: 'HTTP 502 Bad Gateway 常见含义？',
    ok: '网关/反代从上游拿到无效响应',
    bad: ['浏览器缓存命中', '资源创建成功', '客户端 JSON 写错的首选'],
  },
  {
    code: '503',
    term: 'HTTP 503 Service Unavailable',
    brief:
      'HTTP 503 Service Unavailable：服务暂时不可用（过载、维护、熔断）。可带 Retry-After；与 502（上游应答坏）区分：503 更像「现在别来」。',
    q: 'HTTP 503 相对 502？',
    ok: '服务暂时不可用（过载/维护/熔断等）',
    bad: ['永久资源不存在', '未认证', '协商缓存命中'],
  },
  {
    code: '504',
    term: 'HTTP 504 Gateway Timeout',
    brief:
      'HTTP 504 Gateway Timeout：网关等上游超时。查上游耗时、超时配置与依赖慢查询；与 408（等客户端请求）不同。',
    q: 'HTTP 504 Gateway Timeout 表示？',
    ok: '网关等待上游响应超时',
    bad: ['客户端未发送完请求（更偏 408）', '创建成功', '永久跳转'],
  },
];

/** @type {{ id: string, term: string, brief: string, q: string, ok: string, bad: [string,string,string] }[]} */
const LINUX = [
  {
    id: 'pwd',
    term: 'pwd',
    brief:
      'pwd（print working directory）：打印当前工作目录绝对路径。排障与脚本定位的第一步。',
    q: '打印当前工作目录用？',
    ok: 'pwd',
    bad: ['cwd（这是概念名不是命令）', 'where', 'home'],
  },
  {
    id: 'ls',
    term: 'ls',
    brief:
      'ls：列出目录项；常用 ls -la 看隐藏文件与权限。大厂排障先看目录里到底有什么。',
    q: '列出目录（含隐藏）常用？',
    ok: 'ls -la',
    bad: ['dir /s（Bash 里不是正路）', 'list --all', 'show hidden'],
  },
  {
    id: 'cd',
    term: 'cd',
    brief:
      'cd：切换当前工作目录；cd .. 上级，cd ~ 或 cd 回家目录。',
    q: '回到上级目录？',
    ok: 'cd ..',
    bad: ['cd ~~', 'cd // 表示上级', 'cd --parent-only'],
  },
  {
    id: 'tree',
    term: 'tree',
    brief:
      'tree：以树形打印目录结构，便于快速看项目布局；未安装时可用 find 近似。',
    q: '树形查看目录结构常用？',
    ok: 'tree（或发行版包管理安装后使用）',
    bad: ['pwd -R', 'chmod -tree', 'git tree 必装系统命令'],
  },
  {
    id: 'cat',
    term: 'cat',
    brief:
      'cat：串联并打印文件内容到标准输出；小文件快速查看。大文件用 less。',
    q: '把小文件内容直接打到终端？',
    ok: 'cat file',
    bad: ['less 只能创建文件', 'mkdir file', 'chmod file 看内容'],
  },
  {
    id: 'less',
    term: 'less',
    brief:
      'less：可分页、可搜索的文件阅读器；大日志优于 cat。按 q 退出，/ 搜索。',
    q: '分页查看大日志更合适？',
    ok: 'less app.log',
    bad: ['cat 大文件一次灌满终端也总是更好', 'rm -i 看日志', 'pwd app.log'],
  },
  {
    id: 'mkdir',
    term: 'mkdir',
    brief:
      'mkdir：创建目录；mkdir -p a/b/c 可创建中间路径。与 touch（建空文件）不同。',
    q: '创建多级目录（含中间路径）？',
    ok: 'mkdir -p a/b/c',
    bad: ['touch -p a/b/c', 'cat -p a/b/c', 'cd -p a/b/c'],
  },
  {
    id: 'rm',
    term: 'rm',
    brief:
      'rm：删除文件；rm -r 递归删目录。生产慎用 rm -rf；误删难恢复。',
    q: '递归删除目录（需极度谨慎）？',
    ok: 'rm -r dir/（理解风险；生产更要确认路径）',
    bad: ['mkdir -r dir/', 'cp -r 等于删除', 'pwd -rf'],
  },
  {
    id: 'cp',
    term: 'cp',
    brief:
      'cp：复制文件；cp -r 递归复制目录树。备份与发布前的常见操作。',
    q: '递归复制目录？',
    ok: 'cp -r src/ dest/',
    bad: ['cp src/ dest/（无 -r 默认不递归目录）', 'mv -r 专用于复制', 'touch -r 复制内容'],
  },
  {
    id: 'mv',
    term: 'mv',
    brief:
      'mv：移动或重命名文件/目录。同文件系统上常为改名，跨设备则复制+删除。',
    q: '重命名或移动文件？',
    ok: 'mv old new',
    bad: ['cp 只能改名不能复制', 'rm 改名', 'chmod 改名'],
  },
  {
    id: 'grep',
    term: 'grep',
    brief:
      'grep：按正则/字符串检索文本；grep -n 行号，-r 递归。日志排障核心工具；也可用 ripgrep。',
    q: '在文件内容里搜字符串？',
    ok: 'grep -n "error" app.log',
    bad: ['find -name error（偏文件名）', 'chmod error', 'ping error'],
  },
  {
    id: 'find',
    term: 'find',
    brief:
      'find：按名称、时间、权限等元数据遍历目录树；find . -name "*.log"。与 grep 搜内容互补。',
    q: '按文件名在树中找 *.log？',
    ok: 'find . -name "*.log"',
    bad: ['grep -r 只能匹配文件名', 'ls *.log 一定递归全部子目录', 'cat -name'],
  },
  {
    id: 'ps',
    term: 'ps',
    brief:
      'ps：快照进程表；ps aux | grep name 常用于找进程。与 top/htop 实时视图互补。',
    q: '查看进程列表并过滤名称？',
    ok: 'ps aux | grep name',
    bad: ['ls name 看进程', 'mkdir -p name 列进程', 'pwd aux'],
  },
  {
    id: 'top',
    term: 'top',
    brief:
      'top：交互式实时查看 CPU/内存占用进程。负载飙升时第一眼工具之一。',
    q: '实时看谁占 CPU/内存（经典）？',
    ok: 'top',
    bad: ['cat /proc 一次就等于 top 交互', 'chmod +t', 'git top'],
  },
  {
    id: 'htop',
    term: 'htop',
    brief:
      'htop：增强版交互式进程监视（常需安装）；比 top 更易读、可点选。',
    q: '比 top 更易用的交互进程监视（常需安装）？',
    ok: 'htop',
    bad: ['http', 'chmod', 'wget top'],
  },
  {
    id: 'kill',
    term: 'kill',
    brief:
      'kill：向进程发信号；默认 SIGTERM，kill -9 为 SIGKILL（最后手段）。先确认 PID。',
    q: '优雅结束进程常用？',
    ok: 'kill <pid>（默认 SIGTERM；-9 最后手段）',
    bad: ['kill 不需要 pid', 'rm <pid> 杀进程', 'cd <pid>'],
  },
  {
    id: 'chmod',
    term: 'chmod',
    brief:
      'chmod：改文件权限位；chmod +x 加执行权限，或数字如 755。安全基线：密钥文件勿 777。',
    q: '给脚本加可执行权限？',
    ok: 'chmod +x script.sh',
    bad: ['chown +x script.sh', 'chgrp +x', 'umask +x 专用于加执行位'],
  },
  {
    id: 'chown',
    term: 'chown',
    brief:
      'chown：改文件所有者与属组；部署后修正 www 用户权限常见。勿随意 chown -R /。',
    q: '修改文件所有者？',
    ok: 'chown user:group file',
    bad: ['chmod user:group（那是改权限位）', 'pwd user file', 'grep user file 改所有者'],
  },
  {
    id: 'sudo',
    term: 'sudo',
    brief:
      'sudo：以另一用户（常为 root）权限执行命令；有审计。扩大权限即扩大误伤面，勿习惯性 sudo rm -rf。',
    q: '需要管理员权限执行命令时？',
    ok: 'sudo command（理解风险）',
    bad: ['任何命令加 sudo 都更安全', 'sudo 等于关防火墙', '普通用户永不能读自家目录'],
  },
  {
    id: 'curl',
    term: 'curl',
    brief:
      'curl：命令行传数据，常用于调 HTTP API；curl -L 跟随重定向，-o 写文件。大厂联调与 CI 标配。',
    q: '命令行调 HTTP / 下载并跟随重定向常用？',
    ok: 'curl -L -o file URL',
    bad: ['cd URL', 'chmod URL', 'pwd -L URL'],
  },
  {
    id: 'wget',
    term: 'wget',
    brief:
      'wget：非交互下载工具，擅长递归镜像与断点续传；与 curl 互补。',
    q: '非交互下载文件常用？',
    ok: 'wget URL',
    bad: ['cd URL', 'mkdir URL 下载', 'kill URL'],
  },
  {
    id: 'ping',
    term: 'ping',
    brief:
      'ping：用 ICMP 探测主机可达性与往返时延。通 ≠ 业务端口通；还需 ss/curl 查端口与 HTTP。',
    q: '探测主机网络可达（ICMP）？',
    ok: 'ping host',
    bad: ['ping 能代替查 TCP 端口占用', 'chmod host', 'curl 等于 ping 的唯一形式'],
  },
  {
    id: 'tail',
    term: 'tail',
    brief:
      'tail：看文件末尾；tail -f 跟踪追加日志。服务排障看最新错误的首选。',
    q: '跟踪日志文件追加？',
    ok: 'tail -f app.log',
    bad: ['head -f 跟日志', 'wc -f', 'sort -f 专用于跟日志'],
  },
  {
    id: 'head',
    term: 'head',
    brief:
      'head：看文件开头若干行；与 tail 相对。快速瞄配置文件头部。',
    q: '看文件开头几行？',
    ok: 'head -n 20 file',
    bad: ['tail 只能看开头', 'less 不能翻页', 'rm -n 20'],
  },
  {
    id: 'ss',
    term: 'ss',
    brief:
      'ss：查看套接字/端口监听；ss -lntp 看谁占用端口。现代替代部分 netstat 场景。',
    q: '看谁监听了某端口（现代）？',
    ok: 'ss -lntp | grep 3000（或 lsof -i :3000）',
    bad: ['pwd 3000', 'chmod 3000', 'git status :3000'],
  },
  {
    id: 'df',
    term: 'df',
    brief:
      'df：查看文件系统磁盘空间；df -h 人类可读。磁盘满是服务异常经典原因。',
    q: '看各挂载点磁盘空间？',
    ok: 'df -h',
    bad: ['du -h 只看挂载点总量且与 df 完全同义', 'git df', 'npm disk'],
  },
  {
    id: 'du',
    term: 'du',
    brief:
      'du：统计目录占用；du -sh dir 看某目录总大小。与 df（卷容量）互补，用于找大目录。',
    q: '看某个目录占用多大？',
    ok: 'du -sh dir',
    bad: ['df -sh dir 专看单目录文件合计', 'chmod -sh', 'pwd -sh'],
  },
  {
    id: 'tar',
    term: 'tar',
    brief:
      'tar：打包/解包；tar -czf a.tgz dir/ 与 tar -xzf a.tgz 是发布备份经典组合。',
    q: '打包目录为 tar.gz？',
    ok: 'tar -czf a.tgz dir/',
    bad: ['unzip 是处理 tar.gz 的唯一工具', 'tar 只能压单字母文件名', 'tar -czf 会自动 git push'],
  },
  {
    id: 'echo',
    term: 'echo',
    brief:
      'echo：向标准输出打印参数；脚本里拼路径、打调试信息常用。注意引号与通配。',
    q: '向终端打印一段文本？',
    ok: 'echo "hello"',
    bad: ['cat "hello" 作为打印字面量的唯一方式', 'pwd "hello"', 'kill "hello"'],
  },
  {
    id: 'which',
    term: 'which / command -v',
    brief:
      'which 或 command -v：定位命令在 PATH 中的路径。排查「装了但找不到」与多版本冲突。',
    q: '查某个命令实际路径？',
    ok: 'command -v node（或 which node）',
    bad: ['pwd node', 'chmod node 查路径', 'curl node 查本地路径'],
  },
];

function esc(s) {
  return JSON.stringify(s);
}

function glossaryBlock() {
  const lines = ['\n  /* —— HTTP 状态码（一码一名词） —— */'];
  for (const h of HTTP) {
    lines.push(`  http_${h.code}: {`);
    lines.push(`    term: ${esc(h.term)},`);
    lines.push(`    brief: ${esc(h.brief)},`);
    lines.push(`    also: ['http-web', 'http-hands-on'],`);
    lines.push(`  },`);
  }
  lines.push('\n  /* —— Linux 基础命令（一令一名词） —— */');
  for (const c of LINUX) {
    const key = `cli_${c.id.replace(/[^a-z0-9]+/gi, '_')}`;
    lines.push(`  ${key}: {`);
    lines.push(`    term: ${esc(c.term)},`);
    lines.push(`    brief: ${esc(c.brief)},`);
    lines.push(`    also: ['linux-cli', 'terminal-worlds'],`);
    lines.push(`  },`);
  }
  return lines.join('\n');
}

function quizHttp() {
  const qs = HTTP.map((h) => {
    const choices = [
      { t: h.ok, ok: true, why: h.brief.slice(0, 120) },
      ...h.bad.map((t) => ({
        t,
        ok: false,
        why: `与 ${h.term} 语义不符；对照 ${h.code} 的约定场景。`,
      })),
    ];
    return {
      id: `concept-http-status:${h.code}`,
      q: h.q,
      choices,
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', h.code],
    };
  });
  return `import { defineQuizSet } from '../schema.js';

/** 大厂联调基础：HTTP 状态码一码一题（配名词 http_xxx） */
export default defineQuizSet({
  id: 'concept-http-status',
  title: '基础 · HTTP 状态码全表',
  kind: 'concept',
  domain: 'net',
  tags: ['HTTP', '状态码', '基础'],
  relatedNodes: ['http-web', 'http-hands-on'],
  caption: '2xx/3xx/4xx/5xx 各码语义；与名词轨 http_xxx 对照。',
  questions: ${JSON.stringify(qs, null, 2)},
});
`;
}

function quizLinux() {
  const qs = LINUX.map((c) => {
    const key = `cli_${c.id.replace(/[^a-z0-9]+/gi, '_')}`;
    const choices = [
      { t: c.ok, ok: true, why: c.brief.slice(0, 120) },
      ...c.bad.map((t) => ({
        t,
        ok: false,
        why: `不是 ${c.term} 的典型用法。`,
      })),
    ];
    return {
      id: `concept-linux-cmd:${c.id}`,
      q: c.q,
      choices,
      relatedNodes: ['linux-cli', 'terminal-worlds'],
      tags: ['基础', 'Linux', c.id],
    };
  });
  return `import { defineQuizSet } from '../schema.js';

/** 大厂主机基础：Linux 命令一令一题（配名词 cli_xxx） */
export default defineQuizSet({
  id: 'concept-linux-cmd',
  title: '基础 · Linux 命令全表',
  kind: 'concept',
  domain: 'ops',
  tags: ['Linux', '命令', '基础'],
  relatedNodes: ['linux-cli', 'terminal-worlds'],
  caption: '导航/文件/进程/网络/磁盘——一令一题；与名词轨 cli_* 对照。',
  questions: ${JSON.stringify(qs, null, 2)},
});
`;
}

// patch glossary.js
const glossPath = path.join(root, 'src/data/glossary.js');
let gloss = fs.readFileSync(glossPath, 'utf8');
if (!gloss.includes('http_200:')) {
  const insertAt = gloss.lastIndexOf('\n};');
  if (insertAt < 0) throw new Error('glossary closing not found');
  gloss = gloss.slice(0, insertAt) + glossaryBlock() + gloss.slice(insertAt);
  fs.writeFileSync(glossPath, gloss);
  console.log('glossary patched');
} else {
  console.log('glossary already has http_200, skip patch');
}

// patch terms-by-node
const termsPath = path.join(root, 'src/data/terms-by-node.js');
let terms = fs.readFileSync(termsPath, 'utf8');
const httpKeys = HTTP.map((h) => `'http_${h.code}'`).join(',\n    ');
const linuxKeys = LINUX.map(
  (c) => `'cli_${c.id.replace(/[^a-z0-9]+/gi, '_')}'`
).join(',\n    ');

terms = terms.replace(
  /('http-web':\s*\[[\s\S]*?)(\n  \],\n  'reverse-proxy':)/,
  (m, body, tail) => {
    if (body.includes("'http_200'")) return m;
    return body.replace(/\n  \]$/, '') + `,\n    ${httpKeys}\n  ],` + tail.replace('\n  ],\n  \'reverse-proxy\':', '\n  \'reverse-proxy\':');
  }
);
// simpler approach for http-web: if not present, inject before closing of array
if (!terms.includes("'http_200'")) {
  terms = terms.replace(
    /('http-web': \[[\s\S]*?)(    'rtt',\n  \])/,
    `$1    'rtt',\n    ${httpKeys},\n  ]`
  );
}
if (!terms.includes("'cli_pwd'")) {
  terms = terms.replace(
    /('linux-cli': \[[\s\S]*?)(    'wget_cli',\n  \])/,
    `$1    'wget_cli',\n    ${linuxKeys},\n  ]`
  );
}
fs.writeFileSync(termsPath, terms);
console.log('terms-by-node patched');

fs.writeFileSync(
  path.join(root, 'src/data/quiz/sets/concept-http-status.js'),
  quizHttp()
);
fs.writeFileSync(
  path.join(root, 'src/data/quiz/sets/concept-linux-cmd.js'),
  quizLinux()
);
console.log('quiz sets written', HTTP.length, LINUX.length);

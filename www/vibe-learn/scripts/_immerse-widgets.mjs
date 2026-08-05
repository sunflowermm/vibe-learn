/**
 * 沉浸感补强：按课型插入 check / decide / reveal / ports / term
 * 终端类输出保持真实形态；教学写在 caption / body / 课文
 * node www/vibe-learn/scripts/_immerse-widgets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');

function escTpl(plain) {
  return String(plain).replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
}

async function load(f) {
  return String((await import(pathToFileURL(path.join(dir, f)).href + `?t=${Date.now()}${Math.random()}`)).default || '');
}

function save(f, body) {
  fs.writeFileSync(path.join(dir, f), `export default \`${escTpl(body)}\`;\n`);
}

function insertAfter(body, anchor, block) {
  if (!body.includes(anchor)) return null;
  if (block.includes('"title"')) {
    const title = block.match(/"title"\s*:\s*"([^"]+)"/)?.[1];
    if (title && body.includes(title)) return body; // already
  }
  return body.replace(anchor, `${anchor}\n\n${block}\n`);
}

/** @type {Array<{file:string, anchor:string, block:string}>} */
const PATCHES = [
  {
    file: 'workbench-troubleshoot.js',
    anchor: '## 固定口诀\n',
    block: `\`\`\`decide
{"title":"报错先归哪一层？","start":"start","steps":[{"id":"start","q":"你最先看见的是？","options":[{"label":"command not found / 不是内部命令","next":"env"},{"label":"pnpm/npm 锁冲突、装包红字","next":"dep"},{"label":"ECONNREFUSED 6379 / Redis","next":"cfg"},{"label":"堆栈落到 core/ 自己的文件","next":"code"}]},{"id":"env","result":"环境层：装没装、PATH、是否新开终端。","detail":"先 which/Get-Command，再谈业务。"},{"id":"dep","result":"依赖层：是否在仓库根、是否只用 pnpm。","detail":"勿 npm install 本仓。"},{"id":"cfg","result":"配置/服务层：Redis 是否起来、端口是否对。","detail":"见 database.md；不是改插件语法。"},{"id":"code","result":"代码层：带着完整堆栈改一处。","detail":"上面层绿了再动业务。"}]}
\`\`\`

\`\`\`check
{"title":"分层排障通关","caption":"真失败仍要在本机复现；勾的是习惯。","items":[{"id":"v","text":"能说出卡在环境/依赖/配置/代码哪一层"},{"id":"e","text":"贴出 node -v · pnpm -v · pwd"},{"id":"r","text":"完整报错原文（不截半截）"},{"id":"o","text":"一次只解一层后再往下"}]}
\`\`\`
`,
  },
  {
    file: 'workbench-troubleshoot.js',
    anchor: '## 本仓高频症状速查\n',
    block: `\`\`\`reveal
{"title":"6379 拒绝连接会长这样","prompt":"先认形态，再点开分层","tone":"warn","face":"Error: connect ECONNREFUSED 127.0.0.1:6379\\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)","body":"这是 TCP 连不上本机 Redis，不是业务语法错。先 ensure-redis / 起 Redis / 查端口，再改插件。"}
\`\`\`
`,
  },
  {
    file: 'chapter-env.js',
    anchor: '## 零基础建议顺序\n',
    block: `\`\`\`decide
{"title":"我从环境章哪张卡进？","start":"start","steps":[{"id":"start","q":"你现在最卡？","options":[{"label":"分不清 Git Bash / PowerShell / WSL","next":"term"},{"label":"node/pnpm 不是命令","next":"path"},{"label":"clone GitHub 失败","next":"git"},{"label":"想尽快 node app 跑起来","next":"run"}]},{"id":"term","result":"先「不同终端环境」，再 Linux 指令。","detail":"窗口≠壳≠OS。"},{"id":"path","result":"安装器与 PATH → Node → pnpm。","detail":"新开终端再 which。"},{"id":"git","result":"Git 工作区 / 代码托管；代理见 Clash。","detail":"浏览器通≠git 通。"},{"id":"run","result":"工具链绿后进「首次跑通」。","detail":"常卡 Redis。"}]}
\`\`\`

\`\`\`check
{"title":"第一章收束自检","items":[{"id":"shell","text":"说得出当前用的是哪种 Shell"},{"id":"tool","text":"node -v / pnpm -v / git --version 都有输出"},{"id":"root","text":"pwd 在含根 package.json 的目录"},{"id":"boot","text":"首次跑通有成功信号或能指到卡层"}]}
\`\`\`
`,
  },
  {
    file: 'code-read-errors.js',
    anchor: '## 怎么读一行堆栈\n',
    block: `\`\`\`reveal
{"title":"真机堆栈会长这样","prompt":"先盯第一行与第一帧自己的文件","tone":"warn","face":"TypeError: Cannot read properties of undefined (reading 'name')\\n    at render (C:\\\\proj\\\\app.js:12:18)\\n    at main (C:\\\\proj\\\\app.js:20:3)\\n    at Object.<anonymous> (C:\\\\proj\\\\app.js:25:1)\\n    at Module._compile (node:internal/modules/cjs/loader:1521:14)","body":"忽略 node:internal / node_modules。打开 app.js 第 12 行，查谁是 undefined。给 Agent 时贴完整原文，不要只截 TypeError 一行。"}
\`\`\`
`,
  },
  {
    file: 'code-read-errors.js',
    anchor: '## 常见错对照\n',
    block: `\`\`\`term
{"title":"SyntaxError 终端形态","prompt":"$ ","steps":[{"type":"in","text":"node broken.js"},{"type":"out","text":"/home/alice/broken.js:2\\nconsole.log('hi'\\n            ^^^^^^^\\n\\nSyntaxError: missing ) after argument list\\n    at checkSyntax (node:internal/main/check_syntax:74:5)"}]}
\`\`\`
`,
  },
  {
    file: 'tcp-udp.js',
    anchor: '记忆钩：**IP 找主机，端口找进程；TCP 挂号信，UDP 明信片。**\n',
    block: `\`\`\`ports
{"title":"点端口看它常干什么","caption":"安全组要写协议+端口，不是只写数字。","ports":[{"port":22,"proto":"TCP","name":"SSH","note":"远程登录；只对受信源开放"},{"port":53,"proto":"UDP","name":"DNS","note":"查询常用 UDP；区传送才偏 TCP"},{"port":80,"proto":"TCP","name":"HTTP","note":"明文 Web；生产常 443"},{"port":443,"proto":"TCP","name":"HTTPS","note":"TLS + HTTP；调模型 API 常见"},{"port":6379,"proto":"TCP","name":"Redis","note":"本仓热路径；勿对公网裸奔"},{"port":7890,"proto":"TCP","name":"本地代理","note":"Clash Mixed Port 常见默认；以客户端为准"}]}
\`\`\`
`,
  },
  {
    file: 'dns-https.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`reveal
{"title":"证书不对会炸成这样","prompt":"先认报错，再点开分层","tone":"warn","face":"curl: (60) SSL certificate problem: unable to get local issuer certificate","body":"这是 TLS/证书链问题，不是「HTTP 写错了」。先对时间、系统根证书、是否被中间人代理；开发临时跳过校验只能当实验室手段，不能当生产习惯。"}
\`\`\`
`,
  },
  {
    file: 'http-web.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`shell
{"preset":"curl-get"}
\`\`\`

\`\`\`check
{"title":"HTTP 直觉通关","items":[{"id":"m","text":"能说出方法/URL/状态码各自干什么"},{"id":"j","text":"会看 JSON 响应体（不只看「有返回」）"},{"id":"x","text":"知道本仓 HttpResponse 对象字段拍平"}]}
\`\`\`
`,
  },
  {
    file: 'clash.js',
    anchor: '## 2. 「引擎」两个字：入口 + 决策 + 出口\n',
    block: `\`\`\`ports
{"title":"本机代理常见端口（点开看）","caption":"以你客户端界面显示的 Mixed Port 为准；7890 只是常见默认。","ports":[{"port":7890,"proto":"TCP","name":"Mixed","note":"HTTP + SOCKS 混合入口（Clash 系常见）"},{"port":7891,"proto":"TCP","name":"Socks","note":"部分客户端单独 SOCKS 口"},{"port":9090,"proto":"TCP","name":"External Controller","note":"控制 API；勿对公网暴露"}]}
\`\`\`

\`\`\`decide
{"title":"流量该不该进代理？","start":"start","steps":[{"id":"start","q":"目的地是？","options":[{"label":"GitHub / 境外模型 API","next":"proxy"},{"label":"本机 Redis / 127.0.0.1","next":"direct"},{"label":"国内镜像 / Gitee","next":"direct2"},{"label":"不确定","next":"rule"}]},{"id":"proxy","result":"走代理：系统代理或 HTTP(S)_PROXY。","detail":"CLI 常要单独设变量。"},{"id":"direct","result":"直连；写入 NO_PROXY。","detail":"误走代理会怪错连不上。"},{"id":"direct2","result":"默认直连更稳。","detail":"规则模式通常已覆盖。"},{"id":"rule","result":"用规则（Rule）模式，通了再细调。","detail":"入门可临时 Global 验证通路。"}]}
\`\`\`
`,
  },
  {
    file: 'protocol-stack.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`sort
{"title":"自下而上排出协议栈","caption":"从上到下：靠近介质 → 靠近应用","items":[{"id":"phy","text":"物理 / 链路（网卡、帧）","order":0},{"id":"ip","text":"网络（IP 找主机）","order":1},{"id":"tr","text":"传输（TCP/UDP + 端口）","order":2},{"id":"app","text":"应用（HTTP、DNS…）","order":3}]}
\`\`\`
`,
  },
  {
    file: 'reverse-proxy.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`term
{"title":"反代探活（形态演示）","prompt":"$ ","steps":[{"type":"in","text":"curl -sS -o /dev/null -w \"%{http_code}\\\\n\" https://example.com/api/health"},{"type":"out","text":"200"},{"type":"in","text":"curl -I https://example.com"},{"type":"out","text":"HTTP/2 200\\nserver: nginx\\ncontent-type: text/html"}]}
\`\`\`
`,
  },
  {
    file: 'net-nginx.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"Nginx 门面通关","items":[{"id":"role","text":"能说出 Nginx=反代/门面，不是业务 Runtime"},{"id":"tls","text":"知道证书常挂在门面这一层"},{"id":"up","text":"upstream 指向本机/内网 Node 端口"},{"id":"curl","text":"会用 curl -I 看门面是否 200/502"}]}
\`\`\`

\`\`\`reveal
{"title":"502 常见形态","prompt":"门面活着、上游挂了","tone":"warn","face":"HTTP/1.1 502 Bad Gateway\\nServer: nginx/1.24.0\\nContent-Type: text/html\\n\\n<html>\\n<head><title>502 Bad Gateway</title></head>","body":"Nginx 作为反代能响应，但 upstream（如 Node:8080）连不上或超时。先看上游进程/端口/防火墙，再查 nginx error.log。"}
\`\`\`
`,
  },
  {
    file: 'ops-docker.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"Docker 直觉通关","items":[{"id":"img","text":"分得清镜像 / 容器 / 仓库"},{"id":"ps","text":"会看 docker ps 里的 STATUS / PORTS"},{"id":"xrk","text":"知道本仓可用容器起 Redis，主服仍可宿主机 Node"}]}
\`\`\`
`,
  },
  {
    file: 'ops-compose.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"Compose 通关","items":[{"id":"file","text":"知道 compose 文件描述多容器"},{"id":"up","text":"理解 up / ps 在编排什么"},{"id":"bound","text":"Compose ≠ K8s；先会本地依赖再谈集群"}]}
\`\`\`
`,
  },
  {
    file: 'host-systemd.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"systemd 通关","items":[{"id":"unit","text":"知道 unit 文件管常驻服务"},{"id":"log","text":"会 journalctl / 日志落点直觉"},{"id":"boot","text":"分得清 enable 与 start"}]}
\`\`\`
`,
  },
  {
    file: 'code-first-program.js',
    anchor: '## 0. 先动手：模拟终端\n',
    block: `\`\`\`check
{"title":"第一程序通关","items":[{"id":"file","text":"本机有 hello.js 文本文件"},{"id":"run","text":"node hello.js 打印预期一行"},{"id":"err","text":"故意写错一次，能按报错找到行"}]}
\`\`\`
`,
  },
  {
    file: 'code-async.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`term
{"title":"未处理的 Promise 拒绝","prompt":"$ ","steps":[{"type":"in","text":"node reject-demo.js"},{"type":"out","text":"node:internal/process/promises:288\\n            triggerUncaughtException(err, true /* fromPromise */);\\n            ^\\n\\n[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().] {\\n  code: 'ERR_UNHANDLED_REJECTION'\\n}\\n\\nNode.js v26.0.0"}]}
\`\`\`
`,
  },
  {
    file: 'data-json.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`reveal
{"title":"JSON.parse 炸了会长这样","prompt":"先认 SyntaxError，再查逗号/引号","tone":"warn","face":"SyntaxError: Unexpected token } in JSON at position 8\\n    at JSON.parse (<anonymous>)\\n    at Object.<anonymous> (/home/alice/parse.js:2:27)","body":"多半是尾逗号、单引号、或注释——标准 JSON 都不允许。修好字符串再 parse；给 Agent 时连同原始字符串一起贴。"}
\`\`\`
`,
  },
  {
    file: 'data-yaml.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`reveal
{"title":"YAML 缩进错的常见形态","prompt":"缩进是结构","tone":"warn","face":"YAMLException: bad indentation of a mapping entry (4:3)\\n\\n 1 | server:\\n 2 |   port: 8080\\n 3 |  host: 0.0.0.0\\n-------^","body":"YAML 用缩进表达层级；空格数量不一致就会在「看起来齐」的地方炸。本仓配置三同步前先保证 yaml 可被解析。"}
\`\`\`
`,
  },
  {
    file: 'craft-debug.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`reveal
{"title":"日志里定位自己的帧","prompt":"完整堆栈 > 猜","tone":"info","face":"Error: lab boom\\n    at HelloLab.run (file:///.../core/my-lab-Core/plugin/hello-lab.js:14:11)\\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)","body":"第一帧自己的 plugin 文件:行号就是切口。复现命令 + 完整堆栈交给 Agent；不要只说「又报错了」。"}
\`\`\`

\`\`\`check
{"title":"调试卫生","items":[{"id":"repro","text":"有可重复的最小复现步骤"},{"id":"log","text":"日志/堆栈指向自己的文件"},{"id":"one","text":"一次只验证一个假设"}]}
\`\`\`
`,
  },
  {
    file: 'ip-addressing.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`match
{"title":"地址角色配对","pairs":[{"id":"priv","left":"私网地址","right":"只在内网路由，如 192.168.x / 10.x"},{"id":"pub","left":"公网地址","right":"互联网上可路由的主机标识"},{"id":"dns","left":"域名","right":"给人记；经 DNS 变成 IP"},{"id":"port","left":"端口","right":"同机区分进程（传输层）"}]}
\`\`\`
`,
  },
  {
    file: 'routing-nat.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`decide
{"title":"出网失败先怪谁？","start":"start","steps":[{"id":"start","q":"现象？","options":[{"label":"只有境外站不行，国内正常","next":"proxy"},{"label":"局域网互通，出不了网","next":"gw"},{"label":"别人能访问我的服务，我访不回","next":"nat"},{"label":"域名打不开，IP 可以","next":"dns"}]},{"id":"proxy","result":"优先查正向代理 / 规则 / 节点。","detail":"Clash 课。"},{"id":"gw","result":"查默认路由 / 网关 / 上行。","detail":"先 ping 网关。"},{"id":"nat","result":"想端口映射/防火墙/安全组。","detail":"NAT 方向不对称很常见。"},{"id":"dns","result":"DNS 解析或劫持。","detail":"对照 dig/nslookup。"}]}
\`\`\`
`,
  },
  {
    file: 'panel-essence.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`decide
{"title":"面板按钮背后改了哪层？","start":"start","steps":[{"id":"start","q":"你刚点的操作最像？","options":[{"label":"启动/停止站点","next":"proc"},{"label":"绑域名、开 HTTPS","next":"edge"},{"label":"改环境变量/数据库密码","next":"env"},{"label":"上传文件到网站目录","next":"fs"}]},{"id":"proc","result":"进程层：服务是否在听端口。","detail":"回 systemd/Docker/Node 进程。"},{"id":"edge","result":"门面层：反代 + 证书。","detail":"回 Nginx/TLS 课。"},{"id":"env","result":"配置层：最终进进程环境。","detail":"密钥勿进 Git。"},{"id":"fs","result":"文件层：静态目录挂载。","detail":"不等于改了业务代码逻辑。"}]}
\`\`\`
`,
  },
  {
    file: 'adev-compare.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`compare
{"title":"形态对照（角色）","caption":"选工具前先对齐「它替你站哪一层」。","items":[{"role":"对话改代码","win":"Cursor Agent / Copilot Edits","linux":"同左（跨平台客户端）","mac":"同左","note":"路径 A；要审 diff"},{"role":"终端里 Agent","win":"CLI 类工具","linux":"CLI 类工具","mac":"CLI 类工具","note":"cwd/权限即现场"},{"role":"云端开发机","win":"浏览器 IDE","linux":"远程 Workspace","mac":"同左","note":"环境在云上"}]}
\`\`\`

\`\`\`decide
{"title":"我该用哪种形态？","start":"start","steps":[{"id":"start","q":"任务？","options":[{"label":"在本仓改 plugin/http","next":"cursor"},{"label":"服务器上排障、看日志","next":"cli"},{"label":"只想对比产品名词","next":"map2"}]},{"id":"cursor","result":"对话改代码 + 本仓 AGENTS/禁区。","detail":"Accept 前看 diff。"},{"id":"cli","result":"终端 Agent / 自己 SSH；权限即边界。","detail":"别把密钥打进历史。"},{"id":"map2","result":"导图2 黄页；验收仍回本机路径。","detail":"词表≠会做。"}]}
\`\`\`
`,
  },
  {
    file: 'git-advanced.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"进阶 Git 卫生","items":[{"id":"branch","text":"功能在分支上做，不直接搅 main"},{"id":"small","text":"提交小步、可回滚"},{"id":"pr","text":"PR 说明里写验收命令"},{"id":"secret","text":"diff 里没有密钥"}]}
\`\`\`
`,
  },
  {
    file: 'code-checkpoint.js',
    anchor: '## 学会之后（验收）\n',
    block: `\`\`\`decide
{"title":"卡关了去哪补？","start":"start","steps":[{"id":"start","q":"缺哪块？","options":[{"label":"hello 都跑不过","next":"first"},{"label":"函数/模块搞不清","next":"fn"},{"label":"报错看不懂","next":"err"},{"label":"JSON/YAML 总炸","next":"data"}]},{"id":"first","result":"回「第一个程序」+ node-hello 沙箱。","detail":"先文件后框架。"},{"id":"fn","result":"函数 → 模块课。","detail":"过关清单里对应项。"},{"id":"err","result":"读懂报错。","detail":"贴完整堆栈。"},{"id":"data","result":"JSON / YAML 课。","detail":"先合法再谈业务字段。"}]}
\`\`\`
`,
  },
];

let n = 0;
const skip = [];
for (const p of PATCHES) {
  if (p.block2) continue;
  let body = await load(p.file);
  const next = insertAfter(body, p.anchor, p.block);
  if (!next) {
    skip.push(p.file + ' :: ' + p.anchor.slice(0, 40));
    continue;
  }
  if (next !== body) {
    save(p.file, next);
    n++;
    console.log('ok', p.file, p.block.match(/```(\w+)/)?.[1] || '?');
  } else {
    console.log('skip-dup', p.file);
  }
}
console.log(JSON.stringify({ patched: n, skip }));

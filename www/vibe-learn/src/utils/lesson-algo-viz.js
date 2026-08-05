/**
 * 课文算法动画：```algo / ```viz / ```animate
 * 排序 / 图搜 / 调度 / 存储 / PATH / Git / 事件循环 / 双宿主 / TS 擦除 / TCP 握手 / DNS 解析 等
 */

function prefersReducedMotion() {
  try {
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'text') node.textContent = String(v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  return node;
}

function parseJson(text, fallback) {
  const raw = String(text ?? '').trim();
  if (!raw.startsWith('{')) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function sleep(ms, signal) {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t);
        reject(new DOMException('aborted', 'AbortError'));
      },
      { once: true }
    );
  });
}

/** @param {string} text */
export function parseAlgoSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return {
      title: '算法动画',
      kind: 'bubble',
      data: [5, 2, 8, 1, 9, 3],
      speed: 420,
      caption: '',
    };
  }
  const kind = String(j.kind || j.type || 'bubble').toLowerCase();
  let data = j.data ?? j.arr ?? j.values;
  const userObj = data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  if (!Array.isArray(data)) {
    if (kind === 'bfs' || kind === 'dfs') {
      data = {
        rows: 4,
        cols: 5,
        walls: [
          [1, 1],
          [1, 2],
          [2, 2],
        ],
        start: [0, 0],
        goal: [3, 4],
        ...userObj,
      };
    } else if (kind === 'list' || kind === 'll-reverse') {
      data = Array.isArray(data) ? data : [1, 2, 3, 4, 5];
    } else if (kind === 'uf' || kind === 'union-find') {
      data = { n: 6, unions: [[0, 1], [1, 2], [3, 4], [2, 3]], ...userObj };
    } else if (kind === 'gd' || kind === 'gradient') {
      data = { start: 4.5, lr: 0.15, steps: 18, ...userObj };
    } else if (kind === 'scheduler' || kind === 'rr' || kind === 'timeslice') {
      data = {
        quantum: 2,
        procs: [
          { id: 'A', burst: 5 },
          { id: 'B', burst: 3 },
          { id: 'C', burst: 4 },
        ],
        ...userObj,
      };
    } else if (kind === 'memhier' || kind === 'memory' || kind === 'hierarchy') {
      data = {
        levels: [
          { id: 'reg', name: '寄存器', lat: '~1 周期', size: '极小' },
          { id: 'cache', name: 'Cache', lat: '~数周期', size: 'KB～MB' },
          { id: 'ram', name: '内存 RAM', lat: '~百 ns', size: 'GB' },
          { id: 'disk', name: '磁盘', lat: '~μs～ms', size: 'TB' },
        ],
        ...userObj,
      };
    } else if (kind === 'pathfind' || kind === 'which' || kind === 'path') {
      data = {
        cmd: 'node',
        dirs: [
          { path: '/usr/local/bin', hit: false },
          { path: '/usr/bin', hit: true },
          { path: '/bin', hit: false },
        ],
        ...userObj,
      };
    } else if (kind === 'gitstage' || kind === 'git-areas' || kind === 'staging') {
      data = {
        files: [
          { name: 'app.js', mark: 'M' },
          { name: 'note.md', mark: '?' },
        ],
        commit: { hash: 'a1b2c3d', msg: 'feat: wire first run' },
        ...userObj,
      };
    } else if (kind === 'gitclone' || kind === 'clone') {
      data = {
        repo: 'XRK-AGT.git',
        fail: false,
        entries: ['.git/', 'package.json', 'pnpm-lock.yaml', 'src/', 'README.md'],
        ...userObj,
      };
    } else if (kind === 'gitbranch' || kind === 'branch' || kind === 'mergeviz') {
      data = {
        mode: 'merge',
        main: ['c0', 'c1', 'c2'],
        feat: ['f1', 'f2'],
        ...userObj,
      };
    } else if (kind === 'eventloop' || kind === 'eloop' || kind === 'microtask') {
      data = {
        steps: [
          { kind: 'sync', label: "console.log('A')" },
          { kind: 'macro', label: 'setTimeout → C' },
          { kind: 'micro', label: 'Promise.then → B' },
          { kind: 'sync', label: "console.log('D')" },
        ],
        output: ['A', 'D', 'B', 'C'],
        ...userObj,
      };
    } else if (kind === 'dualhost' || kind === 'hosts' || kind === 'runtime-split') {
      data = {
        apis: [
          { name: 'document.querySelector', browser: true, node: false },
          { name: 'fs.readFile', browser: false, node: true },
          { name: 'fetch', browser: true, node: true },
          { name: 'process.env', browser: false, node: true },
          { name: 'addEventListener', browser: true, node: false },
        ],
        ...userObj,
      };
    } else if (kind === 'tserase' || kind === 'tsc' || kind === 'typestrip') {
      data = {
        source: 'function add(a: number, b: number): number',
        erased: 'function add(a, b)',
        run: 'node add.js → 3',
        ...userObj,
      };
    } else if (kind === 'tcphandshake' || kind === 'tcp3way' || kind === 'synack') {
      data = {
        client: '浏览器',
        server: '服务器 :443',
        ...userObj,
      };
    } else if (kind === 'dnsresolve' || kind === 'dns' || kind === 'lookup') {
      data = {
        qname: 'api.example.com',
        answer: '203.0.113.10',
        ...userObj,
      };
    } else if (kind === 'revproxy' || kind === 'rproxy' || kind === 'proxyflow') {
      data = {
        mode: 'ok', // ok | fail
        client: '浏览器',
        proxy: '反向代理 / Nginx',
        upstream: '127.0.0.1:8080 Node',
        ...userObj,
      };
    } else if (kind === 'proxyroute' || kind === 'fwdproxy' || kind === 'clashroute') {
      data = {
        mode: 'proxy', // proxy | direct
        dest: 'github.com',
        rule: 'DOMAIN-SUFFIX,github.com,PROXY',
        ...userObj,
      };
    } else if (kind === 'xrklayers' || kind === 'xrkflow' || kind === 'corelayers') {
      data = {
        mode: 'http', // http | plugin | sub
        ...userObj,
      };
    } else if (kind === 'httpresp' || kind === 'httpshape' || kind === 'unwrap') {
      data = {
        mode: 'object', // object | array
        ...userObj,
      };
    } else if (kind === 'msgpipe' || kind === 'assemble' || kind === 'chatpipe') {
      data = {
        mode: 'ok',
        ...userObj,
      };
    } else if (kind === 'taskerflow' || kind === 'channel' || kind === 'e-flow') {
      data = { ...userObj };
    } else if (kind === 'authgate' || kind === 'apikey' || kind === 'gate') {
      data = {
        mode: 'ok', // ok | fail | loopback
        ...userObj,
      };
    } else if (kind === 'toolloop' || kind === 'mcploop' || kind === 'agentloop') {
      data = {
        rounds: 2,
        ...userObj,
      };
    } else if (kind === 'dbtier' || kind === 'redisql' || kind === 'hotdisk') {
      data = { ...userObj };
    } else if (kind === 'sqlcrud' || kind === 'sqlfour' || kind === 'crud') {
      data = {
        ops: [
          { id: 's', name: 'SELECT', sub: '读' },
          { id: 'i', name: 'INSERT', sub: '增' },
          { id: 'u', name: 'UPDATE', sub: '改 · 必带 WHERE' },
          { id: 'd', name: 'DELETE', sub: '删 · 必带 WHERE' },
        ],
        ...userObj,
      };
    } else if (kind === 'dbserve' || kind === 'embedvs' || kind === 'csvsemb') {
      data = { ...userObj };
    } else if (kind === 'ctrvm' || kind === 'containervm' || kind === 'vsvm') {
      data = { ...userObj };
    } else if (kind === 'imglayer' || kind === 'dockerlayer' || kind === 'layers') {
      data = {
        layers: [
          { id: 'base', name: 'base OS 层', sub: '只读' },
          { id: 'pkg', name: '依赖层', sub: '只读' },
          { id: 'app', name: '应用层', sub: '只读' },
          { id: 'rw', name: '容器可写层', sub: '运行时 · 删容器即丢' },
        ],
        ...userObj,
      };
    } else if (kind === 'composestack' || kind === 'composeup' || kind === 'svcstack') {
      data = {
        services: [
          { id: 'redis', name: 'redis', sub: ':6379' },
          { id: 'app', name: 'app（可选）', sub: '连 redis' },
        ],
        ...userObj,
      };
    } else if (kind === 'opstier' || kind === 'containertier' || kind === 'runtier') {
      data = {
        tiers: [
          { id: 'engine', name: '引擎 / 运行时', sub: 'Docker · Podman · containerd' },
          { id: 'compose', name: '本机多容器', sub: 'Compose' },
          { id: 'k8s', name: '集群调度', sub: 'Kubernetes' },
          { id: 'host', name: '宿主机保活', sub: 'systemd · 面板' },
        ],
        ...userObj,
      };
    } else if (kind === 'dirrole' || kind === 'fhsmap' || kind === 'pathrole') {
      data = {
        roles: [
          { id: 'home', name: '家目录 Home', sub: 'Users · /home · /Users' },
          { id: 'bin', name: 'bin（可执行）', sub: 'PATH 去哪找命令' },
          { id: 'cfg', name: '用户配置/缓存', sub: 'AppData · ~/.config' },
          { id: 'tmp', name: '临时区', sub: 'TEMP · /tmp' },
          { id: 'inst', name: '程序安装', sub: 'Program Files · /usr · /opt' },
        ],
        ...userObj,
      };
    } else if (kind === 'dothide' || kind === 'dotfiles' || kind === 'hideviz') {
      data = {
        dots: [
          { id: 'env', name: '.env', sub: '本地机密 · 勿提交' },
          { id: 'git', name: '.git/', sub: '仓库元数据' },
          { id: 'ssh', name: '.ssh/', sub: '密钥 · 权限要紧' },
          { id: 'rc', name: '.bashrc', sub: 'Shell 持久化 PATH/代理' },
        ],
        ...userObj,
      };
    } else if (kind === 'mcuvspc' || kind === 'mcuhost' || kind === 'mcupc') {
      data = { ...userObj };
    } else if (kind === 'espboard' || kind === 'espmod' || kind === 'socboard') {
      data = {
        layers: [
          { id: 'usb', name: 'USB 线', sub: '供电 · 串口' },
          { id: 'board', name: '开发板', sub: '转串口 · 天线 · 排针' },
          { id: 'chip', name: 'ESP32 SoC/模组', sub: '算力 · 无线 · 外设' },
          { id: 'io', name: 'Wi-Fi/BT · GPIO', sub: '联网 · 采控' },
        ],
        ...userObj,
      };
    } else if (kind === 'flashpipe' || kind === 'idfflash' || kind === 'burnfw') {
      data = {
        steps: [
          { id: 'code', name: 'PC 写代码', sub: 'Arduino / IDF / PIO' },
          { id: 'xcomp', name: '交叉编译', sub: '生成板子二进制' },
          { id: 'port', name: '选串口', sub: 'COM / ttyUSB / cu.*' },
          { id: 'flash', name: 'idf.py flash', sub: '写入 Flash' },
          { id: 'mon', name: 'monitor', sub: '串口日志验收' },
        ],
        ...userObj,
      };
    } else if (kind === 'edgelink' || kind === 'espcloud' || kind === 'devagent') {
      data = {
        hops: [
          { id: 'dev', name: 'ESP32 固件', sub: '采数 · 控脚 · 联网' },
          { id: 'proto', name: 'MQTT / HTTP', sub: '应用层对话' },
          { id: 'cloud', name: '云 / 本机 XRK', sub: 'Node ≥ 26 主服' },
          { id: 'agent', name: 'Agent / Core', sub: '推理 · 鉴权 · 落库' },
        ],
        ...userObj,
      };
    } else if (kind === 'debugloop' || kind === 'reprobe' || kind === 'dbgloop') {
      data = {
        steps: [
          { id: 'repro', name: '稳定复现', sub: '步骤 · 固定输入' },
          { id: 'probe', name: '加探针', sub: '入口/出口关键字段' },
          { id: 'one', name: '单点假设', sub: '一次只改一处' },
          { id: 'reg', name: '回归', sub: '相关路径再跑' },
        ],
        ...userObj,
      };
    } else if (kind === 'secbase' || kind === 'owaspbase' || kind === 'craftsec') {
      data = {
        items: [
          { id: 'secret', name: '密钥', sub: '.env / Secrets · 勿进仓' },
          { id: 'inject', name: '注入', sub: 'SQL / XSS / 命令 · 参数化' },
          { id: 'authz', name: '鉴权', sub: '认证 ≠ 授权 · 服务端再判' },
          { id: 'diff', name: '审 Agent diff', sub: 'Key · 任意写 · 关校验' },
        ],
        ...userObj,
      };
    } else if (kind === 'testpyra' || kind === 'pyramid' || kind === 'testtiers') {
      data = {
        tiers: [
          { id: 'unit', name: '单元 ~80%', sub: '纯函数 · 快稳' },
          { id: 'int', name: '集成 ~15%', sub: '模块协作' },
          { id: 'e2e', name: 'E2E ~5%', sub: '真路径 · 少而精' },
        ],
        ...userObj,
      };
    } else if (kind === 'obspillar' || kind === 'lmt' || kind === 'threeobs') {
      data = {
        pillars: [
          { id: 'logs', name: 'Logs 日志', sub: '刚才发生了什么' },
          { id: 'metrics', name: 'Metrics 指标', sub: '延迟 · 流量 · 错误 · 饱和' },
          { id: 'traces', name: 'Traces 追踪', sub: '一次请求跨服务' },
        ],
        ...userObj,
      };
    } else if (kind === 'cipipe' || kind === 'cigreen' || kind === 'workflow') {
      data = {
        steps: [
          { id: 'co', name: 'checkout', sub: '拉代码' },
          { id: 'inst', name: 'pnpm install', sub: 'frozen-lockfile' },
          { id: 'test', name: 'pnpm test', sub: '断言门禁' },
          { id: 'build', name: 'pnpm build', sub: '可选构建' },
        ],
        ...userObj,
      };
    } else if (kind === 'wsfive' || kind === 'workspace' || kind === 'inject5') {
      data = { ...userObj };
    } else if (kind === 'uipatch' || kind === 'reactivity' || kind === 'vdom') {
      data = {
        mode: 'vue', // vue | react | angular
        ...userObj,
      };
    } else if (kind === 'mwchain' || kind === 'middleware' || kind === 'reqpipe') {
      data = {
        layers: [
          { id: 'req', name: 'Request', sub: '方法 · 路径 · 头' },
          { id: 'mw1', name: '中间件 1', sub: '日志 / CORS' },
          { id: 'mw2', name: '中间件 2', sub: '鉴权 / 校验' },
          { id: 'h', name: 'Handler', sub: '业务处理' },
          { id: 'res', name: 'Response', sub: '状态 · 体' },
        ],
        ...userObj,
      };
    } else if (kind === 'ssrflow' || kind === 'hydrate' || kind === 'nextssr') {
      data = {
        mode: 'ssr', // ssr | spa
        ...userObj,
      };
    } else if (kind === 'tokbudget' || kind === 'ctxwin' || kind === 'tokenwin') {
      data = {
        limit: 16,
        chunks: [
          { id: 'sys', name: '系统说明', n: 3 },
          { id: 'hist', name: '历史', n: 4 },
          { id: 'user', name: '本轮用户', n: 2 },
          { id: 'tool', name: '工具结果', n: 3 },
          { id: 'out', name: '预留生成', n: 4 },
        ],
        ...userObj,
      };
    } else if (kind === 'attnmap' || kind === 'attention' || kind === 'qkv') {
      data = {
        tokens: ['小明', '把', '书', '放', '桌上', '，', '它', '很重'],
        query: 6, // 「它」
        scores: [0.55, 0.02, 0.08, 0.03, 0.18, 0.02, 0.05, 0.07],
        ...userObj,
      };
    } else if (kind === 'tfstack' || kind === 'transformer' || kind === 'tfblock') {
      data = {
        mode: 'decoder', // decoder | encdec
        ...userObj,
      };
    } else if (kind === 'iclpath' || kind === 'fewshot' || kind === 'adaptladder') {
      data = {
        mode: 'icl', // icl | compare
        ...userObj,
      };
    } else if (kind === 'msgroles' || kind === 'chatmsg' || kind === 'roles') {
      data = {
        roles: [
          { id: 'system', name: 'system', sub: '开发者说明 / 人设' },
          { id: 'user', name: 'user', sub: '本轮用户' },
          { id: 'assistant', name: 'assistant', sub: '模型回复' },
          { id: 'tool', name: 'tool', sub: '工具结果回灌' },
        ],
        ...userObj,
      };
    } else if (kind === 'dagflow' || kind === 'agentgraph' || kind === 'plandag') {
      data = {
        nodes: [
          { id: 's', name: '开始' },
          { id: 'a', name: '检索' },
          { id: 'b', name: '读工作区' },
          { id: 'c', name: '汇总' },
          { id: 'e', name: '结束' },
        ],
        ...userObj,
      };
    } else if (kind === 'ragpipe' || kind === 'ragflow' || kind === 'retrieve') {
      data = { steps: ['Retrieve', 'Augment', 'Generate'], ...userObj };
    } else if (kind === 'embnear' || kind === 'vecnear' || kind === 'knn') {
      data = {
        query: '报错 ECONNRESET',
        hits: [
          { id: 'A', label: '网络超时 FAQ', score: 0.91 },
          { id: 'B', label: '同义：连接被重置', score: 0.84 },
          { id: 'C', label: '无关：密码策略', score: 0.41 },
        ],
        ...userObj,
      };
    } else if (kind === 'chunksplit' || kind === 'chunking' || kind === 'splitdoc') {
      data = {
        chunks: [
          { id: '1', label: '§1 范围…' },
          { id: '2', label: '…重叠…§2' },
          { id: '3', label: '§2 义务…' },
          { id: '4', label: '§3 罚则…' },
        ],
        ...userObj,
      };
    } else if (kind === 'hybridret' || kind === 'hybrid' || kind === 'rrfuse') {
      data = {
        sparse: ['ECONNRESET 手册', '错误码表'],
        dense: ['连接失败说明', '同义网络抖动'],
        fused: ['ECONNRESET 手册', '连接失败说明', '错误码表'],
        ...userObj,
      };
    } else if (kind === 'tameinj' || kind === 'ruleskill' || kind === 'tameface') {
      data = {
        lanes: [
          { id: 'rules', name: 'Rules', sub: '全文常驻护栏' },
          { id: 'skills', name: 'Skills', sub: '目录卡 → 按需读' },
          { id: 'agents', name: 'AGENTS.md', sub: '项目交底 / 人设' },
        ],
        ...userObj,
      };
    } else if (kind === 'secgate' || kind === 'promptsec' || kind === 'injectgate') {
      data = {
        stages: [
          { id: 'doc', name: '不可信正文', sub: '文档 / 网页 / 用户' },
          { id: 'sys', name: '系统 / 规则', sub: '开发者指令层' },
          { id: 'gate', name: 'handleToolCall', sub: '策略 · 扫描 · 审批' },
          { id: 'tool', name: '真实工具', sub: '有副作用' },
        ],
        ...userObj,
      };
    } else if (kind === 'bigo' || kind === 'big-o' || kind === 'complexity') {
      data = {
        nMax: 16,
        curves: [
          { id: '1', name: 'O(1)', color: '#94a3b8' },
          { id: 'log', name: 'O(log n)', color: '#38bdf8' },
          { id: 'n', name: 'O(n)', color: '#34d399' },
          { id: 'nlog', name: 'O(n log n)', color: '#a78bfa' },
          { id: 'n2', name: 'O(n²)', color: '#f472b6' },
        ],
        ...userObj,
      };
    } else if (kind === 'stackq' || kind === 'stackqueue' || kind === 'lifofifo') {
      data = {
        tokens: ['A', 'B', 'C', 'D'],
        ...userObj,
      };
    } else if (kind === 'hashslot' || kind === 'hashtable' || kind === 'hashviz') {
      data = {
        slots: 5,
        puts: [
          { key: 'cat', slot: 2 },
          { key: 'dog', slot: 4 },
          { key: 'cow', slot: 2 },
          { key: 'bee', slot: 1 },
        ],
        ...userObj,
      };
    } else if (kind === 'bsttrav' || kind === 'bst' || kind === 'treetraverse') {
      data = {
        mode: 'inorder', // preorder | inorder | postorder | level
        ...userObj,
      };
    } else if (kind === 'callstack' || kind === 'recurseviz' || kind === 'stackframes') {
      data = {
        target: 4,
        ...userObj,
      };
    } else if (kind === 'dptable' || kind === 'climbstairs' || kind === 'dpfill') {
      data = {
        n: 6,
        ...userObj,
      };
    } else if (kind === 'bitsop' || kind === 'bitclear' || kind === 'hamming') {
      data = {
        n: 29,
        ...userObj,
      };
    } else if (kind === 'lrucache' || kind === 'lru' || kind === 'cacheevict') {
      data = {
        capacity: 2,
        ops: [
          { op: 'put', key: '1', val: 'A' },
          { op: 'put', key: '2', val: 'B' },
          { op: 'get', key: '1' },
          { op: 'put', key: '3', val: 'C' },
          { op: 'get', key: '2' },
          { op: 'get', key: '3' },
        ],
        ...userObj,
      };
    } else if (kind === 'topo' || kind === 'topsort' || kind === 'kahn') {
      data = {
        nodes: ['A', 'B', 'C', 'D'],
        edges: [
          ['A', 'B'],
          ['A', 'C'],
          ['B', 'D'],
          ['C', 'D'],
        ],
        ...userObj,
      };
    } else if (kind === 'strmatch' || kind === 'naivefind' || kind === 'strstr') {
      data = {
        text: 'ABABCABAB',
        pattern: 'ABAB',
        ...userObj,
      };
    } else if (kind === 'panellayer' || kind === 'paneltier' || kind === 'hostpanel') {
      data = {
        layers: [
          { id: 'panel', name: '面板', sub: '按钮 / 表单 / 安全入口' },
          { id: 'gw', name: '网关', sub: '反代 · TLS · 80/443' },
          { id: 'proc', name: '进程', sub: 'node / PHP / 容器' },
          { id: 'data', name: '数据', sub: '库 · 卷 · 上传目录' },
        ],
        ...userObj,
      };
    } else if (kind === 'btpath' || kind === 'baotapath' || kind === 'btflow') {
      data = {
        steps: [
          { id: 'inst', name: '安装面板', sub: '官方脚本' },
          { id: 'sec', name: '改端口/强密', sub: '勿裸奔 8888' },
          { id: 'fw', name: '安全组+防火墙', sub: '两边都放行' },
          { id: 'site', name: '站点/反代', sub: '指到本机端口' },
          { id: 'ssl', name: 'SSL', sub: 'HTTPS' },
          { id: 'node', name: '跑 Node', sub: 'PM2/systemd' },
        ],
        ...userObj,
      };
    } else if (kind === 'onepath' || kind === '1ppath' || kind === 'oneflow') {
      data = {
        steps: [
          { id: 'inst', name: '安装 1Panel', sub: '仅 Linux' },
          { id: 'entry', name: '端口+安全入口', sub: '1pctl 可查' },
          { id: 'dock', name: 'Docker/应用', sub: '商店/Compose' },
          { id: 'proxy', name: '网站反代', sub: '容器或本机口' },
          { id: 'ssl', name: '证书', sub: '网关终止 TLS' },
          { id: 'bak', name: '备份含卷', sub: '能恢复才算' },
        ],
        ...userObj,
      };
    } else if (kind === 'panelpick' || kind === 'panelvs' || kind === 'btvs1p') {
      data = {
        picks: [
          { id: 'bt', name: '宝塔', sub: '教程多 · LNMP · 可 Windows' },
          { id: 'one', name: '1Panel', sub: '开源 · 容器友好 · 仅 Linux' },
          { id: 'ssh', name: '不用面板', sub: 'Git+Compose · 可复现' },
        ],
        ...userObj,
      };
    } else if (kind === 'noderproxy' || kind === 'panelnode' || kind === 'xrkproxy') {
      data = {
        hops: [
          { id: 'user', name: '用户', sub: 'HTTPS' },
          { id: 'edge', name: '面板反代', sub: ':443' },
          { id: 'loop', name: '127.0.0.1:PORT', sub: '本机口' },
          { id: 'app', name: 'node app', sub: 'XRK Runtime' },
        ],
        ...userObj,
      };
    } else if (kind === 'sysdunit' || kind === 'systemd' || kind === 'unitlife') {
      data = {
        steps: [
          { id: 'write', name: '写 unit', sub: 'WorkingDirectory · ExecStart' },
          { id: 'reload', name: 'daemon-reload', sub: '重读配置' },
          { id: 'enable', name: 'enable', sub: '开机自启' },
          { id: 'start', name: 'start / --now', sub: '立刻拉起' },
          { id: 'log', name: 'journalctl', sub: '看挂因' },
        ],
        ...userObj,
      };
    } else if (kind === 'tlstri' || kind === 'acmeflow' || kind === 'certpath') {
      data = {
        hops: [
          { id: 'dns', name: 'DNS', sub: 'A/AAAA 指到本机' },
          { id: 'port', name: '80/443', sub: '安全组+防火墙' },
          { id: 'acme', name: 'ACME', sub: 'Let\'s Encrypt 校验' },
          { id: 'term', name: '网关终止', sub: '证书挂 Nginx/面板' },
          { id: 'app', name: '回源', sub: '本机 HTTP → Node' },
        ],
        ...userObj,
      };
    } else if (kind === 'bakdrill' || kind === 'backup3' || kind === 'restore') {
      data = {
        buckets: [
          { id: 'code', name: '代码', sub: 'Git 远程' },
          { id: 'cfg', name: '配置/密钥', sub: 'env · yaml' },
          { id: 'data', name: '数据', sub: '卷 · 库 · 上传' },
        ],
        ...userObj,
      };
    } else if (kind === 'vibefive' || kind === 'fivebeat' || kind === 'vibebeat') {
      data = {
        beats: [
          { id: 'goal', name: '目标', sub: '一句话要完成什么' },
          { id: 'ctx', name: '现场', sub: 'OS · 路径 · 报错原文' },
          { id: 'rule', name: '约束', sub: 'pnpm · 禁区 · 勿交密钥' },
          { id: 'ok', name: '验收', sub: '命令/页面/测试算过' },
          { id: 'diff', name: '审 diff', sub: '跑通再 Accept' },
        ],
        ...userObj,
      };
    } else if (kind === 'adevform' || kind === 'harness3' || kind === 'toolform') {
      data = {
        forms: [
          { id: 'ide', name: 'AI IDE', sub: '看 diff · 多文件' },
          { id: 'cli', name: 'Agent CLI', sub: 'SSH · 无头' },
          { id: 'cloud', name: '云端 Agent', sub: '异步 · 出 PR' },
          { id: 'oss', name: '开源 Harness', sub: '换模型 · 自托管' },
        ],
        ...userObj,
      };
    } else if (kind === 'memfiles' || kind === 'agentsmd' || kind === 'projmem') {
      data = {
        layers: [
          { id: 'agents', name: 'AGENTS.md', sub: '便携说明书 · 多工具' },
          { id: 'rules', name: 'Rules', sub: '短约束 · 常在' },
          { id: 'skills', name: 'Skills', sub: '长流程 · 按需' },
          { id: 'priv', name: '产品私有', sub: 'CLAUDE.md / .cursor…' },
        ],
        ...userObj,
      };
    } else if (data == null) {
      data = [5, 2, 8, 1, 9, 3, 7, 4];
    }
  }
  return {
    title: j.title ? String(j.title) : '算法动画',
    caption: j.caption ? String(j.caption) : '',
    kind,
    data,
    speed: Math.max(80, Number(j.speed) || 420),
    /* 面板侧栏一挂载就播完：默认等用户点「播放」；JSON 里的 autoplay 忽略 */
    autoplay: false,
  };
}

function barStage(values) {
  const stage = el('div', 'vibe-algo__bars');
  const max = Math.max(...values.map(Number), 1);
  const cells = values.map((v, i) => {
    const cell = el('div', 'vibe-algo__bar-wrap', { 'data-i': String(i) });
    const bar = el('div', 'vibe-algo__bar');
    bar.style.height = `${Math.max(8, (Number(v) / max) * 100)}%`;
    const lab = el('span', 'vibe-algo__bar-lab', { text: String(v) });
    cell.append(bar, lab);
    return { cell, bar, lab, v: Number(v) };
  });
  for (const c of cells) stage.append(c.cell);
  return { stage, cells, max };
}

function setBarState(cells, i, state) {
  for (const c of cells) c.cell.classList.remove('is-active', 'is-pivot', 'is-done', 'is-dim');
  if (i == null) return;
  const idxs = Array.isArray(i) ? i : [i];
  for (const c of cells) {
    if (!idxs.includes(cells.indexOf(c))) c.cell.classList.add('is-dim');
  }
  for (const idx of idxs) {
    if (cells[idx]) cells[idx].cell.classList.add(state || 'is-active');
  }
}

function syncBars(cells, values, max) {
  const m = max || Math.max(...values.map(Number), 1);
  values.forEach((v, i) => {
    const c = cells[i];
    if (!c) return;
    c.v = Number(v);
    c.lab.textContent = String(v);
    c.bar.style.height = `${Math.max(8, (Number(v) / m) * 100)}%`;
  });
}

async function runBubble(cells, values, speed, signal, log) {
  const a = values.slice();
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      setBarState(cells, [j, j + 1], 'is-active');
      log(`比较 ${a[j]} 与 ${a[j + 1]}`);
      await sleep(speed, signal);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        syncBars(cells, a);
        log(`交换 → [${a.join(', ')}]`);
        await sleep(speed, signal);
      }
    }
    cells[n - 1 - i]?.cell.classList.add('is-done');
  }
  for (const c of cells) {
    c.cell.classList.remove('is-dim', 'is-active');
    c.cell.classList.add('is-done');
  }
  log('冒泡完成：大的元素逐步「冒」到右侧');
  return a;
}

async function runInsertion(cells, values, speed, signal, log) {
  const a = values.slice();
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    setBarState(cells, i, 'is-pivot');
    log(`插入键 ${key}`);
    await sleep(speed, signal);
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      syncBars(cells, a);
      setBarState(cells, [j, j + 1], 'is-active');
      await sleep(speed * 0.85, signal);
      j--;
    }
    a[j + 1] = key;
    syncBars(cells, a);
  }
  for (const c of cells) c.cell.classList.add('is-done');
  log('插入排序完成：左侧始终有序');
  return a;
}

async function runSelection(cells, values, speed, signal, log) {
  const a = values.slice();
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      setBarState(cells, [min, j], 'is-active');
      await sleep(speed * 0.55, signal);
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      syncBars(cells, a);
      log(`选出最小 ${a[i]} 放到位置 ${i}`);
      await sleep(speed, signal);
    }
    cells[i]?.cell.classList.add('is-done');
  }
  log('选择排序完成');
  return a;
}

async function runQuick(cells, values, speed, signal, log) {
  const a = values.slice();
  async function partition(lo, hi) {
    const pivot = a[hi];
    cells[hi]?.cell.classList.add('is-pivot');
    log(`枢轴 ${pivot}（末位）`);
    let i = lo;
    for (let j = lo; j < hi; j++) {
      setBarState(cells, [j, hi], 'is-active');
      cells[hi]?.cell.classList.add('is-pivot');
      await sleep(speed * 0.7, signal);
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        syncBars(cells, a);
        i++;
        await sleep(speed * 0.55, signal);
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    syncBars(cells, a);
    cells[hi]?.cell.classList.remove('is-pivot');
    return i;
  }
  async function q(lo, hi) {
    if (lo >= hi) return;
    const p = await partition(lo, hi);
    cells[p]?.cell.classList.add('is-done');
    await q(lo, p - 1);
    await q(p + 1, hi);
  }
  await q(0, a.length - 1);
  for (const c of cells) c.cell.classList.add('is-done');
  log('快排完成：分治 + 分区');
  return a;
}

/** 归并：先分后合；稳定；额外 O(n) 空间（演示用辅助数组写出） */
async function runMerge(cells, values, speed, signal, log) {
  const a = values.slice();
  async function merge(lo, mid, hi) {
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    log(`合并 [${lo}..${mid}] 与 [${mid + 1}..${hi}]`);
    setBarState(
      cells,
      Array.from({ length: hi - lo + 1 }, (_, k) => lo + k),
      'is-active'
    );
    await sleep(speed * 0.6, signal);
    let i = 0;
    let j = 0;
    let k = lo;
    while (i < left.length && j < right.length) {
      setBarState(cells, [k], 'is-pivot');
      await sleep(speed * 0.55, signal);
      if (left[i] <= right[j]) {
        a[k] = left[i++];
      } else {
        a[k] = right[j++];
      }
      syncBars(cells, a);
      k++;
    }
    while (i < left.length) {
      a[k++] = left[i++];
      syncBars(cells, a);
      await sleep(speed * 0.4, signal);
    }
    while (j < right.length) {
      a[k++] = right[j++];
      syncBars(cells, a);
      await sleep(speed * 0.4, signal);
    }
  }
  async function sort(lo, hi) {
    if (lo >= hi) return;
    const mid = (lo + hi) >> 1;
    log(`划分 [${lo}..${hi}] → mid=${mid}`);
    setBarState(cells, [lo, mid, hi], 'is-active');
    await sleep(speed * 0.5, signal);
    await sort(lo, mid);
    await sort(mid + 1, hi);
    await merge(lo, mid, hi);
  }
  await sort(0, a.length - 1);
  for (const c of cells) {
    c.cell.classList.remove('is-dim', 'is-active', 'is-pivot');
    c.cell.classList.add('is-done');
  }
  log('归并完成：稳定、最坏也是 n log n；代价是额外空间');
  return a;
}

/** 堆排：建大顶堆 → 反复把堆顶换到末尾并下沉 */
async function runHeap(cells, values, speed, signal, log) {
  const a = values.slice();
  const n = a.length;

  async function siftDown(i, heapSize) {
    for (;;) {
      let largest = i;
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      if (l < heapSize && a[l] > a[largest]) largest = l;
      if (r < heapSize && a[r] > a[largest]) largest = r;
      setBarState(cells, [i, l < heapSize ? l : i, r < heapSize ? r : i], 'is-active');
      await sleep(speed * 0.45, signal);
      if (largest === i) break;
      [a[i], a[largest]] = [a[largest], a[i]];
      syncBars(cells, a);
      log(`下沉：${a[largest]} ↔ ${a[i]}（堆序）`);
      await sleep(speed * 0.5, signal);
      i = largest;
    }
  }

  log('建堆：从最后一个非叶节点向上 siftDown');
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    cells[i]?.cell.classList.add('is-pivot');
    await siftDown(i, n);
    cells[i]?.cell.classList.remove('is-pivot');
  }
  log('大顶堆就绪：根是最大');

  for (let end = n - 1; end > 0; end--) {
    setBarState(cells, [0, end], 'is-pivot');
    log(`取出堆顶 ${a[0]} → 位置 ${end}`);
    await sleep(speed * 0.55, signal);
    [a[0], a[end]] = [a[end], a[0]];
    syncBars(cells, a);
    cells[end]?.cell.classList.add('is-done');
    await siftDown(0, end);
  }
  cells[0]?.cell.classList.add('is-done');
  for (const c of cells) {
    c.cell.classList.remove('is-dim', 'is-active', 'is-pivot');
    c.cell.classList.add('is-done');
  }
  log('堆排完成：原地 n log n，通常不稳定');
  return a;
}

async function runBinary(cells, values, speed, signal, log) {
  const a = values.slice().sort((x, y) => x - y);
  syncBars(cells, a);
  log(`先有序：[${a.join(', ')}]`);
  await sleep(speed, signal);
  const target = a[Math.floor(a.length * 0.65)] ?? a[0];
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    setBarState(cells, [lo, mid, hi], 'is-active');
    cells[mid]?.cell.classList.add('is-pivot');
    log(`查 ${target}：lo=${lo} mid=${mid}(${a[mid]}) hi=${hi}`);
    await sleep(speed, signal);
    if (a[mid] === target) {
      setBarState(cells, mid, 'is-done');
      log(`命中下标 ${mid}`);
      return mid;
    }
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  log('未找到');
  return -1;
}

function gridStage(spec) {
  const rows = Number(spec.rows) || 4;
  const cols = Number(spec.cols) || 5;
  const walls = new Set((spec.walls || []).map(([r, c]) => `${r},${c}`));
  const start = spec.start || [0, 0];
  const goal = spec.goal || [rows - 1, cols - 1];
  const stage = el('div', 'vibe-algo__grid');
  stage.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  /** @type {HTMLElement[][]} */
  const cells = [];
  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = el('div', 'vibe-algo__cell', { 'data-r': String(r), 'data-c': String(c) });
      const key = `${r},${c}`;
      if (walls.has(key)) cell.classList.add('is-wall');
      if (r === start[0] && c === start[1]) {
        cell.classList.add('is-start');
        cell.textContent = 'S';
      } else if (r === goal[0] && c === goal[1]) {
        cell.classList.add('is-goal');
        cell.textContent = 'G';
      }
      cells[r][c] = cell;
      stage.append(cell);
    }
  }
  return { stage, cells, rows, cols, walls, start, goal };
}

async function runBfs(grid, speed, signal, log) {
  const { cells, rows, cols, walls, start, goal } = grid;
  const q = [start];
  const seen = new Set([`${start[0]},${start[1]}`]);
  const parent = new Map();
  log('BFS：队列，一层层扩');
  while (q.length) {
    const [r, c] = q.shift();
    const cell = cells[r][c];
    if (!cell.classList.contains('is-start') && !cell.classList.contains('is-goal')) {
      cell.classList.add('is-visit');
    }
    log(`出队 (${r},${c})`);
    await sleep(speed * 0.75, signal);
    if (r === goal[0] && c === goal[1]) {
      let cur = `${r},${c}`;
      while (cur) {
        const [pr, pc] = cur.split(',').map(Number);
        const pc_ = cells[pr][pc];
        if (!pc_.classList.contains('is-start') && !pc_.classList.contains('is-goal')) {
          pc_.classList.add('is-path');
        }
        cur = parent.get(cur);
      }
      log('找到目标，回溯最短路径（无权）');
      return;
    }
    for (const [dr, dc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (walls.has(key) || seen.has(key)) continue;
      seen.add(key);
      parent.set(key, `${r},${c}`);
      q.push([nr, nc]);
      cells[nr][nc].classList.add('is-frontier');
    }
    await sleep(speed * 0.35, signal);
  }
  log('不可达');
}

async function runDfs(grid, speed, signal, log) {
  const { cells, rows, cols, walls, start, goal } = grid;
  const stack = [start];
  const seen = new Set([`${start[0]},${start[1]}`]);
  log('DFS：栈，一条路走到黑再回溯');
  while (stack.length) {
    const [r, c] = stack.pop();
    const cell = cells[r][c];
    if (!cell.classList.contains('is-start') && !cell.classList.contains('is-goal')) {
      cell.classList.add('is-visit');
    }
    log(`弹出 (${r},${c})`);
    await sleep(speed * 0.7, signal);
    if (r === goal[0] && c === goal[1]) {
      log('DFS 抵达目标（路径未必最短）');
      return;
    }
    for (const [dr, dc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (walls.has(key) || seen.has(key)) continue;
      seen.add(key);
      stack.push([nr, nc]);
      cells[nr][nc].classList.add('is-frontier');
    }
  }
  log('不可达');
}

function listStage(values) {
  const stage = el('div', 'vibe-algo__list');
  const nodes = values.map((v, i) => {
    const node = el('div', 'vibe-algo__node', { text: String(v) });
    const wrap = el('div', 'vibe-algo__node-wrap');
    wrap.append(node);
    if (i < values.length - 1) wrap.append(el('span', 'vibe-algo__arrow', { text: '→' }));
    return { wrap, node, v };
  });
  for (const n of nodes) stage.append(n.wrap);
  return { stage, nodes };
}

async function runListReverse(list, speed, signal, log) {
  const vals = list.nodes.map((n) => n.v);
  log(`原链：${vals.join(' → ')}`);
  await sleep(speed, signal);
  let prev = null;
  let cur = 0;
  const nextOf = vals.map((_, i) => (i < vals.length - 1 ? i + 1 : null));
  // Visual: highlight and rebuild order text
  while (cur != null) {
    list.nodes[cur]?.node.classList.add('is-active');
    const nxt = nextOf[cur];
    log(`反转：prev=${prev} cur=${cur} next=${nxt}`);
    await sleep(speed, signal);
    nextOf[cur] = prev;
    prev = cur;
    cur = nxt;
    for (const n of list.nodes) n.node.classList.remove('is-active');
  }
  // Rebuild display order by following from new head=prev
  const order = [];
  let p = prev;
  const seen = new Set();
  while (p != null && !seen.has(p)) {
    seen.add(p);
    order.push(vals[p]);
    p = nextOf[p];
  }
  list.stage.replaceChildren();
  const rebuilt = listStage(order);
  list.stage.append(...rebuilt.stage.children);
  log(`反转后：${order.join(' → ')}`);
}

function ufStage(n) {
  const stage = el('div', 'vibe-algo__uf');
  const parent = Array.from({ length: n }, (_, i) => i);
  const cells = [];
  for (let i = 0; i < n; i++) {
    const cell = el('div', 'vibe-algo__uf-item');
    cell.append(
      el('strong', '', { text: String(i) }),
      el('span', 'vibe-algo__uf-p', { text: `→${i}` })
    );
    cells.push(cell);
    stage.append(cell);
  }
  function find(x) {
    while (parent[x] !== x) x = parent[x];
    return x;
  }
  function paint() {
    for (let i = 0; i < n; i++) {
      const r = find(i);
      cells[i].querySelector('.vibe-algo__uf-p').textContent = `→${parent[i]} (根${r})`;
      cells[i].style.setProperty('--uf', `hsl(${(r * 55) % 360} 70% 46%)`);
    }
  }
  paint();
  return { stage, parent, find, paint, cells };
}

async function runUf(uf, unions, speed, signal, log) {
  for (const [a, b] of unions) {
    const ra = uf.find(a);
    const rb = uf.find(b);
    uf.cells[a].classList.add('is-active');
    uf.cells[b].classList.add('is-active');
    log(`union(${a},${b})：根 ${ra} 与 ${rb}`);
    await sleep(speed, signal);
    if (ra !== rb) uf.parent[rb] = ra;
    uf.paint();
    await sleep(speed * 0.8, signal);
    for (const c of uf.cells) c.classList.remove('is-active');
  }
  log('并查集：连通分量用「代表元」合并');
}

function gdStage() {
  const stage = el('div', 'vibe-algo__gd');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 320 140');
  svg.classList.add('vibe-algo__gd-svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // f(x)=(x-1)^2 + 0.5 ，x in [-1,5] mapped to svg
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const x = -1 + (6 * i) / 40;
    const y = (x - 1) ** 2 + 0.5;
    const sx = 20 + ((x + 1) / 6) * 280;
    const sy = 120 - Math.min(y, 8) * 12;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  path.setAttribute('d', pts.join(' '));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('r', '5');
  dot.setAttribute('class', 'vibe-algo__gd-dot');
  svg.append(path, dot);
  stage.append(svg);
  function place(x) {
    const y = (x - 1) ** 2 + 0.5;
    const sx = 20 + ((x + 1) / 6) * 280;
    const sy = 120 - Math.min(y, 8) * 12;
    dot.setAttribute('cx', String(sx));
    dot.setAttribute('cy', String(sy));
  }
  return { stage, place, f: (x) => (x - 1) ** 2 + 0.5, df: (x) => 2 * (x - 1) };
}

async function runGd(gd, spec, speed, signal, log) {
  let x = Number(spec.start) || 4.5;
  const lr = Number(spec.lr) || 0.15;
  const steps = Number(spec.steps) || 16;
  gd.place(x);
  log(`梯度下降：x=${x.toFixed(2)}，沿 -∇f 走`);
  for (let i = 0; i < steps; i++) {
    const g = gd.df(x);
    x -= lr * g;
    gd.place(x);
    log(`步 ${i + 1}：∇≈${g.toFixed(2)} → x=${x.toFixed(3)} f=${gd.f(x).toFixed(3)}`);
    await sleep(speed * 0.85, signal);
  }
  log('极小值附近（开口朝上的抛物线）。神经网络训练同思路，只是参数更多。');
}

/** 轮转调度：时间片轮流占用 CPU（OSTEP「虚拟化 CPU」直觉） */
function schedulerStage(procs) {
  const stage = el('div', 'vibe-algo__sched');
  const cpu = el('div', 'vibe-algo__sched-cpu', { text: 'CPU · 空闲' });
  const lanes = el('div', 'vibe-algo__sched-lanes');
  const cells = procs.map((p) => {
    const row = el('div', 'vibe-algo__sched-row');
    const lab = el('span', 'vibe-algo__sched-lab', { text: `进程 ${p.id}` });
    const track = el('div', 'vibe-algo__sched-track');
    const fill = el('div', 'vibe-algo__sched-fill');
    fill.style.width = '0%';
    track.append(fill);
    const rem = el('span', 'vibe-algo__sched-rem', { text: `剩余 ${p.burst}` });
    row.append(lab, track, rem);
    lanes.append(row);
    return { ...p, left: p.burst, row, fill, rem };
  });
  stage.append(cpu, lanes);
  return { stage, cpu, cells };
}

async function runScheduler(sched, spec, speed, signal, log) {
  const quantum = Math.max(1, Number(spec.quantum) || 2);
  const cells = sched.cells.map((c) => ({ ...c, left: c.burst }));
  const total = cells.reduce((s, c) => s + c.burst, 0);
  let done = 0;
  let t = 0;
  const q = cells.map((_, i) => i);
  log(`轮转（RR）：时间片=${quantum}；多进程「同时」推进靠时间共享`);
  while (q.length) {
    const i = q.shift();
    const p = cells[i];
    if (p.left <= 0) continue;
    const slice = Math.min(quantum, p.left);
    for (const c of cells) c.row.classList.remove('is-active', 'is-done');
    p.row.classList.add('is-active');
    sched.cpu.textContent = `CPU · 跑 ${p.id}（本片 ${slice}）`;
    log(`t=${t}：调度 ${p.id}，用掉时间片 ${slice}（剩余将 ${p.left - slice}）`);
    for (let s = 0; s < slice; s++) {
      p.left -= 1;
      done += 1;
      t += 1;
      const pct = ((p.burst - p.left) / p.burst) * 100;
      p.fill.style.width = `${pct}%`;
      p.rem.textContent = p.left > 0 ? `剩余 ${p.left}` : '完成';
      await sleep(speed * 0.55, signal);
    }
    if (p.left > 0) {
      q.push(i);
      p.row.classList.remove('is-active');
    } else {
      p.row.classList.add('is-done');
      p.row.classList.remove('is-active');
      log(`进程 ${p.id} 跑完`);
    }
    await sleep(speed * 0.35, signal);
  }
  sched.cpu.textContent = 'CPU · 空闲';
  log(`全部完成（共 ${total} 单位时间）。这就是「虚拟化 CPU」：每进程以为独占，内核在切。`);
}

/** 存储层次：由近到远点亮，强调延迟与容量权衡 */
function memHierStage(levels) {
  const stage = el('div', 'vibe-algo__mem');
  const cells = levels.map((lv, i) => {
    const row = el('div', 'vibe-algo__mem-row');
    row.style.setProperty('--mem-w', `${42 + i * 18}%`);
    row.append(
      el('span', 'vibe-algo__mem-name', { text: lv.name }),
      el('span', 'vibe-algo__mem-meta', { text: `${lv.lat} · ${lv.size}` })
    );
    stage.append(row);
    return { ...lv, row };
  });
  return { stage, cells };
}

async function runMemHier(mem, speed, signal, log) {
  log('存储层次：越靠近 CPU 越快、越小、越贵');
  for (const c of mem.cells) {
    for (const x of mem.cells) x.row.classList.remove('is-active');
    c.row.classList.add('is-active');
    log(`${c.name}：延迟 ${c.lat}，容量 ${c.size}`);
    await sleep(speed, signal);
  }
  for (const c of mem.cells) c.row.classList.add('is-done');
  log('局部性好 → 多数访问落在上层；缺页/冷启动会掉到磁盘层');
}

/** PATH 查找：从左到右扫目录，命中第一个同名可执行文件 */
function pathFindStage(dirs, cmd) {
  const stage = el('div', 'vibe-algo__path');
  stage.append(el('div', 'vibe-algo__path-cmd', { text: `查找：${cmd}` }));
  const list = el('div', 'vibe-algo__path-list');
  const cells = dirs.map((d, i) => {
    const row = el('div', 'vibe-algo__path-row');
    row.append(
      el('span', 'vibe-algo__path-idx', { text: String(i + 1) }),
      el('code', 'vibe-algo__path-dir', { text: d.path })
    );
    list.append(row);
    return { ...d, row };
  });
  stage.append(list);
  return { stage, cells, cmd };
}

async function runPathFind(pf, speed, signal, log) {
  log(`Shell 按 PATH 顺序找「${pf.cmd}」——先到先得`);
  let found = null;
  for (const c of pf.cells) {
    for (const x of pf.cells) x.row.classList.remove('is-active', 'is-miss', 'is-hit');
    c.row.classList.add('is-active');
    log(`检查 ${c.path} …`);
    await sleep(speed, signal);
    if (c.hit && !found) {
      c.row.classList.add('is-hit');
      found = c.path;
      log(`命中：${c.path}/${pf.cmd}（后面的目录不再看）`);
      await sleep(speed * 1.1, signal);
      break;
    }
    c.row.classList.add('is-miss');
    log(`${c.path} 没有 ${pf.cmd}`);
    await sleep(speed * 0.7, signal);
  }
  if (!found) log('整条 PATH 都没有 → command not found / 不是内部或外部命令');
  else log(`最终跑的是这一份。换 PATH 顺序 = 可能换到另一份同名程序。`);
}

/** Git 三区模拟：脏文件 → add → commit 芯片 → push */
function gitStageStage(files) {
  const stage = el('div', 'vibe-algo__git');
  const cmd = el('div', 'vibe-algo__git-cmd', { text: '$ git status' });
  const row = el('div', 'vibe-algo__git-row');
  const areas = [
    { id: 'work', title: '工作区', hint: '正在改' },
    { id: 'stage', title: '暂存区', hint: 'git add' },
    { id: 'local', title: '本地仓库', hint: '.git' },
    { id: 'remote', title: '远程 origin', hint: 'push/pull' },
  ];
  /** @type {Record<string, { box: HTMLElement, slot: HTMLElement }>} */
  const cells = {};
  for (const a of areas) {
    const box = el('div', 'vibe-algo__git-box', { 'data-area': a.id });
    const head = el('div', 'vibe-algo__git-head');
    head.append(
      el('div', 'vibe-algo__git-title', { text: a.title }),
      el('div', 'vibe-algo__git-hint', { text: a.hint })
    );
    const slot = el('div', 'vibe-algo__git-slot');
    box.append(head, slot);
    row.append(box);
    cells[a.id] = { box, slot };
  }
  // arrows between
  const rail = el('div', 'vibe-algo__git-rail');
  for (let i = 0; i < 3; i++) {
    rail.append(el('span', 'vibe-algo__git-arrow', { text: '→' }));
  }
  stage.append(cmd, row, rail);

  const chips = files.map((f) => {
    const chip = el('div', 'vibe-algo__git-file');
    chip.append(
      el('span', `vibe-algo__git-mark is-${f.mark === '?' ? 'untracked' : 'modified'}`, {
        text: f.mark || 'M',
      }),
      el('span', 'vibe-algo__git-fname', { text: f.name })
    );
    return { ...f, chip };
  });

  return { stage, cells, chips, cmd };
}

function setGitCmd(gs, text) {
  gs.cmd.textContent = text;
}

function highlightGitArea(gs, id) {
  for (const [k, c] of Object.entries(gs.cells)) {
    c.box.classList.toggle('is-active', k === id);
  }
}

async function runGitStage(gs, spec, speed, signal, log) {
  const commit = spec.commit || { hash: 'a1b2c3d', msg: 'feat: wire first run' };
  // reset
  for (const c of Object.values(gs.cells)) {
    c.box.classList.remove('is-active', 'is-done', 'is-pulse');
    c.slot.replaceChildren();
  }
  setGitCmd(gs, '$ # 工作区有未提交改动');
  highlightGitArea(gs, 'work');
  for (const f of gs.chips) gs.cells.work.slot.append(f.chip);
  log('工作区：M=已跟踪改动，?=未跟踪新文件');
  await sleep(speed, signal);

  setGitCmd(gs, '$ git add app.js');
  highlightGitArea(gs, 'stage');
  const first = gs.chips[0];
  if (first) {
    first.chip.classList.add('is-moving');
    gs.cells.stage.slot.append(first.chip);
    first.chip.classList.remove('is-moving');
    first.chip.querySelector('.vibe-algo__git-mark')?.classList.add('is-staged');
    const mark = first.chip.querySelector('.vibe-algo__git-mark');
    if (mark) mark.textContent = 'A';
  }
  log('git add：只把选中文件放进暂存「购物车」（note.md 仍留在工作区）');
  await sleep(speed * 1.1, signal);

  setGitCmd(gs, `$ git commit -m "${commit.msg}"`);
  highlightGitArea(gs, 'local');
  gs.cells.stage.slot.replaceChildren();
  const card = el('div', 'vibe-algo__git-commit');
  card.append(
    el('code', 'vibe-algo__git-hash', { text: String(commit.hash).slice(0, 7) }),
    el('span', 'vibe-algo__git-msg', { text: commit.msg })
  );
  gs.cells.local.slot.append(card);
  gs.cells.local.box.classList.add('is-pulse');
  log('git commit：暂存清空，本地仓库多了一个不可变快照');
  await sleep(speed * 1.15, signal);
  gs.cells.local.box.classList.remove('is-pulse');

  setGitCmd(gs, '$ git push -u origin HEAD');
  highlightGitArea(gs, 'remote');
  const remoteCard = card.cloneNode(true);
  remoteCard.classList.add('is-remote');
  gs.cells.remote.slot.append(remoteCard);
  gs.cells.remote.box.classList.add('is-done');
  gs.cells.local.box.classList.add('is-done');
  log('git push：把本地提交上传到 origin；网页上才看得到 PR 入口');
  await sleep(speed * 0.9, signal);

  for (const c of Object.values(gs.cells)) c.box.classList.remove('is-active');
  setGitCmd(gs, '$ # 完成：工作区仍可能有未 add 的文件');
  log('口诀：改 → add → commit → push。没 add 的文件不会进提交。');
}

/** clone 落盘：远程对象 → 本地目录树（可演示失败） */
function gitCloneStage(spec) {
  const stage = el('div', 'vibe-algo__clone');
  const remote = el('div', 'vibe-algo__clone-remote');
  remote.append(
    el('div', 'vibe-algo__clone-cloud', { text: '☁ 远程' }),
    el('code', 'vibe-algo__clone-repo', { text: spec.repo || 'XRK-AGT.git' })
  );
  const pipe = el('div', 'vibe-algo__clone-pipe');
  const bar = el('div', 'vibe-algo__clone-bar');
  const fill = el('div', 'vibe-algo__clone-fill');
  bar.append(fill);
  const pct = el('div', 'vibe-algo__clone-pct', { text: '等待 clone…' });
  pipe.append(bar, pct);

  const local = el('div', 'vibe-algo__clone-local');
  local.append(el('div', 'vibe-algo__clone-disk', { text: '本地磁盘' }));
  const tree = el('div', 'vibe-algo__clone-tree');
  local.append(tree);

  stage.append(remote, pipe, local);
  return { stage, fill, pct, tree, remote, local, entries: spec.entries || [] };
}

async function runGitClone(cl, spec, speed, signal, log) {
  const fail = Boolean(spec.fail);
  cl.fill.style.width = '0%';
  cl.pct.textContent = fail ? 'Connecting github.com:443…' : 'Counting objects…';
  cl.tree.replaceChildren();
  cl.remote.classList.add('is-active');
  cl.local.classList.remove('is-ok', 'is-fail');
  log(fail ? '国内直连：TCP/TLS 建连中…' : '开始从远程拉取对象');
  await sleep(speed * 0.7, signal);

  if (fail) {
    for (const p of [8, 12, 12]) {
      cl.fill.style.width = `${p}%`;
      cl.fill.classList.add('is-stuck');
      cl.pct.textContent = `Failed after ${21000 + p * 10} ms`;
      await sleep(speed * 0.55, signal);
    }
    cl.local.classList.add('is-fail');
    cl.pct.textContent = 'fatal: Could not connect to server';
    cl.tree.append(
      el('div', 'vibe-algo__clone-err', {
        text: '不是 Git 坏了 → 代理 / 镜像 / ghproxy（见部署环境）',
      })
    );
    log('典型失败：连不上 443。对策在会话代理，不在重装 Git');
    return;
  }

  cl.fill.classList.remove('is-stuck');
  for (let p = 0; p <= 100; p += 20) {
    cl.fill.style.width = `${p}%`;
    cl.pct.textContent =
      p < 40 ? `Receiving objects ${p}%` : p < 80 ? `Resolving deltas ${p}%` : `Checking out ${p}%`;
    await sleep(speed * 0.4, signal);
  }
  cl.remote.classList.remove('is-active');
  cl.local.classList.add('is-ok');
  cl.pct.textContent = 'clone 完成 · 认仓库根';
  log('对象落盘：先有 .git，再检出工作区文件');
  const root = el('div', 'vibe-algo__clone-root', { text: 'XRK-AGT/' });
  cl.tree.append(root);
  for (const name of cl.entries) {
    const line = el('div', 'vibe-algo__clone-entry is-enter', { text: `  ${name}` });
    if (String(name).includes('package.json')) line.classList.add('is-key');
    cl.tree.append(line);
    await sleep(speed * 0.35, signal);
  }
  log('能看见根 package.json 的目录 = pnpm install 的正确位置');
}

/** 分支合流：main / feat 时间线，merge 或 conflict */
function gitBranchStage(spec) {
  const stage = el('div', 'vibe-algo__branch');
  const legend = el('div', 'vibe-algo__branch-legend');
  legend.append(
    el('span', 'is-main', { text: 'main' }),
    el('span', 'is-feat', { text: 'feat/*' })
  );
  const lanes = el('div', 'vibe-algo__branch-lanes');

  function makeLane(cls, label, commits) {
    const lane = el('div', `vibe-algo__branch-lane ${cls}`);
    lane.append(el('div', 'vibe-algo__branch-lab', { text: label }));
    const track = el('div', 'vibe-algo__branch-track');
    const nodes = (commits || []).map((id, i) => {
      const n = el('div', 'vibe-algo__branch-node', { text: String(id).slice(0, 2), title: id });
      if (i === 0) n.classList.add('is-base');
      track.append(n);
      if (i < commits.length - 1) track.append(el('div', 'vibe-algo__branch-edge'));
      return n;
    });
    lane.append(track);
    return { lane, track, nodes };
  }

  const main = makeLane('is-main', 'main', spec.main || ['c0', 'c1', 'c2']);
  const feat = makeLane('is-feat', 'feat/lab', spec.feat || ['f1', 'f2']);
  lanes.append(main.lane, feat.lane);
  const banner = el('div', 'vibe-algo__branch-banner', { text: '准备合并…' });
  stage.append(legend, lanes, banner);
  return { stage, main, feat, banner };
}

async function runGitBranch(br, spec, speed, signal, log) {
  const mode = String(spec.mode || 'merge').toLowerCase();
  br.banner.textContent = 'git switch -c feat/lab';
  br.feat.lane.classList.add('is-active');
  log('从 main 拉出平行时间线：实验不直接搅主线');
  await sleep(speed, signal);

  for (const n of br.feat.nodes) {
    n.classList.add('is-glow');
    await sleep(speed * 0.45, signal);
  }
  br.banner.textContent = '在 feat 上 commit ×2';
  log('小步提交：每点都是可回滚快照');
  await sleep(speed, signal);

  if (mode === 'conflict') {
    br.banner.textContent = 'merge 冲突！';
    br.banner.classList.add('is-conflict');
    br.main.nodes.at(-1)?.classList.add('is-conflict');
    br.feat.nodes.at(-1)?.classList.add('is-conflict');
    log('两边改了同一行 → <<<<<<< / ======= / >>>>>>> 要人工选留');
    await sleep(speed * 1.2, signal);
    br.banner.textContent = '改文件 → git add → commit 完成合并';
    br.banner.classList.remove('is-conflict');
    br.banner.classList.add('is-ok');
    log('冲突不是「Git 坏了」，是协作同时改同一处');
    return;
  }

  br.banner.textContent = 'git merge feat/lab → main';
  br.main.lane.classList.add('is-active');
  const mergeNode = el('div', 'vibe-algo__branch-node is-merge', { text: 'M' });
  br.main.track.append(el('div', 'vibe-algo__branch-edge'), mergeNode);
  await sleep(speed * 0.6, signal);
  mergeNode.classList.add('is-glow');
  br.feat.lane.classList.add('is-merged');
  br.banner.classList.add('is-ok');
  br.banner.textContent = '合并完成 · 可开 PR 再合（远程同理）';
  log('本地 merge 与网页 PR：心智相同，PR 多了审查与 CI 门禁');
}

/** 事件循环：同步栈 → 微任务 → 宏任务（MDN 执行模型直觉） */
function eventLoopStage() {
  const stage = el('div', 'vibe-algo__eloop');
  const stack = el('div', 'vibe-algo__eloop-col');
  stack.append(el('div', 'vibe-algo__eloop-h', { text: '调用栈' }));
  const stackBody = el('div', 'vibe-algo__eloop-body vibe-algo__eloop-stack');
  stack.append(stackBody);
  const micro = el('div', 'vibe-algo__eloop-col');
  micro.append(el('div', 'vibe-algo__eloop-h', { text: '微任务' }));
  const microBody = el('div', 'vibe-algo__eloop-body');
  micro.append(microBody);
  const macro = el('div', 'vibe-algo__eloop-col');
  macro.append(el('div', 'vibe-algo__eloop-h', { text: '宏任务' }));
  const macroBody = el('div', 'vibe-algo__eloop-body');
  macro.append(macroBody);
  const out = el('div', 'vibe-algo__eloop-out');
  out.append(el('span', 'vibe-algo__eloop-out-lab', { text: '输出' }));
  const outBody = el('div', 'vibe-algo__eloop-out-body');
  out.append(outBody);
  stage.append(stack, micro, macro, out);
  return { stage, stackBody, microBody, macroBody, outBody };
}

async function runEventLoop(ui, spec, speed, signal, log) {
  const steps = Array.isArray(spec.steps) ? spec.steps : [];
  const expected = Array.isArray(spec.output) ? spec.output.map(String) : [];
  ui.stackBody.replaceChildren();
  ui.microBody.replaceChildren();
  ui.macroBody.replaceChildren();
  ui.outBody.replaceChildren();
  log('先跑完当前同步代码；再清空微任务；再取一个宏任务（如 setTimeout）');
  await sleep(speed * 0.5, signal);

  for (const step of steps) {
    const kind = String(step.kind || 'sync');
    const label = String(step.label || '?');
    if (kind === 'sync') {
      const chip = el('div', 'vibe-algo__eloop-chip is-active', { text: label });
      ui.stackBody.append(chip);
      log(`同步：${label}`);
      await sleep(speed, signal);
      if (/console\.log\(['"](.)['"]\)/.test(label)) {
        const m = label.match(/console\.log\(['"](.)['"]\)/);
        if (m) ui.outBody.append(el('span', 'vibe-algo__eloop-token', { text: m[1] }));
      }
      chip.classList.remove('is-active');
      chip.classList.add('is-done');
      await sleep(speed * 0.35, signal);
      chip.remove();
    } else if (kind === 'micro') {
      const chip = el('div', 'vibe-algo__eloop-chip is-micro', { text: label });
      ui.microBody.append(chip);
      log(`入队微任务：${label}`);
      await sleep(speed * 0.85, signal);
    } else if (kind === 'macro') {
      const chip = el('div', 'vibe-algo__eloop-chip is-macro', { text: label });
      ui.macroBody.append(chip);
      log(`入队宏任务：${label}`);
      await sleep(speed * 0.85, signal);
    }
  }

  log('同步栈空 → 排空微任务');
  await sleep(speed * 0.5, signal);
  while (ui.microBody.firstChild) {
    const chip = ui.microBody.firstChild;
    chip.classList.add('is-active');
    log(`跑微任务：${chip.textContent}`);
    await sleep(speed, signal);
    ui.outBody.append(el('span', 'vibe-algo__eloop-token', { text: 'B' }));
    chip.remove();
  }

  log('取一个宏任务');
  await sleep(speed * 0.45, signal);
  if (ui.macroBody.firstChild) {
    const chip = ui.macroBody.firstChild;
    chip.classList.add('is-active');
    ui.stackBody.append(chip);
    log(`跑宏任务：${chip.textContent}`);
    await sleep(speed, signal);
    ui.outBody.append(el('span', 'vibe-algo__eloop-token', { text: 'C' }));
    chip.remove();
  }

  const got = [...ui.outBody.querySelectorAll('.vibe-algo__eloop-token')].map((n) => n.textContent);
  if (expected.length) {
    log(`输出顺序 ${got.join(' → ')}（期望 ${expected.join(' → ')}）。忘了 await 时，变量还是 Promise 收据。`);
  } else {
    log(`输出顺序 ${got.join(' → ')}`);
  }
}

/** 双宿主：同一门 JS，浏览器 / Node API 不同 */
function dualHostStage(apis) {
  const stage = el('div', 'vibe-algo__hosts');
  const head = el('div', 'vibe-algo__hosts-head');
  head.append(
    el('div', 'vibe-algo__hosts-h', { text: 'API' }),
    el('div', 'vibe-algo__hosts-h', { text: '浏览器' }),
    el('div', 'vibe-algo__hosts-h', { text: 'Node' })
  );
  stage.append(head);
  const rows = apis.map((a) => {
    const row = el('div', 'vibe-algo__hosts-row');
    const b = el('span', 'vibe-algo__hosts-cell', { text: a.browser ? '✓' : '✗' });
    const n = el('span', 'vibe-algo__hosts-cell', { text: a.node ? '✓' : '✗' });
    if (a.browser) b.classList.add('is-ok');
    else b.classList.add('is-no');
    if (a.node) n.classList.add('is-ok');
    else n.classList.add('is-no');
    row.append(el('code', 'vibe-algo__hosts-name', { text: a.name }), b, n);
    stage.append(row);
    return { ...a, row, b, n };
  });
  return { stage, rows };
}

async function runDualHost(ui, speed, signal, log) {
  log('语言都是 JavaScript；能不能用某 API 取决于宿主（浏览器 / Node）');
  for (const r of ui.rows) {
    for (const x of ui.rows) x.row.classList.remove('is-active');
    r.row.classList.add('is-active');
    const where = [
      r.browser ? '浏览器' : null,
      r.node ? 'Node' : null,
    ]
      .filter(Boolean)
      .join(' + ');
    log(`${r.name} → ${where || '两边都没有（演示外）'}`);
    await sleep(speed, signal);
  }
  for (const r of ui.rows) r.row.classList.add('is-done');
  log('本仓主服 = Node 宿主；www = 浏览器宿主。改码前先钉「在哪跑」。');
}

/** TS 类型擦除管线 */
function tsEraseStage(spec) {
  const stage = el('div', 'vibe-algo__tsc');
  const cards = [
    { id: 'src', title: 'TypeScript', body: spec.source },
    { id: 'strip', title: '类型擦除', body: 'interface / type 不进运行时' },
    { id: 'js', title: 'JavaScript', body: spec.erased },
    { id: 'run', title: '运行时', body: spec.run },
  ].map((c) => {
    const box = el('div', 'vibe-algo__tsc-box');
    box.append(
      el('div', 'vibe-algo__tsc-title', { text: c.title }),
      el('code', 'vibe-algo__tsc-body', { text: c.body })
    );
    stage.append(box);
    return { ...c, box };
  });
  return { stage, cards };
}

async function runTsErase(ui, speed, signal, log) {
  log('TS 是开发期类型层；跑起来仍是 JS（Node / 浏览器）');
  for (const c of ui.cards) {
    for (const x of ui.cards) x.box.classList.remove('is-active', 'is-done');
    c.box.classList.add('is-active');
    log(`${c.title}：${c.body}`);
    await sleep(speed * 1.05, signal);
    c.box.classList.add('is-done');
  }
  log('本仓主服大量原生 JS；要类型时再上 tsc/打包——别把 TS 当成另一门运行时。');
}

/** TCP 三次握手：SYN → SYN-ACK → ACK（MDN Glossary） */
function tcpHandshakeStage(spec) {
  const stage = el('div', 'vibe-algo__tcp');
  const client = el('div', 'vibe-algo__tcp-host');
  client.append(
    el('div', 'vibe-algo__tcp-role', { text: String(spec.client || '客户端') }),
    el('div', 'vibe-algo__tcp-sock', { text: 'CLOSED → …' })
  );
  const mid = el('div', 'vibe-algo__tcp-wire');
  const pkt = el('div', 'vibe-algo__tcp-pkt', { text: '…' });
  mid.append(pkt);
  const server = el('div', 'vibe-algo__tcp-host');
  server.append(
    el('div', 'vibe-algo__tcp-role', { text: String(spec.server || '服务器') }),
    el('div', 'vibe-algo__tcp-sock', { text: 'LISTEN → …' })
  );
  stage.append(client, mid, server);
  return {
    stage,
    pkt,
    cSock: client.querySelector('.vibe-algo__tcp-sock'),
    sSock: server.querySelector('.vibe-algo__tcp-sock'),
    client,
    server,
  };
}

async function runTcpHandshake(ui, speed, signal, log) {
  const fly = async (label, dir) => {
    ui.pkt.textContent = label;
    ui.pkt.classList.remove('is-left', 'is-right', 'is-show');
    void ui.pkt.offsetWidth;
    ui.pkt.classList.add('is-show', dir === 'c2s' ? 'is-right' : 'is-left');
    await sleep(speed * 1.1, signal);
  };

  ui.cSock.textContent = 'CLOSED';
  ui.sSock.textContent = 'LISTEN';
  log('三次握手（MDN）：先协商，再传 HTTP/TLS 数据');
  await sleep(speed * 0.45, signal);

  ui.client.classList.add('is-active');
  ui.cSock.textContent = 'SYN_SENT';
  log('1. 客户端 → 服务器：SYN（Synchronize）');
  await fly('SYN', 'c2s');
  ui.client.classList.remove('is-active');

  ui.server.classList.add('is-active');
  ui.sSock.textContent = 'SYN_RCVD';
  log('2. 服务器 → 客户端：SYN-ACK');
  await fly('SYN-ACK', 's2c');
  ui.server.classList.remove('is-active');

  ui.client.classList.add('is-active');
  log('3. 客户端 → 服务器：ACK');
  await fly('ACK', 'c2s');
  ui.cSock.textContent = 'ESTABLISHED';
  ui.sSock.textContent = 'ESTABLISHED';
  ui.client.classList.add('is-done');
  ui.server.classList.add('is-done');
  ui.pkt.textContent = '已连通';
  ui.pkt.classList.add('is-done');
  log('连接建立。之后才是 TLS（若 HTTPS）与 HTTP 请求。握手失败 ≠ 401（那是应用层鉴权）。');
}

/** DNS 递归解析示意（Cloudflare Learning 八步压缩） */
function dnsResolveStage(spec) {
  const stage = el('div', 'vibe-algo__dns');
  stage.append(el('div', 'vibe-algo__dns-q', { text: `查询：${spec.qname || 'example.com'}` }));
  const steps = [
    { id: 'stub', name: '本机 / stub' },
    { id: 'recur', name: '递归解析器' },
    { id: 'root', name: '根 .' },
    { id: 'tld', name: 'TLD（如 .com）' },
    { id: 'auth', name: '权威 NS' },
  ].map((s) => {
    const row = el('div', 'vibe-algo__dns-row');
    row.append(el('span', 'vibe-algo__dns-name', { text: s.name }));
    stage.append(row);
    return { ...s, row };
  });
  const ans = el('div', 'vibe-algo__dns-ans', { text: '答案：…' });
  stage.append(ans);
  return { stage, steps, ans, qname: String(spec.qname || 'example.com'), answer: String(spec.answer || '203.0.113.10') };
}

async function runDnsResolve(ui, speed, signal, log) {
  log(`DNS：把「${ui.qname}」翻译成 IP（可缓存；TTL 未过期会跳步）`);
  const msgs = [
    '应用问本机 stub / 缓存',
    '递归解析器接手（常是运营商 / 1.1.1.1）',
    '问根：谁管这个 TLD？',
    '问 TLD：谁是该域名权威？',
    '问权威 NS：A/AAAA 记录是什么？',
  ];
  for (let i = 0; i < ui.steps.length; i++) {
    for (const s of ui.steps) s.row.classList.remove('is-active');
    ui.steps[i].row.classList.add('is-active');
    log(msgs[i] || ui.steps[i].name);
    await sleep(speed, signal);
    ui.steps[i].row.classList.add('is-done');
  }
  ui.ans.textContent = `答案：${ui.qname} → ${ui.answer}`;
  ui.ans.classList.add('is-hit');
  log(`拿到 IP 后才会 TCP 握手（常见 :443）。改 DNS 不立刻生效 → 先想缓存与 TTL。`);
}

/** 反向代理请求流：客户端 → 门面 → 上游（可演示 502） */
function revProxyStage(spec) {
  const stage = el('div', 'vibe-algo__rpx');
  const mk = (title, sub) => {
    const box = el('div', 'vibe-algo__rpx-box');
    box.append(
      el('div', 'vibe-algo__rpx-title', { text: title }),
      el('div', 'vibe-algo__rpx-sub', { text: sub })
    );
    return box;
  };
  const client = mk(String(spec.client || '客户端'), '只看见入口');
  const proxy = mk(String(spec.proxy || '反向代理'), 'TLS / 路由 / 健康检查');
  const up = mk(String(spec.upstream || '上游应用'), '业务进程');
  const arrow1 = el('div', 'vibe-algo__rpx-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__rpx-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__rpx-status', { text: '等待请求…' });
  stage.append(client, arrow1, proxy, arrow2, up, status);
  return { stage, client, proxy, up, arrow1, arrow2, status, mode: String(spec.mode || 'ok') };
}

async function runRevProxy(ui, speed, signal, log) {
  const clear = () => {
    for (const n of [ui.client, ui.proxy, ui.up]) n.classList.remove('is-active', 'is-done', 'is-fail');
    ui.arrow1.classList.remove('is-on');
    ui.arrow2.classList.remove('is-on');
  };
  clear();
  log('反向代理（Cloudflare Learning）：坐在源站前面；客户端通常无感');
  await sleep(speed * 0.45, signal);

  ui.client.classList.add('is-active');
  ui.status.textContent = '① 客户端 → 入口（常 443）';
  log('访客只连入口；源站真实 IP 可以藏在后面');
  await sleep(speed, signal);
  ui.arrow1.classList.add('is-on');
  ui.proxy.classList.add('is-active');
  ui.client.classList.remove('is-active');
  ui.client.classList.add('is-done');
  ui.status.textContent = '② 门面：选上游 / 卸 TLS / 写转发头';
  log('Nginx：proxy_pass + Host / X-Forwarded-For（见官方 Reverse Proxy 指南）');
  await sleep(speed * 1.1, signal);

  ui.arrow2.classList.add('is-on');
  ui.up.classList.add('is-active');
  ui.proxy.classList.remove('is-active');
  ui.proxy.classList.add('is-done');

  if (ui.mode === 'fail') {
    ui.up.classList.add('is-fail');
    ui.status.textContent = '③ 上游无响应 → 502 Bad Gateway';
    log('门面活着、上游挂了或超时：浏览器看到 502/504，不是业务自己 return 的 500');
    await sleep(speed * 1.2, signal);
    log('排障：先 curl 上游端口，再查 proxy_pass / 超时 / 健康检查');
  } else {
    ui.up.classList.add('is-done');
    ui.status.textContent = '③ 上游 200 → 门面回客户端';
    log('成功路径。CDN 是「全球分布式反代 + 缓存」的亲戚，可叠在更外侧');
    await sleep(speed, signal);
  }
}

/** 正向代理选路：应用 → 本机引擎 → DIRECT / 节点 */
function proxyRouteStage(spec) {
  const stage = el('div', 'vibe-algo__prx');
  const mk = (title, sub) => {
    const box = el('div', 'vibe-algo__prx-box');
    box.append(
      el('div', 'vibe-algo__prx-title', { text: title }),
      el('div', 'vibe-algo__prx-sub', { text: sub })
    );
    return box;
  };
  const app = mk('应用 / Agent', '想访问目标');
  const engine = mk('本机引擎 :端口', '规则 ≈ 应用层路由');
  const nextHop = mk('下一跳', 'DIRECT 或节点');
  const dest = mk(String(spec.dest || '目标站'), '真正要去的地方');
  const arrow1 = el('div', 'vibe-algo__prx-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__prx-arrow', { text: '→' });
  const arrow3 = el('div', 'vibe-algo__prx-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__prx-status', { text: '等待连接…' });
  const rule = el('div', 'vibe-algo__prx-rule', {
    text: String(spec.rule || 'DOMAIN-SUFFIX,…'),
  });
  stage.append(app, arrow1, engine, arrow2, nextHop, arrow3, dest, rule, status);
  return {
    stage,
    app,
    engine,
    nextHop,
    dest,
    arrow1,
    arrow2,
    arrow3,
    status,
    rule,
    mode: String(spec.mode || 'proxy'),
  };
}

async function runProxyRoute(ui, speed, signal, log) {
  const clear = () => {
    for (const n of [ui.app, ui.engine, ui.nextHop, ui.dest]) {
      n.classList.remove('is-active', 'is-done', 'is-proxy', 'is-direct');
    }
    for (const a of [ui.arrow1, ui.arrow2, ui.arrow3]) a.classList.remove('is-on');
  };
  clear();
  const viaProxy = ui.mode !== 'direct';
  log('正向代理（Clash 系）：靠近客户端；程序须连本机入口端口才会进引擎');
  await sleep(speed * 0.4, signal);

  ui.app.classList.add('is-active');
  ui.status.textContent = '① 应用连 127.0.0.1:mixed-port（系统代理或 HTTP_PROXY）';
  log('浏览器常吃系统代理；git / Agent 常只吃 HTTP(S)_PROXY');
  await sleep(speed, signal);

  ui.arrow1.classList.add('is-on');
  ui.engine.classList.add('is-active');
  ui.app.classList.remove('is-active');
  ui.app.classList.add('is-done');
  ui.status.textContent = '② 引擎查 rules（像查路由表）';
  log(`规则：${ui.rule.textContent}`);
  await sleep(speed * 1.15, signal);

  ui.arrow2.classList.add('is-on');
  ui.nextHop.classList.add('is-active');
  ui.engine.classList.remove('is-active');
  ui.engine.classList.add('is-done');

  if (viaProxy) {
    ui.nextHop.classList.add('is-proxy');
    ui.nextHop.querySelector('.vibe-algo__prx-title').textContent = '节点出口';
    ui.nextHop.querySelector('.vibe-algo__prx-sub').textContent = 'PROXY 组当前节点';
    ui.status.textContent = '③ 命中 PROXY → 先到远端跳板';
    log('对端看到的是节点出口 IP，不是你家宽（白名单要对出口池）');
  } else {
    ui.nextHop.classList.add('is-direct');
    ui.nextHop.querySelector('.vibe-algo__prx-title').textContent = 'DIRECT';
    ui.nextHop.querySelector('.vibe-algo__prx-sub').textContent = '家用网关出网';
    ui.status.textContent = '③ 命中 DIRECT → 不经节点';
    log('国内镜像 / 本机服务常见直连；NO_PROXY 也是直连名单');
  }
  await sleep(speed * 1.05, signal);

  ui.arrow3.classList.add('is-on');
  ui.dest.classList.add('is-active');
  ui.nextHop.classList.remove('is-active');
  ui.nextHop.classList.add('is-done');
  ui.dest.classList.add('is-done');
  ui.status.textContent = viaProxy
    ? '④ 经节点到达目标（HTTPS 仍是应用层）'
    : '④ 直连到达目标';
  log('引擎 listen ≠ 全机自动进代理；TUN 才是进阶截流');
  await sleep(speed, signal);
}

/** XRK 分层：入口 → Runtime → Core →（可选）子服 */
function xrkLayersStage(spec) {
  const stage = el('div', 'vibe-algo__xrk');
  const mk = (title, sub) => {
    const box = el('div', 'vibe-algo__xrk-box');
    box.append(
      el('div', 'vibe-algo__xrk-title', { text: title }),
      el('div', 'vibe-algo__xrk-sub', { text: sub })
    );
    return box;
  };
  const mode = String(spec.mode || 'http');
  const entry =
    mode === 'plugin'
      ? mk('通道 / Tasker', '造出事件 e')
      : mk('HTTP / www', '浏览器或 API 客户端');
  const rt = mk('AgentRuntime', 'src/ · Loader 舞台');
  const core =
    mode === 'plugin'
      ? mk('core/*/plugin', '业务插件')
      : mk('core/*/http|www', '业务 API / 静态');
  const extra =
    mode === 'sub'
      ? mk('subserver', 'callSubserver')
      : mk('（本路径止于 Core）', '短板再进子服');
  const arrow1 = el('div', 'vibe-algo__xrk-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__xrk-arrow', { text: '→' });
  const arrow3 = el('div', 'vibe-algo__xrk-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__xrk-status', { text: '等待请求…' });
  stage.append(entry, arrow1, rt, arrow2, core, arrow3, extra, status);
  return { stage, entry, rt, core, extra, arrow1, arrow2, arrow3, status, mode };
}

async function runXrkLayers(ui, speed, signal, log) {
  const clear = () => {
    for (const n of [ui.entry, ui.rt, ui.core, ui.extra]) {
      n.classList.remove('is-active', 'is-done', 'is-skip');
    }
    for (const a of [ui.arrow1, ui.arrow2, ui.arrow3]) a.classList.remove('is-on');
  };
  clear();
  log('XRK 三层：入口进 Runtime；业务在 Core；短板才 callSubserver');
  await sleep(speed * 0.4, signal);

  ui.entry.classList.add('is-active');
  ui.status.textContent =
    ui.mode === 'plugin' ? '① 通道收到消息 → Tasker 造 e' : '① 请求打到主服端口 / 路径';
  log('业务不要写进 src/；入口只负责送到舞台');
  await sleep(speed, signal);

  ui.arrow1.classList.add('is-on');
  ui.rt.classList.add('is-active');
  ui.entry.classList.remove('is-active');
  ui.entry.classList.add('is-done');
  ui.status.textContent = '② AgentRuntime：Loader 已挂上的扩展';
  log('裸名 AgentRuntime；配置须等 CommonConfigRegistry.load() 完成');
  await sleep(speed * 1.1, signal);

  ui.arrow2.classList.add('is-on');
  ui.core.classList.add('is-active');
  ui.rt.classList.remove('is-active');
  ui.rt.classList.add('is-done');
  ui.status.textContent =
    ui.mode === 'plugin' ? '③ Core 插件处理业务' : '③ Core http/www 处理业务';
  log('改产品能力：core/<名>-Core/ 对应子目录');
  await sleep(speed * 1.05, signal);

  ui.arrow3.classList.add('is-on');
  if (ui.mode === 'sub') {
    ui.extra.classList.add('is-active');
    ui.core.classList.remove('is-active');
    ui.core.classList.add('is-done');
    ui.status.textContent = '④ 主服 callSubserver → 多语言子进程';
    log('子服不是第二套业务入口；配置仍常在主服编辑');
    await sleep(speed, signal);
    ui.extra.classList.add('is-done');
  } else {
    ui.extra.classList.add('is-skip');
    ui.core.classList.remove('is-active');
    ui.core.classList.add('is-done');
    ui.status.textContent = '④ 本路径不经子服（需要语言生态能力再走）';
    log('禁区：业务不进 src/；独立产品 yaml 不进 config/default_config/');
    await sleep(speed, signal);
  }
}

/** HttpResponse.success 形状：对象拍平 vs 数组进 data */
function httpRespStage(spec) {
  const stage = el('div', 'vibe-algo__hr');
  const mode = String(spec.mode || 'object');
  const before = el('pre', 'vibe-algo__hr-code', {
    text:
      mode === 'array'
        ? 'success(res, [a, b, c])'
        : 'success(res, { assessments, webVersion })',
  });
  const arrow = el('div', 'vibe-algo__hr-arrow', { text: '→' });
  const after = el('pre', 'vibe-algo__hr-code vibe-algo__hr-code--out', {
    text: '…',
  });
  const tip = el('div', 'vibe-algo__hr-tip', { text: '等待变形…' });
  stage.append(before, arrow, after, tip);
  return { stage, before, after, arrow, tip, mode };
}

async function runHttpResp(ui, speed, signal, log) {
  ui.arrow.classList.remove('is-on');
  ui.after.classList.remove('is-done');
  ui.tip.textContent = 'HttpResponse.success（#utils/http-utils.js）';
  log('前端勿默认 return json.data 再读字段');
  await sleep(speed * 0.55, signal);
  ui.arrow.classList.add('is-on');
  await sleep(speed * 0.45, signal);
  if (ui.mode === 'array') {
    ui.after.textContent = '{\n  success: true,\n  message: "…",\n  data: [a, b, c]\n}';
    ui.tip.textContent = '数组 / 标量 / null → 放进 data';
    log('数组成功：顶层有 data；再读 data[i]');
  } else {
    ui.after.textContent =
      '{\n  success: true,\n  message: "…",\n  assessments,\n  webVersion\n}';
    ui.tip.textContent = '普通对象 → 字段拍平到顶层（没有统一 data 包）';
    log('对象成功：去掉 success/message 后直接读字段；写死 json.data.xxx 会取空');
  }
  ui.after.classList.add('is-done');
  await sleep(speed * 1.1, signal);
}

/** 对话管线：三层组装 → 出站压缩 */
function msgPipeStage() {
  const stage = el('div', 'vibe-algo__mp');
  const layers = [
    { id: 'sys', title: 'system', sub: '协议 · Workspace 五段' },
    { id: 'vol', title: '易变 user', sub: '时间 / 群角色' },
    { id: 'his', title: '历史块', sub: '笔录 + 工具痕迹' },
    { id: 'cur', title: '[当前消息]', sub: '本轮用户输入' },
  ].map((L) => {
    const box = el('div', 'vibe-algo__mp-layer');
    box.dataset.id = L.id;
    box.append(
      el('div', 'vibe-algo__mp-title', { text: L.title }),
      el('div', 'vibe-algo__mp-sub', { text: L.sub })
    );
    return box;
  });
  const out = el('div', 'vibe-algo__mp-out', { text: '出站：toolPair → compaction → trim' });
  const status = el('div', 'vibe-algo__mp-status', { text: '等待组装…' });
  for (const L of layers) stage.append(L);
  stage.append(out, status);
  return { stage, layers, out, status };
}

async function runMsgPipe(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.out.classList.remove('is-on');
  log('真源：docs/agent-context.md · assembleChatLlmMessages');
  await sleep(speed * 0.35, signal);
  const labels = [
    '① system：可缓存前缀，勿塞「当前时间」',
    '② 易变 user：时间/会话元数据独立一层',
    '③ 历史：笔录；可 keepFirst 保锚点',
    '④ 当前消息：本轮输入垫底',
  ];
  for (let i = 0; i < ui.layers.length; i++) {
    ui.layers[i].classList.add('is-active');
    ui.status.textContent = labels[i];
    log(labels[i]);
    await sleep(speed, signal);
    ui.layers[i].classList.remove('is-active');
    ui.layers[i].classList.add('is-done');
  }
  ui.out.classList.add('is-on');
  ui.status.textContent = '⑤ prepareOutboundMessages：省窗后再 callAI / 工具环';
  log('toolPair 不改持久历史；compaction 可摘要；contextWindow 裁尾部');
  await sleep(speed * 1.15, signal);
}

/** 老师级：通道造 e → 插件吃 e */
function taskerFlowStage() {
  const stage = el('div', 'vibe-algo__tf');
  const mk = (t, s) => {
    const b = el('div', 'vibe-algo__tf-box');
    b.append(el('div', 'vibe-algo__tf-title', { text: t }), el('div', 'vibe-algo__tf-sub', { text: s }));
    return b;
  };
  const a = mk('平台消息', 'QQ / stdin / OneBot…');
  const b = mk('Tasker', '拆包 → 统一事件 e');
  const c = mk('插件 / 总线', 'plugin 吃 e · events 横切');
  const d = mk('出站', 'e.reply · msgSegment');
  const arrows = [el('div', 'vibe-algo__tf-arrow', { text: '→' }), el('div', 'vibe-algo__tf-arrow', { text: '→' }), el('div', 'vibe-algo__tf-arrow', { text: '→' })];
  const status = el('div', 'vibe-algo__tf-status', { text: '想像：收发室拆快递…' });
  stage.append(a, arrows[0], b, arrows[1], c, arrows[2], d, status);
  return { stage, boxes: [a, b, c, d], arrows, status };
}

async function runTaskerFlow(ui, speed, signal, log) {
  for (const x of ui.boxes) x.classList.remove('is-active', 'is-done');
  for (const a of ui.arrows) a.classList.remove('is-on');
  log('口诀：通道造 e，插件吃 e，Listener 挂横切');
  const tips = [
    '① 平台推来一条消息（本机可用 stdin 假装）',
    '② Tasker 适配层：解协议，造出统一事件 e（含 e.bot）',
    '③ 总线交给 plugin 匹配指令；events 只做横切',
    '④ 回复走 e.reply / msgSegment——别在 Tasker 里写业务文案',
  ];
  for (let i = 0; i < ui.boxes.length; i++) {
    if (i > 0) ui.arrows[i - 1].classList.add('is-on');
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = tips[i];
    log(tips[i]);
    await sleep(speed, signal);
    ui.boxes[i].classList.remove('is-active');
    ui.boxes[i].classList.add('is-done');
  }
  ui.status.textContent = '换 IM 只改 Tasker；改 #指令 去 plugin/';
  await sleep(speed * 0.7, signal);
}

/** 老师级：API Key 门禁 */
function authGateStage(spec) {
  const stage = el('div', 'vibe-algo__ag');
  const req = el('div', 'vibe-algo__ag-box', {});
  req.append(
    el('div', 'vibe-algo__ag-title', { text: '请求 /api/…' }),
    el('div', 'vibe-algo__ag-sub', { text: '可能带 X-API-Key' })
  );
  const gate = el('div', 'vibe-algo__ag-gate', {});
  gate.append(
    el('div', 'vibe-algo__ag-title', { text: 'HttpApi 门禁' }),
    el('div', 'vibe-algo__ag-sub', { text: 'runtime-auth 比对' })
  );
  const out = el('div', 'vibe-algo__ag-box', {});
  out.append(
    el('div', 'vibe-algo__ag-title', { text: '结果' }),
    el('div', 'vibe-algo__ag-sub', { text: '…' })
  );
  const arrow1 = el('div', 'vibe-algo__ag-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__ag-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__ag-status', { text: '门还没敲…' });
  stage.append(req, arrow1, gate, arrow2, out, status);
  return { stage, req, gate, out, arrow1, arrow2, status, mode: String(spec.mode || 'ok') };
}

async function runAuthGate(ui, speed, signal, log) {
  for (const n of [ui.req, ui.gate, ui.out]) n.classList.remove('is-active', 'is-done', 'is-fail', 'is-pass');
  ui.arrow1.classList.remove('is-on');
  ui.arrow2.classList.remove('is-on');
  log('Server 不做全盘 /api 拒答；HttpApi 且 /api/ 时默认校验');
  ui.req.classList.add('is-active');
  ui.status.textContent = '① 请求进站（静态资源常直接放行）';
  await sleep(speed, signal);
  ui.arrow1.classList.add('is-on');
  ui.gate.classList.add('is-active');
  ui.req.classList.remove('is-active');
  ui.req.classList.add('is-done');
  ui.status.textContent = '② 门禁：比对 Key（timingSafeEqual）';
  log('头：X-API-Key 或 Authorization Bearer…');
  await sleep(speed * 1.1, signal);
  ui.arrow2.classList.add('is-on');
  ui.gate.classList.remove('is-active');
  ui.out.classList.add('is-active');
  const sub = ui.out.querySelector('.vibe-algo__ag-sub');
  if (ui.mode === 'fail') {
    ui.gate.classList.add('is-fail');
    ui.out.classList.add('is-fail');
    sub.textContent = '401 Unauthorized';
    ui.status.textContent = '③ Key 错 / 缺 → 401（进不了 handler）';
    log('审 Agent diff：别把 systemAuth 乱关');
  } else if (ui.mode === 'loopback') {
    ui.gate.classList.add('is-pass');
    ui.out.classList.add('is-pass');
    sub.textContent = 'loopback 常免鉴权 → handler';
    ui.status.textContent = '③ 127.0.0.1 常见免鉴权（危险工具开启时也会强制 Key）';
    log('内网 192.168.* 不会自动免鉴权');
  } else {
    ui.gate.classList.add('is-pass');
    ui.out.classList.add('is-pass');
    ui.gate.classList.add('is-done');
    sub.textContent = '通过 → handler';
    ui.status.textContent = '③ Key 对 → 业务 handler（HttpResponse）';
    log('公开接口：路由上显式 systemAuth: false');
  }
  await sleep(speed * 1.1, signal);
  ui.out.classList.add('is-done');
}

/** 老师级：模型 ↔ 工具环 */
function toolLoopStage() {
  const stage = el('div', 'vibe-algo__tl');
  const mk = (t, s) => {
    const b = el('div', 'vibe-algo__tl-box');
    b.append(el('div', 'vibe-algo__tl-title', { text: t }), el('div', 'vibe-algo__tl-sub', { text: s }));
    return b;
  };
  const model = mk('模型', 'Factory 取客户端');
  const call = mk('tool_calls', '想调哪些工具');
  const gate = mk('MCP 门禁', 'handleToolCall');
  const back = mk('回灌结果', '再问模型');
  const status = el('div', 'vibe-algo__tl-status', { text: '工具环还没转…' });
  stage.append(model, call, gate, back, status);
  return { stage, boxes: [model, call, gate, back], status };
}

async function runToolLoop(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done', 'is-block');
  log('口诀：模型提议 ≠ 一定放行；门禁在 handleToolCall');
  const steps = [
    ['① 工作流经 Factory 调模型', 0],
    ['② 模型返回 tool_calls（想动手）', 1],
    ['③ MCP 门禁：策略 / 扫描 / 审批', 2],
    ['④ 结果回灌 messages，再调模型（可多轮）', 3],
  ];
  for (const [tip, i] of steps) {
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = tip;
    log(tip);
    await sleep(speed, signal);
    ui.boxes[i].classList.remove('is-active');
    ui.boxes[i].classList.add('is-done');
  }
  ui.status.textContent = '轮尽可 finalize：再发一轮无工具，把已有结果写成正文';
  log('工厂管「连哪个模型」；MCP 管「工具能不能真执行」');
  await sleep(speed * 0.9, signal);
}

/** 老师级：Redis 热 vs SQLite 盘 */
function dbTierStage() {
  const stage = el('div', 'vibe-algo__db');
  const hot = el('div', 'vibe-algo__db-lane vibe-algo__db-lane--hot');
  hot.append(
    el('div', 'vibe-algo__db-title', { text: 'Redis · 热数据' }),
    el('div', 'vibe-algo__db-sub', { text: '会话 · 计数 · 可过期' }),
    el('div', 'vibe-algo__db-badge', { text: '必需 · fail-fast' })
  );
  const disk = el('div', 'vibe-algo__db-lane vibe-algo__db-lane--disk');
  disk.append(
    el('div', 'vibe-algo__db-title', { text: 'SQLite · 落盘' }),
    el('div', 'vibe-algo__db-sub', { text: '本地持久 · 单机查询' }),
    el('div', 'vibe-algo__db-badge', { text: '必需 · 不替代 Redis' })
  );
  const opt = el('div', 'vibe-algo__db-opt', { text: '可选：Mongo / Postgres / Vector → 独立 Core' });
  const status = el('div', 'vibe-algo__db-status', { text: '启动先 ensure-redis…' });
  stage.append(hot, disk, opt, status);
  return { stage, hot, disk, opt, status };
}

async function runDbTier(ui, speed, signal, log) {
  ui.hot.classList.remove('is-active', 'is-done');
  ui.disk.classList.remove('is-active', 'is-done');
  ui.opt.classList.remove('is-on');
  log('真源 docs/database.md：跨引擎仅最终一致，无统一事务');
  ui.status.textContent = '① 启动探测 Redis——挂了就 fail-fast';
  ui.hot.classList.add('is-active');
  await sleep(speed, signal);
  ui.hot.classList.add('is-done');
  ui.status.textContent = '② 再挂 SQLite 全局——重启后还要的本地数据';
  ui.disk.classList.add('is-active');
  log('裸名 redis / sqlite；业务勿 import 再造实例');
  await sleep(speed, signal);
  ui.disk.classList.add('is-done');
  ui.opt.classList.add('is-on');
  ui.status.textContent = '③ 业务库走可选 Core；别把「会装 MySQL」说成本仓必需';
  await sleep(speed * 0.95, signal);
}

/** 老师级：SQL CRUD 四句 + WHERE 红线 */
function sqlCrudStage(spec) {
  const stage = el('div', 'vibe-algo__sql');
  const ops = (Array.isArray(spec.ops) ? spec.ops : []).map((o) => {
    const b = el('div', 'vibe-algo__sql-box');
    b.dataset.op = String(o.id || '');
    b.append(
      el('div', 'vibe-algo__sql-name', { text: String(o.name || '?') }),
      el('div', 'vibe-algo__sql-sub', { text: String(o.sub || '') })
    );
    return b;
  });
  const warn = el('div', 'vibe-algo__sql-warn', {
    text: 'UPDATE / DELETE 无 WHERE = 可能动全表',
  });
  const badge = el('div', 'vibe-algo__sql-badge', {
    text: '值用占位符绑定；勿拼接用户输入（注入）',
  });
  const status = el('div', 'vibe-algo__sql-status', { text: 'CRUD…' });
  const row = el('div', 'vibe-algo__sql-row');
  row.append(...ops);
  stage.append(row, warn, badge, status);
  return { stage, ops, warn, badge, status };
}

async function runSqlCrud(ui, speed, signal, log) {
  for (const b of ui.ops) b.classList.remove('is-active', 'is-done', 'is-danger');
  ui.warn.classList.remove('is-on');
  ui.badge.classList.remove('is-on');
  log('关系表：SELECT 读 · INSERT 增 · UPDATE/DELETE 改删必带 WHERE');
  const tips = [
    '① SELECT：读行；可加 WHERE / ORDER BY / LIMIT',
    '② INSERT：增行',
    '③ UPDATE：改行 —— 无 WHERE 极危',
    '④ DELETE：删行 —— 无 WHERE 极危',
  ];
  for (let i = 0; i < ui.ops.length; i++) {
    const danger = ui.ops[i].dataset.op === 'u' || ui.ops[i].dataset.op === 'd';
    ui.ops[i].classList.add(danger ? 'is-danger' : 'is-active');
    if (danger) ui.warn.classList.add('is-on');
    ui.status.textContent = tips[i] || '';
    log(tips[i] || '');
    await sleep(speed, signal);
    ui.ops[i].classList.remove('is-active', 'is-danger');
    ui.ops[i].classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓落盘常见 SQLite；热缓存仍是 Redis（见 dbtier / 第四章）';
  await sleep(speed * 0.8, signal);
}

/** 老师级：C/S 服务 vs 嵌入式文件库 */
function dbServeStage() {
  const stage = el('div', 'vibe-algo__dbs');
  const cs = el('div', 'vibe-algo__dbs-lane vibe-algo__dbs-lane--cs');
  cs.append(
    el('div', 'vibe-algo__dbs-title', { text: 'C/S 服务' }),
    el('div', 'vibe-algo__dbs-flow', { text: 'App → TCP 端口 → DBMS 进程 → 存储' }),
    el('div', 'vibe-algo__dbs-ex', { text: 'Redis · PG · MySQL · Mongo' })
  );
  const emb = el('div', 'vibe-algo__dbs-lane vibe-algo__dbs-lane--emb');
  emb.append(
    el('div', 'vibe-algo__dbs-title', { text: '嵌入式' }),
    el('div', 'vibe-algo__dbs-flow', { text: 'App 进程内链库 → 读写 *.sqlite' }),
    el('div', 'vibe-algo__dbs-ex', { text: 'SQLite（重要例外）' })
  );
  const badge = el('div', 'vibe-algo__dbs-badge', {
    text: '两者都是 DBMS；差别在部署形态，不是「谁更像数据库」',
  });
  const status = el('div', 'vibe-algo__dbs-status', { text: '形态对照…' });
  stage.append(cs, emb, badge, status);
  return { stage, cs, emb, badge, status };
}

async function runDbServe(ui, speed, signal, log) {
  ui.cs.classList.remove('is-active', 'is-done');
  ui.emb.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('生产多数：独立服务 + 连接串；SQLite：无默认监听端口');
  ui.cs.classList.add('is-active');
  ui.status.textContent = '① C/S：装服务 → 听端口 → 客户端驱动连上';
  await sleep(speed, signal);
  ui.cs.classList.replace('is-active', 'is-done');
  ui.emb.classList.add('is-active');
  ui.status.textContent = '② 嵌入：库代码在应用内；备份要含库文件';
  await sleep(speed, signal);
  ui.emb.classList.replace('is-active', 'is-done');
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：Redis=C/S 热路径；SQLite=嵌入落盘；勿互相替代职责';
  await sleep(speed * 0.85, signal);
}

/** 老师级：容器 vs 虚拟机（共享内核） */
function ctrVmStage() {
  const stage = el('div', 'vibe-algo__ctr');
  const host = el('div', 'vibe-algo__ctr-host', { text: '宿主机硬件' });
  const row = el('div', 'vibe-algo__ctr-row');
  const vm = el('div', 'vibe-algo__ctr-lane vibe-algo__ctr-lane--vm');
  vm.append(
    el('div', 'vibe-algo__ctr-title', { text: '虚拟机 VM' }),
    el('div', 'vibe-algo__ctr-stack', { text: 'App → Guest OS（自带内核）→ Hypervisor' }),
    el('div', 'vibe-algo__ctr-note', { text: '更重 · 整机隔离' })
  );
  const ct = el('div', 'vibe-algo__ctr-lane vibe-algo__ctr-lane--ct');
  ct.append(
    el('div', 'vibe-algo__ctr-title', { text: '容器 Container' }),
    el('div', 'vibe-algo__ctr-stack', { text: 'App → 隔离进程（namespace/cgroup）' }),
    el('div', 'vibe-algo__ctr-note', { text: '共享宿主机内核 · 更轻' })
  );
  row.append(vm, ct);
  const badge = el('div', 'vibe-algo__ctr-badge', {
    text: '云上常：VM 里再跑容器运行时（两者可并存）',
  });
  const status = el('div', 'vibe-algo__ctr-status', { text: '对照…' });
  stage.append(host, row, badge, status);
  return { stage, host, vm, ct, badge, status };
}

async function runCtrVm(ui, speed, signal, log) {
  ui.vm.classList.remove('is-active', 'is-done');
  ui.ct.classList.remove('is-active', 'is-done');
  ui.host.classList.remove('is-on');
  ui.badge.classList.remove('is-on');
  log('真源：Docker Docs — container 是隔离进程；VM 常带客户机内核');
  ui.host.classList.add('is-on');
  ui.status.textContent = '① 底层都是宿主机硬件';
  await sleep(speed * 0.75, signal);
  ui.vm.classList.add('is-active');
  ui.status.textContent = '② VM：客户机自带内核 + Hypervisor —— 更「整机」';
  log('VM 重量：整套 Guest OS');
  await sleep(speed, signal);
  ui.vm.classList.replace('is-active', 'is-done');
  ui.ct.classList.add('is-active');
  ui.status.textContent = '③ 容器：共享宿主机内核；用 namespace/cgroup 隔离';
  log('容器轻量：不另起一套内核');
  await sleep(speed, signal);
  ui.ct.classList.replace('is-active', 'is-done');
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓直觉：容器常起 Redis；主服仍可宿主机 Node';
  await sleep(speed * 0.85, signal);
}

/** 老师级：镜像层叠 + 容器可写层（OCI / Docker layers） */
function imgLayerStage(spec) {
  const stage = el('div', 'vibe-algo__iml');
  const layers = (Array.isArray(spec.layers) ? spec.layers : []).map((L) => {
    const b = el('div', 'vibe-algo__iml-layer');
    if (L.id === 'rw') b.classList.add('vibe-algo__iml-layer--rw');
    b.dataset.id = String(L.id || '');
    b.append(
      el('div', 'vibe-algo__iml-name', { text: String(L.name || '?') }),
      el('div', 'vibe-algo__iml-sub', { text: String(L.sub || '') })
    );
    return b;
  });
  const stack = el('div', 'vibe-algo__iml-stack');
  for (const L of layers) stack.append(L);
  const badge = el('div', 'vibe-algo__iml-badge', {
    text: '镜像层只读不可变；多容器可共享同一镜像栈（CoW）',
  });
  const status = el('div', 'vibe-algo__iml-status', { text: '叠层…' });
  stage.append(stack, badge, status);
  return { stage, layers, badge, status };
}

async function runImgLayer(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done', 'is-pulse');
  ui.badge.classList.remove('is-on');
  log('真源：Docker Docs / OCI — image = 有序层叠；容器再加可写层');
  for (let i = 0; i < ui.layers.length; i++) {
    const L = ui.layers[i];
    const rw = L.dataset.id === 'rw';
    L.classList.add(rw ? 'is-pulse' : 'is-active');
    ui.status.textContent = rw
      ? '④ 启动容器：顶部可写层 —— 删容器即丢（持久化靠卷）'
      : `①–③ 只读镜像层叠合（union / overlay）`;
    log(rw ? '可写层 ≠ 镜像；数据要 volumes' : `层 ${i + 1}: ${L.querySelector('.vibe-algo__iml-name')?.textContent}`);
    await sleep(speed, signal);
    L.classList.remove('is-active', 'is-pulse');
    L.classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：redis 镜像可多实例；主服 Node 不必塞进同一镜像';
  await sleep(speed * 0.8, signal);
}

/** 老师级：Compose 一文件起多服务 */
function composeStackStage(spec) {
  const stage = el('div', 'vibe-algo__cmp');
  const file = el('div', 'vibe-algo__cmp-file', { text: 'compose.yaml' });
  const svcs = (Array.isArray(spec.services) ? spec.services : []).map((s) => {
    const b = el('div', 'vibe-algo__cmp-svc');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__cmp-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__cmp-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__cmp-row');
  row.append(...svcs);
  const net = el('div', 'vibe-algo__cmp-net', { text: 'Docker 网络 · 服务名互访' });
  const vol = el('div', 'vibe-algo__cmp-vol', { text: 'volumes · 删容器不丢数据' });
  const badge = el('div', 'vibe-algo__cmp-badge', {
    text: 'depends_on ≈ 启动顺序提示 ≠ 健康就绪；Compose ≠ Kubernetes',
  });
  const status = el('div', 'vibe-algo__cmp-status', { text: 'docker compose up…' });
  stage.append(file, row, net, vol, badge, status);
  return { stage, file, svcs, net, vol, badge, status };
}

async function runComposeStack(ui, speed, signal, log) {
  for (const s of ui.svcs) s.classList.remove('is-active', 'is-done');
  ui.file.classList.remove('is-on');
  ui.net.classList.remove('is-on');
  ui.vol.classList.remove('is-on');
  ui.badge.classList.remove('is-on');
  log('真源：Compose Spec — services / networks / volumes 一文件声明');
  ui.file.classList.add('is-on');
  ui.status.textContent = '① 读 compose.yaml（或 docker-compose.yml）';
  await sleep(speed * 0.75, signal);
  for (let i = 0; i < ui.svcs.length; i++) {
    ui.svcs[i].classList.add('is-active');
    ui.status.textContent = `② 拉起服务：${ui.svcs[i].querySelector('.vibe-algo__cmp-name')?.textContent}`;
    log(`up → ${ui.svcs[i].dataset.id}`);
    await sleep(speed * 0.9, signal);
    ui.svcs[i].classList.replace('is-active', 'is-done');
  }
  ui.net.classList.add('is-on');
  ui.status.textContent = '③ 同网络：可用服务名连（如 redis:6379）';
  await sleep(speed * 0.75, signal);
  ui.vol.classList.add('is-on');
  ui.status.textContent = '④ 卷挂载：中间件数据要持久化';
  await sleep(speed * 0.75, signal);
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：pnpm docker:up · docs/docker.md；主服可宿主机 Node';
  await sleep(speed * 0.85, signal);
}

/** 老师级：容器生态分层（引擎 / Compose / K8s / systemd） */
function opsTierStage(spec) {
  const stage = el('div', 'vibe-algo__opt');
  const tiers = (Array.isArray(spec.tiers) ? spec.tiers : []).map((t) => {
    const b = el('div', 'vibe-algo__opt-tier');
    b.dataset.id = String(t.id || '');
    b.append(
      el('div', 'vibe-algo__opt-name', { text: String(t.name || '?') }),
      el('div', 'vibe-algo__opt-sub', { text: String(t.sub || '') })
    );
    return b;
  });
  const badge = el('div', 'vibe-algo__opt-badge', {
    text: '会写 Dockerfile ≠ 会运维 K8s；网关（Nginx）另在第三章',
  });
  const status = el('div', 'vibe-algo__opt-status', { text: '分层…' });
  for (const t of tiers) stage.append(t);
  stage.append(badge, status);
  return { stage, tiers, badge, status };
}

async function runOpsTier(ui, speed, signal, log) {
  for (const t of ui.tiers) t.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('面试口诀：引擎跑容器 · Compose 管本机一套 · K8s 管集群 · systemd 管宿主机进程');
  const tips = [
    '① 引擎层：Docker / Podman / containerd',
    '② 本机编排：Compose（开发栈）',
    '③ 集群：Kubernetes（多机调度）',
    '④ 宿主机保活：systemd / 面板 — 不是容器编排',
  ];
  for (let i = 0; i < ui.tiers.length; i++) {
    ui.tiers[i].classList.add('is-active');
    ui.status.textContent = tips[i] || '';
    log(tips[i] || '');
    await sleep(speed, signal);
    ui.tiers[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓最小：宿主机 Node +（可选）Docker Redis；先别上 K8s';
  await sleep(speed * 0.85, signal);
}

/** 老师级：跨系统目录角色（先角色后路径） */
function dirRoleStage(spec) {
  const stage = el('div', 'vibe-algo__dir');
  const roles = (Array.isArray(spec.roles) ? spec.roles : []).map((r) => {
    const b = el('div', 'vibe-algo__dir-role');
    b.dataset.id = String(r.id || '');
    b.append(
      el('div', 'vibe-algo__dir-name', { text: String(r.name || '?') }),
      el('div', 'vibe-algo__dir-sub', { text: String(r.sub || '') })
    );
    return b;
  });
  const grid = el('div', 'vibe-algo__dir-grid');
  grid.append(...roles);
  const badge = el('div', 'vibe-algo__dir-badge', {
    text: '换系统只换写法：Users ↔ /home ↔ /Users；问题仍是「家 / bin / 配置」',
  });
  const status = el('div', 'vibe-algo__dir-status', { text: '先问角色…' });
  stage.append(grid, badge, status);
  return { stage, roles, badge, status };
}

async function runDirRole(ui, speed, signal, log) {
  for (const r of ui.roles) r.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('真源：FHS（系统树职责）+ 跨平台同一套地盘分工');
  const tips = [
    '① 家目录：属于「我」的地盘（USERPROFILE / HOME / ~）',
    '② bin：Shell 按 PATH 找可执行文件的地方',
    '③ 用户配置/缓存：AppData · ~/.config · ~/.cache（XDG）',
    '④ 临时区：可丢；别当永久盘',
    '⑤ 程序安装：Program Files · /usr · /opt · /Applications',
  ];
  for (let i = 0; i < ui.roles.length; i++) {
    ui.roles[i].classList.add('is-active');
    ui.status.textContent = tips[i] || '';
    log(tips[i] || '');
    await sleep(speed * 0.9, signal);
    ui.roles[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：站对仓库根（pwd）；配置在 Core default/ 与 data/，勿乱扔系统盘根';
  await sleep(speed * 0.85, signal);
}

/** 老师级：点文件隐藏 vs Windows Hidden；再揭示常见点名 */
function dotHideStage(spec) {
  const stage = el('div', 'vibe-algo__dot');
  const row = el('div', 'vibe-algo__dot-row');
  const unix = el('div', 'vibe-algo__dot-lane vibe-algo__dot-lane--unix');
  unix.append(
    el('div', 'vibe-algo__dot-title', { text: 'Unix / Git Bash' }),
    el('div', 'vibe-algo__dot-mech', { text: '文件名以 . 开头 → ls 默认隐藏' }),
    el('div', 'vibe-algo__dot-see', { text: '看见：ls -la' })
  );
  const win = el('div', 'vibe-algo__dot-lane vibe-algo__dot-lane--win');
  win.append(
    el('div', 'vibe-algo__dot-title', { text: 'Windows 资源管理器' }),
    el('div', 'vibe-algo__dot-mech', { text: 'Hidden 属性 / 隐藏文件夹' }),
    el('div', 'vibe-algo__dot-see', { text: '看见：隐藏的项目 · -Force' })
  );
  row.append(unix, win);
  const dots = (Array.isArray(spec.dots) ? spec.dots : []).map((d) => {
    const b = el('div', 'vibe-algo__dot-chip');
    b.dataset.id = String(d.id || '');
    b.append(
      el('div', 'vibe-algo__dot-chip-name', { text: String(d.name || '?') }),
      el('div', 'vibe-algo__dot-chip-sub', { text: String(d.sub || '') })
    );
    return b;
  });
  const tray = el('div', 'vibe-algo__dot-tray');
  tray.append(...dots);
  const badge = el('div', 'vibe-algo__dot-badge', {
    text: '隐藏 ≠ 加密；.env / 私钥必须 gitignore',
  });
  const status = el('div', 'vibe-algo__dot-status', { text: '可见性…' });
  stage.append(row, tray, badge, status);
  return { stage, unix, win, dots, badge, status };
}

async function runDotHide(ui, speed, signal, log) {
  ui.unix.classList.remove('is-active', 'is-done');
  ui.win.classList.remove('is-active', 'is-done');
  for (const d of ui.dots) d.classList.remove('is-active', 'is-done', 'is-warn');
  ui.badge.classList.remove('is-on');
  log('真源：FHS 提到 home 下 dot file；XDG 把配置迁到 ~/.config 等');
  ui.unix.classList.add('is-active');
  ui.status.textContent = '① Unix：点前缀是命名约定，不是特殊二进制格式';
  await sleep(speed, signal);
  ui.unix.classList.replace('is-active', 'is-done');
  ui.win.classList.add('is-active');
  ui.status.textContent = '② Windows：另一套开关（属性）；AppData 也常被界面藏起';
  await sleep(speed, signal);
  ui.win.classList.replace('is-active', 'is-done');
  for (const d of ui.dots) {
    const warn = d.dataset.id === 'env' || d.dataset.id === 'ssh';
    d.classList.add(warn ? 'is-warn' : 'is-active');
    ui.status.textContent = `③ 常见点名：${d.querySelector('.vibe-algo__dot-chip-name')?.textContent}`;
    log(d.querySelector('.vibe-algo__dot-chip-name')?.textContent || '');
    await sleep(speed * 0.75, signal);
    d.classList.remove('is-active', 'is-warn');
    d.classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：密钥走本机/环境变量；项目规则可在 .cursor，机密仍勿提交';
  await sleep(speed * 0.85, signal);
}

/** 老师级：MCU vs PC（资源与交付模型） */
function mcuVsPcStage() {
  const stage = el('div', 'vibe-algo__mcu');
  const row = el('div', 'vibe-algo__mcu-row');
  const mcu = el('div', 'vibe-algo__mcu-lane vibe-algo__mcu-lane--mcu');
  mcu.append(
    el('div', 'vibe-algo__mcu-title', { text: 'MCU / 单片机' }),
    el('div', 'vibe-algo__mcu-stack', { text: 'CPU+外设一体 · KB～MB · 固件烧录' }),
    el('div', 'vibe-algo__mcu-note', { text: '读传感 · 控脚 · 可联网上报' })
  );
  const pc = el('div', 'vibe-algo__mcu-lane vibe-algo__mcu-lane--pc');
  pc.append(
    el('div', 'vibe-algo__mcu-title', { text: 'PC / 云主机' }),
    el('div', 'vibe-algo__mcu-stack', { text: 'GB～TB · 完整 OS · 进程执行' }),
    el('div', 'vibe-algo__mcu-note', { text: '浏览器 · DB · AgentRuntime' })
  );
  row.append(mcu, pc);
  const badge = el('div', 'vibe-algo__mcu-badge', {
    text: '别把 Docker / pnpm / Node 主服思维硬套板子',
  });
  const status = el('div', 'vibe-algo__mcu-status', { text: '对照…' });
  stage.append(row, badge, status);
  return { stage, mcu, pc, badge, status };
}

async function runMcuVsPc(ui, speed, signal, log) {
  ui.mcu.classList.remove('is-active', 'is-done');
  ui.pc.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('MCU = 微控制器：算力与外设一体；交付是固件，不是装运行时');
  ui.pc.classList.add('is-active');
  ui.status.textContent = '① PC/云：改代码 → 重启进程（node app）';
  await sleep(speed, signal);
  ui.pc.classList.replace('is-active', 'is-done');
  ui.mcu.classList.add('is-active');
  ui.status.textContent = '② MCU：交叉编译 → 烧 Flash → 复位才跑新逻辑';
  await sleep(speed, signal);
  ui.mcu.classList.replace('is-active', 'is-done');
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓主服在 Node；ESP32 是另一台边缘设备';
  await sleep(speed * 0.85, signal);
}

/** 老师级：ESP32 开发板分层（线→板→SoC→无线/IO） */
function espBoardStage(spec) {
  const stage = el('div', 'vibe-algo__esp');
  const layers = (Array.isArray(spec.layers) ? spec.layers : []).map((L) => {
    const b = el('div', 'vibe-algo__esp-layer');
    b.dataset.id = String(L.id || '');
    b.append(
      el('div', 'vibe-algo__esp-name', { text: String(L.name || '?') }),
      el('div', 'vibe-algo__esp-sub', { text: String(L.sub || '') })
    );
    return b;
  });
  const stack = el('div', 'vibe-algo__esp-stack');
  for (const L of layers) stack.append(L);
  const badge = el('div', 'vibe-algo__esp-badge', {
    text: '口语「一块 ESP32」多半是开发板；≠ 裸片，更 ≠ 小服务器',
  });
  const status = el('div', 'vibe-algo__esp-status', { text: '拆开看…' });
  stage.append(stack, badge, status);
  return { stage, layers, badge, status };
}

async function runEspBoard(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('真源：Espressif SoC 家族；开发板带 USB-UART 桥接芯片');
  const tips = [
    '① USB：供电 + 虚拟串口（需驱动时装 CP210x/CH340/FTDI）',
    '② 开发板：转串口、天线、排针、电源管理',
    '③ SoC/模组：算力 + Wi-Fi/BT（型号有差）+ 外设',
    '④ 对外：联网上报 · GPIO 采控',
  ];
  for (let i = 0; i < ui.layers.length; i++) {
    ui.layers[i].classList.add('is-active');
    ui.status.textContent = tips[i] || '';
    log(tips[i] || '');
    await sleep(speed, signal);
    ui.layers[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '主服仍在 PC/云；板子是边缘节点';
  await sleep(speed * 0.8, signal);
}

/** 老师级：交叉编译 → 烧录 → monitor（ESP-IDF 口径） */
function flashPipeStage(spec) {
  const stage = el('div', 'vibe-algo__flp');
  const steps = (Array.isArray(spec.steps) ? spec.steps : []).map((s) => {
    const b = el('div', 'vibe-algo__flp-step');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__flp-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__flp-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__flp-row');
  row.append(...steps);
  const badge = el('div', 'vibe-algo__flp-badge', {
    text: '官方：idf.py -p PORT flash monitor（可合并一步）',
  });
  const status = el('div', 'vibe-algo__flp-status', { text: '烧录链…' });
  stage.append(row, badge, status);
  return { stage, steps, badge, status };
}

async function runFlashPipe(ui, speed, signal, log) {
  for (const s of ui.steps) s.classList.remove('is-active', 'is-done', 'is-hot');
  ui.badge.classList.remove('is-on');
  log('真源：ESP-IDF Programming Guide — build / flash / monitor');
  for (let i = 0; i < ui.steps.length; i++) {
    const hot = ui.steps[i].dataset.id === 'flash';
    ui.steps[i].classList.add(hot ? 'is-hot' : 'is-active');
    ui.status.textContent = `①–⑤ ${ui.steps[i].querySelector('.vibe-algo__flp-name')?.textContent}`;
    log(ui.steps[i].querySelector('.vibe-algo__flp-name')?.textContent || '');
    await sleep(speed * 0.85, signal);
    ui.steps[i].classList.remove('is-active', 'is-hot');
    ui.steps[i].classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '失败先查：线、口、驱动、BOOT、权限——不是改 pnpm';
  await sleep(speed * 0.85, signal);
}

/** 老师级：边缘设备 ↔ 协议 ↔ 云侧 Agent */
function edgeLinkStage(spec) {
  const stage = el('div', 'vibe-algo__edg');
  const hops = (Array.isArray(spec.hops) ? spec.hops : []).map((h) => {
    const b = el('div', 'vibe-algo__edg-hop');
    b.dataset.id = String(h.id || '');
    b.append(
      el('div', 'vibe-algo__edg-name', { text: String(h.name || '?') }),
      el('div', 'vibe-algo__edg-sub', { text: String(h.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__edg-row');
  for (let i = 0; i < hops.length; i++) {
    row.append(hops[i]);
    if (i < hops.length - 1) row.append(el('div', 'vibe-algo__edg-arrow', { text: '→' }));
  }
  const badge = el('div', 'vibe-algo__edg-badge', {
    text: '两进程世界经网络协作；禁止「把 AgentRuntime 塞进 Flash」',
  });
  const status = el('div', 'vibe-algo__edg-status', { text: '接线…' });
  stage.append(row, badge, status);
  return { stage, hops, badge, status };
}

async function runEdgeLink(ui, speed, signal, log) {
  for (const h of ui.hops) h.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('设备侧采控；云侧鉴权/推理/落库；先通一条 HTTP 或 MQTT');
  for (let i = 0; i < ui.hops.length; i++) {
    ui.hops[i].classList.add('is-active');
    ui.status.textContent = `分层 ${i + 1}/${ui.hops.length}`;
    log(ui.hops[i].querySelector('.vibe-algo__edg-name')?.textContent || '');
    await sleep(speed * 0.9, signal);
    ui.hops[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：HTTP Core / 鉴权；设备离线是业务态，不是 Runtime fail-fast';
  await sleep(speed * 0.85, signal);
}

/** 老师级：调试环 — 复现 → 探针 → 单点假设 → 回归 */
function debugLoopStage(spec) {
  const stage = el('div', 'vibe-algo__dbg');
  const steps = (Array.isArray(spec.steps) ? spec.steps : []).map((s) => {
    const b = el('div', 'vibe-algo__dbg-step');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__dbg-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__dbg-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__dbg-row');
  row.append(...steps);
  const badge = el('div', 'vibe-algo__dbg-badge', {
    text: '给 Agent：复现步骤 + 堆栈原文 + 已尝试；别只说「坏了」',
  });
  const status = el('div', 'vibe-algo__dbg-status', { text: '调试环…' });
  stage.append(row, badge, status);
  return { stage, steps, badge, status };
}

async function runDebugLoop(ui, speed, signal, log) {
  for (const s of ui.steps) s.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('制造可见性：先复现，再探针，一次验证一个假设');
  for (let i = 0; i < ui.steps.length; i++) {
    ui.steps[i].classList.add('is-active');
    ui.status.textContent = `${i + 1}/${ui.steps.length} ${ui.steps[i].querySelector('.vibe-algo__dbg-name')?.textContent}`;
    log(ui.steps[i].querySelector('.vibe-algo__dbg-name')?.textContent || '');
    await sleep(speed * 0.9, signal);
    ui.steps[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：HttpResponse.error / normalizeError；勿吞异常只 console.log';
  await sleep(speed * 0.8, signal);
}

/** 老师级：开发者安全底线（密钥 · 注入 · 鉴权 · 审 diff） */
function secBaseStage(spec) {
  const stage = el('div', 'vibe-algo__scb');
  const items = (Array.isArray(spec.items) ? spec.items : []).map((it) => {
    const b = el('div', 'vibe-algo__scb-item');
    b.dataset.id = String(it.id || '');
    b.append(
      el('div', 'vibe-algo__scb-name', { text: String(it.name || '?') }),
      el('div', 'vibe-algo__scb-sub', { text: String(it.sub || '') })
    );
    return b;
  });
  const grid = el('div', 'vibe-algo__scb-grid');
  grid.append(...items);
  const badge = el('div', 'vibe-algo__scb-badge', {
    text: '对照 OWASP Top 10：注入 / 访问控制 / 加密失败… 你守门审 Agent diff',
  });
  const status = el('div', 'vibe-algo__scb-status', { text: '底线…' });
  stage.append(grid, badge, status);
  return { stage, items, badge, status };
}

async function runSecBase(ui, speed, signal, log) {
  for (const it of ui.items) it.classList.remove('is-active', 'is-done', 'is-warn');
  ui.badge.classList.remove('is-on');
  log('真源：OWASP Top 10 · Injection Prevention Cheat Sheet');
  for (const it of ui.items) {
    const warn = it.dataset.id === 'secret' || it.dataset.id === 'inject';
    it.classList.add(warn ? 'is-warn' : 'is-active');
    ui.status.textContent = it.querySelector('.vibe-algo__scb-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed * 0.85, signal);
    it.classList.remove('is-active', 'is-warn');
    it.classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '泄漏了 Key？先轮换吊销——删提交不能替代';
  await sleep(speed * 0.85, signal);
}

/** 老师级：测试金字塔（Google SWE 比例直觉） */
function testPyraStage(spec) {
  const stage = el('div', 'vibe-algo__pyr');
  const tiers = (Array.isArray(spec.tiers) ? spec.tiers : []).map((t) => {
    const b = el('div', 'vibe-algo__pyr-tier');
    b.dataset.id = String(t.id || '');
    b.append(
      el('div', 'vibe-algo__pyr-name', { text: String(t.name || '?') }),
      el('div', 'vibe-algo__pyr-sub', { text: String(t.sub || '') })
    );
    return b;
  });
  const stack = el('div', 'vibe-algo__pyr-stack');
  // visual pyramid: e2e on top in DOM order first if we use column-reverse... keep unit at bottom via column-reverse
  for (const t of tiers) stack.append(t);
  const badge = el('div', 'vibe-algo__pyr-badge', {
    text: 'Google SWE 粗比例：窄单测为主；E2E 少而精，别当主防线',
  });
  const status = el('div', 'vibe-algo__pyr-status', { text: '金字塔…' });
  stage.append(stack, badge, status);
  return { stage, tiers, badge, status };
}

async function runTestPyra(ui, speed, signal, log) {
  for (const t of ui.tiers) t.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('真源：Software Engineering at Google — 测试范围与规模');
  // light from base (unit) to tip: reverse iterate if unit is index 0
  for (let i = 0; i < ui.tiers.length; i++) {
    ui.tiers[i].classList.add('is-active');
    ui.status.textContent = ui.tiers[i].querySelector('.vibe-algo__pyr-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    ui.tiers[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：纯工具函数先测；CI 用 pnpm 跑同一套命令';
  await sleep(speed * 0.8, signal);
}

/** 老师级：可观测三支柱 + 金信号提示 */
function obsPillarStage(spec) {
  const stage = el('div', 'vibe-algo__obs');
  const pillars = (Array.isArray(spec.pillars) ? spec.pillars : []).map((p) => {
    const b = el('div', 'vibe-algo__obs-pillar');
    b.dataset.id = String(p.id || '');
    b.append(
      el('div', 'vibe-algo__obs-name', { text: String(p.name || '?') }),
      el('div', 'vibe-algo__obs-sub', { text: String(p.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__obs-row');
  row.append(...pillars);
  const gold = el('div', 'vibe-algo__obs-gold', {
    text: 'SRE 四大金信号：Latency · Traffic · Errors · Saturation',
  });
  const badge = el('div', 'vibe-algo__obs-badge', {
    text: '结构化 + requestId + 脱敏；观测 ≠ 本地单点调试全过程',
  });
  const status = el('div', 'vibe-algo__obs-status', { text: '三支柱…' });
  stage.append(row, gold, badge, status);
  return { stage, pillars, gold, badge, status };
}

async function runObsPillar(ui, speed, signal, log) {
  for (const p of ui.pillars) p.classList.remove('is-active', 'is-done');
  ui.gold.classList.remove('is-on');
  ui.badge.classList.remove('is-on');
  log('真源：Google SRE — Monitoring Distributed Systems（金信号）');
  for (const p of ui.pillars) {
    p.classList.add('is-active');
    ui.status.textContent = p.querySelector('.vibe-algo__obs-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    p.classList.replace('is-active', 'is-done');
  }
  ui.gold.classList.add('is-on');
  ui.status.textContent = '指标优先看延迟 / 流量 / 错误 / 饱和';
  await sleep(speed * 0.75, signal);
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：HttpResponse.error 统一形状；生产少打 debug';
  await sleep(speed * 0.8, signal);
}

/** 老师级：CI 流水线绿/红 */
function ciPipeStage(spec) {
  const stage = el('div', 'vibe-algo__cip');
  const steps = (Array.isArray(spec.steps) ? spec.steps : []).map((s) => {
    const b = el('div', 'vibe-algo__cip-step');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__cip-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__cip-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__cip-row');
  row.append(...steps);
  const result = el('div', 'vibe-algo__cip-result', { text: '等待检查…' });
  const badge = el('div', 'vibe-algo__cip-badge', {
    text: 'Secrets 不进 YAML；红叉先读 Job 日志，本机复现同一命令',
  });
  const status = el('div', 'vibe-algo__cip-status', { text: 'CI…' });
  stage.append(row, result, badge, status);
  return { stage, steps, result, badge, status };
}

async function runCiPipe(ui, speed, signal, log) {
  for (const s of ui.steps) s.classList.remove('is-active', 'is-done', 'is-fail');
  ui.result.classList.remove('is-green', 'is-red');
  ui.badge.classList.remove('is-on');
  ui.result.textContent = '推送 / PR 触发 Runner…';
  log('真源：pnpm Continuous Integration · frozen-lockfile');
  for (let i = 0; i < ui.steps.length; i++) {
    ui.steps[i].classList.add('is-active');
    ui.status.textContent = ui.steps[i].querySelector('.vibe-algo__cip-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed * 0.8, signal);
    ui.steps[i].classList.replace('is-active', 'is-done');
  }
  ui.result.classList.add('is-green');
  ui.result.textContent = '✓ 全绿：可审合并（仍要人审 diff）';
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：Node ≥ 26 · pnpm · 锁文件冻结；密钥用 secrets.XXX';
  await sleep(speed * 0.9, signal);
}

/** 老师级：办事工作区五段注入 */
function wsFiveStage() {
  const stage = el('div', 'vibe-algo__ws');
  const names = [
    ['assistant', 'AGENTS / SOUL / memory…'],
    ['contextFiles', '额外上下文文件'],
    ['rules', '共享护栏 ∪ 工作区覆盖'],
    ['Skills', '目录卡 · 按需 tools.read'],
    ['Agents', 'subagents 提示路由'],
  ];
  const layers = names.map(([t, s]) => {
    const b = el('div', 'vibe-algo__ws-layer');
    b.append(el('div', 'vibe-algo__ws-title', { text: t }), el('div', 'vibe-algo__ws-sub', { text: s }));
    return b;
  });
  const badge = el('div', 'vibe-algo__ws-badge', { text: '两张工牌：根 AGENTS（写代码）≠ 工作区 AGENTS（办事）' });
  const status = el('div', 'vibe-algo__ws-status', { text: '五段还没叠进 system…' });
  for (const L of layers) stage.append(L);
  stage.append(badge, status);
  return { stage, layers, badge, status };
}

async function runWsFive(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('种子 agents/ → 运行时 data/ai-workspace/{id}/');
  for (let i = 0; i < ui.layers.length; i++) {
    ui.layers[i].classList.add('is-active');
    ui.status.textContent = `①–⑤ 叠进 system：第 ${i + 1} 段`;
    log(`注入第 ${i + 1} 段：${ui.layers[i].querySelector('.vibe-algo__ws-title').textContent}`);
    await sleep(speed * 0.85, signal);
    ui.layers[i].classList.remove('is-active');
    ui.layers[i].classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '戴错工牌：要么改坏 Runtime，要么办事助手不懂放码';
  await sleep(speed * 0.9, signal);
}

/** 老师级：前端状态 → 调度 → 虚拟树 → patch DOM */
function uiPatchStage(spec) {
  const stage = el('div', 'vibe-algo__ui');
  const mode = String(spec.mode || 'vue');
  const labels =
    mode === 'react'
      ? [
          ['setState / hook', '写状态'],
          ['调度器', '批量 · 优先级'],
          ['Reconciler', 'Fiber 对树'],
          ['commit', '改真实 DOM'],
        ]
      : mode === 'angular'
        ? [
            ['绑定变更', 'Zone / Signal'],
            ['变更检测', '检查树'],
            ['模板视图', '指令树'],
            ['更新 DOM', '渲染器'],
          ]
        : [
            ['写 ref/reactive', 'trigger'],
            ['依赖队列', 'track 过的订阅'],
            ['虚拟 DOM', '同层 diff'],
            ['patch', '改真实 DOM'],
          ];
  const boxes = labels.map(([t, s]) => {
    const b = el('div', 'vibe-algo__ui-box');
    b.append(el('div', 'vibe-algo__ui-title', { text: t }), el('div', 'vibe-algo__ui-sub', { text: s }));
    return b;
  });
  const arrows = [0, 1, 2].map(() => el('div', 'vibe-algo__ui-arrow', { text: '→' }));
  const badge = el('div', 'vibe-algo__ui-badge', {
    text: '宿主仍是 JS/TS · 框架只编排 DOM，不替代语言课',
  });
  const status = el('div', 'vibe-algo__ui-status', { text: '等待一次状态写入…' });
  stage.append(boxes[0], arrows[0], boxes[1], arrows[1], boxes[2], arrows[2], boxes[3], badge, status);
  return { stage, boxes, arrows, badge, status, mode };
}

async function runUiPatch(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done');
  for (const a of ui.arrows) a.classList.remove('is-on');
  ui.badge.classList.remove('is-on');
  const tip =
    ui.mode === 'react'
      ? 'React：状态变更进调度，再 reconcile → commit'
      : ui.mode === 'angular'
        ? 'Angular：变更检测扫树，模板视图驱动渲染器'
        : 'Vue：读时 track、写时 trigger，合并后再 patch';
  log(tip);
  ui.status.textContent = '① 状态被改写';
  ui.boxes[0].classList.add('is-active');
  await sleep(speed, signal);
  ui.arrows[0].classList.add('is-on');
  ui.boxes[0].classList.replace('is-active', 'is-done');
  ui.boxes[1].classList.add('is-active');
  ui.status.textContent = '② 进入更新调度（同 tick 可合并）';
  log('别在每次写状态时同步狂刷 DOM——框架会排队');
  await sleep(speed * 1.05, signal);
  ui.arrows[1].classList.add('is-on');
  ui.boxes[1].classList.replace('is-active', 'is-done');
  ui.boxes[2].classList.add('is-active');
  ui.status.textContent = '③ 算出「该变哪」';
  log('列表要稳定 key；错用 index 会让输入框「串台」');
  await sleep(speed * 1.05, signal);
  ui.arrows[2].classList.add('is-on');
  ui.boxes[2].classList.replace('is-active', 'is-done');
  ui.boxes[3].classList.add('is-active');
  ui.status.textContent = '④ 最小代价改真实 DOM';
  await sleep(speed, signal);
  ui.boxes[3].classList.replace('is-active', 'is-done');
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：Vue/React/Angular 都进 core/*/www/，构建后挂静态或反代';
  log('禁区：不要把浏览器框架源码塞进主服 src/');
  await sleep(speed * 0.85, signal);
}

/** 老师级：HTTP 请求穿过中间件链到 Handler */
function mwChainStage(spec) {
  const stage = el('div', 'vibe-algo__mw');
  const raw = Array.isArray(spec.layers) ? spec.layers : [];
  const layers = (raw.length
    ? raw
    : [
        { id: 'req', name: 'Request', sub: '方法 · 路径 · 头' },
        { id: 'mw1', name: '中间件 1', sub: '日志 / CORS' },
        { id: 'mw2', name: '中间件 2', sub: '鉴权 / 校验' },
        { id: 'h', name: 'Handler', sub: '业务处理' },
        { id: 'res', name: 'Response', sub: '状态 · 体' },
      ]
  ).map((L) => {
    const b = el('div', 'vibe-algo__mw-box');
    b.dataset.id = String(L.id || '');
    b.append(
      el('div', 'vibe-algo__mw-title', { text: String(L.name || '?') }),
      el('div', 'vibe-algo__mw-sub', { text: String(L.sub || '') })
    );
    return b;
  });
  const n = Math.max(layers.length, 1);
  stage.style.setProperty('--mw-n', String(n));

  const row = el('div', 'vibe-algo__mw-row');
  row.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
  for (const b of layers) row.append(b);

  const track = el('div', 'vibe-algo__mw-track');
  const packet = el('div', 'vibe-algo__mw-pkt', { text: 'HTTP' });
  track.append(packet);

  const status = el('div', 'vibe-algo__mw-status', { text: '请求尚未进入管道…' });
  stage.append(row, track, status);
  return { stage, layers, packet, status };
}

async function runMwChain(ui, speed, signal, log) {
  const n = ui.layers.length;
  for (const b of ui.layers) b.classList.remove('is-active', 'is-done', 'is-block');
  ui.packet.classList.remove('is-move');
  ui.stage.style.setProperty('--mw-n', String(Math.max(n, 1)));
  log('请求沿管道前进：每一层可放行、改写或直接结束');

  for (let i = 0; i < n; i++) {
    const b = ui.layers[i];
    b.classList.add('is-active');
    ui.packet.style.setProperty('--mw-i', String(i));
    ui.packet.classList.add('is-move');
    const title = b.querySelector('.vibe-algo__mw-title')?.textContent || '';
    const sub = b.querySelector('.vibe-algo__mw-sub')?.textContent || '';
    ui.status.textContent = sub ? `经过：${title}（${sub}）` : `经过：${title}`;
    if (i === 0) log('入口：拿到原始请求');
    else if (i === n - 1) log('出口：写出响应');
    else log(`${title}：可放行下一层，或在此短路返回`);
    await sleep(speed * 0.9, signal);
    b.classList.remove('is-active');
    b.classList.add('is-done');
  }
  ui.status.textContent = '对照本仓：主服用 Loader + HttpResponse；Java 链落在 jserver';
  log('Spring Filter（Servlet）→ Interceptor（MVC）→ Controller；勿嵌进主服进程');
  await sleep(speed * 0.85, signal);
}

/** 老师级：SSR 先出 HTML，再 hydrate */
function ssrFlowStage(spec) {
  const stage = el('div', 'vibe-algo__ssr');
  const mode = String(spec.mode || 'ssr');
  const steps =
    mode === 'spa'
      ? [
          ['浏览器', '要空壳 HTML'],
          ['CDN/静态', '返回 index + JS'],
          ['客户端框架', '在浏览器里建树'],
          ['可交互', '事件挂上'],
        ]
      : [
          ['浏览器', '请求页面'],
          ['Node 渲染', '组件 → HTML 字符串'],
          ['首屏 HTML', '带内容的文档'],
          ['hydrate', '接手事件与状态'],
        ];
  const boxes = steps.map(([t, s]) => {
    const b = el('div', 'vibe-algo__ssr-box');
    b.append(el('div', 'vibe-algo__ssr-title', { text: t }), el('div', 'vibe-algo__ssr-sub', { text: s }));
    return b;
  });
  const badge = el('div', 'vibe-algo__ssr-badge', {
    text: mode === 'spa' ? 'SPA：首屏常更空，SEO/首绘要另想' : 'SSR：首屏有字；成本在 Node 渲染与缓存',
  });
  const status = el('div', 'vibe-algo__ssr-status', { text: '选择渲染路径…' });
  const row = el('div', 'vibe-algo__ssr-row');
  for (let i = 0; i < boxes.length; i++) {
    row.append(boxes[i]);
    if (i < boxes.length - 1) row.append(el('div', 'vibe-algo__ssr-arrow', { text: '→' }));
  }
  stage.append(row, badge, status);
  return { stage, boxes, badge, status, mode };
}

async function runSsrFlow(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log(ui.mode === 'spa' ? '纯 SPA：服务器几乎只吐壳' : 'SSR：服务器先画好字，再交给客户端接管');
  for (let i = 0; i < ui.boxes.length; i++) {
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = `步骤 ${i + 1}/${ui.boxes.length}`;
    await sleep(speed, signal);
    ui.boxes[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent =
    ui.mode === 'spa'
      ? '本仓 www 多为 SPA 构建产物；需要 SEO 再评估 SSR/元框架'
      : 'Next 等元框架：路由与渲染策略是框架约定，宿主仍是 JS';
  await sleep(speed * 0.85, signal);
}

/** 老师级：上下文窗口预算条 */
function tokBudgetStage(spec) {
  const stage = el('div', 'vibe-algo__tok');
  const limit = Math.max(4, Number(spec.limit) || 16);
  const chunks = Array.isArray(spec.chunks) ? spec.chunks : [];
  const bar = el('div', 'vibe-algo__tok-bar');
  const segs = chunks.map((c) => {
    const s = el('div', 'vibe-algo__tok-seg');
    s.style.flexGrow = '0';
    s.style.flexBasis = '0';
    s.dataset.n = String(c.n || 0);
    s.append(
      el('span', 'vibe-algo__tok-seg-lab', { text: String(c.name || c.id || '?') }),
      el('span', 'vibe-algo__tok-seg-n', { text: `0/${c.n}` })
    );
    return s;
  });
  for (const s of segs) bar.append(s);
  const meter = el('div', 'vibe-algo__tok-meter', { text: `预算 0 / ${limit} tokens` });
  const badge = el('div', 'vibe-algo__tok-badge', {
    text: '窗外内容 = 0 注意力；计费与截断都按 token，不是按「字数感觉」',
  });
  const status = el('div', 'vibe-algo__tok-status', { text: '准备装填上下文…' });
  stage.append(bar, meter, badge, status);
  return { stage, segs, meter, badge, status, limit, chunks };
}

async function runTokBudget(ui, speed, signal, log) {
  for (const s of ui.segs) {
    s.classList.remove('is-active', 'is-done', 'is-overflow');
    s.style.flexGrow = '0';
    const nEl = s.querySelector('.vibe-algo__tok-seg-n');
    if (nEl) nEl.textContent = '0';
  }
  ui.badge.classList.remove('is-on');
  log('OpenAI：token 是模型读写的基本单位；窗口含输入+输出（帮助中心 / tiktoken）');
  let used = 0;
  for (let i = 0; i < ui.segs.length; i++) {
    const s = ui.segs[i];
    const n = Math.max(0, Number(ui.chunks[i]?.n) || 0);
    s.classList.add('is-active');
    ui.status.textContent = `装入：${ui.chunks[i]?.name || ''}（+${n}）`;
    await sleep(speed * 0.55, signal);
    used += n;
    s.style.flexGrow = String(n);
    const nEl = s.querySelector('.vibe-algo__tok-seg-n');
    if (nEl) nEl.textContent = String(n);
    ui.meter.textContent = `预算 ${Math.min(used, ui.limit)} / ${ui.limit} tokens`;
    if (used > ui.limit) {
      s.classList.add('is-overflow');
      ui.status.textContent = '超窗：截断 / 报错 / 压缩——模型看不见被裁掉的字';
      log('本仓：toolPair → compaction → Provider contextWindow 裁剪（agent-context）');
      await sleep(speed, signal);
      break;
    }
    s.classList.replace('is-active', 'is-done');
    await sleep(speed * 0.45, signal);
  }
  ui.badge.classList.add('is-on');
  if (used <= ui.limit) {
    ui.status.textContent = '窗内排满：系统宜稳、历史可裁、工具结果别整段回灌';
  }
  await sleep(speed * 0.7, signal);
}

/** 老师级：自注意力——「它」看向谁 */
function attnMapStage(spec) {
  const stage = el('div', 'vibe-algo__attn');
  const tokens = Array.isArray(spec.tokens) ? spec.tokens.map(String) : ['小明', '书', '它'];
  const query = Math.min(tokens.length - 1, Math.max(0, Number(spec.query) || 0));
  const scores = Array.isArray(spec.scores)
    ? spec.scores.map(Number)
    : tokens.map((_, i) => (i === 0 ? 0.7 : 0.3 / Math.max(1, tokens.length - 1)));
  const row = el('div', 'vibe-algo__attn-row');
  const cells = tokens.map((t, i) => {
    const c = el('div', 'vibe-algo__attn-tok');
    c.append(el('div', 'vibe-algo__attn-lab', { text: t }));
    const w = el('div', 'vibe-algo__attn-w', { text: '·' });
    c.append(w);
    return { c, w, i };
  });
  for (const x of cells) row.append(x.c);
  const formula = el('div', 'vibe-algo__attn-formula', {
    text: 'Attention(Q,K,V)=softmax(QKᵀ/√dₖ)V　·　Vaswani et al. 2017',
  });
  const status = el('div', 'vibe-algo__attn-status', { text: '选一个查询令牌…' });
  stage.append(row, formula, status);
  return { stage, cells, status, tokens, query, scores };
}

async function runAttnMap(ui, speed, signal, log) {
  for (const x of ui.cells) {
    x.c.classList.remove('is-query', 'is-hit', 'is-dim');
    x.w.textContent = '·';
    x.w.style.opacity = '0.25';
  }
  log('缩放点积注意力：相似度 / √dₖ 再 softmax，避免维度一大就梯度消失');
  const q = ui.cells[ui.query];
  q.c.classList.add('is-query');
  ui.status.textContent = `查询 Q =「${ui.tokens[ui.query]}」——要找指代对象`;
  await sleep(speed, signal);
  let maxI = 0;
  let maxS = -1;
  for (let i = 0; i < ui.cells.length; i++) {
    const s = Number(ui.scores[i]) || 0;
    if (s > maxS) {
      maxS = s;
      maxI = i;
    }
    ui.cells[i].w.textContent = s.toFixed(2);
    ui.cells[i].w.style.opacity = String(0.25 + Math.min(1, s) * 0.75);
    if (i !== ui.query) ui.cells[i].c.classList.add('is-dim');
    await sleep(speed * 0.35, signal);
  }
  ui.cells[maxI].c.classList.remove('is-dim');
  ui.cells[maxI].c.classList.add('is-hit');
  ui.status.textContent = `权重最高 →「${ui.tokens[maxI]}」；再对 V 加权混合（多头可并行多组关系）`;
  log('因果掩码：生成时不能看未来令牌；窗外令牌根本不在矩阵里');
  await sleep(speed * 1.1, signal);
}

/** 老师级：Transformer 积木堆叠 */
function tfStackStage(spec) {
  const stage = el('div', 'vibe-algo__tfs');
  const mode = String(spec.mode || 'decoder');
  const steps =
    mode === 'encdec'
      ? [
          ['输入嵌入+位置', 'Encoder 侧'],
          ['双向自注意力', '读全句'],
          ['交叉注意力', 'Decoder 看 Encoder'],
          ['前馈 + 残差', '逐位置'],
          ['输出序列', '翻译/摘要…'],
        ]
      : [
          ['令牌嵌入+位置', '顺序信号'],
          ['因果自注意力', '只看过去'],
          ['前馈网络', '逐位置非线性'],
          ['堆 N 层', '残差+归一化'],
          ['下一令牌分布', '自回归写出'],
        ];
  const boxes = steps.map(([t, s]) => {
    const b = el('div', 'vibe-algo__tfs-box');
    b.append(el('div', 'vibe-algo__tfs-title', { text: t }), el('div', 'vibe-algo__tfs-sub', { text: s }));
    return b;
  });
  const badge = el('div', 'vibe-algo__tfs-badge', {
    text:
      mode === 'encdec'
        ? '原论文机器翻译：Encoder–Decoder；当代对话 LLM 多为 Decoder-only'
        : 'Decoder-only（GPT 族）：因果掩码 + 下一令牌预测',
  });
  const status = el('div', 'vibe-algo__tfs-status', { text: '装机…' });
  const col = el('div', 'vibe-algo__tfs-col');
  for (const b of boxes) col.append(b);
  stage.append(col, badge, status);
  return { stage, boxes, badge, status, mode };
}

async function runTfStack(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('Attention Is All You Need（NeurIPS 2017）：去掉循环与卷积，只靠注意力');
  for (let i = 0; i < ui.boxes.length; i++) {
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = `积木 ${i + 1}/${ui.boxes.length}`;
    await sleep(speed * 0.9, signal);
    ui.boxes[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓不改层数公式；改的是窗内消息与工具白名单';
  await sleep(speed * 0.85, signal);
}

/** 老师级：零/少样本 ICL vs 微调 */
function iclPathStage(spec) {
  const stage = el('div', 'vibe-algo__icl');
  const mode = String(spec.mode || 'icl');
  const steps =
    mode === 'compare'
      ? [
          ['提示里塞示例', 'ICL · 不改权重'],
          ['每次推理都重读示例', '占窗口 · 贵'],
          ['权重继续训练', '微调 / LoRA'],
          ['推理时可短提示', '成本摊到训练'],
        ]
      : [
          ['Zero-shot', '只给任务说明'],
          ['Few-shot', '窗内 K 个示范'],
          ['仍不更新权重', 'GPT-3 论文设定'],
          ['受窗口限制', '示例太多就塞不下'],
        ];
  const boxes = steps.map(([t, s]) => {
    const b = el('div', 'vibe-algo__icl-box');
    b.append(el('div', 'vibe-algo__icl-title', { text: t }), el('div', 'vibe-algo__icl-sub', { text: s }));
    return b;
  });
  const badge = el('div', 'vibe-algo__icl-badge', {
    text:
      mode === 'compare'
        ? 'Brown et al. 2020：Few-shot = 推理时条件，不梯度更新；微调 = 改权重'
        : '上下文内学习：示范写进 prompt，权重原封不动',
  });
  const status = el('div', 'vibe-algo__icl-status', { text: '自适应梯子…' });
  const row = el('div', 'vibe-algo__icl-row');
  for (const b of boxes) row.append(b);
  stage.append(row, badge, status);
  return { stage, boxes, badge, status, mode };
}

async function runIclPath(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log(
    ui.mode === 'compare'
      ? '先问：能否用提示/检索解决？再谈微调数据与评估成本'
      : 'Language Models are Few-Shot Learners（GPT-3）：任务写进上下文'
  );
  for (let i = 0; i < ui.boxes.length; i++) {
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = `档 ${i + 1}/${ui.boxes.length}`;
    await sleep(speed * 0.9, signal);
    ui.boxes[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓默认：工作区注入 + 提示组装（ICL 档）；微调是另档产品成本';
  await sleep(speed * 0.85, signal);
}

/** 老师级：Chat Completions 角色栈 */
function msgRolesStage(spec) {
  const stage = el('div', 'vibe-algo__roles');
  const raw = Array.isArray(spec.roles) ? spec.roles : [];
  const roles = (raw.length
    ? raw
    : [
        { id: 'system', name: 'system', sub: '开发者说明 / 人设' },
        { id: 'user', name: 'user', sub: '本轮用户' },
        { id: 'assistant', name: 'assistant', sub: '模型回复' },
        { id: 'tool', name: 'tool', sub: '工具结果回灌' },
      ]
  ).map((r) => {
    const b = el('div', 'vibe-algo__roles-box');
    b.append(
      el('div', 'vibe-algo__roles-title', { text: String(r.name || r.id || '?') }),
      el('div', 'vibe-algo__roles-sub', { text: String(r.sub || '') })
    );
    return b;
  });
  const badge = el('div', 'vibe-algo__roles-badge', {
    text: '事实标准：messages[] + role；OpenAI 兼容端点同形。较新模型也可见 developer 角色',
  });
  const status = el('div', 'vibe-algo__roles-status', { text: '组装会话…' });
  for (const b of roles) stage.append(b);
  stage.append(badge, status);
  return { stage, roles, badge, status };
}

async function runMsgRoles(ui, speed, signal, log) {
  for (const b of ui.roles) b.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('Chat Completions：POST …/chat/completions，输入是消息列表');
  for (let i = 0; i < ui.roles.length; i++) {
    ui.roles[i].classList.add('is-active');
    ui.status.textContent = `角色 ${i + 1}/${ui.roles.length}`;
    await sleep(speed * 0.85, signal);
    ui.roles[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '本仓：assembleChatLlmMessages 分层；工具结果进 tool / 等价角色';
  await sleep(speed * 0.85, signal);
}

/** 老师级：Agent 图 / DAG 依赖与并行 */
function dagFlowStage(spec) {
  const stage = el('div', 'vibe-algo__dag');
  const names = Array.isArray(spec.nodes) ? spec.nodes : [];
  const mk = (n) => {
    const b = el('div', 'vibe-algo__dag-box');
    b.append(el('div', 'vibe-algo__dag-title', { text: String(n.name || n.id || '?') }));
    return b;
  };
  const start = mk(names[0] || { name: '开始' });
  const a = mk(names[1] || { name: '检索' });
  const b = mk(names[2] || { name: '读工作区' });
  const c = mk(names[3] || { name: '汇总' });
  const end = mk(names[4] || { name: '结束' });
  const fork = el('div', 'vibe-algo__dag-hint', { text: '∥ 无依赖 → 可并行' });
  const join = el('div', 'vibe-algo__dag-hint', { text: '汇总依赖两边' });
  const badge = el('div', 'vibe-algo__dag-badge', {
    text: '图 = 控制流；本仓主路径仍是消息三层 + tool_calls 环，不是通用图编辑器',
  });
  const status = el('div', 'vibe-algo__dag-status', { text: '拓扑执行…' });
  const row1 = el('div', 'vibe-algo__dag-row');
  row1.append(start);
  const row2 = el('div', 'vibe-algo__dag-row');
  row2.append(a, fork, b);
  const row3 = el('div', 'vibe-algo__dag-row');
  row3.append(c);
  const row4 = el('div', 'vibe-algo__dag-row');
  row4.append(end);
  stage.append(row1, row2, join, row3, row4, badge, status);
  return { stage, boxes: [start, a, b, c, end], badge, status };
}

async function runDagFlow(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done', 'is-parallel');
  ui.badge.classList.remove('is-on');
  log('先计划后执行常见形态：规划器出 DAG → 拓扑序执行（可并行）→ 汇总');
  ui.boxes[0].classList.add('is-active');
  ui.status.textContent = '① 开始';
  await sleep(speed * 0.7, signal);
  ui.boxes[0].classList.replace('is-active', 'is-done');
  ui.boxes[1].classList.add('is-active', 'is-parallel');
  ui.boxes[2].classList.add('is-active', 'is-parallel');
  ui.status.textContent = '② 检索 ∥ 读工作区（无互相依赖）';
  await sleep(speed, signal);
  ui.boxes[1].classList.replace('is-active', 'is-done');
  ui.boxes[2].classList.replace('is-active', 'is-done');
  ui.boxes[1].classList.remove('is-parallel');
  ui.boxes[2].classList.remove('is-parallel');
  ui.boxes[3].classList.add('is-active');
  ui.status.textContent = '③ 汇总（依赖两边完成）';
  await sleep(speed * 0.9, signal);
  ui.boxes[3].classList.replace('is-active', 'is-done');
  ui.boxes[4].classList.add('is-active');
  ui.status.textContent = '④ 结束 / 条件边可回到重试';
  await sleep(speed * 0.8, signal);
  ui.boxes[4].classList.replace('is-active', 'is-done');
  ui.badge.classList.add('is-on');
  ui.status.textContent = '复杂 DAG 放 Core/外挂；默认别为了「看起来高级」上重型编排框架';
  await sleep(speed * 0.75, signal);
}

/** 老师级：经典 RAG 三步 */
function ragPipeStage(spec) {
  const stage = el('div', 'vibe-algo__rag');
  const names = Array.isArray(spec.steps) ? spec.steps : ['Retrieve', 'Augment', 'Generate'];
  const boxes = names.map((n, i) => {
    const b = el('div', 'vibe-algo__rag-box');
    const zh = i === 0 ? '检索' : i === 1 ? '增强进窗' : '生成';
    b.append(
      el('div', 'vibe-algo__rag-en', { text: String(n) }),
      el('div', 'vibe-algo__rag-zh', { text: zh })
    );
    return b;
  });
  const badge = el('div', 'vibe-algo__rag-badge', {
    text: '经典流水线固定管道即可 —— 不依赖智能体循环',
  });
  const status = el('div', 'vibe-algo__rag-status', { text: 'RAG 管线…' });
  stage.append(...boxes, badge, status);
  return { stage, boxes, badge, status };
}

async function runRagPipe(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('Lewis 等 2020：先检索外部知识，再增强提示，再生成');
  const tips = [
    '① Retrieve：按问题取 Top-K 片段',
    '② Augment：片段写入 messages（占窗口）',
    '③ Generate：模型基于材料作答（可带引用）',
  ];
  for (let i = 0; i < ui.boxes.length; i++) {
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = tips[i] || '';
    log(tips[i] || '');
    await sleep(speed, signal);
    ui.boxes[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '检错则答错；多轮再检索 = Agentic RAG（汇合段）';
  await sleep(speed * 0.8, signal);
}

/** 老师级：问句向量找近邻 */
function embNearStage(spec) {
  const stage = el('div', 'vibe-algo__emb');
  const q = el('div', 'vibe-algo__emb-q');
  q.append(
    el('div', 'vibe-algo__emb-q-title', { text: '问句 → 向量' }),
    el('div', 'vibe-algo__emb-q-sub', { text: String(spec.query || '用户问题') })
  );
  const hits = (Array.isArray(spec.hits) ? spec.hits : []).map((h) => {
    const b = el('div', 'vibe-algo__emb-hit');
    b.append(
      el('div', 'vibe-algo__emb-hit-id', { text: String(h.id || '?') }),
      el('div', 'vibe-algo__emb-hit-label', { text: String(h.label || '') }),
      el('div', 'vibe-algo__emb-hit-score', { text: `≈ ${h.score ?? '?'}` })
    );
    return b;
  });
  const badge = el('div', 'vibe-algo__emb-badge', {
    text: '建库与查询必须同一嵌入模型 · 同维度；近 ≠ 事实正确',
  });
  const status = el('div', 'vibe-algo__emb-status', { text: '近邻检索…' });
  const row = el('div', 'vibe-algo__emb-row');
  row.append(...hits);
  stage.append(q, row, badge, status);
  return { stage, q, hits, badge, status };
}

async function runEmbNear(ui, speed, signal, log) {
  for (const h of ui.hits) h.classList.remove('is-active', 'is-done', 'is-noise');
  ui.q.classList.remove('is-active');
  ui.badge.classList.remove('is-on');
  ui.q.classList.add('is-active');
  ui.status.textContent = '① 同一嵌入模型把问句映到向量空间';
  log('同模型同维度是近邻有意义的前提');
  await sleep(speed * 0.85, signal);
  for (let i = 0; i < ui.hits.length; i++) {
    const h = ui.hits[i];
    const noise = i === ui.hits.length - 1;
    h.classList.add(noise ? 'is-noise' : 'is-active');
    ui.status.textContent = noise
      ? `③ 低分邻居：语义漂 / 噪声 —— 勿默认进窗`
      : `② Top 命中 ${i + 1}：相似度高者优先`;
    await sleep(speed * 0.75, signal);
    h.classList.remove('is-active');
    if (!noise) h.classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '换嵌入模型 → 通常整库重嵌；专名常还需关键词通道';
  await sleep(speed * 0.8, signal);
}

/** 老师级：长文分块 + 重叠 */
function chunkSplitStage(spec) {
  const stage = el('div', 'vibe-algo__chk');
  const doc = el('div', 'vibe-algo__chk-doc', { text: '长文档 / 制度 PDF' });
  const row = el('div', 'vibe-algo__chk-row');
  const chunks = (Array.isArray(spec.chunks) ? spec.chunks : []).map((c) => {
    const b = el('div', 'vibe-algo__chk-box');
    b.append(
      el('div', 'vibe-algo__chk-id', { text: `#${c.id || '?'}` }),
      el('div', 'vibe-algo__chk-label', { text: String(c.label || '') })
    );
    return b;
  });
  row.append(...chunks);
  const badge = el('div', 'vibe-algo__chk-badge', {
    text: '过碎缺语境 · 过大噪声多；先结构切，再用评测集调长度',
  });
  const status = el('div', 'vibe-algo__chk-status', { text: '分块…' });
  stage.append(doc, row, badge, status);
  return { stage, doc, chunks, badge, status };
}

async function runChunkSplit(ui, speed, signal, log) {
  for (const c of ui.chunks) c.classList.remove('is-active', 'is-done', 'is-overlap');
  ui.doc.classList.remove('is-active');
  ui.badge.classList.remove('is-on');
  ui.doc.classList.add('is-active');
  ui.status.textContent = '① 解析 / 清洗后再切（勿对脏 PDF 硬按字数）';
  log('块 = 检索命中的常见粒度，也占进窗预算');
  await sleep(speed * 0.8, signal);
  for (let i = 0; i < ui.chunks.length; i++) {
    ui.chunks[i].classList.add('is-active');
    if (i === 1) ui.chunks[i].classList.add('is-overlap');
    ui.status.textContent =
      i === 1 ? '② 重叠窗：保留跨块主语 / 条款号' : `② 写入块 ${i + 1}/${ui.chunks.length}`;
    await sleep(speed * 0.7, signal);
    ui.chunks[i].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '改 chunk 后：固定问题集看召回，勿一次拧五个旋钮';
  await sleep(speed * 0.75, signal);
}

/** 老师级：稀疏 + 稠密 → 融合（可接重排） */
function hybridRetStage(spec) {
  const stage = el('div', 'vibe-algo__hyb');
  const mkLane = (title, items, mod) => {
    const lane = el('div', `vibe-algo__hyb-lane vibe-algo__hyb-lane--${mod}`);
    lane.append(el('div', 'vibe-algo__hyb-lane-title', { text: title }));
    const list = el('div', 'vibe-algo__hyb-list');
    const boxes = (Array.isArray(items) ? items : []).map((t) =>
      el('div', 'vibe-algo__hyb-item', { text: String(t) })
    );
    list.append(...boxes);
    lane.append(list);
    return { lane, boxes };
  };
  const sparse = mkLane('BM25 / 关键词', spec.sparse, 'sparse');
  const dense = mkLane('向量近邻', spec.dense, 'dense');
  const fuse = mkLane('融合（如 RRF）→ 可选重排', spec.fused, 'fuse');
  const badge = el('div', 'vibe-algo__hyb-badge', {
    text: '召回求全 · 重排求准；专名靠稀疏，同义靠稠密',
  });
  const status = el('div', 'vibe-algo__hyb-status', { text: '混合检索…' });
  const top = el('div', 'vibe-algo__hyb-top');
  top.append(sparse.lane, dense.lane);
  stage.append(top, fuse.lane, badge, status);
  return {
    stage,
    sparse: sparse.boxes,
    dense: dense.boxes,
    fused: fuse.boxes,
    badge,
    status,
  };
}

async function runHybridRet(ui, speed, signal, log) {
  for (const b of [...ui.sparse, ...ui.dense, ...ui.fused]) {
    b.classList.remove('is-active', 'is-done');
  }
  ui.badge.classList.remove('is-on');
  log('生产 RAG 多数双通道；RRF 按排名融合，少做跨量纲校准');
  ui.status.textContent = '① 稀疏通道锁住错误码 / 条款号';
  for (const b of ui.sparse) {
    b.classList.add('is-active');
    await sleep(speed * 0.55, signal);
    b.classList.replace('is-active', 'is-done');
  }
  ui.status.textContent = '② 稠密通道补同义改写';
  for (const b of ui.dense) {
    b.classList.add('is-active');
    await sleep(speed * 0.55, signal);
    b.classList.replace('is-active', 'is-done');
  }
  ui.status.textContent = '③ 融合候选；噪声多再交叉编码器精排进窗';
  for (const b of ui.fused) {
    b.classList.add('is-active');
    await sleep(speed * 0.6, signal);
    b.classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '改通道权重后仍要用黄金集回归（见 RAG 评测）';
  await sleep(speed * 0.75, signal);
}

/** 老师级：Rules 全文 vs Skills 目录 vs AGENTS */
function tameInjStage(spec) {
  const stage = el('div', 'vibe-algo__tame');
  const lanes = (Array.isArray(spec.lanes) ? spec.lanes : []).map((L) => {
    const b = el('div', 'vibe-algo__tame-lane');
    b.append(
      el('div', 'vibe-algo__tame-name', { text: String(L.name || L.id || '?') }),
      el('div', 'vibe-algo__tame-sub', { text: String(L.sub || '') })
    );
    return b;
  });
  const badge = el('div', 'vibe-algo__tame-badge', {
    text: '规则是护栏；技能是导航；AGENTS 是交底 —— 勿三件互塞',
  });
  const status = el('div', 'vibe-algo__tame-status', { text: '驯服面…' });
  const row = el('div', 'vibe-algo__tame-row');
  row.append(...lanes);
  stage.append(row, badge, status);
  return { stage, lanes, badge, status };
}

async function runTameInj(ui, speed, signal, log) {
  for (const b of ui.lanes) b.classList.remove('is-active', 'is-done', 'is-peek');
  ui.badge.classList.remove('is-on');
  log('本仓：agents/rules 全文；skills 目录 + tools.read；工作区 AGENTS.md');
  const tips = [
    '① Rules：短硬约束，宜稳定进 system（占预算）',
    '② Skills：先注入目录卡；命中后再读 SKILL.md',
    '③ AGENTS.md：项目/工作区说明书（两张工牌勿混）',
  ];
  for (let i = 0; i < ui.lanes.length; i++) {
    ui.lanes[i].classList.add(i === 1 ? 'is-peek' : 'is-active');
    ui.status.textContent = tips[i] || '';
    log(tips[i] || '');
    await sleep(speed, signal);
    ui.lanes[i].classList.remove('is-active', 'is-peek');
    ui.lanes[i].classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = 'Coding 的 .cursor/rules·skills 是另一舞台，默认不进办事链';
  await sleep(speed * 0.8, signal);
}

/** 老师级：提示注入 vs 工具门禁 */
function secGateStage(spec) {
  const stage = el('div', 'vibe-algo__sec');
  const boxes = (Array.isArray(spec.stages) ? spec.stages : []).map((s) => {
    const b = el('div', 'vibe-algo__sec-box');
    b.append(
      el('div', 'vibe-algo__sec-title', { text: String(s.name || s.id || '?') }),
      el('div', 'vibe-algo__sec-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const badge = el('div', 'vibe-algo__sec-badge', {
    text: '正文 ≠ 系统指令；副作用工具必须经 handleToolCall',
  });
  const status = el('div', 'vibe-algo__sec-status', { text: '提示安全…' });
  stage.append(...boxes, badge, status);
  return { stage, boxes, badge, status };
}

async function runSecGate(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done', 'is-risk', 'is-block');
  ui.badge.classList.remove('is-on');
  log('间接注入：恶意字藏在日后被检索到的文档里');
  if (ui.boxes[0]) {
    ui.boxes[0].classList.add('is-risk', 'is-active');
    ui.status.textContent = '① 不可信正文试图「忽略上文 / 外传密钥」';
    await sleep(speed, signal);
    ui.boxes[0].classList.remove('is-active');
    ui.boxes[0].classList.add('is-done');
  }
  if (ui.boxes[1]) {
    ui.boxes[1].classList.add('is-active');
    ui.status.textContent = '② 系统/规则层应分区、更高优先级（勿与脏数据混同一条）';
    await sleep(speed, signal);
    ui.boxes[1].classList.replace('is-active', 'is-done');
  }
  if (ui.boxes[2]) {
    ui.boxes[2].classList.add('is-active', 'is-block');
    ui.status.textContent = '③ 门禁：policies / toolScan / 可选 #批准';
    await sleep(speed, signal);
    ui.boxes[2].classList.remove('is-active', 'is-block');
    ui.boxes[2].classList.add('is-done');
  }
  if (ui.boxes[3]) {
    ui.boxes[3].classList.add('is-active');
    ui.status.textContent = '④ 放行后才执行真实工具（最小权限）';
    await sleep(speed * 0.85, signal);
    ui.boxes[3].classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '提示安全 ≠ HTTPS；传输层与提示层是同一张网的不同层';
  await sleep(speed * 0.75, signal);
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseAlgoSource>} cfg
 */

/** DSA · 大 O 增长对比 */
function bigOStage(spec) {
  const stage = el('div', 'vibe-algo__bigo');
  const curves = (Array.isArray(spec.curves) ? spec.curves : []).map((c) => {
    const col = el('div', 'vibe-algo__bigo-col');
    col.dataset.id = String(c.id || '');
    const bar = el('div', 'vibe-algo__bigo-bar');
    if (c.color) bar.style.setProperty('--bigo-c', String(c.color));
    const name = el('div', 'vibe-algo__bigo-name', { text: String(c.name || '?') });
    const val = el('div', 'vibe-algo__bigo-val', { text: '—' });
    col.append(bar, name, val);
    return { col, bar, val, id: String(c.id || ''), name: String(c.name || '?') };
  });
  const row = el('div', 'vibe-algo__bigo-row');
  for (const c of curves) row.append(c.col);
  const nlab = el('div', 'vibe-algo__bigo-n', { text: 'n = 1' });
  const status = el('div', 'vibe-algo__bigo-status', { text: '增长趋势…' });
  stage.append(nlab, row, status);
  return { stage, curves, nlab, status };
}

function bigOOps(id, n) {
  if (id === '1') return 1;
  if (id === 'log') return Math.max(1, Math.ceil(Math.log2(n)));
  if (id === 'n') return n;
  if (id === 'nlog') return Math.round(n * Math.log2(n));
  if (id === 'n2') return n * n;
  return n;
}

async function runBigO(ui, spec, speed, signal, log) {
  const nMax = Math.max(4, Number(spec.nMax) || 16);
  const peak = nMax * nMax;
  log('大 O：看随 n 增长的趋势，不是墙上秒数');
  for (let n = 1; n <= nMax; n++) {
    ui.nlab.textContent = `n = ${n}`;
    for (const c of ui.curves) {
      const ops = bigOOps(c.id, n);
      const h = Math.max(4, Math.round((ops / peak) * 100));
      c.bar.style.height = `${h}%`;
      c.val.textContent = String(ops);
      c.col.classList.toggle('is-hot', c.id === 'n2' && n >= nMax - 2);
    }
    ui.status.textContent = n === nMax ? 'n² 爆炸；面试先说瓶颈阶' : `规模 ${n}：对比各阶「操作次数」`;
    log(ui.status.textContent);
    await sleep(Math.max(60, speed * 0.45), signal);
  }
  ui.status.textContent = '开口：瓶颈循环/递归深度 → 平均 vs 最坏 → 可否空间换时间';
  await sleep(speed * 0.7, signal);
}

/** DSA · 栈 LIFO / 队列 FIFO */
function stackQStage(spec) {
  const stage = el('div', 'vibe-algo__sq');
  const tokens = Array.isArray(spec.tokens) ? spec.tokens.map(String) : ['A', 'B', 'C'];
  const mkSide = (title, sub, cls) => {
    const side = el('div', `vibe-algo__sq-side ${cls}`);
    side.append(
      el('div', 'vibe-algo__sq-title', { text: title }),
      el('div', 'vibe-algo__sq-sub', { text: sub })
    );
    const well = el('div', 'vibe-algo__sq-well');
    side.append(well);
    return { side, well };
  };
  const st = mkSide('栈 Stack', 'LIFO · 后进先出', 'vibe-algo__sq-side--stack');
  const qu = mkSide('队列 Queue', 'FIFO · 先进先出', 'vibe-algo__sq-side--queue');
  const row = el('div', 'vibe-algo__sq-row');
  row.append(st.side, qu.side);
  const tray = el('div', 'vibe-algo__sq-tray');
  const chips = tokens.map((t) => {
    const chip = el('div', 'vibe-algo__sq-chip', { text: t });
    chip.dataset.tok = t;
    tray.append(chip);
    return chip;
  });
  const status = el('div', 'vibe-algo__sq-status', { text: '入栈 / 入队…' });
  stage.append(tray, row, status);
  return { stage, chips, st, qu, status, tokens };
}

async function runStackQ(ui, speed, signal, log) {
  ui.st.well.replaceChildren();
  ui.qu.well.replaceChildren();
  for (const c of ui.chips) {
    c.classList.remove('is-gone');
    ui.stage.querySelector('.vibe-algo__sq-tray')?.append(c);
  }
  log('同一批元素：栈与队列进出顺序不同');
  const stack = [];
  const queue = [];
  for (const chip of ui.chips) {
    chip.classList.add('is-active');
    ui.status.textContent = `push / enqueue ${chip.dataset.tok}`;
    log(ui.status.textContent);
    await sleep(speed * 0.7, signal);
    const sClone = chip.cloneNode(true);
    sClone.classList.remove('is-active');
    sClone.classList.add('is-in');
    ui.st.well.prepend(sClone);
    stack.push(chip.dataset.tok);
    const qClone = chip.cloneNode(true);
    qClone.classList.remove('is-active');
    qClone.classList.add('is-in');
    ui.qu.well.append(qClone);
    queue.push(chip.dataset.tok);
    chip.classList.add('is-gone');
    chip.classList.remove('is-active');
    await sleep(speed * 0.55, signal);
  }
  const outS = [];
  const outQ = [];
  while (ui.st.well.firstChild) {
    const node = ui.st.well.firstChild;
    outS.push(node.textContent);
    node.classList.add('is-pop');
    ui.status.textContent = `栈 pop → ${node.textContent}`;
    log(ui.status.textContent);
    await sleep(speed * 0.65, signal);
    node.remove();
  }
  while (ui.qu.well.firstChild) {
    const node = ui.qu.well.firstChild;
    outQ.push(node.textContent);
    node.classList.add('is-pop');
    ui.status.textContent = `队列 dequeue → ${node.textContent}`;
    log(ui.status.textContent);
    await sleep(speed * 0.65, signal);
    node.remove();
  }
  ui.status.textContent = `栈出 [${outS.join('')}] · 队列出 [${outQ.join('')}] — 括号匹配用栈；BFS 用队列`;
  log(ui.status.textContent);
  await sleep(speed * 0.8, signal);
}

/** DSA · 哈希桶 + 冲突链 */
function hashSlotStage(spec) {
  const stage = el('div', 'vibe-algo__hs');
  const n = Math.max(3, Number(spec.slots) || 5);
  const slots = [];
  const row = el('div', 'vibe-algo__hs-row');
  for (let i = 0; i < n; i++) {
    const slot = el('div', 'vibe-algo__hs-slot');
    slot.append(el('div', 'vibe-algo__hs-idx', { text: `#${i}` }));
    const chain = el('div', 'vibe-algo__hs-chain');
    slot.append(chain);
    row.append(slot);
    slots.push({ slot, chain });
  }
  const keyEl = el('div', 'vibe-algo__hs-key', { text: 'key…' });
  const status = el('div', 'vibe-algo__hs-status', { text: '哈希…' });
  stage.append(keyEl, row, status);
  return { stage, slots, keyEl, status };
}

async function runHashSlot(ui, spec, speed, signal, log) {
  for (const s of ui.slots) {
    s.chain.replaceChildren();
    s.slot.classList.remove('is-active', 'is-hit');
  }
  const puts = Array.isArray(spec.puts) ? spec.puts : [];
  log('键 → 哈希 → 桶；冲突则链址');
  for (const p of puts) {
    const key = String(p.key ?? '?');
    const slot = Math.abs(Number(p.slot) || 0) % ui.slots.length;
    ui.keyEl.textContent = `hash("${key}") → 桶 ${slot}`;
    for (const s of ui.slots) s.slot.classList.remove('is-active');
    ui.slots[slot].slot.classList.add('is-active');
    ui.status.textContent = ui.slots[slot].chain.children.length
      ? `冲突：${key} 挂到桶 ${slot} 的链上`
      : `写入桶 ${slot}`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    const cell = el('div', 'vibe-algo__hs-cell', { text: key });
    cell.classList.add('is-in');
    ui.slots[slot].chain.append(cell);
    ui.slots[slot].slot.classList.add('is-hit');
    await sleep(speed * 0.7, signal);
  }
  ui.keyEl.textContent = '平均 O(1) · 最坏一条长链 O(n)';
  ui.status.textContent = '负载因子过高 → 扩容；JS 用 Map / Set 即可开口';
  log(ui.status.textContent);
  await sleep(speed * 0.8, signal);
}

/** DSA · BST 遍历 */
function bstTravStage(spec) {
  const stage = el('div', 'vibe-algo__bst');
  // fixed small BST:      4
  //                   2     6
  //                  1 3   5 7
  const layout = [
    { id: 4, x: 50, y: 8 },
    { id: 2, x: 28, y: 38 },
    { id: 6, x: 72, y: 38 },
    { id: 1, x: 16, y: 68 },
    { id: 3, x: 40, y: 68 },
    { id: 5, x: 60, y: 68 },
    { id: 7, x: 84, y: 68 },
  ];
  const canvas = el('div', 'vibe-algo__bst-canvas');
  const nodes = new Map();
  for (const n of layout) {
    const node = el('div', 'vibe-algo__bst-node', { text: String(n.id) });
    node.style.left = `${n.x}%`;
    node.style.top = `${n.y}%`;
    canvas.append(node);
    nodes.set(n.id, node);
  }
  const orderEl = el('div', 'vibe-algo__bst-order', { text: '序：' });
  const status = el('div', 'vibe-algo__bst-status', { text: '遍历…' });
  const mode = String(spec.mode || 'inorder');
  stage.append(
    el('div', 'vibe-algo__bst-mode', { text: `模式：${mode}` }),
    canvas,
    orderEl,
    status
  );
  return { stage, nodes, orderEl, status, mode };
}

function bstOrder(mode) {
  const pre = [4, 2, 1, 3, 6, 5, 7];
  const inn = [1, 2, 3, 4, 5, 6, 7];
  const post = [1, 3, 2, 5, 7, 6, 4];
  const level = [4, 2, 6, 1, 3, 5, 7];
  if (mode === 'preorder' || mode === 'pre') return pre;
  if (mode === 'postorder' || mode === 'post') return post;
  if (mode === 'level' || mode === 'bfs') return level;
  return inn;
}

async function runBstTrav(ui, speed, signal, log) {
  for (const n of ui.nodes.values()) n.classList.remove('is-active', 'is-done');
  const seq = bstOrder(ui.mode);
  const seen = [];
  ui.orderEl.textContent = '序：';
  const label =
    ui.mode === 'level' || ui.mode === 'bfs'
      ? '层序 = 队列 BFS'
      : ui.mode === 'preorder' || ui.mode === 'pre'
        ? '前序：根左右'
        : ui.mode === 'postorder' || ui.mode === 'post'
          ? '后序：左右根'
          : '中序：左根右（BST 有序）';
  log(label);
  ui.status.textContent = label;
  await sleep(speed * 0.6, signal);
  for (const id of seq) {
    const node = ui.nodes.get(id);
    node?.classList.add('is-active');
    seen.push(id);
    ui.orderEl.textContent = `序：${seen.join(' → ')}`;
    ui.status.textContent = `访问 ${id}`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    node?.classList.replace('is-active', 'is-done');
  }
  ui.status.textContent =
    ui.mode === 'inorder' || !ui.mode || ui.mode === 'in'
      ? 'BST 中序有序；层序题用队列'
      : '对照改 mode 看四种序';
  await sleep(speed * 0.7, signal);
}

/** DSA · 递归调用栈（阶乘示意） */
function callStackStage() {
  const stage = el('div', 'vibe-algo__cs');
  const frames = el('div', 'vibe-algo__cs-frames');
  const ret = el('div', 'vibe-algo__cs-ret', { text: '返回值…' });
  const status = el('div', 'vibe-algo__cs-status', { text: '调用…' });
  stage.append(
    el('div', 'vibe-algo__cs-title', { text: '调用栈 · fact(n)' }),
    frames,
    ret,
    status
  );
  return { stage, frames, ret, status };
}

async function runCallStack(ui, spec, speed, signal, log) {
  ui.frames.replaceChildren();
  const n = Math.min(6, Math.max(2, Number(spec.target) || 4));
  log(`展开 fact(${n})：每层压栈，触底再弹栈相乘`);
  const stack = [];
  for (let i = n; i >= 1; i--) {
    const fr = el('div', 'vibe-algo__cs-frame', {
      text: i === 1 ? `fact(1) → 1` : `fact(${i}) 等 fact(${i - 1})`,
    });
    fr.classList.add('is-active');
    ui.frames.prepend(fr);
    stack.push(fr);
    ui.status.textContent = `压栈 depth=${stack.length}`;
    ui.ret.textContent = i === 1 ? '触底返回 1' : '等待子调用…';
    log(ui.status.textContent);
    await sleep(speed, signal);
    fr.classList.remove('is-active');
  }
  let acc = 1;
  for (let i = 1; i <= n; i++) {
    acc *= i;
    const fr = stack[n - i];
    fr?.classList.add('is-done');
    ui.ret.textContent = `返回 ${acc}`;
    ui.status.textContent = `弹栈 · 乘上 ${i} → ${acc}`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    fr?.remove();
  }
  ui.status.textContent = `fact(${n})=${acc}；深层递归可改显式栈 / 迭代，防爆栈`;
  log(ui.status.textContent);
  await sleep(speed * 0.75, signal);
}

/** DSA · DP 填表（爬楼梯） */
function dpTableStage(spec) {
  const stage = el('div', 'vibe-algo__dp');
  const n = Math.min(10, Math.max(3, Number(spec.n) || 6));
  const cells = [];
  const row = el('div', 'vibe-algo__dp-row');
  for (let i = 0; i <= n; i++) {
    const cell = el('div', 'vibe-algo__dp-cell');
    cell.append(
      el('div', 'vibe-algo__dp-i', { text: `dp[${i}]` }),
      el('div', 'vibe-algo__dp-v', { text: '·' })
    );
    row.append(cell);
    cells.push(cell);
  }
  const formula = el('div', 'vibe-algo__dp-formula', {
    text: 'dp[i] = dp[i-1] + dp[i-2]（爬楼梯）',
  });
  const status = el('div', 'vibe-algo__dp-status', { text: '填表…' });
  stage.append(formula, row, status);
  return { stage, cells, status, n };
}

async function runDpTable(ui, speed, signal, log) {
  const dp = Array(ui.n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (const c of ui.cells) {
    c.classList.remove('is-active', 'is-done', 'is-src');
    c.querySelector('.vibe-algo__dp-v').textContent = '·';
  }
  log('状态含义：dp[i]=爬到第 i 阶的方案数');
  for (const i of [0, 1]) {
    ui.cells[i].classList.add('is-active');
    ui.cells[i].querySelector('.vibe-algo__dp-v').textContent = String(dp[i]);
    ui.status.textContent = `初始化 dp[${i}]=${dp[i]}`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    ui.cells[i].classList.replace('is-active', 'is-done');
  }
  for (let i = 2; i <= ui.n; i++) {
    ui.cells[i - 1]?.classList.add('is-src');
    ui.cells[i - 2]?.classList.add('is-src');
    dp[i] = dp[i - 1] + dp[i - 2];
    ui.cells[i].classList.add('is-active');
    ui.cells[i].querySelector('.vibe-algo__dp-v').textContent = String(dp[i]);
    ui.status.textContent = `dp[${i}] = ${dp[i - 1]}+${dp[i - 2]} = ${dp[i]}`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    for (const c of ui.cells) c.classList.remove('is-src', 'is-active');
    ui.cells[i].classList.add('is-done');
  }
  ui.status.textContent = '开口三步：状态含义 → 转移 → 初始化/遍历顺序；贪心需证明';
  await sleep(speed * 0.8, signal);
}

/** DSA · 位运算清最低 1 */
function bitsOpStage(spec) {
  const stage = el('div', 'vibe-algo__bits');
  let n = Math.max(1, Number(spec.n) || 29);
  const bitsEl = el('div', 'vibe-algo__bits-row');
  const nlab = el('div', 'vibe-algo__bits-n', { text: `n = ${n}` });
  const status = el('div', 'vibe-algo__bits-status', { text: 'n & (n-1)…' });
  stage.append(nlab, bitsEl, status);
  return { stage, bitsEl, nlab, status, start: n };
}

function renderBits(elRoot, n, highlightLowest = false) {
  elRoot.replaceChildren();
  const s = n.toString(2).padStart(8, '0');
  [...s].forEach((b, i) => {
    const cell = el('div', 'vibe-algo__bits-bit', { text: b });
    if (b === '1') cell.classList.add('is-one');
    elRoot.append(cell);
  });
  if (highlightLowest) {
    const idx = s.lastIndexOf('1');
    if (idx >= 0) elRoot.children[idx]?.classList.add('is-clear');
  }
  return s;
}

async function runBitsOp(ui, speed, signal, log) {
  let n = ui.start;
  let steps = 0;
  log('每次 n = n&(n-1) 清掉最低位的 1；循环次数=1 的个数');
  while (n > 0) {
    renderBits(ui.bitsEl, n, true);
    ui.nlab.textContent = `n = ${n} (${n.toString(2)})`;
    ui.status.textContent = `清最低 1：${n} & ${n - 1} → ${n & (n - 1)}`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    n = n & (n - 1);
    steps++;
    renderBits(ui.bitsEl, n, false);
    await sleep(speed * 0.55, signal);
  }
  ui.nlab.textContent = 'n = 0';
  ui.status.textContent = `共 ${steps} 次 → Hamming 权重；异或 ^ 可抵消成对（只出现一次）`;
  log(ui.status.textContent);
  await sleep(speed * 0.8, signal);
}

/** DSA · LRU */
function lruStage(spec) {
  const stage = el('div', 'vibe-algo__lru');
  const cap = Math.max(1, Number(spec.capacity) || 2);
  const list = el('div', 'vibe-algo__lru-list');
  const map = el('div', 'vibe-algo__lru-map');
  const opEl = el('div', 'vibe-algo__lru-op', { text: 'op…' });
  const status = el('div', 'vibe-algo__lru-status', { text: `容量 ${cap}` });
  stage.append(
    el('div', 'vibe-algo__lru-title', { text: `LRU · capacity=${cap}` }),
    opEl,
    el('div', 'vibe-algo__lru-lab', { text: '双向链表（左=新 · 右=旧）' }),
    list,
    el('div', 'vibe-algo__lru-lab', { text: 'HashMap key → 节点' }),
    map,
    status
  );
  return { stage, list, map, opEl, status, cap };
}

async function runLru(ui, spec, speed, signal, log) {
  ui.list.replaceChildren();
  ui.map.replaceChildren();
  /** @type {{key:string,val:string}[]} */
  const order = []; // index 0 = newest
  const map = new Map();
  const ops = Array.isArray(spec.ops) ? spec.ops : [];
  const sync = () => {
    ui.list.replaceChildren(
      ...order.map((n) => {
        const c = el('div', 'vibe-algo__lru-node', { text: `${n.key}:${n.val}` });
        return c;
      })
    );
    ui.map.replaceChildren(
      ...[...map.keys()].map((k) => el('div', 'vibe-algo__lru-mk', { text: k }))
    );
  };
  log('HashMap + 双向链表：get/put 均摊 O(1)');
  for (const step of ops) {
    const op = String(step.op || '');
    const key = String(step.key ?? '');
    const val = String(step.val ?? '');
    ui.opEl.textContent = op === 'get' ? `get(${key})` : `put(${key}, ${val})`;
    if (op === 'get') {
      if (!map.has(key)) {
        ui.status.textContent = '未命中';
      } else {
        const idx = order.findIndex((x) => x.key === key);
        const [node] = order.splice(idx, 1);
        order.unshift(node);
        ui.status.textContent = `命中 ${key} → 挪到最新`;
      }
    } else {
      if (map.has(key)) {
        const idx = order.findIndex((x) => x.key === key);
        order.splice(idx, 1);
      } else if (order.length >= ui.cap) {
        const old = order.pop();
        if (old) {
          map.delete(old.key);
          ui.status.textContent = `容量满：淘汰最旧 ${old.key}`;
          sync();
          log(ui.status.textContent);
          await sleep(speed, signal);
        }
      }
      order.unshift({ key, val });
      map.set(key, val);
      ui.status.textContent = `写入 ${key}`;
    }
    sync();
    ui.list.firstChild?.classList.add('is-active');
    log(ui.status.textContent);
    await sleep(speed, signal);
    ui.list.firstChild?.classList.remove('is-active');
  }
  ui.status.textContent = '面试默写：Map 存节点指针；链表维护顺序；超容删尾';
  await sleep(speed * 0.75, signal);
}

/** DSA · 拓扑排序 Kahn */
function topoStage(spec) {
  const stage = el('div', 'vibe-algo__topo');
  const nodes = Array.isArray(spec.nodes) ? spec.nodes.map(String) : ['A', 'B', 'C'];
  const edges = Array.isArray(spec.edges) ? spec.edges : [];
  const indeg = Object.fromEntries(nodes.map((n) => [n, 0]));
  const adj = Object.fromEntries(nodes.map((n) => [n, []]));
  for (const e of edges) {
    const [u, v] = e;
    if (u == null || v == null) continue;
    adj[String(u)]?.push(String(v));
    indeg[String(v)] = (indeg[String(v)] || 0) + 1;
  }
  const nodeEls = new Map();
  const row = el('div', 'vibe-algo__topo-nodes');
  for (const n of nodes) {
    const b = el('div', 'vibe-algo__topo-node');
    b.append(
      el('strong', '', { text: n }),
      el('span', 'vibe-algo__topo-deg', { text: `入度 ${indeg[n]}` })
    );
    row.append(b);
    nodeEls.set(n, b);
  }
  const qEl = el('div', 'vibe-algo__topo-q', { text: '队列：' });
  const outEl = el('div', 'vibe-algo__topo-out', { text: '顺序：' });
  const status = el('div', 'vibe-algo__topo-status', { text: 'Kahn…' });
  stage.append(row, qEl, outEl, status);
  return { stage, nodeEls, qEl, outEl, status, indeg: { ...indeg }, adj, nodes };
}

async function runTopo(ui, speed, signal, log) {
  const indeg = { ...ui.indeg };
  const adj = ui.adj;
  const q = ui.nodes.filter((n) => indeg[n] === 0);
  const out = [];
  for (const b of ui.nodeEls.values()) b.classList.remove('is-active', 'is-done', 'is-ready');
  log('拓扑：有向无环；入度为 0 入队');
  while (true) {
    ui.qEl.textContent = `队列：[${q.join(', ')}]`;
    ui.outEl.textContent = `顺序：${out.join(' → ') || '…'}`;
    for (const [id, eln] of ui.nodeEls) {
      eln.classList.toggle('is-ready', q.includes(id) && !out.includes(id));
      eln.querySelector('.vibe-algo__topo-deg').textContent = `入度 ${indeg[id]}`;
    }
    if (!q.length) break;
    const u = q.shift();
    out.push(u);
    ui.nodeEls.get(u)?.classList.add('is-active');
    ui.status.textContent = `取出 ${u}；邻接入度 -1`;
    log(ui.status.textContent);
    await sleep(speed, signal);
    for (const v of adj[u] || []) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
    ui.nodeEls.get(u)?.classList.replace('is-active', 'is-done');
    await sleep(speed * 0.55, signal);
  }
  const ok = out.length === ui.nodes.length;
  ui.outEl.textContent = `顺序：${out.join(' → ')}`;
  ui.status.textContent = ok
    ? '完成：课程表 / 依赖安装顺序同一套'
    : '未能排完 → 有环';
  log(ui.status.textContent);
  await sleep(speed * 0.8, signal);
}

/** DSA · 朴素串匹配 */
function strMatchStage(spec) {
  const stage = el('div', 'vibe-algo__sm');
  const text = String(spec.text || 'ABABCABAB');
  const pattern = String(spec.pattern || 'ABAB');
  const tRow = el('div', 'vibe-algo__sm-row');
  const pRow = el('div', 'vibe-algo__sm-row vibe-algo__sm-row--pat');
  const tCells = [...text].map((ch) => {
    const c = el('div', 'vibe-algo__sm-cell', { text: ch });
    tRow.append(c);
    return c;
  });
  const pCells = [...pattern].map((ch) => {
    const c = el('div', 'vibe-algo__sm-cell', { text: ch });
    pRow.append(c);
    return c;
  });
  const status = el('div', 'vibe-algo__sm-status', { text: '对齐…' });
  stage.append(
    el('div', 'vibe-algo__sm-lab', { text: '文本' }),
    tRow,
    el('div', 'vibe-algo__sm-lab', { text: '模式（朴素：失配则模式右移 1）' }),
    pRow,
    status
  );
  return { stage, tCells, pCells, status, text, pattern };
}

async function runStrMatch(ui, speed, signal, log) {
  const t = ui.text;
  const p = ui.pattern;
  log('暴力匹配：最坏 O(nm)；KMP 用前缀表避免回退浪费');
  let found = -1;
  for (let i = 0; i <= t.length - p.length; i++) {
    for (const c of ui.tCells) c.classList.remove('is-active', 'is-ok', 'is-bad');
    for (const c of ui.pCells) c.classList.remove('is-active', 'is-ok', 'is-bad');
    ui.status.textContent = `窗口起点 i=${i}`;
    let ok = true;
    for (let j = 0; j < p.length; j++) {
      ui.tCells[i + j]?.classList.add('is-active');
      ui.pCells[j]?.classList.add('is-active');
      const match = t[i + j] === p[j];
      ui.status.textContent = `比较 t[${i + j}]=${t[i + j]} 与 p[${j}]=${p[j]}`;
      log(ui.status.textContent);
      await sleep(speed * 0.7, signal);
      if (!match) {
        ui.tCells[i + j]?.classList.add('is-bad');
        ui.pCells[j]?.classList.add('is-bad');
        ok = false;
        await sleep(speed * 0.5, signal);
        break;
      }
      ui.tCells[i + j]?.classList.add('is-ok');
      ui.pCells[j]?.classList.add('is-ok');
    }
    if (ok) {
      found = i;
      ui.status.textContent = `命中 @ ${i}；工程用 indexOf / includes，面试知 KMP 思想`;
      break;
    }
  }
  if (found < 0) ui.status.textContent = '未命中';
  log(ui.status.textContent);
  await sleep(speed * 0.8, signal);
}



/** 面板 · 四层心智 */
function panelLayerStage(spec) {
  const stage = el('div', 'vibe-algo__pl');
  const layers = (Array.isArray(spec.layers) ? spec.layers : []).map((L) => {
    const b = el('div', 'vibe-algo__pl-layer');
    b.dataset.id = String(L.id || '');
    b.append(
      el('div', 'vibe-algo__pl-name', { text: String(L.name || '?') }),
      el('div', 'vibe-algo__pl-sub', { text: String(L.sub || '') })
    );
    return b;
  });
  const stack = el('div', 'vibe-algo__pl-stack');
  stack.append(...layers);
  const badge = el('div', 'vibe-algo__pl-badge', {
    text: '会点面板 ≠ 懂网关/进程；出问题按层排障',
  });
  const status = el('div', 'vibe-algo__pl-status', { text: '分层…' });
  stage.append(stack, badge, status);
  return { stage, layers, badge, status };
}

async function runPanelLayer(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('面板只是运维壳；底下仍是反代 / 进程 / 数据');
  for (const L of ui.layers) {
    L.classList.add('is-active');
    ui.status.textContent = L.querySelector('.vibe-algo__pl-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    L.classList.replace('is-active', 'is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '安全底线：改端口、强密码、白名单；勿裸奔面板口';
  await sleep(speed * 0.8, signal);
}

/** 宝塔路径 */
function btPathStage(spec) {
  const stage = el('div', 'vibe-algo__bt');
  const steps = (Array.isArray(spec.steps) ? spec.steps : []).map((s) => {
    const b = el('div', 'vibe-algo__bt-step');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__bt-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__bt-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__bt-row');
  row.append(...steps);
  const tip = el('div', 'vibe-algo__bt-tip', {
    text: '真源：docs.bt.cn · 默认常见 8888 · 立刻改端口/密码',
  });
  const status = el('div', 'vibe-algo__bt-status', { text: '宝塔路径…' });
  stage.append(row, tip, status);
  return { stage, steps, tip, status };
}

async function runBtPath(ui, speed, signal, log) {
  for (const s of ui.steps) s.classList.remove('is-active', 'is-done');
  ui.tip.classList.remove('is-on');
  log('宝塔：LNMP/站点心智；面板入口是高危面');
  for (const s of ui.steps) {
    s.classList.add('is-active');
    ui.status.textContent = s.querySelector('.vibe-algo__bt-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    s.classList.replace('is-active', 'is-done');
  }
  ui.tip.classList.add('is-on');
  ui.status.textContent = '本仓：反代到 127.0.0.1:PORT；业务仍在 Core';
  await sleep(speed * 0.8, signal);
}

/** 1Panel 路径 */
function onePathStage(spec) {
  const stage = el('div', 'vibe-algo__op');
  const steps = (Array.isArray(spec.steps) ? spec.steps : []).map((s) => {
    const b = el('div', 'vibe-algo__op-step');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__op-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__op-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__op-row');
  row.append(...steps);
  const tip = el('div', 'vibe-algo__op-tip', {
    text: '真源：1panel.cn/docs · 安全入口 + 1pctl · 仅 Linux',
  });
  const status = el('div', 'vibe-algo__op-status', { text: '1Panel 路径…' });
  stage.append(row, tip, status);
  return { stage, steps, tip, status };
}

async function runOnePath(ui, speed, signal, log) {
  for (const s of ui.steps) s.classList.remove('is-active', 'is-done');
  ui.tip.classList.remove('is-on');
  log('1Panel：容器/开源面板心智；入口路径降低扫描命中');
  for (const s of ui.steps) {
    s.classList.add('is-active');
    ui.status.textContent = s.querySelector('.vibe-algo__op-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    s.classList.replace('is-active', 'is-done');
  }
  ui.tip.classList.add('is-on');
  ui.status.textContent = '备份必须含数据卷；Windows 主机别默认选 1Panel';
  await sleep(speed * 0.8, signal);
}

/** 面板选型三选一 */
function panelPickStage(spec) {
  const stage = el('div', 'vibe-algo__pk');
  const picks = (Array.isArray(spec.picks) ? spec.picks : []).map((p) => {
    const b = el('div', 'vibe-algo__pk-card');
    b.dataset.id = String(p.id || '');
    b.append(
      el('div', 'vibe-algo__pk-name', { text: String(p.name || '?') }),
      el('div', 'vibe-algo__pk-sub', { text: String(p.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__pk-row');
  row.append(...picks);
  const status = el('div', 'vibe-algo__pk-status', { text: '看约束选型…' });
  stage.append(row, status);
  return { stage, picks, status };
}

async function runPanelPick(ui, speed, signal, log) {
  for (const p of ui.picks) p.classList.remove('is-active', 'is-done', 'is-dim');
  const story = [
    { id: 'bt', msg: '一人最快出站、海量教程 → 宝塔可行' },
    { id: 'one', msg: 'Linux + 容器/开源可审计 → 1Panel 更贴' },
    { id: 'ssh', msg: '多环境 GitOps / 团队协作 → 面板可选甚至不要' },
  ];
  log('选型看约束，不看广告星标');
  for (const step of story) {
    for (const p of ui.picks) {
      p.classList.toggle('is-active', p.dataset.id === step.id);
      p.classList.toggle('is-dim', p.dataset.id !== step.id);
    }
    ui.status.textContent = step.msg;
    log(step.msg);
    await sleep(speed, signal);
  }
  for (const p of ui.picks) {
    p.classList.remove('is-dim', 'is-active');
    p.classList.add('is-done');
  }
  ui.status.textContent = '面板不缩短清单：Node≥26、pnpm、Redis、反代、备份仍在';
  await sleep(speed * 0.8, signal);
}

/** 面板反代到 Node */
function nodeRproxyStage(spec) {
  const stage = el('div', 'vibe-algo__nr');
  const hops = (Array.isArray(spec.hops) ? spec.hops : []).map((h) => {
    const b = el('div', 'vibe-algo__nr-hop');
    b.dataset.id = String(h.id || '');
    b.append(
      el('div', 'vibe-algo__nr-name', { text: String(h.name || '?') }),
      el('div', 'vibe-algo__nr-sub', { text: String(h.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__nr-row');
  for (let i = 0; i < hops.length; i++) {
    row.append(hops[i]);
    if (i < hops.length - 1) row.append(el('div', 'vibe-algo__nr-arrow', { text: '→' }));
  }
  const pkt = el('div', 'vibe-algo__nr-pkt', { text: 'REQ' });
  pkt.hidden = true;
  const warn = el('div', 'vibe-algo__nr-warn', {
    text: '勿把业务端口对公网裸奔；只暴露 80/443',
  });
  const status = el('div', 'vibe-algo__nr-status', { text: '反代链路…' });
  stage.append(row, pkt, warn, status);
  return { stage, hops, pkt, warn, status };
}

async function runNodeRproxy(ui, speed, signal, log) {
  for (const h of ui.hops) h.classList.remove('is-active', 'is-done');
  ui.warn.classList.remove('is-on');
  ui.pkt.hidden = false;
  log('用户只打 HTTPS；面板/Nginx 转到本机 Node');
  for (const h of ui.hops) {
    h.classList.add('is-active');
    ui.pkt.textContent = h.dataset.id === 'loop' ? '127.0.0.1' : h.dataset.id === 'app' ? 'XRK' : 'HTTPS';
    ui.status.textContent = h.querySelector('.vibe-algo__nr-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    h.classList.replace('is-active', 'is-done');
  }
  ui.warn.classList.add('is-on');
  ui.pkt.hidden = true;
  ui.status.textContent = '先 SSH 跑通 node app，再配反代与证书';
  await sleep(speed * 0.8, signal);
}



/** 主机运维 · systemd 生命周期 */
function sysdUnitStage(spec) {
  const stage = el('div', 'vibe-algo__sd');
  const steps = (Array.isArray(spec.steps) ? spec.steps : []).map((s) => {
    const b = el('div', 'vibe-algo__sd-step');
    b.dataset.id = String(s.id || '');
    b.append(
      el('div', 'vibe-algo__sd-name', { text: String(s.name || '?') }),
      el('div', 'vibe-algo__sd-sub', { text: String(s.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__sd-row');
  row.append(...steps);
  const tip = el('div', 'vibe-algo__sd-tip', {
    text: '改 unit 后必须 daemon-reload；enable ≠ 已在跑',
  });
  const status = el('div', 'vibe-algo__sd-status', { text: 'systemd…' });
  stage.append(row, tip, status);
  return { stage, steps, tip, status };
}

async function runSysdUnit(ui, speed, signal, log) {
  for (const s of ui.steps) s.classList.remove('is-active', 'is-done');
  ui.tip.classList.remove('is-on');
  log('真源：systemd.unit(5) / systemctl — 写 unit → reload → enable → start → 日志');
  for (const s of ui.steps) {
    s.classList.add('is-active');
    ui.status.textContent = s.querySelector('.vibe-algo__sd-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    s.classList.replace('is-active', 'is-done');
  }
  ui.tip.classList.add('is-on');
  ui.status.textContent = '本仓：WorkingDirectory=仓库根；ExecStart=绝对路径 node app';
  await sleep(speed * 0.8, signal);
}

/** 主机运维 · TLS 三角路径 */
function tlsTriStage(spec) {
  const stage = el('div', 'vibe-algo__tt');
  const hops = (Array.isArray(spec.hops) ? spec.hops : []).map((h) => {
    const b = el('div', 'vibe-algo__tt-hop');
    b.dataset.id = String(h.id || '');
    b.append(
      el('div', 'vibe-algo__tt-name', { text: String(h.name || '?') }),
      el('div', 'vibe-algo__tt-sub', { text: String(h.sub || '') })
    );
    return b;
  });
  const row = el('div', 'vibe-algo__tt-row');
  for (let i = 0; i < hops.length; i++) {
    row.append(hops[i]);
    if (i < hops.length - 1) row.append(el('div', 'vibe-algo__tt-arrow', { text: '→' }));
  }
  const tip = el('div', 'vibe-algo__tt-tip', {
    text: '申请失败最多：DNS 未指到本机 / 80 未放行',
  });
  const status = el('div', 'vibe-algo__tt-status', { text: 'TLS…' });
  stage.append(row, tip, status);
  return { stage, hops, tip, status };
}

async function runTlsTri(ui, speed, signal, log) {
  for (const h of ui.hops) h.classList.remove('is-active', 'is-done');
  ui.tip.classList.remove('is-on');
  log('DNS → 端口 → ACME → 网关终止 → 回源本机 Node');
  for (const h of ui.hops) {
    h.classList.add('is-active');
    ui.status.textContent = h.querySelector('.vibe-algo__tt-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    h.classList.replace('is-active', 'is-done');
  }
  ui.tip.classList.add('is-on');
  ui.status.textContent = '私钥留服务器；续期记下面板自动还是 cron';
  await sleep(speed * 0.8, signal);
}

/** 主机运维 · 备份三分法 + 演练 */
function bakDrillStage(spec) {
  const stage = el('div', 'vibe-algo__bk');
  const buckets = (Array.isArray(spec.buckets) ? spec.buckets : []).map((b) => {
    const elb = el('div', 'vibe-algo__bk-bucket');
    elb.dataset.id = String(b.id || '');
    elb.append(
      el('div', 'vibe-algo__bk-name', { text: String(b.name || '?') }),
      el('div', 'vibe-algo__bk-sub', { text: String(b.sub || '') })
    );
    return elb;
  });
  const row = el('div', 'vibe-algo__bk-row');
  row.append(...buckets);
  const path = el('div', 'vibe-algo__bk-path');
  const local = el('div', 'vibe-algo__bk-dest', { text: '本机副本' });
  const off = el('div', 'vibe-algo__bk-dest vibe-algo__bk-dest--off', { text: '异地副本' });
  const drill = el('div', 'vibe-algo__bk-dest vibe-algo__bk-dest--drill', { text: '恢复演练' });
  path.append(local, el('span', 'vibe-algo__bk-arrow', { text: '→' }), off, el('span', 'vibe-algo__bk-arrow', { text: '→' }), drill);
  const tip = el('div', 'vibe-algo__bk-tip', {
    text: '没测过恢复的备份 = 安慰剂；卷/库常被「网站备份」漏掉',
  });
  const status = el('div', 'vibe-algo__bk-status', { text: '备份…' });
  stage.append(row, path, tip, status);
  return { stage, buckets, local, off, drill, tip, status };
}

async function runBakDrill(ui, speed, signal, log) {
  for (const b of ui.buckets) b.classList.remove('is-active', 'is-done');
  for (const d of [ui.local, ui.off, ui.drill]) d.classList.remove('is-on');
  ui.tip.classList.remove('is-on');
  log('三分法：代码 / 配置密钥 / 数据');
  for (const b of ui.buckets) {
    b.classList.add('is-active');
    ui.status.textContent = b.querySelector('.vibe-algo__bk-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    b.classList.replace('is-active', 'is-done');
  }
  ui.local.classList.add('is-on');
  ui.status.textContent = '定时落到本机另一路径';
  await sleep(speed * 0.7, signal);
  ui.off.classList.add('is-on');
  ui.status.textContent = '异地一份（对象存储/另一台机）';
  await sleep(speed * 0.7, signal);
  ui.drill.classList.add('is-on');
  ui.tip.classList.add('is-on');
  ui.status.textContent = '本仓：data/ · Redis · 上传 · ai-workspace 进清单';
  await sleep(speed * 0.8, signal);
}



/** AI 编程工具 · Vibe 五拍 */
function vibeFiveStage(spec) {
  const stage = el('div', 'vibe-algo__vf');
  const beats = (Array.isArray(spec.beats) ? spec.beats : []).map((b) => {
    const elb = el('div', 'vibe-algo__vf-beat');
    elb.dataset.id = String(b.id || '');
    elb.append(
      el('div', 'vibe-algo__vf-name', { text: String(b.name || '?') }),
      el('div', 'vibe-algo__vf-sub', { text: String(b.sub || '') })
    );
    return elb;
  });
  const row = el('div', 'vibe-algo__vf-row');
  row.append(...beats);
  const tip = el('div', 'vibe-algo__vf-tip', {
    text: '能跑 ≠ 可靠；Accept 前看 diff；高危命令你点头',
  });
  const status = el('div', 'vibe-algo__vf-status', { text: '五拍…' });
  stage.append(row, tip, status);
  return { stage, beats, tip, status };
}

async function runVibeFive(ui, speed, signal, log) {
  for (const b of ui.beats) b.classList.remove('is-active', 'is-done');
  ui.tip.classList.remove('is-on');
  log('路径 A：目标 → 现场 → 约束 → 验收 → 审 diff');
  for (const b of ui.beats) {
    b.classList.add('is-active');
    ui.status.textContent = b.querySelector('.vibe-algo__vf-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    b.classList.replace('is-active', 'is-done');
  }
  ui.tip.classList.add('is-on');
  ui.status.textContent = '造/懂 Agent 应用走第五章；本框只钉会用 Coding Agent';
  await sleep(speed * 0.8, signal);
}

/** AI 编程工具 · 四形态 */
function adevFormStage(spec) {
  const stage = el('div', 'vibe-algo__af');
  const forms = (Array.isArray(spec.forms) ? spec.forms : []).map((f) => {
    const elb = el('div', 'vibe-algo__af-card');
    elb.dataset.id = String(f.id || '');
    elb.append(
      el('div', 'vibe-algo__af-name', { text: String(f.name || '?') }),
      el('div', 'vibe-algo__af-sub', { text: String(f.sub || '') })
    );
    return elb;
  });
  const row = el('div', 'vibe-algo__af-row');
  row.append(...forms);
  const harness = el('div', 'vibe-algo__af-harness', {
    text: 'Harness = Instructions + Tools + Model（换品牌换壳，交底同一事实）',
  });
  const status = el('div', 'vibe-algo__af-status', { text: '形态…' });
  stage.append(row, harness, status);
  return { stage, forms, harness, status };
}

async function runAdevForm(ui, speed, signal, log) {
  for (const f of ui.forms) f.classList.remove('is-active', 'is-done', 'is-dim');
  ui.harness.classList.remove('is-on');
  log('先分形态，再查品牌');
  const story = [
    { id: 'ide', msg: '本仓日常改代码 → AI IDE，Accept 前看 diff' },
    { id: 'cli', msg: '纯 SSH / CI 一句 → Agent CLI' },
    { id: 'cloud', msg: '异步出 PR → 云端 Agent' },
    { id: 'oss', msg: '换模型 / 自托管 → 开源 Harness' },
  ];
  for (const step of story) {
    for (const f of ui.forms) {
      f.classList.toggle('is-active', f.dataset.id === step.id);
      f.classList.toggle('is-dim', f.dataset.id !== step.id);
    }
    ui.status.textContent = step.msg;
    log(step.msg);
    await sleep(speed, signal);
  }
  for (const f of ui.forms) {
    f.classList.remove('is-dim', 'is-active');
    f.classList.add('is-done');
  }
  ui.harness.classList.add('is-on');
  ui.status.textContent = '本仓禁区与 pnpm 写进 AGENTS.md，不跟广告走';
  await sleep(speed * 0.8, signal);
}

/** AI 编程工具 · 项目记忆分层 */
function memFilesStage(spec) {
  const stage = el('div', 'vibe-algo__mf');
  const layers = (Array.isArray(spec.layers) ? spec.layers : []).map((L) => {
    const b = el('div', 'vibe-algo__mf-layer');
    b.dataset.id = String(L.id || '');
    b.append(
      el('div', 'vibe-algo__mf-name', { text: String(L.name || '?') }),
      el('div', 'vibe-algo__mf-sub', { text: String(L.sub || '') })
    );
    return b;
  });
  const stack = el('div', 'vibe-algo__mf-stack');
  stack.append(...layers);
  const tip = el('div', 'vibe-algo__mf-tip', {
    text: '两套文件事实相反 = 灾难；密钥永不进仓',
  });
  const status = el('div', 'vibe-algo__mf-status', { text: '交底…' });
  stage.append(stack, tip, status);
  return { stage, layers, tip, status };
}

async function runMemFiles(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.tip.classList.remove('is-on');
  log('会话会忘；Git 可审；换工具靠文件交底');
  for (const L of ui.layers) {
    L.classList.add('is-active');
    ui.status.textContent = L.querySelector('.vibe-algo__mf-name')?.textContent || '';
    log(ui.status.textContent);
    await sleep(speed, signal);
    L.classList.replace('is-active', 'is-done');
  }
  ui.tip.classList.add('is-on');
  ui.status.textContent = '本仓：根 AGENTS.md + .cursor/rules；禁区与 Node≥26 优先写';
  await sleep(speed * 0.8, signal);
}


export function mountAlgoViz(host, cfg) {
  host.textContent = '';
  host.classList.add('vibe-algo');

  const root = el('div', 'vibe-algo__card');
  root.append(el('div', 'vibe-algo__title', { text: cfg.title }));
  if (cfg.caption) root.append(el('p', 'vibe-algo__caption', { text: cfg.caption }));

  const logEl = el('div', 'vibe-algo__log', { text: '点击「播放」开始演示' });
  const controls = el('div', 'vibe-algo__controls');
  const btn = el('button', 'vibe-algo__btn', {
    type: 'button',
    text: '播放',
    'aria-label': `播放：${cfg.title}`,
  });
  controls.append(btn);

  const kind = cfg.kind;
  let stageWrap = el('div', 'vibe-algo__stage');

  function showIdle(msg = '动画待命 · 点下方按钮播放') {
    const idle = el('div', 'vibe-algo__idle', { text: msg });
    stageWrap.replaceChildren(idle);
  }

  showIdle();
  /** @type {AbortController | null} */
  let ac = null;

  const log = (msg) => {
    logEl.textContent = msg;
  };

  async function play() {
    ac?.abort();
    ac = new AbortController();
    const { signal } = ac;
    btn.disabled = true;
    btn.textContent = '播放中…';
    stageWrap.replaceChildren();
    stageWrap.classList.add('is-playing');
    try {
      const reduced = prefersReducedMotion();
      const speed = reduced ? 0 : cfg.speed;

      if (['bubble', 'insertion', 'selection', 'quick', 'merge', 'heap', 'heapsort', 'binsearch', 'binary'].includes(kind)) {
        const arr = Array.isArray(cfg.data) ? cfg.data.map(Number) : [5, 2, 8, 1, 9, 3];
        const { stage, cells } = barStage(arr);
        stageWrap.append(stage);
        if (kind === 'bubble') await runBubble(cells, arr, speed, signal, log);
        else if (kind === 'insertion') await runInsertion(cells, arr, speed, signal, log);
        else if (kind === 'selection') await runSelection(cells, arr, speed, signal, log);
        else if (kind === 'quick') await runQuick(cells, arr, speed, signal, log);
        else if (kind === 'merge') await runMerge(cells, arr, speed, signal, log);
        else if (kind === 'heap' || kind === 'heapsort') await runHeap(cells, arr, speed, signal, log);
        else await runBinary(cells, arr, speed, signal, log);
      } else if (kind === 'bfs' || kind === 'dfs') {
        const grid = gridStage(cfg.data && typeof cfg.data === 'object' ? cfg.data : {});
        stageWrap.append(grid.stage);
        if (kind === 'bfs') await runBfs(grid, speed, signal, log);
        else await runDfs(grid, speed, signal, log);
      } else if (kind === 'list' || kind === 'll-reverse') {
        const vals = Array.isArray(cfg.data) ? cfg.data : [1, 2, 3, 4, 5];
        const list = listStage(vals);
        stageWrap.append(list.stage);
        await runListReverse(list, speed, signal, log);
      } else if (kind === 'uf' || kind === 'union-find') {
        const spec = cfg.data && typeof cfg.data === 'object' ? cfg.data : { n: 6, unions: [] };
        const uf = ufStage(Number(spec.n) || 6);
        stageWrap.append(uf.stage);
        await runUf(uf, spec.unions || [], speed, signal, log);
      } else if (kind === 'gd' || kind === 'gradient') {
        const gd = gdStage();
        stageWrap.append(gd.stage);
        await runGd(gd, cfg.data || {}, speed, signal, log);
      } else if (kind === 'scheduler' || kind === 'rr' || kind === 'timeslice') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data)
            ? cfg.data
            : {
                quantum: 2,
                procs: [
                  { id: 'A', burst: 5 },
                  { id: 'B', burst: 3 },
                  { id: 'C', burst: 4 },
                ],
              };
        const procs = Array.isArray(spec.procs) ? spec.procs : [];
        const sched = schedulerStage(
          procs.length
            ? procs.map((p) => ({ id: String(p.id ?? '?'), burst: Math.max(1, Number(p.burst) || 1) }))
            : [
                { id: 'A', burst: 5 },
                { id: 'B', burst: 3 },
                { id: 'C', burst: 4 },
              ]
        );
        stageWrap.append(sched.stage);
        await runScheduler(sched, spec, speed, signal, log);
      } else if (kind === 'memhier' || kind === 'memory' || kind === 'hierarchy') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const levels = Array.isArray(spec.levels)
          ? spec.levels
          : [
              { id: 'reg', name: '寄存器', lat: '~1 周期', size: '极小' },
              { id: 'cache', name: 'Cache', lat: '~数周期', size: 'KB～MB' },
              { id: 'ram', name: '内存 RAM', lat: '~百 ns', size: 'GB' },
              { id: 'disk', name: '磁盘', lat: '~μs～ms', size: 'TB' },
            ];
        const mem = memHierStage(
          levels.map((lv) => ({
            id: String(lv.id ?? lv.name ?? ''),
            name: String(lv.name ?? lv.id ?? '?'),
            lat: String(lv.lat ?? '—'),
            size: String(lv.size ?? '—'),
          }))
        );
        stageWrap.append(mem.stage);
        await runMemHier(mem, speed, signal, log);
      } else if (kind === 'pathfind' || kind === 'which' || kind === 'path') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const cmd = String(spec.cmd || 'node');
        const dirs = Array.isArray(spec.dirs)
          ? spec.dirs
          : [
              { path: '/usr/local/bin', hit: false },
              { path: '/usr/bin', hit: true },
              { path: '/bin', hit: false },
            ];
        const pf = pathFindStage(
          dirs.map((d) => ({ path: String(d.path ?? ''), hit: Boolean(d.hit) })),
          cmd
        );
        stageWrap.append(pf.stage);
        await runPathFind(pf, speed, signal, log);
      } else if (kind === 'gitstage' || kind === 'git-areas' || kind === 'staging') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const files = Array.isArray(spec.files)
          ? spec.files.map((f) => ({
              name: String(f.name ?? 'file'),
              mark: String(f.mark ?? 'M'),
            }))
          : [
              { name: 'app.js', mark: 'M' },
              { name: 'note.md', mark: '?' },
            ];
        const gs = gitStageStage(files);
        stageWrap.append(gs.stage);
        await runGitStage(gs, spec, speed, signal, log);
      } else if (kind === 'gitclone' || kind === 'clone') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const cl = gitCloneStage({
          repo: String(spec.repo || 'XRK-AGT.git'),
          entries: Array.isArray(spec.entries)
            ? spec.entries.map(String)
            : ['.git/', 'package.json', 'pnpm-lock.yaml', 'src/', 'README.md'],
          fail: Boolean(spec.fail),
        });
        stageWrap.append(cl.stage);
        await runGitClone(cl, spec, speed, signal, log);
      } else if (kind === 'gitbranch' || kind === 'branch' || kind === 'mergeviz') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const br = gitBranchStage({
          mode: spec.mode,
          main: Array.isArray(spec.main) ? spec.main.map(String) : ['c0', 'c1', 'c2'],
          feat: Array.isArray(spec.feat) ? spec.feat.map(String) : ['f1', 'f2'],
        });
        stageWrap.append(br.stage);
        await runGitBranch(br, spec, speed, signal, log);
      } else if (kind === 'eventloop' || kind === 'eloop' || kind === 'microtask') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = eventLoopStage();
        stageWrap.append(ui.stage);
        await runEventLoop(ui, spec, speed, signal, log);
      } else if (kind === 'dualhost' || kind === 'hosts' || kind === 'runtime-split') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const apis = Array.isArray(spec.apis)
          ? spec.apis.map((a) => ({
              name: String(a.name ?? '?'),
              browser: Boolean(a.browser),
              node: Boolean(a.node),
            }))
          : [
              { name: 'document.querySelector', browser: true, node: false },
              { name: 'fs.readFile', browser: false, node: true },
              { name: 'fetch', browser: true, node: true },
              { name: 'process.env', browser: false, node: true },
            ];
        const ui = dualHostStage(apis);
        stageWrap.append(ui.stage);
        await runDualHost(ui, speed, signal, log);
      } else if (kind === 'tserase' || kind === 'tsc' || kind === 'typestrip') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tsEraseStage({
          source: String(spec.source || 'function add(a: number, b: number): number'),
          erased: String(spec.erased || 'function add(a, b)'),
          run: String(spec.run || 'node add.js → 3'),
        });
        stageWrap.append(ui.stage);
        await runTsErase(ui, speed, signal, log);
      } else if (kind === 'tcphandshake' || kind === 'tcp3way' || kind === 'synack') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tcpHandshakeStage(spec);
        stageWrap.append(ui.stage);
        await runTcpHandshake(ui, speed, signal, log);
      } else if (kind === 'dnsresolve' || kind === 'dns' || kind === 'lookup') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = dnsResolveStage(spec);
        stageWrap.append(ui.stage);
        await runDnsResolve(ui, speed, signal, log);
      } else if (kind === 'revproxy' || kind === 'rproxy' || kind === 'proxyflow') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = revProxyStage(spec);
        stageWrap.append(ui.stage);
        await runRevProxy(ui, speed, signal, log);
      } else if (kind === 'proxyroute' || kind === 'fwdproxy' || kind === 'clashroute') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = proxyRouteStage(spec);
        stageWrap.append(ui.stage);
        await runProxyRoute(ui, speed, signal, log);
      } else if (kind === 'xrklayers' || kind === 'xrkflow' || kind === 'corelayers') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = xrkLayersStage(spec);
        stageWrap.append(ui.stage);
        await runXrkLayers(ui, speed, signal, log);
      } else if (kind === 'httpresp' || kind === 'httpshape' || kind === 'unwrap') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = httpRespStage(spec);
        stageWrap.append(ui.stage);
        await runHttpResp(ui, speed, signal, log);
      } else if (kind === 'msgpipe' || kind === 'assemble' || kind === 'chatpipe') {
        const ui = msgPipeStage();
        stageWrap.append(ui.stage);
        await runMsgPipe(ui, speed, signal, log);
      } else if (kind === 'taskerflow' || kind === 'channel' || kind === 'e-flow') {
        const ui = taskerFlowStage();
        stageWrap.append(ui.stage);
        await runTaskerFlow(ui, speed, signal, log);
      } else if (kind === 'authgate' || kind === 'apikey' || kind === 'gate') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = authGateStage(spec);
        stageWrap.append(ui.stage);
        await runAuthGate(ui, speed, signal, log);
      } else if (kind === 'toolloop' || kind === 'mcploop' || kind === 'agentloop') {
        const ui = toolLoopStage();
        stageWrap.append(ui.stage);
        await runToolLoop(ui, speed, signal, log);
      } else if (kind === 'dbtier' || kind === 'redisql' || kind === 'hotdisk') {
        const ui = dbTierStage();
        stageWrap.append(ui.stage);
        await runDbTier(ui, speed, signal, log);
      } else if (kind === 'sqlcrud' || kind === 'sqlfour' || kind === 'crud') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = sqlCrudStage(spec);
        stageWrap.append(ui.stage);
        await runSqlCrud(ui, speed, signal, log);
      } else if (kind === 'dbserve' || kind === 'embedvs' || kind === 'csvsemb') {
        const ui = dbServeStage();
        stageWrap.append(ui.stage);
        await runDbServe(ui, speed, signal, log);
      } else if (kind === 'ctrvm' || kind === 'containervm' || kind === 'vsvm') {
        const ui = ctrVmStage();
        stageWrap.append(ui.stage);
        await runCtrVm(ui, speed, signal, log);
      } else if (kind === 'imglayer' || kind === 'dockerlayer' || kind === 'layers') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = imgLayerStage(spec);
        stageWrap.append(ui.stage);
        await runImgLayer(ui, speed, signal, log);
      } else if (kind === 'composestack' || kind === 'composeup' || kind === 'svcstack') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = composeStackStage(spec);
        stageWrap.append(ui.stage);
        await runComposeStack(ui, speed, signal, log);
      } else if (kind === 'opstier' || kind === 'containertier' || kind === 'runtier') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = opsTierStage(spec);
        stageWrap.append(ui.stage);
        await runOpsTier(ui, speed, signal, log);
      } else if (kind === 'dirrole' || kind === 'fhsmap' || kind === 'pathrole') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = dirRoleStage(spec);
        stageWrap.append(ui.stage);
        await runDirRole(ui, speed, signal, log);
      } else if (kind === 'dothide' || kind === 'dotfiles' || kind === 'hideviz') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = dotHideStage(spec);
        stageWrap.append(ui.stage);
        await runDotHide(ui, speed, signal, log);
      } else if (kind === 'mcuvspc' || kind === 'mcuhost' || kind === 'mcupc') {
        const ui = mcuVsPcStage();
        stageWrap.append(ui.stage);
        await runMcuVsPc(ui, speed, signal, log);
      } else if (kind === 'espboard' || kind === 'espmod' || kind === 'socboard') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = espBoardStage(spec);
        stageWrap.append(ui.stage);
        await runEspBoard(ui, speed, signal, log);
      } else if (kind === 'flashpipe' || kind === 'idfflash' || kind === 'burnfw') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = flashPipeStage(spec);
        stageWrap.append(ui.stage);
        await runFlashPipe(ui, speed, signal, log);
      } else if (kind === 'edgelink' || kind === 'espcloud' || kind === 'devagent') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = edgeLinkStage(spec);
        stageWrap.append(ui.stage);
        await runEdgeLink(ui, speed, signal, log);
      } else if (kind === 'debugloop' || kind === 'reprobe' || kind === 'dbgloop') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = debugLoopStage(spec);
        stageWrap.append(ui.stage);
        await runDebugLoop(ui, speed, signal, log);
      } else if (kind === 'secbase' || kind === 'owaspbase' || kind === 'craftsec') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = secBaseStage(spec);
        stageWrap.append(ui.stage);
        await runSecBase(ui, speed, signal, log);
      } else if (kind === 'testpyra' || kind === 'pyramid' || kind === 'testtiers') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = testPyraStage(spec);
        stageWrap.append(ui.stage);
        await runTestPyra(ui, speed, signal, log);
      } else if (kind === 'obspillar' || kind === 'lmt' || kind === 'threeobs') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = obsPillarStage(spec);
        stageWrap.append(ui.stage);
        await runObsPillar(ui, speed, signal, log);
      } else if (kind === 'cipipe' || kind === 'cigreen' || kind === 'workflow') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = ciPipeStage(spec);
        stageWrap.append(ui.stage);
        await runCiPipe(ui, speed, signal, log);
      } else if (kind === 'wsfive' || kind === 'workspace' || kind === 'inject5') {
        const ui = wsFiveStage();
        stageWrap.append(ui.stage);
        await runWsFive(ui, speed, signal, log);
      } else if (kind === 'uipatch' || kind === 'reactivity' || kind === 'vdom') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = uiPatchStage(spec);
        stageWrap.append(ui.stage);
        await runUiPatch(ui, speed, signal, log);
      } else if (kind === 'mwchain' || kind === 'middleware' || kind === 'reqpipe') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = mwChainStage(spec);
        stageWrap.append(ui.stage);
        await runMwChain(ui, speed, signal, log);
      } else if (kind === 'ssrflow' || kind === 'hydrate' || kind === 'nextssr') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = ssrFlowStage(spec);
        stageWrap.append(ui.stage);
        await runSsrFlow(ui, speed, signal, log);
      } else if (kind === 'tokbudget' || kind === 'ctxwin' || kind === 'tokenwin') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tokBudgetStage(spec);
        stageWrap.append(ui.stage);
        await runTokBudget(ui, speed, signal, log);
      } else if (kind === 'attnmap' || kind === 'attention' || kind === 'qkv') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = attnMapStage(spec);
        stageWrap.append(ui.stage);
        await runAttnMap(ui, speed, signal, log);
      } else if (kind === 'tfstack' || kind === 'transformer' || kind === 'tfblock') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tfStackStage(spec);
        stageWrap.append(ui.stage);
        await runTfStack(ui, speed, signal, log);
      } else if (kind === 'iclpath' || kind === 'fewshot' || kind === 'adaptladder') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = iclPathStage(spec);
        stageWrap.append(ui.stage);
        await runIclPath(ui, speed, signal, log);
      } else if (kind === 'msgroles' || kind === 'chatmsg' || kind === 'roles') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = msgRolesStage(spec);
        stageWrap.append(ui.stage);
        await runMsgRoles(ui, speed, signal, log);
      } else if (kind === 'dagflow' || kind === 'agentgraph' || kind === 'plandag') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = dagFlowStage(spec);
        stageWrap.append(ui.stage);
        await runDagFlow(ui, speed, signal, log);
      } else if (kind === 'ragpipe' || kind === 'ragflow' || kind === 'retrieve') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = ragPipeStage(spec);
        stageWrap.append(ui.stage);
        await runRagPipe(ui, speed, signal, log);
      } else if (kind === 'embnear' || kind === 'vecnear' || kind === 'knn') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = embNearStage(spec);
        stageWrap.append(ui.stage);
        await runEmbNear(ui, speed, signal, log);
      } else if (kind === 'chunksplit' || kind === 'chunking' || kind === 'splitdoc') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = chunkSplitStage(spec);
        stageWrap.append(ui.stage);
        await runChunkSplit(ui, speed, signal, log);
      } else if (kind === 'hybridret' || kind === 'hybrid' || kind === 'rrfuse') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = hybridRetStage(spec);
        stageWrap.append(ui.stage);
        await runHybridRet(ui, speed, signal, log);
      } else if (kind === 'tameinj' || kind === 'ruleskill' || kind === 'tameface') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tameInjStage(spec);
        stageWrap.append(ui.stage);
        await runTameInj(ui, speed, signal, log);
      } else if (kind === 'secgate' || kind === 'promptsec' || kind === 'injectgate') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = secGateStage(spec);
        stageWrap.append(ui.stage);
        await runSecGate(ui, speed, signal, log);
      } else if (kind === 'bigo' || kind === 'big-o' || kind === 'complexity') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = bigOStage(spec);
        stageWrap.append(ui.stage);
        await runBigO(ui, spec, speed, signal, log);
      } else if (kind === 'stackq' || kind === 'stackqueue' || kind === 'lifofifo') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = stackQStage(spec);
        stageWrap.append(ui.stage);
        await runStackQ(ui, speed, signal, log);
      } else if (kind === 'hashslot' || kind === 'hashtable' || kind === 'hashviz') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = hashSlotStage(spec);
        stageWrap.append(ui.stage);
        await runHashSlot(ui, spec, speed, signal, log);
      } else if (kind === 'bsttrav' || kind === 'bst' || kind === 'treetraverse') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = bstTravStage(spec);
        stageWrap.append(ui.stage);
        await runBstTrav(ui, speed, signal, log);
      } else if (kind === 'callstack' || kind === 'recurseviz' || kind === 'stackframes') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = callStackStage();
        stageWrap.append(ui.stage);
        await runCallStack(ui, spec, speed, signal, log);
      } else if (kind === 'dptable' || kind === 'climbstairs' || kind === 'dpfill') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = dpTableStage(spec);
        stageWrap.append(ui.stage);
        await runDpTable(ui, speed, signal, log);
      } else if (kind === 'bitsop' || kind === 'bitclear' || kind === 'hamming') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = bitsOpStage(spec);
        stageWrap.append(ui.stage);
        await runBitsOp(ui, speed, signal, log);
      } else if (kind === 'lrucache' || kind === 'lru' || kind === 'cacheevict') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = lruStage(spec);
        stageWrap.append(ui.stage);
        await runLru(ui, spec, speed, signal, log);
      } else if (kind === 'topo' || kind === 'topsort' || kind === 'kahn') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = topoStage(spec);
        stageWrap.append(ui.stage);
        await runTopo(ui, speed, signal, log);
      } else if (kind === 'strmatch' || kind === 'naivefind' || kind === 'strstr') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = strMatchStage(spec);
        stageWrap.append(ui.stage);
        await runStrMatch(ui, speed, signal, log);
      } else if (kind === 'panellayer' || kind === 'paneltier' || kind === 'hostpanel') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = panelLayerStage(spec);
        stageWrap.append(ui.stage);
        await runPanelLayer(ui, speed, signal, log);
      } else if (kind === 'btpath' || kind === 'baotapath' || kind === 'btflow') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = btPathStage(spec);
        stageWrap.append(ui.stage);
        await runBtPath(ui, speed, signal, log);
      } else if (kind === 'onepath' || kind === '1ppath' || kind === 'oneflow') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = onePathStage(spec);
        stageWrap.append(ui.stage);
        await runOnePath(ui, speed, signal, log);
      } else if (kind === 'panelpick' || kind === 'panelvs' || kind === 'btvs1p') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = panelPickStage(spec);
        stageWrap.append(ui.stage);
        await runPanelPick(ui, speed, signal, log);
      } else if (kind === 'noderproxy' || kind === 'panelnode' || kind === 'xrkproxy') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = nodeRproxyStage(spec);
        stageWrap.append(ui.stage);
        await runNodeRproxy(ui, speed, signal, log);
      } else if (kind === 'sysdunit' || kind === 'systemd' || kind === 'unitlife') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = sysdUnitStage(spec);
        stageWrap.append(ui.stage);
        await runSysdUnit(ui, speed, signal, log);
      } else if (kind === 'tlstri' || kind === 'acmeflow' || kind === 'certpath') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tlsTriStage(spec);
        stageWrap.append(ui.stage);
        await runTlsTri(ui, speed, signal, log);
      } else if (kind === 'bakdrill' || kind === 'backup3' || kind === 'restore') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = bakDrillStage(spec);
        stageWrap.append(ui.stage);
        await runBakDrill(ui, speed, signal, log);
      } else if (kind === 'vibefive' || kind === 'fivebeat' || kind === 'vibebeat') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = vibeFiveStage(spec);
        stageWrap.append(ui.stage);
        await runVibeFive(ui, speed, signal, log);
      } else if (kind === 'adevform' || kind === 'harness3' || kind === 'toolform') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = adevFormStage(spec);
        stageWrap.append(ui.stage);
        await runAdevForm(ui, speed, signal, log);
      } else if (kind === 'memfiles' || kind === 'agentsmd' || kind === 'projmem') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = memFilesStage(spec);
        stageWrap.append(ui.stage);
        await runMemFiles(ui, speed, signal, log);
      } else if (kind === 'twopointer' || kind === 'window') {
        const arr = Array.isArray(cfg.data) ? cfg.data.map(Number) : [1, 2, 3, 4, 5, 6, 7];
        const { stage, cells } = barStage(arr);
        stageWrap.append(stage);
        let L = 0;
        let R = kind === 'window' ? 0 : arr.length - 1;
        if (kind === 'window') {
          log('滑窗：右扩左收');
          for (; R < arr.length; R++) {
            setBarState(cells, Array.from({ length: R - L + 1 }, (_, k) => L + k), 'is-active');
            log(`窗 [${L},${R}] 和=${arr.slice(L, R + 1).reduce((a, b) => a + b, 0)}`);
            await sleep(speed, signal);
            if (R - L + 1 > 3) L++;
          }
        } else {
          log('对撞双指针');
          while (L < R) {
            setBarState(cells, [L, R], 'is-active');
            log(`L=${L}(${arr[L]}) R=${R}(${arr[R]})`);
            await sleep(speed, signal);
            L++;
            R--;
          }
        }
        for (const c of cells) c.cell.classList.add('is-done');
        log('完成');
      } else {
        showIdle(`未知动画类型：${kind}`);
        log(`未知 kind: ${kind}`);
      }
    } catch (e) {
      if (e?.name === 'AbortError') {
        /* 重播打断：保留当前帧或回待命 */
      } else {
        log(String(e?.message || e));
        if (!stageWrap.childElementCount) showIdle('播放出错 · 可重试');
      }
    } finally {
      stageWrap.classList.remove('is-playing');
      btn.disabled = false;
      btn.textContent = '重播';
    }
  }

  btn.addEventListener('click', () => {
    play();
  });

  /* 播放钮置前：待命时不用先滚过空舞台 */
  root.append(controls, stageWrap, logEl);
  host.append(root);

  return () => {
    ac?.abort();
    host.textContent = '';
  };
}

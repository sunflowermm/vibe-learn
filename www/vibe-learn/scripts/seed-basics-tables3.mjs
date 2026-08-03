/**
 * 基础全表第三批：DSA 复杂度 / 哈希 / 树堆 / 排序查找 + HTTP 常用头
 * node scripts/seed-basics-tables3.mjs
 * 然后：node scripts/sync-basics-node-terms.mjs && pnpm quiz:glossary
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
 * }} Item
 */

/** @type {Record<string, { setId: string, title: string, caption: string, tags: string[], relatedNodes: string[], domain: string, prefix: string, glossaryPrefix: string, items: Item[] }>} */
const TABLES = {
  dsaBigO: {
    setId: 'concept-dsa-big-o',
    title: '基础 · 复杂度阶全表',
    caption: 'O(1)/log n/n/n log n/n²/2ⁿ、空间、平均 vs 最坏——开口先报增长趋势。',
    tags: ['DSA', '复杂度', '基础'],
    relatedNodes: ['dsa-complexity'],
    domain: 'dsa',
    prefix: 'concept-dsa-big-o',
    glossaryPrefix: 'dsa_o',
    items: [
      {
        key: 'o1',
        term: 'O(1)',
        brief: 'O(1)：与输入规模无关的常量时间（如数组下标、哈希平均查找）。大 O 描述增长趋势，不是墙上秒数。',
        q: 'O(1) 表示？',
        ok: '耗时（或空间）不随输入规模 n 增长，近似常量',
        bad: ['一定比 O(n) 在所有机器上更慢', '源码行数必须为一行', '等于最坏情况指数爆炸'],
        nodes: ['dsa-complexity'],
      },
      {
        key: 'olog',
        term: 'O(log n)',
        brief: 'O(log n)：每次排除一部分（常砍一半），如二分查找。规模翻倍，步数只加一常数量级。',
        q: 'O(log n) 最贴哪类过程？',
        ok: '每次排除一半规模，如有序数组上的二分',
        bad: ['双重嵌套全扫', '未剪枝的全排列', '与 n 无关的常量下标访问'],
        nodes: ['dsa-complexity', 'dsa-sort'],
      },
      {
        key: 'on',
        term: 'O(n)',
        brief: 'O(n)：与输入规模成线性，扫一遍数组是典型。',
        q: '对长度 n 的数组扫一遍，时间常？',
        ok: 'O(n)',
        bad: ['O(1)', 'O(n²)', 'O(2ⁿ)'],
        nodes: ['dsa-complexity'],
      },
      {
        key: 'onlog',
        term: 'O(n log n)',
        brief: 'O(n log n)：分治排序级，如快排平均、堆排、归并。许多「先排序再处理」的下界直觉落在这。',
        q: '高效比较排序的常见平均时间阶？',
        ok: 'O(n log n)',
        bad: ['只能是 O(1)', '一定是 O(n²)', '一定是 O(2ⁿ)'],
        nodes: ['dsa-complexity', 'dsa-sort'],
      },
      {
        key: 'on2',
        term: 'O(n²)',
        brief: 'O(n²)：双重循环同长 n 全扫常见。简单两数之和暴力即此类。',
        q: '两层 for 都跑满长度 n，时间常？',
        ok: 'O(n²)',
        bad: ['O(log n)', 'O(1)', '与 n 无关'],
        nodes: ['dsa-complexity'],
      },
      {
        key: 'oexp',
        term: 'O(2ⁿ) / 指数',
        brief: 'O(2ⁿ) / O(n!)：未剪枝回溯、朴素递归斐波那契等，规模稍大即不可用；常靠记忆化/DP 压下来。',
        q: '未剪枝穷举子集/递归斐波那契常见风险？',
        ok: '时间呈指数级膨胀，很快不可用',
        bad: ['一定是 O(1)', '永远比 O(n) 更快', '与输入规模无关'],
        nodes: ['dsa-complexity', 'dsa-dp'],
      },
      {
        key: 'space',
        term: '空间复杂度',
        brief: '空间复杂度：额外开了多大表/递归栈。O(1) 额外空间≠不能改输入（看题意）；递归深度 n 常至少 O(n) 栈。',
        q: '谈空间复杂度时主要指？',
        ok: '算法额外使用的内存（含递归栈）随 n 如何增长',
        bad: ['硬盘品牌型号', '仅源文件字节数', 'HTTP 状态码'],
        nodes: ['dsa-complexity'],
      },
      {
        key: 'avg_worst',
        term: '平均 vs 最坏',
        brief: '平均 vs 最坏：快排/哈希要分清。面试开口应说明讨论的是哪一种，勿混成一个数。',
        q: '分析快排或哈希时更稳妥的说法？',
        ok: '分别说明平均与最坏（或均摊），不要混成一个数',
        bad: ['只报最好情况并当成保证', '复杂度与输入规模无关所以不用说', '最坏一定等于平均'],
        nodes: ['dsa-complexity', 'dsa-hash', 'dsa-sort'],
      },
    ],
  },

  dsaHash: {
    setId: 'concept-dsa-hash-kw',
    title: '基础 · 哈希表名词全表',
    caption: '哈希、冲突、负载因子、Map/Set/Object——平均 O(1) 查找底座。',
    tags: ['DSA', '哈希', '基础'],
    relatedNodes: ['dsa-hash'],
    domain: 'dsa',
    prefix: 'concept-dsa-hash-kw',
    glossaryPrefix: 'dsa_hash',
    items: [
      {
        key: 'table',
        term: '哈希表（散列表）',
        brief: '哈希表：键经哈希函数落到桶，平均查找/插入近 O(1)。两数之和、计数、去重的常用底座。',
        q: '哈希表最突出的平均复杂度优势？',
        ok: '查找/插入平均接近 O(1)',
        bad: ['最坏也永远 O(1) 且与负载无关', '固定比任何排序更慢', '只能存字符串'],
        nodes: ['dsa-hash'],
      },
      {
        key: 'collision',
        term: '哈希冲突',
        brief: '冲突：不同键落到同一桶。用链址或开放寻址处理；冲突多则退化，最坏可至 O(n)。',
        q: '哈希冲突意味着？',
        ok: '不同键映射到同一桶，需链址或开放寻址等策略',
        bad: ['CPU 过热专用术语', '一定表示密钥泄漏', '图没有边'],
        nodes: ['dsa-hash'],
      },
      {
        key: 'load',
        term: '负载因子',
        brief: '负载因子：已用槽位与容量之比。过高冲突增、需扩容；影响常数与退化风险。',
        q: '负载因子过高时常见后果？',
        ok: '冲突增多，性能变差，通常需要扩容',
        bad: ['自动变成平衡二叉树且无需处理', '网络带宽必然翻倍', 'Git 历史被重写'],
        nodes: ['dsa-hash'],
      },
      {
        key: 'map',
        term: 'Map（JS）',
        brief: 'Map：键可为任意类型，插序可迭代；比普通对象更适合当通用字典。',
        q: '相对普通对象，JS Map 的常见优势？',
        ok: '键可以是任意类型，且保持插入顺序可迭代',
        bad: ['禁止使用 get/set', '只能用数字当键', '查找一定是 O(n²)'],
        nodes: ['dsa-hash', 'lang-javascript'],
      },
      {
        key: 'set',
        term: 'Set（JS）',
        brief: 'Set：只要键不要值的集合，天然去重。判存在、滑窗字符集合常用。',
        q: 'Set 最贴哪类用途？',
        ok: '去重与快速判「是否出现过」',
        bad: ['必须存键值对且值不能为空', '替代排序算法', '只能用于 DOM'],
        nodes: ['dsa-hash', 'lang-javascript'],
      },
      {
        key: 'object',
        term: 'Object 当字典',
        brief: 'Object：键主要是 string/symbol；注意原型链干扰（可用 Object.create(null)）。简单字符串键场景仍常见。',
        q: '用普通对象当字典时要注意？',
        ok: '键会被转成字符串；原型链可能干扰键名',
        bad: ['键可以是任意对象且无任何坑', 'Object 不能存数字值', '一定比 Map 支持任意键类型更好'],
        nodes: ['dsa-hash', 'lang-javascript'],
      },
    ],
  },

  dsaTree: {
    setId: 'concept-dsa-tree-kw',
    title: '基础 · 树与堆全表',
    caption: '二叉树遍历、BST、堆、TopK——层级结构与优先队列。',
    tags: ['DSA', '树', '堆', '基础'],
    relatedNodes: ['dsa-tree'],
    domain: 'dsa',
    prefix: 'concept-dsa-tree-kw',
    glossaryPrefix: 'dsa_tree',
    items: [
      {
        key: 'preorder',
        term: '前序遍历',
        brief: '前序：根 → 左 → 右。常用于复制结构、前缀表达。',
        q: '二叉树前序遍历的顺序？',
        ok: '根 → 左子树 → 右子树',
        bad: ['左 → 根 → 右', '左 → 右 → 根', '只能层序不能递归'],
        nodes: ['dsa-tree'],
      },
      {
        key: 'inorder',
        term: '中序遍历',
        brief: '中序：左 → 根 → 右。BST 中序得到有序序列——开口高频点。',
        q: 'BST 上做中序遍历的典型结果？',
        ok: '键按升序（有序）输出',
        bad: ['一定随机无序', '只能得到层序', '一定降序且与 BST 无关'],
        nodes: ['dsa-tree'],
      },
      {
        key: 'postorder',
        term: '后序遍历',
        brief: '后序：左 → 右 → 根。删树、后缀表达、先处理孩子再处理根。',
        q: '后序遍历更贴哪类需求？',
        ok: '先处理左右孩子再处理根（如删树）',
        bad: ['必须先根后孩子', '只能用于链表', '等同 BFS'],
        nodes: ['dsa-tree'],
      },
      {
        key: 'level',
        term: '层序遍历',
        brief: '层序：逐层访问，队列 BFS。锯齿层序、每层最右节点等题模板。',
        q: '层序遍历常用哪类辅助结构？',
        ok: '队列（BFS 按层扩展）',
        bad: ['只能用递归且禁止队列', '必须用并查集', '只能用优先队列'],
        nodes: ['dsa-tree'],
      },
      {
        key: 'bst',
        term: '二叉搜索树（BST）',
        brief: 'BST：左子树键 < 根 < 右子树。查找/插入平均 O(log n)，退化成链则 O(n)。',
        q: 'BST 的结构约定？',
        ok: '左子树所有键小于根，右子树所有键大于根',
        bad: ['父节点必须小于所有孩子（堆序）', '只能有一个孩子', '中序一定无序'],
        nodes: ['dsa-tree'],
      },
      {
        key: 'heap',
        term: '堆（优先队列）',
        brief: '堆：满足堆序的完全二叉树，常数组实现。父优于子；插入上浮、删顶下沉 O(log n)。',
        q: '二叉堆在工程里更常直接对应？',
        ok: '优先队列：快速取最大/最小并动态插入',
        bad: ['必须替代所有哈希表', '只能存字符串', '查找任意键平均 O(1) 且无需比较'],
        nodes: ['dsa-tree'],
      },
      {
        key: 'topk',
        term: 'TopK 与堆',
        brief: 'TopK：维持大小为 K 的堆扫 n 个元素 → O(n log K)。第 K 大常用小顶堆。',
        q: '用大小为 K 的堆求 TopK，时间量级直觉？',
        ok: '约 O(n log K)',
        bad: ['一定是 O(1)', '一定是 O(n!)', '与 K 无关且总是 O(n²)'],
        nodes: ['dsa-tree', 'dsa-hot'],
      },
    ],
  },

  dsaSort: {
    setId: 'concept-dsa-sort-kw',
    title: '基础 · 排序与二分全表',
    caption: '快排、归并、堆排、稳定性、二分——会开口边界与前提。',
    tags: ['DSA', '排序', '二分', '基础'],
    relatedNodes: ['dsa-sort'],
    domain: 'dsa',
    prefix: 'concept-dsa-sort-kw',
    glossaryPrefix: 'dsa_sort',
    items: [
      {
        key: 'quick',
        term: '快速排序',
        brief: '快排：平均 O(n log n)，最坏 O(n²)；不稳定；常数好。随机枢轴改善最坏。',
        q: '快排需要口头补的边界？',
        ok: '平均 O(n log n)，最坏可到 O(n²)，通常不稳定',
        bad: ['最坏也永远 O(n)', '一定稳定', '平均是 O(2ⁿ)'],
        nodes: ['dsa-sort'],
      },
      {
        key: 'merge',
        term: '归并排序',
        brief: '归并：始终 O(n log n)，稳定，需额外 O(n) 空间；外排友好。',
        q: '归并排序相对快排的突出点？',
        ok: '最坏也 O(n log n) 且稳定，但通常要额外空间',
        bad: ['不稳定且最坏 O(n²)', '禁止使用额外空间且一定不稳定', '只能排链表不能排数组'],
        nodes: ['dsa-sort'],
      },
      {
        key: 'heap_sort',
        term: '堆排序',
        brief: '堆排：O(n log n)，原地，不稳定；常数常不如快排。优先队列思想同源。',
        q: '堆排序的常见标签？',
        ok: 'O(n log n)、可原地、通常不稳定',
        bad: ['平均 O(n²) 且稳定', '需要 O(n) 额外数组且最坏指数', '只能排两个元素'],
        nodes: ['dsa-sort', 'dsa-tree'],
      },
      {
        key: 'stable',
        term: '排序稳定性',
        brief: '稳定：相等元素相对次序不变。多关键字排序时重要；归并典型稳定，快排/堆排通常不。',
        q: '稳定排序的含义？',
        ok: '关键字相等的元素，排序后相对顺序与原先一致',
        bad: ['算法永不崩溃', '时间一定是 O(1)', '只能用于字符串'],
        nodes: ['dsa-sort'],
      },
      {
        key: 'binary',
        term: '二分查找',
        brief: '二分：序列对答案单调（有序是特例），O(log n)。统一区间开闭、防中点溢出、分清找左/右边界。',
        q: '二分查找的前提？',
        ok: '序列对答案单调（常为有序），才能每次排除一半',
        bad: ['任意无序数组都能直接二分', '时间一定是 O(n²)', '必须用递归且禁止循环'],
        nodes: ['dsa-sort'],
      },
    ],
  },

  dsaGraph: {
    setId: 'concept-dsa-graph-kw',
    title: '基础 · 图论名词全表',
    caption: '邻接表/矩阵、BFS/DFS、拓扑——图题开口音。',
    tags: ['DSA', '图', '基础'],
    relatedNodes: ['dsa-graph'],
    domain: 'dsa',
    prefix: 'concept-dsa-graph-kw',
    glossaryPrefix: 'dsa_graph',
    items: [
      {
        key: 'adj_list',
        term: '邻接表',
        brief: '邻接表：每个顶点存邻居列表。稀疏图最常用，空间约 O(V+E)。',
        q: '稀疏图更常选哪种表示？',
        ok: '邻接表',
        bad: ['必须用 n×n 邻接矩阵', '只能用并查集', '禁止存邻居'],
        nodes: ['dsa-graph'],
      },
      {
        key: 'adj_mat',
        term: '邻接矩阵',
        brief: '邻接矩阵：n×n 判边 O(1)，稠密图或需快速判边时用；空间 O(n²)。',
        q: '邻接矩阵的典型代价与收益？',
        ok: '空间 O(n²)，判两点是否有边可 O(1)',
        bad: ['空间永远 O(1)', '无法表示有向图', '只能用于树'],
        nodes: ['dsa-graph'],
      },
      {
        key: 'bfs',
        term: 'BFS（广度优先）',
        brief: 'BFS：队列逐层扩展。无权图最短层数、层序、岛屿「沉岛」等常用。',
        q: '无权图求最短层数更贴？',
        ok: 'BFS（队列按层）',
        bad: ['只能 Dijkstra 且必须有负权', '只能用堆排序', '禁止标记 visited'],
        nodes: ['dsa-graph'],
      },
      {
        key: 'dfs',
        term: 'DFS（深度优先）',
        brief: 'DFS：栈或递归走深。连通分量、路径存在、拓扑前奏、网格沉岛均可。',
        q: 'DFS 常用辅助？',
        ok: '栈或递归，并配合 visited 防回头',
        bad: ['只能用队列且禁止递归', '一定比 BFS 层数更短', '不需要防回头'],
        nodes: ['dsa-graph'],
      },
      {
        key: 'topo',
        term: '拓扑排序',
        brief: '拓扑排序：有向无环图（DAG）上的线性序。课程表、任务依赖；有环则无法完成。入度表+队列是经典。',
        q: '拓扑排序适用前提？',
        ok: '有向无环图；有环则不存在完整拓扑序',
        bad: ['任意有环图也必有唯一拓扑序', '只能用于无向树', '与依赖无关'],
        nodes: ['dsa-graph', 'dsa-hot'],
      },
    ],
  },

  httpHdr: {
    setId: 'concept-http-hdr',
    title: '基础 · HTTP 常用头全表',
    caption: 'Host、Content-Type、Authorization、Accept、User-Agent、Cookie/Set-Cookie、Origin。',
    tags: ['HTTP', '请求头', '基础'],
    relatedNodes: ['http-web', 'http-hands-on'],
    domain: 'net',
    prefix: 'concept-http-hdr',
    glossaryPrefix: 'http_hdr',
    items: [
      {
        key: 'host',
        term: 'Host',
        brief: 'Host：请求目标主机（及端口）。虚拟主机/反代按 Host 选站点；HTTP/1.1 必带。',
        q: 'Host 请求头主要表示？',
        ok: '要访问的主机名（及可选端口），供虚拟主机选型',
        bad: ['响应正文的 MIME 类型', '客户端操作系统版本专用', 'TLS 私钥'],
        nodes: ['http-web', 'net-nginx'],
      },
      {
        key: 'content_type',
        term: 'Content-Type',
        brief: 'Content-Type：正文的媒体类型（如 application/json）。收发双方据此序列化/解析 Body。',
        q: 'Content-Type: application/json 表示？',
        ok: '正文应按 JSON 解析',
        bad: ['正文一定是 PNG', '与正文无关可乱填', '表示 TCP 窗口大小'],
        nodes: ['http-web', 'http-hands-on'],
      },
      {
        key: 'authorization',
        term: 'Authorization',
        brief: 'Authorization：携带凭证，常见 Bearer <token>。密钥放服务端环境变量，勿写进前端打包。',
        q: '调需鉴权的 HTTPS API 时，Authorization 常见形态？',
        ok: 'Bearer + Token/API Key（密钥勿暴露到浏览器）',
        bad: ['把密钥写进 URL 永久公开即可', '有 Authorization 就不需要 TLS', '只能放 Cookie 名字符串'],
        nodes: ['http-web', 'craft-security', 'data-env'],
      },
      {
        key: 'accept',
        term: 'Accept',
        brief: 'Accept：客户端可接受的响应媒体类型。内容协商时服务器据此选型。',
        q: 'Accept 头表达？',
        ok: '客户端希望接受哪些响应格式/类型',
        bad: ['服务器磁盘剩余空间', '仅用于 WebSocket 升级密钥', '等同 Set-Cookie'],
        nodes: ['http-web'],
      },
      {
        key: 'user_agent',
        term: 'User-Agent',
        brief: 'User-Agent：客户端标识字符串。统计与兼容用；勿当唯一安全依据（可伪造）。',
        q: 'User-Agent 的正确定位？',
        ok: '客户端自报身份，可伪造，不能当唯一鉴权',
        bad: ['不可伪造的硬件根密钥', '替代 HTTPS', '服务器返回的状态码'],
        nodes: ['http-web'],
      },
      {
        key: 'cookie_req',
        term: 'Cookie（请求头）',
        brief: 'Cookie 请求头：浏览器自动带上此前存下的 Cookie。与 Set-Cookie 响应头成对；会话 ID 常走这条。',
        q: '请求里的 Cookie 头通常来自？',
        ok: '浏览器按规则自动附带此前通过 Set-Cookie 保存的值',
        bad: ['只能由 DNS 服务器写入', '等同 Authorization Bearer 强制形态', '禁止用于 SessionID'],
        nodes: ['http-web'],
      },
      {
        key: 'set_cookie',
        term: 'Set-Cookie',
        brief: 'Set-Cookie：服务器让浏览器存储 Cookie 的响应头，可带 HttpOnly/Secure/SameSite 等属性。',
        q: 'Set-Cookie 出现在？',
        ok: '响应头：指示浏览器保存（或更新）Cookie',
        bad: ['仅请求行方法名', 'TCP 三次握手字段', 'Docker 标签'],
        nodes: ['http-web', 'craft-security'],
      },
      {
        key: 'origin_hdr',
        term: 'Origin（头）',
        brief: 'Origin：跨源请求中标明页面来源。CORS 与 CSRF 讨论里常与 Cookie 策略对照。',
        q: 'Origin 头在跨源场景下的作用？',
        ok: '标明发起页面的协议+主机+端口，供服务器做 CORS 等判定',
        bad: ['存放 JWT 私钥', '替换 Host 且仅用于 FTP', '表示磁盘路径'],
        nodes: ['http-web'],
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
  const lines = ['\n  /* —— 基础全表名词 batch3（seed-basics-tables3） —— */'];
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
  console.log('glossary: appended', missingGloss.length);
} else {
  console.log('glossary: batch3 keys present');
}

const setsDir = path.join(root, 'src/data/quiz/sets');
for (const table of Object.values(TABLES)) {
  fs.writeFileSync(path.join(setsDir, `${table.setId}.js`), writeQuizSet(table));
  console.log('wrote', table.setId, table.items.length);
}

const idsPath = path.join(root, 'scripts/basics-tables-ids.json');
const prev = fs.existsSync(idsPath) ? JSON.parse(fs.readFileSync(idsPath, 'utf8')) : {};
for (const table of Object.values(TABLES)) {
  prev[table.setId] = table.items.map((i) => `${table.prefix}:${i.key}`);
}
fs.writeFileSync(idsPath, JSON.stringify(prev, null, 2) + '\n');
console.log(
  'basics-tables-ids merged sets=',
  Object.keys(prev).length,
  'ids=',
  Object.values(prev).reduce((n, a) => n + a.length, 0)
);
console.log('next: node scripts/sync-basics-node-terms.mjs && pnpm quiz:glossary');

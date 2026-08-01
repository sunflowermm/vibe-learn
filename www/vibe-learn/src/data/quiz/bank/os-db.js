/**
 * 静态题库 · os-db
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:osdb:gpu-parallel:core",
    q: "训练/推理场景常提到 GPU，主要是因为它擅长什么？",
    choices: [
      { t: "大规模并行计算（仍要和 CPU/存储层次协同）", ok: true, why: "GPU 并行吞吐高，但不等于可以无视内存与 CPU 调度。" },
      { t: "有 GPU 就不再需要内存层次", ok: false, why: "数据搬运与容量仍关键。" },
      { t: "GPU 专门替代操作系统", ok: false, why: "GPU 是加速器，不是 OS。" },
      { t: "GPU 只用于显示桌面壁纸", ok: false, why: "现代 AI 负载大量用 GPU 算力。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["chip-units","hw-sw-link","computer-system"],
    source: 'static',
  },
  {
    id: "s:osdb:os-isolation:core",
    q: "多程序同时运行且互不乱改内存，主要靠谁提供抽象与隔离？",
    choices: [
      { t: "操作系统（进程/内存/权限等）", ok: true, why: "OS 提供隔离与资源抽象；浏览器或业务 if 不能替代。" },
      { t: "只靠浏览器标签页", ok: false, why: "浏览器不是通用 OS 隔离。" },
      { t: "只靠业务代码里的 if 权限判断", ok: false, why: "OS 鉴权与地址空间是底线。" },
      { t: "应用直接读写网卡寄存器即可隔离", ok: false, why: "应经驱动与系统调用。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["os-essence","computer-system","hw-sw-link"],
    source: 'static',
  },
  {
    id: "s:osdb:redis-vs-sqlite:core",
    q: "会话缓存与「单文件嵌入式库」分别更常对上哪对？",
    choices: [
      { t: "Redis 偏缓存/会话；SQLite 偏嵌入文件库", ok: true, why: "职责不同：服务型缓存 vs 嵌入式库文件。" },
      { t: "Redis 可替代所有关系库事务场景", ok: false, why: "模型与保证不同。" },
      { t: "SQLite 就是云托管 Redis", ok: false, why: "嵌入文件库 ≠ Redis 服务。" },
      { t: "二者完全等价可随机替换", ok: false, why: "访问模式与部署形态不同。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["db-redis","db-sqlite","db-landscape"],
    source: 'static',
  },
  {
    id: "s:osdb:sql-basics:core",
    q: "进产品库课之前，关系库最少应先会哪类操作？",
    choices: [
      { t: "SELECT / INSERT / UPDATE / DELETE 的基本用法", ok: true, why: "先有 SQL 直觉，再上 ORM 与复杂模型。" },
      { t: "不会四句 SQL 也先上复杂 ORM 并无视模型", ok: false, why: "排障时仍要懂 SQL。" },
      { t: "只背 Mongo 命令，永不必碰 SQL", ok: false, why: "关系库课仍要 SQL。" },
      { t: "只会 CREATE USER 就够了", ok: false, why: "不够覆盖日常读写。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["db-sql-hands-on","db-postgresql","db-mysql","db-mongodb"],
    source: 'static',
  },
  {
    id: "s:osdb:why-dbms:core",
    q: "多客户端要并发读写同一份业务数据并要事务语义时，为什么常引入 DBMS？",
    choices: [
      { t: "提供并发控制、事务与共享查询等能力", ok: true, why: "文件 JSON 很难自带跨进程 ACID 与查询规划。" },
      { t: "因为 JSON 文件自带跨进程 ACID", ok: false, why: "一般没有。" },
      { t: "因为 DBMS 能替代所有应用校验", ok: false, why: "业务规则仍要在应用层。" },
      { t: "因为流行度分数是唯一选型依据", ok: false, why: "要看查询与事务需求。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["db-essence","db-as-service","db-middleware"],
    source: 'static',
  }
];

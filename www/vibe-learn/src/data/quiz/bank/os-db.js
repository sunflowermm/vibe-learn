/**
 * 静态题库 · os-db
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:osdb:db-core:core",
    q: "为何常要 DBMS？Redis vs SQLite？PG/MySQL vs Mongo 选型看什么？最少要会哪类 SQL？",
    choices: [
      { t: "并发/事务/共享查询；Redis 缓存会话、SQLite 嵌入文件库；看查询模式与事务需求；先会 SELECT/INSERT/UPDATE/DELETE 再进产品课", ok: true, why: "数据库番外一张选型卡，压掉「每库一道口号题」。" },
      { t: "文件 JSON 自带跨进程 ACID；Redis 可替代所有关系库；流行度分数=唯一选型依据", ok: false, why: "误解职责与指标。" },
      { t: "SQLite=云托管 Redis；Mongo 永远强于事务型业务", ok: false, why: "嵌入 vs 服务；事务看场景。" },
      { t: "不会四句 SQL 也能先上复杂 ORM 无视模型", ok: false, why: "模型与 SQL 直觉仍要有。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["db-essence","db-as-service","db-middleware","db-landscape","db-sql-hands-on","db-redis","db-sqlite","db-postgresql","db-mysql","db-mongodb","db-others"],
    source: 'static',
  },
  {
    id: "s:osdb:machine:core",
    q: "多程序隔离靠谁？按键如何落到硬件？训练/推理为何常提 GPU？",
    choices: [
      { t: "OS 提供进程/内存/文件/权限等抽象；经驱动与中断联动硬件；GPU 擅长大规模并行，仍要和 CPU/存储层次一起看", ok: true, why: "序章四节点合并成「机器如何跑起来」一题。" },
      { t: "浏览器替代 OS；应用直操网卡寄存器；有 GPU 就不再需要内存层次", ok: false, why: "三层都错。" },
      { t: "权限只是业务 if 语句", ok: false, why: "OS 鉴权是底线。" },
      { t: "中断与驱动和程序员无关可忽略", ok: false, why: "I/O 与外设必经之路。" },
    ],
    kind: "concept",
    domain: "os-db",
    tags: ["场景","课核"],
    relatedNodes: ["computer-system","os-essence","hw-sw-link","chip-units"],
    source: 'static',
  }
];

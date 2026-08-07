import { defineQuizSet } from '../schema.js';

/** 数据库版图：关系/文档/缓存/迁移（SQL 动手见 sql-cli；一致性见 eng-data-consistency） */
export default defineQuizSet({
  id: 'concept-db-ops',
  title: '概念 · 数据库版图与 SQL',
  kind: 'concept',
  domain: 'os-db',
  tags: ['数据库', 'SQL', 'Redis'],
  relatedNodes: ['db-essence', 'db-landscape', 'db-sql-hands-on'],
  caption: '库不是换个后缀的文件；选型看查询与事务，缓存与权威分离。',
  questions: [
    {
      id: 'concept-db-ops:vs-file',
      q: '数据库相对「把数据存成普通文本文件」，主要多了哪些能力？',
      choices: [
        {
          t: '结构化查询、并发访问控制、持久化与一致性等抽象服务',
          ok: true,
          why: '数据库是管理系统，不只是换了个文件扩展名。',
        },
        {
          t: '只是把 .txt 改成 .db 后缀，读写方式完全一样',
          ok: false,
          why: '数据库提供索引、事务、权限等，文本文件通常没有。',
        },
        {
          t: '不能存储带字段名的结构化数据',
          ok: false,
          why: '关系库核心就是表结构；文档库也存结构化 JSON。',
        },
        {
          t: '普通文件也能自动保证 ACID 事务，与数据库无异',
          ok: false,
          why: '事务与隔离级别是引擎提供的，裸文件不具备。',
        },
      ],
      relatedNodes: ['db-essence'],
    },
    {
      id: 'concept-db-ops:rel-vs-doc',
      q: '订单要强事务、配置文档又经常改字段。选型关系库还是文档库时，更稳妥看什么？',
      choices: [
        {
          t: '看查询模式、事务需求、团队熟悉度与运维成本',
          ok: true,
          why: '没有银弹；业务约束决定哪种模型更顺手。',
        },
        {
          t: '永远只选一种，项目生命周期内禁止更换',
          ok: false,
          why: '不同子系统需求不同；可按场景组合多种存储。',
        },
        {
          t: '看产品 Logo 颜色哪个更好看',
          ok: false,
          why: '视觉与存储模型、事务能力没有因果关系。',
        },
        {
          t: '把 ACID 里的隔离性（Isolation）说成网络分区容忍',
          ok: false,
          why: '隔离性指并发事务可见性；分区容忍是 CAP 话题。',
        },
      ],
      relatedNodes: ['db-landscape', 'db-mysql', 'db-mongodb'],
    },
    {
      id: 'concept-db-ops:redis',
      q: '在本仓常见架构里，缓存或会话数据更常落在哪种存储？',
      choices: [
        {
          t: 'Redis：内存数据结构，适合低延迟缓存与会话',
          ok: true,
          why: '读写在内存，比磁盘关系库更适合热点缓存。',
        },
        {
          t: '必须用 Excel 表格文件做在线缓存',
          ok: false,
          why: 'Excel 不适合高并发在线读写。',
        },
        {
          t: '只能 MongoDB，不能用 Redis',
          ok: false,
          why: '文档库与缓存职责不同；缓存层常用 Redis。',
        },
        {
          t: '事务提交失败后，外部系统仍应看到部分写入',
          ok: false,
          why: '与原子性相悖；失败应回滚，不应部分可见。',
        },
      ],
      relatedNodes: ['db-redis', 'db-landscape'],
    },
    {
      id: 'concept-db-ops:sqlite',
      q: 'SQLite 这种嵌入式数据库，更适合哪类使用场景？',
      choices: [
        {
          t: '本地单机、嵌入式、单文件、轻量持久化',
          ok: true,
          why: '无需独立服务进程，适合 App 内嵌与小工具。',
        },
        {
          t: '全球超大规模、多写主库的唯一标准答案',
          ok: false,
          why: '高并发多写通常需要服务端库与分片架构。',
        },
        {
          t: '替代所有消息队列（如 Kafka、RabbitMQ）',
          ok: false,
          why: '消息队列管异步通信；SQLite 是存储引擎。',
        },
        {
          t: '用户态程序可以绕过 OS 直接读写任意物理内存地址',
          ok: false,
          why: '这是 OS 保护问题，与 SQLite 选型无关且不成立。',
        },
      ],
      relatedNodes: ['db-sqlite', 'db-others'],
    },
    {
      id: 'concept-db-ops:crud',
      q: '结构化查询语言（SQL）入门常说的「增删改查四件套」指哪四个语句？',
      choices: [
        {
          t: 'SELECT 查询、INSERT 插入、UPDATE 更新、DELETE 删除',
          ok: true,
          why: 'CRUD 基础；先熟练再学 JOIN 与索引。',
        },
        {
          t: '只有 DROP DATABASE 删库这一句',
          ok: false,
          why: 'DROP 是危险管理语句，不是日常 CRUD。',
        },
        {
          t: 'CSS 里的选择器 #id 与 .class',
          ok: false,
          why: 'CSS 管样式，与 SQL 无关。',
        },
        {
          t: 'HTTP 的 GET、POST、PUT、DELETE 就是 SQL 语句',
          ok: false,
          why: 'HTTP 方法用于 Web；SQL 在库里操作表，层次不同。',
        },
      ],
      relatedNodes: ['db-sql-hands-on'],
    },
    {
      id: 'concept-db-ops:index',
      q: '给数据库表建索引（Index）的主要收益与代价是什么？',
      choices: [
        {
          t: '加速特定查询，但会增加写入开销并占用额外存储空间',
          ok: true,
          why: '像目录：查快，维护有成本，不能无脑全建。',
        },
        {
          t: '索引能让所有查询无条件变快且零副作用',
          ok: false,
          why: '错误或过多索引可能拖慢写入，甚至不被选用。',
        },
        {
          t: '建索引会自动删除表中重复数据',
          ok: false,
          why: '索引加速查找，不代替去重；唯一约束是另一回事。',
        },
        {
          t: '没有索引时 INSERT 语句无法执行',
          ok: false,
          why: '插入不依赖索引；无索引只是查询可能更慢。',
        },
      ],
      relatedNodes: ['db-sql-hands-on', 'db-mysql', 'db-postgresql'],
    },
    {
      id: 'concept-db-ops:as-service',
      q: '「数据库当服务」时，应用连接 PG/MySQL 最少要关心？',
      choices: [
        {
          t: "连接串、连接池、权限与备份——库是独立进程，不是普通文件读写",
          ok: true,
          why: '服务形态带来网络与运维面。',
        },
        {
          t: '把 SQL 写进前端 HTML 即可，浏览器直连数据库最省事',
          ok: false,
          why: '暴露库面且易注入；SQL 应在受信任服务端执行。',
        },
        {
          t: '数据库不需要备份，服务进程挂了数据也会自动永存',
          ok: false,
          why: '数据是核心资产，必须可恢复备份。',
        },
        {
          t: '所有查询都应全表扫描，建索引反而拖慢开发速度',
          ok: false,
          why: '应用索引与执行计划，避免无谓全表扫。',
        },
      ],
      relatedNodes: ['db-as-service', 'db-middleware'],
      tags: ['进阶'],
    },
    {
      id: 'concept-db-ops:orm',
      q: 'ORM / 连接池相对「每次手写一条 SQL+新建连接」解决什么？',
      choices: [
        {
          t: "复用连接、映射对象、迁移版本化——仍要懂 SQL 与 N+1",
          ok: true,
          why: '中间件不是魔法；慢查询与模型仍要会查。',
        },
        {
          t: '有 ORM 就永远不需要索引，查询计划可以忽略',
          ok: false,
          why: 'ORM 生成的 SQL 照样会慢，仍要索引与计划。',
        },
        {
          t: '连接池/ORM 中间件可代替鉴权与行级权限',
          ok: false,
          why: '连接池/ORM 不管「谁能访问哪行」；鉴权是另一层。',
        },
        {
          t: '迁移文件应提交生产密码，方便各环境直接连库',
          ok: false,
          why: '密钥走环境变量/Secrets，勿写进迁移脚本。',
        },
      ],
      relatedNodes: ['db-middleware', 'db-as-service'],
      tags: ['进阶'],
    },
    {
      id: 'concept-db-ops:redis-split',
      q: 'Redis 与关系库如何分工更稳妥？',
      choices: [
        {
          t: "Redis 偏缓存/会话/限流等热数据；关系库偏权威持久与复杂查询",
          ok: true,
          why: '缓存可丢可重建；权威数据要可恢复。',
        },
        {
          t: 'Redis 应替代所有备份与落盘恢复，权威数据不必再进关系库',
          ok: false,
          why: '内存/易失路径不能当唯一备份；权威数据要落盘备份。',
        },
        {
          t: '关系库不能存结构化数据，只能当日志管道',
          ok: false,
          why: '表与关系正是关系库强项。',
        },
        {
          t: 'Redis 与关系库禁止同时存在，选一个即可覆盖全部场景',
          ok: false,
          why: '热数据 + 权威库是常见分层组合。',
        },
      ],
      relatedNodes: ['db-redis', 'db-landscape', 'db-essence'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-db-ops:migration',
      q: '迁移（migration）文件进仓库的意义？',
      choices: [
        {
          t: "schema 变更可复现、可审查，环境之间对齐",
          ok: true,
          why: '与代码一同演进；勿手改生产结构却不留痕迹。',
        },
        {
          t: '有了 migration 脚本就等于完成了数据备份与灾难恢复',
          ok: false,
          why: '结构变更≠数据备份；丢数据仍靠备份恢复。',
        },
        {
          t: 'migration 只应留在开发者本机，不必进版本库与 CI',
          ok: false,
          why: '要进版本库，才能在 CI/各环境复现。',
        },
        {
          t: 'migration 只负责往库里灌种子演示数据，不涉及 schema',
          ok: false,
          why: '迁移主责是 schema 变更可复现；种子数据是另一回事。',
        },
      ],
      relatedNodes: ['db-middleware', 'craft-ci'],
      tags: ['进阶'],
    },
  ],
});

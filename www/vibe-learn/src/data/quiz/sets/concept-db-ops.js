import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-db-ops',
  title: '概念 · 数据库版图与 SQL',
  kind: 'concept',
  domain: 'os-db',
  tags: ['数据库', 'SQL', 'Redis'],
  relatedNodes: [
    'db-essence',
    'db-landscape',
    'db-sql-hands-on',
    'db-mysql',
    'db-postgresql',
    'db-mongodb',
    'db-others',
    'db-middleware',
  ],
  questions: [
    {
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
          why: '数据库提供索引、事务、权限等，文本文件通常没有这些机制。',
        },
        {
          t: '不能存储带字段名的结构化数据',
          ok: false,
          why: '关系库的核心就是表结构；文档库也存结构化 JSON。',
        },
        {
          t: '普通文件也能自动保证 ACID 事务，与数据库无异',
          ok: false,
          why: '事务、隔离级别是数据库引擎提供的，裸文件不具备。',
        },
      ],
    },
    {
      q: '关系型数据库与文档型数据库选型时，更稳妥的直觉是什么？',
      choices: [
        {
          t: '看查询模式、事务需求、团队熟悉度与运维成本',
          ok: true,
          why: '没有银弹；业务约束决定哪种模型更顺手。',
        },
        {
          t: '永远只选一种，项目生命周期内禁止更换',
          ok: false,
          why: '不同子系统需求不同；成熟团队会按场景组合多种存储。',
        },
        {
          t: '看产品 Logo 颜色哪个更好看',
          ok: false,
          why: '视觉与存储模型、事务能力没有因果关系。',
        },
        {
          t: '把 ACID 里的隔离性（Isolation）说成网络分区容忍',
          ok: false,
          why: '隔离性指并发事务可见性；分区容忍是分布式 CAP 话题，概念不同。',
        },
      ],
    },
    {
      q: '在本仓常见架构里，缓存或会话数据更常落在哪种存储？',
      choices: [
        {
          t: 'Redis：内存数据结构，适合低延迟缓存与会话',
          ok: true,
          why: 'Redis 读写在内存，比磁盘关系库更适合热点缓存场景。',
        },
        {
          t: '必须用 Excel 表格文件做在线缓存',
          ok: false,
          why: 'Excel 不适合高并发在线读写，也不是服务端缓存方案。',
        },
        {
          t: '只能 MongoDB，不能用 Redis',
          ok: false,
          why: '文档库与缓存职责不同；本仓亦常用 Redis 做缓存层。',
        },
        {
          t: '事务提交失败后，外部系统仍应看到部分写入',
          ok: false,
          why: '这与事务原子性相悖；失败应回滚，不应部分可见。',
        },
      ],
    },
    {
      q: 'SQLite 这种嵌入式数据库，更适合哪类使用场景？',
      choices: [
        {
          t: '本地单机、嵌入式、单文件、轻量持久化',
          ok: true,
          why: 'SQLite 无需独立服务进程，适合 App 内嵌与小工具。',
        },
        {
          t: '全球超大规模、多写主库的唯一标准答案',
          ok: false,
          why: '高并发多写通常需要专门的服务端数据库与分片架构。',
        },
        {
          t: '替代所有消息队列（如 Kafka、RabbitMQ）',
          ok: false,
          why: '消息队列解决异步通信；SQLite 是存储引擎，职责不同。',
        },
        {
          t: '用户态程序可以绕过 OS 直接读写任意物理内存地址',
          ok: false,
          why: '这是操作系统保护机制问题，与 SQLite 使用场景无关且本身不成立。',
        },
      ],
    },
    {
      q: '结构化查询语言（SQL）入门常说的「增删改查四件套」指哪四个语句？',
      choices: [
        {
          t: 'SELECT 查询、INSERT 插入、UPDATE 更新、DELETE 删除',
          ok: true,
          why: 'CRUD 是数据库操作基础；先熟练这四类再学 JOIN 与索引。',
        },
        {
          t: '只有 DROP DATABASE 删库这一句',
          ok: false,
          why: 'DROP 是危险管理语句，不是日常 CRUD 四件套。',
        },
        {
          t: 'CSS 里的选择器 #id 与 .class',
          ok: false,
          why: 'CSS 管页面样式，与 SQL 查询语言无关。',
        },
        {
          t: 'HTTP 的 GET、POST、PUT、DELETE 就是 SQL 语句',
          ok: false,
          why: 'HTTP 方法用于 Web 通信；SQL 在数据库里操作表数据，层次不同。',
        },
      ],
    },
    {
      q: '给数据库表建索引（Index）的主要收益与代价是什么？',
      choices: [
        {
          t: '加速特定查询，但会增加写入开销并占用额外存储空间',
          ok: true,
          why: '索引像目录：查快，但维护目录也要成本，不能无脑全建。',
        },
        {
          t: '索引能让所有查询无条件变快且零副作用',
          ok: false,
          why: '错误索引或过多索引可能拖慢写入，甚至不被优化器选用。',
        },
        {
          t: '建索引会自动删除表中重复数据',
          ok: false,
          why: '索引加速查找，不代替去重逻辑；唯一约束才是另一回事。',
        },
        {
          t: '没有索引时 INSERT 语句无法执行',
          ok: false,
          why: '插入不依赖索引；无索引只是查询可能全表扫描变慢。',
        },
      ],
    },
    {
      q: '「数据库当服务」时，应用连接 PG/MySQL 最少要关心？',
      choices: [
        { t: '连接串、连接池、权限与备份——库是独立进程，不是普通文件读写', ok: true, why: '服务形态带来网络与运维面。' },
        { t: '把 SQL 写进前端 HTML 即可', ok: false, why: '危险且架构错误。' },
        { t: '数据库不需要备份', ok: false, why: '核心资产必须备份。' },
        { t: '所有查询都应全表扫描', ok: false, why: '索引与计划很重要。' },
      ],
      relatedNodes: ['db-as-service', 'db-middleware'],
      tags: ['进阶'],
    },
    {
      q: 'ORM / 连接池相对「每次手写一条 SQL+新建连接」解决什么？',
      choices: [
        { t: '复用连接、映射对象、迁移版本化——仍要懂 SQL 与 N+1', ok: true, why: '中间件不是魔法。' },
        { t: '有 ORM 就永远不需要索引', ok: false, why: '慢查询照样在。' },
        { t: '中间件可代替鉴权', ok: false, why: '权限另一层。' },
        { t: '迁移文件应提交生产密码', ok: false, why: '密钥分离。' },
      ],
      relatedNodes: ['db-middleware', 'db-as-service'],
      tags: ['进阶'],
    },
    {
      q: 'Redis 与关系库如何分工更稳妥？',
      choices: [
        { t: 'Redis 偏缓存/会话/限流等热数据；关系库偏权威持久与复杂查询', ok: true, why: '职责分离；缓存可丢，权威数据要可恢复。' },
        { t: 'Redis 应替代所有备份', ok: false, why: '否。' },
        { t: '关系库不能存结构化数据', ok: false, why: '正是其强项。' },
        { t: '二者禁止同时存在', ok: false, why: '常见组合。' },
      ],
      relatedNodes: ['db-landscape', 'db-essence'],
      tags: ['基础', '进阶'],
    },
    {
      q: '迁移（migration）文件进仓库的意义？',
      choices: [
        { t: 'schema 变更可复现、可审查，环境之间对齐', ok: true, why: '与代码一同演进；勿手改生产结构却不留痕迹。' },
        { t: '迁移等于自动训练模型', ok: false, why: '无关。' },
        { t: '有迁移就不必备份数据', ok: false, why: '结构≠数据备份。' },
        { t: '迁移只应存在开发者本机', ok: false, why: '要进版本库共享。' },
      ],
      relatedNodes: ['db-middleware', 'craft-ci'],
      tags: ['进阶'],
    },
  ],
});

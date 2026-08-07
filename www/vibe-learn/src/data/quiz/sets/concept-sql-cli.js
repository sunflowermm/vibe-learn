import { defineQuizSet } from '../schema.js';

/** SQL 动手：CRUD/过滤 → JOIN/事务/注入（关键字全表见 sql-kw） */
export default defineQuizSet({
  id: 'concept-sql-cli',
  title: '概念 · SQL 指令（基础→进阶）',
  kind: 'concept',
  domain: 'os-db',
  tags: ['SQL', '指令', '基础', '进阶'],
  relatedNodes: ['db-sql-hands-on', 'db-sqlite'],
  caption: '经典 SELECT/WHERE/JOIN + 事务与注入边界——Agent 落库前先会说话。',
  questions: [
    {
      id: 'concept-sql-cli:q1',
      q: '只取 users 表里 email 列，且限制 10 行，经典写法更接近？',
      choices: [
        { t: "SELECT email FROM users LIMIT 10;", ok: true, why: '投影列 + 限制行数；方言里也可能是 TOP/FETCH。' },
        { t: 'GET email FROM users;（把 HTTP GET 当成 SQL 关键字）', ok: false, why: 'GET 是 HTTP 方法，不是 SQL。' },
        { t: 'PRINT users.email;（过程打印语句，不是标准查询投影）', ok: false, why: '非标准 SQL，不能当日常查询写法。' },
        { t: 'FETCH * INTO users;（游标/过程语法，不是入门 SELECT）', ok: false, why: '游标/过程语法，不是入门查询。' },
      ],
      relatedNodes: ['db-sql-hands-on', 'db-sqlite'],
      tags: ['基础'],
    },
    {
      id: 'concept-sql-cli:q2',
      q: '过滤「状态为 active」的行，条件应写在？',
      choices: [
        { t: 'WHERE status = \'active\'', ok: true, why: 'WHERE 过滤行；HAVING 多用于聚合后。' },
        { t: '只能写在 ORDER BY 里', ok: false, why: 'ORDER BY 负责排序，不负责过滤条件。' },
        { t: 'GROUP BY 等于过滤单行条件', ok: false, why: 'GROUP BY 做分组聚合，不是行级 WHERE。' },
        { t: 'LIMIT 负责所有过滤逻辑', ok: false, why: 'LIMIT 只截断结果集大小。' },
      ],
      relatedNodes: ['db-sql-hands-on'],
      tags: ['基础'],
    },
    {
      id: 'concept-sql-cli:q3',
      q: '两表按 user_id 关联取订单与用户名，入门用？',
      choices: [
        { t: "JOIN ... ON orders.user_id = users.id", ok: true, why: '等值连接是经典；先 INNER 再学 LEFT。' },
        { t: "UNION 永远等于 JOIN，二者只是 SQL 方言里的别名写法", ok: false, why: '不是 SQL 关联语义。' },
        { t: "关联查询只能用子查询，标准 SQL 禁止任何形式的 JOIN", ok: false, why: 'UNION 拼行集；JOIN 按键拼列关系。' },
        { t: "把两张表的名字用 + 号相加即可合并行，不必写 ON 条件", ok: false, why: 'JOIN 是标准且常见做法。' },
      ],
      relatedNodes: ['db-sql-hands-on', 'db-as-service'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-sql-cli:q4',
      q: '插入一行后再查不到，最该先核对？',
      choices: [
        { t: "是否在同一库/同一连接；事务是否未提交；WHERE 是否写错", ok: true, why: '环境与事务边界是高频坑。' },
        { t: '立刻 DROP DATABASE，清库后重插当作标准排查', ok: false, why: '破坏性操作，帮不上定位「插了但查不到」。' },
        { t: '改 Git remote 地址，期望数据库连接随之切换到正确库', ok: false, why: '远程仓库与当前库连接/事务无关。' },
        { t: '把 temperature 调到 2，让模型帮你「回忆」插入是否成功', ok: false, why: '那是模型采样参数，与 SQL 落库无关。' },
      ],
      relatedNodes: ['db-sqlite', 'db-as-service', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-sql-cli:q5',
      q: 'BEGIN … COMMIT 事务想表达的核心保证？',
      choices: [
        { t: "一组语句要么都成功提交，要么失败回滚，避免半更新", ok: true, why: '原子性直觉；隔离级别另学。' },
        { t: '事务会把本次变更自动备份到 GitHub，无需运维另做备份', ok: false, why: '事务只管本次提交；备份是运维流程。' },
        { t: '开启事务后禁止使用任何索引，否则引擎拒绝执行语句', ok: false, why: '事务内照样可用索引，二者不互斥。' },
        { t: '执行 COMMIT 会像 DROP 一样删除整张表上的全部数据', ok: false, why: 'COMMIT 提交变更；删表是 DROP/DELETE。' },
      ],
      relatedNodes: ['db-as-service', 'db-sql-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-sql-cli:q6',
      q: '把用户输入直接拼进 SQL 字符串，最大风险？',
      choices: [
        { t: 'SQL 注入：攻击者可改写查询逻辑乃至拖库', ok: true, why: '必须参数化/预编译；LLM 生成 SQL 同样要防。' },
        { t: '只会让查询变慢，没有安全问题', ok: false, why: '首先是安全漏洞，不只是性能。' },
        { t: '数据库会自动加密所有拼接', ok: false, why: '引擎不会把拼接当加密；注入仍可执行。' },
        { t: '拼字符串比参数绑定更安全', ok: false, why: '相反：参数绑定才把数据与语句结构分离。' },
      ],
      relatedNodes: ['db-sql-hands-on', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-sql-cli:q7',
      q: '慢查询时，先用什么看执行计划（多数引擎）？',
      choices: [
        { t: 'EXPLAIN（或 EXPLAIN ANALYZE）看执行计划', ok: true, why: '先证据再加索引。' },
        { t: 'git blame 表名（看谁改过 schema，不是执行计划）', ok: false, why: 'blame 看代码作者，不看查询计划。' },
        { t: 'docker login（登录镜像仓库，不分析慢查询）', ok: false, why: '登录镜像仓库与分析慢查询无关。' },
        { t: 'chmod 777 数据库文件，权限放宽就一定加速', ok: false, why: '权限过宽且不解决执行计划问题。' },
      ],
      relatedNodes: ['db-sql-hands-on', 'db-as-service'],
      tags: ['进阶'],
    },
    {
      id: 'concept-sql-cli:q8',
      q: 'SQLite 文件库相对「本机 docker 起 Postgres」选型直觉？',
      choices: [
        { t: "单机原型/嵌入优先 SQLite；多连接写、多租户服务常上独立库服务", ok: true, why: '形态匹配场景，不是谁更高级。' },
        { t: 'SQLite 不能跑 SQL，只能当简单键值文件用，查询能力极弱', ok: false, why: 'SQLite 完整支持 SQL，只是嵌入式形态。' },
        { t: 'Postgres 禁止用于生产，只能当本机玩具库练手', ok: false, why: 'Postgres 是常见生产级关系库。' },
        { t: '二者网络端口必须同为 80，否则数据无法互相迁移', ok: false, why: 'SQLite 通常无端口；PG 常见 5432。' },
      ],
      relatedNodes: ['db-sqlite', 'db-as-service', 'ops-docker'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-sql-cli:q9',
      q: 'UPDATE users SET ... 忘写 WHERE，最可能发生？',
      choices: [
        { t: '整表被更新成同一值——生产事故经典', ok: true, why: '先在事务里干跑/限制范围；有的客户端会警告。' },
        { t: '语法错误，一行都改不了', ok: false, why: '合法 SQL 时会全表更新，不一定报错。' },
        { t: '只会更新第一行', ok: false, why: '无 WHERE 则匹配全部行。' },
        { t: '自动变成 SELECT', ok: false, why: '仍是 UPDATE，不会悄悄改成查询。' },
      ],
      relatedNodes: ['db-sql-hands-on'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-sql-cli:q10',
      q: 'COUNT(*) / GROUP BY 用来回答哪类问题？',
      choices: [
        { t: '按维度聚合计数，如「每个状态有多少订单」', ok: true, why: '聚合是分析与后台报表基础。' },
        { t: '用来加密整张表并替代磁盘级加密方案', ok: false, why: '聚合计数不提供加密能力。' },
        { t: '创建索引的唯一语法，可完全替代 CREATE INDEX', ok: false, why: '建索引用 CREATE INDEX，不是 COUNT/GROUP BY。' },
        { t: '用聚合结果替代备份，丢库后靠 COUNT 恢复数据', ok: false, why: '统计结果不能代替数据备份。' },
      ],
      relatedNodes: ['db-sql-hands-on'],
      tags: ['基础', '进阶'],
    },
  ],
});

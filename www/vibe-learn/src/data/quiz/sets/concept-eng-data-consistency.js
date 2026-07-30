import { defineQuizSet } from '../schema.js';

/** 数据正确性：事务、缓存、一致性——全栈与 Agent 状态共用 */
export default defineQuizSet({
  id: 'concept-eng-data-consistency',
  title: '工程 · 数据一致性与缓存',
  kind: 'concept',
  domain: 'os-db',
  tags: ['事务', '缓存', '一致性', '基础', '进阶'],
  relatedNodes: ['db-as-service', 'db-redis', 'db-middleware'],
  caption: '权威数据在哪、缓存能丢什么、失败如何补偿——比 CRUD 语法更关键。',
  questions: [
    {
      id: 'concept-eng-data-consistency:q1',
      q: '「缓存与数据库不一致」时，更稳妥的默认心智？',
      choices: [
        { t: '数据库（或明确的权威源）说了算；缓存可重建，策略要定义失效', ok: true, why: 'Cache aside / TTL / 主动失效需显式设计。' },
        { t: '缓存永远比数据库正确', ok: false, why: '常过期或脏。' },
        { t: '不一致可以永久忽略', ok: false, why: '业务会错。' },
        { t: '有 Redis 就不需要数据库', ok: false, why: '职责不同。' },
      ],
      relatedNodes: ['db-redis', 'db-as-service'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q2',
      q: '事务提交成功后，再发「副作用消息/邮件」失败，暴露什么？',
      choices: [
        { t: '跨系统没有自动原子性；要用发件箱/重试/补偿或事务消息模式', ok: true, why: '分布式经典；Agent 工具调用同理。' },
        { t: '数据库会自动回滚已经发出的邮件', ok: false, why: '不会。' },
        { t: '副作用永远应在事务内同步打外部 HTTP', ok: false, why: '易拖垮事务与锁。' },
        { t: '这种失败在生产不存在', ok: false, why: '天天有。' },
      ],
      relatedNodes: ['db-as-service', 'craft-observability'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q3',
      q: '读己之写（read-your-writes）对用户会话为何重要？',
      choices: [
        { t: '用户刚写入却读到旧值会感觉「丢失」——路由/主从延迟要处理', ok: true, why: '主从复制延迟是常见根因。' },
        { t: '用户不应读到自己的写入', ok: false, why: '相反常需要。' },
        { t: '只与 CSS 有关', ok: false, why: '否。' },
        { t: 'SQLite 单文件无此问题所以分布式也无', ok: false, why: '架构不同。' },
      ],
      relatedNodes: ['db-as-service', 'db-postgresql'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q4',
      q: 'N+1 查询问题本质？',
      choices: [
        { t: '循环里每次打库：1 次列表 + N 次详情——应用层或 ORM 使用不当', ok: true, why: '延迟与连接打满；要批量/join/dataloader。' },
        { t: 'N+1 是数学恒等式证明', ok: false, why: '工程术语。' },
        { t: '有索引就不可能 N+1', ok: false, why: '索引不消除次数。' },
        { t: '只出现在 MongoDB', ok: false, why: '关系库更经典。' },
      ],
      relatedNodes: ['db-middleware', 'db-sql-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q5',
      q: '迁移（migration）上线策略较稳妥的是？',
      choices: [
        { t: '向后兼容的多步：先加列/双写，再切读，最后删旧——可回滚', ok: true, why: '大表锁与不可逆 DROP 是事故源。' },
        { t: '生产直接 DROP COLUMN 并希望客户端同步上线', ok: false, why: '竞态窗口。' },
        { t: '迁移可以不进版本库', ok: false, why: '要可复现。' },
        { t: '有 ORM 就不必考虑锁与耗时', ok: false, why: '仍要。' },
      ],
      relatedNodes: ['db-middleware', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q6',
      q: '「最终一致」适合什么，不适合什么？',
      choices: [
        { t: '适合可接受短暂滞后的计数/推荐；资金与库存关键路径常要更强保证或补偿', ok: true, why: '按业务选模型，不是时髦词。' },
        { t: '最终一致等于从不一致', ok: false, why: '会收敛。' },
        { t: '所有系统必须强一致否则非法', ok: false, why: '成本与可用性权衡。' },
        { t: '缓存 TTL 与一致性无关', ok: false, why: '强相关。' },
      ],
      relatedNodes: ['db-as-service', 'db-redis'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q7',
      q: '备份验证为什么比「有备份任务」更重要？',
      choices: [
        { t: '没人恢复过的备份等于没有；要定期演练恢复 RTO/RPO', ok: true, why: '专业运维底线。' },
        { t: '备份文件存在即保证可恢复', ok: false, why: '可能损坏/缺密钥。' },
        { t: '备份可以只留在同一块磁盘', ok: false, why: '同损风险。' },
        { t: '有 Docker volume 就不必备份', ok: false, why: '否。' },
      ],
      relatedNodes: ['host-backup', 'db-as-service'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-data-consistency:q8',
      q: 'Agent/会话状态该存在哪的决策框架？',
      choices: [
        { t: '按寿命与权威性：瞬时用内存、可恢复用库/对象存储，密钥仍走密管', ok: true, why: '别把一切塞进 prompt 或单一全局 Map。' },
        { t: '全部塞进前端 localStorage 当权威', ok: false, why: '不可信。' },
        { t: '全部硬编码进镜像', ok: false, why: '不可演化。' },
        { t: '状态可以不备份因为模型会记得', ok: false, why: '模型无持久记忆保证。' },
      ],
      relatedNodes: ['xrk-agent-workspace', 'db-sqlite', 'data-env'],
      tags: ['进阶'],
    },
  ],
});

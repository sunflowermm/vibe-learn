import { defineQuizSet } from '../schema.js';

/** OS / DB 大厂开口：进程线程、ACID、注入、Redis、虚拟内存 */
export default defineQuizSet({
  id: 'interview-os-db',
  title: '大厂 · 操作系统与数据库',
  kind: 'interview',
  domain: 'os-db',
  tags: ['OS', 'ACID', 'SQL', 'Redis'],
  relatedNodes: ['os-essence', 'db-essence', 'db-redis'],
  caption: '进程/线程、ACID、注入防御、Redis 定位。',
  questions: [
    {
      id: 'interview-os-db:process-thread',
      q: '操作系统里，进程（Process）与线程（Thread）的关键差别是什么？',
      choices: [
        {
          t: '进程有独立地址空间；同进程内线程共享该空间与多数资源',
          ok: true,
          why: '进程是资源分配单位，线程是调度单位。',
        },
        {
          t: '线程作为调度单位一定比进程慢很多',
          ok: false,
          why: '快慢取决于负载；线程切换通常更轻，但不是定义本身。',
        },
        {
          t: '一个进程在任何操作系统上只能有一个线程',
          ok: false,
          why: '现代 OS 普遍支持多线程。',
        },
        {
          t: '线程拥有完全独立的页表，互相看不见内存',
          ok: false,
          why: '那是进程隔离；同进程线程默认共享地址空间。',
        },
      ],
      relatedNodes: ['os-essence', 'computer-system'],
    },
    {
      id: 'interview-os-db:isolation',
      q: '数据库 ACID 中，Isolation（隔离性）主要约束的是什么？',
      choices: [
        {
          t: '并发事务彼此中间状态的可见程度，即隔离级别',
          ok: true,
          why: '与脏读、不可重复读、幻读相关。',
        },
        {
          t: '磁盘坏道出现时的自动硬件修复',
          ok: false,
          why: '属存储/运维，不是事务隔离性定义。',
        },
        {
          t: '仅指外键约束与 check 约束是否成立',
          ok: false,
          why: '约束更贴近 Consistency 的数据规则侧面。',
        },
        {
          t: '网络分区下必须优先保证可用性（CAP 里的 A）',
          ok: false,
          why: '那是分布式 CAP；ACID 隔离指单库并发可见性。',
        },
      ],
      relatedNodes: ['db-essence', 'db-as-service'],
    },
    {
      id: 'interview-os-db:redis',
      q: 'Redis 在系统架构里最常见的定位是什么？',
      choices: [
        {
          t: '内存数据结构服务：缓存、会话、限流、轻量队列等低延迟场景',
          ok: true,
          why: '快在内存；不适合替代复杂多表事务账本。',
        },
        {
          t: '完整替代 PostgreSQL/MySQL 做所有关系型业务账本',
          ok: false,
          why: '复杂 SQL 与强事务仍需要关系库。',
        },
        {
          t: '专门托管静态网站 HTML/CSS/JS 文件',
          ok: false,
          why: '静态文件通常由 Web 服务器或对象存储提供。',
        },
        {
          t: '实现浏览器排版引擎，渲染网页 DOM',
          ok: false,
          why: '排版在浏览器；与 Redis 存储角色无关。',
        },
      ],
      relatedNodes: ['db-redis', 'db-landscape'],
    },
    {
      id: 'interview-os-db:sqli',
      q: '防御 SQL 注入（SQL Injection）的根本做法是什么？',
      choices: [
        {
          t: '参数化查询/预编译绑定，把 SQL 结构与用户数据分离',
          ok: true,
          why: '数据作为参数传入，不能被解释成新语句。',
        },
        {
          t: '只在浏览器用正则去掉用户输入里的引号',
          ok: false,
          why: '客户端可被绕过；攻击者可直接调 API。',
        },
        {
          t: '把数据库密码写进 SQL 注释提高迷惑性',
          ok: false,
          why: '不能防注入，反而增加泄漏风险。',
        },
        {
          t: '关闭数据库审计日志，攻击者就注入不进来',
          ok: false,
          why: '关日志只影响追踪，不能阻止恶意 SQL。',
        },
      ],
      relatedNodes: ['db-sql-hands-on', 'craft-security'],
    },
    {
      id: 'interview-os-db:vmem',
      q: '操作系统中，虚拟内存（Virtual Memory）的主要作用是什么？',
      choices: [
        {
          t: '为每个进程提供独立虚拟地址空间，并支持换页等抽象',
          ok: true,
          why: '进程「以为」有连续大内存，由 OS 映射到物理页。',
        },
        {
          t: '让硬盘芯片直接执行机器指令，取代 CPU',
          ok: false,
          why: '存储不执行程序；虚拟内存是地址映射机制。',
        },
        {
          t: '取消文件系统，所有数据只能放内存',
          ok: false,
          why: '与文件系统正交；磁盘仍用于持久文件。',
        },
        {
          t: '保证任意程序都能 O(1) 访问无限物理内存',
          ok: false,
          why: '仍受物理 RAM 与策略限制；换页有代价。',
        },
      ],
      relatedNodes: ['os-essence', 'computer-system'],
    },
    {
      id: 'interview-os-db:atomicity',
      q: '事务 Atomicity（原子性）在 ACID 里指的是什么？',
      choices: [
        {
          t: '一组操作要么全部成功提交，要么全部回滚，不留部分成功',
          ok: true,
          why: '转账扣款与加款必须同生共死。',
        },
        {
          t: '允许并发事务任意读取彼此未提交的脏数据',
          ok: false,
          why: '脏读是隔离性不足，不是原子性定义。',
        },
        {
          t: '只保证应用服务器到数据库的网络 ping 通',
          ok: false,
          why: '网络可达是运维问题，不是事务语义。',
        },
        {
          t: '提交后数据可被随意改写且不需要任何日志',
          ok: false,
          why: '持久性要求提交后可恢复，不能随意丢。',
        },
      ],
      relatedNodes: ['db-essence', 'db-as-service'],
    },
  ],
});

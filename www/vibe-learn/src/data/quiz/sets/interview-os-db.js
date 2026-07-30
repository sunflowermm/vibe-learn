import { defineQuizSet } from '../schema.js';

/** OS / DB：对齐操作系统教材与 ACID / OWASP 常见表述 */
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
      q: '操作系统里，进程（Process）与线程（Thread）的关键差别是什么？',
      choices: [
        {
          t: '进程有独立地址空间；同进程内线程共享该空间与多数资源',
          ok: true,
          why: '教材标准对比：进程是资源分配单位，线程是调度单位。',
        },
        {
          t: '线程作为调度单位一定比进程慢很多',
          ok: false,
          why: '快慢取决于负载与实现；线程切换通常更轻，但不是定义。',
        },
        {
          t: '一个进程在任何操作系统上只能有一个线程',
          ok: false,
          why: '现代 OS 普遍支持多线程；例如浏览器就是多线程进程。',
        },
        {
          t: '线程拥有完全独立的页表，互相看不见内存',
          ok: false,
          why: '那是进程隔离；同进程线程默认共享虚拟地址空间。',
        },
      ],
    },
    {
      q: '数据库 ACID 中，Isolation（隔离性）主要约束的是什么？',
      choices: [
        {
          t: '并发事务彼此中间状态的可见程度，即隔离级别',
          ok: true,
          why: '与脏读、不可重复读、幻读相关；是事务并发控制核心。',
        },
        {
          t: '磁盘坏道出现时的自动硬件修复',
          ok: false,
          why: '属存储/运维范畴，不是事务隔离性的定义。',
        },
        {
          t: '仅指外键约束与 check 约束是否成立',
          ok: false,
          why: '约束更贴近 Consistency（一致性）的数据规则侧面。',
        },
        {
          t: '网络分区下必须优先保证可用性（CAP 里的 A）',
          ok: false,
          why: '那是分布式 CAP 讨论；经典 ACID 隔离性指单库并发可见性。',
        },
      ],
    },
    {
      q: 'Redis 在系统架构里最常见的定位是什么？',
      choices: [
        {
          t: '内存数据结构服务：缓存、会话、限流、轻量队列等低延迟场景',
          ok: true,
          why: 'Redis 快在内存；不适合替代复杂多表事务型账本。',
        },
        {
          t: '完整替代 PostgreSQL/MySQL 做所有关系型业务账本',
          ok: false,
          why: '复杂 SQL 与强事务场景仍需要关系库；Redis 是补充层。',
        },
        {
          t: '专门托管静态网站 HTML/CSS/JS 文件',
          ok: false,
          why: '静态文件通常由 Web 服务器或对象存储提供，不是 Redis 职责。',
        },
        {
          t: '实现浏览器排版引擎，渲染网页 DOM',
          ok: false,
          why: '排版在浏览器进程；与 Redis 数据存储角色无关。',
        },
      ],
    },
    {
      q: '防御 SQL 注入（SQL Injection）的根本做法是什么？',
      choices: [
        {
          t: '参数化查询/预编译绑定，把 SQL 结构与用户数据分离',
          ok: true,
          why: 'OWASP 推荐；数据作为参数传入，不能被解释成新语句。',
        },
        {
          t: '只在浏览器用正则去掉用户输入里的引号',
          ok: false,
          why: '客户端校验可被绕过；攻击者可直接调 API。',
        },
        {
          t: '把数据库密码写进 SQL 注释提高迷惑性',
          ok: false,
          why: '注释仍可能泄漏；且不能防止注入，反而增加风险。',
        },
        {
          t: '关闭数据库审计日志，攻击者就注入不进来',
          ok: false,
          why: '关日志只影响事后追踪，不能阻止恶意 SQL 执行。',
        },
      ],
    },
    {
      q: '操作系统中，虚拟内存（Virtual Memory）的主要作用是什么？',
      choices: [
        {
          t: '为每个进程提供独立虚拟地址空间，并支持换页等抽象',
          ok: true,
          why: '让进程「以为」有连续大内存，实际由 OS 映射到物理页。',
        },
        {
          t: '让硬盘芯片直接执行机器指令，取代 CPU',
          ok: false,
          why: '存储设备不执行程序；虚拟内存是地址映射机制。',
        },
        {
          t: '取消文件系统，所有数据只能放内存',
          ok: false,
          why: '虚拟内存与文件系统正交；磁盘仍用于持久文件。',
        },
        {
          t: '保证任意程序都能 O(1) 访问无限物理内存',
          ok: false,
          why: '仍受物理 RAM 与 OS 策略限制；换页也有性能代价。',
        },
      ],
    },
    {
      q: '事务 Atomicity（原子性）在 ACID 里指的是什么？',
      choices: [
        {
          t: '一组操作要么全部成功提交，要么全部回滚，不留部分成功',
          ok: true,
          why: '转账扣款与加款必须同生共死，是原子性经典例子。',
        },
        {
          t: '允许并发事务任意读取彼此未提交的脏数据',
          ok: false,
          why: '脏读是隔离性不足的表现，与原子性定义不同。',
        },
        {
          t: '只保证应用服务器到数据库的网络 ping 通',
          ok: false,
          why: '网络可达是运维问题，不是事务原子性语义。',
        },
        {
          t: '提交后数据可被随意改写且不需要任何日志',
          ok: false,
          why: '持久性（Durability）要求提交后可通过日志恢复，不能随意丢。',
        },
      ],
    },
  ],
});

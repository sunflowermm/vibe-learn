export default `# MySQL

> **分类：开源关系型 DBMS**（生态极广：LAMP、大量历史 Web）。  
> 独立服务（默认 **3306**）。本仓**未**定为 Runtime 必需；若业务需要由产品 Core 自管。  
> **学会之后**：能口述 MySQL vs PostgreSQL 粗线条差异，并拒绝「MySQL 是语言/框架」说法。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 关系型 C/S DBMS；InnoDB 是常见存储引擎 |
| 端口直觉 | 默认 3306；MariaDB 常兼容但非 100% 同一产品 |
| 本仓 | Runtime 不强制 MySQL；勿发明全局必需 \`mysql\` |
| 对照 | vs PG（存量/扩展）、vs Redis/SQLite（模型/形态） |

\`\`\`check
{"title":"MySQL 通关","items":[{"id":"what","text":"能说明：关系型 C/S DBMS；InnoDB 常见","hint":"分类"},{"id":"port","text":"默认 3306；MariaDB 近亲但非 100% 同一产品","hint":"形态"},{"id":"xrk","text":"知道 Runtime 不强制 MySQL；勿发明全局必需","hint":"本仓"}]}
\`\`\`

## 1. 要点

| 点 | 说明 |
|----|------|
| **模型** | 表 + SQL；InnoDB 事务常见默认 |
| **定位** | 读多写中、Web 业务、存量系统极多 |
| **流行度** | DB-Engines 长期前列（分数见 **版图**） |
| **近亲** | MariaDB 等兼容生态 |

\`\`\`mermaid
flowchart LR
  App[应用] -->|SQL| My[mysqld]
  My --> Disk[(数据目录)]
\`\`\`

## 2. 与 PostgreSQL 怎么口述

| 维度 | 粗线条（细节以当前版本为准） |
|------|------------------------------|
| 生态惯性 | MySQL 在传统 Web / LAMP 存量更大 |
| 功能广度 | PostgreSQL 扩展与标准符合度常被夸 |
| 选型 | 团队熟悉度、云托管、扩展需求、市场需求（招人） |
| 共同点 | 都是 **关系库服务 / 数据中间件**，不是语言 |

## 3. 何时会碰到

| 场景 | 说明 |
|------|------|
| 面板一键 LNMP | 宝塔等常默认装 MySQL/MariaDB |
| 历史业务迁移 | 大量 PHP/Java 存量 |
| 本仓新业务 | 优先问：要不要关系库 → PG/MySQL 谁熟 → 走可选 Core |

## 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **InnoDB** | MySQL 最常见事务型存储引擎 | 账务类表几乎必用 | 别和旧 **MyISAM**（表级锁为主）混 |
| **存储引擎** | 负责行怎么落盘、怎么加锁的插件层 | 同实例不同表可不同引擎（少见） | 引擎 ≠ 换数据库产品 |
| **主从复制** | 一主多从，日志同步 | 读多写少时读从库 | 复制延迟 ≠ 事务失败 |
| **LAMP** | Linux + Apache + MySQL + PHP | 解释 MySQL 存量为何巨大 | 不是现代唯一答案 |
| **MariaDB** | MySQL 社区分支，高度兼容 | 部分发行版默认装 MariaDB | 兼容 ≠ 永远 100% 行为一致 |
| **本仓落点** | Runtime **不**强制 MySQL | 需要时产品 Core 自管 | 别把「会装 MySQL」当成「本仓必需」 |

\`\`\`quiz
{"title":"MySQL","questions":[{"q":"面板装了 MySQL，是否等于本仓 Runtime 依赖 MySQL？","choices":[{"t":"是，主服启动会连 MySQL","ok":false,"why":"Runtime 必需是 Redis + SQLite。"},{"t":"否；面板数据库与本仓契约是两层","ok":true,"why":"业务 Core 才可能自管 MySQL。"},{"t":"是，因为 MySQL 是 Node 运行时","ok":false,"why":"完全不是一层。"}]}]}
\`\`\`

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 面板 LNMP | 与本仓 Runtime **解耦**；装了 ≠ 主服依赖 |
| 业务需要 | 产品 Core 自管；**勿**写进 Runtime fail-fast |
| 契约真源 | 第四章 **数据与缓存** · \`docs/database.md\` |

## 下一步

**其它常见库** — Oracle、SQL Server、搜索与向量；  
回 **版图与流行度**。
`;

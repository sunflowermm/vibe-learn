/**
 * 改编题库 · interview-adapted-guo-sys
 * 系统非原创 · AI 全栈向 · 中文 · guocong-bincai/ai-interview-guide · 25-system-design-ai
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    "id": "adapted:guo-sys:q1",
    "q": "设计一个百万 DAU 的 AI 客服系统（核心高频考题）",
    "choices": [
      {
        "t": "题目理解： ``` 百万 DAU 的 AI 客服系统： - 日活用户：100 万 - 峰值 QPS：约 1 万（按 10% 同时在线估算） - 核心目标：低成本、高可用、快速响应 ``` 整体架构： ``` 用户请求 ↓ ┌────────",
        "ok": true,
        "why": "题目理解： ``` 百万 DAU 的 AI 客服系统： - 日活用户：100 万 - 峰值 QPS：约 1 万（按 10% 同时在线估算） - 核心目标：低成本、高可用、快速响应 ``` 整体架构： ``` 用户请求 ↓ ┌─────────────────────────────────────────────┐ │ CDN / 边缘节点 │ │ （静态资源 + 就近接入） │ └───────"
      },
      {
        "t": "题目理解： ``` LLM API 网关： - 限流：防止用户打爆 API 配额 - 路由：多模型选择、成本优化 - 计费：按使用量收费，支持多租户 - 核心挑战：高并发、低延迟、可观测 ``` 整体架构： ``` 外部请求 ↓ ┌────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` AI 内容审核： - 实时链路：用户发内容 → 立即审核 → 通过/拦截 - 离线链路：历史内容扫描 → 违规内容下架 - 核心挑战：低延迟 + 高准确率 + 可解释 ``` 双链路架构： ``` 用户发布内容 ↓ ┌─",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` 企业知识库 RAG 平台： - 多租户：多个企业客户共享基础设施，数据隔离 - 权限隔离：租户内成员有不同权限（管理员/编辑/查看） - 核心挑战：数据隔离 + 检索质量 + 成本控制 ``` 整体架构： ``` 租户 ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "系统设计",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-agent-birth",
      "craft-security"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 25-system-design-ai",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-sys"
  },
  {
    "id": "adapted:guo-sys:q2",
    "q": "设计企业知识库 RAG 平台（多租户 + 权限隔离）",
    "choices": [
      {
        "t": "题目理解： ``` 企业知识库 RAG 平台： - 多租户：多个企业客户共享基础设施，数据隔离 - 权限隔离：租户内成员有不同权限（管理员/编辑/查看） - 核心挑战：数据隔离 + 检索质量 + 成本控制 ``` 整体架构： ``` 租户 ",
        "ok": true,
        "why": "题目理解： ``` 企业知识库 RAG 平台： - 多租户：多个企业客户共享基础设施，数据隔离 - 权限隔离：租户内成员有不同权限（管理员/编辑/查看） - 核心挑战：数据隔离 + 检索质量 + 成本控制 ``` 整体架构： ``` 租户 A 的用户 ↓ ┌─────────────────────────────────────────────────────┐ │ API 网关 │ │ 认证 "
      },
      {
        "t": "题目理解： ``` AI 任务队列： - 异步处理：AI 生成耗时长，不能同步等 - 避免超时：长任务不超时、不丢失 - 保证顺序：同一用户的请求要按顺序处理 - 核心挑战：可靠性 + 延迟 + 顺序保证 ``` 问题分析： ``` AI ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` 百万 DAU 的 AI 客服系统： - 日活用户：100 万 - 峰值 QPS：约 1 万（按 10% 同时在线估算） - 核心目标：低成本、高可用、快速响应 ``` 整体架构： ``` 用户请求 ↓ ┌────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` LLM API 网关： - 限流：防止用户打爆 API 配额 - 路由：多模型选择、成本优化 - 计费：按使用量收费，支持多租户 - 核心挑战：高并发、低延迟、可观测 ``` 整体架构： ``` 外部请求 ↓ ┌────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "系统设计",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-agent-birth",
      "craft-security"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 25-system-design-ai",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-sys"
  },
  {
    "id": "adapted:guo-sys:q3",
    "q": "设计一个 LLM API 网关（限流 + 路由 + 计费）",
    "choices": [
      {
        "t": "题目理解： ``` LLM API 网关： - 限流：防止用户打爆 API 配额 - 路由：多模型选择、成本优化 - 计费：按使用量收费，支持多租户 - 核心挑战：高并发、低延迟、可观测 ``` 整体架构： ``` 外部请求 ↓ ┌────",
        "ok": true,
        "why": "题目理解： ``` LLM API 网关： - 限流：防止用户打爆 API 配额 - 路由：多模型选择、成本优化 - 计费：按使用量收费，支持多租户 - 核心挑战：高并发、低延迟、可观测 ``` 整体架构： ``` 外部请求 ↓ ┌──────────────────────────────────────────────────────────┐ │ API Gateway │ │ 统一入口 │"
      },
      {
        "t": "题目理解： ``` AI 内容审核： - 实时链路：用户发内容 → 立即审核 → 通过/拦截 - 离线链路：历史内容扫描 → 违规内容下架 - 核心挑战：低延迟 + 高准确率 + 可解释 ``` 双链路架构： ``` 用户发布内容 ↓ ┌─",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` 企业知识库 RAG 平台： - 多租户：多个企业客户共享基础设施，数据隔离 - 权限隔离：租户内成员有不同权限（管理员/编辑/查看） - 核心挑战：数据隔离 + 检索质量 + 成本控制 ``` 整体架构： ``` 租户 ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` AI 任务队列： - 异步处理：AI 生成耗时长，不能同步等 - 避免超时：长任务不超时、不丢失 - 保证顺序：同一用户的请求要按顺序处理 - 核心挑战：可靠性 + 延迟 + 顺序保证 ``` 问题分析： ``` AI ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "系统设计",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-agent-birth",
      "craft-security"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 25-system-design-ai",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-sys"
  },
  {
    "id": "adapted:guo-sys:q4",
    "q": "如何设计 AI 任务队列系统（避免超时、保证顺序）",
    "choices": [
      {
        "t": "题目理解： ``` AI 任务队列： - 异步处理：AI 生成耗时长，不能同步等 - 避免超时：长任务不超时、不丢失 - 保证顺序：同一用户的请求要按顺序处理 - 核心挑战：可靠性 + 延迟 + 顺序保证 ``` 问题分析： ``` AI ",
        "ok": true,
        "why": "题目理解： ``` AI 任务队列： - 异步处理：AI 生成耗时长，不能同步等 - 避免超时：长任务不超时、不丢失 - 保证顺序：同一用户的请求要按顺序处理 - 核心挑战：可靠性 + 延迟 + 顺序保证 ``` 问题分析： ``` AI 任务的特点： 1. 耗时长（10s-5min）→ 不能同步等 → 必须异步 2."
      },
      {
        "t": "题目理解： ``` 百万 DAU 的 AI 客服系统： - 日活用户：100 万 - 峰值 QPS：约 1 万（按 10% 同时在线估算） - 核心目标：低成本、高可用、快速响应 ``` 整体架构： ``` 用户请求 ↓ ┌────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` LLM API 网关： - 限流：防止用户打爆 API 配额 - 路由：多模型选择、成本优化 - 计费：按使用量收费，支持多租户 - 核心挑战：高并发、低延迟、可观测 ``` 整体架构： ``` 外部请求 ↓ ┌────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` AI 内容审核： - 实时链路：用户发内容 → 立即审核 → 通过/拦截 - 离线链路：历史内容扫描 → 违规内容下架 - 核心挑战：低延迟 + 高准确率 + 可解释 ``` 双链路架构： ``` 用户发布内容 ↓ ┌─",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "系统设计",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-birth",
      "craft-observability"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 25-system-design-ai",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-sys"
  },
  {
    "id": "adapted:guo-sys:q5",
    "q": "设计一个 AI 内容审核系统（实时 + 离线双链路）",
    "choices": [
      {
        "t": "题目理解： ``` AI 内容审核： - 实时链路：用户发内容 → 立即审核 → 通过/拦截 - 离线链路：历史内容扫描 → 违规内容下架 - 核心挑战：低延迟 + 高准确率 + 可解释 ``` 双链路架构： ``` 用户发布内容 ↓ ┌─",
        "ok": true,
        "why": "题目理解： ``` AI 内容审核： - 实时链路：用户发内容 → 立即审核 → 通过/拦截 - 离线链路：历史内容扫描 → 违规内容下架 - 核心挑战：低延迟 + 高准确率 + 可解释 ``` 双链路架构： ``` 用户发布内容 ↓ ┌──────────────────────────────────────────────────────────┐ │ 实时审核链路（ ModerationR"
      },
      {
        "t": "题目理解： ``` 企业知识库 RAG 平台： - 多租户：多个企业客户共享基础设施，数据隔离 - 权限隔离：租户内成员有不同权限（管理员/编辑/查看） - 核心挑战：数据隔离 + 检索质量 + 成本控制 ``` 整体架构： ``` 租户 ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` AI 任务队列： - 异步处理：AI 生成耗时长，不能同步等 - 避免超时：长任务不超时、不丢失 - 保证顺序：同一用户的请求要按顺序处理 - 核心挑战：可靠性 + 延迟 + 顺序保证 ``` 问题分析： ``` AI ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "题目理解： ``` 百万 DAU 的 AI 客服系统： - 日活用户：100 万 - 峰值 QPS：约 1 万（按 10% 同时在线估算） - 核心目标：低成本、高可用、快速响应 ``` 整体架构： ``` 用户请求 ↓ ┌────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "系统设计",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-agent-birth",
      "craft-security"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 25-system-design-ai",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-sys"
  }
];

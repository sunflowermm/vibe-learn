/**
 * 改编题库 · interview-adapted-guo-multi-agent
 * 系统非原创 · AI 全栈向 · 中文 · guocong-bincai/ai-interview-guide · 13-multi-agent-systems
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    "id": "adapted:guo-multi-agent:q1",
    "q": "什么是 AI Agent？核心组件是什么？",
    "choices": [
      {
        "t": "AI Agent = 能自主决策和行动的 AI 核心组件： ``` ┌─────────────────────────────────────────┐ │ AI Agent │ ├────────────────────────────",
        "ok": true,
        "why": "AI Agent = 能自主决策和行动的 AI 核心组件： ``` ┌─────────────────────────────────────────┐ │ AI Agent │ ├─────────────────────────────────────────┤ │ 1. LLM（大脑） - 负责决策和推理 │ │ 2."
      },
      {
        "t": "短期记忆： - 存储最近 N 轮对话 - 用列表或环形缓冲区 - 超出限制时总结或截断 长期记忆： - 存储重要信息到向量数据库 - 按需检索相关记忆 - 支持遗忘机制（删除过期记忆） 实现示例： ```python class Agent",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "A2A vs MCP 的核心差异（面试必考）： ``` A2A = \"Agent 找 Agent\" → 能力注册 + 任务委托 + 状态同步 MCP = \"Agent 找工具\" → 工具发现 + 调用执行 + 结果返回 类比： - MCP ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "| 维度 | ReAct | Plan-and-Execute | |------|-------|------------------| | 流程 | 思考→行动→观察（循环） | 先规划→再执行 | | 可控性 | 低（动态决策） | ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-memory",
      "ai-agent-planning",
      "ai-mcp"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q2",
    "q": "ReAct 模式是什么？完整流程是什么？",
    "choices": [
      {
        "t": "ReAct = Reasoning + Acting（推理 + 行动） 完整流程： ``` 1. Thought（思考）：分析当前情况，决定下一步 2.",
        "ok": true,
        "why": "ReAct = Reasoning + Acting（推理 + 行动） 完整流程： ``` 1. Thought（思考）：分析当前情况，决定下一步 2."
      },
      {
        "t": "A2A多Agent编排完整流程： ``` ┌─────────────────────────────────────────────────────────┐ │ A2A多Agent发现与委托流程 │ └─────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "扁平 vs 层级架构对比： ``` 扁平架构（Flat）： ┌─────────────────────────────────────┐ │ Orchestrator │ │ （单点协调，所有决策） │ └────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "典型架构： ``` ┌─────────────────────────────────────────────────────────┐ │ 多 Agent 协作系统 │ └────────────────────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-planning",
      "ai-agent-birth",
      "ai-protocol-forks"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q3",
    "q": "函数调用的原理是什么？",
    "choices": [
      {
        "t": "Function Calling = 让 LLM 调用外部函数 原理： 1. 定义工具 Schema（函数名、参数、描述） 2.",
        "ok": true,
        "why": "Function Calling = 让 LLM 调用外部函数 原理： 1. 定义工具 Schema（函数名、参数、描述） 2."
      },
      {
        "t": "核心洞察：两个协议不在同一层次 很多人把 MCP 和 A2A 当竞争关系来问，这是最大的误区。它们解决的是不同层次的问题： ``` ┌─────────────────────────────────────────┐ │ 编排器 Agen",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "背景：2026年5月 Moonshot AI 发布 Kimi K2.6 Kimi K2.5 在 2026年1月 引入了 Agent Swarm（100个并行子Agent），K2.6 把这个数字提升到了 300 个子Agent、4000 步并",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "案例 1：客服 Agent ``` 功能：自动回答用户咨询 架构：意图识别 → RAG 检索 → 答案生成 → 人工兜底 成果：解决 80% 常见问题，人工成本降低 60% ``` 案例 2：数据分析 Agent ``` 功能：自然语言查询",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-tool-calling",
      "ai-mcp"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q4",
    "q": "如何防止 Agent 进入死循环？",
    "choices": [
      {
        "t": "问题原因： 1. 工具调用失败，Agent 重复尝试 2.",
        "ok": true,
        "why": "问题原因： 1. 工具调用失败，Agent 重复尝试 2."
      },
      {
        "t": "单Agent的三个结构性瓶颈（为什么需要多Agent） ``` 即使 1M token 上下文，处理 500 个文件代码库 + 100 篇参考文献 + 多轮对话历史 仍然力不从心——三个结构性瓶颈不是靠更大模型能解决的： ① 上下文窗口瓶颈",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "AI Agent = 能自主决策和行动的 AI 核心组件： ``` ┌─────────────────────────────────────────┐ │ AI Agent │ ├────────────────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "短期记忆： - 存储最近 N 轮对话 - 用列表或环形缓冲区 - 超出限制时总结或截断 长期记忆： - 存储重要信息到向量数据库 - 按需检索相关记忆 - 支持遗忘机制（删除过期记忆） 实现示例： ```python class Agent",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-memory",
      "ai-tool-calling",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q5",
    "q": "计划与执行和反应有什么区别？",
    "choices": [
      {
        "t": "| 维度 | ReAct | Plan-and-Execute | |------|-------|------------------| | 流程 | 思考→行动→观察（循环） | 先规划→再执行 | | 可控性 | 低（动态决策） | ",
        "ok": true,
        "why": "| 维度 | ReAct | Plan-and-Execute | |------|-------|------------------| | 流程 | 思考→行动→观察（循环） | 先规划→再执行 | | 可控性 | 低（动态决策） | 高（预先规划） | | 可解释性 | 中 | 高（计划可见） | | 适用场景 | 探索性任务 | 确定性任务 | Plan-and-Execute 流程： `"
      },
      {
        "t": "ArXiv 2026年4月2日AI Agent研究概览 ``` 当日收录：25篇cs.AI论文 其中直接相关：约12篇 覆盖维度：基础架构/性能评估/多智能体协作/实际应用 ``` --- 研究热点一：HippoCamp——PC环境多模态A",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "ReAct = Reasoning + Acting（推理 + 行动） 完整流程： ``` 1. Thought（思考）：分析当前情况，决定下一步 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "A2A多Agent编排完整流程： ``` ┌─────────────────────────────────────────────────────────┐ │ A2A多Agent发现与委托流程 │ └─────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-planning",
      "ai-agent-birth",
      "ai-protocol-forks"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q6",
    "q": "多 Agent 协作怎么设计？",
    "choices": [
      {
        "t": "典型架构： ``` ┌─────────────────────────────────────────────────────────┐ │ 多 Agent 协作系统 │ └────────────────────────────────",
        "ok": true,
        "why": "典型架构： ``` ┌─────────────────────────────────────────────────────────┐ │ 多 Agent 协作系统 │ └─────────────────────────────────────────────────────────┘ 用户问题 │ ▼ ┌─────────────┐ │ Coordinator │ ← 协调者（分配任务） "
      },
      {
        "t": "背景：学术图表生成的痛点 AI 可以帮研究者写文字，但生成顶会/期刊需要的复杂方法图和精确统计图要难得多——这需要理解技术内容、遵循学术规范、还要视觉美观。 PaperVizAgent 解决方案：五Agent协作系统 ``` ┌──────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "Function Calling = 让 LLM 调用外部函数 原理： 1. 定义工具 Schema（函数名、参数、描述） 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "核心洞察：两个协议不在同一层次 很多人把 MCP 和 A2A 当竞争关系来问，这是最大的误区。它们解决的是不同层次的问题： ``` ┌─────────────────────────────────────────┐ │ 编排器 Agen",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-tool-calling",
      "ai-mcp",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q7",
    "q": "你设计过哪些类型的 Agent？",
    "choices": [
      {
        "t": "案例 1：客服 Agent ``` 功能：自动回答用户咨询 架构：意图识别 → RAG 检索 → 答案生成 → 人工兜底 成果：解决 80% 常见问题，人工成本降低 60% ``` 案例 2：数据分析 Agent ``` 功能：自然语言查询",
        "ok": true,
        "why": "案例 1：客服 Agent ``` 功能：自动回答用户咨询 架构：意图识别 → RAG 检索 → 答案生成 → 人工兜底 成果：解决 80% 常见问题，人工成本降低 60% ``` 案例 2：数据分析 Agent ``` 功能：自然语言查询数据库 架构：NL2SQL → SQL 执行 → 结果可视化 成果：非技术人员也能自助分析数据 ``` 案例 3：代码生成 Agent ``` 功能：根据需求生"
      },
      {
        "t": "背景：Skills 是 2026 年 Agent 架构的新关键词 2026 年，随着多 Agent 系统成熟，\"Skills\" 作为独立概念从 \"Tools\" 中分离出来。Skills = 知识 + 行为模式 + 示例 + SOP，比 To",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "问题原因： 1. 工具调用失败，Agent 重复尝试 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "单Agent的三个结构性瓶颈（为什么需要多Agent） ``` 即使 1M token 上下文，处理 500 个文件代码库 + 100 篇参考文献 + 多轮对话历史 仍然力不从心——三个结构性瓶颈不是靠更大模型能解决的： ① 上下文窗口瓶颈",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-tool-calling",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q8",
    "q": "Agent的记忆怎么设计？",
    "choices": [
      {
        "t": "短期记忆： - 存储最近 N 轮对话 - 用列表或环形缓冲区 - 超出限制时总结或截断 长期记忆： - 存储重要信息到向量数据库 - 按需检索相关记忆 - 支持遗忘机制（删除过期记忆） 实现示例： ```python class Agent",
        "ok": true,
        "why": "短期记忆： - 存储最近 N 轮对话 - 用列表或环形缓冲区 - 超出限制时总结或截断 长期记忆： - 存储重要信息到向量数据库 - 按需检索相关记忆 - 支持遗忘机制（删除过期记忆） 实现示例： ```python class AgentMemory: def __init__(self): self.short_term = [] # 最近 10 轮对话 self.long_term = Ve"
      },
      {
        "t": "A2A vs MCP 的核心差异（面试必考）： ``` A2A = \"Agent 找 Agent\" → 能力注册 + 任务委托 + 状态同步 MCP = \"Agent 找工具\" → 工具发现 + 调用执行 + 结果返回 类比： - MCP ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "| 维度 | ReAct | Plan-and-Execute | |------|-------|------------------| | 流程 | 思考→行动→观察（循环） | 先规划→再执行 | | 可控性 | 低（动态决策） | ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "ArXiv 2026年4月2日AI Agent研究概览 ``` 当日收录：25篇cs.AI论文 其中直接相关：约12篇 覆盖维度：基础架构/性能评估/多智能体协作/实际应用 ``` --- 研究热点一：HippoCamp——PC环境多模态A",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-memory",
      "ai-agent-planning",
      "ai-mcp"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q12",
    "q": "如何用A2A协议实现企业级多Agent编排？Agent发现和任务委托流程是什么？",
    "choices": [
      {
        "t": "A2A多Agent编排完整流程： ``` ┌─────────────────────────────────────────────────────────┐ │ A2A多Agent发现与委托流程 │ └─────────────────",
        "ok": true,
        "why": "A2A多Agent编排完整流程： ``` ┌─────────────────────────────────────────────────────────┐ │ A2A多Agent发现与委托流程 │ └─────────────────────────────────────────────────────────┘ Step 1: Agent注册 Agent启动 → 发布Agent Card"
      },
      {
        "t": "扁平 vs 层级架构对比： ``` 扁平架构（Flat）： ┌─────────────────────────────────────┐ │ Orchestrator │ │ （单点协调，所有决策） │ └────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "典型架构： ``` ┌─────────────────────────────────────────────────────────┐ │ 多 Agent 协作系统 │ └────────────────────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "背景：学术图表生成的痛点 AI 可以帮研究者写文字，但生成顶会/期刊需要的复杂方法图和精确统计图要难得多——这需要理解技术内容、遵循学术规范、还要视觉美观。 PaperVizAgent 解决方案：五Agent协作系统 ``` ┌──────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-birth",
      "ai-protocol-forks"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q14",
    "q": "如何设计 A2A + MCP 混合架构？企业级多智能体生产部署有哪些核心检查项？",
    "choices": [
      {
        "t": "核心洞察：两个协议不在同一层次 很多人把 MCP 和 A2A 当竞争关系来问，这是最大的误区。它们解决的是不同层次的问题： ``` ┌─────────────────────────────────────────┐ │ 编排器 Agen",
        "ok": true,
        "why": "核心洞察：两个协议不在同一层次 很多人把 MCP 和 A2A 当竞争关系来问，这是最大的误区。它们解决的是不同层次的问题： ``` ┌─────────────────────────────────────────┐ │ 编排器 Agent（Orchestrator） │ │ ┌───────────────────────────────────┐ │ │ │ A2A：Agent 间委派与协作"
      },
      {
        "t": "背景：2026年5月 Moonshot AI 发布 Kimi K2.6 Kimi K2.5 在 2026年1月 引入了 Agent Swarm（100个并行子Agent），K2.6 把这个数字提升到了 300 个子Agent、4000 步并",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "案例 1：客服 Agent ``` 功能：自动回答用户咨询 架构：意图识别 → RAG 检索 → 答案生成 → 人工兜底 成果：解决 80% 常见问题，人工成本降低 60% ``` 案例 2：数据分析 Agent ``` 功能：自然语言查询",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "背景：Skills 是 2026 年 Agent 架构的新关键词 2026 年，随着多 Agent 系统成熟，\"Skills\" 作为独立概念从 \"Tools\" 中分离出来。Skills = 知识 + 行为模式 + 示例 + SOP，比 To",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-mcp",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q14",
    "q": "多Agent系统有哪些主流架构模式？Commander、P2P、Hybrid三种模式各适合什么场景？CrewAI/AutoGen/LangGraph/MCP/A2A如何选择？",
    "choices": [
      {
        "t": "单Agent的三个结构性瓶颈（为什么需要多Agent） ``` 即使 1M token 上下文，处理 500 个文件代码库 + 100 篇参考文献 + 多轮对话历史 仍然力不从心——三个结构性瓶颈不是靠更大模型能解决的： ① 上下文窗口瓶颈",
        "ok": true,
        "why": "单Agent的三个结构性瓶颈（为什么需要多Agent） ``` 即使 1M token 上下文，处理 500 个文件代码库 + 100 篇参考文献 + 多轮对话历史 仍然力不从心——三个结构性瓶颈不是靠更大模型能解决的： ① 上下文窗口瓶颈 \"Lost in the Middle\" 效应 上下文越长，模型对中间部分注意力越弱 ② 专业化瓶颈 一个 Agent 很难同时在代码审查、安全审计、UI设计"
      },
      {
        "t": "AI Agent = 能自主决策和行动的 AI 核心组件： ``` ┌─────────────────────────────────────────┐ │ AI Agent │ ├────────────────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "短期记忆： - 存储最近 N 轮对话 - 用列表或环形缓冲区 - 超出限制时总结或截断 长期记忆： - 存储重要信息到向量数据库 - 按需检索相关记忆 - 支持遗忘机制（删除过期记忆） 实现示例： ```python class Agent",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "A2A vs MCP 的核心差异（面试必考）： ``` A2A = \"Agent 找 Agent\" → 能力注册 + 任务委托 + 状态同步 MCP = \"Agent 找工具\" → 工具发现 + 调用执行 + 结果返回 类比： - MCP ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-hybrid-search",
      "ai-agent-memory",
      "ai-mcp"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q16",
    "q": "2026年4月ArXiv有哪些值得关注的AI代理研究？HippoCamp/OmniMem/HERA/BloClaw/NARCBench分别代表了什么方向？",
    "choices": [
      {
        "t": "ArXiv 2026年4月2日AI Agent研究概览 ``` 当日收录：25篇cs.AI论文 其中直接相关：约12篇 覆盖维度：基础架构/性能评估/多智能体协作/实际应用 ``` --- 研究热点一：HippoCamp——PC环境多模态A",
        "ok": true,
        "why": "ArXiv 2026年4月2日AI Agent研究概览 ``` 当日收录：25篇cs.AI论文 其中直接相关：约12篇 覆盖维度：基础架构/性能评估/多智能体协作/实际应用 ``` --- 研究热点一：HippoCamp——PC环境多模态Agent基准测试 ``` 论文：HippoCamp: Benchmarking Contextual Agents on Personal Computers "
      },
      {
        "t": "ReAct = Reasoning + Acting（推理 + 行动） 完整流程： ``` 1. Thought（思考）：分析当前情况，决定下一步 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "A2A多Agent编排完整流程： ``` ┌─────────────────────────────────────────────────────────┐ │ A2A多Agent发现与委托流程 │ └─────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "扁平 vs 层级架构对比： ``` 扁平架构（Flat）： ┌─────────────────────────────────────┐ │ Orchestrator │ │ （单点协调，所有决策） │ └────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-planning",
      "ai-agent-birth",
      "ai-protocol-forks"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q17",
    "q": "PaperVizAgent 的五Agent架构是什么？为什么\"Critic循环\"是生成高质量学术图表的关键？",
    "choices": [
      {
        "t": "背景：学术图表生成的痛点 AI 可以帮研究者写文字，但生成顶会/期刊需要的复杂方法图和精确统计图要难得多——这需要理解技术内容、遵循学术规范、还要视觉美观。 PaperVizAgent 解决方案：五Agent协作系统 ``` ┌──────",
        "ok": true,
        "why": "背景：学术图表生成的痛点 AI 可以帮研究者写文字，但生成顶会/期刊需要的复杂方法图和精确统计图要难得多——这需要理解技术内容、遵循学术规范、还要视觉美观。 PaperVizAgent 解决方案：五Agent协作系统 ``` ┌─────────────────────────────────────────────────────┐ │ PaperVizAgent 架构 │ ├─────────"
      },
      {
        "t": "Function Calling = 让 LLM 调用外部函数 原理： 1. 定义工具 Schema（函数名、参数、描述） 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "核心洞察：两个协议不在同一层次 很多人把 MCP 和 A2A 当竞争关系来问，这是最大的误区。它们解决的是不同层次的问题： ``` ┌─────────────────────────────────────────┐ │ 编排器 Agen",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "背景：2026年5月 Moonshot AI 发布 Kimi K2.6 Kimi K2.5 在 2026年1月 引入了 Agent Swarm（100个并行子Agent），K2.6 把这个数字提升到了 300 个子Agent、4000 步并",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-tool-calling",
      "ai-mcp",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q18",
    "q": "什么是 Agent Skills？为什么 2026 年\"Skills\"成为独立概念？和 Tools 有什么区别？Dify Nacos A2A 插件解决什么问题？",
    "choices": [
      {
        "t": "背景：Skills 是 2026 年 Agent 架构的新关键词 2026 年，随着多 Agent 系统成熟，\"Skills\" 作为独立概念从 \"Tools\" 中分离出来。Skills = 知识 + 行为模式 + 示例 + SOP，比 To",
        "ok": true,
        "why": "背景：Skills 是 2026 年 Agent 架构的新关键词 2026 年，随着多 Agent 系统成熟，\"Skills\" 作为独立概念从 \"Tools\" 中分离出来。Skills = 知识 + 行为模式 + 示例 + SOP，比 Tools 的粒度更粗、更面向业务。 Tools vs Skills 本质区别： ``` ┌────────────────────────────────────"
      },
      {
        "t": "问题原因： 1. 工具调用失败，Agent 重复尝试 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "单Agent的三个结构性瓶颈（为什么需要多Agent） ``` 即使 1M token 上下文，处理 500 个文件代码库 + 100 篇参考文献 + 多轮对话历史 仍然力不从心——三个结构性瓶颈不是靠更大模型能解决的： ① 上下文窗口瓶颈",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "AI Agent = 能自主决策和行动的 AI 核心组件： ``` ┌─────────────────────────────────────────┐ │ AI Agent │ ├────────────────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-tool-calling",
      "ai-agent-birth",
      "ai-token-context"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q19",
    "q": "A2A 和 MCP 协议边界在哪里？什么场景必须 A2A+MCP 混合，不能只用某一个？",
    "choices": [
      {
        "t": "A2A vs MCP 的核心差异（面试必考）： ``` A2A = \"Agent 找 Agent\" → 能力注册 + 任务委托 + 状态同步 MCP = \"Agent 找工具\" → 工具发现 + 调用执行 + 结果返回 类比： - MCP ",
        "ok": true,
        "why": "A2A vs MCP 的核心差异（面试必考）： ``` A2A = \"Agent 找 Agent\" → 能力注册 + 任务委托 + 状态同步 MCP = \"Agent 找工具\" → 工具发现 + 调用执行 + 结果返回 类比： - MCP = USB 协议 → 鼠标、键盘插入电脑就能用 - A2A = HTTP 协议 → 浏览器找服务器通信 一个 Agent 要调用外部工具 → MCP 两个 Ag"
      },
      {
        "t": "| 维度 | ReAct | Plan-and-Execute | |------|-------|------------------| | 流程 | 思考→行动→观察（循环） | 先规划→再执行 | | 可控性 | 低（动态决策） | ",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "ArXiv 2026年4月2日AI Agent研究概览 ``` 当日收录：25篇cs.AI论文 其中直接相关：约12篇 覆盖维度：基础架构/性能评估/多智能体协作/实际应用 ``` --- 研究热点一：HippoCamp——PC环境多模态A",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "ReAct = Reasoning + Acting（推理 + 行动） 完整流程： ``` 1. Thought（思考）：分析当前情况，决定下一步 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-agent-planning",
      "ai-mcp",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q20",
    "q": "多 Agent 系统中职责划分（Role Assignment）和层级任务分解（Hierarchical Decomposition）是什么？为什么 2026 年企业级 Agent 系统必须用\"层级\"而不是\"扁平\"架构？HTTP 协议如何影响多 Agent 通信设计？",
    "choices": [
      {
        "t": "扁平 vs 层级架构对比： ``` 扁平架构（Flat）： ┌─────────────────────────────────────┐ │ Orchestrator │ │ （单点协调，所有决策） │ └────────────────",
        "ok": true,
        "why": "扁平 vs 层级架构对比： ``` 扁平架构（Flat）： ┌─────────────────────────────────────┐ │ Orchestrator │ │ （单点协调，所有决策） │ └─────────────────────────────────────┘ ↓ ↓ ↓ ┌────────┐ ┌────────┐ ┌────────┐ │检索Agent│ │生成Agent"
      },
      {
        "t": "典型架构： ``` ┌─────────────────────────────────────────────────────────┐ │ 多 Agent 协作系统 │ └────────────────────────────────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "背景：学术图表生成的痛点 AI 可以帮研究者写文字，但生成顶会/期刊需要的复杂方法图和精确统计图要难得多——这需要理解技术内容、遵循学术规范、还要视觉美观。 PaperVizAgent 解决方案：五Agent协作系统 ``` ┌──────",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "Function Calling = 让 LLM 调用外部函数 原理： 1. 定义工具 Schema（函数名、参数、描述） 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-tool-calling",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  },
  {
    "id": "adapted:guo-multi-agent:q21",
    "q": "Kimi K2.6 的 Agent Swarm 架构是什么？为什么\"300个并行子Agent\"是2026年多Agent系统的重大突破？",
    "choices": [
      {
        "t": "背景：2026年5月 Moonshot AI 发布 Kimi K2.6 Kimi K2.5 在 2026年1月 引入了 Agent Swarm（100个并行子Agent），K2.6 把这个数字提升到了 300 个子Agent、4000 步并",
        "ok": true,
        "why": "背景：2026年5月 Moonshot AI 发布 Kimi K2.6 Kimi K2.5 在 2026年1月 引入了 Agent Swarm（100个并行子Agent），K2.6 把这个数字提升到了 300 个子Agent、4000 步并发执行，这是目前公开报道中规模最大的商业化多Agent并行架构之一。 --- Agent Swarm 核心架构： ``` Kimi K2.6 Agent Swa"
      },
      {
        "t": "案例 1：客服 Agent ``` 功能：自动回答用户咨询 架构：意图识别 → RAG 检索 → 答案生成 → 人工兜底 成果：解决 80% 常见问题，人工成本降低 60% ``` 案例 2：数据分析 Agent ``` 功能：自然语言查询",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "背景：Skills 是 2026 年 Agent 架构的新关键词 2026 年，随着多 Agent 系统成熟，\"Skills\" 作为独立概念从 \"Tools\" 中分离出来。Skills = 知识 + 行为模式 + 示例 + SOP，比 To",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      },
      {
        "t": "问题原因： 1. 工具调用失败，Agent 重复尝试 2.",
        "ok": false,
        "why": "与本题考点不符；对照正确项看检索/Agent/模型工程边界。"
      }
    ],
    "kind": "interview",
    "domain": "ai",
    "tags": [
      "多Agent",
      "中文面试",
      "AI全栈",
      "系统非原创",
      "adapted",
      "中文"
    ],
    "relatedNodes": [
      "ai-rag",
      "ai-tool-calling",
      "ai-agent-birth"
    ],
    "source": "adapted",
    "origin": "adapted",
    "attribution": "guocong-bincai/ai-interview-guide · 13-multi-agent-systems",
    "attributionUrl": "https://github.com/guocong-bincai/ai-interview-guide",
    "setId": "interview-adapted-guo-multi-agent"
  }
];

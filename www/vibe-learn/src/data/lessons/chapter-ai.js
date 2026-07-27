/** 第五章 · 人工智能 */
export default `# 第五章 · 人工智能

> 从 **学科诞生** 讲到 **编程 Agent 操作面**。  
> **一特性一课**：每课只讲「为何诞生」与「有何作用」，按时间/因果往下走。

## 和第四章的关系
\`\`\`steps
{"title":"AI 章怎么走","steps":[{"title":"先认 LLM","body":"能力与局限（幻觉、窗口）。"},{"title":"再认 RAG / Tool","body":"知识外挂与行动。"},{"title":"再认 Agent / MCP","body":"闭环与协议。"},{"title":"回本仓","body":"AiWorkflow、MCP 运维、规则与技能。"}]}
\`\`\`


第四章 **Stream / AiWorkflow** 是本仓怎么跑一轮 AI。  
本章回答更底层的问题：外面的 AI 世界怎么长成现在这样，名词从哪来。

建议：先能指着 Stream 说清「会话 + 工具」；再进本章从第一课顺着读。

## 本框三截地图

\`\`\`mermaid
flowchart TB
  subgraph F["基础与模型"]
    W[学科] --> M[方法换代]
    M --> T[模型类型]
    T --> B[不止 Transformer]
    B --> TR[Transformer]
    TR --> FT[微调]
  end
  subgraph P["产品与行动"]
    CH[对话产品] --> API[Chat Completions]
    API --> TC[工具调用]
    TC --> AG[Agent 诞生]
  end
  subgraph K["知识与协议"]
    RAG[RAG] --> AR[Agentic RAG]
    AR --> RS[RAG 观念转变]
    RS --> MCP[MCP]
    MCP --> PF[协议分层]
  end
  subgraph S["驯服 Agent"]
    RU[Rules] --> SK[Skills]
    SK --> SU[子代理]
    SU --> CLI[CLI]
    CLI --> MD[AGENTS.md]
  end
  F --> P --> K --> S
\`\`\`

## 读法

严格按连线；遇到「不倡导 RAG」一课，重点看 **观念如何变**，不是简单骂死 RAG。
`;

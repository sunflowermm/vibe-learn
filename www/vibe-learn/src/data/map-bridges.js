/**
 * 知识导图 ↔ 知识导图2 全量桥接
 * 生成：node scripts/gen-map-bridges.mjs
 * 覆盖课卡 180/180 · 章框 17 · 自动补全 52
 */

/** @typedef {{ id: string, label: string }} MapBridgeLink */

/** @type {Record<string, MapBridgeLink[]>} */
export const KNOWLEDGE_TO_MAP2 = {
  "knowledge-hub": [
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    },
    {
      "id": "vh-vibe-coding",
      "label": "Vibe Coding"
    },
    {
      "id": "vh-frame-ai",
      "label": "导图2 · AI"
    }
  ],
  "computer-system": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "os-essence": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "hw-sw-link": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "chip-units": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "terminal-worlds": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "linux-distros": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "linux-cli": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "runtime-nodejs": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-npm",
      "label": "npm"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "installers-path": [
    {
      "id": "vh-env-var",
      "label": "环境变量"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-npm",
      "label": "npm"
    }
  ],
  "package-managers": [
    {
      "id": "vh-npm",
      "label": "npm"
    },
    {
      "id": "vh-build",
      "label": "构建"
    },
    {
      "id": "vh-ci",
      "label": "持续集成"
    }
  ],
  "git-workspace": [
    {
      "id": "vh-git",
      "label": "Git"
    },
    {
      "id": "vh-clone",
      "label": "克隆"
    },
    {
      "id": "vh-frame-git",
      "label": "导图2 · Git"
    }
  ],
  "git-forges": [
    {
      "id": "vh-pull-request",
      "label": "合并请求"
    },
    {
      "id": "vh-git",
      "label": "Git"
    },
    {
      "id": "vh-push",
      "label": "推送"
    }
  ],
  "git-advanced": [
    {
      "id": "vh-branch",
      "label": "分支"
    },
    {
      "id": "vh-merge",
      "label": "合并"
    },
    {
      "id": "vh-pull-request",
      "label": "合并请求"
    },
    {
      "id": "vh-stash",
      "label": "贮藏"
    },
    {
      "id": "vh-worktree",
      "label": "工作树"
    }
  ],
  "workbench-editor": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-vibe-coding",
      "label": "Vibe Coding"
    }
  ],
  "workbench-troubleshoot": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-server-log",
      "label": "服务端日志"
    },
    {
      "id": "vh-monitoring",
      "label": "监控"
    }
  ],
  "xrk-first-run": [
    {
      "id": "vh-npm",
      "label": "npm"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "lang-what-is-language": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-typescript",
      "label": "TypeScript"
    },
    {
      "id": "vh-python",
      "label": "Python"
    }
  ],
  "lang-library-framework": [
    {
      "id": "vh-vue",
      "label": "Vue"
    },
    {
      "id": "vh-react",
      "label": "React"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    }
  ],
  "lang-tech-stack": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-frontend",
      "label": "前端"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "lang-tech-selection": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-mvp",
      "label": "MVP"
    },
    {
      "id": "vh-prd",
      "label": "PRD"
    }
  ],
  "lang-compiled-runtime": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-typescript",
      "label": "TypeScript"
    },
    {
      "id": "vh-build",
      "label": "构建"
    }
  ],
  "lang-landscape": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-python",
      "label": "Python"
    },
    {
      "id": "vh-typescript",
      "label": "TypeScript"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "lang-javascript": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-html",
      "label": "HTML"
    }
  ],
  "lang-nodejs": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-npm",
      "label": "npm"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "lang-typescript": [
    {
      "id": "vh-typescript",
      "label": "TypeScript"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "lang-python": [
    {
      "id": "vh-python",
      "label": "Python"
    }
  ],
  "lang-html-css": [
    {
      "id": "vh-html",
      "label": "HTML"
    },
    {
      "id": "vh-frontend",
      "label": "前端"
    },
    {
      "id": "vh-typography",
      "label": "排版"
    }
  ],
  "lang-shell": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "lang-powershell": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "lang-go": [
    {
      "id": "vh-backend",
      "label": "后端"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "lang-rust": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "lang-java": [
    {
      "id": "vh-backend",
      "label": "后端"
    },
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    }
  ],
  "lang-csharp": [
    {
      "id": "vh-backend",
      "label": "后端"
    },
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    }
  ],
  "lang-php": [
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "lang-c": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "lang-to-runtime": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "fw-vue": [
    {
      "id": "vh-vue",
      "label": "Vue"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-frontend",
      "label": "前端"
    }
  ],
  "fw-react": [
    {
      "id": "vh-react",
      "label": "React"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-frontend",
      "label": "前端"
    }
  ],
  "fw-angular": [
    {
      "id": "vh-frontend",
      "label": "前端"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-typescript",
      "label": "TypeScript"
    }
  ],
  "fw-nextjs": [
    {
      "id": "vh-nextjs",
      "label": "Next.js"
    },
    {
      "id": "vh-react",
      "label": "React"
    }
  ],
  "fw-spring": [
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "fw-express-nest": [
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-route",
      "label": "路由与端点"
    }
  ],
  "fw-django-fastapi": [
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    },
    {
      "id": "vh-python",
      "label": "Python"
    }
  ],
  "fw-gin": [
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "fw-aspnet": [
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "fw-laravel": [
    {
      "id": "vh-backend-framework",
      "label": "后端框架"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "api-frontend": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-json",
      "label": "JSON"
    },
    {
      "id": "vh-cors",
      "label": "CORS"
    },
    {
      "id": "vh-route",
      "label": "路由与端点"
    },
    {
      "id": "vh-frontend",
      "label": "前端"
    }
  ],
  "network-basics": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-url",
      "label": "URL"
    }
  ],
  "protocol-stack": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    }
  ],
  "ip-addressing": [
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    },
    {
      "id": "vh-port",
      "label": "端口"
    }
  ],
  "tcp-udp": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-port",
      "label": "端口"
    }
  ],
  "routing-nat": [
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-redirect",
      "label": "重定向"
    }
  ],
  "http-web": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-url",
      "label": "URL"
    },
    {
      "id": "vh-redirect",
      "label": "重定向"
    }
  ],
  "dns-https": [
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    }
  ],
  "reverse-proxy": [
    {
      "id": "vh-cdn",
      "label": "CDN"
    },
    {
      "id": "vh-redirect",
      "label": "重定向"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    }
  ],
  "net-nginx": [
    {
      "id": "vh-cdn",
      "label": "CDN"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-redirect",
      "label": "重定向"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "net-edge-practice": [
    {
      "id": "vh-cdn",
      "label": "CDN"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    }
  ],
  "xrk-overview": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-mvp",
      "label": "MVP"
    }
  ],
  "xrk-biz-map": [
    {
      "id": "vh-user-flow",
      "label": "用户流程"
    },
    {
      "id": "vh-prd",
      "label": "PRD"
    }
  ],
  "xrk-runtime": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "xrk-core-layout": [
    {
      "id": "vh-component",
      "label": "组件"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "xrk-plugin-arch": [
    {
      "id": "vh-component",
      "label": "组件"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "xrk-language-stack": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-python",
      "label": "Python"
    }
  ],
  "xrk-http-www": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-frontend",
      "label": "前端"
    },
    {
      "id": "vh-route",
      "label": "路由与端点"
    }
  ],
  "xrk-subserver": [
    {
      "id": "vh-backend",
      "label": "后端"
    },
    {
      "id": "vh-route",
      "label": "路由与端点"
    }
  ],
  "xrk-stream": [
    {
      "id": "vh-streaming-response",
      "label": "流式响应"
    },
    {
      "id": "vh-http",
      "label": "HTTP"
    }
  ],
  "xrk-deploy-env": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    },
    {
      "id": "vh-ci",
      "label": "持续集成"
    },
    {
      "id": "vh-cd",
      "label": "持续交付 / 持续部署"
    }
  ],
  "xrk-min-path": [
    {
      "id": "vh-mvp",
      "label": "MVP"
    },
    {
      "id": "vh-git",
      "label": "Git"
    },
    {
      "id": "vh-pull-request",
      "label": "合并请求"
    }
  ],
  "xrk-chat-pipeline": [
    {
      "id": "vh-chat-ui",
      "label": "聊天界面"
    },
    {
      "id": "vh-streaming-response",
      "label": "流式响应"
    },
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    }
  ],
  "xrk-agent-workspace": [
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-context-engineering",
      "label": "上下文工程"
    },
    {
      "id": "vh-skill",
      "label": "Skill"
    }
  ],
  "ai-what": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    }
  ],
  "ai-token-context": [
    {
      "id": "vh-token",
      "label": "Token"
    },
    {
      "id": "vh-context-window",
      "label": "上下文窗口"
    }
  ],
  "ai-attention": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-token",
      "label": "Token"
    }
  ],
  "ai-transformer": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-multimodal",
      "label": "多模态"
    }
  ],
  "ai-llm-era": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-token",
      "label": "Token"
    }
  ],
  "ai-chat-era": [
    {
      "id": "vh-conversation-history",
      "label": "对话历史"
    },
    {
      "id": "vh-chat-ui",
      "label": "聊天界面"
    }
  ],
  "ai-tool-calling": [
    {
      "id": "vh-tool-calling",
      "label": "工具调用"
    },
    {
      "id": "vh-mcp",
      "label": "MCP"
    }
  ],
  "ai-mcp": [
    {
      "id": "vh-mcp",
      "label": "MCP"
    },
    {
      "id": "vh-tool-calling",
      "label": "工具调用"
    }
  ],
  "ai-agent-birth": [
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-agent-loop",
      "label": "Agent 循环"
    }
  ],
  "ai-agent-memory": [
    {
      "id": "vh-context-engineering",
      "label": "上下文工程"
    },
    {
      "id": "vh-conversation-history",
      "label": "对话历史"
    }
  ],
  "ai-agent-planning": [
    {
      "id": "vh-react-pattern",
      "label": "ReAct"
    },
    {
      "id": "vh-agent-loop",
      "label": "Agent 循环"
    }
  ],
  "ai-agent-graph": [
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-sub-agent",
      "label": "Sub-agent"
    }
  ],
  "ai-agents-md": [
    {
      "id": "vh-skill",
      "label": "Skill"
    },
    {
      "id": "vh-system-prompt",
      "label": "系统提示词"
    }
  ],
  "ai-skills": [
    {
      "id": "vh-skill",
      "label": "Skill"
    },
    {
      "id": "vh-system-prompt",
      "label": "系统提示词"
    }
  ],
  "ai-rules": [
    {
      "id": "vh-system-prompt",
      "label": "系统提示词"
    },
    {
      "id": "vh-skill",
      "label": "Skill"
    }
  ],
  "ai-subagent": [
    {
      "id": "vh-sub-agent",
      "label": "Sub-agent"
    },
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    }
  ],
  "ai-cli": [
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-vibe-coding",
      "label": "Vibe Coding"
    },
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    }
  ],
  "ai-rag": [
    {
      "id": "vh-context-engineering",
      "label": "上下文工程"
    },
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    }
  ],
  "ai-embedding": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-multimodal",
      "label": "多模态"
    }
  ],
  "ai-vector-store": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    }
  ],
  "ai-chunking": [
    {
      "id": "vh-context-engineering",
      "label": "上下文工程"
    },
    {
      "id": "vh-token",
      "label": "Token"
    }
  ],
  "ai-hybrid-search": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    }
  ],
  "ai-rerank": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    }
  ],
  "ai-rag-eval": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-test-case",
      "label": "测试用例"
    }
  ],
  "ai-rag-shift": [
    {
      "id": "vh-context-engineering",
      "label": "上下文工程"
    }
  ],
  "ai-agentic-rag": [
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-tool-calling",
      "label": "工具调用"
    }
  ],
  "ai-finetune": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    }
  ],
  "ai-model-types": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-multimodal",
      "label": "多模态"
    }
  ],
  "ai-openai-protocol": [
    {
      "id": "vh-structured-output",
      "label": "结构化输出"
    },
    {
      "id": "vh-stateless-request",
      "label": "无状态请求"
    }
  ],
  "ai-protocol-forks": [
    {
      "id": "vh-structured-output",
      "label": "结构化输出"
    }
  ],
  "ai-prompt-security": [
    {
      "id": "vh-system-prompt",
      "label": "系统提示词"
    },
    {
      "id": "vh-ai-hallucination",
      "label": "AI 幻觉"
    }
  ],
  "ai-adaptation": [
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    }
  ],
  "ai-arch-beyond": [
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-harness-engineering",
      "label": "Agent 运行框架工程"
    }
  ],
  "ai-pi-agent": [
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-agent-loop",
      "label": "Agent 循环"
    }
  ],
  "adev-vibe-coding": [
    {
      "id": "vh-vibe-coding",
      "label": "Vibe Coding"
    },
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    }
  ],
  "adev-compare": [
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    },
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-harness-engineering",
      "label": "Agent 运行框架工程"
    }
  ],
  "adev-project-memory": [
    {
      "id": "vh-skill",
      "label": "Skill"
    },
    {
      "id": "vh-system-prompt",
      "label": "系统提示词"
    },
    {
      "id": "vh-context-engineering",
      "label": "上下文工程"
    }
  ],
  "craft-debug": [
    {
      "id": "vh-server-log",
      "label": "服务端日志"
    },
    {
      "id": "vh-monitoring",
      "label": "监控"
    }
  ],
  "craft-security": [
    {
      "id": "vh-authentication",
      "label": "身份认证"
    },
    {
      "id": "vh-authorization",
      "label": "权限控制"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "craft-ci": [
    {
      "id": "vh-ci",
      "label": "持续集成"
    },
    {
      "id": "vh-cd",
      "label": "持续交付 / 持续部署"
    },
    {
      "id": "vh-lint",
      "label": "代码规范检查"
    },
    {
      "id": "vh-test-case",
      "label": "测试用例"
    }
  ],
  "ops-container": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-staging",
      "label": "预发布环境"
    },
    {
      "id": "vh-rollback",
      "label": "回滚"
    }
  ],
  "ops-compose": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "db-overview": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-redis": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-browser-storage",
      "label": "浏览器存储"
    }
  ],
  "db-sqlite": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-postgres": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "clash": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-port",
      "label": "端口"
    },
    {
      "id": "vh-url",
      "label": "URL"
    }
  ],
  "clash-port": [
    {
      "id": "vh-port",
      "label": "端口"
    },
    {
      "id": "vh-http",
      "label": "HTTP"
    }
  ],
  "fs-layout": [
    {
      "id": "vh-env-var",
      "label": "环境变量"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "fs-dotfiles": [
    {
      "id": "vh-env-var",
      "label": "环境变量"
    },
    {
      "id": "vh-gitignore",
      "label": "忽略文件"
    }
  ],
  "panel-baota": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    }
  ],
  "panel-1panel": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    }
  ],
  "panel-compare": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "panel-run-node": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-env-var",
      "label": "环境变量"
    }
  ],
  "host-systemd": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-monitoring",
      "label": "监控"
    }
  ],
  "host-tls": [
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    }
  ],
  "host-backup": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-rollback",
      "label": "回滚"
    }
  ],
  "code-first-program": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-checkpoint": [
    {
      "id": "vh-test-case",
      "label": "测试用例"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "chapter-machine": [
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "chapter-env": [
    {
      "id": "vh-frame-technology",
      "label": "导图2 · 技术栈"
    },
    {
      "id": "vh-frame-git",
      "label": "导图2 · Git"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "chapter-code": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-frame-technology",
      "label": "导图2 · 技术栈"
    }
  ],
  "chapter-languages": [
    {
      "id": "vh-frame-technology",
      "label": "导图2 · 技术栈"
    },
    {
      "id": "vh-frame-frontend",
      "label": "导图2 · 前端"
    },
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "chapter-computer-network": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-cdn",
      "label": "CDN"
    },
    {
      "id": "vh-frame-backend",
      "label": "导图2 · 后端"
    }
  ],
  "chapter-xrk-agt": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-mvp",
      "label": "MVP"
    }
  ],
  "chapter-ai": [
    {
      "id": "vh-frame-ai",
      "label": "导图2 · AI"
    },
    {
      "id": "vh-ai-basics",
      "label": "AI 应用基础"
    },
    {
      "id": "vh-ai-agent",
      "label": "AI Agent"
    },
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    }
  ],
  "chapter-clash": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-port",
      "label": "端口"
    },
    {
      "id": "vh-url",
      "label": "URL"
    }
  ],
  "chapter-database": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    },
    {
      "id": "vh-frame-backend",
      "label": "导图2 · 后端"
    }
  ],
  "chapter-ops": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-ci",
      "label": "持续集成"
    },
    {
      "id": "vh-cd",
      "label": "持续交付 / 持续部署"
    },
    {
      "id": "vh-staging",
      "label": "预发布环境"
    }
  ],
  "chapter-fs": [
    {
      "id": "vh-env-var",
      "label": "环境变量"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    },
    {
      "id": "vh-gitignore",
      "label": "忽略文件"
    }
  ],
  "chapter-esp": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-backend",
      "label": "后端"
    }
  ],
  "chapter-craft": [
    {
      "id": "vh-ci",
      "label": "持续集成"
    },
    {
      "id": "vh-lint",
      "label": "代码规范检查"
    },
    {
      "id": "vh-authentication",
      "label": "身份认证"
    }
  ],
  "chapter-dsa": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "chapter-panel": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-domain",
      "label": "域名"
    }
  ],
  "chapter-host": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    },
    {
      "id": "vh-monitoring",
      "label": "监控"
    }
  ],
  "chapter-adev": [
    {
      "id": "vh-vibe-coding",
      "label": "Vibe Coding"
    },
    {
      "id": "vh-frame-ai",
      "label": "导图2 · AI"
    },
    {
      "id": "vh-hub",
      "label": "导图2 · 枢纽"
    }
  ],
  "xrk-config": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-http-auth": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-tasker-channels": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-events": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-factory-llm": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-database": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-mcp-ops": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-lab-plugin": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-lab-subserver": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "clash-setup": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-port",
      "label": "端口"
    }
  ],
  "db-essence": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-as-service": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-middleware": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-landscape": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-mongodb": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-postgresql": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-mysql": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "db-others": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "ops-docker": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-ci",
      "label": "持续集成"
    }
  ],
  "ops-others": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    },
    {
      "id": "vh-ci",
      "label": "持续集成"
    }
  ],
  "code-values-types": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-control-flow": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-functions": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-objects-arrays": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-modules": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-async": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-read-errors": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "data-json": [
    {
      "id": "vh-json",
      "label": "JSON"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "data-yaml": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "data-markdown": [
    {
      "id": "vh-markdown",
      "label": "Markdown"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "data-env": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "http-hands-on": [
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-https",
      "label": "HTTPS"
    }
  ],
  "db-sql-hands-on": [
    {
      "id": "vh-database",
      "label": "数据库"
    },
    {
      "id": "vh-sql",
      "label": "SQL"
    }
  ],
  "craft-testing": [
    {
      "id": "vh-ci",
      "label": "持续集成"
    },
    {
      "id": "vh-lint",
      "label": "代码规范检查"
    }
  ],
  "dsa-complexity": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "dsa-linear": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "dsa-hash": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "dsa-tree": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "dsa-graph": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "dsa-sort": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "dsa-dp": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "code-regex": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "code-typescript-hands": [
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-terminal",
      "label": "终端命令行"
    }
  ],
  "craft-observability": [
    {
      "id": "vh-ci",
      "label": "持续集成"
    },
    {
      "id": "vh-lint",
      "label": "代码规范检查"
    }
  ],
  "xrk-lab-http": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-http",
      "label": "HTTP"
    },
    {
      "id": "vh-dns",
      "label": "DNS"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "xrk-lab-config": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    },
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "panel-essence": [
    {
      "id": "vh-deployment",
      "label": "部署上线"
    }
  ],
  "dsa-hot": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "vh-javascript",
      "label": "JavaScript"
    }
  ],
  "esp-mcu": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "esp-esp32": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "esp-toolchain": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ],
  "esp-link": [
    {
      "id": "vh-tech-stack",
      "label": "技术栈"
    }
  ]
};

/** @type {Record<string, MapBridgeLink[]>} */
export const MAP2_TO_KNOWLEDGE = {
  "vh-hub": [
    {
      "id": "knowledge-hub",
      "label": "知识导图"
    },
    {
      "id": "ai-what",
      "label": "人工智能学科"
    },
    {
      "id": "adev-vibe-coding",
      "label": "Vibe Coding 心智"
    },
    {
      "id": "adev-compare",
      "label": "形态与黄页"
    },
    {
      "id": "chapter-machine",
      "label": "序章 · 认识计算机"
    },
    {
      "id": "chapter-ai",
      "label": "第五章 · 人工智能"
    },
    {
      "id": "chapter-adev",
      "label": "番外 · AI 编程工具"
    }
  ],
  "vh-vibe-coding": [
    {
      "id": "knowledge-hub",
      "label": "知识导图"
    },
    {
      "id": "workbench-editor",
      "label": "工作台 · 编辑器"
    },
    {
      "id": "ai-cli",
      "label": "智能体命令行"
    },
    {
      "id": "adev-vibe-coding",
      "label": "Vibe Coding 心智"
    },
    {
      "id": "chapter-adev",
      "label": "番外 · AI 编程工具"
    }
  ],
  "vh-frame-ai": [
    {
      "id": "knowledge-hub",
      "label": "知识导图"
    },
    {
      "id": "chapter-ai",
      "label": "第五章 · 人工智能"
    },
    {
      "id": "chapter-adev",
      "label": "番外 · AI 编程工具"
    }
  ],
  "vh-tech-stack": [
    {
      "id": "computer-system",
      "label": "计算机系统"
    },
    {
      "id": "hw-sw-link",
      "label": "软硬件联动"
    },
    {
      "id": "chip-units",
      "label": "处理单元与存储"
    },
    {
      "id": "lang-library-framework",
      "label": "库 · 框架 · 运行时 · 中间件"
    },
    {
      "id": "lang-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "lang-tech-selection",
      "label": "技术选型"
    },
    {
      "id": "lang-landscape",
      "label": "语言版图"
    },
    {
      "id": "lang-go",
      "label": "Go"
    }
  ],
  "vh-terminal": [
    {
      "id": "computer-system",
      "label": "计算机系统"
    },
    {
      "id": "os-essence",
      "label": "系统的本质"
    },
    {
      "id": "terminal-worlds",
      "label": "不同终端环境"
    },
    {
      "id": "linux-distros",
      "label": "Linux 发行版"
    },
    {
      "id": "linux-cli",
      "label": "Linux 基础指令"
    },
    {
      "id": "installers-path",
      "label": "安装器与 PATH"
    },
    {
      "id": "workbench-editor",
      "label": "工作台 · 编辑器"
    },
    {
      "id": "workbench-troubleshoot",
      "label": "工作台 · 分层排障"
    }
  ],
  "vh-env-var": [
    {
      "id": "os-essence",
      "label": "系统的本质"
    },
    {
      "id": "linux-distros",
      "label": "Linux 发行版"
    },
    {
      "id": "runtime-nodejs",
      "label": "运行时 · Node.js"
    },
    {
      "id": "installers-path",
      "label": "安装器与 PATH"
    },
    {
      "id": "xrk-first-run",
      "label": "首次跑通"
    },
    {
      "id": "xrk-deploy-env",
      "label": "部署环境"
    },
    {
      "id": "craft-security",
      "label": "安全常识"
    },
    {
      "id": "ops-compose",
      "label": "Compose"
    }
  ],
  "vh-javascript": [
    {
      "id": "runtime-nodejs",
      "label": "运行时 · Node.js"
    },
    {
      "id": "lang-what-is-language",
      "label": "什么是语言"
    },
    {
      "id": "lang-compiled-runtime",
      "label": "编译与运行时"
    },
    {
      "id": "lang-landscape",
      "label": "语言版图"
    },
    {
      "id": "lang-javascript",
      "label": "JavaScript"
    },
    {
      "id": "lang-nodejs",
      "label": "Node.js"
    },
    {
      "id": "lang-typescript",
      "label": "TypeScript"
    },
    {
      "id": "lang-to-runtime",
      "label": "接到本仓运行时"
    }
  ],
  "vh-npm": [
    {
      "id": "runtime-nodejs",
      "label": "运行时 · Node.js"
    },
    {
      "id": "installers-path",
      "label": "安装器与 PATH"
    },
    {
      "id": "package-managers",
      "label": "包管理器"
    },
    {
      "id": "xrk-first-run",
      "label": "首次跑通"
    },
    {
      "id": "lang-nodejs",
      "label": "Node.js"
    }
  ],
  "vh-build": [
    {
      "id": "package-managers",
      "label": "包管理器"
    },
    {
      "id": "lang-compiled-runtime",
      "label": "编译与运行时"
    }
  ],
  "vh-ci": [
    {
      "id": "package-managers",
      "label": "包管理器"
    },
    {
      "id": "xrk-deploy-env",
      "label": "部署环境"
    },
    {
      "id": "craft-ci",
      "label": "CI 直觉"
    },
    {
      "id": "chapter-ops",
      "label": "番外 · 容器"
    },
    {
      "id": "chapter-craft",
      "label": "番外 · 工程素养"
    },
    {
      "id": "ops-docker",
      "label": "Docker"
    },
    {
      "id": "ops-others",
      "label": "其它容器工具"
    },
    {
      "id": "craft-testing",
      "label": "测试入门"
    }
  ],
  "vh-git": [
    {
      "id": "git-workspace",
      "label": "Git 与工作区"
    },
    {
      "id": "git-forges",
      "label": "代码托管"
    },
    {
      "id": "xrk-min-path",
      "label": "最小贡献路径"
    }
  ],
  "vh-clone": [
    {
      "id": "git-workspace",
      "label": "Git 与工作区"
    }
  ],
  "vh-frame-git": [
    {
      "id": "git-workspace",
      "label": "Git 与工作区"
    },
    {
      "id": "chapter-env",
      "label": "第一章 · 环境与终端"
    }
  ],
  "vh-pull-request": [
    {
      "id": "git-forges",
      "label": "代码托管"
    },
    {
      "id": "git-advanced",
      "label": "Git 进阶"
    },
    {
      "id": "xrk-min-path",
      "label": "最小贡献路径"
    }
  ],
  "vh-push": [
    {
      "id": "git-forges",
      "label": "代码托管"
    }
  ],
  "vh-branch": [
    {
      "id": "git-advanced",
      "label": "Git 进阶"
    }
  ],
  "vh-merge": [
    {
      "id": "git-advanced",
      "label": "Git 进阶"
    }
  ],
  "vh-stash": [
    {
      "id": "git-advanced",
      "label": "Git 进阶"
    }
  ],
  "vh-worktree": [
    {
      "id": "git-advanced",
      "label": "Git 进阶"
    }
  ],
  "vh-server-log": [
    {
      "id": "workbench-troubleshoot",
      "label": "工作台 · 分层排障"
    },
    {
      "id": "craft-debug",
      "label": "调试与日志"
    }
  ],
  "vh-monitoring": [
    {
      "id": "workbench-troubleshoot",
      "label": "工作台 · 分层排障"
    },
    {
      "id": "craft-debug",
      "label": "调试与日志"
    },
    {
      "id": "host-systemd",
      "label": "systemd 直觉"
    },
    {
      "id": "chapter-host",
      "label": "番外 · 主机运维"
    }
  ],
  "vh-typescript": [
    {
      "id": "lang-what-is-language",
      "label": "什么是语言"
    },
    {
      "id": "lang-compiled-runtime",
      "label": "编译与运行时"
    },
    {
      "id": "lang-landscape",
      "label": "语言版图"
    },
    {
      "id": "lang-typescript",
      "label": "TypeScript"
    },
    {
      "id": "fw-angular",
      "label": "Angular"
    }
  ],
  "vh-python": [
    {
      "id": "lang-what-is-language",
      "label": "什么是语言"
    },
    {
      "id": "lang-landscape",
      "label": "语言版图"
    },
    {
      "id": "lang-python",
      "label": "Python"
    },
    {
      "id": "fw-django-fastapi",
      "label": "Django / FastAPI"
    },
    {
      "id": "xrk-language-stack",
      "label": "语言栈"
    }
  ],
  "vh-vue": [
    {
      "id": "lang-library-framework",
      "label": "库 · 框架 · 运行时 · 中间件"
    },
    {
      "id": "fw-vue",
      "label": "Vue"
    }
  ],
  "vh-react": [
    {
      "id": "lang-library-framework",
      "label": "库 · 框架 · 运行时 · 中间件"
    },
    {
      "id": "fw-react",
      "label": "React"
    },
    {
      "id": "fw-nextjs",
      "label": "Next.js"
    }
  ],
  "vh-backend-framework": [
    {
      "id": "lang-library-framework",
      "label": "库 · 框架 · 运行时 · 中间件"
    },
    {
      "id": "lang-java",
      "label": "Java"
    },
    {
      "id": "lang-csharp",
      "label": "C# / .NET"
    },
    {
      "id": "fw-spring",
      "label": "Spring"
    },
    {
      "id": "fw-express-nest",
      "label": "Express / Nest"
    },
    {
      "id": "fw-django-fastapi",
      "label": "Django / FastAPI"
    },
    {
      "id": "fw-gin",
      "label": "Gin"
    },
    {
      "id": "fw-aspnet",
      "label": "ASP.NET Core"
    }
  ],
  "vh-frontend": [
    {
      "id": "lang-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "lang-html-css",
      "label": "HTML / CSS"
    },
    {
      "id": "fw-vue",
      "label": "Vue"
    },
    {
      "id": "fw-react",
      "label": "React"
    },
    {
      "id": "fw-angular",
      "label": "Angular"
    },
    {
      "id": "api-frontend",
      "label": "API 与前后端"
    },
    {
      "id": "xrk-http-www",
      "label": "HTTP 与 www"
    }
  ],
  "vh-backend": [
    {
      "id": "lang-tech-stack",
      "label": "技术栈"
    },
    {
      "id": "lang-nodejs",
      "label": "Node.js"
    },
    {
      "id": "lang-go",
      "label": "Go"
    },
    {
      "id": "lang-rust",
      "label": "Rust"
    },
    {
      "id": "lang-java",
      "label": "Java"
    },
    {
      "id": "lang-csharp",
      "label": "C# / .NET"
    },
    {
      "id": "lang-php",
      "label": "PHP"
    },
    {
      "id": "lang-to-runtime",
      "label": "接到本仓运行时"
    }
  ],
  "vh-mvp": [
    {
      "id": "lang-tech-selection",
      "label": "技术选型"
    },
    {
      "id": "xrk-overview",
      "label": "项目鸟瞰"
    },
    {
      "id": "xrk-min-path",
      "label": "最小贡献路径"
    },
    {
      "id": "chapter-xrk-agt",
      "label": "第四章 · XRK-AGT"
    }
  ],
  "vh-prd": [
    {
      "id": "lang-tech-selection",
      "label": "技术选型"
    },
    {
      "id": "xrk-biz-map",
      "label": "业务层全景"
    }
  ],
  "vh-html": [
    {
      "id": "lang-javascript",
      "label": "JavaScript"
    },
    {
      "id": "lang-html-css",
      "label": "HTML / CSS"
    }
  ],
  "vh-typography": [
    {
      "id": "lang-html-css",
      "label": "HTML / CSS"
    }
  ],
  "vh-nextjs": [
    {
      "id": "fw-nextjs",
      "label": "Next.js"
    }
  ],
  "vh-route": [
    {
      "id": "fw-express-nest",
      "label": "Express / Nest"
    },
    {
      "id": "api-frontend",
      "label": "API 与前后端"
    },
    {
      "id": "xrk-http-www",
      "label": "HTTP 与 www"
    },
    {
      "id": "xrk-subserver",
      "label": "子服务端"
    }
  ],
  "vh-http": [
    {
      "id": "api-frontend",
      "label": "API 与前后端"
    },
    {
      "id": "network-basics",
      "label": "网络是什么"
    },
    {
      "id": "protocol-stack",
      "label": "协议栈"
    },
    {
      "id": "tcp-udp",
      "label": "TCP 与 UDP"
    },
    {
      "id": "http-web",
      "label": "HTTP 与 Web"
    },
    {
      "id": "xrk-http-www",
      "label": "HTTP 与 www"
    },
    {
      "id": "xrk-stream",
      "label": "工作流 AiWorkflow"
    },
    {
      "id": "clash",
      "label": "代理引擎本质"
    }
  ],
  "vh-json": [
    {
      "id": "api-frontend",
      "label": "API 与前后端"
    },
    {
      "id": "data-json",
      "label": "JSON"
    }
  ],
  "vh-cors": [
    {
      "id": "api-frontend",
      "label": "API 与前后端"
    }
  ],
  "vh-dns": [
    {
      "id": "network-basics",
      "label": "网络是什么"
    },
    {
      "id": "protocol-stack",
      "label": "协议栈"
    },
    {
      "id": "ip-addressing",
      "label": "IP 与子网"
    },
    {
      "id": "routing-nat",
      "label": "路由与 NAT"
    },
    {
      "id": "dns-https",
      "label": "DNS 与 HTTPS"
    },
    {
      "id": "net-edge-practice",
      "label": "边缘与出口实务"
    },
    {
      "id": "chapter-computer-network",
      "label": "第三章 · 计算机网络"
    },
    {
      "id": "xrk-http-auth",
      "label": "HTTP 认证"
    }
  ],
  "vh-url": [
    {
      "id": "network-basics",
      "label": "网络是什么"
    },
    {
      "id": "http-web",
      "label": "HTTP 与 Web"
    },
    {
      "id": "clash",
      "label": "代理引擎本质"
    },
    {
      "id": "chapter-clash",
      "label": "番外 · 代理引擎"
    }
  ],
  "vh-https": [
    {
      "id": "protocol-stack",
      "label": "协议栈"
    },
    {
      "id": "http-web",
      "label": "HTTP 与 Web"
    },
    {
      "id": "dns-https",
      "label": "DNS 与 HTTPS"
    },
    {
      "id": "reverse-proxy",
      "label": "反向代理与 CDN"
    },
    {
      "id": "net-nginx",
      "label": "Nginx"
    },
    {
      "id": "host-tls",
      "label": "TLS 证书实务"
    },
    {
      "id": "chapter-computer-network",
      "label": "第三章 · 计算机网络"
    },
    {
      "id": "chapter-host",
      "label": "番外 · 主机运维"
    }
  ],
  "vh-domain": [
    {
      "id": "ip-addressing",
      "label": "IP 与子网"
    },
    {
      "id": "dns-https",
      "label": "DNS 与 HTTPS"
    },
    {
      "id": "net-edge-practice",
      "label": "边缘与出口实务"
    },
    {
      "id": "panel-baota",
      "label": "宝塔面板"
    },
    {
      "id": "panel-1panel",
      "label": "1Panel"
    },
    {
      "id": "host-tls",
      "label": "TLS 证书实务"
    },
    {
      "id": "chapter-panel",
      "label": "番外 · 主机面板"
    }
  ],
  "vh-port": [
    {
      "id": "ip-addressing",
      "label": "IP 与子网"
    },
    {
      "id": "tcp-udp",
      "label": "TCP 与 UDP"
    },
    {
      "id": "clash",
      "label": "代理引擎本质"
    },
    {
      "id": "clash-port",
      "label": "端口与 Coding Agent"
    },
    {
      "id": "chapter-clash",
      "label": "番外 · 代理引擎"
    },
    {
      "id": "clash-setup",
      "label": "Verge / Android 配置"
    }
  ],
  "vh-redirect": [
    {
      "id": "routing-nat",
      "label": "路由与 NAT"
    },
    {
      "id": "http-web",
      "label": "HTTP 与 Web"
    },
    {
      "id": "reverse-proxy",
      "label": "反向代理与 CDN"
    },
    {
      "id": "net-nginx",
      "label": "Nginx"
    }
  ],
  "vh-cdn": [
    {
      "id": "reverse-proxy",
      "label": "反向代理与 CDN"
    },
    {
      "id": "net-nginx",
      "label": "Nginx"
    },
    {
      "id": "net-edge-practice",
      "label": "边缘与出口实务"
    },
    {
      "id": "chapter-computer-network",
      "label": "第三章 · 计算机网络"
    }
  ],
  "vh-deployment": [
    {
      "id": "net-nginx",
      "label": "Nginx"
    },
    {
      "id": "xrk-deploy-env",
      "label": "部署环境"
    },
    {
      "id": "ops-container",
      "label": "容器是什么"
    },
    {
      "id": "ops-compose",
      "label": "Compose"
    },
    {
      "id": "panel-baota",
      "label": "宝塔面板"
    },
    {
      "id": "panel-1panel",
      "label": "1Panel"
    },
    {
      "id": "panel-compare",
      "label": "面板对照选型"
    },
    {
      "id": "panel-run-node",
      "label": "面板上跑 Node"
    }
  ],
  "vh-user-flow": [
    {
      "id": "xrk-biz-map",
      "label": "业务层全景"
    }
  ],
  "vh-component": [
    {
      "id": "xrk-core-layout",
      "label": "Core 放码"
    },
    {
      "id": "xrk-plugin-arch",
      "label": "插件式架构"
    }
  ],
  "vh-streaming-response": [
    {
      "id": "xrk-stream",
      "label": "工作流 AiWorkflow"
    },
    {
      "id": "xrk-chat-pipeline",
      "label": "对话管线"
    }
  ],
  "vh-cd": [
    {
      "id": "xrk-deploy-env",
      "label": "部署环境"
    },
    {
      "id": "craft-ci",
      "label": "CI 直觉"
    },
    {
      "id": "chapter-ops",
      "label": "番外 · 容器"
    }
  ],
  "vh-chat-ui": [
    {
      "id": "xrk-chat-pipeline",
      "label": "对话管线"
    },
    {
      "id": "ai-chat-era",
      "label": "对话产品化"
    }
  ],
  "vh-ai-agent": [
    {
      "id": "xrk-chat-pipeline",
      "label": "对话管线"
    },
    {
      "id": "xrk-agent-workspace",
      "label": "办事助手"
    },
    {
      "id": "ai-agent-birth",
      "label": "智能体与控制循环"
    },
    {
      "id": "ai-agent-graph",
      "label": "智能体图编排"
    },
    {
      "id": "ai-subagent",
      "label": "子代理"
    },
    {
      "id": "ai-cli",
      "label": "智能体命令行"
    },
    {
      "id": "ai-agentic-rag",
      "label": "智能体式检索"
    },
    {
      "id": "ai-arch-beyond",
      "label": "不止变换器"
    }
  ],
  "vh-context-engineering": [
    {
      "id": "xrk-agent-workspace",
      "label": "办事助手"
    },
    {
      "id": "ai-agent-memory",
      "label": "智能体记忆"
    },
    {
      "id": "ai-rag",
      "label": "检索增强生成"
    },
    {
      "id": "ai-chunking",
      "label": "分块策略"
    },
    {
      "id": "ai-rag-shift",
      "label": "上下文工程"
    },
    {
      "id": "adev-project-memory",
      "label": "项目记忆文件"
    }
  ],
  "vh-skill": [
    {
      "id": "xrk-agent-workspace",
      "label": "办事助手"
    },
    {
      "id": "ai-agents-md",
      "label": "AGENTS.md"
    },
    {
      "id": "ai-skills",
      "label": "技能"
    },
    {
      "id": "ai-rules",
      "label": "规则"
    },
    {
      "id": "adev-project-memory",
      "label": "项目记忆文件"
    }
  ],
  "vh-ai-basics": [
    {
      "id": "ai-what",
      "label": "人工智能学科"
    },
    {
      "id": "ai-attention",
      "label": "注意力"
    },
    {
      "id": "ai-transformer",
      "label": "变换器"
    },
    {
      "id": "ai-llm-era",
      "label": "规则到大模型"
    },
    {
      "id": "ai-rag",
      "label": "检索增强生成"
    },
    {
      "id": "ai-embedding",
      "label": "Embedding 直觉"
    },
    {
      "id": "ai-vector-store",
      "label": "向量库"
    },
    {
      "id": "ai-hybrid-search",
      "label": "混合检索"
    }
  ],
  "vh-token": [
    {
      "id": "ai-token-context",
      "label": "令牌与窗口"
    },
    {
      "id": "ai-attention",
      "label": "注意力"
    },
    {
      "id": "ai-llm-era",
      "label": "规则到大模型"
    },
    {
      "id": "ai-chunking",
      "label": "分块策略"
    }
  ],
  "vh-context-window": [
    {
      "id": "ai-token-context",
      "label": "令牌与窗口"
    }
  ],
  "vh-multimodal": [
    {
      "id": "ai-transformer",
      "label": "变换器"
    },
    {
      "id": "ai-embedding",
      "label": "Embedding 直觉"
    },
    {
      "id": "ai-model-types",
      "label": "模型类型"
    }
  ],
  "vh-conversation-history": [
    {
      "id": "ai-chat-era",
      "label": "对话产品化"
    },
    {
      "id": "ai-agent-memory",
      "label": "智能体记忆"
    }
  ],
  "vh-tool-calling": [
    {
      "id": "ai-tool-calling",
      "label": "工具调用"
    },
    {
      "id": "ai-mcp",
      "label": "模型上下文协议"
    },
    {
      "id": "ai-agentic-rag",
      "label": "智能体式检索"
    }
  ],
  "vh-mcp": [
    {
      "id": "ai-tool-calling",
      "label": "工具调用"
    },
    {
      "id": "ai-mcp",
      "label": "模型上下文协议"
    }
  ],
  "vh-agent-loop": [
    {
      "id": "ai-agent-birth",
      "label": "智能体与控制循环"
    },
    {
      "id": "ai-agent-planning",
      "label": "规划与 ReAct"
    },
    {
      "id": "ai-pi-agent",
      "label": "Pi 脚手架"
    }
  ],
  "vh-react-pattern": [
    {
      "id": "ai-agent-planning",
      "label": "规划与 ReAct"
    }
  ],
  "vh-sub-agent": [
    {
      "id": "ai-agent-graph",
      "label": "智能体图编排"
    },
    {
      "id": "ai-subagent",
      "label": "子代理"
    }
  ],
  "vh-system-prompt": [
    {
      "id": "ai-agents-md",
      "label": "AGENTS.md"
    },
    {
      "id": "ai-skills",
      "label": "技能"
    },
    {
      "id": "ai-rules",
      "label": "规则"
    },
    {
      "id": "ai-prompt-security",
      "label": "提示安全"
    },
    {
      "id": "adev-project-memory",
      "label": "项目记忆文件"
    }
  ],
  "vh-database": [
    {
      "id": "ai-vector-store",
      "label": "向量库"
    },
    {
      "id": "db-overview",
      "label": "db-overview"
    },
    {
      "id": "db-redis",
      "label": "Redis"
    },
    {
      "id": "db-sqlite",
      "label": "SQLite"
    },
    {
      "id": "db-postgres",
      "label": "db-postgres"
    },
    {
      "id": "chapter-database",
      "label": "番外 · 数据库"
    },
    {
      "id": "db-essence",
      "label": "数据库本质"
    },
    {
      "id": "db-as-service",
      "label": "数据库服务"
    }
  ],
  "vh-test-case": [
    {
      "id": "ai-rag-eval",
      "label": "RAG 评测"
    },
    {
      "id": "craft-ci",
      "label": "CI 直觉"
    },
    {
      "id": "code-checkpoint",
      "label": "过关练习"
    }
  ],
  "vh-structured-output": [
    {
      "id": "ai-openai-protocol",
      "label": "会话补全接口"
    },
    {
      "id": "ai-protocol-forks",
      "label": "协议分层"
    }
  ],
  "vh-stateless-request": [
    {
      "id": "ai-openai-protocol",
      "label": "会话补全接口"
    }
  ],
  "vh-ai-hallucination": [
    {
      "id": "ai-prompt-security",
      "label": "提示安全"
    }
  ],
  "vh-harness-engineering": [
    {
      "id": "ai-arch-beyond",
      "label": "不止变换器"
    },
    {
      "id": "adev-compare",
      "label": "形态与黄页"
    }
  ],
  "vh-authentication": [
    {
      "id": "craft-security",
      "label": "安全常识"
    },
    {
      "id": "chapter-craft",
      "label": "番外 · 工程素养"
    }
  ],
  "vh-authorization": [
    {
      "id": "craft-security",
      "label": "安全常识"
    }
  ],
  "vh-lint": [
    {
      "id": "craft-ci",
      "label": "CI 直觉"
    },
    {
      "id": "chapter-craft",
      "label": "番外 · 工程素养"
    },
    {
      "id": "craft-testing",
      "label": "测试入门"
    },
    {
      "id": "craft-observability",
      "label": "日志与观测"
    }
  ],
  "vh-staging": [
    {
      "id": "ops-container",
      "label": "容器是什么"
    },
    {
      "id": "chapter-ops",
      "label": "番外 · 容器"
    }
  ],
  "vh-rollback": [
    {
      "id": "ops-container",
      "label": "容器是什么"
    },
    {
      "id": "host-backup",
      "label": "备份与恢复"
    }
  ],
  "vh-sql": [
    {
      "id": "db-overview",
      "label": "db-overview"
    },
    {
      "id": "db-sqlite",
      "label": "SQLite"
    },
    {
      "id": "db-postgres",
      "label": "db-postgres"
    },
    {
      "id": "chapter-database",
      "label": "番外 · 数据库"
    },
    {
      "id": "db-essence",
      "label": "数据库本质"
    },
    {
      "id": "db-as-service",
      "label": "数据库服务"
    },
    {
      "id": "db-middleware",
      "label": "中间件视角"
    },
    {
      "id": "db-landscape",
      "label": "版图与流行度"
    }
  ],
  "vh-browser-storage": [
    {
      "id": "db-redis",
      "label": "Redis"
    }
  ],
  "vh-gitignore": [
    {
      "id": "fs-dotfiles",
      "label": "点文件与隐藏项"
    },
    {
      "id": "chapter-fs",
      "label": "番外 · 本机目录"
    }
  ],
  "vh-frame-technology": [
    {
      "id": "chapter-env",
      "label": "第一章 · 环境与终端"
    },
    {
      "id": "chapter-code",
      "label": "第一章半 · 编程基础"
    },
    {
      "id": "chapter-languages",
      "label": "第二章 · 计算机语言"
    }
  ],
  "vh-frame-frontend": [
    {
      "id": "chapter-languages",
      "label": "第二章 · 计算机语言"
    }
  ],
  "vh-frame-backend": [
    {
      "id": "chapter-computer-network",
      "label": "第三章 · 计算机网络"
    },
    {
      "id": "chapter-database",
      "label": "番外 · 数据库"
    }
  ],
  "vh-markdown": [
    {
      "id": "data-markdown",
      "label": "Markdown"
    }
  ]
};

/**
 * @param {string} nodeId
 * @returns {MapBridgeLink[]}
 */
export function bridgesForKnowledge(nodeId) {
  return KNOWLEDGE_TO_MAP2[nodeId] || [];
}

/**
 * @param {string} nodeId
 * @returns {MapBridgeLink[]}
 */
export function bridgesForMap2(nodeId) {
  return MAP2_TO_KNOWLEDGE[nodeId] || [];
}

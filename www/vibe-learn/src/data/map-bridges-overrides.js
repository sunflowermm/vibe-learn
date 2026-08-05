/**
 * 手工校正导图2 对照（覆盖自动表；空数组 = 不挂）
 * gen-map-bridges 不会改本文件。
 */

/** @typedef {{ id: string, label: string }} MapBridgeLink */

/** @type {Record<string, MapBridgeLink[]>} */
export const KNOWLEDGE_MAP2_OVERRIDES = {
  /* 弱关联：清空，避免面板硬塞技术栈 / JS 全文 */
  'computer-system': [],
  'hw-sw-link': [],
  'chip-units': [],
  'chapter-machine': [],
  'chapter-esp': [],
  'chapter-dsa': [],
  'esp-mcu': [],
  'esp-esp32': [],
  'esp-toolchain': [],
  'esp-link': [],
  'dsa-complexity': [],
  'dsa-linear': [],
  'dsa-hash': [],
  'dsa-tree': [],
  'dsa-graph': [],
  'dsa-sort': [],
  'dsa-recurse': [],
  'dsa-two-pointers': [],
  'dsa-union-find': [],
  'dsa-string': [],
  'dsa-bitwise': [],
  'dsa-dp': [],
  'dsa-ml': [],
  'dsa-hot': [],
  /* 收紧过宽挂接 */
  'routing-nat': [{ id: 'vh-dns', label: 'DNS' }],
  'db-redis': [{ id: 'vh-database', label: '数据库' }],
  'linux-cli': [
    { id: 'vh-terminal', label: '终端命令行' },
    { id: 'vh-env-var', label: '环境变量' },
  ],
  'chapter-xrk-agt': [
    { id: 'vh-tech-stack', label: '技术栈' },
    { id: 'vh-deployment', label: '部署上线' },
    { id: 'vh-mvp', label: 'MVP' },
    { id: 'vh-ai-agent', label: 'AI Agent' },
    { id: 'vh-javascript', label: 'JavaScript' },
  ],
  'xrk-min-path': [
    { id: 'vh-mvp', label: 'MVP' },
    { id: 'vh-git', label: 'Git' },
    { id: 'vh-pull-request', label: '合并请求' },
    { id: 'vh-vibe-coding', label: 'Vibe Coding' },
  ],
  'xrk-deploy-env': [
    { id: 'vh-deployment', label: '部署上线' },
    { id: 'vh-env-var', label: '环境变量' },
    { id: 'vh-ci', label: '持续集成' },
    { id: 'vh-cd', label: '持续交付 / 持续部署' },
    { id: 'vh-staging', label: '预发布环境' },
    { id: 'vh-rollback', label: '回滚' },
  ],
  'xrk-overview': [
    { id: 'vh-tech-stack', label: '技术栈' },
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-javascript', label: 'JavaScript' },
    { id: 'vh-mvp', label: 'MVP' },
  ],
  'xrk-biz-map': [
    { id: 'vh-user-flow', label: '用户流程' },
    { id: 'vh-prd', label: 'PRD' },
    { id: 'vh-tech-stack', label: '技术栈' },
    { id: 'vh-component', label: '组件' },
  ],
  'xrk-runtime': [
    { id: 'vh-javascript', label: 'JavaScript' },
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-harness-engineering', label: 'Harness Engineering' },
  ],
  'xrk-core-layout': [
    { id: 'vh-component', label: '组件' },
    { id: 'vh-tech-stack', label: '技术栈' },
    { id: 'vh-frontend', label: '前端' },
  ],
  'xrk-plugin-arch': [
    { id: 'vh-component', label: '组件' },
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-harness-engineering', label: 'Harness Engineering' },
  ],
  'xrk-language-stack': [
    { id: 'vh-tech-stack', label: '技术栈' },
    { id: 'vh-javascript', label: 'JavaScript' },
    { id: 'vh-backend', label: '后端' },
  ],
  'xrk-http-www': [
    { id: 'vh-http', label: 'HTTP' },
    { id: 'vh-api', label: 'API' },
    { id: 'vh-https', label: 'HTTPS' },
    { id: 'vh-frontend', label: '前端' },
    { id: 'vh-route', label: '路由与端点' },
  ],
  'xrk-http-auth': [
    { id: 'vh-http', label: 'HTTP' },
    { id: 'vh-https', label: 'HTTPS' },
    { id: 'vh-env-var', label: '环境变量' },
  ],
  'xrk-subserver': [
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-api', label: 'API' },
    { id: 'vh-route', label: '路由与端点' },
    { id: 'vh-http', label: 'HTTP' },
  ],
  'xrk-config': [
    { id: 'vh-env-var', label: '环境变量' },
    { id: 'vh-tech-stack', label: '技术栈' },
    { id: 'vh-deployment', label: '部署上线' },
  ],
  'xrk-database': [
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-deployment', label: '部署上线' },
    { id: 'vh-tech-stack', label: '技术栈' },
  ],
  'xrk-tasker-channels': [
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-chat-ui', label: '聊天界面' },
    { id: 'vh-ai-agent', label: 'AI Agent' },
  ],
  'xrk-events': [
    { id: 'vh-monitoring', label: '监控' },
    { id: 'vh-backend', label: '后端' },
  ],
  'xrk-factory-llm': [
    { id: 'vh-ai-agent', label: 'AI Agent' },
    { id: 'vh-streaming-response', label: '流式响应' },
    { id: 'vh-context-window', label: '上下文窗口' },
  ],
  'xrk-mcp-ops': [
    { id: 'vh-ai-agent', label: 'AI Agent' },
    { id: 'vh-skill', label: 'Skill' },
    { id: 'vh-harness-engineering', label: 'Harness Engineering' },
    { id: 'vh-agent-loop', label: 'Agent 循环' },
  ],
  'xrk-stream': [
    { id: 'vh-streaming-response', label: '流式响应' },
    { id: 'vh-ai-agent', label: 'AI Agent' },
    { id: 'vh-http', label: 'HTTP' },
    { id: 'vh-agent-loop', label: 'Agent 循环' },
  ],
  'xrk-chat-pipeline': [
    { id: 'vh-chat-ui', label: '聊天界面' },
    { id: 'vh-streaming-response', label: '流式响应' },
    { id: 'vh-ai-agent', label: 'AI Agent' },
    { id: 'vh-context-engineering', label: '上下文工程' },
    { id: 'vh-context-window', label: '上下文窗口' },
  ],
  'xrk-agent-workspace': [
    { id: 'vh-ai-agent', label: 'AI Agent' },
    { id: 'vh-context-engineering', label: '上下文工程' },
    { id: 'vh-skill', label: 'Skill' },
    { id: 'vh-vibe-coding', label: 'Vibe Coding' },
  ],
  'xrk-lab-plugin': [
    { id: 'vh-javascript', label: 'JavaScript' },
    { id: 'vh-component', label: '组件' },
    { id: 'vh-git', label: 'Git' },
    { id: 'vh-mvp', label: 'MVP' },
  ],
  'xrk-lab-http': [
    { id: 'vh-http', label: 'HTTP' },
    { id: 'vh-route', label: '路由与端点' },
    { id: 'vh-frontend', label: '前端' },
  ],
  'xrk-lab-subserver': [
    { id: 'vh-backend', label: '后端' },
    { id: 'vh-http', label: 'HTTP' },
    { id: 'vh-route', label: '路由与端点' },
  ],
  'xrk-lab-config': [
    { id: 'vh-env-var', label: '环境变量' },
    { id: 'vh-ci', label: '持续集成' },
    { id: 'vh-deployment', label: '部署上线' },
  ],
};

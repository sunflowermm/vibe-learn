import { defineQuizSet } from '../schema.js';

/**
 * 安全威胁模型：鉴权、注入、供应链、SSRF、提示注入。
 * Git/.env 操作细节 → concept-git-security；名词底线 → sec-kw。
 */
export default defineQuizSet({
  id: 'concept-eng-security-model',
  title: '工程 · 安全威胁模型',
  kind: 'concept',
  domain: 'craft',
  tags: ['安全', '鉴权', '注入', '供应链', '基础', '进阶'],
  relatedNodes: ['craft-security', 'http-web', 'xrk-http-auth'],
  caption: '先问「谁会怎样害我」；控制面、数据面、供应链分开看。',
  questions: [
    {
      id: 'concept-eng-security-model:q1',
      q: '认证（Authentication）与授权（Authorization）差别？',
      choices: [
        {
          t: '认证：你是谁；授权：你被允许做什么',
          ok: true,
          why: '401（未认证）与 403（已认证无权限）的语义根基。',
        },
        {
          t: '二者完全同义',
          ok: false,
          why: '一个验身份，一个验权限，不能混用。',
        },
        {
          t: '授权发生在认识身份之前',
          ok: false,
          why: '通常先认证再授权。',
        },
        {
          t: '只有前端需要授权',
          ok: false,
          why: '服务端必须强制；前端隐藏不算控制面。',
        },
      ],
      relatedNodes: ['craft-security', 'http-web'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-security-model:q2',
      q: '「前端隐藏按钮」能否当授权？',
      choices: [
        {
          t: '不能：攻击者可直接打 API；授权必须在服务端执行',
          ok: true,
          why: 'UI 只是体验，不是控制面。',
        },
        {
          t: 'display:none 即安全边界',
          ok: false,
          why: '样式隐藏对请求方无效。',
        },
        {
          t: '有了 HTTPS 就不需要授权',
          ok: false,
          why: 'TLS 保护传输，不决定「谁能做什么」。',
        },
        {
          t: '只要仓库私有，API 可裸奔',
          ok: false,
          why: '网络上的 API 仍可被调用；私有仓 ≠ API 鉴权。',
        },
      ],
      relatedNodes: ['craft-security', 'api-frontend', 'xrk-http-auth'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-security-model:q3',
      q: '注入类问题的共同本质？',
      choices: [
        {
          t: "不信任的数据被当成代码/查询/命令执行——要参数化、转义、分层",
          ok: true,
          why: 'SQL/命令/模板/LLM 提示注入同构。',
        },
        {
          t: '只有 SQL 存在注入，其他协议与提示都免疫',
          ok: false,
          why: '命令注入、模板注入、提示注入同样存在。',
        },
        {
          t: '只要用 JSON 编码就可以免疫全部注入攻击',
          ok: false,
          why: 'JSON 只是编码；拼进查询/命令仍会注入。',
        },
        {
          t: '注入只影响 CSS 样式，不会碰到数据或命令执行',
          ok: false,
          why: '可影响数据、系统命令与模型行为。',
        },
      ],
      relatedNodes: ['craft-security', 'db-sql-hands-on', 'ai-prompt-security'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-security-model:q4',
      q: '最小权限原则落到服务账号/API Key？',
      choices: [
        {
          t: '只授完成任务所需的最小作用域；按环境拆分密钥并轮换',
          ok: true,
          why: '泄漏时爆炸半径可控。',
        },
        {
          t: '一把 root 密钥打天下最省事也最正确',
          ok: false,
          why: '爆炸半径最大，一处泄漏全线失守。',
        },
        {
          t: '权限越大 CI 越安全',
          ok: false,
          why: 'CI 被攻破时权限越大损失越大。',
        },
        {
          t: '只读密钥可以提交进公开仓',
          ok: false,
          why: '只读仍可能被滥用拉取私有数据。',
        },
      ],
      relatedNodes: ['craft-security', 'data-env', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-security-model:q5',
      q: '依赖供应链风险，工程师应做什么？',
      choices: [
        {
          t: '锁版本、审新增依赖、关注漏洞公告；勿随意装来路不明的包',
          ok: true,
          why: '现代攻击常打 npm/PyPI。',
        },
        {
          t: '依赖越多越安全',
          ok: false,
          why: '攻击面与维护成本都更大。',
        },
        {
          t: 'lockfile 应每周删除重建并忽略 diff',
          ok: false,
          why: '失去可复现，也难审查依赖漂移。',
        },
        {
          t: 'postinstall 脚本可以无条件信任',
          ok: false,
          why: '安装脚本可在本机执行任意代码，风险高。',
        },
      ],
      relatedNodes: ['package-managers', 'craft-security', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-security-model:q6',
      q: '日志与错误回显中的敏感数据？',
      choices: [
        {
          t: '脱敏：令牌、密码、证件、完整支付信息不应落明文日志或回给客户端',
          ok: true,
          why: '可观测与安全要同时设计。',
        },
        {
          t: '日志越全越好，连密钥与令牌也明文写入方便排障',
          ok: false,
          why: '日志泄漏即密钥泄漏。',
        },
        {
          t: '错误页贴全栈跟踪与环境变量，方便终端用户自助排查',
          ok: false,
          why: '对用户回显环境与栈是信息泄漏。',
        },
        {
          t: '内网日志可以永久明文存密码，反正外网访问不到',
          ok: false,
          why: '内网也会被攻破或误授权访问。',
        },
      ],
      relatedNodes: ['craft-observability', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-security-model:q7',
      q: 'SSR/代理把用户 URL 拿去服务端请求时，要防？',
      choices: [
        {
          t: "SSRF：限制协议与目标网段，防止打内网元数据/管理口",
          ok: true,
          why: '云上经典；爬虫/预览类功能高发。',
        },
        {
          t: 'URL 越随意越好',
          ok: false,
          why: '可被指向内网与云元数据接口。',
        },
        {
          t: 'SSRF 只影响打印机',
          ok: false,
          why: '影响内网服务与云控制面。',
        },
        {
          t: '有 Docker 就自动免疫 SSRF',
          ok: false,
          why: '容器网络同样可能打到宿主/内网。',
        },
      ],
      relatedNodes: ['craft-security', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-security-model:q8',
      q: '把不可信用户内容塞进 LLM 提示时？',
      choices: [
        {
          t: '按提示注入设防：分隔、指令优先级、工具权限最小化、输出校验',
          ok: true,
          why: '与经典注入同构，新增模型服从问题。',
        },
        {
          t: '模型有常识所以绝对安全，提示注入可以忽略',
          ok: false,
          why: '可被诱导忽略系统指令。',
        },
        {
          t: '用户内容应拥有与系统提示同等权限，一并最高优先级执行',
          ok: false,
          why: '恰恰要隔离信任级别。',
        },
        {
          t: '只需前端过滤脏话即可，工具权限与输出校验都不必管',
          ok: false,
          why: '远不够；工具调用与数据外泄才是重点。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'craft-security', 'ai-tool-calling'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-security-model:q9',
      q: '密钥泄漏后，威胁模型视角的第一动作？',
      choices: [
        {
          t: '在签发方立刻轮换/吊销，再清历史与排查滥用',
          ok: true,
          why: '先废掉钥匙；Git 历史清理细节见 git-security 课。',
        },
        {
          t: '只改 README 道歉',
          ok: false,
          why: '密钥仍有效，攻击可继续。',
        },
        {
          t: '把旧密钥再提交一次覆盖',
          ok: false,
          why: '历史仍在，且再次传播。',
        },
        {
          t: '等待 30 天自然过期再处理',
          ok: false,
          why: '扫描器可能几分钟内滥用。',
        },
      ],
      relatedNodes: ['craft-security', 'data-env'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-security-model:q10',
      q: '威胁建模一句话方法？',
      choices: [
        {
          t: "列出资产、入口、信任边界与可能滥用，再决定控制措施",
          ok: true,
          why: 'STRIDE 等是工具；先有边界图。',
        },
        {
          t: '只靠每年一次渗透报告，开发期不用想',
          ok: false,
          why: '太晚；设计期就要想边界。',
        },
        {
          t: '威胁模型等于购买防火墙型号',
          ok: false,
          why: '过窄；应用层鉴权与数据流同样关键。',
        },
        {
          t: '开源项目不需要威胁模型',
          ok: false,
          why: '公开面更大，同样需要。',
        },
      ],
      relatedNodes: ['craft-security', 'xrk-http-auth'],
      tags: ['进阶'],
    },
  ],
});

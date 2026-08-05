import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-sec-kw",
  title: "基础 · 开发者安全底线全表",
  kind: 'concept',
  domain: "craft",
  tags: ["安全","OWASP","基础"],
  relatedNodes: ["craft-security","data-env"],
  caption: "SQL 注入、XSS、命令注入、密钥泄漏、参数化——别把脚打穿。",
  questions: [
  {
    "id": "concept-sec-kw:sqli",
    "q": "防 SQL 注入的首要做法？",
    "choices": [
      {
        "t": "参数化/预编译绑定",
        "ok": true,
        "why": "SQL 注入：不可信输入改变了 SQL 结构。防御：参数化/预编译/ORM 绑定，禁止字符串拼接查询。"
      },
      {
        "t": "只靠把按钮藏起来",
        "ok": false,
        "why": "与「SQL 注入」不符。"
      },
      {
        "t": "关闭数据库日志",
        "ok": false,
        "why": "与「SQL 注入」不符。"
      },
      {
        "t": "改用更大的字体",
        "ok": false,
        "why": "与「SQL 注入」不符。"
      }
    ],
    "relatedNodes": [
      "craft-security",
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "sqli"
    ]
  },
  {
    "id": "concept-sec-kw:xss",
    "q": "XSS 的核心风险？",
    "choices": [
      {
        "t": "恶意脚本在受害者浏览器执行",
        "ok": true,
        "why": "XSS：不可信输入当脚本在别人浏览器执行。防御：按上下文输出编码；勿把未消毒 HTML 当可信；Cookie 可加 HttpOnly。"
      },
      {
        "t": "只能攻击数据库端口",
        "ok": false,
        "why": "与「XSS（跨站脚本）」不符。"
      },
      {
        "t": "等同 CSRF 且同一防御即可",
        "ok": false,
        "why": "与「XSS（跨站脚本）」不符。"
      },
      {
        "t": "只发生在 UDP",
        "ok": false,
        "why": "与「XSS（跨站脚本）」不符。"
      }
    ],
    "relatedNodes": [
      "craft-security",
      "http-web"
    ],
    "tags": [
      "基础",
      "xss"
    ]
  },
  {
    "id": "concept-sec-kw:cmdi",
    "q": "调用系统命令时更稳妥的是？",
    "choices": [
      {
        "t": "避免经 shell 拼接",
        "ok": true,
        "why": "命令注入：用户输入进了 shell/exec。防御：避免 shell；参数白名单；用数组形式传参而非字符串拼接命令行。"
      },
      {
        "t": "把用户输入直接拼进 bash -c",
        "ok": false,
        "why": "与「命令注入」不符。"
      },
      {
        "t": "关闭所有日志",
        "ok": false,
        "why": "与「命令注入」不符。"
      },
      {
        "t": "只用 GET 就不会注入",
        "ok": false,
        "why": "与「命令注入」不符。"
      }
    ],
    "relatedNodes": [
      "craft-security"
    ],
    "tags": [
      "基础",
      "cmdi"
    ]
  },
  {
    "id": "concept-sec-kw:secret_leak",
    "q": "发现 API Key 已进公开仓库，第一步硬动作？",
    "choices": [
      {
        "t": "立刻在服务商处轮换/吊销该 Key",
        "ok": true,
        "why": "密钥进 Git/日志：先在服务商处轮换/吊销，再清配置与历史。只删提交不能替代轮换——机器人可能已扫到。"
      },
      {
        "t": "只改文件名继续用同一 Key",
        "ok": false,
        "why": "与「密钥泄漏应急」不符。"
      },
      {
        "t": "只 force-push 删历史就够",
        "ok": false,
        "why": "与「密钥泄漏应急」不符。"
      },
      {
        "t": "写进 README 说明已泄漏",
        "ok": false,
        "why": "与「密钥泄漏应急」不符。"
      }
    ],
    "relatedNodes": [
      "craft-security",
      "data-env"
    ],
    "tags": [
      "基础",
      "secret_leak"
    ]
  },
  {
    "id": "concept-sec-kw:authz",
    "q": "敏感 API 的鉴权应落在？",
    "choices": [
      {
        "t": "服务端对每个敏感接口再校验",
        "ok": true,
        "why": "鉴权：每个敏感接口服务端再判身份与权限；只藏前端按钮或关鉴权「图省事」上生产是事故。"
      },
      {
        "t": "只靠隐藏前端按钮",
        "ok": false,
        "why": "与「服务端鉴权」不符。"
      },
      {
        "t": "只靠注释写「内部接口」",
        "ok": false,
        "why": "与「服务端鉴权」不符。"
      },
      {
        "t": "只靠仓库私有",
        "ok": false,
        "why": "与「服务端鉴权」不符。"
      }
    ],
    "relatedNodes": [
      "craft-security",
      "http-web"
    ],
    "tags": [
      "基础",
      "authz"
    ]
  }
],
});

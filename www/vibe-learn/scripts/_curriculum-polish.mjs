/**
 * 知识体系向润色：删导图2 同义×词表 flip；实践课加 check；分叉课加 decide
 * node www/vibe-learn/scripts/_curriculum-polish.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('www/vibe-learn/src/data/lessons');

function escTpl(plain) {
  return String(plain).replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
}

async function load(file) {
  const m = await import(pathToFileURL(path.join(dir, file)).href + `?t=${Date.now()}${Math.random()}`);
  return String(m.default || '');
}

function save(file, body) {
  fs.writeFileSync(path.join(dir, file), `export default \`${escTpl(body)}\`;\n`);
}

function hasFence(body, lang) {
  return body.includes('```' + lang);
}

/** Remove ```flip ... ``` that sit after ## 导图2 and whose title contains ×词表 */
function stripMap2EchoFlips(body) {
  const i = body.search(/^## 导图2/m);
  if (i < 0) return { body, removed: 0 };
  const head = body.slice(0, i);
  let tail = body.slice(i);
  let removed = 0;
  tail = tail.replace(/```flip\n\{[\s\S]*?\}\n```\n?/g, (block) => {
    if (/×词表|"title"\s*:\s*"[^"]*×词表/.test(block) || /×词表/.test(block)) {
      removed++;
      return '';
    }
    // also drop purely table-echo titles we added in polish
    if (
      /"title"\s*:\s*"(代理|工程素养|DSA|ESP|目录|主机|容器|面板|第五章|业务地图|管线|Core目录|Auth|HTTP实践|插件实践|插件架构|Runtime|Stream|子服|Tasker)×/.test(
        block
      )
    ) {
      removed++;
      return '';
    }
    return block;
  });
  return { body: head + tail, removed };
}

function insertBefore(body, marker, block) {
  if (body.includes(block.slice(0, 40))) return body;
  const i = body.indexOf(marker);
  if (i < 0) return null;
  return body.slice(0, i) + block + body.slice(i);
}

function insertAfterHeading(body, heading, block) {
  if (hasFence(body, block.includes('```check') ? 'check' : 'decide') && block.includes('```check') && hasFence(body, 'check')) {
    /* allow decide even if check exists */
  }
  const re = new RegExp(`(${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n)`);
  if (!re.test(body)) return null;
  // avoid double insert
  const probe = block.match(/"title"\s*:\s*"([^"]+)"/)?.[1];
  if (probe && body.includes(probe)) return body;
  return body.replace(re, `$1\n${block}\n`);
}

const CHECKS = {
  'xrk-lab-plugin.js': {
    after: '## 1. 通关清单（按序勾）\n',
    block: `\`\`\`check
{"title":"最小插件通关","caption":"按序勾；与下表同验收","items":[{"id":"dir","text":"插件文件在 core/<名>/plugin/","hint":"勿写进 src/"},{"id":"base","text":"继承 PluginBase，constructor 只填固定元数据","hint":"不建 Map/缓存"},{"id":"rule","text":"规则能匹配（如 /^#lab$/）","hint":"event 名要对"},{"id":"load","text":"Loader 日志出现加载/热更成功","hint":"路径与导出形状"},{"id":"fire","text":"触发后收到 lab-ok（或等价副作用）","hint":"stdin / 通道"},{"id":"git","text":"实验切片可小步提交；密钥未进仓","hint":"娱乐插件默认不提交"}]}
\`\`\`
`,
  },
  'xrk-lab-http.js': {
    after: '## 1. 通关清单\n',
    block: `\`\`\`check
{"title":"最小 HTTP 通关","items":[{"id":"dir","text":"文件在 core/*/http/","hint":"HttpApiLoader 能扫到"},{"id":"export","text":"对象导出 name + routes","hint":"见 base-classes"},{"id":"flat","text":"success 对象字段在顶层（非默认 json.data）","hint":"HttpResponse 拍平"},{"id":"auth","text":"鉴权策略明确（Key 或 systemAuth:false）","hint":"/api 默认要 Key"},{"id":"curl","text":"curl 看到 success 与业务字段","hint":"本地可复制命令"}]}
\`\`\`
`,
  },
  'xrk-lab-config.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"配置三同步通关","caption":"改完再勾；缺一不可","items":[{"id":"tpl","text":"独立 Core：模板在 core/*/default/","hint":"勿塞 default_config"},{"id":"schema","text":"commonconfig schema 与键名一致","hint":"三处同名"},{"id":"code","text":"消费代码读的是同一套键","hint":"ConfigBase / runtimeConfig"},{"id":"data","text":"运行时 data/<产品>/ 可被模板引导","hint":"新环境能复制"},{"id":"secret","text":"真实密钥不进模板与 Git","hint":"环境变量/密钥库"}]}
\`\`\`
`,
  },
  'xrk-lab-subserver.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"子服调用通关","items":[{"id":"where","text":"能力放对 subserver/<runtime>/","hint":"不是改主服语言"},{"id":"cfg","text":"配置在主服编辑；子服只读","hint":"见 subserver-commonconfig"},{"id":"call","text":"主服经 callSubserver / CONTRACT 调通","hint":"对照端口与路径"},{"id":"bound","text":"未把业务塞进 Runtime 禁区","hint":"短板走开子服"}]}
\`\`\`
`,
  },
  'xrk-first-run.js': {
    after: '## 1. 标准路径\n',
    block: `\`\`\`check
{"title":"首次跑通通关","caption":"一层绿再进下一层","items":[{"id":"node","text":"node -v ≥ 26","hint":"engines"},{"id":"root","text":"终端位于仓库根（有根 package.json）","hint":"pwd"},{"id":"pnpm","text":"pnpm -v 有输出；pnpm install 无红字","hint":"勿 npm install"},{"id":"redis","text":"Redis 可用；启动无致命连接错","hint":"database.md"},{"id":"boot","text":"node app.js 见 online/端口或控制台可开","hint":"分层排障表"}]}
\`\`\`
`,
  },
  'xrk-deploy-env.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"部署环境开演清单","caption":"五样绿再谈域名/面板","items":[{"id":"git","text":"Git 可用；仓库能 clone/pull","hint":"代理见 Clash 课"},{"id":"node","text":"Node≥26 + pnpm + 锁文件策略清楚","hint":"仅 pnpm"},{"id":"redis","text":"Redis 在目标环境可连","hint":"热路径必需"},{"id":"boot","text":"主服能起来并有健康信号","hint":"首次跑通"},{"id":"secret","text":"密钥走环境变量；.env 不进 Git","hint":"工程素养"}]}
\`\`\`
`,
  },
  'xrk-min-path.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"最小贡献路径","items":[{"id":"env","text":"环境章+01.5 过关，能审 JS diff","hint":"别跳过"},{"id":"map","text":"能指鸟瞰：业务进 core/","hint":"勿先改 Runtime"},{"id":"slice","text":"选定最小切片（插件或 HTTP）","hint":"MVP"},{"id":"lab","text":"实践课通关有可观察信号","hint":"日志/curl/回复"},{"id":"pr","text":"小步提交；说明验收命令","hint":"密钥不进仓"}]}
\`\`\`
`,
  },
  'http-hands-on.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"HTTP 动手通关","items":[{"id":"req","text":"能说清一次请求的方法/URL/头/体","hint":"浏览器 DevTools"},{"id":"status","text":"会读状态码与 JSON 形体","hint":"别只看「有返回」"},{"id":"xrk","text":"对照本仓 HttpResponse 拍平规则","hint":"实践·最小 HTTP"}]}
\`\`\`
`,
  },
  'db-sql-hands-on.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`check
{"title":"SQL 动手通关","items":[{"id":"crud","text":"能独立写出增删改查各一句","hint":"先 SQLite"},{"id":"where","text":"WHERE 条件写对；知全表误更新风险","hint":"先 SELECT 再改"},{"id":"param","text":"值用占位符，不拼进 SQL 字符串","hint":"防注入"},{"id":"xrk","text":"能对照本仓 Redis+SQLite 热路径 vs 业务库","hint":"第四章数据库课"}]}
\`\`\`
`,
  },
};

const DECIDES = {
  'knowledge-hub.js': {
    after: '## 建议第一条边\n',
    block: `\`\`\`decide
{"title":"我从哪条边进？","start":"start","steps":[{"id":"start","q":"你现在最想先拿到什么？","options":[{"label":"搞清机器/OS 再装环境","next":"cs"},{"label":"尽快用 Agent 写本仓代码","next":"vibe"},{"label":"搞懂 Token/Agent/工具调用","next":"ai"},{"label":"只想查名词定义","next":"map2"}]},{"id":"cs","result":"走主路径：计算机系统 → 环境章 → 01.5。","detail":"导图1 故事线；装齐再贡献。"},{"id":"vibe","result":"可先番外「Vibe Coding 心智」，再回环境把工具链装齐。","detail":"路径 A；五拍+审 diff；禁区仍有效。"},{"id":"ai","result":"主路径走到第四章后进第五章（路径 B）。","detail":"别用第五章替代装环境与放码。"},{"id":"map2","result":"打开知识导图2 枢纽查词；验收仍回导图1 本课。","detail":"词表≠驾照。"}]}
\`\`\`
`,
  },
  'xrk-agent-workspace.js': {
    after: '## 设计巧思：两张工牌\n',
    block: `\`\`\`decide
{"title":"该改哪张工牌？","start":"start","steps":[{"id":"start","q":"你要改的是？","options":[{"label":"群聊/办事助手语气或流程","next":"desk"},{"label":"写代码放码/禁区/技能路由","next":"dev"},{"label":"模型工具能不能调、门禁","next":"mcp"},{"label":"窗口太长/历史太胖","next":"pipe"}]},{"id":"desk","result":"改办事工作区：data/ai-workspace/{id}/ 或种子 agents/。","detail":"不是仓库根 AGENTS.md。"},{"id":"dev","result":"改根 AGENTS.md / .cursor/skills/xrk-*。","detail":"别把施工禁区写进办事手册。"},{"id":"mcp","result":"看 MCP 运维 + ai-workflow.security。","detail":"Skill≠MCP 工具。"},{"id":"pipe","result":"对话管线：裁剪/压缩/max*Chars。","detail":"上下文工程课。"}]}
\`\`\`
`,
  },
  'xrk-config.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`decide
{"title":"配置写到哪？","start":"start","steps":[{"id":"start","q":"这份配置属于？","options":[{"label":"AGT 运行时 / LLM 工厂 / system-Core","next":"fw"},{"label":"独立产品 Core 业务","next":"prod"},{"label":"本机密钥与开关","next":"env"},{"label":"只想在本机改一下试试","next":"data"}]},{"id":"fw","result":"config/default_config/ + system-Core commonconfig + 消费代码。","detail":"三同步。"},{"id":"prod","result":"core/<名>/default/ + commonconfig/ + data/<产品>/。","detail":"禁止塞进 default_config。"},{"id":"env","result":"环境变量 / 密钥库；模板里不写真实值。","detail":".env 不进 Git。"},{"id":"data","result":"可改 data/，但缺模板则新环境无法引导——模板仍要齐。","detail":"实践·配置三同步。"}]}
\`\`\`
`,
  },
  'xrk-subserver.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`decide
{"title":"能力放主服还是子服？","start":"start","steps":[{"id":"start","q":"你卡住的能力本质是？","options":[{"label":"JS/Node 就能做的业务扩展","next":"core"},{"label":"强依赖 Python/Java/… 生态","next":"sub"},{"label":"想改加载器/全局运行时","next":"rt"},{"label":"只是要调已有子服接口","next":"call"}]},{"id":"core","result":"放 core/<名>/ 对应扩展点（plugin/http/…）。","detail":"主服仍是 JS+Node。"},{"id":"sub","result":"放 subserver/<runtime>/；主服 HTTP 调用。","detail":"配置主服编辑、子服只读。"},{"id":"rt","result":"属框架任务；先读禁区，勿当业务捷径。","detail":"多数贡献不该进 src/。"},{"id":"call","result":"走 callSubserver + CONTRACT；先实践·子服调用。","detail":"对照端口与契约。"}]}
\`\`\`
`,
  },
  'xrk-overview.js': {
    after: '## 学会之后（验收）\n',
    block: `\`\`\`decide
{"title":"第四章我先啃哪？","start":"start","steps":[{"id":"start","q":"你当前状态？","options":[{"label":"还没稳定跑起来","next":"run"},{"label":"能跑，想交一个最小贡献","next":"mvp"},{"label":"要搞清 Runtime/Core/子服分层","next":"map"},{"label":"要做对话/工具/MCP","next":"ai"}]},{"id":"run","result":"部署环境 → 首次跑通 → 再鸟瞰。","detail":"清单不绿别谈架构。"},{"id":"mvp","result":"最小贡献路径 → 实践·最小插件。","detail":"业务只进 core/。"},{"id":"map","result":"项目鸟瞰 → Core 放码 → 业务层全景。","detail":"禁区先背熟。"},{"id":"ai","result":"Stream → 办事助手 → MCP；概念回第五章。","detail":"两张工牌别混。"}]}
\`\`\`
`,
  },
  'computer-system.js': {
    after: '## 2. 贯穿后文的因果链\n',
    block: `\`\`\`decide
{"title":"出框后先去哪？","start":"start","steps":[{"id":"start","q":"下一目标？","options":[{"label":"在本机发出第一条命令","next":"env"},{"label":"搞清语言/运行时/框架","next":"lang"},{"label":"搞清主机怎么对话","next":"net"},{"label":"尽快碰到本仓代码","next":"xrk"}]},{"id":"env","result":"第一章 · 环境与终端。","detail":"发令→PATH→Node/pnpm→首次跑通。"},{"id":"lang","result":"先 01.5 编程，再第二章语言版图。","detail":"别空背框架名。"},{"id":"net","result":"第三章网络；安全组/TCP 直觉。","detail":"网卡是本课 I/O 延伸。"},{"id":"xrk","result":"仍建议环境绿后再进第四章最小路径。","detail":"跳过发令会在贡献时还债。"}]}
\`\`\`
`,
  },
};

const stats = { flipRemoved: 0, check: 0, decide: 0, hub: 0 };

// 1) strip echo flips on all lessons
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js') && !x.startsWith('vh-'))) {
  let body = await load(f);
  const { body: next, removed } = stripMap2EchoFlips(body);
  if (removed) {
    save(f, next);
    stats.flipRemoved += removed;
    console.log('strip-flip', f, removed);
  }
}

// 2) checks
for (const [f, { after, block }] of Object.entries(CHECKS)) {
  let body = await load(f);
  if (hasFence(body, 'check') && body.includes(JSON.parse(block.match(/\{[\s\S]*\}/)[0]).title)) {
    console.log('skip-check', f);
    continue;
  }
  if (hasFence(body, 'check') && /通关/.test(body.slice(body.indexOf('```check'), body.indexOf('```check') + 200))) {
    console.log('skip-check-exists', f);
    continue;
  }
  const next = insertAfterHeading(body, after.replace(/\n$/, ''), block);
  // insertAfterHeading expects heading without needing exact - fix: use after string
  let out = body;
  if (body.includes(JSON.parse(block.match(/\{[\s\S]*\}/)[0]).title)) {
    console.log('skip-check-title', f);
    continue;
  }
  if (!body.includes(after.trimEnd()) && !body.includes(after)) {
    // try insert before 导图2
    const alt = insertBefore(body, '\n## 导图2', '\n' + block + '\n');
    if (!alt) {
      console.log('miss-check-anchor', f);
      continue;
    }
    out = alt;
  } else {
    const anchor = after.endsWith('\n') ? after : after + '\n';
    if (body.includes(anchor)) out = body.replace(anchor, anchor + '\n' + block + '\n');
    else out = body.replace(after.trimEnd() + '\n', after.trimEnd() + '\n\n' + block + '\n');
  }
  if (out !== body) {
    save(f, out);
    stats.check++;
    console.log('check', f);
  }
}

// 3) decides
for (const [f, { after, block }] of Object.entries(DECIDES)) {
  let body = await load(f);
  const title = block.match(/"title"\s*:\s*"([^"]+)"/)?.[1];
  if (title && body.includes(title)) {
    console.log('skip-decide', f);
    continue;
  }
  const anchor = after.endsWith('\n') ? after : after + '\n';
  let out = body;
  if (body.includes(anchor)) out = body.replace(anchor, anchor + '\n' + block + '\n');
  else {
    const alt = insertBefore(body, '\n## 导图2', '\n' + block + '\n');
    if (!alt) {
      console.log('miss-decide-anchor', f);
      continue;
    }
    out = alt;
  }
  if (out !== body) {
    save(f, out);
    stats.decide++;
    console.log('decide', f);
  }
}

console.log(JSON.stringify(stats));

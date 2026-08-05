/**
 * 按 qid 加厚干扰项：用 _clue-dump.json 的旧 wrong 做精确定位替换，不改正解。
 * node scripts/enrich-distractors.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dump = JSON.parse(fs.readFileSync(path.join(root, 'scripts/_clue-dump.json'), 'utf8'));

/** qid → 三个新干扰项（完整似真误判） */
const NEW = {
  'concept-workbench:accept': [
    '只看回复语气是否友好，不必阅读 diff 或本机跑通',
    '无脑全盘 Accept，默认 Agent 不会越界改 Runtime 或密钥',
    '先把密钥写进仓库，方便 Agent 下次自动读取继续改代码',
  ],
  'concept-craft-quality:timeline': [
    '日志里只保留 error 一个单词，避免信息过载干扰排障',
    '把完整信用卡号写进日志字段，方便客服核对用户订单',
    '禁止打印任何时间戳与请求 id，免得单行日志变得太长',
  ],
  'concept-git-security:frozen': [
    '每次 CI 都不锁版本，直接升到最新主版本最省事',
    '把数据库密码明文写进 workflow 文件，方便流水线读取',
    '跳过安装步骤，假设 runner 镜像里已经预装全部依赖包',
  ],
  'concept-git-security:status': [
    '说明远程仓库已经被黑客入侵，必须立刻停服报警',
    'Git 会随机篡改工作区文件，这是客户端正常后台行为',
    '必须重装操作系统才能让工作区状态恢复到可提交',
  ],
  'concept-git-cli:q13': [
    'merge 禁止用于任何开源协作，团队只能使用 rebase',
    '共享分支上应永远 force push 到 main，以保持历史线性',
    'rebase 会自动解决所有产品需求争议与代码合并冲突',
  ],
  'concept-git-cli:q14': [
    '误删提交之后只能重装操作系统，否则历史无法找回',
    '删除整个 .git 目录再 init，历史会自动从远程完整回来',
    '执行 git gc --prune=now 可以立刻救回一切被误删的提交',
  ],
  'concept-code-basics:control': [
    '操作系统内核模块，直接管理硬件中断与设备驱动调度',
    '网络传输协议，负责在远程两台电脑之间发送与接收数据包',
    '数据库查询语言，专门用来编写 SQL 语句与存储过程',
  ],
  'concept-code-basics:const': [
    '只用 var 声明变量，并禁止在现代项目中使用 const',
    '声明关键字可以随便造新词，编译器会自动识别并绑定',
    '变量必须全部挂到 globalThis，方便在模块间全局共享',
  ],
  'concept-code-basics:json': [
    '二者只能用于 YAML 配置文件，不能解析或生成 JSON 文本',
    'parse 用于加密传输数据，防止中间人窃听与篡改载荷',
    'stringify 会执行字符串里的代码，行为类似危险的 eval',
  ],
  'concept-code-basics:typeerror': [
    '一定是路由器或交换机硬件故障，导致整段网络中断',
    '表示 Git 合并冲突标记未删干净，需要手动清理后重试',
    '可以忽略该报错，浏览器会自动补全缺失的对象属性',
  ],
  'concept-cache-hdr:cache_control': [
    '仅 Server 头，用来标识服务器软件名称与版本信息',
    '仅 Set-Cookie，用来写入会话 Cookie 以及过期策略',
    '仅 ETag，用来做内容协商验证，而不是强缓存主控头',
  ],
  'concept-cache-hdr:expires': [
    'TLS 握手专用头，与资源缓存过期时间完全没有关系',
    'CORS 预检专用头，用来决定跨域请求是否允许放行',
    '表示资源已被永久删除的状态头，而不是表达过期时间',
  ],
  'concept-cache-hdr:etag': [
    '把用户密码哈希存进浏览器本地，当作登录校验凭证使用',
    '仅表示当前 TCP 窗口大小数值，与内容指纹没有关系',
    '强制客户端每次必须下载全文，并禁止服务器返回 304',
  ],
  'concept-cache-hdr:last_modified': [
    '强行关闭 TLS 的传输层开关，与协商缓存机制无关',
    'SQL 事务隔离级别的配置项，写在数据库连接串参数里',
    '强缓存 max-age 的唯一实现方式，可以完全替代 Cache-Control',
  ],
  'concept-cache-hdr:strong_vs_revalidate': [
    '二者都禁止任何形式的本地缓存，客户端只能每次全量下载',
    '协商缓存只能建立在 UDP 传输之上，常规 HTTP 不适用',
    '强缓存等于必须每次下载完整正文，不能命中本地副本',
  ],
  'concept-cache-hdr:no-store-api': [
    '使用 public 且超长 max-age，并禁止一切协商校验',
    '完全不设置缓存相关头，让中间盒随意决定是否缓存',
    '只用一个过期的 Expires，并忽略现代 Cache-Control 指令',
  ],
  'interview-env-terminal:q1': [
    '是否必须先格式化硬盘，才能安装任何语言运行时',
    'TCP 三次握手公式怎么推导，否则不允许安装 Node',
    '是否把生产密钥写进 README，方便同事开箱即用',
  ],
  'interview-env-terminal:q3': [
    'lockfile 是操作系统内核的一部分，与包管理器无关',
    '有了 lockfile 就可以把密钥明文写进仓库安全共享',
    'lockfile 只对前端 CSS 生效，后端依赖树不必提交',
  ],
  'interview-env-terminal:q4': [
    '先改业务代码里的文案颜色，再回头查看命令行报错',
    '先把所有环境变量清空，用「干净环境」排除干扰',
    '先删除生产数据库，用重建环境的方式绕过本次排障',
  ],
  'interview-env-terminal:q5': [
    'WSL 与生产必须比特级强制一致，任何差异都视为非法',
    '生产环境禁止使用任何包管理器，只能手工拷贝二进制',
    'WSL 不能访问外网，只有生产机器才允许出网安装依赖',
  ],
  'interview-env-terminal:q6': [
    '把密钥写进前端打包产物，用「加快下载」作为理由',
    '关闭所有 TLS 校验，并把它当作长期默认安全方案',
    '删除 PATH 中的全部目录，强迫系统重新发现可执行文件',
  ],
  // terminal-tooling
  'concept-terminal-tooling:q1': [
    'Shell 负责创建硬件中断，仿真器则负责管理磁盘分区表',
    '三者完全同义，只是不同厂商对同一组件的营销叫法',
    '只有安装了图形桌面环境之后，系统才允许存在 Shell',
  ],
  'concept-terminal-tooling:q2': [
    '更换 Shell 会自动替换操作系统内核，桌面与驱动一并切换',
    '只有 bash 是合法 Shell，其余实现都应视为恶意软件',
    'PowerShell 不能运行任何命令，只能用来修改注册表项',
  ],
  'concept-terminal-tooling:q3': [
    '命令文字本身直接驱动 CPU 微码，不必经过文件系统查找',
    '浏览器会先下载该命令的网页版，再在本地沙箱里执行',
    '必须先重新编译整台电脑的内核，才能执行诸如 ls 的命令',
  ],
  'concept-terminal-tooling:q4': [
    '删除项目里的 .git 目录，让终端重新索引可执行文件',
    '把大模型 temperature 调到 0，命令解析错误就会消失',
    '立刻格式化系统盘，用重装系统的方式「彻底」修复 PATH',
  ],
  'concept-terminal-tooling:q6': [
    'pnpm 专门负责管理系统内核模块，与前端依赖无关',
    'apt 只能安装 npm 包，不能安装系统级运行时与工具',
    '四者角色完全等价，可以在项目与系统之间随意互换使用',
  ],
  'concept-terminal-tooling:q8': [
    'Alpine 镜像出于安全策略，禁止安装任何额外系统软件',
    'apk 只是 pnpm 的发行版别名，解析的是同一份 lockfile',
    'apt 在所有 Linux 发行版上都通用，而且是唯一合法包管理器',
  ],
  'concept-terminal-tooling:q9': [
    '换行符差异只影响打印机输出，与 Git 与跨侧编辑无关',
    'WSL 与 Windows 对同一文件强制比特级一致，不可能有差异',
    'WSL 环境里禁止使用任何文本编辑器，只能用 Windows 侧打开',
  ],
  'concept-terminal-tooling:q10': [
    '只要改用 Git Bash，就不再需要配置或检查 PATH 变量',
    '老式 cmd 已被操作系统内核删除，现代 Windows 无法启动',
    'Git Bash 会替代 Node 运行时，装了 Bash 就不必再装 Node',
  ],
  'concept-terminal-tooling:q12': [
    'Node.js 等于 pnpm 本身，只是包管理器的另一种叫法',
    'Node.js 可以完全取代操作系统内核，直接调度硬件资源',
    'Node.js 只用来打开浏览器窗口，并不能跑后端服务进程',
  ],
  'concept-terminal-tooling:q13': [
    '只有 Windows 存在环境变量，Linux 与 macOS 并不使用该机制',
    '只要设置了 PATH，出网请求就会自动走代理，无需 HTTP_PROXY',
    'PATH 与 HTTP_PROXY 必须设成同一个字符串，否则命令无法执行',
  ],
  'concept-terminal-tooling:q14': [
    'CI 每次先删除 lockfile，再随意解析依赖树以获得「最新」包',
    '只有 Windows Runner 才需要提交锁文件，Linux CI 可以省略',
    '把 lockfile 改名为 .env 即可同时满足密钥管理与依赖锁定',
  ],
  'concept-terminal-tooling:q15': [
    '出现 PS> 提示符时，会话就禁止再运行任何 Node 相关命令',
    '提示符里显示的文字本身就是 PATH，改提示符等于改查找路径',
    '提示符中的 $ 表示磁盘已满，必须先清理空间才能继续输入',
  ],
  'concept-terminal-tooling:q16': [
    '只有通过图形安装器安装的 Node 才能被项目脚本正确调用',
    '删除 package.json 即可消除多版本冲突，Shell 会自动选对',
    '版本安装得越多越好，Shell 会自动挑选最新且永远正确的那个',
  ],
};

function escOld(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function apply() {
  const byFile = new Map();
  for (const item of dump) {
    if (!NEW[item.id]) continue;
    const file = `src/data/quiz/sets/${item.set.replace(/^interview-env-terminal$/, 'interview-env-terminal').replace(/^interview-xrk-arch$/, 'interview-xrk')}.js`;
    // map set id to filename
    const fileMap = {
      'concept-workbench': 'concept-workbench.js',
      'concept-craft-quality': 'concept-craft-quality.js',
      'concept-git-security': 'concept-git-security.js',
      'concept-git-cli': 'concept-git-cli.js',
      'concept-code-basics': 'concept-code-basics.js',
      'concept-cache-hdr': 'concept-cache-hdr.js',
      'interview-env-terminal': 'interview-env-terminal.js',
      'concept-terminal-tooling': 'concept-terminal-tooling.js',
    };
    const fname = fileMap[item.set];
    if (!fname) continue;
    if (!byFile.has(fname)) byFile.set(fname, []);
    byFile.get(fname).push(item);
  }

  let total = 0;
  for (const [fname, items] of byFile) {
    const abs = path.join(root, 'src/data/quiz/sets', fname);
    let text = fs.readFileSync(abs, 'utf8');
    let fileN = 0;
    for (const item of items) {
      const neu = NEW[item.id];
      if (!neu) continue;
      for (let i = 0; i < 3; i++) {
        const old = item.wrong[i];
        const next = neu[i];
        if (!old || !next || old === next) continue;
        const patterns = [
          [`t: '${old.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`, `t: ${JSON.stringify(next)}`],
          [`t: "${old.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`, `t: ${JSON.stringify(next)}`],
          [`t: \`${old.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\``, `t: ${JSON.stringify(next)}`],
        ];
        let hit = false;
        for (const [from, to] of patterns) {
          if (text.includes(from)) {
            text = text.replace(from, to);
            hit = true;
            break;
          }
        }
        if (!hit) {
          // soft: unique substring
          const idx = text.indexOf(old);
          if (idx >= 0) {
            // find surrounding quotes
            const before = text.lastIndexOf("t:", idx);
            const slice = text.slice(before, idx + old.length + 2);
            console.error('FALLBACK miss quotes', item.id, i, JSON.stringify(old.slice(0, 40)));
          } else {
            console.error('MISS', item.id, i, JSON.stringify(old.slice(0, 40)));
          }
        } else {
          fileN++;
        }
      }
      total++;
    }
    fs.writeFileSync(abs, text);
    console.log(fname, 'questions', items.length, 'string-repl', fileN);
  }
  console.log('patched questions', total);
}

apply();

import { defineQuizSet } from '../schema.js';

/** 零基础：电脑 / 程序 / 终端——进编程脊骨前的第一台阶（语法细节见 code-basics） */
export default defineQuizSet({
  id: 'concept-zero-basics',
  title: '零基础 · 电脑、程序与终端',
  kind: 'concept',
  domain: 'lang',
  tags: ['零基础', '入门', '终端', '程序'],
  relatedNodes: ['computer-system', 'code-first-program', 'terminal-worlds'],
  caption: '从「文件是什么」到「在终端里跑起来」——不假设你会编程。',
  questions: [
    {
      id: 'concept-zero-basics:q1',
      q: '「程序」最朴素的理解是？',
      choices: [
        {
          t: "按顺序给计算机执行的一组指令，用来完成某件事",
          ok: true,
          why: '先建立「指令→机器执行」的直觉，再学语法。',
        },
        {
          t: '只能是游戏客户端，办公软件与后台服务都不算程序',
          ok: false,
          why: '浏览器、编辑器、服务端都是程序，不限于游戏。',
        },
        {
          t: '必须先手写在纸上并由人工逐步执行，电脑本身不能跑',
          ok: false,
          why: '程序存在文件里，由运行时/解释器执行。',
        },
        {
          t: '程序就是一张图片或一段视频，打开就能自动完成业务逻辑',
          ok: false,
          why: '媒体是数据；程序是可执行逻辑（也可处理媒体）。',
        },
      ],
      relatedNodes: ['code-first-program', 'computer-system'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q2',
      q: '操作系统（OS）对普通开发者最直观的作用？',
      choices: [
        {
          t: "管理文件、进程、内存和网络，让应用不必直接操作硬件",
          ok: true,
          why: 'Windows/macOS/Linux 都是 OS；终端命令也走 OS。',
        },
        {
          t: '只负责壁纸、主题与锁屏动画，与文件和进程无关',
          ok: false,
          why: '外观只是壳；内核与系统服务才管资源。',
        },
        {
          t: '代替你写全部业务代码，装好系统项目就自动交付',
          ok: false,
          why: 'OS 提供平台，业务逻辑仍要你写。',
        },
        {
          t: 'OS 就是某一种编程语言（例如 Python 的别名）',
          ok: false,
          why: '语言跑在 OS 之上，二者不是同一层。',
        },
      ],
      relatedNodes: ['os-essence', 'computer-system'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q3',
      q: '「文件」和「文件夹（目录）」的关系？',
      choices: [
        {
          t: '目录用来组织文件；路径告诉电脑去哪找',
          ok: true,
          why: '项目就是一棵目录树；终端用 cd/ls 在树里走。',
        },
        {
          t: '文件夹不能包含文件，只能放快捷方式或空标签',
          ok: false,
          why: '目录正是用来装文件与子目录的。',
        },
        {
          t: '所有项目文件必须叫 a.txt，否则系统拒绝保存',
          ok: false,
          why: '名字可自定；扩展名只是约定提示用途。',
        },
        {
          t: '路径对程序不重要，只要文件在磁盘某处就能自动找到',
          ok: false,
          why: '路径错了就找不到文件，程序跑不起来。',
        },
      ],
      relatedNodes: ['fs-layout', 'terminal-worlds'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:cwd',
      q: '终端提示「找不到文件」，但资源管理器里明明看见它。更常见原因？',
      choices: [
        {
          t: '当前工作目录（cwd）不在该文件所在文件夹，相对路径对不上',
          ok: true,
          why: '先 pwd/cd 到对的目录，或改用绝对路径。',
        },
        {
          t: '只要文件存在于任意盘符，终端就会无视路径自动定位到它',
          ok: false,
          why: '命令相对 cwd 解析路径；不在树上就会「找不到」。',
        },
        {
          t: '必须先把文件拖进回收站再还原，终端才能识别',
          ok: false,
          why: '与回收站无关；是路径/cwd 问题。',
        },
        {
          t: '文件名含中文时系统会永久禁止任何程序打开',
          ok: false,
          why: '现代终端/运行时支持 Unicode；优先查 cwd 与拼写。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'fs-layout'],
      tags: ['零基础', '场景'],
    },
    {
      id: 'concept-zero-basics:q4',
      q: '终端（命令行）相对「只点鼠标」多了什么？',
      choices: [
        {
          t: '用文字命令精确操作文件、进程与脚本',
          ok: true,
          why: '全栈/运维/AI 工程日常都在终端。',
        },
        {
          t: '终端只能用来和 AI 聊天，不能操作本机文件',
          ok: false,
          why: '终端是操作系统入口，不是聊天应用。',
        },
        {
          t: '有了终端就必须永久禁止使用任何图形界面',
          ok: false,
          why: '二者互补：GUI 做编辑，终端做脚本与排障。',
        },
        {
          t: '终端等于浏览器，打开就能访问任意网站后台',
          ok: false,
          why: '浏览器访问网页；终端操作本机进程与文件。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'linux-cli'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q5',
      q: '你在陌生机器上新建 `hello.js`，保存后在终端执行，屏幕终于打印出 Hello。这一步真正验证通的是？',
      choices: [
        {
          t: '编辑→保存→在正确目录用正确运行时执行→看到输出的闭环',
          ok: true,
          why: '环境与路径信心比代码长短更重要；闭环通了才能往下排障。',
        },
        {
          t: '一次写出完整电商网站并上线生产的能力',
          ok: false,
          why: '目标过大；第一程序只验证工具链。',
        },
        {
          t: '证明以后可以不装 Node / 编辑器也能交付同等功能',
          ok: false,
          why: '仍需编辑器与运行时；这次成功恰恰说明它们在位。',
        },
        {
          t: '复制能跑就永远不必再读任何一行源码',
          ok: false,
          why: '能跑是开始；理解才能自己改代码和排障。',
        },
      ],
      relatedNodes: ['code-first-program', 'workbench-editor'],
      tags: ['零基础', '场景'],
    },
    {
      id: 'concept-zero-basics:q6',
      q: '终端刷出一屏红字，项目跑不起来。更有效的第一步是？',
      choices: [
        {
          t: '当定位器：读错误类型、文件路径与关键行号',
          ok: true,
          why: '害怕报错会卡住；读报错是第一技能。',
        },
        {
          t: '不读报错正文，先盲目升降依赖大版本或换包管理器碰运气',
          ok: false,
          why: '换依赖有时相关，但第一步仍应读类型与行号。',
        },
        {
          t: '关掉所有输出窗口以免心烦，然后反复盲点运行按钮',
          ok: false,
          why: '输出里正是类型与行号线索。',
        },
        {
          t: '报错栈越长越可以整段忽略，只盯最后一次成功日志',
          ok: false,
          why: '长栈顶往往更有用，应从头读关键几行。',
        },
      ],
      relatedNodes: ['code-read-errors', 'workbench-troubleshoot'],
      tags: ['零基础', '场景'],
    },
    {
      id: 'concept-zero-basics:q7',
      q: '变量最直观的比喻？',
      choices: [
        {
          t: '贴了名字的盒子，用来存放稍后要用的值',
          ok: true,
          why: '先会存取，再谈类型。',
        },
        {
          t: '只能存密码与密钥，其它业务数据必须写死在代码里',
          ok: false,
          why: '可存数字、文本、对象等任意业务数据。',
        },
        {
          t: '变量就是网络端口号，声明一个就占用一个 TCP 端口',
          ok: false,
          why: '端口是网络概念；变量是程序内的命名存储。',
        },
        {
          t: '每声明一个变量都会立刻占用一个新的 TCP 监听端口',
          ok: false,
          why: '声明只占用内存（或绑定名字），与开端口无关。',
        },
      ],
      relatedNodes: ['code-values-types', 'code-first-program'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q8',
      q: 'if / for 控制流在零基础阶段先记住？',
      choices: [
        {
          t: 'if 做判断分支；for/while 做重复执行',
          ok: true,
          why: '逻辑骨架；语法细节后练。',
        },
        {
          t: '它们是数据库产品品牌名，与源码语法无关',
          ok: false,
          why: '那是 SQL 引擎；if/for 是语言里的控制结构。',
        },
        {
          t: '只能写在 YAML 配置里，写进 .js/.py 会无效',
          ok: false,
          why: '控制流写在编程语言源码里，不是 YAML 专属。',
        },
        {
          t: '有了 if 就不需要函数，所有逻辑平铺在一个文件即可',
          ok: false,
          why: '分支与封装各司其职，常一起用。',
        },
      ],
      relatedNodes: ['code-control-flow'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q9',
      q: '函数（function）对初学者最大的好处？',
      choices: [
        {
          t: '给一段逻辑起名字，方便复用、少复制粘贴',
          ok: true,
          why: '避免同一段逻辑散落多处。',
        },
        {
          t: '函数在整个项目生命周期里只能被调用一次',
          ok: false,
          why: '设计目的就是反复调用、复用。',
        },
        {
          t: '写了函数就等于替代了操作系统与包管理器',
          ok: false,
          why: '函数是代码组织单位，不能替代 OS。',
        },
        {
          t: '有函数就永远不必调试，运行时错误会自动消失',
          ok: false,
          why: '封装后仍要调试；只是边界更清晰。',
        },
      ],
      relatedNodes: ['code-functions'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q10',
      q: '「依赖 / 包」是什么直觉？',
      choices: [
        {
          t: "别人写好、你可以安装复用的代码库（如用 pnpm 安装）",
          ok: true,
          why: '现代项目很少从零造所有轮子。',
        },
        {
          t: '依赖等于病毒，安装任何一个都会立刻毁掉系统',
          ok: false,
          why: '要甄别来源与版本，但概念本身是合法复用。',
        },
        {
          t: '依赖装好一次后就永远不需要网络，锁文件也可以不要',
          ok: false,
          why: '常要出网；锁文件保证各环境版本一致。',
        },
        {
          t: '有了依赖就不用自己写任何业务逻辑与胶水代码',
          ok: false,
          why: '业务逻辑、胶水与边界仍要你写。',
        },
      ],
      relatedNodes: ['package-managers', 'installers-path'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q11',
      q: '编辑器（VS Code / Cursor）在学习路径上的位置？',
      choices: [
        {
          t: "改文件、看终端、看 diff 的工作台——不是魔法自动上线器",
          ok: true,
          why: 'Agent 辅助也要你审 diff。',
        },
        {
          t: '装了编辑器就会完全替代 Git、CI 与远程服务器等工程环节',
          ok: false,
          why: '版本与部署仍靠 Git/CI/服务器，编辑器只是工作台。',
        },
        {
          t: '编辑器只能只读预览，不能保存或修改仓库里的任何源码',
          ok: false,
          why: '核心能力就是编辑与保存源码。',
        },
        {
          t: '必须在编辑器里手写机器码或汇编，才能运行任何现代项目',
          ok: false,
          why: '现代开发写高级语言，由工具链编译/解释。',
        },
      ],
      relatedNodes: ['workbench-editor', 'adev-vibe-coding'],
      tags: ['零基础'],
    },
    {
      id: 'concept-zero-basics:q12',
      q: '零基础学全栈时，更稳妥的节奏是？',
      choices: [
        {
          t: "小闭环：会跑→会改→会读报错→再叠 Git/HTTP/库——忌一上来造平台",
          ok: true,
          why: '与 XRK「最小贡献路径」同一精神。',
        },
        {
          t: '先同时背完所有框架文档，再动手写项目里的第一行代码',
          ok: false,
          why: '纸上谈兵；先跑通最小闭环再扩。',
        },
        {
          t: '跳过终端与报错阅读，只反复看视频、不动手改代码',
          ok: false,
          why: '不动手就不会排障，视频代替不了闭环。',
        },
        {
          t: '先把所有密钥提交到公开 GitHub，方便换机器时复制练习',
          ok: false,
          why: '密钥进仓是安全事故；用 .env / Secrets。',
        },
      ],
      relatedNodes: ['xrk-min-path', 'code-first-program'],
      tags: ['零基础', '进阶'],
    },
  ],
});

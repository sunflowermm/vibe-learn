import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-terminal-tooling',
  title: '概念 · 终端、PATH 与包管理',
  kind: 'concept',
  domain: 'ops',
  tags: ['终端', 'Linux', 'Node', 'pnpm'],
  relatedNodes: ['terminal-worlds', 'linux-cli', 'package-managers'],
  questions: [
    {
      q: '终端（Terminal）配合命令行解释器（Shell）的主要作用是什么？',
      choices: [
        {
          t: '用文本命令与操作系统对话，完成文件操作、启动程序等任务',
          ok: true,
          why: '终端是开发者与系统交互的基础入口，许多工具链都依赖命令行完成。',
        },
        {
          t: '必须搭配图形桌面才能工作，纯文字界面无法使用',
          ok: false,
          why: '服务器和远程环境常只有终端，不依赖图形界面也能完成全部操作。',
        },
        {
          t: '专门用来运行数据库查询引擎，不能执行普通命令',
          ok: false,
          why: '终端可以运行各种程序，数据库只是其中一种可能的用途。',
        },
        {
          t: '只能查看系统日志，不能创建或修改任何文件',
          ok: false,
          why: '终端完全可以执行 mkdir、touch 等命令来创建和管理文件。',
        },
      ],
    },
    {
      q: '输入命令后提示「command not found」，最常见的原因是什么？',
      choices: [
        {
          t: '该命令的可执行文件不在 PATH 环境变量所列目录中，或尚未安装',
          ok: true,
          why: 'Shell 只在 PATH 指定的目录里搜索命令，路径不对或软件未装都会报此错。',
        },
        {
          t: '键盘输入速度太快，系统自动拒绝识别',
          ok: false,
          why: 'Shell 不关心输入速度，找不到命令一定是路径或安装问题。',
        },
        {
          t: '必须更换整台电脑硬件才能解决此问题',
          ok: false,
          why: '这通常是软件配置问题，调整 PATH 或安装对应工具即可修复。',
        },
        {
          t: '命令拼写完全正确时也会随机出现，与路径无关',
          ok: false,
          why: '若程序已安装且 PATH 正确，拼写对的命令一定能被找到。',
        },
      ],
    },
    {
      q: '本仓库（XRK-AGT）推荐的 JavaScript 包管理器是哪一个？',
      choices: [
        {
          t: 'pnpm，用于安装依赖并管理 node_modules',
          ok: true,
          why: '项目约定使用 pnpm 安装依赖，与 npm/yarn 相比更省磁盘且符合仓库规范。',
        },
        {
          t: '必须全局用 npm install -g 随意安装所有模块',
          ok: false,
          why: '全局乱装易造成版本冲突，项目依赖应在仓库内用 pnpm 本地安装。',
        },
        {
          t: '只能通过图形应用商店安装 Node 模块，不能用命令行',
          ok: false,
          why: 'Node 生态的标准做法是用包管理器在终端中安装，图形商店不是主路径。',
        },
        {
          t: '不需要任何包管理器，Node 会自动下载所有依赖',
          ok: false,
          why: '第三方库必须经包管理器声明和安装，Node 本身不会自动拉取项目依赖。',
        },
      ],
    },
    {
      q: 'Node.js 在本项目主服中扮演什么角色？',
      choices: [
        {
          t: '运行 JavaScript/TypeScript 服务端代码与工具链的运行时环境',
          ok: true,
          why: 'Node.js 让 JS/TS 能在服务器上执行，是本仓后端与脚本的核心运行时。',
        },
        {
          t: '只用来打开网页浏览器，不能运行后端程序',
          ok: false,
          why: 'Node.js 是服务端运行时，可以启动 HTTP 服务、执行脚本，不仅限于浏览器。',
        },
        {
          t: '完全取代操作系统内核，独立管理硬件',
          ok: false,
          why: 'Node.js 运行在操作系统之上，本身不负责硬件调度与驱动管理。',
        },
        {
          t: '仅用于格式化硬盘，与代码运行无关',
          ok: false,
          why: '格式化磁盘是操作系统或专用工具的功能，不是 Node.js 的用途。',
        },
      ],
    },
    {
      q: '在 Linux 命令行中，查看当前所在目录和列出文件常用哪组命令？',
      choices: [
        {
          t: 'pwd 显示当前路径，ls 列出目录内容',
          ok: true,
          why: 'pwd 和 ls 是导航文件系统的基础命令，初学者应最先掌握。',
        },
        {
          t: 'format c: 格式化磁盘，dir 只在 Windows 图形界面可用',
          ok: false,
          why: 'format c: 是 Windows 旧命令，Linux 下列目录用 ls 而非 dir。',
        },
        {
          t: '只有图形文件管理器才能看到目录，终端无法浏览',
          ok: false,
          why: '终端通过 pwd、ls、cd 等命令完全可以浏览和管理目录结构。',
        },
        {
          t: 'cat 用来切换目录，cd 用来显示当前路径',
          ok: false,
          why: 'cat 用于查看文件内容，cd 才是切换目录，pwd 才是显示路径。',
        },
      ],
    },
    {
      q: '判断项目「首次跑通」是否成功，更可靠的验收方式是什么？',
      choices: [
        {
          t: '在本机按文档步骤启动服务，并看到预期的控制台或页面输出',
          ok: true,
          why: '亲自跑通能验证依赖、配置与代码是否齐备，比凭感觉更可靠。',
        },
        {
          t: '只看别人截图觉得差不多就算完成',
          ok: false,
          why: '截图无法证明你的环境配置正确，必须在自己机器上实际运行。',
        },
        {
          t: '跳过依赖安装，直接宣称项目已经可以运行',
          ok: false,
          why: '缺少依赖程序无法启动，省略安装步骤不可能真正跑通。',
        },
        {
          t: '只要 clone 了仓库代码，无需启动即视为成功',
          ok: false,
          why: '下载代码只是第一步，能否运行取决于安装依赖和正确启动。',
        },
      ],
    },
    {
      q: 'Linux 发行版差异（如 Ubuntu 与 CentOS）首先会影响什么？',
      choices: [
        {
          t: '默认包管理器命令和系统文件路径习惯',
          ok: true,
          why: '不同发行版用 apt、dnf 等不同包管理器，路径约定也可能略有不同。',
        },
        {
          t: 'TCP 协议中端口号的基本数学定义',
          ok: false,
          why: '端口号是网络协议标准，与 Linux 发行版选择无关。',
        },
        {
          t: 'HTTP 状态码 404 和 500 的语义含义',
          ok: false,
          why: 'HTTP 状态码是 Web 标准，在任何操作系统上都一致。',
        },
        {
          t: 'JavaScript 语言中 typeof 运算符的返回结果',
          ok: false,
          why: 'typeof 行为由 ECMAScript 规范定义，不受 Linux 发行版影响。',
        },
      ],
    },
  ],
});

import { defineQuizSet } from '../schema.js';

/** OS 入门：进程/CPU/内存/文件系统（面试开口见 interview-os-db） */
export default defineQuizSet({
  id: 'concept-computer-os',
  title: '概念 · 计算机系统与操作系统',
  kind: 'concept',
  domain: 'os-db',
  tags: ['序章', 'OS', 'CPU'],
  relatedNodes: ['computer-system', 'os-essence'],
  caption: '硬件与应用之间的那一层：调度、隔离、文件抽象。',
  questions: [
    {
      id: 'concept-computer-os:os-duty',
      q: '从系统结构看，操作系统（Operating System）最核心的职责是什么？',
      choices: [
        {
          t: "管理中央处理器（CPU）、内存、磁盘等硬件，并向应用提供进程、文件等抽象",
          ok: true,
          why: 'OS 位于硬件与应用之间，负责资源调度与安全隔离。',
        },
        {
          t: '只负责更换桌面壁纸和图标主题，完全不参与程序运行与资源调度',
          ok: false,
          why: '桌面只是外壳；核心是管理硬件与运行程序。',
        },
        {
          t: '替代所有应用软件，直接替用户完成业务逻辑与全部界面交互流程',
          ok: false,
          why: 'OS 提供运行环境，业务仍由用户态程序完成。',
        },
        {
          t: '专门用来安装显卡驱动，与进程调度、内存管理基本可以无关',
          ok: false,
          why: '驱动只是一部分；调度进程与分配内存同样是核心。',
        },
      ],
      relatedNodes: ['os-essence', 'computer-system'],
    },
    {
      id: 'concept-computer-os:cpu-mem',
      q: '中央处理器（CPU）与内存（Memory）之间，更准确的关系描述是？',
      choices: [
        {
          t: 'CPU 按指令从内存读取代码与数据，运算后再写回内存',
          ok: true,
          why: '指令和数据在内存；CPU 反复读写完成计算。',
        },
        {
          t: '内存可以独立执行程序，完全不需要 CPU 参与',
          ok: false,
          why: '内存只存储，不能解释执行指令。',
        },
        {
          t: 'CPU 只负责显示画面，所有计算都在内存芯片内部完成',
          ok: false,
          why: '显示多靠 GPU/显示控制器；CPU 负责通用运算与调度。',
        },
        {
          t: 'CPU 与内存之间没有任何数据交换，各自独立工作',
          ok: false,
          why: '不能访问内存则程序无法加载运行。',
        },
      ],
      relatedNodes: ['hw-sw-link', 'computer-system'],
    },
    {
      id: 'concept-computer-os:launch',
      q: '当你点击图标「打开一个应用」时，操作系统大致会做哪些事？',
      choices: [
        {
          t: '创建新进程、把可执行文件映射进内存，并安排 CPU 时间片来运行它',
          ok: true,
          why: '启动=分配进程、加载进内存、调度执行。',
        },
        {
          t: '浏览器直接改写主板固件（BIOS），绕过操作系统启动程序',
          ok: false,
          why: '普通应用在用户态，须通过 OS 接口，不能改固件。',
        },
        {
          t: '必须先重装整个操作系统，否则任何程序都无法打开',
          ok: false,
          why: '日常启动只需创建进程加载文件，与重装无关。',
        },
        {
          t: '只改变桌面图标颜色，程序其实一直在后台 secretly 运行',
          ok: false,
          why: '点击会触发明确的加载与调度，不是改图标颜色。',
        },
      ],
      relatedNodes: ['os-essence', 'computer-system'],
    },
    {
      id: 'concept-computer-os:usermode',
      q: '运行在用户态的普通程序，一般不能直接做哪件事？',
      choices: [
        {
          t: '任意读写物理内存地址或直接操作硬件寄存器',
          ok: true,
          why: '硬件访问受特权级限制，须经系统调用由内核代劳。',
        },
        {
          t: '通过系统调用（System Call）请求操作系统打开文件',
          ok: false,
          why: '这正是用户态访问内核服务的正规途径。',
        },
        {
          t: '读写自己进程被分配的虚拟地址空间中的数据',
          ok: false,
          why: '读写自身合法虚拟内存是正常操作。',
        },
        {
          t: '调用操作系统提供的网络、文件等标准接口',
          ok: false,
          why: '这些接口就是给应用用的，不属于越权。',
        },
      ],
      relatedNodes: ['os-essence', 'hw-sw-link'],
    },
    {
      id: 'concept-computer-os:chip',
      q: '在本课「芯片与算力单元」语境下，「芯片」更贴近哪种含义？',
      choices: [
        {
          t: '集成大量晶体管、提供算力与存储层级的物理硬件载体',
          ok: true,
          why: '芯片是 CPU 等算力部件的物理基础。',
        },
        {
          t: '仅指某一显卡品牌的商业名称，与算力无关',
          ok: false,
          why: '本课关注硬件载体，不是某个品牌名。',
        },
        {
          t: '等同于某一门编程语言的名称，如 JavaScript',
          ok: false,
          why: '语言是软件层语法；芯片是物理半导体。',
        },
        {
          t: '专指电脑机箱上的装饰贴纸，不含任何电子元件',
          ok: false,
          why: '芯片是内部集成电路，不是贴纸。',
        },
      ],
      relatedNodes: ['hw-sw-link', 'computer-system'],
    },
    {
      id: 'concept-computer-os:fs',
      q: '文件系统（File System）对应用软件的主要价值是什么？',
      choices: [
        {
          t: '用路径名和文件句柄把磁盘上的字节组织成可读写的抽象资源',
          ok: true,
          why: '应用不必关心磁道扇区，OS 负责底层映射。',
        },
        {
          t: '保证任何情况下数据永远不会丢失或损坏',
          ok: false,
          why: '提供存取机制，但盘坏/误删仍可能丢数据。',
        },
        {
          t: '自动替开发者写出正确的业务逻辑代码',
          ok: false,
          why: '只管存储与检索，业务逻辑仍要应用实现。',
        },
        {
          t: '只在图形界面中显示文件夹图标，磁盘上并不真实存在',
          ok: false,
          why: '目录与数据块在磁盘上真实存在。',
        },
      ],
      relatedNodes: ['os-essence', 'fs-layout'],
    },
  ],
});

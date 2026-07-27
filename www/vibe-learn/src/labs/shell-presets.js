/** 各课可复用的模拟终端预设（全部假数据 · 不上网） */
import { defaultLinuxTree } from './shell-engine.js';

const FAKE =
  '【模拟】本窗全程假数据：不上网、不改磁盘；真实操作请在本机终端做';

const REPO = 'https://github.com/sunflowermm/XRK-AGT.git';
const REPO_GHPROXY = `https://ghproxy.com/${REPO}`;

/** @type {Record<string, import('./shell-engine.js').ShellConfig>} */
export const SHELL_PRESETS = {
  'linux-cli': {
    environment: 'Linux · bash（模拟）',
    title: 'Linux 命令沙箱',
    badge: '模拟 · 不上网',
    promptPrefix: 'alice@learn',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '你现在在家目录 /home/alice（提示符里的 ~ 就是这儿）',
      '跟一遍：pwd → ls → ls -la，先搞清「站在哪」',
    ],
    hintCommands: [
      'pwd',
      'ls',
      'ls -la',
      'cd Documents',
      'cat notes.txt',
      'cd ~/projects/XRK-AGT',
      'cat package.json',
      'tree',
      'curl -I https://example.com',
    ],
    autoPlay: ['pwd', 'ls', 'ls -la'],
    autoPlayDelay: 140,
  },

  'path-check': {
    environment: 'Linux · bash（模拟）',
    title: 'PATH / which 沙箱',
    badge: '模拟 · 不上网',
    promptPrefix: 'alice@path',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '理解「命令从哪来」：which · echo $PATH · node -v',
    ],
    hintCommands: ['echo $PATH', 'which node', 'which git', 'node -v', 'git --version'],
    autoPlay: ['echo $PATH', 'which node', 'git --version'],
  },

  'env-proxy': {
    environment: 'Linux / Git Bash · bash（模拟）',
    title: '代理变量沙箱',
    badge: '模拟 · 不上网',
    promptPrefix: 'dev@proxy',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    env: {
      HTTP_PROXY: '',
      HTTPS_PROXY: '',
      NO_PROXY: '127.0.0.1,localhost,::1',
    },
    welcome: [
      FAKE,
      '练习 export HTTPS_PROXY=… 后再 git clone（仍是假结果）',
    ],
    hintCommands: [
      'echo $HTTPS_PROXY',
      'export HTTPS_PROXY=http://127.0.0.1:7890',
      'export HTTP_PROXY=http://127.0.0.1:7890',
      `git clone ${REPO}`,
      'env',
      'help',
    ],
    autoPlay: [
      'echo $HTTPS_PROXY',
      'export HTTPS_PROXY=http://127.0.0.1:7890',
      'echo $HTTPS_PROXY',
    ],
  },

  /** 自动演示：国内直连 clone 失败长什么样 */
  'clone-fail': {
    environment: '国内直连 · bash（模拟失败）',
    title: '国内直连 clone · 失败演示',
    badge: '模拟失败场景',
    promptPrefix: 'dev@cn',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    env: { HTTP_PROXY: '', HTTPS_PROXY: '', NO_PROXY: '127.0.0.1,localhost,::1' },
    welcome: [
      FAKE,
      '将自动演示：未设代理时 git clone GitHub 的典型报错',
      '对照下一窗：代理 / ghproxy 成功路径',
    ],
    hintCommands: [
      `git clone ${REPO}`,
      'export HTTPS_PROXY=http://127.0.0.1:7890',
      `git clone ${REPO_GHPROXY}`,
    ],
    autoPlay: [`git clone ${REPO}`],
    autoPlayDelay: 180,
  },

  /** 自动演示：设代理后 clone「成功」 */
  'clone-proxy-ok': {
    environment: '已设 HTTPS_PROXY · bash（模拟）',
    title: '会话代理后 clone · 成功演示',
    badge: '模拟成功 · 仍假',
    promptPrefix: 'dev@proxy',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    env: {
      HTTP_PROXY: 'http://127.0.0.1:7890',
      HTTPS_PROXY: 'http://127.0.0.1:7890',
      NO_PROXY: '127.0.0.1,localhost,::1',
    },
    welcome: [
      FAKE,
      '本会话已「假装」设好 HTTPS_PROXY=7890，将自动 clone',
    ],
    hintCommands: [
      'echo $HTTPS_PROXY',
      `git clone ${REPO}`,
      'ls',
      'cd XRK-AGT',
      'cat package.json',
    ],
    autoPlay: ['echo $HTTPS_PROXY', `git clone ${REPO}`, 'ls'],
  },

  /** 自动演示：ghproxy 前缀 */
  'clone-ghproxy': {
    environment: 'ghproxy 前缀 · bash（模拟）',
    title: 'ghproxy.com 前缀 · 成功演示',
    badge: '模拟 · ghproxy',
    promptPrefix: 'dev@mirror',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    env: { HTTP_PROXY: '', HTTPS_PROXY: '' },
    welcome: [
      FAKE,
      '不设本机代理时，可用公益前缀：https://ghproxy.com/https://github.com/...',
      '同类还有 gh-proxy.com 等；站点可用性会变，优先仍建议本机合规代理',
    ],

    hintCommands: [
      `git clone ${REPO_GHPROXY}`,
      `git clone ${REPO}`,
      'ls',
      'help',
    ],
    autoPlay: [`git clone ${REPO_GHPROXY}`, 'ls'],
  },

  'first-run': {
    environment: '仓库根 · bash（模拟）',
    title: '首次跑通 · 命令沙箱',
    badge: '模拟 · 不上网',
    promptPrefix: 'alice@xrk',
    home: '/home/alice',
    cwd: '/home/alice/projects/XRK-AGT',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '假装已在仓库根：试 node -v · pnpm -v · ls',
    ],
    hintCommands: ['pwd', 'ls', 'node -v', 'pnpm -v', 'cat package.json'],
    autoPlay: ['pwd', 'node -v', 'pnpm -v'],
  },

  'pnpm-demo': {
    environment: '仓库根 · bash（模拟）',
    title: 'pnpm · 仓库根安装演示',
    badge: '模拟 · 假 install',
    promptPrefix: 'alice@pkg',
    home: '/home/alice',
    cwd: '/home/alice/projects/XRK-AGT',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '本仓只认 pnpm；将自动演示版本检查与假 install',
    ],
    hintCommands: [
      'node -v',
      'which pnpm',
      'pnpm -v',
      'corepack enable',
      'pnpm install',
      'ls',
    ],
    autoPlay: ['node -v', 'pnpm -v', 'pnpm install'],
  },

  'docker-basics': {
    environment: 'Docker CLI · bash（模拟 · 不起容器）',
    title: 'Docker · 命令直觉沙箱',
    badge: '模拟 · 不起容器',
    promptPrefix: 'alice@dock',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '假 docker：ps / images / compose —— 不上网、不起 daemon',
    ],
    hintCommands: [
      'docker ps',
      'docker images',
      'docker compose ps',
      'docker run',
      'help',
    ],
    autoPlay: ['docker ps', 'docker images'],
  },

  'compose-up': {
    environment: 'Compose · bash（模拟）',
    title: 'Compose · 多容器一文件',
    badge: '模拟 · 假编排',
    promptPrefix: 'alice@compose',
    home: '/home/alice',
    cwd: '/home/alice/projects/XRK-AGT',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '演示 docker compose up / ps（假输出）',
    ],
    hintCommands: ['docker compose up', 'docker compose ps', 'docker ps', 'redis-cli ping'],
    autoPlay: ['docker compose up', 'docker compose ps'],
  },

  'redis-ping': {
    environment: '本机 redis-cli（模拟 · 假 PONG）',
    title: 'redis-cli · 连通演示',
    badge: '模拟 · 假 Redis',
    promptPrefix: 'alice@redis',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '假装本机已有 redis-server：试 ping → PONG',
    ],
    hintCommands: ['redis-cli ping', 'redis-cli SET demo 1', 'redis-cli GET demo', 'which redis-cli'],
    autoPlay: ['which redis-cli', 'redis-cli ping'],
  },

  'dotfiles': {
    environment: 'Linux / Git Bash · bash（模拟）',
    title: '点文件 · ls vs ls -la',
    badge: '模拟 · 隐藏项',
    promptPrefix: 'alice@dot',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '对比：默认 ls 看不到 .bashrc；ls -la 才列出点文件',
    ],
    hintCommands: ['ls', 'ls -la', 'ls -la ~', 'cd .ssh', 'cat ~/.bashrc'],
    autoPlay: ['ls', 'ls -la'],
  },

  'curl-auth': {
    environment: 'curl · bash（模拟 HTTP）',
    title: 'curl · API Key 演示',
    badge: '模拟 · 假 HTTP',
    promptPrefix: 'alice@api',
    home: '/home/alice',
    cwd: '/home/alice',
    tree: defaultLinuxTree(),
    welcome: [
      FAKE,
      '演示 curl 探活与带 X-API-Key（响应全是假的）',
    ],
    hintCommands: [
      'curl -I https://example.com',
      'curl -s http://127.0.0.1:8080/api/health',
      'help',
    ],
    autoPlay: ['curl -I https://example.com'],
  },
};

export function resolveShellConfig(raw) {
  return raw;
}

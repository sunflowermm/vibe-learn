/**
 * 课文模拟 Shell：虚拟目录树 + 可扩展命令
 * 不执行真实系统命令；供 LessonShell / ```shell 围栏使用。
 */

/**
 * @typedef {{ type: 'dir', children: Record<string, VNode>, hidden?: boolean } | { type: 'file', content: string, hidden?: boolean }} VNode
 * @typedef {{
 *   title?: string,
 *   badge?: string,
 *   environment?: string,
 *   promptPrefix?: string,
 *   welcome?: string[],
 *   home?: string,
 *   cwd?: string,
 *   env?: Record<string, string>,
 *   hintCommands?: string[],
 *   tree?: VNode,
 *   aliases?: Record<string, string>,
 *   extra?: Record<string, string>,
 *   preset?: string,
 *   autoPlay?: string[],
 *   autoPlayDelay?: number,
 * }} ShellConfig
 */

/** @returns {VNode} */
export function defaultLinuxTree() {
  return {
    type: 'dir',
    children: {
      home: {
        type: 'dir',
        children: {
          alice: {
            type: 'dir',
            children: {
              Documents: {
                type: 'dir',
                children: {
                  'notes.txt': {
                    type: 'file',
                    content: '先 pwd，再 ls，再 cd。\n点文件要用 ls -la 才看得见。\n',
                  },
                  'hello.js': {
                    type: 'file',
                    content: "console.log('hello, xrk')\n",
                  },
                },
              },
              Downloads: { type: 'dir', children: {} },
              projects: {
                type: 'dir',
                children: {
                  'XRK-AGT': {
                    type: 'dir',
                    children: {
                      'package.json': {
                        type: 'file',
                        content:
                          '{\n  "name": "xrk-agt",\n  "packageManager": "pnpm@10"\n}\n',
                      },
                      'README.md': {
                        type: 'file',
                        content: '# XRK-AGT\n模拟仓库根。试：cat package.json\n',
                      },
                    },
                  },
                },
              },
              '.bashrc': {
                type: 'file',
                hidden: true,
                content: 'export PATH="/usr/local/bin:/usr/bin:/bin"\n',
              },
              '.ssh': {
                type: 'dir',
                hidden: true,
                children: {
                  known_hosts: {
                    type: 'file',
                    content: 'github.com ssh-ed25519 AAAA...\n',
                  },
                },
              },
            },
          },
        },
      },
      usr: {
        type: 'dir',
        children: {
          bin: {
            type: 'dir',
            children: {
              curl: { type: 'file', content: '#!/bin/sh\n' },
              git: { type: 'file', content: '#!/bin/sh\n' },
              node: { type: 'file', content: '#!/bin/sh\n' },
            },
          },
        },
      },
      etc: {
        type: 'dir',
        children: {
          hosts: {
            type: 'file',
            content: '127.0.0.1 localhost\n::1 localhost\n',
          },
        },
      },
      tmp: { type: 'dir', children: {} },
    },
  };
}

/** @param {string} path */
export function splitPath(path) {
  return String(path || '')
    .split('/')
    .filter(Boolean);
}

/** @param {string} cwd @param {string} home @param {string} input */
export function normalizePath(cwd, home, input) {
  let raw = String(input ?? '').trim();
  if (!raw || raw === '~') return home;
  if (raw.startsWith('~/')) raw = `${home}/${raw.slice(2)}`;
  const base = raw.startsWith('/') ? [] : splitPath(cwd);
  const parts = [...base];
  for (const seg of splitPath(raw)) {
    if (seg === '.') continue;
    if (seg === '..') {
      parts.pop();
      continue;
    }
    parts.push(seg);
  }
  return `/${parts.join('/')}` || '/';
}

/** @param {VNode} root @param {string} absPath */
export function getNode(root, absPath) {
  if (absPath === '/') return root;
  let cur = root;
  for (const seg of splitPath(absPath)) {
    if (!cur || cur.type !== 'dir') return null;
    cur = cur.children[seg];
    if (!cur) return null;
  }
  return cur;
}

/** @param {string} line */
export function parseCommandLine(line) {
  const trimmed = String(line ?? '').trim();
  if (!trimmed) return { name: '', args: [] };
  const parts = [];
  let cur = '';
  let quote = null;
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (/\s/.test(ch)) {
      if (cur) {
        parts.push(cur);
        cur = '';
      }
      continue;
    }
    cur += ch;
  }
  if (cur) parts.push(cur);
  const [name = '', ...args] = parts;
  return { name, args };
}

function globMatch(name, pattern) {
  const re = new RegExp(
    `^${pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.')}$`
  );
  return re.test(name);
}

/** 常见 GitHub 加速前缀（第三方公益/镜像，可用性随时间变化） */
const GH_PROXY_HOST =
  /(?:^https?:\/\/)?(?:mirror\.)?ghproxy\.com\/|gh-proxy\.com\/|gitclone\.com\/github\.com/i;

/**
 * @param {object} c
 * @param {string[]} args
 * @param {VNode} root
 * @param {() => string} getCwd
 * @param {(p: string) => void} setCwd
 */
function simulateGitClone(c, args, root, getCwd, setCwd) {
  const url = args.find((a) => /^(https?:\/\/|git@)/i.test(a) || a.endsWith('.git')) || '';
  if (!url) {
    return 'fatal: You must specify a repository to clone.\n# [模拟] 用法：git clone <url>';
  }

  const hasProxy = Boolean(
    (c.env.HTTPS_PROXY || c.env.HTTP_PROXY || c.env.ALL_PROXY || '').trim()
  );
  const viaGhProxy = GH_PROXY_HOST.test(url);
  const hitsGithub = /github\.com/i.test(url);

  const repoName =
    url
      .replace(/\/$/, '')
      .split('/')
      .pop()
      ?.replace(/\.git$/i, '') || 'XRK-AGT';

  /* 国内直连 GitHub：模拟超时 / 连不上 */
  if (hitsGithub && !viaGhProxy && !hasProxy) {
    return [
      `Cloning into '${repoName}'...`,
      `fatal: unable to access '${url}': Failed to connect to github.com port 443 after 21005 ms: Couldn't connect to server`,
      '',
      '[模拟 · 全程假数据] 国内直连 GitHub 常见报错 ↑',
      '[模拟] 可能还会看到：Connection timed out / SSL / Recv failure / Empty reply',
      '[模拟] 对策 A：先 export HTTPS_PROXY=http://127.0.0.1:端口',
      '[模拟] 对策 B：经 ghproxy / gh-proxy 前缀，例如',
      '         git clone https://ghproxy.com/https://github.com/sunflowermm/XRK-AGT.git',
      '[模拟] 对策 C：项目若提供 Gitee 镜像，换镜像 URL',
    ];
  }

  /* 成功路径：代理会话 或 ghproxy URL */
  const parent = getNode(root, getCwd());
  if (parent && parent.type === 'dir' && !parent.children[repoName]) {
    parent.children[repoName] = {
      type: 'dir',
      children: {
        'package.json': {
          type: 'file',
          content: '{\n  "name": "xrk-agt",\n  "packageManager": "pnpm@10"\n}\n',
        },
        'README.md': {
          type: 'file',
          content: '# XRK-AGT\n[模拟 clone 成功写入的虚拟文件]\n',
        },
        '.git': {
          type: 'dir',
          hidden: true,
          children: {
            HEAD: { type: 'file', content: 'ref: refs/heads/main\n' },
          },
        },
      },
    };
  }

  const how = viaGhProxy
    ? '经 ghproxy 类前缀（模拟成功）'
    : `经会话代理 ${c.env.HTTPS_PROXY || c.env.HTTP_PROXY}（模拟成功）`;

  return [
    `Cloning into '${repoName}'...`,
    'remote: Enumerating objects: 128, done.',
    'remote: Counting objects: 100% (128/128), done.',
    'Receiving objects: 100% (128/128), 1.02 MiB | 模拟速度, done.',
    `Resolving deltas: 100% (42/42), done.`,
    '',
    `[模拟 · 全程假数据] ${how}`,
    `[模拟] 虚拟目录已出现：./${repoName} （可用 ls / cd ${repoName}）`,
    '[模拟] 真实电脑请在本机终端执行同等命令；本窗不会上网、不会落盘',
  ];
}

function cloneTree(tree) {
  return typeof structuredClone === 'function'
    ? structuredClone(tree)
    : JSON.parse(JSON.stringify(tree));
}

/**
 * @param {ShellConfig} config
 */
export function createShellSession(config = {}) {
  const home = config.home || '/home/alice';
  const root = cloneTree(config.tree || defaultLinuxTree());
  let cwd = config.cwd || home;
  /** @type {Record<string, string>} */
  const env = {
    HOME: home,
    USER: 'alice',
    PATH: '/usr/local/bin:/usr/bin:/bin',
    PWD: cwd,
    ...(config.env || {}),
  };

  const listNames = (dir, all = false) =>
    Object.keys(dir.children)
      .filter((n) => all || !dir.children[n].hidden)
      .sort((a, b) => a.localeCompare(b));

  const resolve = (path) => {
    const abs = normalizePath(cwd, home, path);
    return { node: getNode(root, abs), path: abs };
  };

  const ctx = {
    get cwd() {
      return cwd;
    },
    home,
    env,
    resolve,
    listNames,
  };

  const aliases = { ll: 'ls -la', ...(config.aliases || {}) };

  /** 简易 Git 工作区状态（仅沙箱教学） */
  const gitState = {
    branch: 'main',
    staged: /** @type {string[]} */ ([]),
    dirty: /** @type {string[]} */ (['README.md']),
    commits: 1,
  };

  const builtins = {
    help: {
      help: '列出可用命令',
      run() {
        return [
          '模拟终端 · 不会动你的真实系统',
          `常用：${Object.keys(builtins).sort().join(', ')}`,
          '试试：pwd · ls · ls -la · cd projects/XRK-AGT · cat package.json',
        ];
      },
    },
    clear: {
      help: '清屏',
      run: () => ({ __clear: true }),
    },
    pwd: {
      help: '打印当前目录',
      run: (c) => c.cwd,
    },
    whoami: {
      help: '当前用户',
      run: (c) => c.env.USER || 'alice',
    },
    echo: {
      help: '打印参数；支持 $HOME $PATH $PWD',
      run(c, args) {
        return args
          .map((a) =>
            a.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, k) => c.env[k] ?? '')
          )
          .join(' ');
      },
    },
    env: {
      help: '列出环境变量',
      run(c) {
        return Object.entries(c.env)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}=${v}`);
      },
    },
    export: {
      help: 'export NAME=value（会话级）',
      run(c, args) {
        if (!args.length) return builtins.env.run(c, []);
        for (const a of args) {
          const i = a.indexOf('=');
          if (i <= 0) return 'export: 用法 export NAME=value';
          c.env[a.slice(0, i)] = a.slice(i + 1);
        }
        return '';
      },
    },
    cd: {
      help: '进入目录；cd ~ / cd ..',
      run(c, args) {
        const target = args[0] ?? '~';
        if (target === '-') {
          const prev = c.env.OLDPWD || c.home;
          return builtins.cd.run(c, [prev]);
        }
        const { node, path } = c.resolve(target);
        if (!node) return `cd: ${target}: 没有那个文件或目录`;
        if (node.type !== 'dir') return `cd: ${target}: 不是目录`;
        c.env.OLDPWD = cwd;
        cwd = path;
        c.env.PWD = cwd;
        return '';
      },
    },
    ls: {
      help: '列出目录；-a/-la 含隐藏项',
      run(c, args) {
        const flags = new Set();
        const paths = [];
        for (const a of args) {
          if (a.startsWith('-') && a !== '-') {
            for (const ch of a.slice(1)) flags.add(ch);
          } else paths.push(a);
        }
        const all = flags.has('a') || flags.has('A') || flags.has('l');
        const long = flags.has('l');
        const target = paths[0] || '.';
        const { node, path } = c.resolve(target);
        if (!node) return `ls: 无法访问 '${target}': 没有那个文件或目录`;
        if (node.type === 'file') {
          const name = path.split('/').pop() || target;
          return long
            ? `-rw-r--r--  1 alice alice  ${node.content.length}  ${name}`
            : name;
        }
        const names = listNames(node, all);
        if (!long) return names.join('  ') || '';
        return names.map((n) => {
          const child = node.children[n];
          if (child.type === 'dir') return `drwxr-xr-x  2 alice alice  4096  ${n}`;
          return `-rw-r--r--  1 alice alice  ${String(child.content).length}  ${n}`;
        });
      },
    },
    cat: {
      help: '打印文件内容',
      run(c, args) {
        if (!args[0]) return 'cat: 缺少文件操作数';
        const { node } = c.resolve(args[0]);
        if (!node) return `cat: ${args[0]}: 没有那个文件或目录`;
        if (node.type !== 'file') return `cat: ${args[0]}: 是一个目录`;
        return node.content.replace(/\n$/, '') || '';
      },
    },
    tree: {
      help: '简易树状列出',
      run(c, args) {
        const target = args[0] || '.';
        const { node, path } = c.resolve(target);
        if (!node) return `tree: ${target}: 没有那个文件或目录`;
        const lines = [path];
        const walk = (n, prefix) => {
          if (n.type !== 'dir') return;
          const names = listNames(n, false);
          names.forEach((name, i) => {
            const last = i === names.length - 1;
            const child = n.children[name];
            lines.push(`${prefix}${last ? '└── ' : '├── '}${name}`);
            if (child.type === 'dir') {
              walk(child, `${prefix}${last ? '    ' : '│   '}`);
            }
          });
        };
        if (node.type === 'dir') walk(node, '');
        return lines;
      },
    },
    mkdir: {
      help: '创建目录（模拟）',
      run(c, args) {
        if (!args[0]) return 'mkdir: 缺少操作数';
        const abs = normalizePath(cwd, home, args[0]);
        const parts = splitPath(abs);
        const name = parts.pop();
        const parentPath = `/${parts.join('/')}` || '/';
        const parent = getNode(root, parentPath);
        if (!parent || parent.type !== 'dir') {
          return `mkdir: 无法创建目录 '${args[0]}'`;
        }
        if (parent.children[name]) {
          return `mkdir: 无法创建目录 '${args[0]}': 文件已存在`;
        }
        parent.children[name] = { type: 'dir', children: {} };
        return '';
      },
    },
    touch: {
      help: '创建空文件（模拟）',
      run(c, args) {
        if (!args[0]) return 'touch: 缺少文件操作数';
        const abs = normalizePath(cwd, home, args[0]);
        const parts = splitPath(abs);
        const name = parts.pop();
        const parentPath = `/${parts.join('/')}` || '/';
        const parent = getNode(root, parentPath);
        if (!parent || parent.type !== 'dir') {
          return `touch: 无法 touch '${args[0]}'`;
        }
        if (!parent.children[name]) {
          parent.children[name] = { type: 'file', content: '' };
        }
        return '';
      },
    },
    find: {
      help: '按名查找（简易）',
      run(c, args) {
        const start = args[0] && !args[0].startsWith('-') ? args[0] : '.';
        const nameIdx = args.indexOf('-name');
        const needle =
          nameIdx >= 0 ? args[nameIdx + 1]?.replace(/^['"]|['"]$/g, '') : null;
        const { node, path } = c.resolve(start);
        if (!node) return `find: '${start}': 没有那个文件或目录`;
        const hits = [];
        const walk = (n, p) => {
          const base = p === '/' ? '/' : p.split('/').pop();
          if (n.type === 'file') {
            if (
              !needle ||
              base === needle ||
              (needle.includes('*') && globMatch(base, needle))
            ) {
              hits.push(p);
            }
            return;
          }
          for (const [k, child] of Object.entries(n.children)) {
            if (child.hidden) continue;
            walk(child, `${p === '/' ? '' : p}/${k}`);
          }
        };
        walk(node, path);
        return hits.length ? hits : '(无匹配)';
      },
    },
    grep: {
      help: '在文件中搜关键字（简易）',
      run(c, args) {
        if (args.length < 2) return 'grep: 用法 grep 关键字 文件';
        const [pat, file] = args;
        const { node } = c.resolve(file);
        if (!node) return `grep: ${file}: 没有那个文件或目录`;
        if (node.type !== 'file') return `grep: ${file}: 是一个目录`;
        return (
          node.content
            .split('\n')
            .filter((l) => l.includes(pat))
            .join('\n') || ''
        );
      },
    },
    curl: {
      help: '模拟 HTTP 探测（-I 看头；普通 GET 看体）',
      run(_c, args) {
        const url = args.find((a) => !a.startsWith('-')) || '';
        if (!url) {
          return [
            '用法直觉：',
            '  curl -I https://example.com     # 只看响应头',
            '  curl -sS https://httpbin.org/get  # 看 JSON 体（模拟）',
            '# -s 安静 · -S 出错仍显示 · 本窗不上真网',
          ];
        }
        if (args.includes('-I') || args.includes('-i') || args.includes('-D')) {
          return [
            'HTTP/1.1 200 OK',
            'Content-Type: application/json',
            'x-sim: vibe-learn',
            `# 模拟响应头 · 目标 ${url}`,
            '# 状态行第一段数字=状态码（200=成功一类）',
          ];
        }
        if (/httpbin\.org\/get|\/api\/|application\/json/i.test(url) || args.includes('-s') || args.includes('-sS')) {
          return [
            '{',
            '  "success": true,',
            '  "message": "ok",',
            '  "url": "' + url + '",',
            '  "origin": "127.0.0.1"',
            '}',
            '# [模拟 JSON] 真机可对 httpbin.org 或本仓 API 再试',
          ];
        }
        return `<html>模拟页面 · ${url}</html>\n# 试加 -I 看头，或对 httpbin.org/get 看 JSON`;
      },
    },
    ping: {
      help: '模拟连通性',
      run(_c, args) {
        const host = args[0] || '127.0.0.1';
        return [
          `PING ${host} (127.0.0.1): 56 data bytes`,
          '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.4 ms',
          '# 模拟 · ping 通 ≠ 网站一定能开',
        ];
      },
    },
    which: {
      help: '查找命令路径（模拟）',
      run(_c, args) {
        if (!args[0]) return '';
        const known = {
          curl: '/usr/bin/curl',
          git: '/usr/bin/git',
          node: '/usr/bin/node',
          npm: '/usr/bin/npm',
          npx: '/usr/bin/npx',
          pnpm: '/usr/bin/pnpm',
          docker: '/usr/bin/docker',
          'redis-cli': '/usr/bin/redis-cli',
          corepack: '/usr/bin/corepack',
          ls: 'shell builtin',
          cd: 'shell builtin',
          pwd: 'shell builtin',
        };
        return known[args[0]] || `${args[0]} not found`;
      },
    },
    node: {
      help: '模拟 node -v；可跑极简 .js（只识别 console.log 字符串）',
      run(c, args) {
        if (!args.length || args[0] === '-v' || args[0] === '--version') {
          return args[0] ? 'v26.0.0' : 'Welcome to Node.js v26.0.0.\n# 试 node -v 或 node hello.js';
        }
        if (args[0] === '-e' && args[1]) {
          const m = String(args[1]).match(/console\.log\(\s*['"]([^'"]*)['"]\s*\)/);
          return m ? m[1] : '# 模拟 -e：本沙箱只演示 console.log("文字")';
        }
        const file = args[0];
        if (file && !file.startsWith('-')) {
          const { node } = c.resolve(file);
          if (!node) return `Error: Cannot find module '${file}'\n# 先 cd 到文件所在目录，或写对相对路径`;
          if (node.type !== 'file') return `Error: ${file} 不是文件`;
          const logs = [...String(node.content).matchAll(/console\.log\(\s*['"]([^'"]*)['"]\s*\)/g)].map(
            (m) => m[1]
          );
          if (logs.length) return logs;
          return [
            '# 已「假装」执行，但文件里没有可识别的 console.log("…")',
            '# 本沙箱不跑完整 JS；真机请用本机 node',
          ];
        }
        return '模拟 node：试 node -v · node hello.js · node -e "console.log(1+1)"（后者仅字符串演示）';
      },
    },
    npm: {
      help: '模拟 npm -v（本仓不用 npm 装依赖）',
      run(_c, args) {
        if (args[0] === '-v' || args[0] === '--version') return '10.9.0';
        return '模拟 npm：本仓请用 pnpm；试 npm -v';
      },
    },
    corepack: {
      help: '模拟 corepack enable / prepare',
      run(_c, args) {
        if (!args.length || args[0] === 'enable') {
          return '模拟 · Corepack enabled';
        }
        if (args[0] === 'prepare') {
          return '模拟 · Preparing pnpm@latest for activation...';
        }
        return '模拟 corepack：试 corepack enable';
      },
    },
    git: {
      help: '模拟 git：clone / status / 分支 / add / commit（教学状态机）',
      run(c, args) {
        if (!args.length || args[0] === '--help') {
          return [
            '用法（模拟）：',
            '  git --version · git clone <url>',
            '  git status · git diff · git add <文件> · git commit -m "说明"',
            '  git switch -c feat/demo · git branch',
            'clone 直连 github.com 常失败 → 设 HTTPS_PROXY 或 ghproxy 前缀',
          ];
        }
        if (args[0] === '--version') return 'git version 2.45.2';
        if (args[0] === 'clone') {
          return simulateGitClone(c, args.slice(1), root, () => cwd, (p) => {
            cwd = p;
            c.env.PWD = p;
          });
        }
        if (args[0] === 'remote' && args[1] === '-v') {
          return 'origin  https://github.com/sunflowermm/XRK-AGT.git (fetch)\norigin  https://github.com/sunflowermm/XRK-AGT.git (push)';
        }
        if (args[0] === 'status') {
          const lines = [`On branch ${gitState.branch}`];
          if (gitState.staged.length) {
            lines.push('Changes to be committed:');
            gitState.staged.forEach((f) => lines.push(`\tmodified:   ${f}`));
          }
          if (gitState.dirty.length) {
            lines.push('Changes not staged for commit:');
            gitState.dirty.forEach((f) => lines.push(`\tmodified:   ${f}`));
          }
          if (!gitState.staged.length && !gitState.dirty.length) {
            lines.push('nothing to commit, working tree clean');
          }
          lines.push('# [模拟] 真机 git status 才看你仓库真实状态');
          return lines;
        }
        if (args[0] === 'diff') {
          if (!gitState.dirty.length && !gitState.staged.length) {
            return '# [模拟] 无差异';
          }
          const file = gitState.dirty[0] || gitState.staged[0];
          return [
            `diff --git a/${file} b/${file}`,
            '--- a/' + file,
            '+++ b/' + file,
            '@@ -1 +1 @@',
            '-旧行（模拟）',
            '+新行（模拟）',
            '# 真机 diff 显示你改过的每一行',
          ];
        }
        if (args[0] === 'add') {
          const target = args[1];
          if (!target) return 'Nothing specified, nothing added.\n# 试：git add README.md  或  git add .';
          const take =
            target === '.' || target === '-A'
              ? [...gitState.dirty]
              : gitState.dirty.filter((f) => f === target || target.endsWith(f));
          if (!take.length && target !== '.' && target !== '-A') {
            gitState.staged.push(target);
          } else {
            take.forEach((f) => {
              if (!gitState.staged.includes(f)) gitState.staged.push(f);
            });
            gitState.dirty = gitState.dirty.filter((f) => !gitState.staged.includes(f));
          }
          return `# [模拟] 已暂存：${gitState.staged.join(', ') || '(空)'} → 再 git status`;
        }
        if (args[0] === 'commit') {
          const mi = args.indexOf('-m');
          const msg = mi >= 0 ? args[mi + 1] : '';
          if (!gitState.staged.length) {
            return 'On branch ' + gitState.branch + '\nnothing to commit, working tree clean\n# 先 git add';
          }
          if (!msg) return 'error: 请用 git commit -m "说明为什么改"';
          gitState.commits += 1;
          gitState.staged = [];
          return [
            `[${gitState.branch} ${String(gitState.commits).padStart(7, '0')}] ${msg}`,
            '# [模拟] 提交成功；推远程真机再 git push',
          ];
        }
        if (args[0] === 'branch') {
          if (gitState.branch === 'main') return '* main';
          return [`* ${gitState.branch}`, '  main'];
        }
        if (args[0] === 'switch' || args[0] === 'checkout') {
          const create = args.includes('-c') || args.includes('-b');
          const name = args.find((a, i) => {
            if (a.startsWith('-')) return false;
            if (i === 0) return false;
            return true;
          });
          if (!name) return 'fatal: 缺少分支名\n# 试：git switch -c feat/demo';
          gitState.branch = name;
          return create
            ? `Switched to a new branch '${name}'\n# [模拟] 实验改动与 main 隔离`
            : `Switched to branch '${name}'`;
        }
        if (args[0] === 'pull' || args[0] === 'push' || args[0] === 'merge') {
          return [
            `# [模拟] git ${args[0]} 需要真远程；本窗不联网`,
            '先在本机仓库练 status / add / commit / switch',
          ];
        }
        return [
          `git ${args[0]}：可试 status · add · commit · switch -c · clone`,
          '网络类重点：git clone（配合代理课）',
        ];
      },
    },
    pnpm: {
      help: '模拟 pnpm -v / install',
      run(c, args) {
        if (!args.length || args[0] === '-v' || args[0] === '--version') {
          return '10.12.0';
        }
        if (args[0] === 'install' || args[0] === 'i') {
          const pkg = c.resolve('package.json').node;
          if (!pkg || pkg.type !== 'file') {
            return [
              'ERR_PNPM_NO_PKG  No package.json found in current directory',
              '# [模拟] 请先 cd 到仓库根（含 package.json）',
            ];
          }
          return [
            'Lockfile is up to date, resolution step is skipped',
            'Packages: +128',
            'Progress: resolved 128, reused 128, downloaded 0, added 128, done',
            'Done in 1.2s',
            '# [模拟 · 假数据] 真实电脑请在本机仓库根执行 pnpm install',
          ];
        }
        return '模拟 pnpm：试 pnpm -v · pnpm install（需在含 package.json 的目录）';
      },
    },
    docker: {
      help: '模拟 docker ps / images / run / compose',
      run(_c, args) {
        if (!args.length || args[0] === '--help') {
          return [
            '用法（模拟）：docker ps · docker images · docker run · docker compose ps',
            '# 全程假数据，不会起真实容器',
          ];
        }
        if (args[0] === 'ps') {
          const all = args.includes('-a');
          return [
            'CONTAINER ID   IMAGE     COMMAND                  CREATED        STATUS         PORTS                    NAMES',
            'a1b2c3d4e5f6   redis:7   "docker-entrypoint.s…"   2 hours ago    Up 2 hours     0.0.0.0:6379->6379/tcp   xrk-redis',
            all
              ? 'f6e5d4c3b2a1   nginx:alpine   "/docker-entrypoint.…"   1 day ago       Exited (0) 5 hours ago             demo-nginx'
              : '',
            '# [模拟] 本机 docker ps 才看真实容器',
          ].filter(Boolean);
        }
        if (args[0] === 'images') {
          return [
            'REPOSITORY   TAG       IMAGE ID       CREATED       SIZE',
            'redis        7         9c2b9c0aabb1   2 weeks ago   117MB',
            'nginx        alpine    7d1c3e2ff001   3 weeks ago   43.4MB',
            '# [模拟]',
          ];
        }
        if (args[0] === 'run') {
          return [
            '模拟 · 假装已启动容器（不会真正占用端口）',
            '用法直觉：docker run -d --name xrk-redis -p 6379:6379 redis:7',
            '# 真实请在本机执行；本窗不上网、不起 daemon',
          ];
        }
        if (args[0] === 'compose') {
          const sub = args[1] || 'ps';
          if (sub === 'up') {
            return [
              '[+] Running 2/2',
              ' ✔ Container xrk-redis  Started',
              ' ✔ Container xrk-app    Started',
              '# [模拟] docker compose up -d · 不会真正创建容器',
            ];
          }
          return [
            'NAME        IMAGE     STATUS         PORTS',
            'xrk-redis   redis:7   Up 2 hours     0.0.0.0:6379->6379/tcp',
            '# [模拟] docker compose ps',
          ];
        }
        if (args[0] === 'logs') {
          return '1:M 01 Jan 12:00:00.000 * Ready to accept connections\n# [模拟] docker logs <name>';
        }
        return `docker ${args[0]}：试 docker ps · docker images · docker compose ps`;
      },
    },
    'redis-cli': {
      help: '模拟 redis-cli ping / GET',
      run(_c, args) {
        if (!args.length || args[0] === 'ping' || args[0].toUpperCase() === 'PING') {
          return 'PONG';
        }
        const op = args[0].toUpperCase();
        if (op === 'GET') {
          return args[1] ? '(nil)' : '(error) ERR wrong number of arguments';
        }
        if (op === 'SET') {
          return 'OK';
        }
        if (op === 'INFO' || args[0] === 'info') {
          return '# Server\nredis_version:7.2.0\n# [模拟]';
        }
        return [
          '模拟 redis-cli：试 ping · GET key · SET key value',
          '# 需本机 redis-server 才有真数据；本窗假回复',
        ];
      },
    },
  };

  if (config.extra) {
    for (const [k, v] of Object.entries(config.extra)) {
      if (builtins[k]) continue; /* 勿覆盖内建 git/ls 等 */
      builtins[k] = {
        help: k,
        run: () => String(v),
      };
    }
  }

  function expandLine(line) {
    const t = line.trim();
    const first = t.split(/\s+/)[0];
    if (aliases[first]) return `${aliases[first]}${t.slice(first.length)}`;
    return t;
  }

  function exec(rawLine) {
    const expanded = expandLine(rawLine);
    if (!expanded) return { lines: [], cwd };
    const { name, args } = parseCommandLine(expanded);
    const cmd = builtins[name];
    if (!cmd) {
      return {
        lines: [`${name}: 命令未找到`, '输入 help 查看本课可用命令'],
        cwd,
      };
    }
    const result = cmd.run(ctx, args);
    if (result && typeof result === 'object' && result.__clear) {
      return { clear: true, lines: [], cwd };
    }
    if (Array.isArray(result)) {
      return { lines: result.map(String), cwd };
    }
    const text = result == null ? '' : String(result);
    return { lines: text === '' ? [] : text.split('\n'), cwd };
  }

  return {
    get cwd() {
      return cwd;
    },
    get prompt() {
      const short =
        cwd === home
          ? '~'
          : cwd.startsWith(`${home}/`)
            ? `~${cwd.slice(home.length)}`
            : cwd;
      return `${config.promptPrefix || 'alice@learn'}:${short}$ `;
    },
    title: config.title || '模拟终端',
    badge: config.badge || '模拟 · 不上网 · 假数据',
    environment: config.environment || 'Linux · bash（模拟）',
    welcome: config.welcome || [
      '【模拟】所有输出都是假的，不会访问网络、不会改你电脑',
      '建议：pwd → ls → ls -la → cd projects/XRK-AGT → cat package.json',
      '随时 help · clear 清屏 · ↑↓ 翻历史',
    ],
    hintCommands: config.hintCommands || [
      'help',
      'pwd',
      'ls',
      'ls -la',
      'cd ~',
      'cd projects/XRK-AGT',
      'cat package.json',
      'tree',
      'echo $HOME',
    ],
    /** @type {string[]} 挂载后自动打字并执行 */
    autoPlay: Array.isArray(config.autoPlay) ? config.autoPlay.map(String) : [],
    autoPlayDelay: Number(config.autoPlayDelay) > 0 ? Number(config.autoPlayDelay) : 160,
    exec,
  };
}

/**
 * @param {string} text
 * @param {Record<string, ShellConfig>} [presets]
 * @returns {ShellConfig}
 */
export function parseShellSource(text, presets = {}) {
  const raw = String(text ?? '').trim();
  if (!raw) return { ...(presets['linux-cli'] || {}) };
  if (raw.startsWith('{')) {
    try {
      const j = JSON.parse(raw);
      if (j.preset && presets[j.preset]) {
        const base = presets[j.preset];
        return {
          ...base,
          ...j,
          tree: j.tree || base.tree,
          welcome: j.welcome || base.welcome,
          hintCommands: j.hintCommands || base.hintCommands,
          env: { ...(base.env || {}), ...(j.env || {}) },
        };
      }
      return j;
    } catch {
      return {
        welcome: ['配置 JSON 无效，已回退默认沙箱'],
        ...(presets['linux-cli'] || {}),
      };
    }
  }
  if (presets[raw]) return presets[raw];
  return presets['linux-cli'] || {};
}

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
                        content: '# XRK-AGT\n',
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
    return 'fatal: You must specify a repository to clone.';
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

  /* 未设代理直连 GitHub：只回真实形态报错（对策写在课文/welcome，不进 stdout） */
  if (hitsGithub && !viaGhProxy && !hasProxy) {
    return [
      `Cloning into '${repoName}'...`,
      `fatal: unable to access '${url}': Failed to connect to github.com port 443 after 21005 ms: Couldn't connect to server`,
    ];
  }

  /* 成功路径：代理会话 或 ghproxy URL —— stdout 贴近真 git */
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
          content: '# XRK-AGT\n',
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

  return [
    `Cloning into '${repoName}'...`,
    'remote: Enumerating objects: 128, done.',
    'remote: Counting objects: 100% (128/128), done.',
    'remote: Compressing objects: 100% (80/80), done.',
    'remote: Total 128 (delta 42), reused 128 (delta 42), pack-reused 0 (from 0)',
    'Receiving objects: 100% (128/128), 1.02 MiB | 2.50 MiB/s, done.',
    'Resolving deltas: 100% (42/42), done.',
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
          return 'curl: try \'curl --help\' or \'curl --manual\' for more information';
        }
        if (args.includes('-I') || args.includes('-i') || args.includes('-D')) {
          return [
            'HTTP/1.1 200 OK',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Length: 1256',
            'Connection: keep-alive',
          ];
        }
        if (/httpbin\.org\/get|\/api\/|application\/json/i.test(url) || args.includes('-s') || args.includes('-sS')) {
          return [
            '{',
            '  "args": {},',
            '  "headers": {',
            '    "Host": "httpbin.org",',
            '    "User-Agent": "curl/8.7.1"',
            '  },',
            `  "url": "${url}"`,
            '}',
          ];
        }
        return [
          '<!DOCTYPE html>',
          '<html>',
          '<head><title>Example Domain</title></head>',
          '<body>',
          '<h1>Example Domain</h1>',
          '</body>',
          '</html>',
        ];
      },
    },
    ping: {
      help: '模拟连通性',
      run(_c, args) {
        const host = args[0] || '127.0.0.1';
        return [
          `PING ${host} (${host === '127.0.0.1' ? '127.0.0.1' : '93.184.216.34'}): 56 data bytes`,
          `64 bytes from ${host === '127.0.0.1' ? '127.0.0.1' : '93.184.216.34'}: icmp_seq=0 ttl=64 time=0.412 ms`,
          `64 bytes from ${host === '127.0.0.1' ? '127.0.0.1' : '93.184.216.34'}: icmp_seq=1 ttl=64 time=0.389 ms`,
          '',
          `--- ${host} ping statistics ---`,
          '2 packets transmitted, 2 packets received, 0.0% packet loss',
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
          return args[0] ? 'v26.0.0' : 'Welcome to Node.js v26.0.0.\nType ".help" for more information.';
        }
        if (args[0] === '-e' && args[1]) {
          const m = String(args[1]).match(/console\.log\(\s*['"]([^'"]*)['"]\s*\)/);
          return m ? m[1] : '';
        }
        const file = args[0];
        if (file && !file.startsWith('-')) {
          const { node } = c.resolve(file);
          if (!node) return `Error: Cannot find module '${file}'`;
          if (node.type !== 'file') return `Error: ${file} is a directory`;
          const logs = [...String(node.content).matchAll(/console\.log\(\s*['"]([^'"]*)['"]\s*\)/g)].map(
            (m) => m[1]
          );
          if (logs.length) return logs;
          return '';
        }
        return 'Welcome to Node.js v26.0.0.\nType ".help" for more information.';
      },
    },
    npm: {
      help: '模拟 npm -v（本仓不用 npm 装依赖）',
      run(_c, args) {
        if (args[0] === '-v' || args[0] === '--version') return '10.9.0';
        return 'npm <command>\n\nUsage:\n\nnpm install';
      },
    },
    corepack: {
      help: '模拟 corepack enable / prepare',
      run(_c, args) {
        if (!args.length || args[0] === 'enable') {
          return '';
        }
        if (args[0] === 'prepare') {
          return 'Preparing pnpm@latest for immediate activation...';
        }
        return 'Usage: corepack <command>';
      },
    },
    git: {
      help: '模拟 git：clone / status / 分支 / add / commit',
      run(c, args) {
        if (!args.length || args[0] === '--help') {
          return 'usage: git [-v | --version] [-h | --help] [-C <path>] <command> [<args>]';
        }
        if (args[0] === '--version') return 'git version 2.45.2';
        if (args[0] === 'clone') {
          return simulateGitClone(c, args.slice(1), root, () => cwd, (p) => {
            cwd = p;
            c.env.PWD = p;
          });
        }
        if (args[0] === 'remote' && args[1] === '-v') {
          return 'origin\thttps://github.com/sunflowermm/XRK-AGT.git (fetch)\norigin\thttps://github.com/sunflowermm/XRK-AGT.git (push)';
        }
        if (args[0] === 'status') {
          const lines = [`On branch ${gitState.branch}`];
          if (gitState.staged.length) {
            lines.push('Changes to be committed:');
            lines.push('  (use "git restore --staged <file>..." to unstage)');
            gitState.staged.forEach((f) => lines.push(`\tmodified:   ${f}`));
          }
          if (gitState.dirty.length) {
            lines.push('Changes not staged for commit:');
            lines.push('  (use "git add <file>..." to update what will be committed)');
            gitState.dirty.forEach((f) => lines.push(`\tmodified:   ${f}`));
          }
          if (!gitState.staged.length && !gitState.dirty.length) {
            lines.push('nothing to commit, working tree clean');
          }
          return lines;
        }
        if (args[0] === 'diff') {
          if (!gitState.dirty.length && !gitState.staged.length) {
            return '';
          }
          const file = gitState.dirty[0] || gitState.staged[0];
          return [
            `diff --git a/${file} b/${file}`,
            `index 1111111..2222222 100644`,
            `--- a/${file}`,
            `+++ b/${file}`,
            '@@ -1 +1 @@',
            '-old line',
            '+new line',
          ];
        }
        if (args[0] === 'add') {
          const target = args[1];
          if (!target) return 'Nothing specified, nothing added.\nMaybe you wanted to say \'git add .\'?';
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
          return '';
        }
        if (args[0] === 'commit') {
          const mi = args.indexOf('-m');
          const msg = mi >= 0 ? args[mi + 1] : '';
          if (!gitState.staged.length) {
            return `On branch ${gitState.branch}\nnothing to commit, working tree clean`;
          }
          if (!msg) {
            return 'error: switch `m\' requires a value';
          }
          gitState.commits += 1;
          const n = gitState.staged.length;
          gitState.staged = [];
          const short = String(gitState.commits).padStart(7, '0');
          return [`[${gitState.branch} ${short}] ${msg}`, ` ${n} file${n === 1 ? '' : 's'} changed`];
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
          if (!name) return 'fatal: missing branch name';
          gitState.branch = name;
          return create ? `Switched to a new branch '${name}'` : `Switched to branch '${name}'`;
        }
        if (args[0] === 'pull' || args[0] === 'push' || args[0] === 'merge') {
          return `fatal: unable to access 'https://github.com/sunflowermm/XRK-AGT.git/': Could not resolve host: github.com`;
        }
        return `git: '${args[0]}' is not a git command. See 'git --help'.`;
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
            return 'ERR_PNPM_NO_PKG  No package.json found in /home/alice';
          }
          return [
            'Lockfile is up to date, resolution step is skipped',
            'Already up to date',
            '',
            'Done in 1.2s using pnpm v10.12.0',
          ];
        }
        if (args[0] === 'test') {
          return [
            '',
            ' ✓ src/utils/http-utils.test.js (3)',
            ' ✓ src/utils/normalize-error.test.js (2)',
            '',
            ' Test Files  2 passed (2)',
            '      Tests  5 passed (5)',
          ];
        }
        if (args[0] === 'run' && args[1] === 'build') {
          return [
            '> xrk-agt@0.0.0 build',
            '> vite build',
            '',
            '✓ built in 1.84s',
          ];
        }
        return ` ERR_PNPM_UNKNOWN_COMMAND  Unknown command '${args[0]}'`;
      },
    },
    docker: {
      help: '模拟 docker ps / images / run / compose',
      run(_c, args) {
        if (!args.length || args[0] === '--help') {
          return 'Usage:  docker [OPTIONS] COMMAND\n\nA self-sufficient runtime for containers';
        }
        if (args[0] === 'ps') {
          const all = args.includes('-a');
          return [
            'CONTAINER ID   IMAGE     COMMAND                  CREATED        STATUS         PORTS                    NAMES',
            'a1b2c3d4e5f6   redis:7   "docker-entrypoint.s…"   2 hours ago    Up 2 hours     0.0.0.0:6379->6379/tcp   xrk-redis',
            all
              ? 'f6e5d4c3b2a1   nginx:alpine   "/docker-entrypoint.…"   1 day ago       Exited (0) 5 hours ago             demo-nginx'
              : '',
          ].filter(Boolean);
        }
        if (args[0] === 'images') {
          return [
            'REPOSITORY   TAG       IMAGE ID       CREATED       SIZE',
            'redis        7         9c2b9c0aabb1   2 weeks ago   117MB',
            'nginx        alpine    7d1c3e2ff001   3 weeks ago   43.4MB',
          ];
        }
        if (args[0] === 'run') {
          return 'a1b2c3d4e5f6789012345678abcdef0123456789';
        }
        if (args[0] === 'compose') {
          const sub = args[1] || 'ps';
          if (sub === 'up') {
            return [
              '[+] Running 2/2',
              ' ✔ Container xrk-redis  Started',
              ' ✔ Container xrk-app    Started',
            ];
          }
          return [
            'NAME        IMAGE     COMMAND                  SERVICE   CREATED       STATUS       PORTS',
            'xrk-redis   redis:7   "docker-entrypoint.s…"   redis     2 hours ago   Up 2 hours   0.0.0.0:6379->6379/tcp',
          ];
        }
        if (args[0] === 'logs') {
          return '1:M 01 Jan 12:00:00.000 * Ready to accept connections';
        }
        if (args[0] === 'volume' && (args[1] === 'ls' || !args[1])) {
          return ['DRIVER    VOLUME NAME', 'local     xrk-redis-data', 'local     xrk-uploads'];
        }
        return `docker: '${args[0]}' is not a docker command.\nSee 'docker --help'`;
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
          return args[1] ? '(nil)' : '(error) ERR wrong number of arguments for \'get\' command';
        }
        if (op === 'SET') {
          return 'OK';
        }
        if (op === 'INFO' || args[0] === 'info') {
          return '# Server\nredis_version:7.2.0\nredis_mode:standalone\n';
        }
        return `(error) ERR unknown command '${args[0]}'`;
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
        lines: [`bash: ${name}: command not found`],
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

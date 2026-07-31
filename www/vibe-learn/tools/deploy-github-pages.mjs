/**
 * 把 dist 推到 sunflowermm/vibe-learn 的 gh-pages（GitHub Pages）。
 * 用法：pnpm build && node tools/deploy-github-pages.mjs
 * 或：pnpm deploy:pages
 * 需：gh 已登录；境外网络走本机代理。
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
const STAGE = join(ROOT, '.pages-stage');
const REPO = process.env.VIBE_LEARN_PAGES_REPO || 'sunflowermm/vibe-learn';
const BRANCH = 'gh-pages';

function sh(cmd, args, opts = {}) {
  execFileSync(cmd, args, { stdio: 'inherit', ...opts });
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('缺少 dist/index.html，先跑 pnpm build');
  process.exit(1);
}

rmSync(STAGE, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });
cpSync(DIST, STAGE, { recursive: true });
writeFileSync(join(STAGE, '.nojekyll'), '');

const env = {
  ...process.env,
  HTTP_PROXY: process.env.HTTP_PROXY || 'http://127.0.0.1:7890',
  HTTPS_PROXY: process.env.HTTPS_PROXY || 'http://127.0.0.1:7890',
  ALL_PROXY: process.env.ALL_PROXY || 'http://127.0.0.1:7890',
  NO_PROXY: process.env.NO_PROXY || '127.0.0.1,localhost,::1',
};

try {
  sh('gh', ['repo', 'view', REPO], { env, stdio: 'pipe' });
} catch {
  console.log(`创建仓库 ${REPO} …`);
  sh(
    'gh',
    [
      'repo',
      'create',
      REPO,
      '--public',
      '--description',
      'Vibe Learn — 知识节点图谱（GitHub Pages 静态站）',
      '--disable-issues',
      '--disable-wiki',
    ],
    { env }
  );
}

sh('git', ['init', '-b', BRANCH], { cwd: STAGE, env });
sh('git', ['-C', STAGE, 'config', 'user.name', 'vibe-learn-pages'], { env });
sh('git', ['-C', STAGE, 'config', 'user.email', 'pages@users.noreply.github.com'], {
  env,
});
sh('git', ['add', '-A'], { cwd: STAGE, env });
sh('git', ['commit', '-m', 'deploy: vibe-learn static'], { cwd: STAGE, env });
sh(
  'git',
  ['remote', 'add', 'origin', `https://github.com/${REPO}.git`],
  { cwd: STAGE, env }
);

// HTTPS push：走 gh 凭据
sh('gh', ['auth', 'setup-git'], { env, stdio: 'pipe' });
sh('git', ['push', '-f', 'origin', `HEAD:${BRANCH}`], { cwd: STAGE, env });

let pagesOk = false;
try {
  sh('gh', ['api', `repos/${REPO}/pages`], { env, stdio: 'pipe' });
  pagesOk = true;
} catch {
  pagesOk = false;
}

if (pagesOk) {
  console.log('Pages 已存在');
} else {
  console.log('启用 GitHub Pages …');
  sh(
    'gh',
    [
      'api',
      '--method',
      'POST',
      `repos/${REPO}/pages`,
      '-f',
      'build_type=legacy',
      '-f',
      'source[branch]=gh-pages',
      '-f',
      'source[path]=/',
    ],
    { env }
  );
}

rmSync(STAGE, { recursive: true, force: true });
console.log(`\n站点：https://sunflowermm.github.io/vibe-learn/`);
console.log(`仓库：https://github.com/${REPO}`);

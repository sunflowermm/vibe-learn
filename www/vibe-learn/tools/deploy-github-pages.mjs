/**
 * 把静态产物推到本仓（vibe-learn）的 gh-pages，供 GitHub Pages。
 * 用法：pnpm deploy:pages
 * 需：本机 git remote 指向 GitHub；gh 已登录；境外网络必要时设代理。
 *
 * 使用独立 outDir，不覆盖主服挂载的 dist（base 仍为 /vibe-learn/）。
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const CORE = resolve(ROOT, '../..');
const OUT = join(ROOT, '.pages-dist');
const STAGE = join(ROOT, '.pages-stage');
const BRANCH = 'gh-pages';
const PAGES_BASE = '/vibe-learn/';

function sh(cmd, args, opts = {}) {
  execFileSync(cmd, args, { stdio: 'inherit', ...opts });
}

function shOut(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: 'utf8', ...opts }).trim();
}

function parseGithubRepo(remoteUrl) {
  const m = remoteUrl.match(/github\.com[:/]([^/]+\/[^/.]+)(?:\.git)?$/i);
  if (!m) throw new Error(`无法从 remote 解析 GitHub 仓：${remoteUrl}`);
  return m[1];
}

const env = { ...process.env };
if (process.env.VIBE_LEARN_USE_PROXY === '1' || process.env.HTTP_PROXY || process.env.HTTPS_PROXY) {
  env.HTTP_PROXY = process.env.HTTP_PROXY || 'http://127.0.0.1:7890';
  env.HTTPS_PROXY = process.env.HTTPS_PROXY || env.HTTP_PROXY;
  env.ALL_PROXY = process.env.ALL_PROXY || env.HTTP_PROXY;
  env.NO_PROXY = process.env.NO_PROXY || '127.0.0.1,localhost,::1';
}

const remoteUrl = shOut('git', ['-C', CORE, 'remote', 'get-url', 'origin'], { env });
const REPO = parseGithubRepo(remoteUrl);
const siteUrl = `https://${REPO.split('/')[0]}.github.io${PAGES_BASE}`;

console.log(`Pages 目标：${REPO}#${BRANCH}（base ${PAGES_BASE}）`);
rmSync(OUT, { recursive: true, force: true });
const viteJs = join(ROOT, 'node_modules/vite/bin/vite.js');
if (!existsSync(viteJs)) {
  console.error('缺少 vite，先在 www/vibe-learn 执行 pnpm install');
  process.exit(1);
}
sh(
  process.execPath,
  [viteJs, 'build', '--base', PAGES_BASE, '--outDir', OUT, '--emptyOutDir'],
  { cwd: ROOT, env }
);

if (!existsSync(join(OUT, 'index.html'))) {
  console.error(`缺少 ${OUT}/index.html`);
  process.exit(1);
}

rmSync(STAGE, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });
cpSync(OUT, STAGE, { recursive: true });
writeFileSync(join(STAGE, '.nojekyll'), '');

sh('git', ['init', '-b', BRANCH], { cwd: STAGE, env });
sh('git', ['-C', STAGE, 'config', 'user.name', 'vibe-learn-pages'], { env });
sh('git', ['-C', STAGE, 'config', 'user.email', 'pages@users.noreply.github.com'], { env });
sh('git', ['add', '-A'], { cwd: STAGE, env });
sh('git', ['commit', '-m', 'deploy: vibe-learn static'], { cwd: STAGE, env });
sh('git', ['remote', 'add', 'origin', remoteUrl], { cwd: STAGE, env });
sh('git', ['push', '-f', 'origin', `HEAD:${BRANCH}`], { cwd: STAGE, env });

try {
  sh('gh', ['api', `repos/${REPO}/pages`], { env, stdio: 'pipe' });
  console.log('Pages 已存在');
} catch {
  console.log('启用 GitHub Pages …');
  try {
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
      { env, stdio: 'pipe' }
    );
  } catch (e) {
    const msg = String(e?.stderr || e?.message || e);
    if (!/already enabled|HTTP 409/i.test(msg)) {
      console.warn('启用 Pages 失败（分支已推送，可在仓库 Settings → Pages 手动开）：', msg);
    } else {
      console.log('Pages 已存在');
    }
  }
}

rmSync(STAGE, { recursive: true, force: true });
rmSync(OUT, { recursive: true, force: true });
console.log(`\n站点：${siteUrl}`);
console.log(`仓库：https://github.com/${REPO}`);

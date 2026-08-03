/**
 * 从公开大纲源拉取「大厂常考主题」清单（只主题，不搬原题）。
 * 商业题库（牛客/力扣付费等）不爬；落地题仍写在 sets/interview-*.js。
 *
 * 用法：pnpm run quiz:outlines
 * 代理：HTTP_PROXY=http://127.0.0.1:7890
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/data/quiz/outlines');

/** @type {{ id: string, url: string, domainHints: string[] }[]} */
const SOURCES = [
  {
    id: 'mdn-js-guide',
    url: 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/javascript/guide/index.md',
    domainHints: ['lang'],
  },
  {
    id: 'node-best-practices-readme',
    url: 'https://raw.githubusercontent.com/goldbergyoni/nodebestpractices/master/README.md',
    domainHints: ['lang', 'ops', 'craft'],
  },
];

function extractHeadings(md) {
  return String(md || '')
    .split(/\r?\n/)
    .map((l) => l.match(/^#{1,3}\s+(.+)$/)?.[1]?.trim())
    .filter(Boolean)
    .map((t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*_]/g, ''))
    .filter((t) => t.length >= 3 && t.length <= 80)
    .slice(0, 80);
}

async function fetchText(url) {
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY;
  const opts = { signal: AbortSignal.timeout(20000) };
  if (proxy) {
    try {
      const { ProxyAgent, fetch: undiciFetch } = await import('undici');
      opts.dispatcher = new ProxyAgent(proxy);
      const res = await undiciFetch(url, opts);
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return await res.text();
    } catch (e) {
      if (String(e?.message || e).includes('Cannot find package')) {
        /* fall through to global fetch */
      } else {
        throw e;
      }
    }
  }
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return await res.text();
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const index = [];
  for (const src of SOURCES) {
    try {
      const md = await fetchText(src.url);
      const headings = extractHeadings(md);
      const file = path.join(outDir, `${src.id}.json`);
      const payload = {
        id: src.id,
        url: src.url,
        domainHints: src.domainHints,
        fetchedAt: new Date().toISOString(),
        headings,
        note: '仅主题大纲；出题请原创写入 sets/，勿整段粘贴外部题面',
      };
      fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
      index.push({ id: src.id, headings: headings.length, ok: true });
      console.log(`ok ${src.id} · ${headings.length} headings → ${file}`);
    } catch (e) {
      index.push({ id: src.id, ok: false, error: String(e?.message || e) });
      console.warn(`fail ${src.id}:`, e?.message || e);
    }
  }
  fs.writeFileSync(
    path.join(outDir, 'index.json'),
    `${JSON.stringify({ updatedAt: new Date().toISOString(), sources: index }, null, 2)}\n`,
    'utf8'
  );
  if (!index.some((x) => x.ok)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

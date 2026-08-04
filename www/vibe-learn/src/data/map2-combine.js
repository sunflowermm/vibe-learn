/**
 * 导图1 面板：在保留原文前提下合入导图2（VibeHub）对照正文
 */
import { bridgesForKnowledge } from './map-bridges.js';
import {
  VIBE_HUB_ID,
  VIBEHUB_BODIES,
  VIBEHUB_MACRO_FRAMES,
  VIBEHUB_TERM_CARDS,
  getVibeEntryById,
} from './vibehub/graph-pack.js';

const MARK = '<!-- map2-combine -->';
const MAX_TERM_CHARS = 5200;
const MAX_TERMS = 2;

/**
 * @param {string} md
 * @param {number} max
 */
function trimBody(md, max) {
  const s = String(md || '').trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max).trimEnd()}\n\n…（全文见知识导图2 对应词条）\n`;
}

/**
 * 去掉导图2 正文里重复的顶层 H1（避免面板双标题打架）
 * @param {string} md
 * @param {string} label
 */
function normalizeTermMarkdown(md, label) {
  let s = String(md || '').trim();
  // 去掉首行 # title
  s = s.replace(/^#\s+[^\n]+\n+/, '');
  // 来源行保留为引用强度弱一点
  if (!s.startsWith('>')) {
    s = `> 导图2 · ${label}\n\n${s}`;
  }
  return s;
}

/**
 * @param {{ id: string, label: string }[]} links
 * @param {string} baseMd
 */
function buildCombineAppendix(links, baseMd = '') {
  if (!links?.length) return '';

  const termLinks = links.filter((l) => VIBEHUB_TERM_CARDS.some((c) => c.id === l.id));
  const frameLinks = links.filter((l) => VIBEHUB_MACRO_FRAMES.some((f) => f.id === l.id));
  const hubLink = links.find((l) => l.id === VIBE_HUB_ID);

  const chipLine = links.map((l) => `\`${l.label}\``).join(' · ');

  /** @type {string[]} */
  const parts = [
    MARK,
    '',
    '## 导图2 · 词条结合',
    '',
    '> 以下内容来自 **知识导图2**（VibeHub 词表），与本课**对照阅读**。上方本站路径 / 五拍 / 本仓约定**仍然有效**，不被词表替代。',
    '',
    `**跨导图入口**：${chipLine}`,
    '',
  ];

  if (hubLink) {
    parts.push(
      '可先打开导图2 左侧枢纽，按七大区浏览全量名词；本课相关词条正文见下。',
      ''
    );
  }

  if (frameLinks.length) {
    parts.push('### 相关大区', '');
    for (const fl of frameLinks) {
      const entry = getVibeEntryById(fl.id);
      const sub = entry?.subtitle || '';
      parts.push(`- **${fl.label}**${sub ? ` — ${sub}` : ''}（点面板「跨导图」进入）`);
    }
    parts.push('');
  }

  const toEmbed = termLinks
    .filter((tl) => {
      if (baseMd.includes(tl.id)) return false;
      if (baseMd.includes(`### ${tl.label}`)) return false;
      return true;
    })
    .slice(0, MAX_TERMS);
  for (const tl of toEmbed) {
    const raw = VIBEHUB_BODIES[tl.id];
    if (!raw) continue;
    parts.push(`### ${tl.label}`, '');
    parts.push(trimBody(normalizeTermMarkdown(raw, tl.label), MAX_TERM_CHARS));
    parts.push('');
  }

  const rest = termLinks.slice(toEmbed.length);
  if (rest.length) {
    parts.push('### 更多对照词条', '');
    parts.push(rest.map((l) => `- ${l.label}（\`${l.id}\`）`).join('\n'));
    parts.push('');
  }

  parts.push(
    '---',
    '',
    '*署名与原文整理自 [VibeHub](https://vibe-hub.org)；本站可学。*'
  );

  return parts.join('\n');
}

/**
 * @param {object | null} node  getNodeById 结果
 * @returns {object | null}
 */
export function combineKnowledgeWithMap2(node) {
  if (!node) return null;
  const mapLinks = bridgesForKnowledge(node.id);
  if (!mapLinks.length) {
    return { ...node, mapLinks: [] };
  }

  const baseMd = String(node.markdown || '');
  if (!baseMd.trim()) {
    return { ...node, mapLinks };
  }
  if (baseMd.includes(MARK)) {
    return { ...node, mapLinks };
  }

  const appendix = buildCombineAppendix(mapLinks, baseMd);
  return {
    ...node,
    mapLinks,
    markdown: `${baseMd.replace(/\s*$/, '')}\n\n${appendix}\n`,
  };
}

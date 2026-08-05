/**
 * 导图1 面板：只挂跨导图入口，不把 VibeHub 词条全文粘进课文
 */
import { bridgesForKnowledge } from './map-bridges.js';
import {
  VIBE_HUB_ID,
  VIBEHUB_MACRO_FRAMES,
  VIBEHUB_TERM_CARDS,
  getVibeEntryById,
} from './vibehub/graph-pack.js';

const MARK = '<!-- map2-combine -->';

/**
 * @param {{ id: string, label: string }[]} links
 */
function buildCombineAppendix(links) {
  if (!links?.length) return '';

  const termLinks = links.filter((l) =>
    VIBEHUB_TERM_CARDS.some((c) => c.id === l.id)
  );
  const frameLinks = links.filter((l) =>
    VIBEHUB_MACRO_FRAMES.some((f) => f.id === l.id)
  );
  const hubLink = links.find((l) => l.id === VIBE_HUB_ID);
  const chipLine = links.map((l) => `\`${l.label}\``).join(' · ');

  /** @type {string[]} */
  const parts = [
    MARK,
    '',
    '## 导图2 · 对照入口',
    '',
    '> 下列为 **知识导图2** 相关词条入口；点面板「跨导图」查看定义。本站路径与验收仍以本课为准。',
    '',
    `**跨导图**：${chipLine}`,
    '',
  ];

  if (hubLink) {
    parts.push('可先打开导图2 枢纽，按七大区浏览全量名词。', '');
  }

  if (frameLinks.length) {
    parts.push('### 相关大区', '');
    for (const fl of frameLinks) {
      const entry = getVibeEntryById(fl.id);
      const sub = entry?.subtitle || '';
      parts.push(
        `- **${fl.label}**${sub ? ` — ${sub}` : ''}（点「跨导图」进入）`
      );
    }
    parts.push('');
  }

  if (termLinks.length) {
    parts.push('### 对照词条', '');
    parts.push(termLinks.map((l) => `- ${l.label}`).join('\n'));
    parts.push('');
  }

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

  const appendix = buildCombineAppendix(mapLinks);
  if (!appendix) {
    return { ...node, mapLinks };
  }

  return {
    ...node,
    mapLinks,
    markdown: `${baseMd.replace(/\s*$/, '')}\n\n${appendix}\n`,
  };
}

/**
 * Mermaid 源码规范化（课文渲染与 run 前共用）
 * - 兼容旧写法 `\\n` → flowchart 换行
 * - 给含空格 / 非 ASCII / 特殊字符的节点与 participant 别名自动加引号
 *   （Mermaid 11 对未加引号的中文 participant 会 Syntax error）
 */
export function normalizeMermaidSource(raw) {
  let s = String(raw || '')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\\n/g, '<br/>')
    .trim();

  s = quoteFlowchartNodes(s);
  s = quoteParticipantAliases(s);
  s = quoteSequenceNotes(s);
  return s;
}

/** 需要引号：换行标签、空白、非 ASCII、常见特殊符 */
export function needsMermaidQuotes(content) {
  const t = String(content ?? '').trim();
  if (!t) return false;
  return (
    t.includes('<br/>') ||
    /[/·≠<>|#@&]/.test(t) ||
    /\s/.test(t) ||
    /[^\u0000-\u007F]/.test(t)
  );
}

/** flowchart：A[标签] → A["标签"]（已有引号则跳过；支持标签内含 ]） */
function quoteFlowchartNodes(src) {
  let out = '';
  let i = 0;
  const re = /\b[A-Za-z][\w]*\[/g;
  let m;
  while ((m = re.exec(src))) {
    out += src.slice(i, m.index);
    const id = m[0].slice(0, -1);
    const start = m.index + m[0].length;
    const end = findLabelEnd(src, start);
    if (end < 0) {
      out += m[0];
      i = m.index + m[0].length;
      continue;
    }
    const content = src.slice(start, end);
    const t = content.trim();
    if (isAlreadyQuoted(t) || !needsMermaidQuotes(content)) {
      out += `${id}[${content}]`;
    } else {
      out += `${id}["${escapeMermaidLabel(t)}"]`;
    }
    i = end + 1;
    re.lastIndex = i;
  }
  out += src.slice(i);
  return out;
}

/** 从 label 开括号后扫描到匹配的 ]，尊重引号 */
function findLabelEnd(src, start) {
  let quote = null;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === ']') return i;
    if (ch === '\n') return -1;
  }
  return -1;
}

/** sequenceDiagram：participant X as 别名 */
function quoteParticipantAliases(src) {
  return src.replace(
    /^([ \t]*participant\s+\w+\s+as\s+)([^\n]+)$/gm,
    (all, prefix, alias) => {
      const t = alias.trim();
      if (isAlreadyQuoted(t)) return all;
      if (!needsMermaidQuotes(t)) return all;
      return `${prefix}"${escapeMermaidLabel(t)}"`;
    }
  );
}

/** Note over / Note left of …：含特殊符时给正文加引号 */
function quoteSequenceNotes(src) {
  return src.replace(
    /^([ \t]*Note\s+(?:over|left of|right of)\s+[^:\n]+:\s*)([^\n]+)$/gim,
    (all, prefix, body) => {
      const t = body.trim();
      if (isAlreadyQuoted(t)) return all;
      if (!needsMermaidQuotes(t)) return all;
      return `${prefix}"${escapeMermaidLabel(t)}"`;
    }
  );
}

function isAlreadyQuoted(t) {
  return (
    (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))
  );
}

/** Mermaid 标签内双引号用 #quot; */
function escapeMermaidLabel(t) {
  return t.replace(/"/g, '#quot;');
}

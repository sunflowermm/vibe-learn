/**
 * VibeHub 词典并入本仓：与已有词条重叠则并入本仓键，不另开 vh_*。
 */

/** 人工指定：lessonId → 本仓 glossary id；null = 强制保留 vh_*（避免误并） */
const MANUAL_LESSON_TO_LOCAL = {
  'agent-loop': 'agent_loop',
  'ai-agent': 'agent_concept',
  backend: 'backend',
  frontend: 'frontend',
  cors: 'cors',
  cdn: 'cdn',
  dns: 'dns',
  domain: 'domain',
  http: 'http',
  https: 'https',
  api: 'api',
  url: 'url',
  port: 'port',
  'env-var': 'env_var',
  git: 'git',
  clone: 'clone',
  commit: 'commit',
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python_lang',
  react: 'react_fw',
  'react-pattern': 'react_pattern',
  vue: 'vue_fw',
  nextjs: 'nextjs_fw',
  npm: 'npm',
  mcp: 'mcp',
  multimodal: 'multimodal',
  'tool-calling': 'function_calling',
  'tech-stack': 'tech_stack',
  /** Skill 文件夹 ≈ 本仓 Agent Skills */
  skill: 'agent_skills',
  /** Continuous Delivery ≠ shell `cd` */
  cd: null,
  /** 与本仓「项目记忆 / pi」不是同一词 */
  'harness-engineering': null,
  /** UI「图片」≠ 容器镜像 */
  image: null,
  /** 树形控件 ≠ CLI tree */
  tree: null,
  /** 官网页头 ≠ HTTP Header */
  header: null,
  /** 权限控制 ≠ Authorization 请求头 */
  authorization: null,
  /** 系统提示词：保留 vh_*（本仓无同名键） */
  'system-prompt': null,
  /** 上下文工程：保留 vh_*（≠ 本仓 token_context / context_switch） */
  'context-engineering': null,
  'context-window': 'token_context',
};

/** @param {string} s */
function normKey(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[（(][^）)]*[）)]/g, '')
    .replace(/[\s\-_/·•.,，。:：]/g, '')
    .trim();
}

/** @param {string} term */
function englishPart(term) {
  const m = String(term || '').match(/[（(]([^）)]+)[）)]/);
  return m ? m[1].trim() : '';
}

/**
 * @param {Record<string, { term: string, aliases?: string[] }>} localGlossary
 * @returns {Map<string, string>} norm → localId
 */
export function buildLocalIndex(localGlossary) {
  /** @type {Map<string, string>} */
  const index = new Map();
  for (const [id, e] of Object.entries(localGlossary)) {
    if (id.startsWith('vh_')) continue;
    const keys = [e.term, englishPart(e.term), ...(e.aliases || [])]
      .map(normKey)
      .filter(Boolean);
    for (const k of keys) {
      if (!index.has(k)) index.set(k, id);
    }
  }
  return index;
}

/**
 * @param {string} lessonId
 * @param {{ term?: string, aliases?: string[], secondaryTitle?: string }} meta
 * @param {Map<string, string>} index
 * @returns {string | null} local id or null to keep vh_*
 */
export function matchLocalGlossaryId(lessonId, meta, index) {
  if (Object.prototype.hasOwnProperty.call(MANUAL_LESSON_TO_LOCAL, lessonId)) {
    return MANUAL_LESSON_TO_LOCAL[lessonId];
  }
  const candidates = [
    meta.secondaryTitle,
    meta.term,
    englishPart(meta.term || ''),
    ...(meta.aliases || []),
  ]
    .map(normKey)
    .filter(Boolean);
  for (const c of candidates) {
    const hit = index.get(c);
    if (hit) return hit;
  }
  return null;
}

/**
 * @param {Record<string, object>} glossary 可变：本仓已填好的 GLOSSARY
 * @param {Record<string, object>} vhEntries
 * @returns {{ map: Record<string, string>, kept: number, merged: number }}
 */
export function mergeVibehubGlossary(glossary, vhEntries) {
  const localSnap = { ...glossary };
  const index = buildLocalIndex(localSnap);
  /** @type {Record<string, string>} */
  const map = {};
  let kept = 0;
  let merged = 0;

  for (const [vhId, entry] of Object.entries(vhEntries)) {
    const lessonId = vhId.replace(/^vh_/, '').replace(/_/g, '-');
    const localId = matchLocalGlossaryId(
      lessonId,
      {
        term: entry.term,
        aliases: entry.aliases,
        secondaryTitle: entry.secondaryTitle,
      },
      index
    );

    if (localId && glossary[localId]) {
      map[vhId] = localId;
      merged += 1;
      const local = glossary[localId];
      const aliases = new Set([
        ...(local.aliases || []),
        ...(entry.aliases || []),
        entry.term,
      ].filter(Boolean));
      aliases.delete(local.term);
      local.aliases = [...aliases].slice(0, 12);
      if (!local.vibehubId) local.vibehubId = lessonId;
      if (!local.source) local.source = local.source || undefined;
      const note = '表达向补充见术语导图（VibeHub 快照）';
      if (!String(local.brief || '').includes('术语导图')) {
        local.brief = `${local.brief} ${note}`.replace(/\s+/g, ' ').trim();
      }
      continue;
    }

    glossary[vhId] = entry;
    kept += 1;
  }

  return { map, kept, merged };
}

/**
 * @param {string} glossaryId vh_* or local
 * @param {Record<string, string>} map
 */
export function remapGlossaryId(glossaryId, map) {
  return map[glossaryId] || glossaryId;
}

/**
 * 课文内交互组件：Markdown 围栏 → 占位 DOM → hydrate
 *
 * 围栏语言：
 * - term | vibe-term     终端打字演示（只读回放）
 * - compare | roles      跨系统角色对照卡
 * - shell | vibe-shell   可输入模拟终端（虚拟 FS / 命令）
 * - env | dialect        按 OS / Shell 分栏的可复制命令
 * - quiz                 选择题自测
 * - reveal | spot        现象 → 解析
 * - check | checklist    互动检查清单
 * - decide | path        决策树
 * - match                概念配对
 * - flip | cards         翻卡
 * - steps | timeline     逐步时间线
 * - ports                端口板
 * - sort                 排序核对
 */

import { createApp } from 'vue';
import LessonShell from '../components/LessonShell.vue';
import { parseShellSource } from '../labs/shell-engine.js';
import { SHELL_PRESETS } from '../labs/shell-presets.js';
import {
  mountCheck,
  mountDecide,
  mountEnv,
  mountFlip,
  mountMatch,
  mountPorts,
  mountQuiz,
  mountReveal,
  mountSort,
  mountSteps,
  parseCheckSource,
  parseDecideSource,
  parseEnvSource,
  parseFlipSource,
  parseMatchSource,
  parsePortsSource,
  parseQuizSource,
  parseRevealSource,
  parseSortSource,
  parseStepsSource,
} from './lesson-widget-play.js';

const PROMPT_RE = /^(?<prompt>\$ |PS> |# |> )/;

/**
 * @param {string} text
 * @returns {{ title?: string, prompt: string, steps: Array<{type:'in'|'out', text:string, prompt?: string}> }}
 */
export function parseTermSource(text) {
  const raw = String(text ?? '').trim();
  if (raw.startsWith('{')) {
    try {
      const j = JSON.parse(raw);
      const steps = Array.isArray(j.steps)
        ? j.steps.map((s) => ({
            type: s.type === 'out' ? 'out' : 'in',
            text: String(s.text ?? ''),
            prompt: s.prompt != null ? String(s.prompt) : undefined,
          }))
        : [];
      return {
        title: j.title ? String(j.title) : undefined,
        prompt: j.prompt != null ? String(j.prompt) : '$ ',
        env: j.env != null ? String(j.env) : j.shell != null ? String(j.shell) : undefined,
        steps,
      };
    } catch {
      /* fall through to line parser */
    }
  }

  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  /** @type {Array<{type:'in'|'out', text:string, prompt?: string}>} */
  const steps = [];
  let defaultPrompt = '$ ';

  for (const line of lines) {
    const m = line.match(PROMPT_RE);
    if (m) {
      const prompt = m.groups?.prompt ?? '$ ';
      defaultPrompt = prompt;
      steps.push({ type: 'in', text: line.slice(prompt.length), prompt });
    } else if (steps.length === 0 && line.trim() === '') {
      continue;
    } else {
      const prev = steps[steps.length - 1];
      if (prev?.type === 'out') {
        prev.text = prev.text ? `${prev.text}\n${line}` : line;
      } else {
        steps.push({ type: 'out', text: line });
      }
    }
  }

  return { prompt: defaultPrompt, steps, env: undefined };
}

/**
 * @param {string} text
 * @returns {{ title?: string, caption?: string, items: Array<{role:string, win:string, linux:string, mac?: string, note?: string}> }}
 */
export function parseCompareSource(text) {
  const raw = String(text ?? '').trim();
  if (raw.startsWith('{')) {
    try {
      const j = JSON.parse(raw);
      return {
        title: j.title ? String(j.title) : undefined,
        caption: j.caption ? String(j.caption) : undefined,
        items: Array.isArray(j.items)
          ? j.items.map((it) => ({
              role: String(it.role ?? ''),
              win: String(it.win ?? ''),
              linux: String(it.linux ?? ''),
              mac: it.mac != null ? String(it.mac) : undefined,
              gitbash: it.gitbash != null ? String(it.gitbash) : undefined,
              note: it.note != null ? String(it.note) : undefined,
            }))
          : [],
      };
    } catch {
      /* fall through */
    }
  }

  /** 简易 TSV：角色|Windows|Linux|macOS */
  const items = [];
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const parts = t.split('|').map((p) => p.trim());
    if (parts.length >= 3) {
      items.push({
        role: parts[0],
        win: parts[1],
        linux: parts[2],
        mac: parts[3] || undefined,
      });
    }
  }
  return { items };
}

function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'text') node.textContent = String(v);
    else if (k === 'html') node.innerHTML = String(v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  return node;
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseTermSource>} model
 */
function mountTerm(host, model) {
  const root = el('div', 'vibe-term', {
    role: 'region',
    'aria-label': model.title || '终端演示',
  });

  const head = el('div', 'vibe-term__head');
  const title = el('span', 'vibe-term__title', {
    text: model.title || '终端演示',
  });
  const dots = el('span', 'vibe-term__dots', { 'aria-hidden': 'true' });
  dots.append(
    el('i', 'vibe-term__dot vibe-term__dot--r'),
    el('i', 'vibe-term__dot vibe-term__dot--y'),
    el('i', 'vibe-term__dot vibe-term__dot--g')
  );
  const replay = el('button', 'vibe-term__replay', {
    type: 'button',
    text: '重播',
    'aria-label': '重新播放终端演示',
  });
  head.append(dots, title);
  if (model.env) {
    head.append(el('span', 'vibe-term__env', { text: model.env, title: '演示环境（非本机）' }));
  }
  head.append(replay);

  const screen = el('div', 'vibe-term__screen');
  root.append(head, screen);

  host.replaceChildren(root);

  let gen = 0;
  let timer = 0;

  function clearTimers() {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
  }

  function sleep(ms, g) {
    return new Promise((resolve) => {
      timer = window.setTimeout(() => {
        timer = 0;
        if (g === gen) resolve();
      }, ms);
    });
  }

  function paintInstant() {
    screen.replaceChildren();
    for (const step of model.steps) {
      if (step.type === 'in') {
        const line = el('div', 'vibe-term__line vibe-term__line--in');
        line.append(
          el('span', 'vibe-term__prompt', { text: step.prompt ?? model.prompt }),
          el('span', 'vibe-term__cmd', { text: step.text }),
        );
        screen.append(line);
      } else {
        screen.append(el('div', 'vibe-term__line vibe-term__line--out', { text: step.text }));
      }
    }
    screen.scrollTop = screen.scrollHeight;
  }

  async function playTyped() {
    const g = ++gen;
    clearTimers();
    screen.replaceChildren();
    const reduced = prefersReducedMotion();

    for (const step of model.steps) {
      if (g !== gen) return;

      if (step.type === 'in') {
        const line = el('div', 'vibe-term__line vibe-term__line--in');
        const prompt = el('span', 'vibe-term__prompt', {
          text: step.prompt ?? model.prompt,
        });
        const cmd = el('span', 'vibe-term__cmd');
        const caret = el('span', 'vibe-term__caret', { 'aria-hidden': 'true' });
        line.append(prompt, cmd, caret);
        screen.append(line);
        screen.scrollTop = screen.scrollHeight;

        const text = step.text;
        if (reduced) {
          cmd.textContent = text;
          caret.remove();
        } else {
          for (let i = 0; i < text.length; i++) {
            if (g !== gen) return;
            cmd.textContent = text.slice(0, i + 1);
            if (i === text.length - 1 || i % 3 === 0) {
              screen.scrollTop = screen.scrollHeight;
            }
            await sleep(8 + (text[i] === ' ' ? 4 : 0), g);
          }
          caret.remove();
          await sleep(60, g);
        }
      } else {
        const line = el('div', 'vibe-term__line vibe-term__line--out');
        line.textContent = step.text;
        screen.append(line);
        screen.scrollTop = screen.scrollHeight;
        if (!reduced) await sleep(90, g);
      }
    }
  }

  replay.addEventListener('click', () => {
    playTyped();
  });

  // 首屏立刻出结果（对齐 Mermaid）；打字留给「重播」
  paintInstant();

  return () => {
    gen += 1;
    clearTimers();
  };
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseCompareSource>} model
 */
function mountCompare(host, model) {
  const root = el('div', 'vibe-compare', {
    role: 'region',
    'aria-label': model.title || '跨系统对照',
  });

  if (model.title) {
    root.append(el('div', 'vibe-compare__title', { text: model.title }));
  }
  if (model.caption) {
    root.append(el('p', 'vibe-compare__caption', { text: model.caption }));
  }

  const rail = el('div', 'vibe-compare__rail', { 'aria-hidden': 'true' });
  rail.append(
    el('span', 'vibe-compare__pill', { text: '同一角色' }),
    el('span', 'vibe-compare__arrow', { text: '→' }),
    el('span', 'vibe-compare__pill vibe-compare__pill--soft', { text: '不同路径' })
  );
  root.append(rail);

  const list = el('div', 'vibe-compare__list');
  model.items.forEach((item, idx) => {
    const card = el('article', 'vibe-compare__card');
    card.style.setProperty('--vibe-i', String(idx));
    card.append(el('h4', 'vibe-compare__role', { text: item.role }));
    const grid = el('div', 'vibe-compare__grid');
    const cells = [
      ['Windows', item.win],
      ['Linux', item.linux],
    ];
    if (item.mac) cells.push(['macOS', item.mac]);
    if (item.gitbash) cells.push(['Git Bash', item.gitbash]);
    for (const [os, path] of cells) {
      const cell = el('div', 'vibe-compare__cell');
      cell.append(
        el('span', 'vibe-compare__os', { text: os }),
        el('code', 'vibe-compare__path', { text: path })
      );
      grid.append(cell);
    }
    card.append(grid);
    if (item.note) {
      card.append(el('p', 'vibe-compare__note', { text: item.note }));
    }
    list.append(card);
  });
  root.append(list);

  host.replaceChildren(root);

  const reduced = prefersReducedMotion();
  if (!reduced) {
    requestAnimationFrame(() => root.classList.add('is-in'));
  } else {
    root.classList.add('is-in');
  }

  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {string} src
 */
function mountShell(host, src) {
  const config = parseShellSource(src, SHELL_PRESETS);
  let app = null;

  const mountNow = () => {
    if (app) return;
    const wrap = el('div', 'vibe-shell-mount');
    host.replaceChildren(wrap);
    app = createApp(LessonShell, { config, compact: true });
    app.mount(wrap);
  };

  const near =
    typeof host.getBoundingClientRect === 'function'
      ? (() => {
          const r = host.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          return r.top < vh + 280 && r.bottom > -120;
        })()
      : true;

  /** @type {IntersectionObserver | null} */
  let io = null;
  if (near) {
    mountNow();
  } else if (typeof IntersectionObserver === 'function') {
    // 视口外只留骨架；靠近再 createApp，避免一课多个终端拖垮首屏
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io?.disconnect();
          io = null;
          mountNow();
        }
      },
      { rootMargin: '280px 0px', threshold: 0 },
    );
    io.observe(host);
  } else {
    mountNow();
  }

  return () => {
    io?.disconnect();
    if (app) {
      app.unmount();
      app = null;
    }
  };
}

const MOUNTERS = {
  term: (host, src) => mountTerm(host, parseTermSource(src)),
  'vibe-term': (host, src) => mountTerm(host, parseTermSource(src)),
  compare: (host, src) => mountCompare(host, parseCompareSource(src)),
  'vibe-compare': (host, src) => mountCompare(host, parseCompareSource(src)),
  roles: (host, src) => mountCompare(host, parseCompareSource(src)),
  shell: (host, src) => mountShell(host, src),
  'vibe-shell': (host, src) => mountShell(host, src),
  env: (host, src) => mountEnv(host, parseEnvSource(src)),
  dialect: (host, src) => mountEnv(host, parseEnvSource(src)),
  quiz: (host, src) => mountQuiz(host, parseQuizSource(src)),
  reveal: (host, src) => mountReveal(host, parseRevealSource(src)),
  spot: (host, src) => mountReveal(host, parseRevealSource(src)),
  check: (host, src) => mountCheck(host, parseCheckSource(src)),
  checklist: (host, src) => mountCheck(host, parseCheckSource(src)),
  decide: (host, src) => mountDecide(host, parseDecideSource(src)),
  path: (host, src) => mountDecide(host, parseDecideSource(src)),
  match: (host, src) => mountMatch(host, parseMatchSource(src)),
  flip: (host, src) => mountFlip(host, parseFlipSource(src)),
  cards: (host, src) => mountFlip(host, parseFlipSource(src)),
  steps: (host, src) => mountSteps(host, parseStepsSource(src)),
  timeline: (host, src) => mountSteps(host, parseStepsSource(src)),
  ports: (host, src) => mountPorts(host, parsePortsSource(src)),
  sort: (host, src) => mountSort(host, parseSortSource(src)),
};

/**
 * @param {ParentNode | null | undefined} root
 * @returns {() => void} dispose
 */
export function hydrateLessonWidgets(root) {
  if (!root || !root.querySelectorAll) return () => {};

  /** @type {Array<() => void>} */
  const disposers = [];

  const nodes = [...root.querySelectorAll('.vibe-widget[data-vibe]:not([data-hydrated="1"])')];
  // 终端优先挂载，减少「正文已出、窗还空着」的体感
  nodes.sort((a, b) => {
    const rank = (el) => {
      const k = (el.getAttribute('data-vibe') || '').toLowerCase();
      if (k === 'shell' || k === 'vibe-shell' || k === 'term' || k === 'vibe-term') return 0;
      return 1;
    };
    return rank(a) - rank(b);
  });

  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    const kind = (node.getAttribute('data-vibe') || '').trim().toLowerCase();
    const mount = MOUNTERS[kind];
    if (!mount) continue;

    const srcEl = node.querySelector('.vibe-widget__src');
    const src = srcEl?.textContent ?? '';
    node.setAttribute('data-hydrated', '1');
    try {
      disposers.push(mount(node, src) || (() => {}));
    } catch (err) {
      node.classList.add('vibe-widget--error');
      node.textContent = `演示组件加载失败：${kind}`;
      console.warn('[vibe-widget]', kind, err);
    }
  }

  return () => {
    for (const d of disposers) d();
  };
}

/** @type {Set<string>} */
export const WIDGET_LANGS = new Set(Object.keys(MOUNTERS));

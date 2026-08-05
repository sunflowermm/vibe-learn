/**
 * 扩展交互组件（非终端为主）：
 * env · quiz · reveal · check · decide · match · flip · steps · ports · sort
 * · diff · fill · pick
 * 由 lesson-widgets.js 注册 hydrate。
 */
import { copyWithButtonFeedback } from './copy-text.js';

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

function parseJson(text, fallback) {
  const raw = String(text ?? '').trim();
  if (!raw.startsWith('{') && !raw.startsWith('[')) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function enterIn(root) {
  if (prefersReducedMotion()) {
    root.classList.add('is-in');
    return;
  }
  requestAnimationFrame(() => root.classList.add('is-in'));
}

/** @param {string} text */
export function parseEnvSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return { title: '按环境查看命令', tabs: [], default: '' };
  }
  const tabs = Array.isArray(j.tabs)
    ? j.tabs.map((t, i) => ({
        id: String(t.id || `tab-${i}`),
        label: String(t.label || t.id || `环境 ${i + 1}`),
        os: t.os != null ? String(t.os) : '',
        shell: t.shell != null ? String(t.shell) : '',
        note: t.note != null ? String(t.note) : '',
        warn: t.warn != null ? String(t.warn) : '',
        lines: Array.isArray(t.lines) ? t.lines.map(String) : [],
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '按环境查看命令',
    caption: j.caption ? String(j.caption) : '',
    default: j.default ? String(j.default) : tabs[0]?.id || '',
    tabs,
  };
}

/** @param {string} text */
export function parseQuizSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '自测', questions: [] };
  let rawQs = Array.isArray(j.questions) ? j.questions : null;
  // 单题简写：question + options[{id,label}] + answer
  if (!rawQs && (j.question || j.prompt) && Array.isArray(j.options)) {
    const ans = String(j.answer ?? j.ok ?? '');
    rawQs = [
      {
        q: j.question || j.prompt,
        choices: j.options.map((o) => ({
          t: o.t || o.text || o.label || '',
          ok: String(o.id ?? o.value ?? '') === ans || Boolean(o.ok),
          why: o.why != null ? o.why : j.explain || '',
        })),
      },
    ];
  }
  const questions = (rawQs || []).map((q) => ({
    q: String(q.q || q.prompt || ''),
    choices: Array.isArray(q.choices)
      ? q.choices.map((c) => ({
          t: String(c.t || c.text || ''),
          ok: Boolean(c.ok),
          why: c.why != null ? String(c.why) : '',
        }))
      : [],
  }));
  return {
    title: j.title ? String(j.title) : '自测',
    caption: j.caption ? String(j.caption) : '',
    questions,
  };
}

/** @param {string} text */
export function parseRevealSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return { title: '点开看解析', face: String(text || ''), body: '', tone: 'warn' };
  }
  return {
    title: j.title ? String(j.title) : '点开看解析',
    prompt: j.prompt ? String(j.prompt) : '先读表面现象，再点开',
    face: String(j.face || j.surface || ''),
    body: String(j.body || j.explain || ''),
    tone: j.tone === 'ok' || j.tone === 'info' ? j.tone : 'warn',
  };
}

/** @param {string} text */
export function parseCheckSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '检查清单', items: [] };
  const items = Array.isArray(j.items)
    ? j.items.map((it, i) => ({
        id: String(it.id || `c${i}`),
        text: String(it.text || it.t || ''),
        hint: it.hint != null ? String(it.hint) : '',
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '检查清单',
    caption: j.caption ? String(j.caption) : '',
    items,
  };
}

/** @param {string} text */
export function parseDecideSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return { title: '决策', start: 'start', steps: {} };
  }
  /** @type {Record<string, object>} */
  const steps = {};
  const list = Array.isArray(j.steps) ? j.steps : [];
  for (const s of list) {
    const id = String(s.id || '');
    if (!id) continue;
    steps[id] = {
      id,
      q: String(s.q || s.prompt || ''),
      result: s.result != null ? String(s.result) : '',
      detail: s.detail != null ? String(s.detail) : '',
      options: Array.isArray(s.options)
        ? s.options.map((o) => ({
            label: String(o.label || o.t || ''),
            next: o.next != null ? String(o.next) : '',
          }))
        : [],
    };
  }
  return {
    title: j.title ? String(j.title) : '怎么选？',
    caption: j.caption ? String(j.caption) : '',
    start: String(j.start || list[0]?.id || 'start'),
    steps,
  };
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseEnvSource>} model
 */
export function mountEnv(host, model) {
  const root = el('div', 'vibe-env', {
    role: 'region',
    'aria-label': model.title,
  });
  root.append(el('div', 'vibe-env__title', { text: model.title }));
  if (model.caption) {
    root.append(el('p', 'vibe-env__caption', { text: model.caption }));
  }

  const tabs = el('div', 'vibe-env__tabs', { role: 'tablist', 'aria-label': '选择运行环境' });
  const panel = el('div', 'vibe-env__panel', { role: 'tabpanel' });
  root.append(tabs, panel);
  host.replaceChildren(root);

  let active = model.default || model.tabs[0]?.id || '';

  function renderPanel(tab) {
    panel.replaceChildren();
    if (!tab) {
      panel.append(el('p', 'vibe-env__empty', { text: '暂无环境片段' }));
      return;
    }
    const meta = el('div', 'vibe-env__meta');
    if (tab.os) meta.append(el('span', 'vibe-env__chip', { text: tab.os }));
    if (tab.shell) {
      meta.append(el('span', 'vibe-env__chip vibe-env__chip--shell', { text: tab.shell }));
    }
    meta.append(el('span', 'vibe-env__chip vibe-env__chip--sim', { text: '可复制 · 请在本机执行' }));
    panel.append(meta);

    if (tab.note) panel.append(el('p', 'vibe-env__note', { text: tab.note }));
    if (tab.warn) panel.append(el('p', 'vibe-env__warn', { text: tab.warn }));

    const pre = el('pre', 'vibe-env__code');
    pre.textContent = tab.lines.join('\n');
    panel.append(pre);

    const actions = el('div', 'vibe-env__actions');
    const copyBtn = el('button', 'vibe-env__btn', {
      type: 'button',
      text: '复制此环境命令',
    });
    copyBtn.addEventListener('click', async () => {
      const blob = tab.lines.join('\n');
      await copyWithButtonFeedback(copyBtn, blob, {
        okText: '已复制',
        failText: '复制失败 · 请手动选中',
      });
    });
    actions.append(copyBtn);
    panel.append(actions);
  }

  function select(id) {
    active = id;
    for (const btn of tabs.querySelectorAll('button')) {
      const on = btn.getAttribute('data-id') === id;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
    }
    renderPanel(model.tabs.find((t) => t.id === id));
  }

  for (const tab of model.tabs) {
    const btn = el('button', 'vibe-env__tab', {
      type: 'button',
      role: 'tab',
      'data-id': tab.id,
      'aria-selected': 'false',
      text: tab.label,
    });
    btn.addEventListener('click', () => select(tab.id));
    tabs.append(btn);
  }

  if (model.tabs.length) select(active);
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseQuizSource>} model
 */
export function mountQuiz(host, model) {
  const root = el('div', 'vibe-quiz', {
    role: 'region',
    'aria-label': model.title,
  });
  root.append(el('div', 'vibe-quiz__title', { text: model.title }));
  if (model.caption) {
    root.append(el('p', 'vibe-quiz__caption', { text: model.caption }));
  }

  const progress = el('div', 'vibe-quiz__progress', { text: '' });
  const stage = el('div', 'vibe-quiz__stage');
  root.append(progress, stage);
  host.replaceChildren(root);

  let idx = 0;
  let score = 0;
  let locked = false;

  function finish() {
    locked = true;
    stage.replaceChildren();
    const box = el('div', 'vibe-quiz__done');
    box.append(
      el('p', 'vibe-quiz__score', {
        text: `答对 ${score} / ${model.questions.length}`,
      }),
      el('p', 'vibe-quiz__hint', {
        text: '错题看解析即可；真实排障仍以本机日志为准。',
      })
    );
    const again = el('button', 'vibe-quiz__btn', { type: 'button', text: '再测一次' });
    again.addEventListener('click', () => {
      idx = 0;
      score = 0;
      locked = false;
      renderQ();
    });
    box.append(again);
    stage.append(box);
    progress.textContent = '完成';
  }

  function renderQ() {
    if (idx >= model.questions.length) {
      finish();
      return;
    }
    locked = false;
    const q = model.questions[idx];
    progress.textContent = `第 ${idx + 1} / ${model.questions.length} 题`;
    stage.replaceChildren();
    stage.append(el('p', 'vibe-quiz__q', { text: q.q }));
    const list = el('div', 'vibe-quiz__choices');
    const feedback = el('p', 'vibe-quiz__feedback');

    q.choices.forEach((c, i) => {
      const btn = el('button', 'vibe-quiz__choice', {
        type: 'button',
        text: `${String.fromCharCode(65 + i)}. ${c.t}`,
      });
      btn.addEventListener('click', () => {
        if (locked) return;
        locked = true;
        const ok = c.ok;
        if (ok) score += 1;
        btn.classList.add(ok ? 'is-ok' : 'is-bad');
        btn.classList.add(ok ? 'is-pop' : 'is-shake');
        for (const other of list.querySelectorAll('button')) {
          other.disabled = true;
          const ci = [...list.children].indexOf(other);
          if (q.choices[ci]?.ok) other.classList.add('is-ok');
        }
        feedback.textContent = c.why || (ok ? '正确。' : '再对照解析。');
        feedback.className = `vibe-quiz__feedback is-in ${ok ? 'is-ok' : 'is-bad'}`;
        const next = el('button', 'vibe-quiz__btn', {
          type: 'button',
          text: idx + 1 >= model.questions.length ? '查看成绩' : '下一题',
        });
        next.addEventListener('click', () => {
          idx += 1;
          renderQ();
        });
        stage.append(next);
      });
      list.append(btn);
    });
    stage.append(list, feedback);
  }

  if (!model.questions.length) {
    stage.append(el('p', 'vibe-quiz__caption', { text: '本题组为空' }));
  } else {
    renderQ();
  }
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseRevealSource>} model
 */
export function mountReveal(host, model) {
  const root = el('div', `vibe-reveal vibe-reveal--${model.tone}`, {
    role: 'region',
    'aria-label': model.title,
  });
  root.append(el('div', 'vibe-reveal__title', { text: model.title }));
  if (model.prompt) {
    root.append(el('p', 'vibe-reveal__prompt', { text: model.prompt }));
  }
  const face = el('pre', 'vibe-reveal__face');
  face.textContent = model.face;
  root.append(face);

  const btn = el('button', 'vibe-reveal__btn', {
    type: 'button',
    'aria-expanded': 'false',
    text: '展开解析',
  });
  const body = el('div', 'vibe-reveal__body', { hidden: true });
  body.textContent = model.body;
  btn.addEventListener('click', () => {
    const open = body.hasAttribute('hidden');
    if (open) {
      body.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = '收起解析';
      root.classList.add('is-open');
    } else {
      body.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '展开解析';
      root.classList.remove('is-open');
    }
  });
  root.append(btn, body);
  host.replaceChildren(root);
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseCheckSource>} model
 */
export function mountCheck(host, model) {
  const root = el('div', 'vibe-check', {
    role: 'region',
    'aria-label': model.title,
  });
  root.append(el('div', 'vibe-check__title', { text: model.title }));
  if (model.caption) {
    root.append(el('p', 'vibe-check__caption', { text: model.caption }));
  }
  const meter = el('div', 'vibe-check__meter', {
    role: 'status',
    'aria-live': 'polite',
    text: `0 / ${model.items.length}`,
  });
  const list = el('ul', 'vibe-check__list');
  root.append(meter, list);
  host.replaceChildren(root);

  const state = new Set();

  function sync() {
    meter.textContent = `${state.size} / ${model.items.length}${
      state.size === model.items.length && model.items.length
        ? ' · 清单已勾完'
        : ''
    }`;
    root.classList.toggle('is-done', state.size === model.items.length && model.items.length > 0);
  }

  for (const item of model.items) {
    const li = el('li', 'vibe-check__item');
    const id = `vibe-check-${item.id}-${Math.random().toString(36).slice(2, 7)}`;
    const box = el('input', 'vibe-check__box', {
      type: 'checkbox',
      id,
    });
    const label = el('label', 'vibe-check__label', { for: id });
    label.append(el('span', 'vibe-check__text', { text: item.text }));
    if (item.hint) {
      label.append(el('span', 'vibe-check__hint', { text: item.hint }));
    }
    box.addEventListener('change', () => {
      if (box.checked) state.add(item.id);
      else state.delete(item.id);
      li.classList.toggle('is-on', box.checked);
      sync();
    });
    li.append(box, label);
    list.append(li);
  }
  sync();
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseDecideSource>} model
 */
export function mountDecide(host, model) {
  const root = el('div', 'vibe-decide', {
    role: 'region',
    'aria-label': model.title,
  });
  root.append(el('div', 'vibe-decide__title', { text: model.title }));
  if (model.caption) {
    root.append(el('p', 'vibe-decide__caption', { text: model.caption }));
  }
  const crumb = el('div', 'vibe-decide__crumb', { text: '' });
  const stage = el('div', 'vibe-decide__stage');
  root.append(crumb, stage);
  host.replaceChildren(root);

  /** @type {string[]} */
  const trail = [];

  function go(id) {
    const step = model.steps[id];
    if (!step) {
      stage.replaceChildren(el('p', 'vibe-decide__caption', { text: '路径未定义' }));
      return;
    }
    trail.push(id);
    crumb.textContent = trail
      .map((t) => model.steps[t]?.q?.slice(0, 18) || t)
      .join(' → ');

    stage.replaceChildren();
    stage.append(el('p', 'vibe-decide__q', { text: step.q }));

    if (step.result) {
      const box = el('div', 'vibe-decide__result');
      box.append(el('p', 'vibe-decide__result-main', { text: step.result }));
      if (step.detail) {
        box.append(el('p', 'vibe-decide__result-detail', { text: step.detail }));
      }
      const reset = el('button', 'vibe-decide__btn', { type: 'button', text: '重来' });
      reset.addEventListener('click', () => {
        trail.length = 0;
        go(model.start);
      });
      box.append(reset);
      stage.append(box);
      return;
    }

    const opts = el('div', 'vibe-decide__opts');
    for (const o of step.options) {
      const btn = el('button', 'vibe-decide__opt', { type: 'button', text: o.label });
      btn.addEventListener('click', () => {
        if (o.next) go(o.next);
      });
      opts.append(btn);
    }
    stage.append(opts);
  }

  go(model.start);
  enterIn(root);
  return () => {};
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** @param {string} text */
export function parseMatchSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '配对', pairs: [] };
  const pairs = Array.isArray(j.pairs)
    ? j.pairs.map((p, i) => ({
        id: String(p.id || `p${i}`),
        left: String(p.left || p.l || ''),
        right: String(p.right || p.r || ''),
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '概念配对',
    caption: j.caption ? String(j.caption) : '先点左侧，再点右侧配对',
    pairs,
  };
}

/** @param {string} text */
export function parseFlipSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '翻卡', cards: [] };
  const cards = Array.isArray(j.cards)
    ? j.cards.map((c, i) => ({
        id: String(c.id || `f${i}`),
        front: String(c.front || c.q || ''),
        back: String(c.back || c.a || ''),
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '概念翻卡',
    caption: j.caption ? String(j.caption) : '点击卡片翻面',
    cards,
  };
}

/** @param {string} text */
export function parseStepsSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '步骤', steps: [] };
  const steps = Array.isArray(j.steps)
    ? j.steps.map((s, i) => ({
        title: String(s.title || s.t || `步骤 ${i + 1}`),
        body: String(s.body || s.text || ''),
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '逐步展开',
    caption: j.caption ? String(j.caption) : '',
    steps,
  };
}

/** @param {string} text */
export function parsePortsSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '端口板', ports: [] };
  const ports = Array.isArray(j.ports)
    ? j.ports.map((p) => ({
        port: String(p.port ?? p.n ?? ''),
        proto: String(p.proto || p.protocol || 'TCP'),
        name: String(p.name || p.label || ''),
        note: String(p.note || p.desc || ''),
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '常见端口',
    caption: j.caption
      ? String(j.caption)
      : '点端口看谁在听；端口是进程地址的一部分，不是「网站本身」',
    ports,
  };
}

/** @param {string} text */
export function parseSortSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') return { title: '排序', items: [] };
  const items = Array.isArray(j.items)
    ? j.items.map((it, i) => ({
        id: String(it.id || `s${i}`),
        text: String(it.text || it.t || ''),
        order: Number.isFinite(Number(it.order)) ? Number(it.order) : i,
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '排出正确顺序',
    caption: j.caption ? String(j.caption) : '点「上移 / 下移」调整，再核对',
    items,
  };
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseMatchSource>} model
 */
export function mountMatch(host, model) {
  const root = el('div', 'vibe-match', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-match__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-match__caption', { text: model.caption }));
  const status = el('div', 'vibe-match__status', { role: 'status', 'aria-live': 'polite' });
  const board = el('div', 'vibe-match__board');
  const leftCol = el('div', 'vibe-match__col');
  const rightCol = el('div', 'vibe-match__col');
  board.append(leftCol, rightCol);
  root.append(status, board);
  host.replaceChildren(root);

  const lefts = shuffle(model.pairs.map((p) => ({ id: p.id, text: p.left })));
  const rights = shuffle(model.pairs.map((p) => ({ id: p.id, text: p.right })));
  /** @type {string | null} */
  let pickLeft = null;
  /** @type {string | null} */
  let pickRight = null;
  const done = new Set();

  function syncStatus() {
    status.textContent =
      done.size === model.pairs.length && model.pairs.length
        ? `全部配对完成（${done.size}/${model.pairs.length}）`
        : `已配对 ${done.size} / ${model.pairs.length}`;
    root.classList.toggle('is-done', done.size === model.pairs.length && model.pairs.length > 0);
  }

  function clearPicks() {
    pickLeft = null;
    pickRight = null;
    leftCol.querySelectorAll('button').forEach((b) => b.classList.remove('is-pick'));
    rightCol.querySelectorAll('button').forEach((b) => b.classList.remove('is-pick'));
  }

  function tryPair() {
    if (!pickLeft || !pickRight) return;
    const ok = pickLeft === pickRight;
    const lBtn = leftCol.querySelector(`[data-id="${pickLeft}"]`);
    const rBtn = rightCol.querySelector(`[data-id="${pickRight}"]`);
    if (ok) {
      done.add(pickLeft);
      lBtn?.classList.add('is-ok');
      rBtn?.classList.add('is-ok');
      if (lBtn) lBtn.disabled = true;
      if (rBtn) rBtn.disabled = true;
      clearPicks();
      syncStatus();
    } else {
      lBtn?.classList.add('is-bad');
      rBtn?.classList.add('is-bad');
      window.setTimeout(() => {
        lBtn?.classList.remove('is-bad');
        rBtn?.classList.remove('is-bad');
        clearPicks();
      }, 450);
    }
  }

  for (const item of lefts) {
    const btn = el('button', 'vibe-match__chip', {
      type: 'button',
      'data-id': item.id,
      text: item.text,
    });
    btn.addEventListener('click', () => {
      if (done.has(item.id)) return;
      leftCol.querySelectorAll('button').forEach((b) => b.classList.remove('is-pick'));
      btn.classList.add('is-pick');
      pickLeft = item.id;
      tryPair();
    });
    leftCol.append(btn);
  }
  for (const item of rights) {
    const btn = el('button', 'vibe-match__chip vibe-match__chip--right', {
      type: 'button',
      'data-id': item.id,
      text: item.text,
    });
    btn.addEventListener('click', () => {
      if (done.has(item.id)) return;
      rightCol.querySelectorAll('button').forEach((b) => b.classList.remove('is-pick'));
      btn.classList.add('is-pick');
      pickRight = item.id;
      tryPair();
    });
    rightCol.append(btn);
  }

  const reset = el('button', 'vibe-match__btn', { type: 'button', text: '打乱重来' });
  reset.addEventListener('click', () => mountMatch(host, model));
  root.append(reset);
  syncStatus();
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseFlipSource>} model
 */
export function mountFlip(host, model) {
  const root = el('div', 'vibe-flip', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-flip__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-flip__caption', { text: model.caption }));
  const grid = el('div', 'vibe-flip__grid');
  for (const card of model.cards) {
    const btn = el('button', 'vibe-flip__card', {
      type: 'button',
      'aria-pressed': 'false',
    });
    const inner = el('div', 'vibe-flip__inner');
    inner.append(
      el('div', 'vibe-flip__face vibe-flip__face--front', { text: card.front }),
      el('div', 'vibe-flip__face vibe-flip__face--back', { text: card.back })
    );
    btn.append(inner);
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('is-flipped');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    grid.append(btn);
  }
  root.append(grid);
  host.replaceChildren(root);
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseStepsSource>} model
 */
export function mountSteps(host, model) {
  const root = el('div', 'vibe-steps', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-steps__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-steps__caption', { text: model.caption }));
  const rail = el('div', 'vibe-steps__rail');
  const body = el('div', 'vibe-steps__body');
  const nav = el('div', 'vibe-steps__nav');
  root.append(rail, body, nav);
  host.replaceChildren(root);

  let idx = 0;
  function render() {
    rail.replaceChildren();
    model.steps.forEach((s, i) => {
      const dot = el('button', `vibe-steps__dot${i === idx ? ' is-on' : ''}${i < idx ? ' is-done' : ''}`, {
        type: 'button',
        text: String(i + 1),
        'aria-label': s.title,
        'aria-current': i === idx ? 'step' : undefined,
      });
      dot.addEventListener('click', () => {
        idx = i;
        render();
      });
      rail.append(dot);
      if (i < model.steps.length - 1) rail.append(el('span', 'vibe-steps__line', { 'aria-hidden': 'true' }));
    });
    body.replaceChildren();
    const cur = model.steps[idx];
    if (cur) {
      const wrap = el('div', 'vibe-steps__pane');
      wrap.append(el('h4', 'vibe-steps__h', { text: cur.title }));
      wrap.append(el('p', 'vibe-steps__p', { text: cur.body }));
      body.append(wrap);
      if (!prefersReducedMotion()) {
        requestAnimationFrame(() => wrap.classList.add('is-in'));
      } else {
        wrap.classList.add('is-in');
      }
    }
    nav.replaceChildren();
    const prev = el('button', 'vibe-steps__btn', {
      type: 'button',
      text: '上一步',
      disabled: idx === 0 ? true : undefined,
    });
    const next = el('button', 'vibe-steps__btn vibe-steps__btn--primary', {
      type: 'button',
      text: idx >= model.steps.length - 1 ? '完成' : '下一步',
    });
    prev.addEventListener('click', () => {
      if (idx > 0) {
        idx -= 1;
        render();
      }
    });
    next.addEventListener('click', () => {
      if (idx < model.steps.length - 1) {
        idx += 1;
        render();
      }
    });
    nav.append(prev, next);
  }
  render();
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parsePortsSource>} model
 */
export function mountPorts(host, model) {
  const root = el('div', 'vibe-ports', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-ports__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-ports__caption', { text: model.caption }));
  const board = el('div', 'vibe-ports__board');
  const detail = el('div', 'vibe-ports__detail', {
    text: '点上方端口查看说明',
    role: 'status',
    'aria-live': 'polite',
  });
  root.append(board, detail);
  host.replaceChildren(root);

  for (const p of model.ports) {
    const btn = el('button', 'vibe-ports__port', {
      type: 'button',
      text: p.port,
      title: p.name,
    });
    btn.addEventListener('click', () => {
      board.querySelectorAll('button').forEach((b) => b.classList.remove('is-on'));
      btn.classList.add('is-on');
      detail.replaceChildren();
      detail.append(el('div', 'vibe-ports__name', { text: `${p.port}/${p.proto} · ${p.name}` }));
      if (p.note) detail.append(el('p', 'vibe-ports__note', { text: p.note }));
    });
    board.append(btn);
  }
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseSortSource>} model
 */
export function mountSort(host, model) {
  const root = el('div', 'vibe-sort', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-sort__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-sort__caption', { text: model.caption }));
  const list = el('ol', 'vibe-sort__list');
  const status = el('div', 'vibe-sort__status', { role: 'status', 'aria-live': 'polite' });
  const actions = el('div', 'vibe-sort__actions');
  root.append(list, status, actions);
  host.replaceChildren(root);

  /** @type {typeof model.items} */
  let order = shuffle(model.items);

  function render() {
    list.replaceChildren();
    order.forEach((item, i) => {
      const li = el('li', 'vibe-sort__item');
      li.append(el('span', 'vibe-sort__text', { text: item.text }));
      const up = el('button', 'vibe-sort__move', {
        type: 'button',
        text: '↑',
        'aria-label': '上移',
        disabled: i === 0 ? true : undefined,
      });
      const down = el('button', 'vibe-sort__move', {
        type: 'button',
        text: '↓',
        'aria-label': '下移',
        disabled: i === order.length - 1 ? true : undefined,
      });
      up.addEventListener('click', () => {
        if (i === 0) return;
        [order[i - 1], order[i]] = [order[i], order[i - 1]];
        status.textContent = '';
        root.classList.remove('is-ok', 'is-bad');
        render();
      });
      down.addEventListener('click', () => {
        if (i >= order.length - 1) return;
        [order[i + 1], order[i]] = [order[i], order[i + 1]];
        status.textContent = '';
        root.classList.remove('is-ok', 'is-bad');
        render();
      });
      li.append(up, down);
      list.append(li);
    });
  }

  const check = el('button', 'vibe-sort__btn', { type: 'button', text: '核对顺序' });
  check.addEventListener('click', () => {
    const ok = order.every((it, i) => {
      const expect = [...model.items].sort((a, b) => a.order - b.order)[i];
      return expect && expect.id === it.id;
    });
    root.classList.toggle('is-ok', ok);
    root.classList.toggle('is-bad', !ok);
    status.textContent = ok ? '顺序正确' : '还不对，对照课文再调';
  });
  const reshuffle = el('button', 'vibe-sort__btn vibe-sort__btn--ghost', {
    type: 'button',
    text: '打乱',
  });
  reshuffle.addEventListener('click', () => {
    order = shuffle(model.items);
    status.textContent = '';
    root.classList.remove('is-ok', 'is-bad');
    render();
  });
  actions.append(check, reshuffle);
  render();
  enterIn(root);
  return () => {};
}

/** @param {string} text */
export function parseDiffSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return { title: '对照', bad: '', good: '', why: '', ask: '' };
  }
  return {
    title: j.title ? String(j.title) : '对错对照',
    caption: j.caption ? String(j.caption) : '',
    badLabel: j.badLabel != null ? String(j.badLabel) : '常见错法',
    goodLabel: j.goodLabel != null ? String(j.goodLabel) : '正确写法',
    bad: String(j.bad || j.wrong || ''),
    good: String(j.good || j.right || ''),
    why: j.why != null ? String(j.why) : '',
    ask: j.ask != null ? String(j.ask) : '哪边能过验收？',
  };
}

/** @param {string} text */
export function parseFillSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return { title: '填空', template: '', answers: [], hint: '' };
  }
  const answers = Array.isArray(j.answers)
    ? j.answers.map((a) => String(a).trim())
    : typeof j.answer === 'string'
      ? [String(j.answer).trim()]
      : [];
  return {
    title: j.title ? String(j.title) : '补全命令',
    caption: j.caption ? String(j.caption) : '空格用输入框填；大小写按真命令',
    template: String(j.template || j.line || ''),
    answers,
    hint: j.hint != null ? String(j.hint) : '',
    caseSensitive: Boolean(j.caseSensitive),
  };
}

/** @param {string} text */
export function parsePickSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return { title: '归类', bins: [], items: [] };
  }
  const bins = Array.isArray(j.bins)
    ? j.bins.map((b, i) => ({
        id: String(b.id || `b${i}`),
        label: String(b.label || b.name || b.id || `类 ${i + 1}`),
      }))
    : [];
  const items = Array.isArray(j.items)
    ? j.items.map((it, i) => ({
        id: String(it.id || `i${i}`),
        text: String(it.text || it.t || ''),
        bin: String(it.bin || it.ok || ''),
      }))
    : [];
  return {
    title: j.title ? String(j.title) : '点选归类',
    caption: j.caption ? String(j.caption) : '先点条目，再点所属类别',
    bins,
    items,
  };
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseDiffSource>} model
 */
export function mountDiff(host, model) {
  const root = el('div', 'vibe-diff', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-diff__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-diff__caption', { text: model.caption }));
  if (model.ask) root.append(el('p', 'vibe-diff__ask', { text: model.ask }));

  const grid = el('div', 'vibe-diff__grid');
  const badBtn = el('button', 'vibe-diff__pane vibe-diff__pane--bad', { type: 'button' });
  badBtn.append(
    el('div', 'vibe-diff__label', { text: model.badLabel }),
    el('pre', 'vibe-diff__code', { text: model.bad })
  );
  const goodBtn = el('button', 'vibe-diff__pane vibe-diff__pane--good', { type: 'button' });
  goodBtn.append(
    el('div', 'vibe-diff__label', { text: model.goodLabel }),
    el('pre', 'vibe-diff__code', { text: model.good })
  );
  grid.append(badBtn, goodBtn);

  const status = el('div', 'vibe-diff__status', { role: 'status', 'aria-live': 'polite' });
  const why = el('p', 'vibe-diff__why');
  why.hidden = true;
  if (model.why) why.textContent = model.why;

  root.append(grid, status, why);
  host.replaceChildren(root);

  function lock(ok, msg) {
    badBtn.disabled = true;
    goodBtn.disabled = true;
    root.classList.toggle('is-ok', ok);
    root.classList.toggle('is-bad', !ok);
    status.textContent = msg;
    if (ok && model.why) why.hidden = false;
  }

  badBtn.addEventListener('click', () => {
    badBtn.classList.add('is-picked', 'is-wrong');
    lock(false, '这是常见错法——对照另一侧');
  });
  goodBtn.addEventListener('click', () => {
    goodBtn.classList.add('is-picked', 'is-right');
    lock(true, '正确');
  });

  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseFillSource>} model
 */
export function mountFill(host, model) {
  const root = el('div', 'vibe-fill', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-fill__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-fill__caption', { text: model.caption }));

  const line = el('div', 'vibe-fill__line');
  /** @type {HTMLInputElement[]} */
  const inputs = [];
  const parts = String(model.template).split(/(___+|\{\{\d*\}\})/g);
  let blankIdx = 0;
  for (const part of parts) {
    if (!part) continue;
    if (/^___+$/.test(part) || /^\{\{\d*\}\}$/.test(part)) {
      const input = el('input', 'vibe-fill__input', {
        type: 'text',
        autocomplete: 'off',
        spellcheck: 'false',
        'aria-label': `填空 ${blankIdx + 1}`,
      });
      if (model.answers[blankIdx]) {
        input.size = Math.max(6, Math.min(28, model.answers[blankIdx].length + 2));
      }
      inputs.push(input);
      line.append(input);
      blankIdx += 1;
    } else {
      line.append(el('span', 'vibe-fill__text', { text: part }));
    }
  }

  const status = el('div', 'vibe-fill__status', { role: 'status', 'aria-live': 'polite' });
  const actions = el('div', 'vibe-fill__actions');
  const check = el('button', 'vibe-fill__btn', { type: 'button', text: '核对' });
  const hintBtn = el('button', 'vibe-fill__btn vibe-fill__btn--ghost', {
    type: 'button',
    text: '提示',
  });
  if (!model.hint) hintBtn.hidden = true;

  check.addEventListener('click', () => {
    if (!model.answers.length || inputs.length !== model.answers.length) {
      status.textContent = '本题答案未配置完整';
      return;
    }
    let ok = true;
    inputs.forEach((input, i) => {
      const expect = model.answers[i];
      const got = model.caseSensitive ? input.value.trim() : input.value.trim().toLowerCase();
      const exp = model.caseSensitive ? expect : expect.toLowerCase();
      const match = got === exp;
      input.classList.toggle('is-ok', match);
      input.classList.toggle('is-bad', !match);
      if (!match) ok = false;
    });
    root.classList.toggle('is-ok', ok);
    root.classList.toggle('is-bad', !ok);
    status.textContent = ok ? '通过' : '还不对——对照课文里的真命令';
  });

  hintBtn.addEventListener('click', () => {
    status.textContent = model.hint;
  });

  actions.append(check, hintBtn);
  root.append(line, actions, status);
  host.replaceChildren(root);
  enterIn(root);
  return () => {};
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parsePickSource>} model
 */
export function mountPick(host, model) {
  const root = el('div', 'vibe-pick', { role: 'region', 'aria-label': model.title });
  root.append(el('div', 'vibe-pick__title', { text: model.title }));
  if (model.caption) root.append(el('p', 'vibe-pick__caption', { text: model.caption }));

  const status = el('div', 'vibe-pick__status', { role: 'status', 'aria-live': 'polite' });
  const itemsWrap = el('div', 'vibe-pick__items');
  const binsWrap = el('div', 'vibe-pick__bins');

  /** @type {string | null} */
  let selected = null;
  /** @type {Record<string, string>} */
  const assigned = {};

  const itemBtns = new Map();
  for (const it of model.items) {
    const btn = el('button', 'vibe-pick__item', { type: 'button', text: it.text });
    btn.addEventListener('click', () => {
      selected = it.id;
      for (const [id, b] of itemBtns) b.classList.toggle('is-selected', id === it.id);
      status.textContent = `已选：${it.text} → 再点下方类别`;
    });
    itemBtns.set(it.id, btn);
    itemsWrap.append(btn);
  }

  for (const bin of model.bins) {
    const col = el('div', 'vibe-pick__bin');
    col.append(el('div', 'vibe-pick__bin-label', { text: bin.label }));
    const drop = el('div', 'vibe-pick__bin-drop', { 'data-bin': bin.id });
    col.append(drop);
    col.addEventListener('click', () => {
      if (!selected) {
        status.textContent = '先点上方一条';
        return;
      }
      const it = model.items.find((x) => x.id === selected);
      if (!it) return;
      assigned[it.id] = bin.id;
      const btn = itemBtns.get(it.id);
      if (btn) {
        btn.classList.add('is-assigned');
        btn.classList.remove('is-selected');
        btn.disabled = true;
      }
      drop.append(el('div', 'vibe-pick__chip', { text: it.text }));
      selected = null;
      status.textContent = '';
    });
    binsWrap.append(col);
  }

  const actions = el('div', 'vibe-pick__actions');
  const check = el('button', 'vibe-pick__btn', { type: 'button', text: '核对归类' });
  const reset = el('button', 'vibe-pick__btn vibe-pick__btn--ghost', { type: 'button', text: '重来' });

  check.addEventListener('click', () => {
    let ok = true;
    let done = 0;
    for (const it of model.items) {
      if (!assigned[it.id]) {
        ok = false;
        continue;
      }
      done += 1;
      if (assigned[it.id] !== it.bin) ok = false;
    }
    if (done < model.items.length) {
      status.textContent = `还有 ${model.items.length - done} 条未归类`;
      root.classList.remove('is-ok', 'is-bad');
      return;
    }
    root.classList.toggle('is-ok', ok);
    root.classList.toggle('is-bad', !ok);
    status.textContent = ok ? '全部正确' : '有归错的——对照课文分层再试';
  });

  reset.addEventListener('click', () => {
    for (const key of Object.keys(assigned)) delete assigned[key];
    selected = null;
    status.textContent = '';
    root.classList.remove('is-ok', 'is-bad');
    for (const [id, btn] of itemBtns) {
      btn.disabled = false;
      btn.classList.remove('is-assigned', 'is-selected');
    }
    for (const drop of binsWrap.querySelectorAll('.vibe-pick__bin-drop')) {
      drop.replaceChildren();
    }
  });

  actions.append(check, reset);
  root.append(itemsWrap, binsWrap, actions, status);
  host.replaceChildren(root);
  enterIn(root);
  return () => {};
}

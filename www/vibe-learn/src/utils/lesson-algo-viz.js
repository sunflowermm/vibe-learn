/**
 * 课文算法动画：```algo / ```viz / ```animate
 * 经典演示：冒泡/插入/选择/快排分区、二分、BFS/DFS、链表反转、双指针、并查集、梯度下降
 */

function prefersReducedMotion() {
  try {
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'text') node.textContent = String(v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  return node;
}

function parseJson(text, fallback) {
  const raw = String(text ?? '').trim();
  if (!raw.startsWith('{')) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function sleep(ms, signal) {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t);
        reject(new DOMException('aborted', 'AbortError'));
      },
      { once: true }
    );
  });
}

/** @param {string} text */
export function parseAlgoSource(text) {
  const j = parseJson(text, null);
  if (!j || typeof j !== 'object') {
    return {
      title: '算法动画',
      kind: 'bubble',
      data: [5, 2, 8, 1, 9, 3],
      speed: 420,
      caption: '',
    };
  }
  const kind = String(j.kind || j.type || 'bubble').toLowerCase();
  let data = j.data ?? j.arr ?? j.values;
  if (!Array.isArray(data)) {
    if (kind === 'bfs' || kind === 'dfs') {
      data = {
        rows: 4,
        cols: 5,
        walls: [[1, 1], [1, 2], [2, 2]],
        start: [0, 0],
        goal: [3, 4],
      };
    } else if (kind === 'list' || kind === 'll-reverse') {
      data = [1, 2, 3, 4, 5];
    } else if (kind === 'uf' || kind === 'union-find') {
      data = { n: 6, unions: [[0, 1], [1, 2], [3, 4], [2, 3]] };
    } else if (kind === 'gd' || kind === 'gradient') {
      data = { start: 4.5, lr: 0.15, steps: 18 };
    } else {
      data = [5, 2, 8, 1, 9, 3, 7, 4];
    }
  }
  return {
    title: j.title ? String(j.title) : '算法动画',
    caption: j.caption ? String(j.caption) : '',
    kind,
    data,
    speed: Math.max(80, Number(j.speed) || 420),
    autoplay: j.autoplay !== false,
  };
}

function barStage(values) {
  const stage = el('div', 'vibe-algo__bars');
  const max = Math.max(...values.map(Number), 1);
  const cells = values.map((v, i) => {
    const cell = el('div', 'vibe-algo__bar-wrap', { 'data-i': String(i) });
    const bar = el('div', 'vibe-algo__bar');
    bar.style.height = `${Math.max(8, (Number(v) / max) * 100)}%`;
    const lab = el('span', 'vibe-algo__bar-lab', { text: String(v) });
    cell.append(bar, lab);
    return { cell, bar, lab, v: Number(v) };
  });
  for (const c of cells) stage.append(c.cell);
  return { stage, cells, max };
}

function setBarState(cells, i, state) {
  for (const c of cells) c.cell.classList.remove('is-active', 'is-pivot', 'is-done', 'is-dim');
  if (i == null) return;
  const idxs = Array.isArray(i) ? i : [i];
  for (const c of cells) {
    if (!idxs.includes(cells.indexOf(c))) c.cell.classList.add('is-dim');
  }
  for (const idx of idxs) {
    if (cells[idx]) cells[idx].cell.classList.add(state || 'is-active');
  }
}

function syncBars(cells, values, max) {
  const m = max || Math.max(...values.map(Number), 1);
  values.forEach((v, i) => {
    const c = cells[i];
    if (!c) return;
    c.v = Number(v);
    c.lab.textContent = String(v);
    c.bar.style.height = `${Math.max(8, (Number(v) / m) * 100)}%`;
  });
}

async function runBubble(cells, values, speed, signal, log) {
  const a = values.slice();
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      setBarState(cells, [j, j + 1], 'is-active');
      log(`比较 ${a[j]} 与 ${a[j + 1]}`);
      await sleep(speed, signal);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        syncBars(cells, a);
        log(`交换 → [${a.join(', ')}]`);
        await sleep(speed, signal);
      }
    }
    cells[n - 1 - i]?.cell.classList.add('is-done');
  }
  for (const c of cells) {
    c.cell.classList.remove('is-dim', 'is-active');
    c.cell.classList.add('is-done');
  }
  log('冒泡完成：大的元素逐步「冒」到右侧');
  return a;
}

async function runInsertion(cells, values, speed, signal, log) {
  const a = values.slice();
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    setBarState(cells, i, 'is-pivot');
    log(`插入键 ${key}`);
    await sleep(speed, signal);
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      syncBars(cells, a);
      setBarState(cells, [j, j + 1], 'is-active');
      await sleep(speed * 0.85, signal);
      j--;
    }
    a[j + 1] = key;
    syncBars(cells, a);
  }
  for (const c of cells) c.cell.classList.add('is-done');
  log('插入排序完成：左侧始终有序');
  return a;
}

async function runSelection(cells, values, speed, signal, log) {
  const a = values.slice();
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      setBarState(cells, [min, j], 'is-active');
      await sleep(speed * 0.55, signal);
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      syncBars(cells, a);
      log(`选出最小 ${a[i]} 放到位置 ${i}`);
      await sleep(speed, signal);
    }
    cells[i]?.cell.classList.add('is-done');
  }
  log('选择排序完成');
  return a;
}

async function runQuick(cells, values, speed, signal, log) {
  const a = values.slice();
  async function partition(lo, hi) {
    const pivot = a[hi];
    cells[hi]?.cell.classList.add('is-pivot');
    log(`枢轴 ${pivot}（末位）`);
    let i = lo;
    for (let j = lo; j < hi; j++) {
      setBarState(cells, [j, hi], 'is-active');
      cells[hi]?.cell.classList.add('is-pivot');
      await sleep(speed * 0.7, signal);
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        syncBars(cells, a);
        i++;
        await sleep(speed * 0.55, signal);
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    syncBars(cells, a);
    cells[hi]?.cell.classList.remove('is-pivot');
    return i;
  }
  async function q(lo, hi) {
    if (lo >= hi) return;
    const p = await partition(lo, hi);
    cells[p]?.cell.classList.add('is-done');
    await q(lo, p - 1);
    await q(p + 1, hi);
  }
  await q(0, a.length - 1);
  for (const c of cells) c.cell.classList.add('is-done');
  log('快排完成：分治 + 分区');
  return a;
}

async function runBinary(cells, values, speed, signal, log) {
  const a = values.slice().sort((x, y) => x - y);
  syncBars(cells, a);
  log(`先有序：[${a.join(', ')}]`);
  await sleep(speed, signal);
  const target = a[Math.floor(a.length * 0.65)] ?? a[0];
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    setBarState(cells, [lo, mid, hi], 'is-active');
    cells[mid]?.cell.classList.add('is-pivot');
    log(`查 ${target}：lo=${lo} mid=${mid}(${a[mid]}) hi=${hi}`);
    await sleep(speed, signal);
    if (a[mid] === target) {
      setBarState(cells, mid, 'is-done');
      log(`命中下标 ${mid}`);
      return mid;
    }
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  log('未找到');
  return -1;
}

function gridStage(spec) {
  const rows = Number(spec.rows) || 4;
  const cols = Number(spec.cols) || 5;
  const walls = new Set((spec.walls || []).map(([r, c]) => `${r},${c}`));
  const start = spec.start || [0, 0];
  const goal = spec.goal || [rows - 1, cols - 1];
  const stage = el('div', 'vibe-algo__grid');
  stage.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  /** @type {HTMLElement[][]} */
  const cells = [];
  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = el('div', 'vibe-algo__cell', { 'data-r': String(r), 'data-c': String(c) });
      const key = `${r},${c}`;
      if (walls.has(key)) cell.classList.add('is-wall');
      if (r === start[0] && c === start[1]) {
        cell.classList.add('is-start');
        cell.textContent = 'S';
      } else if (r === goal[0] && c === goal[1]) {
        cell.classList.add('is-goal');
        cell.textContent = 'G';
      }
      cells[r][c] = cell;
      stage.append(cell);
    }
  }
  return { stage, cells, rows, cols, walls, start, goal };
}

async function runBfs(grid, speed, signal, log) {
  const { cells, rows, cols, walls, start, goal } = grid;
  const q = [start];
  const seen = new Set([`${start[0]},${start[1]}`]);
  const parent = new Map();
  log('BFS：队列，一层层扩');
  while (q.length) {
    const [r, c] = q.shift();
    const cell = cells[r][c];
    if (!cell.classList.contains('is-start') && !cell.classList.contains('is-goal')) {
      cell.classList.add('is-visit');
    }
    log(`出队 (${r},${c})`);
    await sleep(speed * 0.75, signal);
    if (r === goal[0] && c === goal[1]) {
      let cur = `${r},${c}`;
      while (cur) {
        const [pr, pc] = cur.split(',').map(Number);
        const pc_ = cells[pr][pc];
        if (!pc_.classList.contains('is-start') && !pc_.classList.contains('is-goal')) {
          pc_.classList.add('is-path');
        }
        cur = parent.get(cur);
      }
      log('找到目标，回溯最短路径（无权）');
      return;
    }
    for (const [dr, dc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (walls.has(key) || seen.has(key)) continue;
      seen.add(key);
      parent.set(key, `${r},${c}`);
      q.push([nr, nc]);
      cells[nr][nc].classList.add('is-frontier');
    }
    await sleep(speed * 0.35, signal);
  }
  log('不可达');
}

async function runDfs(grid, speed, signal, log) {
  const { cells, rows, cols, walls, start, goal } = grid;
  const stack = [start];
  const seen = new Set([`${start[0]},${start[1]}`]);
  log('DFS：栈，一条路走到黑再回溯');
  while (stack.length) {
    const [r, c] = stack.pop();
    const cell = cells[r][c];
    if (!cell.classList.contains('is-start') && !cell.classList.contains('is-goal')) {
      cell.classList.add('is-visit');
    }
    log(`弹出 (${r},${c})`);
    await sleep(speed * 0.7, signal);
    if (r === goal[0] && c === goal[1]) {
      log('DFS 抵达目标（路径未必最短）');
      return;
    }
    for (const [dr, dc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (walls.has(key) || seen.has(key)) continue;
      seen.add(key);
      stack.push([nr, nc]);
      cells[nr][nc].classList.add('is-frontier');
    }
  }
  log('不可达');
}

function listStage(values) {
  const stage = el('div', 'vibe-algo__list');
  const nodes = values.map((v, i) => {
    const node = el('div', 'vibe-algo__node', { text: String(v) });
    const wrap = el('div', 'vibe-algo__node-wrap');
    wrap.append(node);
    if (i < values.length - 1) wrap.append(el('span', 'vibe-algo__arrow', { text: '→' }));
    return { wrap, node, v };
  });
  for (const n of nodes) stage.append(n.wrap);
  return { stage, nodes };
}

async function runListReverse(list, speed, signal, log) {
  const vals = list.nodes.map((n) => n.v);
  log(`原链：${vals.join(' → ')}`);
  await sleep(speed, signal);
  let prev = null;
  let cur = 0;
  const nextOf = vals.map((_, i) => (i < vals.length - 1 ? i + 1 : null));
  // Visual: highlight and rebuild order text
  while (cur != null) {
    list.nodes[cur]?.node.classList.add('is-active');
    const nxt = nextOf[cur];
    log(`反转：prev=${prev} cur=${cur} next=${nxt}`);
    await sleep(speed, signal);
    nextOf[cur] = prev;
    prev = cur;
    cur = nxt;
    for (const n of list.nodes) n.node.classList.remove('is-active');
  }
  // Rebuild display order by following from new head=prev
  const order = [];
  let p = prev;
  const seen = new Set();
  while (p != null && !seen.has(p)) {
    seen.add(p);
    order.push(vals[p]);
    p = nextOf[p];
  }
  list.stage.replaceChildren();
  const rebuilt = listStage(order);
  list.stage.append(...rebuilt.stage.children);
  log(`反转后：${order.join(' → ')}`);
}

function ufStage(n) {
  const stage = el('div', 'vibe-algo__uf');
  const parent = Array.from({ length: n }, (_, i) => i);
  const cells = [];
  for (let i = 0; i < n; i++) {
    const cell = el('div', 'vibe-algo__uf-item');
    cell.append(
      el('strong', '', { text: String(i) }),
      el('span', 'vibe-algo__uf-p', { text: `→${i}` })
    );
    cells.push(cell);
    stage.append(cell);
  }
  function find(x) {
    while (parent[x] !== x) x = parent[x];
    return x;
  }
  function paint() {
    for (let i = 0; i < n; i++) {
      const r = find(i);
      cells[i].querySelector('.vibe-algo__uf-p').textContent = `→${parent[i]} (根${r})`;
      cells[i].style.setProperty('--uf', `hsl(${(r * 55) % 360} 70% 46%)`);
    }
  }
  paint();
  return { stage, parent, find, paint, cells };
}

async function runUf(uf, unions, speed, signal, log) {
  for (const [a, b] of unions) {
    const ra = uf.find(a);
    const rb = uf.find(b);
    uf.cells[a].classList.add('is-active');
    uf.cells[b].classList.add('is-active');
    log(`union(${a},${b})：根 ${ra} 与 ${rb}`);
    await sleep(speed, signal);
    if (ra !== rb) uf.parent[rb] = ra;
    uf.paint();
    await sleep(speed * 0.8, signal);
    for (const c of uf.cells) c.classList.remove('is-active');
  }
  log('并查集：连通分量用「代表元」合并');
}

function gdStage() {
  const stage = el('div', 'vibe-algo__gd');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 320 140');
  svg.classList.add('vibe-algo__gd-svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // f(x)=(x-1)^2 + 0.5 ，x in [-1,5] mapped to svg
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const x = -1 + (6 * i) / 40;
    const y = (x - 1) ** 2 + 0.5;
    const sx = 20 + ((x + 1) / 6) * 280;
    const sy = 120 - Math.min(y, 8) * 12;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  path.setAttribute('d', pts.join(' '));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('r', '5');
  dot.setAttribute('class', 'vibe-algo__gd-dot');
  svg.append(path, dot);
  stage.append(svg);
  function place(x) {
    const y = (x - 1) ** 2 + 0.5;
    const sx = 20 + ((x + 1) / 6) * 280;
    const sy = 120 - Math.min(y, 8) * 12;
    dot.setAttribute('cx', String(sx));
    dot.setAttribute('cy', String(sy));
  }
  return { stage, place, f: (x) => (x - 1) ** 2 + 0.5, df: (x) => 2 * (x - 1) };
}

async function runGd(gd, spec, speed, signal, log) {
  let x = Number(spec.start) || 4.5;
  const lr = Number(spec.lr) || 0.15;
  const steps = Number(spec.steps) || 16;
  gd.place(x);
  log(`梯度下降：x=${x.toFixed(2)}，沿 -∇f 走`);
  for (let i = 0; i < steps; i++) {
    const g = gd.df(x);
    x -= lr * g;
    gd.place(x);
    log(`步 ${i + 1}：∇≈${g.toFixed(2)} → x=${x.toFixed(3)} f=${gd.f(x).toFixed(3)}`);
    await sleep(speed * 0.85, signal);
  }
  log('极小值附近（开口朝上的抛物线）。神经网络训练同思路，只是参数更多。');
}

/**
 * @param {HTMLElement} host
 * @param {ReturnType<typeof parseAlgoSource>} cfg
 */
export function mountAlgoViz(host, cfg) {
  host.textContent = '';
  host.classList.add('vibe-algo');

  const root = el('div', 'vibe-algo__card');
  root.append(el('div', 'vibe-algo__title', { text: cfg.title }));
  if (cfg.caption) root.append(el('p', 'vibe-algo__caption', { text: cfg.caption }));

  const logEl = el('div', 'vibe-algo__log', { text: '准备…' });
  const controls = el('div', 'vibe-algo__controls');
  const btn = el('button', 'vibe-algo__btn', { type: 'button', text: '播放' });
  controls.append(btn);

  const kind = cfg.kind;
  let stageWrap = el('div', 'vibe-algo__stage');
  /** @type {AbortController | null} */
  let ac = null;

  const log = (msg) => {
    logEl.textContent = msg;
  };

  async function play() {
    ac?.abort();
    ac = new AbortController();
    const { signal } = ac;
    btn.disabled = true;
    btn.textContent = '播放中…';
    stageWrap.replaceChildren();
    try {
      const reduced = prefersReducedMotion();
      const speed = reduced ? 0 : cfg.speed;

      if (['bubble', 'insertion', 'selection', 'quick', 'binsearch', 'binary'].includes(kind)) {
        const arr = Array.isArray(cfg.data) ? cfg.data.map(Number) : [5, 2, 8, 1, 9, 3];
        const { stage, cells } = barStage(arr);
        stageWrap.append(stage);
        if (kind === 'bubble') await runBubble(cells, arr, speed, signal, log);
        else if (kind === 'insertion') await runInsertion(cells, arr, speed, signal, log);
        else if (kind === 'selection') await runSelection(cells, arr, speed, signal, log);
        else if (kind === 'quick') await runQuick(cells, arr, speed, signal, log);
        else await runBinary(cells, arr, speed, signal, log);
      } else if (kind === 'bfs' || kind === 'dfs') {
        const grid = gridStage(cfg.data && typeof cfg.data === 'object' ? cfg.data : {});
        stageWrap.append(grid.stage);
        if (kind === 'bfs') await runBfs(grid, speed, signal, log);
        else await runDfs(grid, speed, signal, log);
      } else if (kind === 'list' || kind === 'll-reverse') {
        const vals = Array.isArray(cfg.data) ? cfg.data : [1, 2, 3, 4, 5];
        const list = listStage(vals);
        stageWrap.append(list.stage);
        await runListReverse(list, speed, signal, log);
      } else if (kind === 'uf' || kind === 'union-find') {
        const spec = cfg.data && typeof cfg.data === 'object' ? cfg.data : { n: 6, unions: [] };
        const uf = ufStage(Number(spec.n) || 6);
        stageWrap.append(uf.stage);
        await runUf(uf, spec.unions || [], speed, signal, log);
      } else if (kind === 'gd' || kind === 'gradient') {
        const gd = gdStage();
        stageWrap.append(gd.stage);
        await runGd(gd, cfg.data || {}, speed, signal, log);
      } else if (kind === 'twopointer' || kind === 'window') {
        const arr = Array.isArray(cfg.data) ? cfg.data.map(Number) : [1, 2, 3, 4, 5, 6, 7];
        const { stage, cells } = barStage(arr);
        stageWrap.append(stage);
        let L = 0;
        let R = kind === 'window' ? 0 : arr.length - 1;
        if (kind === 'window') {
          log('滑窗：右扩左收');
          for (; R < arr.length; R++) {
            setBarState(cells, Array.from({ length: R - L + 1 }, (_, k) => L + k), 'is-active');
            log(`窗 [${L},${R}] 和=${arr.slice(L, R + 1).reduce((a, b) => a + b, 0)}`);
            await sleep(speed, signal);
            if (R - L + 1 > 3) L++;
          }
        } else {
          log('对撞双指针');
          while (L < R) {
            setBarState(cells, [L, R], 'is-active');
            log(`L=${L}(${arr[L]}) R=${R}(${arr[R]})`);
            await sleep(speed, signal);
            L++;
            R--;
          }
        }
        for (const c of cells) c.cell.classList.add('is-done');
        log('完成');
      } else {
        log(`未知 kind: ${kind}`);
      }
    } catch (e) {
      if (e?.name !== 'AbortError') log(String(e?.message || e));
    } finally {
      btn.disabled = false;
      btn.textContent = '重播';
    }
  }

  btn.addEventListener('click', () => {
    play();
  });

  root.append(stageWrap, logEl, controls);
  host.append(root);

  if (cfg.autoplay) {
    requestAnimationFrame(() => play());
  }

  return () => {
    ac?.abort();
    host.textContent = '';
  };
}

/**
 * 课文算法动画：```algo / ```viz / ```animate
 * 排序 / 图搜 / 调度 / 存储 / PATH / Git / 事件循环 / 双宿主 / TS 擦除 / TCP 握手 / DNS 解析 等
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
  const userObj = data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  if (!Array.isArray(data)) {
    if (kind === 'bfs' || kind === 'dfs') {
      data = {
        rows: 4,
        cols: 5,
        walls: [
          [1, 1],
          [1, 2],
          [2, 2],
        ],
        start: [0, 0],
        goal: [3, 4],
        ...userObj,
      };
    } else if (kind === 'list' || kind === 'll-reverse') {
      data = Array.isArray(data) ? data : [1, 2, 3, 4, 5];
    } else if (kind === 'uf' || kind === 'union-find') {
      data = { n: 6, unions: [[0, 1], [1, 2], [3, 4], [2, 3]], ...userObj };
    } else if (kind === 'gd' || kind === 'gradient') {
      data = { start: 4.5, lr: 0.15, steps: 18, ...userObj };
    } else if (kind === 'scheduler' || kind === 'rr' || kind === 'timeslice') {
      data = {
        quantum: 2,
        procs: [
          { id: 'A', burst: 5 },
          { id: 'B', burst: 3 },
          { id: 'C', burst: 4 },
        ],
        ...userObj,
      };
    } else if (kind === 'memhier' || kind === 'memory' || kind === 'hierarchy') {
      data = {
        levels: [
          { id: 'reg', name: '寄存器', lat: '~1 周期', size: '极小' },
          { id: 'cache', name: 'Cache', lat: '~数周期', size: 'KB～MB' },
          { id: 'ram', name: '内存 RAM', lat: '~百 ns', size: 'GB' },
          { id: 'disk', name: '磁盘', lat: '~μs～ms', size: 'TB' },
        ],
        ...userObj,
      };
    } else if (kind === 'pathfind' || kind === 'which' || kind === 'path') {
      data = {
        cmd: 'node',
        dirs: [
          { path: '/usr/local/bin', hit: false },
          { path: '/usr/bin', hit: true },
          { path: '/bin', hit: false },
        ],
        ...userObj,
      };
    } else if (kind === 'gitstage' || kind === 'git-areas' || kind === 'staging') {
      data = {
        files: [
          { name: 'app.js', mark: 'M' },
          { name: 'note.md', mark: '?' },
        ],
        commit: { hash: 'a1b2c3d', msg: 'feat: wire first run' },
        ...userObj,
      };
    } else if (kind === 'gitclone' || kind === 'clone') {
      data = {
        repo: 'XRK-AGT.git',
        fail: false,
        entries: ['.git/', 'package.json', 'pnpm-lock.yaml', 'src/', 'README.md'],
        ...userObj,
      };
    } else if (kind === 'gitbranch' || kind === 'branch' || kind === 'mergeviz') {
      data = {
        mode: 'merge',
        main: ['c0', 'c1', 'c2'],
        feat: ['f1', 'f2'],
        ...userObj,
      };
    } else if (kind === 'eventloop' || kind === 'eloop' || kind === 'microtask') {
      data = {
        steps: [
          { kind: 'sync', label: "console.log('A')" },
          { kind: 'macro', label: 'setTimeout → C' },
          { kind: 'micro', label: 'Promise.then → B' },
          { kind: 'sync', label: "console.log('D')" },
        ],
        output: ['A', 'D', 'B', 'C'],
        ...userObj,
      };
    } else if (kind === 'dualhost' || kind === 'hosts' || kind === 'runtime-split') {
      data = {
        apis: [
          { name: 'document.querySelector', browser: true, node: false },
          { name: 'fs.readFile', browser: false, node: true },
          { name: 'fetch', browser: true, node: true },
          { name: 'process.env', browser: false, node: true },
          { name: 'addEventListener', browser: true, node: false },
        ],
        ...userObj,
      };
    } else if (kind === 'tserase' || kind === 'tsc' || kind === 'typestrip') {
      data = {
        source: 'function add(a: number, b: number): number',
        erased: 'function add(a, b)',
        run: 'node add.js → 3',
        ...userObj,
      };
    } else if (kind === 'tcphandshake' || kind === 'tcp3way' || kind === 'synack') {
      data = {
        client: '浏览器',
        server: '服务器 :443',
        ...userObj,
      };
    } else if (kind === 'dnsresolve' || kind === 'dns' || kind === 'lookup') {
      data = {
        qname: 'api.example.com',
        answer: '203.0.113.10',
        ...userObj,
      };
    } else if (kind === 'revproxy' || kind === 'rproxy' || kind === 'proxyflow') {
      data = {
        mode: 'ok', // ok | fail
        client: '浏览器',
        proxy: '反向代理 / Nginx',
        upstream: '127.0.0.1:8080 Node',
        ...userObj,
      };
    } else if (kind === 'proxyroute' || kind === 'fwdproxy' || kind === 'clashroute') {
      data = {
        mode: 'proxy', // proxy | direct
        dest: 'github.com',
        rule: 'DOMAIN-SUFFIX,github.com,PROXY',
        ...userObj,
      };
    } else if (kind === 'xrklayers' || kind === 'xrkflow' || kind === 'corelayers') {
      data = {
        mode: 'http', // http | plugin | sub
        ...userObj,
      };
    } else if (kind === 'httpresp' || kind === 'httpshape' || kind === 'unwrap') {
      data = {
        mode: 'object', // object | array
        ...userObj,
      };
    } else if (kind === 'msgpipe' || kind === 'assemble' || kind === 'chatpipe') {
      data = {
        mode: 'ok',
        ...userObj,
      };
    } else if (kind === 'taskerflow' || kind === 'channel' || kind === 'e-flow') {
      data = { ...userObj };
    } else if (kind === 'authgate' || kind === 'apikey' || kind === 'gate') {
      data = {
        mode: 'ok', // ok | fail | loopback
        ...userObj,
      };
    } else if (kind === 'toolloop' || kind === 'mcploop' || kind === 'agentloop') {
      data = {
        rounds: 2,
        ...userObj,
      };
    } else if (kind === 'dbtier' || kind === 'redisql' || kind === 'hotdisk') {
      data = { ...userObj };
    } else if (kind === 'wsfive' || kind === 'workspace' || kind === 'inject5') {
      data = { ...userObj };
    } else if (data == null) {
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

/** 归并：先分后合；稳定；额外 O(n) 空间（演示用辅助数组写出） */
async function runMerge(cells, values, speed, signal, log) {
  const a = values.slice();
  async function merge(lo, mid, hi) {
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    log(`合并 [${lo}..${mid}] 与 [${mid + 1}..${hi}]`);
    setBarState(
      cells,
      Array.from({ length: hi - lo + 1 }, (_, k) => lo + k),
      'is-active'
    );
    await sleep(speed * 0.6, signal);
    let i = 0;
    let j = 0;
    let k = lo;
    while (i < left.length && j < right.length) {
      setBarState(cells, [k], 'is-pivot');
      await sleep(speed * 0.55, signal);
      if (left[i] <= right[j]) {
        a[k] = left[i++];
      } else {
        a[k] = right[j++];
      }
      syncBars(cells, a);
      k++;
    }
    while (i < left.length) {
      a[k++] = left[i++];
      syncBars(cells, a);
      await sleep(speed * 0.4, signal);
    }
    while (j < right.length) {
      a[k++] = right[j++];
      syncBars(cells, a);
      await sleep(speed * 0.4, signal);
    }
  }
  async function sort(lo, hi) {
    if (lo >= hi) return;
    const mid = (lo + hi) >> 1;
    log(`划分 [${lo}..${hi}] → mid=${mid}`);
    setBarState(cells, [lo, mid, hi], 'is-active');
    await sleep(speed * 0.5, signal);
    await sort(lo, mid);
    await sort(mid + 1, hi);
    await merge(lo, mid, hi);
  }
  await sort(0, a.length - 1);
  for (const c of cells) {
    c.cell.classList.remove('is-dim', 'is-active', 'is-pivot');
    c.cell.classList.add('is-done');
  }
  log('归并完成：稳定、最坏也是 n log n；代价是额外空间');
  return a;
}

/** 堆排：建大顶堆 → 反复把堆顶换到末尾并下沉 */
async function runHeap(cells, values, speed, signal, log) {
  const a = values.slice();
  const n = a.length;

  async function siftDown(i, heapSize) {
    for (;;) {
      let largest = i;
      const l = i * 2 + 1;
      const r = i * 2 + 2;
      if (l < heapSize && a[l] > a[largest]) largest = l;
      if (r < heapSize && a[r] > a[largest]) largest = r;
      setBarState(cells, [i, l < heapSize ? l : i, r < heapSize ? r : i], 'is-active');
      await sleep(speed * 0.45, signal);
      if (largest === i) break;
      [a[i], a[largest]] = [a[largest], a[i]];
      syncBars(cells, a);
      log(`下沉：${a[largest]} ↔ ${a[i]}（堆序）`);
      await sleep(speed * 0.5, signal);
      i = largest;
    }
  }

  log('建堆：从最后一个非叶节点向上 siftDown');
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    cells[i]?.cell.classList.add('is-pivot');
    await siftDown(i, n);
    cells[i]?.cell.classList.remove('is-pivot');
  }
  log('大顶堆就绪：根是最大');

  for (let end = n - 1; end > 0; end--) {
    setBarState(cells, [0, end], 'is-pivot');
    log(`取出堆顶 ${a[0]} → 位置 ${end}`);
    await sleep(speed * 0.55, signal);
    [a[0], a[end]] = [a[end], a[0]];
    syncBars(cells, a);
    cells[end]?.cell.classList.add('is-done');
    await siftDown(0, end);
  }
  cells[0]?.cell.classList.add('is-done');
  for (const c of cells) {
    c.cell.classList.remove('is-dim', 'is-active', 'is-pivot');
    c.cell.classList.add('is-done');
  }
  log('堆排完成：原地 n log n，通常不稳定');
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

/** 轮转调度：时间片轮流占用 CPU（OSTEP「虚拟化 CPU」直觉） */
function schedulerStage(procs) {
  const stage = el('div', 'vibe-algo__sched');
  const cpu = el('div', 'vibe-algo__sched-cpu', { text: 'CPU · 空闲' });
  const lanes = el('div', 'vibe-algo__sched-lanes');
  const cells = procs.map((p) => {
    const row = el('div', 'vibe-algo__sched-row');
    const lab = el('span', 'vibe-algo__sched-lab', { text: `进程 ${p.id}` });
    const track = el('div', 'vibe-algo__sched-track');
    const fill = el('div', 'vibe-algo__sched-fill');
    fill.style.width = '0%';
    track.append(fill);
    const rem = el('span', 'vibe-algo__sched-rem', { text: `剩余 ${p.burst}` });
    row.append(lab, track, rem);
    lanes.append(row);
    return { ...p, left: p.burst, row, fill, rem };
  });
  stage.append(cpu, lanes);
  return { stage, cpu, cells };
}

async function runScheduler(sched, spec, speed, signal, log) {
  const quantum = Math.max(1, Number(spec.quantum) || 2);
  const cells = sched.cells.map((c) => ({ ...c, left: c.burst }));
  const total = cells.reduce((s, c) => s + c.burst, 0);
  let done = 0;
  let t = 0;
  const q = cells.map((_, i) => i);
  log(`轮转（RR）：时间片=${quantum}；多进程「同时」推进靠时间共享`);
  while (q.length) {
    const i = q.shift();
    const p = cells[i];
    if (p.left <= 0) continue;
    const slice = Math.min(quantum, p.left);
    for (const c of cells) c.row.classList.remove('is-active', 'is-done');
    p.row.classList.add('is-active');
    sched.cpu.textContent = `CPU · 跑 ${p.id}（本片 ${slice}）`;
    log(`t=${t}：调度 ${p.id}，用掉时间片 ${slice}（剩余将 ${p.left - slice}）`);
    for (let s = 0; s < slice; s++) {
      p.left -= 1;
      done += 1;
      t += 1;
      const pct = ((p.burst - p.left) / p.burst) * 100;
      p.fill.style.width = `${pct}%`;
      p.rem.textContent = p.left > 0 ? `剩余 ${p.left}` : '完成';
      await sleep(speed * 0.55, signal);
    }
    if (p.left > 0) {
      q.push(i);
      p.row.classList.remove('is-active');
    } else {
      p.row.classList.add('is-done');
      p.row.classList.remove('is-active');
      log(`进程 ${p.id} 跑完`);
    }
    await sleep(speed * 0.35, signal);
  }
  sched.cpu.textContent = 'CPU · 空闲';
  log(`全部完成（共 ${total} 单位时间）。这就是「虚拟化 CPU」：每进程以为独占，内核在切。`);
}

/** 存储层次：由近到远点亮，强调延迟与容量权衡 */
function memHierStage(levels) {
  const stage = el('div', 'vibe-algo__mem');
  const cells = levels.map((lv, i) => {
    const row = el('div', 'vibe-algo__mem-row');
    row.style.setProperty('--mem-w', `${42 + i * 18}%`);
    row.append(
      el('span', 'vibe-algo__mem-name', { text: lv.name }),
      el('span', 'vibe-algo__mem-meta', { text: `${lv.lat} · ${lv.size}` })
    );
    stage.append(row);
    return { ...lv, row };
  });
  return { stage, cells };
}

async function runMemHier(mem, speed, signal, log) {
  log('存储层次：越靠近 CPU 越快、越小、越贵');
  for (const c of mem.cells) {
    for (const x of mem.cells) x.row.classList.remove('is-active');
    c.row.classList.add('is-active');
    log(`${c.name}：延迟 ${c.lat}，容量 ${c.size}`);
    await sleep(speed, signal);
  }
  for (const c of mem.cells) c.row.classList.add('is-done');
  log('局部性好 → 多数访问落在上层；缺页/冷启动会掉到磁盘层');
}

/** PATH 查找：从左到右扫目录，命中第一个同名可执行文件 */
function pathFindStage(dirs, cmd) {
  const stage = el('div', 'vibe-algo__path');
  stage.append(el('div', 'vibe-algo__path-cmd', { text: `查找：${cmd}` }));
  const list = el('div', 'vibe-algo__path-list');
  const cells = dirs.map((d, i) => {
    const row = el('div', 'vibe-algo__path-row');
    row.append(
      el('span', 'vibe-algo__path-idx', { text: String(i + 1) }),
      el('code', 'vibe-algo__path-dir', { text: d.path })
    );
    list.append(row);
    return { ...d, row };
  });
  stage.append(list);
  return { stage, cells, cmd };
}

async function runPathFind(pf, speed, signal, log) {
  log(`Shell 按 PATH 顺序找「${pf.cmd}」——先到先得`);
  let found = null;
  for (const c of pf.cells) {
    for (const x of pf.cells) x.row.classList.remove('is-active', 'is-miss', 'is-hit');
    c.row.classList.add('is-active');
    log(`检查 ${c.path} …`);
    await sleep(speed, signal);
    if (c.hit && !found) {
      c.row.classList.add('is-hit');
      found = c.path;
      log(`命中：${c.path}/${pf.cmd}（后面的目录不再看）`);
      await sleep(speed * 1.1, signal);
      break;
    }
    c.row.classList.add('is-miss');
    log(`${c.path} 没有 ${pf.cmd}`);
    await sleep(speed * 0.7, signal);
  }
  if (!found) log('整条 PATH 都没有 → command not found / 不是内部或外部命令');
  else log(`最终跑的是这一份。换 PATH 顺序 = 可能换到另一份同名程序。`);
}

/** Git 三区模拟：脏文件 → add → commit 芯片 → push */
function gitStageStage(files) {
  const stage = el('div', 'vibe-algo__git');
  const cmd = el('div', 'vibe-algo__git-cmd', { text: '$ git status' });
  const row = el('div', 'vibe-algo__git-row');
  const areas = [
    { id: 'work', title: '工作区', hint: '正在改' },
    { id: 'stage', title: '暂存区', hint: 'git add' },
    { id: 'local', title: '本地仓库', hint: '.git' },
    { id: 'remote', title: '远程 origin', hint: 'push/pull' },
  ];
  /** @type {Record<string, { box: HTMLElement, slot: HTMLElement }>} */
  const cells = {};
  for (const a of areas) {
    const box = el('div', 'vibe-algo__git-box', { 'data-area': a.id });
    const head = el('div', 'vibe-algo__git-head');
    head.append(
      el('div', 'vibe-algo__git-title', { text: a.title }),
      el('div', 'vibe-algo__git-hint', { text: a.hint })
    );
    const slot = el('div', 'vibe-algo__git-slot');
    box.append(head, slot);
    row.append(box);
    cells[a.id] = { box, slot };
  }
  // arrows between
  const rail = el('div', 'vibe-algo__git-rail');
  for (let i = 0; i < 3; i++) {
    rail.append(el('span', 'vibe-algo__git-arrow', { text: '→' }));
  }
  stage.append(cmd, row, rail);

  const chips = files.map((f) => {
    const chip = el('div', 'vibe-algo__git-file');
    chip.append(
      el('span', `vibe-algo__git-mark is-${f.mark === '?' ? 'untracked' : 'modified'}`, {
        text: f.mark || 'M',
      }),
      el('span', 'vibe-algo__git-fname', { text: f.name })
    );
    return { ...f, chip };
  });

  return { stage, cells, chips, cmd };
}

function setGitCmd(gs, text) {
  gs.cmd.textContent = text;
}

function highlightGitArea(gs, id) {
  for (const [k, c] of Object.entries(gs.cells)) {
    c.box.classList.toggle('is-active', k === id);
  }
}

async function runGitStage(gs, spec, speed, signal, log) {
  const commit = spec.commit || { hash: 'a1b2c3d', msg: 'feat: wire first run' };
  // reset
  for (const c of Object.values(gs.cells)) {
    c.box.classList.remove('is-active', 'is-done', 'is-pulse');
    c.slot.replaceChildren();
  }
  setGitCmd(gs, '$ # 工作区有未提交改动');
  highlightGitArea(gs, 'work');
  for (const f of gs.chips) gs.cells.work.slot.append(f.chip);
  log('工作区：M=已跟踪改动，?=未跟踪新文件');
  await sleep(speed, signal);

  setGitCmd(gs, '$ git add app.js');
  highlightGitArea(gs, 'stage');
  const first = gs.chips[0];
  if (first) {
    first.chip.classList.add('is-moving');
    gs.cells.stage.slot.append(first.chip);
    first.chip.classList.remove('is-moving');
    first.chip.querySelector('.vibe-algo__git-mark')?.classList.add('is-staged');
    const mark = first.chip.querySelector('.vibe-algo__git-mark');
    if (mark) mark.textContent = 'A';
  }
  log('git add：只把选中文件放进暂存「购物车」（note.md 仍留在工作区）');
  await sleep(speed * 1.1, signal);

  setGitCmd(gs, `$ git commit -m "${commit.msg}"`);
  highlightGitArea(gs, 'local');
  gs.cells.stage.slot.replaceChildren();
  const card = el('div', 'vibe-algo__git-commit');
  card.append(
    el('code', 'vibe-algo__git-hash', { text: String(commit.hash).slice(0, 7) }),
    el('span', 'vibe-algo__git-msg', { text: commit.msg })
  );
  gs.cells.local.slot.append(card);
  gs.cells.local.box.classList.add('is-pulse');
  log('git commit：暂存清空，本地仓库多了一个不可变快照');
  await sleep(speed * 1.15, signal);
  gs.cells.local.box.classList.remove('is-pulse');

  setGitCmd(gs, '$ git push -u origin HEAD');
  highlightGitArea(gs, 'remote');
  const remoteCard = card.cloneNode(true);
  remoteCard.classList.add('is-remote');
  gs.cells.remote.slot.append(remoteCard);
  gs.cells.remote.box.classList.add('is-done');
  gs.cells.local.box.classList.add('is-done');
  log('git push：把本地提交上传到 origin；网页上才看得到 PR 入口');
  await sleep(speed * 0.9, signal);

  for (const c of Object.values(gs.cells)) c.box.classList.remove('is-active');
  setGitCmd(gs, '$ # 完成：工作区仍可能有未 add 的文件');
  log('口诀：改 → add → commit → push。没 add 的文件不会进提交。');
}

/** clone 落盘：远程对象 → 本地目录树（可演示失败） */
function gitCloneStage(spec) {
  const stage = el('div', 'vibe-algo__clone');
  const remote = el('div', 'vibe-algo__clone-remote');
  remote.append(
    el('div', 'vibe-algo__clone-cloud', { text: '☁ 远程' }),
    el('code', 'vibe-algo__clone-repo', { text: spec.repo || 'XRK-AGT.git' })
  );
  const pipe = el('div', 'vibe-algo__clone-pipe');
  const bar = el('div', 'vibe-algo__clone-bar');
  const fill = el('div', 'vibe-algo__clone-fill');
  bar.append(fill);
  const pct = el('div', 'vibe-algo__clone-pct', { text: '等待 clone…' });
  pipe.append(bar, pct);

  const local = el('div', 'vibe-algo__clone-local');
  local.append(el('div', 'vibe-algo__clone-disk', { text: '本地磁盘' }));
  const tree = el('div', 'vibe-algo__clone-tree');
  local.append(tree);

  stage.append(remote, pipe, local);
  return { stage, fill, pct, tree, remote, local, entries: spec.entries || [] };
}

async function runGitClone(cl, spec, speed, signal, log) {
  const fail = Boolean(spec.fail);
  cl.fill.style.width = '0%';
  cl.pct.textContent = fail ? 'Connecting github.com:443…' : 'Counting objects…';
  cl.tree.replaceChildren();
  cl.remote.classList.add('is-active');
  cl.local.classList.remove('is-ok', 'is-fail');
  log(fail ? '国内直连：TCP/TLS 建连中…' : '开始从远程拉取对象');
  await sleep(speed * 0.7, signal);

  if (fail) {
    for (const p of [8, 12, 12]) {
      cl.fill.style.width = `${p}%`;
      cl.fill.classList.add('is-stuck');
      cl.pct.textContent = `Failed after ${21000 + p * 10} ms`;
      await sleep(speed * 0.55, signal);
    }
    cl.local.classList.add('is-fail');
    cl.pct.textContent = 'fatal: Could not connect to server';
    cl.tree.append(
      el('div', 'vibe-algo__clone-err', {
        text: '不是 Git 坏了 → 代理 / 镜像 / ghproxy（见部署环境）',
      })
    );
    log('典型失败：连不上 443。对策在会话代理，不在重装 Git');
    return;
  }

  cl.fill.classList.remove('is-stuck');
  for (let p = 0; p <= 100; p += 20) {
    cl.fill.style.width = `${p}%`;
    cl.pct.textContent =
      p < 40 ? `Receiving objects ${p}%` : p < 80 ? `Resolving deltas ${p}%` : `Checking out ${p}%`;
    await sleep(speed * 0.4, signal);
  }
  cl.remote.classList.remove('is-active');
  cl.local.classList.add('is-ok');
  cl.pct.textContent = 'clone 完成 · 认仓库根';
  log('对象落盘：先有 .git，再检出工作区文件');
  const root = el('div', 'vibe-algo__clone-root', { text: 'XRK-AGT/' });
  cl.tree.append(root);
  for (const name of cl.entries) {
    const line = el('div', 'vibe-algo__clone-entry is-enter', { text: `  ${name}` });
    if (String(name).includes('package.json')) line.classList.add('is-key');
    cl.tree.append(line);
    await sleep(speed * 0.35, signal);
  }
  log('能看见根 package.json 的目录 = pnpm install 的正确位置');
}

/** 分支合流：main / feat 时间线，merge 或 conflict */
function gitBranchStage(spec) {
  const stage = el('div', 'vibe-algo__branch');
  const legend = el('div', 'vibe-algo__branch-legend');
  legend.append(
    el('span', 'is-main', { text: 'main' }),
    el('span', 'is-feat', { text: 'feat/*' })
  );
  const lanes = el('div', 'vibe-algo__branch-lanes');

  function makeLane(cls, label, commits) {
    const lane = el('div', `vibe-algo__branch-lane ${cls}`);
    lane.append(el('div', 'vibe-algo__branch-lab', { text: label }));
    const track = el('div', 'vibe-algo__branch-track');
    const nodes = (commits || []).map((id, i) => {
      const n = el('div', 'vibe-algo__branch-node', { text: String(id).slice(0, 2), title: id });
      if (i === 0) n.classList.add('is-base');
      track.append(n);
      if (i < commits.length - 1) track.append(el('div', 'vibe-algo__branch-edge'));
      return n;
    });
    lane.append(track);
    return { lane, track, nodes };
  }

  const main = makeLane('is-main', 'main', spec.main || ['c0', 'c1', 'c2']);
  const feat = makeLane('is-feat', 'feat/lab', spec.feat || ['f1', 'f2']);
  lanes.append(main.lane, feat.lane);
  const banner = el('div', 'vibe-algo__branch-banner', { text: '准备合并…' });
  stage.append(legend, lanes, banner);
  return { stage, main, feat, banner };
}

async function runGitBranch(br, spec, speed, signal, log) {
  const mode = String(spec.mode || 'merge').toLowerCase();
  br.banner.textContent = 'git switch -c feat/lab';
  br.feat.lane.classList.add('is-active');
  log('从 main 拉出平行时间线：实验不直接搅主线');
  await sleep(speed, signal);

  for (const n of br.feat.nodes) {
    n.classList.add('is-glow');
    await sleep(speed * 0.45, signal);
  }
  br.banner.textContent = '在 feat 上 commit ×2';
  log('小步提交：每点都是可回滚快照');
  await sleep(speed, signal);

  if (mode === 'conflict') {
    br.banner.textContent = 'merge 冲突！';
    br.banner.classList.add('is-conflict');
    br.main.nodes.at(-1)?.classList.add('is-conflict');
    br.feat.nodes.at(-1)?.classList.add('is-conflict');
    log('两边改了同一行 → <<<<<<< / ======= / >>>>>>> 要人工选留');
    await sleep(speed * 1.2, signal);
    br.banner.textContent = '改文件 → git add → commit 完成合并';
    br.banner.classList.remove('is-conflict');
    br.banner.classList.add('is-ok');
    log('冲突不是「Git 坏了」，是协作同时改同一处');
    return;
  }

  br.banner.textContent = 'git merge feat/lab → main';
  br.main.lane.classList.add('is-active');
  const mergeNode = el('div', 'vibe-algo__branch-node is-merge', { text: 'M' });
  br.main.track.append(el('div', 'vibe-algo__branch-edge'), mergeNode);
  await sleep(speed * 0.6, signal);
  mergeNode.classList.add('is-glow');
  br.feat.lane.classList.add('is-merged');
  br.banner.classList.add('is-ok');
  br.banner.textContent = '合并完成 · 可开 PR 再合（远程同理）';
  log('本地 merge 与网页 PR：心智相同，PR 多了审查与 CI 门禁');
}

/** 事件循环：同步栈 → 微任务 → 宏任务（MDN 执行模型直觉） */
function eventLoopStage() {
  const stage = el('div', 'vibe-algo__eloop');
  const stack = el('div', 'vibe-algo__eloop-col');
  stack.append(el('div', 'vibe-algo__eloop-h', { text: '调用栈' }));
  const stackBody = el('div', 'vibe-algo__eloop-body vibe-algo__eloop-stack');
  stack.append(stackBody);
  const micro = el('div', 'vibe-algo__eloop-col');
  micro.append(el('div', 'vibe-algo__eloop-h', { text: '微任务' }));
  const microBody = el('div', 'vibe-algo__eloop-body');
  micro.append(microBody);
  const macro = el('div', 'vibe-algo__eloop-col');
  macro.append(el('div', 'vibe-algo__eloop-h', { text: '宏任务' }));
  const macroBody = el('div', 'vibe-algo__eloop-body');
  macro.append(macroBody);
  const out = el('div', 'vibe-algo__eloop-out');
  out.append(el('span', 'vibe-algo__eloop-out-lab', { text: '输出' }));
  const outBody = el('div', 'vibe-algo__eloop-out-body');
  out.append(outBody);
  stage.append(stack, micro, macro, out);
  return { stage, stackBody, microBody, macroBody, outBody };
}

async function runEventLoop(ui, spec, speed, signal, log) {
  const steps = Array.isArray(spec.steps) ? spec.steps : [];
  const expected = Array.isArray(spec.output) ? spec.output.map(String) : [];
  ui.stackBody.replaceChildren();
  ui.microBody.replaceChildren();
  ui.macroBody.replaceChildren();
  ui.outBody.replaceChildren();
  log('先跑完当前同步代码；再清空微任务；再取一个宏任务（如 setTimeout）');
  await sleep(speed * 0.5, signal);

  for (const step of steps) {
    const kind = String(step.kind || 'sync');
    const label = String(step.label || '?');
    if (kind === 'sync') {
      const chip = el('div', 'vibe-algo__eloop-chip is-active', { text: label });
      ui.stackBody.append(chip);
      log(`同步：${label}`);
      await sleep(speed, signal);
      if (/console\.log\(['"](.)['"]\)/.test(label)) {
        const m = label.match(/console\.log\(['"](.)['"]\)/);
        if (m) ui.outBody.append(el('span', 'vibe-algo__eloop-token', { text: m[1] }));
      }
      chip.classList.remove('is-active');
      chip.classList.add('is-done');
      await sleep(speed * 0.35, signal);
      chip.remove();
    } else if (kind === 'micro') {
      const chip = el('div', 'vibe-algo__eloop-chip is-micro', { text: label });
      ui.microBody.append(chip);
      log(`入队微任务：${label}`);
      await sleep(speed * 0.85, signal);
    } else if (kind === 'macro') {
      const chip = el('div', 'vibe-algo__eloop-chip is-macro', { text: label });
      ui.macroBody.append(chip);
      log(`入队宏任务：${label}`);
      await sleep(speed * 0.85, signal);
    }
  }

  log('同步栈空 → 排空微任务');
  await sleep(speed * 0.5, signal);
  while (ui.microBody.firstChild) {
    const chip = ui.microBody.firstChild;
    chip.classList.add('is-active');
    log(`跑微任务：${chip.textContent}`);
    await sleep(speed, signal);
    ui.outBody.append(el('span', 'vibe-algo__eloop-token', { text: 'B' }));
    chip.remove();
  }

  log('取一个宏任务');
  await sleep(speed * 0.45, signal);
  if (ui.macroBody.firstChild) {
    const chip = ui.macroBody.firstChild;
    chip.classList.add('is-active');
    ui.stackBody.append(chip);
    log(`跑宏任务：${chip.textContent}`);
    await sleep(speed, signal);
    ui.outBody.append(el('span', 'vibe-algo__eloop-token', { text: 'C' }));
    chip.remove();
  }

  const got = [...ui.outBody.querySelectorAll('.vibe-algo__eloop-token')].map((n) => n.textContent);
  if (expected.length) {
    log(`输出顺序 ${got.join(' → ')}（期望 ${expected.join(' → ')}）。忘了 await 时，变量还是 Promise 收据。`);
  } else {
    log(`输出顺序 ${got.join(' → ')}`);
  }
}

/** 双宿主：同一门 JS，浏览器 / Node API 不同 */
function dualHostStage(apis) {
  const stage = el('div', 'vibe-algo__hosts');
  const head = el('div', 'vibe-algo__hosts-head');
  head.append(
    el('div', 'vibe-algo__hosts-h', { text: 'API' }),
    el('div', 'vibe-algo__hosts-h', { text: '浏览器' }),
    el('div', 'vibe-algo__hosts-h', { text: 'Node' })
  );
  stage.append(head);
  const rows = apis.map((a) => {
    const row = el('div', 'vibe-algo__hosts-row');
    const b = el('span', 'vibe-algo__hosts-cell', { text: a.browser ? '✓' : '✗' });
    const n = el('span', 'vibe-algo__hosts-cell', { text: a.node ? '✓' : '✗' });
    if (a.browser) b.classList.add('is-ok');
    else b.classList.add('is-no');
    if (a.node) n.classList.add('is-ok');
    else n.classList.add('is-no');
    row.append(el('code', 'vibe-algo__hosts-name', { text: a.name }), b, n);
    stage.append(row);
    return { ...a, row, b, n };
  });
  return { stage, rows };
}

async function runDualHost(ui, speed, signal, log) {
  log('语言都是 JavaScript；能不能用某 API 取决于宿主（浏览器 / Node）');
  for (const r of ui.rows) {
    for (const x of ui.rows) x.row.classList.remove('is-active');
    r.row.classList.add('is-active');
    const where = [
      r.browser ? '浏览器' : null,
      r.node ? 'Node' : null,
    ]
      .filter(Boolean)
      .join(' + ');
    log(`${r.name} → ${where || '两边都没有（演示外）'}`);
    await sleep(speed, signal);
  }
  for (const r of ui.rows) r.row.classList.add('is-done');
  log('本仓主服 = Node 宿主；www = 浏览器宿主。改码前先钉「在哪跑」。');
}

/** TS 类型擦除管线 */
function tsEraseStage(spec) {
  const stage = el('div', 'vibe-algo__tsc');
  const cards = [
    { id: 'src', title: 'TypeScript', body: spec.source },
    { id: 'strip', title: '类型擦除', body: 'interface / type 不进运行时' },
    { id: 'js', title: 'JavaScript', body: spec.erased },
    { id: 'run', title: '运行时', body: spec.run },
  ].map((c) => {
    const box = el('div', 'vibe-algo__tsc-box');
    box.append(
      el('div', 'vibe-algo__tsc-title', { text: c.title }),
      el('code', 'vibe-algo__tsc-body', { text: c.body })
    );
    stage.append(box);
    return { ...c, box };
  });
  return { stage, cards };
}

async function runTsErase(ui, speed, signal, log) {
  log('TS 是开发期类型层；跑起来仍是 JS（Node / 浏览器）');
  for (const c of ui.cards) {
    for (const x of ui.cards) x.box.classList.remove('is-active', 'is-done');
    c.box.classList.add('is-active');
    log(`${c.title}：${c.body}`);
    await sleep(speed * 1.05, signal);
    c.box.classList.add('is-done');
  }
  log('本仓主服大量原生 JS；要类型时再上 tsc/打包——别把 TS 当成另一门运行时。');
}

/** TCP 三次握手：SYN → SYN-ACK → ACK（MDN Glossary） */
function tcpHandshakeStage(spec) {
  const stage = el('div', 'vibe-algo__tcp');
  const client = el('div', 'vibe-algo__tcp-host');
  client.append(
    el('div', 'vibe-algo__tcp-role', { text: String(spec.client || '客户端') }),
    el('div', 'vibe-algo__tcp-sock', { text: 'CLOSED → …' })
  );
  const mid = el('div', 'vibe-algo__tcp-wire');
  const pkt = el('div', 'vibe-algo__tcp-pkt', { text: '…' });
  mid.append(pkt);
  const server = el('div', 'vibe-algo__tcp-host');
  server.append(
    el('div', 'vibe-algo__tcp-role', { text: String(spec.server || '服务器') }),
    el('div', 'vibe-algo__tcp-sock', { text: 'LISTEN → …' })
  );
  stage.append(client, mid, server);
  return {
    stage,
    pkt,
    cSock: client.querySelector('.vibe-algo__tcp-sock'),
    sSock: server.querySelector('.vibe-algo__tcp-sock'),
    client,
    server,
  };
}

async function runTcpHandshake(ui, speed, signal, log) {
  const fly = async (label, dir) => {
    ui.pkt.textContent = label;
    ui.pkt.classList.remove('is-left', 'is-right', 'is-show');
    void ui.pkt.offsetWidth;
    ui.pkt.classList.add('is-show', dir === 'c2s' ? 'is-right' : 'is-left');
    await sleep(speed * 1.1, signal);
  };

  ui.cSock.textContent = 'CLOSED';
  ui.sSock.textContent = 'LISTEN';
  log('三次握手（MDN）：先协商，再传 HTTP/TLS 数据');
  await sleep(speed * 0.45, signal);

  ui.client.classList.add('is-active');
  ui.cSock.textContent = 'SYN_SENT';
  log('1. 客户端 → 服务器：SYN（Synchronize）');
  await fly('SYN', 'c2s');
  ui.client.classList.remove('is-active');

  ui.server.classList.add('is-active');
  ui.sSock.textContent = 'SYN_RCVD';
  log('2. 服务器 → 客户端：SYN-ACK');
  await fly('SYN-ACK', 's2c');
  ui.server.classList.remove('is-active');

  ui.client.classList.add('is-active');
  log('3. 客户端 → 服务器：ACK');
  await fly('ACK', 'c2s');
  ui.cSock.textContent = 'ESTABLISHED';
  ui.sSock.textContent = 'ESTABLISHED';
  ui.client.classList.add('is-done');
  ui.server.classList.add('is-done');
  ui.pkt.textContent = '已连通';
  ui.pkt.classList.add('is-done');
  log('连接建立。之后才是 TLS（若 HTTPS）与 HTTP 请求。握手失败 ≠ 401（那是应用层鉴权）。');
}

/** DNS 递归解析示意（Cloudflare Learning 八步压缩） */
function dnsResolveStage(spec) {
  const stage = el('div', 'vibe-algo__dns');
  stage.append(el('div', 'vibe-algo__dns-q', { text: `查询：${spec.qname || 'example.com'}` }));
  const steps = [
    { id: 'stub', name: '本机 / stub' },
    { id: 'recur', name: '递归解析器' },
    { id: 'root', name: '根 .' },
    { id: 'tld', name: 'TLD（如 .com）' },
    { id: 'auth', name: '权威 NS' },
  ].map((s) => {
    const row = el('div', 'vibe-algo__dns-row');
    row.append(el('span', 'vibe-algo__dns-name', { text: s.name }));
    stage.append(row);
    return { ...s, row };
  });
  const ans = el('div', 'vibe-algo__dns-ans', { text: '答案：…' });
  stage.append(ans);
  return { stage, steps, ans, qname: String(spec.qname || 'example.com'), answer: String(spec.answer || '203.0.113.10') };
}

async function runDnsResolve(ui, speed, signal, log) {
  log(`DNS：把「${ui.qname}」翻译成 IP（可缓存；TTL 未过期会跳步）`);
  const msgs = [
    '应用问本机 stub / 缓存',
    '递归解析器接手（常是运营商 / 1.1.1.1）',
    '问根：谁管这个 TLD？',
    '问 TLD：谁是该域名权威？',
    '问权威 NS：A/AAAA 记录是什么？',
  ];
  for (let i = 0; i < ui.steps.length; i++) {
    for (const s of ui.steps) s.row.classList.remove('is-active');
    ui.steps[i].row.classList.add('is-active');
    log(msgs[i] || ui.steps[i].name);
    await sleep(speed, signal);
    ui.steps[i].row.classList.add('is-done');
  }
  ui.ans.textContent = `答案：${ui.qname} → ${ui.answer}`;
  ui.ans.classList.add('is-hit');
  log(`拿到 IP 后才会 TCP 握手（常见 :443）。改 DNS 不立刻生效 → 先想缓存与 TTL。`);
}

/** 反向代理请求流：客户端 → 门面 → 上游（可演示 502） */
function revProxyStage(spec) {
  const stage = el('div', 'vibe-algo__rpx');
  const mk = (title, sub) => {
    const box = el('div', 'vibe-algo__rpx-box');
    box.append(
      el('div', 'vibe-algo__rpx-title', { text: title }),
      el('div', 'vibe-algo__rpx-sub', { text: sub })
    );
    return box;
  };
  const client = mk(String(spec.client || '客户端'), '只看见入口');
  const proxy = mk(String(spec.proxy || '反向代理'), 'TLS / 路由 / 健康检查');
  const up = mk(String(spec.upstream || '上游应用'), '业务进程');
  const arrow1 = el('div', 'vibe-algo__rpx-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__rpx-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__rpx-status', { text: '等待请求…' });
  stage.append(client, arrow1, proxy, arrow2, up, status);
  return { stage, client, proxy, up, arrow1, arrow2, status, mode: String(spec.mode || 'ok') };
}

async function runRevProxy(ui, speed, signal, log) {
  const clear = () => {
    for (const n of [ui.client, ui.proxy, ui.up]) n.classList.remove('is-active', 'is-done', 'is-fail');
    ui.arrow1.classList.remove('is-on');
    ui.arrow2.classList.remove('is-on');
  };
  clear();
  log('反向代理（Cloudflare Learning）：坐在源站前面；客户端通常无感');
  await sleep(speed * 0.45, signal);

  ui.client.classList.add('is-active');
  ui.status.textContent = '① 客户端 → 入口（常 443）';
  log('访客只连入口；源站真实 IP 可以藏在后面');
  await sleep(speed, signal);
  ui.arrow1.classList.add('is-on');
  ui.proxy.classList.add('is-active');
  ui.client.classList.remove('is-active');
  ui.client.classList.add('is-done');
  ui.status.textContent = '② 门面：选上游 / 卸 TLS / 写转发头';
  log('Nginx：proxy_pass + Host / X-Forwarded-For（见官方 Reverse Proxy 指南）');
  await sleep(speed * 1.1, signal);

  ui.arrow2.classList.add('is-on');
  ui.up.classList.add('is-active');
  ui.proxy.classList.remove('is-active');
  ui.proxy.classList.add('is-done');

  if (ui.mode === 'fail') {
    ui.up.classList.add('is-fail');
    ui.status.textContent = '③ 上游无响应 → 502 Bad Gateway';
    log('门面活着、上游挂了或超时：浏览器看到 502/504，不是业务自己 return 的 500');
    await sleep(speed * 1.2, signal);
    log('排障：先 curl 上游端口，再查 proxy_pass / 超时 / 健康检查');
  } else {
    ui.up.classList.add('is-done');
    ui.status.textContent = '③ 上游 200 → 门面回客户端';
    log('成功路径。CDN 是「全球分布式反代 + 缓存」的亲戚，可叠在更外侧');
    await sleep(speed, signal);
  }
}

/** 正向代理选路：应用 → 本机引擎 → DIRECT / 节点 */
function proxyRouteStage(spec) {
  const stage = el('div', 'vibe-algo__prx');
  const mk = (title, sub) => {
    const box = el('div', 'vibe-algo__prx-box');
    box.append(
      el('div', 'vibe-algo__prx-title', { text: title }),
      el('div', 'vibe-algo__prx-sub', { text: sub })
    );
    return box;
  };
  const app = mk('应用 / Agent', '想访问目标');
  const engine = mk('本机引擎 :端口', '规则 ≈ 应用层路由');
  const nextHop = mk('下一跳', 'DIRECT 或节点');
  const dest = mk(String(spec.dest || '目标站'), '真正要去的地方');
  const arrow1 = el('div', 'vibe-algo__prx-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__prx-arrow', { text: '→' });
  const arrow3 = el('div', 'vibe-algo__prx-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__prx-status', { text: '等待连接…' });
  const rule = el('div', 'vibe-algo__prx-rule', {
    text: String(spec.rule || 'DOMAIN-SUFFIX,…'),
  });
  stage.append(app, arrow1, engine, arrow2, nextHop, arrow3, dest, rule, status);
  return {
    stage,
    app,
    engine,
    nextHop,
    dest,
    arrow1,
    arrow2,
    arrow3,
    status,
    rule,
    mode: String(spec.mode || 'proxy'),
  };
}

async function runProxyRoute(ui, speed, signal, log) {
  const clear = () => {
    for (const n of [ui.app, ui.engine, ui.nextHop, ui.dest]) {
      n.classList.remove('is-active', 'is-done', 'is-proxy', 'is-direct');
    }
    for (const a of [ui.arrow1, ui.arrow2, ui.arrow3]) a.classList.remove('is-on');
  };
  clear();
  const viaProxy = ui.mode !== 'direct';
  log('正向代理（Clash 系）：靠近客户端；程序须连本机入口端口才会进引擎');
  await sleep(speed * 0.4, signal);

  ui.app.classList.add('is-active');
  ui.status.textContent = '① 应用连 127.0.0.1:mixed-port（系统代理或 HTTP_PROXY）';
  log('浏览器常吃系统代理；git / Agent 常只吃 HTTP(S)_PROXY');
  await sleep(speed, signal);

  ui.arrow1.classList.add('is-on');
  ui.engine.classList.add('is-active');
  ui.app.classList.remove('is-active');
  ui.app.classList.add('is-done');
  ui.status.textContent = '② 引擎查 rules（像查路由表）';
  log(`规则：${ui.rule.textContent}`);
  await sleep(speed * 1.15, signal);

  ui.arrow2.classList.add('is-on');
  ui.nextHop.classList.add('is-active');
  ui.engine.classList.remove('is-active');
  ui.engine.classList.add('is-done');

  if (viaProxy) {
    ui.nextHop.classList.add('is-proxy');
    ui.nextHop.querySelector('.vibe-algo__prx-title').textContent = '节点出口';
    ui.nextHop.querySelector('.vibe-algo__prx-sub').textContent = 'PROXY 组当前节点';
    ui.status.textContent = '③ 命中 PROXY → 先到远端跳板';
    log('对端看到的是节点出口 IP，不是你家宽（白名单要对出口池）');
  } else {
    ui.nextHop.classList.add('is-direct');
    ui.nextHop.querySelector('.vibe-algo__prx-title').textContent = 'DIRECT';
    ui.nextHop.querySelector('.vibe-algo__prx-sub').textContent = '家用网关出网';
    ui.status.textContent = '③ 命中 DIRECT → 不经节点';
    log('国内镜像 / 本机服务常见直连；NO_PROXY 也是直连名单');
  }
  await sleep(speed * 1.05, signal);

  ui.arrow3.classList.add('is-on');
  ui.dest.classList.add('is-active');
  ui.nextHop.classList.remove('is-active');
  ui.nextHop.classList.add('is-done');
  ui.dest.classList.add('is-done');
  ui.status.textContent = viaProxy
    ? '④ 经节点到达目标（HTTPS 仍是应用层）'
    : '④ 直连到达目标';
  log('引擎 listen ≠ 全机自动进代理；TUN 才是进阶截流');
  await sleep(speed, signal);
}

/** XRK 分层：入口 → Runtime → Core →（可选）子服 */
function xrkLayersStage(spec) {
  const stage = el('div', 'vibe-algo__xrk');
  const mk = (title, sub) => {
    const box = el('div', 'vibe-algo__xrk-box');
    box.append(
      el('div', 'vibe-algo__xrk-title', { text: title }),
      el('div', 'vibe-algo__xrk-sub', { text: sub })
    );
    return box;
  };
  const mode = String(spec.mode || 'http');
  const entry =
    mode === 'plugin'
      ? mk('通道 / Tasker', '造出事件 e')
      : mk('HTTP / www', '浏览器或 API 客户端');
  const rt = mk('AgentRuntime', 'src/ · Loader 舞台');
  const core =
    mode === 'plugin'
      ? mk('core/*/plugin', '业务插件')
      : mk('core/*/http|www', '业务 API / 静态');
  const extra =
    mode === 'sub'
      ? mk('subserver', 'callSubserver')
      : mk('（本路径止于 Core）', '短板再进子服');
  const arrow1 = el('div', 'vibe-algo__xrk-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__xrk-arrow', { text: '→' });
  const arrow3 = el('div', 'vibe-algo__xrk-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__xrk-status', { text: '等待请求…' });
  stage.append(entry, arrow1, rt, arrow2, core, arrow3, extra, status);
  return { stage, entry, rt, core, extra, arrow1, arrow2, arrow3, status, mode };
}

async function runXrkLayers(ui, speed, signal, log) {
  const clear = () => {
    for (const n of [ui.entry, ui.rt, ui.core, ui.extra]) {
      n.classList.remove('is-active', 'is-done', 'is-skip');
    }
    for (const a of [ui.arrow1, ui.arrow2, ui.arrow3]) a.classList.remove('is-on');
  };
  clear();
  log('XRK 三层：入口进 Runtime；业务在 Core；短板才 callSubserver');
  await sleep(speed * 0.4, signal);

  ui.entry.classList.add('is-active');
  ui.status.textContent =
    ui.mode === 'plugin' ? '① 通道收到消息 → Tasker 造 e' : '① 请求打到主服端口 / 路径';
  log('业务不要写进 src/；入口只负责送到舞台');
  await sleep(speed, signal);

  ui.arrow1.classList.add('is-on');
  ui.rt.classList.add('is-active');
  ui.entry.classList.remove('is-active');
  ui.entry.classList.add('is-done');
  ui.status.textContent = '② AgentRuntime：Loader 已挂上的扩展';
  log('裸名 AgentRuntime；配置须等 CommonConfigRegistry.load() 完成');
  await sleep(speed * 1.1, signal);

  ui.arrow2.classList.add('is-on');
  ui.core.classList.add('is-active');
  ui.rt.classList.remove('is-active');
  ui.rt.classList.add('is-done');
  ui.status.textContent =
    ui.mode === 'plugin' ? '③ Core 插件处理业务' : '③ Core http/www 处理业务';
  log('改产品能力：core/<名>-Core/ 对应子目录');
  await sleep(speed * 1.05, signal);

  ui.arrow3.classList.add('is-on');
  if (ui.mode === 'sub') {
    ui.extra.classList.add('is-active');
    ui.core.classList.remove('is-active');
    ui.core.classList.add('is-done');
    ui.status.textContent = '④ 主服 callSubserver → 多语言子进程';
    log('子服不是第二套业务入口；配置仍常在主服编辑');
    await sleep(speed, signal);
    ui.extra.classList.add('is-done');
  } else {
    ui.extra.classList.add('is-skip');
    ui.core.classList.remove('is-active');
    ui.core.classList.add('is-done');
    ui.status.textContent = '④ 本路径不经子服（需要语言生态能力再走）';
    log('禁区：业务不进 src/；独立产品 yaml 不进 config/default_config/');
    await sleep(speed, signal);
  }
}

/** HttpResponse.success 形状：对象拍平 vs 数组进 data */
function httpRespStage(spec) {
  const stage = el('div', 'vibe-algo__hr');
  const mode = String(spec.mode || 'object');
  const before = el('pre', 'vibe-algo__hr-code', {
    text:
      mode === 'array'
        ? 'success(res, [a, b, c])'
        : 'success(res, { assessments, webVersion })',
  });
  const arrow = el('div', 'vibe-algo__hr-arrow', { text: '→' });
  const after = el('pre', 'vibe-algo__hr-code vibe-algo__hr-code--out', {
    text: '…',
  });
  const tip = el('div', 'vibe-algo__hr-tip', { text: '等待变形…' });
  stage.append(before, arrow, after, tip);
  return { stage, before, after, arrow, tip, mode };
}

async function runHttpResp(ui, speed, signal, log) {
  ui.arrow.classList.remove('is-on');
  ui.after.classList.remove('is-done');
  ui.tip.textContent = 'HttpResponse.success（#utils/http-utils.js）';
  log('前端勿默认 return json.data 再读字段');
  await sleep(speed * 0.55, signal);
  ui.arrow.classList.add('is-on');
  await sleep(speed * 0.45, signal);
  if (ui.mode === 'array') {
    ui.after.textContent = '{\n  success: true,\n  message: "…",\n  data: [a, b, c]\n}';
    ui.tip.textContent = '数组 / 标量 / null → 放进 data';
    log('数组成功：顶层有 data；再读 data[i]');
  } else {
    ui.after.textContent =
      '{\n  success: true,\n  message: "…",\n  assessments,\n  webVersion\n}';
    ui.tip.textContent = '普通对象 → 字段拍平到顶层（没有统一 data 包）';
    log('对象成功：去掉 success/message 后直接读字段；写死 json.data.xxx 会取空');
  }
  ui.after.classList.add('is-done');
  await sleep(speed * 1.1, signal);
}

/** 对话管线：三层组装 → 出站压缩 */
function msgPipeStage() {
  const stage = el('div', 'vibe-algo__mp');
  const layers = [
    { id: 'sys', title: 'system', sub: '协议 · Workspace 五段' },
    { id: 'vol', title: '易变 user', sub: '时间 / 群角色' },
    { id: 'his', title: '历史块', sub: '笔录 + 工具痕迹' },
    { id: 'cur', title: '[当前消息]', sub: '本轮用户输入' },
  ].map((L) => {
    const box = el('div', 'vibe-algo__mp-layer');
    box.dataset.id = L.id;
    box.append(
      el('div', 'vibe-algo__mp-title', { text: L.title }),
      el('div', 'vibe-algo__mp-sub', { text: L.sub })
    );
    return box;
  });
  const out = el('div', 'vibe-algo__mp-out', { text: '出站：toolPair → compaction → trim' });
  const status = el('div', 'vibe-algo__mp-status', { text: '等待组装…' });
  for (const L of layers) stage.append(L);
  stage.append(out, status);
  return { stage, layers, out, status };
}

async function runMsgPipe(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.out.classList.remove('is-on');
  log('真源：docs/agent-context.md · assembleChatLlmMessages');
  await sleep(speed * 0.35, signal);
  const labels = [
    '① system：可缓存前缀，勿塞「当前时间」',
    '② 易变 user：时间/会话元数据独立一层',
    '③ 历史：笔录；可 keepFirst 保锚点',
    '④ 当前消息：本轮输入垫底',
  ];
  for (let i = 0; i < ui.layers.length; i++) {
    ui.layers[i].classList.add('is-active');
    ui.status.textContent = labels[i];
    log(labels[i]);
    await sleep(speed, signal);
    ui.layers[i].classList.remove('is-active');
    ui.layers[i].classList.add('is-done');
  }
  ui.out.classList.add('is-on');
  ui.status.textContent = '⑤ prepareOutboundMessages：省窗后再 callAI / 工具环';
  log('toolPair 不改持久历史；compaction 可摘要；contextWindow 裁尾部');
  await sleep(speed * 1.15, signal);
}

/** 老师级：通道造 e → 插件吃 e */
function taskerFlowStage() {
  const stage = el('div', 'vibe-algo__tf');
  const mk = (t, s) => {
    const b = el('div', 'vibe-algo__tf-box');
    b.append(el('div', 'vibe-algo__tf-title', { text: t }), el('div', 'vibe-algo__tf-sub', { text: s }));
    return b;
  };
  const a = mk('平台消息', 'QQ / stdin / OneBot…');
  const b = mk('Tasker', '拆包 → 统一事件 e');
  const c = mk('插件 / 总线', 'plugin 吃 e · events 横切');
  const d = mk('出站', 'e.reply · msgSegment');
  const arrows = [el('div', 'vibe-algo__tf-arrow', { text: '→' }), el('div', 'vibe-algo__tf-arrow', { text: '→' }), el('div', 'vibe-algo__tf-arrow', { text: '→' })];
  const status = el('div', 'vibe-algo__tf-status', { text: '想像：收发室拆快递…' });
  stage.append(a, arrows[0], b, arrows[1], c, arrows[2], d, status);
  return { stage, boxes: [a, b, c, d], arrows, status };
}

async function runTaskerFlow(ui, speed, signal, log) {
  for (const x of ui.boxes) x.classList.remove('is-active', 'is-done');
  for (const a of ui.arrows) a.classList.remove('is-on');
  log('口诀：通道造 e，插件吃 e，Listener 挂横切');
  const tips = [
    '① 平台推来一条消息（本机可用 stdin 假装）',
    '② Tasker 适配层：解协议，造出统一事件 e（含 e.bot）',
    '③ 总线交给 plugin 匹配指令；events 只做横切',
    '④ 回复走 e.reply / msgSegment——别在 Tasker 里写业务文案',
  ];
  for (let i = 0; i < ui.boxes.length; i++) {
    if (i > 0) ui.arrows[i - 1].classList.add('is-on');
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = tips[i];
    log(tips[i]);
    await sleep(speed, signal);
    ui.boxes[i].classList.remove('is-active');
    ui.boxes[i].classList.add('is-done');
  }
  ui.status.textContent = '换 IM 只改 Tasker；改 #指令 去 plugin/';
  await sleep(speed * 0.7, signal);
}

/** 老师级：API Key 门禁 */
function authGateStage(spec) {
  const stage = el('div', 'vibe-algo__ag');
  const req = el('div', 'vibe-algo__ag-box', {});
  req.append(
    el('div', 'vibe-algo__ag-title', { text: '请求 /api/…' }),
    el('div', 'vibe-algo__ag-sub', { text: '可能带 X-API-Key' })
  );
  const gate = el('div', 'vibe-algo__ag-gate', {});
  gate.append(
    el('div', 'vibe-algo__ag-title', { text: 'HttpApi 门禁' }),
    el('div', 'vibe-algo__ag-sub', { text: 'runtime-auth 比对' })
  );
  const out = el('div', 'vibe-algo__ag-box', {});
  out.append(
    el('div', 'vibe-algo__ag-title', { text: '结果' }),
    el('div', 'vibe-algo__ag-sub', { text: '…' })
  );
  const arrow1 = el('div', 'vibe-algo__ag-arrow', { text: '→' });
  const arrow2 = el('div', 'vibe-algo__ag-arrow', { text: '→' });
  const status = el('div', 'vibe-algo__ag-status', { text: '门还没敲…' });
  stage.append(req, arrow1, gate, arrow2, out, status);
  return { stage, req, gate, out, arrow1, arrow2, status, mode: String(spec.mode || 'ok') };
}

async function runAuthGate(ui, speed, signal, log) {
  for (const n of [ui.req, ui.gate, ui.out]) n.classList.remove('is-active', 'is-done', 'is-fail', 'is-pass');
  ui.arrow1.classList.remove('is-on');
  ui.arrow2.classList.remove('is-on');
  log('Server 不做全盘 /api 拒答；HttpApi 且 /api/ 时默认校验');
  ui.req.classList.add('is-active');
  ui.status.textContent = '① 请求进站（静态资源常直接放行）';
  await sleep(speed, signal);
  ui.arrow1.classList.add('is-on');
  ui.gate.classList.add('is-active');
  ui.req.classList.remove('is-active');
  ui.req.classList.add('is-done');
  ui.status.textContent = '② 门禁：比对 Key（timingSafeEqual）';
  log('头：X-API-Key 或 Authorization Bearer…');
  await sleep(speed * 1.1, signal);
  ui.arrow2.classList.add('is-on');
  ui.gate.classList.remove('is-active');
  ui.out.classList.add('is-active');
  const sub = ui.out.querySelector('.vibe-algo__ag-sub');
  if (ui.mode === 'fail') {
    ui.gate.classList.add('is-fail');
    ui.out.classList.add('is-fail');
    sub.textContent = '401 Unauthorized';
    ui.status.textContent = '③ Key 错 / 缺 → 401（进不了 handler）';
    log('审 Agent diff：别把 systemAuth 乱关');
  } else if (ui.mode === 'loopback') {
    ui.gate.classList.add('is-pass');
    ui.out.classList.add('is-pass');
    sub.textContent = 'loopback 常免鉴权 → handler';
    ui.status.textContent = '③ 127.0.0.1 常见免鉴权（危险工具开启时也会强制 Key）';
    log('内网 192.168.* 不会自动免鉴权');
  } else {
    ui.gate.classList.add('is-pass');
    ui.out.classList.add('is-pass');
    ui.gate.classList.add('is-done');
    sub.textContent = '通过 → handler';
    ui.status.textContent = '③ Key 对 → 业务 handler（HttpResponse）';
    log('公开接口：路由上显式 systemAuth: false');
  }
  await sleep(speed * 1.1, signal);
  ui.out.classList.add('is-done');
}

/** 老师级：模型 ↔ 工具环 */
function toolLoopStage() {
  const stage = el('div', 'vibe-algo__tl');
  const mk = (t, s) => {
    const b = el('div', 'vibe-algo__tl-box');
    b.append(el('div', 'vibe-algo__tl-title', { text: t }), el('div', 'vibe-algo__tl-sub', { text: s }));
    return b;
  };
  const model = mk('模型', 'Factory 取客户端');
  const call = mk('tool_calls', '想调哪些工具');
  const gate = mk('MCP 门禁', 'handleToolCall');
  const back = mk('回灌结果', '再问模型');
  const status = el('div', 'vibe-algo__tl-status', { text: '工具环还没转…' });
  stage.append(model, call, gate, back, status);
  return { stage, boxes: [model, call, gate, back], status };
}

async function runToolLoop(ui, speed, signal, log) {
  for (const b of ui.boxes) b.classList.remove('is-active', 'is-done', 'is-block');
  log('口诀：模型提议 ≠ 一定放行；门禁在 handleToolCall');
  const steps = [
    ['① 工作流经 Factory 调模型', 0],
    ['② 模型返回 tool_calls（想动手）', 1],
    ['③ MCP 门禁：策略 / 扫描 / 审批', 2],
    ['④ 结果回灌 messages，再调模型（可多轮）', 3],
  ];
  for (const [tip, i] of steps) {
    ui.boxes[i].classList.add('is-active');
    ui.status.textContent = tip;
    log(tip);
    await sleep(speed, signal);
    ui.boxes[i].classList.remove('is-active');
    ui.boxes[i].classList.add('is-done');
  }
  ui.status.textContent = '轮尽可 finalize：再发一轮无工具，把已有结果写成正文';
  log('工厂管「连哪个模型」；MCP 管「工具能不能真执行」');
  await sleep(speed * 0.9, signal);
}

/** 老师级：Redis 热 vs SQLite 盘 */
function dbTierStage() {
  const stage = el('div', 'vibe-algo__db');
  const hot = el('div', 'vibe-algo__db-lane vibe-algo__db-lane--hot');
  hot.append(
    el('div', 'vibe-algo__db-title', { text: 'Redis · 热数据' }),
    el('div', 'vibe-algo__db-sub', { text: '会话 · 计数 · 可过期' }),
    el('div', 'vibe-algo__db-badge', { text: '必需 · fail-fast' })
  );
  const disk = el('div', 'vibe-algo__db-lane vibe-algo__db-lane--disk');
  disk.append(
    el('div', 'vibe-algo__db-title', { text: 'SQLite · 落盘' }),
    el('div', 'vibe-algo__db-sub', { text: '本地持久 · 单机查询' }),
    el('div', 'vibe-algo__db-badge', { text: '必需 · 不替代 Redis' })
  );
  const opt = el('div', 'vibe-algo__db-opt', { text: '可选：Mongo / Postgres / Vector → 独立 Core' });
  const status = el('div', 'vibe-algo__db-status', { text: '启动先 ensure-redis…' });
  stage.append(hot, disk, opt, status);
  return { stage, hot, disk, opt, status };
}

async function runDbTier(ui, speed, signal, log) {
  ui.hot.classList.remove('is-active', 'is-done');
  ui.disk.classList.remove('is-active', 'is-done');
  ui.opt.classList.remove('is-on');
  log('真源 docs/database.md：跨引擎仅最终一致，无统一事务');
  ui.status.textContent = '① 启动探测 Redis——挂了就 fail-fast';
  ui.hot.classList.add('is-active');
  await sleep(speed, signal);
  ui.hot.classList.add('is-done');
  ui.status.textContent = '② 再挂 SQLite 全局——重启后还要的本地数据';
  ui.disk.classList.add('is-active');
  log('裸名 redis / sqlite；业务勿 import 再造实例');
  await sleep(speed, signal);
  ui.disk.classList.add('is-done');
  ui.opt.classList.add('is-on');
  ui.status.textContent = '③ 业务库走可选 Core；别把「会装 MySQL」说成本仓必需';
  await sleep(speed * 0.95, signal);
}

/** 老师级：办事工作区五段注入 */
function wsFiveStage() {
  const stage = el('div', 'vibe-algo__ws');
  const names = [
    ['assistant', 'AGENTS / SOUL / memory…'],
    ['contextFiles', '额外上下文文件'],
    ['rules', '共享护栏 ∪ 工作区覆盖'],
    ['Skills', '目录卡 · 按需 tools.read'],
    ['Agents', 'subagents 提示路由'],
  ];
  const layers = names.map(([t, s]) => {
    const b = el('div', 'vibe-algo__ws-layer');
    b.append(el('div', 'vibe-algo__ws-title', { text: t }), el('div', 'vibe-algo__ws-sub', { text: s }));
    return b;
  });
  const badge = el('div', 'vibe-algo__ws-badge', { text: '两张工牌：根 AGENTS（写代码）≠ 工作区 AGENTS（办事）' });
  const status = el('div', 'vibe-algo__ws-status', { text: '五段还没叠进 system…' });
  for (const L of layers) stage.append(L);
  stage.append(badge, status);
  return { stage, layers, badge, status };
}

async function runWsFive(ui, speed, signal, log) {
  for (const L of ui.layers) L.classList.remove('is-active', 'is-done');
  ui.badge.classList.remove('is-on');
  log('种子 agents/ → 运行时 data/ai-workspace/{id}/');
  for (let i = 0; i < ui.layers.length; i++) {
    ui.layers[i].classList.add('is-active');
    ui.status.textContent = `①–⑤ 叠进 system：第 ${i + 1} 段`;
    log(`注入第 ${i + 1} 段：${ui.layers[i].querySelector('.vibe-algo__ws-title').textContent}`);
    await sleep(speed * 0.85, signal);
    ui.layers[i].classList.remove('is-active');
    ui.layers[i].classList.add('is-done');
  }
  ui.badge.classList.add('is-on');
  ui.status.textContent = '戴错工牌：要么改坏 Runtime，要么办事助手不懂放码';
  await sleep(speed * 0.9, signal);
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

      if (['bubble', 'insertion', 'selection', 'quick', 'merge', 'heap', 'heapsort', 'binsearch', 'binary'].includes(kind)) {
        const arr = Array.isArray(cfg.data) ? cfg.data.map(Number) : [5, 2, 8, 1, 9, 3];
        const { stage, cells } = barStage(arr);
        stageWrap.append(stage);
        if (kind === 'bubble') await runBubble(cells, arr, speed, signal, log);
        else if (kind === 'insertion') await runInsertion(cells, arr, speed, signal, log);
        else if (kind === 'selection') await runSelection(cells, arr, speed, signal, log);
        else if (kind === 'quick') await runQuick(cells, arr, speed, signal, log);
        else if (kind === 'merge') await runMerge(cells, arr, speed, signal, log);
        else if (kind === 'heap' || kind === 'heapsort') await runHeap(cells, arr, speed, signal, log);
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
      } else if (kind === 'scheduler' || kind === 'rr' || kind === 'timeslice') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data)
            ? cfg.data
            : {
                quantum: 2,
                procs: [
                  { id: 'A', burst: 5 },
                  { id: 'B', burst: 3 },
                  { id: 'C', burst: 4 },
                ],
              };
        const procs = Array.isArray(spec.procs) ? spec.procs : [];
        const sched = schedulerStage(
          procs.length
            ? procs.map((p) => ({ id: String(p.id ?? '?'), burst: Math.max(1, Number(p.burst) || 1) }))
            : [
                { id: 'A', burst: 5 },
                { id: 'B', burst: 3 },
                { id: 'C', burst: 4 },
              ]
        );
        stageWrap.append(sched.stage);
        await runScheduler(sched, spec, speed, signal, log);
      } else if (kind === 'memhier' || kind === 'memory' || kind === 'hierarchy') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const levels = Array.isArray(spec.levels)
          ? spec.levels
          : [
              { id: 'reg', name: '寄存器', lat: '~1 周期', size: '极小' },
              { id: 'cache', name: 'Cache', lat: '~数周期', size: 'KB～MB' },
              { id: 'ram', name: '内存 RAM', lat: '~百 ns', size: 'GB' },
              { id: 'disk', name: '磁盘', lat: '~μs～ms', size: 'TB' },
            ];
        const mem = memHierStage(
          levels.map((lv) => ({
            id: String(lv.id ?? lv.name ?? ''),
            name: String(lv.name ?? lv.id ?? '?'),
            lat: String(lv.lat ?? '—'),
            size: String(lv.size ?? '—'),
          }))
        );
        stageWrap.append(mem.stage);
        await runMemHier(mem, speed, signal, log);
      } else if (kind === 'pathfind' || kind === 'which' || kind === 'path') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const cmd = String(spec.cmd || 'node');
        const dirs = Array.isArray(spec.dirs)
          ? spec.dirs
          : [
              { path: '/usr/local/bin', hit: false },
              { path: '/usr/bin', hit: true },
              { path: '/bin', hit: false },
            ];
        const pf = pathFindStage(
          dirs.map((d) => ({ path: String(d.path ?? ''), hit: Boolean(d.hit) })),
          cmd
        );
        stageWrap.append(pf.stage);
        await runPathFind(pf, speed, signal, log);
      } else if (kind === 'gitstage' || kind === 'git-areas' || kind === 'staging') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const files = Array.isArray(spec.files)
          ? spec.files.map((f) => ({
              name: String(f.name ?? 'file'),
              mark: String(f.mark ?? 'M'),
            }))
          : [
              { name: 'app.js', mark: 'M' },
              { name: 'note.md', mark: '?' },
            ];
        const gs = gitStageStage(files);
        stageWrap.append(gs.stage);
        await runGitStage(gs, spec, speed, signal, log);
      } else if (kind === 'gitclone' || kind === 'clone') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const cl = gitCloneStage({
          repo: String(spec.repo || 'XRK-AGT.git'),
          entries: Array.isArray(spec.entries)
            ? spec.entries.map(String)
            : ['.git/', 'package.json', 'pnpm-lock.yaml', 'src/', 'README.md'],
          fail: Boolean(spec.fail),
        });
        stageWrap.append(cl.stage);
        await runGitClone(cl, spec, speed, signal, log);
      } else if (kind === 'gitbranch' || kind === 'branch' || kind === 'mergeviz') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const br = gitBranchStage({
          mode: spec.mode,
          main: Array.isArray(spec.main) ? spec.main.map(String) : ['c0', 'c1', 'c2'],
          feat: Array.isArray(spec.feat) ? spec.feat.map(String) : ['f1', 'f2'],
        });
        stageWrap.append(br.stage);
        await runGitBranch(br, spec, speed, signal, log);
      } else if (kind === 'eventloop' || kind === 'eloop' || kind === 'microtask') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = eventLoopStage();
        stageWrap.append(ui.stage);
        await runEventLoop(ui, spec, speed, signal, log);
      } else if (kind === 'dualhost' || kind === 'hosts' || kind === 'runtime-split') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const apis = Array.isArray(spec.apis)
          ? spec.apis.map((a) => ({
              name: String(a.name ?? '?'),
              browser: Boolean(a.browser),
              node: Boolean(a.node),
            }))
          : [
              { name: 'document.querySelector', browser: true, node: false },
              { name: 'fs.readFile', browser: false, node: true },
              { name: 'fetch', browser: true, node: true },
              { name: 'process.env', browser: false, node: true },
            ];
        const ui = dualHostStage(apis);
        stageWrap.append(ui.stage);
        await runDualHost(ui, speed, signal, log);
      } else if (kind === 'tserase' || kind === 'tsc' || kind === 'typestrip') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tsEraseStage({
          source: String(spec.source || 'function add(a: number, b: number): number'),
          erased: String(spec.erased || 'function add(a, b)'),
          run: String(spec.run || 'node add.js → 3'),
        });
        stageWrap.append(ui.stage);
        await runTsErase(ui, speed, signal, log);
      } else if (kind === 'tcphandshake' || kind === 'tcp3way' || kind === 'synack') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = tcpHandshakeStage(spec);
        stageWrap.append(ui.stage);
        await runTcpHandshake(ui, speed, signal, log);
      } else if (kind === 'dnsresolve' || kind === 'dns' || kind === 'lookup') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = dnsResolveStage(spec);
        stageWrap.append(ui.stage);
        await runDnsResolve(ui, speed, signal, log);
      } else if (kind === 'revproxy' || kind === 'rproxy' || kind === 'proxyflow') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = revProxyStage(spec);
        stageWrap.append(ui.stage);
        await runRevProxy(ui, speed, signal, log);
      } else if (kind === 'proxyroute' || kind === 'fwdproxy' || kind === 'clashroute') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = proxyRouteStage(spec);
        stageWrap.append(ui.stage);
        await runProxyRoute(ui, speed, signal, log);
      } else if (kind === 'xrklayers' || kind === 'xrkflow' || kind === 'corelayers') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = xrkLayersStage(spec);
        stageWrap.append(ui.stage);
        await runXrkLayers(ui, speed, signal, log);
      } else if (kind === 'httpresp' || kind === 'httpshape' || kind === 'unwrap') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = httpRespStage(spec);
        stageWrap.append(ui.stage);
        await runHttpResp(ui, speed, signal, log);
      } else if (kind === 'msgpipe' || kind === 'assemble' || kind === 'chatpipe') {
        const ui = msgPipeStage();
        stageWrap.append(ui.stage);
        await runMsgPipe(ui, speed, signal, log);
      } else if (kind === 'taskerflow' || kind === 'channel' || kind === 'e-flow') {
        const ui = taskerFlowStage();
        stageWrap.append(ui.stage);
        await runTaskerFlow(ui, speed, signal, log);
      } else if (kind === 'authgate' || kind === 'apikey' || kind === 'gate') {
        const spec =
          cfg.data && typeof cfg.data === 'object' && !Array.isArray(cfg.data) ? cfg.data : {};
        const ui = authGateStage(spec);
        stageWrap.append(ui.stage);
        await runAuthGate(ui, speed, signal, log);
      } else if (kind === 'toolloop' || kind === 'mcploop' || kind === 'agentloop') {
        const ui = toolLoopStage();
        stageWrap.append(ui.stage);
        await runToolLoop(ui, speed, signal, log);
      } else if (kind === 'dbtier' || kind === 'redisql' || kind === 'hotdisk') {
        const ui = dbTierStage();
        stageWrap.append(ui.stage);
        await runDbTier(ui, speed, signal, log);
      } else if (kind === 'wsfive' || kind === 'workspace' || kind === 'inject5') {
        const ui = wsFiveStage();
        stageWrap.append(ui.stage);
        await runWsFive(ui, speed, signal, log);
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

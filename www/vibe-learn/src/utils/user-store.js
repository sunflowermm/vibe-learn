/**
 * 用户学习库（书签 / 笔记 / 进度 / 刷题作答 / 错题本）
 *
 * 存在浏览器同源 IndexedDB，并镜像一份到 localStorage。
 * DB 名与 key 固定，与 Vite 资源 hash、框架 build 版本无关。
 * 禁止在启动或版本变更时 clear / deleteDatabase —— rebuild 不得动用户数据。
 */

const DB_NAME = 'vibe-learn-user';
/** 仅 schema 变更时递增；迁移必须保留旧数据 */
const DB_VERSION = 2;
const BACKUP_KEY = 'vibe-learn-user-backup';
const EXPORT_VERSION = 2;

const STORE_BOOKMARKS = 'bookmarks';
const STORE_NOTES = 'notes';
const STORE_PROGRESS = 'progress';
const STORE_QUIZ_ATTEMPTS = 'quizAttempts';
const STORE_QUIZ_WRONG = 'quizWrong';

/** @type {Promise<IDBDatabase> | null} */
let dbPromise = null;

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error || new Error('open IndexedDB failed'));
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_BOOKMARKS)) {
        db.createObjectStore(STORE_BOOKMARKS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_NOTES)) {
        db.createObjectStore(STORE_NOTES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
        db.createObjectStore(STORE_PROGRESS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_QUIZ_ATTEMPTS)) {
        db.createObjectStore(STORE_QUIZ_ATTEMPTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_QUIZ_WRONG)) {
        db.createObjectStore(STORE_QUIZ_WRONG, { keyPath: 'id' });
      }
    };
  });
  return dbPromise;
}

/**
 * @template T
 * @param {string} storeName
 * @param {IDBTransactionMode} mode
 * @param {(store: IDBObjectStore) => IDBRequest<T> | void} work
 * @returns {Promise<T | undefined>}
 */
function withStore(storeName, mode, work) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        let req;
        try {
          req = work(store);
        } catch (err) {
          reject(err);
          return;
        }
        tx.oncomplete = () => resolve(req ? req.result : undefined);
        tx.onerror = () => reject(tx.error || new Error('tx failed'));
        tx.onabort = () => reject(tx.error || new Error('tx aborted'));
      })
  );
}

function idbGetAll(storeName) {
  return withStore(storeName, 'readonly', (store) => store.getAll()).then(
    (rows) => rows || []
  );
}

function idbGet(storeName, id) {
  return withStore(storeName, 'readonly', (store) => store.get(id));
}

function idbPut(storeName, value) {
  return withStore(storeName, 'readwrite', (store) => {
    store.put(value);
  });
}

function idbDelete(storeName, id) {
  return withStore(storeName, 'readwrite', (store) => {
    store.delete(id);
  });
}

function idbClear(storeName) {
  return withStore(storeName, 'readwrite', (store) => {
    store.clear();
  });
}

function readBackup() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || (data.version !== 1 && data.version !== EXPORT_VERSION)) return null;
    return data;
  } catch {
    return null;
  }
}

function writeBackup(snapshot) {
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(snapshot));
  } catch {
    /* quota / private mode — IDB 仍是主存 */
  }
}

function emptyLibrary() {
  return {
    bookmarks: [],
    notes: [],
    progress: [],
    quizAttempts: [],
    quizWrong: [],
  };
}

/**
 * @returns {Promise<{
 *   bookmarks: Array<{ id: string, createdAt: number }>,
 *   notes: Array<{ id: string, body: string, updatedAt: number }>,
 *   progress: Array<{ id: string, visitedAt: number, visitCount: number }>,
 *   quizAttempts: Array<{ id: string, correct: number, wrong: number, lastAt: number, lastWrongChoice?: number }>,
 *   quizWrong: Array<{ id: string, questionId: string, addedAt: number, masteredAt?: number | null, streak: number }>,
 * }>}
 */
export async function loadUserLibrary() {
  try {
    const [bookmarks, notes, progress, quizAttempts, quizWrong] = await Promise.all([
      idbGetAll(STORE_BOOKMARKS),
      idbGetAll(STORE_NOTES),
      idbGetAll(STORE_PROGRESS),
      idbGetAll(STORE_QUIZ_ATTEMPTS),
      idbGetAll(STORE_QUIZ_WRONG),
    ]);
    const snapshot = {
      version: EXPORT_VERSION,
      bookmarks: bookmarks || [],
      notes: notes || [],
      progress: progress || [],
      quizAttempts: quizAttempts || [],
      quizWrong: quizWrong || [],
    };
    writeBackup(snapshot);
    return snapshot;
  } catch {
    const backup = readBackup();
    if (backup) {
      return {
        bookmarks: backup.bookmarks || [],
        notes: backup.notes || [],
        progress: backup.progress || [],
        quizAttempts: backup.quizAttempts || [],
        quizWrong: backup.quizWrong || [],
      };
    }
    return emptyLibrary();
  }
}

export async function putBookmark(id) {
  const row = { id, createdAt: Date.now() };
  try {
    await idbPut(STORE_BOOKMARKS, row);
  } catch {
    /* fall through to mirror */
  }
  await mirrorAfterMutation();
  return row;
}

export async function removeBookmark(id) {
  try {
    await idbDelete(STORE_BOOKMARKS, id);
  } catch {
    /* ignore */
  }
  await mirrorAfterMutation();
}

/**
 * @param {string} id
 * @param {string} body
 */
export async function putNote(id, body) {
  const trimmed = String(body ?? '');
  if (!trimmed.trim()) {
    try {
      await idbDelete(STORE_NOTES, id);
    } catch {
      /* ignore */
    }
    await mirrorAfterMutation();
    return null;
  }
  const row = { id, body: trimmed, updatedAt: Date.now() };
  try {
    await idbPut(STORE_NOTES, row);
  } catch {
    /* ignore */
  }
  await mirrorAfterMutation();
  return row;
}

export async function touchProgress(id) {
  let row = { id, visitedAt: Date.now(), visitCount: 1 };
  try {
    const existing = await idbGet(STORE_PROGRESS, id);
    if (existing) {
      row = {
        id,
        visitedAt: Date.now(),
        visitCount: (existing.visitCount || 0) + 1,
      };
    }
    await idbPut(STORE_PROGRESS, row);
  } catch {
    /* ignore */
  }
  await mirrorAfterMutation();
  return row;
}

/**
 * @param {string} questionId
 * @param {{ ok: boolean, choiceIndex?: number }} result
 */
export async function recordQuizAttempt(questionId, result) {
  const id = String(questionId || '');
  if (!id) return null;
  const now = Date.now();
  let attempt = {
    id,
    correct: 0,
    wrong: 0,
    lastAt: now,
    lastWrongChoice: undefined,
  };
  let wrongRow = null;

  try {
    const existing = await idbGet(STORE_QUIZ_ATTEMPTS, id);
    if (existing) {
      attempt = {
        id,
        correct: Number(existing.correct) || 0,
        wrong: Number(existing.wrong) || 0,
        lastAt: now,
        lastWrongChoice: existing.lastWrongChoice,
      };
    }
    if (result.ok) {
      attempt.correct += 1;
    } else {
      attempt.wrong += 1;
      if (typeof result.choiceIndex === 'number') {
        attempt.lastWrongChoice = result.choiceIndex;
      }
    }
    await idbPut(STORE_QUIZ_ATTEMPTS, attempt);

    if (result.ok) {
      const prevWrong = await idbGet(STORE_QUIZ_WRONG, id);
      if (prevWrong && !prevWrong.masteredAt) {
        const streak = (Number(prevWrong.streak) || 0) + 1;
        wrongRow = {
          id,
          questionId: id,
          addedAt: prevWrong.addedAt || now,
          masteredAt: streak >= 2 ? now : null,
          streak,
        };
        await idbPut(STORE_QUIZ_WRONG, wrongRow);
      }
    } else {
      const prevWrong = await idbGet(STORE_QUIZ_WRONG, id);
      wrongRow = {
        id,
        questionId: id,
        addedAt: prevWrong?.addedAt || now,
        masteredAt: null,
        streak: 0,
      };
      await idbPut(STORE_QUIZ_WRONG, wrongRow);
    }
  } catch {
    /* ignore */
  }

  await mirrorAfterMutation();
  return { attempt, wrong: wrongRow };
}

export async function markWrongMastered(questionId) {
  const id = String(questionId || '');
  if (!id) return null;
  let row = null;
  try {
    const prev = await idbGet(STORE_QUIZ_WRONG, id);
    if (!prev) return null;
    row = { ...prev, masteredAt: Date.now(), streak: Math.max(2, Number(prev.streak) || 0) };
    await idbPut(STORE_QUIZ_WRONG, row);
  } catch {
    /* ignore */
  }
  await mirrorAfterMutation();
  return row;
}

export async function removeWrong(questionId) {
  const id = String(questionId || '');
  if (!id) return;
  try {
    await idbDelete(STORE_QUIZ_WRONG, id);
  } catch {
    /* ignore */
  }
  await mirrorAfterMutation();
}

export async function clearWrongBook({ onlyMastered = false } = {}) {
  try {
    if (!onlyMastered) {
      await idbClear(STORE_QUIZ_WRONG);
    } else {
      const rows = await idbGetAll(STORE_QUIZ_WRONG);
      for (const r of rows) {
        if (r?.masteredAt) await idbDelete(STORE_QUIZ_WRONG, r.id);
      }
    }
  } catch {
    /* ignore */
  }
  await mirrorAfterMutation();
}

async function mirrorAfterMutation() {
  try {
    const [bookmarks, notes, progress, quizAttempts, quizWrong] = await Promise.all([
      idbGetAll(STORE_BOOKMARKS),
      idbGetAll(STORE_NOTES),
      idbGetAll(STORE_PROGRESS),
      idbGetAll(STORE_QUIZ_ATTEMPTS),
      idbGetAll(STORE_QUIZ_WRONG),
    ]);
    writeBackup({
      version: EXPORT_VERSION,
      bookmarks,
      notes,
      progress,
      quizAttempts,
      quizWrong,
      mirroredAt: Date.now(),
    });
  } catch {
    /* ignore */
  }
}

/**
 * @param {{ bookmarks?: any[], notes?: any[], progress?: any[], quizAttempts?: any[], quizWrong?: any[] }} data
 * @param {'merge' | 'replace'} mode
 */
export async function importUserLibrary(data, mode = 'merge') {
  const bookmarks = Array.isArray(data?.bookmarks) ? data.bookmarks : [];
  const notes = Array.isArray(data?.notes) ? data.notes : [];
  const progress = Array.isArray(data?.progress) ? data.progress : [];
  const quizAttempts = Array.isArray(data?.quizAttempts) ? data.quizAttempts : [];
  const quizWrong = Array.isArray(data?.quizWrong) ? data.quizWrong : [];

  if (mode === 'replace') {
    try {
      await Promise.all([
        idbClear(STORE_BOOKMARKS),
        idbClear(STORE_NOTES),
        idbClear(STORE_PROGRESS),
        idbClear(STORE_QUIZ_ATTEMPTS),
        idbClear(STORE_QUIZ_WRONG),
      ]);
    } catch {
      /* ignore */
    }
  }

  const current =
    mode === 'merge'
      ? await loadUserLibrary()
      : emptyLibrary();

  const bmMap = new Map(current.bookmarks.map((b) => [b.id, b]));
  for (const b of bookmarks) {
    if (!b?.id) continue;
    const createdAt = Number(b.createdAt) || Date.now();
    const prev = bmMap.get(b.id);
    if (!prev || createdAt < (prev.createdAt || Infinity)) {
      bmMap.set(String(b.id), { id: String(b.id), createdAt });
    }
  }

  const noteMap = new Map(current.notes.map((n) => [n.id, n]));
  for (const n of notes) {
    if (!n?.id) continue;
    const body = String(n.body ?? '');
    if (!body.trim()) continue;
    const updatedAt = Number(n.updatedAt) || Date.now();
    const prev = noteMap.get(n.id);
    if (!prev || updatedAt >= (prev.updatedAt || 0)) {
      noteMap.set(String(n.id), { id: String(n.id), body, updatedAt });
    }
  }

  const progMap = new Map(current.progress.map((p) => [p.id, p]));
  for (const p of progress) {
    if (!p?.id) continue;
    const visitedAt = Number(p.visitedAt) || Date.now();
    const visitCount = Number(p.visitCount) || 1;
    const prev = progMap.get(p.id);
    if (!prev) {
      progMap.set(String(p.id), { id: String(p.id), visitedAt, visitCount });
    } else {
      progMap.set(String(p.id), {
        id: String(p.id),
        visitedAt: Math.max(prev.visitedAt || 0, visitedAt),
        visitCount: Math.max(prev.visitCount || 0, visitCount),
      });
    }
  }

  const attMap = new Map(current.quizAttempts.map((a) => [a.id, a]));
  for (const a of quizAttempts) {
    if (!a?.id) continue;
    const prev = attMap.get(a.id);
    const next = {
      id: String(a.id),
      correct: Number(a.correct) || 0,
      wrong: Number(a.wrong) || 0,
      lastAt: Number(a.lastAt) || Date.now(),
      lastWrongChoice: a.lastWrongChoice,
    };
    if (!prev) attMap.set(next.id, next);
    else {
      attMap.set(next.id, {
        id: next.id,
        correct: Math.max(prev.correct || 0, next.correct),
        wrong: Math.max(prev.wrong || 0, next.wrong),
        lastAt: Math.max(prev.lastAt || 0, next.lastAt),
        lastWrongChoice: next.lastAt >= (prev.lastAt || 0) ? next.lastWrongChoice : prev.lastWrongChoice,
      });
    }
  }

  const wrongMap = new Map(current.quizWrong.map((w) => [w.id, w]));
  for (const w of quizWrong) {
    if (!w?.id && !w?.questionId) continue;
    const id = String(w.id || w.questionId);
    const next = {
      id,
      questionId: String(w.questionId || id),
      addedAt: Number(w.addedAt) || Date.now(),
      masteredAt: w.masteredAt ? Number(w.masteredAt) : null,
      streak: Number(w.streak) || 0,
    };
    const prev = wrongMap.get(id);
    if (!prev) wrongMap.set(id, next);
    else {
      wrongMap.set(id, {
        id,
        questionId: id,
        addedAt: Math.min(prev.addedAt || Infinity, next.addedAt),
        masteredAt: prev.masteredAt && next.masteredAt
          ? Math.min(prev.masteredAt, next.masteredAt)
          : prev.masteredAt || next.masteredAt || null,
        streak: Math.max(prev.streak || 0, next.streak),
      });
    }
  }

  try {
    for (const row of bmMap.values()) await idbPut(STORE_BOOKMARKS, row);
    for (const row of noteMap.values()) await idbPut(STORE_NOTES, row);
    for (const row of progMap.values()) await idbPut(STORE_PROGRESS, row);
    for (const row of attMap.values()) await idbPut(STORE_QUIZ_ATTEMPTS, row);
    for (const row of wrongMap.values()) await idbPut(STORE_QUIZ_WRONG, row);
  } catch {
    /* IDB 失败时仍写备份 */
  }

  const snapshot = {
    version: EXPORT_VERSION,
    bookmarks: [...bmMap.values()],
    notes: [...noteMap.values()],
    progress: [...progMap.values()],
    quizAttempts: [...attMap.values()],
    quizWrong: [...wrongMap.values()],
  };
  writeBackup(snapshot);
  return snapshot;
}

export function buildExportPayload(library) {
  return {
    version: EXPORT_VERSION,
    app: 'vibe-learn',
    exportedAt: new Date().toISOString(),
    bookmarks: library.bookmarks || [],
    notes: library.notes || [],
    progress: library.progress || [],
    quizAttempts: library.quizAttempts || [],
    quizWrong: library.quizWrong || [],
  };
}

export { BACKUP_KEY, DB_NAME, EXPORT_VERSION };

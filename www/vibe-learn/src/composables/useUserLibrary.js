/**
 * 用户书架：书签 / 笔记 / 访问进度（本机持久化，rebuild 不清除）
 */
import { computed, ref, shallowRef } from 'vue';
import {
  buildExportPayload,
  importUserLibrary,
  loadUserLibrary,
  putBookmark,
  putNote,
  removeBookmark,
  touchProgress,
} from '../utils/user-store.js';

/** @type {import('vue').ShallowRef<ReturnType<typeof useUserLibrary> | null>} */
const shared = shallowRef(null);

export function useUserLibrary() {
  if (shared.value) return shared.value;

  const ready = ref(false);
  const bookmarks = ref(/** @type {Array<{ id: string, createdAt: number }>} */ ([]));
  const notes = ref(
    /** @type {Record<string, { id: string, body: string, updatedAt: number }>} */ ({})
  );
  const progress = ref(
    /** @type {Record<string, { id: string, visitedAt: number, visitCount: number }>} */ ({})
  );

  const bookmarkedIds = computed(() => bookmarks.value.map((b) => b.id));
  const notedIds = computed(() =>
    Object.keys(notes.value).filter((id) => notes.value[id]?.body?.trim())
  );
  const visitedIds = computed(() => Object.keys(progress.value));
  const bookmarkCount = computed(() => bookmarks.value.length);
  const noteCount = computed(() => notedIds.value.length);
  const visitedCount = computed(() => visitedIds.value.length);

  let initPromise = null;

  function applySnapshot(snap) {
    bookmarks.value = [...(snap.bookmarks || [])].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
    const nmap = {};
    for (const n of snap.notes || []) {
      if (n?.id) nmap[n.id] = n;
    }
    notes.value = nmap;
    const pmap = {};
    for (const p of snap.progress || []) {
      if (p?.id) pmap[p.id] = p;
    }
    progress.value = pmap;
  }

  async function init() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      const snap = await loadUserLibrary();
      applySnapshot(snap);
      ready.value = true;
    })();
    return initPromise;
  }

  async function ensureReady() {
    if (!ready.value) await init();
  }

  function isBookmarked(id) {
    return bookmarks.value.some((b) => b.id === id);
  }

  function isVisited(id) {
    return Boolean(id && progress.value[id]);
  }

  function noteOf(id) {
    return notes.value[id]?.body || '';
  }

  async function toggleBookmark(id) {
    if (!id) return;
    await ensureReady();
    if (isBookmarked(id)) {
      await removeBookmark(id);
      bookmarks.value = bookmarks.value.filter((b) => b.id !== id);
    } else {
      const row = await putBookmark(id);
      bookmarks.value = [row, ...bookmarks.value.filter((b) => b.id !== id)];
    }
  }

  async function saveNote(id, body) {
    if (!id) return;
    await ensureReady();
    const row = await putNote(id, body);
    const next = { ...notes.value };
    if (row) next[id] = row;
    else delete next[id];
    notes.value = next;
  }

  async function markVisited(id) {
    if (!id) return;
    await ensureReady();
    const row = await touchProgress(id);
    progress.value = { ...progress.value, [id]: row };
  }

  function exportJson() {
    const payload = buildExportPayload({
      bookmarks: bookmarks.value,
      notes: Object.values(notes.value),
      progress: Object.values(progress.value),
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const stamp = new Date().toISOString().slice(0, 10);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibe-learn-backup-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * @param {File | string} fileOrText
   * @param {'merge' | 'replace'} mode
   */
  async function importFrom(fileOrText, mode = 'merge') {
    await ensureReady();
    const text =
      typeof fileOrText === 'string'
        ? fileOrText
        : await fileOrText.text();
    const data = JSON.parse(text);
    const snap = await importUserLibrary(data, mode);
    applySnapshot(snap);
    return snap;
  }

  const api = {
    ready,
    bookmarks,
    notes,
    progress,
    bookmarkedIds,
    notedIds,
    visitedIds,
    bookmarkCount,
    noteCount,
    visitedCount,
    init,
    isBookmarked,
    isVisited,
    noteOf,
    toggleBookmark,
    saveNote,
    markVisited,
    exportJson,
    importFrom,
  };

  shared.value = api;
  return api;
}

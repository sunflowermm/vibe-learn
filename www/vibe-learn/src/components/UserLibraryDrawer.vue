<script setup>
/**
 * 本机学习台账：书签 / 笔记 / 已学 / 足迹 + 备份
 */
import { computed, nextTick, ref, watch } from 'vue';
import { getNodeById } from '../data/nodes.js';
import { useUserLibrary } from '../composables/useUserLibrary.js';

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['close', 'navigate']);

const library = useUserLibrary();
const { bookmarkCount, noteCount, learnedCount } = library;
const tab = ref('bookmarks');
const query = ref('');
const importMsg = ref('');
const msgTone = ref('ok');
const fileInput = ref(null);
const panelEl = ref(null);
/** @type {import('vue').Ref<'merge' | 'replace'>} */
const importMode = ref('merge');
const backupOpen = ref(false);

const tabs = computed(() => [
  { id: 'bookmarks', label: '书签', count: bookmarkCount.value },
  { id: 'notes', label: '笔记', count: noteCount.value },
  { id: 'learned', label: '已学', count: learnedCount.value },
  {
    id: 'recent',
    label: '足迹',
    count: Object.keys(library.progress.value).length,
  },
]);

function enrich(id) {
  const node = getNodeById(id);
  const chapter = node?.parentId ? getNodeById(node.parentId) : null;
  return {
    id,
    label: node?.label || id,
    tag: node?.tag || '',
    subtitle: node?.subtitle || '',
    chapter: chapter?.label || '',
    missing: !node,
  };
}

function matchQuery(row) {
  const q = query.value.trim().toLowerCase();
  if (!q) return true;
  return [row.label, row.tag, row.chapter, row.subtitle, row.preview]
    .filter(Boolean)
    .some((s) => String(s).toLowerCase().includes(q));
}

const bookmarkRows = computed(() =>
  library.bookmarks.value
    .map((b) => ({
      ...enrich(b.id),
      createdAt: b.createdAt,
      bookmarked: true,
      hasNote: Boolean(library.notes.value[b.id]?.body?.trim()),
    }))
    .filter(matchQuery)
);

const noteRows = computed(() =>
  library.notedIds.value
    .map((id) => {
      const note = library.notes.value[id];
      return {
        ...enrich(id),
        preview: (note?.body || '').replace(/\s+/g, ' ').trim().slice(0, 140),
        updatedAt: note?.updatedAt || 0,
        bookmarked: library.isBookmarked(id),
        hasNote: true,
      };
    })
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter(matchQuery)
);

const recentRows = computed(() =>
  Object.values(library.progress.value)
    .sort((a, b) => (b.visitedAt || 0) - (a.visitedAt || 0))
    .slice(0, 50)
    .map((p) => ({
      ...enrich(p.id),
      visitCount: p.visitCount || 1,
      visitedAt: p.visitedAt,
      bookmarked: library.isBookmarked(p.id),
      learned: library.isLearned(p.id),
      hasNote: Boolean(library.notes.value[p.id]?.body?.trim()),
    }))
    .filter(matchQuery)
);

const learnedRows = computed(() =>
  Object.values(library.learned.value)
    .sort((a, b) => (b.learnedAt || 0) - (a.learnedAt || 0))
    .map((r) => ({
      ...enrich(r.id),
      learnedAt: r.learnedAt,
      bookmarked: library.isBookmarked(r.id),
      learned: true,
      hasNote: Boolean(library.notes.value[r.id]?.body?.trim()),
    }))
    .filter(matchQuery)
);

const emptyCopy = {
  bookmarks: {
    title: '还没有书签',
    body: '打开任意主题，点标题旁的星标即可钉到这里。',
  },
  notes: {
    title: '还没有笔记',
    body: '讲解面板底部有「我的笔记」，边读边写会自动出现在此。',
  },
  learned: {
    title: '还没有已学标记',
    body: '读完一课后点「标记已学」。打开过的足迹不算已学。',
  },
  recent: {
    title: '还没有足迹',
    body: '浏览过的主题会按时间排在这里，方便回看。',
  },
};

function fmt(ts) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleString('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function go(id) {
  emit('navigate', id);
  emit('close');
}

async function onStar(e, id) {
  e.stopPropagation();
  await library.toggleBookmark(id);
}

function onExport() {
  library.exportJson();
  msgTone.value = 'ok';
  importMsg.value = '备份已下载，可换设备导入';
}

function pickImport(mode) {
  importMode.value = mode === 'replace' ? 'replace' : 'merge';
  if (mode === 'replace') {
    const ok = window.confirm(
      '替换导入会清空本机当前书签、笔记、已学与足迹，再用文件覆盖。确定继续？'
    );
    if (!ok) return;
  }
  fileInput.value?.click();
}

async function onFile(e) {
  const file = e.target.files?.[0];
  e.target.value = '';
  if (!file) return;
  try {
    await library.importFrom(file, importMode.value);
    msgTone.value = 'ok';
    importMsg.value =
      importMode.value === 'replace' ? '已用文件替换本机数据' : '已合并到本机书架';
  } catch (err) {
    msgTone.value = 'err';
    importMsg.value = `导入失败：${err?.message || err}`;
  }
}

watch(
  () => props.open,
  async (open) => {
    if (!open) return;
    query.value = '';
    importMsg.value = '';
    await nextTick();
    panelEl.value?.focus({ preventScroll: true });
  }
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="shelf"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shelf-title"
    >
      <button
        type="button"
        class="shelf__veil"
        aria-label="关闭书架"
        @click="emit('close')"
      />

      <aside
        ref="panelEl"
        class="shelf__panel"
        tabindex="-1"
      >
        <header class="shelf__head">
          <div class="shelf__brand">
            <div class="shelf__mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 4.5h5.2c.9 0 1.7.4 2.3 1.1L13 6.3a.8.8 0 0 0 .6.3H19a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path d="M8 10.5h8M8 14h5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            <div>
              <p class="shelf__eyebrow">Local study desk</p>
              <h2 id="shelf-title" class="shelf__title">我的书架</h2>
            </div>
          </div>
          <button type="button" class="shelf__icon-btn" aria-label="关闭" @click="emit('close')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <p class="shelf__lede">
          书签与笔记存在本机浏览器，与框架 build / 静态资源 hash 无关。换电脑请先导出。
        </p>

        <div class="shelf__search">
          <svg class="shelf__search-ico" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4" />
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          </svg>
          <input
            v-model="query"
            type="search"
            class="shelf__search-input"
            placeholder="搜索标题、章节、笔记内容…"
            autocomplete="off"
          />
        </div>

        <div class="shelf__seg" role="tablist" aria-label="书架分类">
          <button
            v-for="t in tabs"
            :key="t.id"
            type="button"
            role="tab"
            class="shelf__seg-btn"
            :class="{ active: tab === t.id }"
            :aria-selected="tab === t.id"
            @click="tab = t.id"
          >
            {{ t.label }}
            <span class="shelf__count">{{ t.count }}</span>
          </button>
        </div>

        <div class="shelf__list" role="tabpanel">
          <template v-if="tab === 'bookmarks'">
            <div v-if="!bookmarkRows.length" class="shelf__empty">
              <div class="shelf__empty-ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16">
                  <path
                    d="M8 1.8l1.7 3.5 3.8.55-2.75 2.7.65 3.8L8 10.6l-3.4 1.75.65-3.8L2.5 5.85l3.8-.55L8 1.8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>{{ query ? '没有匹配的书签' : emptyCopy.bookmarks.title }}</h3>
              <p>{{ query ? '试试别的关键词' : emptyCopy.bookmarks.body }}</p>
            </div>
            <article
              v-for="(row, i) in bookmarkRows"
              :key="row.id"
              class="shelf-card"
              :style="{ '--i': i }"
            >
              <button type="button" class="shelf-card__main" @click="go(row.id)">
                <div class="shelf-card__top">
                  <span class="shelf-card__tag">{{ row.tag || '主题' }}</span>
                  <span v-if="row.chapter" class="shelf-card__chapter">{{ row.chapter }}</span>
                </div>
                <h3 class="shelf-card__title">{{ row.label }}</h3>
                <p v-if="row.subtitle" class="shelf-card__sub">{{ row.subtitle }}</p>
                <div class="shelf-card__foot">
                  <span>{{ fmt(row.createdAt) }}</span>
                  <span v-if="row.hasNote" class="shelf-card__pill">有笔记</span>
                </div>
              </button>
              <button
                type="button"
                class="shelf-card__star is-on"
                title="取消收藏"
                aria-label="取消收藏"
                @click="onStar($event, row.id)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 1.8l1.7 3.5 3.8.55-2.75 2.7.65 3.8L8 10.6l-3.4 1.75.65-3.8L2.5 5.85l3.8-.55L8 1.8z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </article>
          </template>

          <template v-else-if="tab === 'notes'">
            <div v-if="!noteRows.length" class="shelf__empty">
              <div class="shelf__empty-ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 2.5h7.2L13.5 5.3v8.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    stroke-width="1.4"
                  />
                  <path d="M5.2 8.2h5.5M5.2 10.6h3.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                </svg>
              </div>
              <h3>{{ query ? '没有匹配的笔记' : emptyCopy.notes.title }}</h3>
              <p>{{ query ? '试试别的关键词' : emptyCopy.notes.body }}</p>
            </div>
            <article
              v-for="(row, i) in noteRows"
              :key="row.id"
              class="shelf-card shelf-card--note"
              :style="{ '--i': i }"
            >
              <button type="button" class="shelf-card__main" @click="go(row.id)">
                <div class="shelf-card__top">
                  <span class="shelf-card__tag">{{ row.tag || '主题' }}</span>
                  <span v-if="row.chapter" class="shelf-card__chapter">{{ row.chapter }}</span>
                </div>
                <h3 class="shelf-card__title">{{ row.label }}</h3>
                <p class="shelf-card__preview">{{ row.preview }}</p>
                <div class="shelf-card__foot">
                  <span>{{ fmt(row.updatedAt) }}</span>
                  <span v-if="row.bookmarked" class="shelf-card__pill shelf-card__pill--amber">已收藏</span>
                </div>
              </button>
              <button
                type="button"
                class="shelf-card__star"
                :class="{ 'is-on': row.bookmarked }"
                :title="row.bookmarked ? '取消收藏' : '加入书签'"
                :aria-label="row.bookmarked ? '取消收藏' : '加入书签'"
                @click="onStar($event, row.id)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 1.8l1.7 3.5 3.8.55-2.75 2.7.65 3.8L8 10.6l-3.4 1.75.65-3.8L2.5 5.85l3.8-.55L8 1.8z"
                    :fill="row.bookmarked ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                </svg>
              </button>
            </article>
          </template>

          <template v-else-if="tab === 'learned'">
            <div v-if="!learnedRows.length" class="shelf__empty">
              <div class="shelf__empty-ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.4" />
                  <path
                    d="M5.2 8.1l1.9 1.9 3.8-3.9"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3>{{ query ? '没有匹配的已学' : emptyCopy.learned.title }}</h3>
              <p>{{ query ? '试试别的关键词' : emptyCopy.learned.body }}</p>
            </div>
            <article
              v-for="(row, i) in learnedRows"
              :key="row.id"
              class="shelf-card"
              :style="{ '--i': i }"
            >
              <button type="button" class="shelf-card__main" @click="go(row.id)">
                <div class="shelf-card__top">
                  <span class="shelf-card__tag">{{ row.tag || '主题' }}</span>
                  <span v-if="row.chapter" class="shelf-card__chapter">{{ row.chapter }}</span>
                </div>
                <h3 class="shelf-card__title">{{ row.label }}</h3>
                <div class="shelf-card__foot">
                  <span>{{ fmt(row.learnedAt) }}</span>
                  <span class="shelf-card__flags">
                    <span class="shelf-card__pill shelf-card__pill--learned">已学</span>
                    <span v-if="row.bookmarked" class="shelf-card__pill shelf-card__pill--amber">书签</span>
                    <span v-if="row.hasNote" class="shelf-card__pill">笔记</span>
                  </span>
                </div>
              </button>
              <button
                type="button"
                class="shelf-card__star shelf-card__star--learned is-on"
                title="取消已学"
                aria-label="取消已学"
                @click="library.toggleLearned(row.id)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.3" />
                  <path
                    d="M5 8.1l2 2 4-4.1"
                    stroke="currentColor"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </article>
          </template>

          <template v-else>
            <div v-if="!recentRows.length" class="shelf__empty">
              <div class="shelf__empty-ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.4" />
                  <path d="M8 5.2V8.4l2 1.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                </svg>
              </div>
              <h3>{{ query ? '没有匹配的足迹' : emptyCopy.recent.title }}</h3>
              <p>{{ query ? '试试别的关键词' : emptyCopy.recent.body }}</p>
            </div>
            <article
              v-for="(row, i) in recentRows"
              :key="row.id"
              class="shelf-card"
              :style="{ '--i': i }"
            >
              <button type="button" class="shelf-card__main" @click="go(row.id)">
                <div class="shelf-card__top">
                  <span class="shelf-card__tag">{{ row.tag || '主题' }}</span>
                  <span class="shelf-card__chapter">看过 {{ row.visitCount }} 次</span>
                </div>
                <h3 class="shelf-card__title">{{ row.label }}</h3>
                <div class="shelf-card__foot">
                  <span>{{ fmt(row.visitedAt) }}</span>
                  <span class="shelf-card__flags">
                    <span v-if="row.learned" class="shelf-card__pill shelf-card__pill--learned">已学</span>
                    <span v-if="row.bookmarked" class="shelf-card__pill shelf-card__pill--amber">书签</span>
                    <span v-if="row.hasNote" class="shelf-card__pill">笔记</span>
                  </span>
                </div>
              </button>
              <button
                type="button"
                class="shelf-card__star"
                :class="{ 'is-on': row.bookmarked }"
                :title="row.bookmarked ? '取消收藏' : '加入书签'"
                :aria-label="row.bookmarked ? '取消收藏' : '加入书签'"
                @click="onStar($event, row.id)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 1.8l1.7 3.5 3.8.55-2.75 2.7.65 3.8L8 10.6l-3.4 1.75.65-3.8L2.5 5.85l3.8-.55L8 1.8z"
                    :fill="row.bookmarked ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                </svg>
              </button>
            </article>
          </template>
        </div>

        <footer class="shelf__foot">
          <button
            type="button"
            class="shelf__backup-toggle"
            :aria-expanded="backupOpen"
            @click="backupOpen = !backupOpen"
          >
            <span>备份与迁移</span>
            <span class="shelf__backup-chev">{{ backupOpen ? '−' : '+' }}</span>
          </button>
          <div v-show="backupOpen" class="shelf__backup">
            <button type="button" class="shelf__action shelf__action--primary" @click="onExport">
              导出 JSON
            </button>
            <button type="button" class="shelf__action" @click="pickImport('merge')">合并导入</button>
            <button type="button" class="shelf__action shelf__action--warn" @click="pickImport('replace')">
              替换导入
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="application/json,.json"
              class="shelf__file"
              @change="onFile"
            />
            <p v-if="importMsg" class="shelf__msg" :data-tone="msgTone">{{ importMsg }}</p>
          </div>
        </footer>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.shelf {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  justify-content: flex-end;
}

.shelf__veil {
  position: absolute;
  inset: 0;
  border: 0;
  cursor: pointer;
  background: color-mix(in srgb, #0f172a 42%, transparent);
  backdrop-filter: blur(3px);
  animation: shelf-veil 0.22s ease;
}

@keyframes shelf-veil {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.shelf__panel {
  position: relative;
  width: min(460px, 100vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(120% 60% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%),
    var(--ink-2, var(--ink));
  border-left: 1px solid var(--line);
  box-shadow: -18px 0 48px rgba(0, 0, 0, 0.22);
  animation: shelf-in 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  outline: none;
}

@keyframes shelf-in {
  from {
    transform: translateX(28px);
    opacity: 0.7;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

.shelf__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.35rem;
}

.shelf__brand {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
}

.shelf__mark {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(145deg, var(--accent), color-mix(in srgb, var(--signal) 70%, #0369a1));
  box-shadow: 0 8px 18px color-mix(in srgb, var(--accent) 35%, transparent);
}

.shelf__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mist-dim);
}

.shelf__title {
  margin: 0.15rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--node-title);
}

.shelf__icon-btn {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--ink-3);
  color: var(--mist-dim);
}

.shelf__icon-btn:hover {
  color: var(--node-title);
  border-color: var(--accent);
}

.shelf__lede {
  margin: 0;
  padding: 0 1.25rem 0.85rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--mist-dim);
}

.shelf__search {
  position: relative;
  margin: 0 1.25rem 0.75rem;
}

.shelf__search-ico {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--mist-dim);
  pointer-events: none;
}

.shelf__search-input {
  width: 100%;
  padding: 0.7rem 0.9rem 0.7rem 2.35rem;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--ink);
  color: var(--mist);
  font-size: 0.86rem;
}

.shelf__search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.shelf__seg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;
  margin: 0 1.25rem 0.65rem;
  padding: 0.28rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--mist) 6%, transparent);
}

.shelf__seg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 0.35rem;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--mist-dim);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;
}

.shelf__seg-btn.active {
  background: var(--ink);
  color: var(--node-title);
  box-shadow: var(--shadow-sm);
}

.shelf__count {
  min-width: 1.15rem;
  padding: 0.05rem 0.35rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--mist) 10%, transparent);
  font-variant-numeric: tabular-nums;
}

.shelf__seg-btn.active .shelf__count {
  background: var(--accent-soft);
  color: var(--signal);
}

.shelf__list {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.25rem 1rem 1rem;
  scrollbar-width: thin;
}

.shelf__empty {
  margin: 2.5rem 0.75rem;
  text-align: center;
}

.shelf__empty-ico {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.85rem;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--signal);
  font-size: 1.15rem;
}

.shelf__empty h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--node-title);
}

.shelf__empty p {
  margin: 0.45rem auto 0;
  max-width: 16rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--mist-dim);
}

.shelf-card {
  --i: 0;
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.15rem;
  margin-bottom: 0.55rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--ink);
  overflow: hidden;
  animation: shelf-card-in 0.28s ease both;
  animation-delay: calc(var(--i) * 28ms);
}

@keyframes shelf-card-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.shelf-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
  opacity: 0.55;
}

.shelf-card--note::before {
  background: color-mix(in srgb, var(--signal) 60%, #67e8f9);
}

.shelf-card:hover {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
  box-shadow: var(--shadow-sm);
}

.shelf-card__main {
  display: block;
  width: 100%;
  padding: 0.85rem 0.35rem 0.85rem 1rem;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: inherit;
}

.shelf-card__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}

.shelf-card__tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--signal);
}

.shelf-card__chapter {
  font-size: 0.68rem;
  color: var(--mist-dim);
}

.shelf-card__title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--node-title);
  line-height: 1.3;
}

.shelf-card__sub,
.shelf-card__preview {
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--mist-dim);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shelf-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--mist-dim);
}

.shelf-card__flags {
  display: inline-flex;
  gap: 0.3rem;
}

.shelf-card__pill {
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--signal);
  font-family: var(--font-mono);
  font-size: 0.6rem;
}

.shelf-card__pill--amber {
  background: color-mix(in srgb, var(--amber) 16%, transparent);
  color: var(--amber);
}

.shelf-card__pill--learned {
  background: color-mix(in srgb, #34d399 16%, transparent);
  color: color-mix(in srgb, #059669 80%, var(--mist));
}

.shelf-card__star {
  align-self: start;
  margin: 0.65rem 0.65rem 0 0;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--mist-dim);
  cursor: pointer;
}

.shelf-card__star:hover {
  background: var(--ink-3);
  color: var(--amber);
}

.shelf-card__star.is-on {
  color: var(--amber);
}

.shelf-card__star--learned.is-on {
  color: color-mix(in srgb, #059669 80%, var(--mist));
}

.shelf-card__star--learned:hover {
  color: #059669;
}

.shelf__foot {
  border-top: 1px solid var(--line);
  background: color-mix(in srgb, var(--ink) 70%, transparent);
  padding: 0.35rem 1rem 0.85rem;
}

.shelf__backup-toggle {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 0.2rem;
  border: 0;
  background: transparent;
  color: var(--mist-dim);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  cursor: pointer;
}

.shelf__backup-toggle:hover {
  color: var(--node-title);
}

.shelf__backup {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding-bottom: 0.25rem;
}

.shelf__action {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--ink-3);
  color: var(--mist);
  cursor: pointer;
}

.shelf__action:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.shelf__action--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.shelf__action--primary:hover {
  color: #fff;
  filter: brightness(1.05);
}

.shelf__action--warn:hover {
  border-color: var(--amber);
  color: var(--amber);
}

.shelf__file {
  display: none;
}

.shelf__msg {
  margin: 0.35rem 0 0;
  width: 100%;
  font-size: 0.72rem;
  color: var(--signal);
}

.shelf__msg[data-tone='err'] {
  color: #ef4444;
}
</style>

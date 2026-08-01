<script setup>
/**
 * 刷题台：当前选中内容块驱动；全库随机 / 名词释义只在选中对应图卡时出现
 */
import { computed, onMounted, ref, watch } from 'vue';
import {
  QUIZ_DOMAINS,
  domainMeta,
  getQuizSet,
  getQuestion,
  pickRandom,
  questionsByIds,
  questionsForNode,
  questionsForSet,
  quizQuestionCount,
  domainPoolMeta,
  setKindLabel,
} from '../../data/quiz/bank.js';
import { getQuizCardById } from '../../data/quiz/graph.js';
import { getNodeById, resolveNodes } from '../../data/nodes.js';
import { shuffleCopy } from '../../data/quiz/schema.js';
import { useUserLibrary } from '../../composables/useUserLibrary.js';
import QuizPlayer from './QuizPlayer.vue';
import '../../styles/quiz-desk.css';

const props = defineProps({
  activeSetId: { type: String, default: null },
  focusNodeId: { type: String, default: null },
});

const emit = defineEmits(['close-focus', 'goto-learn', 'select-set']);

const library = useUserLibrary();
const {
  wrongOpenCount,
  wrongOpenList,
  wrongOpenIds,
  todayAnswerCount,
  clearWrongs,
  masterWrong,
  dropWrong,
  init: initLibrary,
} = library;

const domain = ref('all');
/** 本章综合池：all | topic | glossary；默认专题，避免词典双份刷屏 */
const poolSource = ref('topic');
const randomN = ref(20);
const sessionKey = ref(0);
const activeQuestions = ref([]);
const sessionTitle = ref('');
const sessionCaption = ref('');
/** @type {import('vue').Ref<'practice' | 'wrong-list' | 'wrong-drill'>} */
const deskMode = ref('practice');

const card = computed(() =>
  props.activeSetId ? getQuizCardById(props.activeSetId) : null
);
const curated = computed(() =>
  props.activeSetId ? getQuizSet(props.activeSetId) : null
);
const related = computed(() => {
  const ids =
    curated.value?.relatedNodes ||
    card.value?.relatedNodes ||
    (props.focusNodeId ? [props.focusNodeId] : []);
  return resolveNodes(ids);
});

const hasSession = computed(() => activeQuestions.value.length > 0);

const chapterMeta = computed(() => {
  if (!props.activeSetId?.startsWith('pool-')) return null;
  const id = props.activeSetId;
  if (id === 'pool-random' || id === 'pool-glossary') return null;
  return domainPoolMeta(id.replace(/^pool-/, ''));
});

/** idle | random | glossary | domain | topic | lesson */
const track = computed(() => {
  if (props.focusNodeId) return 'lesson';
  const id = props.activeSetId;
  if (!id) return 'idle';
  if (id === 'pool-random') return 'random';
  if (id === 'pool-glossary') return 'glossary';
  if (id.startsWith('pool-')) return 'domain';
  if (curated.value || card.value) return 'topic';
  return 'idle';
});

const trackMeta = computed(() => {
  switch (track.value) {
    case 'random':
      return { badge: '全库随机', tip: '跨章专题抽练' };
    case 'glossary':
      return { badge: '名词释义', tip: '全库词典 · 作答后揭晓' };
    case 'domain': {
      const m = chapterMeta.value;
      return {
        badge: '本章综合',
        tip: m
          ? `本章共 ${m.topicCount} 专题题 · ${m.glossaryCount} 词典题`
          : '本章题库',
      };
    }
    case 'topic': {
      const n = curated.value?.questions?.length || 0;
      const kind = setKindLabel(curated.value?.kind);
      return {
        badge: `专题 · ${kind}`,
        tip: n ? `本组固定 ${n} 题` : '本组固定题',
      };
    }
    case 'lesson':
      return { badge: '课限定', tip: '当前课关联题' };
    default:
      return { badge: '', tip: '点左侧内容块开始刷题' };
  }
});

const pickedLabel = computed(() => {
  if (props.focusNodeId) {
    const n = getNodeById(props.focusNodeId);
    return n ? n.label : '课限定';
  }
  if (card.value?.label) return card.value.label;
  if (curated.value?.title) return curated.value.title;
  return '';
});

const playerKey = computed(
  () =>
    `${deskMode.value}|${track.value}|${props.activeSetId || ''}|${props.focusNodeId || ''}|${poolSource.value}|${sessionKey.value}`
);

const wrongRows = computed(() =>
  wrongOpenList.value.map((w) => {
    const q = getQuestion(w.questionId || w.id);
    return {
      id: w.id,
      questionId: w.questionId || w.id,
      addedAt: w.addedAt,
      q: q?.q || w.questionId || w.id,
    };
  })
);

/**
 * @param {import('../../data/quiz/schema.js').QuizQuestion[]} list
 */
function prepareSession(list) {
  return shuffleCopy(list || []).map((q) => ({
    ...q,
    choices: shuffleCopy(q.choices || []),
  }));
}

onMounted(() => {
  initLibrary();
});

function rebuildSession() {
  if (deskMode.value === 'wrong-list') {
    activeQuestions.value = [];
    sessionTitle.value = '错题本';
    sessionCaption.value = `未掌握 ${wrongOpenCount.value} 题`;
    return;
  }

  if (deskMode.value === 'wrong-drill') {
    activeQuestions.value = prepareSession(questionsByIds(wrongOpenIds.value));
    sessionTitle.value = '再练错题';
    sessionCaption.value = `${activeQuestions.value.length} 题 · 答对两次可标掌握`;
    sessionKey.value += 1;
    return;
  }

  if (props.focusNodeId) {
    const node = getNodeById(props.focusNodeId);
    activeQuestions.value = prepareSession(questionsForNode(props.focusNodeId));
    sessionTitle.value = node ? `相关题 · ${node.label}` : '相关题';
    sessionCaption.value = `${activeQuestions.value.length} 题`;
    sessionKey.value += 1;
    return;
  }

  if (props.activeSetId === 'pool-random') {
    const qs = pickRandom({
      n: randomN.value,
      domain: domain.value === 'all' ? undefined : domain.value,
      glossary: 'exclude',
    });
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = '全库随机';
    sessionCaption.value = `${domainMeta(domain.value).label} · 本局 ${qs.length} 题`;
    sessionKey.value += 1;
    return;
  }

  if (props.activeSetId === 'pool-glossary') {
    const qs = pickRandom({
      n: randomN.value,
      glossary: 'only',
      domain: domain.value === 'all' ? undefined : domain.value,
    });
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = '名词释义';
    sessionCaption.value = `本局 ${qs.length} 题`;
    sessionKey.value += 1;
    return;
  }

  if (props.activeSetId?.startsWith('pool-')) {
    const dom = props.activeSetId.replace(/^pool-/, '');
    const meta = domainPoolMeta(dom);
    const glossMode =
      poolSource.value === 'topic'
        ? 'exclude'
        : poolSource.value === 'glossary'
          ? 'only'
          : 'include';
    const qs = pickRandom({
      n: randomN.value,
      domain: dom,
      glossary: glossMode,
    });
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = `${domainMeta(dom).label} · 综合池`;
    const srcLabel =
      poolSource.value === 'topic'
        ? '专题'
        : poolSource.value === 'glossary'
          ? '词典'
          : '全部';
    sessionCaption.value = `本章共 ${meta.topicCount} 专题题 · ${meta.glossaryCount} 词典题 · 本局${srcLabel} ${qs.length} 题`;
    sessionKey.value += 1;
    return;
  }

  if (curated.value) {
    const qs = questionsForSet(curated.value.id);
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = curated.value.title;
    const kind = setKindLabel(curated.value.kind);
    sessionCaption.value =
      curated.value.caption || `专题 · ${kind} · ${qs.length} 题`;
    sessionKey.value += 1;
    return;
  }

  activeQuestions.value = [];
  sessionTitle.value = '点左侧内容块';
  sessionCaption.value = `合计 ${quizQuestionCount()} 题 · 错题 ${wrongOpenCount.value}`;
}

watch(
  () => [props.activeSetId, props.focusNodeId, deskMode.value],
  (curr, prev) => {
    const [setId, nodeId, mode] = curr;
    const selectionChanged =
      prev != null && (setId !== prev[0] || nodeId !== prev[1]);

    if (selectionChanged) poolSource.value = 'all';

    if (
      selectionChanged &&
      (mode === 'wrong-list' || mode === 'wrong-drill') &&
      (setId || nodeId)
    ) {
      deskMode.value = 'practice';
      return;
    }

    rebuildSession();
  },
  { immediate: true }
);

watch(
  () => wrongOpenCount.value,
  () => {
    if (deskMode.value === 'wrong-list' || deskMode.value === 'wrong-drill') {
      rebuildSession();
    }
  }
);

function setMode(mode) {
  if (mode === 'wrong-list' || mode === 'wrong-drill' || mode === 'practice') {
    deskMode.value = mode;
  }
}

function clearToIdle() {
  emit('select-set', null);
  emit('close-focus');
}

function retakeSame() {
  rebuildSession();
}

/** @param {'all' | 'topic' | 'glossary'} src */
function setPoolSource(src) {
  if (poolSource.value === src) {
    retakeSame();
    return;
  }
  poolSource.value = src;
  retakeSame();
}

function goLearn(nodeId) {
  if (!nodeId || !getNodeById(nodeId)) return;
  emit('goto-learn', nodeId);
}

function drillWrong() {
  if (!wrongOpenCount.value) return;
  deskMode.value = 'wrong-drill';
}
</script>

<template>
  <div class="quiz-desk" role="article" aria-labelledby="quiz-desk-title">
    <header class="quiz-desk__head">
      <div class="quiz-desk__head-row">
        <div class="quiz-desk__head-titles">
          <p class="quiz-desk__eyebrow">Question desk</p>
          <h2 id="quiz-desk-title" class="quiz-desk__title">刷题台</h2>
        </div>
        <p class="quiz-desk__lede" aria-label="刷题概览">
          <span>错题 <strong>{{ wrongOpenCount }}</strong></span>
          <span>今日 <strong>{{ todayAnswerCount }}</strong></span>
        </p>
      </div>
    </header>

    <div class="quiz-desk__modes" role="tablist" aria-label="刷题模式">
      <button
        type="button"
        class="quiz-desk__chip"
        :class="{ active: deskMode === 'practice' }"
        role="tab"
        :aria-selected="deskMode === 'practice'"
        @click="setMode('practice')"
      >
        练习
      </button>
      <button
        type="button"
        class="quiz-desk__chip"
        :class="{ active: deskMode === 'wrong-list' || deskMode === 'wrong-drill' }"
        role="tab"
        :aria-selected="deskMode !== 'practice'"
        @click="setMode('wrong-list')"
      >
        错题本
        <span v-if="wrongOpenCount" class="quiz-desk__count">{{ wrongOpenCount }}</span>
      </button>
    </div>

    <section v-if="deskMode === 'practice'" class="quiz-desk__toolbar" aria-label="当前练习">
      <div v-if="track !== 'idle'" class="quiz-desk__session-bar">
        <span class="quiz-desk__badge" :data-track="track">{{ trackMeta.badge }}</span>
        <span v-if="pickedLabel" class="quiz-desk__session-name">{{ pickedLabel }}</span>
        <span class="quiz-desk__session-tip">{{ trackMeta.tip }}</span>
      </div>

      <!-- 全库随机 -->
      <template v-if="track === 'random'">
        <label class="quiz-desk__select-wrap">
          <span class="quiz-desk__select-label">领域</span>
          <select v-model="domain" class="quiz-desk__select" aria-label="抽题领域">
            <option v-for="t in QUIZ_DOMAINS" :key="t.id" :value="t.id">
              {{ t.label }}
            </option>
          </select>
        </label>
        <div class="quiz-desk__row quiz-desk__row--actions">
          <label class="quiz-desk__n">
            本局
            <input v-model.number="randomN" type="number" min="5" max="50" step="5" />
          </label>
          <button type="button" class="quiz-desk__primary" @click="retakeSame">
            {{ hasSession ? '再抽一局' : '开始抽题' }}
          </button>
          <button type="button" class="quiz-desk__ghost" @click="clearToIdle">
            取消选中
          </button>
        </div>
      </template>

      <!-- 全库名词 -->
      <template v-else-if="track === 'glossary'">
        <label class="quiz-desk__select-wrap">
          <span class="quiz-desk__select-label">领域</span>
          <select v-model="domain" class="quiz-desk__select" aria-label="词典领域">
            <option v-for="t in QUIZ_DOMAINS" :key="t.id" :value="t.id">
              {{ t.label }}
            </option>
          </select>
        </label>
        <div class="quiz-desk__row quiz-desk__row--actions">
          <label class="quiz-desk__n">
            本局
            <input v-model.number="randomN" type="number" min="5" max="50" step="5" />
          </label>
          <button
            type="button"
            class="quiz-desk__primary quiz-desk__primary--soft"
            @click="retakeSame"
          >
            {{ hasSession ? '再刷一局' : '开始刷题' }}
          </button>
          <button type="button" class="quiz-desk__ghost" @click="clearToIdle">
            取消选中
          </button>
        </div>
      </template>

      <!-- 本章综合：全部 / 专题 / 词典（专题题组在图上按概念·大厂分卡片） -->
      <template v-else-if="track === 'domain'">
        <div class="quiz-desk__row" role="tablist" aria-label="本章题源">
          <button
            type="button"
            class="quiz-desk__chip"
            :class="{ active: poolSource === 'all' }"
            :aria-selected="poolSource === 'all'"
            @click="setPoolSource('all')"
          >
            全部
          </button>
          <button
            type="button"
            class="quiz-desk__chip"
            :class="{ active: poolSource === 'topic' }"
            :aria-selected="poolSource === 'topic'"
            @click="setPoolSource('topic')"
          >
            专题
            <span v-if="chapterMeta" class="quiz-desk__count">{{ chapterMeta.topicCount }}</span>
          </button>
          <button
            type="button"
            class="quiz-desk__chip quiz-desk__chip--soft"
            :class="{ active: poolSource === 'glossary' }"
            :aria-selected="poolSource === 'glossary'"
            @click="setPoolSource('glossary')"
          >
            词典
            <span v-if="chapterMeta" class="quiz-desk__count">{{ chapterMeta.glossaryCount }}</span>
          </button>
        </div>
        <div class="quiz-desk__row quiz-desk__row--actions">
          <label class="quiz-desk__n">
            本局
            <input v-model.number="randomN" type="number" min="5" max="50" step="5" />
          </label>
          <button type="button" class="quiz-desk__primary" @click="retakeSame">
            {{ hasSession ? '再抽一局' : '开始抽题' }}
          </button>
          <button type="button" class="quiz-desk__ghost" @click="clearToIdle">
            取消选中
          </button>
        </div>
      </template>

      <!-- 单个专题题组 / 课限定：固定本组，不再叠综合池筛选项 -->
      <template v-else-if="track === 'topic' || track === 'lesson'">
        <div class="quiz-desk__row quiz-desk__row--actions">
          <button
            v-if="hasSession"
            type="button"
            class="quiz-desk__primary"
            @click="retakeSame"
          >
            {{ track === 'lesson' ? '再测本课' : '再测本组' }}
          </button>
          <button
            v-if="focusNodeId"
            type="button"
            class="quiz-desk__ghost"
            @click="emit('close-focus')"
          >
            清除课限定
          </button>
          <button type="button" class="quiz-desk__ghost" @click="clearToIdle">
            取消选中
          </button>
        </div>
      </template>
    </section>

    <section v-else-if="deskMode === 'wrong-list'" class="quiz-desk__wrong" aria-label="错题本">
      <div class="quiz-desk__row quiz-desk__row--actions">
        <button
          type="button"
          class="quiz-desk__primary"
          :disabled="!wrongOpenCount"
          @click="drillWrong"
        >
          再练全部错题
        </button>
        <button
          type="button"
          class="quiz-desk__ghost"
          :disabled="!wrongOpenCount"
          @click="clearWrongs()"
        >
          清空错题本
        </button>
      </div>
      <div v-if="!wrongRows.length" class="quiz-desk__empty">
        <h3>暂无错题</h3>
        <p>答错后会自动收入这里；连续答对两次可标掌握。</p>
      </div>
      <ul v-else class="quiz-desk__wrong-list">
        <li v-for="row in wrongRows" :key="row.id" class="quiz-desk__wrong-item">
          <p class="quiz-desk__wrong-q">{{ row.q }}</p>
          <div class="quiz-desk__wrong-actions">
            <button type="button" class="quiz-desk__ghost" @click="masterWrong(row.questionId)">
              标掌握
            </button>
            <button type="button" class="quiz-desk__ghost" @click="dropWrong(row.questionId)">
              移除
            </button>
          </div>
        </li>
      </ul>
    </section>

    <div v-if="deskMode === 'practice' && !hasSession" class="quiz-desk__empty">
      <h3>{{ sessionTitle }}</h3>
      <p>{{ sessionCaption }}</p>
    </div>

    <QuizPlayer
      v-if="(deskMode === 'practice' || deskMode === 'wrong-drill') && hasSession"
      :key="playerKey"
      :title="sessionTitle"
      :caption="sessionCaption"
      :questions="activeQuestions"
      @retake="retakeSame"
      @goto-learn="goLearn"
    />

    <div
      v-if="related.length && deskMode === 'practice' && hasSession && (track === 'topic' || track === 'lesson')"
      class="quiz-desk__related"
    >
      <p class="quiz-desk__related-label">相关课程</p>
      <div class="quiz-desk__chips">
        <button
          v-for="n in related"
          :key="n.id"
          type="button"
          class="quiz-desk__link"
          @click="goLearn(n.id)"
        >
          {{ n.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 刷题台：三轨分离——专题 / 全库随机 / 名词释义；错题本另页
 */
import { computed, onMounted, ref, watch } from 'vue';
import {
  QUIZ_DOMAINS,
  QUIZ_KINDS,
  domainMeta,
  getQuizSet,
  getQuestion,
  kindShortLabel,
  pickRandom,
  questionsByIds,
  questionsForNode,
  questionsForSet,
  quizQuestionCount,
  quizTopicQuestionCount,
  glossaryPoolMeta,
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

const kind = ref('all');
const domain = ref('all');
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

const totalBank = quizQuestionCount();
const topicCount = quizTopicQuestionCount();
const glossaryCount = glossaryPoolMeta().questionCount;
const hasSession = computed(() => activeQuestions.value.length > 0);

/**
 * 练习轨：idle | random | glossary | domain | topic | lesson
 */
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
      return {
        badge: '全库随机',
        tip: '从专题题里抽，不含名词释义',
      };
    case 'glossary':
      return {
        badge: '名词释义',
        tip: '词典四选一，作答后揭晓名词',
      };
    case 'domain':
      return {
        badge: '领域综合',
        tip: '本领域专题随机，不含名词',
      };
    case 'topic':
      return {
        badge: '专题题组',
        tip: '本组固定题，与名词轨分开',
      };
    case 'lesson':
      return {
        badge: '课限定',
        tip: '只刷与当前课关联的题',
      };
    default:
      return {
        badge: '',
        tip: '左侧点专题卡片，或下方进全库 / 名词',
      };
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
    `${deskMode.value}|${track.value}|${props.activeSetId || ''}|${props.focusNodeId || ''}|${sessionKey.value}`
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
    sessionCaption.value = `${activeQuestions.value.length} 题 · 课限定`;
    sessionKey.value += 1;
    return;
  }

  if (props.activeSetId === 'pool-random') {
    const qs = pickRandom({
      n: randomN.value,
      kind: kind.value,
      domain: domain.value === 'all' ? undefined : domain.value,
      excludeTag: '名词',
    });
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = '全库随机';
    sessionCaption.value = `${kindShortLabel(kind.value)} · ${domainMeta(domain.value).label} · ${qs.length} 题 · 已排除名词`;
    sessionKey.value += 1;
    return;
  }

  if (props.activeSetId === 'pool-glossary') {
    const qs = pickRandom({
      n: randomN.value,
      tag: '名词',
      domain: domain.value === 'all' ? undefined : domain.value,
    });
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = '名词释义';
    sessionCaption.value = `${qs.length} 题 · 作答后揭晓`;
    sessionKey.value += 1;
    return;
  }

  if (props.activeSetId?.startsWith('pool-')) {
    const dom = props.activeSetId.replace(/^pool-/, '');
    const qs = pickRandom({
      n: randomN.value,
      domain: dom,
      kind: kind.value === 'all' ? undefined : kind.value,
      excludeTag: '名词',
    });
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = `${domainMeta(dom).label} · 综合池`;
    sessionCaption.value = `${qs.length} 题 · 本领域专题`;
    sessionKey.value += 1;
    return;
  }

  if (curated.value) {
    const qs = questionsForSet(curated.value.id);
    activeQuestions.value = prepareSession(qs);
    sessionTitle.value = curated.value.title;
    sessionCaption.value =
      curated.value.caption ||
      `${kindShortLabel(curated.value.kind)} · ${qs.length} 题 · 专题`;
    sessionKey.value += 1;
    return;
  }

  activeQuestions.value = [];
  sessionTitle.value = '选一条练习轨';
  sessionCaption.value = `专题 ${topicCount} · 名词 ${glossaryCount} · 合计 ${totalBank}`;
}

watch(
  () => [props.activeSetId, props.focusNodeId, deskMode.value],
  (curr, prev) => {
    const [setId, nodeId, mode] = curr;
    const selectionChanged =
      prev != null && (setId !== prev[0] || nodeId !== prev[1]);

    // 仅在错题视图里「又点了左侧专题/课限定」时退回练习。
    // 进入错题本时若已有选中专题，绝不能立刻踢回练习（否则像刷新）。
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

function enterRandom() {
  deskMode.value = 'practice';
  emit('select-set', 'pool-random');
  if (props.activeSetId === 'pool-random') rebuildSession();
}

function enterGlossary() {
  deskMode.value = 'practice';
  emit('select-set', 'pool-glossary');
  if (props.activeSetId === 'pool-glossary') rebuildSession();
}

function clearToIdle() {
  emit('select-set', null);
  emit('close-focus');
}

function retakeSame() {
  rebuildSession();
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
      <p class="quiz-desk__eyebrow">Question desk</p>
      <h2 id="quiz-desk-title" class="quiz-desk__title">刷题台</h2>
      <p class="quiz-desk__lede">
        专题 <strong>{{ topicCount }}</strong>
        · 名词 <strong>{{ glossaryCount }}</strong>
        · 错题 <strong>{{ wrongOpenCount }}</strong>
        · 今日 <strong>{{ todayAnswerCount }}</strong>
      </p>
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

    <section v-if="deskMode === 'practice'" class="quiz-desk__toolbar" aria-label="练习轨">
      <div class="quiz-desk__tracks" role="group" aria-label="练习入口">
        <button
          type="button"
          class="quiz-desk__track"
          :class="{ active: track === 'random' }"
          @click="enterRandom"
        >
          <span class="quiz-desk__track-title">全库随机</span>
          <span class="quiz-desk__track-sub">专题题抽练 · {{ topicCount }}</span>
        </button>
        <button
          type="button"
          class="quiz-desk__track quiz-desk__track--gold"
          :class="{ active: track === 'glossary' }"
          @click="enterGlossary"
        >
          <span class="quiz-desk__track-title">名词释义</span>
          <span class="quiz-desk__track-sub">词典另册 · {{ glossaryCount }}</span>
        </button>
      </div>
      <p class="quiz-desk__track-hint">
        专题题组：点左侧彩色卡片（与名词分开，互不混入）
      </p>

      <div v-if="track !== 'idle'" class="quiz-desk__session-bar">
        <span class="quiz-desk__badge" :data-track="track">{{ trackMeta.badge }}</span>
        <span v-if="pickedLabel" class="quiz-desk__session-name">{{ pickedLabel }}</span>
        <span class="quiz-desk__session-tip">{{ trackMeta.tip }}</span>
      </div>

      <!-- 全库随机：筛题型 / 领域 -->
      <template v-if="track === 'random'">
        <div class="quiz-desk__row" role="tablist" aria-label="题型">
          <button
            v-for="t in QUIZ_KINDS"
            :key="t.id"
            type="button"
            class="quiz-desk__chip"
            :class="{ active: kind === t.id }"
            :aria-selected="kind === t.id"
            @click="kind = t.id"
          >
            {{ t.label }}
          </button>
        </div>
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
            题数
            <input v-model.number="randomN" type="number" min="5" max="50" step="5" />
          </label>
          <button type="button" class="quiz-desk__primary" @click="retakeSame">
            {{ hasSession ? '再抽一局' : '开始抽题' }}
          </button>
        </div>
      </template>

      <!-- 名词：只调题数 -->
      <template v-else-if="track === 'glossary'">
        <div class="quiz-desk__row quiz-desk__row--actions">
          <label class="quiz-desk__n">
            题数
            <input v-model.number="randomN" type="number" min="5" max="50" step="5" />
          </label>
          <button
            type="button"
            class="quiz-desk__primary quiz-desk__primary--soft"
            @click="retakeSame"
          >
            {{ hasSession ? '再刷一局名词' : '开始刷名词' }}
          </button>
        </div>
      </template>

      <!-- 领域综合池 -->
      <template v-else-if="track === 'domain'">
        <div class="quiz-desk__row" role="tablist" aria-label="题型">
          <button
            v-for="t in QUIZ_KINDS"
            :key="t.id"
            type="button"
            class="quiz-desk__chip"
            :class="{ active: kind === t.id }"
            :aria-selected="kind === t.id"
            @click="kind = t.id"
          >
            {{ t.label }}
          </button>
        </div>
        <div class="quiz-desk__row quiz-desk__row--actions">
          <label class="quiz-desk__n">
            题数
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

      <!-- 专题 / 课限定：固定题组 -->
      <template v-else-if="track === 'topic' || track === 'lesson'">
        <div class="quiz-desk__row quiz-desk__row--actions">
          <button
            v-if="hasSession"
            type="button"
            class="quiz-desk__primary"
            @click="retakeSame"
          >
            再测本专题
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

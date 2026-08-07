/**
 * 产品包 MCQ 精工闸门：截断 / 荒谬 / 洗衣单 / 填充 / 软 IWF
 * 排除 adapted / vibehub / g:
 * node scripts/_audit-mcq-craft.mjs
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { choiceLooksLikeFiller } from '../src/data/quiz/schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { listQuestions } = await import(
  pathToFileURL(path.join(root, 'src/data/quiz/bank.js')).href
);

const product = listQuestions().filter(
  (q) =>
    q.source !== 'adapted' &&
    !String(q.setId || '').startsWith('vibehub') &&
    !String(q.id || '').startsWith('g:') &&
    !String(q.id || '').startsWith('vh-')
);

/** 故意短闪卡 */
const FLASH =
  /^(concept-(linux-cmd|git-cmd|sql-kw|shell-cmd|http-status|http-hdr|docker-cmd|pnpm-cmd|env-var)-)/;

function isFlash(q) {
  return FLASH.test(String(q.setId || '')) || FLASH.test(String(q.id || ''));
}

function truncReasons(t) {
  const ct = String(t || '').trim();
  const r = [];
  if (/[，、]\s*[不未无没只还更已正]$/.test(ct)) r.push('prefix_cut_particle');
  if (/「[^」]*$/.test(ct)) r.push('open_corner');
  if (/（[^）]*$/.test(ct)) r.push('open_paren_cn');
  if (/\([^)]*$/.test(ct) && !/\([a-z]\)|\(s\)|\(n\)|\(id\)/i.test(ct)) r.push('open_paren');
  if (/[，、：:]$/.test(ct)) r.push('ends_comma');
  if (/https?:$/i.test(ct)) r.push('url_cut');
  if (/与 DN$|与中$|：资$|发送请$|频繁，触$|所有客户$|→ 定$|时尽$|且不$|env F$|如「每个$/.test(ct))
    r.push('known_frag');
  return r;
}

/** 荒谬干扰启发式（高召回可人工复核） */
const ABSURD_RE = [
  /用脚趾/,
  /烧香/,
  /求签/,
  /算命/,
  /念经/,
  /拍桌子/,
  /打电话给总统/,
  /删库跑路(?!.*备份)/,
  /随便猜/,
  /瞎写/,
  /随便选/,
  /以上都?对/,
  /以上都?错/,
  /以上皆是/,
  /以上皆非/,
  /看心情/,
  /用爱发电/,
  /量子纠缠/,
  /念咒语/,
  /重启宇宙/,
  /格式化大脑/,
  /把服务器吃掉/,
  /问隔壁王叔叔/,
  /抛硬币/,
  /闭眼选/,
];

function laundryReasons(stem) {
  const s = String(stem || '').trim();
  const r = [];
  // URL 查询串里的 ? 不算第二问号
  const noUrl = s.replace(/https?:\/\/\S+/gi, '');
  const qMarks = (noUrl.match(/[？?]/g) || []).length;
  if (qMarks >= 2) r.push('multi_qmark');
  if (/另[：:]|另外|其次|再问|以及.+[？?]|各是什么|三点|下列各项|哪几项/.test(s))
    r.push('laundry_cue');
  // 「分别」仅当像双问句（含第二个？或分号串问）
  if (/分别/.test(s) && (qMarks >= 2 || /[；;].+[？?]/.test(s)))
    r.push('laundry_fenbie');
  if (/[；;].+[？?]/.test(s) && /[？?].*[；;]/.test(s)) r.push('semi_multi');
  return r;
}

const trunc = [];
const absurd = [];
const laundry = [];
const filler = [];
const softIwf = [];
const allOf = [];
const oralHalf = [];

for (const q of product) {
  const stem = String(q.q || '').trim();
  if (/(应改|勿混指)[？?]$/.test(stem)) {
    oralHalf.push({ id: q.id, setId: q.setId, stem });
  }
  const lr = laundryReasons(stem);
  if (lr.length) laundry.push({ id: q.id, setId: q.setId, reasons: lr, stem });

  const oks = (q.choices || []).filter((c) => c.ok);
  const wrongs = (q.choices || []).filter((c) => !c.ok);

  for (const c of q.choices || []) {
    const tr = truncReasons(c.t);
    if (tr.length) trunc.push({ id: q.id, setId: q.setId, ok: !!c.ok, reasons: tr, t: c.t });
    if (choiceLooksLikeFiller(c.t)) {
      filler.push({ id: q.id, setId: q.setId, t: c.t });
    }
    for (const re of ABSURD_RE) {
      if (re.test(String(c.t || '')) || re.test(String(c.why || ''))) {
        absurd.push({
          id: q.id,
          setId: q.setId,
          ok: !!c.ok,
          match: String(re),
          t: c.t,
          why: c.why,
        });
        break;
      }
    }
    if (/以上皆是|以上皆非|以上都对|以上都错/.test(String(c.t || ''))) {
      allOf.push({ id: q.id, setId: q.setId, t: c.t });
    }
  }

  if (oks.length === 1 && wrongs.length === 3 && !isFlash(q)) {
    const okLen = [...String(oks[0].t || '')].length;
    const wLens = wrongs.map((c) => [...String(c.t || '')].length);
    const maxW = Math.max(...wLens, 0);
    const minW = Math.min(...wLens);
    const diff = okLen - maxW;
    if (diff >= 12 && okLen >= 28) {
      softIwf.push({
        id: q.id,
        setId: q.setId,
        tier: 'severe',
        okLen,
        maxW,
        diff,
        ok: oks[0].t,
        wrongs: wrongs.map((c) => c.t),
      });
    } else if (diff >= 8 && okLen >= 22) {
      softIwf.push({
        id: q.id,
        setId: q.setId,
        tier: 'soft',
        okLen,
        maxW,
        diff,
        ok: oks[0].t,
        wrongs: wrongs.map((c) => c.t),
      });
    }
    // 极短干扰相对正解（可能荒唐或偷懒）
    if (okLen >= 16 && minW <= 4 && maxW - minW >= 10) {
      absurd.push({
        id: q.id,
        setId: q.setId,
        ok: false,
        match: 'ultra_short_wrong',
        t: wrongs.find((c) => [...String(c.t || '')].length === minW)?.t,
        why: '',
      });
    }
  }
}

softIwf.sort((a, b) => b.diff - a.diff);

const report = {
  productN: product.length,
  truncN: trunc.length,
  absurdN: absurd.length,
  laundryN: laundry.length,
  fillerN: filler.length,
  allOfN: allOf.length,
  oralHalfN: oralHalf.length,
  iwfSevere: softIwf.filter((x) => x.tier === 'severe').length,
  iwfSoft: softIwf.filter((x) => x.tier === 'soft').length,
  trunc: trunc.slice(0, 80),
  absurd: absurd.slice(0, 80),
  laundry: laundry.slice(0, 60),
  filler: filler.slice(0, 40),
  allOf: allOf.slice(0, 40),
  oralHalf,
  iwfTop: softIwf.slice(0, 40),
};

fs.writeFileSync(
  path.join(root, 'scripts/_mcq-craft-report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(
  JSON.stringify(
    {
      productN: report.productN,
      truncN: report.truncN,
      absurdN: report.absurdN,
      laundryN: report.laundryN,
      fillerN: report.fillerN,
      allOfN: report.allOfN,
      oralHalfN: report.oralHalfN,
      iwfSevere: report.iwfSevere,
      iwfSoft: report.iwfSoft,
    },
    null,
    2
  )
);
console.log('\n=== TRUNC ===');
for (const x of report.trunc.slice(0, 25)) {
  console.log(`${x.id} ok=${x.ok} ${x.reasons.join(',')} :: ${x.t}`);
}
console.log('\n=== ABSURD ===');
for (const x of report.absurd.slice(0, 30)) {
  console.log(`${x.id} ${x.match} :: ${x.t}`);
}
console.log('\n=== LAUNDRY ===');
for (const x of report.laundry.slice(0, 25)) {
  console.log(`${x.id} ${x.reasons.join(',')} :: ${x.stem}`);
}
console.log('\n=== IWF TOP ===');
for (const x of report.iwfTop.slice(0, 15)) {
  console.log(
    `${x.tier} ${x.id} diff=${x.diff} ok=${x.okLen}\n  OK: ${x.ok}\n  W: ${x.wrongs.join(' | ')}`
  );
}

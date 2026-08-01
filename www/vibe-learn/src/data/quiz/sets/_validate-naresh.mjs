import rag from './interview-adapted-naresh-rag.js';
import llm from './interview-adapted-naresh-llm.js';
import agent from './interview-adapted-naresh-agent.js';
import transformer from './interview-adapted-naresh-transformer.js';
import { defineQuizSet, choiceLooksLikeFiller } from '../schema.js';

const sets = [
  ['rag', rag],
  ['llm', llm],
  ['agent', agent],
  ['transformer', transformer],
];

let failed = false;
for (const [name, mod] of sets) {
  const raw = mod.default;
  let set;
  try {
    set = defineQuizSet(raw);
  } catch (e) {
    console.error(`FAIL load ${name}:`, e.message);
    failed = true;
    continue;
  }
  const n = set.questions.length;
  console.log(`${name}: ${n} questions loaded`);
  for (const q of set.questions) {
    if (q.choices.length !== 4) {
      console.error(`FAIL ${q.id}: choices=${q.choices.length}`);
      failed = true;
    }
    const okCount = q.choices.filter((c) => c.ok).length;
    if (okCount !== 1) {
      console.error(`FAIL ${q.id}: ok=${okCount}`);
      failed = true;
    }
    for (const c of q.choices) {
      if (!c.why || c.why.length < 4) {
        console.error(`FAIL ${q.id}: missing/short why`);
        failed = true;
      }
      if (choiceLooksLikeFiller(c.t)) {
        console.error(`FAIL ${q.id}: filler choice`);
        failed = true;
      }
    }
  }
}
process.exit(failed ? 1 : 0);

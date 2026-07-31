/**
 * 静态题库分片汇总（生产 bank.js 只读这里）
 *
 * adapted-* 真源仍在本目录，经 `pnpm quiz:sync-sets` 生成 sets/ 后由 REGISTRY 入库；
 * 勿再 spread 进 STATIC_QUESTIONS，避免与精选题组双计。
 * guo-* 除 obs 外多为笔记 dump（表格/代码块/框线），REGISTRY 暂不收录，待 scrub 成短选项。
 */
import { QUESTIONS as dsa } from './dsa.js';
import { QUESTIONS as net } from './net.js';
import { QUESTIONS as osDb } from './os-db.js';
import { QUESTIONS as lang } from './lang.js';
import { QUESTIONS as craft } from './craft.js';
import { QUESTIONS as xrk } from './xrk.js';
import { QUESTIONS as ai } from './ai.js';
import { QUESTIONS as ops } from './ops.js';
import { QUESTIONS as glossary } from './glossary.js';

/** @type {import('../schema.js').QuizQuestion[]} */
export const STATIC_QUESTIONS = [
  ...dsa,
  ...net,
  ...osDb,
  ...lang,
  ...craft,
  ...xrk,
  ...ai,
  ...ops,
  ...glossary,
];

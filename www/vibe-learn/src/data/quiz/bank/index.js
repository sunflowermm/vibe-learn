/**
 * 静态题库分片汇总（生产 bank.js 只读这里）
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
// adapted-bank-imports
import { QUESTIONS as adapted_naresh_rag } from './adapted-naresh-rag.js';
import { QUESTIONS as adapted_naresh_llm } from './adapted-naresh-llm.js';
import { QUESTIONS as adapted_naresh_agent } from './adapted-naresh-agent.js';
import { QUESTIONS as adapted_naresh_transformer } from './adapted-naresh-transformer.js';
import { QUESTIONS as adapted_guo_rag } from './adapted-guo-rag.js';
import { QUESTIONS as adapted_guo_agent } from './adapted-guo-agent.js';
import { QUESTIONS as adapted_guo_prompt } from './adapted-guo-prompt.js';
import { QUESTIONS as adapted_guo_mcp } from './adapted-guo-mcp.js';
import { QUESTIONS as adapted_guo_multi_agent } from './adapted-guo-multi-agent.js';
import { QUESTIONS as adapted_guo_prod } from './adapted-guo-prod.js';
import { QUESTIONS as adapted_guo_rag_adv } from './adapted-guo-rag-adv.js';
import { QUESTIONS as adapted_guo_obs } from './adapted-guo-obs.js';
import { QUESTIONS as adapted_guo_sys } from './adapted-guo-sys.js';
import { QUESTIONS as adapted_landed_retrieval } from './adapted-landed-retrieval.js';
import { QUESTIONS as adapted_landed_embeddings } from './adapted-landed-embeddings.js';
import { QUESTIONS as adapted_landed_chunking } from './adapted-landed-chunking.js';
import { QUESTIONS as adapted_landed_reranking } from './adapted-landed-reranking.js';
import { QUESTIONS as adapted_landed_evaluation } from './adapted-landed-evaluation.js';
import { QUESTIONS as adapted_landed_production } from './adapted-landed-production.js';
import { QUESTIONS as adapted_landed_security } from './adapted-landed-security.js';

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
  // adapted-bank-spread
  ...adapted_naresh_rag,
  ...adapted_naresh_llm,
  ...adapted_naresh_agent,
  ...adapted_naresh_transformer,
  ...adapted_guo_rag,
  ...adapted_guo_agent,
  ...adapted_guo_prompt,
  ...adapted_guo_mcp,
  ...adapted_guo_multi_agent,
  ...adapted_guo_prod,
  ...adapted_guo_rag_adv,
  ...adapted_guo_obs,
  ...adapted_guo_sys,
  ...adapted_landed_retrieval,
  ...adapted_landed_embeddings,
  ...adapted_landed_chunking,
  ...adapted_landed_reranking,
  ...adapted_landed_evaluation,
  ...adapted_landed_production,
  ...adapted_landed_security,
];

/**
 * 导图1 面板：只挂 mapLinks，不往 markdown 里塞假「可点」文案
 * （跨导图跳转由 NodePanel 芯片 / 文末入口按钮触发）
 */
import { bridgesForKnowledge } from './map-bridges.js';

/**
 * @param {object | null} node  getNodeById 结果
 * @returns {object | null}
 */
export function combineKnowledgeWithMap2(node) {
  if (!node) return null;
  const mapLinks = bridgesForKnowledge(node.id);
  return { ...node, mapLinks };
}

/**
 * 从节点 id / tag 推断题库 domain
 * @param {string} nodeId
 * @param {string} [tag]
 * @returns {import('../categories.js').QuizDomainId}
 */
export function inferDomain(nodeId = '', tag = '') {
  const id = String(nodeId);
  const t = String(tag);
  if (
    /^(dsa-|e-dsa)/.test(id) ||
    t.includes('DSA') ||
    t.includes('复杂度') ||
    t.includes('算法')
  ) {
    return 'dsa';
  }
  if (
    /^(ai-|e-ai|e-pipe-token|e-agent|e-mcp|e-stream-ai)/.test(id) ||
    t.includes('人工智能') ||
    t.includes('AI')
  ) {
    return 'ai';
  }
  if (
    /^(xrk-|adev-|e-xrk|e-adev|e-min|e-firstrun|e-lab)/.test(id) ||
    t.includes('XRK') ||
    t.includes('Vibe') ||
    t.includes('Chapter 04')
  ) {
    return 'xrk';
  }
  if (
    /^(network|api-|protocol|ip-|tcp-|routing|dns-|http-|reverse|net-|e-net|e-http|e-tcp|e-dns|e-proxy|e-nginx|e-edge|e-route|e-stack-ip|e-stack-tcp|e-api)/.test(
      id
    ) ||
    t.includes('网络') ||
    t.includes('Chapter 03')
  ) {
    return 'net';
  }
  if (
    /^(craft-|git-|workbench-|e-debug|e-sec|e-test|e-obs|e-ci|e-git|e-wb|e-adv)/.test(id) ||
    t.includes('工程') ||
    t.includes('调试') ||
    t.includes('安全') ||
    t.includes('测试')
  ) {
    return 'craft';
  }
  if (
    /^(db-|ops-|panel-|host-|clash|esp-|fs-|terminal|linux|runtime|installers|package|e-db|e-ops|e-panel|e-clash|e-esp|e-fs|e-term|e-cli|e-distro|e-node|e-install|e-pnpm|e-docker|e-systemd|e-tls|e-bak)/.test(
      id
    ) ||
    t.includes('运维') ||
    t.includes('面板') ||
    t.includes('容器') ||
    t.includes('数据库') ||
    t.includes('终端') ||
    t.includes('Chapter 01')
  ) {
    if (/^db-|e-db|e-sql|e-redis|e-sqlite/.test(id) || t.includes('数据库')) {
      return 'os-db';
    }
    if (/^(computer|os-|hw-|chip-|e-sys|e-os)/.test(id) || t.includes('序章') || t.includes('00')) {
      return 'os-db';
    }
    return 'ops';
  }
  if (
    /^(computer|os-|hw-|chip-)/.test(id) ||
    t.includes('Chapter 00') ||
    t.includes('系统')
  ) {
    return 'os-db';
  }
  if (
    /^(code-|data-|lang-|fw-|e-c-|e-lang|e-js|e-ts|e-py|e-what|e-lib|e-fw|e-stack|e-land|e-sel)/.test(
      id
    ) ||
    t.includes('编程') ||
    t.includes('语言') ||
    t.includes('Chapter 02') ||
    t.includes('01.5')
  ) {
    return 'lang';
  }
  return 'lang';
}

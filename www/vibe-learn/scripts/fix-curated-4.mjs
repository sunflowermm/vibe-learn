/**
 * 一次性：给 sets/*.js 中不足 4 选项的题目补一条真实干扰项（写入文件）。
 * node scripts/fix-curated-4.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const setsDir = path.resolve(__dirname, '../src/data/quiz/sets');

const PADS_BY_DOMAIN = {
  dsa: [
    '把平均时间复杂度与最坏情况混为一谈',
    '认为哈希冲突在任意负载下都可忽略',
    '把递归栈空间当成常数额外空间',
  ],
  net: [
    '把传输层可靠交付说成物理层信号编码职责',
    '认为 HTTPS 只加密 URL 路径不保护报文',
    '把 DNS 解析等同于 TLS 握手全过程',
  ],
  'os-db': [
    '认为用户态程序可任意读写物理地址',
    '把 ACID 的隔离性说成网络分区容忍',
    '认为事务提交失败后仍保证外部可见写入',
  ],
  lang: [
    '把异步回调与多线程抢占调度完全等同',
    '认为闭包会自动消除所有竞态',
    '把类型标注当成运行时强制沙箱',
  ],
  craft: [
    '认为 git push --force 对共享分支无风险',
    '把单元测试覆盖率 100% 当成无缺陷证明',
    '认为日志级别与告警策略可以完全不做',
  ],
  xrk: [
    '把 Core 业务逻辑直接写进 src/infrastructure',
    '认为子服插件配置应在子服本地随意改写主服真源',
    '把 www 静态页密钥硬编码进前端包',
  ],
  ai: [
    '把 Embedding 相似度检索当成精确 SQL 等价',
    '认为 RAG 一定不需要权限与来源校验',
    '把上下文窗口填满等同于回答正确',
  ],
  ops: [
    '认为容器镜像 digest 变化不影响可复现部署',
    '把反向代理与应用进程生命周期完全解耦后即可不管健康检查',
    '认为暴露管理端口到公网且无鉴权可接受',
  ],
};

function detectDomain(src) {
  const m = src.match(/domain:\s*['"]([^'"]+)['"]/);
  return m?.[1] || 'lang';
}

function countChoiceItems(block) {
  return (block.match(/\{\s*t:/g) || []).length;
}

function transform(src) {
  const domain = detectDomain(src);
  const pads = PADS_BY_DOMAIN[domain] || PADS_BY_DOMAIN.lang;
  let padIdx = 0;
  let patched = 0;

  const out = src.replace(/choices:\s*\[([\s\S]*?)\]/g, (full, inner) => {
    const n = countChoiceItems(inner);
    if (n >= 4) return full;
    if (n < 1) return full;
    const need = 4 - n;
    let add = '';
    for (let i = 0; i < need; i += 1) {
      const t = pads[padIdx % pads.length];
      padIdx += 1;
      add += `\n        { t: ${JSON.stringify(t)}, ok: false, why: '范畴或前提不符。' },`;
      patched += 1;
    }
    const trimmed = inner.replace(/\s*$/, '');
    const needsComma = /,\s*$/.test(trimmed) ? '' : ',';
    return `choices: [${trimmed}${needsComma}${add}\n      ]`;
  });

  return { out, patched };
}

let total = 0;
for (const name of fs.readdirSync(setsDir).filter((f) => f.endsWith('.js'))) {
  const p = path.join(setsDir, name);
  const src = fs.readFileSync(p, 'utf8');
  const { out, patched } = transform(src);
  if (patched) {
    fs.writeFileSync(p, out, 'utf8');
    console.log(name, '+', patched);
    total += patched;
  } else {
    console.log(name, 'ok');
  }
}
console.log('total pads', total);

import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-dsa-union-find-kw',
  title: '基础 · 并查集',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '并查集'],
  relatedNodes: ['dsa-union-find'],
  caption: '动态连通；路径压缩。',
  questions: [
    {
      id: 'concept-dsa-union-find-kw:api',
      q: '并查集两个核心操作？',
      choices: [
        { t: 'find 与 union', ok: true, why: '查根与合并。' },
        { t: 'sort 与 binary', ok: false, why: '不是连通 API。' },
        { t: '只能 insert', ok: false, why: '还要查询同集。' },
        { t: '重建邻接矩阵', ok: false, why: '通常改 parent。' },
      ],
      relatedNodes: ['dsa-union-find'],
    },
    {
      id: 'concept-dsa-union-find-kw:compress',
      q: '路径压缩在优化什么？',
      choices: [
        { t: 'find 时把树压矮', ok: true, why: '均摊近常数。' },
        { t: '把边权全改成 1', ok: false, why: '基础 UF 不谈权。' },
        { t: '每次 union 扫全表', ok: false, why: '那是退化。' },
        { t: '改成只匹配字符串', ok: false, why: '通用优化。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-complexity'],
    },
    {
      id: 'concept-dsa-union-find-kw:vs',
      q: '何时偏并查集而非一次 DFS？',
      choices: [
        { t: '边动态加入要连通查询', ok: true, why: '动态连通。' },
        { t: '静态网格只问一次', ok: false, why: 'DFS/BFS 更直接。' },
        { t: 'UF 不能管连通', ok: false, why: '正是主场。' },
        { t: '图题必须 Dijkstra', ok: false, why: '连通≠最短路。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-union-find-kw:kruskal',
      q: 'Kruskal 为何点名并查集？',
      choices: [
        { t: '加边前判是否已连通', ok: true, why: '避免成环。' },
        { t: '用栈匹配括号', ok: false, why: '题型不对。' },
        { t: '禁止任何集合结构', ok: false, why: 'UF 是标配。' },
        { t: '替代边权排序', ok: false, why: '仍要排序。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-union-find-kw:red',
      q: '冗余边（会成环）用 UF 怎么抓？',
      choices: [
        { t: '两端已同根则冗余', ok: true, why: '同分量再连。' },
        { t: '边越多连通越差', ok: false, why: '说反了。' },
        { t: '必须先二分边权', ok: false, why: '非主路径。' },
        { t: '只能字符串哈希', ok: false, why: '图连通用 UF。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-hot'],
    },
  ],
});

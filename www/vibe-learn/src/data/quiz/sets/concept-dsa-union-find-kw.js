import { defineQuizSet } from '../schema.js';

/** 基础 · 并查集 */
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
        { t: 'find（查根）与 union（合并）', ok: true, why: '连通查询与合并分量。' },
        { t: 'sort 与 binary search', ok: false, why: '不是连通 API。' },
        { t: '只能 insert，不能查询同集', ok: false, why: '查询同根正是核心。' },
        { t: '每次重建整张邻接矩阵', ok: false, why: '通常只改 parent/秩。' },
      ],
      relatedNodes: ['dsa-union-find'],
    },
    {
      id: 'concept-dsa-union-find-kw:compress',
      q: '路径压缩在优化什么？',
      choices: [
        { t: 'find 时把树上节点压向根，树更矮', ok: true, why: '均摊近常数。' },
        { t: '把所有边权强行改成 1', ok: false, why: '基础 UF 不谈边权。' },
        { t: '每次 union 都扫一遍全表', ok: false, why: '那是性能退化。' },
        { t: '改成只服务字符串匹配', ok: false, why: '路径压缩是通用优化。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-complexity'],
    },
    {
      id: 'concept-dsa-union-find-kw:vs',
      q: '何时偏并查集而非一次 DFS？',
      choices: [
        { t: '边会动态加入，并反复问两点是否连通', ok: true, why: '动态连通主场。' },
        { t: '静态网格只问一次连通块', ok: false, why: '一次 DFS/BFS 更直接。' },
        { t: '并查集根本不能维护连通关系', ok: false, why: '连通正是主场。' },
        { t: '图题一律必须 Dijkstra', ok: false, why: '连通性 ≠ 最短路。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-union-find-kw:kruskal',
      q: 'Kruskal 为何点名并查集？',
      choices: [
        { t: '加边前判断两端是否已在同一连通分量', ok: true, why: '避免成环。' },
        { t: '用栈做括号匹配代替判环', ok: false, why: 'MST 用 UF 判连通。' },
        { t: '禁止使用任何集合类结构', ok: false, why: 'UF 正是标配。' },
        { t: '用并查集替代边权排序步骤', ok: false, why: 'Kruskal 仍要先按权排序。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-graph'],
    },
    {
      id: 'concept-dsa-union-find-kw:red',
      q: '冗余边（再连会成环）用 UF 怎么抓？',
      choices: [
        { t: '两端已经同根，则该边冗余', ok: true, why: '同分量再连必成环。' },
        { t: '边越多连通性一定越差', ok: false, why: '说反了。' },
        { t: '必须先对边权做二分', ok: false, why: '冗余边判定不依赖二分边权。' },
        { t: '只能靠字符串哈希判断连通', ok: false, why: '图连通用 UF/DFS。' },
      ],
      relatedNodes: ['dsa-union-find', 'dsa-hot'],
    },
  ],
});

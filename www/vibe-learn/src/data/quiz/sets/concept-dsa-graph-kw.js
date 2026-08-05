import { defineQuizSet } from '../schema.js';

/** 基础 · 图：BFS/DFS/拓扑/表示；干扰项=邻近算法误判 */
export default defineQuizSet({
  id: 'concept-dsa-graph-kw',
  title: '基础 · 图',
  kind: 'concept',
  domain: 'dsa',
  tags: ['DSA', '图', '基础'],
  relatedNodes: ['dsa-graph'],
  caption: 'BFS/DFS/拓扑/表示。',
  questions: [
    {
      id: 'concept-dsa-graph-kw:bfs',
      q: '无权图求最少边数到达目标，优先？',
      choices: [
        { t: 'BFS：队列按层扩展', ok: true, why: '无权最短路径=最少边数，层序即答案。' },
        { t: 'DFS：一条路走到尽头再回溯', ok: false, why: '先走到的路径不一定最短。' },
        { t: '对节点编号做二分查找', ok: false, why: '图距离不是有序数组查找。' },
        { t: '先按边权全排序再贪心', ok: false, why: '无权图不必排序边权。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-graph-kw:dfs',
      q: '网格沉岛 / 连通分量计数，常用？',
      choices: [
        { t: 'DFS/BFS 标记已访问再遍历', ok: true, why: '标记防回头；每开一块新分量计数+1。' },
        { t: '把格子值当有序数组硬二分', ok: false, why: '连通关系不是二分查找。' },
        { t: '只对每行排序后再逐行比较', ok: false, why: '排序会打乱邻接，丢连通信息。' },
        { t: '用栈只做括号匹配来计数岛屿', ok: false, why: '括号栈不表达网格四连通。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-graph-kw:topo',
      q: '有向依赖能否排成合法顺序，用？',
      choices: [
        { t: '拓扑排序，并借此检测有环', ok: true, why: '有环则无法排出全序。' },
        { t: '按课程名字做字典序排序', ok: false, why: '字典序≠依赖拓扑序。' },
        { t: '按编号对节点做二分查找', ok: false, why: '编号大小不等于依赖方向。' },
        { t: '用堆按名字长短求「最短课名」', ok: false, why: '问的是可否排程，不是名字长度。' },
      ],
      relatedNodes: ['dsa-graph', 'dsa-hot'],
    },
    {
      id: 'concept-dsa-graph-kw:adj',
      q: '边很少的稀疏图，最常用表示？',
      choices: [
        { t: '邻接表（空间大致随边数）', ok: true, why: '稀疏时比邻接矩阵省空间。' },
        { t: '必须用 n×n 邻接矩阵', ok: false, why: '稀疏时矩阵大量空边浪费。' },
        { t: '只用栈存边，当作图的唯一表示', ok: false, why: '栈是遍历辅助，不是图存储主结构。' },
        { t: '只用并查集代替邻接关系', ok: false, why: '并查集回答连通，不保存完整邻接表。' },
      ],
      relatedNodes: ['dsa-graph'],
    },
    {
      id: 'concept-dsa-graph-kw:vs',
      q: 'BFS 与 DFS 在结构上的典型差异？',
      choices: [
        { t: 'BFS 用队列；DFS 用栈（递归也是栈）', ok: true, why: '扩层 vs 一路深入再回溯。' },
        { t: '两者都必须用堆当优先队列才能正确完成遍历', ok: false, why: '堆是 Dijkstra 等带权场景，不是 BFS/DFS 标配。' },
        { t: '两者都必须先二分再遍历，否则结果一律非法', ok: false, why: '二分是有序查找，与图遍历无关。' },
        { t: '两者都禁止标记已访问节点，声称以免漏解', ok: false, why: '有环/网格都要标记，否则可能死循环。' },
      ],
      relatedNodes: ['dsa-graph'],
    },
  ],
});

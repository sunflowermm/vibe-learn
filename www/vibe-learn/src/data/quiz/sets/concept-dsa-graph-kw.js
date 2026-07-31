import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-dsa-graph-kw",
  title: "基础 · 图论名词全表",
  kind: 'concept',
  domain: "dsa",
  tags: ["DSA","图","基础"],
  relatedNodes: ["dsa-graph"],
  caption: "邻接表/矩阵、BFS/DFS、拓扑——图题开口音。",
  questions: [
  {
    "id": "concept-dsa-graph-kw:adj_list",
    "q": "稀疏图更常选哪种表示？",
    "choices": [
      {
        "t": "邻接表",
        "ok": true,
        "why": "邻接表：每个顶点存邻居列表。稀疏图最常用，空间约 O(V+E)。"
      },
      {
        "t": "必须用 n×n 邻接矩阵",
        "ok": false,
        "why": "与「邻接表」不符。"
      },
      {
        "t": "只能用并查集",
        "ok": false,
        "why": "与「邻接表」不符。"
      },
      {
        "t": "禁止存邻居",
        "ok": false,
        "why": "与「邻接表」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-graph"
    ],
    "tags": [
      "基础",
      "adj_list"
    ]
  },
  {
    "id": "concept-dsa-graph-kw:adj_mat",
    "q": "邻接矩阵的典型代价与收益？",
    "choices": [
      {
        "t": "空间 O(n²)，判两点是否有边可 O(1)",
        "ok": true,
        "why": "邻接矩阵：n×n 判边 O(1)，稠密图或需快速判边时用；空间 O(n²)。"
      },
      {
        "t": "空间永远 O(1)",
        "ok": false,
        "why": "与「邻接矩阵」不符。"
      },
      {
        "t": "无法表示有向图",
        "ok": false,
        "why": "与「邻接矩阵」不符。"
      },
      {
        "t": "只能用于树",
        "ok": false,
        "why": "与「邻接矩阵」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-graph"
    ],
    "tags": [
      "基础",
      "adj_mat"
    ]
  },
  {
    "id": "concept-dsa-graph-kw:bfs",
    "q": "无权图求最短层数更贴？",
    "choices": [
      {
        "t": "BFS（队列按层）",
        "ok": true,
        "why": "BFS：队列逐层扩展。无权图最短层数、层序、岛屿「沉岛」等常用。"
      },
      {
        "t": "只能 Dijkstra 且必须有负权",
        "ok": false,
        "why": "与「BFS（广度优先）」不符。"
      },
      {
        "t": "只能用堆排序",
        "ok": false,
        "why": "与「BFS（广度优先）」不符。"
      },
      {
        "t": "禁止标记 visited",
        "ok": false,
        "why": "与「BFS（广度优先）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-graph"
    ],
    "tags": [
      "基础",
      "bfs"
    ]
  },
  {
    "id": "concept-dsa-graph-kw:dfs",
    "q": "DFS 常用辅助？",
    "choices": [
      {
        "t": "栈或递归，并配合 visited 防回头",
        "ok": true,
        "why": "DFS：栈或递归走深。连通分量、路径存在、拓扑前奏、网格沉岛均可。"
      },
      {
        "t": "只能用队列且禁止递归",
        "ok": false,
        "why": "与「DFS（深度优先）」不符。"
      },
      {
        "t": "一定比 BFS 层数更短",
        "ok": false,
        "why": "与「DFS（深度优先）」不符。"
      },
      {
        "t": "不需要防回头",
        "ok": false,
        "why": "与「DFS（深度优先）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-graph"
    ],
    "tags": [
      "基础",
      "dfs"
    ]
  },
  {
    "id": "concept-dsa-graph-kw:topo",
    "q": "拓扑排序适用前提？",
    "choices": [
      {
        "t": "有向无环图；有环则不存在完整拓扑序",
        "ok": true,
        "why": "拓扑排序：有向无环图（DAG）上的线性序。课程表、任务依赖；有环则无法完成。入度表+队列是经典。"
      },
      {
        "t": "任意有环图也必有唯一拓扑序",
        "ok": false,
        "why": "与「拓扑排序」不符。"
      },
      {
        "t": "只能用于无向树",
        "ok": false,
        "why": "与「拓扑排序」不符。"
      },
      {
        "t": "与依赖无关",
        "ok": false,
        "why": "与「拓扑排序」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-graph",
      "dsa-hot"
    ],
    "tags": [
      "基础",
      "topo"
    ]
  }
],
});

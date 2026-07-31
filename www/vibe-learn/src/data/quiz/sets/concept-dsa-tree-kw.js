import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-dsa-tree-kw",
  title: "基础 · 树与堆全表",
  kind: 'concept',
  domain: "dsa",
  tags: ["DSA","树","堆","基础"],
  relatedNodes: ["dsa-tree"],
  caption: "二叉树遍历、BST、堆、TopK——层级结构与优先队列。",
  questions: [
  {
    "id": "concept-dsa-tree-kw:preorder",
    "q": "二叉树前序遍历的顺序？",
    "choices": [
      {
        "t": "根 → 左子树 → 右子树",
        "ok": true,
        "why": "前序：根 → 左 → 右。常用于复制结构、前缀表达。"
      },
      {
        "t": "左 → 根 → 右",
        "ok": false,
        "why": "与「前序遍历」不符。"
      },
      {
        "t": "左 → 右 → 根",
        "ok": false,
        "why": "与「前序遍历」不符。"
      },
      {
        "t": "只能层序不能递归",
        "ok": false,
        "why": "与「前序遍历」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "preorder"
    ]
  },
  {
    "id": "concept-dsa-tree-kw:inorder",
    "q": "BST 上做中序遍历的典型结果？",
    "choices": [
      {
        "t": "键按升序（有序）输出",
        "ok": true,
        "why": "中序：左 → 根 → 右。BST 中序得到有序序列——开口高频点。"
      },
      {
        "t": "一定随机无序",
        "ok": false,
        "why": "与「中序遍历」不符。"
      },
      {
        "t": "只能得到层序",
        "ok": false,
        "why": "与「中序遍历」不符。"
      },
      {
        "t": "一定降序且与 BST 无关",
        "ok": false,
        "why": "与「中序遍历」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "inorder"
    ]
  },
  {
    "id": "concept-dsa-tree-kw:postorder",
    "q": "后序遍历更贴哪类需求？",
    "choices": [
      {
        "t": "先处理左右孩子再处理根（如删树）",
        "ok": true,
        "why": "后序：左 → 右 → 根。删树、后缀表达、先处理孩子再处理根。"
      },
      {
        "t": "必须先根后孩子",
        "ok": false,
        "why": "与「后序遍历」不符。"
      },
      {
        "t": "只能用于链表",
        "ok": false,
        "why": "与「后序遍历」不符。"
      },
      {
        "t": "等同 BFS",
        "ok": false,
        "why": "与「后序遍历」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "postorder"
    ]
  },
  {
    "id": "concept-dsa-tree-kw:level",
    "q": "层序遍历常用哪类辅助结构？",
    "choices": [
      {
        "t": "队列（BFS 按层扩展）",
        "ok": true,
        "why": "层序：逐层访问，队列 BFS。锯齿层序、每层最右节点等题模板。"
      },
      {
        "t": "只能用递归且禁止队列",
        "ok": false,
        "why": "与「层序遍历」不符。"
      },
      {
        "t": "必须用并查集",
        "ok": false,
        "why": "与「层序遍历」不符。"
      },
      {
        "t": "只能用优先队列",
        "ok": false,
        "why": "与「层序遍历」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "level"
    ]
  },
  {
    "id": "concept-dsa-tree-kw:bst",
    "q": "BST 的结构约定？",
    "choices": [
      {
        "t": "左子树所有键小于根，右子树所有键大于根",
        "ok": true,
        "why": "BST：左子树键 < 根 < 右子树。查找/插入平均 O(log n)，退化成链则 O(n)。"
      },
      {
        "t": "父节点必须小于所有孩子（堆序）",
        "ok": false,
        "why": "与「二叉搜索树（BST）」不符。"
      },
      {
        "t": "只能有一个孩子",
        "ok": false,
        "why": "与「二叉搜索树（BST）」不符。"
      },
      {
        "t": "中序一定无序",
        "ok": false,
        "why": "与「二叉搜索树（BST）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "bst"
    ]
  },
  {
    "id": "concept-dsa-tree-kw:heap",
    "q": "二叉堆在工程里更常直接对应？",
    "choices": [
      {
        "t": "优先队列：快速取最大/最小并动态插入",
        "ok": true,
        "why": "堆：满足堆序的完全二叉树，常数组实现。父优于子；插入上浮、删顶下沉 O(log n)。"
      },
      {
        "t": "必须替代所有哈希表",
        "ok": false,
        "why": "与「堆（优先队列）」不符。"
      },
      {
        "t": "只能存字符串",
        "ok": false,
        "why": "与「堆（优先队列）」不符。"
      },
      {
        "t": "查找任意键平均 O(1) 且无需比较",
        "ok": false,
        "why": "与「堆（优先队列）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "heap"
    ]
  },
  {
    "id": "concept-dsa-tree-kw:topk",
    "q": "用大小为 K 的堆求 TopK，时间量级直觉？",
    "choices": [
      {
        "t": "约 O(n log K)",
        "ok": true,
        "why": "TopK：维持大小为 K 的堆扫 n 个元素 → O(n log K)。第 K 大常用小顶堆。"
      },
      {
        "t": "一定是 O(1)",
        "ok": false,
        "why": "与「TopK 与堆」不符。"
      },
      {
        "t": "一定是 O(n!)",
        "ok": false,
        "why": "与「TopK 与堆」不符。"
      },
      {
        "t": "与 K 无关且总是 O(n²)",
        "ok": false,
        "why": "与「TopK 与堆」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-tree",
      "dsa-hot"
    ],
    "tags": [
      "基础",
      "topk"
    ]
  }
],
});

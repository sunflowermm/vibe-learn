import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-dsa-linear-kw",
  title: "基础 · 线性结构全表",
  kind: 'concept',
  domain: "dsa",
  tags: ["DSA","线性结构","基础"],
  relatedNodes: ["dsa-linear","dsa-complexity"],
  caption: "数组、链表、栈、队列、双端队列、哑节点——DSA 底座一物一题。",
  questions: [
  {
    "id": "concept-dsa-linear-kw:array",
    "q": "数组相对链表的突出优点？",
    "choices": [
      {
        "t": "按下标随机访问快（常 O(1)）",
        "ok": true,
        "why": "数组：下标连续，随机访问 O(1)；中部插入删除常 O(n)。JS Array 日常当动态数组用。"
      },
      {
        "t": "任意位置插入永远比链表便宜",
        "ok": false,
        "why": "与「数组 / 动态数组」不符。"
      },
      {
        "t": "不能存引用类型",
        "ok": false,
        "why": "与「数组 / 动态数组」不符。"
      },
      {
        "t": "只能用递归访问",
        "ok": false,
        "why": "与「数组 / 动态数组」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-linear"
    ],
    "tags": [
      "基础",
      "array"
    ]
  },
  {
    "id": "concept-dsa-linear-kw:linked_list",
    "q": "链表相对数组的典型代价？",
    "choices": [
      {
        "t": "按下标随机访问慢，常要 O(n) 遍历",
        "ok": true,
        "why": "链表：节点用指针/引用串联；已知节点时局部插入删除便宜，随机访问要 O(n)。常考反转、环、合并。"
      },
      {
        "t": "永远不能插入",
        "ok": false,
        "why": "与「链表」不符。"
      },
      {
        "t": "缓存一定更好",
        "ok": false,
        "why": "与「链表」不符。"
      },
      {
        "t": "只能实现队列不能实现栈",
        "ok": false,
        "why": "与「链表」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-linear"
    ],
    "tags": [
      "基础",
      "linked_list"
    ]
  },
  {
    "id": "concept-dsa-linear-kw:stack",
    "q": "栈（LIFO）更贴哪类场景？",
    "choices": [
      {
        "t": "括号匹配、撤销、深度优先的回溯",
        "ok": true,
        "why": "栈：LIFO 后进先出；一端进出。典型：括号匹配、撤销、DFS/递归模拟。"
      },
      {
        "t": "银行叫号先来先服务",
        "ok": false,
        "why": "与「栈（Stack）」不符。"
      },
      {
        "t": "必须 O(1) 取第 k 大",
        "ok": false,
        "why": "与「栈（Stack）」不符。"
      },
      {
        "t": "只能用队列实现且禁止数组",
        "ok": false,
        "why": "与「栈（Stack）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-linear"
    ],
    "tags": [
      "基础",
      "stack"
    ]
  },
  {
    "id": "concept-dsa-linear-kw:queue",
    "q": "队列（FIFO）更贴？",
    "choices": [
      {
        "t": "广度优先、公平排队：先入先出",
        "ok": true,
        "why": "队列：FIFO 先进先出；典型 BFS、任务排队。JS 可用数组 push + shift 模拟（大数据量注意 shift 成本）。"
      },
      {
        "t": "括号嵌套匹配的主结构",
        "ok": false,
        "why": "与「队列（Queue）」不符。"
      },
      {
        "t": "只能后进先出",
        "ok": false,
        "why": "与「队列（Queue）」不符。"
      },
      {
        "t": "必须哈希才能实现",
        "ok": false,
        "why": "与「队列（Queue）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-linear"
    ],
    "tags": [
      "基础",
      "queue"
    ]
  },
  {
    "id": "concept-dsa-linear-kw:deque",
    "q": "双端队列相对普通队列？",
    "choices": [
      {
        "t": "两端都可插入/删除，适合窗口最值等题",
        "ok": true,
        "why": "双端队列：两头都能进出；滑动窗口最值等题常用单调双端队列。"
      },
      {
        "t": "只能从一端操作",
        "ok": false,
        "why": "与「双端队列（Deque）」不符。"
      },
      {
        "t": "等同二叉树",
        "ok": false,
        "why": "与「双端队列（Deque）」不符。"
      },
      {
        "t": "禁止用于 BFS",
        "ok": false,
        "why": "与「双端队列（Deque）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-linear",
      "dsa-hot"
    ],
    "tags": [
      "基础",
      "deque"
    ]
  },
  {
    "id": "concept-dsa-linear-kw:dummy",
    "q": "链表题里哑节点（dummy）的主要价值？",
    "choices": [
      {
        "t": "简化头结点边界，少写空指针特判",
        "ok": true,
        "why": "哑节点：链表题里放在真头前的哨兵，简化头插/头删边界，少写空指针特判。"
      },
      {
        "t": "提高 CPU 主频",
        "ok": false,
        "why": "与「哑节点（Dummy）」不符。"
      },
      {
        "t": "替代哈希表",
        "ok": false,
        "why": "与「哑节点（Dummy）」不符。"
      },
      {
        "t": "强制改成数组",
        "ok": false,
        "why": "与「哑节点（Dummy）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-linear"
    ],
    "tags": [
      "基础",
      "dummy"
    ]
  }
],
});

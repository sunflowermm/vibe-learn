import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-sql-kw",
  title: "基础 · SQL 关键字全表",
  kind: 'concept',
  domain: "os-db",
  tags: ["SQL","基础"],
  relatedNodes: ["db-sql-hands-on","db-sqlite"],
  caption: "SELECT/INSERT/UPDATE/DELETE + WHERE/JOIN/事务——落库前会说话。",
  questions: [
  {
    "id": "concept-sql-kw:select",
    "q": "查询表中数据用？",
    "choices": [
      {
        "t": "SELECT … FROM …",
        "ok": true,
        "why": "SELECT：查询投影列；FROM 指定表。只读查询入口。"
      },
      {
        "t": "GET … FROM …（HTTP）",
        "ok": false,
        "why": "与「SQL SELECT」不符。"
      },
      {
        "t": "PRINT …",
        "ok": false,
        "why": "与「SQL SELECT」不符。"
      },
      {
        "t": "FETCH 日常入门唯一写法",
        "ok": false,
        "why": "与「SQL SELECT」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "select"
    ]
  },
  {
    "id": "concept-sql-kw:insert",
    "q": "SQL 插入新行用？",
    "choices": [
      {
        "t": "INSERT INTO …",
        "ok": true,
        "why": "INSERT INTO … VALUES …：插入新行。"
      },
      {
        "t": "UPDATE 插入新行",
        "ok": false,
        "why": "与「SQL INSERT」不符。"
      },
      {
        "t": "SELECT 插入",
        "ok": false,
        "why": "与「SQL INSERT」不符。"
      },
      {
        "t": "DELETE 插入",
        "ok": false,
        "why": "与「SQL INSERT」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "insert"
    ]
  },
  {
    "id": "concept-sql-kw:update",
    "q": "SQL 更新已有行用？",
    "choices": [
      {
        "t": "UPDATE … SET … WHERE …",
        "ok": true,
        "why": "UPDATE … SET … WHERE …：更新已有行；缺 WHERE 会更新全表——事故。"
      },
      {
        "t": "INSERT 更新已有行",
        "ok": false,
        "why": "与「SQL UPDATE」不符。"
      },
      {
        "t": "无 WHERE 的 UPDATE 永远安全",
        "ok": false,
        "why": "与「SQL UPDATE」不符。"
      },
      {
        "t": "DROP 更新行",
        "ok": false,
        "why": "与「SQL UPDATE」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "update"
    ]
  },
  {
    "id": "concept-sql-kw:delete",
    "q": "SQL 删除行用？",
    "choices": [
      {
        "t": "DELETE FROM … WHERE …",
        "ok": true,
        "why": "DELETE FROM … WHERE …：删除行；缺 WHERE 删光表。"
      },
      {
        "t": "DROP TABLE 等于按条件删行",
        "ok": false,
        "why": "与「SQL DELETE」不符。"
      },
      {
        "t": "SELECT 删除",
        "ok": false,
        "why": "与「SQL DELETE」不符。"
      },
      {
        "t": "无 WHERE 的 DELETE 总是更安全",
        "ok": false,
        "why": "与「SQL DELETE」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "delete"
    ]
  },
  {
    "id": "concept-sql-kw:where",
    "q": "过滤「满足条件的行」写在？",
    "choices": [
      {
        "t": "WHERE …",
        "ok": true,
        "why": "WHERE：过滤行条件；在 GROUP BY 聚合前生效。"
      },
      {
        "t": "只能写在 ORDER BY",
        "ok": false,
        "why": "与「SQL WHERE」不符。"
      },
      {
        "t": "GROUP BY 等于单行过滤",
        "ok": false,
        "why": "与「SQL WHERE」不符。"
      },
      {
        "t": "LIMIT 负责全部过滤逻辑",
        "ok": false,
        "why": "与「SQL WHERE」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "where"
    ]
  },
  {
    "id": "concept-sql-kw:join",
    "q": "SQL 两表按键关联用？",
    "choices": [
      {
        "t": "JOIN … ON …",
        "ok": true,
        "why": "JOIN … ON …：按键关联多表；先 INNER 再学 LEFT。"
      },
      {
        "t": "用 + 号把表相加",
        "ok": false,
        "why": "与「SQL JOIN」不符。"
      },
      {
        "t": "UNION 永远等于 JOIN",
        "ok": false,
        "why": "与「SQL JOIN」不符。"
      },
      {
        "t": "禁止 JOIN 只能子查询",
        "ok": false,
        "why": "与「SQL JOIN」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "join"
    ]
  },
  {
    "id": "concept-sql-kw:order_by",
    "q": "SQL 对结果排序用？",
    "choices": [
      {
        "t": "ORDER BY …",
        "ok": true,
        "why": "ORDER BY：结果排序；ASC/DESC。"
      },
      {
        "t": "WHERE 排序",
        "ok": false,
        "why": "与「SQL ORDER BY」不符。"
      },
      {
        "t": "LIMIT 排序",
        "ok": false,
        "why": "与「SQL ORDER BY」不符。"
      },
      {
        "t": "JOIN 专用于排序",
        "ok": false,
        "why": "与「SQL ORDER BY」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "order_by"
    ]
  },
  {
    "id": "concept-sql-kw:limit",
    "q": "SQL 限制返回行数用？",
    "choices": [
      {
        "t": "LIMIT n",
        "ok": true,
        "why": "LIMIT：限制返回行数；分页常配合 OFFSET（方言各异）。"
      },
      {
        "t": "WHERE 截断行数",
        "ok": false,
        "why": "与「SQL LIMIT」不符。"
      },
      {
        "t": "JOIN 截断",
        "ok": false,
        "why": "与「SQL LIMIT」不符。"
      },
      {
        "t": "PRIMARY KEY 截断",
        "ok": false,
        "why": "与「SQL LIMIT」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "limit"
    ]
  },
  {
    "id": "concept-sql-kw:create_table",
    "q": "SQL 新建表结构用？",
    "choices": [
      {
        "t": "CREATE TABLE …",
        "ok": true,
        "why": "CREATE TABLE：定义表结构与约束。"
      },
      {
        "t": "INSERT TABLE",
        "ok": false,
        "why": "与「SQL CREATE TABLE」不符。"
      },
      {
        "t": "SELECT TABLE 建表",
        "ok": false,
        "why": "与「SQL CREATE TABLE」不符。"
      },
      {
        "t": "UPDATE TABLE",
        "ok": false,
        "why": "与「SQL CREATE TABLE」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "create_table"
    ]
  },
  {
    "id": "concept-sql-kw:pk",
    "q": "标识行的主键约束？",
    "choices": [
      {
        "t": "PRIMARY KEY",
        "ok": true,
        "why": "PRIMARY KEY：主键约束，唯一标识行，常非空。"
      },
      {
        "t": "FOREIGN 唯一主键名",
        "ok": false,
        "why": "与「PRIMARY KEY」不符。"
      },
      {
        "t": "LIMIT KEY",
        "ok": false,
        "why": "与「PRIMARY KEY」不符。"
      },
      {
        "t": "ORDER KEY",
        "ok": false,
        "why": "与「PRIMARY KEY」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "pk"
    ]
  },
  {
    "id": "concept-sql-kw:begin",
    "q": "SQL 开启事务用？",
    "choices": [
      {
        "t": "BEGIN（或 START TRANSAC",
        "ok": true,
        "why": "BEGIN（或 START TRANSACTION）：开启事务，后续语句可一并提交或回滚。"
      },
      {
        "t": "COMMIT 开启事务",
        "ok": false,
        "why": "与「SQL BEGIN / START TRANSACTION」不符。"
      },
      {
        "t": "ROLLBACK 开启",
        "ok": false,
        "why": "与「SQL BEGIN / START TRANSACTION」不符。"
      },
      {
        "t": "SELECT TRANSACTION",
        "ok": false,
        "why": "与「SQL BEGIN / START TRANSACTION」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "begin"
    ]
  },
  {
    "id": "concept-sql-kw:commit",
    "q": "SQL 提交事务用？",
    "choices": [
      {
        "t": "COMMIT",
        "ok": true,
        "why": "COMMIT：提交事务，使变更持久。"
      },
      {
        "t": "ROLLBACK 提交",
        "ok": false,
        "why": "与「SQL COMMIT」不符。"
      },
      {
        "t": "BEGIN 提交",
        "ok": false,
        "why": "与「SQL COMMIT」不符。"
      },
      {
        "t": "EXPLAIN 提交",
        "ok": false,
        "why": "与「SQL COMMIT」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "commit"
    ]
  },
  {
    "id": "concept-sql-kw:rollback",
    "q": "回滚未提交事务？",
    "choices": [
      {
        "t": "ROLLBACK",
        "ok": true,
        "why": "ROLLBACK：回滚事务，撤销未提交变更。"
      },
      {
        "t": "COMMIT 回滚",
        "ok": false,
        "why": "与「SQL ROLLBACK」不符。"
      },
      {
        "t": "DELETE 等于 ROLLBACK",
        "ok": false,
        "why": "与「SQL ROLLBACK」不符。"
      },
      {
        "t": "DROP 回滚事务",
        "ok": false,
        "why": "与「SQL ROLLBACK」不符。"
      }
    ],
    "relatedNodes": [
      "db-sql-hands-on"
    ],
    "tags": [
      "基础",
      "rollback"
    ]
  }
],
});

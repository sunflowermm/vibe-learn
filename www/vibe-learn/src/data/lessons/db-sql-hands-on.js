/** SQL 最小动手 */
export default `# SQL 最小动手

> 库产品很多（SQLite / PostgreSQL / MySQL…）；零基础先会 **CRUD 四句** 与 **WHERE 安全习惯**。  
> SQL = 跟**关系表**说话的语言：表 ≈ 电子表格，行 ≈ 一条记录，列 ≈ 字段。  
> 安全：永远**参数化**，勿拼接用户输入（见 **安全常识** · OWASP 注入）。

## 先认词

| 词 | 白话 |
|----|------|
| **表 table** | 行的集合；列有类型 |
| **主键 PRIMARY KEY** | 唯一定位一行 |
| **NULL** | 没有值；与空字符串不同 |
| **WHERE** | 过滤哪些行；UPDATE/DELETE **务必带条件** |
| **事务** | 多步要么全成要么全撤（进阶；SQLite/PG 都支持） |

## 四句骨架

\`\`\`sql
SELECT id, name FROM users WHERE id = 1;
INSERT INTO users (name) VALUES ('aya');
UPDATE users SET name = 'bob' WHERE id = 1;
DELETE FROM users WHERE id = 1;
\`\`\`

\`\`\`flip
{"title":"SQL 翻卡","cards":[{"front":"SELECT","back":"读；可加 WHERE / ORDER BY / LIMIT"},{"front":"INSERT","back":"增行"},{"front":"UPDATE/DELETE 无 WHERE","back":"可能动到全表 —— 极危"},{"front":"参数化","back":"值用占位符绑定，不拼进 SQL 字符串"}]}
\`\`\`

## 建议练习（SQLite 最快上手）

1. 安装/打开 \`sqlite3\` CLI 或任意 GUI  
2. 建表：

\`\`\`sql
CREATE TABLE notes (
  id INTEGER PRIMARY KEY,
  body TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

3. 插入两行，\`SELECT * FROM notes;\`  
4. \`UPDATE notes SET body = 'edited' WHERE id = 1;\`  
5. \`DELETE FROM notes WHERE id = 2;\`  
6.（加分）故意忘 WHERE 看 UPDATE 影响行数——在**练习库**做，别在生产  

## JOIN 认脸（只认，不深挖）

\`\`\`sql
SELECT notes.id, users.name
FROM notes
JOIN users ON notes.user_id = users.id;
\`\`\`

多表靠**外键/同值列**对齐；细节回 PostgreSQL / MySQL 产品课。

\`\`\`quiz
{"title":"SQL","questions":[{"q":"生产上执行 DELETE FROM users;（无 WHERE）？","choices":[{"t":"没事，只删一行","ok":false,"why":"无 WHERE 常删全表。"},{"t":"极危险，可能清空表","ok":true,"why":"过滤条件决定范围。"},{"t":"SQL 不允许无 WHERE 的 DELETE","ok":false,"why":"语法常允许。"}]},{"q":"防 SQL 注入首选？","choices":[{"t":"把输入里的引号替换掉就够","ok":false,"why":"黑名单脆弱。"},{"t":"参数化查询 / 绑定变量","ok":true,"why":"数据与语句结构分离。"},{"t":"只用前端校验","ok":false,"why":"可被绕过。"}]}]}
\`\`\`

## 接到本仓

| 落点 | 说明 |
|------|------|
| **SQLite / Redis** | 产品课与 \`xrk-database\` 契约 |
| 谁读写、配置在哪 | 第四章配置 / 数据库番外 |
| Agent 写 SQL | 要求参数化；禁止拼接 \`$\{userInput\}\` |

## Coding Agent

\`\`\`prompt
目标：给 notes 表写 CRUD 四句 + CREATE TABLE；并说明 Node 里如何参数化（示意即可）。
现场：用 SQLite 还是 PG=…
约束：UPDATE/DELETE 必须带 WHERE 示例；不要生成删库脚本。
验收：我能在 sqlite3 里跑通练习 1～5。
\`\`\`

## 下一步

**SQLite** · **Redis** · **PostgreSQL / MySQL** 观光。
`;

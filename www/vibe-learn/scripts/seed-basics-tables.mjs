/**
 * 基础全表种子（HTTP 方法 / Git / Docker / SQL / Shell / pnpm / 端口）
 * 与 seed-http-linux-basics.mjs 同模式：名词 + 一物一题 + audit id 约定
 *
 * node scripts/seed-basics-tables.mjs
 * 然后：pnpm quiz:glossary
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * @typedef {{
 *   key: string,
 *   term: string,
 *   brief: string,
 *   q: string,
 *   ok: string,
 *   bad: [string, string, string],
 *   nodes: string[],
 *   domain: string,
 * }} Item
 */

/** @type {Record<string, { setId: string, title: string, caption: string, tags: string[], relatedNodes: string[], domain: string, prefix: string, glossaryPrefix: string, items: Item[] }>} */
const TABLES = {
  httpMethod: {
    setId: 'concept-http-method',
    title: '基础 · HTTP 方法全表',
    caption: 'GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS——大厂 API 语义。',
    tags: ['HTTP', '方法', '基础'],
    relatedNodes: ['http-web', 'http-hands-on'],
    domain: 'net',
    prefix: 'concept-http-method',
    glossaryPrefix: 'http_m',
    items: [
      {
        key: 'get',
        term: 'HTTP GET',
        brief:
          'HTTP GET：获取资源表示，按约定无副作用、可缓存；查询参数放 URL。大厂禁止用 GET 做删除/扣款。',
        q: 'HTTP GET 的语义约定？',
        ok: '获取资源，按约定不应产生修改副作用',
        bad: ['专门用来删除资源', '只能上传文件', '与 POST 在所有场景可互换'],
        nodes: ['http-web', 'http-hands-on'],
        domain: 'net',
      },
      {
        key: 'post',
        term: 'HTTP POST',
        brief:
          'HTTP POST：向目标资源提交处理（常创建子资源或触发动作），通常非幂等。表单提交与「创建」常用 POST。',
        q: 'HTTP POST 更适合？',
        ok: '提交处理/常用于创建，重复提交可能产生多条结果',
        bad: ['只读获取且必须缓存', '永久重定向专用', '表示未授权'],
        nodes: ['http-web', 'http-hands-on'],
        domain: 'net',
      },
      {
        key: 'put',
        term: 'HTTP PUT',
        brief:
          'HTTP PUT：用请求体整体替换目标资源；幂等——同一 URL 多次 PUT 结果应一致。与 POST「由服务器分配 id」不同。',
        q: 'HTTP PUT 相对 POST？',
        ok: '按指定 URI 整体替换资源，语义上幂等',
        bad: ['只能读不能写', '永远非幂等', '等同 HEAD'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'patch',
        term: 'HTTP PATCH',
        brief:
          'HTTP PATCH：对资源做部分更新（补丁），不必传完整文档。与 PUT 全量替换区分。',
        q: 'HTTP PATCH 表示？',
        ok: '部分更新资源（补丁），不必整份替换',
        bad: ['只能删除', '获取响应头专用', '永久跳转'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'delete',
        term: 'HTTP DELETE',
        brief:
          'HTTP DELETE：删除目标资源；规范上幂等。成功常 200/202/204。',
        q: 'HTTP DELETE 表示？',
        ok: '删除目标资源（语义上幂等）',
        bad: ['只读列表', '上传二进制', 'TLS 握手别名'],
        nodes: ['http-web'],
        domain: 'net',
      },
      {
        key: 'head',
        term: 'HTTP HEAD',
        brief:
          'HTTP HEAD：与 GET 相同的处理，但不返回正文，只取响应头。探测资源是否存在、查 Content-Length 常用。',
        q: 'HTTP HEAD 相对 GET？',
        ok: '处理类似 GET，但不返回响应正文',
        bad: ['删除资源', '必须带大 body', '只能用在 WebSocket'],
        nodes: ['http-web', 'http-hands-on'],
        domain: 'net',
      },
      {
        key: 'options',
        term: 'HTTP OPTIONS',
        brief:
          'HTTP OPTIONS：询问目标资源支持的通信选项；浏览器 CORS 预检常用。响应可含 Allow。',
        q: 'HTTP OPTIONS 常见用途？',
        ok: '查询允许的方法/CORS 预检等',
        bad: ['上传文件正文', '永久重定向业务页', '表示 500 错误'],
        nodes: ['http-web'],
        domain: 'net',
      },
    ],
  },

  gitCmd: {
    setId: 'concept-git-cmd',
    title: '基础 · Git 命令全表',
    caption: 'clone→status→add→commit→push；分支与协作命令一令一题。',
    tags: ['Git', '命令', '基础'],
    relatedNodes: ['git-workspace', 'git-advanced'],
    domain: 'craft',
    prefix: 'concept-git-cmd',
    glossaryPrefix: 'git_cmd',
    items: [
      {
        key: 'clone',
        term: 'git clone',
        brief:
          'git clone：把远程仓库复制到本地工作目录并配置 origin。新人第一命令。',
        q: '把远程仓库拷到本地？',
        ok: 'git clone <url>',
        bad: ['git push <url> 首次必用', 'git init <url> 等于克隆远程', 'git status <url>'],
        nodes: ['git-workspace', 'git-forges'],
        domain: 'craft',
      },
      {
        key: 'clone_depth',
        term: 'git clone --depth=1',
        brief:
          'git clone --depth=1：浅克隆，只取最近提交，加快 CI/大仓拉取；历史不完整。',
        q: '只要最新历史、加快克隆？',
        ok: 'git clone --depth=1 <url>',
        bad: ['git push --depth=1', 'git status --depth=1', 'git rm --depth=1'],
        nodes: ['git-workspace', 'craft-ci'],
        domain: 'craft',
      },
      {
        key: 'remote_v',
        term: 'git remote -v',
        brief:
          'git remote -v：列出远程名与 fetch/push URL。确认 origin 指哪。',
        q: '查看远程仓库地址？',
        ok: 'git remote -v',
        bad: ['git status -v 看远程 URL', 'git blame -v', 'git gc -v'],
        nodes: ['git-workspace', 'git-forges'],
        domain: 'craft',
      },
      {
        key: 'status',
        term: 'git status',
        brief:
          'git status：查看工作区/暂存区状态与当前分支。每日最高频。',
        q: '看改了什么、暂存了什么？',
        ok: 'git status',
        bad: ['git blame 总览状态', 'git stash drop 看状态', 'git gc 日常状态'],
        nodes: ['git-workspace'],
        domain: 'craft',
      },
      {
        key: 'diff',
        term: 'git diff',
        brief:
          'git diff：看未暂存改动；git diff --staged 看已暂存。审 diff 再 commit。',
        q: '看尚未暂存的改动内容？',
        ok: 'git diff',
        bad: ['git push --diff', 'git remote diff', 'git tag diff'],
        nodes: ['git-workspace', 'adev-vibe-coding'],
        domain: 'craft',
      },
      {
        key: 'add',
        term: 'git add',
        brief:
          'git add：把改动放入暂存区，准备进入下一次 commit。',
        q: '把改动放入暂存区？',
        ok: 'git add <路径>',
        bad: ['git commit 先于 add 的唯一正路', 'git push 代替暂存', 'git pull 代替 add'],
        nodes: ['git-workspace'],
        domain: 'craft',
      },
      {
        key: 'commit',
        term: 'git commit',
        brief:
          'git commit：把暂存区做成历史快照；-m 写说明 why。小步可复查。',
        q: '生成一次本地提交？',
        ok: 'git commit -m "说明 why"',
        bad: ['git push 等于本地 commit', 'git add -m 提交', 'git clone -m'],
        nodes: ['git-advanced'],
        domain: 'craft',
      },
      {
        key: 'switch_c',
        term: 'git switch -c',
        brief:
          'git switch -c <branch>：创建并切换到新分支。现代推荐，替代部分 checkout -b。',
        q: '新建并切换功能分支？',
        ok: 'git switch -c feat/name',
        bad: ['git merge feat/name 建分支', 'git remote add feat/name', 'git tag feat/name 当功能分支日常'],
        nodes: ['git-advanced'],
        domain: 'craft',
      },
      {
        key: 'branch',
        term: 'git branch',
        brief:
          'git branch：列出本地分支；-d 删除已合并分支。',
        q: '列出本地分支？',
        ok: 'git branch',
        bad: ['git status 专列远程分支名表', 'git push --list-branches 唯一方式', 'git rm --branches'],
        nodes: ['git-advanced'],
        domain: 'craft',
      },
      {
        key: 'push',
        term: 'git push',
        brief:
          'git push：把本地提交推到远程；首次常用 -u 设上游。',
        q: '把本地提交同步到远程？',
        ok: 'git push（首次常 git push -u origin HEAD）',
        bad: ['git pull 唯一上传方式', 'git add 上传远程', 'git status 推送'],
        nodes: ['git-forges', 'git-advanced'],
        domain: 'craft',
      },
      {
        key: 'pull',
        term: 'git pull',
        brief:
          'git pull：取远程更新并合并/变基进当前分支。协作前先拉。',
        q: '拉取并整合远程更新？',
        ok: 'git pull',
        bad: ['git push 代替拉取', 'git clone 每天代替 pull', 'git rm --pull'],
        nodes: ['git-advanced', 'git-forges'],
        domain: 'craft',
      },
      {
        key: 'fetch',
        term: 'git fetch',
        brief:
          'git fetch：只下载远程对象与引用，不自动合并。先看再合更安全。',
        q: '只下载远程更新、暂不合并？',
        ok: 'git fetch',
        bad: ['git fetch 一定会改工作区文件', 'git commit --fetch', 'git add --fetch'],
        nodes: ['git-advanced'],
        domain: 'craft',
      },
      {
        key: 'log',
        term: 'git log',
        brief:
          'git log：查看提交历史；--oneline 紧凑。回溯 why 的入口。',
        q: '查看提交历史？',
        ok: 'git log（常用 --oneline）',
        bad: ['git status 代替历史', 'git remote log', 'git push --log-only'],
        nodes: ['git-workspace'],
        domain: 'craft',
      },
      {
        key: 'stash',
        term: 'git stash',
        brief:
          'git stash：临时搁置未提交改动，切分支救急；pop/apply 取回。',
        q: '临时搁置未提交改动？',
        ok: 'git stash',
        bad: ['git reset --hard 唯一搁置', 'git tag stash', 'git remote stash'],
        nodes: ['git-advanced'],
        domain: 'craft',
      },
      {
        key: 'restore',
        term: 'git restore',
        brief:
          'git restore：丢弃工作区改动或取消暂存（--staged）。替代部分 checkout/reset 用途。',
        q: '丢弃工作区某文件未提交改动？',
        ok: 'git restore <file>',
        bad: ['git push --restore', 'git clone --restore', 'git remote restore'],
        nodes: ['git-advanced'],
        domain: 'craft',
      },
      {
        key: 'gitignore',
        term: '.gitignore',
        brief:
          '.gitignore：声明不纳入版本控制的路径（密钥、依赖目录、构建产物）。应进仓共享。',
        q: '忽略 node_modules / 密钥文件靠？',
        ok: '.gitignore 规则（并确认未被强制 add）',
        bad: ['只靠口头约定不写文件', '把密钥 commit 后再 ignore 就安全', 'gitignore 只存在于远程 GitHub 设置'],
        nodes: ['git-workspace', 'craft-security'],
        domain: 'craft',
      },
    ],
  },

  dockerCmd: {
    setId: 'concept-docker-cmd',
    title: '基础 · Docker / Compose 命令全表',
    caption: 'pull/run/ps/logs + build/exec + compose up/down。',
    tags: ['Docker', 'Compose', '命令', '基础'],
    relatedNodes: ['ops-docker', 'ops-compose'],
    domain: 'ops',
    prefix: 'concept-docker-cmd',
    glossaryPrefix: 'docker_cmd',
    items: [
      {
        key: 'pull',
        term: 'docker pull',
        brief: 'docker pull：从仓库拉取镜像到本机。',
        q: 'Docker：从镜像仓库拉取镜像到本机？',
        ok: 'docker pull <image:tag>',
        bad: ['docker push 当本机无镜像时的拉取', 'docker kill 拉镜像', 'docker attach 拉镜像'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'run',
        term: 'docker run',
        brief:
          'docker run：基于镜像创建并启动容器；-p 映射端口，-d 后台，--rm 退出删除。',
        q: '创建并启动容器？',
        ok: 'docker run … <image>',
        bad: ['docker build 代替每次运行', 'docker network run', 'docker volume run 启动业务容器'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'ps',
        term: 'docker ps',
        brief: 'docker ps：列出运行中容器；-a 含已停止。',
        q: '查看正在运行的容器？',
        ok: 'docker ps',
        bad: ['docker images ps', 'docker volume ps', 'docker login ps'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'logs',
        term: 'docker logs',
        brief: 'docker logs：看容器标准输出/错误；-f 跟踪。排障第一眼。',
        q: '看容器日志？',
        ok: 'docker logs <container>（-f 跟踪）',
        bad: ['docker pull --logs', 'docker network logs 唯一方式', 'docker login logs'],
        nodes: ['ops-docker', 'workbench-troubleshoot'],
        domain: 'ops',
      },
      {
        key: 'stop',
        term: 'docker stop',
        brief: 'docker stop：优雅停止容器（发信号）；粗暴可用 kill。',
        q: '停止运行中的容器？',
        ok: 'docker stop <container>',
        bad: ['docker pull stop', 'docker images stop', 'docker login stop'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'rm',
        term: 'docker rm',
        brief: 'docker rm：删除已停止的容器实例（不是删镜像）。',
        q: '删除已停止的容器？',
        ok: 'docker rm <container>',
        bad: ['docker rmi 删容器实例（那是删镜像）', 'docker pull --rm-container', 'docker network rm 删任意业务容器'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'images',
        term: 'docker images',
        brief: 'docker images：列出本机镜像。',
        q: '列出本机镜像？',
        ok: 'docker images',
        bad: ['docker ps --images-only', 'docker logs --images', 'docker run --list-images'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'build',
        term: 'docker build',
        brief: 'docker build -t name:tag ：按 Dockerfile 构建镜像并打标签。',
        q: '用 Dockerfile 构建镜像？',
        ok: 'docker build -t name:tag .',
        bad: ['docker pull -t 构建', 'docker run -t 等于 build', 'docker compose build 禁止本地 Dockerfile'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'exec',
        term: 'docker exec',
        brief: 'docker exec -it：在运行中容器内执行命令（进 shell 排障）。',
        q: '进入运行中容器执行命令？',
        ok: 'docker exec -it <container> sh',
        bad: ['docker attach 是唯一进容器方式且等于 exec', 'docker pull -it', 'docker images -it'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
      {
        key: 'compose_up',
        term: 'docker compose up',
        brief:
          'docker compose up -d：按 compose 文件后台拉起多服务。本地依赖栈常用。',
        q: '按 compose 后台启动服务栈？',
        ok: 'docker compose up -d',
        bad: ['docker pull compose', 'docker images up -d', 'docker login up'],
        nodes: ['ops-compose', 'ops-docker'],
        domain: 'ops',
      },
      {
        key: 'compose_down',
        term: 'docker compose down',
        brief: 'docker compose down：停止并移除 compose 创建的容器/网络（卷需额外选项）。',
        q: '拆除 compose 栈？',
        ok: 'docker compose down',
        bad: ['docker rm -f 唯一拆栈方式', 'docker pull down', 'docker images down'],
        nodes: ['ops-compose'],
        domain: 'ops',
      },
      {
        key: 'df_from',
        term: 'Dockerfile FROM',
        brief: 'Dockerfile FROM：指定基础镜像，构建第一指令。',
        q: 'Dockerfile 里指定基础镜像？',
        ok: 'FROM <base>',
        bad: ['RUN 指定基础镜像', 'CMD 指定基础镜像', 'COPY 指定基础镜像'],
        nodes: ['ops-docker'],
        domain: 'ops',
      },
    ],
  },

  sqlKw: {
    setId: 'concept-sql-kw',
    title: '基础 · SQL 关键字全表',
    caption: 'SELECT/INSERT/UPDATE/DELETE + WHERE/JOIN/事务——落库前会说话。',
    tags: ['SQL', '基础'],
    relatedNodes: ['db-sql-hands-on', 'db-sqlite'],
    domain: 'os-db',
    prefix: 'concept-sql-kw',
    glossaryPrefix: 'sql_kw',
    items: [
      {
        key: 'select',
        term: 'SQL SELECT',
        brief: 'SELECT：查询投影列；FROM 指定表。只读查询入口。',
        q: '查询表中数据用？',
        ok: 'SELECT … FROM …',
        bad: ['GET … FROM …（HTTP）', 'PRINT …', 'FETCH 日常入门唯一写法'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'insert',
        term: 'SQL INSERT',
        brief: 'INSERT INTO … VALUES …：插入新行。',
        q: '插入新行？',
        ok: 'INSERT INTO … VALUES …',
        bad: ['UPDATE 插入新行', 'SELECT 插入', 'DELETE 插入'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'update',
        term: 'SQL UPDATE',
        brief: 'UPDATE … SET … WHERE …：更新已有行；缺 WHERE 会更新全表——事故。',
        q: '更新已有行？',
        ok: 'UPDATE … SET … WHERE …',
        bad: ['INSERT 更新已有行', '无 WHERE 的 UPDATE 永远安全', 'DROP 更新行'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'delete',
        term: 'SQL DELETE',
        brief: 'DELETE FROM … WHERE …：删除行；缺 WHERE 删光表。',
        q: '删除行？',
        ok: 'DELETE FROM … WHERE …',
        bad: ['DROP TABLE 等于按条件删行', 'SELECT 删除', '无 WHERE 的 DELETE 总是更安全'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'where',
        term: 'SQL WHERE',
        brief: 'WHERE：过滤行条件；在 GROUP BY 聚合前生效。',
        q: '过滤「满足条件的行」写在？',
        ok: 'WHERE …',
        bad: ['只能写在 ORDER BY', 'GROUP BY 等于单行过滤', 'LIMIT 负责全部过滤逻辑'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'join',
        term: 'SQL JOIN',
        brief: 'JOIN … ON …：按键关联多表；先 INNER 再学 LEFT。',
        q: '两表按键关联？',
        ok: 'JOIN … ON …',
        bad: ['用 + 号把表相加', 'UNION 永远等于 JOIN', '禁止 JOIN 只能子查询'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'order_by',
        term: 'SQL ORDER BY',
        brief: 'ORDER BY：结果排序；ASC/DESC。',
        q: '对结果排序？',
        ok: 'ORDER BY …',
        bad: ['WHERE 排序', 'LIMIT 排序', 'JOIN 专用于排序'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'limit',
        term: 'SQL LIMIT',
        brief: 'LIMIT：限制返回行数；分页常配合 OFFSET（方言各异）。',
        q: '限制返回行数？',
        ok: 'LIMIT n',
        bad: ['WHERE 截断行数', 'JOIN 截断', 'PRIMARY KEY 截断'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'create_table',
        term: 'SQL CREATE TABLE',
        brief: 'CREATE TABLE：定义表结构与约束。',
        q: '新建表结构？',
        ok: 'CREATE TABLE …',
        bad: ['INSERT TABLE', 'SELECT TABLE 建表', 'UPDATE TABLE'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'pk',
        term: 'PRIMARY KEY',
        brief: 'PRIMARY KEY：主键约束，唯一标识行，常非空。',
        q: '标识行的主键约束？',
        ok: 'PRIMARY KEY',
        bad: ['FOREIGN 唯一主键名', 'LIMIT KEY', 'ORDER KEY'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'begin',
        term: 'SQL BEGIN / START TRANSACTION',
        brief: 'BEGIN（或 START TRANSACTION）：开启事务，后续语句可一并提交或回滚。',
        q: '开启事务？',
        ok: 'BEGIN（或 START TRANSACTION）',
        bad: ['COMMIT 开启事务', 'ROLLBACK 开启', 'SELECT TRANSACTION'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'commit',
        term: 'SQL COMMIT',
        brief: 'COMMIT：提交事务，使变更持久。',
        q: '提交事务？',
        ok: 'COMMIT',
        bad: ['ROLLBACK 提交', 'BEGIN 提交', 'EXPLAIN 提交'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
      {
        key: 'rollback',
        term: 'SQL ROLLBACK',
        brief: 'ROLLBACK：回滚事务，撤销未提交变更。',
        q: '回滚未提交事务？',
        ok: 'ROLLBACK',
        bad: ['COMMIT 回滚', 'DELETE 等于 ROLLBACK', 'DROP 回滚事务'],
        nodes: ['db-sql-hands-on'],
        domain: 'os-db',
      },
    ],
  },

  shellOp: {
    setId: 'concept-shell-op',
    title: '基础 · Shell 运算符与安全开关',
    caption: '管道/重定向/set -euo/$?——写脚本少翻车。',
    tags: ['Shell', '基础'],
    relatedNodes: ['lang-shell', 'linux-cli'],
    domain: 'lang',
    prefix: 'concept-shell-op',
    glossaryPrefix: 'shell_op',
    items: [
      {
        key: 'pipe',
        term: 'Shell 管道 |',
        brief: '管道 |：把前一命令 stdout 接到下一命令 stdin。组合小工具。',
        q: '把前一命令输出喂给下一命令？',
        ok: 'cmd1 | cmd2',
        bad: ['cmd1 > cmd2 管道', 'cmd1 || cmd2 等于管道传数据', 'cmd1 & cmd2 管道'],
        nodes: ['lang-shell', 'linux-cli'],
        domain: 'lang',
      },
      {
        key: 'redir_out',
        term: 'Shell 重定向 >',
        brief: '>：覆盖写入文件；>> 追加。',
        q: '覆盖写入文件？',
        ok: 'cmd > file',
        bad: ['cmd < file 覆盖写', 'cmd | file', 'cmd >>> file'],
        nodes: ['lang-shell'],
        domain: 'lang',
      },
      {
        key: 'redir_append',
        term: 'Shell 追加 >>',
        brief: '>>：追加写入文件，保留原内容。',
        q: '追加写入文件？',
        ok: 'cmd >> file',
        bad: ['cmd > file 追加', 'cmd << file 追加输出', 'cmd 2> file 追加 stdout'],
        nodes: ['lang-shell'],
        domain: 'lang',
      },
      {
        key: 'redir_err',
        term: 'Shell 2>&1',
        brief: '2>&1：把 stderr 并入 stdout，常与 >file 一起保存全部输出。',
        q: '把标准错误也并进同一输出流？',
        ok: 'cmd >out.log 2>&1',
        bad: ['cmd < out.log', 'cmd | out.log', 'cmd >>> out.log'],
        nodes: ['lang-shell', 'linux-cli'],
        domain: 'lang',
      },
      {
        key: 'set_e',
        term: 'set -e',
        brief: 'set -e：命令失败（非零退出）则脚本退出。CI 脚本常用。',
        q: '命令失败就让脚本退出？',
        ok: 'set -e',
        bad: ['set -x 专管失败退出', 'set +e 打开失败即退', 'export -e'],
        nodes: ['lang-shell', 'craft-ci'],
        domain: 'lang',
      },
      {
        key: 'set_u',
        term: 'set -u',
        brief: 'set -u：使用未定义变量则报错退出，防空变量酿灾。',
        q: '引用未定义变量就失败？',
        ok: 'set -u',
        bad: ['set -e 专管未定义变量', 'set -x 专管未定义变量', 'unset -u'],
        nodes: ['lang-shell'],
        domain: 'lang',
      },
      {
        key: 'pipefail',
        term: 'set -o pipefail',
        brief: 'set -o pipefail：管道中任一命令失败则整管失败，避免只看最后一个退出码。',
        q: '管道中任一环失败就算失败？',
        ok: 'set -o pipefail',
        bad: ['set -e 已包含全部 pipefail 语义于所有 shell 默认', 'set +o pipefail 打开该检查', 'export pipefail'],
        nodes: ['lang-shell', 'craft-ci'],
        domain: 'lang',
      },
      {
        key: 'status',
        term: 'Shell $?',
        brief: '$?：上一命令退出码；0 通常成功。脚本分支判断。',
        q: '读上一命令退出码？',
        ok: '$?',
        bad: ['$#', '$@', '$$ 表示上一退出码'],
        nodes: ['lang-shell'],
        domain: 'lang',
      },
      {
        key: 'shebang',
        term: 'Shebang #!/usr/bin/env bash',
        brief: 'Shebang：脚本首行指定解释器；env bash 便于 PATH 解析。',
        q: 'Bash 脚本首行常见？',
        ok: '#!/usr/bin/env bash',
        bad: ['#bash 第一行即可执行', '//usr/bin/env bash', '<?bash'],
        nodes: ['lang-shell'],
        domain: 'lang',
      },
    ],
  },

  pnpmCmd: {
    setId: 'concept-pnpm-cmd',
    title: '基础 · pnpm / Corepack 全表',
    caption: '本仓包管理约定：corepack → pnpm install/run/lock。',
    tags: ['pnpm', 'Node', '基础'],
    relatedNodes: ['package-managers', 'runtime-nodejs', 'xrk-first-run'],
    domain: 'ops',
    prefix: 'concept-pnpm-cmd',
    glossaryPrefix: 'pnpm_cmd',
    items: [
      {
        key: 'corepack',
        term: 'corepack enable',
        brief: 'corepack enable：启用 Node 自带的包管理器管理，便于按 packageManager 字段用 pnpm。',
        q: '启用 Corepack 以便用项目锁定的 pnpm？',
        ok: 'corepack enable',
        bad: ['npm disable-corepack 启用', 'pnpm enable-corepack 唯一官方名', 'npx corepack-off'],
        nodes: ['package-managers', 'runtime-nodejs'],
        domain: 'ops',
      },
      {
        key: 'install',
        term: 'pnpm install',
        brief: 'pnpm install：按 lockfile 安装依赖。本仓默认包管理命令。',
        q: '安装项目依赖（本仓）？',
        ok: 'pnpm install',
        bad: ['必须混用 npm/yarn 各装一遍', 'pnpm uninstall 安装', 'corepack install-deps'],
        nodes: ['package-managers', 'xrk-first-run'],
        domain: 'ops',
      },
      {
        key: 'run',
        term: 'pnpm run',
        brief: 'pnpm run <script>：执行 package.json scripts。',
        q: '执行 package.json 里的脚本？',
        ok: 'pnpm run <name>',
        bad: ['pnpm play <name>', 'npm 是本仓唯一允许', 'node run <name> 读 scripts'],
        nodes: ['package-managers'],
        domain: 'ops',
      },
      {
        key: 'frozen',
        term: 'pnpm install --frozen-lockfile',
        brief:
          'pnpm install --frozen-lockfile：CI 禁止更新 lockfile，锁不一致则失败。',
        q: 'CI 安装且禁止改 lock？',
        ok: 'pnpm install --frozen-lockfile',
        bad: ['pnpm install --force-update-lock', 'npm install --thaw', 'yarn unlock'],
        nodes: ['package-managers', 'craft-ci'],
        domain: 'ops',
      },
      {
        key: 'lock',
        term: 'pnpm-lock.yaml',
        brief: 'pnpm-lock.yaml：依赖精确版本锁；应提交进仓保证可复现。',
        q: 'pnpm 的锁文件名？',
        ok: 'pnpm-lock.yaml',
        bad: ['package-lock.json 是 pnpm 锁', 'yarn.lock 是 pnpm 锁', '不必提交锁文件'],
        nodes: ['package-managers'],
        domain: 'ops',
      },
      {
        key: 'npx',
        term: 'npx',
        brief: 'npx：执行 npm 包中的二进制（临时或本地）。与 pnpm exec/dlx 同类需求。',
        q: '临时执行某 npm 包 CLI？',
        ok: 'npx <pkg>（或 pnpm dlx / pnpm exec）',
        bad: ['npx 只能装系统 apt 包', 'npx 等于 rm -rf node_modules', 'npx 替代 git'],
        nodes: ['package-managers', 'runtime-nodejs'],
        domain: 'ops',
      },
    ],
  },

  ports: {
    setId: 'concept-well-known-ports',
    title: '基础 · 常用端口全表',
    caption: '80/443/22/53/3306/5432/6379——联调先认端口。',
    tags: ['网络', '端口', '基础'],
    relatedNodes: ['network-basics', 'tcp-udp'],
    domain: 'net',
    prefix: 'concept-well-known-ports',
    glossaryPrefix: 'port',
    items: [
      {
        key: '80',
        term: '端口 80',
        brief: 'TCP 80：默认 HTTP 明文服务端口。',
        q: '默认 HTTP 明文端口？',
        ok: '80',
        bad: ['443', '22', '53'],
        nodes: ['network-basics', 'http-web'],
        domain: 'net',
      },
      {
        key: '443',
        term: '端口 443',
        brief: 'TCP 443：默认 HTTPS（HTTP over TLS）端口。',
        q: '默认 HTTPS 端口？',
        ok: '443',
        bad: ['80', '8080 唯一标准 HTTPS', '22'],
        nodes: ['network-basics', 'dns-https'],
        domain: 'net',
      },
      {
        key: '22',
        term: '端口 22',
        brief: 'TCP 22：默认 SSH 远程登录。',
        q: '默认 SSH 端口？',
        ok: '22',
        bad: ['21 是 SSH 默认', '443', '3389 是 SSH 默认'],
        nodes: ['network-basics'],
        domain: 'net',
      },
      {
        key: '53',
        term: '端口 53',
        brief: 'UDP/TCP 53：DNS 域名解析。',
        q: 'DNS 默认端口？',
        ok: '53',
        bad: ['80', '443', '22'],
        nodes: ['network-basics', 'dns-https'],
        domain: 'net',
      },
      {
        key: '3306',
        term: '端口 3306',
        brief: 'TCP 3306：MySQL 默认端口。',
        q: 'MySQL 默认端口？',
        ok: '3306',
        bad: ['5432', '6379', '27017'],
        nodes: ['network-basics', 'db-mysql'],
        domain: 'net',
      },
      {
        key: '5432',
        term: '端口 5432',
        brief: 'TCP 5432：PostgreSQL 默认端口。',
        q: 'PostgreSQL 默认端口？',
        ok: '5432',
        bad: ['3306', '6379', '27017'],
        nodes: ['network-basics', 'db-postgresql'],
        domain: 'net',
      },
      {
        key: '6379',
        term: '端口 6379',
        brief: 'TCP 6379：Redis 默认端口。',
        q: 'Redis 默认端口？',
        ok: '6379',
        bad: ['5432', '3306', '11211 是 Redis 默认'],
        nodes: ['network-basics', 'xrk-database'],
        domain: 'net',
      },
      {
        key: '27017',
        term: '端口 27017',
        brief: 'TCP 27017：MongoDB 默认端口。',
        q: 'MongoDB 默认端口？',
        ok: '27017',
        bad: ['6379', '5432', '3306'],
        nodes: ['network-basics', 'db-mongodb'],
        domain: 'net',
      },
    ],
  },
};

function esc(s) {
  return JSON.stringify(s);
}

function glossaryBlock() {
  const lines = ['\n  /* —— 基础全表名词（seed-basics-tables） —— */'];
  for (const table of Object.values(TABLES)) {
    for (const it of table.items) {
      const gKey = `${table.glossaryPrefix}_${it.key}`;
      if (lines.join('').includes(`${gKey}:`)) continue;
      lines.push(`  ${gKey}: {`);
      lines.push(`    term: ${esc(it.term)},`);
      lines.push(`    brief: ${esc(it.brief)},`);
      lines.push(`    also: ${esc(it.nodes)},`);
      lines.push(`  },`);
    }
  }
  return lines.join('\n');
}

function writeQuizSet(table) {
  const qs = table.items.map((it) => ({
    id: `${table.prefix}:${it.key}`,
    q: it.q,
    choices: [
      { t: it.ok, ok: true, why: it.brief.slice(0, 140) },
      ...it.bad.map((t) => ({
        t,
        ok: false,
        why: `与「${it.term}」不符。`,
      })),
    ],
    relatedNodes: it.nodes,
    tags: ['基础', it.key],
  }));
  return `import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: ${esc(table.setId)},
  title: ${esc(table.title)},
  kind: 'concept',
  domain: ${esc(table.domain)},
  tags: ${esc(table.tags)},
  relatedNodes: ${esc(table.relatedNodes)},
  caption: ${esc(table.caption)},
  questions: ${JSON.stringify(qs, null, 2)},
});
`;
}

// glossary
const glossPath = path.join(root, 'src/data/glossary.js');
let gloss = fs.readFileSync(glossPath, 'utf8');
if (!gloss.includes('http_m_get:')) {
  const insertAt = gloss.lastIndexOf('\n};');
  gloss = gloss.slice(0, insertAt) + glossaryBlock() + gloss.slice(insertAt);
  fs.writeFileSync(glossPath, gloss);
  console.log('glossary: appended basics tables');
} else {
  console.log('glossary: http_m_get exists, skip');
}

// terms-by-node: append glossary keys into each related node array
const termsPath = path.join(root, 'src/data/terms-by-node.js');
let terms = fs.readFileSync(termsPath, 'utf8');
/** @type {Record<string, Set<string>>} */
const byNode = {};
for (const table of Object.values(TABLES)) {
  for (const it of table.items) {
    const gKey = `${table.glossaryPrefix}_${it.key}`;
    for (const n of it.nodes) {
      byNode[n] ||= new Set();
      byNode[n].add(gKey);
    }
  }
}
for (const [node, keySet] of Object.entries(byNode)) {
  const keys = [...keySet];
  const re = new RegExp(`('${node}':\\s*\\[[\\s\\S]*?)(\\n  \\])`);
  if (!re.test(terms)) {
    console.warn('no NODE_TERMS entry for', node);
    continue;
  }
  terms = terms.replace(re, (_, body, close) => {
    const add = keys
      .filter((k) => !body.includes(`'${k}'`))
      .map((k) => `'${k}'`)
      .join(',\n    ');
    if (!add) return body + close;
    return `${body.replace(/\s*$/, '')},\n    ${add}${close}`;
  });
}
fs.writeFileSync(termsPath, terms);
console.log('terms-by-node: patched');

const setsDir = path.join(root, 'src/data/quiz/sets');
const auditIds = [];
for (const table of Object.values(TABLES)) {
  const file = path.join(setsDir, `${table.setId}.js`);
  fs.writeFileSync(file, writeQuizSet(table));
  console.log('wrote', table.setId, table.items.length);
  for (const it of table.items) auditIds.push(`${table.prefix}:${it.key}`);
}

fs.writeFileSync(
  path.join(root, 'scripts/basics-tables-ids.json'),
  JSON.stringify(
    Object.fromEntries(
      Object.values(TABLES).map((t) => [
        t.setId,
        t.items.map((i) => `${t.prefix}:${i.key}`),
      ])
    ),
    null,
    2
  )
);
console.log('basics-tables-ids.json written, total', auditIds.length);

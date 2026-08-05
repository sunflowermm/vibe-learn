import { parseAlgoSource } from '../src/utils/lesson-algo-viz.js';
import sort from '../src/data/lessons/dsa-sort.js';
import rt from '../src/data/lessons/runtime-nodejs.js';
import inst from '../src/data/lessons/installers-path.js';
import js from '../src/data/lessons/lang-javascript.js';
import node from '../src/data/lessons/lang-nodejs.js';
import ts from '../src/data/lessons/lang-typescript.js';
import tcp from '../src/data/lessons/tcp-udp.js';
import dns from '../src/data/lessons/dns-https.js';
import rpx from '../src/data/lessons/reverse-proxy.js';
import ngx from '../src/data/lessons/net-nginx.js';
import clash from '../src/data/lessons/clash.js';
import overview from '../src/data/lessons/xrk-overview.js';
import httpWww from '../src/data/lessons/xrk-http-www.js';
import pipe from '../src/data/lessons/xrk-chat-pipeline.js';
import tasker from '../src/data/lessons/xrk-tasker-channels.js';
import auth from '../src/data/lessons/xrk-http-auth.js';
import mcp from '../src/data/lessons/xrk-mcp-ops.js';
import db from '../src/data/lessons/xrk-database.js';
import ws from '../src/data/lessons/xrk-agent-workspace.js';
import vue from '../src/data/lessons/fw-vue.js';
import nest from '../src/data/lessons/fw-express-nest.js';
import next from '../src/data/lessons/fw-nextjs.js';
import tok from '../src/data/lessons/ai-token-context.js';
import attn from '../src/data/lessons/ai-attention.js';
import tf from '../src/data/lessons/ai-transformer.js';
import adapt from '../src/data/lessons/ai-adaptation.js';
import proto from '../src/data/lessons/ai-openai-protocol.js';
import toolCall from '../src/data/lessons/ai-tool-calling.js';
import agentBirth from '../src/data/lessons/ai-agent-birth.js';
import agentGraph from '../src/data/lessons/ai-agent-graph.js';
import agentMem from '../src/data/lessons/ai-agent-memory.js';
import agentPlan from '../src/data/lessons/ai-agent-planning.js';
import rag from '../src/data/lessons/ai-rag.js';
import emb from '../src/data/lessons/ai-embedding.js';
import chunk from '../src/data/lessons/ai-chunking.js';
import hybrid from '../src/data/lessons/ai-hybrid-search.js';
import agenticRag from '../src/data/lessons/ai-agentic-rag.js';
import ragShift from '../src/data/lessons/ai-rag-shift.js';
import rules from '../src/data/lessons/ai-rules.js';
import mcpLesson from '../src/data/lessons/ai-mcp.js';
import sec from '../src/data/lessons/ai-prompt-security.js';
import dbEssence from '../src/data/lessons/db-essence.js';
import dbAsService from '../src/data/lessons/db-as-service.js';
import dbLandscape from '../src/data/lessons/db-landscape.js';
import dbRedis from '../src/data/lessons/db-redis.js';
import dbSqlite from '../src/data/lessons/db-sqlite.js';
import dbSqlHands from '../src/data/lessons/db-sql-hands-on.js';
import opsContainer from '../src/data/lessons/ops-container.js';
import opsDocker from '../src/data/lessons/ops-docker.js';
import opsCompose from '../src/data/lessons/ops-compose.js';
import opsOthers from '../src/data/lessons/ops-others.js';
import fsLayout from '../src/data/lessons/fs-layout.js';
import fsDot from '../src/data/lessons/fs-dotfiles.js';
import espMcu from '../src/data/lessons/esp-mcu.js';
import espEsp32 from '../src/data/lessons/esp-esp32.js';
import espToolchain from '../src/data/lessons/esp-toolchain.js';
import espLink from '../src/data/lessons/esp-link.js';
import craftDebug from '../src/data/lessons/craft-debug.js';
import craftSecurity from '../src/data/lessons/craft-security.js';
import craftTesting from '../src/data/lessons/craft-testing.js';
import craftObs from '../src/data/lessons/craft-observability.js';
import craftCi from '../src/data/lessons/craft-ci.js';
import dsaComplexity from '../src/data/lessons/dsa-complexity.js';
import dsaLinear from '../src/data/lessons/dsa-linear.js';
import dsaHash from '../src/data/lessons/dsa-hash.js';
import dsaTree from '../src/data/lessons/dsa-tree.js';
import dsaGraph from '../src/data/lessons/dsa-graph.js';
import dsaSort from '../src/data/lessons/dsa-sort.js';
import dsaRecurse from '../src/data/lessons/dsa-recurse.js';
import dsaTwo from '../src/data/lessons/dsa-two-pointers.js';
import dsaUf from '../src/data/lessons/dsa-union-find.js';
import dsaString from '../src/data/lessons/dsa-string.js';
import dsaBits from '../src/data/lessons/dsa-bitwise.js';
import dsaDp from '../src/data/lessons/dsa-dp.js';
import dsaMl from '../src/data/lessons/dsa-ml.js';
import dsaHot from '../src/data/lessons/dsa-hot.js';
import panelEssence from '../src/data/lessons/panel-essence.js';
import panelBaota from '../src/data/lessons/panel-baota.js';
import panelOne from '../src/data/lessons/panel-1panel.js';
import panelCompare from '../src/data/lessons/panel-compare.js';
import panelRunNode from '../src/data/lessons/panel-run-node.js';
import hostSystemd from '../src/data/lessons/host-systemd.js';
import hostTls from '../src/data/lessons/host-tls.js';
import hostBackup from '../src/data/lessons/host-backup.js';
import adevVibe from '../src/data/lessons/adev-vibe-coding.js';
import adevCompare from '../src/data/lessons/adev-compare.js';
import adevMem from '../src/data/lessons/adev-project-memory.js';

for (const k of [
  'merge',
  'heap',
  'quick',
  'pathfind',
  'eventloop',
  'dualhost',
  'tserase',
  'tcphandshake',
  'dnsresolve',
  'revproxy',
  'proxyroute',
  'xrklayers',
  'httpresp',
  'msgpipe',
  'taskerflow',
  'authgate',
  'toolloop',
  'dbtier',
  'wsfive',
  'uipatch',
  'mwchain',
  'ssrflow',
  'tokbudget',
  'attnmap',
  'tfstack',
  'iclpath',
  'msgroles',
  'dagflow',
  'ragpipe',
  'embnear',
  'chunksplit',
  'hybridret',
  'tameinj',
  'secgate',
  'sqlcrud',
  'dbserve',
  'ctrvm',
  'imglayer',
  'composestack',
  'opstier',
  'dirrole',
  'dothide',
  'mcuvspc',
  'espboard',
  'flashpipe',
  'edgelink',
  'debugloop',
  'secbase',
  'testpyra',
  'obspillar',
  'cipipe',
  'bigo',
  'stackq',
  'hashslot',
  'bsttrav',
  'callstack',
  'dptable',
  'bitsop',
  'lrucache',
  'topo',
  'strmatch',
  'll-reverse',
  'binsearch',
  'bfs',
  'dfs',
  'twopointer',
  'window',
  'uf',
  'gradient',
  'knn',
  'panellayer',
  'btpath',
  'onepath',
  'panelpick',
  'noderproxy',
  'sysdunit',
  'tlstri',
  'bakdrill',
  'vibefive',
  'adevform',
  'memfiles',
]) {
  const c = parseAlgoSource(JSON.stringify({ kind: k, title: k, autoplay: false }));
  console.log(k, c.kind);
}
console.log('dsa merge', sort.includes('merge'));
console.log('js eventloop', js.includes('eventloop'));
console.log('node dualhost', node.includes('dualhost'));
console.log('ts tserase', ts.includes('tserase'));
console.log('tcp handshake', tcp.includes('tcphandshake'));
console.log('dns resolve', dns.includes('dnsresolve'));
console.log('rpx revproxy', rpx.includes('revproxy'));
console.log('ngx revproxy', ngx.includes('revproxy'));
console.log('clash proxyroute', clash.includes('proxyroute'));
console.log('xrk xrklayers', overview.includes('xrklayers'));
console.log('http httpresp', httpWww.includes('httpresp'));
console.log('pipe msgpipe', pipe.includes('msgpipe'));
console.log('taskerflow', tasker.includes('taskerflow'));
console.log('authgate', auth.includes('authgate'));
console.log('toolloop', mcp.includes('toolloop'));
console.log('dbtier', db.includes('dbtier'));
console.log('wsfive', ws.includes('wsfive'));
console.log('vue uipatch', vue.includes('uipatch'));
console.log('nest mwchain', nest.includes('mwchain'));
console.log('next ssrflow', next.includes('ssrflow'));
console.log('tok tokbudget', tok.includes('tokbudget'));
console.log('attn attnmap', attn.includes('attnmap'));
console.log('tf tfstack', tf.includes('tfstack'));
console.log('adapt iclpath', adapt.includes('iclpath'));
console.log('proto msgroles', proto.includes('msgroles'));
console.log('toolCall toolloop', toolCall.includes('toolloop'));
console.log('agentBirth toolloop', agentBirth.includes('toolloop'));
console.log('agentPlan toolloop', agentPlan.includes('toolloop'));
console.log('agentGraph dagflow', agentGraph.includes('dagflow'));
console.log('agentMem wsfive', agentMem.includes('wsfive'));
console.log('rag ragpipe', rag.includes('ragpipe'));
console.log('emb embnear', emb.includes('embnear'));
console.log('chunk chunksplit', chunk.includes('chunksplit'));
console.log('hybrid hybridret', hybrid.includes('hybridret'));
console.log('agenticRag toolloop', agenticRag.includes('toolloop'));
console.log('ragShift tokbudget', ragShift.includes('tokbudget'));
console.log('rules tameinj', rules.includes('tameinj'));
console.log('mcpLesson toolloop', mcpLesson.includes('toolloop'));
console.log('sec secgate', sec.includes('secgate'));
console.log('dbEssence dbtier', dbEssence.includes('dbtier'));
console.log('dbAsService dbserve', dbAsService.includes('dbserve'));
console.log('dbLandscape dbtier', dbLandscape.includes('dbtier'));
console.log('dbRedis dbtier', dbRedis.includes('dbtier'));
console.log('dbSqlite dbserve', dbSqlite.includes('dbserve'));
console.log('dbSqlHands sqlcrud', dbSqlHands.includes('sqlcrud'));
console.log('opsContainer ctrvm', opsContainer.includes('ctrvm'));
console.log('opsDocker imglayer', opsDocker.includes('imglayer'));
console.log('opsCompose composestack', opsCompose.includes('composestack'));
console.log('opsOthers opstier', opsOthers.includes('opstier'));
console.log('fsLayout dirrole', fsLayout.includes('dirrole'));
console.log('fsDot dothide', fsDot.includes('dothide'));
console.log('espMcu mcuvspc', espMcu.includes('mcuvspc'));
console.log('espEsp32 espboard', espEsp32.includes('espboard'));
console.log('espToolchain flashpipe', espToolchain.includes('flashpipe'));
console.log('espLink edgelink', espLink.includes('edgelink'));
console.log('craftDebug debugloop', craftDebug.includes('debugloop'));
console.log('craftSecurity secbase', craftSecurity.includes('secbase'));
console.log('craftTesting testpyra', craftTesting.includes('testpyra'));
console.log('craftObs obspillar', craftObs.includes('obspillar'));
console.log('craftCi cipipe', craftCi.includes('cipipe'));
console.log('dsaComplexity bigo', dsaComplexity.includes('bigo'));
console.log('dsaLinear stackq', dsaLinear.includes('stackq'));
console.log('dsaHash hashslot', dsaHash.includes('hashslot'));
console.log('dsaTree bsttrav', dsaTree.includes('bsttrav'));
console.log('dsaGraph topo', dsaGraph.includes('topo'));
console.log('dsaSort binsearch', dsaSort.includes('binsearch'));
console.log('dsaRecurse callstack', dsaRecurse.includes('callstack'));
console.log('dsaTwo twopointer', dsaTwo.includes('twopointer'));
console.log('dsaUf union-find', dsaUf.includes('union-find'));
console.log('dsaString strmatch', dsaString.includes('strmatch'));
console.log('dsaBits bitsop', dsaBits.includes('bitsop'));
console.log('dsaDp dptable', dsaDp.includes('dptable'));
console.log('dsaMl gradient', dsaMl.includes('gradient'));
console.log('dsaHot lrucache', dsaHot.includes('lrucache'));
console.log('panelEssence panellayer', panelEssence.includes('panellayer'));
console.log('panelBaota btpath', panelBaota.includes('btpath'));
console.log('panelOne onepath', panelOne.includes('onepath'));
console.log('panelCompare panelpick', panelCompare.includes('panelpick'));
console.log('panelRunNode noderproxy', panelRunNode.includes('noderproxy'));
console.log('hostSystemd sysdunit', hostSystemd.includes('sysdunit'));
console.log('hostTls tlstri', hostTls.includes('tlstri'));
console.log('hostBackup bakdrill', hostBackup.includes('bakdrill'));
console.log('adevVibe vibefive', adevVibe.includes('vibefive'));
console.log('adevCompare adevform', adevCompare.includes('adevform'));
console.log('adevMem memfiles', adevMem.includes('memfiles'));
console.log('rt Current', rt.includes('Current'));
console.log('inst pathfind', inst.includes('pathfind'));

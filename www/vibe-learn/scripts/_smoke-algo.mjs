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
console.log('rt Current', rt.includes('Current'));
console.log('inst pathfind', inst.includes('pathfind'));

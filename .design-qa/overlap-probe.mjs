import { spawn } from 'node:child_process';
import WebSocket from 'ws';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';const PORT=9346;const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
const chrome=spawn(CHROME,['--headless=new',`--remote-debugging-port=${PORT}`,'--no-first-run','--hide-scrollbars','--disable-gpu','about:blank'],{stdio:'ignore'});
let wsUrl;for(let i=0;i<80&&!wsUrl;i+=1){await wait(250);try{const l=await(await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();wsUrl=l.find(t=>t.type==='page')?.webSocketDebuggerUrl;}catch{}}
const ws=new WebSocket(wsUrl);let id=0;const p=new Map();await new Promise(r=>ws.once('open',r));
ws.on('message',raw=>{const m=JSON.parse(raw.toString());if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);}});
const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}));});
await send('Page.enable');await send('Runtime.enable');
const E=`(() => {
 const R=a=>{const e=(typeof a==='string')?document.querySelector(a):a;if(!e)return null;const r=e.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y+scrollY),w:Math.round(r.width),h:Math.round(r.height)};};
 const plate=R('.page-hero-visual')||R('.home-hero .hero-poster');
 const kids=[...document.querySelectorAll('.hero-copy > *, .home-hero .container > *')].map(e=>R(e));
 const hit=(!plate)?[]:kids.filter(k=>k&&!(plate.x+plate.w<=k.x||k.x+k.w<=plate.x||plate.y+plate.h<=k.y||k.y+k.h<=plate.y)).map(k=>k.w+'x'+k.h+'@'+k.x+','+k.y);
 return JSON.stringify({page:location.pathname,plate,hit});})()`;
for(const w of [1440,1080,820,390]){
 await send('Emulation.setDeviceMetricsOverride',{width:w,height:900,deviceScaleFactor:1,mobile:w<500});
 for(const pg of ['technology','contact','investors','index']){
  await send('Page.navigate',{url:`http://127.0.0.1:8080/${pg==='index'?'':pg}`});await wait(600);
  const r=await send('Runtime.evaluate',{expression:E,returnByValue:true});const {result}=r;
  const d=JSON.parse(result.value||'null')||{plate:null,hit:['EVAL-FAIL:'+JSON.stringify(r).slice(0,200)]};
  console.log(String(w).padEnd(5),pg.padEnd(12),'plate',d.plate?`${d.plate.w}x${d.plate.h} @${d.plate.x},${d.plate.y}`:'none','| colliding:',d.hit.length?d.hit.join(' '):'none');
 }}
ws.close();chrome.kill();

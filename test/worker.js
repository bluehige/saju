'use strict';
importScripts('js/engine.js?build=calc-20261107-75757f59');
let ready=false;
// 받는 중에 바이트가 이 시간 동안 하나도 오지 않을 때만 멈춘 것으로 본다(느린 회선에서도 계속 받는다).
const STALL_MS=20000;
const MB=bytes=>(bytes/1048576).toFixed(1);
const report=(message,extra={})=>self.postMessage({kind:'progress',message,...extra});
// 같은 내용(sha256)이면 같은 주소가 되도록 버전 쿼리를 붙인다. 브라우저 캐시를 다시 쓸 수 있다.
const versioned=meta=>`${meta.path}${meta.path.includes('?')?'&':'?'}v=${String(meta.sha256).slice(0,12)}`;
function stallGuard(controller){
  let timer=null;
  const arm=()=>{clearTimeout(timer);timer=setTimeout(()=>controller.abort(),STALL_MS);};
  return {arm,stop:()=>clearTimeout(timer)};
}
// 받을 바이트 수. 압축하지 않은 파일은 resources.json의 크기를 쓴다(서버가 전송 중에 압축해도 받은 양과 맞는다).
// .gz 파일은 전송 압축(Content-Encoding)이 없을 때만 Content-Length를 쓴다.
function expectedBytes(meta,response){
  if(!meta.gzip)return Number(meta.bytes)||0;
  if(response.headers.get('content-encoding'))return 0;
  return Number(response.headers.get('content-length'))||0;
}
async function open(meta,cacheMode='force-cache'){
  const controller=new AbortController(),guard=stallGuard(controller);guard.arm();
  try{
    const response=await fetch(versioned(meta),{cache:cacheMode,signal:controller.signal});
    if(!response.ok)throw new Error('RESOURCE_DOWNLOAD');
    // 본문은 차례가 올 때 읽는다. 기다리는 동안에는 멈춤 감시를 쉬고, 읽기 시작할 때 다시 건다.
    guard.stop();
    return {meta,response,controller,guard,cacheMode,total:expectedBytes(meta,response)};
  }catch(error){guard.stop();if(controller.signal.aborted)throw new Error('RESOURCE_TIMEOUT');throw error;}
}
async function readChecked(item,onBytes){
  const {meta,response,controller,guard}=item;
  try{
    guard.arm();
    const chunks=[];const reader=response.body.getReader();
    for(;;){
      const {done,value}=await reader.read();
      if(done)break;
      guard.arm();chunks.push(value);onBytes(value.byteLength);
    }
    guard.stop();
    let bytes;
    if(meta.gzip){
      if(typeof DecompressionStream==='undefined')throw new Error('BROWSER_GZIP_UNSUPPORTED');
      bytes=await new Response(new Blob(chunks).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }else bytes=await new Blob(chunks).arrayBuffer();
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
    if(digest!==meta.sha256||bytes.byteLength!==meta.bytes)throw new Error('RESOURCE_HASH_MISMATCH');
    return bytes;
  }catch(error){if(controller.signal.aborted)throw new Error('RESOURCE_TIMEOUT');throw error;}
  finally{guard.stop();}
}
// 배포 직후처럼 브라우저 캐시에 예전 내용이 같은 주소로 남아 있을 수 있다. 내용이 맞지 않으면
// 캐시를 건너뛰고 그 파일만 한 번 새로 받아 확인한 뒤에야 실패로 본다(다시 시도하기도 이 길을 탄다).
async function readFresh(item,onBytes){
  let received=0;
  const counted=count=>{received+=count;onBytes(count);};
  try{return await readChecked(item,counted);}
  catch(error){
    if(error?.message!=='RESOURCE_HASH_MISMATCH'||item.cacheMode==='reload')throw error;
    onBytes(-received);
    return readChecked(await open(item.meta,'reload'),onBytes);
  }
}
self.onmessage=async ({data})=>{
  if(data.kind==='init'){
    try{
      report('생일을 풀어볼 자료를 준비하고 있어요…',{stage:'manifest'});
      const manifestController=new AbortController(),manifestGuard=stallGuard(manifestController);manifestGuard.arm();
      let manifest;
      try{
        const manifestResponse=await fetch('data/resources.json',{cache:'no-cache',signal:manifestController.signal});
        if(!manifestResponse.ok)throw new Error('RESOURCE_MANIFEST');
        manifest=await manifestResponse.json();
      }catch(error){if(manifestController.signal.aborted)throw new Error('RESOURCE_TIMEOUT');throw error;}
      finally{manifestGuard.stop();}
      const entries=Object.entries(manifest);
      // 작은 파일은 한꺼번에 받아 바로 다 읽는다(읽지 않은 응답이 연결을 붙잡아 멈추지 않게).
      // 큰 압축 파일은 머리 정보로 전체 용량을 먼저 알고, 본문은 하나씩 받는다.
      const decoded={},small=entries.filter(([,meta])=>!meta.gzip),large=entries.filter(([,meta])=>meta.gzip);
      // sized: 큰 파일의 머리 정보까지 받아 전체 용량을 안 뒤에만 숫자를 보여준다(‘0.0/0.0MB’ 같은 중간값 방지).
      let loaded=0,total=0,lastReport=0,sized=false;
      // 받은 양이 예상 크기를 넘어 보이지 않게 표시값은 전체 크기로 자른다.
      const shown=()=>total?Math.min(loaded,total):loaded;
      const onBytes=count=>{
        loaded=Math.max(0,loaded+count);const now=Date.now();
        if(!sized||now-lastReport<150)return;lastReport=now;
        report(total?`계산 자료를 받고 있어요 (${MB(shown())}/${MB(total)}MB)`:`계산 자료를 받고 있어요 (${MB(shown())}MB)`,{stage:'download',loaded:shown(),total});
      };
      report('계산 자료를 받고 있어요…',{stage:'download',loaded:0,total:0});
      await Promise.all(small.map(async ([name,meta])=>{const item=await open(meta);total+=item.total;decoded[name]=await readFresh(item,onBytes);}));
      const opened=await Promise.all(large.map(([,meta])=>open(meta)));
      total+=opened.reduce((sum,item)=>sum+item.total,0);sized=true;
      for(let i=0;i<large.length;i++)decoded[large[i][0]]=await readFresh(opened[i],onBytes);
      report('읽을 이야기를 정리하고 있어요…',{stage:'prepare',loaded:shown(),total});
      for(const [name] of entries)self.resource(name,new TextDecoder('utf-8',{fatal:true}).decode(decoded[name]));
      self.init();ready=true;self.postMessage({kind:'ready'});
    }catch(error){self.postMessage({kind:'init-error',code:typeof error?.message==='string'?error.message:'CONTENT_INIT'});}
  }else if(data.kind==='month-days'){
    if(ready)self.postMessage({kind:'month-days',id:data.id,days:self.monthDays(data.year,data.month,data.lunar,data.leap)});
  }else if(data.kind==='calculate'){
    try{
      if(!ready)throw new Error('NOT_READY');
      const p=data.profile;
      const result=JSON.parse(self.calculate(p.year,p.month,p.day,p.calendar==='KOREAN_LUNAR',p.leap,p.time,p.mbti,data.target,data.today,p.romanceHidden));
      self.postMessage({kind:'result',id:data.id,result});
    }catch(error){self.postMessage({kind:'calculation-error',id:data.id,code:'CALCULATION_FAILED'});}
  }
};

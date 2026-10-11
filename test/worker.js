'use strict';
importScripts('js/engine.js?build=startup-approved-r13-4daf9416');
let ready=false;
const report=(message)=>self.postMessage({kind:'progress',message});
async function loadChecked(meta){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),30000);
  try{
    const response=await fetch(meta.path,{cache:'no-store',signal:controller.signal});
    if(!response.ok)throw new Error('RESOURCE_DOWNLOAD');
    let bytes;
    if(meta.gzip){
      if(typeof DecompressionStream==='undefined')throw new Error('BROWSER_GZIP_UNSUPPORTED');
      bytes=await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }else bytes=await response.arrayBuffer();
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
    if(digest!==meta.sha256||bytes.byteLength!==meta.bytes)throw new Error('RESOURCE_HASH_MISMATCH');
    return bytes;
  }catch(error){if(controller.signal.aborted)throw new Error('RESOURCE_TIMEOUT');throw error;}
  finally{clearTimeout(timeout);}
}
self.onmessage=async ({data})=>{
  if(data.kind==='init'){
    try{
      report('생일을 풀어볼 자료를 준비하고 있어요…');
      const manifestController=new AbortController();
      const manifestTimeout=setTimeout(()=>manifestController.abort(),30000);
      let manifest;
      try{
        const manifestResponse=await fetch('data/resources.json',{cache:'no-store',signal:manifestController.signal});
        if(!manifestResponse.ok)throw new Error('RESOURCE_MANIFEST');
        manifest=await manifestResponse.json();
      }catch(error){if(manifestController.signal.aborted)throw new Error('RESOURCE_TIMEOUT');throw error;}
      finally{clearTimeout(manifestTimeout);}
      await Promise.all(Object.entries(manifest).map(async ([name,meta])=>{
        const bytes=await loadChecked(meta);
        self.resource(name,new TextDecoder('utf-8',{fatal:true}).decode(bytes));
      }));
      report('읽을 이야기를 정리하고 있어요…');
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

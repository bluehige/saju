'use strict';
importScripts('js/engine.js?build=reading-r2');
let ready=false;
const report=(message)=>self.postMessage({kind:'progress',message});
self.onmessage=async ({data})=>{
  if(data.kind==='init'){
    try{
      report('생일을 풀어볼 자료를 준비하고 있어요…');
      const manifestResponse=await fetch('data/resources.json',{cache:'no-store'});
      if(!manifestResponse.ok)throw new Error('RESOURCE_MANIFEST');
      const manifest=await manifestResponse.json();
      await Promise.all(Object.entries(manifest).map(async ([name,meta])=>{
        const response=await fetch(meta.path,{cache:'no-store'});
        if(!response.ok)throw new Error('RESOURCE_DOWNLOAD');
        let bytes;
        if(meta.gzip){
          if(typeof DecompressionStream==='undefined')throw new Error('BROWSER_GZIP_UNSUPPORTED');
          bytes=await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
        }else bytes=await response.arrayBuffer();
        const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
        if(digest!==meta.sha256||bytes.byteLength!==meta.bytes)throw new Error('RESOURCE_HASH_MISMATCH');
        self.resource(name,new TextDecoder('utf-8',{fatal:true}).decode(bytes));
      }));
      report('거의 준비됐어요. 처음에는 조금 기다려주세요…');
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

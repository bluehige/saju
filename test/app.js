'use strict';
(()=>{
  const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
  const types=['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
  const domains={OVERALL:'총운',RELATIONSHIP:'인간관계',ROMANCE:'연애',WORK:'일·학업',MONEY:'재물',CONDITION:'컨디션'};
  const sections={STRUCTURE:'사주의 기본 구성',TEMPERAMENT:'기본 성향',STRENGTH:'강점',RELATION:'관계',WORK:'일·학업',MONEY:'재물',ROMANCE:'연애',RHYTHM:'생활 리듬'};
  const blocks={SUMMARY:'사주와 MBTI 함께 보기',STRENGTH:'강점 활용',RELATION:'관계',WORK:'일·학업',ROMANCE:'연애',STRESS:'스트레스 돌보기',RHYTHM:'생활 리듬'};
  const warnings={INVALID_DATE:'존재하는 날짜인지 확인해주세요. 음력은 해당 달의 실제 날짜 수를 확인해요.',INVALID_LEAP_MONTH:'입력한 연도·월에는 해당 윤달이 없어요. 음력 날짜와 윤달 여부를 확인해주세요.',FUTURE_BIRTH:'태어난 날짜는 한국 기준 오늘까지 입력할 수 있어요.',OUT_OF_RANGE:'태어난 날짜의 지원 범위는 1900년 1월 1일부터 한국 기준 오늘까지예요.',NONEXISTENT_LOCAL_TIME:'과거 한국의 시각 변경으로 존재하지 않는 출생 시각이에요. 기록된 시각을 확인하거나 시간 모름을 선택해주세요.',TABLE_INTEGRITY_FAILURE:'계산 자료를 정확히 읽지 못했어요. 새로고침해서 다시 준비해주세요.',UNSUPPORTED_TIME_RULE:'이 날짜의 시간 기준을 확인하지 못했어요. 계산 자료를 다시 준비해주세요.'};
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=value=>escape(String(value??'').replace(/\{displayName\}/g,'사용자').replace(/\{typeLabel\}/g,state.profile?.mbti||''));
  const storageKey='saju.browser.test.v1';
  const readingVersion='WEB_NATAL_2026_10_07_R5_4032_9e51b64c';
  const fresh=()=>({version:2,readingVersion,profile:null,result:null,target:'',tab:'today',expanded:{},scroll:{},cache:{}});
  let state=fresh(),ready=false,pending=null,sequence=0,daySequence=0,dayRequest=null;
  try{const saved=JSON.parse(sessionStorage.getItem(storageKey)||'null');if(saved?.version===1||saved?.version===2){
    state={...fresh(),...saved};
    if(saved.readingVersion!==readingVersion)state={...fresh(),profile:saved.profile,target:saved.target||'',tab:saved.tab||'today',expanded:saved.expanded||{},scroll:saved.scroll||{}};
  }}catch{}
  function save(){try{if(!state.profile&&!state.result)sessionStorage.removeItem(storageKey);else sessionStorage.setItem(storageKey,JSON.stringify(state));}catch{ /* Current page still works when private-mode storage is disabled. */ }}
  const koreaToday=()=>new Date(Date.now()+9*3600000).toISOString().slice(0,10);
  const cacheKey=(p,date)=>JSON.stringify([p.year,p.month,p.day,p.calendar,p.leap,p.time,p.mbti,p.romanceHidden,date]);
  function rememberView(){if($('#result-screen').hidden)return;state.scroll[state.tab]=window.scrollY;save();}
  function options(select,values,label,suffix='',wanted=''){
    select.innerHTML=`<option value="">${label}</option>`+values.map(v=>`<option value="${v}">${v}${suffix}</option>`).join('');
    select.value=values.map(String).includes(String(wanted))?String(wanted):'';
  }
  function birthYears(){
    const year=Number(koreaToday().slice(0,4)),min=$('#birth-calendar').value==='KOREAN_LUNAR'?1899:1900;
    options($('#birth-year'),Array.from({length:year-min+1},(_,i)=>year-i),'연도 선택','년',$('#birth-year').value);
  }
  function typeButtons(selected){return [...types,''].map(type=>`<button type="button" class="type-button ${type?'':'type-unknown'}" data-type="${type}" aria-pressed="${type===selected}">${type||'아직 몰라요 · 기본 사주만 보기'}</button>`).join('');}
  function formTypes(){
    $('#mbti-buttons').innerHTML=typeButtons($('#mbti').value);
    $$('#mbti-buttons [data-type]').forEach(button=>button.addEventListener('click',()=>{$('#mbti').value=button.dataset.type;formTypes();}));
  }
  function birthDays(wanted=$('#birth-day').value){
    const year=Number($('#birth-year').value),month=Number($('#birth-month').value);
    $('#birth-day').disabled=true;
    if(!year||!month){dayRequest=null;options($('#birth-day'),[],'일 선택');$('#birth-day-hint').textContent='연도와 월을 먼저 골라주세요.';$('#submit-profile').disabled=!ready||pending!==null;return;}
    if(!ready){$('#birth-day-hint').textContent='자료 준비가 끝나면 실제 날짜 수에 맞춰 일을 고를 수 있어요.';return;}
    dayRequest={id:++daySequence,wanted};$('#birth-day-hint').textContent='이 달의 날짜를 확인하고 있어요…';$('#submit-profile').disabled=true;
    worker.postMessage({kind:'month-days',id:dayRequest.id,year,month,lunar:$('#birth-calendar').value==='KOREAN_LUNAR',leap:$('#birth-leap').checked});
  }
  function syncForm(wanted=$('#birth-day').value){
    birthYears();
    const lunar=$('#birth-calendar').value==='KOREAN_LUNAR';
    $('#leap-label').hidden=!lunar;if(!lunar)$('#birth-leap').checked=false;
    const unknown=$('#time-unknown').checked;
    $('#time-fields').hidden=unknown;$('#birth-hour').disabled=unknown;$('#birth-minute').disabled=unknown;
    formTypes();
    birthDays(wanted);
  }
  for(const id of ['birth-year','birth-month','time-unknown'])$('#'+id).addEventListener('change',()=>syncForm());
  for(const id of ['birth-calendar','birth-leap'])$('#'+id).addEventListener('change',()=>syncForm(''));
  options($('#birth-month'),Array.from({length:12},(_,i)=>i+1),'월 선택','월');
  options($('#birth-hour'),Array.from({length:24},(_,i)=>String(i).padStart(2,'0')),'시 선택','시');
  options($('#birth-minute'),Array.from({length:60},(_,i)=>String(i).padStart(2,'0')),'분 선택','분');formTypes();
  function fillForm(profile){if(!profile)return;$('#birth-calendar').value=profile.calendar;birthYears();$('#birth-year').value=profile.year;$('#birth-month').value=profile.month;$('#birth-leap').checked=profile.leap;$('#time-unknown').checked=!profile.time;const parts=(profile.time||':').split(':');$('#birth-hour').value=parts[0];$('#birth-minute').value=parts[1];$('#mbti').value=profile.mbti;formTypes();$('#romance-hidden').checked=profile.romanceHidden;syncForm(profile.day);}
  function error(message){$('#form-error').textContent=message;$('#form-error').hidden=false;$('#form-error').scrollIntoView({block:'center',behavior:'smooth'});}
  const worker=new Worker('worker.js?build=reading-r2');
  worker.onmessage=({data})=>{
    if(data.kind==='progress')$('#load-state').textContent=data.message;
    else if(data.kind==='ready'){
      ready=true;$('#load-state').textContent='준비됐어요. 날짜와 MBTI를 넣고 결과를 열어보세요.';$('#load-state').classList.add('ready');$('#submit-profile').disabled=false;$('#submit-profile').textContent='내 결과 보기';
      birthDays(state.profile?.day||$('#birth-day').value);
      if(state.profile&&!state.result&&!pending)calculate(state.profile,state.target||koreaToday(),state.tab,false);
    }else if(data.kind==='month-days'&&data.id===dayRequest?.id){
      const wanted=dayRequest.wanted;dayRequest=null;
      options($('#birth-day'),Array.from({length:data.days},(_,i)=>i+1),'일 선택','일',wanted?Math.min(Number(wanted),data.days):'');
      $('#birth-day').disabled=data.days===0;
      $('#submit-profile').disabled=!ready||pending!==null;
      $('#birth-day-hint').textContent=data.days?`이 달은 ${data.days}일까지 있어요.`:($('#birth-leap').checked?'이 연도·월에는 해당 윤달이 없어요. 날짜나 윤달 여부를 바꿔주세요.':'이 달의 날짜 자료를 확인할 수 없어요. 연도와 월을 확인해주세요.');
    }else if(data.kind==='init-error'){
      $('#load-state').textContent=data.code==='BROWSER_GZIP_UNSUPPORTED'?'이 브라우저는 자료 압축 풀기를 지원하지 않아요. 최신 Chrome·Safari·Edge에서 열어주세요.':'계산 자료 준비에 실패했어요. 인터넷 연결을 확인한 뒤 새로고침해주세요.';
      $('#submit-profile').textContent='새로고침 후 다시 시도';
    }else if(data.kind==='result'&&pending?.id===data.id){
      const request=pending;pending=null;$('#submit-profile').disabled=false;$('#submit-profile').textContent='내 결과 보기';
      if(data.result.quality==='UNSUPPORTED'){
        if($('#input-screen').hidden)showInput();
        error(warnings[data.result.warnings[0]]||'입력한 날짜·시간으로 계산할 수 없어요. 입력을 확인해주세요.');return;
      }
      state.profile=request.profile;state.target=request.target;state.result=data.result;
      if(request.reset){state.expanded={};state.scroll={};}
      state.cache[cacheKey(request.profile,request.target)]=data.result;
      const keys=Object.keys(state.cache);if(keys.length>48)for(const k of keys.slice(0,keys.length-48))delete state.cache[k];
      save();showResult(request.tab||'today',request.reset);return;
    }else if(data.kind==='calculation-error'&&pending?.id===data.id){
      pending=null;$('#submit-profile').disabled=false;$('#submit-profile').textContent='내 결과 보기';showInput();error('결과를 읽지 못했어요. 입력을 확인하고 다시 시도해주세요.');
    }
  };
  worker.onerror=()=>{$('#load-state').textContent='계산 프로그램을 시작하지 못했어요. 최신 브라우저에서 새로고침해주세요.';};
  worker.postMessage({kind:'init'});
  function calculate(profile,target,tab='today',reset=false){
    $('#form-error').hidden=true;
    const cached=state.cache[cacheKey(profile,target)];
    if(cached){state.profile=profile;state.target=target;state.result=cached;if(reset){state.expanded={};state.scroll={};}save();showResult(tab,reset);return;}
    if(!ready){showInput();error('계산 자료 준비가 끝나면 결과를 볼 수 있어요. 잠시 기다려주세요.');return;}
    pending={id:++sequence,profile,target,tab,reset};$('#submit-profile').disabled=true;$('#submit-profile').textContent='실제 앱 엔진으로 계산 중…';
    worker.postMessage({kind:'calculate',...pending,today:koreaToday()});
  }
  $('#profile-form').addEventListener('submit',event=>{
    event.preventDefault();const year=Number($('#birth-year').value),month=Number($('#birth-month').value),day=Number($('#birth-day').value);
    if(dayRequest){error('이 달의 날짜 목록을 준비하고 있어요. 잠시 후 다시 열어주세요.');return;}
    if(![year,month,day].every(Number.isInteger)||year<($('#birth-calendar').value==='KOREAN_LUNAR'?1899:1900)||year>Number(koreaToday().slice(0,4))||month<1||month>12||day<1||day>31){error($('#birth-leap').checked&&$('#birth-day').disabled&&!dayRequest?'이 연도·월에는 해당 윤달이 없어요. 날짜나 윤달 여부를 바꿔주세요.':'년·월·일을 모두 선택해주세요. 실제로 있는 날짜만 고를 수 있어요.');return;}
    const time=$('#time-unknown').checked?'':$('#birth-hour').value+':'+$('#birth-minute').value;
    if(!$('#time-unknown').checked&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)){error('태어난 시·분을 모두 고르거나 시간 모름을 선택해주세요.');return;}
    const profile={year,month,day,calendar:$('#birth-calendar').value,leap:$('#birth-leap').checked,time,mbti:$('#mbti').value,romanceHidden:$('#romance-hidden').checked};
    calculate(profile,state.target||koreaToday(),'today',true);
  });
  function showInput(){rememberView();fillForm(state.profile);$('#input-screen').hidden=false;$('#result-screen').hidden=true;$('#cancel-edit').hidden=!state.result;window.scrollTo(0,0);}
  $('#cancel-edit').addEventListener('click',()=>showResult(state.tab,false));
  function statusNotice(r){
    if(r.quality!=='NO_HOUR'&&r.quality!=='BOUNDARY_PARTIAL')return '';
    const flags=new Set(r.warnings),messages=[];
    const names={YEAR:'연주',MONTH:'월주',DAY:'일주',HOUR:'시주'};
    if(flags.has('UNKNOWN_BIRTH_TIME'))messages.push('태어난 시간을 모름으로 선택해 시주는 표시하지 않았어요.');
    const omitted=Object.keys(names).filter(key=>r.pillars[key]===null&&!(key==='HOUR'&&flags.has('UNKNOWN_BIRTH_TIME'))).map(key=>names[key]);
    if(flags.has('SOLAR_TERM_MINUTE_BOUNDARY'))messages.push(flags.has('UNKNOWN_BIRTH_TIME')?'출생일에 절기가 바뀌어, 정확한 출생 시각 없이 월주를 하나로 정할 수 없어요.':'출생 시각이 공식 자료에 적힌 절기 시각의 분 단위 확인 범위에 있어요. 초 단위 경계는 확정하지 않았어요.');
    else if(flags.has('SOLAR_TERM_PRECISION')||flags.has('UNVERIFIED_SOLAR_TERMS')||flags.has('SOURCE_WINDOW_OVERLAP')||flags.has('SOLAR_SOURCE_CONFLICT'))messages.push(flags.has('UNKNOWN_BIRTH_TIME')?'해당 연도의 절기 시각 자료도 충분히 정밀하지 않아 일부 사주 글자를 보류했어요.':'출생 시간은 확인했지만, 해당 연도의 절기 시각 자료가 충분히 정밀하지 않아 일부 사주 글자를 보류했어요. 시간을 다시 입력할 필요는 없어요.');
    else if(flags.has('EARLY_SOLAR_MODEL_LIMITED'))messages.push('이 시기의 절기 계산에는 자료의 한계가 있어요. 확인할 수 있는 글자로만 풀이해요.');
    if(flags.has('AMBIGUOUS_LOCAL_TIME'))messages.push('과거 한국의 시각 변경으로 기록된 시각을 두 가지로 해석할 수 있어요. 두 경우가 다른 사주 글자만 보류했어요.');
    if(omitted.length)messages.push(omitted.join('·')+'는 확인 전까지 비워두었어요.');
    if(r.pillars.DAY===null)messages.push('일간이 확정되지 않아 별점과 관련 맞춤 조언은 보류해요.');
    return messages.length?`<div class="notice" data-calculation-notice>${messages.map(message=>`<p>${escape(message)}</p>`).join('')}</div>`:'';
  }
  function details(key,label,body){return `<details data-detail="${escape(key)}" ${state.expanded[key]?'open':''}><summary>${escape(label)}</summary><div class="expanded">${body}</div></details>`;}
  function manuscript(value,missing='현재 조건에 맞는 원고는 보류 중이에요.'){
    if(!value?.texts)return `<p class="subtitle">${escape(value?.missingReason==='TYPE_NOT_SELECTED'?'MBTI를 입력하면 맞춤 조언을 볼 수 있어요.':missing)}</p>`;
    const t=value.texts;return `${t.title?`<p class="card-title">${text(t.title)}</p>`:''}<p class="card-body">${text(t.body||t.line||'')}</p>`;
  }
  function copy(value){return value?.reading||null;}
  function readingDetail(value){
    const c=copy(value);if(!c)return manuscript(value);
    const parts=c.detailParts||[];
    return parts.length?parts.map(part=>`${part.label?`<h4 class="reading-label">${text(part.label)}</h4>`:''}<p class="card-body">${text(part.text)}</p>`).join(''):`<p class="card-body">${text(c.detail)}</p>`;
  }
  function readingSummary(value){const c=copy(value);return c?`<p class="card-body reading-summary">${text(c.summary)}</p>`:manuscript(value);}
  function dailyCards(r){return `<div class="cards">${r.domains.map(domain=>{
    const t=domain.base?.texts;const c=copy(domain.base);const key='today-'+domain.id;
    const body=domain.mbti?.texts?`<span class="label-pill">${escape(r.type)} 행동 조언</span>${readingSummary(domain.mbti)}${details('today-mbti-more-'+domain.id,'이 조언을 실천하는 방법',readingDetail(domain.mbti))}`:manuscript(domain.mbti);
    const mbtiKey='today-mbti-'+domain.id;
    return `<article class="card" data-domain="${escape(domain.id)}"><div class="card-top"><span class="domain">${domains[domain.id]}</span><span class="stars" aria-label="${domain.grade===null?'별점 보류':`5점 중 ${domain.grade}점`}">${domain.grade===null?'별점 보류':'★'.repeat(domain.grade)+'☆'.repeat(5-domain.grade)}</span></div>${t?`<h3 class="card-title">${text(c?.title||t.title)}</h3>${readingSummary(domain.base)}`:'<p class="subtitle">이 조건의 풀이를 보류했어요.</p>'}${t?details(key,'오늘 운세 자세히 읽기',readingDetail(domain.base)):''}${details(mbtiKey,r.type?`${r.type}라면 이렇게 해봐요`:'MBTI 맞춤 조언',body)}</article>`;
  }).join('')}</div>`;}
  function natalCards(values,names,prefix){return `<div class="cards">${Object.entries(values).filter(([key])=>!state.profile.romanceHidden||key!=='ROMANCE').map(([key,value])=>{
    const t=value.texts,c=copy(value);return `<article class="card" data-section="${escape(key)}"><div class="card-top"><span class="domain">${escape(names[key]||key)}</span></div>${t?`<h3 class="card-title">${text(c?.title||t.title)}</h3>${readingSummary(value)}`:'<p class="subtitle">이 조건의 원고를 보류했어요.</p>'}${t?details(prefix+'-'+key,'같은 자리에서 자세히 보기',readingDetail(value)):''}</article>`;
  }).join('')}</div>`;}
  function guide(message,mood='neutral'){return `<div class="guide small"><p>${message}</p><img src="images/guide_b_${mood}.webp" width="208" height="260" alt="사주MBTI 안내 캐릭터"></div>`;}
  function dayStemCard(value){const c=copy(value);return `<article class="card" data-section="DAY_STEM">${c?`<h3 class="card-title">${text(c.title)}</h3>${readingSummary(value)}${details('natal-day-stem','일간 설명 자세히 읽기',readingDetail(value))}`:manuscript(value)}</article>`;}
  function render(){
    const r=state.result;if(!r)return;let html='';
    if(state.tab==='today'){
      const [y,m,d]=r.date.split('-');html=`<h1>오늘의 운세</h1><p class="page-date">${Number(y)}년 ${Number(m)}월 ${Number(d)}일 · 한국 날짜</p>${guide('내 성향에 맞는 조언으로,<br>오늘을 준비해 보세요.','encourage')}${statusNotice(r)}${dailyCards(r)}`;
    }else if(state.tab==='natal'){
      html=`<h1>내 사주</h1><p class="subtitle">양력 기준 ${escape(r.birthSolarDate)} · ${state.profile.time?escape(state.profile.time):'시간 모름'}</p>${guide('사주 글자와 기본 성향을<br>쉬운 설명으로 함께 볼게요.','thinking')}${statusNotice(r)}<div class="pillars">${Object.entries(r.pillars).map(([key,p])=>`<div class="pillar"><span>${{YEAR:'연주',MONTH:'월주',DAY:'일주',HOUR:'시주'}[key]}</span><strong>${p?escape(p.korean):'—'}</strong></div>`).join('')}</div><p class="hint">연주·월주·일주·시주는 출생의 해·달·날·시각에 해당하는 사주 글자예요.</p>${dayStemCard(r.dayStemIntro)}${natalCards(r.natalBase,sections,'natal')}`;
    }else if(state.tab==='mbti'){
      html=`<h1>${r.type?escape(r.type)+'와 내 사주':'MBTI와 내 사주'}</h1><p class="subtitle">같은 사주를 내 성향에 맞춰 행동으로 연결해요.</p>${guide('사주의 기본 결과는 같아요.<br>MBTI별 조언을 비교해볼 수 있어요.','listen')}<div id="quick-mbti" class="type-grid" role="group" aria-label="비교할 MBTI">${typeButtons(r.type)}</div>${r.type?natalCards(r.natalMbti,blocks,'mbti'): '<div class="notice">유형을 고르면 사주와 MBTI를 함께 읽는 원고가 나타나요. 질문지는 이 웹 테스트에 포함하지 않았어요.</div>'}`;
    }else{
      const p=state.profile;html=`<h1>설정</h1><div class="settings-card"><h2>입력한 프로필</h2><p>${p.year}년 ${p.month}월 ${p.day}일 · ${p.calendar==='SOLAR'?'양력':'한국 음력'}${p.leap?' 윤달':''}<br>${p.time?escape(p.time):'시간 모름'} · ${escape(p.mbti||'MBTI 미선택')}</p><button class="secondary" id="edit-profile">생일·시간·MBTI 변경</button><label class="check"><input id="setting-romance" type="checkbox" ${p.romanceHidden?'checked':''}>연애 항목 숨기기</label></div><div class="settings-card"><h2>날짜를 바꿔서 테스트</h2><p>한국 날짜 기준으로 계산해요. 생일은 그대로 두고 날짜별 결과를 비교할 수 있어요.</p><div class="date-selector"><label class="sr-only" for="target-date">운세 날짜</label><input id="target-date" type="date" min="1908-04-01" max="2050-12-31" value="${escape(state.target)}"><button id="change-date" class="secondary">날짜 적용</button></div><button class="secondary" id="today-date">한국 기준 오늘로</button><p id="date-error" class="error" hidden role="alert"></p></div><div class="settings-card"><h2>테스트와 저장</h2><p>광고·결제 기능은 제외했으며 모든 원고를 볼 수 있어요. 앱의 일반 계산과 초안 원고를 사용해요. 원고의 사람 승인·출시 승인을 뜻하지 않아요.</p><p>입력과 결과는 이 브라우저 탭의 임시 저장소에 있어요. Android의 암호화 저장소와는 다르며, 서버로 보내지 않아요. 자료를 준비한 뒤에는 같은 화면 안에서 계산할 때 인터넷을 사용하지 않아요.</p><p>원고 버전: ${escape(r.packVersion)}<br>계산 버전: ${escape(r.ruleVersion)}</p><button class="secondary" id="clear-data">이 탭의 입력과 결과 지우기</button></div>`;
    }
    $('#result-content').innerHTML=html;
    $$('.tabs button').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.tab===state.tab)));
    $$('details[data-detail]').forEach(detail=>detail.addEventListener('toggle',()=>{state.expanded[detail.dataset.detail]=detail.open;save();}));
    $('#edit-profile')?.addEventListener('click',showInput);
    $$('#quick-mbti [data-type]').forEach(button=>button.addEventListener('click',()=>{rememberView();calculate({...state.profile,mbti:button.dataset.type},state.target,'mbti');}));
    $('#setting-romance')?.addEventListener('change',event=>{rememberView();calculate({...state.profile,romanceHidden:event.target.checked},state.target,'settings');});
    const changeDate=date=>{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date<'1908-04-01'||date>'2050-12-31'){$('#date-error').textContent='운세 날짜는 1908년 4월 1일~2050년 12월 31일 범위에서 골라주세요.';$('#date-error').hidden=false;return;}
      rememberView();state.scroll.today=0;calculate(state.profile,date,'today');
    };
    $('#change-date')?.addEventListener('click',()=>changeDate($('#target-date').value));$('#today-date')?.addEventListener('click',()=>changeDate(koreaToday()));
    $('#clear-data')?.addEventListener('click',()=>{pending=null;state=fresh();try{sessionStorage.removeItem(storageKey);}catch{}$('#profile-form').reset();syncForm();$('#cancel-edit').hidden=true;$('#form-error').hidden=true;history.replaceState(null,'','#input');showInput();});
  }
  function showResult(tab='today',reset=false){
    state.tab=['today','natal','mbti','settings'].includes(tab)?tab:'today';$('#input-screen').hidden=true;$('#result-screen').hidden=false;render();save();
    const hash='#'+state.tab;if(location.hash!==hash)history.pushState({tab:state.tab},'',hash);
    requestAnimationFrame(()=>window.scrollTo(0,reset?0:(state.scroll[state.tab]||0)));
  }
  $$('.tabs button').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.tab===state.tab)return;rememberView();showResult(button.dataset.tab);}));
  window.addEventListener('popstate',()=>{rememberView();if(location.hash==='#input')showInput();else if(state.result)showResult(location.hash.slice(1)||'today');});
  window.addEventListener('pagehide',rememberView);
  let scrollTimer;window.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(rememberView,150);},{passive:true});
  if(state.profile&&state.result){fillForm(state.profile);showResult(location.hash.slice(1)||state.tab);}else{syncForm();history.replaceState(null,'','#input');}
  // Read-only observation for parity tests; no inputs are transmitted or put in the URL.
  Object.defineProperty(window,'sajuTest',{value:{get result(){return state.result;},get ready(){return ready;},get tab(){return state.tab;}},writable:false});
})();

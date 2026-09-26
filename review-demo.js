import {mondaySubmission as submission} from './monday-test-data.js?v=1';

const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const score=value=>Number(value).toLocaleString('en-US');

export function initReviewDemo(){
  const main=document.querySelector('main');
  const root=document.createElement('main');
  root.id='r4-review';
  root.hidden=true;
  main.after(root);
  let current=1;
  let decision='Pending review';
  const reviewed=new Set();
  const finalChecks=new Set();
  const rows=new Map(submission.pages.flatMap(page=>page.rows.map(row=>[
    `${page.number}:${row.rank}`,
    {...row,playerConfirmed:false,scoreConfirmed:false}
  ])));

  root.innerHTML=`<div class="page-heading"><div><span class="eyebrow">LEADERSHIP / SAPPHIRE INTELLIGENCE</span><h1>R4 Review</h1><p>Check the evidence. Confirm the suggested matches. Reward the contribution.</p></div></div>
  <div class="r4-notice">TEST SUBMISSION · The 29 screenshots supplied by RaidARQN are loaded below as one Monday bounty set. Decisions remain in this browser preview.</div>
  <div class="r4-layout"><aside class="r4-queue panel"><span class="eyebrow">REVIEW QUEUE</span><h2>Awaiting review <span class="pill">1</span></h2><button class="r4-queue-item"><span class="state upcoming" id="r4-status">Pending review</span><strong>${esc(submission.bounty)}</strong><span>${esc(submission.day)} · ${esc(submission.date)}</span><small>${submission.pages.length} screenshots · RaidARQN</small><code>${esc(submission.id)}</code></button><p class="hint">This is the real screenshot set supplied for the functionality test.</p></aside>
  <section class="r4-work"><div class="r4-summary panel"><div><span class="eyebrow">SUBMISSION BRIEF</span><h2>Daily all-player leaderboard</h2><p>Monday · Sep 21, 2026</p><strong>${esc(submission.matchup)}</strong></div><div class="r4-reward"><b>+${submission.points}</b><span>BOUNTY POINTS</span></div><p class="r4-wide">Submitter: <strong>${esc(submission.submitter)}</strong> · ${submission.pages.length} uploaded files · ranks 1–188 · overlapping and pinned rows preserved for R4 review.</p></div>
  <div class="r4-columns"><section class="panel r4-evidence"><div class="r4-section-head"><h2>Original evidence</h2><span class="pill">REAL SCREENSHOTS</span></div><div class="r4-evidence-brief"><span class="eyebrow">BOUNTY FOR REVIEW</span><h3>Daily VS · Monday</h3><p class="r4-brief-meta">Sep 21, 2026 · ${esc(submission.matchup)}</p><code>${esc(submission.id)}</code><details><summary>Review checklist</summary><ul><li>Daily Rank: Monday.</li><li>Confirm suggested player names, ranks and scores against every screenshot.</li><li>Check overlaps, the repeated page and RaidARQN's pinned row.</li></ul></details></div><div id="r4-pages" class="r4-pages"></div><p id="r4-page-progress" role="status"></p><div id="r4-screenshot" class="r4-screenshot"></div><p id="r4-image-note" class="hint"></p></section>
  <section class="panel r4-data"><div class="r4-section-head"><h2>Suggested player matches</h2><span id="r4-data-status" class="state upcoming">Needs confirmation</span></div><p class="hint">These are review suggestions transcribed from the submitted evidence. Correct a name or score before confirming it.</p><div class="table-scroll"><table><thead><tr><th>RANK</th><th>PLAYER / SCORE REVIEW</th></tr></thead><tbody id="r4-rows"></tbody></table></div><div class="r4-actions"><button id="r4-confirm-page" class="primary">Confirm this page</button><button id="r4-clear-page">Clear this page</button><button id="r4-confirm-set">Test: confirm all 29 pages</button></div><p class="hint">The full-set button is included so the final approval flow can be tested without confirming 188 rows individually.</p><div class="r4-coverage"><h3>Coverage checks</h3><p>29 uploaded files · 188 leaderboard ranks · repeated/overlapping captures retained</p><p class="r4-warning">Page 27 repeats ranks 175–181. Pages 28–29 overlap ranks 182–187. This is flagged for the R4 rather than silently discarded.</p></div></section></div>
  <section class="panel r4-decision"><div><span class="eyebrow">FINAL REVIEW</span><h2>Ready for a decision?</h2></div><div class="r4-checks">${['Player suggestions checked','Monday and bounty date checked','Both alliances and all pages checked','Overlaps, duplicate and pinned row checked'].map((text,i)=>`<label><input type="checkbox" data-final-check="${i}">${text}</label>`).join('')}</div><label class="r4-reason">Review note<textarea id="r4-note" rows="2" minlength="8" maxlength="1000" placeholder="Record what was checked or corrected"></textarea></label><div class="r4-actions"><button id="r4-reject" class="reject-button">Reject test submission</button><button id="r4-approve" class="primary" disabled>Approve Monday screenshot set</button><button id="r4-reset">Reset test</button></div><p id="r4-result" role="status">Review the screenshots and suggested matches before approving.</p></section>
  <section class="panel r4-decision"><span class="eyebrow">R4 PRIVATE PROFILE PREVIEW</span><h2>RaidARQN · bounty history</h2><div id="r4-history" class="r4-history-card"><p><strong>${esc(submission.id)}</strong></p><p>Submitted for Monday, Sep 21, 2026 · 29 screenshots</p><p>Status: <span id="r4-history-status">Pending review</span> · Points: <span id="r4-history-points">0</span></p></div></section></section></div>`;

  const pageByNumber=number=>submission.pages.find(page=>page.number===number);
  const rowState=(page,rank)=>rows.get(`${page}:${rank}`);
  const pageReady=page=>page.rows.every(row=>{const state=rowState(page.number,row.rank);return state.playerConfirmed&&state.scoreConfirmed;});

  function renderPageTabs(){
    root.querySelector('#r4-pages').innerHTML=submission.pages.map(page=>`<button data-page="${page.number}" class="${page.number===current?'active':''}" aria-pressed="${page.number===current}">Page ${page.number}<span class="review-indicator ${reviewed.has(page.number)?'approved':'pending'}" title="${reviewed.has(page.number)?'Reviewed':'Pending review'}">${reviewed.has(page.number)?'✓':'●'}</span></button>`).join('');
  }

  function renderCurrent(){
    const page=pageByNumber(current);
    renderPageTabs();
    root.querySelector('#r4-screenshot').innerHTML=`<a href="${page.image}" target="_blank" rel="noopener"><img src="${page.image}" alt="Submitted Monday leaderboard screenshot page ${page.number}" style="display:block;width:100%;height:auto;max-height:850px;object-fit:contain"></a>`;
    const warnings=[];
    if(page.duplicateOf)warnings.push(`Likely duplicate of page ${page.duplicateOf}`);
    if(page.number===28||page.number===29)warnings.push('Overlaps the adjacent capture');
    root.querySelector('#r4-image-note').textContent=`Original file ${page.number} of ${submission.pages.length}.${warnings.length?' Review flag: '+warnings.join(' · ')+'.':''}`;
    root.querySelector('#r4-rows').innerHTML=page.rows.map(row=>{
      const state=rowState(page.number,row.rank);
      return `<tr><td class="r4-rank-cell">${row.rank}</td><td><div class="r4-row-grid"><div class="r4-row-identity"><strong class="player-name">${esc(state.name)}</strong><small class="r4-alliance">Imported suggestion</small></div><label class="r4-search-label"><span>Suggested player</span><input data-name="${row.rank}" value="${esc(state.name)}" maxlength="100"></label><label class="r4-score-label"><span>Suggested score</span><input data-score="${row.rank}" value="${score(state.score)}" inputmode="numeric"></label><label class="r4-row-confirm"><input type="checkbox" data-player="${row.rank}" ${state.playerConfirmed?'checked':''}><span>Confirm player</span></label><label class="r4-row-confirm"><input type="checkbox" data-points="${row.rank}" ${state.scoreConfirmed?'checked':''}><span>Confirm score</span></label><small data-ready="${row.rank}" class="${state.playerConfirmed&&state.scoreConfirmed?'r4-row-ready':'r4-row-pending'}">${state.playerConfirmed&&state.scoreConfirmed?'✓ Row confirmed':'Awaiting R4 confirmation'}</small></div></td></tr>`;
    }).join('');
    root.querySelector('#r4-data-status').textContent=pageReady(page)?'Reviewed':'Needs confirmation';
    root.querySelector('#r4-data-status').className=`state ${pageReady(page)?'approved':'upcoming'}`;
    root.querySelector('#r4-page-progress').textContent=`${reviewed.size} / ${submission.pages.length} screenshots reviewed`;
    refreshDecision();
  }

  function setPageConfirmed(page,value){
    page.rows.forEach(row=>{const state=rowState(page.number,row.rank);state.playerConfirmed=value;state.scoreConfirmed=value;});
    value?reviewed.add(page.number):reviewed.delete(page.number);
  }

  function refreshDecision(){
    const ready=decision==='Pending review'&&reviewed.size===submission.pages.length&&finalChecks.size===4&&root.querySelector('#r4-note').value.trim().length>=8;
    root.querySelector('#r4-approve').disabled=!ready;
    root.querySelector('#r4-confirm-page').disabled=decision!=='Pending review'||pageReady(pageByNumber(current));
    root.querySelector('#r4-confirm-set').disabled=decision!=='Pending review'||reviewed.size===submission.pages.length;
  }

  root.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button)return;
    if(button.dataset.page){current=Number(button.dataset.page);renderCurrent();return;}
    if(button.id==='r4-confirm-page'){setPageConfirmed(pageByNumber(current),true);renderCurrent();return;}
    if(button.id==='r4-clear-page'){setPageConfirmed(pageByNumber(current),false);renderCurrent();return;}
    if(button.id==='r4-confirm-set'){submission.pages.forEach(page=>setPageConfirmed(page,true));renderCurrent();return;}
    if(button.id==='r4-approve'&&!button.disabled){decision='Approved';root.querySelector('#r4-status').textContent=decision;root.querySelector('#r4-history-status').textContent=decision;root.querySelector('#r4-history-points').textContent=String(submission.points);root.querySelector('#r4-result').textContent='Monday screenshot set approved in this functionality test. RaidARQN received 10 test bounty points.';root.querySelectorAll('input,textarea,button').forEach(control=>{if(control.id!=='r4-reset'&&!control.dataset.page)control.disabled=true;});}
    if(button.id==='r4-reject'){decision='Rejected';root.querySelector('#r4-status').textContent=decision;root.querySelector('#r4-history-status').textContent=decision;root.querySelector('#r4-result').textContent='Test submission rejected. No points were awarded.';refreshDecision();}
    if(button.id==='r4-reset'){decision='Pending review';reviewed.clear();finalChecks.clear();rows.forEach(state=>{state.playerConfirmed=false;state.scoreConfirmed=false;});root.querySelector('#r4-note').value='';root.querySelectorAll('[data-final-check]').forEach(input=>input.checked=false);root.querySelector('#r4-status').textContent=decision;root.querySelector('#r4-history-status').textContent=decision;root.querySelector('#r4-history-points').textContent='0';root.querySelector('#r4-result').textContent='Review the screenshots and suggested matches before approving.';root.querySelectorAll('input,textarea,button').forEach(control=>control.disabled=false);renderCurrent();}
  });

  root.addEventListener('change',event=>{
    const page=pageByNumber(current);
    const rank=Number(event.target.dataset.name||event.target.dataset.score||event.target.dataset.player||event.target.dataset.points);
    if(Number.isFinite(rank)){
      const state=rowState(page.number,rank);
      if(event.target.dataset.name)state.name=event.target.value;
      if(event.target.dataset.score)state.score=Number(event.target.value.replace(/,/g,''))||0;
      if(event.target.dataset.player)state.playerConfirmed=event.target.checked;
      if(event.target.dataset.points)state.scoreConfirmed=event.target.checked;
      pageReady(page)?reviewed.add(page.number):reviewed.delete(page.number);
      renderCurrent();
      return;
    }
    if(event.target.dataset.finalCheck!==undefined)event.target.checked?finalChecks.add(event.target.dataset.finalCheck):finalChecks.delete(event.target.dataset.finalCheck);
    refreshDecision();
  });
  root.querySelector('#r4-note').addEventListener('input',refreshDecision);

  const nav=document.createElement('button');
  nav.id='r4-nav';
  nav.textContent='R4 Review';
  document.querySelector('.rail nav').append(nav);
  const show=()=>{main.hidden=true;root.hidden=false;document.querySelectorAll('[data-view]').forEach(button=>button.classList.remove('active'));nav.classList.add('active');document.querySelector('#breadcrumb-current').textContent='R4 REVIEW';window.scrollTo(0,0);};
  nav.onclick=()=>{history.replaceState(null,'','#r4-review');show();};
  document.addEventListener('click',event=>{if(event.target.closest('[data-view]')){main.hidden=false;root.hidden=true;nav.classList.remove('active');history.replaceState(null,'',location.pathname);}});
  renderCurrent();
  if(location.hash==='#r4-review')show();
}

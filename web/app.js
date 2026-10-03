(() => {
  const state = JSON.parse(localStorage.getItem("zalagren-demo") || "null") || {
    participant: { name: "Demo Participant", mode: "PEOPLE", context: "Personal" },
    intents: [], proposals: [], events: [], selectedCommunity: "TSAVO Royal Suburbs"
  };
  const communities = [
    {name:"TSAVO Royal Suburbs",place:"Roysambu, Nairobi",kind:"Residential community",note:"Evidence-backed instance; no invented residents or permissions."},
    {name:"Mi Vida Garden City",place:"Garden City, Thika Road, Nairobi",kind:"Residential community",note:"Exact phase/building/unit inventory is not inferred."},
    {name:"Qwetu Ruaraka",place:"Outer Ring Road, Nairobi",kind:"Student residence",note:"580 beds according to the referenced 2024 evidence; no invented rooms or residents."}
  ];
  const services = [
    ["BeatPay","Authorized payment coordination through regulated external rails.","SUPPORTED"],
    ["BeatFood","Food discovery, ordering and provider fulfilment.","PROPOSED"],
    ["BeatHealth","Health discovery, appointments and care workflows.","PROPOSED"],
    ["BeatGenzi","Jobs, services, training, partnerships and economic opportunity discovery.","SUPPORTED"],
    ["BeatMarket","Marketplace coordination with category, seller, consumer and safety controls.","PROPOSED"],
    ["BeatRide","Mobility coordination; Zalagren is not the transport operator.","PROPOSED"],
    ["BeatBnB","Accommodation coordination; no guaranteed booking or occupancy.","PROPOSED"],
    ["Home Services","Cleaning, repair, laundry and property maintenance coordination.","SUPPORTED"],
    ["Utilities","Water, electricity, gas, waste and internet coordination.","PROPOSED"]
  ];
  const nav = [["home","⌂","Home"],["ask","◌","Ask"],["people","◎","People"],["community","⌂","Community"],["services","◇","Services"],["activity","◷","Activity"]];
  function save(){localStorage.setItem("zalagren-demo",JSON.stringify(state))}
  function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
  function badge(v){return '<span class="badge '+(v==="SUPPORTED"||v==="VERIFIED"?"green":v==="PROPOSED"?"orange":"blue")+'">'+esc(v)+'</span>'}
  function shell(view,content){
    document.getElementById("app").innerHTML =
      '<header class="top"><div class="topbar"><button class="brand" data-view="home"><span class="mark">Z</span><span>Zalagren</span></button><div class="context">'+esc(state.participant.context)+' <span>·</span> '+esc(state.participant.mode)+'</div><button class="menu" id="menuBtn">•••</button></div></header>'+
      '<main class="shell">'+content+'</main>'+
      '<nav class="bottom">'+nav.map(([id,icon,label])=>'<button data-view="'+id+'" class="'+(view===id?"active":"")+'"><i>'+icon+'</i><span>'+label+'</span></button>').join("")+'</nav><div id="toast" class="toast"></div>';
    document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>render(b.dataset.view)));
    document.getElementById("menuBtn").onclick=()=>alert("Zalagren\\n\\nParticipant controls\\nPrivacy\\nVoice preferences\\nContext selection\\nTruth states\\nSign out");
  }
  function home(){
    const recent=state.events.slice(-3).reverse();
    return '<section class="hero"><div class="eyebrow">INTELLIGENT LIVING INFRASTRUCTURE</div><h1>Your identity.<br>Your world.<br><em>One ecosystem.</em></h1><p>Zalagren connects people, communities, places, organizations, providers, services and resources through governed participation.</p><div class="hero-actions"><button class="btn primary" data-view="ask">Ask CONSTANTYNA</button><button class="btn ghost" data-view="community">Explore communities</button></div></section>'+
      '<section class="section"><div class="section-head"><div><span class="eyebrow dark">YOUR ZALAGREN</span><h2>Command center</h2></div></div><div class="grid four">'+
      [['people','People','Identity, participant, relationships and context'],['community','Community','Places, buildings, units and participation'],['services','Services','Needs, eligibility, proposals and fulfilment'],['activity','Activity','Intent → proposal → action → event → evidence']].map(x=>'<button class="card action" data-view="'+x[0]+'"><strong>'+x[1]+'</strong><span>'+x[2]+'</span></button>').join("")+
      '</div></section><section class="section"><div class="callout"><div><span class="eyebrow">GOVERNANCE</span><h2>No authorization → no consequential action.</h2><p>GENESIS can observe and propose. CONSTANTYNA can explain and help. Neither can grant authority to itself.</p></div><button class="btn light" data-view="activity">View activity</button></div></section>'+
      '<section class="section"><div class="section-head"><h2>Recent activity</h2>'+badge("SUPPORTED")+'</div>'+
      (recent.length?recent.map(e=>'<div class="listrow"><div><strong>'+esc(e.title)+'</strong><small>'+esc(e.detail)+'</small></div><span class="dot">●</span></div>').join(""):'<div class="empty">Your actions will appear here. Create an intent from a service or ask CONSTANTYNA.</div>')+'</section>';
  }
  function ask(){
    return '<section class="section first"><span class="eyebrow dark">INTELLIGENCE</span><h1 class="page-title">CONSTANTYNA</h1><p class="lead">Your human-facing intelligence interface. Ask about the ecosystem, services, communities, opportunities or your current context.</p>'+
      '<div class="chat" id="chat"><div class="message assistant"><b>CONSTANTYNA</b><p>I can explain Zalagren, help you frame a need, compare options, identify opportunities and create proposals. I cannot authorize myself or claim an external transaction happened when it did not.</p></div><div id="messages"></div></div>'+
      '<form id="askForm" class="composer"><input id="askInput" autocomplete="off" placeholder="Ask: What can Zalagren do for me?"><button class="send">Send</button></form>'+
      '<div class="chips">'+["Explain Zalagren","Find an opportunity","How does BeatPay work?","Show my communities"].map(x=>'<button class="chip" data-prompt="'+esc(x)+'">'+esc(x)+'</button>').join("")+'</div>'+
      '<div class="grid two intelligence-cards"><div class="card"><span class="badge green">SUPPORTED</span><h3>CONSTANTYNA</h3><p>Explain, reason with available information, compare, propose and communicate.</p></div><div class="card"><span class="badge green">SUPPORTED</span><h3>GENESIS</h3><p>Observe → understand → contextualize → detect → reason → propose → authorize → execute → measure → learn.</p></div></div></section>';
  }
  function people(){
    return '<section class="section first"><span class="eyebrow dark">PEOPLE</span><h1 class="page-title">One participant.<br>Many relationships.</h1>'+
      '<div class="identity card"><div class="avatar">P</div><div><small>PARTICIPANT</small><h3>'+esc(state.participant.name)+'</h3><p>Account → Participant → Relationships → Contexts → Capabilities → Authorizations</p></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="section-head"><h2>Contexts</h2><p>Context changes what can be relevant. It does not silently grant authority.</p></div><div class="grid two">'+
      '<button class="card context-card" data-context="Personal"><strong>Personal</strong><span>Direct participation across Zalagren.</span></button><button class="card context-card" data-context="Community"><strong>Community</strong><span>Participation through an adopted community context.</span></button></div>'+
      '<div class="section-head"><h2>Relationships</h2></div><div class="listrow"><div><strong>Participant</strong><small>Primary Zalagren participation identity</small></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="listrow"><div><strong>Potential roles</strong><small>Resident · owner · worker · provider · visitor · driver</small></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="callout compact"><h3>Authentication ≠ Authorization</h3><p>Being signed in, subscribed, related to a place or holding a role does not by itself permit a consequential action.</p></div></section>';
  }
  function community(){
    return '<section class="section first"><span class="eyebrow dark">COMMUNITIES</span><h1 class="page-title">Places where participation becomes contextual.</h1>'+
      '<div class="community-tabs">'+communities.map(c=>'<button class="tab '+(state.selectedCommunity===c.name?"selected":"")+'" data-community="'+esc(c.name)+'">'+esc(c.name)+'</button>').join("")+'</div>'+
      '<div id="communityDetail"></div><div class="section-head"><h2>Place hierarchy</h2><p>The canonical physical model is explicit.</p></div>'+
      '<div class="flow">'+["Place / Site","Phase","Building","Unit"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div>'+
      '<div class="callout compact"><h3>Community authority is contextual.</h3><p>Communities coordinate participation and management. Zalagren services remain platform capabilities and cannot be silently blocked by a community.</p></div></section>';
  }
  function renderCommunityDetail(){
    const c=communities.find(x=>x.name===state.selectedCommunity)||communities[0],el=document.getElementById("communityDetail");
    if(el)el.innerHTML='<div class="community-hero"><span class="badge green">INSTANCE</span><h2>'+esc(c.name)+'</h2><p>'+esc(c.place)+' · '+esc(c.kind)+'</p><div class="note">'+esc(c.note)+'</div><div class="mini-grid"><div><small>PARTICIPATION</small><strong>Contextual</strong></div><div><small>INVENTORY</small><strong>Evidence only</strong></div><div><small>AUTHORITY</small><strong>Explicit</strong></div></div></div>';
  }
  function servicesView(){
    return '<section class="section first"><span class="eyebrow dark">SERVICES</span><h1 class="page-title">Turn needs into governed outcomes.</h1><p class="lead">A service definition is not a connected provider. Zalagren never invents fulfilment, payment, booking or success.</p>'+
      '<div class="service-list">'+services.map((s,i)=>'<button class="service-row" data-service="'+i+'"><div class="service-icon">'+s[0].slice(0,1)+'</div><div class="service-copy"><strong>'+s[0]+'</strong><small>'+s[1]+'</small></div>'+badge(s[2])+'<span class="chev">›</span></button>').join("")+'</div><div id="serviceDetail"></div></section>';
  }
  function activity(){
    const items=[...state.intents.map(x=>({...x,type:"INTENT"})),...state.proposals.map(x=>({...x,type:"PROPOSAL"})),...state.events.map(x=>({...x,type:"EVENT"}))].reverse();
    return '<section class="section first"><span class="eyebrow dark">ACTIVITY & EVIDENCE</span><h1 class="page-title">Nothing important disappears.</h1>'+
      '<div class="flow timeline">'+["Intent","Proposal","Authorization","Action","Event","Evidence"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div>'+
      '<div class="section-head"><h2>Participant activity</h2><p>Demo activity is stored locally on this device. External execution is never simulated as success.</p></div>'+
      (items.length?items.map(x=>'<div class="timeline-row"><span class="timeline-dot"></span><div><small>'+esc(x.type)+'</small><strong>'+esc(x.title)+'</strong><p>'+esc(x.detail||"")+'</p></div></div>').join(""):'<div class="empty">No activity yet. Create an intent from a service to begin the governed lifecycle.</div>')+
      '<div class="callout compact"><h3>Evidence is the boundary of truth.</h3><p>An external provider must be authoritative before Zalagren records a real-world success.</p></div></section>';
  }
  function serviceDetail(i){
    const s=services[i],el=document.getElementById("serviceDetail");if(!el)return;
    el.innerHTML='<div class="drawer"><div class="section-head"><div><span class="eyebrow dark">SERVICE</span><h2>'+esc(s[0])+'</h2></div>'+badge(s[2])+'</div><p>'+esc(s[1])+'</p><div class="lifecycle">'+["Need","Intent","Eligibility","Proposal","Authorization","Action","Event","Evidence"].map((x,n)=>'<span><b>'+String(n+1)+'</b>'+x+'</span>').join("")+'</div><button class="btn primary darkbtn" id="createIntent">Create intent</button><p class="micro">Creating an intent does not place an order, charge money, book a provider or authorize execution.</p></div>';
    document.getElementById("createIntent").onclick=()=>{state.intents.push({title:s[0]+" request",detail:"Participant created a service intent; awaiting eligibility and proposal.",created:Date.now()});save();toast("Intent created — no external action was executed.");render("activity")};
  }
  function render(view){
    const content=view==="ask"?ask():view==="people"?people():view==="community"?community():view==="services"?servicesView():view==="activity"?activity():home();
    shell(view,content);
    if(view==="community"){document.querySelectorAll("[data-community]").forEach(b=>b.onclick=()=>{state.selectedCommunity=b.dataset.community;save();render("community")});renderCommunityDetail()}
    if(view==="services")document.querySelectorAll("[data-service]").forEach(b=>b.onclick=()=>serviceDetail(Number(b.dataset.service)));
    if(view==="ask")bindAsk();
    if(view==="people")document.querySelectorAll("[data-context]").forEach(b=>b.onclick=()=>{state.participant.context=b.dataset.context;save();render("people")});
  }
  function bindAsk(){
    const form=document.getElementById("askForm"),input=document.getElementById("askInput"),messages=document.getElementById("messages");
    function answer(q){
      const l=q.toLowerCase();let a;
      if(l.includes("beatpay"))a="BeatPay coordinates authorized payments through regulated external rails. Palm or phone recognition is not payment authorization, and Zalagren does not claim a payment succeeded without authoritative provider evidence.";
      else if(l.includes("opportunity"))a="BeatGenzi is Zalagren's opportunity-discovery capability. It can structure jobs, services, training, partnerships and other opportunities, but it never guarantees an outcome.";
      else if(l.includes("community"))a="You can participate directly as a person or through community contexts such as TSAVO Royal Suburbs, Mi Vida Garden City and Qwetu Ruaraka. Community relationships do not replace your Zalagren identity.";
      else if(l.includes("explain")||l.includes("zalagren"))a="Zalagren is an intelligent living infrastructure: People + Places + Needs + Capabilities + Authority + Resources → Outcomes. The core chain is Identity → Account → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence.";
      else a="I can help frame that as a need, intent or proposal. I will keep the distinction between recommendation, authorization and actual external execution explicit.";
      messages.insertAdjacentHTML("beforeend",'<div class="message user"><b>You</b><p>'+esc(q)+'</p></div><div class="message assistant"><b>CONSTANTYNA</b><p>'+esc(a)+'</p></div>');messages.scrollIntoView({behavior:"smooth",block:"end"});
    }
    form.onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(q){answer(q);input.value=""}};
    document.querySelectorAll("[data-prompt]").forEach(b=>b.onclick=()=>{input.value=b.dataset.prompt;form.requestSubmit()});
  }
  function toast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
  render("home");
})();
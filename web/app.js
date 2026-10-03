(() => {
  const KEY = "zalagren-demo";
  const initial = {
    participant: { name: "Demo Participant", mode: "PEOPLE", context: "Personal" },
    intents: [], proposals: [], actions: [], events: [], evidence: [],
    selectedCommunity: "TSAVO Royal Suburbs"
  };
  const state = Object.assign(initial, JSON.parse(localStorage.getItem(KEY) || "null") || {});
  const communities = [
    {name:"TSAVO Royal Suburbs",place:"Roysambu, Nairobi",kind:"Residential community",note:"Evidence-backed instance; no invented residents or permissions."},
    {name:"Mi Vida Garden City",place:"Garden City, Thika Road, Nairobi",kind:"Residential community",note:"Exact phase/building/unit inventory is not inferred."},
    {name:"Qwetu Ruaraka",place:"Outer Ring Road, Nairobi",kind:"Student residence",note:"580 beds according to referenced evidence; no invented rooms or residents."}
  ];
  const services = [
    ["BeatPay","Authorized payment coordination through regulated external rails.","SUPPORTED"],
    ["BeatFood","Food discovery, ordering and provider fulfilment.","PROPOSED"],
    ["BeatHealth","Health discovery, appointments and care workflows.","PROPOSED"],
    ["BeatGenzi","Jobs, services, training, partnerships and opportunity discovery.","SUPPORTED"],
    ["BeatMarket","Marketplace coordination with category, seller, consumer and safety controls.","PROPOSED"],
    ["BeatRide","Mobility coordination; Zalagren is not the transport operator.","PROPOSED"],
    ["BeatBnB","Accommodation coordination; no guaranteed booking or occupancy.","PROPOSED"],
    ["Home Services","Cleaning, repair, laundry and property maintenance coordination.","SUPPORTED"],
    ["Utilities","Water, electricity, gas, waste and internet coordination.","PROPOSED"]
  ];

  const artwork = {
    identity:{src:"assets/IMG_1505.png",alt:"Zalagren Identity + Access artwork",label:"Identity + Access"},
    transactions:{src:"assets/IMG_1506.png",alt:"Zalagren Music + Transactions artwork",label:"Music + Transactions"},
    food:{src:"assets/IMG_1507.png",alt:"Zalagren Food + Delivery artwork",label:"Food + Delivery"},
    hospitality:{src:"assets/IMG_1508.png",alt:"Zalagren Accommodation Hospitality artwork",label:"Accommodation Hospitality"},
    genzi:{src:"assets/IMG_1509.png",alt:"Zalagren Connect + Empower Generation artwork",label:"Connect + Empower · Generation"},
    logo:{src:"assets/IMG_1510.png",alt:"Zalagren primary logo artwork",label:"Zalagren"}
  };
  const foundation = [
    ["Identity","Legal / verified identity","One durable identity boundary."],["Account","Zalagren account","Authentication container; not a role."],["Subscription","Participation plan","Commercial relationship, not permission."],["Entitlement","Available capability","What the account can access by plan."],["Participant","Canonical actor","One participant can hold many relationships."],["People","Human relationships","Resident, owner, worker, provider, visitor and more."],["Communities","Participation coordinators","Community context without owning platform services."],["Relationship","Participant ↔ context","Describes connection; never silently authorizes."],["Context","Where / why / when","Makes capability relevant."],["Place","Site → phase → building → unit","Canonical physical hierarchy."],["Organization","Institutional entity","Company, nonprofit, government, cooperative or other."],["Provider","Operational service identity","Can fulfil a service; provider status is not authority."],["Capability","What can be done","A declared ability, not permission."],["Authorization","Explicit authority","Contextual, effective, revocable and fail-closed."]
  ];
  const intelligenceLayers = [
    ["GENESIS","Observe → Understand → Contextualize → Detect → Reason → Propose → Authorize → Execute → Measure → Learn.","Governed intelligence loop."],
    ["CONSTANTYNA","Explain → frame needs → compare options → propose useful next steps.","Human-facing intelligence interface."],
    ["Evidence","Observed / authoritative proof","The boundary between a proposed outcome and a verified outcome."],
    ["Knowledge","Evidence-derived understanding","History is never rewritten."],["Proposal","A suggested path","Proposal ≠ authorization."]
  ];
  const securityLayers = [
    ["Authentication","Who is signed in","Does not grant consequential authority."],["Authorization","What this participant may do now","Checks capability, context, target, status and time."],["Privacy","Minimum necessary information","Purpose, sharing, retention, deletion and export."],["Audit","Traceable events","Actions and evidence remain attributable."],["Failure states","Offline · pending · retry · sync · conflict · rejection · failure · recovery","No fake success."],["External trust","Provider remains authoritative","External execution is only real when independently evidenced."]
  ];
  const topNav = [
    ["home","⌂","Home"],["intelligence","✦","Intelligence"],["people","◎","People"],
    ["services","◇","Services"],["activity","◷","Activity"]
  ];
  const titles = {
    home:"Home", intelligence:"Intelligence", people:"People", community:"Community",
    services:"Services", activity:"Activity", lifecycle:"Execution", service:"Service"
  };

  function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
  function esc(v){ return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
  function badge(v){
    const tone = v==="SUPPORTED"||v==="VERIFIED" ? "green" : v==="PROPOSED" ? "orange" : "blue";
    return '<span class="badge '+tone+'">'+esc(v)+'</span>';
  }

  function readRoute(){
    const p = new URLSearchParams(location.search);
    return { view:p.get("view") || "home", service:p.get("service"), community:p.get("community"), context:p.get("context") };
  }
  function routeLabel(route){
    if(route.view==="service") return ["Services", services[Number(route.service)]?.[0] || "Service"];
    if(route.view==="lifecycle") return ["Activity","Execution lifecycle"];
    if(route.view==="community" && route.community) return ["Community", route.community];
    return [titles[route.view] || "Home"];
  }
  function currentNavState(){
    return history.state && history.state.zalagren ? history.state.zalagren : {idx:0,total:1};
  }
  function navigate(view, params={}, replace=false){
    const q = new URLSearchParams({view});
    Object.entries(params).forEach(([k,v])=>{ if(v!==undefined && v!==null && v!=="") q.set(k,v); });
    const cur=currentNavState();
    const next={idx:replace?cur.idx:cur.idx+1,total:replace?cur.total:cur.idx+2};
    const url=location.pathname+"?"+q.toString();
    history[replace?"replaceState":"pushState"]({zalagren:next}, "", url);
    render(readRoute());
  }
  function goBack(){ if(currentNavState().idx>0) history.back(); else navigate("home",{},true); }
  function goForward(){ if(currentNavState().idx<currentNavState().total-1) history.forward(); }

  function shell(route, content, nested=false){
    const navState=currentNavState(), crumb=routeLabel(route);
    const back = navState.idx>0 ? '<button class="nav-control" id="backBtn" aria-label="Back">‹<span>Back</span></button>' : '<span class="nav-spacer"></span>';
    const forward = navState.idx<navState.total-1 ? '<button class="nav-control" id="forwardBtn" aria-label="Forward">›</button>' : '<span class="nav-spacer"></span>';
    document.getElementById("app").innerHTML =
      '<header class="top"><div class="topbar">'+back+
      '<button class="brand" data-view="home"><span class="mark"><img src="assets/IMG_1510.png" alt="Zalagren logo"></span><span>Zalagren</span></button>'+
      '<div class="location"><strong>'+esc(crumb[crumb.length-1])+'</strong><small>'+crumb.slice(0,-1).map(esc).join("  /  ")+'</small></div>'+
      '<div class="top-actions">'+forward+'<button class="menu" id="menuBtn" aria-label="Open menu">•••</button></div>'+
      '</div></header><main class="shell">'+content+'</main>'+
      '<nav class="bottom" aria-label="Primary">'+topNav.map(([id,icon,label])=>'<button data-view="'+id+'" class="'+(route.view===id||(nested&&id==="services"&&route.view==="service")?"active":"")+'"><i>'+icon+'</i><span>'+label+'</span></button>').join("")+'</nav>'+
      '<div id="toast" class="toast"></div><div id="sheet" class="sheet" hidden></div>';

    document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.view)));
    document.getElementById("backBtn")?.addEventListener("click",goBack);
    document.getElementById("forwardBtn")?.addEventListener("click",goForward);
    document.getElementById("menuBtn").onclick=openMenu;
  }


  function foundationPage(){
    return '<section class="section first"><span class="eyebrow dark">SHARED PLATFORM CORE</span><h1 class="page-title">The whole Zalagren foundation.</h1><p class="lead">One canonical model underneath People, Communities, Places, Services and Intelligence. Roles and products do not create separate identities.</p><div class="detail-card"><div class="identity"><div class="avatar">1</div><div><small>CORE INVARIANT</small><h3>Identity → Account → Participant</h3><p>Then relationships, contexts, capabilities, authorizations and governed outcomes.</p></div><span class="badge green">SUPPORTED</span></div><div class="flow timeline">'+["Identity","Account","Participant","Relationship","Context","Capability","Authorization","Intent","Proposal","Action","Event","Evidence"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div></div><div class="grid two">'+foundation.map((x,i)=>'<div class="card"><span class="card-icon">'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(x[0])+'</strong><span>'+esc(x[1])+'</span><small class="micro">'+esc(x[2])+'</small></div>').join("")+'</div><div class="detail-card" style="margin-top:13px"><img class="artwork-wide" src="'+artwork.identity.src+'" alt="'+esc(artwork.identity.alt)+'"><div class="section-head"><div><span class="eyebrow dark">UPLOADED ARTWORK</span><h3>'+esc(artwork.identity.label)+'</h3></div><span class="badge green">VERIFIED</span></div><p>The repository artwork is now connected to the corresponding platform meaning.</p></div></section>';
  }
  function intelligenceArchitecture(){
    return '<section class="section first"><span class="eyebrow dark">INTELLIGENCE ARCHITECTURE</span><h1 class="page-title">Intelligence without self-authority.</h1><p class="lead">Understanding, recommendation, authorization, execution and evidence remain separate.</p><div class="grid two">'+intelligenceLayers.map(x=>'<div class="card"><span class="badge green">SUPPORTED</span><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></div>').join("")+'</div><div class="callout compact"><h3>Understanding Zalagren ≠ controlling Zalagren.</h3><p>GENESIS and CONSTANTYNA can reason and propose inside governed boundaries. Core authorization remains the authority boundary.</p></div></section>';
  }
  function securityPage(){
    return '<section class="section first"><span class="eyebrow dark">SECURITY + TRUST</span><h1 class="page-title">Fail closed. Tell the truth.</h1><p class="lead">Security, privacy, audit, external-provider trust and failure states are part of the product model.</p><div class="grid two">'+securityLayers.map(x=>'<div class="card"><span class="card-icon">✓</span><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></div>').join("")+'</div><div class="detail-card" style="margin-top:13px"><h3>Truth states</h3><div class="chips"><span class="micro-pill">VERIFIED</span><span class="micro-pill">SUPPORTED</span><span class="micro-pill">PROPOSED</span><span class="micro-pill">FAILED</span></div></div></section>';
  }
  function ecosystemPage(){
    const domains=[["foundation","Foundation","Identity, account, participant, places, organizations and providers."],["community","Communities","TSAVO, Mi Vida and Qwetu contextualized without invented residents or permissions."],["services","Services","Zalagren catalogue and Beat service family."],["intelligence","Intelligence","CONSTANTYNA and GENESIS."],["security","Security","Authorization, privacy, audit and failure states."],["activity","Activity","Intent → proposal → authorization → action → event → evidence."]];
    const art=[artwork.transactions,artwork.food,artwork.hospitality,artwork.genzi];
    return '<section class="section first"><span class="eyebrow dark">ONE ECOSYSTEM</span><h1 class="page-title">Every surface, one governed world.</h1><p class="lead">Explore Zalagren by domain instead of forcing every capability into one dashboard.</p><div class="grid two">'+domains.map(x=>'<button class="card action" data-route="'+x[0]+'"><span class="card-icon">◆</span><strong>'+x[1]+'</strong><span>'+x[2]+'</span><b class="chev">›</b></button>').join("")+'</div><div class="section-head"><h2>Uploaded product artwork</h2><p>Background-removed derivatives now have a real place in the interface.</p></div><div class="grid two">'+art.map(a=>'<div class="card artwork-card"><img src="'+a.src+'" alt="'+esc(a.alt)+'"><strong>'+esc(a.label)+'</strong><span>Repository artwork · transparent derivative</span></div>').join("")+'</div></section>';
  }

  function home(){
    const recent=state.events.slice(-3).reverse();
    return '<section class="hero"><div class="eyebrow">INTELLIGENT LIVING INFRASTRUCTURE</div><h1>Your identity.<br>Your world.<br><em>One ecosystem.</em></h1><p>Zalagren connects people, communities, places, organizations, providers, services and resources through governed participation.</p><div class="hero-actions"><button class="btn primary" data-route="intelligence">Ask CONSTANTYNA</button><button class="btn ghost" data-route="community">Explore communities</button></div></section>'+
      '<section class="section"><div class="section-head"><div><span class="eyebrow dark">YOUR ZALAGREN</span><h2>Command center</h2></div><span class="micro-pill">One participant · many contexts</span></div><div class="grid four">'+
      [['people','People','Identity, participant, relationships and context','◎'],['community','Community','Places, buildings, units and participation','⌂'],['services','Services','Needs, eligibility, proposals and fulfilment','◇'],['activity','Activity','Intent → proposal → authorization → action → evidence','◷']].map(x=>'<button class="card action" data-route="'+x[0]+'"><span class="card-icon">'+x[3]+'</span><strong>'+x[1]+'</strong><span>'+x[2]+'</span><b class="chev">›</b></button>').join("")+
      '</div></section><section class="section"><div class="callout"><div><span class="eyebrow">GOVERNANCE</span><h2>No authorization → no consequential action.</h2><p>GENESIS can observe and propose. CONSTANTYNA can explain and help. Neither can grant authority to itself.</p></div><button class="btn light" data-route="activity">View activity</button></div></section>'+
      '<section class="section"><div class="section-head"><h2>Recent activity</h2>'+badge("SUPPORTED")+'</div>'+
      (recent.length?recent.map(e=>'<div class="listrow"><div><strong>'+esc(e.title)+'</strong><small>'+esc(e.detail)+'</small></div><span class="dot">●</span></div>').join(""):'<div class="empty">Your actions will appear here. Create an intent from a service or ask CONSTANTYNA.</div>')+'</section>';
  }

  function intelligence(){
    return '<section class="section first"><span class="eyebrow dark">INTELLIGENCE</span><h1 class="page-title">CONSTANTYNA</h1><p class="lead">A human-facing intelligence interface for understanding Zalagren, framing needs, comparing options and creating proposals.</p>'+
      '<div class="chat" id="chat"><div class="message assistant"><b>CONSTANTYNA</b><p>I can explain the ecosystem, help frame a need, identify opportunities and propose useful next steps. I cannot authorize myself or claim an external transaction happened when it did not.</p></div><div id="messages"></div></div>'+
      '<form id="askForm" class="composer"><input id="askInput" autocomplete="off" placeholder="Ask: What can Zalagren do for me?"><button class="send">Send</button></form>'+
      '<div class="chips">'+["Explain Zalagren","Find an opportunity","How does BeatPay work?","Show my communities"].map(x=>'<button class="chip" data-prompt="'+esc(x)+'">'+esc(x)+'</button>').join("")+'</div>'+
      '<div class="grid two intelligence-cards"><button class="card action" data-route="activity"><span class="badge green">SUPPORTED</span><h3>GENESIS</h3><p>Observe → understand → contextualize → detect → reason → propose → authorize → execute → measure → learn.</p><b class="chev">›</b></button><div class="card"><span class="badge green">SUPPORTED</span><h3>Governed intelligence</h3><p>Understanding Zalagren is not authority to control Zalagren.</p></div></div></section>';
  }

  function people(){
    return '<section class="section first"><span class="eyebrow dark">PEOPLE</span><h1 class="page-title">One participant.<br>Many relationships.</h1>'+
      '<div class="identity card"><div class="avatar">P</div><div><small>PARTICIPANT</small><h3>'+esc(state.participant.name)+'</h3><p>Account → Participant → Relationships → Contexts → Capabilities → Authorizations</p></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="section-head"><h2>Contexts</h2><p>Context changes relevance. It does not silently grant authority.</p></div><div class="grid two">'+
      ["Personal","Community"].map(c=>'<button class="card context-card '+(state.participant.context===c?"selected":"")+'" data-context="'+c+'"><strong>'+c+'</strong><span>'+ (c==="Personal"?"Direct participation across Zalagren.":"Participation through an adopted community context.")+'</span><b class="chev">›</b></button>').join("")+'</div>'+
      '<div class="section-head"><h2>Community spaces</h2><p>Open a community context without creating another identity.</p></div><button class="card action community-entry" data-route="community"><strong>Explore communities</strong><span>TSAVO Royal Suburbs · Mi Vida Garden City · Qwetu Ruaraka</span><b class="chev">›</b></button><div class="section-head"><h2>Relationships</h2></div><div class="listrow"><div><strong>Participant</strong><small>Primary Zalagren participation identity</small></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="listrow"><div><strong>Potential roles</strong><small>Resident · owner · worker · provider · visitor · driver</small></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="callout compact"><h3>Authentication ≠ Authorization</h3><p>Being signed in, subscribed, related to a place or holding a role does not by itself permit a consequential action.</p></div></section>';
  }

  function community(){
    const selected=state.selectedCommunity;
    return '<section class="section first"><span class="eyebrow dark">COMMUNITIES</span><h1 class="page-title">Places where participation becomes contextual.</h1>'+
      '<div class="community-tabs">'+communities.map(c=>'<button class="tab '+(selected===c.name?"selected":"")+'" data-community="'+esc(c.name)+'">'+esc(c.name)+'</button>').join("")+'</div>'+
      '<div class="community-hero"><span class="badge green">INSTANCE</span><h2>'+esc(selected)+'</h2><p>'+esc((communities.find(c=>c.name===selected)||communities[0]).place)+' · '+esc((communities.find(c=>c.name===selected)||communities[0]).kind)+'</p><div class="note">'+esc((communities.find(c=>c.name===selected)||communities[0]).note)+'</div><div class="mini-grid"><div><small>PARTICIPATION</small><strong>Contextual</strong></div><div><small>INVENTORY</small><strong>Evidence only</strong></div><div><small>AUTHORITY</small><strong>Explicit</strong></div></div></div>'+
      '<div class="section-head"><h2>Place hierarchy</h2><p>Canonical physical model.</p></div><div class="flow">'+["Place / Site","Phase","Building","Unit"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div>'+
      '<div class="callout compact"><h3>Community authority is contextual.</h3><p>Communities coordinate participation and management. Zalagren services remain platform capabilities and cannot be silently blocked by a community.</p></div></section>';
  }

  function serviceIcon(i,s){
    const map={0:artwork.transactions,1:artwork.food,3:artwork.genzi,6:artwork.hospitality};
    const a=map[i];
    return a?'<img src="'+a.src+'" alt="'+esc(a.alt)+'">':'<span>'+esc(s[0].slice(0,1))+'</span>';
  }

  function servicesView(){
    return '<section class="section first"><span class="eyebrow dark">SERVICES</span><h1 class="page-title">Turn needs into governed outcomes.</h1><p class="lead">A service definition is not a connected provider. Zalagren never invents fulfilment, payment, booking or success.</p>'+
      '<div class="service-list">'+services.map((s,i)=>'<button class="service-row" data-service="'+i+'"><div class="service-icon">'+serviceIcon(i,s)+'</div><div class="service-copy"><strong>'+s[0]+'</strong><small>'+s[1]+'</small></div>'+badge(s[2])+'<span class="chev">›</span></button>').join("")+'</div></section>';
  }

  function serviceDetail(i){
    const s=services[i];
    return '<section class="section first detail-view"><div class="detail-kicker"><span class="eyebrow dark">SERVICE</span>'+badge(s[2])+'</div><h1 class="page-title">'+esc(s[0])+'</h1><p class="lead">'+esc(s[1])+'</p>'+
      '<div class="detail-card"><div class="section-head"><div><h2>Governed lifecycle</h2><p>Every consequential transition is explicit.</p></div></div><div class="lifecycle">'+["Need","Intent","Eligibility","Proposal","Authorization","Action","Event","Evidence"].map((x,n)=>'<span><b>'+String(n+1)+'</b>'+x+'</span>').join("")+'</div>'+
      '<button class="btn primary darkbtn" id="createIntent">Create intent</button><p class="micro">Creating an intent does not place an order, charge money, book a provider or authorize execution.</p></div>'+
      '<div class="detail-card"><h3>What this service is not</h3><p>No invented provider connection. No simulated external success. No self-authorized execution.</p></div></section>';
  }

  function activity(){
    const items=[...state.intents.map(x=>({...x,type:"INTENT"})),...state.proposals.map(x=>({...x,type:"PROPOSAL"})),...state.actions.map(x=>({...x,type:"ACTION"})),...state.events.map(x=>({...x,type:"EVENT"})),...state.evidence.map(x=>({...x,type:"EVIDENCE"}))].reverse();
    return '<section class="section first"><span class="eyebrow dark">ACTIVITY & EVIDENCE</span><h1 class="page-title">Nothing important disappears.</h1>'+
      '<div class="flow timeline">'+["Intent","Proposal","Authorization","Action","Event","Evidence"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div>'+
      '<div class="section-head"><div><h2>Participant activity</h2><p>Browser state is local in this web preview. External execution is never simulated as success.</p></div><button class="btn darkbtn" id="lifecycleBtn">Open execution</button></div>'+
      (items.length?items.map(x=>'<div class="timeline-row"><span class="timeline-dot"></span><div><small>'+esc(x.type)+'</small><strong>'+esc(x.title)+'</strong><p>'+esc(x.detail||"")+'</p></div></div>').join(""):'<div class="empty">No activity yet. Create an intent from a service to begin the governed lifecycle.</div>')+
      '<div class="callout compact"><h3>Evidence is the boundary of truth.</h3><p>An external provider must be authoritative before Zalagren records a real-world success.</p></div></section>';
  }

  function openLifecycle(){
    const last=state.intents[state.intents.length-1];
    if(!last){toast("Create a service intent first.");return navigate("services");}
    navigate("lifecycle");
  }

  function lifecycle(){
    const last=state.intents[state.intents.length-1];
    const proposal=last&&state.proposals.find(x=>x.intentId===last.id);
    const action=last&&state.actions.find(x=>x.intentId===last.id);
    const event=action&&state.events.find(x=>x.actionId===action.id);
    const evidence=event&&state.evidence.find(x=>x.eventId===event.id);
    let html='<section class="section first"><span class="eyebrow dark">EXECUTION GATE</span><h1 class="page-title">Governed lifecycle</h1><p class="lead">Every consequential step is explicit. This web client cannot claim an external provider result without authoritative evidence.</p><div class="lifecycle-panel">';
    html+='<div class="stage done"><b>1</b><strong>Intent</strong><small>Created</small></div>';
    if(!proposal) html+='<button class="stage next" id="makeProposal"><b>2</b><strong>Proposal</strong><small>Create proposal</small></button>'; else html+='<div class="stage done"><b>2</b><strong>Proposal</strong><small>Created</small></div>';
    if(proposal&&!proposal.authorized) html+='<button class="stage next" id="authorize"><b>3</b><strong>Authorization</strong><small>Participant approval</small></button>'; else if(proposal) html+='<div class="stage done"><b>3</b><strong>Authorization</strong><small>Authorized</small></div>';
    if(proposal?.authorized&&!action) html+='<button class="stage next" id="execute"><b>4</b><strong>Action</strong><small>Record platform action</small></button>'; else if(action) html+='<div class="stage done"><b>4</b><strong>Action</strong><small>Recorded</small></div>';
    if(action&&!event) html+='<button class="stage next" id="event"><b>5</b><strong>Event</strong><small>Record platform event</small></button>'; else if(event) html+='<div class="stage done"><b>5</b><strong>Event</strong><small>Recorded</small></div>';
    if(event&&!evidence) html+='<button class="stage next" id="evidence"><b>6</b><strong>Evidence</strong><small>Attach local evidence</small></button>'; else if(event) html+='<div class="stage done"><b>6</b><strong>Evidence</strong><small>'+ (evidence?"Captured":"Pending") +'</small></div>';
    html+='</div><div class="callout compact"><h3>Authorization is explicit.</h3><p>This preview records the participant decision locally. It does not charge, book, dispatch or contact an external provider.</p></div><div class="flow-actions"><button class="btn ghost dark-outline" id="backActivity">Back to activity</button>'+((proposal&&!proposal.authorized)||(!proposal)?'<span class="micro-pill">Next step is shown above</span>':'')+'</div></section>';
    return html;
  }

  function openMenu(){
    const s=document.getElementById("sheet");
    s.hidden=false;
    s.innerHTML='<div class="sheet-backdrop" id="sheetClose"></div><div class="sheet-panel"><div class="sheet-grabber"></div><div class="section-head"><div><span class="eyebrow dark">ZALAGREN</span><h2>Menu</h2></div><button class="close" id="sheetCloseBtn">×</button></div>'+
      '<button class="menu-row" data-route="foundation"><strong>Platform foundation</strong><span>Identity, account, participant, places, organizations</span>›</button><button class="menu-row" data-route="ecosystem"><strong>Full ecosystem map</strong><span>All domains and uploaded artwork</span>›</button><button class="menu-row" data-route="people"><strong>Participant & contexts</strong><span>Identity, relationships and context</span>›</button>'+
      '<button class="menu-row" data-route="activity"><strong>Activity & evidence</strong><span>Trace governed lifecycle</span>›</button><button class="menu-row" data-route="security"><strong>Security & trust</strong><span>Authorization, privacy and failure states</span>›</button>'+
      '<div class="menu-row static"><strong>Voice preferences</strong><span>Participant-controlled; integration status is not simulated.</span></div>'+
      '<div class="menu-row static"><strong>Privacy</strong><span>Minimum necessary information, explicit sharing and auditable state.</span></div></div>';
    document.getElementById("sheetClose").onclick=closeMenu;
    document.getElementById("sheetCloseBtn").onclick=closeMenu;
    s.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>{closeMenu();navigate(b.dataset.route);});
  }
  function closeMenu(){const s=document.getElementById("sheet");if(s){s.hidden=true;s.innerHTML="";}}

  function bind(route){
    document.querySelectorAll("[data-route]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.route)));
    if(route.view==="people") document.querySelectorAll("[data-context]").forEach(b=>b.onclick=()=>{state.participant.context=b.dataset.context;save();render(route);toast("Context changed locally.");});
    if(route.view==="community") document.querySelectorAll("[data-community]").forEach(b=>b.onclick=()=>{state.selectedCommunity=b.dataset.community;save();navigate("community",{community:state.selectedCommunity});});
    if(route.view==="services") document.querySelectorAll("[data-service]").forEach(b=>b.onclick=()=>navigate("service",{service:b.dataset.service}));
    if(route.view==="service"){
      const i=Number(route.service),s=services[i];
      document.getElementById("createIntent")?.addEventListener("click",()=>{
        const id="intent-"+Date.now();
        state.intents.push({id,title:s[0]+" request",detail:"Participant created a service intent; awaiting eligibility and proposal.",status:"CREATED",created:Date.now(),service:s[0]});
        save();toast("Intent created. No external action was executed.");navigate("lifecycle");
      });
    }
    if(route.view==="intelligence") bindAsk();
    if(route.view==="activity") document.getElementById("lifecycleBtn")?.addEventListener("click",openLifecycle);
    if(route.view==="lifecycle"){
      const last=state.intents[state.intents.length-1];
      const proposal=last&&state.proposals.find(x=>x.intentId===last.id);
      const action=last&&state.actions.find(x=>x.intentId===last.id);
      const event=action&&state.events.find(x=>x.actionId===action.id);
      const evidence=event&&state.evidence.find(x=>x.eventId===event.id);
      document.getElementById("makeProposal")?.addEventListener("click",()=>{state.proposals.push({id:"proposal-"+Date.now(),intentId:last.id,title:last.title+" proposal",detail:"Proposal created from participant intent; awaiting authorization.",authorized:false,created:Date.now()});save();render(route);});
      document.getElementById("authorize")?.addEventListener("click",()=>{const p=state.proposals.find(x=>x.intentId===last.id);p.authorized=true;p.authorizedAt=Date.now();p.detail="Participant explicitly authorized the proposed platform action.";save();render(route);});
      document.getElementById("execute")?.addEventListener("click",()=>{const p=state.proposals.find(x=>x.intentId===last.id);if(!p?.authorized)return toast("Authorization required.");state.actions.push({id:"action-"+Date.now(),intentId:last.id,title:last.title+" action",detail:"Safe platform action recorded. No external provider execution occurred.",status:"RECORDED",created:Date.now()});save();render(route);});
      document.getElementById("event")?.addEventListener("click",()=>{const a=state.actions.find(x=>x.intentId===last.id);if(!a)return toast("Action required.");state.events.push({id:"event-"+Date.now(),actionId:a.id,title:last.title+" event",detail:"Platform event recorded. External outcome remains unverified.",status:"RECORDED",created:Date.now()});save();render(route);});
      document.getElementById("evidence")?.addEventListener("click",()=>{const e=state.events.find(x=>x.actionId===state.actions.find(x=>x.intentId===last.id)?.id);if(!e)return toast("Event required.");state.evidence.push({id:"evidence-"+Date.now(),eventId:e.id,title:last.title+" evidence",detail:"Local evidence record captured. No external provider proof is asserted.",status:"LOCAL",created:Date.now()});save();render(route);});
      document.getElementById("backActivity")?.addEventListener("click",()=>navigate("activity"));
      void proposal; void action; void event; void evidence;
    }
  }

  function bindAsk(){
    const form=document.getElementById("askForm"),input=document.getElementById("askInput"),messages=document.getElementById("messages");
    function answer(q){
      const l=q.toLowerCase();let a;
      if(l.includes("beatpay")) a="BeatPay coordinates authorized payments through regulated external rails. Palm or phone recognition is not payment authorization, and Zalagren does not claim a payment succeeded without authoritative provider evidence.";
      else if(l.includes("opportunity")) a="BeatGenzi is Zalagren's opportunity-discovery capability. It can structure jobs, services, training, partnerships and other opportunities, but it never guarantees an outcome.";
      else if(l.includes("community")) a="You can participate directly as a person or through community contexts such as TSAVO Royal Suburbs, Mi Vida Garden City and Qwetu Ruaraka. Community relationships do not replace your Zalagren identity.";
      else if(l.includes("explain")||l.includes("zalagren")) a="Zalagren is an intelligent living infrastructure: People + Places + Needs + Capabilities + Authority + Resources → Outcomes. The core chain is Identity → Account → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence.";
      else a="I can help frame that as a need, intent or proposal. I will keep the distinction between recommendation, authorization and actual external execution explicit.";
      messages.insertAdjacentHTML("beforeend",'<div class="message user"><b>You</b><p>'+esc(q)+'</p></div><div class="message assistant"><b>CONSTANTYNA</b><p>'+esc(a)+'</p></div>');
      messages.scrollTop=messages.scrollHeight;
    }
    form.onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(q){answer(q);input.value="";}};
    document.querySelectorAll("[data-prompt]").forEach(b=>b.onclick=()=>{input.value=b.dataset.prompt;form.requestSubmit();});
  }

  function toast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600);}

  function render(route){
    closeMenu();
    let content;
    if(route.view==="intelligence")content=intelligenceArchitecture();
    else if(route.view==="people")content=people();
    else if(route.view==="ecosystem")content=ecosystemPage();
    else if(route.view==="foundation")content=foundationPage();
    else if(route.view==="security")content=securityPage();
    else if(route.view==="community")content=community();
    else if(route.view==="services")content=servicesView();
    else if(route.view==="service")content=serviceDetail(Number(route.service));
    else if(route.view==="activity")content=activity();
    else if(route.view==="lifecycle")content=lifecycle();
    else content=home();
    shell(route,content,route.view==="service"||route.view==="lifecycle");
    bind(route);
    window.scrollTo({top:0,behavior:"instant"});
  }

  window.addEventListener("popstate",()=>render(readRoute()));
  const start=currentNavState();
  if(!history.state?.zalagren) history.replaceState({zalagren:{idx:0,total:1}},"",location.pathname+"?view="+(new URLSearchParams(location.search).get("view")||"home"));
  render(readRoute());
})();
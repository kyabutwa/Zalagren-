(() => {
  const KEY = "royal-city-platform-v1";
  const LEGACY_KEY = "zalagren-demo";
  const initial = {
    participant: { name: "Demo Participant", mode: "PEOPLE", context: "Personal" },
    intents: [], proposals: [], actions: [], events: [], evidence: [],
    selectedCommunity: "TSAVO Royal Suburbs"
  };
  function loadSavedState(){
    const current=localStorage.getItem(KEY);
    if(current){try{const saved=JSON.parse(current);if(saved&&typeof saved==="object"&&!Array.isArray(saved))return saved;}catch{}}
    const legacy=localStorage.getItem(LEGACY_KEY);
    if(legacy){
      try{
        const saved=JSON.parse(legacy);
        if(saved&&typeof saved==="object"&&!Array.isArray(saved)){
          localStorage.setItem(KEY,legacy);
          if(localStorage.getItem(KEY)===legacy)localStorage.removeItem(LEGACY_KEY);
          return saved;
        }
      }catch{}
    }
    return {};
  }
  const state = Object.assign(initial, loadSavedState());
  const communities = [
    {name:"TSAVO Royal Suburbs",place:"Roysambu, Nairobi",kind:"Residential community",note:"Evidence-backed instance; no invented residents or permissions."},
    {name:"Mi Vida Garden City",place:"Garden City, Thika Road, Nairobi",kind:"Residential community",note:"Exact phase/building/unit inventory is not inferred."},
    {name:"Qwetu Ruaraka",place:"Outer Ring Road, Nairobi",kind:"Student residence",note:"580 beds according to referenced evidence; no invented rooms or residents."}
  ];
  const services = [
    ["BeatPay","Authorized payment coordination through regulated external rails.","SUPPORTED"],
    ["BeatFood","Food discovery, ordering and provider fulfilment; provider delivery is independently evidenced.","SUPPORTED"],
    ["BeatHealth","Protected health discovery, appointments and care coordination; clinical authority remains external.","SUPPORTED"],
    ["BeatGenzi","Jobs, services, training, partnerships and opportunity discovery.","SUPPORTED"],
    ["BeatMarket","Marketplace coordination with category, seller, consumer and safety controls.","SUPPORTED"],
    ["BeatRide","Mobility coordination with explicit driver, vehicle, safety and regulatory boundaries.","SUPPORTED"],
    ["BeatBnB","Accommodation coordination with explicit host, property, availability and stay evidence.","SUPPORTED"],
    ["BeatGuardian","Trusted check-ins and incident coordination without replacing emergency authorities.","SUPPORTED"],
    ["BeatUtilities","Water, electricity, gas, waste and connectivity coordination against authoritative providers.","SUPPORTED"],
    ["Home Services","Cleaning, repair, laundry and property maintenance coordination.","SUPPORTED"]
  ];

  // Global identity uses the first-party Royal City SVG system. Supplied artwork is assigned to
  // a service only when its observed meaning is unambiguous; it is never a generic gallery.
  const serviceIdentity = {
    BeatHealth:{src:"assets/IMG_1510.png",alt:"BeatHealth service identity"},
    BeatFood:{src:"assets/IMG_1507.png",alt:"BeatFood service identity"},
    BeatBnB:{src:"assets/IMG_1508.png",alt:"BeatBnB service identity"},
    BeatGenzi:{src:"assets/IMG_1509.png",alt:"BeatGenzi service identity"}
  };
  const serviceSymbols = {
    BeatHealth:"✚", BeatMarket:"◇", BeatRide:"↗", BeatGuardian:"◉", BeatUtilities:"⌁", "Home Services":"⌂"
  };
  const platformIconPaths={
    home:'<path d="m3.8 11.1 8.2-6.5 8.2 6.5M5.8 9.7v9.1h12.4V9.7M9.4 18.8v-5.5h5.2v5.5"/>',
    residential:'<path d="M4.5 19V9.2L12 5l7.5 4.2V19M8.5 19v-5.6h7V19M3 19h18M8 9.8h.01M16 9.8h.01"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3.7 19v-1.1a5.3 5.3 0 0 1 10.6 0V19zM15.2 5.2a3 3 0 0 1 0 5.8M17 13.1a4.6 4.6 0 0 1 3.3 4.4v1.2h-3.1"/>',
    community:'<circle cx="12" cy="8" r="3"/><circle cx="5" cy="15" r="2"/><circle cx="19" cy="15" r="2"/><path d="M6.4 12.5 9.8 10M14.2 10l3.4 2.5M8 19h8M12 11v6"/>',
    services:'<path d="m12 3.5 8.5 8.5-8.5 8.5L3.5 12z"/><path d="M12 7.5v9M7.5 12h9"/>',
    intelligence:'<path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.8 2.8M15.2 15.2 18 18M18 6l-2.8 2.8M8.8 15.2 6 18"/><circle cx="12" cy="12" r="4.2"/>',
    activity:'<path d="M4 19V5M4 19h16M7 15l3-4 3 2 5-7"/><circle cx="18" cy="6" r="1"/>',
    lifecycle:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 9a6.5 6.5 0 0 1 11-2L20 9M4 15l2.9 2a6.5 6.5 0 0 0 11-2"/>',
    foundation:'<path d="M4 20h16M5.5 20V9l6.5-4 6.5 4v11M8.5 11.5v2M12 11.5v2M15.5 11.5v2M8.5 16v2M12 16v2M15.5 16v2"/>',
    security:'<path d="M12 3.5 19 6v5.2c0 4.4-2.8 7.4-7 9.3-4.2-1.9-7-4.9-7-9.3V6z"/><path d="m8.7 12.1 2.1 2.1 4.6-4.7"/>',
    payments:'<rect x="3.5" y="6" width="17" height="12" rx="2.5"/><path d="M3.5 10h17M7.5 14h3"/>',
    ecosystem:'<circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="4" ry="8.5"/><path d="M3.8 9h16.4M3.8 15h16.4"/>',
    settings:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
    evidence:'<path d="M6 3.5h8l4 4V20H6zM14 3.5V8h4M9 12h6M9 15.5h6"/><path d="m9 18 1.4 1.4 3-3"/>'
  };
  function platformIcon(name, className=""){
    return '<svg class="platform-icon '+className+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(platformIconPaths[name]||platformIconPaths.ecosystem)+'</svg>';
  }
  const foundation = [
    ["Identity","Legal / verified identity","One durable identity boundary."],["Account","Royal City account","Authentication container; not a role."],["Subscription","Participation plan","Commercial relationship, not permission."],["Entitlement","Available capability","What the account can access by plan."],["Participant","Canonical actor","One participant can hold many relationships."],["People","Human relationships","Resident, owner, worker, provider, visitor and more."],["Communities","Participation coordinators","Community context without owning platform services."],["Relationship","Participant ↔ context","Describes connection; never silently authorizes."],["Context","Where / why / when","Makes capability relevant."],["Place","Site → phase → building → unit","Canonical physical hierarchy."],["Organization","Institutional entity","Company, nonprofit, government, cooperative or other."],["Provider","Operational service identity","Can fulfil a service; provider status is not authority."],["Capability","What can be done","A declared ability, not permission."],["Authorization","Explicit authority","Contextual, effective, revocable and fail-closed."]
  ];
  const intelligenceLayers = [
    ["GENESIS","Observe → Understand → Contextualize → Detect → Reason → Propose → Authorize → Execute → Measure → Learn.","Governed intelligence loop."],
    ["CONSTANTYNA","Explain → frame needs → compare options → propose useful next steps.","Human-facing intelligence interface."],
    ["Evidence","Observed / authoritative proof","The boundary between a proposed outcome and a verified outcome."],
    ["Knowledge","Evidence-derived understanding","History is never rewritten."],["Proposal","A suggested path","Proposal ≠ authorization."]
  ];
  const securityLayers = [
    ["Authentication","Who is signed in","Does not grant consequential authority."],["Authorization","What this participant may do now","Checks capability, context, target, status and time."],["Privacy","Minimum necessary information","Purpose, sharing, retention, deletion and export."],["Audit","Traceable events","Actions and evidence remain attributable."],["Failure states","Offline · pending · retry · sync · conflict · rejection · failure · recovery","No unverified success."],["External trust","Provider remains authoritative","External execution is only real when independently evidenced."]
  ];
  const topNav = [
    ["home","⌂","Home"],["intelligence","✦","Intelligence"],["people","◎","People"],
    ["services","◇","Services"],["activity","◷","Activity"]
  ];
  const titles = {
    home:"Home", intelligence:"Intelligence", people:"People", community:"Community", residential:"Royal City Residential",
    services:"Services", activity:"Activity", lifecycle:"Execution", service:"Service", foundation:"Foundation", security:"Security", ecosystem:"Ecosystem", settings:"Settings"
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
    return history.state && (history.state.royalCity || history.state.zalagren) ? (history.state.royalCity || history.state.zalagren) : {idx:0,total:1};
  }
  function navigate(view, params={}, replace=false){
    const q = new URLSearchParams({view});
    Object.entries(params).forEach(([k,v])=>{ if(v!==undefined && v!==null && v!=="") q.set(k,v); });
    const cur=currentNavState();
    const next={idx:replace?cur.idx:cur.idx+1,total:replace?cur.total:cur.idx+2};
    const url=location.pathname+"?"+q.toString();
    history[replace?"replaceState":"pushState"]({royalCity:next}, "", url);
    render(readRoute());
  }
  function goBack(){ if(currentNavState().idx>0) history.back(); else navigate("home",{},true); }
  function goForward(){ if(currentNavState().idx<currentNavState().total-1) history.forward(); }

  function shell(route, content, nested=false){
    const crumb=routeLabel(route), context=state.participant.context||"Personal";
    document.getElementById("app").innerHTML =
      '<header class="top"><div class="topbar">'+
      '<button class="nav-control menu-trigger" id="menuBtn" aria-label="Open Royal City workspace menu" aria-haspopup="dialog" aria-expanded="false"><span></span><span></span><span></span></button>'+
      '<button class="brand" data-view="home" aria-label="Royal City home"><span class="mark"><img src="royal-city-wordmark.svg" alt="Royal City" width="190" height="50" decoding="sync" fetchpriority="high"></span></button>'+
      '<button class="account-control" id="accountBtn" aria-label="Open My Royal City"><span class="account-dot"></span><span>My Royal City</span></button>'+
      '</div><div class="workspacebar">'+
      '<button class="workspace-context" data-view="people"><span class="workspace-pulse"></span><strong>'+esc(context)+'</strong><span class="workspace-separator">·</span><span>'+esc(crumb.join(" / "))+'</span></button>'+
      '<button class="workspace-search" id="workspaceSearch" aria-label="Search Royal City">Search Royal City <kbd>⌘K</kbd></button>'+
      '</div></header><main class="shell">'+content+'</main>'+
      '<div id="toast" class="toast"></div><div id="sheet" class="sheet" hidden></div>';
    document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.view)));
    document.getElementById("menuBtn").onclick=openMenu;
    document.getElementById("accountBtn").onclick=()=>navigate("settings");
    document.getElementById("workspaceSearch").onclick=()=>toast("Search is reserved for verified Royal City data and services.");
  }
function foundationPage(){
    return '<section class="section first"><span class="eyebrow dark">SHARED PLATFORM CORE</span><h1 class="page-title">The whole Royal City foundation.</h1><p class="lead">One canonical model underneath People, Communities, Places, Services and Intelligence. Roles and products do not create separate identities.</p><div class="detail-card"><div class="identity"><div class="avatar">1</div><div><small>CORE INVARIANT</small><h3>Identity → Account → Participant</h3><p>Then relationships, contexts, capabilities, authorizations and governed outcomes.</p></div><span class="badge green">SUPPORTED</span></div><div class="flow timeline">'+["Identity","Account","Participant","Relationship","Context","Capability","Authorization","Intent","Proposal","Action","Event","Evidence"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div></div><div class="grid two">'+foundation.map((x,i)=>'<div class="card"><span class="card-icon">'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(x[0])+'</strong><span>'+esc(x[1])+'</span><small class="micro">'+esc(x[2])+'</small></div>').join("")+'</div></section>';
  }
  function intelligenceArchitecture(){
    return '<section class="section first"><span class="eyebrow dark">INTELLIGENCE ARCHITECTURE</span><h1 class="page-title">Intelligence without self-authority.</h1><p class="lead">Understanding, recommendation, authorization, execution and evidence remain separate.</p><div class="grid two">'+intelligenceLayers.map(x=>'<div class="card"><span class="badge green">SUPPORTED</span><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></div>').join("")+'</div><div class="callout compact"><h3>Understanding Royal City ≠ controlling Royal City.</h3><p>GENESIS and CONSTANTYNA can reason and propose inside governed boundaries. Core authorization remains the authority boundary.</p></div></section>';
  }
  function securityPage(){
    return '<section class="section first"><span class="eyebrow dark">SECURITY + TRUST</span><h1 class="page-title">Fail closed. Tell the truth.</h1><p class="lead">Security, privacy, audit, external-provider trust and failure states are part of the product model.</p><div class="grid two">'+securityLayers.map(x=>'<div class="card"><span class="card-icon">✓</span><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></div>').join("")+'</div><div class="detail-card" style="margin-top:13px"><h3>Truth states</h3><div class="chips"><span class="micro-pill">VERIFIED</span><span class="micro-pill">SUPPORTED</span><span class="micro-pill">PROPOSED</span><span class="micro-pill">FAILED</span></div></div></section>';
  }
  function ecosystemPage(){
    const domains=[
      ["residential","Royal City Residential","A refined home and community workspace within the Royal City platform."],
      ["foundation","Platform core","Identity, account, participant, relationships, context, capability and authorization."],
      ["people","People & communities","One participant identity across personal and community contexts."],
      ["services","Services","A governed service catalog with explicit eligibility and provider truth."],
      ["intelligence","Intelligence","CONSTANTYNA and GENESIS inside the platform authority boundary."],
      ["security","Security & trust","Authentication, authorization, privacy, audit and failure states."],
      ["activity","Activity & evidence","Intent → proposal → authorization → action → event → evidence."]
    ];
    return '<section class="section first"><div class="workspace-heading"><span><span class="eyebrow dark">WORKSPACE</span><h1 class="page-title">Royal City, as one platform.</h1><p class="lead">A focused working environment: shared platform core, contextual data, governed workflows and intelligence — without fragmented product silos.</p></span><span class="workspace-status"><i></i> PLATFORM ONLINE</span></div><div class="grid two workspace-grid">'+domains.map(x=>'<button class="card action workspace-card" data-route="'+x[0]+'"><span class="workspace-card-top"><span class="card-icon">◆</span><b class="chev">›</b></span><strong>'+x[1]+'</strong><span>'+x[2]+'</span></button>').join("")+'</div><div class="callout compact"><h3>One platform. Many contexts. One governed model.</h3><p>We adopt the platform discipline behind ServiceNow — focused workspaces, contextual data, reusable surfaces and deterministic workflows — while keeping Royal City’s own identity, authority and evidence rules.</p></div></section>';
  }
  function home(){
    const recent=state.events.slice(-3).reverse();
    const spaces=[
      ["residential","residential","Royal City Residential","Home, shared spaces and the services around community life.",true],
      ["people","people","People & contexts","Carry one identity across the places you participate."],
      ["services","services","Services","Discover capabilities, providers and clear service boundaries."],
      ["activity","evidence","Operations & evidence","Follow each request and see what has actually happened."],
      ["foundation","foundation","Platform foundation","The shared model for identity, place and authority."],
      ["intelligence","intelligence","CONSTANTYNA","Ask, understand and consider the next step."]
    ];
    return '<section class="home-surface">'+
      '<div class="home-hero"><div class="home-hero-copy"><div class="home-kicker"><span class="home-kicker-rule"></span><span>CONNECTED LIVING · ONE ECOSYSTEM</span></div><h1 class="home-title">The world around you,<br><em>working as one.</em></h1><p class="home-lede">Royal City connects people, homes, communities and essential services — with clear context, accountable decisions and outcomes you can follow.</p><div class="home-hero-actions"><button class="home-primary-action" data-route="residential"><span>Explore residential living</span><b>↗</b></button><button class="home-secondary-action" data-route="ecosystem">See how the ecosystem works <span>→</span></button></div><div class="home-hero-meta"><span>PEOPLE</span><i></i><span>PLACES</span><i></i><span>SERVICES</span><i></i><span>PROOF</span></div></div>'+
      '<aside class="home-model-card"><div class="model-card-top"><span>THE ROYAL CITY MODEL</span><span>01 — 04</span></div><div class="model-emblem-wrap"><span class="model-orbit model-orbit-one"></span><span class="model-orbit model-orbit-two"></span><img src="royal-city-emblem.svg" alt=""></div><div class="model-flow">'+[["01","people","Identity","One participant"],["02","foundation","Place","A clear context"],["03","services","Capability","A defined service"],["04","evidence","Outcome","An accountable record"]].map(x=>'<div class="model-flow-row"><span class="model-flow-index">'+x[0]+'</span><span class="model-flow-icon">'+platformIcon(x[1])+'</span><span class="model-flow-copy"><strong>'+x[2]+'</strong><small>'+x[3]+'</small></span><span class="model-flow-node"></span></div>').join("")+'</div><div class="model-card-foot"><span>CONTEXT → AUTHORITY → EVIDENCE</span><span class="model-foot-rule"></span></div></aside></div>'+
      '<section class="home-spaces"><div class="home-section-heading"><div><span class="eyebrow">THE ECOSYSTEM</span><h2>Everyday life, better connected.</h2><p>Choose a space to begin. Your context and identity travel with you.</p></div><span class="home-section-code">RC / 01</span></div><div class="home-space-grid">'+spaces.map(([route,icon,title,detail,featured])=>'<button class="home-space-card'+(featured?' is-featured':'')+'" data-route="'+route+'"><span class="space-card-icon">'+platformIcon(icon)+'</span><span class="space-card-copy"><span class="space-card-index">'+(featured?'RESIDENTIAL · ROYAL CITY':'ROYAL CITY WORKSPACE')+'</span><strong>'+title+'</strong><small>'+detail+'</small></span><span class="space-card-arrow" aria-hidden="true">↗</span></button>').join("")+'</div></section>'+
      '<div class="home-briefing-grid"><section class="home-principle-panel"><div class="home-panel-kicker"><span class="panel-index">01</span><span>THE AUTHORITY STANDARD</span></div><h2>A proposal is not permission.</h2><p>Every consequential step needs the right authority, in the right context, with a record that can be checked.</p><button data-route="security">How trust works <span>→</span></button></section><section class="home-activity-panel"><div class="home-panel-heading"><div><span class="eyebrow">PLATFORM RECORD</span><h2>Recent activity</h2></div><button data-route="activity" aria-label="Open activity">View all <span>→</span></button></div><div class="home-activity-content">'+(recent.length?recent.map(e=>'<button class="home-activity-row" data-route="activity"><span class="activity-dot"></span><span><strong>'+esc(e.title)+'</strong><small>'+esc(e.detail)+'</small></span><span>›</span></button>').join(""):'<div class="home-activity-empty"><span class="activity-empty-mark">'+platformIcon("activity")+'</span><span><strong>No platform activity yet</strong><small>Recorded requests and decisions will appear here.</small></span></div>')+'</div></section></div>'+
      '</section>';
  }

function intelligence(){
    return '<section class="section first"><span class="eyebrow dark">INTELLIGENCE</span><h1 class="page-title">CONSTANTYNA</h1><p class="lead">A human-facing intelligence interface for understanding Royal City, framing needs, comparing options and creating proposals.</p>'+
      '<div class="chat" id="chat"><div class="message assistant"><b>CONSTANTYNA</b><p>I can explain the ecosystem, help frame a need, identify opportunities and propose useful next steps. I cannot authorize myself or claim an external transaction happened when it did not.</p></div><div id="messages"></div></div>'+
      '<form id="askForm" class="composer"><input id="askInput" autocomplete="off" placeholder="Ask: What can Royal City do for me?"><button class="send">Send</button></form>'+
      '<div class="chips">'+["Explain Royal City","Find an opportunity","How does BeatPay work?","Show my communities"].map(x=>'<button class="chip" data-prompt="'+esc(x)+'">'+esc(x)+'</button>').join("")+'</div>'+
      '<div class="section-head"><div><h2>Intelligence architecture</h2><p>Proposal, authority and evidence stay separate.</p></div></div><div class="grid two"><div class="card"><span class="badge green">SUPPORTED</span><h3>GENESIS</h3><p>Observe → understand → contextualize → detect → reason → propose → authorize → execute → measure → learn.</p></div><div class="card"><span class="badge green">SUPPORTED</span><h3>CONSTANTYNA</h3><p>Explains Royal City, frames needs, compares options and proposes useful next steps.</p></div><div class="card"><span class="badge green">SUPPORTED</span><h3>Evidence</h3><p>Authoritative evidence separates a proposed outcome from a verified real-world outcome.</p></div><div class="card"><span class="badge green">SUPPORTED</span><h3>Knowledge</h3><p>Evidence-derived understanding; history is never rewritten.</p></div><div class="card"><span class="badge green">SUPPORTED</span><h3>Proposal</h3><p>A suggested path is never itself authorization.</p></div></div>'+'<div class="grid two intelligence-cards"><button class="card action" data-route="activity"><span class="badge green">SUPPORTED</span><h3>GENESIS</h3><p>Observe → understand → contextualize → detect → reason → propose → authorize → execute → measure → learn.</p><b class="chev">›</b></button><div class="card"><span class="badge green">SUPPORTED</span><h3>Governed intelligence</h3><p>Understanding Royal City is not authority to control Royal City.</p></div></div></section>';
  }

  function people(){
    return '<section class="section first"><span class="eyebrow dark">PEOPLE</span><h1 class="page-title">One participant.<br>Many relationships.</h1>'+
      '<div class="identity card"><div class="avatar">P</div><div><small>PARTICIPANT</small><h3>'+esc(state.participant.name)+'</h3><p>Account → Participant → Relationships → Contexts → Capabilities → Authorizations</p></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="section-head"><h2>Contexts</h2><p>Context changes relevance. It does not silently grant authority.</p></div><div class="grid two">'+
      ["Personal","Community"].map(c=>'<button class="card context-card '+(state.participant.context===c?"selected":"")+'" data-context="'+c+'"><strong>'+c+'</strong><span>'+ (c==="Personal"?"Direct participation across Royal City.":"Participation through an adopted community context.")+'</span><b class="chev">›</b></button>').join("")+'</div>'+
      '<div class="section-head"><h2>Community spaces</h2><p>Open a community context without creating another identity.</p></div><button class="card action community-entry" data-route="community"><strong>Explore communities</strong><span>TSAVO Royal Suburbs · Mi Vida Garden City · Qwetu Ruaraka</span><b class="chev">›</b></button><div class="section-head"><h2>Relationships</h2></div><div class="listrow"><div><strong>Participant</strong><small>Primary Royal City participation identity</small></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="listrow"><div><strong>Potential roles</strong><small>Resident · owner · worker · provider · visitor · driver</small></div>'+badge("SUPPORTED")+'</div>'+
      '<div class="callout compact"><h3>Authentication ≠ Authorization</h3><p>Being signed in, subscribed, related to a place or holding a role does not by itself permit a consequential action.</p></div></section>';
  }

  function community(){
    const selected=state.selectedCommunity;
    return '<section class="section first"><span class="eyebrow dark">COMMUNITIES</span><h1 class="page-title">Places where participation becomes contextual.</h1>'+
      '<div class="community-tabs">'+communities.map(c=>'<button class="tab '+(selected===c.name?"selected":"")+'" data-community="'+esc(c.name)+'">'+esc(c.name)+'</button>').join("")+'</div>'+
      '<div class="community-hero"><span class="badge green">INSTANCE</span><h2>'+esc(selected)+'</h2><p>'+esc((communities.find(c=>c.name===selected)||communities[0]).place)+' · '+esc((communities.find(c=>c.name===selected)||communities[0]).kind)+'</p><div class="note">'+esc((communities.find(c=>c.name===selected)||communities[0]).note)+'</div><div class="mini-grid"><div><small>PARTICIPATION</small><strong>Contextual</strong></div><div><small>INVENTORY</small><strong>Evidence only</strong></div><div><small>AUTHORITY</small><strong>Explicit</strong></div></div></div>'+
      '<div class="section-head"><h2>Place hierarchy</h2><p>Canonical physical model.</p></div><div class="flow">'+["Place / Site","Phase","Building","Unit"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div>'+
      '<div class="callout compact"><h3>Community authority is contextual.</h3><p>Communities coordinate participation and management. Royal City services remain platform capabilities and cannot be silently blocked by a community.</p></div></section>';
  }

  function residentialPage(){
    const selected=state.selectedCommunity||communities[0].name;
    const requests=Array.isArray(state.residentialRequests)?state.residentialRequests:[];
    const serviceCards=[
      ["BeatAccess","Visits & entry","Coordinate a visit request with the right host and community context.","No gate control connected","security"],
      ["BeatBooking","Shared places","Request a time for a community facility or shared place.","Availability needs community data","community"],
      ["BeatUtilities","Home services","Route a water, power or maintenance issue to the responsible team.","No provider link in this preview","foundation"],
      ["BeatPay","Residential payments","Review an authorized request and its payment status.","No money movement connected","payments"]
    ];
    return '<section class="section first residential-page"><div class="residential-hero"><div class="residential-hero-copy"><span class="eyebrow">ROYAL CITY · RESIDENTIAL</span><p class="residential-kicker">ROYAL CITY WORKSPACE</p><h1 class="page-title">Home life,<br><em>working together.</em></h1><p class="lead">A residential experience within Royal City: people, homes, community teams and services brought together with clear context and permission.</p><div class="residential-context"><span class="context-pulse"></span><span>ACTIVE COMMUNITY</span><strong>'+esc(selected)+'</strong><button class="residential-context-change" data-residential-scroll="communities">Change community <b>↓</b></button></div></div><div class="residential-orbit" aria-label="One residential network connecting people, homes, communities and services"><div class="orbit-ring"></div><div class="orbit-core"><span>RC</span><small>RESIDENTIAL<br>NETWORK</small></div><span class="orbit-node node-home">⌂<small>HOME</small></span><span class="orbit-node node-people">◉<small>PEOPLE</small></span><span class="orbit-node node-community">▦<small>COMMUNITY</small></span><span class="orbit-node node-service">✳<small>SERVICES</small></span></div></div>'+
      '<div class="residential-trust-strip"><span><b>01</b> One participant identity</span><i></i><span><b>02</b> Community-scoped context</span><i></i><span><b>03</b> Permission before action</span></div>'+
      '<div class="residential-section-head" id="communities"><div><span class="eyebrow dark">YOUR RESIDENTIAL NETWORK</span><h2>Choose a community</h2><p>Each community remains its own governed context.</p></div><span class="preview-pill"><i></i> PREVIEW · LOCAL DATA</span></div><div class="residential-community-grid">'+communities.map((c,i)=>'<button class="residential-community-card '+(selected===c.name?'is-selected':'')+'" data-residential-community="'+esc(c.name)+'"><span class="community-card-top"><span class="community-monogram">'+String(i+1).padStart(2,'0')+'</span><span class="community-arrow">↗</span></span><span class="community-kind">'+esc(c.kind.toUpperCase())+'</span><strong>'+esc(c.name)+'</strong><span class="community-location">'+esc(c.place)+'</span><span class="community-card-footer"><span>'+ (selected===c.name?'ACTIVE CONTEXT':'OPEN COMMUNITY') +'</span><b>→</b></span></button>').join('')+'</div>'+
      '<div class="residential-section-head"><div><span class="eyebrow dark">A CALMER WAY TO COORDINATE</span><h2>Your home, connected</h2><p>Start with a need. The community and service decide what can happen next.</p></div><span class="residential-section-mark">RC / 01</span></div><div class="residential-feature-grid"><article class="residential-feature-card feature-home"><span class="feature-index">01 / HOME</span><span class="feature-symbol">⌂</span><h3>Home & household</h3><p>Keep household, Unit and visit context clear in the same Royal City identity.</p><span class="feature-foot">UNIT RELATIONSHIPS <b>→</b></span></article><article class="residential-feature-card feature-operations"><span class="feature-index">02 / COMMUNITY</span><span class="feature-symbol">▦</span><h3>Community operations</h3><p>Give the right team a clear request, follow its status and preserve the outcome.</p><span class="feature-foot">REQUESTS & PLACES <b>→</b></span></article><article class="residential-feature-card feature-governance"><span class="feature-index">03 / TRUST</span><span class="feature-symbol">◈</span><h3>Local governance</h3><p>Community staff authority stays scoped to its community. Membership alone is not permission.</p><span class="feature-foot">SCOPED AUTHORITY <b>→</b></span></article></div>'+
      '<div class="residential-section-head"><div><span class="eyebrow dark">BEAT · RESIDENTIAL SERVICES</span><h2>Useful services. Clear limits.</h2><p>Explore the residential service surfaces adapted from Royal City.</p></div><span class="residential-section-mark">04 SERVICES</span></div><div class="residential-service-grid">'+serviceCards.map((s,i)=>'<article class="residential-service-card"><div class="service-card-top"><span class="service-monogram">'+s[4]+'</span><span class="service-number">0'+(i+1)+'</span></div><span class="service-category">'+(i<2?'COMMUNITY LIFE':'HOME & OPERATIONS')+'</span><h3>'+s[0]+'</h3><strong>'+s[1]+'</strong><p>'+s[2]+'</p><div class="service-boundary"><span>BOUNDARY</span>'+s[3]+'</div><button class="residential-request" data-residential-request="'+esc(s[0])+'">Create a local request <b>＋</b></button></article>').join('')+'</div>'+
      '<div class="residential-section-head"><div><span class="eyebrow dark">RESIDENTIAL ACTIVITY</span><h2>Requests, made visible</h2><p>Only local preview records appear here. No community team or provider is contacted.</p></div><span class="preview-pill"><i></i> DEVICE-LOCAL</span></div><div class="residential-activity">'+(requests.length?requests.slice().reverse().map((r,i)=>'<article class="residential-activity-row"><span class="activity-index">'+String(i+1).padStart(2,'0')+'</span><span class="activity-mark">'+esc(r.service.slice(0,2).toUpperCase())+'</span><span class="activity-copy"><strong>'+esc(r.service)+' request</strong><small>'+esc(r.community)+' · '+esc(r.time)+'</small></span><span class="activity-state">LOCAL PREVIEW</span></article>').join(''):'<div class="residential-activity-empty"><span class="empty-mark">✳</span><strong>Your residential activity will appear here.</strong><small>Requests remain on this device until a verified community workflow is connected.</small></div>')+'</div>'+
      '<div class="residential-disclaimer"><span>◈</span><p><strong>Designed to feel connected. Honest about what is connected.</strong><br>This is a product preview. Resident records, payment and provider actions are not connected to a live residential system.</p><span class="disclaimer-code">RC / HOME</span></div></section>';
  }

  function serviceIcon(i,s){
    const a=serviceIdentity[s[0]];
    return a?'<img src="'+a.src+'" alt="'+esc(a.alt)+'"><span class="sr-only">'+esc(s[0])+'</span>':'<span class="service-symbol" aria-hidden="true">'+esc(serviceSymbols[s[0]]||s[0].slice(0,1))+'</span>';
  }

  function servicesView(){
    return '<section class="section first"><span class="eyebrow dark">SERVICES</span><h1 class="page-title">Turn needs into governed outcomes.</h1><p class="lead">A service definition is not a connected provider. Royal City never invents fulfilment, payment, booking or success.</p>'+
      '<div class="service-list">'+services.map((s,i)=>'<button class="service-row" data-service="'+i+'"><div class="service-icon">'+serviceIcon(i,s)+'</div><div class="service-copy"><strong>'+s[0]+'</strong><small>'+s[1]+'</small></div>'+badge(s[2])+'<span class="chev">›</span></button>').join("")+'</div></section>';
  }

  function serviceDetail(i){
    const s=services[i], mark=serviceIdentity[s[0]];
    return '<section class="section first detail-view"><div class="service-identity-header">'+(mark?'<div class="service-identity-mark"><img src="'+mark.src+'" alt="'+esc(mark.alt)+'"></div>':'<div class="service-identity-mark service-symbol-mark">'+esc(serviceSymbols[s[0]]||s[0].slice(0,1))+'</div>')+'<div><span class="eyebrow dark">SERVICE</span>'+badge(s[2])+'<h1 class="page-title">'+esc(s[0])+'</h1></div></div><p class="lead">'+esc(s[1])+'</p>'+
      '<div class="detail-card"><div class="section-head"><div><h2>Governed lifecycle</h2><p>Every consequential transition is explicit.</p></div></div><div class="lifecycle">'+["Need","Intent","Eligibility","Proposal","Authorization","Action","Event","Evidence"].map((x,n)=>'<span><b>'+String(n+1)+'</b>'+x+'</span>').join("")+'</div><button class="btn primary darkbtn" id="createIntent">Create intent</button><p class="micro">Creating an intent does not place an order, charge money, book a provider or authorize execution.</p></div>'+
      '<div class="detail-card"><h3>Service truth</h3><p>Declared capability only. Provider connectivity and external success require independent evidence.</p></div></section>';
  }
  function activity(){
    const items=[...state.intents.map(x=>({...x,type:"INTENT"})),...state.proposals.map(x=>({...x,type:"PROPOSAL"})),...state.actions.map(x=>({...x,type:"ACTION"})),...state.events.map(x=>({...x,type:"EVENT"})),...state.evidence.map(x=>({...x,type:"EVIDENCE"}))].reverse();
    return '<section class="section first"><span class="eyebrow dark">ACTIVITY & EVIDENCE</span><h1 class="page-title">Nothing important disappears.</h1>'+
      '<div class="flow timeline">'+["Intent","Proposal","Authorization","Action","Event","Evidence"].map((x,i)=>'<span><b>'+String(i+1)+'</b>'+x+'</span>').join('<i>→</i>')+'</div>'+
      '<div class="section-head"><div><h2>Participant activity</h2><p>Browser state is local in this web preview. External execution is never simulated as success.</p></div><button class="btn darkbtn" id="lifecycleBtn">Open execution</button></div>'+
      (items.length?items.map(x=>'<div class="timeline-row"><span class="timeline-dot"></span><div><small>'+esc(x.type)+'</small><strong>'+esc(x.title)+'</strong><p>'+esc(x.detail||"")+'</p></div></div>').join(""):'<div class="empty">No activity yet. Create an intent from a service to begin the governed lifecycle.</div>')+
      '<div class="callout compact"><h3>Evidence is the boundary of truth.</h3><p>An external provider must be authoritative before Royal City records a real-world success.</p></div></section>';
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

  function settings(){
    const rows=[
      ["Account","Your single Royal City account and participant boundary."],
      ["Identity","Legal / verified identity and verification state."],
      ["Security & access","Authentication, devices, sessions and authorization controls."],
      ["Privacy & data","Purpose, sharing, retention, deletion and export."],
      ["Notifications","Participant-controlled alerts and activity preferences."],
      ["Voice & intelligence","CONSTANTYNA voice input/output and intelligence preferences."],
      ["Appearance","Interface density, motion and display preferences."],
      ["Communities","Your community relationships and active contexts."],
      ["Services & entitlements","Available capabilities and participation plans."]
    ];
    return '<section class="section first"><span class="eyebrow dark">MY ROYAL CITY</span><h1 class="page-title">One place for your Royal City settings.</h1><p class="lead">Account, identity, access, privacy, intelligence and participation controls belong to one settings surface. A setting changes preference or configuration; it never silently grants authorization.</p><div class="settings-list">'+rows.map(x=>'<button class="settings-row"><span><strong>'+x[0]+'</strong><small>'+x[1]+'</small></span><b>›</b></button>').join('')+'</div><div class="callout compact"><h3>Authority stays separate.</h3><p>Authentication, subscription, relationship and preference settings never become consequential authorization by themselves.</p></div></section>';
  }

  function settings(){
    const groups=[
      ["ACCOUNT","Account","Your single Royal City account, participant boundary and identity state.","Account · Identity"],
      ["ACCESS","Security & access","Authentication, devices, sessions, privacy and authorization controls.","Security · Privacy & data"],
      ["INTELLIGENCE","Voice & intelligence","CONSTANTYNA voice input/output, intelligence preferences and interaction controls.","Voice · Intelligence"],
      ["PARTICIPATION","Communities & services","Your community relationships, active contexts, capabilities and entitlements.","Communities · Services & entitlements"],
      ["EXPERIENCE","Appearance & notifications","Interface density, motion, display and participant-controlled notifications.","Appearance · Notifications"]
    ];
    return '<section class="settings-page section first"><div class="settings-hero"><div><span class="eyebrow dark">MY ROYAL CITY</span><h1 class="page-title">Everything about your Royal City.</h1><p class="lead">One settings workspace for identity, access, privacy, intelligence, participation and experience. Preferences configure your experience; they never create authority.</p></div><span class="workspace-status"><i></i> PERSONAL CONTEXT</span></div><div class="settings-groups">'+groups.map((g,i)=>'<section class="settings-group"><div class="settings-group-head"><span class="settings-index">0'+(i+1)+'</span><div><span class="eyebrow dark">'+g[0]+'</span><h2>'+g[1]+'</h2><p>'+g[2]+'</p></div></div><button class="settings-row"><span><strong>'+g[3]+'</strong><small>Open this unified settings area</small></span><b>›</b></button></section>').join('')+'</div><div class="callout compact"><h3>Authority stays separate.</h3><p>Authentication, subscription, relationship and preference settings never become consequential authorization by themselves.</p></div></section>';
  }

  let menuReturnFocus=null;
  function openMenu(){
    const s=document.getElementById("sheet"); if(!s||!s.hidden)return;
    menuReturnFocus=document.activeElement;
    document.getElementById("menuBtn")?.setAttribute("aria-expanded","true");
    const current=readRoute().view;
    const groups=[
      {label:"YOUR ROYAL CITY",items:[
        ["home","home","Home","Your personal platform overview"],
        ["residential","residential","Royal City Residential","Home, community life and resident services"],
        ["people","people","People & contexts","Participants, relationships and communities"],
        ["community","community","Community space","Open your selected community context"],
        ["services","services","Services","Discover capabilities and service providers"]
      ]},
      {label:"PLATFORM",items:[
        ["intelligence","intelligence","Intelligence","CONSTANTYNA and governed platform intelligence"],
        ["activity","activity","Activity & evidence","Intent, proposals, actions and evidence"],
        ["lifecycle","lifecycle","Execution lifecycle","Follow a request through governed stages"],
        ["foundation","foundation","Platform foundation","Identity, places, organizations and authority"],
        ["security","security","Security & trust","Privacy, access and platform safeguards"],
        ["ecosystem","ecosystem","Explore the ecosystem","See how Royal City works as one platform"]
      ]},
      {label:"PERSONAL",items:[["settings","settings","My Royal City","Account, identity and experience settings"]]}
    ];
    const groupMarkup=groups.map(g=>'<section class="menu-group" aria-label="'+esc(g.label)+'"><h3>'+esc(g.label)+'</h3><div>'+g.items.map(([route,icon,label,detail])=>'<button class="menu-row'+(current===route?' is-current':'')+'" data-menu-route="'+route+'"'+(current===route?' aria-current="page"':'')+'><span class="menu-row-icon">'+platformIcon(icon)+'</span><span class="menu-row-copy"><strong>'+esc(label)+'</strong><small>'+esc(detail)+'</small></span><span class="menu-row-arrow" aria-hidden="true">›</span></button>').join("")+'</div></section>').join("");
    s.hidden=false;
    s.innerHTML='<button class="sheet-backdrop" id="sheetClose" aria-label="Close workspace menu" tabindex="-1"></button><aside class="sheet-panel menu-panel" role="dialog" aria-modal="true" aria-labelledby="menuTitle"><div class="menu-topline"><div class="menu-brand"><img class="menu-brand-emblem" src="royal-city-emblem.svg" alt=""><span class="menu-brand-copy"><strong>Royal City</strong><small>Residential · community · services</small></span></div><span class="menu-edition">ONE CONNECTED ECOSYSTEM</span><button class="close" id="sheetCloseBtn" aria-label="Close menu">×</button></div><div class="menu-intro"><span class="eyebrow dark">ROYAL CITY WORKSPACE</span><h2 id="menuTitle">Go where you need.</h2><p>One account. Every community, home service and shared place in one ecosystem.</p></div><nav class="menu-navigation" aria-label="Workspace navigation">'+groupMarkup+'</nav><div class="menu-footer"><span class="menu-footer-dot"></span><span>One ecosystem · governed by context and evidence</span></div></aside>';
    document.getElementById("sheetClose").onclick=closeMenu;
    document.getElementById("sheetCloseBtn").onclick=closeMenu;
    s.querySelectorAll("[data-menu-route]").forEach(b=>b.onclick=()=>{const route=b.dataset.menuRoute;closeMenu();navigate(route);});
    s.onkeydown=e=>{if(e.key==="Escape"){e.preventDefault();closeMenu();return;}if(e.key==="Tab"){const focusable=[...s.querySelectorAll('button:not([disabled]):not(#sheetClose)')];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
    s.querySelector("[data-menu-route]")?.focus();
  }
  function closeMenu(){const s=document.getElementById("sheet");if(s&&!s.hidden){s.hidden=true;s.innerHTML="";s.onkeydown=null;document.getElementById("menuBtn")?.setAttribute("aria-expanded","false");menuReturnFocus?.focus?.();menuReturnFocus=null;}}

  function bind(route){
    document.querySelectorAll("[data-route]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.route)));
    if(route.view==="people") document.querySelectorAll("[data-context]").forEach(b=>b.onclick=()=>{state.participant.context=b.dataset.context;save();render(route);toast("Context changed locally.");});
    if(route.view==="community") document.querySelectorAll("[data-community]").forEach(b=>b.onclick=()=>{state.selectedCommunity=b.dataset.community;save();navigate("community",{community:state.selectedCommunity});});
    if(route.view==="residential"){
      document.querySelectorAll("[data-residential-community]").forEach(b=>b.onclick=()=>{state.selectedCommunity=b.dataset.residentialCommunity;save();render(route);});
      document.querySelectorAll("[data-residential-scroll]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.residentialScroll)?.scrollIntoView({behavior:"smooth",block:"start"}));
      document.querySelectorAll("[data-residential-request]").forEach(b=>b.onclick=()=>{const name=b.dataset.residentialRequest;const rows=Array.isArray(state.residentialRequests)?state.residentialRequests:[];rows.push({id:"residential-"+Date.now(),service:name,community:state.selectedCommunity||communities[0].name,time:new Intl.DateTimeFormat(undefined,{dateStyle:"medium",timeStyle:"short"}).format(new Date())});state.residentialRequests=rows.slice(-20);save();render(route);toast("Local preview request saved. No team or provider was contacted.");});
    }
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
      if(l.includes("beatpay")) a="BeatPay coordinates authorized payments through regulated external rails. Palm or phone recognition is not payment authorization, and Royal City does not claim a payment succeeded without authoritative provider evidence.";
      else if(l.includes("opportunity")) a="BeatGenzi is Royal City's opportunity-discovery capability. It can structure jobs, services, training, partnerships and other opportunities, but it never guarantees an outcome.";
      else if(l.includes("community")) a="You can participate directly as a person or through community contexts such as TSAVO Royal Suburbs, Mi Vida Garden City and Qwetu Ruaraka. Community relationships do not replace your Royal City identity.";
      else if(l.includes("explain")||l.includes("royal city")||l.includes("zalagren")) a="Royal City is a connected residential ecosystem: People + Places + Needs + Capabilities + Authority + Resources → Outcomes. The core chain is Identity → Account → Participant → Relationship → Context → Capability → Authorization → Intent → Proposal → Action → Event → Evidence.";
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
    if(route.view==="intelligence")content=intelligence();
    else if(route.view==="residential")content=residentialPage();
    else if(route.view==="people")content=people();
    else if(route.view==="ecosystem")content=ecosystemPage();
    else if(route.view==="foundation")content=foundationPage();
    else if(route.view==="security")content=securityPage();
    else if(route.view==="settings")content=settings();
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
  if(!history.state?.royalCity) history.replaceState({royalCity:currentNavState()},"",location.pathname+"?view="+(new URLSearchParams(location.search).get("view")||"home"));
  render(readRoute());
})();

/* Page behaviour: builds the days, door animation, scroll effects. Normally no need to edit. */
(function(){
document.documentElement.classList.add('js');
var WA='https://wa.me/919092343434?text='+encodeURIComponent("Hi PickYourVacay! I'm on the Rya Cosmo Elite Phuket and Full Moon Party trip (22 to 26 Nov). I have a question:");
['topWa','endWa','fab'].forEach(function(id){var a=document.getElementById(id);if(a)a.href=WA});

/* background music: try to start on open; browsers that block sound start it on the first tap, click or key press */
(function(){
  var au=document.getElementById('bgm'),btn=document.getElementById('soundBtn');if(!au||!btn)return;
  var userMuted=false;au.volume=.6;
  function sync(){var on=!au.paused;btn.classList.toggle('playing',on);btn.setAttribute('aria-pressed',String(on));btn.setAttribute('aria-label',on?'Mute music':'Play music')}
  function play(){var p=au.play();if(p&&p.then)p.then(sync,sync);else sync()}
  au.addEventListener('play',sync);au.addEventListener('pause',sync);
  btn.addEventListener('click',function(e){e.stopPropagation();if(au.paused){userMuted=false;play()}else{userMuted=true;au.pause()}});
  /* any movement tries to start the music; keeps trying until the browser allows it */
  var evs=['pointerdown','pointerup','mousedown','click','touchstart','touchend','keydown','wheel','scroll','mousemove','pointermove','touchmove'];
  function stop(){evs.forEach(function(t){removeEventListener(t,first,{capture:true,passive:true})})}
  function first(e){if(e&&e.target&&e.target.closest&&e.target.closest('#soundBtn'))return;
    if(userMuted||!au.paused){stop();return}
    var p=au.play();if(p&&p.then)p.then(function(){sync();stop()},function(){});else{sync();stop()}}
  evs.forEach(function(t){addEventListener(t,first,{capture:true,passive:true})});
  play();
})();


function transitHTML(t,dark){
  var stroke=dark?'#5A6098':'#9DB4D6',done=dark?'#FF8DBE':'#D3236F',txt=dark?'#fff':'#1B1E3A';
  var p=t.path,st=p.match(/M(\d+) (\d+)/),en=p.match(/(\d+) (\d+)$/);
  var midTxt=t.mid?'<circle cx="'+t.mx+'" cy="'+t.my+'" r="5" fill="'+txt+'"/><text x="'+t.mx+'" y="'+(t.my-18)+'" text-anchor="middle">'+t.mid+'</text>':'';
  return '<section class="transit'+(dark?' dark':'')+'" data-transit'+(t.veh2?' data-mid="'+t.mx+'"':'')+' aria-label="'+t.title+'"><div class="wrap"><div class="head"><h3>'+t.title+'</h3><span class="note">'+t.note+'</span></div><div class="transit-svg"><svg viewBox="0 0 900 220" role="img" aria-label="Route '+t.title+'">'+
   '<path class="tp" d="'+p+'" fill="none" stroke="'+stroke+'" stroke-width="2" stroke-dasharray="6 8"/><path class="tp-done" d="'+p+'" fill="none" stroke="'+done+'" stroke-width="3"/>'+
   '<g fill="'+txt+'" font-family="IBM Plex Mono,monospace" font-size="14" letter-spacing="2"><circle cx="'+st[1]+'" cy="'+st[2]+'" r="7"/><text x="'+st[1]+'" y="'+(+st[2]+35)+'" text-anchor="middle">'+t.from+'</text>'+midTxt+'<circle cx="'+en[1]+'" cy="'+en[2]+'" r="7" fill="'+done+'"/><text x="'+en[1]+'" y="'+(+en[2]+35)+'" text-anchor="middle">'+t.to+'</text></g>'+
   '<g class="veh">'+(t.veh||'')+'</g>'+(t.veh2?'<g class="veh2" style="display:none">'+t.veh2+'</g>':'')+'</svg></div></div></section>';
}

var mealNames={L:'Lunch',D:'Dinner'};
var html='';
D.forEach(function(d){
  if(d.transit){html+='</div>'+transitHTML(TRANSIT[d.transit],false).replace('<section','<section data-breakout')+'<div class="days-sub">';return;}
  var acts=d.acts.map(function(a){return '<li class="act'+(a[3]?' secret':'')+'"><button type="button" aria-expanded="false"><span class="when">'+a[0]+'</span><span class="what">'+a[1]+'</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button><div class="more"><div><p>'+a[2]+'</p></div></div></li>'}).join('');
  var meals=['L','D'].map(function(m){return '<span class="meal'+(d.meals.indexOf(m)>-1?' on':'')+'">'+mealNames[m]+'</span>'}).join('');
  html+='<article class="day" id="day'+d.n+'" data-day="'+d.n+'" data-place="'+d.place+'">'+
   '<div class="day-head rv"><div class="day-num"><small>DAY</small>0'+d.n+'</div><div><div class="place">'+d.place+'<span class="date">'+d.date+'</span></div><h2>'+d.t+'</h2></div></div>'+
   '<div class="day-body"><figure class="postcard rv" aria-hidden="true"><img src="'+d.n+'.png" alt="" loading="lazy"><span class="stamp" lang="th">'+d.th+'<small>DAY '+d.n+'</small></span></figure>'+
   '<div><p class="day-lede">'+d.lede+'</p><ul class="acts">'+acts+'</ul><div class="day-foot"><div class="meals" aria-label="Meals included">'+meals+'</div>'+(d.stay?'<div class="stay">Tonight: <b>'+d.stay+'</b></div>':'<div class="stay">Fly home</div>')+'</div></div></div></article>';
});
var days=document.getElementById('days');
days.innerHTML='<div class="days-sub">'+html+'</div>';
(function(){
  var journey=document.getElementById('journey'),inner=journey.querySelector('.journey-inner'),rail=inner.querySelector('.rail');
  var parts=Array.prototype.slice.call(days.children);
  var frag=document.createDocumentFragment(),first=true;
  parts.forEach(function(el){
    if(el.hasAttribute('data-breakout')){frag.appendChild(el);return;}
    if(!el.children.length)return;
    var g=document.createElement('div');g.className='wrap journey-inner';
    var r=document.createElement('div');r.className='rail';r.setAttribute('aria-hidden','true');
    r.innerHTML=first?rail.innerHTML:'<div class="track"></div><div class="done"></div>'+rail.querySelector('.traveller').outerHTML;first=false;
    g.appendChild(r);el.className='days';g.appendChild(el);
    var sec=document.createElement('div');sec.className='journey-seg';sec.style.paddingBlock='clamp(40px,6vw,80px)';sec.appendChild(g);
    frag.appendChild(sec);
  });
  journey.replaceWith(frag);
})();
var plane=document.querySelector('[data-transit] .veh').innerHTML;
document.getElementById('stays').insertAdjacentHTML('beforebegin',transitHTML({title:FLY_HOME.title,note:FLY_HOME.note,from:FLY_HOME.from,mid:FLY_HOME.mid,mx:FLY_HOME.mx,my:FLY_HOME.my,to:FLY_HOME.to,path:FLY_HOME.path,veh:plane},true));
var segs=Array.prototype.slice.call(document.querySelectorAll('.journey-seg'));

document.querySelectorAll('.act button').forEach(function(b){b.addEventListener('click',function(){var li=b.parentNode,o=li.hasAttribute('open');if(o)li.removeAttribute('open');else li.setAttribute('open','');b.setAttribute('aria-expanded',String(!o))})});

document.getElementById('copyBtn').addEventListener('click',function(){var b=this,t='+91 9092343434';function ok(){b.textContent='Copied'}
  function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('phoneTxt'));var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected'}
  try{navigator.clipboard.writeText(t).then(ok,sel)}catch(e){sel()}});

var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight)io.observe(el)})}

var gate=document.querySelector('.gate'),dl=document.getElementById('doorL'),dr=document.getElementById('doorR'),card=document.getElementById('gateCard'),rc=document.getElementById('revealCopy');
var topbar=document.getElementById('topbar'),bar=document.getElementById('bar'),where=document.getElementById('where');
var transits=Array.prototype.slice.call(document.querySelectorAll('[data-transit]')).map(function(sec){
  var p=sec.querySelector('.tp-done'),L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;
  return{sec:sec,p:p,L:L,veh:sec.querySelector('.veh'),veh2:sec.querySelector('.veh2'),mid:+sec.getAttribute('data-mid')||0}});
var dayEls=Array.prototype.slice.call(document.querySelectorAll('.day'));
var walkT,ticking=false;
function clamp(v){return v<0?0:v>1?1:v}
function update(){
  ticking=false;var vh=innerHeight,y=scrollY;
  if(!reduce){var gr=gate.getBoundingClientRect(),gp=clamp(-gr.top/(gr.height-vh));
    var e=1-Math.pow(1-clamp(gp/.75),3);
    dl.style.transform='translateX('+(-e*101)+'%)';dr.style.transform='translateX('+(e*101)+'%)';
    var c=clamp(gp/.3);card.style.opacity=String(1-c);card.style.transform='translate(-50%,-50%) scale('+(1-c*.08)+')';card.style.visibility=c>=1?'hidden':'visible';
    var rv=clamp((gp-.45)/.35);rc.style.opacity=String(rv);rc.style.transform='translateY('+(20-rv*20)+'px)'}
  var h=document.documentElement.scrollHeight-vh;bar.style.width=(clamp(y/h)*100)+'%';
  topbar.classList.toggle('show',y>gate.offsetHeight-80);
  transits.forEach(function(t){var r=t.sec.getBoundingClientRect();var p=clamp((vh*.85-r.top)/(vh*.7));
    t.p.style.strokeDashoffset=t.L*(1-p);var pt=t.p.getPointAtLength(t.L*p),pt2=t.p.getPointAtLength(Math.min(t.L,t.L*p+1)),pt0=t.p.getPointAtLength(Math.max(0,t.L*p-1));
    var a=Math.atan2(pt2.y-pt0.y,pt2.x-pt0.x)*180/Math.PI;
    var useBoat=t.veh2&&pt.x>t.mid;var v=useBoat?t.veh2:t.veh;
    if(t.veh2){t.veh.style.display=useBoat?'none':'';t.veh2.style.display=useBoat?'':'none'}
    v.setAttribute('transform','translate('+pt.x+' '+pt.y+') rotate('+(useBoat?a*.3:a)+')')});
  segs.forEach(function(s){var r=s.getBoundingClientRect(),p=clamp((vh*.42-r.top)/r.height);var d=s.querySelector('.done');if(d)d.style.height=(p*100)+'%'});
  var cur=null;dayEls.forEach(function(d){if(d.getBoundingClientRect().top<vh*.5)cur=d});
  where.innerHTML=cur?'<b>Day 0'+cur.dataset.day+'</b> · '+cur.dataset.place:'The Elite Escape · 4N / 5D';
}
function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update)}
  if(!reduce){document.body.classList.add('walking');clearTimeout(walkT);walkT=setTimeout(function(){document.body.classList.remove('walking')},180)}}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
update();
})();

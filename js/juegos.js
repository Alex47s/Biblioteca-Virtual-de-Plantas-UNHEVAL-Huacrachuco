/* Pestañas, quiz y juego de residuos */
/* Pestañas */
$('#nav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 document.querySelectorAll('#nav button').forEach(x=>x.setAttribute('aria-selected',x===b));
 const sw=()=>{document.querySelectorAll('main>section').forEach(s=>s.hidden=s.id!==b.dataset.tab);scrollTo(0,0)};document.startViewTransition&&!matchMedia('(prefers-reduced-motion:reduce)').matches?document.startViewTransition(sw):sw()});

/* Quiz */
const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
let Q={qs:[],n:0,s:0};
function quiz(){
 const pool=P.filter(p=>p.o);
 Q.qs=shuf(pool).slice(0,6).map((p,k)=>{
  if(k%2){const fams=[...new Set(pool.map(x=>x.f))].filter(f=>f!==p.f);return{t:`¿A qué familia botánica pertenece ${p.n} (${p.c})?`,o:shuf(shuf(fams).slice(0,3).concat(p.f)),a:p.f,p}}
  return{t:`¿Qué planta describe esto? «${p.d}»`,o:shuf(shuf(pool.filter(x=>x!==p)).slice(0,3).map(x=>x.n).concat(p.n)),a:p.n,p}});
 Q.n=0;Q.s=0;qShow();
}
function qShow(){
 const b=$('#quizbox');
 if(Q.n>=Q.qs.length){if(Q.s>=5)boom();b.innerHTML=`<h3>Obtuviste ${Q.s} de ${Q.qs.length}</h3><p>${Q.s>=5?'Excelente: ya conoces bien la flora de la sede.':Q.s>=3?'Buen avance. Repasa las fichas y vuelve a intentarlo.':'Explora las fichas de Plantas y vuelve a intentarlo.'}</p><button class="btn" id="qr">Jugar de nuevo</button>`;$('#qr').onclick=quiz;return}
 const q=Q.qs[Q.n];
 b.innerHTML=`<div class="sc"><span>Pregunta ${Q.n+1} de ${Q.qs.length}</span><span>Aciertos: ${Q.s}</span></div><h3>${q.t}</h3><div class="opts">${q.o.map(o=>`<button class="opt">${o}</button>`).join('')}</div><div class="fb" id="qf"></div>`;
 b.querySelectorAll('.opt').forEach(btn=>btn.onclick=()=>{
  const ok=btn.textContent===q.a;if(ok)Q.s++;
  b.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(x.textContent===q.a)x.classList.add('ok');else if(x===btn)x.classList.add('no')});
  $('#qf').innerHTML=`${ok?'¡Correcto!':'Casi.'} Es ${q.p.n} (<em>${q.p.c}</em>), familia ${q.p.f}. <button class="btn" id="qn" style="margin-left:.5rem">${Q.n+1<Q.qs.length?'Siguiente':'Ver resultado'}</button>`;
  $('#qn').onclick=()=>{Q.n++;qShow()};$('#qn').focus()});
}

/* Residuos */
const BINS={o:'Orgánicos',r:'Reciclables',n:'No aprovechables'};
const WI=[['Cáscara de plátano','🍌','o','Es residuo de alimento: se descompone y puede compostarse.'],['Hojas secas','🍂','o','Restos vegetales de áreas verdes: son orgánicos.'],['Botella de plástico','🧴','r','El plástico limpio y seco se puede reciclar.'],['Hoja de papel','📄','r','El papel limpio se recicla.'],['Caja de cartón','📦','r','El cartón seco es aprovechable.'],['Lata de conserva','🥫','r','El metal se recicla.'],['Frasco de vidrio','🫙','r','El vidrio se puede reciclar.'],['Envoltura de galleta','🍪','n','Los envoltorios plastificados sucios suelen no ser aprovechables.'],['Servilleta usada','🧻','n','El papel sucio o grasoso no se recicla.'],['Tecnopor','🥡','n','Es difícil de reciclar y se maneja como no aprovechable.'],['Resto de fruta','🍎','o','Resto de alimento: orgánico.'],['Papel higiénico usado','🚽','n','Por higiene va con los no aprovechables.']];
let W={o:[],i:0,s:0,t:0,done:false};
function waste(){W={o:shuf(WI),i:0,s:0,t:0,done:false};wShow()}
function wShow(){
 const b=$('#wbox');$('#wsc').textContent=`Aciertos: ${W.s} de ${W.t}`;$('#wst').textContent=`Residuo ${Math.min(W.i+1,W.o.length)} de ${W.o.length}`;
 if(W.i>=W.o.length){if(W.s>=10)boom();b.innerHTML=`<h3>Terminaste: ${W.s} de ${W.o.length}</h3><p>Separar desde donde se genera el residuo es el primer paso de la gestión integral.</p><button class="btn" id="wr">Jugar de nuevo</button>`;$('#wr').onclick=waste;return}
 const it=W.o[W.i];
 b.innerHTML=`<div class="item" aria-hidden="true">${it[1]}</div><h3>${it[0]}</h3><p style="color:var(--mut)">¿En qué tacho lo depositas?</p><div class="bins">${Object.entries(BINS).map(([k,l])=>`<button class="btn" data-b="${k}">${l}</button>`).join('')}</div><div class="fb" id="wf"></div>`;
 b.querySelectorAll('[data-b]').forEach(btn=>btn.onclick=()=>{
  const ok=btn.dataset.b===it[2];W.t++;if(ok)W.s++;
  b.querySelectorAll('[data-b]').forEach(x=>x.disabled=true);
  $('#wf').innerHTML=`<span class="${ok?'r1':'r3'}">${ok?'¡Correcto!':'Va en '+BINS[it[2]]+'.'}</span> ${it[3]} <button class="btn" id="wn" style="margin-left:.5rem">Siguiente</button>`;
  $('#wsc').textContent=`Aciertos: ${W.s} de ${W.t}`;$('#wn').onclick=()=>{W.i++;wShow()};$('#wn').focus()});
}
$('#crit').innerHTML=['Visibilidad y accesibilidad','No obstruir rutas ni salidas','Fácil uso para estudiantes y personal','Señalización comprensible','Mantenimiento y vaciado periódico'].map(c=>`<span class="chip">${c}</span>`).join('');

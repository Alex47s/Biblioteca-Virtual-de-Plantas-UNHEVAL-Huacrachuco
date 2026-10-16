/* Biblioteca: buscar, filtrar, favoritas y fichas */
const $=s=>document.querySelector(s);
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let fav=new Set();try{fav=new Set(JSON.parse(localStorage.getItem('fav')||'[]'))}catch(e){}
const saveFav=()=>{try{localStorage.setItem('fav',JSON.stringify([...fav]))}catch(e){}};
const st={q:'',t:'',u:'',fav:false,sort:'n'};let cur=[],pos=0;
const leaf=i=>`<svg class="lf" viewBox="0 0 40 40" aria-hidden="true"><path d="M7 33C6 17 17 6 34 7c1 17-9 27-27 26z" fill="hsl(${(i*47+90)%360} 42% 42%)"/><path d="M8 32 26 14" stroke="#fff9" stroke-width="2" fill="none"/></svg>`;
const full=P.filter(p=>p.o).length;
$('#stats').textContent=`${P.length} especies registradas en la sede, ${full} con ficha técnica completa y ${P.length-full} pendientes de verificación. Busca, filtra, guarda tus favoritas y abre cada ficha.`;

function bar(){
 const ch=(k,v,l)=>`<button class="chip" data-k="${k}" data-v="${v}" aria-pressed="${st[k]===v}">${l}</button>`;
 const tipos=[...new Set(P.map(p=>p.t))];
 $('#bar').innerHTML=tipos.map(t=>ch('t',t,t)).join('')+'<span class="sep"></span>'+Object.entries(UL).map(([k,l])=>ch('u',k,l)).join('')+'<span class="sep"></span>'+
 `<button class="chip" data-k="fav" aria-pressed="${st.fav}">♥ Favoritas (${fav.size})</button>
 <label>Ordenar <select id="sort"><option value="n"${st.sort=='n'?' selected':''}>Nombre</option><option value="r"${st.sort=='r'?' selected':''}>Mayor precaución</option></select></label><span class="cnt" id="cnt"></span>`;
}
function render(){
 const q=norm(st.q);
 cur=P.map((p,i)=>({p,i})).filter(({p,i})=>(!st.t||p.t===st.t)&&(!st.u||(p.g||'').includes(st.u))&&(!st.fav||fav.has(i))&&(!q||norm([p.n,p.a,p.c,p.f,p.t,p.d,p.u,(p.p||[]).join(' ')].join(' ')).includes(q)));
 cur.sort((a,b)=>st.sort==='r'?(b.p.r-a.p.r)||a.p.n.localeCompare(b.p.n,'es'):a.p.n.localeCompare(b.p.n,'es'));
 $('#grid').innerHTML=cur.length?cur.map(({p,i},k)=>`<article class="card${calm?'':' in'}" style="--d:${Math.min(k,14)*45}ms;view-transition-name:p${i}"><button class="open" data-i="${i}" aria-label="Abrir ficha de ${p.n}">${pic(i)}<h3>${p.n}</h3><em>${p.c}</em><span class="tag">${p.t}</span><span class="tag">${p.f}</span><div class="rk r${p.r}">${RL[p.r]}</div></button><button class="fav" data-f="${i}" aria-pressed="${fav.has(i)}" aria-label="Favorita">${fav.has(i)?'♥':'♡'}</button></article>`).join(''):'<div class="empty">No hay plantas con ese filtro. Prueba otra palabra o quita un filtro.</div>';
 bar();$('#cnt').textContent=`${cur.length} de ${P.length}`;
}
function ficha(i){
 const p=P[i];pos=cur.findIndex(x=>x.i===i);
 const sec=(t,b)=>b?`<h4>${t}</h4><p>${b}</p>`:'';
 $('#dc').innerHTML=`${pic(i,1)}${thumbs(i)}<div class="mh"><div><h2 id="dt">${p.n}</h2><small>${p.a?p.a+' · ':''}<em>${p.c}</em> · ${p.f}</small></div></div>
 <div class="mb">${sec('Descripción botánica',p.d)}${sec('Origen y distribución',p.o)}${sec('Principales componentes fitoquímicos',p.q)}
 ${p.p&&p.p.length?'<h4>Propiedades atribuidas</h4>'+p.p.map(x=>`<span class="tag">${x}</span>`).join(''):''}
 ${sec('Usos tradicionales',p.u)}<h4>Efectos adversos y toxicidad</h4><div class="warn w${p.r}"><strong class="r${p.r}">${RL[p.r]}.</strong> ${p.x||'Sin información registrada aún.'}</div></div>
 <div class="mf"><button class="btn ghost" id="pv" ${pos<1?'disabled':''}>‹ Anterior</button><button class="btn ghost" id="fv">${fav.has(i)?'♥ Quitar de favoritas':'♡ Guardar'}</button><label class="btn ghost" style="cursor:pointer">📷 Mi foto<input id="ph" type="file" accept="image/*" hidden></label>${photo(i)?'<button class="btn ghost" id="rm">Quitar foto</button>':''}<button class="btn ghost" id="cl">Cerrar</button><button class="btn" id="nx" ${pos>=cur.length-1?'disabled':''}>Siguiente ›</button></div>`;
 if(!$('#dlg').open)$('#dlg').showModal();
 $('#cl').onclick=()=>$('#dlg').close();document.querySelectorAll('.th img').forEach(t=>t.onclick=()=>{document.querySelector('.pic.big img').src=t.src});$('#ph').onchange=e=>upload(i,e.target.files[0]);if($('#rm'))$('#rm').onclick=()=>{setPhoto(i,'');ficha(i);refresh()};
 $('#pv').onclick=()=>ficha(cur[pos-1].i);$('#nx').onclick=()=>ficha(cur[pos+1].i);
 $('#fv').onclick=()=>{toggleFav(i);ficha(i)};
}
function toggleFav(i){fav.has(i)?fav.delete(i):fav.add(i);saveFav();refresh()}
$('#grid').addEventListener('click',e=>{const o=e.target.closest('.open'),f=e.target.closest('.fav');if(o)ficha(+o.dataset.i);else if(f)toggleFav(+f.dataset.f)});
$('#bar').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;if(k==='fav')st.fav=!st.fav;else st[k]=st[k]===b.dataset.v?'':b.dataset.v;render()});
$('#bar').addEventListener('change',e=>{if(e.target.id==='sort'){st.sort=e.target.value;render()}});
$('#q').addEventListener('input',e=>{st.q=e.target.value;render()});
$('#dlg').addEventListener('click',e=>{if(e.target===$('#dlg'))$('#dlg').close()});

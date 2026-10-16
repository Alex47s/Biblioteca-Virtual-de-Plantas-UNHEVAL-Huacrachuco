/* Decoración y animaciones */
/* Decoración y animaciones */
(()=>{const rn=(a,b)=>a+Math.random()*(b-a);
for(let k=0;k<16;k++){const e=document.createElement('i');e.style.cssText=`left:${rn(0,100)}%;--s:${rn(14,30)}px;--t:${rn(14,28)}s;--dl:-${rn(0,28)}s;--x:${rn(-60,60)}px;background:${['#8FAE3F','#B5C446','#D2A82B','#6E8B24','#E0B84A'][k%5]}`;$('#bg').appendChild(e)}
for(let k=0;k<70;k++){const e=document.createElement('i');e.style.cssText=`left:${k*1.45}%;height:${rn(18,52)}px;--dl:-${rn(0,4)}s;background:hsl(${rn(70,105)} 50% ${rn(28,42)}%)`;$('#gr').appendChild(e)}
$('#tk').innerHTML=[...P,...P].map((p,k)=>`<button data-i="${k%P.length}">${p.n} <em>${p.c.split(' ').slice(0,2).join(' ')}</em></button>`).join('');
$('#tk').onclick=e=>{const b=e.target.closest('button');if(b)ficha(+b.dataset.i)};
const kp=[[P.length,'especies'],[P.filter(p=>p.o).length,'fichas completas'],[new Set(P.map(p=>p.t)).size,'tipos de planta'],[P.reduce((a,p)=>a+(p.p?p.p.length:0),0),'propiedades registradas']];
$('#kp').innerHTML=kp.map(k=>`<div><b data-n="${k[0]}">0</b><span>${k[1]}</span></div>`).join('');
document.querySelectorAll('#kp b').forEach(b=>{const n=+b.dataset.n,t0=performance.now(),f=t=>{const p=Math.min(1,(t-t0)/1400);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
window.boom=()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;for(let k=0;k<44;k++){const e=document.createElement('i');e.className='cf';e.style.cssText=`left:${rn(10,90)}%;--x:${rn(-120,120)}px;--r:${rn(-540,540)}deg;background:${['#D2A82B','#8FAE3F','#55762A','#E0733A','#F2D16B'][k%5]};animation-delay:${rn(0,.4)}s`;document.body.appendChild(e);setTimeout(()=>e.remove(),2800)}};
$('#grid').addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const c=e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');c.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*10+'deg')});
$('#grid').addEventListener('pointerout',e=>{const c=e.target.closest('.card');if(c){c.style.removeProperty('--rx');c.style.removeProperty('--ry')}});
})();

/* Títulos animados, transiciones suaves, menú con píldora y barra de progreso */
(()=>{
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* Letras de los títulos: cada letra cae y salta al pasar el mouse */
function split(el){let k=0;const t=el.textContent;
 const walk=n=>[...n.childNodes].forEach(c=>{
  if(c.nodeType===3){const f=document.createDocumentFragment();
   c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(!w.trim()){f.append(' ');return}
    const s=document.createElement('span');s.className='w';s.setAttribute('aria-hidden','true');
    [...w].forEach(x=>{const i=document.createElement('span');i.className='ch';i.textContent=x;i.style.setProperty('--k',k++);s.append(i)});f.append(s)});
   c.replaceWith(f)}
  else if(c.nodeType===1&&c.tagName.toLowerCase()!=='svg')walk(c)});
 walk(el);el.setAttribute('aria-label',t.trim());el.classList.add('go')}
document.querySelectorAll('.hero h1,.panel h2').forEach(split);
/* Filtrar y buscar con transición (las tarjetas se deslizan a su nuevo lugar) */
let vtOn=false;setTimeout(()=>vtOn=true,900);
const _render=render;
render=function(){const p=$('#plantas');
 if(!vtOn||RM||calm||!document.startViewTransition||p.hidden)return _render();
 document.startViewTransition(()=>{calm=true;_render();calm=false})};
/* Menú con píldora que se desliza */
const nav=$('#nav'),pill=document.createElement('span');pill.className='pill';nav.prepend(pill);
const mv=()=>{const b=nav.querySelector('[aria-selected=true]');if(!b)return;
 pill.style.left=b.offsetLeft+'px';pill.style.top=b.offsetTop+'px';pill.style.width=b.offsetWidth+'px';pill.style.height=b.offsetHeight+'px'};
nav.addEventListener('click',mv);addEventListener('resize',mv);document.fonts&&document.fonts.ready.then(mv);mv();
/* Barra de progreso y encabezado que se achica */
const sp=document.createElement('div');sp.className='sp';document.body.append(sp);const hd=document.querySelector('header.top');
const sc=()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;sp.style.width=(m>0?scrollY/m*100:0)+'%';hd.classList.toggle('sm',scrollY>40)};
addEventListener('scroll',sc,{passive:true});sc();
/* Elementos que aparecen al hacer scroll (sección Proyecto) */
if(!RM&&'IntersectionObserver'in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}}),{threshold:.1});
 document.querySelectorAll('#proyecto>:not(h2),#proyecto .ind div,#proyecto .two>div').forEach((e,k)=>{e.classList.add('rv');e.style.setProperty('--n',k%5);io.observe(e)})}
})();

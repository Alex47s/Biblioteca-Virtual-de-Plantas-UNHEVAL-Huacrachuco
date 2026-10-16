/* Cronograma e indicadores del proyecto */
/* Cronograma */
const G=[['Planteamiento del problema',0,2],['Coordinación y planificación',2,1],['Diagnóstico ambiental',3,1],['Diseño de fichas e instrumentos',4,1],['Reconocimiento de plantas',5,1],['Clasificación y verificación',6,1],['Adquisición o preparación de tachos',7,1],['Instalación y señalización',8,1],['Campaña de sensibilización',9,1],['Evaluación de resultados',10,1],['Informe y presentación',11,1]];
const d=new Date();let now=-1;if(d.getFullYear()===2026&&d.getMonth()>=8&&d.getMonth()<=10)now=(d.getMonth()-8)*4+Math.min(3,Math.floor((d.getDate()-1)/7));
const MS=['Setiembre','Octubre','Noviembre'];
let gh='<table><thead><tr><th rowspan="2">Actividad</th>'+MS.map(m=>`<th colspan="4">${m}</th>`).join('')+'</tr><tr>'+[...Array(12)].map((_,i)=>`<th>${i%4+1}</th>`).join('')+'</tr></thead><tbody>';
G.forEach(([n,s,l])=>{const cur=now>=s&&now<s+l;gh+=`<tr${cur?' class="cur"':''}><td class="a">${n}</td>`+[...Array(12)].map((_,i)=>`<td class="${i>=s&&i<s+l?'on':''}${i===now?' now':''}"${i>=s&&i<s+l?` title="${n}"`:''}></td>`).join('')+'</tr>'});
$('#gantt').innerHTML=gh+'</tbody></table>';
const act=G.filter(([n,s,l])=>now>=s&&now<s+l).map(g=>g[0]);
$('#gnow').textContent=now<0?'La ejecución está prevista entre setiembre y noviembre de 2026.':`Hoy estamos en ${MS[Math.floor(now/4)].toLowerCase()}, semana ${now%4+1}: ${act.join(' y ')}.`;
$('#ind').innerHTML=[['Tachos instalados o reubicados','Cuantitativo · conteo final'],['Áreas intervenidas','Cuantitativo · número y porcentaje'],['Especies registradas','Cuantitativo · fichas completas'],['Estudiantes sensibilizados','Cuantitativo · registro de participantes'],['Residuos fuera de los puntos','Cuantitativo · antes y después'],['Percepción de limpieza','Cualitativo · encuesta breve'],['Conocimiento de plantas','Cualitativo · encuesta o entrevista'],['Compromiso ambiental','Cualitativo · observación y encuesta']].map(([a,b])=>`<div><strong>${a}</strong><br><span style="color:var(--mut)">${b}</span></div>`).join('');

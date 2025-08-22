// Basic interactivity
document.body.classList.remove('no-js');
const themeToggle=document.getElementById('themeToggle');
const nav=document.getElementById('mainNav');const navToggle=document.getElementById('navToggle');
themeToggle?.addEventListener('click',()=>document.documentElement.classList.toggle('dark'));
navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('show');navToggle.setAttribute('aria-expanded',String(open));});
document.getElementById('year')?.appendChild(document.createTextNode(new Date().getFullYear().toString()));
document.getElementById('habitCheck')?.addEventListener('click',()=>{const values=[...document.querySelectorAll('input[name="hb"]')].map(el=>el.checked?1:0);const score=values.reduce((a,b)=>a+b,0);document.getElementById('habitScore').textContent=`Skor: ${score}/4`;});

// Quiz
const quiz=[
  {q:'Kulit pisang termasuk…',choices:['Anorganik','Organik','B3'],a:1,explain:'Kulit pisang adalah sampah organik yang bisa dikomposkan.'},
  {q:'Botol plastik basah sebaiknya…',choices:['Campur residu','Cuci & keringkan, lalu pilah','Bakar saja'],a:1,explain:'Bersih-kering memudahkan daur ulang.'},
  {q:'Baterai bekas termasuk…',choices:['Organik','Anorganik','B3'],a:2,explain:'B3: simpan terpisah; serahkan ke dropbox/gerai khusus.'}
];
const qWrap=document.getElementById('quizContainer');const checkBtn=document.getElementById('checkBtn');const scoreText=document.getElementById('scoreText');const answers=new Map();
function renderQuiz(){if(!qWrap)return; qWrap.innerHTML='';quiz.forEach((item,idx)=>{const qEl=document.createElement('div');qEl.className='q';qEl.innerHTML='<p><strong>'+(idx+1)+'.</strong> '+item.q+'</p>';const choicesEl=document.createElement('div');choicesEl.className='choices';item.choices.forEach((c,cIdx)=>{const btn=document.createElement('button');btn.type='button';btn.className='choice';btn.textContent=c;btn.addEventListener('click',()=>{answers.set(idx,cIdx);[...choicesEl.children].forEach(ch=>ch.classList.remove('active'));btn.classList.add('active');});choicesEl.appendChild(btn);});qEl.appendChild(choicesEl);qWrap.appendChild(qEl);});}
renderQuiz();
checkBtn?.addEventListener('click',()=>{let score=0;const qEls=qWrap.querySelectorAll('.q');qEls.forEach((qEl,idx)=>{const correctIdx=quiz[idx].a;const ans=answers.get(idx);const explain=quiz[idx].explain;const oldFb=qEl.querySelector('.feedback');if(oldFb)oldFb.remove();const fb=document.createElement('p');fb.className='feedback';if(ans===correctIdx){score++;fb.classList.add('correct');fb.textContent='Benar! '+explain;}else{fb.classList.add('incorrect');fb.textContent='Kurang tepat. '+explain;}qEl.appendChild(fb);});scoreText.textContent='Skor: '+score+'/'+quiz.length;});

// Contact demo
const form=document.getElementById('contactForm');const formMsg=document.getElementById('formMsg');
form?.addEventListener('submit',e=>{e.preventDefault();formMsg.textContent='Terima kasih! Pesanmu sudah tercatat (demo).';form.reset();});

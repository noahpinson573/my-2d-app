window.Games = {};
const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const controls = document.getElementById("controls");

const keys = {};
let game, raf;
const isTouch = "ontouchstart" in window;

window.addEventListener("keydown",e=>{
  if(e.key.startsWith("Arrow")) e.preventDefault();
  keys[e.key]=true;
  if(e.key==="Escape") exitGame();
});
window.addEventListener("keyup",e=>keys[e.key]=false);

document.querySelectorAll(".ctrl").forEach(b=>{
  ["touchstart","touchend","touchcancel"].forEach(ev=>{
    b.addEventListener(ev,e=>{
      e.preventDefault();
      keys[b.dataset.k]=ev==="touchstart";
    },{passive:false});
  });
});

function resize(){
  const dpr=window.devicePixelRatio||1;
  canvas.width=innerWidth*dpr;
  canvas.height=innerHeight*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize",resize);
resize();

function startGame(id){
  game=Games[id];
  if(!game) return;
  overlay.style.display="block";
  if(isTouch) controls.style.display="flex";
  game.init();
  raf=requestAnimationFrame(loop);
}

function exitGame(){
  overlay.style.display="none";
  controls.style.display="none";
  game=null;
  cancelAnimationFrame(raf);
}

function loop(){
  if(!game) return;
  ctx.fillStyle="#050608";
  ctx.fillRect(0,0,innerWidth,innerHeight);
  game.update();
  game.draw();
  raf=requestAnimationFrame(loop);
}

[
  {id:"platformer",name:"Platformer"},
  {id:"snake",name:"Snake"},
  {id:"tetris",name:"Tetris"},
  {id:"pong",name:"Pong"},
  {id:"breakout",name:"Breakout"}
].forEach(g=>{
  const c=document.createElement("div");
  c.className="card";
  c.innerHTML=`<h3>${g.name}</h3><button class="play">PLAY</button>`;
  c.querySelector("button").onclick=()=>startGame(g.id);
  grid.appendChild(c);
});

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js");
}


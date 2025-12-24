window.Games = window.Games || {};

const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const controls = document.getElementById("controls");

const keys = {};
let game = null;
let raf = null;
const isTouch = "ontouchstart" in window;

// INPUT
window.addEventListener("keydown", e => {
  if(e.key.startsWith("Arrow")) e.preventDefault();
  keys[e.key] = true;
  if(e.key === "Escape") exitGame();
});
window.addEventListener("keyup", e => keys[e.key] = false);

// TOUCH
document.querySelectorAll(".ctrl").forEach(btn => {
  ["touchstart","touchend","touchcancel"].forEach(ev => {
    btn.addEventListener(ev, e => {
      e.preventDefault();
      keys[btn.dataset.k] = ev === "touchstart";
    }, { passive:false });
  });
});

// RESIZE
function resize(){
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resize);
resize();

// GAME LOOP
function startGame(id){
  game = Games[id];
  if(!game){
    alert("Game not found: " + id);
    return;
  }
  overlay.style.display = "block";
  if(isTouch) controls.style.display = "flex";
  game.init();
  raf = requestAnimationFrame(loop);
}

function exitGame(){
  overlay.style.display = "none";
  controls.style.display = "none";
  game = null;
  cancelAnimationFrame(raf);
}

function loop(){
  if(!game) return;
  ctx.fillStyle = "#050608";
  ctx.fillRect(0,0,innerWidth,innerHeight);
  game.update();
  game.draw();
  raf = requestAnimationFrame(loop);
}

// ===== HUB CARDS (THIS IS THE KEY PART) =====
const GAME_LIST = [
  { id:"platformer", name:"Platformer" },
  { id:"snake",      name:"Snake" },
  { id:"tetris",     name:"Tetris" },
  { id:"pong",       name:"Pong" },
  { id:"breakout",   name:"Breakout" }
];

grid.innerHTML = ""; // SAFE: runs once

GAME_LIST.forEach(g => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${g.name}</h3>
    <button class="play">PLAY</button>
  `;
  card.querySelector("button").onclick = () => startGame(g.id);
  grid.appendChild(card);
});

console.log("HUB GAMES:", GAME_LIST.map(g=>g.id));
console.log("LOADED GAMES:", Object.keys(Games));

// SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}

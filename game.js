// --- SNAKE GAME ---
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{x: 60, y: 60}];
let dir = {x: 10, y: 0};
let food = {x: 30, y: 30};
let points = 0;
let playing = false;

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(p => ctx.fillRect(p.x, p.y, 10, 10));
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function moveSnake() {
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    points++;
    document.getElementById("points").textContent = points;
    food.x = Math.floor(Math.random() * 12) * 10;
    food.y = Math.floor(Math.random() * 12) * 10;
  } else {
    snake.pop();
  }
}

function gameLoop() {
  if (!playing) return;

  ctx.clearRect(0, 0, 120, 120);
  moveSnake();
  drawSnake();
  drawFood();
  requestAnimationFrame(gameLoop);
}

document.getElementById("btn-play").onclick = () => {
  playing = true;
  document.getElementById("game").style.display = "block";
  document.getElementById("pet-mode").style.display = "none";
  gameLoop();
};

document.getElementById("btn-pause").onclick = () => playing = false;


// --- POPUP ---
document.getElementById("btn-about").onclick = () => {
  document.getElementById("popup").style.display = "block";
};

document.getElementById("closePopup").onclick = () => {
  document.getElementById("popup").style.display = "none";
};


// --- ALIEN TAMAGOTCHI MODE ---
const petMode = document.getElementById("pet-mode");
const alien = document.getElementById("alien");

let hunger = 100;
let energy = 100;
let fun = 100;

function updateStats() {
  document.getElementById("hunger").textContent = hunger;
  document.getElementById("energy").textContent = energy;
  document.getElementById("fun").textContent = fun;
}

function decayStats() {
  hunger -= 1;
  energy -= 0.5;
  fun -= 0.7;

  if (hunger < 0) hunger = 0;
  if (energy < 0) energy = 0;
  if (fun < 0) fun = 0;

  updateStats();
}

setInterval(decayStats, 1500);

// Acciones del Alien (básicas)
alien.onclick = () => {
  fun += 10;
  if (fun > 100) fun = 100;
  updateStats();
};

document.getElementById("btn-pet").onclick = () => {
  playing = false;
  document.getElementById("game").style.display = "none";
  petMode.style.display = "flex";
};

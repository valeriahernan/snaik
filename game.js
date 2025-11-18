const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let size = 12;
let snake = [{ x: 6, y: 6 }];
let dir = { x: 1, y: 0 };
let nextDir = { x: 1, y: 0 };
let food = randomFood();
let score = 0;

let paused = true;

// ===== POPUP =====
const popup = document.getElementById("popup");
document.getElementById("btn-about").onclick = () => {
  popup.style.display = "flex";
};
document.getElementById("closePopup").onclick = () => {
  popup.style.display = "none";
};

// ===== BOTONES =====
document.getElementById("btn-play").onclick = () => paused = false;
document.getElementById("btn-pause").onclick = () => paused = true;

function randomFood() {
  return {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
  };
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let c = canvas.width / size;

  // comida
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--food");
  ctx.fillRect(food.x * c, food.y * c, c - 1, c - 1);

  // snake
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--snake");
  snake.forEach((p) => ctx.fillRect(p.x * c, p.y * c, c - 1, c - 1));
}

let last = 0;
let speed = 4;

function loop(t) {
  requestAnimationFrame(loop);

  if (paused) return;

  if (t - last < 1000 / speed) return;
  last = t;

  dir = nextDir;
  let head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  if (head.x < 0) head.x = size - 1;
  if (head.x >= size) head.x = 0;
  if (head.y < 0) head.y = size - 1;
  if (head.y >= size) head.y = 0;

  if (snake.some((p) => p.x === head.x && p.y === head.y)) return restart();

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("points").textContent = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
}

requestAnimationFrame(loop);

// ===== RESTART =====
function restart() {
  snake = [{ x: 6, y: 6 }];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  food = randomFood();
  score = 0;
  document.getElementById("points").textContent = 0;
}

// ===== CONTROLES =====
function setDir(dx, dy) {
  if (dx !== -dir.x || dy !== -dir.y) nextDir = { x: dx, y: dy };
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") setDir(0, -1);
  if (e.key === "ArrowDown") setDir(0, 1);
  if (e.key === "ArrowLeft") setDir(-1, 0);
  if (e.key === "ArrowRight") setDir(1, 0);
});

// --- Snake Game (Pixel Art / Game Boy Style) ---

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake;
let food;
let score = 0;
let direction = "RIGHT";

// --- Snake Constructor ---
function Snake() {
  this.x = scale * 5;
  this.y = scale * 5;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.tail = [];

  this.draw = function () {
    ctx.fillStyle = "#0F380F"; 
    this.tail.forEach(part => {
      ctx.fillRect(part.x, part.y, scale, scale);
    });
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i] = { ...this.tail[i - 1] };
    }
    if (this.tail.length) {
      this.tail[0] = { x: this.x, y: this.y };
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Wall wrapping (Game Boy style)
    if (this.x >= canvas.width) this.x = 0;
    if (this.y >= canvas.height) this.y = 0;
    if (this.x < 0) this.x = canvas.width - scale;
    if (this.y < 0) this.y = canvas.height - scale;
  };

  this.changeDirection = function (dir) {
    switch (dir) {
      case "UP":
        if (this.ySpeed === 0) { this.xSpeed = 0; this.ySpeed = -scale; }
        break;
      case "DOWN":
        if (this.ySpeed === 0) { this.xSpeed = 0; this.ySpeed = scale; }
        break;
      case "LEFT":
        if (this.xSpeed === 0) { this.xSpeed = -scale; this.ySpeed = 0; }
        break;
      case "RIGHT":
        if (this.xSpeed === 0) { this.xSpeed = scale; this.ySpeed = 0; }
        break;
    }
  };

  this.eat = function (food) {
    if (this.x === food.x && this.y === food.y) {
      this.tail.push({ x: this.x, y: this.y });
      score++;
      document.querySelector(".score-value").innerText = score;
      return true;
    }
    return false;
  };
}

// --- Food Object ---
function Food() {
  this.x = Math.floor(Math.random() * cols) * scale;
  this.y = Math.floor(Math.random() * rows) * scale;

  this.draw = function () {
    ctx.fillStyle = "#306230";
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.pickLocation = function () {
    this.x = Math.floor(Math.random() * cols) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
  };
}

// --- Game Loop ---
function setup() {
  snake = new Snake();
  food = new Food();

  window.setInterval(() => {
    ctx.fillStyle = "#9BBC0F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    food.draw();
    snake.update();
    snake.draw();

    if (snake.eat(food)) {
      food.pickLocation();
    }
  }, 120);
}

// --- Controls (Arrow Keys & WASD) ---
window.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  if (key === "w" || e.key === "ArrowUp") direction = "UP";
  if (key === "s" || e.key === "ArrowDown") direction = "DOWN";
  if (key === "a" || e.key === "ArrowLeft") direction = "LEFT";
  if (key === "d" || e.key === "ArrowRight") direction = "RIGHT";
  snake.changeDirection(direction);
});

setup();
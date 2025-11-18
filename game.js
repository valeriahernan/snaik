// game.js
// Snake-style mini game centered, Tamagotchi style

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tileSize = 20;
let snake = [{ x: 7, y: 7 }];
let direction = { x: 1, y: 0 };
let food = generateFood();
let gameInterval;
let running = false;

// Start game
function startGame() {
  if (!running) {
    running = true;
    gameInterval = setInterval(update, 200);
  }
}

// Pause
function pauseGame() {
  running = false;
  clearInterval(gameInterval);
}

// Update game state
function update() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Wall collision
  if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize) {
    pauseGame();
    alert("Game Over!");
    resetGame();
    return;
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }

  draw();
}

// Draw game
function draw() {
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#4caf50";
  snake.forEach((part) => {
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  });

  // Draw food
  ctx.fillStyle = "#e53935";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Generate food on random tile
function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / tileSize)),
    y: Math.floor(Math.random() * (canvas.height / tileSize))
  };
}

// Controls (optional: arrow keys)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction.y !== 1) direction = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && direction.y !== -1) direction = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && direction.x !== 1) direction = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && direction.x !== -1) direction = { x: 1, y: 0 };
});

// Reset game
function resetGame() {
  snake = [{ x: 7, y: 7 }];
  direction = { x: 1, y: 0 };
  food = generateFood();
  draw();
}

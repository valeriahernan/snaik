// ===========================
//  CONFIG
// ===========================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // tamaño del cuadrito

let snake = [
    { x: 10 * box, y: 10 * box }
];

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let dx = 0;
let dy = 0;

// ===========================
//  CONTROLES (WASD + FLECHAS)
// ===========================
document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    if (key === "w" || e.key === "ArrowUp") {
        if (dy === 0) { dx = 0; dy = -1; }
    }
    if (key === "s" || e.key === "ArrowDown") {
        if (dy === 0) { dx = 0; dy = 1; }
    }
    if (key === "a" || e.key === "ArrowLeft") {
        if (dx === 0) { dx = -1; dy = 0; }
    }
    if (key === "d" || e.key === "ArrowRight") {
        if (dx === 0) { dx = 1; dy = 0; }
    }
});

// ===========================
//  LOOP DEL JUEGO
// ===========================
function gameLoop() {

    // cabeza nueva
    let head = {
        x: snake[0].x + dx * box,
        y: snake[0].y + dy * box
    };

    // colisiones pared
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) {
        return gameOver();
    }

    // colisión con sí misma
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return gameOver();
        }
    }

    // mover snake
    snake.unshift(head);

    // comer comida
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    draw();
}

// ===========================
//  DIBUJAR
// ===========================
function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // dibujar snake
    ctx.fillStyle = "#0f0";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, box, box);
    });

    // dibujar comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// ===========================
//  GAME OVER
// ===========================
function gameOver() {
    clearInterval(loop);
    alert("GAME OVER 😭");
}

// ===========================
// START
// ===========================
let loop = setInterval(gameLoop, 100);

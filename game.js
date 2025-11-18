// ===========================
//  CONFIG
// ===========================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 10;

let snake = [{ x: 6 * box, y: 6 * box }];

let food = {
    x: Math.floor(Math.random() * 12) * box,
    y: Math.floor(Math.random() * 12) * box
};

let dx = 0;
let dy = 0;

let points = 0;
let loop = null;
let paused = false;

// ===========================
//  CONTROLES (WASD + FLECHAS)
// ===========================
document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    if ((key === "w" || e.key === "ArrowUp") && dy === 0) {
        dx = 0; dy = -1;
    }
    if ((key === "s" || e.key === "ArrowDown") && dy === 0) {
        dx = 0; dy = 1;
    }
    if ((key === "a" || e.key === "ArrowLeft") && dx === 0) {
        dx = -1; dy = 0;
    }
    if ((key === "d" || e.key === "ArrowRight") && dx === 0) {
        dx = 1; dy = 0;
    }
});

// ===========================
//  LOOP DEL JUEGO
// ===========================
function gameLoop() {
    if (paused) return;

    let head = {
        x: snake[0].x + dx * box,
        y: snake[0].y + dy * box
    };

    // bordes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return gameOver();
    }

    // colisión con sí misma
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return gameOver();
        }
    }

    snake.unshift(head);

    // comer
    if (head.x === food.x && head.y === food.y) {
        points++;
        document.getElementById("points").textContent = points;

        food = {
            x: Math.floor(Math.random() * 12) * box,
            y: Math.floor(Math.random() * 12) * box
        };
    } else {
        snake.pop();
    }

    draw();
}

// ===========================
//  DIBUJAR
// =====================

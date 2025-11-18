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
// =====================
//  MODO MASCOTA VIRTUAL
// =====================

let petMode = false;

const pet = {
    hunger: 80,
    energy: 80,
    happiness: 80,
    dirt: 10,
    x: 40,
    y: 40,
    blink: false
};

function drawPet() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // cuerpo
    ctx.fillStyle = "#ffda77";
    ctx.fillRect(pet.x, pet.y, 40, 40);

    // ojos
    ctx.fillStyle = pet.blink ? "#ffda77" : "#000";
    ctx.fillRect(pet.x + 10, pet.y + 10, 5, 5);
    ctx.fillRect(pet.x + 25, pet.y + 10, 5, 5);

    // boca
    ctx.fillRect(pet.x + 15, pet.y + 25, 10, 3);

    drawPetStats();
}

function drawPetStats() {
    ctx.fillStyle = "#fff";
    ctx.font = "8px Arial";
    ctx.fillText("Hambre: " + pet.hunger, 5, 10);
    ctx.fillText("Energía: " + pet.energy, 5, 20);
    ctx.fillText("Feliz: " + pet.happiness, 5, 30);
    ctx.fillText("Suciedad: " + pet.dirt, 5, 40);
}

function petLoop() {
    if (!petMode) return;

    // parpadeo
    pet.blink = Math.random() < 0.1;

    drawPet();
}

// degradación de estados cada 5s
setInterval(() => {
    if (!petMode) return;

    pet.hunger -= 2;
    pet.energy -= 1;
    pet.happiness -= 1;
    pet.dirt += 2;

    if (pet.hunger <= 0 || pet.energy <= 0 || pet.happiness <= 0) {
        alert("Tu mascota se fue al cielo 🪽");
        resetPet();
    }

}, 5000);

function resetPet() {
    pet.hunger = 80;
    pet.energy = 80;
    pet.happiness = 80;
    pet.dirt = 10;
    drawPet();
}

/* BOTONES */
document.getElementById("btn-pet").addEventListener("click", () => {
    petMode = true;
    paused = true; // pausa snake
    drawPet();
    clearInterval(loop);
});

document.getElementById("btn-feed").addEventListener("click", () => {
    if (!petMode) return;
    pet.hunger = Math.min(100, pet.hunger + 20);
});

document.getElementById("btn-playpet").addEventListener("click", () => {
    if (!petMode) return;
    pet.happiness = Math.min(100, pet.happiness + 20);
});

document.getElementById("btn-clean").addEventListener("click", () => {
    if (!petMode) return;
    pet.dirt = 0;
});

document.getElementById("btn-sleep").addEventListener("click", () => {
    if (!petMode) return;
    pet.energy = Math.min(100, pet.energy + 40);
});

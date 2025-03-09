const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startGame");
const scoreDisplay = document.getElementById("score");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameRunning = false;

class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.color = "red";
        this.velY = 0;
        this.gravity = 0.5;
        this.jumpPower = -10;
    }

    update() {
        if (!gameRunning) return;
        this.velY += this.gravity;
        this.y += this.velY;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velY = 0;
        }
    }

    jump() {
        if (this.y + this.height >= canvas.height) {
            this.velY = this.jumpPower;
            score++; // Increase score when jumping
            scoreDisplay.textContent = "Score: " + score;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    requestAnimationFrame(gameLoop);
}

// Start button functionality
startButton.addEventListener("click", () => {
    gameRunning = true;
    startButton.style.display = "none"; // Hide the start button
    gameLoop();
});

// Jump control
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") player.jump();
});

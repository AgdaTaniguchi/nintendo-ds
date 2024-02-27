const canvas = document.getElementById("canvas-bottom");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let frame = 0;
let angle = 0;
let spacePressed = false;
let score = 0;
let gameSpeed = 2;

// Kiara
class Kiara {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.weight = 1;
    }

    update() {
        let curve = Math.sin(angle) * 10;
        if(this.y > canvas.height - (this.height * 2) + curve) {
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if(this.y < this.height) {
            this.y = this.height;
            this.vy = 0;
        }
        if(spacePressed && this.y > (this.height * 2)) this.flap();
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flap() {
        this.vy -= 2;
    }
}
const kiara = new Kiara();

window.addEventListener('keydown', function(event) {
    if(event.code == "Space") spacePressed = true;
});

window.addEventListener('keyup', function(event) {
    if(event.code == "Space") spacePressed = false;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    kiara.update();
    kiara.draw();
    requestAnimationFrame(animate);
    angle += 0.12;
}

animate();

window.addEventListener('resize', function() {
    canvasPosition = canvas.getBoundingClientRect();
});

// document.addEventListener('keypress', (e) => {
//     handleEventKey(e.key);
// });

// window.addEventListener('message', (e) => {
//     handleEventKey(e.data);
// });
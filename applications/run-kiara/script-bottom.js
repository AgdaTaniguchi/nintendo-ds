const canvas = document.getElementById("canvas-bottom");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let frame = 0;

class Kiara {
    constructor() {
        this.x = 30;
        this.y = canvas.height - 45;
        this.width = 60;
        this.height = 30;
        this.speed = 0.6;
        this.jumpHeight = 30;
        this.lifes = 3;
    }

    update() {
        this.x += this.speed;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('keydown', function(event) {
    console.log(event.key)
    if(event.key == "w") {
        const a = 2;
        const b = 3;
        const c = 4;
        kiara.y -= a * kiara.x;
    }
});

const kiara = new Kiara();

function handleKiara() {
    kiara.update();
    kiara.draw();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleKiara();
    frame++;
    requestAnimationFrame(animate);
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
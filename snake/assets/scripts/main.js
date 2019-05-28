
// Canvas
const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

let width = canvas.width,
    height = canvas.height;

// Create cells
let blockSize = 10,
    widthInBlocks = width / blockSize,
    heightInBlocks = height / blockSize;

let score = 0;

function drawBorder() {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

function drawScore() {
    ctx.font = '18px Comic Sans MS';
    ctx.fillStyle = 'Gray';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, blockSize, blockSize);
}

function gameOver() {
    // clearInterval(intervalId);
    ctx.font = '50px Comic Sans MS';
    ctx.fillStyle = 'Gray';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game over!', width / 2, height / 2);
}

drawBorder();
drawScore();
gameOver();

setInterval(function() {
    score++;
    ctx.clearRect(0, 0, width, height);
    drawBorder();
    drawScore();
}, 100)
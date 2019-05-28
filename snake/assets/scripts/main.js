
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

// drawBorder();
// drawScore();
// gameOver();

// setInterval(function() {
//     score++;
//     ctx.clearRect(0, 0, width, height);
//     drawBorder();
//     drawScore();
// }, 100)



function circle(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    fillCircle ? ctx.fill() : ctx.stroke();
}


class Block {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    drawSquare(color) {
        let x = this.col * blockSize,
            y = this.row * blockSize;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    drawCircle(color) {
        let centerX = this.col * blockSize + blockSize / 2,
            centerY = this.row * blockSize + blockSize / 2;
        
        ctx.fillStyle = color;
        circle(centerX, centerY, blockSize / 2, true);
    }

    equal(otherBlock) {
        return this.col === otherBlock.col && this.row === otherBlock.row;
    }
}


let block = new Block(4, 4);



block.drawSquare('red');


let circles = new Block(4, 3);
circles.drawCircle('Green');


let circles2 = new Block(4, 3);



class Snake {
    constructor() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5)
        ];

        this.direction = 'right';
        this.nextDirection = 'right';
    }

    draw() {
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i].drawSquare('Green');
        }
    }

    checkCollision() {
        let leftCollision = head.col === 0,
            topCollision = head.row === 0,
            rightCollision = head.col === widthInBlocks - 1,
            bottomCollision = head.row === heightInBlocks - 1;

        let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision,
            selfCollision = false;

        for (let i = 0; i < this.segments.length; i++) {
            if ( head.equal(this.segments[i]) ) {
                selfCollision = true;
            }
        }

        return wallCollision || selfCollision;
    }

    move() {
        let head = this.segments[0],
            newHead;

        this.direction = this.nextDirection;

        switch (this.direction) {
            case 'right':
                newHead = new Block(head.col + 1, head.row);
                break;
            case 'down':
                newHead = new Block(head.col, head.row + 1);
                break;
            case 'left':
                newHead = new Block(head.col - 1, head.row);
                break;
            case 'up':
                newHead = new Block(head.col, head.row - 1);
                break;
        }

        if ( this.checkCollision(newHead) ) {
            gameOver();
            return;
        }

        this.segments.unshift(newHead);

        if ( newHead.equal(apple.position) ) {
            score++;
            apple.move();
        } else {
            this.segments.pop();
        }



    }
}

// let snake = new Snake();

// snake.draw();
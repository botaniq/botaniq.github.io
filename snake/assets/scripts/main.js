// Canvas
const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

let width = canvas.width,
    height = canvas.height;


let timerId;

// Create cells
let blockSize = 10,
    widthInBlocks = width / blockSize,
    heightInBlocks = height / blockSize;

let score = 0;

// Functions
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
    clearTimeout(timerId);
    ctx.font = '50px Comic Sans MS';
    ctx.fillStyle = 'Gray';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game over!', width / 2, height / 2);
}

function circle(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    fillCircle ? ctx.fill() : ctx.stroke();
}

// Classes
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
        this.segments[0].drawSquare('#C8E814');
        let isEvenSegment = false;

        for (let i = 1; i < this.segments.length; i++) {
            
            if (isEvenSegment) {
                this.segments[i].drawSquare('Yellow');
            } else {
                this.segments[i].drawSquare('Orange');
            }

            isEvenSegment = !isEvenSegment;
        }
    }

    checkCollision(head) {
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

        // console.log(this.direction);

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
            
            if (animationTime > 50) {
                animationTime -= 1;
            }
            
            apple.move(this.segments);
        } else {
            this.segments.pop();
        }
    }

    setDirection(newDirection) {
        if (this.direction === 'up' && newDirection === 'down') {
            return;
        } else if (this.direction === 'left' && newDirection === 'right') {
            return;
        } else if (this.direction === 'down' && newDirection === 'up') {
            return;
        } else if (this.direction === 'right' && newDirection === 'left') {
            return;
        }

        this.nextDirection = newDirection;
        // console.log(this.newDirection );
    }
}

class Apple {
    constructor() {
        this.position = new Block(10, 10);
    }

    draw() {
        this.position.drawCircle('LimeGreen');
    }

    move(occupiedBlocks) {
        let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1,
            randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
        
        this.position = new Block(randomCol, randomRow);

        // Check to see if apple has been moved to a block currently occupied by the snake
        for (var i = 0; i < occupiedBlocks.length; i++) {
            if (this.position.equal(occupiedBlocks[i])) {
                this.move(occupiedBlocks); // Call the move method again
                return;
            }
        }
    }       

}

// Create objects

let snake = new Snake();
let apple = new Apple();


// let intervalId = setInterval(function() {
//     ctx.clearRect(0, 0, width, height);
//     drawScore();

//     snake.move();
//     snake.draw();
//     apple.draw();

//     drawBorder();
// }, 100)


let animationTime = 100;

function gameLoop() {
    ctx.clearRect(0, 0, width, height);
    drawScore();

    snake.move();
    snake.draw();
    apple.draw();

    drawBorder();

    timerId = setTimeout(gameLoop, animationTime);
}


gameLoop();

const directions = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

const body = document.getElementsByTagName('body')[0];

body.addEventListener('keydown', function(e) {
    let newDirection = directions[e.keyCode];

    if (newDirection) {
        // console.log(newDirection);
        snake.setDirection(newDirection);
    }
});

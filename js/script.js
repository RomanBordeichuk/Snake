let gameWidth = 20;
let gameHeight = 20;
let cellSize = 25;
let numberP = 3;
let tick = 150;

let x = Math.round(Math.random() * (gameWidth - 1));
let y = Math.round(Math.random() * (gameHeight - 1));
let running;
let pause = 1;
let direction;
let posListX = [];
let posListY = [];
let eventK;

let container = document.querySelector('.container');
let finalScreen = document.querySelector('.final_screen');
let scoreDiv = document.querySelector('.score');
let snake = document.querySelector('.snake');
let snakeBody = document.querySelectorAll('.snakeBody');

container.style.width = gameWidth * cellSize + 'px';
container.style.height = gameHeight * cellSize + 'px';
container.style.border = cellSize * 1.2 + 'px solid white';
container.style.borderRadius = cellSize / 4 + 'px';

finalScreen.style.width = gameWidth * cellSize + 'px';
finalScreen.style.height = gameHeight * cellSize + 'px';

let score = document.createElement('span');
score.textContent = numberP * 10;
scoreDiv.append(score);

for(let i = 0; i < numberP; i++){
    let snakePart = document.createElement('div');
    snakePart.classList.add('snakeBody');
    snake.prepend(snakePart);

    snakeBody = document.querySelectorAll('.snakeBody');
    posListX.push(x * cellSize);
    posListY.push(y * cellSize);

    snakePart.style.opacity = 0;
};

snakeBody[snakeBody.length - 1].style.top = y * cellSize + 'px';
snakeBody[snakeBody.length - 1].style.left = x * cellSize + 'px';

snakeBody[snakeBody.length - 1].style.width = cellSize + 'px';
snakeBody[snakeBody.length - 1].style.height = cellSize + 'px';
snakeBody[snakeBody.length - 1].style.borderRadius = cellSize / 4 + 'px';

snakeBody[snakeBody.length - 1].style.opacity = 1;

let apple = document.createElement('div');
apple.classList.add('apple');

apple.style.top = Math.round(Math.random() * (gameHeight - 1)) * cellSize + 'px';
apple.style.left = Math.round(Math.random() * (gameWidth - 1)) * cellSize + 'px';

apple.style.width = cellSize + 'px';
apple.style.height = cellSize + 'px';
apple.style.borderRadius = cellSize / 4 + 'px';

container.prepend(apple);

document.addEventListener('keydown', (event) => {
    if(pause && (event.code == 'KeyW' || 
    event.code == 'KeyA' ||
    event.code == 'KeyD' ||
    event.code == 'KeyS')
    ){pause--, start(), direction = event.code}
});

document.addEventListener('keydown', (event) => {
    eventK = event.code;
    console.log(eventK);
});

function start(){
    running = setInterval(run, tick);
}
function stop(){
    running = clearInterval(running);
}

function run(){
    score.textContent = numberP * 10;

    if(snakeBody.length >= gameWidth * gameHeight - 1){
        finalScreen.style.opacity = 1;
        finalScreen.style.zIndex = 1;
        stop();
    }

    let n = 1;

    if((eventK == 'KeyW' && direction != 'KeyS') || 
        (eventK == 'KeyA' && direction != 'KeyD') || 
        (eventK == 'KeyS' && direction != 'KeyW') ||
        (eventK == 'KeyD' && direction != 'KeyA')
    ){
        direction = eventK;
    };

    if(parseInt(snakeBody[snakeBody.length - 1].style.left) == parseInt(apple.style.left) && 
    parseInt(snakeBody[snakeBody.length - 1].style.top) == parseInt(apple.style.top)){
        let snakePart = document.createElement('div');
        snakePart.classList.add('snakeBody');
        snake.prepend(snakePart);
    
        snakeBody = document.querySelectorAll('.snakeBody');

        posListX.push(x * cellSize);
        posListY.push(y * cellSize);
        numberP++

        while(true){
            let randY = Math.round(Math.random() * (gameHeight - 1)) * cellSize + 'px';
            let randX = Math.round(Math.random() * (gameWidth - 1)) * cellSize + 'px';

            let m = 1;
            for(let i = 0; i < numberP; i++){
                if(randY == snakeBody[snakeBody.length - i - 1].style.top && 
                    randX == snakeBody[snakeBody.length - i - 1].style.left
                ){
                    m = 0;
                };
            };
            if(m){
                apple.style.top = randY;
                apple.style.left =randX;
                break;
            }
        };
    };

    for(let i = 1; i < numberP; i++){
        if(x > gameWidth - 1 || x < 0 || y > gameHeight - 1 || y < 0 || 
            (parseInt(snakeBody[snakeBody.length - 1].style.left) == 
            parseInt(snakeBody[snakeBody.length - i - 1].style.left) && 
            parseInt(snakeBody[snakeBody.length - 1].style.top) == 
            parseInt(snakeBody[snakeBody.length - i - 1].style.top))
        ){
            snakeBody[snakeBody.length - 1].style.background = '#82241f';
            n = 0;
            stop();
        }
    }
    if(direction == 'KeyW' && n){
        y--
        posListX.push(x * cellSize);
        posListY.push(y * cellSize);
    };
    if(direction == 'KeyA' && n){
        x--
        posListX.push(x * cellSize);
        posListY.push(y * cellSize);
    };
    if(direction == 'KeyS' && n){
        y++
        posListX.push(x * cellSize);
        posListY.push(y * cellSize);
    };
    if(direction == 'KeyD' && n){
        x++
        posListX.push(x * cellSize);
        posListY.push(y * cellSize);
    };
    for(let i = 0; i < numberP; i++){
        snakeBody[snakeBody.length - i - 1].style.top = posListY[posListY.length - i - 1] + 'px';
        snakeBody[snakeBody.length - i - 1].style.left = posListX[posListX.length - i - 1] + 'px';

        snakeBody[snakeBody.length - i - 1].style.width = cellSize + 'px';
        snakeBody[snakeBody.length - i - 1].style.height = cellSize + 'px';
        snakeBody[snakeBody.length - i - 1].style.borderRadius = cellSize / 4 + 'px';

        snakeBody[snakeBody.length - i - 1].style.transition = tick / 1000 + 's'; 
        snakeBody[snakeBody.length - i - 1].style.opacity = 1;
    };
};
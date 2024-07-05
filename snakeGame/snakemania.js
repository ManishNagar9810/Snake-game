// game constant

let inputdirection = { x: 0, y: 0 };
const foodsound = new Audio('slice-apple.mp3');
const bgmusic = new Audio('naruto_theme.mp3');
const keypress = new Audio('key.wav')
const collide = new Audio('male-scream-in-fear.mp3')
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 13 }];
let board = document.querySelector('.board');
food = { x: 13, y: 5 }
let score = 0;
let scoreBox= document.querySelector('.score');
let MaxScore= document.querySelector('.maxScore');





// game functions

function main(currentTime) {
    window.requestAnimationFrame(main)
    // console.log(currentTime);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine()


}
function iscollapse(sarr) {
    // if bite self
    for (let index = 1; index < snakeArr.length; index++) {
        if (sarr[index].x === sarr[0].x && sarr[index].y === sarr[0].y) {
            return true;
        }

    }

    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;

    }

}

function gameEngine() {


    // updating snake array

    if (iscollapse(snakeArr)) {
        collide.play();
        
        alert('game  over!.. Press Any Key');
        inputdirection = { x: 0, y: 0 }
        snakeArr = [{ x: 12, y: 14 }];
        score = 0;
        speed=2;

    }


    // eating food


    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score +=1;
        scoreBox.innerHTML="score"+score;
        speed +=1;
        MaxScore.innerHTML="mxScore"+score;

        snakeArr.unshift({ x: snakeArr[0].x + inputdirection.x, y: snakeArr[0].y + inputdirection.y })
        let a = 0;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }


    }


    // moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdirection.x;
    snakeArr[0].y += inputdirection.y;



    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }


        board.appendChild(snakeElement);
    });
    // display thw food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food');

    board.appendChild(foodElement);
}









// game logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', (p) => {

    inputdirection = { x: 0, y: 1 }// start game
    keypress.play()

    switch (p.key) {
        case "ArrowUp":

            console.log("AerrowUp")
            inputdirection.x = 0
            inputdirection.y = -1
            break;
        case "ArrowDown":


            console.log("AerrowDown")
            inputdirection.x = 0
            inputdirection.y = 1
            break;
        case "ArrowRight":

            console.log("AerrowRight")
            inputdirection.x = 1
            inputdirection.y = 0
            break;
        case "ArrowLeft":

            console.log("AerrowLeft")
            inputdirection.x = -1
            inputdirection.y = 0
            break;
        default:
            break;


    }
});
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

const grid = 20;

let snake;
let direction;
let food;
let score;
let gameRunning;

function startGame(){

    snake = [
        {x:200, y:200}
    ];

    direction = null;

    food = randomFood();

    score = 0;

    gameRunning = true;

    scoreText.textContent = score;

    gameOverScreen.classList.add("hidden");
}

function randomFood(){

    return {
        x: Math.floor(Math.random()*20)*grid,
        y: Math.floor(Math.random()*20)*grid
    };

}

function gameLoop(){

    if(!gameRunning){
        requestAnimationFrame(gameLoop);
        return;
    }

    if(direction){

        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        // wall collision
        if(
            head.x < 0 ||
            head.x >= canvas.width ||
            head.y < 0 ||
            head.y >= canvas.height
        ){
            endGame();
        }

        // self collision
        for(let part of snake){
            if(head.x === part.x && head.y === part.y){
                endGame();
            }
        }

        snake.unshift(head);

        if(head.x === food.x && head.y === food.y){

            score++;
            scoreText.textContent = score;

            food = randomFood();

        }else{
            snake.pop();
        }

    }

    drawGame();

    setTimeout(()=>requestAnimationFrame(gameLoop),100);

}

function drawGame(){

    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // draw snake
    ctx.fillStyle = "#00ff88";

    snake.forEach((part,i)=>{
        ctx.fillRect(part.x,part.y,grid-2,grid-2);
    });

    // draw food
    ctx.fillStyle = "#ff4d4d";
    ctx.fillRect(food.x,food.y,grid-2,grid-2);

}

function endGame(){

    gameRunning = false;

    gameOverScreen.classList.remove("hidden");

}

function restartGame(){

    startGame();

}

document.addEventListener("keydown", e=>{

    if(e.key === "ArrowUp" && direction?.y !== grid){
        direction = {x:0,y:-grid};
    }

    if(e.key === "ArrowDown" && direction?.y !== -grid){
        direction = {x:0,y:grid};
    }

    if(e.key === "ArrowLeft" && direction?.x !== grid){
        direction = {x:-grid,y:0};
    }

    if(e.key === "ArrowRight" && direction?.x !== -grid){
        direction = {x:grid,y:0};
    }

});

startGame();
gameLoop();
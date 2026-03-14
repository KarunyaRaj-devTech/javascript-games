const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const grid = 20;
let count = 0;

let snake = [
    {x:160,y:160}
];

let dx = grid;
let dy = 0;

let food = {
    x:320,
    y:320
};

let score = 0;

function gameLoop(){

    requestAnimationFrame(gameLoop);

    if(++count < 8){
        return;
    }

    count = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    snake[0].x += dx;
    snake[0].y += dy;

    if(snake[0].x < 0) snake[0].x = canvas.width - grid;
    if(snake[0].x >= canvas.width) snake[0].x = 0;
    if(snake[0].y < 0) snake[0].y = canvas.height - grid;
    if(snake[0].y >= canvas.height) snake[0].y = 0;

    snake.unshift({x:snake[0].x,y:snake[0].y});

    if(snake[0].x === food.x && snake[0].y === food.y){

        score++;
        scoreText.textContent = "Score: " + score;

        food.x = Math.floor(Math.random()*20)*grid;
        food.y = Math.floor(Math.random()*20)*grid;

    }else{
        snake.pop();
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,grid-1,grid-1);

    ctx.fillStyle = "lime";

    snake.forEach(function(cell,index){

        ctx.fillRect(cell.x,cell.y,grid-1,grid-1);

        for(let i = index + 1; i < snake.length; i++){

            if(cell.x === snake[i].x && cell.y === snake[i].y){

                alert("Game Over");

                restartGame();

            }

        }

    });

}

document.addEventListener("keydown",function(e){

    if(e.key === "ArrowLeft" && dx === 0){
        dx = -grid;
        dy = 0;
    }

    else if(e.key === "ArrowUp" && dy === 0){
        dx = 0;
        dy = -grid;
    }

    else if(e.key === "ArrowRight" && dx === 0){
        dx = grid;
        dy = 0;
    }

    else if(e.key === "ArrowDown" && dy === 0){
        dx = 0;
        dy = grid;
    }

});

function restartGame(){

    snake = [{x:160,y:160}];

    dx = grid;
    dy = 0;

    score = 0;

    scoreText.textContent = "Score: 0";

}

gameLoop();
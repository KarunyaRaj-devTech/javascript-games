let cells = document.querySelectorAll(".cell");
let restartBtn = document.getElementById("restart");
let statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach((cell,index)=>{

    cell.addEventListener("click",()=>{

        if(board[index] !== "" || !gameActive){
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();

        if(gameActive){
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = "Player " + currentPlayer + "'s Turn";
        }

    });

});

function checkWinner(){

    for(let pattern of winPatterns){

        let [a,b,c] = pattern;

        if(board[a] && board[a] === board[b] && board[a] === board[c]){

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            statusText.textContent = currentPlayer + " Wins!";
            gameActive = false;
            return;

        }

    }

    if(!board.includes("")){
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    }

}

restartBtn.addEventListener("click",restartGame);

function restartGame(){

    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent = "";
        cell.classList.remove("winner");
    });

}
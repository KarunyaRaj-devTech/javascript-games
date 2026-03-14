const grid = document.getElementById("grid");
const restartBtn = document.getElementById("restart");
const movesText = document.getElementById("moves");
const statusText = document.getElementById("status");

const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🥑"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function startGame(){

    grid.innerHTML = "";

    cards = [...emojis, ...emojis];
    cards.sort(()=>0.5 - Math.random());

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;

    movesText.textContent = "Moves: 0";
    statusText.textContent = "Match all pairs!";

    cards.forEach(emoji => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.dataset.emoji = emoji;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${emoji}</div>
            </div>
        `;

        card.addEventListener("click", handleCardClick);

        grid.appendChild(card);

    });

}

function handleCardClick(){

    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.add("flip");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;
    movesText.textContent = "Moves: " + moves;

    checkMatch();

}

function checkMatch(){

    if(firstCard.dataset.emoji === secondCard.dataset.emoji){

        matchedPairs++;

        if(matchedPairs === emojis.length){
            statusText.textContent = "🎉 You Win!";
        }

        resetTurn();

    }else{

        lockBoard = true;

        setTimeout(()=>{
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetTurn();
        },1000);

    }

}

function resetTurn(){
    [firstCard, secondCard] = [null,null];
    lockBoard = false;
}

restartBtn.addEventListener("click", startGame);

startGame();
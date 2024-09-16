const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; /*for status*/

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr empty bhi krna padhega boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
        // green color ko bhi to remove krna h
        // initialise box with css properrties again
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if( currentPlayer === 'X' ) {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    // ui update kr rhe h
    gameInfo.innerText = `Current Player - ${currentPlayer} `;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        // all three boxes should be non-empty and exactly same in value
        if( ( gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] != "") 
        && ( (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) ) {
           
            // check if winner is X 
            if( gameGrid[position[0]] === 'X' ) 
                answer = 'X';
            else 
                answer = 'O';

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    // it means we have a winner
    if( answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is no winner
    let  fillCount = 0;
    gameGrid.forEach((box) => {
        if( box !== "")
            fillCount++;
    })
    if( fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if( gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check koi jeet to nhi gya
        checkGameOver(); 
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);  /* isse pta chale konse box pe exactly click kiya h */
    })
});

newGameBtn.addEventListener("click", initGame);




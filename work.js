const tiles = document.querySelectorAll(".cell"); 
const header = document.querySelector("#titleHeader"); 
const playerOptionX = document.querySelector("#xPlayerDisplay"); 
const playerOptionO = document.querySelector("#yPlayerDisplay"); 
const restartButton = document.querySelector("#restartBtn"); 
let currentPlayer = ""; 
let gameStarted = false; 
let gamePaused = false; 
const inputTiles = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Player selects "X"
playerOptionX.addEventListener("click", () => {
    if (!gameStarted) {
        currentPlayer = "X";
        playerOptionX.classList.add("player-active");
        playerOptionO.classList.remove("player-active");
        header.textContent = "X's turn";
        gameStarted = true;
    }
});

// Player selects "O"
playerOptionO.addEventListener("click", () => {
    if (!gameStarted) {
        currentPlayer = "O";
        playerOptionO.classList.add("player-active");
        playerOptionX.classList.remove("player-active");
        header.textContent = "O's turn";
        gameStarted = true;
    }
});

// Handles cell click for player moves
tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => clickBox(tile, index));
});

// Processes a player's move
function clickBox(tile, index) {
    if (currentPlayer === "") {
        shakeHeader();
        return;
    }
    if (tile.textContent === "" && !gamePaused) {
        updateBox(tile, index);
        if (!checkWinCondition()) changePlayer();
    }
}

// Adds shake effect to header if no player is selected
function shakeHeader() {
    header.classList.add("shake");
    setTimeout(() => header.classList.remove("shake"), 500);
}

// Switches the current player
function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    header.textContent = `${currentPlayer}'s turn`;
}

// Updates the selected cell and stores move
function updateBox(tile, index) {
    tile.textContent = currentPlayer;
    inputTiles[index] = currentPlayer;
    tile.classList.add(currentPlayer === "X" ? "xPlayerDisplay" : "yPlayerDisplay");
}

// Checks for a win or draw after each move
function checkWinCondition() {
    for (const [a, b, c] of winConditions) {
        if (inputTiles[a] === currentPlayer && inputTiles[b] === currentPlayer && inputTiles[c] === currentPlayer) {
            declareWinner([a, b, c]);
            return true;
        }
    }
    if (inputTiles.every(tile => tile !== "")) {
        header.textContent = "Draw";
        gamePaused = true;
        return true;
    }
    return false;
}

// Declares the winner and highlights winning cells
function declareWinner(winningIndices) {
    header.textContent = `${currentPlayer} wins!`;
    gamePaused = true;
    winningIndices.forEach(index => tiles[index].classList.add("winning-cell"));
}

// Resets the game state for a new round
function restartGame() {
    inputTiles.fill("");
    tiles.forEach(tile => {
        tile.textContent = ""; 
        tile.classList.remove("xPlayerDisplay", "yPlayerDisplay", "winning-cell");
    });
    gamePaused = false;
    currentPlayer = "";
    header.textContent = "Choose";
    playerOptionX.classList.remove("player-active");
    playerOptionO.classList.remove("player-active");
    gameStarted = false;
}

// Resets the game when the restart button is clicked
restartButton.addEventListener("click", restartGame);

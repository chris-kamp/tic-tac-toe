//An object to control the state of the board
const Gameboard = (() => {
    //An array holding the content of the game board
    const boardContent = ["X","","","","","","","",""];
    const getBoardContent = () => {
        return boardContent;
    }

    //Fill a square
    const fillSquare = (index) => {
        if(boardContent[index] === "") {
            boardContent[index] = GameController.getCurrentPlayer().getMark();
        }
    };

    return {getBoardContent, fillSquare};
})();

//An object to control the display
const DisplayController = (() => {

    //The HTML representing the game board
    const board = [];

    //Initialise the empty game board
    const initialiseBoard = () => {
        const gridContainer = document.getElementById("grid-container");
        for(i = 0; i< 9; i++) {
            const index = i;
            const square = document.createElement("div");
            square.classList.add("boardSquare");
            gridContainer.appendChild(square);
            square.addEventListener("click", () => {
                Gameboard.fillSquare(index);
                displayBoard();
            });
            board.push(square);
        }
    };

    //Update the game board to display the current game state
    const displayBoard = () => {
        Gameboard.getBoardContent().forEach((content, index) => {
            board[index].textContent = content;
        });
    };
    return {initialiseBoard, displayBoard};
 })();

//A factory function to create objects for each player
function Player(mark) {
    //Get the player's mark (X or O)
    const getMark = () => {
        return mark;
    };

    //The player's current score
    let score = 0;
    const getScore = () => {
        return score;
    }
    return {getScore, getMark};
}

//TODO: Move this to initialisation code
const player1 = Player("X");
const player2 = Player("O");

const GameController = (() => {
    let currentPlayer = player1;
    const getCurrentPlayer = () => {
        return currentPlayer;
    };
    return {getCurrentPlayer};
})();


DisplayController.initialiseBoard();
DisplayController.displayBoard();
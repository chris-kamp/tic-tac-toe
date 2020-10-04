//An object to control the state of the board
const Gameboard = (() => {
    //An array holding the content of the game board
    const boardContent = ["","","","","","","","",""];
    const getBoardContent = () => {
        return boardContent;
    }

    //Fill a square
    const fillSquare = (index) => {
        if(boardContent[index] === "") {
            boardContent[index] = GameController.getCurrentPlayer().getMark();
        }
    };

    //Check if the game is over and return the result
    const checkResult = () => {
    
        //Iterate over all possible lines and check for wins
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(i = 0; i < lines.length; i++) {
            if(boardContent[lines[i][0]] !== "" && (boardContent[lines[i][0]] === boardContent[lines[i][1]] && boardContent[lines[i][0]] === boardContent[lines[i][2]])) {
                return "win";
            }
        }

        //If there are no winning lines, return false if any squares are empty, otherwise return "tie"
        for(i = 0; i < boardContent.length; i++) {
            if(boardContent[i] === "") {
                return false;
            }
        }
        return "tie";
    };

    return {getBoardContent, fillSquare, checkResult};
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
                GameController.advanceTurn();
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
function Player(mark, turnIndex) {
    //Get the player's mark (X or O)
    const getMark = () => {
        return mark;
    };

    //Get the player's turn order index
    const getTurnIndex = () => {
        return turnIndex;
    };

    //The player's current score
    let score = 0;
    const getScore = () => {
        return score;
    }
    return {getScore, getMark, getTurnIndex};
}

//TODO: Move this to initialisation code
const player1 = Player("X");
const player2 = Player("O");

const GameController = (() => {
    let currentPlayer;
    const players = [];

    //Initialise the board and players
    const initialiseGame = () => {
        players.push(Player("X", 0));
        players.push(Player("0", 1));
        currentPlayer = players[0];
        DisplayController.initialiseBoard();
        DisplayController.displayBoard();
    };

    //Advance to the next player's turn
    const advanceTurn = () => {
        const newIndex = (currentPlayer.getTurnIndex() + 1) % (players.length);
        currentPlayer = players[newIndex];
    };

    //Get the player whose turn it currently is
    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    return {getCurrentPlayer, initialiseGame, advanceTurn};
})();

GameController.initialiseGame();
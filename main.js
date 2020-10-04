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

    //Clear the board content
    const clearBoard = () => {
        for(i = 0; i < boardContent.length; i++) {
            boardContent[i] = "";
        }
        DisplayController.displayBoard();
    };

    return {getBoardContent, fillSquare, checkResult, clearBoard};
})();

//An object to control the display
const DisplayController = (() => {

    //The HTML representing the game board
    const board = [];
    const statusText = document.getElementById("statusText");
    const scoreText = document.getElementById("scoreText");
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const resetButton = document.getElementById("resetButton");


    //Initialise the empty game board
    const initialiseBoard = () => {
        const gridContainer = document.getElementById("grid-container");
        for(i = 0; i< 9; i++) {
            const index = i;
            const square = document.createElement("div");
            square.classList.add("boardSquare");
            gridContainer.appendChild(square);
            square.addEventListener("click", () => {
                GameController.playTurn(index);
            });
            board.push(square);
        }
        startButton.addEventListener("click", GameController.startGame);
        restartButton.addEventListener("click", GameController.restartGame);
        resetButton.addEventListener("click", GameController.resetScores);
        displayStatus("start");
    };

    //Update the game board to display the current game state
    const displayBoard = () => {
        Gameboard.getBoardContent().forEach((content, index) => {
            board[index].textContent = content;
        });
    };

    //Update the result text
    const displayStatus = (key) => {
        switch(key){
            case "win":
                statusText.textContent = `${GameController.getCurrentPlayer().getName()} wins!`;
                break;
            case "tie":
                statusText.textContent = "It's a tie!";
                break;
            case "start":
                statusText.textContent = "Press START to begin";
                break;
            case "clear":
                statusText.textContent = "";
                break;
        }
    };

    //Update the score text
    const displayScore = () => {
        scoreText.textContent = `${GameController.getPlayer(0).getName()}: ${GameController.getPlayer(0).getScore()} | ${GameController.getPlayer(1).getName()}: ${GameController.getPlayer(1).getScore()}`;
    }
    return {initialiseBoard, displayBoard, displayStatus, displayScore};
 })();

//A factory function to create objects for each player
function Player(name, mark, turnIndex) {
    //Get the player's mark (X or O)
    const getMark = () => {
        return mark;
    };

    //Get the player's name
    const getName = () => {
        return name;
    };

    //Get the player's turn order index
    const getTurnIndex = () => {
        return turnIndex;
    };

    //The player's current score
    let score = 0;
    const getScore = () => {
        return score;
    };

    const incrementScore = (increment) => {
        score += increment;
    };

    const resetScore = () => {
        score = 0;
    };

    return {getScore, getMark, getTurnIndex, getName, incrementScore, resetScore};
}

const GameController = (() => {
    let currentPlayer;
    let active;
    const players = [];

    //Initialise the board and players
    const initialiseGame = () => {
        active = false;
        players.push(Player("Player 1", "X", 0));
        players.push(Player("Player 2", "0", 1));
        currentPlayer = players[0];
        DisplayController.initialiseBoard();
        DisplayController.displayBoard();
        DisplayController.displayScore();
    };

    //Restart the game
    const restartGame = () => {
        active = false;
        DisplayController.displayStatus("start");
        Gameboard.clearBoard();
    };

    //Start the game (from an inactive state)
    const startGame = () => {
        if(!active) {
            restartGame();
            active = true;
            DisplayController.displayStatus("clear");
        }
    };

    //Reset the scores of all players
    const resetScores = () => {
        players.forEach(player => {
            player.resetScore();
        });
        DisplayController.displayScore();
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

    //Get a player by turn index
    const getPlayer = (turnIndex) => {
        return players[turnIndex];
    };

    //Play out a turn
    const playTurn = (clickedIndex) => {
        if(!active) {
            return false;
        }
        Gameboard.fillSquare(clickedIndex);
        DisplayController.displayBoard();
        const result = Gameboard.checkResult();
        if(result) {
            active = false;
            if(result === "win") {
                currentPlayer.incrementScore(1);
            }
            DisplayController.displayStatus(result);
            DisplayController.displayScore();
        } else {
            advanceTurn();
        }
    };
    return {getCurrentPlayer, initialiseGame, playTurn, getPlayer, startGame, restartGame, resetScores};
})();

GameController.initialiseGame();
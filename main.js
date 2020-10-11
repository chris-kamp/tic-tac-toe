//An object to control the state of the board
const Gameboard = (() => {
    //An array holding the content of the game board
    const boardContent = ["","","","","","","","",""];
    const getBoardContent = () => {
        return boardContent;
    }

    const getOpenSquares = (board) => {
        const openSquares = [];
        board.forEach((square, index) => {
            if(square === "") {
                openSquares.push(index);
            }
        });
        return openSquares;
    };

    //Fill a square
    const fillSquare = (index) => {
        if(boardContent[index] === "") {
            boardContent[index] = GameController.getCurrentPlayer().getMark();
        }
    };

    //Check if the game is over and return the result
    const checkResult = (board) => {
    
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
            if(board[lines[i][0]] !== "" && (board[lines[i][0]] === board[lines[i][1]] && board[lines[i][0]] === board[lines[i][2]])) {
                return "win";
            }
        }

        //If there are no winning lines, return false if any squares are empty, otherwise return "tie"
        for(i = 0; i < board.length; i++) {
            if(board[i] === "") {
                return false;
            }
        }
        return "tie";
    };

    const getWinner = (board) => {
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
            if(board[lines[i][0]] !== "" && (board[lines[i][0]] === board[lines[i][1]] && board[lines[i][0]] === board[lines[i][2]])) {
                return board[lines[i][0]];
            }
        }
        //If there are no winning lines, return false if any squares are empty, otherwise return "tie"
        for(i = 0; i < board.length; i++) {
            if(board[i] === "") {
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

    return {getBoardContent, getOpenSquares, fillSquare, checkResult, clearBoard, getWinner};
})();

//An object to control the display
const DisplayController = (() => {

    //The HTML representing the game board
    const board = [];
    const statusText = document.getElementById("statusText");
    const scoreTextP1 = document.getElementById("scoreTextP1");
    const scoreTextP2 = document.getElementById("scoreTextP2");
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const resetButton = document.getElementById("resetButton");
    const editNameButtons = [];
    editNameButtons.push(document.getElementById("editNameP1")); 
    editNameButtons.push(document.getElementById("editNameP2"));
    const nameDisplays = [];
    nameDisplays.push(document.getElementById("nameP1"));
    nameDisplays.push(document.getElementById("nameP2"));
    const nameInputs = [];
    const AICheckboxes = [];
    AICheckboxes.push(document.getElementById("AIP1"));
    AICheckboxes.push(document.getElementById("AIP2"));

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

    //Initialise name input elements
    const initialiseNameInputs = () => {
        for(let i = 0; i < 2; i++) {
            const player = GameController.getPlayer(i);
            nameDisplay = nameDisplays[i];
            const input = document.createElement("input");
            input.classList.add("nameInput");
            input.value = player.getName();
            input.setAttribute("maxLength", 10);
            input.addEventListener("blur", () => {
                const char = /\S/;
                if(input.value !== "" && input.value.search(char) !== -1) {
                    player.setName(input.value);
                } else {
                    input.value = player.getName();
                }
                displayName(player);
                displayScore();
            });
            nameInputs.push(input);
            editNameButtons[i].addEventListener("click", () => {
                inputName(player);
            });
        }
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

    //Update the name displayed for a player
    const displayName = (player) => {
        const index = player.getTurnIndex();
        nameDisplays[index].textContent = `${player.getName()} [${player.getMark()}]`;
        nameInputs[index].replaceWith(nameDisplays[index]);
    };

    //Replace the name display for a player with an input field to change the player's name
    const inputName = (player) => {
        const input = nameInputs[player.getTurnIndex()];
        nameDisplay = nameDisplays[player.getTurnIndex()];
        nameDisplay.replaceWith(input);
        input.focus();
    };

    //Update the score text
    const displayScore = () => {
        scoreTextP1.textContent = `${GameController.getPlayer(0).getName()}: ${GameController.getPlayer(0).getScore()}`;
        scoreTextP2.textContent = `${GameController.getPlayer(1).getName()}: ${GameController.getPlayer(1).getScore()}`;
    };

    //Enable or disable AI checkboxes
    const enableCheckboxes = () => {
        AICheckboxes[0].disabled = false;
        AICheckboxes[1].disabled = false;
    };

    const disableCheckboxes = () => {
        AICheckboxes[0].disabled = true;
        AICheckboxes[1].disabled = true;
    };

    const getAICheckboxes = () => {
        return AICheckboxes;
    };

    return {initialiseBoard, displayBoard, displayStatus, displayScore, initialiseNameInputs, displayName, enableCheckboxes, disableCheckboxes, getAICheckboxes};
 })();

//A factory function to create objects for each player
function Player(args) {
    let AI = false;
    let name = args.name;

    //Get the player's mark (X or O)
    const getMark = () => {
        return args.mark;
    };

    //Get the player's name
    const getName = () => {
        return name;
    };

    const setName = (newName) => {
        name = newName;
    };

    //Get the player's turn order index
    const getTurnIndex = () => {
        return args.turnIndex;
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

    const isAI = () => {
        return AI;
    };

    const setAI = (bool) => {
        AI = bool;
    };

    return {getScore, getMark, getTurnIndex, getName, incrementScore, resetScore, setName, setAI, isAI};
}


//An object to control AI players
const AIController = (() => {
 
    const getRandomMove = () => {
        const openSquares = Gameboard.getOpenSquares(Gameboard.getBoardContent());
        const playIndex = openSquares[Math.floor(Math.random() * (openSquares.length))];
        return playIndex;
    };


    const getMax = (arr) => {
        let topVal = arr[0];
        arr.forEach(item => {
            if(item > topVal) {
                topVal = item;
            }
        });
        return topVal;
    };

    const getMin = (arr => {
        let minVal = arr[0];
        arr.forEach(item => {
            if(item < minVal) {
                minVal = item;
            }
        });
        return minVal;
    });

    const getValue = (result) => {
        if(result === "X") {
            return 1;
        } else if(result === "O") {
            return -1;
        } else if (result === "tie") {
            return 0;
        } else {
            return false;
        }
    };

    const minimax = (markToPlay, board) => {
        if(Gameboard.checkResult(board)) {
            return getValue(Gameboard.getWinner(board));
        }
        const maximising = (markToPlay === "X") ? true : false;
        const nextMark = (markToPlay === "X") ? "O" : "X";
        const scores = [];
        for(let i = 0; i < 9; i++) {
            if(board[i] === "") {
                const simBoard = [...board];
                simBoard[i] = markToPlay;
                scores.push(minimax(nextMark, simBoard));
            }
        }
        if(maximising) {
            return Math.max(...scores);
        } else {
            return Math.min(...scores);
        }
    };

    const getBestMove = () => {
        const markToPlay = GameController.getCurrentPlayer().getMark();
        const maximising = (markToPlay === "X") ? true : false;
        const nextMark = (markToPlay === "X") ? "O" : "X";
        const board = Gameboard.getBoardContent();
        let highestValueMove;
        let lowestValueMove;
        let highestScore = -99;
        let lowestScore = 99;
        for(let i = 0; i < 9; i++) {
            if(board[i] === "") {
                const simBoard = [...board];
                simBoard[i] = markToPlay;
                const score = minimax(nextMark, simBoard);
                if(score > highestScore) {
                    highestScore = score;
                    highestValueMove = i;
                }
                if(score < lowestScore) {
                    lowestScore = score;
                    lowestValueMove = i;
                }
            }
        }
        if(maximising) {
            return highestValueMove;
        } else {
            return lowestValueMove;
        }
    };

    const makeRandomPlay = () => {
        if(GameController.getCurrentPlayer().isAI()) {
            GameController.playTurn(getRandomMove());
        } else {
            return false;
        }
    };

    const makePlay = () => {
        if(GameController.getCurrentPlayer().isAI()) {
            GameController.playTurn(getBestMove());
        } else {
            return false;
        }
    };

    return {makePlay, getBestMove, getValue, minimax};
})();

const GameController = (() => {
    let currentPlayer;
    let active;
    const players = [];

    //Initialise the board and players
    const initialiseGame = () => {
        active = false;
        players.push(Player({name: "Player 1", mark: "X", turnIndex: 0}));
        players.push(Player({name: "Player 2", mark: "O", turnIndex: 1}));
        DisplayController.initialiseBoard();
        DisplayController.initialiseNameInputs();
        DisplayController.displayName(players[0]);
        DisplayController.displayName(players[1]);
        DisplayController.displayBoard();
        DisplayController.displayScore();
        DisplayController.enableCheckboxes();
    };

    //Restart the game
    const restartGame = () => {
        active = false;
        DisplayController.displayStatus("start");
        Gameboard.clearBoard();
        DisplayController.enableCheckboxes();
        currentPlayer = players[0];
    };

    //Start the game (from an inactive state)
    const startGame = () => {
        if(!active) {
            restartGame();
            active = true;
            DisplayController.displayStatus("clear");
            DisplayController.disableCheckboxes();
            players.forEach(player => {
                const index = player.getTurnIndex();
                player.setAI(DisplayController.getAICheckboxes()[index].checked);
            });
            AIController.makePlay();
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
        currentPlayer = getOtherPlayer(currentPlayer);
    };

    //Get the player whose turn it currently is
    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    //Get a player by turn index
    const getPlayer = (turnIndex) => {
        return players[turnIndex];
    };

    //Given a player, get the other player
    const getOtherPlayer = (player) => {
        const newIndex = (player.getTurnIndex() + 1) % (players.length);
        return players[newIndex];
    };

    //Play out a turn
    const playTurn = (index) => {
        if(!active) {
            return false;
        }
        Gameboard.fillSquare(index);
        DisplayController.displayBoard();
        const result = Gameboard.checkResult(Gameboard.getBoardContent());
        if(result) {
            active = false;
            if(result === "win") {
                currentPlayer.incrementScore(1);
            }
            DisplayController.displayStatus(result);
            DisplayController.displayScore();
            DisplayController.enableCheckboxes();
        } else {
            advanceTurn();
            AIController.makePlay();
        }
    };
    return {getCurrentPlayer, initialiseGame, playTurn, getPlayer, getOtherPlayer, startGame, restartGame, resetScores};
})();

GameController.initialiseGame();
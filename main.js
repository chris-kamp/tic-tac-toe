const Gameboard = (() => {
    const board = ["X","O","X","O","X","O","X","O","X"];
    return {board};
})();

const displayController = (() => {
    const board = [];
    const initialiseBoard = () => {
        const gridContainer = document.getElementById("grid-container");
        for(i = 0; i< 9; i++) {
            const square = document.createElement("div");
            square.classList.add("boardSquare");
            gridContainer.appendChild(square);
            square.textContent = Gameboard.board[i]; //Move to displayBoard
            board.push(square);
        }
    };

    const displayBoard = () => {

    };
    return {displayBoard, initialiseBoard};
 })();

function Player(mark) {
    let score = 0;
    return {score};
}

const player1 = Player("X");
const player2 = Player("O");
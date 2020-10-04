const Gameboard = (() => {
    const board = ["X","O","X","O","X","O","X","O","X"];
    const getBoard = () => {
        return board;
    }
    return {getBoard};
})();

const DisplayController = (() => {
    const board = [];
    const initialiseBoard = () => {
        const gridContainer = document.getElementById("grid-container");
        for(i = 0; i< 9; i++) {
            const square = document.createElement("div");
            square.classList.add("boardSquare");
            gridContainer.appendChild(square);
            board.push(square);
        }
    };

    const displayBoard = () => {
        Gameboard.getBoard().forEach((content, square) => {
            board[square].textContent = content;
        });
    };
    return {displayBoard, initialiseBoard};
 })();

function Player(mark) {
    let score = 0;
    return {score};
}

const player1 = Player("X");
const player2 = Player("O");
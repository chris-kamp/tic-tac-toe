const Gameboard = (() => {
    const board = ["X","O","X","O","X","O","X","O","X"];
    return {board};
 })();

const displayController = (() => {
     const displayBoard = () => {

     };
     return {displayBoard};
 })

function Player() {
    let score = 0;
    return {score};
 }

const player1 = Player();
const player2 = Player();
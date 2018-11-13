import GameState from './gameState'
import Positions from './positions'

export default class GameStatus {
    constructor(currentPlayer, gameState, squares) {
        this.currentPlayer = currentPlayer || 'X';
        this.gameState = gameState || GameState.ON_GOING;
        this.squares = squares || Array(9).fill("");
    }

    takeSquare(position) {
        if (hasBeenWon(this.gameState)) return this;
        if (isPositionOccupied(position, this.squares)) return this;

        const squares = occupyPosition(position, this.squares, this.currentPlayer);
        const gameState = nextGameState(squares, this.currentPlayer);

        return new GameStatus(
            nextPlayer(gameState, this.currentPlayer),
            gameState,
            squares
        )
    }
}

function hasBeenWon(gameState) {
    return [GameState.X_WON, GameState.O_WON].includes(gameState);
}

function isPositionOccupied(position, squares) {
    return squares[position] !== "";
}

function occupyPosition(position, squares, currentPlayer) {
    squares[position] = currentPlayer;
    return squares;
}

function nextGameState(squares, currentPlayer) {
    if (hasPlayerWon(squares, currentPlayer)) {
        return currentPlayer === 'X'
            ? GameState.X_WON
            : GameState.O_WON;
    }
    if (isDraw(squares)) return GameState.DRAW;

    return GameState.ON_GOING;
}

function isDraw(squares) {
    return squares.every((square) => square !== '');
}

function hasPlayerWon(squares, player) {
    const winningCombinations = [
        [Positions.NORTH_WEST, Positions.NORTH_MIDDLE, Positions.NORTH_EAST],
        [Positions.CENTER_WEST, Positions.CENTER_MIDDLE, Positions.CENTER_EAST],
        [Positions.SOUTH_WEST, Positions.SOUTH_MIDDLE, Positions.SOUTH_EAST],
        [Positions.NORTH_WEST, Positions.CENTER_WEST, Positions.SOUTH_WEST],
        [Positions.NORTH_MIDDLE, Positions.CENTER_MIDDLE, Positions.SOUTH_MIDDLE],
        [Positions.NORTH_EAST, Positions.CENTER_EAST, Positions.SOUTH_EAST],
        [Positions.NORTH_WEST, Positions.CENTER_MIDDLE, Positions.SOUTH_EAST],
        [Positions.NORTH_EAST, Positions.CENTER_MIDDLE, Positions.SOUTH_WEST]
    ];
    return winningCombinations.some((winningCombination) => {
        return winningCombination.every((position) => {
            return squares[position] === player;
        });
    });
}

function nextPlayer(state, currentPlayer) {
    if (hasBeenWon(state, currentPlayer)) return currentPlayer;
    return currentPlayer === 'X'
        ? 'O'
        : 'X';
}
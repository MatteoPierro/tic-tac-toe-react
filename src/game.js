import React from 'react';
import './index.css';
import Board from './board';
import Positions from './positions';
import GameState from './gameState';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X',
            state: GameState.ON_GOING,
            squares: Array(9).fill("")
        };
    }

    takeSquare(position) {
        if (hasBeenWon(this.state.state)) return;
        if (isPositionOccupied(this.state.squares, position)) return;

        this.setState(occupyPosition(position));
        this.setState(updateGameState);
        this.setState(updateCurrentPlayer);
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        player={this.state.currentPlayer}
                        gameState={this.state.state}
                        squares={this.state.squares}
                        onSquareTaken={this.takeSquare.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

function occupyPosition(position) {
    return (state) => {
        const squares = state.squares;
        squares[position] = state.currentPlayer;
        return {
            squares: squares
        };
    };
}

function isPositionOccupied(squares, position) {
    return squares[position] !== "";
}

function updateCurrentPlayer(state) {
    const currentPlayer = state.currentPlayer;
    const gameState = state.state;
    return {
        currentPlayer: nextPlayer(currentPlayer, gameState)
    };
}

function nextPlayer(currentPlayer, gameState) {
    if (hasBeenWon(gameState)) return currentPlayer;
    return currentPlayer === 'X'
        ? 'O'
        : 'X';
}

function hasBeenWon(gameState) {
    return [GameState.X_WON, GameState.O_WON].includes(gameState);
}

function updateGameState(previousState) {
    return {
        state: nextGameState(previousState)
    }
}

function nextGameState(state) {
    if (hasPlayerWon(state.squares, state.currentPlayer)) {
        return state.currentPlayer === 'X'
            ? GameState.X_WON
            : GameState.O_WON;
    }

    return GameState.ON_GOING;
}

function hasPlayerWon(squares, currentPlayer) {
    const winningCombinations = [
        [Positions.NORTH_WEST, Positions.NORTH_MIDDLE, Positions.NORTH_EAST],
        [Positions.CENTER_WEST, Positions.CENTER_MIDDLE, Positions.CENTER_EAST],
        [Positions.SOUTH_WEST, Positions.SOUTH_MIDDLE, Positions.SOUTH_EAST],
        [Positions.NORTH_WEST, Positions.CENTER_WEST, Positions.SOUTH_WEST],
        [Positions.NORTH_MIDDLE, Positions.CENTER_MIDDLE, Positions.SOUTH_MIDDLE],
        [Positions.NORTH_EAST, Positions.CENTER_EAST, Positions.SOUTH_EAST],
        [Positions.NORTH_WEST, Positions.CENTER_MIDDLE, Positions.SOUTH_EAST]
    ];
    return winningCombinations.some((winningCombination) => {
        return winningCombination.every((position) => {
            return squares[position] === currentPlayer;
        });
    });
}
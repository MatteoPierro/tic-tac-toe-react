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
        if (this.hasBeenWon(this.state.state)) return;
        if (this.isPositionOccupied(position)) return;

        this.occupyPosition(position);
        this.updateGameState();
        this.updateCurrentPlayer();
    }

    isPositionOccupied(position) {
        return this.state.squares[position] !== "";
    }

    occupyPosition(position) {
        this.setState((state) => {
            const squares = state.squares;
            squares[position] = state.currentPlayer;
            return {
                squares: squares
            };
        })
    }

    updateCurrentPlayer() {
        this.setState( (state) => {
            return {
                currentPlayer: this.nextPlayer(state.currentPlayer, state.state)
            };
        });
    }

    nextPlayer(currentPlayer, gameState) {
        if (this.hasBeenWon(gameState)) return currentPlayer;
        return currentPlayer === 'X'
            ? 'O'
            : 'X';
    }

    hasBeenWon(gameState) {
        return [GameState.X_WON, GameState.O_WON].includes(gameState);
    }

    updateGameState() {
        this.setState((state) => {
            return {
                state: this.nextGameState(state)
            }
        });
    }

    nextGameState(state) {
        if (this.hasPlayerWon(state.squares, state.currentPlayer)) {
            return state.currentPlayer === 'X'
                ? GameState.X_WON
                : GameState.O_WON;
        }

        return GameState.ON_GOING;
    }

    hasPlayerWon(squares, currentPlayer) {
        const winningCombinations = [
            [Positions.NORTH_WEST, Positions.NORTH_MIDDLE, Positions.NORTH_EAST],
            [Positions.CENTER_WEST, Positions.CENTER_MIDDLE, Positions.CENTER_EAST],
            [Positions.SOUTH_WEST, Positions.SOUTH_MIDDLE, Positions.SOUTH_EAST]
        ];
        return winningCombinations.some((winningCombination) => {
            return winningCombination.every((position) => {
                return squares[position] === currentPlayer;
            });
        });
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
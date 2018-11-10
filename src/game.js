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
        if (this.state.state === GameState.X_WON || this.state.state === GameState.O_WON) return;
        if (this.isPositionOccupied(position)) return;
        
        const squares = this.state.squares;
        this.occupyPosition(squares, position);
        const newState = this.nextState(squares);

        this.setState({
            currentPlayer: this.nextPlayer(newState),
            state: newState,
            squares: squares
        });
    }

    isPositionOccupied(position) {
        return this.state.squares[position] !== "";
    }

    occupyPosition(squares, position) {
        squares[position] = this.state.currentPlayer;
    }

    nextPlayer(newState) {
        if (newState === GameState.X_WON || newState === GameState.O_WON) return this.state.currentPlayer;
        return this.state.currentPlayer === 'X'
            ? 'O'
            : 'X';
    }

    nextState(squares) {
        if (this.hasPlayerWon(squares)) {
            return this.state.currentPlayer === 'X'
                    ? GameState.X_WON
                    : GameState.O_WON;
        }

        return GameState.ON_GOING;
    }

    hasPlayerWon(squares) {
        const winningCombination = [Positions.NORTH_WEST, Positions.NORTH_MIDDLE, Positions.NORTH_EAST];
        return winningCombination.every((position) => {
            return squares[position] === this.state.currentPlayer;
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
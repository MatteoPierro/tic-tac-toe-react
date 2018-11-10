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
        if (this.hasBeenWon()) return;
        if (this.isPositionOccupied(position)) return;
        
        this.occupyPosition(position);
        this.updateGameState();
        this.setState({
            currentPlayer: this.nextPlayer()
        });
    }

    isPositionOccupied(position) {
        return this.state.squares[position] !== "";
    }

    occupyPosition(position) {
        const squares = this.state.squares;
        squares[position] = this.state.currentPlayer;
        this.setState({
            squares: squares
        });
    }

    nextPlayer() {
        if (this.hasBeenWon()) return this.state.currentPlayer;
        return this.state.currentPlayer === 'X'
            ? 'O'
            : 'X';
    }

    hasBeenWon() {
        return [GameState.X_WON, GameState.O_WON].includes(this.state.state);
    }

    updateGameState() {
        this.setState({
            state: this.nextState()
        });
    }

    nextState() {
        if (this.hasPlayerWon(this.state.squares)) {
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
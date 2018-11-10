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
        const squares = this.state.squares;
        if (squares[position] !== "") {
            return;
        }
        const currentPlayer = this.state.currentPlayer; 
        squares[position] = currentPlayer;
        const winningCombination = [Positions.NORTH_WEST, Positions.NORTH_MIDDLE, Positions.NORTH_EAST];
        const playerWon = winningCombination.every((position) => {
            return squares[position] === this.state.currentPlayer;
        });
        let state = GameState.ON_GOING;
        if (playerWon) {
            state = currentPlayer === 'X'
                    ? GameState.X_WON
                    : GameState.O_WON;
        }
        this.setState({
            currentPlayer: this.nextPlayer(),
            state: state,
            squares: squares
        });
    }

    nextPlayer() {
        return this.state.currentPlayer === 'X'
            ? 'O'
            : 'X';
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        player={this.state.currentPlayer}
                        squares={this.state.squares}
                        onSquareTaken={this.takeSquare.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
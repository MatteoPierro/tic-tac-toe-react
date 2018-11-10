import React from 'react';
import './index.css';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X',
            squares: Array(9).fill("")
        };
    }

    takeSquare(position) {
        const squares = this.state.squares;
        if (squares[position] !== "") {
            return;
        }
        squares[position] = this.state.currentPlayer;
        this.setState({
            currentPlayer: this.nextPlayer(),
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
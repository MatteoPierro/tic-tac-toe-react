import React from 'react';
import './index.css';
import Board from './board';
import GameStatus from './gameStatus';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStatus: new GameStatus()
        };
    }

    takeSquare(position) {
        this.setState({
            gameStatus: this.state.gameStatus.takeSquare(position)
        })
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        player={this.state.gameStatus.currentPlayer}
                        gameState={this.state.gameStatus.gameState}
                        squares={this.state.gameStatus.squares}
                        onSquareTaken={this.takeSquare.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
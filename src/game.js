import React from 'react';
import './index.css';
import Board from './board';
import GameModel from './gameModel';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: new GameModel()
        };
    }

    takeSquare(position) {
        this.setState({
            model: this.state.model.takeSquare(position)
        })
    }

    render() {
        const model = this.state.model;
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        player={model.currentPlayer}
                        gameState={model.gameState}
                        squares={model.squares}
                        onSquareTaken={this.takeSquare.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
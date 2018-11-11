import React from 'react';
import './index.css';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X'
        };
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board player={this.state.currentPlayer}/>
                </div>
            </div>
        );
    }
}
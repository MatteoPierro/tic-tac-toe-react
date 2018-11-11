import React from 'react';
import './index.css';
import Square from './square';
import Positions from './positions';
import GameState from './gameState';

export default class Board extends React.Component {
    addSquare(position) {
        return <Square
            position={position}
            owner={this.props.squares[position]}
            onClick={this.props.onSquareTaken}
        />;
    }

    render() {
        return (
            <div>
                <div id="status" className="status">
                    {gameStatusMessage(this.props)}
                </div>
                <div className="board-row">
                    {this.addSquare(Positions.NORTH_WEST)}
                    {this.addSquare(Positions.NORTH_MIDDLE)}
                    {this.addSquare(Positions.NORTH_EAST)}
                </div>
                <div className="board-row">
                    {this.addSquare(Positions.CENTER_WEST)}
                    {this.addSquare(Positions.CENTER_MIDDLE)}
                    {this.addSquare(Positions.CENTER_EAST)}
                </div>
                <div className="board-row">
                    {this.addSquare(Positions.SOUTH_WEST)}
                    {this.addSquare(Positions.SOUTH_MIDDLE)}
                    {this.addSquare(Positions.SOUTH_EAST)}
                </div>
            </div>
        );
    }
}

function gameStatusMessage(props) {
    switch (props.gameState) {
        case GameState.DRAW:
            return "DRAW";
        case GameState.X_WON:
        case GameState.O_WON:
            return `${winningPlayer(props.gameState)} wins`;
        default:
            return `Next Player: ${props.player}`;
    }
}

function winningPlayer(gameState) {
    return gameState === GameState.X_WON
        ? "X"
        : "O";
}
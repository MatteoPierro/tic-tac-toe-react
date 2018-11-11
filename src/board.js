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
        let status;
        if (this.props.gameState === GameState.ON_GOING) {
            status = `Next Player: ${this.props.player}`;
        } else if (this.props.gameState === GameState.X_WON) {
            status = "X wins"
        } else if (this.props.gameState === GameState.O_WON) {
            status = "O wins"
        } else if (this.props.gameState === GameState.DRAW) {
            status = "DRAW"
        }

        return (
            <div>
                <div id="status" className="status">{status}</div>
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
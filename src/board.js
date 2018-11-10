import React from 'react';
import './index.css';
import Square from './square';
import Positions from './positions';

export default class Board extends React.Component {
    addSquare(position) {
        return <Square
                    position={position}
                    owner={this.props.squares[position]}
                    onClick={this.props.onSquareTaken}
                />;
    }

    render() {
        const status = `Next Player: ${this.props.player}`;

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
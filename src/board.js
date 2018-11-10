import React from 'react';
import './index.css';
import Square from './square';

export default class Board extends React.Component {
    addSquare() {
        return <Square
                    onClick={this.props.onSquareTaken}
                />;
    }

    render() {
        const status = `Next Player: ${this.props.player}`;

        return (
            <div>
                <div id="status" className="status">{status}</div>
                <div className="board-row">
                    {this.addSquare()}
                    {this.addSquare()}
                    {this.addSquare()}
                </div>
                <div className="board-row">
                    {this.addSquare()}
                    {this.addSquare()}
                    {this.addSquare()}
                </div>
                <div className="board-row">
                    {this.addSquare()}
                    {this.addSquare()}
                    {this.addSquare()}
                </div>
            </div>
        );
    }
}
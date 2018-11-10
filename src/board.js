import React from 'react';
import './index.css';
import Square from './square';

export default class Board extends React.Component {
    addSquare() {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
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
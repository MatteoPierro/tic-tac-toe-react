import React from 'react';
import Board from '../board';
import Position from '../positions';
import GameState from '../gameState';
import Square from '../square';
import positions from '../positions';
import {shallow} from 'enzyme';

describe('Board', () => {
    let board;
    let onSquareTaken;

    beforeEach(() => {
        const squares = Array(9).fill("");
        onSquareTaken = jest.fn();
        board = shallow(<Board 
            player='X'
            gameState={GameState.ON_GOING}
            squares={squares} 
            onSquareTaken={onSquareTaken}/>);
    });

    it('should display the next player', () => {
        assertStatus('Next Player: X');
    });

    it('should show a message when X won', () => {
        board = shallow(<Board 
            gameState={GameState.X_WON}
            squares={[]} />);

        assertStatus('X wins');
    });

    it('should show a message when O won', () => {
        board = shallow(<Board 
            gameState={GameState.O_WON}
            squares={[]} />);

        assertStatus('O wins');
    });

    it('should show a message when draw', () => {
        board = shallow(<Board
            gameState={GameState.DRAW}
            squares={[]} />);

        assertStatus('DRAW');
    });

    it('should create Squares which handle the click on them', () => {
        const square = board.find(Square).first();
        expect(square.props().onClick).toBe(onSquareTaken);
    });

    it('should create Squares with position', () => {
        const square = board.find(Square).first();
        expect(square.props().position).toBe(Position.NORTH_WEST);
    });

    it('should create Squares with an owner', () => {
        const player = 'X';
        board.instance().props.squares[positions.NORTH_WEST] = player;
        board.instance().forceUpdate();

        const square = board.find(Square).first();
        expect(square.props().owner).toBe(player);
    });

    function assertStatus(expectedStatus) {
        const status = board.find('.status');
        expect(status.text()).toBe(expectedStatus);
    }
});
import React from 'react';
import Board from '../board';
import Position from '../positions';
import GameState from '../gameState';
import Square from '../square';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import positions from '../positions';
enzyme.configure({ adapter: new Adapter() });

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
        const status = board.find('.status');

        expect(status.text()).toBe('Next Player: X');
    });

    it('should show a message when X won', () => {
        const board = shallow(<Board 
            gameState={GameState.X_WON}
            squares={[]} />);

        const status = board.find('.status');
        expect(status.text()).toBe('X wins');
    });

    it('should show a message when O won', () => {
        const board = shallow(<Board 
            gameState={GameState.O_WON}
            squares={[]} />);

        const status = board.find('.status');
        expect(status.text()).toBe('O wins');
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
});
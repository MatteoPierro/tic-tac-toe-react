import React from 'react';
import Board from '../board';
import Position from '../positions';
import Square from '../square';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Board', () => {
    let board;
    let onSquareTaken

    beforeEach(() => {
        onSquareTaken = jest.fn();
        board = shallow(<Board player='X' onSquareTaken={onSquareTaken}/>);
    });

    it('should display the next player', () => {
        const status = board.find('.status');

        expect(status.text()).toContain('X');
    });

    it('should create Squares which handle the click on them', () => {
        const square = board.find(Square).first();

        expect(square.props().onClick).toBe(onSquareTaken);
    });

    it('should create Squares with position', () => {
        const square = board.find(Square).first();

        expect(square.props().position).toBe(Position.NORTH_WEST);
    });
});
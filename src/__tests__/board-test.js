import React from 'react';
import Board from '../board';
import Square from '../square';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Board', () => {

    it('should display the next player', () => {
        const board = shallow(<Board player='X'/>);

        const status = board.find('.status');

        expect(status.text()).toContain('X');
    });

    it('should create Squares which handle the click on them', () => {
        const onSquareTaken = jest.fn();
        const board = shallow(<Board player='X' onSquareTaken={onSquareTaken}/>);

        const square = board.find(Square).first();

        expect(square.props().onClick).toBe(onSquareTaken);
    });
});
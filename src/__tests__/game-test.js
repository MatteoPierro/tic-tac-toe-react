import React from 'react';
import Game from '../game';
import Board from '../board';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Game', () => {
    it('should start with X', () => {
        const game = shallow(<Game />);

        expect(game.state().currentPlayer).toBe('X');
    });

    it('should diplay that the first player is X', () => {
        const game = shallow(<Game />);
        
        const board = game.find(Board);

        expect(board.props().player).toBe('X')
    });
});


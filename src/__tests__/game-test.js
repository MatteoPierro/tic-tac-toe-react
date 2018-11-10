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

    it('should allow O to play after X', () => {
        const game = shallow(<Game />);

        game.instance().takeSquare();

        expect(game.state().currentPlayer).toBe('O');
    });

    it('should alternate players', () => {
        const game = shallow(<Game />);

        game.instance().takeSquare();
        game.instance().takeSquare();

        expect(game.state().currentPlayer).toBe('X');
    });

    it('should notify the player to the Board', () => {
        const game = shallow(<Game />);
        
        const board = game.find(Board);

        expect(board.props().player).toBe('X')
    });
});


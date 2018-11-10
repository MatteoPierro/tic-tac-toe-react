import React from 'react';
import Game from '../game';
import Board from '../board';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Game', () => {
    let game;

    beforeEach(() => {
        game = shallow(<Game />);
    })

    it('should start with X', () => {
        assertCurrentPlayer('X');
    });

    it('should allow O to play after X', () => {
        takeSquare();

        assertCurrentPlayer('O');
    });

    it('should alternate players', () => {
        takeSquare();
        takeSquare();

        assertCurrentPlayer('X');
    });

    it('should notify the player to the Board', () => {
        const board = game.find(Board);

        expect(board.props().player).toBe('X')
    });

    it('should create a Board which handle squares', () => {
        const takeSquare = jest.fn();
        game.instance().takeSquare = takeSquare;
        game.instance().forceUpdate();

        const board = game.find(Board);
        board.props().onSquareTaken();

        expect(takeSquare.mock.calls.length).toBe(1)
    });

    function takeSquare() {
        game.instance().takeSquare();
    }

    function assertCurrentPlayer(player) {
        expect(game.state().currentPlayer).toBe(player);
    }
});


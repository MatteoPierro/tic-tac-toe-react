import React from 'react';
import Game from '../game';
import Board from '../board';
import Positions from '../positions';
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
        takeSquare(Positions.NORTH_WEST);

        assertCurrentPlayer('O');
    });

    it('should alternate players', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.NORTH_MIDDLE);

        assertCurrentPlayer('X');
    });

    it('should assign a square to a player', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.NORTH_MIDDLE);

        const squares = game.state().squares;

        expect(squares[Positions.NORTH_WEST]).toBe('X');
        expect(squares[Positions.NORTH_MIDDLE]).toBe('O');
    });

    it('should not assign an occupied square', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.NORTH_WEST);

        const squares = game.state().squares;

        expect(squares[Positions.NORTH_WEST]).toBe('X');
    });

    it('should notify the player to the Board', () => {
        const board = game.find(Board);

        expect(board.props().player).toBe('X')
    });

    it('should create a Board which handles squares', () => {
        const takeSquare = jest.fn();
        game.instance().takeSquare = takeSquare;
        game.instance().forceUpdate();

        const board = game.find(Board);
        board.props().onSquareTaken();

        expect(takeSquare.mock.calls.length).toBe(1)
    });

    it('should create a Board with squares', () => {
        const board = game.find(Board);

        expect(board.props().squares).toBe(game.state().squares);
    });

    function takeSquare(position) {
        game.instance().takeSquare(position);
    }

    function assertCurrentPlayer(player) {
        expect(game.state().currentPlayer).toBe(player);
    }
});


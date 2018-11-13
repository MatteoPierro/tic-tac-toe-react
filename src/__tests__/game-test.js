import React from 'react';
import Game from '../game';
import Board from '../board';
import Positions from '../positions';
import GameState from '../gameState';
import {shallow} from 'enzyme';

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

        const squares = game.state().gameStatus.squares;
        expect(squares[Positions.NORTH_WEST]).toBe('X');
        expect(squares[Positions.NORTH_MIDDLE]).toBe('O');
    });

    it('should not assign an occupied square', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.NORTH_WEST);

        const squares = game.state().gameStatus.squares;
        expect(squares[Positions.NORTH_WEST]).toBe('X');
    });

    it('should say that X wins when takes NW, NM, NE', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_EAST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes CW, CM, CE', () => {
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.CENTER_EAST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes SW, SM, SE', () => {
        takeSquare(Positions.SOUTH_WEST);
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.SOUTH_MIDDLE);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_EAST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes NW, CW, SW', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.SOUTH_MIDDLE);
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_WEST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes NE, CE, SE', () => {
        takeSquare(Positions.NORTH_EAST);
        takeSquare(Positions.SOUTH_MIDDLE);
        takeSquare(Positions.CENTER_EAST);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_EAST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes NM, CM, SM', () => {
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_WEST);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.SOUTH_MIDDLE);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes NW, CM, SE', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.SOUTH_WEST);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_EAST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins when takes NE, CM, SW', () => {
        takeSquare(Positions.NORTH_EAST);
        takeSquare(Positions.SOUTH_EAST);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_WEST);

        assertGameState(GameState.X_WON);
    });

    it('should say that X wins on last move', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.SOUTH_WEST);
        takeSquare(Positions.SOUTH_MIDDLE);
        takeSquare(Positions.CENTER_EAST);
        takeSquare(Positions.NORTH_EAST);
        takeSquare(Positions.SOUTH_EAST);

        assertGameState(GameState.X_WON);
    });

    it('should say that O wins when takes NW, NM, NE', () => {
        takeSquare(Positions.SOUTH_WEST);
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_EAST);

        assertGameState(GameState.O_WON);
    });

    it('should recognise a draw', () => {
        takeSquare(Positions.SOUTH_WEST);
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_EAST);
        takeSquare(Positions.SOUTH_EAST);
        takeSquare(Positions.SOUTH_MIDDLE);
        takeSquare(Positions.CENTER_EAST);
        
        assertGameState(GameState.DRAW);
    });

    it('should not allow to play when the game is won', () => {
        takeSquare(Positions.NORTH_WEST);
        takeSquare(Positions.CENTER_WEST);
        takeSquare(Positions.NORTH_MIDDLE);
        takeSquare(Positions.CENTER_MIDDLE);
        takeSquare(Positions.NORTH_EAST);
        takeSquare(Positions.SOUTH_EAST);

        const gameStatus = game.state().gameStatus; 
        assertGameState(GameState.X_WON);
        expect(gameStatus.squares[Positions.SOUTH_EAST]).toBe('');
        expect(gameStatus.currentPlayer).toBe('X');
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
        expect(board.props().squares).toBe(game.state().gameStatus.squares);
    });

    it('should create a Board with a game status', () => {
        game.state().gameStatus.gameState = GameState.O_WON;
        game.instance().forceUpdate();

        const board = game.find(Board);
        expect(board.props().gameState).toBe(GameState.O_WON);
    });

    function takeSquare(position) {
        game.instance().takeSquare(position);
    }

    function assertCurrentPlayer(player) {
        expect(game.state().gameStatus.currentPlayer).toBe(player);
    }

    function assertGameState(expectedGameState) {
        const state = game.state().gameStatus.gameState; 
        expect(state).toBe(expectedGameState);
    }
});


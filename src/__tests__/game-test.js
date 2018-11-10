import React from 'react';
import Game from '../game';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Game', () => {
    it('should start with X', () => {
        const game = shallow(<Game />);

        expect(game.state().currentPlayer).toBe('X');
    });
});


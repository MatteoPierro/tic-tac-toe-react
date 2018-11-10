import React from 'react';
import Board from '../board';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Board', () => {

    it('should display the next player', () => {
        const game = shallow(<Board player='X'/>);

        const status = game.find('.status');

        expect(status.text()).toContain('X');
    });
});
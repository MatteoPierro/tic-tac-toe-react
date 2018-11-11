import React from 'react';
import Square from '../square';
import Positions from '../positions';
import {shallow} from 'enzyme';

describe('Square', () => {
    it('should call onClick when square is clicked', () => {
        const onClick = jest.fn();
        const square = shallow(<Square
            position={Positions.NORTH_WEST} 
            onClick={onClick}/>);

        square.find('.square').simulate('click')

        expect(onClick.mock.calls.length).toBe(1);
        expect(onClick.mock.calls[0][0]).toBe(Positions.NORTH_WEST);
    });

    it('should display the owner', () => {
        const owner = 'X';
        const square = shallow(<Square owner={owner}/>);

        expect(square.find('.square').text()).toBe(owner);
    });
});
import React from 'react';
import Square from '../square';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('Square', () => {
    it('should call onClick when square is clicked', () => {
        const onClick = jest.fn();
        const square = shallow(<Square onClick={onClick}/>);

        square.find('.square').simulate('click')

        expect(onClick.mock.calls.length).toBe(1);
    });
});
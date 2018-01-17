import React from 'react';
import {Login} from '../../components/Login';
import {shallow} from 'enzyme';

it('should render Login component',()=>{
    const wrapper=shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
})

it('should call startLogin on button click',()=>{
    const startLogin=jest.fn();
    const wrapper=shallow(<Login startLogin={startLogin} />);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
})
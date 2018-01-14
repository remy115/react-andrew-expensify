import React from 'react';
import {AddExpensePage} from '../../components/AddExpensePage';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;
beforeEach(()=>{
    startAddExpense=jest.fn();
    history={push:jest.fn()};
    wrapper=shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

it('render addExpensePage correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});


it('handle submit',()=>{
    const data=expenses[1];
    wrapper.find('ExpenseForm').prop('onSubmit')(data);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(data);
});
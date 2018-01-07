import React from 'react';
import {AddExpensePage} from '../../components/AddExpensePage';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;
beforeEach(()=>{
    addExpense=jest.fn();
    history={push:jest.fn()};
    wrapper=shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

it('render addExpensePage correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});


it('handle submit',()=>{
    const data=expenses[1];
    wrapper.find('ExpenseForm').prop('onSubmit')(data);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(data);
});
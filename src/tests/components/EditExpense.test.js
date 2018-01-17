import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, editExpenseSpy, historySpy, removeExpenseSpy, wrapper;
beforeEach(()=>{
    expense=Object.assign({},expenses[1]);
    editExpenseSpy=jest.fn(()=>({then:cp=>cp()}));
    historySpy={push:jest.fn()}
    removeExpenseSpy=jest.fn(()=>{
        return {then:(cb)=>{}}
    });
    wrapper=shallow(<EditExpensePage expense={expense} startEditExpense={editExpenseSpy} history={historySpy} startRemoveExpense={removeExpenseSpy} />);
})

it('should render EditExpensePage',()=>{
    expect(wrapper).toMatchSnapshot();
});

it('should handle EditExpense',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id,expense);
});

it('should handle removeExpense',()=>{
    wrapper.find('button').simulate('click',{});
    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id:expense.id});
});

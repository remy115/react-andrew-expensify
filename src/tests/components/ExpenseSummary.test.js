import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseSummaryComp} from '../../components/ExpenseSummary';
import getTotalAmount from '../../selectors/expenses-total';

import expenses from '../fixtures/expenses';

let wrapper;
beforeEach(()=>{
    wrapper=shallow(<ExpenseSummaryComp expenseCount={expenses.length} expensesTotal={getTotalAmount(expenses)} />);
});

it('should render ExpenseSummary with more than 1 expense',()=>{
    expect(wrapper).toMatchSnapshot();
});


it('should render ExpenseSummary with just one expense',()=>{
    const wrapper=shallow(<ExpenseSummaryComp expenses={[expenses[1]].length} total={getTotalAmount([expenses[1]])} />);
    expect(wrapper).toMatchSnapshot();
});
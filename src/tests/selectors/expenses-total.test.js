import getTotalExpenses from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

it('should return 0 if no expenses',()=>{
    expect(getTotalExpenses([])).toBe(0);
});

it('should add up a single expense',()=>{
    const total=(expenses[1].amount/100);
    expect(getTotalExpenses(expenses[1])).toBe(total);
});

it('should return the total amount of expenses',()=>{
    const total=(expenses.reduce((accum,curr)=>accum+parseInt(curr.amount),0)/100);
    expect(getTotalExpenses(expenses)).toBe(total);
});
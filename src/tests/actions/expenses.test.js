import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, defaultExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createStore=configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {

  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

it('should add expense to firebase and redux store',(done)=>{
  const store=createStore([]);
  const expense={
    description: 'expense from test 1',
    amount:109500,
    note: 'create from tests',
    createdAt:232349493948
  }
  store.dispatch(startAddExpense(expense))
    .then(ret=>{
      expect(1).toBe(2);
      done();
    });
});

// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   const verifyObj=Object.assign(defaultExpense,{id:expect.any(String)});
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: defaultExpense
//   });
// });

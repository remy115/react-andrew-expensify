import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, defaultExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import {database} from '../../firebase/firebase';

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
      const actions=store.getActions();
      const expected={
        type:'ADD_EXPENSE',
        expense:Object.assign({id:expect.any(String)},expense)
      }
      expect(actions[0]).toEqual(expected);

      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot=>{
      expect(snapshot.val()).toEqual(expense);
      done();
    });
  });
  
it('should add expense to firebase and store with defaults',(done)=>{
  const store=createStore([]);
  store.dispatch(startAddExpense(defaultExpense))
    .then(ret=>{
      const actions=store.getActions();
      const expected={
        type:'ADD_EXPENSE',
        expense:Object.assign({id:expect.any(String)},defaultExpense)
      }
      expect(actions[0]).toEqual(expected);

      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot=>{
      expect(snapshot.val()).toEqual(defaultExpense);
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

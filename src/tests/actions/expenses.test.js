import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, startRemoveExpense, defaultExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
// import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import {database} from '../../firebase/firebase';

const createStore=configureMockStore([thunk]);

const uid='justtestid998';

const baseRef=`users/${uid}/expenses`;
const defaultState={auth:{uid}}

beforeEach((done)=>{
  const expenses2Save={};
  expenses.forEach(elem=>{
    const {id,description,amount,note,createdAt}=elem;
    expenses2Save[id]={description,amount,note,createdAt}
  });
  database.ref(baseRef).set(expenses2Save)
    .then(()=>done());
});

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
  const store=createStore(defaultState);
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

      return database.ref(`${baseRef}/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot=>{
      expect(snapshot.val()).toEqual(expense);
      done();
    });
  });
  
it('should add expense to firebase and store with defaults',(done)=>{
  const store=createStore(defaultState);
  store.dispatch(startAddExpense(defaultExpense))
    .then(ret=>{
      const actions=store.getActions();
      const expected={
        type:'ADD_EXPENSE',
        expense:Object.assign({id:expect.any(String)},defaultExpense)
      }
      expect(actions[0]).toEqual(expected);

      return database.ref(`${baseRef}/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot=>{
      expect(snapshot.val()).toEqual(defaultExpense);
      done();
    });

});


it('should set SET_EXPENSES action object',()=>{
  const action=setExpenses(expenses);
  expect(action).toEqual({
    type:'SET_EXPENSES',
    expenses
  });
});


it('should fetch the expenses from firebase',(done)=>{
  const store=createStore(defaultState);
  store.dispatch(startSetExpenses()).then(()=>{
    const actions=store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_EXPENSES',
      expenses
    });
    done();
  });
});


it('should remove expense from firebase',(done)=>{
  const store=createStore(defaultState);
  const expenseId=expenses[1].id;
  store.dispatch(startRemoveExpense({id:expenseId}))
    .then(()=>{
      const actions=store.getActions();
      expect(actions[0]).toEqual({
        type:'REMOVE_EXPENSE',
        id:expenseId
      });
      return database.ref(`${baseRef}/${expenseId}`).once('value');
    })
    .then((snap)=>{
      expect(snap.val()).toBeNull();
      done();
    });
});

it('should edit expense in firebase',(done)=>{
  const store=createStore(defaultState);
  const id=expenses[1].id;
  const newExpense={
    description:'altered expense',
    amount:99.03,
    createdAt:Date.now(),
    note:'created at now()'
  }
  store.dispatch(startEditExpense(id,newExpense))
    .then(()=>{
      const actions=store.getActions();
      expect(actions[0]).toEqual({
        type:'EDIT_EXPENSE',
        id,
        updates:newExpense
      });
      return database.ref(`${baseRef}/${id}`).once('value')
    })
    .then(snap=>{
      expect(snap.val()).toEqual(newExpense);
      done();
    });
});
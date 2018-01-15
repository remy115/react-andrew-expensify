import uuid from 'uuid';
import {database} from '../firebase/firebase';

// ADD_EXPENSE
export const defaultExpense={
  description:'',
  note:'',
  amount:0,
  createdAt:Date.now()
}
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense=(expense=defaultExpense)=>{
  return (dispatch)=>{
    return database.ref('expenses').push(expense)
      .then((ref)=>{
        return dispatch(addExpense(
          Object.assign({id:ref.key},expense)
        ));
      });
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});


export const setExpenses=(expenses)=>{
  return {
    type:'SET_EXPENSES',
    expenses
  }
}

export const startSetExpenses=(expenses)=>{
  return (dispatch)=>{
    return database.ref('expenses').set(expenses)
      .then(()=>{
        return database.ref('expenses').once('value');
      })
      .then(snap=>{
        const expensesRedux=[];
        snap.forEach(childSnap=>{
          const {description,note,amount,createdAt}=childSnap.val();
          expensesRedux.push({
            id:childSnap.key,
            description,
            note,
            amount,
            createdAt
          });
        });
        return dispatch(setExpenses(expensesRedux));
      });
    }
  }
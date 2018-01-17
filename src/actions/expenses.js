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
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).push(expense)
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
export const startRemoveExpense=({id}={})=>{
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove()
      .then(()=>{
        return dispatch(removeExpense({id}));
      });
  }
}


// EDIT_EXPENSE
export const startEditExpense=(id,updates)=>{
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).set(updates)
      .then(()=>{
        return dispatch(editExpense(id,updates));
      });
  }
}
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});


// LOAD EXPENSES FROM FIREBASE
export const setExpenses=(expenses)=>{
  return {
    type:'SET_EXPENSES',
    expenses
  }
}

export const startSetExpenses=()=>{
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value')
      .then(snap=>{
        const expenses=[];
        snap.forEach(childSnap=>{
          expenses.push(Object.assign({id:childSnap.key},childSnap.val()));
        });
        return dispatch(setExpenses(expenses));
      });
  }
}
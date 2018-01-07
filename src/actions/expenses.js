import uuid from 'uuid';

// ADD_EXPENSE
export const defaultExpense={
  description:'',
  note:'',
  amount:0,
  createdAt:Date.now()
}
export const addExpense = (
  {
    description,
    note,
    amount,
    createdAt
  } = defaultExpense
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

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

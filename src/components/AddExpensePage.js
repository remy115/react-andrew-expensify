import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(expense) => {
        props.startAddExpense(expense);
        props.history.push('/');
      }}
    />
  </div>
);

const mapDispatch2Props=(dispatch)=>{
  return {
    startAddExpense:(expense)=>dispatch(startAddExpense(expense))
  }
}

export default connect(undefined,mapDispatch2Props)(AddExpensePage);

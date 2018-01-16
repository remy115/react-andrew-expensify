import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.editExpense(props.expense.id, expense);
          props.history.push('/');
        }}
      />
      <button onClick={() => {
        props.startRemoveExpense({ id: props.expense.id })
          .then(()=>{

            props.history.push('/');
          });
      }}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatch2Props=(dispatch)=>{
  return {
    editExpense:(id,expense)=>dispatch(editExpense(id, expense)),
    startRemoveExpense:(objId)=>dispatch(startRemoveExpense(objId))
  }
}

export default connect(mapStateToProps,mapDispatch2Props)(EditExpensePage);

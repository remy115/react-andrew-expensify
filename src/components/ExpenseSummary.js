import React from 'react';
import {connect} from 'react-redux';
import filteredExpenses from '../selectors/expenses';
import getTotalAmount from '../selectors/expenses-total';

export const ExpenseSummaryComp=({expenseCount, expensesTotal})=>{
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    return (
        <div>
            <p>Viewing {expenseCount} {expenseWord} totalling ${expensesTotal}</p>
        </div>
    );
}

const mapState2Props=(store)=>{
    const filters=store.filters;
    const filteredExpenses1=filteredExpenses(store.expenses,filters);
    return {
        expenseCount:filteredExpenses1.length,
        expensesTotal:getTotalAmount(filteredExpenses1)
    }
}


export default connect(mapState2Props)(ExpenseSummaryComp);
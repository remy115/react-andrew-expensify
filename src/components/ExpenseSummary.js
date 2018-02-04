import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import filteredExpenses from '../selectors/expenses';
import getTotalAmount from '../selectors/expenses-total';

export const ExpenseSummaryComp=({expenseCount, expensesTotal})=>{
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    return (
        <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{expenseCount}</span> <span>{expenseWord}</span> totalling <span>${expensesTotal}</span></h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
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
import React from 'react';
import { Link } from 'react-router-dom';
import {startLogout} from '../actions/auth';
import {connect} from 'react-redux';

export const Header = ({startLogout}) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard" >
          <h1>Expensify</h1>
        </Link>
        <Link to="/create" activeClassName="is-active">Create Expense</Link>
        <button type="button" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatch2Props=(dispatch)=>{
  return {
    startLogout:()=>dispatch(startLogout())
  }
}

export default connect(null,mapDispatch2Props)(Header);
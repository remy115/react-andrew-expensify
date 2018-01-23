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

        <button type="button" className="button button--link" onClick={startLogout}>Logout</button>
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
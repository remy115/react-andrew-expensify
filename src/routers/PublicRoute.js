import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import ExpenseDashboard from '../components/ExpenseDashboardPage';
import Header from '../components/Header';

export const PublicRoute=(props)=>{
    const {isAuth,component:Component}=props;
    const props2=Object.assign({},props);
    delete props2.isAuth;
    delete props2.component;
    return <Route {...props2} component={(props)=>{
        if(isAuth) {
            return (<Redirect to="/dashboard" />);
        }
        return <Component {...props} />
    }} />
}

const mapState2Props=(state)=>{
    return {
        isAuth:!!state.auth.uid
    }
}

export default connect(mapState2Props)(PublicRoute);
import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import Header from '../components/Header';


export const PrivateRoute=(props)=>{
    const {isAuth,component:Component}=props;
    // console.log({...props});
    // if(isAuth) {
    //     return (
    //         <div>
    //             <Header />
    //             <Component {...props} />
    //         </div>
    //     )
    // }
    // return <Redirect to="/" />
    const props2=Object.assign({},props);
    delete props2.component;
    delete props2.isAuth;
    return <Route {...props2} component={(props)=>{
        if(isAuth) {
            return (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            )
        }
        return <Redirect to="/" />
    }} />
}

const mapState2Props=(state)=>{
    return {
        isAuth: !!state.auth.uid
    }
}

export default connect(mapState2Props)(PrivateRoute);
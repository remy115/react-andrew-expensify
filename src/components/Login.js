import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={
            login:'',
            pass:''
        }        
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if(!this.state.login || !this.state.pass) {
            return alert('Fill login and password!');
        }
    }

    onChange(e) {
        const name=e.target.name;
        const value=e.target.value;

        this.setState(()=>({
            [name]:value
        }))))));
    }

    render() {
        return (
            <div className="box-layout" >
                <div className="box-layout__box">
                    <h2 className="box-layout__title">Expensify</h2>
                    <p>It's time to get your expenses under control</p>
                    <button type="button" className="button" onClick={this.props.startLogin}>Login with Google</button>
                </div>
            </div>
        )
    }
}

const mapDispatch2Props=(dispatch)=>{
    return {
        startLogin:()=>dispatch(startLogin())
    }
}

export default connect(null,mapDispatch2Props)(Login);
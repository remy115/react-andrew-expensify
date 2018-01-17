import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export class Login extends React.Component {
    constructor(props) {
        super(props)
        
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
        }));
    }

    render() {
        return (
            <div>
                <h2>Login here!</h2>
                {
                 (<button type="button" onClick={this.props.startLogin}>Log In</button>)
                    ||
                (<form onSubmit={this.onSubmit}>
                    <div>
                        <label>Login</label>
                        <input type="text" name="login"  />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" name="pass"  />
                    </div>
                </form>)
                }
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
import authReducer from '../../reducers/auth';
import {login,logout} from '../../actions/auth';
it('should return auth state for login correctly',()=>{
    const user={uid:'i21jk2j1k'}
    const state=authReducer({},login(user));
    expect(state).toEqual({
        uid:user.uid
    });
});

it('should return auth state for logout',()=>{
    const state=authReducer({},logout());
    expect(state).toEqual({});
});
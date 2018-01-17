import {login,logout} from '../../actions/auth';

it('should return LOGIN action object',()=>{
    const user={
        uid:'1134kdj'
    }
    expect(login(user)).toEqual({
        type:'LOGIN',
        user:{
            uid:user.uid
        }
    });
});

it('should return LOGOUT action object',()=>{
    expect(logout()).toEqual({
        type:'LOGOUT'
    });
});

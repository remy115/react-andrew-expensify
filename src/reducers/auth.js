
export default (state={},action)=>{
    const type=action.type;
    if(type==='LOGIN') {
        return Object.assign({},action.user);
    } else if(type==='LOGOUT') {
        return {};
    } else {
        return state;
    }
}
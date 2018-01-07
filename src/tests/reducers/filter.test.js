import filterReducer,{filtersReducerDefaultState} from '../../reducers/filters';

it('return default filter state',()=>{
    let result=filterReducer(undefined,{type:'@@INIT'});
    result=Object.assign({},result);
    // result.oi='11';
    // result=null;

    expect(result).toEqual(filtersReducerDefaultState);
});

it('should set sortBy to date',()=>{
    let currentState=Object.assign({},filtersReducerDefaultState);
    currentState.sortBy='amount';
    const state=filterReducer(currentState,{type:'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

it('should set text filter',()=>{
    const text='oioi';
    const state=filterReducer(undefined,{type:'SET_TEXT_FILTER',text});
    expect(state.text).toBe(text);
});

it('should set sortBy to amount',()=>{
    const state=filterReducer(undefined,{type:'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

it('should set startDate',()=>{
    const startDate=14502900;
    const state=filterReducer(undefined,{type:'SET_START_DATE',startDate});
    expect(state.startDate).toBe(startDate);
});

it('should set endDate',()=>{
    const endDate=14502900;
    const state=filterReducer(undefined,{type:'SET_END_DATE',endDate});
    expect(state.endDate).toBe(endDate);
});
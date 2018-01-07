import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters,filters2} from '../fixtures/filters';


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(()=>{
    setTextFilter=jest.fn();
    sortByDate=jest.fn();
    sortByAmount=jest.fn();
    setStartDate=jest.fn();
    setEndDate=jest.fn();
    const objArg={
        setTextFilter,
        sortByDate,
        sortByAmount,
        setStartDate,
        setEndDate
    }


    wrapper=shallow(<ExpenseListFilters filters={filters} {...objArg} />);
});

it('should render ExpenseListFilters',()=>{
    expect(wrapper).toMatchSnapshot();
});


it('should render ExpenseListFilters with not default filters',()=>{
    wrapper.setProps({
        filters:filters2
    });
    expect(wrapper).toMatchSnapshot();
});


it('handle text change',()=>{
    wrapper.find('input[name="text"]').simulate('change',{target:{value:'bills22'}});
    expect(setTextFilter).toHaveBeenLastCalledWith('bills22');
});


it('should sort by date',()=>{
    wrapper.find('select').simulate('change',{target:{value:'date'}});
    expect(sortByDate).toHaveBeenCalledTimes(1);
    expect(sortByAmount).toHaveBeenCalledTimes(0);
});

it('should sort by amount',()=>{
    wrapper.find('select').simulate('change',{target:{value:'amount'}});
    expect(sortByAmount).toHaveBeenCalledTimes(1);
    expect(sortByDate).toHaveBeenCalledTimes(0);
});

it('should handle date change',()=>{
    const objDates={startDate:filters.startDate,endDate:filters.endDate};
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(objDates);
    expect(setStartDate).toHaveBeenCalledWith(objDates.startDate);
    expect(setEndDate).toHaveBeenCalledWith(objDates.endDate);
});

it('should handle date focus change',()=>{
    const focus="endDate";
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focus);
    expect(wrapper.state('calendarFocused')).toBe(focus);
})
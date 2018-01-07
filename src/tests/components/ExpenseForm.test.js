import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});


it('should render error for invalid form submission',()=>{
  const wrapper=shallow(<ExpenseForm  />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit',{
    preventDefault:()=>{}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(5);
  expect(wrapper).toMatchSnapshot();

});


it('should set description on input change',()=>{
  const description='description here! 4343';
  const wrapper=shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change',{
    target:{value:description}
  });
  expect(wrapper.state('description')).toBe(description);
});


it('should change note state on textarea change',()=>{
  const value='note changed here!';
  const wrapper=shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change',{
    target:{value}
  });
  expect(wrapper.state('note')).toBe(value);
});

it('should set amount if data is valid',()=>{
  const wrapper=shallow(<ExpenseForm />);
  const value='23.25';
  wrapper.find('input[name="amount"]').simulate('change',{
    target:{value}
  });

  expect(wrapper.state('amount')).toBe(value);
});

it('should not amount if data is invalid',()=>{
  const wrapper=shallow(<ExpenseForm />);
  const value='23.883';
  wrapper.find('input[name="amount"]').simulate('change',{target:{value}});
  expect(wrapper.state('amount')).toBe('');
});


it('should call onSubmit prop for valid form submission',()=>{
  const onSubmitSpy=jest.fn();
  let expense2=Object.assign({},expenses[1]);
  const wrapper=shallow(<ExpenseForm expense={expense2} onSubmit={onSubmitSpy} />);

  wrapper.find('form').simulate('submit',{
    preventDefault:()=>true
  });
  delete expense2.id;
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenCalledWith(expense2);
});


it('should set new date on date change',()=>{
  const wrapper=shallow(<ExpenseForm />);
  const now=moment(Date.now());
  // const now2=moment(Date.now()).add(2,'days');
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

it('should set calendarFocused on focus change',()=>{
  const wrapper=shallow(<ExpenseForm />);
  const focused=true;
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
  expect(wrapper.state('calendarFocused')).toBe(focused);
});
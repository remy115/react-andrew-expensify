import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';


export class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      calendarFocused: null

    }
    this.onDatesChange=this.onDatesChange.bind(this);
    this.onFocusChange=this.onFocusChange.bind(this);

    // console.log('props.filters',props.filters);
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="text"
          value={this.props.filters.text}
          onChange={(e) => {
            this.props.setTextFilter(e.target.value);
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={(e) => {
            if (e.target.value === 'date') {
              this.props.sortByDate();
            } else if (e.target.value === 'amount') {
              this.props.sortByAmount();
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId="start"
          endDate={this.props.filters.endDate}
          endDateId="end"
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatch2Props=(dispatch)=>({
  setStartDate:(startDate)=>dispatch(setStartDate(startDate)),
  setEndDate:(endDate)=>dispatch(setEndDate(endDate)),
  setTextFilter:(text)=>dispatch(setTextFilter(text)),
  sortByDate:()=>dispatch(sortByDate()),
  sortByAmount:()=>dispatch(sortByAmount())
})

export default connect(mapStateToProps,mapDispatch2Props)(ExpenseListFilters);

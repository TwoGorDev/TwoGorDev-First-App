// imports
import { forwardRef, useContext } from 'react';

// styles
import './dateSelector.css'
import 'react-datepicker/dist/react-datepicker.css'

// components
import DatePicker from 'react-datepicker';

// utilites
import getFormattedDate from '../../utilities/getFormattedDate';
import { SummaryContext } from '../../contexts/SummaryContext';

export default function DateSelector({ date, setSearchParams }) {
  const { setDate } = useContext(SummaryContext);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="date-selector" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  const handleDateChange = (date) => {
    setSearchParams({ date: getFormattedDate(date) });
    setDate(getFormattedDate(date));
  }

  return (
    <DatePicker
      dateFormat="dd / MM / yyyy"
      selected={date}
      onChange={(date) => handleDateChange(date)}
      customInput={<CustomInput />}
      withPortal
    />
  )
}
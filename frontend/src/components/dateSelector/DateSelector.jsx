// styles
import './dateSelector.css'
import 'react-datepicker/dist/react-datepicker.css'

// components
import DatePicker from 'react-datepicker';

// utilites
import { forwardRef, useContext } from 'react';
import getFormattedDate from '../../utilities/getFormattedDate';
import { SummaryContext } from '../../contexts/SummaryContext';

export default function DateSelector({ date, setSearchParams }) {
  const { date: urlDate, setDate, setSummary } = useContext(SummaryContext);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="date-selector" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  const handleDateChange = (val) => {
    let date = getFormattedDate(val)

    if (date === urlDate) {
      return
    }

    setSummary([]);
    setSearchParams({ date });
    setDate(date);
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
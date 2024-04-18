// imports
import { forwardRef } from 'react';

// styles
import './dateSelector.css'
import 'react-datepicker/dist/react-datepicker.css'

// components
import DatePicker from 'react-datepicker';

// utilites
import getFormattedDate from '../../utilities/getFormattedDate';

export default function DateSelector({ date, setDate }) {

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="date-selector" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  return (
    <DatePicker
      dateFormat="dd / MM / yyyy"
      selected={date}
      onChange={(date) => setDate(getFormattedDate(date))}
      customInput={<CustomInput />}
      withPortal
    />
  )
}
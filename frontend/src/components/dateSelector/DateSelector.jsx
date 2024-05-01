// Styles
import './dateSelector.css'
import 'react-datepicker/dist/react-datepicker.css'

// Components, Icons & Images
import DatePicker from 'react-datepicker';

// Utilities & Hooks
import { forwardRef, useContext } from 'react';
import getFormattedDate from '../../utilities/getFormattedDate';

// Contexts
import { SummaryContext } from '../../contexts/SummaryContext';

export default function DateSelector({ date, setSearchParams }) {
  // External logic/state
  const { date: urlDate, setDate, setSummary } = useContext(SummaryContext);

  // Custom date selector interface
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="date-selector" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  // Date change functionality
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
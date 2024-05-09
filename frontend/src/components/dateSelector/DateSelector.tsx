// Styles
import './dateSelector.css'
import 'react-datepicker/dist/react-datepicker.css'

// Components, Icons & Images
import DatePicker from 'react-datepicker';

// Utilities & Hooks
import { SetStateAction, forwardRef, useContext } from 'react';
import getFormattedDate from '../../utilities/getFormattedDate';

// Contexts
import { SummaryContext } from '../../contexts/SummaryContext';

// Types
import { SummaryContextType } from '../../types/types';

export default function DateSelector({ date, setSearchParams } : { date: string, setSearchParams: React.Dispatch<SetStateAction<{}>>}) {
  // External logic/state
  const { date: urlDate, setDate, setSummary } = useContext(SummaryContext) as SummaryContextType;

  // Custom date selector interface
  const CustomInput = forwardRef(({ value, onClick } : {value?: string, onClick?: () => void}, ref: any) => (
    <button className="date-selector" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  // Date change functionality
  const handleDateChange = (val: Date) => {
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
      value={date.replaceAll('-', ' / ')}
      selected={new Date(date)}
      onChange={(date: Date) => {console.log(date); handleDateChange(date)}}
      customInput={<CustomInput />}
      withPortal
    />
  )
}
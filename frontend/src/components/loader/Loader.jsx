// styles
import './Loader.css';

// components
import { GridLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className='loader-container'>
      <GridLoader
        size='25px'
        color='var(--primary-color)'
      />
    </div>
  )
}
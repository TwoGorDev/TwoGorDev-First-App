// styles
import './Loader.css';

// components
import { GridLoader } from 'react-spinners';

export default function Loader({ style }) {
  return (
    <div className='loader-container' style={style}>
      <GridLoader
        size='25px'
        color='var(--primary-color)'
      />
    </div>
  )
}
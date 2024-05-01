// Styles
import './Loader.css';

// Components, Icons & Images
import { GridLoader } from 'react-spinners';

export default function Loader({ style, size, color }) {
  return (
    <div className='loader-container' style={style}>
      <GridLoader
        size={size}
        color={color ? color : 'var(--primary-color)'}
      />
    </div>
  )
}
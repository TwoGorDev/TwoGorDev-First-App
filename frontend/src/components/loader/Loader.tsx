// Styles
import { CSSProperties } from 'react';
import './Loader.css';

// Components, Icons & Images
import { GridLoader } from 'react-spinners';

// Types
type LoaderProps = {
  style?: CSSProperties
  size?: string
  color?: string
}

export default function Loader({ style, size, color }: LoaderProps) {
  return (
    <div className='loader-container' style={style}>
      <GridLoader
        size={size}
        color={color ? color : 'var(--primary-color)'}
      />
    </div>
  )
}
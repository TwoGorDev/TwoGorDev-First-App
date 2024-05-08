// Utilities & Hooks
import { useState, useEffect } from 'react';

export default function useDebounce(value : any, delay : number) {
  // Local logic/state
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)

    return () => clearTimeout(timeout);

  }, [value, delay])

  return debouncedValue;
}
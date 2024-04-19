// Imports
import axios from 'axios';
import { useState } from 'react';

// Get userToken from local storage - if it doesnt exist, set it to an empty string
const userToken = JSON.parse(localStorage.getItem('user-token')) || '';

export default function useDataApi() {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);

  const getData = async (endpoint) => {
    try {
      setIsPending(true);
      setError('');

      const res = await axios.get(
        `http://localhost:4000${endpoint}`,
        { headers: {'Authorization': `Bearer ${userToken}`} }
      )

      setData(res.data);
    } catch(error) {
      console.log(error)
      error.response && setError(error.response.data.error)
      !error.response && setError(error.message)
    } finally {
      setIsPending(false);
    }
  }

  const postData = async (endpoint, body) => {
    try {
      await axios.post(
        `http://localhost:4000${endpoint}`,
        body,
        { headers: {'Authorization': `Bearer ${userToken}`} }
      )
      
      setData(res.data);
    } catch(error) {
      console.log(error)
      error.response && setError(error.response.data.error)
      !error.response && setError(error.message)
    } finally {
      setIsPending(false);
    }
  }

  return { isPending, error, data, getData, postData }
}
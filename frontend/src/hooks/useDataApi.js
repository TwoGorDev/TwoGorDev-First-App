// Imports
import axios from 'axios';
import { useState } from 'react';

const userToken = JSON.parse(localStorage.getItem('user-token')) || '';

export default function useDataApi() {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState();

  const getData = async (endpoint) => {
    setIsPending(true);
    setError('');

    await axios.get(
      `http://localhost:4000${endpoint}`,
      { headers: {'Authorization': `Bearer ${userToken}`} }
    )
    .then(res => setData(res.data))
    .catch(error => {
      console.error(error);

      if (error.response) {
        setError(error.response.data.error);
      }
      else {
        setError(error.message);
      }
    })
    .finally(() => setIsPending(false))
  }

  const postData = async (endpoint, body) => {
    setIsPending(true);
    setError('');
    
    await axios.post(
      `http://localhost:4000${endpoint}`,
      body,
      { headers: {'Authorization': `Bearer ${userToken}`} }
    )
    .then(res => setData(res.data))
    .catch(error => {
      console.error(error);

      if (error.response) {
        setError(error.response.data.error);
      }
      else {
        setError(error.message);
      }
    })
    .finally(() => setIsPending(false))
  }

  return { error, isPending, data, getData, postData }
}
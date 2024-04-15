// Imports
import axios from 'axios';
import { useState } from 'react';

export default function useDataApi(endpoint, body) {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState();
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTcxMzE4NjkzMiwiZXhwIjoxNzE1Nzc4OTMyfQ._O4AqurNGBaMfLlO8-HYBKLtZq1YtxdQqgg2NR7rzsM';

  const getData = async () => {
    setIsPending(true);
    setError('');

    await axios.get(
      `http://localhost:4000/${endpoint}`,
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

  const postData = async () => {
    await axios.post(
      `http://localhost:4000/${endpoint}`,
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
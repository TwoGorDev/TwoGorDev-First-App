// utilities
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserAuthContext } from '../contexts/UserAuthContext';

export default function useDataApi() {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { userToken } = useContext(UserAuthContext);

  const getData = async (endpoint) =>{
    setIsPending(true);
    setError('');

    try {
      const res = await axios.get(
        encodeURI(`http://localhost:4000${endpoint}`),
        { headers: {'Authorization': `Bearer ${userToken}`} }
      );

      return res.data;

    } catch(error) {
      console.log(error)
      error.response && setError(error.response.data.error);
      !error.response && setError(error.message);
    } finally {
      setIsPending(false);
    }
  }

  const postData = async (endpoint, body) => {
    setIsPending(true);
    setError('');

    try {
      const res = await axios.post(
        encodeURI(`http://localhost:4000${endpoint}`),
        body,
        { headers: {'Authorization': `Bearer ${userToken}`} }
      );
      
      return res.data;
      
    } catch(error) {
      console.log(error)
      error.response && setError(error.response.data.error);
      !error.response && setError(error.message);
    } finally {
      setIsPending(false);
    }
  }

  const patchData = async (endpoint, body) => {
    setIsPending(true);
    setError('');

    try {
      const res = await axios.patch(
        encodeURI(`http://localhost:4000${endpoint}`),
        body,
        { headers: {'Authorization': `Bearer ${userToken}`} }
      );

      return res.data;

    } catch(error) {
      console.log(error)
      error.response && setError(error.response.data.error);
      !error.response && setError(error.message);
    } finally {
      setIsPending(false);
    }
  }

  return { isPending, error, getData, postData, patchData }
}
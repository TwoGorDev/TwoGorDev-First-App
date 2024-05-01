// Utilities & Hooks
import axios from 'axios';
import { useContext, useState } from 'react';

// Contexts
import { UserAuthContext } from '../contexts/UserAuthContext';

export default function useDataApi() {
  // External logic/state
  const { user } = useContext(UserAuthContext);

  // Local logic/state
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  // HTTP GET request logic
  const getData = async (endpoint) =>{
    setIsPending(true);
    setError('');

    try {
      const res = await axios.get(
        encodeURI(import.meta.env.VITE_SERVER_URI + endpoint),
        { headers: {'Authorization': `Bearer ${user.token}`} }
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

  // HTTP POST request logic
  const postData = async (endpoint, body) => {
    setIsPending(true);
    setError('');

    try {
      const res = await axios.post(
        encodeURI(import.meta.env.VITE_SERVER_URI + endpoint),
        body,
        { headers: {'Authorization': `Bearer ${user.token}`} }
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

  // HTTP PATCH request logic
  const patchData = async (endpoint, body) => {
    setIsPending(true);
    setError('');

    try {
      const res = await axios.patch(
        encodeURI(import.meta.env.VITE_SERVER_URI + endpoint),
        body,
        { headers: {'Authorization': `Bearer ${user.token}`} }
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

  // HTTP DELETE request logic
  const deleteData = async (endpoint) => {
    setIsPending(true);
    setError('');

    try {
      const res = await axios.delete(
        encodeURI(import.meta.env.VITE_SERVER_URI + endpoint),
        { headers: {'Authorization': `Bearer ${user.token}`} }
      )

      return res.data;

    } catch(error) {
      console.log(error)
      error.response && setError(error.response.data.error);
      !error.response && setError(error.message);
    } finally {
      setIsPending(false);
    }
  }

  return { isPending, error, setError, getData, postData, patchData, deleteData }
}
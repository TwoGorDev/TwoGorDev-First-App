// Utilities & Hooks
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import getFormattedDate from '../utilities/getFormattedDate';
import useDataApi from './useDataApi';

// Contexts
import { UserAuthContext } from '../contexts/UserAuthContext';

export default function useLogout() {
  // External logic/state
  const { setUser, setIsLoggedIn } = useContext(UserAuthContext);
  const { error, isPending, postData } = useDataApi();
  const navigate = useNavigate();

  // Local logic/state
  const today = getFormattedDate(new Date());

  // Login functionality
  const login = async (username, password) => {
    const user = await postData('/login', {
      username,
      password
    })
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      navigate(`/dashboard?date=${today}`);
    }
  };

  // Signup functionality
  const signup = async (username, password, email) => {
    const user = await postData('/signup', {
      username,
      password,
      email
    })

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      navigate('/dashboard/calculator');
    }
  }
  
  // Logout functionality
  const logout = () => {
    localStorage.removeItem('user');
    setUser({});
    setIsLoggedIn(false);
    navigate('/');
  }

  return { error, isPending, login, signup, logout }
}
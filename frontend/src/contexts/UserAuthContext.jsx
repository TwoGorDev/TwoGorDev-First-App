// utilities
import { createContext, useEffect, useState } from "react";

export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem('user-token')) || '';
    const localUsername = JSON.parse(localStorage.getItem('username')) || '';
    setUserToken(localToken);
    setUsername(localUsername);
  }, []);

  return (
    <UserAuthContext.Provider value={{ userToken, setUserToken, username, setUsername }}>
      {children}
    </UserAuthContext.Provider>
  )
}
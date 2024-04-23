// utilities
import { createContext, useEffect, useState } from "react";

export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('');

  // useEffect(() => {
  //   const localToken = JSON.parse(localStorage.getItem('user-token')) || '';
  //   setUserToken(localToken)
  // }, []);

  return (
    <UserAuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserAuthContext.Provider>
  )
}
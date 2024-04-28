// utilities
import { createContext, useEffect, useState } from "react";

export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user')) || {};

    if (Object.keys(localUser).length > 0) {
      setUser(localUser);
    }
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  )
}
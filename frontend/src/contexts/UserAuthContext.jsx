// Utilities & Hooks
import { createContext, useEffect, useState } from "react";

export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  // Local logic/state
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Log the user back in if he didn't logout during previous session
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user')) || {};

    if (Object.keys(localUser).length > 0) {
      setUser(localUser);
      setIsLoggedIn(true);
    }

  }, []);

  return (
    <UserAuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserAuthContext.Provider>
  )
}
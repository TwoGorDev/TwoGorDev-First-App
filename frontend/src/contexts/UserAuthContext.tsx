// Utilities & Hooks
import { createContext, useEffect, useState } from "react";

// Types
import { User, UserAuthContextType } from '../types/types';

// Context
export const UserAuthContext = createContext<undefined | UserAuthContextType>(undefined);

// Context Provider
export const UserAuthContextProvider = ({children} : {children: React.ReactNode}) => {
  // Local logic/state
  const [user, setUser] = useState<User>({
    avatar_url: '',
    bio: '',
    email: '',
    role: '',
    created_at: '',
    updated_at: '',
    token: '',
    username: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Log the user back in if he didn't logout during previous session
  useEffect(() => {
    const localUser = JSON.parse(String(localStorage.getItem('user'))) || {};

    if (Object.values(localUser).length > 0) {
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
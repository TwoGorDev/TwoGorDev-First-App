// Utilities & Hooks
import { createContext, useState, useEffect, useContext } from "react";
import getFormattedDate from '../utilities/getFormattedDate';
import useDataApi from "../hooks/useDataApi";

// Contexts
import { UserAuthContext } from "./UserAuthContext";

// Types
import { UserAuthContextType, SummaryContextType, Portion, DailyGoal } from "../types/types";

// Context
export const SummaryContext = createContext<undefined | SummaryContextType>(undefined);

// Context Provider
export const SummaryContextProvider = ({children} : {children : React.ReactNode}) => {
  // External logic/state
  const { isPending, error, getData } = useDataApi();
  const { isLoggedIn } = useContext(UserAuthContext) as UserAuthContextType;
  const url = window.location.href;

  // Local logic/state
  const urlDate = url.split('=')[1];
  const today = getFormattedDate(new Date());
  const [date, setDate] = useState(urlDate || today);
  const [summary, setSummary] = useState<[Portion[] | [], DailyGoal] | []>([]);
  
  // Fetch summary from the server if user is logged in
  useEffect(() => {
		const fetch = async () => {
			const data = await getData(`/daily-summary/${date}`);
			setSummary(data);
		}

    if (summary.length === 0 && isLoggedIn) {
      fetch()
    }
	}, [summary, date, urlDate, isLoggedIn]);

  return (
    <SummaryContext.Provider value={{ isPending, error, summary, setSummary, date, setDate }}>
      {children}
    </SummaryContext.Provider>
  )
}
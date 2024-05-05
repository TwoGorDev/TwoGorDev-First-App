// Utilities & Hooks
import { createContext, useState, useEffect, useContext } from "react";
import getFormattedDate from '../utilities/getFormattedDate';
import useDataApi from "../hooks/useDataApi";

// Contexts
import { UserAuthContext } from "./UserAuthContext";

export const SummaryContext = createContext();

export const SummaryContextProvider = ({ children }) => {
  // External logic/state
  const { isPending, error, getData } = useDataApi();
  const { isLoggedIn } = useContext(UserAuthContext);
  const url = window.location.href;

  // Local logic/state
  const urlDate = url.split('=')[1];
  const today = getFormattedDate(new Date());
  const [date, setDate] = useState(urlDate || today);
  const [summary, setSummary] = useState([]);
  
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
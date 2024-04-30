// utilities
import { createContext, useState, useEffect, useContext } from "react";
import getFormattedDate from '../utilities/getFormattedDate';
import useDataApi from "../hooks/useDataApi";
import { UserAuthContext } from "./UserAuthContext";

export const SummaryContext = createContext();

export const SummaryContextProvider = ({ children }) => {
  // Outside states
  const { isPending, error, getData } = useDataApi();
  const { isLoggedIn } = useContext(UserAuthContext);
  const url = window.location.href;

  // Local states
  const urlDate = url.split('=')[1];
  const today = getFormattedDate(new Date());
  const [date, setDate] = useState(urlDate || today);
  const [summary, setSummary] = useState([]);
  
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
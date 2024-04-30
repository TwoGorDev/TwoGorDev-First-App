// utilities
import { createContext, useState, useEffect, useContext } from "react";
import getFormattedDate from '../utilities/getFormattedDate';
import useDataApi from "../hooks/useDataApi";
import { UserAuthContext } from "./UserAuthContext";

export const SummaryContext = createContext();

export const SummaryContextProvider = ({ children }) => {
  // Outside states
  const { isPending, error, getData } = useDataApi();
  const { user } = useContext(UserAuthContext);
  const url = window.location.href;

  // Local states
  const urlDate = url.split('=')[1];
  const today = getFormattedDate(new Date());
  const [date, setDate] = useState(urlDate || today);
  const [summary, setSummary] = useState([]);
  const isLoggedIn = Object.keys(user).length > 0;
  
  useEffect(() => {
		const fetch = async () => {
			const data = await getData(`/daily-summary/${date}`);
			setSummary(data);
		}

		isLoggedIn && fetch();
	}, [date, urlDate, isLoggedIn]);

  return (
    <SummaryContext.Provider value={{ isPending, error, summary, date, setDate }}>
      {children}
    </SummaryContext.Provider>
  )
}
import { NavLink, Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';

// styles
import './DashboardLayout.css';

export default function DashboardLayout() {
	const [calculatorData, setCalculatorData] = useState(null);

	return (
		<>
			<nav className='dashboard-nav'>
				<NavLink className='dashboard-nav-link' to='.' end>
					Dashboard
				</NavLink>
				<NavLink className='dashboard-nav-link' to='products'>
					Products
				</NavLink>
				<NavLink className='dashboard-nav-link' to='calculator'>
					Calculator
				</NavLink>
			</nav>
			<DashboardContext.Provider value={{ calculatorData, setCalculatorData }}>
				<Outlet />
			</DashboardContext.Provider>
		</>
	);
}

export const DashboardContext = createContext();

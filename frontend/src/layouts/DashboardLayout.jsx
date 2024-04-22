// styles
import './DashboardLayout.css';

// utilites
import { NavLink, Outlet } from 'react-router-dom';
import getFormattedDate from '../utilities/getFormattedDate';

export default function DashboardLayout() {

	return (
		<>
			<nav className='dashboard-nav'>
				<NavLink className='dashboard-nav-link' to={`/dashboard/${getFormattedDate(new Date())}`} end>
					Dashboard
				</NavLink>
				<NavLink className='dashboard-nav-link' to='products'>
					Products
				</NavLink>
				<NavLink className='dashboard-nav-link' to='calculator'>
					Calculator
				</NavLink>
			</nav>
			<Outlet />
		</>
	);
}

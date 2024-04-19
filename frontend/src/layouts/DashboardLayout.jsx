import { NavLink, Outlet } from 'react-router-dom';

// styles
import './DashboardLayout.css';

export default function DashboardLayout() {
	return (
		<div className='dashboard-nav-container'>
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
			<Outlet />
		</div>
	);
}

// styles
import './DashboardLayout.css';

// utilites
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SummaryContext } from '../contexts/SummaryContext';

export default function DashboardLayout() {
	const { date } = useContext(SummaryContext);
	const location = useLocation();
	const [dashboardNavMobileActive, setDashboardNavMobileActive] = useState(false);

	let dashboardNavText = 'Dashboard';
	if (location.pathname === '/dashboard/products') {
		dashboardNavText = 'Products';
	} else if (location.pathname === '/dashboard/calculator') {
		dashboardNavText = 'Calculator';
	}
	return (
		<div className='dashboard-nav-container'>
			<nav
				className={`dashboard-nav ${
					dashboardNavMobileActive ? 'mobile-active' : ''
				}`}>
				<div className='nav-headings-container dashboard-nav-headings'>
					<div className='dashboard-logo-container'>
						<div className='dashboard-nav-text'>{dashboardNavText}</div>
					</div>

					<div
						className='hamburger'
						onClick={() =>
							setDashboardNavMobileActive((prevState) => !prevState)
						}>
						<div className='hamburger-line'></div>
						<div className='hamburger-line'></div>
						<div className='hamburger-line'></div>
					</div>
				</div>
				<div className='nav-links'>
					<NavLink
						onClick={() => setDashboardNavMobileActive(false)}
						className={`dashboard-nav-link ${
							location.pathname === `/dashboard` ? 'hide-on-mobile' : ''
						}`}
						to={`/dashboard?date=${date}`}
						end
					>
						Dashboard
					</NavLink>
					<NavLink
						onClick={() => setDashboardNavMobileActive(false)}
						className={`dashboard-nav-link ${
							location.pathname === '/dashboard/products'
								? 'hide-on-mobile'
								: ''
						}`}
						to='products'>
						Products
					</NavLink>
					<NavLink
						onClick={() => setDashboardNavMobileActive(false)}
						className={`dashboard-nav-link ${
							location.pathname === '/dashboard/calculator'
								? 'hide-on-mobile'
								: ''
						}`}
						to='calculator'>
						Calculator
					</NavLink>
				</div>
			</nav>
			<Outlet />
		</div>
	);
}

// Styles
import './Navbar.css';

// Utilities & Hooks
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import useUserAuth from '../../hooks/useUserAuth';

// Contexts
import { SummaryContext } from '../../contexts/SummaryContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';

// Types
import { UserAuthContextType, SummaryContextType } from '../../types/types';

export default function Navbar() {
	// External logic/state
	const { isLoggedIn } = useContext(UserAuthContext) as UserAuthContextType;
	const { date } = useContext(SummaryContext) as SummaryContextType;
	const { logout } = useUserAuth();
	const { pathname } = useLocation();

	// Local logic/state
	const [navMobileActive, setNavMobileActive] = useState(false);
	const [dropdownActive, setDropdownActive] = useState(false);

	const navClass = ['/', '/register', '/login'].includes(pathname)
		? 'home-nav'
		: 'nav';

	return (
		<nav className={`${navClass} ${navMobileActive ? 'mobile-active' : ''}`}>
			<div className='nav-headings-container'>
				<div className='logo'>
					<Link
						onClick={() => setNavMobileActive(false)}
						className='logo-link'
						to='/'>
						HealThyBody
					</Link>
				</div>

				<div
					className='hamburger'
					onClick={() => setNavMobileActive((prevState) => !prevState)}>
					<div className='hamburger-line'></div>
					<div className='hamburger-line'></div>
					<div className='hamburger-line'></div>
				</div>
			</div>

			<ul className='nav-list wrapper'>
				{isLoggedIn ? (
					<>
						<li>
							<NavLink
								onClick={() => setNavMobileActive(false)}
								className={`nav-link ${
									pathname.startsWith('/dashboard') ? 'active' : ''
								}`}
								to={`/dashboard?date=${date}`}>
								Dashboard
							</NavLink>
						</li>

						<li
							className='dropdown-show-list-link'
							onMouseEnter={() => setDropdownActive(true)}
							onMouseLeave={() => setDropdownActive(false)}>
							<NavLink
								onClick={() => {
									setNavMobileActive(false);
									setDropdownActive(false);
								}}
								className={`nav-link ${
									pathname.startsWith('/account') ? 'active' : ''
								}`}
								to='/account/profile'>
								Account
							</NavLink>

							<ul
								className={`dropdown-list ${
									dropdownActive ? 'dropdown-active' : ''
								}`}>
								<li>
									<NavLink
										onClick={() => setDropdownActive(false)}
										className='dropdown-link'
										to='account/profile'>
										Profile
									</NavLink>
								</li>
								<li>
									<NavLink
										onClick={() => setDropdownActive(false)}
										className='dropdown-link'
										to='account/contactus'>
										Contact Us
									</NavLink>
								</li>
								<li>
									<NavLink
										onClick={() => setDropdownActive(false)}
										className='dropdown-link'
										to='account/settings'>
										Settings
									</NavLink>
								</li>
								<li>
									<NavLink
										onClick={() => {
											setDropdownActive(false);
											logout();
										}}
										className='dropdown-link'
										to='/'>
										Logout
									</NavLink>
								</li>
							</ul>
						</li>
						<li>
							<NavLink
								onClick={() => {
									setDropdownActive(false);
									logout();
								}}
								className='nav-link logout-nav-link'
								to='/'>
								Logout
							</NavLink>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink
								onClick={() => setNavMobileActive(false)}
								className='nav-link'
								to='/register'>
								Register
							</NavLink>
						</li>
						<li>
							<NavLink
								onClick={() => setNavMobileActive(false)}
								className='nav-link'
								to='/login'>
								Login
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

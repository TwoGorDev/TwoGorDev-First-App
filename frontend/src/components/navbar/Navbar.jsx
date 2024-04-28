// styles
import './Navbar.css';

// utilities
import getFormattedDate from '../../utilities/getFormattedDate';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';

export default function Navbar() {
	const { userToken, setUserToken, username, setUsername } =
		useContext(UserAuthContext);
	const [navMobileActive, setNavMobileActive] = useState(false);
	const [dropdownActive, setDropdownActive] = useState(false);

	const { pathname } = useLocation();
	const navigate = useNavigate();

	// Logout function
	const logout = () => {
		localStorage.removeItem('user-token');
		localStorage.removeItem('username');
		setUserToken('');
		setUsername('');
		navigate('/');
	};

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
				{userToken ? (
					<>
						<li>
							<NavLink
								onClick={() => setNavMobileActive(false)}
								className={`nav-link ${
									pathname.startsWith('/dashboard') ? 'active' : ''
								}`}
								to={`/dashboard/${getFormattedDate(new Date())}`}>
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
										to='account/settings'>
										Logout
									</NavLink>
								</li>
							</ul>
						</li>
						{/* 
						<li>
							<Link onClick={() => logout()} className='nav-link' to='.'>
								{username}
							</Link>
						</li> */}
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

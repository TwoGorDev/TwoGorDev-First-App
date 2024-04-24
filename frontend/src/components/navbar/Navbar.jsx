// styles
import './Navbar.css';

// utilities
import getFormattedDate from '../../utilities/getFormattedDate';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';

export default function Navbar() {
	const { userToken, setUserToken } = useContext(UserAuthContext);
	const location = useLocation();
	const [navMobileActive, setNavMobileActive] = useState(true);
	const navigate = useNavigate()

	// Logout function
	const logout = () => {
		localStorage.removeItem('user-token');
		setUserToken('');
		navigate('/');
	}

	const navClass = ['/', '/register', '/login'].includes(location.pathname)
		? 'home-nav'
		: 'nav';

	return (
		<nav className={`${navClass} ${navMobileActive ? 'mobile-active' : ''}`}>
			<div className='nav-headings-container'>
				<div className='logo'>
					<Link className='logo-link' to='/'>
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
				{userToken ?
				<>
					<li>
						<NavLink onClick={() => setNavMobileActive(false)} className='nav-link' to={`/dashboard/${getFormattedDate(new Date())}`}>
							Dashboard
						</NavLink>
					</li>
				
					<li>
						<NavLink onClick={() => setNavMobileActive(false)} className='nav-link' to='/account'>
							Account
						</NavLink>
					</li>

					<li>
						<Link onClick={() => logout()} className='nav-link' to='.'>
							Logout
						</Link>
					</li>
				</>
				: 
				<>
					<li>
						<NavLink onClick={() => setNavMobileActive(false)} className='nav-link' to='/register'>
							Register
						</NavLink>
					</li>
					<li>
						<NavLink onClick={() => setNavMobileActive(false)} className='nav-link' to='/login'>
							Login
						</NavLink>
					</li>
				</>
				}
			</ul>
		</nav>
	);
}

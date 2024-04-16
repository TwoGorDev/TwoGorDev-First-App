// styles
import './Navbar.css';

import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
	const location = useLocation();

	const navClass = ['/', '/register', '/login'].includes(location.pathname)? 'home-nav' : 'nav';

	return (
		<nav className={navClass}>
			<ul className='nav-list wrapper'>
				<li className='logo'>
					<Link className='logo-link' to='/'>
						HealThyBody
					</Link>
				</li>
				<li>
					<NavLink className='nav-link' to='/dashboard'>
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink className='nav-link' to='/account'>
						Account
					</NavLink>
				</li>
				<li>
					<NavLink className='nav-link' to='/register'>
						Register
					</NavLink>
				</li>
				<li>
					<NavLink className='nav-link' to='/login'>
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

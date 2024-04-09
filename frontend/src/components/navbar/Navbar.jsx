import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className='nav'>
			<ul className='nav-list wrapper'>
				<li className='logo'>
					<Link className='logo-link' to='/'>
						HealThyBody
					</Link>
				</li>
				<li>
					<NavLink className='nav-link' to='/login'>
						Login
					</NavLink>
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
			</ul>
		</nav>
	);
}

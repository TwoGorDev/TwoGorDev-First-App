import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Styles
import './AccountLayout.css';

// Components, Icons & Images
import { IoPerson, IoMail, IoSettingsSharp } from 'react-icons/io5';

export default function AccountLayout() {
	const [accountNavMobileActive, setAccountNavMobileActive] = useState(false);
	const { pathname } = useLocation();

	let accountNavText = 'Profile';
	if (pathname === '/account/contactus') {
		accountNavText = 'Contact Us';
	} else if (pathname === '/account/settings') {
		accountNavText = 'Settings';
	}

	return (
		<div
			className={`account-layout-container wrapper ${
				accountNavMobileActive ? 'account-mobile-active' : ''
			}`}>
			<div className='account-layout-mobile-nav'>
				<h2 className='account-menu-text'>{accountNavText}</h2>
				<div
					className='hamburger acc-hamburger'
					onClick={() => setAccountNavMobileActive((prevState) => !prevState)}>
					<div className='hamburger-line'></div>
					<div className='hamburger-line'></div>
					<div className='hamburger-line'></div>
				</div>
			</div>
			<ul className='account-layout-nav-list'>
				<li className='account-layout-nav-item'>
					<NavLink
						onClick={() => setAccountNavMobileActive(false)}
						className='account-layout-nav-link'
						to='profile'>
						<IoPerson />
						Profile
					</NavLink>
				</li>
				<li className='account-layout-nav-item'>
					<NavLink
						onClick={() => setAccountNavMobileActive(false)}
						className='account-layout-nav-link'
						to='contactus'>
						<IoMail />
						Contact Us
					</NavLink>
				</li>
				<li className='account-layout-nav-item'>
					<NavLink
						onClick={() => setAccountNavMobileActive(false)}
						className='account-layout-nav-link'
						to='settings'>
						<IoSettingsSharp className='nav-icon' />
						Settings
					</NavLink>
				</li>
			</ul>
			<div className='separating-line'></div>
			<Outlet />
		</div>
	);
}

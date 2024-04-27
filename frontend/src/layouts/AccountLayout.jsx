import { Outlet, NavLink } from 'react-router-dom';

// styles
import './AccountLayout.css';

// icons
import { IoPerson, IoMail, IoSettingsSharp } from 'react-icons/io5';

export default function AccountLayout() {
	
	return (
		<div className='account-layout-container wrapper'>
			<ul className='account-layout-nav-list'>
				<li className='account-layout-nav-item'>
					<NavLink className='account-layout-nav-link' to='profile'>
						<IoPerson />
						Profile
					</NavLink>
				</li>
				<li className='account-layout-nav-item'>
					<NavLink className='account-layout-nav-link' to='contactus'>
						<IoMail />
						Contact Us
					</NavLink>
				</li>
				<li className='account-layout-nav-item'>
					<NavLink className='account-layout-nav-link' to='settings'>
						<IoSettingsSharp />
						Settings
					</NavLink>
				</li>
			</ul>
			<div className='separating-line'></div>
			<Outlet />
		</div>
	);
}

// Styles
import './Settings.css';

// Utilities & Hooks
import useUserAuth from '../../../hooks/useUserAuth';

// Components, Icons & Images
import ThemePicker from '../../../components/themePicker/ThemePicker';
import PasswordChangeForm from '../../../components/passwordChangeForm/PasswordChangeForm';
import UsernameChangeForm from '../../../components/usernameChangeForm/UsernameChangeForm';
import DangerZone from '../../../components/dangerZone/DangerZone';

export default function Settings() {
	// External logic/state
	const { logout } = useUserAuth();
	
	return (
		<div className='acc-settings-container'>
			<h2 className='acc-settings-title'>Settings</h2>

			<ThemePicker />
			<PasswordChangeForm />
			<UsernameChangeForm />

			<h3 className='acc-settings-subtitle'>Logout</h3>
			<button
				className='acc-change-data-btn settings-logout-btn'
				onClick={logout}
			>
				Logout
			</button>

			<DangerZone />
		</div>
	);
}

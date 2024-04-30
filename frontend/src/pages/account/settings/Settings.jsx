import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserAuthContext } from '../../../contexts/UserAuthContext';

// styles
import './Settings.css';

//components
import TogglePassword from '../../../components/togglePassword/togglePassword';
import DialogModal from '../../../components/dialogModal/DialogModal';

export default function Settings() {
	const { setUser } = useContext(UserAuthContext);
	const [formData, setFormData] = useState({
		newUsername: '',
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});
	const [togglePassword, setTogglePassword] = useState({
		newPassword: false,
		confirmNewPassword: false,
	});
	const [isDeleteAccModalOpen, setIsDeleteAccModalOpen] = useState(false);

	const navigate = useNavigate();

	function handleTogglePassword(field) {
		setTogglePassword((prevPassword) => {
			return {
				...prevPassword,
				[field]: !prevPassword[field],
			};
		});
	}

	function handleChange(e) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			};
		});
	}

	function handleTheme(primaryColor, primaryColorDark, secondaryColor) {
		document.documentElement.style.setProperty('--primary-color', primaryColor);
		document.documentElement.style.setProperty('--primary-color-dark',primaryColorDark);
		document.documentElement.style.setProperty('--secondary-color',secondaryColor);
	}

	const logout = () => {
		localStorage.removeItem('user');
		setUser({});
		navigate('/');
	};

	const deleteAccount = () => {
		// account deletion logic
	};

	return (
		<div className='acc-settings'>
			<h2 className='acc-settings-title'>Settings</h2>

			<h3 className='acc-settings-subtitle'>Choose Theme</h3>
			<div className='acc-settings-theme-container'>
				<button
					onClick={() => handleTheme('#0e6aa8fa', '#216999e7', '#a6e1fa10')}
					className='choose-theme-btn default'></button>
				<button
					onClick={() => handleTheme('#c5772efa', '#b36c29e7', '#c5772e10')}
					className='choose-theme-btn tomato'></button>
				<button
					onClick={() => handleTheme('#a599ddfa', '#8a80b8e7', '#a599dd10')}
					className='choose-theme-btn lavender'></button>
			</div>

			<h3 className='acc-settings-subtitle'>Change Password</h3>
			<form className='acc-settings-form'>
				<label>
					<TogglePassword
						togglePassword={togglePassword}
						handleTogglePassword={handleTogglePassword}
						field='password'
					/>
					Current Password:
					<input
						type={togglePassword.password ? 'text' : 'password'}
						name='password'
						placeholder='Enter current password'
						onChange={handleChange}
						value={formData.password}
					/>
				</label>

				<label>
					<TogglePassword
						togglePassword={togglePassword}
						handleTogglePassword={handleTogglePassword}
						field='newPassword'
					/>
					New Password:
					<input
						type={togglePassword.newPassword ? 'text' : 'password'}
						name='newPassword'
						placeholder='Enter new password'
						onChange={handleChange}
						value={formData.newPassword}
					/>
				</label>

				<label>
					<TogglePassword
						togglePassword={togglePassword}
						handleTogglePassword={handleTogglePassword}
						field='confirmNewPassword'
					/>
					Confirm New Password:
					<input
						type={togglePassword.confirmNewPassword ? 'text' : 'password'}
						name='confirmNewPassword'
						placeholder='Confirm new password'
						onChange={handleChange}
						value={formData.confirmNewPassword}
					/>
				</label>

				<button className='acc-change-data-btn'>Change Password</button>
			</form>

			<h3 className='acc-settings-subtitle'>Change Username</h3>
			<form className='acc-settings-form'>
				<label>
					New Username:
					<input
						type='text'
						name='newUsername'
						placeholder='Enter new username'
						onChange={handleChange}
						value={formData.newUsername}
					/>
				</label>
				<button className='acc-change-data-btn'>Change Username</button>
			</form>

			<h3 className='acc-settings-subtitle'>Logout</h3>
			<button
				className='acc-change-data-btn settings-logout-btn'
				onClick={logout}>
				Logout
			</button>

			<div className='danger-zone'>
				<h3 className='acc-settings-subtitle acc-delete-title'>
					Delete account
				</h3>
				<button
					onClick={() => setIsDeleteAccModalOpen(true)}
					className='acc-change-data-btn settings-logout-btn acc-delete-btn'>
					Delete account
				</button>
				<DialogModal
					modalTitle='Account Deletion'
					isModalOpen={isDeleteAccModalOpen}
					setIsModalOpen={setIsDeleteAccModalOpen}
					modalConfirmText='Delete my account'
					modalConfirmAction={deleteAccount}>
					This process is irreversible. Are you sure you want to delete your
					account?
				</DialogModal>
			</div>
		</div>
	);
}

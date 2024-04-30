// utilities
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataApi from '../../../hooks/useDataApi';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

// styles
import './Settings.css';

//components
import TogglePassword from '../../../components/togglePassword/togglePassword';
import DialogModal from '../../../components/dialogModal/DialogModal';

export default function Settings() {
	const { isPending, error, deleteData } = useDataApi();
	const { setUser, setIsLoggedIn } = useContext(UserAuthContext);
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

	// table of themes properties, used for theme choice buttons
	const themeColors = [
		{
			themeClass: 'default',
			primaryColor: '#0e6aa8fa',
			primaryColorDark: '#0d588afa',
			secondaryColor: '#a6e1fa10',
		},
		{
			themeClass: 'orange',
			primaryColor: '#e99434fa',
			primaryColorDark: '#ca7f29fa',
			secondaryColor: '#e9943410',
		},
		{
			themeClass: 'lavender',
			primaryColor: '#a599ddfa',
			primaryColorDark: '#8b7ec5fa',
			secondaryColor: '#a599dd10',
		},
		{
			themeClass: 'plum',
			primaryColor: '#bb738ffa',
			primaryColorDark: '#9c5973fa',
			secondaryColor: '#bb738f10',
		},
		{
			themeClass: 'green',
			primaryColor: '#5faa5ffa',
			primaryColorDark: '#4d964dfa',
			secondaryColor: '#5faa5f10',
		},
		{
			themeClass: 'sky',
			primaryColor: '#68b2d4fa',
			primaryColorDark: '#5199bbfa',
			secondaryColor: '#68b2d410',
		},
		{
			themeClass: 'brick',
			primaryColor: '#a85d5dfa',
			primaryColorDark: '#964d4dfa',
			secondaryColor: '#a85d5d10',
		},
		{
			themeClass: 'olive',
			primaryColor: '#8a8b4bfa',
			primaryColorDark: '#77793dfa',
			secondaryColor: '#8a8b4b10',
		},
		{
			themeClass: 'gray',
			primaryColor: '#4e4b4bfa',
			primaryColorDark: '#3a3737fa',
			secondaryColor: '#4e4b4b10',
		},
		{
			themeClass: 'baby-pink',
			primaryColor: '#d69d9dfa',
			primaryColorDark: '#c58989fa',
			secondaryColor: '#d69d9d10',
		},
	];

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
		setIsLoggedIn(false);
		navigate('/');
	};

	const deleteAccount = async () => {
		const res = await deleteData('/users');

		if (res) {
			logout();
		}
	};

	return (
		<div className='acc-settings-container'>
			<h2 className='acc-settings-title'>Settings</h2>

			<h3 className='acc-settings-subtitle'>Choose Theme</h3>
			<div className='acc-settings-theme-container'>
				{themeColors.map((theme, index) => (
					<button
						key={index}
						onClick={() =>
							handleTheme(
								theme.primaryColor,
								theme.primaryColorDark,
								theme.secondaryColor
							)
						}
						className={`choose-theme-btn ${theme.themeClass}`}></button>
				))}
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
					modalConfirmAction={deleteAccount}
					isPending={isPending}
					error={error}
				>
					This process is irreversible. Are you sure you want to delete your
					account?
				</DialogModal>
			</div>
		</div>
	);
}

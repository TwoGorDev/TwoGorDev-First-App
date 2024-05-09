// Components, Icons & Images
import TogglePassword from '../togglePassword/togglePassword';
import Loader from '../loader/Loader';

// Utilities & Hooks
import useDataApi from '../../hooks/useDataApi';
import { useState } from 'react';

// Types
import { TogglePasswordObject } from '../../types/types';

export default function PasswordChangeForm() {
  // External logic/state
  const {isPending, error: serverError, setError: setServerError, patchData } = useDataApi();

  // Local logic/state
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
		confirmNewPassword: ''
  })
  const [passwordChangeResult, setPasswordChangeResult] = useState({
    status: '',
    message: ''
  });
  const [togglePassword, setTogglePassword] = useState<TogglePasswordObject>({
		newPassword: false,
		confirmNewPassword: false,
	});

  // Handle user input change
  function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			};
		});
	}

  // Show/hide password
  function handleTogglePassword(field : string) {
		setTogglePassword((prevPassword) => {
			return {
				...prevPassword,
				[field]: !prevPassword[field as keyof TogglePasswordObject],
			};
		});
	}

  // Change password validation & functionality
	async function handlePasswordChange(e : React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setPasswordChangeResult({ status: '', message: '' });
		setServerError('');

		if (!formData.password || !formData.newPassword || !formData.confirmNewPassword) {
			setPasswordChangeResult({ status: 'error', message: 'All fields required' });
			return;
		}

		if (formData.password === formData.newPassword) {
			setPasswordChangeResult({ status: 'error', message: "New password can't be the same as current password" });
			return
		}

		if (formData.newPassword !== formData.confirmNewPassword) {
			setPasswordChangeResult({ status: 'error', message: "New passwords do not match" });
			return
		}

		const res = await patchData('/users', {
			password: formData.password,
			newPassword: formData.newPassword
		})

		if (res) {
			setPasswordChangeResult({ status: 'success', message: 'Password changed successfully'});
			setFormData({
			password: '',
			newPassword: '',
			confirmNewPassword: ''
			})
		}
	}

  return (
    <>
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

				{serverError && (
					<p className="acc-settings-message-error">
						{serverError}
					</p>
				)}
				{passwordChangeResult.status && (
					<p className={`acc-settings-message-${passwordChangeResult.status}`}>
						{passwordChangeResult.message}
					</p>
				)}

				<button className='acc-change-data-btn' onClick={(e) => handlePasswordChange(e)}>
					{isPending ?
						<Loader
							style={{ height: '100%', width: '100%' }}
							size={'3px'}
							color={'var(--dashboard-color)'}
						/>
					:
						'Change Password'
					}
				</button>

			</form>
    </>
  )
}
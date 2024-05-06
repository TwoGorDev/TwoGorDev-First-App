// Styles
import './Form.css';

// Components, Icons & Images
import TogglePassword from '../../components/togglePassword/togglePassword';
import Loader from '../../components/loader/Loader';

// Utilities & Hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Form({
	title,
	buttonText,
	authType,
	handleSubmit,
	errors,
	serverError,
	isPending
}) {
	// Local logic/state
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	});
	const [togglePassword, setTogglePassword] = useState({
		password: false,
		confirmPassword: false,
	});

	// Handle user input change
	function handleChange(e) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			};
		});
	}

	// Show/hide password
	function handleTogglePassword(field) {
		setTogglePassword((prevPassword) => {
			return {
				...prevPassword,
				[field]: !prevPassword[field],
			};
		});
	}

	const formContainerClass = title === 'Register' ? 'register-form-container' : 'login-form-container';

	return (
		<div className={formContainerClass}>
			<form onSubmit={(e) => handleSubmit(e, formData)} className='form'>
				<h2 className='form-title'>{title}</h2>
				<label className='form-label'>
					<h3>Username</h3>
					<input
						className={`form-input ${
							errors.username ? 'form-input-error' : ''
						}`}
						type='text'
						placeholder='Enter username'
						name='username'
						onChange={handleChange}
						value={formData.username}
					/>
				</label>
				{errors.username && (
					<span className='form-error'>{errors.username}</span>
				)}
				{authType === 'signup' && (
					<label className='form-label'>
						<h3>E-mail</h3>
						<input
							className={`form-input ${errors.email ? 'form-input-error' : ''}`}
							type='text'
							placeholder='Enter email address'
							name='email'
							onChange={handleChange}
							value={formData.email}
						/>
					</label>
				)}
				{errors.email && <span className='form-error'>{errors.email}</span>}
				<label className='form-label'>
					<h3>Password</h3>
					<TogglePassword
						togglePassword={togglePassword}
						handleTogglePassword={handleTogglePassword}
						field='password'
					/>

					<input
						className={`form-input ${
							errors.password ? 'form-input-error' : ''
						}`}
						type={togglePassword.password ? 'text' : 'password'}
						placeholder='Enter password'
						name='password'
						onChange={handleChange}
						value={formData.password}
					/>
				</label>
				{errors.password && (
					<span className='form-error'>{errors.password}</span>
				)}
				{authType === 'signup' && (
					<label className='form-label'>
						<h3>Confirm password</h3>
						<TogglePassword
							togglePassword={togglePassword}
							handleTogglePassword={handleTogglePassword}
							field='confirmPassword'
						/>
						<input
							className={`form-input ${
								errors.confirmPassword ? 'form-input-error' : ''
							}`}
							type={togglePassword.confirmPassword ? 'text' : 'password'}
							placeholder='Confirm password'
							name='confirmPassword'
							onChange={handleChange}
							value={formData.confirmPassword}
						/>
					</label>
				)}
				{errors.confirmPassword && (
					<span className='form-error'>{errors.confirmPassword}</span>
				)}
				{title === 'Login' && (
					<p className='login-info'>
						Don't have an account yet?
						<Link className='login-info-link' to='/register'>
							{' '}
							Sign up
						</Link>
					</p>
				)}
				{serverError && <p className='form-server-error'>{serverError}</p>}
				<button className='submit-form-btn' disabled={isPending}>
					{isPending ?
						<Loader
							style={{ height: '100%', width: '100%' }}
							size={'3px'}
							color={'var(--dashboard-color)'}
						/>
					: 
						buttonText
					}
				</button>
				{title === 'Register' && (
					<p className='register-form-info'>
						By clicking "Sign up" you agree to our Terms and Conditions
					</p>
				)}
			</form>
		</div>
	);
}

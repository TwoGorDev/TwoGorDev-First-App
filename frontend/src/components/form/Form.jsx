import { useState } from 'react';

// styles
import './Form.css';

// components
import TogglePassword from '../../components/togglePassword/togglePassword';
import { Link } from 'react-router-dom';

export default function Form({ title, buttonText, authType, handleSubmit }) {
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

	function handleChange(e) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			};
		});
	}

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
						className='form-input'
						type='text'
						placeholder='Enter username'
						required
						name='username'
						onChange={handleChange}
						value={formData.username}
					/>
				</label>
				{authType === 'signup' && (
					<label className='form-label'>
						<h3>E-mail</h3>
						<input
							className='form-input'
							type='email'
							placeholder='Enter email address'
							required
							name='email'
							onChange={handleChange}
							value={formData.email}
						/>
					</label>
				)}
				<label className='form-label'>
					<h3>Password</h3>
					<TogglePassword
						togglePassword={togglePassword}
						handleTogglePassword={handleTogglePassword}
						field='password'
					/>

					<input
						className='form-input'
						type={togglePassword.password ? 'text' : 'password'}
						placeholder='Enter password'
						required
						name='password'
						onChange={handleChange}
						value={formData.password}
					/>
				</label>
				{authType === 'signup' && (
					<label className='form-label'>
						<h3>Confirm password</h3>
						<TogglePassword
							togglePassword={togglePassword}
							handleTogglePassword={handleTogglePassword}
							field='confirmPassword'
						/>
						<input
							className='form-input'
							type={togglePassword.confirmPassword ? 'text' : 'password'}
							placeholder='Confirm password'
							required
							name='confirmPassword'
							onChange={handleChange}
							value={formData.confirmPassword}
						/>
					</label>
				)}
				{title === 'Login' && <p className='login-info'>Don't have an account yet? 
				<Link className='login-info-link' to='/register'> Sign up</Link></p>}
				<button className='submit-form-btn'>{buttonText}</button>
				{title === 'Register' && <p className="register-form-info">By clicking "Sign up" you agree to our Terms and Conditions</p>}
			</form>
		</div>
	);
}

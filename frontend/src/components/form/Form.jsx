import { useState } from 'react';

import './Form.css'

export default function Form({ title, buttonText, authType, handleSubmit }) {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	});

	function handleChange(e) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			};
		});
	}

	// onSubmit={handleSubmit(username, password, email)}
	return (
		<div className='form-container'>
			<form className='form'>
				<h2 className='form-title'>{title}</h2>
				<label>
					<h3>Username</h3>
					<input
						type='text'
						placeholder='Enter username'
						required
						name='username'
						onChange={handleChange}
						value={formData.username}
					/>
				</label>
				{authType === 'signup' && (
					<label>
						<h3>E-mail</h3>
						<input
							type='email'
							placeholder='Enter email address'
							required
							name='email'
							onChange={handleChange}
							value={formData.email}
						/>
					</label>
				)}
				<label>
					<h3>Password</h3>
					<input
						type='password'
						placeholder='Enter password'
						required
						name='password'
						onChange={handleChange}
						value={formData.password}
					/>
				</label>
				{authType === 'signup' && (
					<label>
						<h3>Confirm password</h3>
						<input
							type='password'
							placeholder='Confirm password'
							required
							name='confirmPassword'
							onChange={handleChange}
							value={formData.confirmPassword}
						/>
					</label>
				)}

				<button className='submit-form'>{buttonText}</button>
			</form>
		</div>
	);
}

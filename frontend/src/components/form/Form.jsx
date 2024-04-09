import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import './Form.css';

export default function Form({ title, buttonText, authType, handleSubmit }) {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	});
	const [togglePassword, setTogglePassword] = useState('password');

	function handleChange(e) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			};
		});
	}

	const handleTogglePassword = () => {
		setTogglePassword((prevPassword) => {
			return prevPassword === 'password'
				? (prevPassword = 'text')
				: (prevPassword = 'password');
		});
	};

	return (
		<div className='form-container'>
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
					<FaRegEye
						className='form-reg-eye'
						onClick={() => handleTogglePassword}
					/>
					<input
						className='form-input'
						type={togglePassword}
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
						<FaRegEye
							className='form-reg-eye'
							onClick={() => handleTogglePassword}
						/>
						<input
							className='form-input'
							type={togglePassword}
							placeholder='Confirm password'
							required
							name='confirmPassword'
							onChange={handleChange}
							value={formData.confirmPassword}
						/>
					</label>
				)}

				<button className='submit-form-btn'>{buttonText}</button>
			</form>
		</div>
	);
}

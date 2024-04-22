// styles
import './Register.css';

// components
import Form from '../../components/form/Form';

// utilities
import { useState } from 'react';
import useDataApi from '../../hooks/useDataApi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [errors, setErrors] = useState({});
	const { isPending, error, data, postData } = useDataApi();
	const navigate = useNavigate();

	const handleRegister = async (e, formData) => {
		e.preventDefault();

		const validationErrors = {};

		if (!formData.username.trim()) {
			validationErrors.username = 'Username is required';
		} else if (
			formData.username.trim().length < 4 ||
			formData.username.trim().length > 16
		) {
			validationErrors.username =
				'Username should contain between 4 and 16 characters';
		}

		if (!formData.email.trim()) {
			validationErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			validationErrors.email = 'Email is not valid';
		}

		if (!formData.password.trim()) {
			validationErrors.password = 'Password is required';
		} else if (formData.password.length < 8) {
			validationErrors.password = 'Password should be at least 6 char';
		} else if (
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{6,}$/.test(formData.password.trim())
		) {
			validationErrors.password =
				'Password should contain at least one special character, one uppercase and lowercase letter and one number';
		}

		if (!formData.confirmPassword.trim()) {
			validationErrors.confirmPassword = 'Confirm Password is required';
		} else if (formData.confirmPassword !== formData.password) {
			validationErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			const data = await postData('/signup', {
				username: formData.username,
				password: formData.password,
				email: formData.email,
			})

			if (data) {
				localStorage.setItem('user-token', JSON.stringify(data.token));
				navigate('/dashboard');
			}
		}
	};

	return (
		<div className='register-container'>
			<Form
				title='Register'
				buttonText='Sign up'
				authType='signup'
				handleSubmit={handleRegister}
				errors={errors}
			/>
		</div>
	);
}

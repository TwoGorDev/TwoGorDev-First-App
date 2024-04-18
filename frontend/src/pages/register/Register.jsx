import Form from '../../components/form/Form';
import { useState } from 'react';

// styles
import './Register.css';

// utilities
import useDataApi from '../../hooks/useDataApi';

export default function Register() {
	const [errors, setErrors] = useState({});
	const { isPending, error, data, postData } = useDataApi();


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
		} else if (formData.password.length < 6) {
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
			postData('/signup', {
				username: formData.username,
				password: formData.password,
				email: formData.email,
			})
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

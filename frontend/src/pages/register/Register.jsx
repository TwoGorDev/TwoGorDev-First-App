// Styles
import './Register.css';

// Components, Icons & Images
import Form from '../../components/form/Form';

// Utilities & Hooks
import { useState } from 'react';
import useUserAuth from '../../hooks/useUserAuth';
import { validateUsername, validatePassword, validateEmail } from '../../utilities/validators';

export default function Register() {
	// External logic/state
	const { error: serverError, isPending, signup } = useUserAuth();

	// Local logic/state
	const [errors, setErrors] = useState({});

	// Register function
	const handleRegister = async (e, formData) => {
		e.preventDefault();
		
		const { username, password, confirmPassword, email } = formData;
		const validationErrors = {};

		// validate user inputs
		validationErrors.username = validateUsername(username);
		validationErrors.password = validatePassword(password);
		validationErrors.email = validateEmail(email);

		if (!confirmPassword) {
			validationErrors.confirmPassword = 'Confirm Password is required';
		} else if (confirmPassword !== password) {
			validationErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(validationErrors);

		// signup the user if there's no errors
		if (Object.values(validationErrors).every((error) => error === undefined)) {
			await signup(username.trim(), password, email)
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
				serverError={serverError}
				isPending={isPending}
			/>
		</div>
	);
}

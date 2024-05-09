// Styles
import './Login.css';

// Components, Icons & Images
import Form from '../../components/form/Form';

// Utilities & Hooks
import { FormEvent, useState } from 'react';
import useUserAuth from '../../hooks/useUserAuth';

// Types
import { AuthFromData } from '../../types/types';

export default function Login() {
	// External logic/state
	const { isPending, error: serverError, login } = useUserAuth();

	// Local logic/state
	const [errors, setErrors] = useState({});

	// Login function
	const handleLogin = async (e: FormEvent<HTMLFormElement>, formData : AuthFromData) => {
		e.preventDefault();

		const { username, password } = formData;
		const validationErrors: {username?: string, password?: string} = {}

    if (!username.trim()) {
      validationErrors.username = "Incorrect username"
    }
    if (!password) {
      validationErrors.password = "Incorrect password"
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
			await login(username, password);
    }
	};

	return (
		<div className='login-container'>
			<Form
				title='Login'
				buttonText='Log in'
				handleSubmit={handleLogin}
				errors={errors}
				serverError={serverError}
				isPending={isPending}
			/>
		</div>
	);
}

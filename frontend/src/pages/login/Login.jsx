// components
import Form from '../../components/form/Form';

// styles
import './Login.css';

// utilities
import useDataApi from '../../hooks/useDataApi';
import { useState } from 'react';

export default function Login() {
	const [errors, setErrors] = useState({});
	const { isPending, error, data, postData } = useDataApi();

	const handleLogin = async (e, formData) => {
		e.preventDefault();

		const validationErrors = {}
    if(!formData.username.trim()) {
        validationErrors.username = "Incorrect username"
    }

    if(!formData.password.trim()) {
        validationErrors.password = "Incorrect password"
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
			await postData('/login', {
				username: formData.username,
				password: formData.password
			})
    }

		if (data) {
			localStorage.setItem('user-token', JSON.stringify(data.token));
		}
	};


	return (
		<div className='login-container'>
			<Form title='Login' buttonText='Log in' handleSubmit={handleLogin} errors={errors}/>
		</div>
	);
}

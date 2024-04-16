// components
import Form from '../../components/form/Form';

// styles
import './Login.css';

import { useState } from 'react'

export default function Login() {
	const [errors, setErrors] = useState({});
	const handleLogin = async (e, formData) => {
		e.preventDefault();

		const validationErrors = {}
    if(!formData.username.trim()) {
        validationErrors.username = "Incorrect username"
    }

    if(!formData.password.trim()) {
        validationErrors.password = "Incorrect password"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
		await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
			}),
			headers: { 'Content-type': 'application/json' },
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
    }


		
	};
	return (
		<div className='login-container'>
			<Form title='Login' buttonText='Log in' handleSubmit={handleLogin} errors={errors}/>
		</div>
	);
}

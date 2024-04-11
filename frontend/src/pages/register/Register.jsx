import Form from '../../components/form/Form';
import { useState } from 'react'

// styles
import './Register.css';

export default function Register() {
	const [errors, setErrors] = useState({})
	
	const handleRegister = async (e, formData) => {
		e.preventDefault();

		const validationErrors = {}
    if(!formData.username.trim()) {
        validationErrors.username = "Username is required"
    } else if(formData.username.trim().length < 4 || formData.username.trim().length > 16) {
		validationErrors.username = "Username should be between 4 and 16 characters"
	}

    if(!formData.email.trim()) {
        validationErrors.email = "Email is required"
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        validationErrors.email = "Email is not valid"
    }

    if(!formData.password.trim()) {
        validationErrors.password = "Password is required"
    } else if(formData.password.length < 6){
        validationErrors.password = "Password should be at least 6 char"
    }

	if(!formData.confirmPassword.trim()) {
		validationErrors.confirmPassword = "Confirm Password is required"
	} else if(formData.confirmPassword !== formData.password) {
        validationErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
		await fetch('http://localhost:4000/signup', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
				email: formData.email,
			}),
			headers: { 'Content-type': 'application/json' },
		})
			// .then((res) => res.json())
			.then((data) => console.log(data));
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

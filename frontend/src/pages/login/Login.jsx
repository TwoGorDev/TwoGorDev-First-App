// components
import Form from '../../components/form/Form';

// styles
import './Login.css';

export default function Login() {
	const handleLogin = async (formData) => {
		const user = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
			}),
			headers: { 'Content-type': 'application/json' },
		});
	};
	return (
		<div className='login-container'>
			<Form title='Login' buttonText='Log in' handleSubmit={handleLogin} />
			<div className="login-container-shadow"></div>
		</div>
	);
}




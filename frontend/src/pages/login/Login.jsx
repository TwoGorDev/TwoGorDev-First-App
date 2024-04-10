import Form from '../../components/form/Form';

export default function Login() {
	const handleLogin = async (formData) => {
		const user = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
			}),
			headers: { 'Content-type': 'application/json' },
		});
	};
	return (
		<>
			<Form title='Login' buttonText='Log in' handleSubmit={handleLogin} />
		</>
	);
}




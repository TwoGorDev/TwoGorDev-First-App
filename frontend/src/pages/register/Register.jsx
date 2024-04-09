import Form from '../../components/form/Form';

export default function Register() {
	const handleRegister = async (formData) => {
		const user = await fetch('/signup', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
				email: formData.email
			}),
			headers: {'Content-type': 'application/json'},
		  })	  
		}
	return (
		<>
			<Form title='Register' buttonText='Sign up' authType='signup' handleSubmit={handleRegister} />
		</>
	);
}

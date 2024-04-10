import Form from '../../components/form/Form';

export default function Register() {
	const handleRegister = async (e, formData) => {
		e.preventDefault();
		await fetch('localhost:4000/signup', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
				email: formData.email,
			}),
			headers: { 'Content-type': 'application/json' },
		}).then((res) => res.json())
		.then(data => console.log(data))

		
	};
	return (
		<>
			<Form
				title='Register'
				buttonText='Sign up'
				authType='signup'
				handleSubmit={handleRegister}
			/>
		</>
	);
}

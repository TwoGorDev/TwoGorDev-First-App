import Form from '../../components/form/Form'
import './Login.css';

export default function Login() {
	const handleLogin = (username, password) => {
		
	}
	return (
		<>
			<Form
			title='Login'
			buttonText="Log in"
			handleSubmit={handleLogin}
			/>
		</>
	);
}

// styles
import './Login.css';

// components
import Form from '../../components/form/Form';

// utilities
import useDataApi from '../../hooks/useDataApi';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import getFormattedDate from '../../utilities/getFormattedDate';

export default function Login() {
	const [errors, setErrors] = useState({});
	const { setUser } = useContext(UserAuthContext);
	const { isPending, error: serverError, postData } = useDataApi();
	const navigate = useNavigate();

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
			const data = await postData('/login', {
				username: formData.username,
				password: formData.password
			})
			
			if (data) {
				localStorage.setItem('user', JSON.stringify(data));
				setUser(data);
				navigate(`/dashboard/${getFormattedDate(new Date())}`);
			}
    }
	};


	return (
		<div className='login-container'>
			<Form title='Login' buttonText='Log in' handleSubmit={handleLogin} errors={errors} serverError={serverError} isPending={isPending}/>
		</div>
	);
}

// Styles
import './togglePassword.css';

// Components, Icons & Images
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export default function TogglePassword({ togglePassword, handleTogglePassword, field }) {
	return (
		<>
			{togglePassword[field] ? (
				<FaRegEyeSlash
					className='form-reg-eye'
					onClick={() => handleTogglePassword(field)}
				/>
			) : (
				<FaRegEye
					className='form-reg-eye'
					onClick={() => handleTogglePassword(field)}
				/>
			)}
		</>
	);
}

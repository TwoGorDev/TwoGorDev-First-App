import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// styles
import './togglePassword.css';

export default function TogglePassword({
	togglePassword,
	handleTogglePassword,
	field,
}) {
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

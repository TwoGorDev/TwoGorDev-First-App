// Styles
import './togglePassword.css';

// Components, Icons & Images
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// Types
import { TogglePasswordObject } from '../../types/types';
type TogglePasswordProps = {
	togglePassword: TogglePasswordObject
	handleTogglePassword: (field: string) => void,
	field: string
}

export default function TogglePassword({ togglePassword, handleTogglePassword, field } : TogglePasswordProps) {
	return (
		<>
			{togglePassword[field as keyof TogglePasswordObject] ? (
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

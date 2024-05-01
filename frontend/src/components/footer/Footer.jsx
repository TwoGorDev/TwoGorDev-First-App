// Styles
import './Footer.css';

// Utilities & Hooks
import { useLocation } from 'react-router-dom';

export default function () {
	// External logic/state
	const location = useLocation();

	const footerClass = ['/', '/register', '/login'].includes(location.pathname) ?
		'home-footer'
	: 
		'footer'
	;

	return (
		<footer className={footerClass}>
			<span>Copyright &copy; {new Date().getFullYear()} HealThyBody Inc.</span>
		</footer>
	);
}

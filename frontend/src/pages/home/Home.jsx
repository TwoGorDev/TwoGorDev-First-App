// Styles
import './Home.css';

// Components, Icons & Images
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div className='home-page home-container'>
				<div className='home-container-shadow'></div>
				<h1 className='home-title'>HealThyBody</h1>
				<h2 className='home-title-info'>Start your diet today!</h2>
				<Link to='/register' className='aboutus-btn'>
					Sign up now
				</Link>
			</div>
	);
}

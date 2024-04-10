// styles
import './Home.css';

import { Link } from 'react-router-dom';

export default function Home() {
	return (
			<div className='home-page home-container'>
				<h1 className='home-title'>HealThyBody</h1>
				<h2>Start your diet today!</h2>
				<div className='home-container-shadow'></div>
				<Link to='/register' className='aboutus-btn'>
					Sign up now
				</Link>
			</div>
	);
}

// Styles
import './Achievements.css';

// Utilities & Hooks
import { useState } from 'react';

// Components, Icons & Images
import achvLocked from '../../assets/achievementsIcons/achievement-locked.png';
import hamburger from '../../assets/achievementsIcons/hamburger.png';
import InfoPopup from '../infoPopup/InfoPopup';

export default function Achievements() {
	// Local logic/state
	const [achievements, setAchievements] = useState(Array(6).fill(false));
	const [showPopup, setShowPopup] = useState(null);

	return (
		<div className='achievements-container'>
			<h2 className='achievements-title'>Achievements</h2>
			<div className='achievement-boxes'>
				{achievements.map((isUnlocked, index) => (
					<div
						key={index}
						className='achievement-box'
						style={isUnlocked ? { backgroundColor: 'tomato' } : {}}
						onClick={() => {
							const newAchievements = [...achievements];
							newAchievements[index] = !newAchievements[index];
							setAchievements(newAchievements);
						}}
						onMouseEnter={() => setShowPopup(index)}
						onMouseLeave={() => setShowPopup(null)}>
						<img
							className='achievement'
							src={isUnlocked ? hamburger : achvLocked}
							alt='Achievement icon'
						/>
						{showPopup === index && (
							<InfoPopup>You have not unlocked this achievement yet</InfoPopup>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

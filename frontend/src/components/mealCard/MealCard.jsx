// Styles
import './MealCard.css';

// Components, Icons & Images
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';
import AddPortionModal from '../addPortionModal/AddPortionModal';
import { FaCirclePlus } from 'react-icons/fa6';

// Utilities & Hooks
import { useState } from 'react';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import { useNavigate } from 'react-router-dom';

export default function MealCard({ children, mealTime, caloriesToConsume, progress, meal }) {
	// External logic/state
	const navigate = useNavigate();

	// Local logic/state
	const [isAddPortionModalOpen, setIsAddPortionModalOpen] = useState(false);
	
	// Define a variable to store meal ID and assign it an initial value of 0
	let mealId = 0;
	
	// Check if client received meal ID from the server during daily-summary fetch
	// if it did, assign that ID to the variable we defined
	// if it didn't, leave the variable with it's initial value
	if (meal.length > 0) {
		mealId = meal[0].meal_id;
	}

	return (
		<>
			<div className='dashboard-meal-time'>
				<CircularProgressBar
					className='dashboard-meal-time-progress'
					value={caloriesToConsume ? (progress / caloriesToConsume) * 100 : 0}
					progress={progress}
					maxProgress={caloriesToConsume}
					strokeWidth={7}
				>
					{children}
				</CircularProgressBar>

				<div className='meal-time-info'>
					<h3 className='meal-time-title'>
						{capitalizeFirstLetter(mealTime)}
					</h3>

					<p className='meal-time-calories'>
						{Math.round(progress)} / {caloriesToConsume} kcal
					</p>
				</div>

				<FaCirclePlus
					onClick={() => {
						if (caloriesToConsume === 0) {
							navigate('/dashboard/calculator')
							return
						}
							setIsAddPortionModalOpen((prevState) => !prevState)
						}}
					className='add-meal-button'
				/>
			</div>

			{isAddPortionModalOpen && (
				<AddPortionModal
					title={mealTime}
					setIsAddPortionModalOpen={setIsAddPortionModalOpen}
					mealId={mealId}
					mealPortions={meal}
				/>
			)}
		</>
	);
}

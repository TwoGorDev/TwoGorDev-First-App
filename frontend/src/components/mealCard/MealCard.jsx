// styles
import './MealCard.css';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';
import AddProductModal from '../addProductPopup/AddProductModal';
import { FaCirclePlus } from 'react-icons/fa6';

// utilities
import { useState } from 'react';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';

export default function MealCard({ children, mealTime, caloriesToConsume, progress, meal }) {
	const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

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
					value={(progress / caloriesToConsume) * 100}
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
					onClick={() => setIsAddProductModalOpen((prevState) => !prevState)}
					className='add-meal-button'
				/>
			</div>

			{isAddProductModalOpen && (
				<AddProductModal
					title={mealTime}
					setIsAddProductModalOpen={setIsAddProductModalOpen}
					mealId={mealId}
				/>
			)}
		</>
	);
}

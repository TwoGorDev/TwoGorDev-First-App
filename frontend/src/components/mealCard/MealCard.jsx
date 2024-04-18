import { useState } from 'react';

// styles
import './MealCard.css';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';
import AddProductModal from '../addProductPopup/AddProductModal';

// icons
import { FaCirclePlus } from 'react-icons/fa6';

export default function MealCard({ children, mealTime, caloriesToConsume, progress }) {
	const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

	return (
		<>
			<div className='dashboard-meal-time'>
				<CircularProgressBar
					className='dashboard-meal-time-progress'
					value={(progress / caloriesToConsume) * 100}
					strokeWidth={7}>
					{children}
				</CircularProgressBar>

				<div className='meal-time-info'>
					<h3 className='meal-time-title'>
						{mealTime[0].toUpperCase() + mealTime.slice(1)}
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
				/>
			)}
		</>
	);
}

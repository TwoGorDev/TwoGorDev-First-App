import { useState } from 'react';

// styles
import './MealTime.css';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';
import AddProductModal from '../addProductPopup/AddProductModal';

// icons
import { FaCirclePlus } from 'react-icons/fa6';
import {
	GiButterToast,
	GiFruitBowl,
	GiHotMeal,
	GiBowlOfRice,
} from 'react-icons/gi';

export default function MealTime({ mealTime, calories, progress }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getProgressIcon = () => {
		switch (mealTime) {
			case 'breakfast':
				return <GiButterToast className='dashboard-progress-icon' />;
			case 'lunch':
				return <GiBowlOfRice className='dashboard-progress-icon' />;
			case 'dinner':
				return <GiHotMeal className='dashboard-progress-icon' />;
			case 'snacks':
				return <GiFruitBowl className='dashboard-progress-icon' />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className='dashboard-meal-time'>
				<CircularProgressBar
					className='dashboard-meal-time-progress'
					value={progress}
					strokeWidth={7}>
					{getProgressIcon()}
				</CircularProgressBar>
				<div className='meal-time-info'>
					<h3 className='meal-time-title'>
						{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}
					</h3>
					<p className='meal-time-calories'>
						{Math.round(progress * calories)} / {calories} kcal
					</p>
				</div>
				<FaCirclePlus
					onClick={() => setIsModalOpen((prevState) => !prevState)}
					className='add-meal-button'
				/>
			</div>
			{isModalOpen && (
				<AddProductModal title={mealTime} setIsModalOpen={setIsModalOpen} />
			)}
		</>
	);
}

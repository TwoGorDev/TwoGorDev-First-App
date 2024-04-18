// styles
import './Nutrition.css';

// components
import MealCard from '../mealTime/MealCard';

// icons
import {
	GiButterToast,
	GiFruitBowl,
	GiHotMeal,
	GiBowlOfRice,
} from 'react-icons/gi';

export default function Nutrition({ meals, caloriesReq }) {
	

	const ICONS = [
		<GiButterToast className='dashboard-progress-icon' />,
		<GiFruitBowl className='dashboard-progress-icon' />,
		<GiHotMeal className='dashboard-progress-icon' />,
		<GiBowlOfRice className='dashboard-progress-icon' />
	]

	const mealCalories = {
		breakfast: Math.floor(caloriesReq * 0.25),
		lunch: Math.floor(caloriesReq * 0.4),
		dinner: Math.floor(caloriesReq * 0.22),
		snacks: Math.floor(caloriesReq * 0.13),
	};

	// Sum the calories of all the portions inside a meal
	const calculateMealCalories = (meal) => {
		return Math.round(
			meal.reduce(
				(sum, portion) => sum + (portion.serving / 100) * portion.calories,
				0
			)
		);
	};

	return (
			<div className='dashboard-nutrition'>
				<h2 className='dashboard-nutrition-title'>Nutrition</h2>
				<div className='dashboard-nutrition-meal-times'>
					{Object.entries(mealCalories).map(([mealTime, calories], index) => (
						<MealCard
						  children={ICONS[index]}
							key={index}
							mealTime={mealTime}
							caloriesToConsume={calories}
							progress={calculateMealCalories(meals[index])}
						/>
					))}
				</div>
			</div>
	);
}

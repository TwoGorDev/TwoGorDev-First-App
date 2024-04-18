// styles
import './Nutrition.css';

// components
import MealCard from '../mealCard/MealCard';

// icons
import {
	GiButterToast,
	GiFruitBowl,
	GiHotMeal,
	GiBowlOfRice,
} from 'react-icons/gi';

import useCalculateNutritionValues from '../../hooks/useCalculateNutritionValues';

	const ICONS = [
		<GiButterToast className='dashboard-progress-icon' />,
		<GiFruitBowl className='dashboard-progress-icon' />,
		<GiHotMeal className='dashboard-progress-icon' />,
		<GiBowlOfRice className='dashboard-progress-icon' />
	]

export default function Nutrition({ caloriesReq, meals }) {
	const { calculateMealNutrition } = useCalculateNutritionValues();

	const mealCalories = {
		breakfast: Math.round(caloriesReq * 0.25),
		lunch: Math.round(caloriesReq * 0.4),
		dinner: Math.round(caloriesReq * 0.22),
		snacks: Math.round(caloriesReq * 0.13),
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
							progress={calculateMealNutrition(meals[index]).consumedCalories}
						/>
					))}
				</div>
			</div>
	);
}

// styles
import './Nutrition.css';

// components
import MealTime from '../../components/mealTime/MealTime';

export default function Nutrition({ caloriesReq, meals }) {
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
					<MealTime
						key={index}
						mealTime={mealTime}
						calories={calories}
						progress={(calculateMealCalories(meals[index]) / calories) * 100}
					/>
				))}
			</div>
		</div>
	);
}

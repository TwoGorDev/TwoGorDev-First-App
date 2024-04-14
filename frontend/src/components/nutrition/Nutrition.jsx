// styles
import './Nutrition.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';
import {
	GiButterToast,
	GiFruitBowl,
	GiHotMeal,
	GiBowlOfRice,
} from 'react-icons/gi';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';

export default function Nutrition({ caloriesReq }) {

	const mealCalories = {
		breakfast: Math.floor(caloriesReq * 0.25),
		lunch:  Math.floor(caloriesReq * 0.4),
		dinner:  Math.floor(caloriesReq * 0.22),
		snacks:  Math.floor(caloriesReq * 0.13)
	}
		
	return (
		<div className='dashboard-nutrition'>
			<h2 className='dashboard-nutrition-title'>Nutrition</h2>
			<div className='dashboard-nutrition-meal-times'>
				<div className='dashboard-meal-time'>
					<CircularProgressBar
						className='dashboard-meal-time-progress'
						value={19}
						strokeWidth={7}>
						{<GiButterToast className='dashboard-progress-icon' />}
					</CircularProgressBar>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Breakfast</h3>
						<p className='meal-time-calories'>205 / {mealCalories?.breakfast  ?? '0'} kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
				<div className='dashboard-meal-time'>
					<CircularProgressBar
						className='dashboard-meal-time-progress'
						value={19}
						strokeWidth={7}>
						{<GiBowlOfRice className='dashboard-progress-icon' />}
					</CircularProgressBar>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Lunch</h3>
						<p className='meal-time-calories'>0 / {mealCalories?.lunch ?? '0'} kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
				<div className='dashboard-meal-time'>
					<CircularProgressBar
						className='dashboard-meal-time-progress'
						value={19}
						strokeWidth={7}>
						{<GiHotMeal className='dashboard-progress-icon' />}
					</CircularProgressBar>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Dinner</h3>
						<p className='meal-time-calories'>0 / {mealCalories?.dinner ?? '0'} kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
				<div className='dashboard-meal-time'>
					<CircularProgressBar
						className='dashboard-meal-time-progress'
						value={19}
						strokeWidth={7}>
						{<GiFruitBowl className='dashboard-progress-icon' />}
					</CircularProgressBar>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Snacks</h3>
						<p className='meal-time-calories'>0 / {mealCalories?.snacks ?? '0'} kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
			</div>
		</div>
	);
}

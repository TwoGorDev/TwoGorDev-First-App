// styles
import './Dashboard.css';

// components
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';
import Advice from '../../components/advice/Advice';
import DateSelector from '../../components/dateSelector/DateSelector';

// utilities
import { useEffect, useState } from 'react';
import useDataApi from '../../hooks/useDataApi';
import getFormattedDate from '../../utilities/getFormattedDate';

const FAKE_BREAKFAST = [
	{serving: 50, calories: 100, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 75, calories: 125, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 100, calories: 150, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 125, calories: 175, proteins: 10, carbohydrates: 30, fats: 5}
]

const FAKE_LUNCH = [
	{serving: 25, calories: 75, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 50, calories: 100, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 75, calories: 125, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 100, calories: 150, proteins: 10, carbohydrates: 30, fats: 5}
]

const FAKE_DINNER = [
	{serving: 100, calories: 100, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 125, calories: 125, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 150, calories: 150, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 175, calories: 175, proteins: 10, carbohydrates: 30, fats: 5}

]

const FAKE_SNACKS = [
	{serving: 25, calories: 50, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 25, calories: 50, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 25, calories: 75, proteins: 10, carbohydrates: 30, fats: 5},
	{serving: 25, calories: 75, proteins: 10, carbohydrates: 30, fats: 5}
]

export default function Dashboard() {
	const [date, setDate] = useState(getFormattedDate(new Date))
	const { isPending, error, data, getData } = useDataApi();

	// Fetch user's daily summary from the server
	// useEffect(() => {
	// 	getData(`/daily-summary/${date}`);
	// }, [date]);
	
	// Filter meals from daily summary into their respected arrays
	const breakfast = [];
	const lunch = [];
	const dinner = [];
	const snacks = [];
	
	if (data) {
		data.map(meal => {
			switch (meal.meal_type) {
				case 'Breakfast':
					breakfast.push(meal);
					break;
				case 'Lunch':
					lunch.push(meal);
					break;
				case 'Dinner':
					dinner.push(meal);
					break;
				case 'Snacks':
					snacks.push(meal);
					break;
			}
		})
	}

	const nutritionData = JSON.parse(localStorage.getItem('calculatorData'));
	const caloriesReq = nutritionData?.calories ?? 0;
	const macrosReq = {
		carbohydrates: nutritionData?.carbohydrates ?? 0,
		fats: nutritionData?.fats ?? 0,
		proteins: nutritionData?.proteins ?? 0,
	};

	return (
		<div className='wrapper center'>
			<div className="date-selector-container">
				<DateSelector date={date} setDate={setDate}/>	
			</div>
			<div className='dashboard-tables'>
				<Calories caloriesReq={caloriesReq} macrosReq={macrosReq} meals={[FAKE_BREAKFAST, FAKE_LUNCH, FAKE_DINNER, FAKE_SNACKS]}/>
				<Nutrition caloriesReq={caloriesReq} meals={[FAKE_BREAKFAST, FAKE_LUNCH, FAKE_DINNER, FAKE_SNACKS]}/>
			</div>
			<Advice />
		</div>
	);
}

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

export default function Dashboard() {
	const [date, setDate] = useState(getFormattedDate(new Date()));
	const { data: summary, getData: getSummary } = useDataApi();

	// // Fetch user's daily summary from the server
	useEffect(() => {
		Promise.all([
			getSummary(`/daily-summary/${date}`),
		])
	}, [date]);

	// Create empty object to populate with data on server response
	let breakfast = [];
	let lunch = [];
	let dinner = [];
	let snacks = [];

	let caloriesReq = 0;
	let macrosReq = {
		carbohydrates: 0,
		fats: 0,
		proteins: 0
	}

	// If server doesn't find corresponding data, it'll return an empty array
	// If the response is not an array, it means that the server found some data so the next step is to populate local variables with response data
	if (!Array.isArray(summary)) {

		// Populate progress data
		summary.dailyProgress.map(meal => {
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

		// Populate goal data
		caloriesReq = summary.dailyGoal.daily_calories || 0;
		macrosReq.carbohydrates = summary.dailyGoal.daily_carbohydrates || 0,
		macrosReq.fats = summary.dailyGoal.daily_fats || 0,
		macrosReq.proteins = summary.dailyGoal.daily_proteins || 0
	}

	return (
		<div className='wrapper center'>
			<div className="date-selector-container">
				<DateSelector date={date} setDate={setDate}/>	
			</div>
			<div className='dashboard-tables'>
				<Calories
					caloriesReq={caloriesReq}
					macrosReq={macrosReq}
					meals={[breakfast, lunch, dinner, snacks]}
				/>

				<Nutrition
					caloriesReq={caloriesReq}
					meals={[breakfast, lunch, dinner, snacks]}
				/>
			</div>
			<Advice />
		</div>
	);
}

//styles
import './Dashboard.css';

//components
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';
import Advice from '../../components/advice/Advice';

// contexts
import { DashboardContext } from '../../layouts/DashboardLayout';

// utils
import { useContext, useEffect } from 'react';
import useDataApi from '../../hooks/useDataApi';
import currentDate from '../../utilities/getCurrentDate';

export default function Dashboard() {
	// const { calculatorData } = useContext(DashboardContext);
	const { isPending, error, data, getData } = useDataApi(`daily-summary/2024-04-13`);

	// Fetch user's daily summary from the server
	useEffect(() => {
		getData()
	}, []);
	
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
			<div className='dashboard-tables'>
				<Calories caloriesReq={caloriesReq} macrosReq={macrosReq} />
				<Nutrition caloriesReq={caloriesReq} meals={[breakfast, lunch, dinner, snacks]}/>
			</div>
			<Advice />
		</div>
	);
}

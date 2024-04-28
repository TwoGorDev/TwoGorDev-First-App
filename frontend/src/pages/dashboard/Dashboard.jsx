// styles
import './Dashboard.css';

// components
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';
import Advice from '../../components/advice/Advice';
import DateSelector from '../../components/dateSelector/DateSelector';
import Loader from '../../components/loader/Loader';

// utilities
import { useEffect, useState } from 'react';
import useDataApi from '../../hooks/useDataApi';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
	const [summary, setSummary] = useState([]);
	const { error, getData } = useDataApi();
	const { date } = useParams();

	useEffect(() => {
		const fetch = async () => {
			const data = await getData(`/daily-summary/${date}`)
			setSummary(data);
		}

		fetch();
	}, [date])

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
	// if the response is not an array it means that the server found some data - so the next step is to populate local variables with it
	if (!Array.isArray(summary) && typeof summary !== 'undefined') {

		const { dailyGoal, dailyProgress } = summary;

		// populate progress data
		if (dailyProgress.length > 0) {
			dailyProgress.map(meal => {
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

		// populate goal data
		if (typeof dailyGoal === 'object') {
			caloriesReq =  dailyGoal.daily_calories;
			macrosReq.carbohydrates =  dailyGoal.daily_carbohydrates,
			macrosReq.fats = dailyGoal.daily_fats,
			macrosReq.proteins = dailyGoal.daily_proteins
		}
	}

	return (
		<div className='wrapper center dashboard-container'>
			<div className="date-selector-container">
				<DateSelector />	
			</div>
			<div className='dashboard-tables'>
				{!error ? 
					<>
						{summary && 
							<>
								{Object.keys(summary).length > 0 ?
									<>
										<Calories caloriesReq={caloriesReq} macrosReq={macrosReq} meals={[breakfast, lunch, dinner, snacks]} />
										<Nutrition caloriesReq={caloriesReq} meals={[breakfast, lunch, dinner, snacks]} />
									</>
								:
									<>
										<Loader style={{ height: '40vh' }}/>
										<Loader style={{ height: '40vh' }}/>
									</>
								}
							</>
						}
					</>
				: 
					<p className='error'>{error}</p>
				}
			</div>
			<Advice />
		</div>
	);
}

// Styles
import './Dashboard.css';

// Components, Icons & Images
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';
import Advice from '../../components/advice/Advice';
import DateSelector from '../../components/dateSelector/DateSelector';
import Loader from '../../components/loader/Loader';

// Utilities & Hooks
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

// Contexts
import { SummaryContext } from '../../contexts/SummaryContext';

// Types
import { DailyGoal, SummaryContextType, Portion } from '../../types/types';
import getFormattedDate from '../../utilities/getFormattedDate';

export default function Dashboard() {
	// External logic/state
	const { error, summary } = useContext(SummaryContext) as SummaryContextType;
	const [searchParams, setSearchParams] = useSearchParams();

	// Create empty object to populate with data on server response
	let breakfast: Portion[] = [];
	let lunch: Portion[] = [];
	let dinner: Portion[] = [];
	let snacks: Portion[] = [];

	let caloriesReq = 0;
	let macrosReq = {
		carbohydrates: 0,
		fats: 0,
		proteins: 0
	};

	// If server doesn't find corresponding data, it'll return an empty array
	// if the response is not an array it means that the server found some data - so the next step is to populate local variables with it
	if (!Array.isArray(summary) && typeof summary !== 'undefined') {

		const { dailyGoal, dailyProgress } : {dailyGoal: DailyGoal, dailyProgress: Portion[]} = summary;

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
				<DateSelector date={searchParams.get('date') || getFormattedDate(new Date())} setSearchParams={setSearchParams}/>	
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
										<Loader style={{ height: '40vh' }} size={'25px'}/>
										<Loader style={{ height: '40vh' }} size={'25px'}/>
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

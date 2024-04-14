//styles
import './Dashboard.css';

//components
import Calories from '../../components/calories/Calories';
import Nutrition from '../../components/nutrition/Nutrition';
import Advice from '../../components/advice/Advice';

// contexts
import { DashboardContext } from '../../layouts/DashboardLayout';

import { useContext, useEffect } from 'react';

export default function Dashboard() {
	// const { calculatorData } = useContext(DashboardContext);
	

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
				<Nutrition caloriesReq={caloriesReq} />
			</div>
			<Advice />
		</div>
	);
}

// styles
import './Calories.css';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';
import SimpleProgressBar from '../simpleProgressBar/SimpleProgressBar';
import React from 'react';

// utilities
import useCalculateNutritionValues from '../../hooks/useCalculateNutritionValues';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';

export default function Calories({ caloriesReq, macrosReq, meals }) {
	const { calculateDailyNutrition } = useCalculateNutritionValues();
	const { consumedCalories, consumedProteins, consumedCarbs, consumedFats } =
		calculateDailyNutrition(meals);
	const totalMacros = [consumedCarbs, consumedFats, consumedProteins];

	return (
		<div className='dashboard-summary'>
			<h2 className='dashboard-summary-title'>Summary</h2>

			{/* CALORIES */}
			<div className='dashboard-summary-calories'>
				<div className='summary-calories-ingested'>
					<h3 className='calories-amount'>{consumedCalories}</h3>

					<p className='summary-info calories-ingested'>Ingested</p>
				</div>

				<div className='summary-calories-percentile'>
					<CircularProgressBar
						className='percentile-amount'
						value={(consumedCalories / caloriesReq) * 100}
						progress={consumedCalories}
						maxProgress={caloriesReq}
						circleRatio={0.75}
						strokeWidth={7}
						transformDeg='-135'>
						<h3 className='percentile-amount'>
							{`${consumedCalories ? Math.round((consumedCalories / caloriesReq) * 100) : '0'}%`}
							<p className='summary-info calories-percentile'>
								Daily
								<br />
								requirement
							</p>
						</h3>
					</CircularProgressBar>
				</div>

				<div className='summary-calories-remaining'>
					<h3 className='calories-amount'>{caloriesReq}</h3>

					<p className='summary-info calories-ingested'>Remaining</p>
				</div>
			</div>

			{/* MACROS */}
			<div className='dashboard-summary-macros'>
				{Object.entries(macrosReq).map(([macro, value], id) => {
					return (
						<div key={id} className='macro-container'>
							<p className='summary-info'>{capitalizeFirstLetter(macro)}</p>

							<SimpleProgressBar value={totalMacros[id]} max={value} />

							<h4 className='macro-amount'>
								{`${totalMacros[id]} / ${value} g`}
							</h4>
						</div>
					);
				})}
			</div>
		</div>
	);
}

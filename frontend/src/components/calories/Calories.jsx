// styles
import './Calories.css';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';

import { useState } from 'react';

const MACROS = ['Carbohydrates', 'Proteins', 'Fats'];

export default function Calories({ caloriesReq, macrosReq, meals}) {

	// Calculate total calories of the day
	const calculateTotalCalories = () => {
		let sum = 0 ;

		let mealsCaloriesArray = meals.map((meal) => {
			return Math.round(meal.reduce(
				(sum, portion) => sum + (portion.serving / 100) * portion.calories,
				0
			))
		})

		mealsCaloriesArray.forEach(cal => sum += cal)

		return sum
	}

	return (
		<div className='dashboard-summary'>
			<h2 className='dashboard-summary-title'>Summary</h2>

			<div className='dashboard-summary-calories'>
				<div className='summary-calories-ingested'>

					<h3 className='calories-amount'>
						{calculateTotalCalories()}
					</h3>

					<p className='summary-info calories-ingested'>
						Ingested
					</p>

				</div>

				<div className='summary-calories-percentile'>
					<CircularProgressBar
						className='percentile-amount'
						value={calculateTotalCalories() / caloriesReq * 100}
						circleRatio={0.75}
						strokeWidth={7}
						transformDeg='-135'
					>
						<h3 className='percentile-amount'>
							{`${Math.round(calculateTotalCalories() / caloriesReq * 100)}%`}
							<p className='summary-info calories-percentile'>
								Daily
								<br />
								requirement
							</p>
						</h3>
					</CircularProgressBar>
				</div>

				<div className='summary-calories-remaining'>

					<h3 className='calories-amount'>
						{caloriesReq}
					</h3>

					<p className='summary-info calories-ingested'>
						Remaining
					</p>

				</div>

			</div>

			<div className='dashboard-summary-macros'>
				{MACROS.map((macro, id) => {
					return (
						<div key={id} className='macro-container carbohydrates'>
							<p className='summary-info'>{macro}</p>
							<div className='macro-progress-bar'>
								<div className='macro-progress-bar-fill'></div>
							</div>
							<h4 className='macro-amount'>
								23 /{' '}
								{macrosReq[macro.toLowerCase()] !== ''
									? macrosReq[macro.toLowerCase()]
									: '0'}{' '}
								g
							</h4>
						</div>
					);
				})}
			</div>
		</div>
	);
}

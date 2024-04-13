// styles
import './Calories.css';

// components
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';

import { useState } from 'react'

export default function Calories() {
	const [progressBarValue, setProgressBarValue] = useState('19')

	const macros = ['Carbohydrates', 'Proteins', 'Fats'];

	return (
		<div className='dashboard-summary'>
			<h2 className='dashboard-summary-title'>Summary</h2>
			<div className='dashboard-summary-calories'>
				<div className='summary-calories-ingested'>
					<h3 className='calories-amount'>205</h3>
					<p className='summary-info calories-ingested'>Ingested</p>
				</div>
				<div className='summary-calories-percentile'>
					<CircularProgressBar
						className='percentile-amount'
						value={progressBarValue}
						circleRatio={0.75}
						strokeWidth={8}
						transformDeg='-135'>
						<h3 className='percentile-amount'>
							{`${progressBarValue}%`}
							<p className='summary-info calories-percentile'>
								Daily
								<br />
								requirement
							</p>
						</h3>
					</CircularProgressBar>
				</div>
				<div className='summary-calories-remaining'>
					<h3 className='calories-amount'>1232</h3>
					<p className='summary-info calories-ingested'>Remaining</p>
				</div>
			</div>

			<div className='dashboard-summary-macros'>
				{macros.map((macro) => {
					return (
						<div className='macro-container carbohydrates'>
							<p className='summary-info'>{macro}</p>
							<div className='macro-progress-bar'>
								<div className='macro-progress-bar-fill'></div>
							</div>
							<h4 className='macro-amount'>23 / 175 g</h4>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// styles
import './Calories.css';

// circular progress bar
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Calories() {
	return (
		<div className='dashboard-summary'>
			<h2 className='dashboard-summary-title'>Summary</h2>
			<div className='dashboard-summary-calories'>
				<div className='summary-calories-ingested'>
					<h3 className='calories-amount'>205</h3>
					<p className='summary-info calories-ingested'>Ingested</p>
				</div>
				<div className='summary-calories-percentile'>
					<CircularProgressbarWithChildren
						className='percentile-amount'
						value='19'
						circleRatio={0.75}
						strokeWidth={8}
						styles={{
							trail: {
								stroke: '#d6d6d6',
								strokeLinecap: 'round',
								transform: 'rotate(-135deg)',
								transformOrigin: 'center center',
							},
							path: {
								stroke: 'var(--primary-color)',
								strokeLinecap: 'round',
								transform: 'rotate(-135deg)',
								transformOrigin: 'center center',
							},

							text: {
								fill: 'var(--primary-color)',
							},
						}}>
						{
							<h3 className='percentile-amount'>
								19%
								<p className='summary-info calories-percentile'>
									Daily
									<br />
									requirement
								</p>
							</h3>
						}
					</CircularProgressbarWithChildren>
				</div>
				<div className='summary-calories-remaining'>
					<h3 className='calories-amount'>1232</h3>
					<p className='summary-info calories-ingested'>Remaining</p>
				</div>
			</div>

			<div className='dashboard-summary-macros'>
				<div className='macro-container carbohydrates'>
					<p className='summary-info'>Carbohydrates</p>
					<div className='macro-progress-bar'>
						<div className='macro-progress-bar-fill'></div>
					</div>
					<h4 className='macro-amount'>23 / 175 g</h4>
				</div>

				<div className='macro-container proteins'>
					<p className='summary-info'>Proteins</p>
					<div className='macro-progress-bar'>
						<div className='macro-progress-bar-fill'></div>
					</div>
					<h4 className='macro-amount'>8 / 70 g</h4>
				</div>

				<div className='macro-container fats'>
					<p className='summary-info'>Fats</p>
					<div className='macro-progress-bar'>
						<div className='macro-progress-bar-fill'></div>
					</div>
					<h4 className='macro-amount'>10 / 46 g</h4>
				</div>
			</div>
		</div>
	);
}

// styles
import './Nutrition.css';

// circular progress bar
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Nutrition() {
	return (
		<div className='dashboard-nutrition'>
			<h2 className='dashboard-nutrition-title'>Nutrition</h2>
			<div className='dashboard-nutrition-meal-times'>
				<div className='dashboard-meal-time dashboard-nutrition-breakfast'>
					<CircularProgressbarWithChildren
                    className='dashboard-meal-time-progress'
						value='19'
						strokeWidth={6}
						styles={{
							trail: {
								stroke: '#d6d6d6',
								strokeLinecap: 'round',
								transformOrigin: 'center center',
							},
							path: {
								stroke: 'var(--primary-color)',
								strokeLinecap: 'round',
								transformOrigin: 'center center',
							},

							text: {
								fill: 'var(--primary-color)',
							},
						}}>
						{<p>ICON</p>}
					</CircularProgressbarWithChildren>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Breakfast</h3>
						<p className='meal-time-calories'>205 / 431 kcal</p>
					</div>

					<button className='add-meal'></button>
				</div>
				<div className='dashboard-nutrition-lunch'></div>
				<div className='dashboard-nutrition-dinner'></div>
				<div className='dashboard-nutrition-snacks'></div>
			</div>
		</div>
	);
}

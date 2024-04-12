// styles
import './Nutrition.css';

// icons
import { FaCirclePlus } from 'react-icons/fa6';
import { GiButterToast, GiFruitBowl, GiHotMeal, GiBowlOfRice  } from 'react-icons/gi';


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
						{<GiButterToast className='dashboard-progress-icon' />}
					</CircularProgressbarWithChildren>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Breakfast</h3>
						<p className='meal-time-calories'>205 / 431 kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
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
						{<GiBowlOfRice className='dashboard-progress-icon' />}
					</CircularProgressbarWithChildren>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Lunch</h3>
						<p className='meal-time-calories'>0 / 632 kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
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
						{<GiHotMeal className='dashboard-progress-icon' />}
					</CircularProgressbarWithChildren>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Dinner</h3>
						<p className='meal-time-calories'>0 / 523 kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
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
						{<GiFruitBowl className='dashboard-progress-icon' />}
					</CircularProgressbarWithChildren>

					<div className='meal-time-info'>
						<h3 className='meal-time-title'>Snacks</h3>
						<p className='meal-time-calories'>0 / 212 kcal</p>
					</div>

					<FaCirclePlus className='add-meal-button' />
				</div>
				{/* <div className='dashboard-nutrition-lunch'></div>
				<div className='dashboard-nutrition-dinner'></div>
				<div className='dashboard-nutrition-snacks'></div> */}
			</div>
		</div>
	);
}

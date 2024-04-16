// styles
import './CalculatorInfoContent.css';

import { useState } from 'react';

export default function CalculatorInfoContent({ result }) {
	const [isSaved, setIsSaved] = useState(false);

	const handleClick = () => {
		localStorage.setItem('calculatorData', JSON.stringify(result));
		setIsSaved(true);
		setTimeout(() => {
			setIsSaved(false);
		}, 2500);
	};

	return (
		<div className='dashboard-calculator-info'>
			<h2 className='dashboard-calculator-info-heading'>Daily Calorie Needs</h2>
			<p className='dashboard-calculator-info-content'>
				<b>Calorie counting</b> is an essential part of maintaining a healthy
				weight and lifestyle. By knowing your total daily energy expenditure{' '}
				<b>(TDEE)</b>, you can determine the number of calories you need to
				consume each day to achieve your weight goals.
			</p>
			{result.calories === '' ? (
				<>
					<p className='dashboard-calculator-info-content'>
						For <b>men</b>, the equation is: BMR = 66.5 + (13.75 × weight in kg)
						+ (5.003 × height in cm) - (6.75 × age)
					</p>
					<p className='dashboard-calculator-info-content'>
						For <b>women</b>, the equation is: BMR = 655.1 + (9.563 × weight in
						kg) + (1.850 × height in cm) - (4.676 × age)
					</p>
					<p className='dashboard-calculator-info-content'>
						Once we have calculated your BMR, we can then use it to estimate
						your total daily energy expenditure (TDEE), which is the{' '}
						<b>total number of calories you burn</b> in a day.
					</p>
					<h3 className='dashboard-calculator-info-content-heading'>
						Calculate your daily calorie requirement now!
					</h3>
				</>
			) : (
				<>
					<h3 className='dashboard-calculator-info-content-heading'>
						Your daily caloric requirement:{' '}
						<span className='dasboard-calculator-calories-req'>
							{result.calories ? result.calories : '0'} kcal
						</span>
					</h3>
					<h3 className='dashboard-calculator-info-content-heading'>
						Your daily macronutrients needs:
					</h3>
					<p className='dashboard-calculator-info-macro'>
						<span className='fwb'>
							Carbohydrates: <br />
							<span className='fwn'>
								{result.carbohydrates ? result.carbohydrates : '0'}g
							</span>
						</span>
						<span className='fwb'>
							Fats: <br />
							<span className='fwn'>{result.fats ? result.fats : '0'}g</span>
						</span>
						<span className='fwb'>
							Proteins: <br />{' '}
							<span className='fwn'>
								{result.proteins ? result.proteins : '0'}g
							</span>
						</span>
					</p>
					<p className='dashboard-calculator-info-content-save'>
						We highly recommend saving this information in your dashboard
						profile for future reference.
					</p>

					<button
						onClick={handleClick}
						className='dashboard-calculator-info-btn'>
						{isSaved ? 'Your data has been saved!' : 'Save in my profile'}
					</button>
				</>
			)}
		</div>
	);
}
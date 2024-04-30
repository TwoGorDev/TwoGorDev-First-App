// styles
import './CalculatorInfoContent.css';

// utilities
import { useContext, useState } from 'react';
import useDataApi from '../../hooks/useDataApi';
import { useNavigate } from 'react-router-dom';
import getFormattedDate from '../../utilities/getFormattedDate';
import { SummaryContext } from '../../contexts/SummaryContext';

export default function CalculatorInfoContent({ userNutritionNeeds }) {
	const { setSummary } = useContext(SummaryContext);
	const { isPending, error, postData } = useDataApi();
	const { calories, proteins, carbohydrates, fats } = userNutritionNeeds;
	const [isSaved, setIsSaved] = useState(false);
	const navigate = useNavigate();
	const today = getFormattedDate(new Date());

	// Add user's goal to database
	const addGoal = async () => {
		const res = await postData('/goals', {
			calories,
			proteins,
			carbohydrates,
			fats
		})

		if (res && !error) {
			setIsSaved(true);
			setSummary([]);
			navigate(`/dashboard?date=${today}`);
		}
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
			{calories === 0 ? (
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
							{calories ? calories : '0'} kcal
						</span>
					</h3>
					<h3 className='dashboard-calculator-info-content-heading'>
						Your daily macronutrients needs:
					</h3>
					<p className='dashboard-calculator-info-macro'>
						<span className='fwb'>
							Carbohydrates: <br />
							<span className='fwn'>
								{carbohydrates ? carbohydrates : '0'}g
							</span>
						</span>
						<span className='fwb'>
							Fats: <br />
							<span className='fwn'>{fats ? fats : '0'}g</span>
						</span>
						<span className='fwb'>
							Proteins: <br />{' '}
							<span className='fwn'>
								{proteins ? proteins : '0'}g
							</span>
						</span>
					</p>
					<p className='dashboard-calculator-info-content-save'>
						We highly recommend saving this information in your dashboard
						profile for future reference.
					</p>

					<button
						onClick={addGoal}
						className='dashboard-calculator-info-btn'>
						{!isSaved && !isPending && 'Save to my profile'}
						{isSaved && 'Your data has been saved!'}
						{isPending && 'Loading...'}
					</button>
				</>
			)}
		</div>
	);
}

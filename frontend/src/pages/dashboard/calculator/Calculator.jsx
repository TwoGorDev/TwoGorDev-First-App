// styles
import './Calculator.css';

// components
import CalculatorInfoContent from '../../../components/calculatorInfo/CalculatorInfoContent';

// utils
import { useState } from 'react';
import calculateNutritionNeeds from '../../../utilities/calculateNutritionNeeds';

export default function Calculator() {
	const [error, setError] = useState('')
	const [userData, setUserData] = useState({
		gender: 'male',
		age: '',
		weight: '',
		height: '',
		activity: 'sedentary',
		goal: 'weight-loss'
	});
	const [userNutritonNeeds, setUserNutritionNeeds] = useState({
		calories: 0,
		proteins: 0,
		carbohydrates: 0,
		fats: 0
	})

	// Handle change on user inputs
	const handleChange = (e) => {
		const { name, value } = e.target;

		// If the user is editing age, weight or height - run this code
		if (['age', 'weight', 'height'].includes(name)) {

			// Check if user input is numbers only
			if(/^(\s*|\d+)$/.test(value)) {
				setUserData((prevData) => ({...prevData, [name]: value }));
			}

		// If the user is editing gender, activity or goal - run this code instead
		} else {
			setUserData((prevData) => ({...prevData, [name]: value }));
		}
	};

	// Calculate total nutrition requirements based on user data
	const handleCalculate = (e) => {
		e.preventDefault();

		const { TDEE: calories, proteins, carbohydrates, fats } = calculateNutritionNeeds(userData);

		setUserNutritionNeeds({
			calories,
			carbohydrates,
			proteins,
			fats,
		});
	};

	return (
		<div className='dashboard-calculator-container wrapper'>
			<div className='dashboard-calculator'>
				<h2 className='dashboard-calculator-heading'>
					Calorie Intake Calculator
				</h2>
				<p className='dashboard-calculator-heading-text'>
					Check your daily caloric requirement!
				</p>

				<label className='select-label'>
					Gender:
					<select name='gender' value={userData.gender} onChange={handleChange}>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>

				<div className='input-box'>
					<input
						required
						name='age'
						id='age-input'
						type='text'
						className='dashboard-calculator-input'
						value={userData.age}
						onChange={handleChange}
					/>
					<label htmlFor='age-input'>Age</label>
				</div>

				<div className='input-box'>
					<input
						required
						name='weight'
						id='weight-input'
						type='text'
						className='dashboard-calculator-input'
						value={userData.weight}
						onChange={handleChange}
					/>
					<label htmlFor='weight-input'>Weight (kg)</label>
				</div>

				<div className='input-box'>
					<input
						required
						name='height'
						id='height-input'
						type='text'
						className='dashboard-calculator-input'
						value={userData.height}
						onChange={handleChange}
					/>
					<label htmlFor='height-input'>Height (cm)</label>
				</div>

				<label className='select-label'>
					Activity level:
					<select
						name='activity'
						value={userData.activity}
						onChange={handleChange}>
						<option value='sedentary'>Sedentary (little to no activity)</option>
						<option value='lightly-active'>
							Lightly active (1-3 trainings a week)
						</option>
						<option value='moderately-active'>
							Moderately active (3-5 trainings a week)
						</option>
						<option value='very-active'>
							Very active (training every day)
						</option>
					</select>
				</label>

				<label className='select-label'>
					Goal:
					<select name='goal' value={userData.goal} onChange={handleChange}>
						<option value='weight-loss'>Weight loss</option>
						<option value='maintenance'>Maintenance</option>
						<option value='weight-gain'>Weight gain</option>
					</select>
				</label>

				<button
					className='submit-calculator-form-btn'
					onClick={(e) => handleCalculate(e)}>
					Calculate
				</button>
			</div>

			<CalculatorInfoContent userNutritionNeeds={userNutritonNeeds} />
		</div>
	);
}

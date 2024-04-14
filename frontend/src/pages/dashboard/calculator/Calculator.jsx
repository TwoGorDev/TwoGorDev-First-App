// styles
import './Calculator.css';

// components
import CalculatorInfoContent from '../../../components/calculatorInfo/CalculatorInfoContent'



// context
import { DashboardContext } from '../../../layouts/DashboardLayout';
import { useContext, useState, useEffect } from 'react';

export default function Calculator() {
	const [result, setResult] = useState({
		gender: 'male',
		age: '',
		weight: '',
		height: '',
		activity: 'sedentary',
		goal: 'weight-loss',
		calories: '',
		proteins: '',
		carbohydrates: '',
		fats: '',
	});

	const { setCalculatorData } = useContext(DashboardContext);

	function handleChange(e) {
		setResult((prevResult) => {
			return {
				...prevResult,
				[e.target.name]: e.target.value,
			};
		});
	}

	// function that calculates caloric requirement
	const handleCalculate = (e) => {
		e.preventDefault();

		//========== CALORIES ==========//
		let calories = {};
		// gender check
		if (result.gender === 'male') {
			calories.initialValue = 66.473;
			calories.weightMultiplier = 13.752;
			calories.heightMultiplier = 5.003;
			calories.ageMultiplier = 6.75;
		} else {
			calories.initialValue = 655.1;
			calories.weightMultiplier = 9.563;
			calories.heightMultiplier = 1.85;
			calories.ageMultiplier = 4.676;
		}

		// activity check
		switch (result.activity) {
			case 'sedentary':
				calories.activityMultiplier = 1.2;
				break;
			case 'lightly-active':
				calories.activityMultiplier = 1.4;
				break;
			case 'moderately-active':
				calories.activityMultiplier = 1.6;
				break;
			case 'very-active':
				calories.activityMultiplier = 1.9;
				break;
		}

		// goal check
		switch (result.goal) {
			case 'weight-loss':
				calories.goalMultiplier = -0.15;
				break;
			case 'maintenance':
				calories.goalMultiplier = 0;
				break;
			case 'weight-gain':
				calories.goalMultiplier = 0.15;
				break;
		}

		// calories calculations
		let weightCalc = calories.weightMultiplier * parseInt(result.weight),
			heightCalc = calories.heightMultiplier * parseInt(result.height),
			ageCalc = calories.ageMultiplier * parseInt(result.age),
			BMR = calories.initialValue + weightCalc + heightCalc - ageCalc,
			activeBMR = BMR * calories.activityMultiplier,
			TDEE = Math.floor(activeBMR + activeBMR * calories.goalMultiplier);

		//=========== MACRO ===========/
		let carbohydrates = Math.floor((TDEE * 0.45) / 4),
			proteins = Math.floor((TDEE * 0.25) / 4),
			fats = Math.floor((TDEE * 0.3) / 9);

		setResult((prevResult) => {
			return {
				...prevResult,
				calories: TDEE,
				carbohydrates,
				proteins,
				fats,
			};
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
					<select name='gender' value={result.gender} onChange={handleChange}>
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
						value={result.age}
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
						value={result.weight}
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
						value={result.height}
						onChange={handleChange}
					/>
					<label htmlFor='height-input'>Height (cm)</label>
				</div>

				<label className='select-label'>
					Activity level:
					<select
						name='activity'
						value={result.activity}
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
					<select name='goal' value={result.goal} onChange={handleChange}>
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

			<CalculatorInfoContent result={result} />
		</div>
	);
}

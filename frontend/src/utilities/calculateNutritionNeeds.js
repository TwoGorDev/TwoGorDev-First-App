const calculateNutritionNeeds = (userData) => {

  //========== CALORIES ==========//
  let calories = {};

  // gender check
  if (userData.gender === 'male') {
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
  switch (userData.activity) {
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
  switch (userData.goal) {
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
  let weightCalc = calories.weightMultiplier * parseInt(userData.weight),
    heightCalc = calories.heightMultiplier * parseInt(userData.height),
    ageCalc = calories.ageMultiplier * parseInt(userData.age),
    BMR = calories.initialValue + weightCalc + heightCalc - ageCalc,
    activeBMR = BMR * calories.activityMultiplier,
    TDEE = Math.floor(activeBMR + activeBMR * calories.goalMultiplier);

  //=========== MACRO ===========/
  let carbohydrates = Math.floor((TDEE * 0.45) / 4),
    proteins = Math.floor((TDEE * 0.25) / 4),
    fats = Math.floor((TDEE * 0.3) / 9);

  return { TDEE, proteins, carbohydrates, fats}
}

export default calculateNutritionNeeds;

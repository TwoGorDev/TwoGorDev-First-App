// Types
import { UserData } from "../types/types";

const calculateNutritionNeeds = (userData : UserData) => {

  //========== CALORIES ==========//
  let calorieMultipliers = {
    initialValue: 0,
    weightMultiplier: 0,
    heightMultiplier: 0,
    ageMultiplier: 0,
    activityMultiplier: 0,
    goalMultiplier: 0,
  };

  // gender check
  if (userData.gender === 'male') {
    calorieMultipliers.initialValue = 66.473;
    calorieMultipliers.weightMultiplier = 13.752;
    calorieMultipliers.heightMultiplier = 5.003;
    calorieMultipliers.ageMultiplier = 6.75;
  } else {
    calorieMultipliers.initialValue = 655.1;
    calorieMultipliers.weightMultiplier = 9.563;
    calorieMultipliers.heightMultiplier = 1.85;
    calorieMultipliers.ageMultiplier = 4.676;
  }

  // activity check
  switch (userData.activity) {
    case 'sedentary':
      calorieMultipliers.activityMultiplier = 1.2;
      break;
    case 'lightly-active':
      calorieMultipliers.activityMultiplier = 1.4;
      break;
    case 'moderately-active':
      calorieMultipliers.activityMultiplier = 1.6;
      break;
    case 'very-active':
      calorieMultipliers.activityMultiplier = 1.9;
      break;
  }

  // goal check
  switch (userData.goal) {
    case 'weight-loss':
      calorieMultipliers.goalMultiplier = -0.15;
      break;
    case 'maintenance':
      calorieMultipliers.goalMultiplier = 0;
      break;
    case 'weight-gain':
      calorieMultipliers.goalMultiplier = 0.15;
      break;
  }

  // calories calculations
  let weightCalc = calorieMultipliers.weightMultiplier * parseInt(userData.weight);
  let heightCalc = calorieMultipliers.heightMultiplier * parseInt(userData.height);
  let ageCalc = calorieMultipliers.ageMultiplier * parseInt(userData.age);
  let BMR = calorieMultipliers.initialValue + weightCalc + heightCalc - ageCalc;
  let activeBMR = BMR * calorieMultipliers.activityMultiplier;
  let TDEE = Math.floor(activeBMR + activeBMR * calorieMultipliers.goalMultiplier);

  //=========== MACRO ===========/
  let carbohydrates = Math.floor((TDEE * 0.45) / 4);
  let proteins = Math.floor((TDEE * 0.25) / 4);
  let fats = Math.floor((TDEE * 0.3) / 9);

  return { TDEE, proteins, carbohydrates, fats}
}

export default calculateNutritionNeeds;

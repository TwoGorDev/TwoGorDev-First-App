export default function useCalculateNutritionValues() {
  
  const calculateDailyNutrition = (dailySummary) => {
    let calories = 0;
    let proteins = 0;
    let carbs = 0;
    let fats = 0;

    dailySummary.map(meal => 
      meal.map(portion => {
        calories += (portion.serving / 100) * portion.calories;
        proteins += (portion.serving / 100) * portion.proteins;
        carbs += (portion.serving / 100) * portion.carbohydrates;
        fats += (portion.serving / 100) * portion.fats;
      })
    )

    return {
      consumedCalories: Math.round(calories),
      consumedProteins: Math.round(proteins),
      consumedCarbs: Math.round(carbs),
      consumedFats: Math.round(fats)
    }
  }

  const calculateMealNutrition = (meal) => {
    let calories = 0;
    let proteins = 0;
    let carbs = 0;
    let fats = 0;

    meal && meal.map(portion => {
      calories += (portion.serving / 100) * portion.calories;
      proteins += (portion.serving / 100) * portion.proteins;
      carbs += (portion.serving / 100) * portion.carbohydrates;
      fats += (portion.serving / 100) * portion.fats;
    })

    return {
      consumedCalories: Math.round(calories),
      consumedProteins: Math.round(proteins),
      consumedCarbs: Math.round(carbs),
      consumedFats: Math.round(fats)
    }
  }

  return {
    calculateDailyNutrition,
    calculateMealNutrition
  }
}
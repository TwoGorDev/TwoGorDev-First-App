// Imports
const pool = require('../pool');

module.exports = {
  // Fetch a single goal
  async findByDate(date, creatorId) {
    const { rows } = await pool.query(
      'SELECT * FROM fnGetGoalByUserIdAndDate($1, $2);',
      [creatorId, date]
    );

    return rows[0];
  },

  // Create new goal
  async insert(goal, creatorId) {
    const { calories, proteins, carbohydrates, fats } = goal;

    const { rows } = await pool.query(
      'INSERT INTO goals (user_id, daily_calories, daily_proteins, daily_carbohydrates, daily_fats) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [creatorId, calories, proteins, carbohydrates, fats]
    )

    return rows[0];
  }
}
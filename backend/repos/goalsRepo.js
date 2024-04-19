// Imports
const pool = require('../pool');

module.exports = {
  // Fetch a single goal
  async findByDate(date, creatorId) {
    const { rows } = await pool.query(
      'SELECT * FROM goals WHERE user_id = $1 AND created_at > $2::date ORDER BY id;',
      [creatorId, date]
    );

    return rows[0];
  },

  async insert(goal, creatorId) {
    const { calories, proteins, carbohydrates, fats } = goal;

    const { rows } = await pool.query(
      'INSERT INTO goals (user_id, daily_calories, daily_proteins, daily_carbohydrates, daily_fats) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [creatorId, calories, proteins, carbohydrates, fats]
    )

    return rows[0];
  }
}
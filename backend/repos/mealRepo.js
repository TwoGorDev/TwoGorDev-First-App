// Imports
const pool = require('../pool');

module.exports = {
  // Fetch a single meal
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM meals WHERE id = $1',
      [id]
    );

    return rows[0];
  },

  // Create new meal
  async insert(meal, creatorId) {
    const { type, date } = meal;

    const { rows } = await pool.query(
      'INSERT INTO meals (user_id, type, date) VALUES ($1, $2, $3) RETURNING *;',
      [creatorId, type, date]
    );

    return rows[0];
  },

  // Delete existing meal
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM meals WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
}
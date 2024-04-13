// Imports
const pool = require('../pool');

module.exports = {
  // Find portion by id
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM portions WHERE id = $1;',
      [id]
    );

    return rows[0];
  },

  // Create new portions
  async insert(portion, creatorId) {
    const { mealId, productId, serving } = portion;
    
    const { rows } = await pool.query(
      'INSERT INTO portions (meal_id, product_id, serving, user_id) VALUES ($1, $2, $3, $4) RETURNING *;',
      [mealId, productId, serving, creatorId]
    );

    return rows[0];
  },

  // Delete existing portion
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM portions WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
}
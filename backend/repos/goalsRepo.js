// Imports
const pool = require('../pool');

module.exports = {
  // Fetch a single goal
  async findByDate(date, creatorId) {
    const { rows } = await pool.query(
      'SELECT * FROM goals WHERE user_id = $1 AND created_at > $2::date ORDER BY id',
      [creatorId, date]
    );

    return rows[0];
  }
}
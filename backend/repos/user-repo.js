const pool = require('../pool');

module.exports = {
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1;',
      [id]
    );

    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0]
  },

  async login(username, email, password) {
    
  },

  async register(username, email, password) {

  }
};
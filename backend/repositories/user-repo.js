const pool = require('../pool');

module.exports = {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT username, email FROM users;'
    );

    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1;',
      [id]
    );

    return rows[0];
  },

  async insert(username, email, password) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
      [username, email, password]
    );

    return rows[0];
  },

  async update(id, username, email, password) {
    const { rows } = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING *;',
      [username, email, password, id]
    )

    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
};
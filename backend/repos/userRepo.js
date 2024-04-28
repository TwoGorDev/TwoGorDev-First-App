// Imports
const pool = require('../pool');

module.exports = {
  // Fetch all users
  async findAll() {
    const { rows } = await pool.query(
      'SELECT id, username, email, role, created_at, updated_at FROM users;'
    );

    return rows;
  },


  // Fetch a single user by id
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1;',
      [id]
    );

    return rows[0];
  },

  // Fetch a single user by username
  async findByUsername(username) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1;',
      [username]
    );

    return rows[0];
  },

  // Fetch a single user by email
  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return rows[0]
  },

  // Insert new user
  async insert(user) {
    const { username, email, password } = user;
    
    const { rows } = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
      [username, email, password]
    );

    return rows[0];
  },

  // Update an existing user
  async update(user, id) {
    const { username, email, password, bio, avatar_url } = user;

    const { rows } = await pool.query(
      'UPDATE users SET username = updateIfChanged($1, username), email = updateIfChanged($2, email), password = updateIfChanged($3, password), bio = updateIfChanged($4, bio), avatar_url = updateIfChanged($5, avatar_url), updated_at = NOW() WHERE id = $6 RETURNING *;',
      [username, email, password, bio, avatar_url, id]
    )

    return rows[0];
  },

  // Update an existing user avatar
  async updateUserAvatar(url, id) {
    const { rows } = await pool.query(
      'UPDATE users SET avatar_url = $1, updated_at = NOW() WHERE id = $2 RETURNING *;',
      [url, id]
    );

    return rows[0];
  },

  // Delete an existing user
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
};
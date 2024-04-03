const pool = require('../pool');

module.exports = {
  async find() {
    const { rows } = await pool.query('SELECT * FROM products;');

    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    return rows[0];
  },

  async insert(name, calories, proteins, carbohydrates, fats) {
    const { rows } = await pool.query(
      'INSERT INTO products (name, calories, proteins, carbohydrates, fats) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [name, calories, proteins, carbohydrates, fats]
    );

    return rows[0];
  },

  async update(id, name, calories, proteins, carbohydrates, fats) {
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, calories = $2, proteins = $3, carbohydrates = $4, fats = $5 WHERE id = $6 RETURNING *;',
      [name, calories, proteins, carbohydrates, fats, id]
    );

    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
};
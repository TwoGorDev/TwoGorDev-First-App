// Imports
const pool = require('../pool');

module.exports = {
  // Fetch all products
  async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM products;'
    );

    return rows;
  },

  // Fetch a single product by id
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE id = $1;',
      [id]
    );

    return rows[0];
  },

  // Insert a new product
  async insert(product) {
    const { name, calories, proteins, carbohydrates, fats } = product;
    
    const { rows } = await pool.query(
      'INSERT INTO products (name, calories, proteins, carbohydrates, fats) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [name, calories, proteins, carbohydrates, fats]
    );

    return rows[0];
  },

  // Update an existing product
  async update(id, product) {
    const { name, calories, proteins, carbohydrates, fats } = product;
    
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, calories = $2, proteins = $3, carbohydrates = $4, fats = $5, updated_at = NOW() WHERE id = $6 RETURNING *;',
      [name, calories, proteins, carbohydrates, fats, id]
    );

    return rows[0];
  },

  // Delete an existing product
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
};
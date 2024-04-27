// Imports
const pool = require('../pool');
const format = require('pg-format');

module.exports = {
  // Find a single portion by id
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM portions WHERE id = $1;',
      [id]
    );

    return rows[0];
  },

  // Find multiple portions by range of id's
  async findManyByIds(idsArray) {
    const { rows } = await pool.query(
      'SELECT * FROM portions WHERE id = ANY($1)',
      [idsArray]
    ) ;

    return rows;
  },

  // Create new portions
  async insert(portions, creatorId) {
    const arrayOfArraysWithCreatorId = portions.map(portionObject => Object.values(portionObject)).map(portionArray => portionArray.concat([creatorId]));

    const { rows } = await pool.query(format(
      'INSERT INTO portions (meal_id, product_id, serving, user_id) VALUES %L RETURNING *;', arrayOfArraysWithCreatorId
    ));

    return rows[0];
  },

  // Delete a single portion by id
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM portions WHERE id = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  },

  // Delete multiple portions by range of id's
  async deleteMany(idsArray) {
    const { rows } = await pool.query(
      'DELETE FROM portions WHERE id = ANY($1)',
      [idsArray]
    )

    return rows;
  }
};
// Imports
const pool = require('../pool');

module.exports = {
  // Fetch a single daily summary by date
   async findByDate(date, id) {

    const { rows } = await pool.query(
      'SELECT meals.user_id AS user_id, meals.id AS meal_id, type as meal_type, portions.id AS portion_id, serving, products.id AS product_id, name AS product, calories, proteins, carbohydrates, fats FROM meals FULL JOIN portions ON meals.id = portions.meal_id FULL JOIN products ON products.id = portions.product_id WHERE meals.user_id = $1 AND date = $2;',
      [id, date]
    );

    return rows;
  }
};
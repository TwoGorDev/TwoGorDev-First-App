// Imports
const pool = require('../pool');

module.exports = {
  // Fetch a single daily summary by date
   async getDailySummary(date, id) {

    const { rows } = await pool.query(
      'SELECT meals.id AS meal_id, type as meal_type, portions.id AS portion_id, serving, name AS product, calories, proteins, carbohydrates, fats FROM meals JOIN portions ON meals.id = portions.meal_id JOIN products ON products.id = portions.product_id WHERE meals.user_id = $1 AND date = $2;',
      [id, date]
    );

    return rows;
  }
};
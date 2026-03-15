const { pool } = require('../config/db');

/**
 * Insert a new school into the database.
 */
const addSchool = async ({ name, address, latitude, longitude }) => {
  const sql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, address, latitude, longitude
  `;
  const { rows } = await pool.query(sql, [
    name.trim(),
    address.trim(),
    parseFloat(latitude),
    parseFloat(longitude),
  ]);
  return rows[0];
};

/**
 * Fetch all schools from the database.
 */
const getAllSchools = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, address, latitude, longitude FROM schools'
  );
  return rows;
};

module.exports = { addSchool, getAllSchools };

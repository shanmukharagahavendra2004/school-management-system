const { pool } = require('../config/db');


const addSchool = async ({ name, address, latitude, longitude }) => {
  const sql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [
    name.trim(),
    address.trim(),
    parseFloat(latitude),
    parseFloat(longitude),
  ]);

  return {
    id: result.insertId,
    name: name.trim(),
    address: address.trim(),
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
};


const getAllSchools = async () => {
  const [rows] = await pool.execute(
    'SELECT id, name, address, latitude, longitude FROM schools'
  );
  return rows;
};

module.exports = { addSchool, getAllSchools };

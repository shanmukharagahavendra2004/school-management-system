require('dotenv').config();
const { Pool } = require('pg');

// Create connection pool for better performance
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'school_management',
  port:     process.env.DB_PORT     || 5432,
  max:      10,
  idleTimeoutMillis:       30000,
  connectionTimeoutMillis: 2000,
});

// Test DB connection on startup
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { pool, testConnection };

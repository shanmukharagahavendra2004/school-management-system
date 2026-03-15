require('dotenv').config();
const express = require('express');
const schoolRoutes = require('./routes/schoolRoutes');
const { testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', schoolRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'School Management API is running', version: '1.0.0' });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});


const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
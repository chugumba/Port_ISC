const express = require('express');
const cors = require('cors');
// Пути
const adminRoute = require('./routes/login');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Путь для авторизации
app.use('/login', adminRoute);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
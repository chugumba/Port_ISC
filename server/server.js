const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Пути
const loginRoute = require('./routes/login');

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Путь для авторизации
app.use('/login', loginRoute);


const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
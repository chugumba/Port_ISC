const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Пути
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');

const app = express();
app.use(cookieParser());
/*app.use(cors( {
  credentials: true,
  origin: "http://localhost:3000",
}));*/
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (origin === "http://localhost:3000" || origin === "http://localhost:4173") {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

const PORT = 5000;

// Путь для авторизации
app.use('/login', loginRoute);
app.use('/user', userRoute);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
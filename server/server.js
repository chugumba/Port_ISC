const express = require('express');
const cors = require('cors');
//Пути
const getDBRoute = require('./routes/getDB');
const adminRoute = require('./routes/admin');

const app = express();
app.use(cors());

const PORT = 5000;

//Взаимодействие с БД
app.use('/getDB', getDBRoute);
//Пустой путь
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
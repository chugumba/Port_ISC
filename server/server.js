const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'port_isc'
});

// Маршрут для получения списка таблиц
app.get('/tables', (req, res) => {
  // Подключение к базе данных
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      res.status(500).send('Error connecting to database');
      return;
    }

    console.log('Connected to database');

    // Запрос для получения списка таблиц
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Error executing query');
        return;
      }

      // Отправка списка таблиц в виде JSON-ответа
      res.json(results.map((table) => Object.values(table)[0]));
    });

    // Закрытие подключения к базе данных
    connection.end();
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

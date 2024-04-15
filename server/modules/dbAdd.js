//Это модуль для работы с БД

const mysql = require('mysql2/promise');
//Конфигурация БД
const dbConf = require('../configs/db.config');
//Пул сеодинений
const pool = mysql.createPool(dbConf);
//Запрос к базе данных является асинхронной операцией, и нам нужно дождаться ее завершения, 
//прежде чем отправить результаты клиенту.
async function getAccountants() {
  try {
    const connection = await pool.getConnection();

    const [results, fields] = await connection.query(
      'SELECT * FROM `users`'
    );

    connection.release();
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = getAccountants;

//Этот роутер направляет на модуль, в котором находится логика взаимодействия с базой данных

const express = require ('express');
const router = express.Router();

const getDB = require ('../modules/dbAdd');

router.get('/', async (req,res) => {
  try {
    const accountants = await getDB();
    res.json(accountants);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
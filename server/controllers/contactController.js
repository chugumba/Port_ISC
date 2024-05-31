//Контроллер для действий неавторизованного пользователя

const db = require('../models/db');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

class contactController {
  async contact(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Error', errors: errors.array() });
      }

      const { name, email, phone, message } = req.body;

      await db.query(`INSERT INTO contact_form_applications (name, email, phone_number, message) VALUES (?, ?, ?, ?)`, [name, email, phone, message]);

      res.json({ message: 'Contact added successfully' });
    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }
  }

  async vacancies(req, res, next) {
    try {
      const result = await db.query('SELECT * FROM vacancies');
      return res.json(result[0]);
    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }
  }
  
}

module.exports = new contactController();
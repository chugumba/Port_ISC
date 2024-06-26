//Контроллер для действий HR

const db = require('../models/db');
const ApiError = require('../exceptions/apiError');

class hrController {

  //Страница вакансий 

  async vacanciesAdd(req, res, next) {
    try {

      const { title, description, requirements, benefits, contactEmail, contactPhone} = req.body;
      await db.query(`INSERT INTO vacancies (title, description, requirements, benefits, contactEmail, contactPhone) VALUES (?, ?, ?, ?, ?, ?)`, [title, description, requirements, benefits, contactEmail, contactPhone]);
      res.json({ message: 'Vacancy added successfully' });

    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }
  }

  async vacanciesDelete(req, res, next) {
    try {

      const { id } = req.body;
      await db.query(`DELETE FROM vacancies WHERE id = ?`, [id]);
      res.json({ message: 'Vacancy deleted successfully' });

    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }
  }

  async vacanciesUpdate(req, res, next) {
    try {
      const { id, title, description, requirements, benefits, contactEmail, contactPhone } = req.body;

      await db.query(
        `UPDATE vacancies SET title = ?, description = ?, requirements = ?, benefits = ?, contactEmail = ?, contactPhone = ? WHERE id = ?`,
        [title, description, requirements, benefits, contactEmail, contactPhone, id]
      );

      res.json({ message: 'Vacancy updated successfully' });
    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }
  }

  //Страница заявок
  async applicationsGet(req, res, next) {
  
    try {
      const result = await db.query('SELECT * FROM contact_form_applications');
      return res.json(result[0]);
    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }

  }

  async applicationsUpdate (req, res, next) {
  
    const {status, id} = req.body;

    try {
      const result = await db.query('UPDATE contact_form_applications SET status = ? WHERE id = ?', [status, id]);
      return res.json ({message: 'Applicatuion updated successfully'});
    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }

  }
  
}

module.exports = new hrController();
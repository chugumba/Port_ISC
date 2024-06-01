//Контроллер для действий HR

const db = require('../models/db');
const bcrypt = require ('bcryptjs');
const ApiError = require('../exceptions/apiError');

class adminController {

  //Страница вакансий 


  async userDelete(req, res, next) {
    try {

      const { id } = req.body;
      await db.query(`DELETE FROM users WHERE id = ?`, [id]);
      res.json({ message: 'User deleted successfully' });

    } catch (e) {
      next(e);
      res.status(400).json({ message: 'Error' });
    }
  }

  async userUpdate(req, res, next) {
    try {
      const { id, username, password, role, phone, email } = req.body;
      const hashPassword = await bcrypt.hash(password, 7);
  
      const [roles] = await db.query('SELECT * FROM roles WHERE name = ?', [role]);
      //Сделать так, чтобы при отсутствии роли в списке она добавлялась
      if (roles.length <= 0) {
        return next(ApiError.BadRequest("Роль пользователя не найдена"));
      }
  
      await db.query(
        `UPDATE users SET username = ?, password = ?, role = ?, phone = ?, email = ? WHERE id = ?`,
        [username, hashPassword, role, phone, email, id]
      );
  
      res.json({ message: 'User updated successfully' });
    } catch (e) {
      next(e);
    }
  }
  
  
}

module.exports = new adminController();
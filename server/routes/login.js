const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


//admin
router.post('/registration', roleMiddleware(['admin']), [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 25 символов").isLength({min:4, max:25})
], controller.registration)
router.get('/users', roleMiddleware(['admin']),controller.getUsers)

//security

//HR

//Finances

//Logistics

//все пользователи
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/refresh', controller.refresh)

module.exports = router
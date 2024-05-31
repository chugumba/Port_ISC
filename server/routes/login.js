const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController') //контроллер для авторизации
const hrController = require('../controllers/hrController') //контроллер для hr

const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


//Admin
router.post('/registration', roleMiddleware(['admin']), [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 25 символов").isLength({min:4, max:25})
], controller.registration) //регистрирует пользователя

router.get('/users', roleMiddleware(['admin']),controller.getUsers) //выводит всех пользователей

//Security
    //

//HR
    //ВАКАНСИИ
    router.post('/vacanciesadd', roleMiddleware(['hr']), hrController.vacanciesAdd ) // вставка в таблицу с вакансиями
    router.delete('/vacanciesdel', roleMiddleware(['hr']), hrController.vacanciesDelete ) // удаление из таблицы с вакансиями
    router.put('/vacanciesupd', roleMiddleware(['hr']), hrController.vacanciesUpdate ) // обновление в таблице с вакансиями

//Finances
    //

//Logistics
    //

//все пользователи
router.post('/login', controller.login) // авторизация
router.post('/logout', controller.logout) // выход
router.get('/refresh', controller.refresh) // обновление токена авторизации

module.exports = router
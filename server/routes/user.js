// роутер для неавторизованного пользователя

const Router = require('express')
const router = new Router()
const {check, oneOf, body} = require("express-validator")
const controller = require('../controllers/contactController')

//Отправляет заявку через форму связи

router.post('/contact',   [
    check('name', 'Имя является обязательным').not().isEmpty(),
    oneOf([
      body('email').isEmail().withMessage('Некорректный email'),
      body('phone').isMobilePhone().withMessage('Некорректный номер телефона')
    ], 'Необходимо указать email или номер телефона'),
    check('message').optional().isString().withMessage('Сообщение должно быть строкой')
  ], controller.contact)

//Получает вакансии из БД 

router.get('/vacancies', controller.vacancies)

module.exports = router
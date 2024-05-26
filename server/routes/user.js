const Router = require('express')
const router = new Router()
const {check, oneOf, body} = require("express-validator")
const controller = require('../controllers/contactController')

router.post('/contact',   [
    check('name', 'Имя является обязательным').not().isEmpty(),
    oneOf([
      body('email').isEmail().withMessage('Некорректный email'),
      body('phone').isMobilePhone().withMessage('Некорректный номер телефона')
    ], 'Необходимо указать email или номер телефона'),
    check('message').optional().isString().withMessage('Сообщение должно быть строкой')
  ], controller.contact)

module.exports = router
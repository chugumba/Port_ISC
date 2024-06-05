const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController') //контроллер для авторизации
const hrController = require('../controllers/hrController') //контроллер для hr
const adminController = require('../controllers/adminController') // Контроллер для администратора
const logisticsController = require('../controllers/logisticsController') // Контроллер для администратора

const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware') // Проверка авторизации
const roleMiddleware = require('../middleware/roleMiddleware') // Прповерка авторизации под определённой ролью


//Admin
router.post('/registration', roleMiddleware(['admin']), [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 25 символов").isLength({min:4, max:25}),
    check('phone').isMobilePhone(),
    check('email').isEmail(),
], controller.registration) //регистрирует пользователя

router.get('/users', roleMiddleware(['admin']),controller.getUsers) //выводит всех пользователей

router.delete('/usersdel', roleMiddleware(['admin']), adminController.userDelete) // удаление пользователя
router.put('/usersupd', roleMiddleware(['admin']), 
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 25 символов").isLength({min:4, max:25}),
    check('phone').isMobilePhone(),
    check('email').isEmail(), 
adminController.userUpdate) // Обновить данные о пользователе


//Security
    //

//HR
    //ВАКАНСИИ
    router.post('/vacanciesadd', roleMiddleware(['hr']), hrController.vacanciesAdd ) // вставка в таблицу с вакансиями
    router.delete('/vacanciesdel', roleMiddleware(['hr']), hrController.vacanciesDelete ) // удаление из таблицы с вакансиями
    router.put('/vacanciesupd', roleMiddleware(['hr']), hrController.vacanciesUpdate ) // обновление в таблице с вакансиями
    //ЗАЯВКИ
    router.get('/applicationget', roleMiddleware(['hr']), hrController.applicationsGet) // запрос оставленных заявок
    router.put('/applicationupd', roleMiddleware(['hr']), hrController.applicationsUpdate) // Обновить статус

//Finances
    //

//Logistics
    //
    router.post('/shiparrival', roleMiddleware(['logistics']), logisticsController.arrivalAdd) // Фиксация прибытия судна
    
    //Контейнеры
    router.post('/containersadd', roleMiddleware(['logistics']), logisticsController.containersAdd) // Фиксация прибытия контейнеров
    router.get('/containersget', roleMiddleware(['logistics']), logisticsController.containersGet) // Получение информации о платформах для контейнеров
    router.put('/containersmove', roleMiddleware(['logistics']), logisticsController.containersMove) // Перемещение контейнера
    
    // Платформы
    router.get('/platformsget', roleMiddleware(['logistics']), logisticsController.platformsGet) // Получение информации о платформах для контейнеров
    

//все пользователи
router.post('/login', controller.login) // авторизация
router.post('/logout', controller.logout) // выход
router.get('/refresh', controller.refresh) // обновление токена авторизации

module.exports = router
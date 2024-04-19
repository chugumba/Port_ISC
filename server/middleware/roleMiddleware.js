//Проверка авторизации для конкретного пользователя

const jwt = require('jsonwebtoken')
const {secret} = require('../configs/secret')


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            let {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            //Костыль, если передаётся не массив, то преобразует
            if (!Array.isArray(userRoles)) {
                userRoles = [userRoles];
            }

            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};
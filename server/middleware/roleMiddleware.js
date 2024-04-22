//Проверка авторизации для конкретного пользователя

const jwt = require('jsonwebtoken')
const {secret} = require('../configs/secret')
const tokenService = require('../service/tokenService');


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
            let {role: userRoles} = tokenService.validateAccessToken(token);
            //all - доступ всем авторизованным пользователям
            if(roles != "all"){
                let hasRole = false
                //Рассчитано на то, что у пользователя может быть несколько ролей сразу
                //И если хотя бы одна из них подходит, то даёт доступ
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
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};
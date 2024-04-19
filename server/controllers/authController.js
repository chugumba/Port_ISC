//Авторизация с применением хэширования и JWT (json web token)

const db = require ('../models/db');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const {secret} = require("../configs/secret")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const { username, password, role } = req.body;
            const [candidates] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (candidates.length > 0) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const [roles] = await db.query('SELECT * FROM roles WHERE name = ?', [role]);
            //Сделать так, чтобы при отсутствии роли в списке она добавлялась
            if (roles.length <= 0) {
                return res.status(400).json({ message: "Роль пользователя не найдена" });
            }
            await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashPassword, role]);
            
            return res.json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            const user = users[0];
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`});
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query('SELECT * FROM users');
            res.json(users)
            
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
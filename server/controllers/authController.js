//Авторизация с применением хэширования и JWT (json web token)

const db = require ('../models/db');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const {secret} = require("../configs/secret")
const userService = require('../service/userService');
const ApiError = require('../exceptions/apiError');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"} )
}

class authController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const { username, password, role } = req.body;
            const userData = await userService.registration(username, password, role);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            return next(e);
            //res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await userService.login(username, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            return next(e);
            //res.status(400).json({message: 'Login error'})
        }
    }
    
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            return next(e);
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            return next(e);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users[0]);
            
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
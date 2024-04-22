const db = require ('../models/db');
const bcrypt = require ('bcryptjs');
const tokenService = require ('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError');

class UserService {

    async registration(username, password, role){
            const [candidates] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (candidates.length > 0) {
                throw ApiError.BadRequest("Пользователь с таким именем уже существует");
            }
            const hashPassword =  await bcrypt.hash(password, 7);
            const [roles] = await db.query('SELECT * FROM roles WHERE name = ?', [role]);
            //Сделать так, чтобы при отсутствии роли в списке она добавлялась
            if (roles.length <= 0) {
                throw ApiError.BadRequest("Роль пользователя не найдена");
            }
            await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashPassword, role]);

            const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

            if (user.length <= 0) {
                throw ApiError.BadRequest("Зарегестрированный пользователь не найден");
            }

            const userDto = new UserDto({
                id: user[0].id,
                username: user[0].username,
                role: user[0].role
            });
            
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, user: userDto}
    }
    
    async login(username, password) {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = users[0];
        if (!user) {
            throw ApiError.BadRequest(`Пользователь ${username} не найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto({
            id: user.id,
            username: user.username,
            role: user.role
        });
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userData.id]);
        const user = users[0];
        const userDto = new UserDto({
            id: user.id,
            username: user.username,
            role: user.role
        });
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await db.query('SELECT * FROM users');
        return users;
    }

}

module.exports = new UserService();
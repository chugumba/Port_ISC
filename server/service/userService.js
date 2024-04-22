const db = require ('../models/db');
const bcrypt = require ('bcryptjs');
const tokenService = require ('./tokenService')
const UserDto = require('../dtos/userDto')

class UserService {

    async registration(username, password, role){
            const [candidates] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (candidates.length > 0) {
               throw new Error ("Пользователь с таким именем уже существует");
            }
            const hashPassword =  await bcrypt.hash(password, 7);
            const [roles] = await db.query('SELECT * FROM roles WHERE name = ?', [role]);
            //Сделать так, чтобы при отсутствии роли в списке она добавлялась
            if (roles.length <= 0) {
                throw new Error ("Роль пользователя не найдена");
            }
            await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashPassword, role]);

            const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

            if (user.length <= 0) {
                throw new Error ("Зарегестрированный пользователь не найден");
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
    /*
    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
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
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
*/
}

module.exports = new UserService();
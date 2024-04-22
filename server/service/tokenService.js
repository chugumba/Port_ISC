const jwt = require('jsonwebtoken');
const db = require ('../models/db');

const {secret} = require("../configs/secret")
const {refreshSecret} = require("../configs/refreshSecret")

class TokenService {
    generateTokens(payload) {

        const accessToken = jwt.sign(payload, secret, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: '30s'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, refreshSecret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const [tokenData] = await db.execute(`SELECT * FROM token WHERE user = ?`, [userId]);
            if (tokenData.length > 0) {
              await db.execute(`UPDATE token SET refreshToken = ? WHERE user = ?`, [refreshToken, userId]);
              return tokenData[0];
            }
            const [token] = await db.execute(`INSERT INTO token (user, refreshToken) VALUES (?, ?)`, [userId, refreshToken]);
            return { insertId: token.insertId }; // Return the inserted ID
          } catch (e) {
            throw e;
        }
    }

    async removeToken(refreshToken) {
        try {
            const result = await db.execute(`DELETE FROM token WHERE refreshToken = ?`, [refreshToken]);
            return result.affectedRows > 0; 
        } catch (error) {
            throw error;
        }
    }

    async findToken(refreshToken) {
        try {
            const [tokenData] = await db.execute(`SELECT * FROM token WHERE refreshToken = ?`, [refreshToken]);
            return tokenData[0];
          } catch (error) {
            throw error;
        }
    }
}

module.exports = new TokenService();
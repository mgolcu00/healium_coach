// src/services/auth.service.js
const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const authMiddleware = require('../../middleware/auth.middleware');

class AuthService {


    async signup(name, email, password) {
        const user = await userService.signup(name, email, password);
        if (!user) throw new Error('User cannot be created');
        const token = authMiddleware.generateToken(user._id);
        return { user, token };
    }

    async login(email, password) {
        const user = await userService.login(email, password);
        if (!user) throw new Error('User not found');
        const token = authMiddleware.generateToken(user._id);
        return { user, token };
    }
}

module.exports = new AuthService();

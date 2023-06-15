// src/features/user/user.service.js
const User = require('./user.model');
const bcrypt = require('bcrypt');

class UserService {

    async login(email, password) {
        console.log('login', email, password);
        const user = this.getUserByEmail(email);
        if (!user) throw new Error('User not found');
        return user;
    }

    async signup(name, email, password) {
        const createdUser = await this.createUser({ name, email, password });
        return createdUser;
    }

    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async getUserById(id) {
        return User.findById(id);
    }

    async getUserByEmail(email) {
        return User.findOne({ email });
    }

    async updateUser(id, updateData) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        Object.keys(updateData).forEach((key) => {
            user[key] = updateData[key];
        });

        await user.save();
        return user;
    }

    async deleteUser(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        await user.remove();
        return user;
    }
}

module.exports = new UserService();

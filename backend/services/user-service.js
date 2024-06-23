const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {

    async register(username, password) {
        try {
            const user = new User({ username });
            await user.setPassword(password);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async login(username, password) {
        try {
            const user = await User.authenticate()(username, password);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async logout(req) {
        try {
            req.logout();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService(User);

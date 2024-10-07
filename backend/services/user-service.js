const BaseService = require("./base-service");
const User = require("../models/user");

class UserService extends BaseService {
    async findByEmail(email) {
        return this.findBy("email", email);
    }

    async findByName(name) {
        return this.findBy("name", name);
    }

    async findByLocation(location) {
        return this.query({ location });
    }

    async findByDate(date) {
        return this.query({ date });
    }

     // Kullanıcı kaydı sırasında mevcut e-posta kontrolü için
     async isEmailRegistered(email) {
        const user = await this.findByEmail(email);
        return user !== null; // E-posta kayıtlıysa true döner
    }
}

module.exports = new UserService(User);

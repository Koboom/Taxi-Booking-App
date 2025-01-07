const BaseService = require("../base-service")
const Passenger = require("../../models/taxi-booking/passenger")

class PassengerService extends BaseService {
    async findByName(name) {
        return this.findBy("name", name)
    }
    async findByLocation(location) {
        return this.query({ location });
    }

    async findByDate(date) {
        return this.query({ date });
    }
}

module.exports = new PassengerService(Passenger)
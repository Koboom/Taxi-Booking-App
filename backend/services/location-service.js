const BaseService = require("./base-service");
const Location = require("../models/location");

class LocationService extends BaseService {
    // Yolcuya göre konumları bulan metod
    async findByPassenger(passengerId) {
        return this.query({ passenger: passengerId });
    }

    // Sürücüye göre konumları bulan metod
    async findByDriver(driverId) {
        return this.query({ driver: driverId });
    }

    // Belirli bir tarihten sonra alınan konumları bulan metod
    async findByDateAfter(date) {
        return this.query({ date: { $gte: date } });
    }

    // Belirli bir tarihten önce alınan konumları bulan metod
    async findByDateBefore(date) {
        return this.query({ date: { $lte: date } });
    }
}

module.exports = new LocationService(Location);

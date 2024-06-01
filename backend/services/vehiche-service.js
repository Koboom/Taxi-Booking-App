const BaseService = require("./base-service");
const Vehicle = require("../models/vehicle");

class VehicleService extends BaseService {
    // Aracı plaka numarasına göre bulan metod
    async findByPlateNumber(plateNumber) {
        return this.findBy("plateNumber", plateNumber);
    }

    // Aracın markasına göre bulan metod
    async findByBrand(brand) {
        return this.findBy("brand", brand);
    }

    // Aracın modeline göre bulan metod
    async findByModel(model) {
        return this.findBy("model", model);
    }

    // Aracın yılına göre bulan metod
    async findByYear(year) {
        return this.findBy("year", year);
    }
}

module.exports = new VehicleService(Vehicle);

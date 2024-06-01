const BaseService = require("./base-service");
const Review = require("../models/review");

class ReviewService extends BaseService {
    // Yolcuya göre incelemeleri bulan metod
    async findByPassenger(passengerId) {
        return this.query({ passenger: passengerId });
    }

    // Sürücüye göre incelemeleri bulan metod
    async findByDriver(driverId) {
        return this.query({ driver: driverId });
    }

    // Belirli bir aralıktaki derecelendirmelere göre incelemeleri bulan metod
    async findByRatingRange(minRating, maxRating) {
        return this.query({ rating: { $gte: minRating, $lte: maxRating } });
    }
}

module.exports = new ReviewService(Review);

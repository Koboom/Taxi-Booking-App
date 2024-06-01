const BaseService = require("./base-service");
const Notification = require("../models/notification");

class NotificationService extends BaseService {
    // Yolcuya göre bildirimleri bulan metod
    async findByPassenger(passengerId) {
        return this.query({ passenger: passengerId });
    }

    // Konuya göre bildirimleri bulan metod
    async findByTopic(topicId) {
        return this.query({ topic: topicId });
    }

    // Belirli bir tarihten sonra gönderilen bildirimleri bulan metod
    async findByDateAfter(date) {
        return this.query({ date: { $gte: date } });
    }

    // Belirli bir tarihten önce gönderilen bildirimleri bulan metod
    async findByDateBefore(date) {
        return this.query({ date: { $lte: date } });
    }
}

module.exports = new NotificationService(Notification);

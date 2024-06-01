const BaseService = require("./base-service");
const Message = require("../models/message");

class MessageService extends BaseService {
    // Yolcuya göre mesajları bulan metod
    async findByPassenger(passengerId) {
        return this.query({ passenger: passengerId });
    }

    // Konuya göre mesajları bulan metod
    async findByTopic(topicId) {
        return this.query({ topic: topicId });
    }

    // Belirli bir tarihten sonra gönderilen mesajları bulan metod
    async findByDateAfter(date) {
        return this.query({ date: { $gte: date } });
    }

    // Belirli bir tarihten önce gönderilen mesajları bulan metod
    async findByDateBefore(date) {
        return this.query({ date: { $lte: date } });
    }
}

module.exports = new MessageService(Message);

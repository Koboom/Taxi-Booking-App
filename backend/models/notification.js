const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Kullanıcıyı temsil eden model, örneğin Passenger veya Driver
    },
    content: { type: String, required: true }, // Bildirim içeriği
    read: { type: Boolean, default: false }, // Bildirimin okunup okunmadığını belirten alan
    timestamp: { type: Date, default: Date.now } // Bildirimin oluşturulma tarihi ve saati
});

module.exports = mongoose.model("Notification", NotificationSchema);

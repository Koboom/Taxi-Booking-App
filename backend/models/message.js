const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Göndericiyi temsil eden model, örneğin Passenger veya Driver
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Alıcıyı temsil eden model, örneğin Passenger veya Driver
    },
    content: { type: String, required: true }, // Mesaj içeriği
    timestamp: { type: Date, default: Date.now } // Mesajın gönderilme tarihi ve saati
});

module.exports = mongoose.model("Message", MessageSchema);

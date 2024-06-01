const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger", // Yolcu modeline referans
        required: true
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "EUR" }, // Ödeme para birimi, varsayılan olarak EUR
    paymentMethod: { type: String, required: true }, // Ödeme yöntemi (kredi kartı, PayPal, banka havalesi vb.)
    paymentDate: { type: Date, default: Date.now }, // Ödeme tarihi, varsayılan olarak şu anki tarih
    status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'] } // Ödeme durumu
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);

// models/eisCreamReview.js
const mongoose = require('mongoose');

const eisCreamReviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'EisCreamProduct', required: true }, // İncelenen ürün
    customerName: { type: String, required: true, minlength: 2 }, // Müşteri adı
    rating: { type: Number, required: true, min: 1, max: 5 }, // Puanlama (1-5 arası)
    comment: { type: String, maxlength: 500 }, // Müşteri yorumu
    date: { type: Date, default: Date.now }, // Yorum tarihi
}, { timestamps: true });

const EisCreamReview = mongoose.model('EisCreamReview', eisCreamReviewSchema);
console.log(`${EisCreamReview.modelName} modeli eklendi ama Service ve Route daha eklenmedi.`);

module.exports = EisCreamReview;

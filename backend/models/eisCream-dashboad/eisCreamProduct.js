// models/eisCreamProduct.js
const mongoose = require('mongoose');

const eisCreamProductSchema = new mongoose.Schema({
     // MongoDB'nin otomatik olarak sağladığı _id'yi kullanabilirim
     name: { type: String, required: true, minlength: 2 }, // Ürün adı
     type: { type: String, required: true, enum: ['ice_cream', 'drink', 'snack'] }, // Ürün türü
     ingredients: [{ type: String }], // Malzemeler (örneğin, süt, çikolata)
     nutrition: { //Besin değerleri
         calories: { type: Number },
         fat: { type: Number },
         protein: { type: Number },
         carbs: { type: Number }
     }, // Besin bilgileri
     available: { type: Boolean, default: true }, // Ürün mevcutmu
     availableHours: {
     start: { type: String }, // Örneğin, "12:00"
     end: { type: String } // Örneğin, "22:00"
     }, //Mevcut olma durumu
     reviews: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Review',
         autopopulate: true
     }],// Müsteri yorumları
     discount: {
         percentage: { type: Number,default: 0, min: 0, max: 100 }, // İndirim yüzdesi
         validUntil: { type: Date } // İndirim geçerlilik süresi
     }, // İndirim bilgileri
     price: { type: Number, required: false, min: 0 }, // Fiyat, negatif olamaz
     imageUrl: { type: String, required: false},
     deliveryTime: { type: Number, required: false, min: 1, max: 60 }, // Teslim süresi (Dakika), negatif olamaz
     description: { type: String } // Ürün açıklaması (isteğe bağlı)
}, { timestamps: true });

const EisCreamProduct = mongoose.model('EisCreamProduct', eisCreamProductSchema);
console.log(`${EisCreamProduct.modelName} modeli eklendi ama Service ve Route daha eklenmedi.`);

module.exports = EisCreamProduct;

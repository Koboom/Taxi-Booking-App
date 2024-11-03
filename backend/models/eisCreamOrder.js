// models/eisCreamOrder.js
const mongoose = require('mongoose');

const eisCreamOrderSchema = new mongoose.Schema({
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'EisCreamTable', required: true }, // Sipariş verilen masa
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'EisCreamProduct', autopopulate: true },
        quantity: { type: Number, required: true, min: 1 }
    }], // Sipariş edilen ürünler ve miktarları
    totalPrice: { type: Number, required: true, min: 0 }, // Toplam fiyat
    status: { type: String, enum: ['pending', 'preparing', 'ready', 'served', 'completed'], default: 'pending' }, // Sipariş durumu
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }, // Ödeme durumu
    orderDate: { type: Date, default: Date.now } // Sipariş tarihi
}, { timestamps: true });

eisCreamOrderSchema.plugin(require('mongoose-autopopulate'));

const EisCreamOrder = mongoose.model('EisCreamOrder', eisCreamOrderSchema);
console.log(`${EisCreamOrder.modelName} modeli eklendi ama Service ve Route daha eklenmedi.`);

module.exports = EisCreamOrder;

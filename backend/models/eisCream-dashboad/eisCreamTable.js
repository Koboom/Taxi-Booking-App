const mongoose = require('mongoose');

const eisCreamTableSchema = new mongoose.Schema({
    number: { type: Number, required: true }, // Masa numarası
    capacity: { type: Number, required: true }, // Masa kapasitesi
    status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Cleaning'], default: "Available" }, // Masa durumu
    statusPayment: { type: String, enum: ['available', 'occupied', 'payment_pending', 'paid'], default: 'available' },
    isVIP: { type: Boolean, default: false }, // VIP Masa
    specialRequests: [{ type: String }], // Özel İstekler (opsiyonel)
    location: { type: String, enum: ['Indoor', 'Outdoor', 'Other'], default: 'Outdoor'}, // Masa konumu (opsiyonel)
    isSmokingAllowed: { type: Boolean, default: false },
    reservedUntil: { type: Date }, // Masa rezerve edilme süresi
    lastCleaningDate: { type: Date }, // Son temizlenme tarihi
    waiter: { type: mongoose.Schema.Types.ObjectId, ref: 'EisCreamWaiter' }, // Masa ile ilişkili garson
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EisCreamOrder' }], // Masa ile ilişkili siparişler
    notes: { type: String }, // Notlar (opsiyonel)
    rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

eisCreamTableSchema.plugin(require('mongoose-autopopulate'));

const EisCreamTable = mongoose.model('EisCreamTable', eisCreamTableSchema);
console.log(`${EisCreamTable.modelName} modeli eklendi ama Service ve Route daha eklenmedi.`);

module.exports = EisCreamTable;

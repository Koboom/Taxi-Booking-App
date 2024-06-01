const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Konumun adı veya tanımı
    coordinates: {
        type: {
            type: String,
            enum: ['Point'], // Konum tipi
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Enlem ve boylam koordinatları
            required: true
        }
    }
});

// Konum bilgisine göre indeksleme yapılabilir
LocationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model("Location", LocationSchema);

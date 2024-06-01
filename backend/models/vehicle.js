const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver", // Sürücü modeline referans
        required: true
    },
    make: { type: String, required: true }, // Araç markası
    model: { type: String, required: true }, // Araç modeli
    year: { type: Number, required: true }, // Araç yılı
    plateNumber: { type: String, required: true, unique: true }, // Plaka numarası
    color: String // Araç rengi (isteğe bağlı)
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", VehicleSchema);

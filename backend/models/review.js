const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger", // Yolcu modeline referans
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver", // Sürücü modeline referans
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);

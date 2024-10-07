const mongoose = require("mongoose")

const DriverSchema = new mongoose.Schema({
    name: String,
    surname:String,
    location: String,
    age: { type: Number, required: true, min: 18 },
}, { timestamps: true })

module.exports = mongoose.model("Driver", DriverSchema)
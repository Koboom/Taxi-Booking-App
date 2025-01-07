const mongoose = require("mongoose")

const PassengerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2},
    surname: { type: String, required: true, minlength: 2},
    location: String,
    date: Date,
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        autopopulate: { maxDepth: 2}
    }],
    googleId: {
        type: String,
        unique: true,//Bu, aynı Google hesabının birden fazla kez kaydedilmesini önler.
        sparse: true //bu alanın opsiyonel olmasını ve dolayısıyla her Passenger belgesinde zorunlu olmamasını sağlar.
    }
}, { timestamps: true })

PassengerSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("Passenger", PassengerSchema)
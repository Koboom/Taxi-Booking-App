// models/eisCreamWaiter.js
const mongoose = require('mongoose');

const eisCreamWaiterSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    age: { type: Number, min: 18 },
    experience: { type: Number, min: 0 }, // Garsonun kaç yıl deneyimi olduğu
    workingHours: {
        start: { type: String }, // Örneğin, "08:00"
        end: { type: String }    // Örneğin, "16:00"
    },
    assignedTables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EisCreamTable' }] // Görevli olduğu masalar
}, { timestamps: true });

const EisCreamWaiter = mongoose.model('EisCreamWaiter', eisCreamWaiterSchema);
console.log(`${EisCreamWaiter.modelName} modeli eklendi ama Service ve Route daha eklenmedi.`);

module.exports = EisCreamWaiter;

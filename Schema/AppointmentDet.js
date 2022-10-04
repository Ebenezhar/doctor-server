const mongoose = require('mongoose');

const appointSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    appoinmentDate: { type: String, required: true },
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    visited: { type: Boolean, default: false },
    bookTime: { type: Date, default: Date.now() },
    token: { type: Number, required: true }
})

module.exports = mongoose.model('AppointmentDet', appointSchema);